'use server'

import { revalidatePath } from 'next/cache'

import { createBuild } from '@/app/(actions)/builds/create-build'
import { addBuildToLoadout } from '@/app/(actions)/loadouts/add-build-to-loadout'
import type { BuildState, SuccessResponse } from '@/app/(types)/builds'
import {
  MAX_PROFILE_SAV_SIZE,
  type ParsedLoadoutItem,
} from '@/app/(types)/sav-file'
import { getServerSession } from '@/app/(utils)/auth'
import { importedLoadoutToBuildState } from '@/app/(utils)/builds/imported-loadout-to-build-state'
import { isErrorResponse } from '@/app/(utils)/is-error-response'
import { validateEnv } from '@/app/(validators)/validate-env'

const env = validateEnv()

type ParsedLoadoutResponse = Array<ParsedLoadoutItem>

/**
 * Parse the data from the Remnant 2 save file
 */
export async function parseSaveFile(
  _prevState: unknown,
  formData: FormData,
): Promise<{ status: 'success' | 'error'; message: string }> {
  const session = await getServerSession()

  if (!session || !session.user?.id) {
    return {
      status: 'error',
      message: 'User not authenticated',
    }
  }

  const saveFile = formData.get('saveFile') as File | null
  if (!saveFile) {
    throw new Error('No file provided')
  }
  if (saveFile.name.toLowerCase() !== 'profile.sav') {
    const message = 'Invalid file name, should be profile.sav'
    return {
      status: 'error',
      message,
    }
  }

  // if characterSlot is missing from form data, add it
  if (!formData.has('characterSlot')) {
    formData.append('characterSlot', '1')
  }

  const loadoutsToReplace: number[] = []
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('loadoutsToReplace')) {
      loadoutsToReplace.push(parseInt(value.toString()))
    }
  }

  // If no loadouts to replace are provided, error
  if (loadoutsToReplace.length === 0) {
    return {
      status: 'error',
      message: 'No loadouts to replace provided.',
    }
  }

  const fileSizeInBytes = saveFile.size
  const fileSizeInKilobytes = fileSizeInBytes / 1000.0

  if (fileSizeInKilobytes > MAX_PROFILE_SAV_SIZE) {
    console.error('File too large', fileSizeInKilobytes)
    return {
      status: 'error',
      message: `File too large (${fileSizeInKilobytes} KB), please use a smaller file. If you think this is in error, please use the bug report icon in the bottom right to let me know.`,
    }
  }

  try {
    formData.append('authToken', env.LOADOUT_AUTH_TOKEN)

    // Send the file the loadout parser
    const response = await fetch(`${env.LOADOUT_PARSER_URL}/ExportLoadout`, {
      method: 'POST',
      // headers
      headers: {
        Accept: 'application/octet-stream',
      },
      body: formData,
    })

    if (!response.ok) {
      console.error('Error in parseSaveFile', response)
      return {
        status: 'error',
        message: `Error parsing save file`,
      }
    }

    const data = await response.json()
    if (!data[0]?.loadouts) {
      return {
        status: 'error',
        message: `No loadouts found in save file for character slot ${formData.get(
          'characterSlot',
        )}`,
      }
    }

    const loadouts = data[0]?.loadouts as ParsedLoadoutResponse[]

    const buildsToCreate: BuildState[] = []
    for (const loadoutIndex of loadoutsToReplace) {
      const loadout = loadouts[loadoutIndex - 1]
      // don't create empty loadouts
      if (!loadout || loadout.length === 0) {
        continue
      }
      const buildState = importedLoadoutToBuildState({
        loadout,
      })
      buildsToCreate.push({
        ...buildState,
        name: `Imported Loadout ${loadoutIndex}`,
        description: `Imported from profile.sav by ${session.user.displayName}`,
      })
    }

    // Save the builds to the database
    const createdBuildResponse = await Promise.all([
      ...buildsToCreate.map((build) => createBuild(JSON.stringify(build))),
    ])
    const buildIds = createdBuildResponse
      .filter((build) => !isErrorResponse(build))
      .map((build) => (build as SuccessResponse).buildId as string)

    // Update the loadouts with the new build IDs
    const loadoutsToUpdate: Array<{ buildId: string; slot: number }> = []
    for (const loadoutIndex of loadoutsToReplace) {
      const loadout = loadouts[loadoutIndex - 1]
      if (!loadout || loadout.length === 0) {
        continue
      }
      const buildId = buildIds.shift()
      if (!buildId) {
        continue
      }
      loadoutsToUpdate.push({
        buildId,
        slot: loadoutIndex,
      })
    }

    const _updatedLoadoutsResponse = await Promise.all([
      ...loadoutsToUpdate.map((loadout) =>
        addBuildToLoadout(loadout.buildId, loadout.slot),
      ),
    ])

    revalidatePath(`/api/profile/[userId]/loadouts`, 'page')

    return {
      status: 'success',
      message: 'Loadouts imported successfully',
    }
  } catch (e) {
    console.error('Error in parseSaveFile', e)
    return {
      status: 'error',
      message: `Unknown error parsing save file`,
    }
  }
}

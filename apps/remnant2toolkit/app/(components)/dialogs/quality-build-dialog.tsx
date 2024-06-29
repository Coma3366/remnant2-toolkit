import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogTitle,
} from '@repo/ui/base/dialog'

import { MINIMUM_QUALITY_DESCRIPTION_LENGTH } from '@/app/(components)/filters/builds/build-misc-filter'

interface Props {
  open: boolean
  onClose: () => void
}

export default function QualityBuildDialog({ open, onClose }: Props) {
  return (
    <BaseDialog open={open} onClose={onClose} size="md">
      <BaseDialogTitle>What is a Quality Build?</BaseDialogTitle>
      <BaseDialogBody>
        A build is considered a quality build when it matches the following
        conditions:
        <ul className="text-md mt-4 list-disc">
          <li className="mb-1 ml-4">
            Minimum {MINIMUM_QUALITY_DESCRIPTION_LENGTH} character description.
          </li>
          <li className="mb-1 ml-4">At least one build tag.</li>
          <li className="mb-1 ml-4">
            All item slots filled, except consumables.
          </li>
        </ul>
      </BaseDialogBody>
    </BaseDialog>
  )
}

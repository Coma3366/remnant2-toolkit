import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { ShareIcon } from '@heroicons/react/24/solid'
import copy from 'clipboard-copy'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { cn } from '@/lib/classnames'

import { cleanItemName } from '../lib/cleanItemName'
import { Item } from '../types'
import { ArchetypeItem } from '../types/ArchetypeItem'
import { ArmorItem } from '../types/ArmorItem'
import { ModItem } from '../types/ModItem'
import { MutatorItem } from '../types/MutatorItem'
import { PerkItem } from '../types/PerkItem'
import { SkillItem } from '../types/SkillItem'
import { TraitItem } from '../types/TraitItem'
import { WeaponItem } from '../types/WeaponItem'
import { ArmorInfo } from './ArmorInfo'
import { DescriptionWithTags } from './DescriptionWithTags'
import { WeaponInfo } from './WeaponInfo'

interface Props {
  index: number
  data: Item
  width: number
  onMoreInfoClick: (item: Item) => void
}

export function ItemCard({ data: item, onMoreInfoClick }: Props) {
  const { imagePath, category, name, description } = item

  return (
    <div className="col-span-1 flex flex-col divide-y divide-green-800 rounded-lg border border-green-500 bg-black text-center shadow">
      <div className="flex flex-1 flex-col p-4">
        <button
          onClick={() => onMoreInfoClick(item)}
          aria-label="More Info"
          className="text-md font-bold text-purple-500 hover:text-purple-300 hover:underline"
        >
          <Image
            className={cn(
              'mx-auto mb-2 h-auto w-24 flex-shrink-0 rounded-full',
              TraitItem.isTraitItem(item) && 'h-24 w-auto',
              WeaponItem.isWeaponItem(item) && 'h-auto w-32',
            )}
            width={150}
            height={150}
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${imagePath}`}
            alt={`${name} icon`}
            loading="lazy"
          />

          {name}
        </button>
        <dl className="mt-0 flex flex-grow flex-col justify-start text-xs">
          <dt className="sr-only">Item Category</dt>
          <dd className="text-xs text-gray-500">
            {category === 'relicfragment' ? 'relic fragment' : category}
          </dd>
          {!ArmorItem.isArmorItem(item) && (
            <>
              <dt className="sr-only">Description</dt>
              <dd className="mt-3 whitespace-pre-line text-left text-xs text-gray-200">
                <DescriptionWithTags description={description ?? ''} />
              </dd>
            </>
          )}

          {(MutatorItem.isMutatorItem(item) || TraitItem.isTraitItem(item)) && (
            <dd className="mt-3 whitespace-pre-line text-left text-xs text-gray-200">
              <strong>At Max Level: </strong>
              {item.maxLevelBonus || 'No max level bonus found.'}
              <DescriptionWithTags
                description={item.maxLevelBonus || 'No max level bonus found.'}
              />
            </dd>
          )}

          {item.cooldown && (
            <dd className="mt-3 whitespace-pre-line text-left text-xs text-gray-200">
              <strong>Cooldown</strong>: {item.cooldown}s
            </dd>
          )}
        </dl>
        {ArmorItem.isArmorItem(item) && (
          <div className="mt-1">
            <ArmorInfo item={item} />
          </div>
        )}
        {WeaponItem.isWeaponItem(item) && (
          <div className="mt-1">
            <WeaponInfo item={item} />
          </div>
        )}
        {PerkItem.isPerkItem(item) && item.linkedItems?.archetype && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 border-t-green-500 py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Archetype
              </p>
              <a
                href={`/item-lookup?searchText=${item.linkedItems.archetype.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
              >
                {item.linkedItems.archetype.name}
              </a>
            </div>
          </div>
        )}
        {SkillItem.isSkillItem(item) && item.linkedItems?.archetype && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 border-t-green-500 py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Archetype
              </p>
              <a
                href={`/item-lookup?searchText=${item.linkedItems.archetype.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
              >
                {item.linkedItems.archetype.name}
              </a>
            </div>
          </div>
        )}
        {TraitItem.isTraitItem(item) && item.linkedItems?.archetype && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 border-t-green-500 py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Archetype
              </p>
              <a
                href={`/item-lookup?searchText=${item.linkedItems.archetype.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
              >
                {item.linkedItems.archetype.name}
              </a>
            </div>
          </div>
        )}
        {ModItem.isModItem(item) && item.linkedItems?.weapon && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 border-t-green-500 py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">Weapon</p>
              <a
                href={`/item-lookup?searchText=${item.linkedItems.weapon.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
              >
                {item.linkedItems.weapon.name}
              </a>
            </div>
          </div>
        )}
        {ArchetypeItem.isArchetypeItem(item) &&
          item.linkedItems?.perks &&
          item.linkedItems.perks.map((perk, index) => (
            <div className={cn(index === 0 && 'mt-4')} key={perk.name}>
              <div
                className={cn(
                  'grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 py-1 text-left text-sm text-gray-300',
                  index === 0 && 'border-t-green-500',
                )}
              >
                <p className="flex items-center justify-start text-xs">Perk</p>
                <a
                  href={`/item-lookup?searchText=${perk.name}`}
                  className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
                >
                  {perk.name}
                </a>
              </div>
            </div>
          ))}
        {ArchetypeItem.isArchetypeItem(item) &&
          item.linkedItems?.skills &&
          item.linkedItems.skills.map((skill) => (
            <div key={skill.name}>
              <div
                className={cn(
                  'grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 py-1 text-left text-sm text-gray-300',
                )}
              >
                <p className="flex items-center justify-start text-xs">Skill</p>
                <a
                  href={`/item-lookup?searchText=${skill.name}`}
                  className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
                >
                  {skill.name}
                </a>
              </div>
            </div>
          ))}
        {ArchetypeItem.isArchetypeItem(item) &&
          item.linkedItems?.traits &&
          item.linkedItems.traits.slice(0, 1).map((trait) => (
            <div key={trait.name}>
              <div
                className={cn(
                  'grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 py-1 text-left text-sm text-gray-300',
                )}
              >
                <p className="flex items-center justify-start text-xs">Trait</p>
                <a
                  href={`/item-lookup?searchText=${trait.name}`}
                  className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
                >
                  {trait.name}
                </a>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-green-800">
          <button
            className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-1 rounded-br-lg border border-transparent py-4 text-xs font-semibold text-gray-200"
            aria-label="Share Item Link"
            onClick={() => {
              copy(
                `https://remnant2toolkit.com/endpoint/item/${cleanItemName(
                  item,
                )}`,
              )
              toast.success('Copied link to clipboard')
            }}
          >
            <ShareIcon className="h-4 w-4 text-green-400" aria-hidden="true" />
            Share
          </button>

          <div className="-ml-px flex w-0 flex-1">
            <div className="flex w-0 flex-1">
              <button
                onClick={() => onMoreInfoClick(item)}
                aria-label="More Info"
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-1 rounded-br-lg border border-transparent py-4 text-xs font-semibold text-gray-200"
              >
                <InformationCircleIcon
                  className="h-4 w-4 text-green-400"
                  aria-hidden="true"
                />
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

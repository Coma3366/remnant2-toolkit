import { TraitItem } from '@/app/(types)/TraitItem'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { cn, getArrayOfLength, getConcoctionSlotCount } from '@/app/(lib)/utils'
import BuilderName from './BuilderName'
import BuilderButton from './BuilderButton'
import Traits from './Traits'
import ItemSelect from './ItemSelect'
import Logo from '@/app/(components)/Logo'
import useBuildSearchParams from '../(hooks)/useBuildSearchParams'
import { GenericItem } from '@/app/(types)/GenericItem'
import { getItemListForCategory } from '../(lib)/utils'

export default function BuilderPage({
  isScreenshotMode,
  showControls,
  showLabels,
}: {
  isScreenshotMode: boolean
  showControls: boolean
  showLabels: boolean
}) {
  // Custom hook for working with the build
  const { updateBuild, currentBuildState } = useBuildSearchParams()
  const concoctionSlotCount = getConcoctionSlotCount(currentBuildState)

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemSlot, setSelectedItemSlot] = useState<{
    category: GenericItem['category'] | null
    index?: number
  }>({ category: null })

  /**
   * Fires when the user changes an item in the build.
   *
   * If the item is null, the item is removed from the build
   * and from the query string.
   *
   * If the item is not null, the item is added to the build
   * and the query string is updated.
   */
  const handleSelectItem = useCallback(
    (selectedItem: GenericItem | null) => {
      if (!selectedItemSlot.category) return

      /**
       * The item index is used to determine which item in the array of items
       * for slots like rings and archtypes
       */
      const specifiedIndex = selectedItemSlot.index
      const isIndexSpecified = specifiedIndex !== undefined

      // If the item is null, remove the item from the build
      // and from the query string
      // If the item can be multiple, such as rings,
      // then remove the item at the specified index
      if (!selectedItem) {
        if (isIndexSpecified) {
          const buildItems = currentBuildState.items[selectedItemSlot.category]

          if (!Array.isArray(buildItems)) return

          // We can't filter here because we want to preserve the index
          // If we filtered, the second archtype would become the first archtype
          // if you removed the first archtype
          const newBuildItems = buildItems.map((item, index) =>
            index === specifiedIndex ? null : item,
          )
          const newItemIds = newBuildItems.map((i) => (i ? i.id : ''))
          updateBuild(selectedItemSlot.category, newItemIds)
        } else {
          updateBuild(selectedItemSlot.category, '')
        }

        setSelectedItemSlot({ category: null })
        return
      }

      const categoryItemorItems =
        currentBuildState.items[selectedItemSlot.category]

      // If the item can be multiple, such as rings,
      // then add the item at the specified index
      if (Array.isArray(categoryItemorItems)) {
        const buildItems = categoryItemorItems

        const itemAlreadyInBuild = buildItems.find(
          (i) => i?.id === selectedItem.id,
        )
        if (itemAlreadyInBuild) return

        /** Used to add the new item to the array of items for this slot */
        const newBuildItems = [...buildItems]

        const specifiedIndex = selectedItemSlot.index
        const isIndexSpecified = specifiedIndex !== undefined

        isIndexSpecified
          ? (newBuildItems[specifiedIndex] = selectedItem)
          : newBuildItems.push(selectedItem)

        // If the item is a trait, then we need to add the amount to the query string
        if (selectedItemSlot.category === 'trait') {
          const newTraitItemParams = TraitItem.toParams(
            newBuildItems as TraitItem[],
          )
          updateBuild('trait', newTraitItemParams)
          setSelectedItemSlot({ category: null })
          return
        }

        // If we got here, add the item to the build
        const newItemIds = newBuildItems.map((i) => i?.id)
        updateBuild(selectedItem.category, newItemIds)
        setSelectedItemSlot({ category: null })
        return
      }

      // If the item is not null, add the item to the build
      const buildItem = categoryItemorItems

      const itemAlreadyInBuild = buildItem?.id === selectedItem.id
      if (itemAlreadyInBuild) return

      updateBuild(selectedItem.category, selectedItem.id)
      setSelectedItemSlot({ category: null })
    },
    [
      currentBuildState.items,
      selectedItemSlot.category,
      selectedItemSlot.index,
      updateBuild,
    ],
  )

  /** If the item category is null, modal is closed */
  const isItemSelectModalOpen = Boolean(selectedItemSlot.category)

  //Tracks whether the build name is editable or not.
  const [buildNameIsEditable, setBuildNameIsEditable] = useState(false)

  /**
   * Returns a list of items that match the selected slot
   * This is passed to the ItemSelect modal to display the correct items
   */
  const itemListForSlot = useMemo(
    () => getItemListForCategory(currentBuildState, selectedItemSlot),
    [selectedItemSlot, currentBuildState],
  )

  return (
    <>
      <ItemSelect
        open={isItemSelectModalOpen}
        onClose={() => setSelectedItemSlot({ category: null })}
        onSelectItem={handleSelectItem}
        itemList={itemListForSlot}
        buildSlot={selectedItemSlot.category}
      />

      <div className="mb-4">
        <BuilderName
          editable={buildNameIsEditable}
          onClick={() => setBuildNameIsEditable(true)}
          onClose={(newBuildName: string) => {
            updateBuild('name', newBuildName)
            setBuildNameIsEditable(false)
          }}
          name={currentBuildState.name}
          showControls={showControls}
        />
      </div>

      <div
        className={cn('relative flex w-full items-start justify-between gap-4')}
      >
        {isScreenshotMode && (
          <div className="absolute bottom-[10px] right-[80px]">
            <Logo showUrl />
          </div>
        )}
        <div id="left-column" className="flex-none">
          <BuilderButton
            item={currentBuildState.items.helm}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'helm',
              })
            }}
          />
          <BuilderButton
            item={currentBuildState.items.torso}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'torso',
              })
            }}
          />
          <BuilderButton
            item={currentBuildState.items.legs}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'legs',
              })
            }}
          />
          <BuilderButton
            item={currentBuildState.items.gloves}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'gloves',
              })
            }}
          />
          <div
            id="relic-container"
            className="relative flex items-start justify-start"
          >
            <BuilderButton
              item={currentBuildState.items.relic}
              showLabels={showLabels}
              onClick={() => {
                setSelectedItemSlot({
                  category: 'relic',
                })
              }}
            />
            <div
              id="relic-fragment-container"
              className="absolute left-[66px] top-0 flex w-[160px] flex-col items-start justify-start"
            >
              <BuilderButton
                showLabels={showLabels}
                size="sm"
                item={currentBuildState.items.relicfragment[0]}
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 0,
                  })
                }}
              />
              <BuilderButton
                item={currentBuildState.items.relicfragment[1]}
                showLabels={showLabels}
                size="sm"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 1,
                  })
                }}
              />
              <BuilderButton
                item={currentBuildState.items.relicfragment[2]}
                showLabels={showLabels}
                size="sm"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'relicfragment',
                    index: 2,
                  })
                }}
              />
            </div>
          </div>
        </div>

        <div
          id="center-column"
          className={cn(
            'relative ml-[13px] flex h-[450px] max-h-[450px] flex-col items-start justify-start overflow-y-auto',
            'sm:h-[460px] sm:max-h-[460px]',
          )}
        >
          <div
            id="archtype-container"
            className="flex flex-row flex-wrap gap-2"
          >
            {getArrayOfLength(2).map((archtypeIndex) => (
              <Fragment key={`archtype-${archtypeIndex}`}>
                <BuilderButton
                  item={currentBuildState.items.archtype[archtypeIndex]}
                  showLabels={showLabels}
                  onClick={() => {
                    setSelectedItemSlot({
                      category: 'archtype',
                      index: archtypeIndex,
                    })
                  }}
                />
                <BuilderButton
                  item={currentBuildState.items.skill[archtypeIndex]}
                  showLabels={showLabels}
                  onClick={() => {
                    setSelectedItemSlot({
                      category: 'skill',
                      index: archtypeIndex,
                    })
                  }}
                />
              </Fragment>
            ))}
          </div>

          <div
            id="concoction-container"
            className="flex flex-row flex-wrap gap-x-2 gap-y-0"
          >
            <BuilderButton
              item={currentBuildState.items.concoction[0]}
              showLabels={showLabels}
              onClick={() => {
                setSelectedItemSlot({
                  category: 'concoction',
                  index: 0,
                })
              }}
            />
            {getArrayOfLength(concoctionSlotCount).map((index) => {
              // Add 1 to the index because we already rendered the first slot
              const concoctionIndex = index + 1
              return (
                <BuilderButton
                  key={`concoction-${concoctionIndex}`}
                  item={currentBuildState.items.concoction[concoctionIndex]}
                  showLabels={showLabels}
                  onClick={() => {
                    setSelectedItemSlot({
                      category: 'concoction',
                      index: concoctionIndex,
                    })
                  }}
                />
              )
            })}
          </div>

          <div
            id="consumable-container"
            className="flex flex-row flex-wrap gap-x-1 gap-y-0"
          >
            {getArrayOfLength(4).map((consumableIndex) => (
              <BuilderButton
                key={`consumable-${consumableIndex}`}
                item={currentBuildState.items.consumable[consumableIndex]}
                showLabels={showLabels}
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'consumable',
                    index: consumableIndex,
                  })
                }}
              />
            ))}
          </div>
        </div>

        <div id="right-column" className="flex-none">
          <BuilderButton
            item={currentBuildState.items.amulet}
            showLabels={showLabels}
            onClick={() => {
              setSelectedItemSlot({
                category: 'amulet',
              })
            }}
          />
          {getArrayOfLength(4).map((ringIndex) => (
            <BuilderButton
              showLabels={showLabels}
              item={currentBuildState.items.ring[ringIndex]}
              key={`ring-${ringIndex}`}
              onClick={() => {
                setSelectedItemSlot({
                  category: 'ring',
                  index: ringIndex,
                })
              }}
            />
          ))}
        </div>
      </div>

      <div
        id="guns-row"
        className="flex w-full flex-row items-start justify-start gap-2 overflow-x-auto"
      >
        {getArrayOfLength(3).map((weaponIndex) => (
          <div
            key={`gun-${weaponIndex}`}
            className="flex flex-col items-start justify-center"
          >
            <BuilderButton
              showLabels={showLabels}
              item={currentBuildState.items.weapon[weaponIndex]}
              size="wide"
              onClick={() => {
                setSelectedItemSlot({
                  category: 'weapon',
                  index: weaponIndex,
                })
              }}
            />
            <div className="flex w-full grow items-center justify-around gap-4">
              <BuilderButton
                showLabels={showLabels}
                item={currentBuildState.items.mod[weaponIndex]}
                size="md"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'mod',
                    index: weaponIndex,
                  })
                }}
              />
              <BuilderButton
                item={currentBuildState.items.mutator[weaponIndex]}
                showLabels={showLabels}
                size="md"
                onClick={() => {
                  setSelectedItemSlot({
                    category: 'mutator',
                    index: weaponIndex,
                  })
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div id="trait-row" className="mt-4 w-full">
        <Traits
          traitItems={currentBuildState.items.trait}
          showControls={showControls}
          showLabels={showLabels}
          isScreenshotMode={isScreenshotMode}
          onAddTrait={() => {
            setSelectedItemSlot({
              category: 'trait',
            })
          }}
          onRemoveTrait={(traitItem) => {
            const newTraitItems = currentBuildState.items.trait.filter(
              (i) => i.name !== traitItem.name,
            )
            const newTraitItemParams = newTraitItems.map(
              (i) => `${i.id};${i.amount}`,
            )
            updateBuild('trait', newTraitItemParams)
          }}
          onChangeAmount={(newTraitItem) => {
            const newTraitItems = currentBuildState.items.trait.map(
              (traitItem) => {
                if (traitItem.name === newTraitItem.name) {
                  return newTraitItem
                }
                return traitItem
              },
            )
            const newTraitItemParams = newTraitItems.map(
              (i) => `${i.id};${i.amount}`,
            )
            updateBuild('trait', newTraitItemParams)
          }}
        />
      </div>
    </>
  )
}

import { BuildItems } from '@repo/db'

import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants'
import { Item } from '@/app/(data)/items/types'

import { consumableItems } from '../consumable-items'
import { BaseItem } from './BaseItem'

interface BaseConsumableItem extends BaseItem {}

export class ConsumableItem extends BaseItem implements BaseConsumableItem {
  public category: BaseConsumableItem['category'] = 'consumable'

  constructor(props: BaseConsumableItem) {
    super(props)
  }

  public static isConsumableItem = (item?: Item): item is ConsumableItem => {
    if (!item) return false
    return item.category === 'consumable'
  }

  static toParams(items: Array<ConsumableItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return ''
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id
    })
  }

  static fromParams(params: string): ConsumableItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: ConsumableItem[] = []
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL)
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '')

      const item = consumableItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = optional ? { ...item, optional } : item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ConsumableItem | null> {
    if (!buildItems) return []

    const consumableValues: Array<ConsumableItem | null> = []
    for (const buildItem of buildItems) {
      const item = consumableItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'consumable') continue
      buildItem.index
        ? (consumableValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
          })
        : consumableValues.push({
            ...item,
            optional: buildItem.optional,
          })
    }
    return consumableValues
  }
}

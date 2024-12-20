import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { allItems } from '@/app/(items)/_constants/all-items';
import { type Item } from '@/app/(items)/_types/item';
import { RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';

/** We don't track these categories at all */
export const SKIPPED_ITEM_TRACKER_CATEGORIES: Array<ItemCategory> = [
  'skill',
  'perk',
  'fusion',
  'pylon',
];

/** All items that are trackable. */
export const ALL_TRACKABLE_ITEMS = allItems
  // We don't want to show the items that are in the skippedItemCategories
  .filter(
    (item) => SKIPPED_ITEM_TRACKER_CATEGORIES.includes(item.category) === false,
  )
  // Remove mods that have linked guns
  .filter((item) => {
    if (item.category !== 'mod') return true;
    return item.linkedItems?.weapon === undefined;
  })
  // Remove legendary relic fragments
  .filter((item) => {
    if (!RelicFragmentItem.isRelicFragmentItem(item)) return true;
    return item.color !== 'legendary';
  })
  .map((item) => ({
    ...item,
    discovered: false,
  })) satisfies Item[];

export const TOTAL_TRACKABLE_ITEM_COUNT = ALL_TRACKABLE_ITEMS.length;

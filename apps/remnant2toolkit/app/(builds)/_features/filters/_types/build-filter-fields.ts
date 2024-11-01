import type { BuildTagFilterValue } from '@/app/(builds)/_features/filters/_libs/build-tag-filter';
import type { FusionFilterValue } from '@/app/(builds)/_features/filters/_libs/fusion-filter';
import type { HandGunFilterValue } from '@/app/(builds)/_features/filters/_libs/hand-gun-filter';
import type { LegendaryFragmentFilterValue } from '@/app/(builds)/_features/filters/_libs/legendary-fragment-filter';
import type { LongGunFilterValue } from '@/app/(builds)/_features/filters/_libs/long-gun-filter';
import type { MeleeFilterValue } from '@/app/(builds)/_features/filters/_libs/melee-filter';
import type { ModFilterValue } from '@/app/(builds)/_features/filters/_libs/mod-filter';
import type { MutatorFilterValue } from '@/app/(builds)/_features/filters/_libs/mutator-filter';
import type { ReleasesFilterValue } from '@/app/(builds)/_features/filters/_libs/releases-filter';
import type { RelicFilterValue } from '@/app/(builds)/_features/filters/_libs/relic-filter';
import type { RelicFragmentFilterValue } from '@/app/(builds)/_features/filters/_libs/relic-fragment-filter';
import type { RingFilterValue } from '@/app/(builds)/_features/filters/_libs/ring-filter';
import type { SearchTextFilterValue } from '@/app/(builds)/_features/filters/_libs/search-text-filter';
import type { SkillFilterValue } from '@/app/(builds)/_features/filters/_libs/skill-filter';
import type { TraitFilterValue } from '@/app/(builds)/_features/filters/_libs/trait-filter';
import type { WithCollectionFilterValue } from '@/app/(builds)/_features/filters/_libs/with-collection';
import type { WithPatchAffectedFilterValue } from '@/app/(builds)/_features/filters/_libs/with-patch-affected-filter';
import type { WithQualityFilterValue } from '@/app/(builds)/_features/filters/_libs/with-quality-filter';
import type { WithReferenceFilterValue } from '@/app/(builds)/_features/filters/_libs/with-reference-filter';
import type { WithVideoFilterValue } from '@/app/(builds)/_features/filters/_libs/with-video-filter';

import { type AmuletFilterValue } from '../_libs/amulet-filter';
import { type ArchetypeFilterValue } from '../_libs/archetype-filter';

export interface BuildFilterFields {
  amulets: AmuletFilterValue;
  archetypes: ArchetypeFilterValue;
  buildTags: BuildTagFilterValue;
  fusions: FusionFilterValue;
  handGuns: HandGunFilterValue;
  legendaryFragments: LegendaryFragmentFilterValue;
  longGuns: LongGunFilterValue;
  melees: MeleeFilterValue;
  mods: ModFilterValue;
  mutators: MutatorFilterValue;
  releases: ReleasesFilterValue;
  relics: RelicFilterValue;
  relicFragments: RelicFragmentFilterValue;
  rings: RingFilterValue;
  searchText: SearchTextFilterValue;
  skills: SkillFilterValue;
  traits: TraitFilterValue;
  withCollection: WithCollectionFilterValue;
  withPatchAffected: WithPatchAffectedFilterValue;
  withQuality: WithQualityFilterValue;
  withVideo: WithVideoFilterValue;
  withReference: WithReferenceFilterValue;
}

export type BuildFilterFieldKey = keyof BuildFilterFields;
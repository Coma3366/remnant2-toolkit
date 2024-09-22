import { Prisma } from '@repo/db';

import { type OrderBy } from '@/app/(builds)/_components/filters/secondary-filters/order-by-filter/use-order-by-filter';

export function getOrderBySegment(
  orderBy: OrderBy,
  isFeaturedBuilds?: boolean,
) {
  let orderBySegment = Prisma.sql`
  ORDER BY totalUpvotes DESC
  `;

  if (orderBy === 'alphabetical') {
    orderBySegment = Prisma.sql`
    ORDER BY TRIM(Build.name) ASC
    `;
  } else if (orderBy === 'newest') {
    if (isFeaturedBuilds) {
      orderBySegment = Prisma.sql`
    ORDER BY dateFeatured DESC
    `;
    } else {
      orderBySegment = Prisma.sql`
      ORDER BY createdAt DESC
      `;
    }
  } else if (orderBy === 'most viewed') {
    orderBySegment = Prisma.sql`
    ORDER BY validatedViewCount DESC
    `;
  }

  return orderBySegment;
}

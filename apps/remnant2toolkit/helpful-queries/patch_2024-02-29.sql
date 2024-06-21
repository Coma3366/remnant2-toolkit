# Flag builds that contain Spectral Blade + Resonance
UPDATE
  Build
SET
  isPatchAffected = true
WHERE
  id IN (
    SELECT
      id
    FROM
      (
        SELECT
          Build.id
        FROM
          Build
          JOIN BuildItems ON Build.id = BuildItems.buildId
        WHERE
          BuildItems.itemId IN ('l3zte1', 'dmizlm')
          AND Build.createdAt < '2024-02-29'
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 2
      ) AS tmp
  );

# Flag builds that contain Stone of Malevolence
UPDATE
  Build
SET
  isPatchAffected = true
WHERE
  id IN (
    SELECT
      id
    FROM
      (
        SELECT
          Build.id
        FROM
          Build
          JOIN BuildItems ON Build.id = BuildItems.buildId
        WHERE
          BuildItems.itemId IN ('kx65km')
          AND Build.createdAt < '2024-02-29'
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 1
      ) AS tmp
  );

# Flag builds that contain Sequenced Shot
UPDATE
  Build
SET
  isPatchAffected = true
WHERE
  id IN (
    SELECT
      id
    FROM
      (
        SELECT
          Build.id
        FROM
          Build
          JOIN BuildItems ON Build.id = BuildItems.buildId
        WHERE
          BuildItems.itemId IN ('23ztdj')
          AND Build.createdAt < '2024-02-29'
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 1
      ) AS tmp
  );

# Flag builds that contain Twisted Arbalest + Bore
UPDATE
  Build
SET
  isPatchAffected = true
WHERE
  id IN (
    SELECT
      id
    FROM
      (
        SELECT
          Build.id
        FROM
          Build
          JOIN BuildItems ON Build.id = BuildItems.buildId
        WHERE
          BuildItems.itemId IN ('13hsq0', 'iq4wjy')
          AND Build.createdAt < '2024-02-29'
        GROUP BY
          Build.id
        HAVING
          COUNT(DISTINCT BuildItems.itemId) = 2
      ) AS tmp
  );

# Get count of affected builds for a particular updatedAt
SELECT
  COUNT(*)
FROM
  (
    SELECT
      Build.id
    FROM
      Build
      JOIN BuildItems ON Build.id = BuildItems.buildId
    WHERE
      BuildItems.itemId IN ('13hsq0', 'iq4wjy')
      AND Build.createdAt < '2024-02-29'
      AND Build.isPatchAffected = false
    GROUP BY
      Build.id
    HAVING
      COUNT(DISTINCT BuildItems.itemId) = 2
  ) AS tmp;
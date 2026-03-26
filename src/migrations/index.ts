import * as migration_20260326_192230_init_schema from './20260326_192230_init_schema';

export const migrations = [
  {
    up: migration_20260326_192230_init_schema.up,
    down: migration_20260326_192230_init_schema.down,
    name: '20260326_192230_init_schema'
  },
];

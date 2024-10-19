import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { join } from 'path';
import { DatabaseSeeder } from '../../../seeders/DatabaseSeeder';

export const runSeeds = async (
  config: MikroOrmModuleOptions,
): Promise<void> => {
  const orm = await MikroORM.init({
    ...config,
    seeder: {
      path: join(__dirname, '../../seeders'),
    },
  });
  const seeder = orm.getSeeder();
  await orm.getSchemaGenerator().clearDatabase();

  await seeder.seed(DatabaseSeeder);

  await orm.close(true);
};

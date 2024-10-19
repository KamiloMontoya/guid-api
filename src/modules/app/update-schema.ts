import { MikroORM } from '@mikro-orm/core';
import { ISchemaGenerator } from '@mikro-orm/core/typings';
import { DropSchemaRule } from './enums';
import { Logger } from '@nestjs/common';

export const updateSchema = async (
  config,
  dropSchema: DropSchemaRule,
): Promise<void> => {
  const orm = await MikroORM.init(config);
  const generator = orm.getSchemaGenerator();
  const logger = new Logger(MikroORM.name);

  if (dropSchema === DropSchemaRule.ALWAYS) {
    await dropAndCreateSchema(generator, logger);
  } else {
    logger.log('Updating DB schema');
    try {
      await generator.updateSchema();
    } catch (error) {
      if (dropSchema === DropSchemaRule.ON_UPDATE_FAILURE) {
        logger.error(error);
        await dropAndCreateSchema(generator, logger);
      } else {
        throw error;
      }
    }
  }

  await orm.close(true);
};

const dropAndCreateSchema = async (
  generator: ISchemaGenerator,
  logger: Logger,
): Promise<void> => {
  logger.log('Dropping DB schema');
  await generator.dropSchema();

  logger.log('Creating DB schema');
  await generator.createSchema();
};

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule, MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { DropSchemaRule } from './enums';
import { updateSchema } from './update-schema';
import { join } from 'path';
import { CountriesModule } from '../guid/guid.module';
import { runSeeds } from './run-seeders';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mikroOrmConfig: MikroOrmModuleOptions = {
          entities: [join(__dirname, '../**', '*.entity.{ts,js}')],
          type: 'postgresql',
          user: configService.get<string>('POSTGRES_USER'),
          password: configService.get<string>('POSTGRES_PASSWORD'),
          dbName: configService.get<string>('POSTGRES_DB'),
          port: configService.get<number>('POSTGRES_PORT'),
          host: configService.get<string>('POSTGRES_HOST'),
          debug: configService.get<boolean>('POSTGRES_DEBUG'),
        };

        await updateSchema(mikroOrmConfig, DropSchemaRule.ON_UPDATE_FAILURE);
        await runSeeds(mikroOrmConfig);

        return mikroOrmConfig;
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    CountriesModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Guid } from './guid.entity';
import { GuidService } from './guid.service';
import { GuidController } from './guid.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Guid])],
  providers: [GuidService],
  controllers: [GuidController],
})
export class CountriesModule {}

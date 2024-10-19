import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Guid } from './guid.entity';
import { isValidGuid } from '../../utils/guidUtil';
import { CreateGuidDto } from './dtos/create-guid.dto';
import { UpdateGuidDto } from './dtos/update-guid.dto';

@Injectable()
export class GuidService {
  constructor(
    @InjectRepository(Guid)
    private readonly guidRepository: EntityRepository<Guid>,
  ) {}

  list(): Promise<Guid[]> {
    return this.guidRepository.find({
      expires: {
        $gte: new Date(),
      },
    });
  }

  getActiveGuid(guid: string): Promise<Guid> {
    return this.guidRepository.findOne({
      guid,
      expires: {
        $gte: new Date(),
      },
    });
  }

  async create(createGuidDto: CreateGuidDto): Promise<Guid> {
    if (createGuidDto.guid) {
      if (!isValidGuid(createGuidDto.guid)) {
        throw new BadRequestException('Giud value is not a valid guid');
      }
      const existGiud = await this.guidRepository.findOne({
        guid: createGuidDto.guid,
      });
      if (existGiud) {
        throw new BadRequestException('Giud already exists');
      }
    }

    const newGuid = new Guid();
    newGuid.user = createGuidDto.user;
    if (createGuidDto.guid) {
      newGuid.guid = createGuidDto.guid;
    }
    if (createGuidDto.expires) {
      newGuid.expires = new Date(createGuidDto.expires);
    }
    await this.guidRepository.persistAndFlush(newGuid);
    return newGuid;
  }

  async update(guid: string, updateGuidDto: UpdateGuidDto): Promise<Guid> {
    const existingGiud = await this.guidRepository.findOne({ guid });
    if (!existingGiud) {
      throw new NotFoundException('Giud not found');
    }

    if (updateGuidDto.user) {
      existingGiud.user = updateGuidDto.user;
    }
    if (updateGuidDto.expires) {
      existingGiud.expires = new Date(updateGuidDto.expires);
    }
    await this.guidRepository.persistAndFlush(existingGiud);
    return existingGiud;
  }

  async delete(guid: string): Promise<void> {
    const entity = await this.guidRepository.findOne({ guid });
    if (!entity) {
      throw new NotFoundException('Giud not found');
    }
    return this.guidRepository.removeAndFlush(entity);
  }
}

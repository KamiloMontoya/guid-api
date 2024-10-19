import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Guid } from './guid.entity';
import { GuidService } from './guid.service';
import { CreateGuidDto } from './dtos/create-guid.dto';
import { UpdateGuidDto } from './dtos/update-guid.dto';

@ApiTags('Guid')
@Controller('guid')
export class GuidController {
  constructor(private readonly guidService: GuidService) {}

  @Post(':guid')
  @ApiOperation({ summary: 'Create an specific new guid with' })
  @ApiResponse({
    status: 200,
    description: 'Create a new guid',
    type: Guid,
  })
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: Guid,
  })
  createWithGuid(
    @Param('guid') guid: string,
    @Body() createGuidDto: CreateGuidDto,
  ): Promise<Guid> {
    return this.guidService.create({
      guid,
      ...createGuidDto,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new guid' })
  @ApiResponse({
    status: 200,
    description: 'Create a new guid',
    type: Guid,
  })
  @ApiOkResponse({
    description: 'The resource was returned successfully',
    type: Guid,
  })
  create(@Body() createGuidDto: CreateGuidDto): Promise<Guid> {
    return this.guidService.create(createGuidDto);
  }

  @Put(':guid')
  @ApiOperation({ summary: 'Update a guid' })
  @ApiResponse({
    status: 200,
    description: 'Update a guid',
    type: Guid,
  })
  @ApiOkResponse({
    description: 'The resource was updated successfully',
    type: Guid,
  })
  update(
    @Param('guid') guid: string,
    @Body() updateGuidDto: UpdateGuidDto,
  ): Promise<Guid> {
    return this.guidService.update(guid, updateGuidDto);
  }

  @Delete(':guid')
  @ApiOperation({ summary: 'Delete a guid' })
  @ApiResponse({
    status: 200,
    description: 'Delete a guid',
    type: null,
  })
  @ApiOkResponse({
    description: 'The resource was deleted successfully',
    type: null,
  })
  delete(@Param('guid') guid: string): Promise<void> {
    return this.guidService.delete(guid);
  }

  @Get()
  @ApiOperation({ summary: 'List all actvies (not expired) guids' })
  @ApiResponse({
    status: 200,
    description: 'List all actvies (not expired) guids',
    isArray: true,
    type: Guid,
  })
  list(): Promise<Guid[]> {
    return this.guidService.list();
  }

  @Get(':guid')
  @ApiOperation({ summary: 'Get one guids if is active' })
  @ApiResponse({
    status: 200,
    description: 'Get one guids if is active',
    isArray: true,
    type: Guid,
  })
  async getOne(@Param('guid') guid: string): Promise<Guid> {
    const guidEntity = await this.guidService.getActiveGuid(guid);
    if (!guidEntity) {
      throw new NotFoundException('Guid was not found or is expired');
    }
    return guidEntity;
  }
}

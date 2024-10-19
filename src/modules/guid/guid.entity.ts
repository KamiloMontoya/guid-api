import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { getExpirationDate } from '../../utils/dateUtil';
import { generateGuid } from '../../utils/guidUtil';

@Entity()
export class Guid {
  @ApiProperty({
    type: String,
    example: generateGuid(),
    description: 'guid',
  })
  @PrimaryKey()
  guid: string = generateGuid();

  @ApiProperty({
    type: String,
    example: 'Jhon Doe',
    description: 'The user name',
  })
  @Property()
  user: string;

  @ApiProperty({
    type: Date,
    example: '2022-08-02T19:30:30.000Z',
    required: false,
  })
  @Property()
  expires: Date = getExpirationDate();
}

import { ApiProperty } from '@nestjs/swagger';
import { getExpirationDate } from '../../../utils/dateUtil';
import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateGuidDto {
  @ApiProperty({
    type: String,
    example: 'Jhon Doe',
    description: 'The user name',
    required: true,
  })
  @IsNotEmpty()
  user: string;

  @ApiProperty({
    type: String,
    example: getExpirationDate(),
    description: 'Expiration date, by default 30 days',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expires?: string;

  guid?: string;
}

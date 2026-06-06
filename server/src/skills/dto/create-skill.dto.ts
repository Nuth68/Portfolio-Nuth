import { IsString, IsOptional, IsNumber } from 'class-validator'

export class CreateSkillDto {
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  icon?: string

  @IsOptional()
  @IsNumber()
  sortOrder?: number
}

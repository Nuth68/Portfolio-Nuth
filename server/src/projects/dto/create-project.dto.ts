import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator'

export class CreateProjectDto {
  @IsString()
  title: string

  @IsString()
  description: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsString()
  url?: string

  @IsOptional()
  @IsString()
  github?: string

  @IsOptional()
  @IsString()
  status?: string

  @IsOptional()
  @IsArray()
  tags?: string[]

  @IsOptional()
  @IsNumber()
  sortOrder?: number
}

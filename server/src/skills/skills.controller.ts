import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common'
import { SkillsService } from './skills.service'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('skills')
export class SkillsController {
  constructor(private service: SkillsService) {}

  @Get()
  findAll() {
    return this.service.findAll()
  }

  @Get('grouped')
  findGrouped() {
    return this.service.findByCategory()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateSkillDto) {
    return this.service.create(dto)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateSkillDto) {
    return this.service.update(+id, dto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(+id)
  }
}

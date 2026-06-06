import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Skill } from './skill.entity'
import { CreateSkillDto } from './dto/create-skill.dto'
import { UpdateSkillDto } from './dto/update-skill.dto'

@Injectable()
export class SkillsService {
  constructor(
    @InjectRepository(Skill)
    private repo: Repository<Skill>,
  ) {}

  findAll(): Promise<Skill[]> {
    return this.repo.find({ order: { sortOrder: 'ASC' } })
  }

  findByCategory(): Promise<Skill[]> {
    return this.repo.find({ order: { category: 'ASC', sortOrder: 'ASC' } })
  }

  findOne(id: number): Promise<Skill | null> {
    return this.repo.findOneBy({ id })
  }

  async create(dto: CreateSkillDto): Promise<Skill> {
    const skill = this.repo.create(dto as any)
    return this.repo.save(skill) as unknown as Promise<Skill>
  }

  async update(id: number, dto: UpdateSkillDto): Promise<Skill> {
    const skill = await this.repo.findOneBy({ id })
    if (!skill) throw new NotFoundException('Skill not found')
    Object.assign(skill, dto)
    return this.repo.save(skill) as unknown as Promise<Skill>
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id)
    if (result.affected === 0) throw new NotFoundException('Skill not found')
  }
}

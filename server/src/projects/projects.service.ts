import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from './project.entity'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project.dto'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repo: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.repo.find({ order: { sortOrder: 'ASC' } })
  }

  findOne(id: number): Promise<Project | null> {
    return this.repo.findOneBy({ id })
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const project = this.repo.create(dto as any)
    return this.repo.save(project) as unknown as Promise<Project>
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    const project = await this.repo.findOneBy({ id })
    if (!project) throw new NotFoundException('Project not found')
    Object.assign(project, dto)
    return this.repo.save(project) as unknown as Promise<Project>
  }

  async remove(id: number): Promise<void> {
    const result = await this.repo.delete(id)
    if (result.affected === 0) throw new NotFoundException('Project not found')
  }
}

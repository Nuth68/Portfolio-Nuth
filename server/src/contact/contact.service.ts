import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Contact } from './contact.entity'
import { CreateContactDto } from './dto/create-contact.dto'

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private repo: Repository<Contact>,
  ) {}

  create(dto: CreateContactDto): Promise<Contact> {
    const msg = this.repo.create(dto as any)
    return this.repo.save(msg) as unknown as Promise<Contact>
  }

  findAll(): Promise<Contact[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } })
  }

  async markRead(id: number): Promise<Contact> {
    const msg = await this.repo.findOneBy({ id })
    if (!msg) throw new NotFoundException('Message not found')
    msg.read = true
    return this.repo.save(msg)
  }
}

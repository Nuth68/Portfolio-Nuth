import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

@Entity('skills')
export class Skill {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  category: string

  @Column({ nullable: true })
  icon: string

  @Column({ default: 0 })
  sortOrder: number

  @CreateDateColumn()
  createdAt: Date
}

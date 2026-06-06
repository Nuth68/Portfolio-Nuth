import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'text' })
  description: string

  @Column({ nullable: true })
  image: string

  @Column({ nullable: true })
  url: string

  @Column({ nullable: true })
  github: string

  @Column({ default: 'active' })
  status: string

  @Column({ type: 'simple-array', nullable: true })
  tags: string[]

  @Column({ default: 0 })
  sortOrder: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}

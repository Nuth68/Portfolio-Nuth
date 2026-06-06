import { DataSource } from 'typeorm'
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'
dotenv.config()

async function seed() {
  const ds = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'portfolio',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
  })

  await ds.initialize()
  console.log('Connected to database')

  const adminRepo = ds.getRepository('Admin')
  const projectRepo = ds.getRepository('Project')
  const skillRepo = ds.getRepository('Skill')

  const existing = await adminRepo.findOne({ where: { username: process.env.ADMIN_USERNAME || 'admin' } })
  if (!existing) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
    await adminRepo.save({ username: process.env.ADMIN_USERNAME || 'admin', password: hash })
    console.log('Admin user created')
  }

  const projectCount = await projectRepo.count()
  if (projectCount === 0) {
    await projectRepo.save([
      {
        title: 'NEURALSYNC V2',
        description: 'Distributed ML training platform built for large-scale language models. Optimized for high-throughput data parallelization across multi-node clusters.',
        status: 'active',
        tags: ['Python', 'TensorFlow', 'Kubernetes'],
        sortOrder: 1,
      },
      {
        title: 'CYPHERGUARD',
        description: 'Zero-trust security mesh implementing mTLS rotation and identity-based access control for microservices architecture.',
        status: 'active',
        tags: ['Go', 'mTLS', 'gRPC'],
        sortOrder: 2,
      },
      {
        title: 'VORTEX OS',
        description: 'Custom micro-kernel written in C with preemptive multitasking, VFS, and a Unix-like shell interface.',
        status: 'archived',
        tags: ['C', 'Assembly', 'OS Dev'],
        sortOrder: 3,
      },
    ])
    console.log('Sample projects created')
  }

  const skillCount = await skillRepo.count()
  if (skillCount === 0) {
    await skillRepo.save([
      { name: 'Java', category: 'Languages', sortOrder: 1 },
      { name: 'Python', category: 'Languages', sortOrder: 2 },
      { name: 'TypeScript', category: 'Languages', sortOrder: 3 },
      { name: 'C++', category: 'Languages', sortOrder: 4 },
      { name: 'React', category: 'Frameworks', sortOrder: 5 },
      { name: 'Node.js', category: 'Frameworks', sortOrder: 6 },
      { name: 'Spring Boot', category: 'Frameworks', sortOrder: 7 },
      { name: 'Vue', category: 'Frameworks', sortOrder: 8 },
      { name: 'Docker', category: 'Tools', sortOrder: 9 },
      { name: 'Kubernetes', category: 'Tools', sortOrder: 10 },
      { name: 'Git', category: 'Tools', sortOrder: 11 },
      { name: 'Linux', category: 'Tools', sortOrder: 12 },
    ])
    console.log('Sample skills created')
  }

  await ds.destroy()
  console.log('Seed complete')
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})

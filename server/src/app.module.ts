import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { ProjectsModule } from './projects/projects.module'
import { SkillsModule } from './skills/skills.module'
import { ContactModule } from './contact/contact.module'

@Module({
  imports: [DatabaseModule, AuthModule, ProjectsModule, SkillsModule, ContactModule],
})
export class AppModule {}

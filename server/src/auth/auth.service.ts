import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { Admin } from './admin.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async validateAdmin(username: string, pass: string): Promise<any> {
    const admin = await this.adminRepo.findOne({ where: { username } })
    if (admin && (await bcrypt.compare(pass, admin.password))) {
      const { password, ...result } = admin
      return result
    }
    return null
  }

  async login(username: string, password: string) {
    const admin = await this.validateAdmin(username, password)
    if (!admin) throw new UnauthorizedException('Invalid credentials')
    const payload = { username: admin.username, sub: admin.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}

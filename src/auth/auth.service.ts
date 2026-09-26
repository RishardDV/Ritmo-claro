import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import { Roles } from './roles.decorator';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existente = await this.prisma.actores.findUnique({
      where: { email: dto.email },
    });
    if (existente) {
      throw new ConflictException('El email ya está registrado');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const actor = await this.prisma.actores.create({
      data: { email: dto.email, password: hash, nombre: dto.nombre },
    });

    return { id: actor.id, email: actor.email, nombre: actor.nombre };
  }

  async login(dto: LoginDto) {
    const actores = await this.prisma.actores.findUnique({
      where: { email: dto.email },
    });
    if (!actores) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordOk = await bcrypt.compare(dto.password, actores.password);
    if (!passwordOk) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: actores.id, email: actores.email, rol: actores.rol };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}

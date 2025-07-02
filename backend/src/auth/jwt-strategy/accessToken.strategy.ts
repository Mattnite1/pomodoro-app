import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    private prisma: PrismaService,
    config: ConfigService
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('TOKEN_KEY'),
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }) {
    const user =
      await this.prisma.user.findUnique({
        where: {
          id: payload.sub,
        },
      });
    delete user.hash;
    return user;
  }
}
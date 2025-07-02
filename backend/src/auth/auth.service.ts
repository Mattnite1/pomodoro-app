import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto, AuthSignupDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private user: UserService,
  ) {}

  async signup(dto: AuthSignupDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          email: dto.email,
          firstName: dto.firstname,
          lastName: dto.lastname,
          hash,
        },
      });

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('credential taken');
        }
      }
    }
  }
  async login(dto: AuthLoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const passwordMatches = await argon.verify(user.hash, dto.password);

    if (!passwordMatches) {
      throw new ForbiddenException('incorrect password');
    }

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshToken(userId: number, refresh_token: string) {
    const hashedRefreshToken = await argon.hash(refresh_token);
    await this.user.editUser(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: number, email: string) {
    const [access_token, refresh_token] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '7d',
          secret: this.config.get('TOKEN_KEY'),
        },
      ),
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: '7d',
          secret: this.config.get('TOKEN_KEY'),
        },
      ),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }
}

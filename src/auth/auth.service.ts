import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import * as argon from 'argon2';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }

  async signIn(dto: AuthDto) {
    const user = await this.prisma.credentials.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) {
      throw new ForbiddenException('Access Denied');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.hashedPassword,
    );

    if (!passwordMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.username);
    await this.updateRefreshTokens(user.id, tokens.refresh_token);
    return tokens;
  }

  async signUp(dto: AuthDto) {
    const hashedPassword = await this.hashPassword(dto.password);
    const newUser = await this.prisma.credentials.create({
      data: {
        username: dto.username,
        hashedPassword: hashedPassword,
      },
    });

    const tokens = await this.generateTokens(newUser.id, newUser.username);
    await this.updateRefreshTokens(newUser.id, tokens.refresh_token);
  }

  async logout(credentialsUuid: string) {
    await this.prisma.credentials.update({
      where: {
        id: credentialsUuid,
        hashedRefreshToken: {
          not: null,
        },
      },
      data: {
        hashedRefreshToken: null,
      },
    });
  }

  // @method = this will be used to refresh the tokens when the refresh token expires
  async refreshTokens(credentialUuid: string, refreshToken: string) {
    const user = await this.prisma.credentials.findUnique({
      where: {
        id: credentialUuid,
      },
    });

    const refreshTokenMatches = await argon.verify(
      user.hashedRefreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.generateTokens(user.id, user.username);
    await this.updateRefreshTokens(user.id, tokens.refresh_token);
    return tokens;
  }

  // @method = to generate new user tokens
  // @parameters = information that I want to put in the token
  async generateTokens(credentialUuid: string, username: String) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: credentialUuid,
          username: username,
        },
        {
          expiresIn: 15 * 60,
          secret: jwtConstants.secretKey,
        },
      ),

      this.jwtService.signAsync(
        {
          sub: credentialUuid,
          username: username,
        },
        {
          expiresIn: 24 * 7 * 60 * 60,
          secret: jwtConstants.secretKey,
        },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // @method = update the refresh token of a user
  async updateRefreshTokens(credentialsUuid: string, refreshToken: string) {
    const hashToken = await argon.hash(refreshToken);
    await this.prisma.credentials.update({
      where: {
        id: credentialsUuid,
      },
      data: {
        hashedRefreshToken: hashToken,
      },
    });
  }
}

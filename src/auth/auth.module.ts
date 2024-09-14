import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';

@Module({
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
  imports: [PrismaModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secretKey,
    signOptions: {expiresIn: "60s"}
  }),],
})
export class AuthModule {}

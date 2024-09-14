import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Public } from './common/decorators/public.decorator';
import { AccessTokenGuard, RefreshTokenGuard } from './common/guard';
import { GetCurrentCredentialId } from './common/decorators/get-current-credential-id.decorator';
import { GetCurrentCredentials } from './common/decorators/get-current-credentials.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Public()
    @Post("signin")
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto)
    }

    @Public()
    @Post("signup")
    @HttpCode(HttpStatus.CREATED)
    async signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto)
    }

    @UseGuards(AccessTokenGuard)
    @Post('logout')
    @HttpCode(HttpStatus.OK)
    logout(@GetCurrentCredentialId() userUuid: string) {
        return this.authService.logout(userUuid);
    }

    @Public()
    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    @HttpCode(HttpStatus.OK)
    refreshTokens(
      @GetCurrentCredentialId() userUuid: string, 
      @GetCurrentCredentials("refreshToken") refreshToken: string
    ) {
        console.log(refreshToken)
        return this.authService.refreshTokens(userUuid, refreshToken);
      }
}

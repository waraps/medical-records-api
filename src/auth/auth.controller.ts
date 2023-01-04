import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GetUser } from "./decorator";
import { AuthDto, RecoveryPasswordDto, SignInDto } from "./dto";
import { JwtGuard, JwtRefreshGuard } from "./guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() user: AuthDto) {
        return this.authService.signUp(user);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signIn(@Body() credentials: SignInDto) {
        return this.authService.signIn(credentials);
    }

    @UseGuards(JwtGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout(@GetUser('id') user_id: number) {
        return this.authService.logout(user_id);
    }

    @UseGuards(JwtRefreshGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refreshToken(@GetUser('id') user_id: number, @GetUser('refresh_token') refresh_token: string) {
        return this.authService.refreshToken(user_id, refresh_token);
    }

    @HttpCode(HttpStatus.OK)
    @Post('/recovery/password')
    recoveryPassword(@Body() recovery: RecoveryPasswordDto) {
        return this.authService.recoveryPassword(recovery);
    }
}

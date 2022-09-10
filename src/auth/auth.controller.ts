import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

    @Post('signup')
    createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
      return this.authService.createUser(authCredentialsDto);
    }

    @Post('login')
    signin(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken:string}> {
      return this.authService.signIn(authCredentialsDto);
    }


}

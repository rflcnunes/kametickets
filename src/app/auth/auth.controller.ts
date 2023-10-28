import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthDto } from './dto/auth.dto';
import { ApiResponse } from 'src/common/api-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.CREATED,
      'User registered successfully',
      await this.authService.register(registerDto),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() { email, password }: AuthDto): Promise<ApiResponse> {
    return new ApiResponse(
      true,
      HttpStatus.OK,
      'User logged in successfully',
      await this.authService.login(email, password),
    );
  }
}

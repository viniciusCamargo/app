import { AuthService } from '@auth/auth.service';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from '@src/app.service';

export interface HelloWorld {
  [q: string]: string;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  private readonly logger = new Logger(AppService.name);

  @Get('hello')
  getHello(
    @Query('hello') hello: string,
    @Query('world') world: string,
  ): HelloWorld {
    return this.appService.getHello(hello, world);
  }

  @Post('auth/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.authService.login(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

import {
  Strategy,
  StrategyOptionsWithRequest,
} from 'passport-github2';

import { AuthService } from '@auth/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

const strategyOptions: StrategyOptionsWithRequest = {
  callbackURL: '/auth/github/callback',
  clientID: '36a63bf0e5befdf8f84f',
  clientSecret: '4931c30b175b6dc344d410b22a387cf6068bb8a4',
  passReqToCallback: true,
  scope: ['username', 'first_name', 'email'],
  tokenURL: '',
  userEmailURL: '',
};

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super(strategyOptions);
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  async logon(): Promise<any> {
    return await this.authService.logonGithub();
  }
}

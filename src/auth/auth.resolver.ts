import { Args, Query, Resolver } from '@nestjs/graphql';

import { AccessToken } from '@auth/models/auth.model';
import { AuthService } from '@auth/auth.service';
import { User } from '@users/models/user.model';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => AccessToken)
  loginUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    return this.authService.login(username, password);
  }

  @Query(() => AccessToken)
  logonGithub() {
    return this.authService.logonGithub();
  }
}

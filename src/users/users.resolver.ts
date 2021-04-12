import { CurrentUser } from '@auth/guards/gql-auth.guard';
import {
  Args,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import {
  NewUser,
  User,
} from '@users/models/user.model';
import { UsersService } from '@users/users.service';

@Resolver(() => User || NewUser)
// @UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async whoAmI(@CurrentUser() user: User): Promise<User> {
    return await this.usersService.findOneById(user.id);
  }

  @Query(() => User)
  async getUser(@Args('id') id: string): Promise<User> {
    return await this.usersService.findOneById(id);
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Mutation(() => NewUser)
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('password') email?: string,
  ): Promise<NewUser> {
    return await this.usersService.create({ username, password, email });
  }
}

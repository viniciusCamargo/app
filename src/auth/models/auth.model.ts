import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field({ nullable: true })
  accessToken: string;
}

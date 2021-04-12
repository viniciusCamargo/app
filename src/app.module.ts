import { getConnectionOptions } from 'typeorm';

import { AuthModule } from '@auth/auth.module';
import { AuthResolver } from '@auth/auth.resolver';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { User } from '@users/user.entity';
import { UsersModule } from '@users/users.module';
import { UsersResolver } from '@users/users.resolver';

async function dbFactory() {
  try {
    const connectionOptions = await getConnectionOptions();

    return {
      ...connectionOptions,
      autoLoadEntities: true,
      entities: [User],
      synchronize: true,
    };
  } catch (error) {
    console.error(error);
  }
}

@Module({
  controllers: [AppController],
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: dbFactory,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
      sortSchema: true,
    }),
  ],
  providers: [AppService, UsersResolver, AuthResolver],
})
export class AppModule {}

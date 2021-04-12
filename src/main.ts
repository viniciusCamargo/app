import * as helmet from 'helmet';

import { AppModule } from '@src/app.module';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    helmet({
      contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  await app.listen(3000);
}

bootstrap();

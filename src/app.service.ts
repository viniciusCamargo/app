import { HelloWorld } from '@src/app.controller';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(hello = 'hello', world = 'world'): HelloWorld {
    return { [hello]: world };
  }
}

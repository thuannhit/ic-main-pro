import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { SystemConfigModule } from './system-config.module';
import { ConfigService } from './services/config/config.service';
import { CGeneralExceptionFilter } from './exceptions/general-exception.filter'
async function bootstrap() {
  const port = (new ConfigService()).get('port')
  const app = await NestFactory.createMicroservice(SystemConfigModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port
    }
  } as TcpOptions);
  app.useGlobalFilters(new CGeneralExceptionFilter())
  await app.listenAsync().then(() => { console.log('systemconfig service is running at ' + port)});
}
bootstrap();

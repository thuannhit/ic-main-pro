import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';

import { CashManagementModule } from './cash-management.module';
import { ConfigService } from './services/config/config.service';
import { CGeneralExceptionFilter } from './exceptions/general-exception.filter'

async function bootstrap() {
  const port = (new ConfigService()).get('port')
  const app = await NestFactory.createMicroservice(CashManagementModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: port
    }
  } as TcpOptions);
  app.useGlobalFilters(new CGeneralExceptionFilter())
  await app.listenAsync().then(() => { console.log('cash management service is running at ' + port)});
}
bootstrap();

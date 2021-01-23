import { NestFactory } from '@nestjs/core';
import { Transport, TcpOptions } from '@nestjs/microservices';
import { DBConnModule } from './db-conn.module';
import { ConfigService } from './services/config/config.service';
import { CGeneralExceptionFilter } from './exceptions/general-exception.filter'
async function bootstrap() {
  const app = await NestFactory.createMicroservice(DBConnModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: (new ConfigService()).get('port')
    }
  } as TcpOptions);
  app.useGlobalFilters(new CGeneralExceptionFilter())
  await app.listenAsync();

}
bootstrap();

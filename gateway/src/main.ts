import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';
import { CGeneralExceptionFilter } from './exceptions/exception-filters/index'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({transform: true}));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  // app.use(csurf());
  const options = new DocumentBuilder()
    .setTitle('API dics')
    .addTag('users')
    .addTag('tasks')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  //Use Http Exception Filter
  app.useGlobalFilters(new CGeneralExceptionFilter());

  const port = app.get('ConfigService').get('port')
  await app.listen(port).then(() => { console.log(`gateway started at ${port}`) });
}
bootstrap();

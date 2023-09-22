import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { broker, groupId, clientId } from '../kafka-config.json';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: clientId,
        brokers: [broker],
      },
      consumer: {
        groupId: groupId
      },
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );
  
  // app.useGlobalFilters(
  //   new AllExceptionsFilter(),
  //   new DuplicateExceptionFilter()
  // );
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen();
}
bootstrap();
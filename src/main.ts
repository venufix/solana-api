import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const documentBuilder = new DocumentBuilder()
    .setTitle('Solana wallets dashbaord')
    .setDescription('Ahalan wa Salahan Ma ha shirlul')
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('', app, document);

  await app.listen(3000, '0.0.0.0');
}
bootstrap()

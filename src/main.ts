// npm run start:dev   // runs the code

// make the static folder available for app use
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//makes it a nest application
import{NestExpressApplication} from '@nestjs/platform-express';
//join is used to synthesize the directory path which will contain templates
import{join } from 'path';

//i need to use nunjucks as my render engine
import * as nunjucks from 'nunjucks';

async function bootstrap() {
  //creates a Nest application with espress preloaded
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //gets the express platform from Nest app
  const express = app.getHttpAdapter().getInstance();
  // get name views?
  const views = join(__dirname, '..', "views");
  //configure nunjucks
  nunjucks.configure(views,{express });
  //listens on server 
  const staticAssets = join(__dirname, '..', 'static'); 
  app.useStaticAssets(staticAssets);

  await app.listen(3000);

}
// starts the application
bootstrap();

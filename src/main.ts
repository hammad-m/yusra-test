import { NestFactory } from "@nestjs/core";
import type { NestFastifyApplication } from "@nestjs/platform-fastify";
import { FastifyAdapter } from "@nestjs/platform-fastify";
import { initializeTransactionalContext } from "typeorm-transactional";

import { AppModule } from "./app.module";

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter( { ignoreTrailingSlash: true, bodyLimit: 15 * 1024 * 1024 } ),
  );

  await app.listen( 3000 );
}
bootstrap();

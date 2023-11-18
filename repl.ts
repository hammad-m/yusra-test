import { repl } from "@nestjs/core";
import { initializeTransactionalContext } from "typeorm-transactional";

import { AppModule } from "./src/app.module";

async function bootstrap() {
  initializeTransactionalContext();

  const replServer = await repl( AppModule );

  replServer.setupHistory( ".repl_history", ( err, ) => {
    if( err ) {
      // eslint-disable-next-line
      console.error( err );
    }
  } );
}

bootstrap();

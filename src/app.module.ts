import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodoModule } from "./modules/todo/todo.module";

@Module( {
  imports: [
    TypeOrmModule.forRootAsync( {
      imports: [ ConfigModule ],
      inject: [ ConfigService ],
      useFactory: ( configService: ConfigService ) => ( {
        type: "postgres",
        ssl: true,
        url: configService.get( "DB_URL" ),
        logging: configService.get( "DB_LOGGING" ) === "true",
        entities: [ __dirname + "/**/*.entity{.ts,.js}" ],
        synchronize: configService.get( "DB_SYNCHRONIZATION" ) === "true",
        migrationsRun: configService.get( "MIGRATIONS_RUN" ) === "true",
      } ),

      async dataSourceFactory( options ) {
        if( ! options ) {
          throw new Error( "Invalid options passed" );
        }

        return addTransactionalDataSource( new DataSource( options ) );
      },
    } ),
    ConfigModule.forRoot( { isGlobal: true } ),
    EventEmitterModule.forRoot( { global: true } ),
    TodoModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
} )
export class AppModule {}

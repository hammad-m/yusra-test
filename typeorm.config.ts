import { ConfigModule, ConfigService } from "@nestjs/config";
import type { DataSourceOptions } from "typeorm";
import { DataSource } from "typeorm";

ConfigModule.forRoot();
const configService = new ConfigService();

export const ORMConfig = new DataSource( {
  type: "postgres",
  ssl: true,
  url: configService.get( "DB_URL" ),
  logging: configService.get( "DB_LOGGING" ) === "true",
  synchronize: configService.get( "DB_SYNCHRONIZATION" ) === "true",
  migrationsRun: configService.get( "MIGRATIONS_RUN" ) === "true",
  entities: [ __dirname + "/src/**/*.entity{.ts,.js}" ],
  migrations: [ __dirname + "/src/migrations/*{.ts,.js}" ],
} as DataSourceOptions );

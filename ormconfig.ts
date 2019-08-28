import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { ConfigModule } from './src/config/config.module';
import { ConfigService } from './src/config/config.service';

const configService: ConfigService = ConfigModule.forRoot({
  configPath: join(__dirname, 'config.json')
}).providers[0].useValue;

const config: ConnectionOptions = {
  ...configService.get('database'),

  synchronize: false,
  migrationsRun: true,
  logging: true,
  logger: 'file',

  // load from here
  migrations: [join(__dirname, 'migrations/**/*{.ts,.js}')],

  cli: {
    // create here
    migrationsDir: 'migrations'
  }
};

export = config;

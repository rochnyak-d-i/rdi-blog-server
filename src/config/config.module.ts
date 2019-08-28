import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';
import { getUserConfig } from './getUserConfig';
import schema from './schema';

export interface ConfigOptions {
  configPath?: string
};

@Global()
@Module({})
export class ConfigModule {
  static forRoot({configPath}: ConfigOptions) {
    const userConfig = getUserConfig(configPath);

    return {
      module: ConfigModule,

      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService(schema, userConfig)
        }
      ],

      exports: [ConfigService]
    };
  }
}

import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ServeStaticModule, SERVE_STATIC_MODULE_OPTIONS, DEFAULT_RENDER_PATH
} from '@nestjs/serve-static';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      configPath: join(__dirname, '..', 'config.json')
    }),

    { // REGISTER SERVE STATIC
      module: ServeStaticModule,
      providers: [
        {
          provide: SERVE_STATIC_MODULE_OPTIONS,
          useFactory: (configService: ConfigService) => ({
            rootPath: configService.get('static.rootPath'),
            renderPath: DEFAULT_RENDER_PATH
          }),
          inject: [ConfigService]
        }
      ]
    },

    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) =>({
        ...configService.get('database'),
        synchronize: false
      }),
      inject: [ConfigService]
    }),

    AuthModule,

    BlogModule,

    FileModule
  ]
})
export class AppModule {}

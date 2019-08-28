import { v1 as uuid } from 'uuid';
import { mkdir } from 'fs';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ConfigService } from '../config/config.service';
import { File } from './file.entity';
import { FileService } from './services/file/file.service';
import { FileFsService } from './services/fs/file.fs.service';
import { FileController } from './file.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const destination = configService.get('upload.destination');

        return {
          storage: diskStorage({
            destination,

            filename: (req, file, cb) => {
              const folder = uuid();
              const dest = join(destination, folder);

              mkdir(dest, {recursive: true}, error => {
                if (error) {
                  return cb(error);
                }

                cb(null, join(folder, file.originalname));
              });
            }
          })
        }
      },
      inject: [ConfigService]
    }),

    TypeOrmModule.forFeature([File])
  ],
  providers: [FileService, FileFsService],
  controllers: [FileController]
})
export class FileModule {}

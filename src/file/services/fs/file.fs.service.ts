import * as fs from 'fs';
import { join, sep } from 'path';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../../config/config.service';

@Injectable()
export class FileFsService {
  private readonly basePath: string;

  constructor(private readonly configService: ConfigService) {
    this.basePath = configService.get('upload.destination');
  }

  /**
   * Deletes file and his directories
   *
   * @param   {string}       relativeFilePath relative path to file
   *
   * @returns {Promise<any>}
   */
  async delete(relativeFilePath: string): Promise<any> {
    const absolutePath = join(this.basePath, relativeFilePath);

    const paths = relativeFilePath
      .split(sep)
      .reduce((collector: string[], path: string) => {
        const currentPath = collector.length === 0
          ? join(this.basePath, path)
          : join(collector[collector.length - 1], path);

        collector.push(currentPath);

        return collector;
      }, []);

    const promises: Promise<any>[] = paths.reverse()
      .map(async (path: string) => {
        const stat: fs.Stats = await fs.promises.stat(path);

        if (stat.isFile()) {
          await fs.promises.unlink(path);
        }
        else if (stat.isDirectory()) {
          await fs.promises.rmdir(path);
        }
      });

     await Promise.all(promises);
  }
}

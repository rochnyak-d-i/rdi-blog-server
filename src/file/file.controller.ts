import { relative } from 'path';
import {
  Controller,
  Get, Post, Delete,
  Req, Param,
  UseInterceptors,
  BadRequestException, NotFoundException,
  UploadedFile,
  UseGuards,
  ParseIntPipe
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { FileService } from './services/file/file.service';
import { FileFsService } from './services/fs/file.fs.service';
import { File } from './file.entity';
import { MimeTypes } from './mime-types.enum';

@Controller('upload')
@UseGuards(AuthGuard('jwt'))
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly fileFsService: FileFsService
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter(req, file, cb) {
      if (!Object.values(MimeTypes).includes(file.mimetype)) {
        req.fileValidationError = 'unsupported mime type';

        cb(null, false);
      }
      else {
        cb(null, true);
      }
    }
  }))
  async upload(@Req() req, @UploadedFile() file): Promise<File> {
    if (req.fileValidationError) {
      throw new BadRequestException(req.fileValidationError);
    }

    if (!file) {
      throw new BadRequestException('Invalid file');
    }

    const entityFile = Object.assign(new File(), {
      mime: file.mimetype,
      name: file.originalname,
      path: relative(file.destination, file.path),
      size: file.size
    });

    return this.fileService.save(entityFile);
  }

  @Get('/:id')
  async file(@Param('id', new ParseIntPipe()) id: number) {
    const file = this.fileService.findOne(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }

  @Delete('/:id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    const file = await this.fileService.findOne(id);

    if (!file) {
      throw new NotFoundException('File not found');
    }

    // TODO: transaction
    await this.fileService.delete(file);
    await this.fileFsService.delete(file.path);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from '../../file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  findAll(): Promise<File[]> {
    return this.fileRepository.find();
  }

  findOne(id: number): Promise<File> {
    return this.fileRepository.findOne(id);
  }

  save(file: File): Promise<File> {
    return this.fileRepository.save(file);
  }

  delete(file: File): Promise<any> {
    return this.fileRepository.delete(file);
  }
}

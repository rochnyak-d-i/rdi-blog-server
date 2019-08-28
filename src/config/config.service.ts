import { join, isAbsolute } from 'path';
import { lstatSync, mkdirSync } from 'fs';
import * as convict from 'convict';
import { Injectable } from '@nestjs/common';

const rootPath: string = join(__dirname, '..', '..');

/**
 * Normalize path in FS
 *
 * @param {String} value path to file/directory
 *
 * @return {String}
 */
function normalizePath(value) {
  if (!isAbsolute(value)) {
    value = join(rootPath, value);
  }

  return value;
}

/* directory path format */
convict.addFormat({
  name: 'path.directory',
  validate(value) {
    let stat;

    try {
      stat = lstatSync(value);
    }
    catch (error) {
      if (error.code === 'ENOENT') {
        mkdirSync(value, {recursive: true});
        stat = lstatSync(value);
      }
      else if (error.code === 'EACCES') {
        throw new Error(`No access to directory "${value}"`);
      }
      else {
        throw error;
      }
    }

    if (!stat.isDirectory()) {
      throw new Error(`"${value}" is not a directory`);
    }
  },
  coerce: normalizePath
});
/* file path format */
convict.addFormat({
  name: 'path.file',
  validate(value) {
    let stat;

    try {
      stat = lstatSync(value);
    }
    catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`The "${value}" file does not exists`);
      }

      if (error.code === 'EACCES') {
        throw new Error(`No access to file "${value}"`);
      }
    }

    if (!stat.isFile()) {
      throw new Error(`"${value}" is not a file`);
    }
  },
  coerce: normalizePath
});

@Injectable()
export class ConfigService {
  private readonly _config: convict.Config<any>;

  constructor(schema: convict.Schema<any>, userConfig: object = {}) {
    this._config = convict(schema);
    this._config.load(userConfig);
    this._config.validate({allowed: 'strict'});
  }

  /**
   * Return config param by key
   *
   * @param  {string}  key
   *
   * @returns {any}
   */
  get(key: string) {
    return this._config.get(key);
  }
}

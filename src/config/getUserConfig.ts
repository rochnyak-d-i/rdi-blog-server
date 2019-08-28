import * as fs from 'fs';

/**
 * loading and returns user configuration from json-file
 *
 * @param   {string} configPath path to file
 *
 * @returns {object}            parsed user configuration
 */
function _loadUserConfig(configPath: string): object {
  const jsonConfig = fs.readFileSync(configPath, {encoding: 'UTF-8'});

  return JSON.parse(jsonConfig);
}

/**
 * Returns user configuration from json-file
 *
 * @param   {string} configPath path to json file
 *
 * @returns {object}            user configuration
 */
export function getUserConfig(configPath: string): object {
  if (!configPath || !fs.existsSync(configPath)) {
    return {};
  }

  return _loadUserConfig(configPath) || {};
}

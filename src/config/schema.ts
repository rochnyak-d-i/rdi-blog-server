export default {
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },

  server: {
    host: {
      doc: 'The host address.',
      format: String,
      default: 'localhost',
      env: 'HOST',
    },
    port: {
      doc: 'The port to bind.',
      format: 'port',
      default: 8085,
      env: 'PORT'
    }
  },

  database: {
    type: {
      doc: 'Adapter type',
      format: [
        'mysql',
        'postgres',
        'cockroachdb',
        'mariadb',
        'sqlite',
        'cordova',
        'nativescript',
        'oracle',
        'mssql',
        'mongodb',
        'sqljs',
        'react-native'
      ],
      default: 'postgres',
      env: 'DB_TYPE'
    },
    host: {
      doc: 'DB host.',
      format: String,
      default: 'localhost',
      env: 'DB_HOST',
    },
    port: {
      doc: 'DB port.',
      format: 'port',
      default: 5432,
      env: 'DB_PORT'
    },
    username: {
      doc: 'DB user.',
      format: String,
      default: '',
      env: 'DB_USER'
    },
    password: {
      doc: 'DB password.',
      format: String,
      default: '',
      env: 'DB_PASSWORD'
    },
    database: {
      doc: 'DB name.',
      format: String,
      default: '',
      env: 'DB_NAME'
    },
    entities: {
      doc: 'Paths to entities (can include globs)',
      format: Array,
      default: ['src/**/*.entity{.ts,.js}'],
      env: 'DB_ENTITIES_PATHS'
    }
  },

  auth: {
    jwt: {
      secret: {
        doc: 'JWT secret',
        format: String,
        default: 'change me',
        env: 'AUTH_JWT_SECRET'
      },
      expires: {
        doc: 'JWT expires',
        format: String,
        default: '360s',
        env: 'AUTH_JWT_EXPIRES'
      }
    },

    admin: {
      id: {
        doc: 'ID for admin',
        format: Number,
        default: 1,
        env: 'AUTH_ADMIN_ID'
      },
      username: {
        doc: 'Admin name',
        format: String,
        default: 'Admin',
        env: 'AUTH_ADMIN_NAME'
      },
      password: {
        doc: 'Password for admin',
        format: String,
        default: 'change me',
        env: 'AUTH_ADMIN_PASS'
      }
    }
  },

  static: {
    rootPath: {
      doc: 'Path in fs to static files application',
      format: 'path.directory',
      default: 'public',
      env: 'STATIC_ROOT_PATH'
    }
  },

  upload: {
    destination: {
      doc: 'Path in fs to downloaded files',
      format: 'path.directory',
      default: 'public/uploads',
      env: 'UPLOAD_DESTINATION'
    },

    baseUrl: {
      doc: 'Base url to files',
      format: String,
      default: '/uploads/',
      env: 'UPLOAD_BASEURL'
    }
  }
};

import { Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import config from '../config/config';

const dbConfig = config[process.env.NODE_ENV || 'development'];

const sequelize = dbConfig.url
    ? new Sequelize(dbConfig.url, dbConfig)
    : new Sequelize(
          dbConfig.database,
          dbConfig.username,
          dbConfig.password,
          dbConfig
      );

export { Sequelize, sequelize };

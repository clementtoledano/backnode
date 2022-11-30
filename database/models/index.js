import { Sequelize } from 'sequelize';

import config from '../config/config';

// const basename = path.basename(__filename);
const config = config[process.env.NODE_ENV || 'development'];
// const db = {};


import getMessageModel from './message';
import getPostModel from './post';
import getUserModel from './user';



let sequelize;
if (config.url) {
  sequelize = new Sequelize(config.url, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   })
//   .forEach(file => {
//     const model = sequelize['import'](path.join(__dirname, file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

const models = {
  User: getUserModel(sequelize, Sequelize),
  Post: getPostModel(sequelize, Sequelize),
  Message: getMessageModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
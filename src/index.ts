import cors from 'cors';
import 'dotenv/config';
import express from 'express';

import { TestController } from './controllers/test.controller';
import { ExceptionsHandler } from './middlewares/exceptions.handler';
import { UnknownRoutesHandler } from './middlewares/unknownRoutes.handler';

import { sequelize } from '../database/models';


const port = (process.env.API_PORT || 3000) as number;
const host = process.env.API_HOST as string;

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware


app.use('/test', TestController);

app.get('/', (req, res) => res.send('🏠'));

app.all('*', UnknownRoutesHandler);

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler);

sequelize.sync().then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Example app listening on port ${process.env.PORT}!`),
    );
  });

  /**
   * On demande à Express d'ecouter les requêtes sur le port défini dans la config
   */
//   app.listen(port, () => log.info(`Server listing at http://${host}:${port}`));


import express from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import mongoose, { connect } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { dbConnection } from '@databases';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { Routes } from '@interfaces/routes.interface';
import { DB_HOST, NODE_ENV, PORT } from './config';

export default class App {
  public app: express.Application;
  public port: string | number;
  public env: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = PORT ?? 4231;
    this.env = NODE_ENV ?? 'development';

    this.initializeMiddlewares();
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectToDatabase();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`env ${this.env}`);
      logger.info(`🚀 App listening on the port ${this.port}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    mongoose.set('strictQuery', false);

    connect(dbConnection.url, dbConnection.options)
      .then(() => {
        console.log(`Successfully connected to database ${DB_HOST}`);
      })
      .catch(() => {
        console.log(`Failed to connected to database ${DB_HOST}`);
      });
  }

  private initializeMiddlewares() {
    this.app.use(morgan('combined', { stream }));
    this.app.use(cors({}));
    this.app.use(hpp());
    // this.app.use(
    //   helmet({
    //     crossOriginResourcePolicy: false,
    //   }),
    // );
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });

    this.app.use(express.static('images'));
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        components: {},
        info: {
          title: 'REST API',
          version: '1.0.0',
          description: 'Shopping app RESTful API',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }
}

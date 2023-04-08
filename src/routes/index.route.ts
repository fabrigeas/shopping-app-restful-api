import express, { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import path from 'path';

const pathToFrontend = path.join(__dirname, '../../frontend');

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const { router } = this;

    router.use(express.static('frontend/build'));
    router.get('/*', (_, res) => {
      res.sendFile(`${pathToFrontend}/build/index.html`);
    });
  }
}

export default IndexRoute;

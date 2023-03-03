import express from 'express';
import { Routes } from './interfaces/routes.interface';
export default class App {
    app: express.Application;
    env: string;
    port: string | number;
    constructor(routes: Routes[]);
    listen(): void;
    getServer(): express.Application;
    private connectToDatabase;
    private initializeMiddlewares;
    private initializeErrorHandling;
    private initializeRoutes;
    private initializeSwagger;
}

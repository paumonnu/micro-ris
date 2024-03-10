import express, { Request, Response, NextFunction, Router as ExpressRouter } from 'express';
import ProtectRouteMiddleware from '@middleware/ProtectRouteMiddleware.js';

class Router {
  router: ExpressRouter;
  protected: boolean;
  // middleware: Array<Middlewazre>;

  constructor() {
    this.router = express.Router();
    this.protected = false;
    // this.middleware = [];
  }

  protected registerRoutes(): Router {
    if (this.protected) {
      this.router.use(new ProtectRouteMiddleware().handle);
    }

    return this;
  }
}

export default Router;

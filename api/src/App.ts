import express, { Application, Request, Response } from 'express';

import NotificationsRouter from '@routers/NotificationsRouter.js';
import Cli from '@cli/Cli.js';

class App {
  public cli: Cli;
  public express: Application;

  constructor() {
    this.cli = new Cli();
    this.express = express();

    this.init();
  }

  public init(): void {
    // Express configuration
    this.express.set('port', process.env.PORT || 8080);

    this.registerMiddleware();
    this.registerRoutes();
  }

  // Registers global route middlewares
  private registerMiddleware(): void {
    // this.express.use(bodyParser.json());
    // this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Registers all api routes
  private registerRoutes(): void {
    // Resource routes
    const notificationsRouter = new NotificationsRouter();
    this.express.use(notificationsRouter.registerRoutes().router);
  }

  // Start listening
  public start(): void {
    this.express.listen(this.express.get('port'), () => {
      console.log(`Server listening in port ${this.express.get('port')}`);
    });
  }
}

export default App;

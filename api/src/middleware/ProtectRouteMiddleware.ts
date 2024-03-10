import { Request, Response, NextFunction } from 'express';
import Middleware from '@middleware/Middleware.js';

class ProtectRouteMiddleware extends Middleware {
  public handle(req: Request, res: Response, next: NextFunction) {
    console.log('Protected');
    next();
  }
}

export default ProtectRouteMiddleware;

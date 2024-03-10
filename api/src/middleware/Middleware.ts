import { Request, Response, NextFunction } from 'express';

abstract class Middleware {
  constructor() {}

  abstract handle(req: Request, res: Response, next: NextFunction): void;
}

export default Middleware;

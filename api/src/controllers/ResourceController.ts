import { Request, Response } from 'express';
import Controller from '@controllers/Controller.js';
import Middleware from '@middleware/Middleware.js';

abstract class ResourceController extends Controller {
  constructor() {
    super();
  }

  fetch = async (req: Request, res: Response, next: Function) => {
    console.log('Fetch');
    res.send('Fetch');
  };

  fetchOne = async (req: Request, res: Response, next: Function) => {
    console.log('Fetch One');
    res.send('Fetch One');
  };

  create = async (req: Request, res: Response, next: Function) => {
    console.log('Create');
    res.send('Create');
  };

  update = async (req: Request, res: Response, next: Function) => {
    console.log('Update');
    res.send('Update');
  };

  delete = async (req: Request, res: Response, next: Function) => {
    console.log('Delete');
    res.send('Delete');
  };
}

export default ResourceController;

import Router from '@routers/Router.js';
import ResourceController from '@controllers/ResourceController.js';
import Middleware from '@middleware/Middleware.js';

export interface CrudOps {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

abstract class ResourceRouter extends Router {
  // Base uri path of this resource
  resourceUri: string;

  // Allowed CRUD operations on this resource
  crudOps: CrudOps;

  // Controller of this resource
  controller: ResourceController;

  constructor() {
    super();

    this.protected = true;
    this.crudOps = {
      create: true,
      read: true,
      update: true,
      delete: true,
    };
  }

  public registerRoutes(): ResourceRouter {
    super.registerRoutes();

    if (this.crudOps.read) {
      this.router.route(`/${this.resourceUri}`).get(this.controller.fetch);
      this.router.route(`/${this.resourceUri}/:id`).get(this.controller.fetchOne);
    }

    if (this.crudOps.create) {
      this.router.route(`/${this.resourceUri}`).post(this.controller.create);
    }

    if (this.crudOps.update) {
      this.router.route(`/${this.resourceUri}/:id`).put(this.controller.update);
    }

    if (this.crudOps.delete) {
      this.router.route(`/${this.resourceUri}`).delete(this.controller.delete);
    }

    return this;
  }
}

export default ResourceRouter;

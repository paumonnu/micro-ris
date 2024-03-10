import NotificationsController from '@controllers/NotificationsController.js';
import ResourceRouter from '@routers/ResourceRouter.js';

class NotificationRouter extends ResourceRouter {
  constructor() {
    super();

    this.resourceUri = 'notifications';
    this.controller = new NotificationsController();
  }
}

export default NotificationRouter;

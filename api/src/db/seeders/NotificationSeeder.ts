import db from '@db/db.js';
import ResourceSeeder from '@db/seeders/ResourceSeeder.js';
import { NewNotification } from '@db/schemas/Notification.js';
import { faker } from '@faker-js/faker';

class NotificationSeeder extends ResourceSeeder {
  protected async resourceFactory(): Promise<any> {
    const notification: NewNotification = {
      title: `New study on ${faker.person.fullName()}`,
      description: faker.lorem.text(),
    };

    return await db.insertInto('notification').values(notification).executeTakeFirst();
  }
}

export default NotificationSeeder;

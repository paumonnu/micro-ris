import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { hashPassword } from '@/src/utils/auth';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    event.entity.password = await hashPassword(event.entity.password);
    event.entity.passwordChangedAt = new Date();
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    await Promise.all(
      event.updatedColumns.map(async (column) => {
        if (column.databaseName == 'password') {
          event.entity.password = await hashPassword(event.entity.password);
          event.entity.passwordChangedAt = new Date();
        }
      }),
    );
  }
}

import { Permission } from '@/src/api/permissions/entities/permission.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Permission, (faker) => {
  const permission = new Permission();

  permission.name = faker.lorem.word();

  return permission;
});

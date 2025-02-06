import { Permission } from '@/src/api/permissions/entities/permission.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Permission, async (faker) => {
  const permission = new Permission();

  permission.name = '';
  permission.description = '';

  return permission;
});

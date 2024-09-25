import { setSeederFactory } from 'typeorm-extension';
import { Role } from '@/src/api/roles/entities/role.entity';

export default setSeederFactory(Role, async (faker) => {
  const role = new Role();
  role.name = faker.lorem.word();

  return role;
});

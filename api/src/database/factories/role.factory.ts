import { Role } from '@/src/api/roles/entities/role.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(Role, (faker) => {
  const role = new Role();
  role.name = faker.lorem.word();

  return role;
});

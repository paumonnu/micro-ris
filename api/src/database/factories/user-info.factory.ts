import { UserInfo } from '@/src/api/users/entities/user-info.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserInfo, (faker) => {
  const info = new UserInfo();

  info.firstName = faker.person.firstName();
  info.lastName = faker.person.lastName();

  return info;
});

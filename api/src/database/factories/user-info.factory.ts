import { UserInfo } from '@/src/api/users/entities/user-info.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(UserInfo, async (faker) => {
  const userInfo = new UserInfo();

  userInfo.firstName = faker.person.firstName();
  userInfo.lastName = faker.person.lastName();

  return userInfo;
});

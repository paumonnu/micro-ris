import { User } from '@/src/api/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';

export default setSeederFactory(User, (faker) => {
  const user = new User();

  user.email = faker.internet.email().toLowerCase();
  user.password = '6mahoney9!';

  return user;
});

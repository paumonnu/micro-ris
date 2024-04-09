import { hash } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../../resources/users/entities/user.entity';

export default setSeederFactory(User, async (faker) => {
  const user = new User();

  user.email = faker.internet.email().toLowerCase();
  user.password = faker.internet.password();

  return user;
});

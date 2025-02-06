import { hash } from 'bcrypt';
import { User } from '../../api/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '@/src/api/roles/entities/role.entity';
import { UserInfo } from '@/src/api/users/entities/user-info.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = await factoryManager.get(User);
    const userInfoFactory = await factoryManager.get(UserInfo);
    const rolesRepo = dataSource.getRepository(Role);
    const roles = await rolesRepo.find();

    const adminRole = roles.find((role) => role.name == 'Admin');
    const otherRoles = roles.filter((role) => role.name != 'Admin');

    await userFactory.save({
      email: 'pau@gmail.com',
      password: '6Mahoney9!',
      role: adminRole,
      info: await userInfoFactory.save({
        firstName: 'Pau',
        lastName: 'Monserrat',
      }),
    });

    for (let i = 0; i < 250; i++) {
      await userFactory.save({
        role: otherRoles[Math.floor(Math.random() * otherRoles.length)],
        info: await userInfoFactory.save(),
      });
    }
  }
}

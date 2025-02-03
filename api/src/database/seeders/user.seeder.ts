import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '@/src/api/roles/entities/role.entity';
import { User } from '@/src/api/users/entities/user.entity';
import { UserInfo } from '@/src/api/users/entities/user-info.entity';

export default class UserSeeder implements Seeder {
  /**
   * Track seeder execution.
   *
   * Default: false
   */
  track = false;

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const rolesRepo = dataSource.manager.getRepository(Role);
    const roles = await rolesRepo.find();

    const adminRole = roles.find((role) => role.name == 'Admin');
    const otherRoles = roles.filter((role) => role.name != 'Admin');

    await factoryManager.get(User).save({
      email: 'pau@gmail.com',
      password: '6Mahoney9!',
      role: adminRole,
      info: await factoryManager.get(UserInfo).save(),
    });

    for (let i = 0; i < 250; i++) {
      await factoryManager.get(User).save({
        role: otherRoles[Math.floor(Math.random() * otherRoles.length)],
        info: await factoryManager.get(UserInfo).save(),
      });
    }
  }
}

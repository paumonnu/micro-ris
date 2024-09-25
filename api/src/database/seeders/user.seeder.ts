import { hash } from 'bcrypt';
import { User } from '../../api/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '@/src/api/roles/entities/role.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userFactory = await factoryManager.get(User);
    const rolesRepo = dataSource.getRepository(Role);
    const roles = await rolesRepo.find();

    const adminRole = roles.find((role) => role.name == 'Admin');
    const otherRoles = roles.filter((role) => role.name != 'Admin');

    await userFactory.save({
      email: 'pau@gmail.com',
      password: '6Mahoney9!',
      role: adminRole,
    });

    await userFactory.saveMany(250, {
      role: otherRoles[Math.floor(Math.random() * otherRoles.length)],
    });
  }
}

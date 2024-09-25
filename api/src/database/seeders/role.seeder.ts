import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '@/src/api/roles/entities/role.entity';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleFactory = await factoryManager.get(Role);

    await roleFactory.save({
      name: 'Admin',
    });

    await roleFactory.save({
      name: 'Client',
    });
  }
}

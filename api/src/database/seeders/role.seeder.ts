import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '@/src/api/roles/entities/role.entity';
import { Permission } from '@/src/api/permissions/entities/permission.entity';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleFactory = await factoryManager.get(Role);
    const permissionRepo = dataSource.getRepository(Permission);

    await roleFactory.save({
      name: 'Admin',
      permissions: await permissionRepo.find(),
    });

    await roleFactory.save({
      name: 'Client',
    });
  }
}

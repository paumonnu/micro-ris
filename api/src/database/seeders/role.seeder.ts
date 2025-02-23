import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Role } from '@/src/api/roles/entities/role.entity';
import { Permission } from '@/src/api/permissions/entities/permission.entity';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const roleFactory = factoryManager.get(Role);
    const permissionRepo = dataSource.getRepository(Permission);

    const permissions = await permissionRepo.find();

    await roleFactory.save({
      name: 'Admin',
      permissions: permissions,
    });

    await roleFactory.save({
      name: 'Client',
    });
  }
}

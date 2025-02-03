import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Permission } from '@/src/api/permissions/entities/permission.entity';

export default class PermissionSeeder implements Seeder {
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
    const permissionFactory = factoryManager.get(Permission);

    const usersManagePermission = await permissionFactory.save({
      name: 'resources.users.manage',
    });

    const rolesManagePermission = await permissionFactory.save({
      name: 'resources.roles.manage',
    });

    const permissionManagePermission = await permissionFactory.save({
      name: 'resources.permissions.manage',
    });
  }
}

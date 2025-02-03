import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from '@/src/api/roles/entities/role.entity';
import userFactory from '../factories/user.factory';
import { Permission } from '@/src/api/permissions/entities/permission.entity';

export default class RoleSeeder implements Seeder {
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
    const roleFactory = factoryManager.get(Role);

    const permissionsRepository = dataSource.manager.getRepository(Permission);

    await roleFactory.save({
      name: 'Admin',
      permissions: await permissionsRepository.find(),
    });

    await roleFactory.save({
      name: 'Client',
    });
  }
}

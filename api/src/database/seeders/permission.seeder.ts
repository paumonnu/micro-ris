import { Permission } from '@/src/api/permissions/entities/permission.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const permissionFactory = await factoryManager.get(Permission);

    await permissionFactory.save({
      name: 'resources.users.read',
    });

    await permissionFactory.save({
      name: 'resources.users.create',
    });

    await permissionFactory.save({
      name: 'resources.users.update',
    });

    await permissionFactory.save({
      name: 'resources.users.delete',
    });

    await permissionFactory.save({
      name: 'resources.users.test',
    });
  }
}

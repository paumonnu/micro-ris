import { Permission } from '@/src/api/permissions/entities/permission.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class PermissionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const permissionFactory = await factoryManager.get(Permission);

    const permissionCrudHandlers = [
      'getManyBase',
      'getOneBase',
      'createOneBase',
      'createManyBase',
      'updateOneBase',
      'replaceOneBase',
      'deleteOneBase',
      'recoverOneBase',
    ];

    const crudResources = [
      'users',
      'roles',
      'permissions',
      'roles.relations.permissions',
    ];

    for (let i = 0; i < crudResources.length; i++) {
      for (let j = 0; j < permissionCrudHandlers.length; j++) {
        await permissionFactory.save({
          name: `resources.${crudResources[i]}.${permissionCrudHandlers[j]}`,
        });
      }
    }
  }
}

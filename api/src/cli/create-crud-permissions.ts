import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { Command, CommandRunner, Option } from 'nest-commander';
import { DataSource, EntityManager } from 'typeorm';

interface CommandOptions {
  clean?: boolean;
}

@Command({
  name: 'test',
  description: 'Add and/or clean resource permissions to database',
})
export class CommandCreateCrudPermissions extends CommandRunner {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {
    super();
  }

  async run(inputs: string[], options: CommandOptions): Promise<void> {}

  @Option({
    flags: '-c, --clean',
    description: 'Clean unused permissions',
  })
  parseClean(val: boolean) {
    return val;
  }
}

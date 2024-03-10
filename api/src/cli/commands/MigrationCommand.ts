import db from '@db/db.js';
import { Command } from 'commander';
import { MigrationResult } from 'kysely';
import chalk from 'chalk';
import Migrator from '@db/Migrator.js';

class MigrationCommand extends Command {
  migrator: Migrator;
  allowedCommands: string[];

  constructor() {
    super('db:migrate');

    this.migrator = new Migrator();
    this.allowedCommands = ['latest', 'rollback', 'up', 'list'];

    this.description('Migrate latest migrations');
    this.argument('<action>', `Action to perform. Valid actions are ${this.allowedCommands.join(', ')}`);

    this.action(this.exec);
  }

  exec = async () => {
    const action = String(this.args[0]);

    if (!this.allowedCommands.includes(action)) {
      console.error(chalk.red(`Migration command "${action}" not recognized`));
    }

    if (action == 'latest') {
      await this.migrator.migrate();
    } else if (action == 'rollback') {
      await this.migrator.rollback();
    } else if (action == 'up') {
      await this.migrator.up();
    } else if (action == 'list') {
      await this.migrator.list();
    }
  };
}

export default MigrationCommand;

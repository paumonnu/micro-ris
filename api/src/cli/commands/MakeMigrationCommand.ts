import { Command } from 'commander';
import { promises as fs } from 'fs';
import path from 'path';
import moment from 'moment';
import Migrator from '@db/Migrator.js';

class MakeMigrationCommand extends Command {
  migrator: Migrator;

  constructor() {
    super('make:migration');

    this.migrator = new Migrator();

    this.argument('name', 'Name of the migration');
    this.description('Create a new migration file');

    this.action(this.exec);
  }

  exec = async () => {
    await this.migrator.newTemplate(this.args[0]);
  };
}

export default MakeMigrationCommand;

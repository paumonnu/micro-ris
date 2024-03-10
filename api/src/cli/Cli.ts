import { Command } from 'commander';
import MigrationCommand from '@cli/commands/MigrationCommand.js';
import MakeMigrationCommand from '@cli/commands/MakeMigrationCommand.js';
import DatabaseSeedCommand from './commands/DatabaseSeedCommand.js';

class Cli {
  private commander: Command;

  constructor() {
    this.commander = new Command();

    this.commander.name('notify-app-cli');
    this.commander.description('Notiffy App CLI');
    this.commander.version('0.1.0');
    this.commander.option('--cli', 'Runs the cli, can be ignored');

    this.commander.addCommand(new DatabaseSeedCommand());
    this.commander.addCommand(new MigrationCommand());
    this.commander.addCommand(new MakeMigrationCommand());
  }

  exec() {
    this.commander.parse();
  }
}

export default Cli;

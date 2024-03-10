import { Command } from 'commander';
import NotificationSeeder from '@db/seeders/NotificationSeeder.js';

class DatabaseSeedCommand extends Command {
  constructor() {
    super('db:seed');
    this.description('Seed database with sample data');
    // this.argument('<string>', 'string to split');
    // this.option('--first', 'display just the first substring');
    // this.option('-s, --separator <char>', 'separator character', ',');

    this.action(this.exec);
  }

  exec = async () => {
    const notificationSeeder = new NotificationSeeder();

    await notificationSeeder.seed(10);
  };
}

export default DatabaseSeedCommand;

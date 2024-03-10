import { Migrator as KyselyMigrator, FileMigrationProvider, MigrationResult } from 'kysely';
import { promises as fs } from 'fs';
import chalk from 'chalk';
import path from 'path';
import db from '@db/db.js';
import moment from 'moment';

class Migrator {
  kyselyMigrator: KyselyMigrator;
  migrationFolder: string;

  constructor() {
    this.migrationFolder = path.join(process.env.PWD!, 'src/db/migrations');

    this.kyselyMigrator = new KyselyMigrator({
      db,
      provider: new FileMigrationProvider({
        fs,
        path,
        migrationFolder: this.migrationFolder,
      }),
    });
  }

  newTemplate = async (fileName: string) => {
    const migrationsPath: string = this.migrationFolder;
    const timestamp: string = moment().format('YYYYMMDDhhmmss');
    const filePath = path.join(migrationsPath, `${timestamp}-${fileName}.ts`);

    const content: string = `import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
}
`;

    await fs.writeFile(filePath, content, { encoding: 'utf-8', flag: 'wx' });
  };

  list = async () => {
    console.log(chalk.bgCyan(' Migrations list \n'));
    const results = await this.kyselyMigrator.getMigrations();

    results?.forEach((it) => {
      const time = moment(it.executedAt).format(' YYYY-MM-DD hh:mm:ss ');
      console.log(`${it.executedAt ? chalk.green('✔') : chalk.red('❌')} ${chalk.red(time)} ${chalk.yellow(it.name)}`);
    });

    await db.destroy();
  };

  migrate = async () => {
    console.log(chalk.bgCyan(' Migrate to latest \n'));
    const { error, results } = await this.kyselyMigrator.migrateToLatest();
    this.showMigrationResults(results, error);
    await db.destroy();
  };

  up = async () => {
    console.log(chalk.bgCyan(' Migrate up \n'));
    const { error, results } = await this.kyselyMigrator.migrateUp();
    this.showMigrationResults(results, error);
    await db.destroy();
  };

  // to = async () => {
  //   console.log(chalk.bgCyan(' Migrate to \n'));
  //   const { error, results } = await this.kyselyMigrator.migrateTo();
  //   this.showMigrationResults(results, error);
  //   await db.destroy();
  // };

  rollback = async () => {
    console.log(chalk.bgCyan(' Rollback \n'));
    const { error, results } = await this.kyselyMigrator.migrateDown();
    this.showMigrationResults(results, error);
    await db.destroy();
  };

  private showMigrationResults = (results?: MigrationResult[], error?: unknown) => {
    if (results) {
      results?.forEach((it) => {
        if (it.status === 'Success') {
          console.log(
            `${chalk.green('✔')} ${chalk.magenta(it.migrationName)} was executed ${chalk.green('succesfully')}`,
          );
        } else if (it.status === 'Error') {
          console.error(`${chalk.green('❌')} Failed to execute "${chalk.magenta(it.migrationName)}"`);
        }
      });
    }

    if (error) {
      console.error(error);
      process.exit(1);
    }
  };
}

export default Migrator;

import { CommandFactory } from 'nest-commander';

async function bootstrap() {
  await CommandFactory.run(CliModule, ['warn', 'error']);
}
bootstrap();

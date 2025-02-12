import { Module } from '@nestjs/common';
import { CommandCreateCrudPermissions } from './create-crud-permissions';
import { AppModule } from '../app.module';

@Module({
  providers: [CommandCreateCrudPermissions],
  imports: [AppModule],
})
export class CliModule {}

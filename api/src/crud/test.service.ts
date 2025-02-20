import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDServiceFactory } from './crud-factory.service';
import { User } from '../api/users/entities/user.entity';

@Injectable()
export class TestService extends CRUDServiceFactory<User>() {
  constructor(
    @InjectRepository(User)
    protected readonly repository: Repository<User>,
  ) {
    super(repository);
  }
}

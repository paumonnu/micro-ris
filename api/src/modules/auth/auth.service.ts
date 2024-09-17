import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../resources/users/entities/user.entity';
import { Repository } from 'typeorm';
import { compareHash } from '@/src/common/utils/auth';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    protected readonly userRepository: Repository<User>,
  ) {}

  async generateNewUserToken(email, password) {
    const user = await this.userRepository.findOneBy({ email: email });
    const isCorrectCredentials = await compareHash(password, user.password);
  }
}

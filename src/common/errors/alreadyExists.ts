import { ConflictException } from '@nestjs/common';

export class AlreadyExists extends ConflictException {
  constructor() {
    super('Already exists!');
  }
}

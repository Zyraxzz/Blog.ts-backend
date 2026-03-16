import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserRepository } from 'src/user/repositories/user.repository';
import { ImageService } from 'src/common/upload/image.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, ImageService],
  exports: [UserService, UserRepository],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, RoleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    RoleModule,
    PostModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

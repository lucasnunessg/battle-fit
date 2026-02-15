import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MY_SQL_DATABASE_HOST,
      port: Number(process.env.MY_SQL_DATABASE_PORT),
      username: process.env.MY_SQL_DATABASE_USERNAME,
      password: process.env.MY_SQL_DATABASE_PASSWORD,
      database: process.env.MY_SQL_DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule {}

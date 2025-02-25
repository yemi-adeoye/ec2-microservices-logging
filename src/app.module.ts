import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from './app.entity'
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';
import 'dotenv/config';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'logging.db.sqlite',
    entities: [Logs],
    synchronize: true
  }), TypeOrmModule.forFeature([Logs]), ScheduleModule.forRoot(),
  ClientsModule.register([{
    name: 'REDIS-LOGGING-CLIENT',
    transport: Transport.REDIS,
    options: { host: '127.0.0.1', port: 6379, password: process.env.REDIS_PASSWORD }
  }])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}

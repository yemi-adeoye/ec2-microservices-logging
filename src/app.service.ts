import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/TypeOrm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { Logs } from './app.entity';
import { ClientProxy } from '@nestjs/microservices';
import 'dotenv/config'

@Injectable()
export class AppService implements OnModuleInit {

  private readonly logger = new Logger(AppService.name)

  private redisClient;

  constructor(@InjectRepository(Logs) private logRepository: Repository<Logs>) {

  }

  onModuleInit() {
    this.redisClient = new Redis({ password: process.env.REDIS_PASSWORD, stringNumbers: true })
    // this.redisClient.defineCommand('replyOption', 'json')
  }

  async getAllLogs(): Promise<Logs[]> {
    const count = await this.logRepository.count();

    const offset = count - 20;

    return this.logRepository.find({ take: 20, skip: offset })
  }

  async getUserLogs(username: string): Promise<Logs[]> {
    const count = await this.logRepository.count();

    const offset = count - 20;

    return this.logRepository.find({ where: { user: username }, take: 20, skip: offset })
  }

  @Cron('45 * * * * *')
  async readAndProcessLogs() {

    try {
      this.redisClient.hgetall('api.gateway.ms')
        .then((data) => {
          for (let hash of Object.values(data)) {

          }
        })

    } catch (error) {
      this.logger.error(error)
    }




  }

  save(log: Logs) {
    this.logRepository.save(log)
  }



}

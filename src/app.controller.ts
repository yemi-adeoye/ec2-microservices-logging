/* eslint-disable prettier/prettier */
import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Logs } from './app.entity';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('logs')
export class AppController {

  private readonly logger = new Logger(AppController.name)

  constructor(private readonly appService: AppService) { }

  @Get('/')
  async getAllLogs() {
    const logs = await this.appService
      .getAllLogs()
    return logs
  }

  @Get('/:username')
  async getUserLogs() {
    const logs = await this.appService.getAllLogs();
    return logs
  }

  @MessagePattern('logging-notifications')
  readNotifications(@Payload() log: any): void {
    this.logger.log(log)
    this.appService.save({ ...log })
  }

}

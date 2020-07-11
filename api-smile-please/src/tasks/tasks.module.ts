import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ServiceModule } from '../services/services.module';
@Module({
  imports: [ServiceModule],
  providers: [TasksService],
})
export class TasksModule {}

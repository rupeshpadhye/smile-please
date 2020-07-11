import { CacheModule, Module, CacheInterceptor } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './controllers/app.controller';
import { TasksModule } from './tasks/tasks.module';
import { ServiceModule } from './services/services.module';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    CacheModule.register(),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    ServiceModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

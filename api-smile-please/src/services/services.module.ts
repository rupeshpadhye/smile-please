import { Module, HttpModule } from '@nestjs/common';
import { MemesDataServices } from './memes.data.service';
import { FirebaseService } from './firebase.service';
import { AppService } from './app.service';

@Module({
  imports: [HttpModule],
  providers: [FirebaseService, MemesDataServices,AppService],
  exports: [FirebaseService,MemesDataServices,AppService],
})
export class ServiceModule {}

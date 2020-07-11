import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { MemesDataServices } from '../services/memes.data.service';
import { FirebaseService } from '../services/firebase.service';
import { AppService } from 'src/services/app.service';
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly memesDataService: MemesDataServices,
    private readonly firebaseService: FirebaseService,
    private readonly appService:AppService
    ) {}
 
  private loadImages = async () => {
    let [
      {
        darkHumourImages,
        funnyImages,
        gagsTrending,
        adultImages
      },
      {
        trendingImagesInDay,
        randomImages
      },
    ] = await Promise.all([
      this.memesDataService.load9gagsImages(),
      this.memesDataService.loadImgurMemes(),
    ]);
    
    const date = new Date().getTime();
    this.logger.log(`
    ***************************************************************
            funnyImages - ${funnyImages.length}
            darkHumourImages - ${darkHumourImages.length}
            adultImages- ${adultImages.length}
            gagsTrending- ${gagsTrending.length}
            trendingImagesInDay - ${trendingImagesInDay.length}
            randomImages - ${randomImages.length}
    ***************************************************************
                Date -  ${date}      
    ***************************************************************
  `)
    await this.firebaseService.save({
        images: {
          date,
          funnyImages,
          darkHumourImages,
          trendingImagesInDay: [...gagsTrending,...trendingImagesInDay],
          randomImages,
          adultImages,
        },
      });
    await this.appService.getMemes();  
  }

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  async handleImgurCron() {
    try {
      this.logger.log(`Cron Job - ${new Date()} data load task started.`);
      this.loadImages();
      this.logger.log(`Cron Job - ${new Date()} data load task completed.`);
    } catch (e) {
      this.logger.error(e);
    }
  }

  @Timeout(10)
  async startupLoadMemeCron() {
    try {
      this.logger.log(`App Start - ${new Date()} data load task started.`);
      this.loadImages();
      this.logger.log(`App Start - ${new Date()} data load task completed.`);
    } catch (e) {
      this.logger.error(e);
    }
  }
}

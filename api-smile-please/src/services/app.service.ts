import { Injectable, CacheTTL, Logger } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Injectable()
export class AppService {
 
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly firebaseService: FirebaseService) {}

  @CacheTTL(15)
  async getMemes() {
  try {
    const data = await this.firebaseService.get('images');
    const { trendingImagesInDay ,randomImages,funnyImages, darkHumourImages,adultImages,date } = data;
      return {
        imageStore: [
          {
            title: 'Trending',
            key:'trending',
            memes: trendingImagesInDay,
            includeInAll: true,
          },
          { 
            title: 'Dark Humour',
            key:'darkHumour',
            memes: darkHumourImages,
            includeInAll: true,
          },
          {
            title: 'Funny',
            key: 'funny',
            memes: funnyImages,
            includeInAll: true,
          },
          {
            title: 'Random',
            key:'random',
            memes: randomImages,
            includeInAll: true,
          },
          {
            title: 'Adult',
            key:'adult',
            memes: adultImages,
            includeInAll: false,
          }
        ],
        date
      };
    } catch(e) {
      this.logger.error(e);
    }
  }
}

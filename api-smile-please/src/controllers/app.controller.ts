import {
  Controller,
  Get,
  CACHE_MANAGER,
  Inject,
  Param,
} from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('/smile-please')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager,
  ) {}

  @Get()
  getImages(): any {
    return this.appService.getMemes();
  }
}

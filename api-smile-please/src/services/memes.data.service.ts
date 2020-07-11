import { Injectable,Logger } from '@nestjs/common';
import { getRelevantImages, parseAndGetImage } from '../utils';
import fetch from 'node-fetch';
import { random, get } from 'lodash';

const Parser = require('rss-parser');
const parser = new Parser();

export interface NineGagStore
{
  darkHumourImages: [],
  funnyImages: [],
  gagsTrending: [],
  adultImages: [] 
}

export interface NineGagStore
{
  darkHumourImages: [],
  funnyImages: [],
  gagsTrending: [],
  adultImages: [] 
}
export interface ImgurStore {trendingImagesInDay: [],randomImages: [] }
@Injectable()
export class MemesDataServices {

  private readonly logger = new Logger(MemesDataServices.name);

  async loadImgurMemes(): Promise<ImgurStore> {
    try {
      const FUNNY_BASE_URL = process.env.IMGUR_BASE_URL + 'funny';
      const randomPageNo = random(process.env.PAGE_START, process.env.PAGE_END);
      const FUNNY_BASE_RANDOM_PAGE_URL =
        FUNNY_BASE_URL + `/hot/viral/${randomPageNo}/day`;
      const [trendingImgResp, randomImgResp] = await Promise.all([
        fetch(FUNNY_BASE_URL, {
          headers: {
            Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_API_KEY,
          },
        }),
        fetch(FUNNY_BASE_RANDOM_PAGE_URL, {
          headers: {
            Authorization: 'Client-ID ' + process.env.IMGUR_CLIENT_API_KEY,
          },
        }),
      ]);
      const {
        data: { items: trendingImagesInDay },
      } = await trendingImgResp.json();

      const {
        data: { items: randomImages },
      } = await randomImgResp.json();

     this.logger.log(`At  ${new Date()} imgur image load completed.`);  

     return {
        trendingImagesInDay: getRelevantImages(trendingImagesInDay),
        randomImages: getRelevantImages(randomImages),
      };
    } catch (e) {
      console.error(e);
    }
  }

  async load9gagsImages(): Promise<NineGagStore> {
    const [darkHumourResp, funnyImagesResp,trendingImgResp, adultImageResp] = 
    await Promise.all([
      parser.parseURL(
        'https://9gag-rss.com/api/rss/get?code=9GAGDarkHumorNoGif&format=2',
      ),
      parser.parseURL(
        'https://9gag-rss.com/api/rss/get?code=9GAGFunnyNoGif&format=2',
      ),
      parser.parseURL(
        'https://9gag-rss.com/api/rss/get?code=9GAGNoGif&format=2',
      ),
      parser.parseURL(
        'https://9gag-rss.com/api/rss/get?code=9GAGNSFW&format=2',
      ),
    ]);

    const darkHumourImages = get(darkHumourResp, 'items', []).map(f => ({
      title: f.title,
      id: f.guid,
      ...parseAndGetImage(f.content),
    }));
    const funnyImages = get(funnyImagesResp, 'items', []).map(f => ({
      title: f.title,
      id: f.guid,
      ...parseAndGetImage(f.content),
    }));

    const gagsTrending = get(trendingImgResp, 'items', []).map(f => ({
      title: f.title,
      id: f.guid,
      ...parseAndGetImage(f.content),
    }));

    const adultImages = get(adultImageResp, 'items', []).map(f => ({
      title: f.title,
      id: f.guid,
      ...parseAndGetImage(f.content),
    }));

    this.logger.log(`At  ${new Date()} 9gag image load completed.`);  
    return {
      darkHumourImages,
      funnyImages,
      gagsTrending,
      adultImages
     } 
  }
}

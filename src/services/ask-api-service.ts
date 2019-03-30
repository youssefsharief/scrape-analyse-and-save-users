import * as request from 'request';
import { injectable } from 'inversify';
import { logger } from '../infrastructure/logger';
import { config } from '../config/config';

@injectable()
export class AskApiService {
    fetchUsersThatLikeHashtag(hashtag: string, pageNumber: number): Promise<any> {
        const options = {
            method: 'GET',
            url: 'https://ask.fm/account/friends/hashtags',
            qs: { utf8: '%E2%9C%93', q: hashtag, page: pageNumber },
            headers: {
                'Postman-Token': '0d3e2e5d-14f3-4d0d-836b-5d1af4a20ffd',
                'cache-control': 'no-cache',
                Cookie: config.ask.cookie,
                'Accept-Language': 'en-US,en;q=0.9,ar;q=0.8',
                // 'Accept-Encoding': 'gzip, deflate, br',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36',
                'Upgrade-Insecure-Requests': '1',
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                Connection: 'keep-alive',
            },
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    logger.log('ask api is having problems getting users that are interested in a hashtag', error);
                    return reject(error);
                }
                return resolve(body);
            });
        });
    }

    fetchProfilePage(userId: string): Promise<any> {
        const options = {
            method: 'GET',
            url: `https://ask.fm/${encodeURIComponent(userId)}`,
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    logger.log('ask api is having problems getting profile page', error);
                    return reject(error);
                }
                return resolve(body);
            });
        });
    }
}

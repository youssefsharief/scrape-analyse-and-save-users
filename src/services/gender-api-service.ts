import * as request from 'request';
import TYPES from '../constants/types';
import { inject, injectable } from 'inversify';
import { GenderApiResponse } from '../interfaces/gender-api';
import { logger } from '../infrastructure/logger';

@injectable()
export class GenderApiService {
    constructor(@inject(TYPES.GENDER_API_KEY) private apiKey: string) {}

    async fetchGender(name: string): Promise<GenderApiResponse> {
        const options = {
            method: 'GET',
            url: `https://genderapi.io/api/?name=${encodeURIComponent(name)}&key=${encodeURIComponent(this.apiKey)}`,
        };

        return new Promise((resolve, reject) => {
            request(options, (error, response, body) => {
                if (error) {
                    logger.log('error', error);
                    return reject(error);
                } else {
                    logger.log('info', body);
                    logger.log('info', 'DONE');
                    return resolve(JSON.parse(body));
                }
            });
        });
    }
}

import { inject, injectable } from 'inversify';
import { GenderApiService } from '../services/gender-api-service';
import { GenderApiResponseForASingleName } from '../interfaces/gender-api';
import { logger } from '../infrastructure/logger';

@injectable()
export class UserGenderApiController {
    constructor(@inject(GenderApiService) private genderApiService: GenderApiService) {}

    async identifyGender(user: { name: string; id: string }): Promise<string> {
        logger.log('info', `checking gender for ${user.name} with id ${user.id}`);
        try {
            const result = await (this.genderApiService.fetchGender(user.name) as Promise<GenderApiResponseForASingleName>);
            if (result.errno) {
                logger.log('warn', `error in gender api result ${result.errno}`);
                return undefined;
            } else {
                if (result.gender === 'null') {
                    logger.log('info', `checking gender again for id for ${user.name} with id ${user.id}`);
                    return this.userWithGenderByIdPromise(user.id);
                }
                return result.gender;
            }
        } catch (e) {
            logger.log('warn', `Error in gender api endpoint ${e}`);
            return undefined;
        }
    }

    private async userWithGenderByIdPromise(id: string): Promise<string> {
        try {
            const result = await (this.genderApiService.fetchGender(id) as Promise<GenderApiResponseForASingleName>);
            if (result.errno) {
                logger.log('warn', `error in gender api result ${result.errno}`);
                return undefined;
            } else {
                return result.gender;
            }
        } catch (e) {
            logger.log('warn', e);
            return undefined;
        }
    }
}

import { GenderApiService } from '../../src/services/gender-api-service';
import { GenderApiResponseForASingleName, GenderApiResponseForMultipleNames } from '../../src/interfaces/gender-api';
import { testingContainer } from '../ioc_config_test';
import { logger } from '../../src/infrastructure/logger';
import * as expect from 'expect' 


describe('gender api service', () => {
    let genderApiService: GenderApiService;
    before(() => {
        genderApiService = testingContainer.get<GenderApiService>(GenderApiService);
    });
    describe('fetchGender', () => {
        it('should return the correct gender', async () => {
            const result = await (genderApiService.fetchGender('Omar') as Promise<GenderApiResponseForASingleName>);
            expect(result.gender).toBe('male');
        });
        it('should return the correct gender for a list', async () => {
            const result = await (genderApiService.fetchGender('Omar;So3ad') as Promise<GenderApiResponseForMultipleNames>);
            logger.log('info', `res ${result}`);
            expect(result.names[0].gender).toBe('male');
            expect(result.names[1].gender).toBe('female');
        });
    });
});

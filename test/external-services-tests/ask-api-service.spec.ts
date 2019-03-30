import { testingContainer } from '../ioc_config_test';
import { AskApiService } from '../../src/services/ask-api-service';
import * as expect from 'expect' 

describe('ask api service', () => {
    let askApiService: AskApiService;
    before(() => {
        askApiService = testingContainer.get<AskApiService>(AskApiService);
    });
    describe('fetchProfilePage', () => {
        it('should return the correct html', async () => {
            const result = await askApiService.fetchProfilePage('abdelmonam_1');
            expect(result).toBeTruthy();
        });
    });

    describe('fetchUsersThatLikeHashtag', () => {
        it('should return the correct html', async () => {
            const result = await askApiService.fetchUsersThatLikeHashtag('food', 1);
            expect(result).toBeTruthy();
        });
    });
});

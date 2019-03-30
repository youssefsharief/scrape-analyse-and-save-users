import { testingContainer } from '../ioc_config_test';
import { injectable } from 'inversify';
import { GenderApiResponse } from '../../src/interfaces/gender-api';
import { GenderApiService } from '../../src/services/gender-api-service';
import { UserGenderApiController } from '../../src/controllers/user-gender-api-controller';
import * as expect from 'expect' 

@injectable()
class MockGenderApiService implements Partial<GenderApiService> {
    async fetchGender(name: string): Promise<GenderApiResponse> {
        return new Promise((resolve, _) => resolve({ gender: name == 'Ahmed' ? 'male' : name == 'Noha' ? 'female' : 'null' }));
    }
}

@injectable()
class MockGenderApiServiceNotWorking implements Partial<GenderApiService> {
    async fetchGender(_: string): Promise<GenderApiResponse> {
        return new Promise(() => {
            throw new Error('Err');
        });
    }
}

@injectable()
class MockGenderApiServiceReturningAnError implements Partial<GenderApiService> {
    async fetchGender(): Promise<GenderApiResponse> {
        return new Promise(resolve => resolve({ errno: 12, names: [] }));
    }
}

describe('User gender controller', () => {
    let userGenderApiController: UserGenderApiController;
    let users: {id: string, name: string}[];

    beforeEach(() => {
        testingContainer.snapshot();
        testingContainer.unbind(GenderApiService);
        users = [
            {id: 'das1',name: 'Ahmed'},
            {id: 'ada2',name: 'Noha'},
            {id: 'trdad',name: 'hjds'},
        ];
    });
    afterEach(() => {
        testingContainer.restore();
    });
    describe('identifyGender', () => {
        describe('gender api service working', () => {
            beforeEach(() => {
                testingContainer.bind<Partial<GenderApiService>>(GenderApiService).to(MockGenderApiService);
                userGenderApiController = testingContainer.get<UserGenderApiController>(UserGenderApiController);
            });

            it('should return user with applicable gender', async () => {
                expect(await userGenderApiController.identifyGender(users[0])).toEqual('male');
                expect(await userGenderApiController.identifyGender(users[1])).toEqual('female');
                expect(await userGenderApiController.identifyGender(users[2])).toEqual('null');
            });
        });

        describe('gender api service is not working', () => {
            beforeEach(() => {
                testingContainer.bind<Partial<GenderApiService>>(GenderApiService).to(MockGenderApiServiceNotWorking);
                userGenderApiController = testingContainer.get<UserGenderApiController>(UserGenderApiController);
            });
            it('should return user with undefined gender', async () => {
                expect(await userGenderApiController.identifyGender(users[0])).toEqual(undefined);
                expect(await userGenderApiController.identifyGender(users[1])).toEqual(undefined);
                expect(await userGenderApiController.identifyGender(users[2])).toEqual(undefined);
            });
        });

        describe('gender api service is returning an error number', () => {
            beforeEach(() => {
                testingContainer.bind<Partial<GenderApiService>>(GenderApiService).to(MockGenderApiServiceReturningAnError);
                userGenderApiController = testingContainer.get<UserGenderApiController>(UserGenderApiController);
            });
            it('should return user with undefined gender', async () => {
                expect(await userGenderApiController.identifyGender(users[0])).toEqual(undefined);
                expect(await userGenderApiController.identifyGender(users[1])).toEqual(undefined);
                expect(await userGenderApiController.identifyGender(users[2])).toEqual(undefined);
            });
        });
    });
});

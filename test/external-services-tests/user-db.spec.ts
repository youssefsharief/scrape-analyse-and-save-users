import { testingContainer } from '../ioc_config_test';
import { UserDb } from '../../src/db/data-layer/user-db';
import { testingDbOperations } from '../testing-operations/db-test';
import * as expect from 'expect'

describe('user db', () => {
    let userDb: UserDb;

    before(async () => {
        await testingDbOperations.connectToDb();
        await testingDbOperations.removeAllUsers();
        await testingDbOperations.removeAllHashtags();
        testingContainer.snapshot();
        userDb = testingContainer.get<UserDb>(UserDb);
        const pr = testingDbOperations.adddUser;
        const promises = [pr('ahmed_id', 'contacted'), pr('sara_id', 'contacted'), pr('ramy_id', 'male'), pr('israa', 'contacted')]
        await Promise.all(promises)
    });

    after(async () => {
        testingContainer.restore();
        await testingDbOperations.disconnectDb();
    });


    describe('getting unexisting users', async () => {
        let result: any;
        before(async () => {
            result = await userDb.getUser('unexisting_user_id');
        });
        it('should get correct user', () => {
            expect(result).toBeFalsy();
        });
    });


    describe('getting contacted users', async () => {
        let result: any;
        before(async () => {
            result = await userDb.getUser('ahmed_id');
        });
        it('should get correct user', () => {
            expect(result.status).toBe('contacted');
        });
    });




    describe('saving existing user as male', async () => {
        before(async () => {
            await userDb.saveUserAsMale('ahmed_id', 'Ahmed')
        });
        it('should update successfully', async () => {
            const result = await userDb.getUser('ahmed_id');
            expect(result.status).toBe('male');
        });
    });

    describe('save new user as male', async () => {
        before(async () => {
            await userDb.saveUserAsMale('new_male_id', 'New name')
        });
        it('should update successfully', async () => {
            const result = await userDb.getUser('new_male_id');
            expect(result.status).toBe('male');
        });
    });

    describe('update info for existing user', async () => {
        before(async () => {
            await userDb.saveUserWithInfo('sara_id', 'Sara',  {hashtags: ['h1, h2'], socialMediaLinks: ['a', 'b'],  latestActivityTime: '2017-11-24T14:33:13'})
        });
        it('should update successfully', async () => {
            const result = await userDb.getUser('sara_id');
            expect(result.hashtags).toEqual(['h1, h2']);
            expect(result.socialMediaLinks).toEqual(['a', 'b']);
            expect(result.name).toBe('Sara');
            expect(result.latestActivityTime).toBeTruthy()
        });
    });

    describe('save new user with info', async () => {
        before(async () => {
            await userDb.saveUserWithInfo('new_sara_id', 'Sara', {hashtags: ['h1, h2'], socialMediaLinks: ['a', 'b'], latestActivityTime: '2017-11-24T14:33:13'})
        });
        it('should update successfully', async () => {
            const result = await userDb.getUser('new_sara_id');
            expect(result.hashtags).toEqual(['h1, h2']);
            expect(result.socialMediaLinks).toEqual(['a', 'b']);
            expect(result.name).toBe('Sara');
            expect(result.latestActivityTime).toBeTruthy()
        });
    });



});

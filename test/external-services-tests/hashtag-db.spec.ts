import { testingContainer } from '../ioc_config_test';
import { testingDbOperations } from '../testing-operations/db-test';
import * as expect from 'expect'
import { HashtagDb } from '../../src/db/data-layer/hashtag-db';

describe('hashtag db', () => {
    let hashtagDb: HashtagDb;
    before(async () => {
        await testingDbOperations.connectToDb();
        await testingDbOperations.removeAllUsers();
        await testingDbOperations.removeAllHashtags();
        testingContainer.snapshot();
        hashtagDb = testingContainer.get<HashtagDb>(HashtagDb);
    });

    after(async () => {
        testingContainer.restore();
        await testingDbOperations.disconnectDb();
    });

    describe('adding new hashtags', async () => {
        before(async () => {
            await hashtagDb.addHashtags(['h1', 'h2']);
        });
        it('should reflect on collection', async () => {
            const result = await hashtagDb.getAll()
            expect(result.length).toBe(2)
        });


        describe('adding hashtags that already exists', ()=>{
            before(async () => {
                await hashtagDb.addHashtags(['h1', 'h2', 'h3', 'h4']);
            });
            it('should not duplicate', async () => {
                const result = await hashtagDb.getAll()
                console.log(result)
                expect(result.length).toBe(4)
            });
        })
    });

});

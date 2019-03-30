import { Query } from 'mongoose';
import { UserModel, IDbPureUserModel } from '../../src/db/models/user.model';
import { testingContainer } from '../ioc_config_test';
import * as mongoose from 'mongoose';
import TYPES from '../../src/constants/types';
import { logger } from '../../src/infrastructure/logger';
import { HashtagModel, IDbHashtagModel } from '../../src/db/models/hashtag.model';

export const testingDbOperations = {

    connectToDb() {
        return new Promise((resolve, reject) => {
            mongoose.connection.on('open', () => {
                logger.log('info', 'test db connected')
                return resolve(true)
            });
            mongoose.connection.on('error', error => reject(new Error(error)));
            mongoose.connect(testingContainer.get(TYPES.DatabaseURI), { useNewUrlParser: true });
        });
    },

    adddUser(userId, status): Promise<IDbPureUserModel> {
        const user = new UserModel({ userId, status })
        return user.save()
    },

    disconnectDb() {
        return mongoose.disconnect();
    },

    removeAllUsers(): Query<any> {
        return UserModel.deleteMany({});
    },

    removeAllHashtags(): Query<any> {
        return HashtagModel.deleteMany({});
    },

    addHashtagsWithRate(hashtags: { text: string, rate: number }[]): Promise<IDbHashtagModel>[] {
        return hashtags.map(async hashtag => {
            const newHashtag = new HashtagModel({ text: hashtag.text, rate: hashtag.rate });
            try {
                const result = await newHashtag.save();
                return result;
            } catch (e) {
                if (e.name === 'MongoError' && e.code === 11000) {
                    logger.log('info', `it is fine. There is just a duplicated hashtag ${hashtag}`);
                } else {
                    logger.log('error', `failed to save new hashtag ${e}`);
                }
            }
        });
    }

};
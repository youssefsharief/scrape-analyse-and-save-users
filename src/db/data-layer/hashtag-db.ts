import { injectable } from 'inversify';
import { HashtagModel, IDbHashtagModel } from '../models/hashtag.model';
import { logger } from '../../infrastructure/logger';

@injectable()
export class HashtagDb {
    addHashtags(hashtags: string[]): Array<Promise<IDbHashtagModel>> {
        return hashtags.map(async hashtag => {
            const newHashtag = new HashtagModel({ text: hashtag });
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

    getAll(): Promise<IDbHashtagModel[]>{
        return HashtagModel.find({}).lean().exec();
    }
}

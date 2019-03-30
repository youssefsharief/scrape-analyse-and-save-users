import { UserModel, IDbPureUserModel } from '../models/user.model';
import { injectable } from 'inversify';
import { DataFromProfilePage } from '../../interfaces/user';

@injectable()
export class UserDb {
    getUser(userId: string): Promise<IDbPureUserModel> {
        return UserModel.findOne({ userId })
            .lean()
            .exec();
    }

    saveUserAsMale(userId: string, userName: string): Promise<IDbPureUserModel> {
        return UserModel.findOneAndUpdate({ userId }, { $set: { status: 'male', name: userName } }, { upsert: true }).exec();
    }

    saveUserWithInfo(userId: string, userName: string, dataFromProfilePage: DataFromProfilePage): Promise<IDbPureUserModel> {
        return UserModel.findOneAndUpdate(
            { userId },
            {
                $set: {
                    name: userName,
                    hashtags: dataFromProfilePage.hashtags,
                    socialMediaLinks: dataFromProfilePage.socialMediaLinks,
                    latestActivityTime: dataFromProfilePage.latestActivityTime,
                },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true },
        ).exec();
    }
}

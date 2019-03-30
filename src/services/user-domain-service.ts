import { IDbPureUserModel } from '../db/models/user.model';

export const userDomainService = {
    areNotInterestedInUser(status: string): boolean {
        return status === 'male' || status === 'excluded' || status === 'inactive';
    },

    hasUserBeenScrapedBefore(user: IDbPureUserModel): boolean {
        return user.name ? true : false;
    },

    getUsersFromListOfIdsAndNames(names: string[], ids: string[]): { userName: string; userId: string }[] {
        return names.map((t, i) => ({ userName: t, userId: ids[i] }));
    },

    shouldIgnoreWithPreviouslySavedUser(userFromDb): boolean {
        return userFromDb && (this.hasUserBeenScrapedBefore(userFromDb) || this.areNotInterestedInUser(userFromDb.status));
    },

    isHashtagApplicable(hashtag: {rate: number}): boolean {
        return hashtag.rate >= 7
    },

    couldPermitSavingAsMale(genderFromApiService, userFromDb): boolean {
       return genderFromApiService === 'male';
        // if(!userFromDb) {
        //     return true
        // } else if(userFromDb.status === ''){

        // }
    }
};

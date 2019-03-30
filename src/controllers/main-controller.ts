import { inject, injectable } from 'inversify';
import TYPES from '../constants/types';
import { DOMParserService } from '../services/dom-parser';
import { AskApiService } from '../services/ask-api-service';
// import { UserController } from './user-controller';
import { UserGenderApiController } from './user-gender-api-controller';
import { UserDb } from '../db/data-layer/user-db';
import { DataFromProfilePage } from '../interfaces/user';
import { HashtagDb } from '../db/data-layer/hashtag-db';
import { logger } from '../infrastructure/logger';
import { userDomainService } from '../services/user-domain-service';
import { utility } from '../services/utility';

@injectable()
export class MainController {
    constructor(
        @inject(TYPES.LastPageNumber) private lastPageNumber: number,
        @inject(AskApiService) private askApiService: AskApiService,
        @inject(DOMParserService) private domParserService: DOMParserService,
        @inject(UserGenderApiController) private userGenderApiController: UserGenderApiController,
        @inject(UserDb) private userDb: UserDb,
        @inject(HashtagDb) private hashtagDb: HashtagDb,
    ) { }

    private async getUserIdsAndNamesFromHashtagPage(
        hashtag: string,
        pageNumber: number,
    ): Promise<{ userIds: string[]; userNames: string[] }> {
        const html = await this.askApiService.fetchUsersThatLikeHashtag(hashtag, pageNumber);
        return this.domParserService.getHashtagsListPageData(html);
    }

    private async getDataFromProfilePage(userId: string): Promise<DataFromProfilePage> {
        try {
            const html = await this.askApiService.fetchProfilePage(userId);
            return this.domParserService.getProfilePageData(html);
        } catch (e) {
            logger.log('error', ` for userID ${userId} ${e}`);
            return undefined;
        }
    }

    async scrape(): Promise<any> {
        for (const hashtag of await this.hashtagDb.getAll()) {
            if (userDomainService.isHashtagApplicable(hashtag)) {
                logger.log('info', `hashtag ${hashtag.text} is applicable`)
                await this.dealWithHashtag(hashtag)
            }
        }
    }

    private async dealWithHashtag(hashtag) {
        for (let pageNumber = 1; pageNumber <= this.lastPageNumber; pageNumber++) {
            const { userIds, userNames } = await this.getUserIdsAndNamesFromHashtagPage(hashtag.text, pageNumber);
            if (userIds.length === 0) {
                logger.log('warn', `no more users found for hashtag ${hashtag.text} in page ${pageNumber}`);
                break;
            } else {
                const users = userDomainService.getUsersFromListOfIdsAndNames(userNames, userIds);
                for (const user of users) {
                    try {
                        await this.dealWithUser(user);
                    } catch (e) {
                        logger.log('error', `An error occurred trying to deal with a user ${e}`);
                    }
                }
            }
        }
    }

    private async dealWithUser(user: { userId: string; userName: string }): Promise<any> {
        const userFromDb = await this.userDb.getUser(user.userId);
        if (userDomainService.shouldIgnoreWithPreviouslySavedUser(userFromDb)) {
            logger.log('info', `user found in db but we are not gonna scrape ${user.userId}`);
        } else {
            const gender = await this.userGenderApiController.identifyGender({ name: user.userName, id: user.userId });
            if (userDomainService.couldPermitSavingAsMale(gender, userFromDb)) {
                return await this.userDb.saveUserAsMale(user.userId, user.userName);
            } else {
                const dataFromProfilePage = await this.getDataFromProfilePage(user.userId);
                if (dataFromProfilePage) {
                    if (!dataFromProfilePage.latestActivityTime) {
                        dataFromProfilePage.latestActivityTime = utility.getOldDate();
                    }
                    return [
                        await this.userDb.saveUserWithInfo(user.userId, user.userName, dataFromProfilePage),
                        await this.hashtagDb.addHashtags(dataFromProfilePage.hashtags),
                    ];
                }
            }
        }
    }
}

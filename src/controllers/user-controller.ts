// import { inject, injectable } from 'inversify';
// import { UserDb } from '../db/data-layer/user-db';
// import { UserGenderApiController } from './user-gender-api-controller';
// import { DOMParserService } from '../services/dom-parser';
// import { AskApiService } from '../services/ask-api-service';
// import { DataFromProfilePage } from '../interfaces/user';
// import { HashtagDb } from '../db/data-layer/hashtag-db';
// import { logger } from '../infrastructure/logger';
// import { userDomainService } from '../services/user-domain-service';
// import { utility } from '../services/utility';

// @injectable()
// export class UserController {
//     constructor(
//         @inject(UserDb) private userDb: UserDb,
//         @inject(HashtagDb) private hashtagDb: HashtagDb,
//         @inject(UserGenderApiController) private userGenderApiController: UserGenderApiController,
//         @inject(AskApiService) private askApiService: AskApiService,
//         @inject(DOMParserService) private domParserService: DOMParserService,
//     ) { }

//     // async dealWithUser(userId): Promise<any> {
//     //     try {
//     //         const userFromDb = await this.userDb.getUser(userId);
//     //         // if (we should not do any fethcing :::: extract this to a service should I unit test it )
//     //         if (userFromDb && (userDomainService.hasUserBeenScrapedBefore(userFromDb) || userDomainService.areNotInterestedInUser(userFromDb.status))) {
//     //             logger.log('user found in db but we are not interested in ', userId)
//     //             return;
//     //         }
//     //         const dataFromProfilePage = await this.getDataFromProfilePage(userId);
//     //         logger.log('data', dataFromProfilePage)
//     //         if (dataFromProfilePage) {
//     //             const gender = await this.userGenderApiController.identifyGender({ name: dataFromProfilePage.name, id: userId });
//     //             if (gender === 'male') {
//     //                 return await this.userDb.saveUserAsMale(userId)
//     //             } else {
//     //                 if (!dataFromProfilePage.latestActivityTime) {
//     //                     dataFromProfilePage.latestActivityTime = utility.getOldDate()
//     //                 }
//     //                 return [
//     //                     await this.userDb.saveUserWithInfo(userId, dataFromProfilePage),
//     //                     await this.hashtagDb.addHashtags(dataFromProfilePage.hashtags)
//     //                 ]
//     //             }
//     //         }

//     //     } catch (e) {
//     //         logger.log('error', e)
//     //     }
//     // }
// }

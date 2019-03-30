// import { testingContainer } from '../ioc_config_test';
// import { injectable } from 'inversify';
// import { UserDb } from '../../src/db/data-layer/user-db';
// import { IDbPureUserModel, getDbPureUser } from '../../src/db/models/user.model';
// import { UserGenderApiController } from '../../src/controllers/user-gender-api-controller';
// import * as expect from 'expect'
// import { HashtagDb } from '../../src/db/data-layer/hashtag-db';
// import { AskApiService } from '../../src/services/ask-api-service';
// import { DOMParserService } from '../../src/services/dom-parser';
// import { UserController } from '../../src/controllers/user-controller';
// import * as td from 'testdouble'
// import { DataFromProfilePage } from '../../src/interfaces/user';

// // @injectable()
// // class userGenderApiControllerStub implements Partial<UserGenderApiController> {
// //     async identifyGender(user: { name: string, id: string }): Promise<string> {
// //         const mapper = {
// //             Mohamed: 'male',
// //             Esraa: 'female',
// //             Ramy: 'male',
// //             Noha: 'female'
// //         }
// //         return new Promise((resolve, _) => resolve(mapper[user.name]));
// //     }
// // }

// // @injectable()
// // class UserDbStub implements Partial<UserDb> {
// //     mapper = {
// //         mohamed_id: { name: 'Mohamed' },
// //         sara_id: { status: 'contacted' },
// //         noha_id: { status: 'excluded' },
// //         esraa_id: { status: 'inactive' },
// //         ahmed_id: { status: 'contacted' },
// //     }
// //     getUser(userId: string): Promise<IDbPureUserModel> {
// //         return Promise.resolve(this.mapper[userId])
// //     }
// //     saveUserAsMale(userId: string): Promise<any> {
// //         return Promise.resolve('saved as male')
// //     }
// //     saveUserWithInfo(userId: string): Promise<any> {
// //         return Promise.resolve('updated info')
// //     }
// // }

// // @injectable()
// // class HashtagDbStub implements Partial<HashtagDb> {
// //     addHashtags(texts: string[]): Promise<any>[] {
// //         return [Promise.resolve('saved as male')]
// //     }
// // }

// // @injectable()
// // class AskApiServiceStub implements Partial<AskApiService> {
// //     fetchProfilePage(userId): Promise<string> {
// //         return Promise.resolve('html')
// //     }
// // }

// // @injectable()
// // class DOMParserServiceStub implements Partial<DOMParserService> {
// //     getProfilePageData(html: string): { hashtags: string[]; name: string; latestActivityTime: string; facebookProfile: string } {
// //         return { name: 'A', hashtags: ['hashtags'], latestActivityTime: '13/12/32', facebookProfile: 'facebookProfile' };
// //     }
// // }


// describe.only('User controller', () => {
//     let userController: UserController;
//     describe('contacted male', () => {
//         const userDbStub = td.object<UserDb>();
//         const askApiServiceStub = td.object<AskApiService>();
//         const dOMParserServiceStub = td.object<DOMParserService>();
//         const userGenderApiControllerStub = td.object<UserGenderApiController>()
//         const hashtagDbStub = td.object<HashtagDb>();
    
//         before(async () => {
//             td.when(userDbStub.getUser('ahmed_id')).thenReturn(Promise.resolve({ status: 'contacted' }));
//             td.when(userDbStub.saveUserAsMale('ahmed_id')).thenReturn(Promise.resolve('saved as male'));
//             testingContainer.rebind(UserDb).toConstantValue(userDbStub)
//             td.when(userGenderApiControllerStub.identifyGender({ name: 'Ahmed', id: 'ahmed_id' })).thenReturn(Promise.resolve('male'));
//             testingContainer.rebind(UserGenderApiController).toConstantValue(userGenderApiControllerStub)
//             td.when(askApiServiceStub.fetchProfilePage("ahmed_id")).thenReturn(Promise.resolve('html'));
//             testingContainer.rebind(AskApiService).toConstantValue(askApiServiceStub)
//             td.when(dOMParserServiceStub.getProfilePageData('html'))
//                 .thenReturn({ name: 'Ahmed', hashtags: ['hashtags'], latestActivityTime: '13/12/32', facebookProfile: 'facebookProfile' })
//             testingContainer.rebind(DOMParserService).toConstantValue(dOMParserServiceStub)
//             td.when(hashtagDbStub.addHashtags(["Alice"])).thenReturn(Promise.resolve(['yeah']));
//             testingContainer.rebind(HashtagDb).toConstantValue(hashtagDbStub)
//             userController = testingContainer.get(UserController);
//         });
    
//         it('should work', async () => {
//             td.when(userDbStub.saveUserAsMale('ahmed_id')).thenReturn(Promise.resolve('saved as male'));
//             const result = await userController.dealWithUser('ahmed_id')
//             console.log(result)
//             expect(result).toEqual('saved as male')
//         })
//     });
// });

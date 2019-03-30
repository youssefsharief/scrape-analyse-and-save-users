// import { injectable } from 'inversify';
// import { testingContainer } from '../ioc_config_test';
// import { UserDb } from '../../src/db/data-layer/user-db';
// import { IDbPureUserModel, getDbPureUser } from '../../src/db/models/user.model';
// import { UserGenderApiController } from '../../src/controllers/user-gender-api-controller';
// import { MainController } from '../../src/controllers/main-controller';
// import * as expect from 'expect' 

// @injectable()
// class UserGenderApiControllerStub implements Partial<UserGenderApiController> {
//     async identifyGender(user: { name: string, id: string }): Promise<string> {
//         const mapper = {
//             Mohamed: 'male',
//             Esraa: 'female',
//             Ramy: 'male',
//             Noha: 'female'
//         }
//         return new Promise((resolve, _) => resolve(mapper[user.name]));
//     }
// }

// @injectable()
// class UserDbStub implements Partial<UserDb> {
//     mapper = {
//         mohamed_id: {name: 'Mohamed'},
//         sara_id: {status: 'contacted'},
//         noha_id: {status: 'excluded'},
//         esraa_id: {status: 'inactive'},
//         ahmed_id: {status: 'contacted'},
//     }

//     getUser(userId: string): Promise<IDbPureUserModel> {
//         return Promise.resolve(this.mapper[userId])
//     }

//     saveUserAsMale(userId: string): Promise<IDbPureUserModel> {
//         this.mapper[userId] ? this.mapper.
//     }


//     updateStatus(userId: string, status: string): Promise<IDbPureUserModel> {
//         return new Promise((resolve, reject) => resolve(getDbPureUser(userId, status)))
//     }

// }

// @injectable()
// class MockPagesController implements Partial<PagesController> {
//     mapper = {
//         mohamedqassim4: { name: 'Mohamed', latestActivityTime: '2017-11-24T14:33:13' },
//         esraakamal464: { name: 'Esraa', latestActivityTime: '2017-11-24T14:33:13' },
//         ramy_id: { name: 'Ramy', latestActivityTime: '2019-01-24T14:33:13' },
//         NohaAhmed917: { name: 'Noha', latestActivityTime: '2019-01-24T14:33:13' }
//     }
//     async lookupUserProfilePage(id): Promise<{ id: string, name: string, latestActivityTime: string }> {
//         return { id: id, name: this.mapper[id].name, latestActivityTime: this.mapper[id].latestActivityTime }
//     }
// }

// @injectable()
// class MockPagesControllerWithError extends MockPagesController implements Partial<PagesController> {
//     async lookupUserProfilePage(id): Promise<{ id: string, name: string, latestActivityTime: string }> {
//         if (id==='esraakamal464') {
//             throw (new Error('a'))
//         }else {
//             return { id: id, name: this.mapper[id].name, latestActivityTime: this.mapper[id].latestActivityTime }
//         }
//     }
// }


// describe('Main controller', () => {
//     let mainController: MainController;

//     before(() => {
//         testingContainer.snapshot();
//         testingContainer.unbind(UserGenderApiController)
//         testingContainer.unbind(UserDb)
//         testingContainer.bind<Partial<UserGenderApiController>>(UserGenderApiController).to(MockUserGenderApiController);
//         testingContainer.bind<Partial<UserDb>>(UserDb).to(MockUserDb);
//     });
//     after(() => {
//         testingContainer.restore();
//     });
//     describe('start', () => {
//         describe('profile page is always getting something', () => {
//             before(() => {
//                 testingContainer.unbind(PagesController)
//                 testingContainer.bind<Partial<PagesController>>(PagesController).to(MockPagesController);
//                 mainController = testingContainer.get<MainController>(MainController);
//             });

//             it('should return updated users', async () => {
//                 const result: IDbPureUserModel[] = await mainController.start()
//                 const expected: IDbPureUserModel[] =[{ userId: 'mohamedqassim4', status: 'inactive' },
//                 { userId: 'esraakamal464', status: 'inactive' },
//                 { userId: 'ramy_id', status: 'male' },
//                     undefined]
//                 expect(result).toEqual(expected)
//             });
//         });

//         describe('profile page is not there for one of the users', () => {
//             before(() => {
//                 testingContainer.unbind(PagesController)
//                 testingContainer.bind<Partial<PagesController>>(PagesController).to(MockPagesControllerWithError);
//                 mainController = testingContainer.get<MainController>(MainController);
//             });

//             it('should return updated users from gender api', async () => {
//                 const result: IDbPureUserModel[] = await mainController.start()
//                 const expected: IDbPureUserModel[] =[{ userId: 'mohamedqassim4', status: 'inactive' },
//                 undefined,
//                 { userId: 'ramy_id', status: 'male' },
//                     undefined]
//                 expect(result).toEqual(expected)
//             });

//         })
//     });
// });

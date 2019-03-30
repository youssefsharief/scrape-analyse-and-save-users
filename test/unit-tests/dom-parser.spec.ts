import { testingContainer } from "../ioc_config_test";
import { profilePageFixture } from "../__fixtures__/profile-page-fixture";
import { DOMParserService } from '../../src/services/dom-parser';
import { unExistingUserProfilePage } from "../__fixtures__/profile-page-fixture-unexisting-user";
import * as expect from 'expect'
import { SarahahProfilePage } from "../__fixtures__/profile-page-with-sarahah-social-media";
import { profilePageFixtureWithLinksInBio } from "../__fixtures__/profile-page-with-links-in-bio";
import { hashtagsListPageFixture } from "../__fixtures__/hashtags-list-page";


describe('DOM Parser', () => {
    let domParserService: DOMParserService;
    before(() => {
        domParserService = testingContainer.get<DOMParserService>(DOMParserService);
    });


    describe('hashtags list page', () => {
        it('should work', () => {
            const result = domParserService.getHashtagsListPageData(hashtagsListPageFixture)
            expect(result.userIds[0]).toBe('lanilililosalina04')
            expect(result.userNames[0]).toBe('Sialagi')
        })
    })

    describe('normal profile', () => {
        it('should return correct string', async () => {
            const result = domParserService.getProfilePageData(profilePageFixture)
            expect(result.latestActivityTime).toBe('2017-11-24T14:33:13')
            expect(result.hashtags[0]).toEqual('كره_قدم❤️❤️👌🏻👌🏻')
        });
    });

    describe('sarahah profile', () => {
        it('should return correct string', async () => {
            const result = domParserService.getProfilePageData(SarahahProfilePage)
            expect(result.hashtags[4]).toEqual('cars')
            expect(result.socialMediaLinks[0]).toEqual('https://a10adham.sarahah.com/')
        });
    });

    describe('links in bio', () => {
        it('should return correct string', async () => {
            const result = domParserService.getProfilePageData(profilePageFixtureWithLinksInBio)
            expect(result.socialMediaLinks).toEqual(['http://ask.fm/anodaaaaa/answer/108888992398',
                'http://twitter.com/_m_38__',
                'http://Instagram.com/_m_38__',
                'http://ask.fm/anodaaaaa/answer/108888992398',
                'http://twitter.com/_m_38__',
                'http://Instagram.com/_m_38__'])
        });
    });


    // describe('unExisting user profile page', () => {
    //     it('should throw error', async () => {
    //         const t = await domParserService.getProfilePageData(unExistingUserProfilePage)
    //         t
    //         expect(t).toThrow()
    //     });
    // })

});

import { injectable } from 'inversify';
import { JSDOM } from 'jsdom';
import { DataFromProfilePage, DataFromHashtagsListPage } from '../interfaces/user';

@injectable()
export class DOMParserService {
    getProfilePageData(html: string): DataFromProfilePage {
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const latestActivityTime = this.getLatestActivity(doc);
        // const name = this.getName(doc)
        const hashtags = this.getHashtags(doc);
        const socialMediaLinks = this.getSocialMediaLinks(doc);
        return { hashtags, latestActivityTime, socialMediaLinks };
    }

    // private getName(document) {
    //     const arrName = document
    //         .querySelector('.profileBio.section .section_title')
    //         .textContent.trim()
    //         .split('');
    //     return arrName.slice(6, arrName.length - 1).join('');
    // }

    private getLatestActivity(document) {
        const el = document.querySelector('time');
        return el ? el.getAttribute('datetime') : undefined;
    }

    private getSocialMediaLinks(document) {
        return [...document.querySelectorAll('.profileBio_fields .icon-bio a')]
            .concat([...document.querySelectorAll('.profileBio_fields .icon-link a')])
            .map(item => item.textContent);
    }

    private getHashtags(document) {
        return [...document.querySelectorAll('.icon-interest a')]
            .map(item => encodeURIComponent(item.textContent))
            .map(item => decodeURIComponent(item.substr(3)));
    }

    getHashtagsListPageData(html: string): DataFromHashtagsListPage {
        const dom = new JSDOM(html);
        const doc = dom.window.document;
        const userIds = [...doc.querySelectorAll('.userItem_content > span:nth-child(2)')].map(item => item.textContent.substr(1));
        const userNames = [...doc.querySelectorAll('.userItem_content > span:nth-child(1)')].map(item => item.textContent);
        return { userIds, userNames };
    }

    // getUserIds(html: string): string[] {
    //     const dom = new JSDOM(html);
    //     const doc = dom.window.document
    //     const arr = [...doc.querySelectorAll('.userItem_content > span:nth-child(2)')]
    //         .map(item => item.textContent.substr(1))
    //     return arr
    // }
}

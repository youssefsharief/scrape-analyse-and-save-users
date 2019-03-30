import { utility } from '../../src/services/utility';
import * as  MockDate from 'mockdate';
import * as expect from 'expect' 


describe('utility', () => {

    describe('encode', ()=>{
        it('should getCorrrect stuff', () => {
            expect(encodeURIComponent('ل👀❤')).toBe('%D9%84%F0%9F%91%80%E2%9D%A4');
        });
    })

    describe('getOldDate', ()=>{
        it('should work', () => {
            expect(utility.getOldDate()).toBeTruthy()
        });
    })
});

/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Search kata kotor dan nsfw
 */
import { readFileSync } from "fs";
import FileDB from "../../basededatos/fileDatabase.js";
export default class antiRough {
    static inArray(needle, haystack) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i] == needle)
                return true;
        }
        return false;
    }
}
antiRough.roughWords = JSON.parse(readFileSync(FileDB.roughWordsDB));
antiRough.nsfwQuery = JSON.parse(readFileSync(FileDB.nsfwWordsDB));
antiRough.lookingRough = (sentence) => new Promise((resolve) => {
    if (sentence !== undefined) {
        let words = sentence.split(/\s/g);
        for (let word of words) {
            if (antiRough.inArray(word.toLowerCase(), antiRough.roughWords)) {
                resolve(true);
            }
        }
        resolve(false);
    }
});
/**
 * check if sentence cary any nsfw word
 * @param {*} sentence
 * @returns true or false
 */
antiRough.cariNsfw = (sentence) => new Promise((resolve) => {
    if (sentence !== undefined) {
        let words = sentence.split(/\s/g);
        for (let word of words) {
            if (antiRough.inArray(word.toLowerCase(), antiRough.nsfwQuery)) {
                resolve(true);
            }
        }
        resolve(false);
    }
});
//# sourceMappingURL=antirough.js.map
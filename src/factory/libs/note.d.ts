/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-06-13 17:24:58
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Note crud bos pake lowdb
 */
import { INote } from '../../factory/types/index.js';
export default class Notes {
    static db: any;
    static getNotesAdapter(path: any): any;
    /**
     * Create note.
     * @param {String} chatId
     * @param {String} noteName
     * @param {String} content
     * @returns {Promise} `Promise` that resolve `true` if success
     */
    static createNote: (chatId: any, noteName: any, content: any) => Promise<unknown>;
    /**
     * Delete note.
     * @param {String} chatId
     * @param {String} noteName
     * @returns {Promise} `Promise` that resolve `true` if success
     */
    static deleteNote: (chatId: any, noteName: any) => Promise<unknown>;
    /**
     * Get all chats noteName.
     * @param {String} chatId
     * @returns {Promise} Promise that resolve `noteName[]`
     */
    static getNoteName: (chatId: any) => Promise<boolean | string[]>;
    /**
     * Get note content.
     * @param {String} chatId
     * @param {String} noteName
     * @returns {Promise} `Data` object
     */
    static getNoteData: (chatId: any, noteName: any) => Promise<boolean | INote>;
}
//# sourceMappingURL=note.d.ts.map
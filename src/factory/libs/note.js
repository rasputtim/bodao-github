/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-06-13 17:24:58
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Note crud bos pake lowdb
 */
import lodash from 'lodash';
import { JSONFileSync, LowSync } from 'lowdb';
import { createRequire } from "module";
import path from 'path';
import FileDB from '../../basededatos/fileDatabase.js';
const require = createRequire(import.meta.url);
const __dirname = path.resolve();
export default class Notes {
    static getNotesAdapter(path) {
        const adapter = new JSONFileSync(path);
        const dbList = new LowSync(adapter);
        dbList.read();
        dbList.data || (dbList.data = { chats: [] });
        dbList.write();
        dbList.chain = lodash.chain(dbList.data);
        return dbList;
    }
}
Notes.db = Notes.getNotesAdapter(FileDB.notesDB);
/**
 * Create note.
 * @param {String} chatId
 * @param {String} noteName
 * @param {String} content
 * @returns {Promise} `Promise` that resolve `true` if success
 */
Notes.createNote = (chatId, noteName, content) => new Promise((resolve, reject) => {
    var _a;
    try {
        Notes.db.read();
        const find = Notes.db.chain.get('chats').find({ id: chatId }).value();
        if (find && find.id === chatId) {
            const getNote = ((_a = Notes.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.note) || [];
            const isIn = lodash.findIndex(getNote, { name: noteName });
            if (isIn != -1) {
                resolve(false);
            }
            else {
                getNote.push({ name: noteName, content: content });
                Notes.db.chain.get('chats').find({ id: chatId }).set('note', getNote).value();
                Notes.db.data = Notes.db.chain;
                Notes.db.write();
                resolve(true);
            }
        }
        else {
            Notes.db.chain.get('chats').push({ id: chatId, note: [{ name: noteName, content: content }] }).value();
            Notes.db.data = Notes.db.chain;
            Notes.db.write();
            resolve(true);
        }
    }
    catch (err) {
        reject(err);
    }
});
/**
 * Delete note.
 * @param {String} chatId
 * @param {String} noteName
 * @returns {Promise} `Promise` that resolve `true` if success
 */
Notes.deleteNote = (chatId, noteName) => new Promise((resolve, reject) => {
    var _a;
    try {
        Notes.db.read();
        const find = Notes.db.chain.get('chats').find({ id: chatId }).value();
        if (find && find.id === chatId) {
            const getNote = ((_a = Notes.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.note) || [];
            const isIn = lodash.findIndex(getNote, { name: noteName });
            if (isIn != -1) {
                getNote.splice(isIn, 1);
                Notes.db.chain.get('chats').find({ id: chatId }).set('note', getNote).value();
                Notes.db.data = Notes.db.chain;
                Notes.db.write();
                resolve(true);
            }
            else {
                resolve(false);
            }
        }
        else {
            resolve(false);
        }
    }
    catch (err) {
        reject(err);
    }
});
/**
 * Get all chats noteName.
 * @param {String} chatId
 * @returns {Promise} Promise that resolve `noteName[]`
 */
Notes.getNoteName = (chatId) => new Promise((resolve, reject) => {
    var _a;
    try {
        Notes.db.read();
        const find = Notes.db.chain.get('chats').find({ id: chatId }).value();
        if (find && find.id === chatId) {
            let res = [];
            const getNote = ((_a = Notes.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.note) || [];
            getNote.forEach(_ => {
                res.push(_.name);
            });
            resolve(res);
        }
        else {
            resolve(false);
        }
    }
    catch (err) {
        reject(err);
    }
});
/**
 * Get note content.
 * @param {String} chatId
 * @param {String} noteName
 * @returns {Promise} `Data` object
 */
Notes.getNoteData = (chatId, noteName) => new Promise((resolve, reject) => {
    var _a;
    try {
        Notes.db.read();
        const getNote = ((_a = Notes.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.note) || [];
        const isIn = lodash.findIndex(getNote, { name: noteName });
        if (isIn != -1) {
            let data = Notes.db.chain.get('chats').filter({ id: chatId }).map(`note[${isIn}]`)
                .find({ name: noteName }).value();
            resolve(data);
        }
        else {
            resolve(false);
        }
    }
    catch (err) {
        reject(err);
    }
});
// BY SEROBOT => https://github.com/dngda/bot-whatsapp
//# sourceMappingURL=note.js.map
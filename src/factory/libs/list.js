/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-04-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Lists crud bos pake lowdb
 */
import lodash from 'lodash';
import { JSONFileSync, LowSync } from 'lowdb';
import FileDB from '../../basededatos/fileDatabase.js';
export default class Lists {
    static getListAdapter(path) {
        const adapter = new JSONFileSync(path);
        const dbSchedule = new LowSync(adapter);
        dbSchedule.read();
        dbSchedule.data || (dbSchedule.data = { chats: [] });
        dbSchedule.write();
        dbSchedule.chain = lodash.chain(dbSchedule.data);
        return dbSchedule;
    }
}
Lists.db = Lists.getListAdapter(FileDB.listDB);
/**
 * Create list.
 * @param {String} chatId
 * @param {String} listName
 * @param {String} desc
 * @returns {Promise} `Promise` that resolve `true` if success
 */
Lists.createList = (chatId, listName, desc) => new Promise((resolve, reject) => {
    var _a;
    try {
        const find = Lists.db.chain.get('chats').find({ id: chatId }).value();
        if (find && find.id === chatId) {
            const getList = ((_a = Lists.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.list) || [];
            const isIn = lodash.findIndex(getList, { name: listName });
            if (isIn != -1) {
                resolve(false);
            }
            else {
                getList.push({ name: listName, desc: desc, listData: [] });
                Lists.db.chain.get('chats').find({ id: chatId }).set('list', getList).value();
                Lists.db.data = Lists.db.chain;
                Lists.db.write();
                resolve(true);
            }
        }
        else {
            Lists.db.chain.get('chats').push({ id: chatId, list: [{ name: listName, desc: desc, listData: [] }] }).value();
            Lists.db.data = Lists.db.chain;
            Lists.db.write();
            resolve(true);
        }
    }
    catch (err) {
        reject(err);
    }
});
/**
 * Delete list.
 * @param {String} chatId
 * @param {String} listName
 * @returns {Promise} `Promise` that resolve `true` if success
 */
Lists.deleteList = (chatId, listName) => new Promise((resolve, reject) => {
    var _a;
    try {
        const find = Lists.db.chain.get('chats').find({ id: chatId }).value();
        if (find && find.id === chatId) {
            const getList = ((_a = Lists.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.list) || [];
            const isIn = lodash.findIndex(getList, { name: listName });
            if (isIn != -1) {
                getList.splice(isIn, 1);
                Lists.db.chain.get('chats').find({ id: chatId }).set('list', getList).value();
                Lists.db.data = Lists.db.chain;
                Lists.db.write();
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
 * Get all chat listName.
 * @param {String} chatId
 * @returns {Promise} Promise that resolve `listName[]`
 */
Lists.getListName = (chatId) => new Promise((resolve, reject) => {
    var _a;
    try {
        const find = Lists.db.chain.get('chats').find({ id: chatId }).value();
        if (find && find.id === chatId) {
            let res = [];
            const getList = ((_a = Lists.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.list) || [];
            getList.forEach(_ => {
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
 * Manipulate list.
 * @param {String} chatId
 * @param {String} listName
 * @param {Array} newData
 * @param {Number} Index required if using `delete` action
 * @param {String} action can be `add` or `delete` or `edit`
 * @returns {Promise} `Data` object
 */
Lists.ListData = (chatId, listName, newData, index, action) => new Promise((resolve, reject) => {
    var _a;
    try {
        const getList = ((_a = Lists.db.chain.get('chats').find({ id: chatId }).value()) === null || _a === void 0 ? void 0 : _a.list) || [];
        const isIn = lodash.findIndex(getList, { name: listName });
        if (isIn != -1) {
            let data = Lists.db.chain.get('chats').filter({ id: chatId }).map(`list[${isIn}]`)
                .find({ name: listName }).update('listData', n => {
                switch (action) {
                    case 'add': {
                        return n.concat(newData);
                    }
                    case 'delete': {
                        let temp = n;
                        temp.splice(index, 1);
                        return temp;
                    }
                    case 'edit': {
                        let temp = n;
                        temp.splice(index, 1, newData);
                        return temp;
                    }
                }
            }).value();
            Lists.db.data = Lists.db.chain;
            Lists.db.write();
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
/**
 * Add list content to list data.
 * @param {String} chatId
 * @param {String} listName
 * @param {Array} newData[]
 * @returns {Promise} `Promise` that resolve `listData[]` or `false` if not exist
 */
Lists.addListData = (chatId, listName, newData) => new Promise((resolve, reject) => {
    let res = Lists.ListData(chatId, listName, newData, null, 'add').catch(err => {
        reject(err);
    });
    resolve(res);
});
/**
 * get list content of list data.
 * @param {String} chatId
 * @param {String} listName
 * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
 */
Lists.getListData = (chatId, listName) => new Promise((resolve, reject) => {
    let res = Lists.ListData(chatId, listName, [], null, 'add').catch(err => {
        reject(err);
    });
    resolve(res);
});
/**
 * remove list content of list data.
 * @param {String} chatId
 * @param {String} listName
 * @param {Number} index
 * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
 */
Lists.removeListData = (chatId, listName, index) => new Promise((resolve, reject) => {
    let res = Lists.ListData(chatId, listName, null, index, 'delete').catch(err => {
        reject(err);
    });
    resolve(res);
});
/**
 * edit list content of list data.
 * @param {String} chatId
 * @param {String} listName
 * @param {Number} index
 * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
 */
Lists.editListData = (chatId, listName, newData, index) => new Promise((resolve, reject) => {
    let res = Lists.ListData(chatId, listName, newData, index, 'edit').catch(err => {
        reject(err);
    });
    resolve(res);
});
// BY SEROBOT => https://github.com/dngda/bot-whatsapp
//# sourceMappingURL=list.js.map
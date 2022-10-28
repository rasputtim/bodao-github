/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-04-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Lists crud bos pake lowdb
 */
export default class Lists {
    static db: any;
    static getListAdapter(path: any): any;
    /**
     * Create list.
     * @param {String} chatId
     * @param {String} listName
     * @param {String} desc
     * @returns {Promise} `Promise` that resolve `true` if success
     */
    static createList: (chatId: any, listName: any, desc: any) => Promise<unknown>;
    /**
     * Delete list.
     * @param {String} chatId
     * @param {String} listName
     * @returns {Promise} `Promise` that resolve `true` if success
     */
    static deleteList: (chatId: any, listName: any) => Promise<unknown>;
    /**
     * Get all chat listName.
     * @param {String} chatId
     * @returns {Promise} Promise that resolve `listName[]`
     */
    static getListName: (chatId: any) => Promise<boolean | string[]>;
    /**
     * Manipulate list.
     * @param {String} chatId
     * @param {String} listName
     * @param {Array} newData
     * @param {Number} Index required if using `delete` action
     * @param {String} action can be `add` or `delete` or `edit`
     * @returns {Promise} `Data` object
     */
    static ListData: (chatId: any, listName: any, newData: any, index: any, action: any) => Promise<unknown>;
    /**
     * Add list content to list data.
     * @param {String} chatId
     * @param {String} listName
     * @param {Array} newData[]
     * @returns {Promise} `Promise` that resolve `listData[]` or `false` if not exist
     */
    static addListData: (chatId: any, listName: any, newData: any) => Promise<unknown>;
    /**
     * get list content of list data.
     * @param {String} chatId
     * @param {String} listName
     * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
     */
    static getListData: (chatId: any, listName: any) => Promise<unknown>;
    /**
     * remove list content of list data.
     * @param {String} chatId
     * @param {String} listName
     * @param {Number} index
     * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
     */
    static removeListData: (chatId: any, listName: any, index: any) => Promise<unknown>;
    /**
     * edit list content of list data.
     * @param {String} chatId
     * @param {String} listName
     * @param {Number} index
     * @returns {Promise} `Promise` that resolve `listContentData[]` or `false` if not exist
     */
    static editListData: (chatId: any, listName: any, newData: any, index: any) => Promise<unknown>;
}
//# sourceMappingURL=list.d.ts.map
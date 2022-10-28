import { Logger } from 'pino';
export default class Utils {
    /**
     * check if the object has a specific key
     * @param key
     * @param obj
     * @returns
     */
    static isObjKey<T>(key: PropertyKey, obj: T): key is keyof T;
    static isNumber: (x: any) => boolean;
    static delay: (ms: any) => false | Promise<unknown>;
    /**
      * sanitize user input before processin it
      * @param strings
      * @param values
      */
    static sanitize(strings: any, ...values: any[]): any;
    /**
     * remove item from array
     * @param items array
     * @param index index of the item to remove (delete)
     * @returns the array without the removed item
     */
    static removeItemWithSlice(items: any, index: any): any[];
    /**
     * Select a ramdom item from array. sililar to Lodash
     * @param myArray
     * @returns
     */
    static selectRamdomFromArray(myArray: any): any;
    /**
    * Create shorturl
    *
    * @param  {String} url
    */
    static urlShortener(url: any): Promise<any>;
    static spinner: {
        interval: number;
        frames: string[];
    };
    static globalSpinner: any;
    static getGlobalSpinner(disableSpins?: boolean): any;
    static spins: any;
    static start(id: any, text: any): void;
    static success(id: any, text: any): void;
    static close(id: any, text: any): void;
    static format(...args: any[]): string;
    static getGroupAdmins(participantes: any): any[];
    static formatp: (size: number) => string;
    /**
     *
     * @param {*} format  to get only time:'HH:m:s'
     * @param {*} date
     * @returns the date/time in the desired format
     */
    static getTime(format: any, date: any): string;
    static getTimefromTimestamp(timestamp: any): string;
    static _sleep(ms: any): Promise<unknown>;
    static sleep: (delay: any) => Promise<unknown>;
    static clockString(seconds: any): string;
    static fetchJson(url: any, options?: {}): Promise<any>;
    static fetchJsonPOST(url: any, options?: {}): Promise<any>;
    /**
 * Fetch Text from Url
 *
 * @param {String} url
 * @param {Object} options
 */
    static fetchText: (url: any, options: any) => Promise<unknown>;
    /**
     * Fetch base64 from url
     * @param {String} url
     */
    static fetchBase64: (url: any, mimetype: any) => Promise<unknown>;
    /**
     * Get buffer from direct media.
     * @param {string} url
     * @param {object} [options]
     * @returns {Promise<Buffer>}
     */
    static fetchBuffer: (url: any, options: any) => Promise<any>;
    /**
     * Upload Image to Telegra.ph
     *
     * @param  {String} base64 image buffer
     * @param  {Boolean} resize
     */
    static uploadImages: (buffData: any, fileName: any, resize: boolean) => Promise<unknown>;
    static getBuffer(url: any, options?: {}): Promise<any>;
    static jsonformat(string: any): string;
    static logic(check: any, inp: any, out: any): any;
    static parseMention(text?: string): string[];
    static getRandom(ext: any): string;
    /**
    * Get text with color
    * @param  {String} text
    * @param  {String} color
    * @return  {String} Return text with color
    */
    static _color(text: any, color: any): any;
    /**
     * Get Time duration
     * @param  {number} timestamp
     * @param  {Date|string} now
     * @return duration in econds
     */
    static processTime(timestamp: number, now: any): number;
    /**
     * is it url?
     * @param  {String} url
     */
    static isUrl(url: any): any;
    /**
     *Download any media from URL
     *@param {String} url
     *@param {Path} locate
     *@param {Callback} callback
     */
    static download(url: any, path: any, callback: any): void;
    static createReadFileSync(path: any): any;
    static formatin(duit: any): any;
    static inArray(needle: any, haystack: any): number;
    static last(array: any, n: any): any;
    static unlinkIfExists(path: any, path2?: string): void;
    static lolApi(slash: any, parm: any): string;
    static previousCmds: any[];
    static prev: {
        savePrevCmd: (inpSender: any, prevCmd: any) => void;
        getPrevCmd: (inpSender: any) => any;
        hasPrevCmd: (inpSender: any) => boolean;
        delPrevCmd: (inpSender: any) => void;
    };
    /**
     * Create serial ID.
     * @param {number} size
     * @returns {string}
     */
    static createSerial(size: any): string;
    /**
     * Dateoptions  of utils
     *  dateStyle, timeStyle, calendar, dayPeriod, numberingSystem, localeMatcher, weekday, era, year, month, day, hour, minute, second, fractionalSecondDigits, timeZoneName.
     */
    static Dateoptions: {
        weekday: string;
        year: string;
        month: string;
        day: string;
    };
    /**
     * return date (now) in human readeble format, acoording locale
     */
    static get dateComplete(): string;
    static get saluHora(): string;
    static color(text: any, color?: string): any;
    /**
     * Normalize a string. replace acents and diacritics characters
     * @param {*} str
     * @returns
     */
    static stringNormalize(str: any): any;
    static convertSticker(base64: any, author: any, pack: any): Promise<unknown>;
    /**
   * Returns an array with arrays of the given size.
   *
   * @param myArray {Array} array to split
   * @param chunk_size {Integer} Size of every group
   */
    static chunkArray(myArray: any, chunk_size: any): any[];
    /**
  * treat Error
  * @param error
  * @param logger
  * @returns
  */
    static treatError(error: unknown, logger: Console | Logger): null;
    /**
     * Give a time timit to wait for a promise
     * @param timeLimit
     * @param task
     * @param failureValue
     * @returns
     */
    static fulfillWithTimeLimit(timeLimit: any, task: any, failureValue: any): Promise<any>;
    static formatWAUserNumber(number: string): any;
}
export declare class msgFilter {
    static usedCommandRecently: Set<unknown>;
    /**
     * Check is number filtered
     * @param  {String} from
     */
    static isFiltered: (from: any) => boolean;
    /**
     * Add number to filter
     * @param  {String} from
     */
    static addFilter: (from: any, delay: any) => void;
    static replaceSpecialChars: (str: any) => any;
}
export declare class DataCache {
    millisecondsToLive: any;
    fetchFunction: any;
    cache: any;
    fetchDate: any;
    constructor(fetchFunction: any, minutesToLive?: number);
    isCacheExpired(): boolean;
    getData(): any;
    resetCache(): void;
}
//# sourceMappingURL=functions.d.ts.map
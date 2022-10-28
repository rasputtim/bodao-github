export default class Register {
    static getRegisteredRandomId(): any;
    /**
     * Get random user ID.
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredRandomId(_dir: object): string;
    static createSerial(serial: any): string;
    /**
     * Check is user registered.
     * @param {string} userId
     * @param {object} _dir
     * @returns {boolean}
     */
    static _checkRegisteredUser(userId: string, _dir: object): boolean;
    /**
     * Check is user registered.
     * @param {string} userId
     * @returns {boolean}
     */
    static checkRegisteredUser(userId: string): boolean;
    /**
     * Check is user registered from given serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {boolean}
     */
    static checkRegisteredUserFromSerial(serial: string, _dir: object): boolean;
    /**
     * Get registered user ID.
     * @param {string} userId
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredUserId(userId: string, _dir: object): string;
    /**
     * Check user name from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredNameFromSerial(serial: string, _dir: object): string;
    /**
     * Check user age from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {number}
     */
    static getRegisteredAgeFromSerial(serial: string, _dir: object): number;
    /**
     * Check user time registration from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredTimeFromSerial(serial: string, _dir: object): string;
    /**
     * Check user ID from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredIdFromSerial(serial: string, _dir: object): string;
    /**
         * @returns the registered users, if it is, otherwise returns an empty array
         */
    static getRegisteredUsers(UserDatabase: any): any;
}
//# sourceMappingURL=register.d.ts.map
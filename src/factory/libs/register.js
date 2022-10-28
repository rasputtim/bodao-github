import crypto from 'crypto';
import FileDB from '../../basededatos/fileDatabase.js';
export default class Register {
    static getRegisteredRandomId() {
        //if there is any registered user only in the memory, the system will not use it to ger the rray lenght
        return BotDB.registered[Math.floor(Math.random() * Register.getRegisteredUsers(FileDB.usersDB).length)].id;
    }
    ;
    static createSerial(serial) {
        return crypto.randomBytes(serial).toString('hex').slice(0, serial);
    }
    ;
    /**
     * Check is user registered.
     * @param {string} userId
     * @param {object} _dir
     * @returns {boolean}
     */
    static _checkRegisteredUser(userId, _dir) {
        let status = false;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].id === userId) {
                status = true;
            }
        });
        return status;
    }
    /**
     * Check is user registered.
     * @param {string} userId
     * @returns {boolean}
     */
    static checkRegisteredUser(userId) {
        return Register._checkRegisteredUser(userId, BotDB.registered);
    }
    ;
    /**
     * Check is user registered from given serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {boolean}
     */
    static checkRegisteredUserFromSerial(serial, _dir) {
        let status = false;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].serial === serial) {
                status = true;
            }
        });
        return status;
    }
    /**
     * Get registered user ID.
     * @param {string} userId
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredUserId(userId, _dir) {
        let position = null;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].id === userId) {
                position = i;
            }
        });
        if (position !== null) {
            return _dir[position].id;
        }
    }
    /**
     * Check user name from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredNameFromSerial(serial, _dir) {
        let position = null;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].serial === serial) {
                position = i;
            }
        });
        if (position !== null) {
            return _dir[position].name;
        }
    }
    /**
     * Check user age from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {number}
     */
    static getRegisteredAgeFromSerial(serial, _dir) {
        let position = null;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].serial === serial) {
                position = i;
            }
        });
        if (position !== null) {
            return _dir[position].age;
        }
    }
    /**
     * Check user time registration from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredTimeFromSerial(serial, _dir) {
        let position = null;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].serial === serial) {
                position = i;
            }
        });
        if (position !== null) {
            return _dir[position].time;
        }
    }
    /**
     * Check user ID from serial.
     * @param {string} serial
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredIdFromSerial(serial, _dir) {
        let position = null;
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].serial === serial) {
                position = i;
            }
        });
        if (position !== null) {
            return _dir[position].id;
        }
    }
    /**
     * Get random user ID.
     * @param {object} _dir
     * @returns {string}
     */
    static getRegisteredRandomId(_dir) {
        return _dir[Math.floor(Math.random() * _dir.length)].id;
    }
    /**
         * @returns the registered users, if it is, otherwise returns an empty array
         */
    static getRegisteredUsers(UserDatabase) {
        if (typeof UserDatabase === 'string') {
            const myDatabase = User.loadObjects();
        }
        else if (typeof UserDatabase === 'object') {
            const myDatabase = UserDatabase;
        }
        if (Array.isArray(myDatabase) && myDatabase.length > 0) {
            return myDatabase.filter((user) => {
                return user.isRegistered === true;
            });
        }
        else
            return [];
    }
}
//# sourceMappingURL=register.js.map
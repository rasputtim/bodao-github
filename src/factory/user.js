var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import lodash from 'lodash';
import { JSONFileSync, LowSync } from 'lowdb';
import moment from 'moment';
import FileDB from '../basededatos/fileDatabase.js';
import LibraryDB from '../factory/library.js';
import Base_ from './base.js';
import Utils from './libs/functions.js';
import Level from './libs/level.js';
import logger from './logger.js';
/**
  * Users are message senders
  * One user can talk to the bot iusing several chats. For instance
  * One user can participate in several groups where the bot is available and one user can talk to the bot in private
 */
export default class User extends Base_ {
    constructor(_id, userObj = null) {
        super();
        this._BotLimitVal = 30;
        this._exp = 0;
        this._limit = 15;
        this._lastchain = 0;
        this._registered = false;
        this._name = '';
        this._pushName = '';
        this._serial = '';
        this._age = 0;
        this._regTime = '';
        this._afk = false;
        this._afkTime = '';
        this._afkReason = '';
        this._banned = false;
        this._warn = 0;
        this._level = [];
        this._role = 'Beginner';
        this._autolevelup = true;
        this._money = 0;
        this._healt = 100;
        this._warning = 0;
        this._potion = 10;
        this._garbage = 0;
        this._wood = 0;
        this._stone = 0;
        this._string = 0;
        this._emerald = 0;
        this._diamond = 0;
        this._gold = 0;
        this._iron = 0;
        this._common = 0;
        this._uncommon = 0;
        this._mythic = 0;
        this._legendary = 0;
        this._pet = 0;
        this._horse = 0;
        this._horseexp = 0;
        this._cat = 0;
        this._catexp = 0;
        this._fox = 0;
        this._foxexp = 0;
        this._dog = 0;
        this._dogexp = 0;
        this._horselastfeed = 0;
        this._catlastfeed = 0;
        this._foxlastfeed = 0;
        this._doglastfeed = 0;
        this._armor = 0;
        this._armordurability = 0;
        this._sword = 0;
        this._sworddurability = 0;
        this._pickaxe = 0;
        this._pickaxedurability = 0;
        this._fishingrod = 0;
        this._fishingroddurability = 0;
        this._lastclaim = 0;
        this._lastadventure = 0;
        this._lastfishing = 0;
        this._lastdungeon = 0;
        this._lastduel = 0;
        this._lastmining = 0;
        this._lasthunt = 0;
        this._lastweekly = 0;
        this._lastmonthly = 0;
        this._blockedTags = [];
        this._blockedCommands = [];
        this._id = _id;
        if (userObj)
            this._parse(userObj);
    }
    //getters
    _parse(userObj) {
        if (userObj) {
            this._exp = userObj._exp ? userObj._exp : 0;
            this._limit = userObj._limit ? userObj._limit : 15;
            this._lastchain = userObj._lastchain ? userObj._lastchain : 0;
            this._registered = userObj._registered ? userObj._registered : false;
            this._name = userObj._name ? userObj._name : '';
            this._pushName = userObj._pushName ? userObj._pushName : '';
            this._serial = userObj._serial ? userObj._serial : '';
            this._age = userObj._age ? userObj._age : 0;
            this._regTime = userObj._regTime ? userObj._regTime : '';
            this._afk = userObj._afk ? userObj._afk : false;
            this._afkTime = userObj._afkTime ? userObj._afkTime : '';
            this._afkReason = userObj._afkReason ? userObj._afkReason : '';
            this._banned = userObj._banned ? userObj._banned : false;
            this._warn = userObj._warn ? userObj._warn : 0;
            this._level = userObj._level ? userObj._level : [];
            this._role = userObj._role ? userObj._role : 'Beginner';
            this._autolevelup = userObj._autolevelup ? userObj._autolevelup : true;
            this._money = userObj._money ? userObj._money : 0;
            this._healt = userObj._healt ? userObj._healt : 100;
            this._warning = userObj._warning ? userObj._warning : 4;
            this._potion = userObj._potion ? userObj._potion : 10;
            this._garbage = userObj._garbage ? userObj._garbage : 0;
            this._wood = userObj._wood ? userObj._wood : 0;
            this._stone = userObj._stone ? userObj._stone : 0;
            this._string = userObj._string ? userObj._string : 0;
            this._emerald = userObj._emerald ? userObj._emerald : 0;
            this._diamond = userObj._diamond ? userObj._diamond : 0;
            this._gold = userObj._gold ? userObj._gold : 0;
            this._iron = userObj._iron ? userObj._iron : 0;
            this._common = userObj._common ? userObj._common : 0;
            this._uncommon = userObj._uncommon ? userObj._uncommon : 0;
            this._mythic = userObj._mythic ? userObj._mythic : 0;
            this._legendary = userObj._legendary ? userObj._legendary : 0;
            this._pet = userObj._pet ? userObj._pet : 0;
            this._horse = userObj._horse ? userObj._horse : 0;
            this._horseexp = userObj._horseexp ? userObj._horseexp : 0;
            this._cat = userObj._cat ? userObj._cat : 0;
            this._catexp = userObj._catexp ? userObj._catexp : 0;
            this._fox = userObj._fox ? userObj._fox : 0;
            this._foxexp = userObj._foxexp ? userObj._foxexp : 0;
            this._dog = userObj._dog ? userObj._dog : 0;
            this._dogexp = userObj._dogexp ? userObj._dogexp : 0;
            this._horselastfeed = userObj._horselastfeed ? userObj._horselastfeed : 0;
            this._catlastfeed = userObj._catlastfeed ? userObj._catlastfeed : 0;
            this._foxlastfeed = userObj._foxlastfeed ? userObj._foxlastfeed : 0;
            this._doglastfeed = userObj._doglastfeed ? userObj._doglastfeed : 0;
            this._armor = userObj._armor ? userObj._armor : 0;
            this._armordurability = userObj._armordurability ? userObj._armordurability : 0;
            this._sword = userObj._sword ? userObj._sword : 0;
            this._sworddurability = userObj._sworddurability ? userObj._sworddurability : 0;
            this._pickaxe = userObj._pickaxe ? userObj._pickaxe : 0;
            this._pickaxedurability = userObj._pickaxedurability ? userObj._pickaxedurability : 0;
            this._fishingrod = userObj._fishingrod ? userObj._fishingrod : 0;
            this._fishingroddurability = userObj._fishingroddurability ? userObj._fishingroddurability : 0;
            this._lastclaim = userObj._lastclaim ? userObj._lastclaim :
                this._lastadventure = userObj._lastadventure ? userObj._lastadventure : 0;
            this._lastfishing = userObj._lastfishing ? userObj._lastfishing : 0;
            this._lastdungeon = userObj._lastdungeon ? userObj._lastdungeon : 0;
            this._lastduel = userObj._lastduel ? userObj._lastduel : 0;
            this._lastmining = userObj._lastmining ? userObj._lastmining : 0;
            this._lasthunt = userObj._lasthunt ? userObj._lasthunt : 0;
            this._lastweekly = userObj._lastweekly ? userObj._lastweekly : 0;
            this._lastmonthly = userObj._lastmonthly ? userObj._lastmonthly : 0;
            this._blockedTags = userObj._blockedTags ? Array.from(userObj._blockedTags) : [];
            this._blockedCommands = userObj._blockedCommands ? Array.from(userObj._blockedCommands) : [];
        }
    }
    static getUserFromId(userId) {
        if (!User._users) {
            User._users = User.loadObjects(); //in memory database
        }
        if (userId instanceof User) {
            userId = userId.id;
        }
        if (typeof userId === 'object') {
            userId = userId.id;
        }
        let found = User.users[userId];
        if (!found) {
            const newObject = User.addUser(userId);
            return newObject;
        }
        else
            return found;
    }
    static get users() { return User._users; }
    get id() { return this._id; }
    static get registered() {
        const data = User._users;
        const registered = LibraryDB.register.getRegisteredUsers(data);
        return registered;
    }
    /**
       * check if some user is or not registered
       * @param {string} userID the Id of the user to cjheck
       * @returns true if the user is registered
       */
    static isRegisteredUser(userID) {
        return Object.keys(User._users).find((u) => {
            User._users[u].id === userID && User._users[u].isRegistered === true;
        });
    }
    /**
     *
     * @param userId
     * @returns
     */
    static addUser(userId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        const database = User._users;
        const user = database[userId] = new User(userId, null);
        user.save();
        //BotDB.saveUsers()
        return user;
    }
    /**
   * banish user from the bot
   * @param registro  user id where ban mode will be enabled
   */
    static banUser(registro) {
        if (registro == null || registro == undefined || typeof registro !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!User._users[registro])
            User.addUser(registro);
        let myUser = User._users[registro];
        myUser.banUser = true;
        User.saveUser(myUser);
        //BotDB.saveUsers()
    }
    /**
      * disable banish mode for the private chat with users
      * @param registro  user id where ban mode will be disabled
      */
    static disableUserBan(registro) {
        if (registro == null || registro == undefined || typeof registro !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!User._users[registro])
            User.addUser(registro);
        let myUser = User._users[registro];
        myUser.banUser = false;
        User.saveUser(myUser);
        //BotDB.saveUsers()
    }
    /**
      * unbanish user from the bot
      * @param registro  user id where ban mode will be enabled
      */
    static unBanUser(registro) {
        if (registro == null || registro == undefined || typeof registro !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!User._users[registro])
            User.addUser(registro);
        let myUser = User._users[registro];
        myUser.banUser = false;
        User.saveUser(myUser);
        //BotDB.saveUsers()
    }
    get exp() { return this._exp; }
    get level() { return this._level; }
    get limit() { return this._limit; }
    get lastchain() { return this._lastchain; }
    get isRegistered() { return this._registered; }
    get name() { return this._name; }
    get pushName() { return this._pushName; }
    get age() { return this._age; }
    get regTime() { return this._regTime; }
    get serial() { return this._serial; }
    get isBanned() { return this._banned; }
    get warn() { return this._warn; }
    static getUsersAdapter(path) {
        const adapter = new JSONFileSync(path);
        const dbUsers = new LowSync(adapter);
        dbUsers.read();
        //if there is no data create the db
        dbUsers.data || (dbUsers.data = { userList: [] });
        dbUsers.write();
        dbUsers.chain = lodash.chain(dbUsers.data);
        return dbUsers;
    }
    static isUser(user) {
        if (user && typeof user === 'string')
            return user.includes('@s.whatsapp.net');
        else
            return false;
    }
    save() {
        User.saveUser(this);
    }
    /**
     *
     * @param user user to save in database
     * @returns
     */
    static saveUser(user) {
        if (!User.isUser(user._id))
            return;
        try {
            User.db.read(); //get da current database
            const Users = User.db.chain.get('userList');
            let userFound = Users.find({ id: user._id }).value();
            if (userFound && userFound.id === user._id) {
                const getNote = user;
                User.db.chain.get('userList').find({ id: user._id }).set('data', getNote).value();
                User.db.data = User.db.chain;
                User.db.write();
                return true;
            }
            else {
                // let obj = {}
                //obj[user._id]=user
                //const u = JSON.stringify(user)
                User.db.chain.get('userList').push({ id: user._id, data: user }).value();
                User.db.data = User.db.chain;
                User.db.write();
                return true;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     *
     * @param user user to save in database
     * @returns
     */
    static saveUsers() {
        if (!User._users)
            return;
        Object.keys(User._users).forEach((user) => {
            if (User.isUser(User._users[user]._id))
                User.saveUser(User._users[user]);
        });
    }
    //========Register======================
    /**
    * Users are message senders
    * One user can talk to the bot iusing several chats. For instance
    * One user can participate in several groups where the bot is available and one user can talk to the bot in private
    */
    static loadObjects() {
        try {
            if (!User.db) {
                User.db = User.getUsersAdapter(FileDB.usersDB);
            }
            //let theusers = JSON.parse(fs.readFileSync(FileDB.usersDB) as any)
            let _users = {};
            User.db.read();
            const OBJECTS = User.db.chain.get('userList');
            OBJECTS.forEach((us) => {
                if (us.id !== 'userList') {
                    let myUser = new User(us.id, us.data);
                    _users[us.id] = myUser;
                }
            }).value();
            return _users;
        }
        catch (err) {
            Utils.treatError(err, logger);
        }
    }
    /**
     * Register the user
     * @param name name of the user
     * @param age age of the user
     * @returns true if the user was registered , false otherwise
     */
    register(name, age) {
        if (typeof name !== 'string' && typeof age !== 'number')
            return false;
        this._serial = LibraryDB.register.createSerial(20);
        this._name = name;
        this._age = age;
        this._regTime = moment().format(`DD/MM/YY HH:mm:ss`);
        this._registered = true;
        User.saveUser(this);
        return true;
    }
    /**
     * unregister the user
     */
    unregister() {
        this._registered = false;
        this._serial = '';
        User.saveUser(this);
    }
    //========Leveling=======================
    createLevelReg(chatId, xp = 1, level = 1) {
        const obj = { chatId: chatId, xp: xp, level: level };
        this._level.push(obj);
    }
    getLevel(chatId) {
        let ret = 1;
        const found = this._level.find((ch) => ch.chatId === chatId);
        if (found)
            ret = found.level;
        else {
            this.createLevelReg(chatId);
            ret = 1;
        }
        //ret= Level.getLevelingLevel(this._id,chatId)  
        return ret;
    }
    getXp(chatId) {
        let ret = 1;
        const found = this._level.find((ch) => ch.chatId === chatId);
        if (found)
            ret = found.xp;
        else {
            this.createLevelReg(chatId);
            ret = 1;
        }
        //ret = Level.getLevelingXp(this._id,chatId) 
        return ret;
    }
    get blockedTags() { return this._blockedTags; }
    get blockedCommands() { return this._blockedCommands; }
    get role() { return this._role; }
    get autolevelup() { return this._autolevelup; }
    get money() { return this._money; }
    get healt() { return this._healt; }
    get warning() { return this._warning; }
    get potion() { return this._potion; }
    get garbage() { return this._garbage; }
    get wood() { return this._wood; }
    get stone() { return this._stone; }
    get string() { return this._string; }
    get emerald() { return this._emerald; }
    get diamond() { return this._diamond; }
    get gold() { return this._gold; }
    get iron() { return this._iron; }
    get common() { return this._common; }
    get uncommon() { return this._uncommon; }
    get mythic() { return this._mythic; }
    get legendary() { return this._legendary; }
    get pet() { return this._pet; }
    get horse() { return this._horse; }
    get horseexp() { return this._horseexp; }
    get cat() { return this._cat; }
    get catexp() { return this._catexp; }
    get fox() { return this._fox; }
    get foxexp() { return this._foxexp; }
    get dog() { return this._dog; }
    get dogexp() { return this._dogexp; }
    get horselastfeed() { return this._horselastfeed; }
    get catlastfeed() { return this._catlastfeed; }
    get foxlastfeed() { return this._foxlastfeed; }
    get doglastfeed() { return this._doglastfeed; }
    get armor() { return this._armor; }
    get armordurability() { return this._armordurability; }
    get sword() { return this._sword; }
    get sworddurability() { return this._sworddurability; }
    get pickaxe() { return this._pickaxe; }
    get pickaxedurability() { return this._pickaxedurability; }
    get fishingrod() { return this._fishingrod; }
    get fishingroddurability() { return this._fishingroddurability; }
    get lastclaim() { return this._lastclaim; }
    get lastadventure() { return this._lastadventure; }
    get lastfishing() { return this._lastfishing; }
    get lastdungeon() { return this._lastdungeon; }
    get lastduel() { return this._lastduel; }
    get lastmining() { return this._lastmining; }
    get lasthunt() { return this._lasthunt; }
    get lastweekly() { return this._lastweekly; }
    get lastmonthly() { return this._lastmonthly; }
    get isAFK() { return this._afk; }
    get afkStartTime() { return this._afkTime; }
    get afkReason() { return this._afkReason; }
    set blockedTags(v) { this._blockedTags = v; }
    set blockedCommands(v) { this._blockedCommands = v; }
    set banUser(v) { this._banned = v; }
    set pushName(v) { this._pushName = v; }
    /**
     * Sets bot limit val (the max limit for user to be able to use commands)
     */
    set BotLimitVal(v) { this._BotLimitVal = v; }
    /**
     * Add Level tho the user in the chatId conversation
     * @param chatId chat id
     * @param amount amount of level to add to the user
     */
    addLevel(chatId, amount) {
        const found = this._level.find((ch) => ch.chatId === chatId);
        if (found)
            found.level += amount;
        else {
            this.createLevelReg(chatId);
        }
        //Level.addLevel(this._id,chatId,amount)
    }
    /**
   * Add Xp tho the user in the chatId conversation
   * @param chatId chat id
   * @param amount amount of Xp to add to the user
   */
    addXp(chatId, amount) {
        const found = this._level.find((ch) => ch.chatId === chatId);
        if (found)
            found.xp += amount;
        else {
            this.createLevelReg(chatId);
        }
        //Level.addXp(this._id,chatId,amount)
    }
    /**
     * get the main role of this user in the chatId converstion
     * @param chatId chat id
     * @returns the role
     */
    getRole(chatId) {
        return Level.getRole(this.getLevel(chatId));
    }
    /**
     * get the secondary role of this user in the chatId converstion
     * @param chatId chat id
     * @returns the role
     */
    getRole2(chatId) {
        return Level.getRole2(this.getXp(chatId));
    }
    /**
     * get the levelbar for this user in the chatId converstion
     * @param chatId chat id
     * @returns the levelbar
     */
    getLevelBar(chatId) {
        return Level.getLevelBar(this.getLevel(chatId), this.getXp(chatId));
    }
    //////=========LIMIT =============
    set limitInc(v) { this._limit += v; }
    set limitDec(v) { this._limit -= v; }
    set newLimit(v) { this._limit = v; }
    get isLimited() { return this._limit <= this.BotLimitVal; }
    getRemainingLimit() {
        let newLimit = this.BotLimitVal - this._limit;
        return newLimit;
    }
    //=================== AFK ==============
    enableAfk(time, reason) {
        this._afk = true;
        this._afkTime = time;
        this._afkReason = reason;
        User.saveUser(this);
    }
    disableAfk(time) {
        this._afk = false;
        this._afkReason = 'afk not enabled';
        this._afkTime = time;
        User.saveUser(this);
    }
    //======Block Tags=======
    createblockTAG(chatId, tag) {
        const obj = { chat: chatId, tags: [tag] };
        this._blockedTags.push(obj);
    }
    getblockedTAGS(chatId) {
        let ret = null;
        const found = this._blockedTags.find((ch) => ch.chat === chatId);
        if (found)
            ret = Array.from(found.tags);
        return ret;
    }
    /**
     * add TAG to the Blocked Tags for the User
     * @param theChat the group
     * @param theTag  the tag
     */
    addBlockedTag(theChat, theTag) {
        let found = this._blockedTags.find(c => {
            return c.chat === theChat;
        });
        if (found) {
            found.tags.push(theTag);
        }
        else {
            this.createblockTAG(theChat, theTag);
        }
    }
    removeblockdTag(chatId, tag) {
        const found = this._blockedTags.find((ch) => ch.chat === chatId);
        if (found) {
            const index = found.tags.indexOf(tag);
            found.tags.splice(index, 1);
        }
    }
    /**
     * Check if a tag is blockd in the desired group
     * @param chatId the group
     * @param tag
     * @returns true if the tag is blocked for the chat
     */
    isTagBlockedForChat(chatId, tag) {
        let ret = false;
        const found = this._blockedTags.find((ch) => ch.chat === chatId);
        if (found) {
            const index = found.tags.indexOf(tag);
            if (index >= 0)
                ret = true;
        }
        return false;
    }
    /**
     * return array with chats where the tag is blocked
     * @param tag
     * @returns return array with chats where the tag is blocked, null if it is not
     */
    isTAGBlockedArray(tag) {
        let ret = [];
        this._blockedTags.forEach((ch) => {
            const index = ch.tags.indexOf(tag);
            if (index >= 0)
                ret.push(ch.chat);
        });
        if (ret.length == 0)
            ret = null;
        return ret;
    }
    //======Block Commands=======
    createblockedCommand(chatId, command) {
        const obj = { chat: chatId, commands: [command] };
        this._blockedCommands.push(obj);
    }
    /**
     * Get array with blocked commands for this user in the chat
     * @param chatId  chat to get blocked commands for the user
     * @returns
     */
    getblockedCommands(chatId) {
        let ret = null;
        const found = this._blockedCommands.find((ch) => ch.chat === chatId);
        if (found)
            ret = Array.from(found.commands);
        return ret;
    }
    /**
     * Block a command for this user in the requested chat/group
     * @param chatId id of the chat to block the command
     * @param command the command to block
     */
    addBlockedCommand(chatId, command) {
        const found = this._blockedCommands.find((ch) => ch.chat === chatId);
        if (found)
            found.commands.push(command);
        else {
            this.createblockedCommand(chatId, command);
        }
    }
    /**
     * block a command for the user in the requested chat
     * @param chatId chat to block the command for this user
     * @param command command to block
     */
    bockCommand(chatId, command) {
        this.addBlockedCommand(chatId, command);
    }
    removeblockedCommand(chatId, tag) {
        const found = this._blockedCommands.find((ch) => ch.chat === chatId);
        if (found) {
            const index = found.commands.indexOf(tag);
            found.commands.splice(index, 1);
        }
    }
    /**
    * Check if a command is blockd in the desired group
    * @param theChat
    * @param theCommand
    * @returns true if the command is blocked for the chat
    */
    isCommandBlockedForChat(theChat, theCommand) {
        let ret = false;
        let found = this._blockedCommands.find(c => {
            return c.chat === theChat;
        });
        if (found) {
            ret = found.commands.includes(theCommand);
        }
        else
            ret = false;
        return ret;
    }
    /**
     * check if the command is blocked in some group
     * @param theCommand
     * @return the array of chats/groups where the command is blocked
     */
    isCommandBlockedArray(theCommand) {
        let ret = [];
        this._blockedCommands.forEach((c) => {
            if (c.commands.includes(theCommand))
                ret.push(c.chat);
        });
        if (ret.length == 0)
            ret = null;
        return ret;
    }
    //  =======  WA MESSING UP WITH USERS
    //conn = message._client
    block() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            return yield this.client.updateBlockStatus(this._id, "block"); // Block user
        });
    }
    unBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            return yield this.client.updateBlockStatus(this._id, "unblock"); // Unblock user
        });
    }
}
User._users = User.loadObjects();
User.db = User.getUsersAdapter(FileDB.usersDB);
//# sourceMappingURL=user.js.map
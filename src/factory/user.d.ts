import Base_ from './base.js';
import { TAGS } from './types/index.js';
declare type ILevelRecord = {
    chatId: string;
    xp: number;
    level: number;
};
declare type ITagBlocked = {
    chat: string;
    tags: TAGS[];
};
declare type ICommandBlocked = {
    chat: string;
    commands: string[];
};
/**
  * Users are message senders
  * One user can talk to the bot iusing several chats. For instance
  * One user can participate in several groups where the bot is available and one user can talk to the bot in private
 */
export default class User extends Base_ {
    private static _users;
    static db: any;
    private _BotLimitVal;
    private _id;
    private _exp;
    private _limit;
    private _lastchain;
    private _registered;
    private _name;
    private _pushName;
    private _serial;
    private _age;
    private _regTime;
    private _afk;
    private _afkTime;
    private _afkReason;
    private _banned;
    private _warn;
    private _level;
    private _role;
    private _autolevelup;
    private _money;
    private _healt;
    private _warning;
    private _potion;
    private _garbage;
    private _wood;
    private _stone;
    private _string;
    private _emerald;
    private _diamond;
    private _gold;
    private _iron;
    private _common;
    private _uncommon;
    private _mythic;
    private _legendary;
    private _pet;
    private _horse;
    private _horseexp;
    private _cat;
    private _catexp;
    private _fox;
    private _foxexp;
    private _dog;
    private _dogexp;
    private _horselastfeed;
    private _catlastfeed;
    private _foxlastfeed;
    private _doglastfeed;
    private _armor;
    private _armordurability;
    private _sword;
    private _sworddurability;
    private _pickaxe;
    private _pickaxedurability;
    private _fishingrod;
    private _fishingroddurability;
    private _lastclaim;
    private _lastadventure;
    private _lastfishing;
    private _lastdungeon;
    private _lastduel;
    private _lastmining;
    private _lasthunt;
    private _lastweekly;
    private _lastmonthly;
    private _blockedTags;
    private _blockedCommands;
    constructor(_id: string, userObj?: null);
    _parse(userObj: any): void;
    static getUserFromId(userId: any): User;
    static get users(): any;
    get id(): any;
    static get registered(): string[];
    /**
       * check if some user is or not registered
       * @param {string} userID the Id of the user to cjheck
       * @returns true if the user is registered
       */
    static isRegisteredUser(userID: any): string | undefined;
    /**
     *
     * @param userId
     * @returns
     */
    static addUser(userId: string): User;
    /**
   * banish user from the bot
   * @param registro  user id where ban mode will be enabled
   */
    static banUser(registro: any): void;
    /**
      * disable banish mode for the private chat with users
      * @param registro  user id where ban mode will be disabled
      */
    static disableUserBan(registro: any): void;
    /**
      * unbanish user from the bot
      * @param registro  user id where ban mode will be enabled
      */
    static unBanUser(registro: any): void;
    get exp(): number;
    get level(): ILevelRecord[];
    get limit(): number;
    get lastchain(): number;
    get isRegistered(): boolean;
    get name(): string;
    get pushName(): string;
    get age(): number;
    get regTime(): string;
    get serial(): string;
    get isBanned(): boolean;
    get warn(): number;
    static getUsersAdapter(path: any): any;
    static isUser(user: string): boolean;
    save(): void;
    /**
     *
     * @param user user to save in database
     * @returns
     */
    static saveUser(user: User): true | undefined;
    /**
     *
     * @param user user to save in database
     * @returns
     */
    static saveUsers(): void;
    /**
    * Users are message senders
    * One user can talk to the bot iusing several chats. For instance
    * One user can participate in several groups where the bot is available and one user can talk to the bot in private
    */
    static loadObjects(): {} | undefined;
    /**
     * Register the user
     * @param name name of the user
     * @param age age of the user
     * @returns true if the user was registered , false otherwise
     */
    register(name: string, age: number): boolean;
    /**
     * unregister the user
     */
    unregister(): void;
    createLevelReg(chatId: any, xp?: number, level?: number): void;
    getLevel(chatId: any): number;
    getXp(chatId: any): number;
    get blockedTags(): ITagBlocked[];
    get blockedCommands(): ICommandBlocked[];
    get role(): string;
    get autolevelup(): boolean;
    get money(): number;
    get healt(): number;
    get warning(): number;
    get potion(): number;
    get garbage(): number;
    get wood(): number;
    get stone(): number;
    get string(): number;
    get emerald(): number;
    get diamond(): number;
    get gold(): number;
    get iron(): number;
    get common(): number;
    get uncommon(): number;
    get mythic(): number;
    get legendary(): number;
    get pet(): number;
    get horse(): number;
    get horseexp(): number;
    get cat(): number;
    get catexp(): number;
    get fox(): number;
    get foxexp(): number;
    get dog(): number;
    get dogexp(): number;
    get horselastfeed(): number;
    get catlastfeed(): number;
    get foxlastfeed(): number;
    get doglastfeed(): number;
    get armor(): number;
    get armordurability(): number;
    get sword(): number;
    get sworddurability(): number;
    get pickaxe(): number;
    get pickaxedurability(): number;
    get fishingrod(): number;
    get fishingroddurability(): number;
    get lastclaim(): number;
    get lastadventure(): number;
    get lastfishing(): number;
    get lastdungeon(): number;
    get lastduel(): number;
    get lastmining(): number;
    get lasthunt(): number;
    get lastweekly(): number;
    get lastmonthly(): number;
    get isAFK(): boolean;
    get afkStartTime(): string;
    get afkReason(): string;
    set blockedTags(v: ITagBlocked[]);
    set blockedCommands(v: ICommandBlocked[]);
    set banUser(v: boolean);
    set pushName(v: string);
    /**
     * Sets bot limit val (the max limit for user to be able to use commands)
     */
    set BotLimitVal(v: number);
    /**
     * Add Level tho the user in the chatId conversation
     * @param chatId chat id
     * @param amount amount of level to add to the user
     */
    addLevel(chatId: string, amount: any): void;
    /**
   * Add Xp tho the user in the chatId conversation
   * @param chatId chat id
   * @param amount amount of Xp to add to the user
   */
    addXp(chatId: string, amount: any): void;
    /**
     * get the main role of this user in the chatId converstion
     * @param chatId chat id
     * @returns the role
     */
    getRole(chatId: any): string;
    /**
     * get the secondary role of this user in the chatId converstion
     * @param chatId chat id
     * @returns the role
     */
    getRole2(chatId: any): string;
    /**
     * get the levelbar for this user in the chatId converstion
     * @param chatId chat id
     * @returns the levelbar
     */
    getLevelBar(chatId: any): string;
    set limitInc(v: number);
    set limitDec(v: number);
    set newLimit(v: number);
    get isLimited(): boolean;
    getRemainingLimit(): number;
    enableAfk(time: string, reason: string): void;
    disableAfk(time: any): void;
    private createblockTAG;
    getblockedTAGS(chatId: any): TAGS[] | null;
    /**
     * add TAG to the Blocked Tags for the User
     * @param theChat the group
     * @param theTag  the tag
     */
    addBlockedTag(theChat: string, theTag: TAGS): void;
    removeblockdTag(chatId: string, tag: TAGS): void;
    /**
     * Check if a tag is blockd in the desired group
     * @param chatId the group
     * @param tag
     * @returns true if the tag is blocked for the chat
     */
    isTagBlockedForChat(chatId: string, tag: TAGS): boolean;
    /**
     * return array with chats where the tag is blocked
     * @param tag
     * @returns return array with chats where the tag is blocked, null if it is not
     */
    isTAGBlockedArray(tag: TAGS): string[] | null;
    private createblockedCommand;
    /**
     * Get array with blocked commands for this user in the chat
     * @param chatId  chat to get blocked commands for the user
     * @returns
     */
    getblockedCommands(chatId: any): string[] | null;
    /**
     * Block a command for this user in the requested chat/group
     * @param chatId id of the chat to block the command
     * @param command the command to block
     */
    addBlockedCommand(chatId: string, command: string): void;
    /**
     * block a command for the user in the requested chat
     * @param chatId chat to block the command for this user
     * @param command command to block
     */
    bockCommand(chatId: string, command: string): void;
    removeblockedCommand(chatId: string, tag: TAGS): void;
    /**
    * Check if a command is blockd in the desired group
    * @param theChat
    * @param theCommand
    * @returns true if the command is blocked for the chat
    */
    isCommandBlockedForChat(theChat: string, theCommand: string): boolean;
    /**
     * check if the command is blocked in some group
     * @param theCommand
     * @return the array of chats/groups where the command is blocked
     */
    isCommandBlockedArray(theCommand: string): string[] | null;
    block(): Promise<any>;
    unBlock(): Promise<any>;
}
export {};
//# sourceMappingURL=user.d.ts.map
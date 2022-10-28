import Base_ from './base.js';
import Group from './group.js';
import { ChatType_t, TAGS } from './types/index.js';
declare type IFloodRegister = {
    pessoa: string;
    contador: number;
    time: number;
};
declare type IPremiunReg = {
    premium: boolean;
    userId: string;
    expired: number;
    tasting: boolean;
};
/** Chats are conversations with the bot */
export default class Chat extends Base_ {
    static db: any;
    private static _chats;
    private _group;
    private _id;
    private _name;
    private _kicked;
    private _isBotEnabled;
    private _welcomeOn;
    private _detect;
    private _sWelcome;
    private _simiOn;
    private _sBye;
    private _sPromote;
    private _sDemote;
    private _delete;
    private _antiImageOn;
    private _antiAudioOn;
    private _antiVideoOn;
    private _antiDocumentOn;
    private _antiWordsOn;
    private _antiPornOn;
    private _antiFloodOn;
    private _antiLinkGroupOn;
    private _antiVirtexOn;
    private _premiumOn;
    private _lastPremiuns;
    private _blockedTags;
    private _blockedCommands;
    private _antiFakeOn;
    private _antiFakeGroupOn;
    private _blackListOn;
    private _viewonce;
    private _antitoxicOn;
    private _antiLinkOn;
    private _levelingOn;
    private _diversionOn;
    private _limitOn;
    private _foreignOn;
    private _animeOn;
    private _NSFWOn;
    private _chatBanOn;
    private _kickOn;
    private _floodingInterval;
    private _chatType;
    floodar: IFloodRegister[];
    constructor(id: string, obj?: null);
    _parse(obj: any): void;
    static getChatFromId(chatId: any): Chat;
    static getChatsAdapter(path: any): any;
    /**
    * Users are message senders
    * One user can talk to the bot iusing several chats. For instance
    * One user can participate in several groups where the bot is available and one user can talk to the bot in private
    */
    static loadObjects(): {} | undefined;
    /**
    *
    * @param chatId the id of the chat to create an object
    * @returns the chat object
    */
    static addChat(chatId: string): Chat;
    /**
     *
     * @param chatId the id of the chat to create an object
     * @returns the chat object
     
     static addChat(chatId:string):Chat{
      if (chatId == null || chatId == undefined || typeof chatId !=='string'){
      throw  new Error('error in the register. not possible to execute action');
      }
      let Ret:Chat = {} as Chat;
      try {
          Chat.db.read() //get da current database
          const Users = Chat.db.chain.get('chatList')
          let objFound = Users.find( { id:chatId } ).value()
          if (objFound && objFound.id === chatId) {
           const chatObj = new Chat(chatId,objFound)
           Chat._chats[chatId] = chatObj
           Ret= chatObj
           return Ret
          } else {
              const myChat = new Chat(chatId,null)
             // let obj = {}
              //obj[chat._id]=chat
              //const u = JSON.stringify(chat)
              Chat.db.chain.get('chatList').push({ id: chatId, data: myChat }).value()
              Chat.db.data = Chat.db.chain
              Chat.db.write()
              Ret= myChat
              return Ret
          }
          return Ret
      } catch (err) {
          Utils.treatError(err,logger)
          return Ret
      }
}
*/
    /**
     *
     * @param chat chat to save in database
     * @returns
     */
    static saveChat(chat: Chat): true | undefined;
    /**
    *
    * @param chat chat to save in database
    * @returns
    */
    static saveChats(): void;
    /**
     * check if there is a chat with the respective chatId
     * @param chatId the chatId to verify
     * @returns the chat object, if it is found, or null if it is not
     */
    static getIsChat(chatId: string): Chat | null;
    static get chats(): any;
    get group(): Group | null;
    /**
     *
     * @returns true if it is a group Chat
     */
    get isGroup(): boolean;
    /**
     *
     * @returns true if it is a Private Chat
     */
    get isPrivate(): boolean;
    get name(): string;
    get id(): string;
    get isBotEnabled(): boolean;
    get isForeignOn(): boolean;
    get isAnimeOn(): boolean;
    get isNSFWOn(): boolean;
    get isBannedModeOn(): boolean;
    get isPremiumOn(): boolean;
    get isPremiumTastingOn(): boolean;
    get premium(): IPremiunReg;
    get isBlackListOn(): boolean;
    get isLevelingOn(): boolean;
    get isDiversionOn(): boolean;
    get isAntiLinkOn(): boolean;
    get isAntiLinkGroupOn(): boolean;
    get isWelcomeOn(): boolean;
    get isAntiFakeOn(): boolean;
    get isAntiFakeGroupOn(): boolean;
    get isAntiVirtexOn(): boolean;
    get isAntitoxicOn(): boolean;
    get isAntiImageOn(): boolean;
    get isAntiAudioOn(): boolean;
    get isAntiDocumentOn(): boolean;
    get isAntiVideoOn(): boolean;
    get isAntiWordsOn(): boolean;
    get isAntiPornOn(): boolean;
    get isAntiFloodOn(): boolean;
    get floodingInterval(): number;
    get isKickModeOn(): boolean;
    get isSimiOn(): boolean;
    get isLimitOn(): boolean;
    get detect(): boolean;
    get sWelcome(): string;
    get viewonce(): boolean;
    get sBye(): string;
    get sPromote(): string;
    get sDemote(): string;
    get delete(): boolean;
    get disabledTags(): TAGS[];
    get type(): ChatType_t;
    isTagBlocked(tag: TAGS): boolean;
    isCommandBlocked(command: string): boolean;
    setUpGroup(): void;
    static isChat(chat: string): boolean | undefined;
    /**
    * save this chat to database
    */
    save(): void;
    /**
    * Flooding control
    * @param sender the sender of the message
    * @param timestamp the timestamp of the sent message
    * @returns true is it is a flooding chat, otherwhise false
    */
    isFlooding(sender: any, timestamp: any): boolean;
    set name(n: string);
    set welcomeOn(v: boolean);
    set detect(v: boolean);
    set sWelcome(v: string);
    set simiOn(v: boolean);
    set sBye(v: string);
    set sPromote(v: string);
    set sDemote(v: string);
    set delete(v: boolean);
    set antiLinkOn(v: boolean);
    set viewonce(v: boolean);
    set antitoxicOn(v: boolean);
    set antiImageOn(v: boolean);
    set antiAudioOn(v: boolean);
    set antiWordsOn(v: boolean);
    set antiPornOn(v: boolean);
    set antiFloodOn(v: boolean);
    set antiLinkGroupOn(v: boolean);
    set antiVirtexOn(v: boolean);
    set premium(obj: IPremiunReg);
    set PremiumTasting(v: boolean);
    set antiFakeOn(v: boolean);
    set antiFakeGroupOn(v: boolean);
    set blackListOn(v: boolean);
    set NSFWOn(v: boolean);
    set animeOn(v: boolean);
    set levelingOn(v: boolean);
    set limitOn(v: boolean);
    set diversionOn(v: boolean);
    set chatBanOn(v: boolean);
    set banned(v: boolean);
    set foreignOn(v: boolean);
    set floodingInterval(v: number);
    set kickModeOn(v: boolean);
    set type(v: ChatType_t);
    set disabledTags(tagsArray: TAGS[]);
    blockTag(tag: TAGS): void;
    unBlockTag(tag: TAGS): void;
    blockCommand(command: string): void;
    unBlockCommand(command: string): void;
    /**
     *
     * @param userId the user id who added premium to this chat
     * @param duration duration (time). default 30d
     * @returns true if Premium was added, false otherwise
     */
    addPremium(userId: any, duration?: string): boolean;
    /**
     * Expire Premium
     * @returns true if removed sucessfuly, false otherwise
     */
    removePremium(): boolean;
    /**
     * enable premium mode for a while so users can test commands
     * @param userId the user id who added premium Tasting to this chat
     * @param duration duration (time). default 30d
     * @returns true if Premium was added, false otherwise
     */
    addPremiumTasting(userId: any, duration?: string): boolean;
    /**
     * Expire Premium Tasting
     * @returns true if removed sucessfuly, false otherwise
     */
    removePremiumTasting(): boolean;
    static getAllPremiumUser(): string[];
    /**
   * if premium has expired, remove it and clean register
   */
    expiredCheck(): void;
    static expiredChecks(): void;
    enableBot(): void;
    disableBot(): void;
    /**
    * enable limit mode for the chat
    * @param {*} chatId chat Id to enable Limit control
    */
    static enableLimitMode(chatId: any): void;
    /**
     * enable antilinkgroup filter for the chat
     * @param {*} chatId chat to enable antilink2 for
     */
    static enableAntiLinkGroup(chatId: string): void;
    /**
     * enable kick mode on this chat
     * @param {*} chatId chat to enable antilink2 for
     */
    static enablekickMode(chatId: string): void;
    /**
     * unkick the user from the chat
     * @param userId user to kick
     * @param chatId chat to kick the user from
     * @returns
     */
    static unkickUser(userId: any, chatId: any): void;
    /**
     * kick User form the chat
     * @param userId user to kick
     * @param chatId chat to kick the user from
     */
    static kickUser(userId: any, chatId: any): void;
    /**
     * check if the user is kicked in some chat
     * @param userId the user to check
     * @param chatId the chat to check
     */
    static isKicked(userId: string, chatId: string): any;
    /**
     * check if the user is kicked in some chat
     * @param userId the user to check
     */
    static isKickedInsomeChat(userId: string): boolean;
    /**
     * Kick user in this chat
     * @param userId id of the user to kick in this chat (only in groups)
     */
    kick(userId: string): void;
    /**
     * unKick user in this chat
     * @param userId id of the user to unKick in this chat (only in groups)
     */
    unKick(userId: string): void;
    /**
     *
     * @param userId
     * @returns true if the user is kicked in this chat
     */
    isKicked(userId: string): boolean;
    /**
     * enable anti foreign mode for the register
     * @param {*} chatId register to enable anti foreign mode
     */
    static enableForeign(chatId: any): void;
    /**
     * enable anti Anti Fake for the register
     * @param {*} chatId register to enable  mode
     */
    static enableAntiFake(chatId: any): void;
    /**
     * enable anti Anti Fake for the specific country for the register
     * @param {*} chatId register to enable  mode
     */
    static enableAntiFakeCountry(chatId: any): void;
    /**
     * enable anti-Flood for the specific country for the register
     * @param {*} chatId chatId to enable  mode
     */
    static enableAntiFlood(chatId: any): void;
    /**
     * enable banish mode for the chat
     * @param chatId  chat id where ban mode will be enabled
     */
    static enableChatBan(chatId: any): void;
    static enableAntilink(chatId: any): void;
    static enableAntivirtex(chatId: any): void;
    static enableAnime(chatId: string): void;
    static enableNsfw(chatId: string): void;
    static enableSimi(chatId: string): void;
    static enableFunMode(chatId: any): void;
    static enableWelcome(chatId: any): void;
    static enableLeveling(chatId: any): void;
    static enablePremium(chatId: any, userId: any, duration?: string): void;
    static enableBlackList(chatId: any): void;
    static enableAntitoxic(chatId: any): void;
    static enableAntiImage(chatId: any): void;
    static enableAntiAudio(chatId: any): void;
    static enableAntiWords(chatId: any): void;
    static enableAntiPorn(chatId: any): void;
    static enableFloodMode(chatId: any): void;
    /**
      * enable bot in the group/chat
      * @param {*} chatId the chat
      */
    static enableBot(chatId: any): void;
    /**
       * disable/reset limit for the specific user
       * @param {*} chatId register/user to disable the mode
       */
    static disableAntilinkGroup(chatId: any): void;
    /**
      * disable anti foreign mode for the specific register
      * @param {*} chatId register to disable the mode
      */
    static disableForeign(chatId: any): void;
    static disableSimi(chatId: string): void;
    /**
     * disable anti fake mode for the specific register
     * @param {*} chatId register to disable the mode
     */
    static disableAntiFake(chatId: any): void;
    /**
     * disable anti fake for the specific country, mode for the specific register
     * @param {*} chatId register to disable the mode
     */
    static disableAntiFakeCountry(chatId: any): void;
    /**
  *  disable banish mode for the chat
  * @param chatId chat to disable de ban mode for
  */
    static disableChatBan(chatId: any): void;
    /**
     * disable kick mode for the chat
     * @param {*} chatId register/user to disable the mode
     */
    static disablekickMode(chatId: any): void;
    static disableAntilink(chatId: any): void;
    static disableAntivirtex(chatId: any): void;
    static disableAnime(chatId: any): void;
    static disableNsfw(chatId: any): void;
    static disableFunMode(chatId: any): void;
    static disableWelcome(chatId: any): void;
    static disableLeveling(chatId: any): void;
    static disableAntiImage(chatId: any): void;
    static disableAntiAudio(chatId: any): void;
    static disableAntiWords(chatId: any): void;
    static disableAntiPorn(chatId: any): void;
    static disableAntiFlood(chatId: any): void;
    static disablePremium(chatId: any): void;
    static disableBlackList(chatId: any): void;
    static disableAntitoxic(chatId: any): void;
    /**
     * disable bot in the group/chat
     * @param {*} chatId the chat
     */
    static disableBot(chatId: any): void;
    static disableLimitMode(chatId: any): void;
    /**
      * return array with all chats where foreign is enables
      */
    static get noForeigns(): string[];
    /**
      * return array with all chats where antiFakesGroups is enabled
      */
    static get antifakesGroups(): string[];
    /**
      * return array with all chats where antifake is enabled
      */
    static get antifakesUsers(): string[];
    /**
    * return array with all chats where antifake is enabled
    */
    static get welcomeChats(): string[];
    /**
     * TODO: Implement it
     * @param chatId
     * @returns
     */
    getLastMessageInChat(chatId: any): string;
    archive(conn: any): Promise<void>;
    mute(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    unMute(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    markRead(read: boolean): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    deleteMessage(messageId: string, messageTimeStamp: string): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    deleteMesage(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    onlyadmin(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    onlyeveryone(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    unlock(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    lock(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    getInvite(): Promise<any>;
    revokeInvite(): Promise<any>;
}
export {};
//# sourceMappingURL=chat.d.ts.map
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
import moment from 'moment-timezone';
import toMs from 'ms';
import FileDB from '../basededatos/fileDatabase.js';
import Base_ from './base.js';
import Group from './group.js';
import Utils from './libs/functions.js';
import Schedule from './libs/schedule.js';
import logger from './logger.js';
import { ChatType } from './types/index.js';
// Save stats users and chats in json every 5 minutes
Schedule.systemJob('*/5 * * * *', () => {
    Chat.expiredChecks();
});
/** Chats are conversations with the bot */
export default class Chat extends Base_ {
    //private _levelDB: Level = Level;
    //anti anuncios de bots mentionedIds
    // antipalavrasbase
    constructor(id, obj = null) {
        super();
        this._group = {};
        this._name = '';
        this._kicked = [];
        // private _isBanned: boolean =  false
        this._isBotEnabled = false;
        this._welcomeOn = true;
        this._detect = true;
        this._sWelcome = '';
        // /******* SIMI SIMI  ******/ isSIMIModeOnSimi
        this._simiOn = false;
        this._sBye = '';
        this._sPromote = '';
        this._sDemote = '';
        this._delete = true;
        this._antiImageOn = false;
        this._antiAudioOn = false;
        this._antiVideoOn = false;
        this._antiDocumentOn = false;
        this._antiWordsOn = false; //anti palavras isAntiPalavra
        this._antiPornOn = false; //antiPorno isAntiPorno
        this._antiFloodOn = true; //antiFlood isFlood  //  flood.includes(from)
        this._antiLinkGroupOn = false;
        this._antiVirtexOn = false; //ok-group antitrava antitrava ANTIVIRTEX (mensagens muito longas)  
        this._premiumOn = {
            premium: false,
            userId: '',
            expired: 0,
            tasting: false
        }; //premium
        this._lastPremiuns = []; //oldPremiuns database
        this._blockedTags = ['HENTAI'];
        this._blockedCommands = [];
        this._antiFakeOn = false; //antiFake
        this._antiFakeGroupOn = false; //antiFakeGroup
        this._blackListOn = false; //blackList
        this._viewonce = true;
        this._antitoxicOn = false;
        this._antiLinkOn = false; //ok
        this._levelingOn = false; //ok
        this._diversionOn = false; //FunMode
        this._limitOn = false; //ok
        this._foreignOn = false; //ok
        this._animeOn = false; //ok
        this._NSFWOn = false;
        this._chatBanOn = false;
        this._kickOn = false;
        this._floodingInterval = 120; //segundos
        this._chatType = ChatType.UNKNOWN;
        this.floodar = [];
        this._id = id;
        if (obj)
            this._parse(obj);
        this.expiredCheck();
    }
    _parse(obj) {
        //this._isBanned = obj._isBanned ? obj._isBanned : false
        this._name = obj.name ? obj.name : '';
        this._welcomeOn = obj.welcomeOn ? obj.welcomeOn : false;
        this._detect = obj._detect;
        this._sWelcome = obj._sWelcome ? obj._sWelcome : false;
        // /******* SIMI SIMI  ******/ isSIMIModeOnSimi
        this._simiOn = obj._simiOn ? obj._simiOn : false;
        this._sBye = obj._sBye;
        this._sPromote = obj._sPromote;
        this._sDemote = obj._sDemote;
        this._delete = obj._delete;
        this._antiImageOn = obj._antiImageOn ? obj._antiImageOn : false;
        this._antiAudioOn = obj._antiAudioOn ? obj._antiAudioOn : false;
        this._antiVideoOn = obj._antiVideoOn ? obj._antiVideoOn : false;
        this._antiDocumentOn = obj._antiDocumentOn ? obj._antiDocumentOn : false;
        this._antiWordsOn = obj._antiWordsOn ? obj._antiWordsOn : false; //anti palavras isAntiPalavra
        this._antiPornOn = obj._antiPornOn ? obj._antiPornOn : false; //antiPorno isAntiPorno
        this._antiFloodOn = obj._antiFloodOn ? obj._antiFloodOn : false; //antiFlood isFlood  //  flood.includes(from)
        this._antiLinkGroupOn = obj._antiLinkGroupOn ? obj._antiLinkGroupOn : false;
        this._antiVirtexOn = obj._antiVirtexOn ? obj._antiVirtexOn : false; //ok-group antitrava antitrava ANTIVIRTEX (mensagens muito longas)  
        this._premiumOn = obj._premiumOn ? Object.assign({}, obj._premiumOn) : {
            premium: false,
            userId: '',
            expired: 0,
            tasting: false
        }; //premium
        this._lastPremiuns = obj._lastPremiuns ? Array.from(obj._lastPremiuns) : [];
        this._isBotEnabled = obj._isBotEnabled ? obj._isBotEnabled : false; //enable/disable bot in this chat
        this._antiFakeOn = obj._antiFakeOn ? obj._antiFakeOn : false; //antiFake
        this._antiFakeGroupOn = obj._antiFakeGroupOn ? obj._antiFakeGroupOn : false; //antiFakeGroup
        this._blackListOn = obj._blackListOn ? obj._blackListOn : false; //blackList
        this._viewonce = obj._viewonce ? obj._viewonce : false;
        this._antitoxicOn = obj._antitoxicOn ? obj._antitoxicOn : false;
        this._antiLinkOn = obj._antiLinkOn ? obj._antiLinkOn : false; //ok
        this._levelingOn = obj._levelingOn ? obj._levelingOn : false; //ok
        this._diversionOn = obj._diversionOn ? obj._diversionOn : false; //FunMode
        this._limitOn = obj._limitOn ? obj._limitOn : false; //ok
        this._foreignOn = obj._foreignOn ? obj._foreignOn : false; //ok
        this._animeOn = obj._animeOn ? obj._animeOn : false; //ok
        this._NSFWOn = obj._NSFWOn ? obj._NSFWOn : false;
        this._chatBanOn = obj._chatBanOn ? obj._chatBanOn : false;
        this.floodar = obj.floodar ? obj.floodar : false;
        this._kickOn = obj._kickOn ? obj._kickOn : false;
        this._floodingInterval = obj._floodingInterval ? obj._floodingInterval : 120;
        this._blockedTags = obj._blockedTags ? Array.from(obj._blockedTags) : ['HENTAI'];
        this._blockedCommands = obj._blockedCommands ? Array.from(obj._blockedCommands) : [];
        this._chatType = obj._chatType ? obj._chatType : ChatType.UNKNOWN;
        this._kicked = obj._kicked ? Array.from(obj._kicked) : [];
        this._group = obj._group ? Group.getGroupForChat(obj._id) : {};
    }
    static getChatFromId(chatId) {
        if (!Chat._chats) {
            Chat._chats = Chat.loadObjects(); //in memory database
        }
        if (chatId instanceof Chat) {
            chatId = chatId.id;
        }
        if (typeof chatId === 'object') {
            chatId = chatId.id;
        }
        let found = Chat._chats[chatId];
        if (!found) {
            const newObject = Chat.addChat(chatId);
            return newObject;
        }
        else
            return found;
    }
    static getChatsAdapter(path) {
        const adapter = new JSONFileSync(path);
        const dbChats = new LowSync(adapter);
        dbChats.read();
        //if there is no data create the db
        dbChats.data || (dbChats.data = { chatList: [] });
        dbChats.write();
        dbChats.chain = lodash.chain(dbChats.data);
        return dbChats;
    }
    /**
    * Users are message senders
    * One user can talk to the bot iusing several chats. For instance
    * One user can participate in several groups where the bot is available and one user can talk to the bot in private
    */
    static loadObjects() {
        try {
            if (!Chat.db) {
                Chat.db = Chat.getChatsAdapter(FileDB.chatsDB);
            }
            let _chats = {};
            Chat.db.read(); //get da current database
            const OBJECTS = Chat.db.chain.get('chatList');
            OBJECTS.forEach((ch) => {
                if (ch.id !== 'chatList') {
                    let myChat = new Chat(ch.id, ch.data);
                    _chats[ch.id] = myChat;
                }
            }).value();
            return _chats;
        }
        catch (err) {
            Utils.treatError(err, logger);
        }
    }
    /**
    *
    * @param chatId the id of the chat to create an object
    * @returns the chat object
    */
    static addChat(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        const database = Chat._chats;
        const chat = database[chatId] = new Chat(chatId, null);
        chat.save();
        //Chat.saveChats();
        //Chat.saveChat(database[chatId])
        return chat;
    }
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
    static saveChat(chat) {
        if (!Chat.isChat(chat._id))
            return;
        try {
            Chat.db.read(); //get da current database
            const Users = Chat.db.chain.get('chatList');
            let objFound = Users.find({ id: chat._id }).value();
            if (objFound && objFound.id === chat._id) {
                const getOBJ = chat;
                Chat.db.chain.get('chatList').find({ id: chat._id }).set('data', getOBJ).value();
                Chat.db.data = Chat.db.chain;
                Chat.db.write();
                return true;
            }
            else {
                // let obj = {}
                //obj[chat._id]=chat
                //const u = JSON.stringify(chat)
                Chat.db.chain.get('chatList').push({ id: chat._id, data: chat }).value();
                Chat.db.data = Chat.db.chain;
                Chat.db.write();
                return true;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
    *
    * @param chat chat to save in database
    * @returns
    */
    static saveChats() {
        if (!Chat._chats)
            return;
        Object.keys(Chat._chats).forEach((chat) => {
            if (Chat.isChat(Chat._chats[chat]._id))
                Chat.saveChat(Chat._chats[chat]);
        });
    }
    /**
     * check if there is a chat with the respective chatId
     * @param chatId the chatId to verify
     * @returns the chat object, if it is found, or null if it is not
     */
    static getIsChat(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        const found = Chat._chats[chatId];
        if (found)
            return found;
        else
            return null;
    }
    //getters
    static get chats() { return Chat._chats; }
    get group() { return this._group; }
    /**
     *
     * @returns true if it is a group Chat
     */
    get isGroup() { return this._id.includes('@g.us'); }
    /**
     *
     * @returns true if it is a Private Chat
     */
    get isPrivate() { return this._id.includes('@s.whatsapp.net'); }
    get name() { return this._name; }
    get id() { return this._id; }
    //get isBanned() { return this._isBanned }
    get isBotEnabled() { return this._isBotEnabled; }
    get isForeignOn() { return this._foreignOn; }
    get isAnimeOn() { return this._animeOn; }
    get isNSFWOn() { return this._NSFWOn; }
    get isBannedModeOn() { return this._chatBanOn; }
    get isPremiumOn() { return this._premiumOn.premium; }
    ;
    get isPremiumTastingOn() { return this._premiumOn.tasting; }
    get premium() { return this._premiumOn; }
    get isBlackListOn() { return this._blackListOn; }
    ;
    get isLevelingOn() { return this._levelingOn; }
    ;
    get isDiversionOn() { return this._diversionOn; }
    ;
    get isAntiLinkOn() { return this._antiLinkOn; }
    ;
    get isAntiLinkGroupOn() { return this._antiLinkGroupOn; }
    ;
    get isWelcomeOn() { return this._welcomeOn; }
    ;
    get isAntiFakeOn() { return this._antiFakeOn; }
    ;
    get isAntiFakeGroupOn() { return this._antiFakeGroupOn; }
    ;
    get isAntiVirtexOn() { return this._antiVirtexOn; }
    ;
    get isAntitoxicOn() { return this._antitoxicOn; }
    ;
    get isAntiImageOn() { return this._antiImageOn; }
    ;
    get isAntiAudioOn() { return this._antiAudioOn; }
    ;
    get isAntiDocumentOn() { return this._antiDocumentOn; }
    ;
    get isAntiVideoOn() { return this._antiVideoOn; }
    ;
    get isAntiWordsOn() { return this._antiWordsOn; }
    ;
    get isAntiPornOn() { return this._antiPornOn; }
    ;
    get isAntiFloodOn() { return this._antiFloodOn; }
    ;
    get floodingInterval() { return this._floodingInterval; }
    get isKickModeOn() { return this._kickOn; }
    get isSimiOn() { return this._simiOn; }
    ;
    get isLimitOn() { return this._limitOn; }
    ;
    get detect() { return this._detect; }
    ;
    get sWelcome() { return this._sWelcome; }
    ;
    get viewonce() { return this._viewonce; }
    ;
    get sBye() { return this._sBye; }
    ;
    get sPromote() { return this._sPromote; }
    ;
    get sDemote() { return this._sDemote; }
    ;
    get delete() { return this._delete; }
    ;
    get disabledTags() { return this._blockedTags; }
    get type() { return this._chatType; }
    isTagBlocked(tag) { return this._blockedTags.includes(tag); }
    isCommandBlocked(command) { return this._blockedCommands.includes(command); }
    setUpGroup() {
        if (this._group && Object.keys(this._group).length >= 0)
            this._group = Group.getGroupForChat(this._id);
        /* when is group from = groupID
           when is private from = sender
        */
    }
    static isChat(chat) {
        if (chat && typeof chat === 'string')
            return chat.includes('@g.us') || chat.includes('@s.whatsapp.net'); //if chat is a group
    }
    /**
    * save this chat to database
    */
    save() {
        Chat.saveChat(this);
    }
    /**
    * Flooding control
    * @param sender the sender of the message
    * @param timestamp the timestamp of the sent message
    * @returns true is it is a flooding chat, otherwhise false
    */
    isFlooding(sender, timestamp) {
        if (this.isAntiFloodOn) {
            if (this.floodar.length === 0) {
                this.floodar.push({
                    pessoa: sender,
                    contador: 1,
                    time: timestamp
                });
            }
            else {
                const found = this.floodar.find((flood) => {
                    return flood.pessoa === sender;
                });
                if (found) {
                    found.contador++;
                    const elapsed = Utils.processTime(found.time, moment(timestamp * 1000).toDate());
                    if (elapsed > this._floodingInterval && found.contador > 20)
                        return true;
                    if (found.contador >= 20 || elapsed > this._floodingInterval) {
                        found.time = timestamp;
                        found.contador = 1;
                    }
                }
            }
            return false;
        }
        return false;
    }
    //setters
    set name(n) { this._name = n; }
    set welcomeOn(v) { this._welcomeOn = v; }
    set detect(v) { this._detect = v; }
    set sWelcome(v) { this._sWelcome = v; }
    set simiOn(v) { this._simiOn = v; }
    set sBye(v) { this._sBye = v; }
    ;
    set sPromote(v) { this._sPromote = v; }
    ;
    set sDemote(v) { this._sDemote = v; }
    ;
    set delete(v) { this._delete = v; }
    set antiLinkOn(v) { this._antiLinkOn = v; }
    set viewonce(v) { this._viewonce = v; }
    set antitoxicOn(v) { this._antitoxicOn = v; }
    set antiImageOn(v) { this._antiImageOn = v; }
    ;
    set antiAudioOn(v) { this._antiAudioOn = v; }
    ;
    set antiWordsOn(v) { this._antiWordsOn = v; }
    ;
    set antiPornOn(v) { this._antiPornOn = v; }
    ;
    set antiFloodOn(v) { this._antiFloodOn = v; }
    ;
    set antiLinkGroupOn(v) { this._antiLinkGroupOn = v; }
    ;
    set antiVirtexOn(v) { this._antiVirtexOn = v; }
    ;
    set premium(obj) {
        this._premiumOn.premium = obj.premium;
        this._premiumOn.userId = obj.userId;
        this._premiumOn.expired = obj.expired;
        this._premiumOn.tasting = obj.tasting;
    }
    ;
    set PremiumTasting(v) {
        this._premiumOn.premium = !v;
        this._premiumOn.tasting = v;
    }
    set antiFakeOn(v) { this._antiFakeOn = v; }
    ;
    set antiFakeGroupOn(v) { this._antiFakeGroupOn = v; }
    ;
    set blackListOn(v) { this._blackListOn = v; }
    ;
    set NSFWOn(v) { this._NSFWOn = v; }
    set animeOn(v) { this._animeOn = v; }
    set levelingOn(v) { this._levelingOn = v; }
    set limitOn(v) { this._limitOn = v; }
    set diversionOn(v) { this._diversionOn = v; }
    set chatBanOn(v) { this._chatBanOn = v; }
    set banned(v) { this._chatBanOn = v; }
    set foreignOn(v) { this._foreignOn = v; }
    set floodingInterval(v) { this._floodingInterval = v; }
    set kickModeOn(v) { this._kickOn = v; }
    set type(v) { this._chatType = v; }
    set disabledTags(tagsArray) { this._blockedTags = Array.from(tagsArray); }
    blockTag(tag) { this._blockedTags.push(tag); }
    unBlockTag(tag) { this._blockedTags.splice(this._blockedTags.indexOf(tag), 1); }
    blockCommand(command) { this._blockedCommands.push(command); }
    unBlockCommand(command) { this._blockedCommands.splice(this._blockedCommands.indexOf(command), 1); }
    //========PREMIUM================
    /**
     *
     * @param userId the user id who added premium to this chat
     * @param duration duration (time). default 30d
     * @returns true if Premium was added, false otherwise
     */
    addPremium(userId, duration = '30d') {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            return false;
        }
        //toMs = Parse the given `value` and return milliseconds
        const pnom = { premium: true, userId: userId, expired: Date.now() + toMs(duration), tasting: false };
        this.premium = pnom;
        this.save();
        return true;
    }
    /**
     * Expire Premium
     * @returns true if removed sucessfuly, false otherwise
     */
    removePremium() {
        try {
            if (this._premiumOn.premium)
                this._lastPremiuns.push(Object.assign({}, this._premiumOn));
            //toMs = Parse the given `value` and return milliseconds
            const pnom = { premium: false, userId: '', expired: 0, tasting: false };
            this.premium = pnom;
            this.save();
            return true;
        }
        catch (err) {
            logger.error(err);
            return false;
        }
    }
    /**
     * enable premium mode for a while so users can test commands
     * @param userId the user id who added premium Tasting to this chat
     * @param duration duration (time). default 30d
     * @returns true if Premium was added, false otherwise
     */
    addPremiumTasting(userId, duration = '30d') {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            return false;
        }
        //toMs = Parse the given `value` and return milliseconds
        const pnom = { premium: false, userId: userId, expired: Date.now() + toMs(duration), tasting: true };
        this.premium = pnom;
        this.save();
        return true;
    }
    /**
     * Expire Premium Tasting
     * @returns true if removed sucessfuly, false otherwise
     */
    removePremiumTasting() {
        try {
            if (this._premiumOn.tasting)
                this._lastPremiuns.push(Object.assign({}, this._premiumOn));
            //toMs = Parse the given `value` and return milliseconds
            const pnom = { premium: this._premiumOn.premium, userId: this._premiumOn.userId, expired: this._premiumOn.expired, tasting: false };
            this.premium = pnom;
            this.save();
            return true;
        }
        catch (err) {
            logger.error(err);
            return false;
        }
    }
    static getAllPremiumUser() {
        const array = [];
        Chat._chats;
        Object.keys(Chat._chats).forEach((ch) => {
            const chat = Chat._chats[ch];
            if (chat.isPremium)
                array.push(chat.id);
        });
        return array;
    }
    /**
   * if premium has expired, remove it and clean register
   */
    expiredCheck() {
        setInterval(() => {
            if (this.isPremiumOn) {
                if (Date.now() >= this._premiumOn.expired) {
                    this.removePremium();
                }
            }
        }, 1000);
    }
    static expiredChecks() {
        setInterval(() => {
            Object.keys(Chat._chats).forEach((ch) => {
                const chat = Chat._chats[ch];
                if (chat.isPremiumOn) {
                    if (Date.now() >= chat._premiumOn.expired) {
                        chat.removePremium();
                    }
                }
            });
        }, 1000);
    }
    //========END PREMIUM=============
    enableBot() {
        this._isBotEnabled = true;
    }
    disableBot() {
        this._isBotEnabled = false;
    }
    /**
    * enable limit mode for the chat
    * @param {*} chatId chat Id to enable Limit control
    */
    static enableLimitMode(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.limitOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * enable antilinkgroup filter for the chat
     * @param {*} chatId chat to enable antilink2 for
     */
    static enableAntiLinkGroup(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiLinkGroupOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    //============ KICK ===============
    /**
     * enable kick mode on this chat
     * @param {*} chatId chat to enable antilink2 for
     */
    static enablekickMode(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.kickModeOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * unkick the user from the chat
     * @param userId user to kick
     * @param chatId chat to kick the user from
     * @returns
     */
    static unkickUser(userId, chatId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        const theChat = Chat._chats[chatId];
        if (!theChat)
            return;
        else {
            //remore user from array
            theChat.unKick(userId);
        }
    }
    /**
     * kick User form the chat
     * @param userId user to kick
     * @param chatId chat to kick the user from
     */
    static kickUser(userId, chatId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        const theChat = Chat._chats[chatId];
        if (!theChat)
            return;
        else {
            //remore user from array
            theChat.kick(userId);
        }
    }
    /**
     * check if the user is kicked in some chat
     * @param userId the user to check
     * @param chatId the chat to check
     */
    static isKicked(userId, chatId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        const theChat = Chat._chats[chatId];
        if (!theChat)
            return false;
        else {
            //remore user from array
            return theChat.isKicked(userId);
        }
    }
    /**
     * check if the user is kicked in some chat
     * @param userId the user to check
     */
    static isKickedInsomeChat(userId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        let ret = false;
        Chat._chats.forEach((chat) => {
            ret = chat.isKicked(userId);
            if (ret === true)
                return ret;
        });
        return ret;
    }
    /**
     * Kick user in this chat
     * @param userId id of the user to kick in this chat (only in groups)
     */
    kick(userId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            return;
        }
        if (this.isGroup)
            this._kicked.push(userId);
    }
    /**
     * unKick user in this chat
     * @param userId id of the user to unKick in this chat (only in groups)
     */
    unKick(userId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            return;
        }
        if (this.isGroup)
            this._kicked.splice(this._kicked.indexOf(userId), 1);
    }
    /**
     *
     * @param userId
     * @returns true if the user is kicked in this chat
     */
    isKicked(userId) {
        if (userId == null || userId == undefined || typeof userId !== 'string') {
            return false;
        }
        if (this.isPrivate)
            return false;
        return this._kicked.indexOf(userId) >= 0;
    }
    //=====END ANTI PORN ==============
    /**
     * enable anti foreign mode for the register
     * @param {*} chatId register to enable anti foreign mode
     */
    static enableForeign(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.foreignOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * enable anti Anti Fake for the register
     * @param {*} chatId register to enable  mode
     */
    static enableAntiFake(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiFakeOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * enable anti Anti Fake for the specific country for the register
     * @param {*} chatId register to enable  mode
     */
    static enableAntiFakeCountry(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiFakeGroupOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * enable anti-Flood for the specific country for the register
     * @param {*} chatId chatId to enable  mode
     */
    static enableAntiFlood(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiFloodOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * enable banish mode for the chat
     * @param chatId  chat id where ban mode will be enabled
     */
    static enableChatBan(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.chatBanOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAntilink(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiLinkOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAntivirtex(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiVirtexOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAnime(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.animeOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableNsfw(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.NSFWOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableSimi(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.simiOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableFunMode(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.diversionOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableWelcome(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.welcomeOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableLeveling(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.levelingOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enablePremium(chatId, userId, duration = '30d') {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.premium = { premium: true, userId: userId, expired: Date.now() + toMs(duration), tasting: false };
        //Chat.saveChats() 
        myChat.save();
    }
    static enableBlackList(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.blackListOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAntitoxic(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antitoxicOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAntiImage(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiImageOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAntiAudio(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiAudioOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAntiWords(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiWordsOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableAntiPorn(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiPornOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    static enableFloodMode(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiFloodOn = true;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
      * enable bot in the group/chat
      * @param {*} chatId the chat
      */
    static enableBot(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.enableBot();
        //Chat.saveChats() 
        myChat.save();
    }
    /**
       * disable/reset limit for the specific user
       * @param {*} chatId register/user to disable the mode
       */
    static disableAntilinkGroup(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiLinkGroupOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
      * disable anti foreign mode for the specific register
      * @param {*} chatId register to disable the mode
      */
    static disableForeign(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.foreignOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableSimi(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.simiOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * disable anti fake mode for the specific register
     * @param {*} chatId register to disable the mode
     */
    static disableAntiFake(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiFakeOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * disable anti fake for the specific country, mode for the specific register
     * @param {*} chatId register to disable the mode
     */
    static disableAntiFakeCountry(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiFakeGroupOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
  *  disable banish mode for the chat
  * @param chatId chat to disable de ban mode for
  */
    static disableChatBan(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.chatBanOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * disable kick mode for the chat
     * @param {*} chatId register/user to disable the mode
     */
    static disablekickMode(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.kickModeOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntilink(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiLinkOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntivirtex(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiVirtexOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAnime(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.animeOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableNsfw(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.NSFWOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableFunMode(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.diversionOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableWelcome(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.welcomeOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableLeveling(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.levelingOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntiImage(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiImageOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntiAudio(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiAudioOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntiWords(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiWordsOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntiPorn(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiPornOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntiFlood(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antiFloodOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disablePremium(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.premium = { premium: false, userId: '', expired: 0, tasting: false };
        //Chat.saveChats() 
        myChat.save();
    }
    static disableBlackList(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.blackListOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    static disableAntitoxic(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.antitoxicOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
     * disable bot in the group/chat
     * @param {*} chatId the chat
     */
    static disableBot(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.disableBot();
        //Chat.saveChats() 
        myChat.save();
    }
    static disableLimitMode(chatId) {
        if (chatId == null || chatId == undefined || typeof chatId !== 'string') {
            throw new Error('error in the register. not possible to execute action');
        }
        if (!Chat._chats[chatId])
            Chat.addChat(chatId);
        let myChat = Chat._chats[chatId];
        myChat.limitOn = false;
        //Chat.saveChats() 
        myChat.save();
    }
    /**
      * return array with all chats where foreign is enables
      */
    //TODO: VERIFICAR SE FUNCIONA O FILTRO DE OBJETOS
    static get noForeigns() {
        const data = Chat._chats;
        // Convert `obj` to a key/value array
        // `[['chat', '{chatObject}'], ['chat', 'chatOnject'], ...]`
        const chatIds = Object.keys(data)
            .filter((key) => {
            Chat._chats[key].isForeignOn === true;
        })
            .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: data[key]
            });
        }, {});
        if (Array.isArray(chatIds))
            return chatIds;
        else
            return [];
        //else { Chat.resetDatabase(Chat.foreignDB)
        //     Chat._noForeigns = JSON.parse(fs.readFileSync(FileDB.foreignDB) as any);
        //     return  Chat._noForeigns
        //}
    }
    /**
      * return array with all chats where antiFakesGroups is enabled
      */
    //TODO: VERIFICAR SE FUNCIONA O FILTRO DE OBJETOS
    static get antifakesGroups() {
        const data = Chat._chats;
        // Convert `obj` to a key/value array
        // `[['chat', '{chatObject}'], ['chat', 'chatOnject'], ...]`
        const chatIds = Object.keys(data)
            .filter((key) => {
            Chat._chats[key].isAntiFakeGroupOn === true;
        })
            .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: data[key]
            });
        }, {});
        if (Array.isArray(chatIds))
            return chatIds;
        else
            return [];
        //else { Chat.resetDatabase(Chat.foreignDB)
        //     Chat._noForeigns = JSON.parse(fs.readFileSync(FileDB.foreignDB) as any);
        //     return  Chat._noForeigns
        //}
    }
    /**
      * return array with all chats where antifake is enabled
      */
    //TODO: VERIFICAR SE FUNCIONA O FILTRO DE OBJETOS
    static get antifakesUsers() {
        const data = Chat._chats;
        // Convert `obj` to a key/value array
        // `[['chat', '{chatObject}'], ['chat', 'chatOnject'], ...]`
        const chatIds = Object.keys(data)
            .filter((key) => {
            Chat._chats[key].isAntiFakeOn === true;
        })
            .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: data[key]
            });
        }, {});
        if (Array.isArray(chatIds))
            return chatIds;
        else
            return [];
        //else { Chat.resetDatabase(Chat.foreignDB)
        //     Chat._noForeigns = JSON.parse(fs.readFileSync(FileDB.foreignDB) as any);
        //     return  Chat._noForeigns
        //}
    }
    /**
    * return array with all chats where antifake is enabled
    */
    //TODO: VERIFICAR SE FUNCIONA O FILTRO DE OBJETOS
    static get welcomeChats() {
        const data = Chat._chats;
        // Convert `obj` to a key/value array
        // `[['chat', '{chatObject}'], ['chat', 'chatOnject'], ...]`
        const chatIds = Object.keys(data)
            .filter((key) => {
            Chat._chats[key].isWelcomeOn === true;
        })
            .reduce((obj, key) => {
            return Object.assign(obj, {
                [key]: data[key]
            });
        }, {});
        if (Array.isArray(chatIds))
            return chatIds;
        else
            return [];
        //else { Chat.resetDatabase(Chat.foreignDB)
        //     Chat._noForeigns = JSON.parse(fs.readFileSync(FileDB.foreignDB) as any);
        //     return  Chat._noForeigns
        //}
    }
    //==============  WA CHAT MESSING UP ===================
    ////Modifying Chats
    /**
     * TODO: Implement it
     * @param chatId
     * @returns
     */
    getLastMessageInChat(chatId) {
        return '';
    }
    //Archive a chat
    archive(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            const lastMsgInChat = yield this.getLastMessageInChat(this.id); // implement this on your end
            yield conn.chatModify({ archive: true, lastMessages: [lastMsgInChat] }, '123456@s.whatsapp.net');
        });
    }
    //Mute/unmute a chat
    // mute for 8 hours
    mute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            yield this.client.chatModify({ mute: 8 * 60 * 60 * 1000 }, this._id, []);
        });
    }
    // unmute
    unMute() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            yield this.client.chatModify({ mute: null }, this._id, []);
        });
    }
    //Mark a chat read/unread
    markRead(read) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            const lastMsgInChat = yield this.getLastMessageInChat(this.id); // implement this on your end
            // mark it unread
            yield this.client.chatModify({ markRead: read, lastMessages: [lastMsgInChat] }, this._id);
        });
    }
    //Delete message for me
    deleteMessage(messageId, messageTimeStamp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            yield this.client.chatModify({ clear: { messages: [{ id: messageId, fromMe: true, timestamp: messageTimeStamp }] } }, this._id, []);
        });
    }
    //Note: deleting for oneself is supported via chatModify 
    deleteMesage() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            const lastMsgInChat = yield this.getLastMessageInChat(this.id);
            yield this.client.chatModify({ delete: true, lastMessages: [lastMsgInChat] }, this._id);
        });
    }
    //=======FOR GROUPS ONLY===============
    // only allow admins to send messages
    onlyadmin() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            if (this.isGroup) {
                yield this.client.groupSettingUpdate(this._id, 'announcement');
            }
        });
    }
    // allow everyone to send messages
    onlyeveryone() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            if (this.isGroup) {
                yield this.client.groupSettingUpdate(this._id, 'not_announcement');
            }
        });
    }
    // allow everyone to modify the group's settings -- like display picture etc.
    unlock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            if (this.isGroup) {
                yield this.client.groupSettingUpdate(this._id, 'unlocked');
            }
        });
    }
    // only allow admins to modify the group's settings
    lock() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            if (this.isGroup) {
                yield this.client.groupSettingUpdate(this._id, 'locked');
            }
        });
    }
    //To leave the group
    //
    //To get the invite code for a group
    getInvite() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            if (this.isGroup) {
                const code = yield this.client.groupInviteCode(this._id);
                return code;
            }
        });
    }
    //To revoke the invite code in a group
    //get a new invite code
    revokeInvite() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.client)
                return Promise.resolve;
            if (this.isGroup) {
                const code = yield this.client.groupRevokeInvite(this._id);
                return code;
            }
        });
    }
}
Chat.db = Chat.getChatsAdapter(FileDB.chatsDB);
Chat._chats = Chat.loadObjects();
//# sourceMappingURL=chat.js.map
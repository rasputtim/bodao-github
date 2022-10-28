import lodash from "lodash";
import { JSONFileSync, LowSync } from "lowdb";
import FileDB from "../basededatos/fileDatabase.js";
import Base_ from "./base.js";
import Chat from './chat.js';
import Utils from "./libs/functions.js";
import logger from "./logger.js";
import User from './user.js';
export default class Stats extends Base_ {
    constructor(chatId, userId, data = null) {
        super();
        this._messages = 0; //total messages totalHits in this chatfrom this user
        this._sticker = 0;
        this._images = 0;
        this._video = 0;
        this._audio = 0;
        this._text = 0;
        this._docs = 0;
        this._warns = 0;
        this._duelWin = 0;
        this._duelLost = 0;
        this._todayHits = 0; //total commands receiveid in this chat from this user
        this._unknown = 0;
        this._commands = {};
        this._chat = chatId;
        this._user = userId;
        if (chatId === undefined || userId === undefined)
            return;
        if (data) {
            this._parse(data);
        }
    }
    _parse(obj) {
        this._messages = obj._messages ? obj._messages : 0;
        this._sticker = obj._sticker ? obj._sticker : 0;
        this._images = obj._images ? obj._images : 0;
        this._video = obj._video ? obj._video : 0;
        this._audio = obj._audio ? obj._audio : 0;
        this._text = obj._text ? obj._text : 0;
        this._docs = obj._docs ? obj._docs : 0;
        this._warns = obj._warns ? obj._warns : 0;
        this._duelWin = obj._duelWin ? obj._duelWin : 0;
        this._duelLost = obj._duelWin ? obj._duelWin : 0;
        this._todayHits = obj._todayHits ? obj._todayHits : 0;
        this._unknown = obj._unknown ? obj._unknown : 0;
        this._commands = obj._commands ? Object.assign({}, obj._commands) : {};
    }
    static getStatsAdapter(path) {
        const adapter = new JSONFileSync(path);
        const dbStats = new LowSync(adapter);
        dbStats.read();
        //if there is no data create the db
        //const userStat:UserStats = { 'Bot': Object.assign({}, Stats.defaultStaticReg) }
        //const userStat2:UserStats = { 'userId2': Stats.defaultStaticReg }
        //const statData = {'all': userStat}
        //statData['chaId2'] =userStat2
        dbStats.data || (dbStats.data = { _stats: [] });
        dbStats.write();
        dbStats.chain = lodash.chain(dbStats.data);
        return dbStats;
    }
    static get statsChain() {
        if (Stats.db.chain)
            return Stats.db.chain;
        else
            Stats.db.chain = lodash.chain(Stats.getStatsAdapter(FileDB.statsDB).data);
        return Stats.db.chain;
    }
    static loadStatObjects() {
        let _data = [];
        try {
            if (!Stats.db) {
                Stats.db = Stats.getStatsAdapter(FileDB.statsDB);
            }
            Stats.db.read();
            if (Stats.statsChain) {
                const OBJECTS = Stats.statsChain.map((stat) => {
                    if (stat.length > 0) {
                        stat.forEach((st) => {
                            let theStats = new Stats(st._chat, st._user, st);
                            _data.push(theStats);
                        });
                    }
                }).value();
            }
            return _data;
        }
        catch (err) {
            Utils.treatError(err, logger);
            return _data;
        }
    }
    static ResetTodayHits() {
        if (!Stats._stats) {
            Stats._stats = Stats.loadStatObjects(); //in memory database
        }
        Stats._stats.forEach((st) => {
            st.todayHits = 0;
        });
        Stats.saveStats();
    }
    getStatsObj() {
        const obj = {
            _messages: this._messages,
            _sticker: this._sticker,
            _images: this._images,
            _video: this._video,
            _audio: this._audio,
            _text: this._text,
            _docs: this._docs,
            _warns: this._warns,
            _duelWin: this._duelWin,
            _duelLost: this._duelLost,
            _todayHits: this._todayHits,
            _unknown: this._unknown,
            _commands: Object.assign({}, this._commands)
        };
        return obj;
    }
    static getstatsforChatUser(chatId, userId) {
        if (!Stats._stats) {
            Stats._stats = Stats.loadStatObjects(); //in memory database
        }
        if (chatId instanceof Chat) {
            chatId = chatId.id;
        }
        if (userId instanceof User) {
            userId = userId.id;
        }
        if (typeof chatId === 'object') {
            chatId = chatId.id;
        }
        if (typeof userId === 'object') {
            userId = userId.id;
        }
        let found = Stats._stats.find((ch) => {
            return (ch._chat == chatId && ch._user == userId);
        });
        if (!found) {
            const newStat = new Stats(chatId, userId);
            Stats._stats.push(newStat);
            return newStat;
        }
        else
            return found;
    }
    save() {
        Stats.saveStat(this);
    }
    /**
     *
     * @param chat chat to save in database
     * @returns
     */
    static saveStat(Classe) {
        if (!Classe)
            return;
        const chatId = Classe._chat;
        const userId = Classe._user;
        try {
            Stats.db.read(); //get da current database
            const Chats = Stats.statsChain;
            let chatFoundchain = Stats.db.chain;
            let chatFound = chatFoundchain.get('_stats').find({ chatId: chatId }).value();
            if (chatFound) {
                //find the user 
                chatFound.set(Classe).value();
                Stats.db.data = Stats.db.chain;
                Stats.db.write();
                return true;
            }
            else { //create the chat element and the user
                chatFoundchain.push(Classe).value();
                Stats.db.data = Stats.db.chain;
                Stats.db.write();
                return true;
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    static saveStats() {
        if (!Stats._stats) {
            Stats._stats = Stats.loadStatObjects(); //in memory database
        }
        const adapter = new JSONFileSync(FileDB.statsDB);
        const dbStats = new LowSync(adapter);
        dbStats.read();
        dbStats.data = { _stats: Stats._stats };
        dbStats.write();
        dbStats.chain = lodash.chain(dbStats.data);
        return dbStats;
    }
    get messages() { return this._messages; }
    get sticker() { return this._sticker; }
    get images() { return this._images; }
    get video() { return this._video; }
    get audio() { return this._audio; }
    get text() { return this._text; }
    get docs() { return this._docs; }
    get warns() { return this._warns; }
    get duelWin() { return this._duelWin; }
    get duelLost() { return this._duelLost; }
    get todayHits() { return this._todayHits; }
    get unknown() { return this._unknown; }
    get commands() { return this._commands; }
    get stats() { return this.getStatsObj(); }
    static get botStats() {
        if (!Stats._stats) {
            Stats._stats = Stats.loadStatObjects(); //in memory database
        }
        let found = Stats._stats.find((ch) => {
            return (ch._chat == 'all' && ch._user == 'Bot');
        });
        if (found)
            return found.getStatsObj();
        else
            return Object.assign({}, Stats.defaultStaticReg);
    }
    set messages(v) { this._messages = v; }
    set sticker(v) { this._sticker = v; }
    set images(v) { this._images = v; }
    set video(v) { this._video = v; }
    set audio(v) { this._audio = v; }
    set text(v) { this._text = v; }
    set docs(v) { this._docs = v; }
    set warns(v) { this._warns = v; }
    set duelWin(v) { this._duelWin = v; }
    set duelLost(v) { this._duelLost = v; }
    set unknown(v) { this._unknown = v; }
    set todayHits(v) { this._todayHits = v; }
    //set commands(v:object) { this._commands = Object.assign({},  v) }
    set commandUse(v) {
        let com;
        let command = v;
        if (this._commands[v])
            this._commands[v]++;
        else
            this._commands[v] = 1;
    }
}
Stats.defaultStaticReg = {
    _messages: 0,
    _sticker: 0,
    _images: 0,
    _video: 0,
    _audio: 0,
    _text: 0,
    _docs: 0,
    _warns: 0,
    _duelWin: 0,
    _duelLost: 0,
    _todayHits: 0,
    _unknown: 0,
    _commands: {}
};
Stats.db = Stats.getStatsAdapter(FileDB.statsDB);
Stats._stats = Stats.loadStatObjects(); //in memory database
//# sourceMappingURL=stats.js.map
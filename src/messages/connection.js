var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import pkg, { areJidsSameUser, delay, DisconnectReason, downloadContentFromMessage, fetchLatestBaileysVersion, generateForwardMessageContent, generateWAMessageFromContent, getBinaryNodeChild, jidDecode, makeInMemoryStore, useMultiFileAuthState } from '@adiwajshing/baileys';
import proto from '@adiwajshing/baileys/WAProto/index.js';
import { parsePhoneNumber } from 'awesome-phonenumber';
import CFonts from 'cfonts';
import { fileTypeFromBuffer } from 'file-type';
import fs, { existsSync, mkdirSync, readFileSync, rmSync, unlinkSync } from 'fs';
import fetch from 'node-fetch';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import BotDB from '../basededatos/database.js';
import FileDB from '../basededatos/fileDatabase.js';
import Bot from '../factory/bot.js';
import Chat from '../factory/chat.js';
import { toAudio, toPTT } from '../factory/libs/converter.js';
import Utils from '../factory/libs/functions.js';
import _pino from '../factory/logger.js';
import qrcode from 'qrcode-terminal';
import dotenvSafe from 'dotenv-safe';
import { LocaleService } from '../languajes/localeService.js';
import MessageGod from './messageGod.js'; //import Helper from './Helper'
import Group from '../factory/group.js';
const Waproto = proto.proto;
const x = pkg;
const makeWASocket = x.default;
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
const __ = LocaleService.__;
const __n = LocaleService.__n;
//this.logger.info(__('Hello'));
//this.logger.info(__n('You have %s message', 3));
//Bodão group - invite link = https://chat.whatsapp.com/FIikqytggIiFHt9WZjpZ0m
dotenvSafe.config();
CFonts['say']('' + Bot.NameBot, {
    'font': 'simple',
    'color': 'candy',
    'align': 'center',
    'gradient': ['red', 'blue']
});
const msgRetryCounterMap = {};
const more = String.fromCharCode(8206);
let nvn = more['repeat'](4001);
let nwn = more['repeat'](850);
const logger = _pino;
export default class Connection {
    constructor() {
        this.hosts = [];
        this.owners = [];
        Connection._wa = this;
        this.logger = logger.child({ class: 'Bodao_bot_connection_class' });
        this.storeFolder = Connection.isModule ? FileDB.storeFolder : FileDB.storeFolder;
        if (!existsSync(this.storeFolder))
            mkdirSync(this.storeFolder, { recursive: true });
        setInterval(() => {
            Connection.sessions.forEach((val, key) => {
                const storePath = Connection.getStoreFile(key);
                let theStore = val.store;
                if (theStore)
                    theStore.writeToFile(storePath.toString());
            });
        }, 10000);
        setInterval(() => {
            //db.low.write().catch(console.error)
        }, 60000);
    }
    static get wa() {
        return Connection._wa;
    }
    static set waConfig(obj) {
        Connection._waConfig = {
            auth: obj.state,
            logger: logger,
            msgRetryCounterMap,
            printQRInTerminal: false,
            browser: [`<[ ${Bot.botName} ]>`, 'Safari', '1.0.0'],
            version: obj.Bversion,
            getMessage: (key) => __awaiter(this, void 0, void 0, function* () {
                if (obj.store) {
                    const msg = yield obj.store.loadMessage(key.remoteJid, key.id, obj.conection);
                    return (msg === null || msg === void 0 ? void 0 : msg.message) || undefined;
                }
                //return obj.store.loadMessage(key.remoteJid, key.id, obj.conection).then(m => m.message)
            })
            //  browser: Browsers.ubuntu('Chrome'),
        };
    }
    static decodeJid(jid) {
        if (!jid)
            return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && decode.user + '@' + decode.server || jid;
        }
        else
            return jid;
    }
    static updateNameToDb(conn, contacts) {
        if (!contacts || !conn)
            return;
        //if(this.conn) {
        for (let contact of contacts) {
            let id = Connection.decodeJid(contact.id);
            if (!id)
                continue;
            let chats = conn.contacts[id];
            if (!chats)
                chats = { id };
            let chat = Object.assign(Object.assign({}, chats), (Object.assign(Object.assign(Object.assign({}, contact), { id }), (id.endsWith('@g.us') ?
                { subject: contact.subject || chats.subject || '' } :
                { name: contact.notify || chats.name || chats.notify || '' })) || {}));
            conn.contacts[id] = chat;
        }
        //}
    }
    static sendBotUnavalableMessage(conn) {
        //Send Message saying the bot is active in this chat
        const theChats = Chat.chats;
        Object.keys(theChats).forEach((ch) => {
            if (theChats[ch].isGroup) {
                //if (ch === '5511986571658@s.whatsapp.net') {
                conn.sendMessage(ch, {
                    'text': __('The Bot is turned off for a while. I will be back soon')
                }, {
                    'quoted': {
                        'key': {
                            'participant': '0@s.whatsapp.net',
                            'remoteJid': '0@s.whatsapp.net'
                        },
                        'message': {
                            'groupInviteMessage': {
                                'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                                'inviteCode': 'm',
                                'groupName': 'P',
                                'caption': '' + +Bot.NameBot,
                                'jpegThumbnail': BotDB.images.goatGod
                            }
                        }
                    }
                });
            }
        });
    }
    static sendBotAvailableMessage(conn) {
        //Send Message saying the bot is active in this chat
        const theChats = Chat.chats;
        Object.keys(theChats).forEach((ch) => {
            if (theChats[ch].isGroup) {
                //if (ch === '5511986571658@s.whatsapp.net') {
                conn.sendMessage(ch, {
                    'text': __('The Bot is Active Now. You can use the commands and/or talk to me')
                }, {
                    'quoted': {
                        'key': {
                            'participant': '0@s.whatsapp.net',
                            'remoteJid': '0@s.whatsapp.net'
                        },
                        'message': {
                            'groupInviteMessage': {
                                'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                                'inviteCode': 'm',
                                'groupName': 'P',
                                'caption': '' + +Bot.NameBot,
                                'jpegThumbnail': BotDB.images.goatGod
                            }
                        }
                    }
                });
            }
        });
    }
    static getSessionsFolder() {
        let sessionFolder = Connection.isModule ? FileDB.sessionFolder : FileDB.sessionFolder;
        if (!existsSync(sessionFolder))
            mkdirSync(sessionFolder, { recursive: true });
        return sessionFolder;
    }
    static getSessionsFile(sessionId = '') {
        let sessionFolder = Connection.isModule ? FileDB.sessionFolder : FileDB.sessionFolder;
        if (!existsSync(sessionFolder))
            mkdirSync(sessionFolder, { recursive: true });
        let sessionFolder2 = join(sessionFolder, `${sessionId}`);
        return sessionFolder2;
    }
    static getStoreFile(sessionId = '') {
        let sessionFolder = Connection.isModule ? FileDB.sessionFolder : FileDB.sessionFolder;
        if (!existsSync(sessionFolder))
            mkdirSync(sessionFolder, { recursive: true });
        let sessionFolder2 = join(sessionFolder, `${sessionId}_store.json`);
        return sessionFolder2;
    }
    shouldReconnect(sessionId) {
        var _a, _b;
        let maxRetries = (_a = process.env.MAX_RETRIES) !== null && _a !== void 0 ? _a : 0;
        let attempts = (_b = Connection.retries.get(sessionId)) !== null && _b !== void 0 ? _b : 0;
        maxRetries = maxRetries < 1 ? 1 : maxRetries;
        if (attempts < maxRetries) {
            ++attempts;
            console.log('Reconnecting...', { attempts, sessionId });
            Connection.retries.set(sessionId, attempts);
            return true;
        }
        return false;
    }
    deleteSession(sessionId, isLegacy = false) {
        const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '');
        const storeFile = `${sessionId}_store.json`;
        const rmOptions = { force: true, recursive: true };
        rmSync(Connection.getSessionsFile(sessionFile), rmOptions);
        rmSync(Connection.getSessionsFile(storeFile), rmOptions);
        Connection.sessions.delete(sessionId);
        Connection.retries.delete(sessionId);
    }
    onChatsSets() {
    }
    createSession(sessionId, isLegacy = false, res = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sessionFile = (isLegacy ? 'legacy_' : 'md_') + sessionId + (isLegacy ? '.json' : '');
                const sessionPath = Connection.getSessionsFile(sessionFile);
                //check if session file is valid, otherwise delete it
                if (isLegacy) {
                    try {
                        if (existsSync(sessionPath))
                            JSON.parse(readFileSync(sessionPath, 'utf8'));
                    }
                    catch (e) {
                        console.error('Session data isn\'t valid');
                        console.error(e);
                        unlinkSync(sessionPath);
                    }
                }
                //db.setAdapter(new JSONFile(join(this.storeFolder, `${this.sessionId}.db.json`)))
                const storePath = Connection.getStoreFile(sessionId);
                const store = makeInMemoryStore({
                    'logger': _pino.child({
                        level: 'silent',
                        stream: 'store',
                        class: sessionId
                    })
                });
                //let state, saveState
                //if (isLegacy) {
                //     ;({ state, saveState } = useSingleFileLegacyAuthState(Connection.getSessionsFile(sessionFile)))
                // } else {
                //     ;({ state, saveCreds: saveState } = await useMultiFileAuthState(Connection.getSessionsFile(sessionFile)))
                // }
                //  let { version: Bversion, isLatest: isLatestBaileys } = await fetchLatestBaileysVersion();
                const { state, saveCreds } = yield useMultiFileAuthState('baileys_auth_info'); //Connection.getSessionsFile(sessionFile))
                // fetch latest version of WA Web
                const { version, isLatest } = yield fetchLatestBaileysVersion();
                //console.log(`using WA v${version.join('.')}, isLatest: ${isLatest}`)
                let conn;
                /**
                 * @type {import('@adiwajshing/baileys').CommonSocketConfig}
                 */
                Connection.waConfig = { state, version, store, logger: this.logger, conection: conn };
                /**
                 * 1) FIRST OF ALL MAKE THE SOCKET
                 * multidevice
                 */
                // can provide additional config here
                /**
                 * @type {import('@adiwajshing/baileys').AnyWASocket}
                 */
                //if(Connection._waConfig)
                //conn = isLegacy ? makeWALegacySocket(Connection._waConfig) : makeWASocket(Connection._waConfig)
                conn = makeWASocket({
                    version,
                    logger,
                    printQRInTerminal: true,
                    auth: state,
                    msgRetryCounterMap,
                    // implement to handle retries
                    getMessage: (key) => __awaiter(this, void 0, void 0, function* () {
                        if (store) {
                            const msg = yield store.loadMessage(key.remoteJid, key.id, undefined);
                            return (msg === null || msg === void 0 ? void 0 : msg.message) || undefined;
                        }
                        // only if store is present
                        return {
                            conversation: 'hello'
                        };
                    })
                });
                store === null || store === void 0 ? void 0 : store.bind(conn.ev);
                Connection._started = true;
                Group.conn = conn;
                if (conn.user && conn.user.id)
                    conn.user.jid = Connection.decodeJid(conn.user.id);
                conn.chats = {};
                conn.contacts = {};
                Connection.sessions.set(sessionId, Object.assign(Object.assign({}, conn), { store, isLegacy }));
                /** credentials updated -- some metadata, keys or something
                'creds.update': Partial<T>*/
                /**
                  * 2) TAKE CARE OF JOBS
                  */
                if (!isLegacy) {
                    try {
                        store === null || store === void 0 ? void 0 : store.readFromFile(storePath);
                    }
                    catch (err) {
                        this.logger.error('No store database - using the memory instead');
                    }
                }
                this.setupConnectionMethods(conn);
                this.setUpEvents(conn, store, this.logger, 'bodao_bot', saveCreds, isLegacy);
                Object.defineProperty(conn, 'name', {
                    value: 'WASocket',
                    configurable: true,
                });
            }
            catch (error) {
                this.logger.error(error);
                return;
            }
        });
    }
    cleanup() {
        this.logger.info('Running cleanup before exit.');
        Connection._started = false;
        Connection.sessions.forEach((session, sessionId) => {
            if (!session.isLegacy) {
                session.store.writeToFile(Connection.getSessionsFile(sessionId));
            }
        });
    }
    /**
     * Init all sessions previously stored in the database folder
     */
    init() {
        /*readdir(Connection.getSessionsFolder(), (err, files) => {
            if (err) {
                throw err
            }
      
            for (const file of files) {
                if ((!file.startsWith('md_') && !file.startsWith('legacy_')) || file.endsWith('_store')) {
                    continue
                }
      
                const filename = file.replace('.json', '')
                const isLegacy = filename.split('_', 1)[0] !== 'md'
                const sessionId = filename.substring(isLegacy ? 7 : 3)
      
                this.createSession(sessionId, isLegacy)
            }
        })
      */
        //if there is no session, try to create the first one
        if (Connection.sessions.size <= 0)
            this.createSession('bodão_bot');
    }
    /**
     * getBuffer hehe
     * @param {String|Buffer} path
     * @param {Boolean} returnFilename
     */
    static getFile(PATH, returnAsFilename) {
        return __awaiter(this, void 0, void 0, function* () {
            let res, filename;
            let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split `,`[1], 'base64') : /^https?:\/\//.test(PATH) ? yield (res = yield fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0);
            if (!Buffer.isBuffer(data))
                throw new TypeError('Result is not a buffer');
            let type = (yield fileTypeFromBuffer(data)) || {
                mime: 'application/octet-stream',
                ext: '.bin'
            }; //Because it's being used in a math operation, the date is converted to a number, and when you convert dates to numbers, the number you get is the milliseconds-since-the-Epoch (e.g., getTime()).
            //https://stackoverflow.com/questions/24182317/multiplication-with-date-object-javascript
            if (data && returnAsFilename && !filename)
                (filename = path.join(__dirname, '../tmp/' + /*(new Date * 1).toString()*/ Date.now() + '.' + type.ext), yield fs.promises.writeFile(filename, data));
            return Object.assign(Object.assign({ res,
                filename }, type), { data });
        });
    }
    /**
     * waitEvent
     * @param {*} eventName
     * @param {Object} conn
     * @param {Boolean} is
     * @param {Number} maxTries
     * @returns
     */
    static waitEvent(conn, eventName, is = () => true, maxTries = 25) {
        return new Promise((resolve, reject) => {
            let tries = 0;
            let on = (...args) => {
                if (++tries > maxTries)
                    reject('Max tries reached');
                else if (is()) {
                    conn.ev.off(eventName, on);
                    //resolve(...args)
                    resolve.apply(null, args);
                }
            };
            conn.ev.on(eventName, on);
        });
    }
    /**
      * Send Media/File with Automatic Type Specifier
      * @param {Object} conn
      * @param {String} jid
      * @param {String|Buffer} path
      * @param {String} filename
      * @param {String} caption
      * @param {Object} quoted
      * @param {Boolean} ptt
      * @param {Object} options
      */
    static sendFile(conn, jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let type = yield Connection.getFile(path, true);
            let { res, data: file, filename: pathFile } = type;
            if (res && res.status !== 200 || file.length <= 65536) {
                try {
                    throw { json: JSON.parse(file.toString()) };
                }
                catch (e) {
                    if (e.json)
                        throw e.json;
                }
            }
            let opt = { filename };
            if (quoted)
                opt.quoted = quoted;
            if (!type)
                if (options.asDocument)
                    options.asDocument = true;
            let mtype = '', mimetype = type.mime;
            if (/webp/.test(type.mime))
                mtype = 'sticker';
            else if (/image/.test(type.mime))
                mtype = 'image';
            else if (/video/.test(type.mime))
                mtype = 'video';
            else if (/audio/.test(type.mime)) {
                const convert = yield (ptt ? toPTT : toAudio)(file, type.ext);
                file = convert.data;
                pathFile = convert.filename;
                mtype = 'audio';
                mimetype = 'audio/ogg; codecs=opus';
            }
            else
                mtype = 'document';
            return yield conn.sendMessage(jid, Object.assign(Object.assign({}, options), { caption,
                ptt, [mtype]: { url: pathFile }, mimetype }), Object.assign(Object.assign({}, opt), options));
        });
    }
    /**
    * Send Contact
    * @param {Object} conn
    * @param {String} jid
    * @param {String} number
    * @param {String} name
    * @param {Object} quoted
    * @param {Object} options
    */
    static sendContact(conn, jid, number, name, quoted, options) {
        return __awaiter(this, void 0, void 0, function* () {
            number = number.replace(/[^0-9]/g, '');
            let njid = number + '@s.whatsapp.net';
            let vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
TEL;type=CELL;type=VOICE;waid=${number}:${parsePhoneNumber('+' + number).getNumber('international')}
END:VCARD
  `;
            return yield conn.sendMessage(jid, Object.assign({ contacts: Object.assign({ displayName: name, contacts: [{ vcard }], quoted }, options), quoted }, options));
        });
    }
    /**
    * send Button
    * @param {Object} conn
    * @param {String} jid
    * @param {String} contentText
    * @param {String} footer
    * @param {Buffer|String} buffer
    * @param {String[]} buttons
    * @param {Object} quoted
    * @param {Object} options
    */
    static sendButton(conn, jid, contentText, footer, buffer, buttons, quoted, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (buffer)
                try {
                    buffer = (yield Connection.getFile(buffer, false)).data;
                }
                catch (_a) {
                    buffer = null;
                }
            let message = Object.assign(Object.assign(Object.assign(Object.assign({}, options), (buffer ? { caption: contentText || '' } : { text: contentText || '' })), { footer, buttons: buttons.map(btn => {
                    return {
                        buttonId: btn[1] || btn[0] || '',
                        buttonText: {
                            displayText: btn[0] || btn[1] || ''
                        }
                    };
                }) }), (buffer ? { image: buffer } : {}));
            return yield conn.sendMessage(jid, message, Object.assign({ quoted, upload: conn.waUploadToServer }, options));
        });
    }
    /**
    * cMod
    * @param {Object} conn
    * @param {String} jid
    * @param {*} message
    * @param {String} text
    * @param {String} sender
    * @param {*} options
    * @returns
    */
    static cMod(conn, jid, message, text = '', sender = conn.user.jid, options = {}) {
        let copy = message.toJSON();
        let mtype = Object.keys(copy.message)[0];
        let isEphemeral = false; // mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0];
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message;
        let content = msg[mtype];
        if (typeof content === 'string')
            msg[mtype] = text || content;
        else if (content.caption)
            content.caption = text || content.caption;
        else if (content.text)
            content.text = text || content.text;
        if (typeof content !== 'string')
            msg[mtype] = Object.assign(Object.assign({}, content), options);
        if (copy.participant)
            sender = copy.participant = sender || copy.participant;
        else if (copy.key.participant)
            sender = copy.key.participant = sender || copy.key.participant;
        if (copy.key.remoteJid.includes('@s.whatsapp.net'))
            sender = sender || copy.key.remoteJid;
        else if (copy.key.remoteJid.includes('@broadcast'))
            sender = sender || copy.key.remoteJid;
        copy.key.remoteJid = jid;
        //user.id = the one who read the Qr Code
        //is the bot the sender?
        copy.key.fromMe = areJidsSameUser(sender, conn.user.id) || false;
        return Waproto.WebMessageInfo.fromObject(copy);
    }
    /**
      * Exact Copy Forward
      * @param {String} jid
      * @param {Object} message
      * @param {Boolean|Number} forwardingScore
      * @param {Object} options
      */
    static copyNForward(conn, jid, message, forwardingScore = true, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let m = generateForwardMessageContent(message, !!forwardingScore);
            let mtype = Object.keys(m)[0];
            if (forwardingScore && typeof forwardingScore == 'number' && forwardingScore > 1)
                m[mtype].contextInfo.forwardingScore += forwardingScore;
            //conn.user.id is the bot Number, that is the number who read the QrCode  
            let n = generateWAMessageFromContent(jid, m, Object.assign(Object.assign({}, options), { userJid: conn.user.id }));
            yield conn.relayMessage(jid, n.message, { messageId: n.key.id, additionalAttributes: Object.assign({}, options) });
            return n;
        });
    }
    /**
    * Download media message
    * @param {Object} m
    * @param {String} type
    * @param {fs.PathLike|fs.promises.FileHandle} filename
    * @returns {Promise<fs.PathLike|fs.promises.FileHandle|Buffer>}
    */
    static downloadM(m, type, filename = '') {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!m || !(m.url || m.directPath))
                return Buffer.alloc(0);
            const stream = yield downloadContentFromMessage(m, type);
            let buffer = Buffer.from([]);
            try {
                for (var stream_1 = __asyncValues(stream), stream_1_1; stream_1_1 = yield stream_1.next(), !stream_1_1.done;) {
                    const chunk = stream_1_1.value;
                    buffer = Buffer.concat([buffer, chunk]);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (stream_1_1 && !stream_1_1.done && (_a = stream_1.return)) yield _a.call(stream_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (filename)
                yield fs.promises.writeFile(filename, buffer);
            return filename && fs.existsSync(filename) ? filename : buffer;
        });
    }
    /*
     get the media from a message and save it to the filesystem
      @return the buffer
     */
    static downloadAndSaveMediaMessage(message, caption, add_extension_to_fIlename = true) {
        var e_2, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let quoted = message.msg ? message.msg : message;
            let mimes = (message.msg || message).mimetype || '';
            let messageType = mimes.split('/')[0].replace('application', 'document') ? mimes.split('/')[0].replace('application', 'document') : mimes.split('/')[0];
            const stream = yield downloadContentFromMessage(quoted, messageType);
            let buffer = Buffer.from([]);
            try {
                for (var stream_2 = __asyncValues(stream), stream_2_1; stream_2_1 = yield stream_2.next(), !stream_2_1.done;) {
                    const chunk = stream_2_1.value;
                    buffer = Buffer.concat([buffer, chunk]);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (stream_2_1 && !stream_2_1.done && (_a = stream_2.return)) yield _a.call(stream_2);
                }
                finally { if (e_2) throw e_2.error; }
            }
            let fileType = yield fileTypeFromBuffer(buffer);
            const trueFileName = add_extension_to_fIlename ? caption + '.' + (fileType === null || fileType === void 0 ? void 0 : fileType.ext) : caption;
            yield fs.writeFileSync(trueFileName, buffer);
            return trueFileName;
        });
    }
    /*
    get the media from a message and save it in a Buffer
    @return the buffer
    open-wa decriptMedia equivamennt
    */
    static downloadAndBufferMediaMessage(message) {
        var e_3, _a;
        return __awaiter(this, void 0, void 0, function* () {
            let quoted = message.msg ? message.msg : message;
            let mimes = (message.msg || message).mimetype || '';
            let messageType = mimes.split('/')[0].replace('application', 'document') ? mimes.split('/')[0].replace('application', 'document') : mimes.split('/')[0];
            const stream = yield downloadContentFromMessage(quoted, messageType);
            let buffer = Buffer.from([]);
            try {
                for (var stream_3 = __asyncValues(stream), stream_3_1; stream_3_1 = yield stream_3.next(), !stream_3_1.done;) {
                    const chunk = stream_3_1.value;
                    buffer = Buffer.concat([buffer, chunk]);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (stream_3_1 && !stream_3_1.done && (_a = stream_3.return)) yield _a.call(stream_3);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return buffer;
        });
    }
    /**
    * Get name from jid
    * @param {String} jid
    * @param {Boolean} withoutContact
    */
    static getName(conn, jid, withoutContact = false) {
        jid = conn.decodeJid(jid);
        withoutContact = withoutContact;
        let v;
        if (jid.endsWith('@g.us'))
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                v = conn.contacts[jid] || {};
                if (!(v.name || v.subject))
                    v = (yield conn.groupMetadata(jid)) || {};
                resolve(v.name || v.subject || parsePhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'));
            }));
        else
            v = jid === '0@s.whatsapp.net' ? {
                jid,
                vname: 'WhatsApp'
            } : jid === conn.user.jid ?
                conn.user :
                (conn.contacts[jid] || {});
        return (withoutContact ? '' : v.name) || v.subject || v.vname || v.notify || v.verifiedName || parsePhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
    }
    static saveName(conn, id, name = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return;
            id = conn.decodeJid(id);
            let isGroup = id.endsWith('@g.us');
            if (id in conn.contacts && conn.contacts[id][isGroup ? 'subject' : 'name'] && id in conn.chats)
                return;
            let metadata = {};
            if (isGroup)
                metadata = yield conn.groupMetadata(id);
            let chat = Object.assign(Object.assign(Object.assign({}, (conn.contacts[id] || {})), { id }), (isGroup ? { subject: metadata.subject, desc: metadata.desc.toString(), metadata } : { name }));
            conn.contacts[id] = chat;
            conn.chats[id] = chat;
        });
    }
    static getBusinessProfile(conn, jid) {
        var _a, _b, _c, _d, _e, _f;
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield conn.query({
                tag: 'iq',
                attrs: {
                    to: 's.whatsapp.net',
                    xmlns: 'w:biz',
                    type: 'get'
                },
                content: [{
                        tag: 'business_profile',
                        attrs: { v: '244' },
                        content: [{
                                tag: 'profile',
                                attrs: { jid }
                            }]
                    }]
            });
            const profiles = getBinaryNodeChild(getBinaryNodeChild(results, 'business_profile'), 'profile');
            if (!profiles)
                return {}; // if not bussines
            const address = getBinaryNodeChild(profiles, 'address');
            const descriptions = getBinaryNodeChild(profiles, 'description');
            const website = getBinaryNodeChild(profiles, 'website');
            const email = getBinaryNodeChild(profiles, 'email');
            const category = getBinaryNodeChild(getBinaryNodeChild(profiles, 'categories'), 'category');
            return {
                jid: (_a = profiles.attrs) === null || _a === void 0 ? void 0 : _a.jid,
                address: (_b = address === null || address === void 0 ? void 0 : address.content) === null || _b === void 0 ? void 0 : _b.toString(),
                description: (_c = descriptions === null || descriptions === void 0 ? void 0 : descriptions.content) === null || _c === void 0 ? void 0 : _c.toString(),
                website: (_d = website === null || website === void 0 ? void 0 : website.content) === null || _d === void 0 ? void 0 : _d.toString(),
                email: (_e = email === null || email === void 0 ? void 0 : email.content) === null || _e === void 0 ? void 0 : _e.toString(),
                category: (_f = category === null || category === void 0 ? void 0 : category.content) === null || _f === void 0 ? void 0 : _f.toString(),
            };
        });
    }
    /**
    * Read message
    * @param {String} jid
    * @param {String|undefined|null} participant
    * @param {String} messageID
    */
    static chatRead(conn, jid, participant, messageID) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield conn.sendReadReceipt(jid, participant, [messageID]);
        });
    }
    /**
      * Parses string into mentionedJid(s)
      * @param {String} text
      */
    static parseMention(text = '') {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    }
    /**
     * Add useful methods and utilities to the connection object
     * @param conn the connection
     */
    setupConnectionMethods(conn) {
        if (!conn)
            return;
        conn.decodeJid = Connection.decodeJid;
        conn.getFile = Connection.getFile;
        conn.updateNameToDb = function (contacts) {
            return Connection.updateNameToDb(conn, contacts);
        };
        conn.waitEvent = (eventName, is = () => true, maxTries = 25) => {
            return Connection.waitEvent(conn, eventName, is, maxTries);
        };
        conn.sendFile = (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.sendFile(conn, jid, path, filename, caption, quoted, ptt, options);
        });
        conn.sendContact = (jid, number, name, quoted, options) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.sendContact(conn, jid, number, name, quoted, options);
        });
        conn.sendButton = (jid, contentText, footer, buffer, buttons, quoted, options) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.sendButton(conn, jid, contentText, footer, buffer, buttons, quoted, options);
        });
        conn.cMod = (jid, message, text = '', sender = conn.user.jid, options = {}) => {
            return Connection.cMod(conn, jid, message, text, sender, options);
        };
        conn.copyNForward = (jid, message, forwardingScore = true, options = {}) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.copyNForward(conn, jid, message, forwardingScore, options);
        });
        conn.downloadM = Connection.downloadM;
        conn.chatRead = (jid, participant, messageID) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.chatRead(conn, jid, participant, messageID);
        });
        conn.parseMention = (text = '') => {
            return Connection.parseMention(text);
        };
        conn.getName = (jid, withoutContact = false) => {
            return Connection.getName(conn, jid, withoutContact);
        };
        conn.saveName = (id, name = '') => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.saveName(conn, id, name);
        });
        conn.pushMessage = (m) => {
            Connection.pushMessage(conn, m);
        };
        conn.getBusinessProfile = (jid) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.getBusinessProfile(conn, jid);
        });
        conn.serializeM = (m) => {
            return Connection.serializeM(conn, m);
        };
        conn.downloadAndSaveMediaMessage = (message, caption, add_extension_to_fIlename) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.downloadAndSaveMediaMessage(message, caption, add_extension_to_fIlename);
        });
        conn.downloadAndBufferMediaMessage = (msg) => __awaiter(this, void 0, void 0, function* () {
            return yield Connection.downloadAndBufferMediaMessage(msg);
        });
    }
    /**
     * Setup event handlers
     * @param conn
     * @param store
     * @param logger
     * @param sessionId
     * @param saveCreds
     * @param isLegacy
     */
    setUpEvents(conn, store, logger, sessionId = '', saveCreds, isLegacy) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!conn)
                return false;
            /**
            * 3) ANSWER TO EVENTS
            */
            conn.ev.on('creds.update', saveCreds);
            /** set chats (history sync), chats are reverse chronologically sorted
            'chats.set': { chats: Chat[], isLatest: boolean }*/
            conn.ev.on('chats.set', ({ chats }) => {
                if (isLegacy) {
                    store.chats.insertIfAbsent(...chats);
                }
            });
            conn.ev.on('presence.update', ({ id, presences }) => {
                if (!conn)
                    return;
                let sender = Object.keys(presences)[0] || id;
                let _sender = conn.decodeJid(sender);
                let presence = presences[sender]['lastKnownPresence'] || 'composing';
                if (conn.contacts && !(_sender in conn.contacts))
                    conn.contacts[_sender] = {};
                conn && conn.contacts ? conn.contacts[_sender].presences = presence : '';
            });
            conn.ev.on('connection.update', ({ qr }) => __awaiter(this, void 0, void 0, function* () {
                if (qr) {
                    //const QR = await Promise.resolve().then(() => __importStar(require('qrcode-terminal'))).catch(err => {
                    //     logger.error('QR code terminal not added as dependency');
                    //});
                    // QR === null || QR === void 0 ? void 0 : QR.generate(qr, { small: true });
                    console.log(qr);
                    qrcode.generate(qr, { small: true });
                }
            }));
            conn.ev.on('connection.update', (update) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                const { connection, lastDisconnect } = update;
                if (connection === 'close') {
                    Connection._started = false;
                    // @ts-ignore
                    let code = (_b = (_a = lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.output) === null || _b === void 0 ? void 0 : _b.statusCode;
                    //do not try to recconect if max tries were achieved or the user requested loogout
                    const dontReconnect = code === DisconnectReason.loggedOut || !this.shouldReconnect(sessionId);
                    //display error code
                    logger.info('- connection closed due to: ', JSON.stringify(lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error), ', reconnecting: ', dontReconnect);
                    logger.info(Utils.color('[!]', 'red'), Utils.color('Conexion perdida, reconectando... u.u', 'red'));
                    if (code === DisconnectReason.loggedOut || !this.shouldReconnect(sessionId)) {
                        //if (res && !res.headersSent) {
                        //    response(res, 500, false, 'Unable to create session.')
                        // }
                    }
                    if (code === DisconnectReason.badSession) {
                        logger.error(`Bad session file, delete and run again`);
                        this.deleteSession(sessionId, isLegacy); // Delete session file
                    }
                    else if (code === DisconnectReason.connectionClosed) {
                        logger.error('Connection closed, reconnecting....');
                    }
                    else if (code === DisconnectReason.connectionLost) {
                        logger.error('Connection lost, reconnecting....');
                    }
                    else if (code === DisconnectReason.connectionReplaced) {
                        logger.error('Connection Replaced, Another New Session Opened, Please Close Current Session First');
                    }
                    else if (code === DisconnectReason.loggedOut) {
                        logger.error(`Device Logged Out, Deleting Session.`);
                    }
                    else if (code === DisconnectReason.restartRequired) {
                        logger.error('Restart required, restarting...');
                    }
                    else if (code === DisconnectReason.timedOut) {
                        logger.error('Connection timedOut, reconnecting...');
                    }
                    else {
                        logger.error(lastDisconnect.error);
                    }
                    // reconnect if not logged out
                    if (dontReconnect) {
                        Connection.sendBotUnavalableMessage(conn);
                        logger.info(Utils.color('\n\n[!] Session del dispositivo desconectado, elimine la sesión y vuelva a escanear.\n\n[!] Session from the disconnected device, delete the session and rescan.\n\n[!] Sesi dari perangkat yang terputus, hapus sesi dan pindai ulang.\n\n[!] Sessão do dispositivo desconectado, exclua a sessão e verifique novamente.\n\n', 'red'));
                        return this.deleteSession(sessionId, isLegacy);
                    }
                    else {
                        let recInt = (_c = parseInt(process.env.RECONNECT_INTERVAL)) !== null && _c !== void 0 ? _c : 0;
                        setTimeout(() => {
                            this.createSession(sessionId, isLegacy);
                        }, code === DisconnectReason.restartRequired ? 0 : recInt);
                    }
                }
                else if (connection === 'open') {
                    Connection.retries.delete(sessionId);
                    logger.info('- opened connection -');
                    Group.conn = conn;
                    //join upport group
                    //const minvitacion = 'GtxTtrORaAaDdDWBGGX5R5'
                    const minvitacion = 'FIikqytggIiFHt9WZjpZ0m'; //bodao bot group
                    conn.groupAcceptInvite(minvitacion).catch(err => {
                        logger.error(err);
                    }),
                        //conn.user.id is the bot Number, that is the number who read the QrCode  
                        //removes the ":XX" from the user.id
                        Bot.cglobal = conn.user.id.split(':')[0] + '@s.whatsapp.net';
                    Bot._information['BotNumber'] = Bot.cglobal;
                    Bot.information = Bot._information;
                    //sendBotAvailableMessage()
                    Utils.success('2', '\nCONECTADO UwUr\n');
                }
                else if (connection === 'connecting') {
                    yield delay(1000);
                    Utils.start('2', '\nCONECTANDO... U.U');
                    Connection._started = false;
                }
                ;
            }));
            /** credentials updated -- some metadata, keys or something */
            conn.ev.on('creds.update', saveCreds);
            /**Receive a Call */
            conn.ws.on('CB:call', (_0x33ce3f) => __awaiter(this, void 0, void 0, function* () {
                const user = _0x33ce3f['content'][0]['attrs']['call-creator'];
                let _0x2ddf2a = '' + Bot.botcontrol[0]['slice'](0, -15);
                if ((_0x33ce3f['content'][0].tag == 'offer', Bot.SIMPLE_CODE_BOT_2022_ADMIN_1, _0x2ddf2a)) {
                    var _0xa41a80 = 'wa.me/' + Bot.botcontrol[0].slice(0, -15);
                    conn.sendMessage(user, {
                        'text': BotDB.idiomas.BanCall(_0xa41a80)
                    }, {
                        'quoted': {
                            'key': {
                                'participant': '0@s.whatsapp.net',
                                'remoteJid': '0@s.whatsapp.net'
                            },
                            'message': {
                                'groupInviteMessage': {
                                    'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                                    'inviteCode': 'm',
                                    'groupName': 'P',
                                    'caption': '' + +Bot.NameBot,
                                    'jpegThumbnail': BotDB.images.goatGod
                                }
                            }
                        }
                    });
                    yield Utils._sleep(8000);
                    yield conn.updateBlockStatus(user, 'block');
                }
            }));
            //this.conn.ev.on('messages.upsert', m => {
            //    Message.onMessage(this, m)
            //})
            //messages received
            // Automatically read incoming messages, uncomment below codes to enable this behaviour
            /*
            conn.ev.on('messages.upsert', async (m) => {
                const message = m.messages[0]
          
                if (!message.key.fromMe && m.type === 'notify') {
                    await delay(1000)
          
                    if (isLegacy) {
                        await conn.chatRead(message.key, 1)
                    } else {
                        await conn.sendReadReceipt(message.key.remoteJid, message.key.participant, [message.key.id])
                    }
                }
            })
            */
            conn.ev.on('messages.upsert', (messages) => __awaiter(this, void 0, void 0, function* () {
                try {
                    //if (messages.type === 'append' || messages.type === 'notify') {
                    //  console.log(JSON.stringify(messages, undefined, 2));
                    //}
                    const msg = messages.messages[0];
                    //if (!msg.key.fromMe && (msg.type === 'append' || msg.type === 'notify')) {
                    //   console.log('replying to',messages.messages[0].key.remoteJid);
                    // await sock.chatRead(msg.key, 1);
                    //await sendMessageWTyping({ text: 'Hello there!' }, msg.key.remoteJid);
                    //  }
                    //  else {
                    if (msg.key && msg.key.remoteJid === 'status@broadcast')
                        return;
                    if (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16)
                        return;
                    const tesla = yield MessageGod.build(conn, messages, store);
                    yield tesla.run();
                    // }  
                }
                catch (err) {
                    logger.error('\n\x0aError in the file:');
                    logger.error(err);
                    logger.error('\n\n');
                }
            }));
            /*
                    this.conn.ev.on('messages.delete', item => {
                      if('all' in item) {
                        const list = messages[item.jid]
                        list?.clear()
                      } else {
                        const jid = item.keys[0].remoteJid
                        const list = messages[jid]
                        if(list) {
                          const idSet = new Set(item.keys.map(k => k.id))
                          list.filter(m => !idSet.has(m.key.id))
                        }
                      }
                      const antiDelete = BotDB.antideleteDB  //BotDB.antideleteDB
                            const isAntiDelete = antiDelete.includes(message.from)
                            if (message.author != host && isAntiDelete) {
                                await BodaoClient.sendTextWithMentions(message.from,
                                    `‼️〘 ANTI DELETE 〙‼️\n` +
                                    `${global.q3}Who     :${global.q3} @${message.author.replace('@c.us', '')}\n` +
                                    `${global.q3}When    :${global.q3} ${moment(message.t * 1000).format('DD MMM HH:mm:ss')}\n` +
                                    `${global.q3}Type    :${global.q3} ${message.type.replace(/^\w/, (c) => c.toUpperCase())}` +
                                    `${message.type == 'chat' ? `\n${global.q3}Content :${global.q3}\n\n${message.body}` : ``}`
                                )
                                if (['image', 'video', 'ptt', 'audio', 'document'].includes(message.type)) {
                                    const mediaData = await decryptMedia(message)
                                    await BodaoClient.sendFile(message.from, `data:${message.mimetype};base64,${mediaData.toString('base64')}`, '', message.caption)
                                }
                                if (message.type == 'sticker') {
                                    const mediaData = await decryptMedia(message)
                                    await BodaoClient.sendImageAsSticker(message.from, mediaData, { pack: 'Anti delete by', author: 'bodãoBot', keepScale: true })
                                }
                            }
                    } ) //    , async  keys: WAMessageKey[] } | { jid: string, all: true }
            
                  */
            conn.ev.on('contacts.upsert', conn.updateNameToDb);
            conn.ev.on('groups.update', (data) => {
                const myArrayofData = data;
                myArrayofData.forEach((grData) => {
                    const groupID = grData.id;
                    Group.updateGroupData(groupID, grData);
                });
            });
            conn.ev.on('groups.upsert', (data) => {
                const myArrayofData = data;
                myArrayofData.forEach((grData) => {
                    const groupID = grData.id;
                    Group.updateGroupData(groupID, grData);
                });
            });
            // 'groups.upsert': GroupMetadata[]
            //'groups.update': Partial<GroupMetadata>[]
            //group participants update
            conn.ev.on('group-participants.update', (gpUpdate) => __awaiter(this, void 0, void 0, function* () {
                if (Chat.noForeigns.includes(gpUpdate.id)) {
                    const groupData = yield conn.groupMetadata(gpUpdate.id).catch(_0x5daaef => {
                        logger.info(BotDB.idiomas.FDeG());
                    });
                    if (gpUpdate.action == 'add') {
                        let numero = gpUpdate['participants'][0];
                        if (!numero.split('@')[0].startsWith(Bot.botCountry)) {
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                conn.groupParticipantsUpdate(groupData.id, [numero], 'remove');
                            }), 1000);
                        }
                    }
                }
                if (gpUpdate.action == 'add') {
                    const _0x815b41 = yield conn.groupMetadata(gpUpdate.id).catch(_0x3c5b23 => { });
                    let _0x3dbd4b = gpUpdate['participants'][0];
                    if (_0x3dbd4b.startsWith(Bot.SIMPLE_CODE_BOT_2022_ADMIN_1))
                        return conn.sendMessage(_0x815b41.id, {
                            'text': BotDB.idiomas['AutoSaludo']()
                        }, {
                            'quoted': {
                                'key': {
                                    'participant': '0@s.whatsapp.net',
                                    'remoteJid': '0@s.whatsapp.net'
                                },
                                'message': {
                                    'groupInviteMessage': {
                                        'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                                        'inviteCode': 'm',
                                        'groupName': 'P',
                                        'caption': '' + +Bot.NameBot,
                                        'jpegThumbnail': BotDB.images.goatGod
                                    }
                                }
                            }
                        });
                }
                //AntiFakes Group Check
                if (Chat.antifakesGroups.includes(gpUpdate.id)) {
                    const groupData = yield conn.groupMetadata(gpUpdate.id).catch(_0x5f09a6 => { });
                    if (gpUpdate.action == 'add') {
                        const gnume = gpUpdate.participants[0];
                        if (gnume.startsWith('1'))
                            return conn.groupParticipantsUpdate(groupData.id, [gnume], 'remove');
                    }
                }
                //antiFake users check
                if (Chat.antifakesUsers.includes(gpUpdate.id)) {
                    const groupID = yield conn.groupMetadata(gpUpdate.id).catch(_0x283e2d => { });
                    if (gpUpdate.action == 'add') {
                        const gnum = gpUpdate['participants'][0];
                        if (gnum.startsWith('20'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('20'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('21'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('22'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('23'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('24'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('25'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('26'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('27'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('29'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('30'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('31'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('32'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('33'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('34'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('35'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('36'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('37'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('38'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('39'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('40'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('41'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('42'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('43'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('44'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('45'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('46'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('47'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('48'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('49'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('60'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('61'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('62'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('63'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('64'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('65'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('66'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('67'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('68'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('69'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('7'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('80'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('81'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('82'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('84'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('85'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('86'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('88'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('90'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('91'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('92'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('93'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('94'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('95'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('96'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('97'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('98'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                        if (gnum.startsWith('99'))
                            return conn.groupParticipantsUpdate(groupID.id, [gnum], 'remove');
                    }
                }
                //auto welcome check
                if (!Chat.welcomeChats.includes(gpUpdate.id))
                    return; //auto welcome is off
                logger.info(gpUpdate);
                //auto welcome is on for this group
                try {
                    let theGroupData = yield conn.groupMetadata(gpUpdate.id).catch(_0x347828 => { });
                    const _0x30d425 = gpUpdate.id.endsWith('@g.us'), _0xc6b76a = _0x30d425 ? theGroupData['desc'] : '';
                    let groupMembers = gpUpdate['participants'];
                    for (let theMember of groupMembers) {
                        let ppuser;
                        let imgwai;
                        try {
                            if (theMember) {
                                ppuser = yield conn.profilePictureUrl(theMember, 'image');
                                imgwai = yield Utils.getBuffer(ppuser);
                            }
                            else
                                throw "The Member Null";
                        }
                        catch (_d) {
                            imgwai = BotDB.sinthumb;
                        }
                        if (gpUpdate.action == 'add') { //someone enters when auto welcome is on
                            const buttttons = [{
                                    'buttonId': Bot.prefix + 'menu',
                                    'buttonText': {
                                        'displayText': '[ MENU ☰ ]'
                                    },
                                    'type': 0x1
                                }, {
                                    'buttonId': Bot.prefix + 'rebote ',
                                    'buttonText': {
                                        'displayText': '[ PING 🏓 ]'
                                    },
                                    'type': 0x1
                                }];
                            conn.sendMessage(gpUpdate.id, {
                                'caption': BotDB.idiomas['Wlc3'](theMember, theGroupData, Utils.dateComplete, _0xc6b76a, nwn),
                                'footer': '\n' + +Bot.NameBot,
                                'location': {
                                    'jpegThumbnail': imgwai
                                },
                                'buttons': buttttons,
                                'headerType': 'LOCATION',
                                'mentions': [theMember]
                            });
                        }
                        else if (gpUpdate.action == 'remove') { //someone leave when auto welcome is on
                            //await BodaoClient.sendText(event.chat, `⚙ Eh alguém saiu né? ahhh  ${pushname} 👋✨`)
                            const buttttons2 = [{
                                    'buttonId': Bot.prefix + 'despedida',
                                    'buttonText': {
                                        'displayText': '[_>]' + BotDB.idiomas['Wlc4']()
                                    },
                                    'type': 0x1
                                }];
                            conn.sendMessage(gpUpdate.id, {
                                'caption': BotDB.idiomas['Wlc5'](theMember),
                                'footer': '\n' + +Bot.NameBot,
                                'location': {
                                    'jpegThumbnail': imgwai
                                },
                                'buttons': buttttons2,
                                'headerType': 'LOCATION',
                                'mentions': [theMember]
                            });
                        }
                    }
                }
                catch (err) {
                    logger.error(err);
                }
            }));
        });
    }
}
Connection.isModule = true;
Connection._started = false;
Connection.sessions = new Map();
Connection.retries = new Map();
Connection.isSessionExists = (sessionId) => {
    return Connection.sessions.has(sessionId);
};
Connection.isStoreExists = (sessionId) => {
    //return Connection.stores.has(sessionId)
};
Connection.pushMessage = (conn, m) => {
    if (['senderKeyDistributionMessage', 'protocolMessage'].includes(m.mtype))
        return;
    let id = m.chat;
    let chats = conn.chats[id];
    if (!chats)
        chats = { id };
    if (!chats.messages)
        chats.messages = {};
    chats.messages[m.id] = JSON.stringify(m, null, 2);
};
/**
* Serialize Message, so it easier to manipulate
* @param {Object} m
*/
Connection.serializeM = (conn, m) => {
    return exports.smsg(conn, m);
};
//# sourceMappingURL=connection.js.map
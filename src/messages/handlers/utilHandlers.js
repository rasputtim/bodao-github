var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs-extra';
import lodash from 'lodash';
import moment from 'moment-timezone';
import path from 'path';
import { fileURLToPath } from 'url';
import BotDB from '../../basededatos/database.js';
import Bot from '../../factory/bot.js';
import { schedule } from '../../factory/library.js';
import Lists from '../../factory/libs/list.js';
import Notes from '../../factory/libs/note.js';
import { LocaleService } from '../../languajes/localeService.js';
import logger from './../../factory/logger.js';
import { UtilCommands } from './../commands.js';
const { existsSync, writeFileSync, readdirSync, readFileSync, writeFile, unlinkSync, createWriteStream } = fs;
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const excBold = '*[ ! ]';
const boldSign = '*';
const space = ' ';
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
let file = __filename; //require.resolve(__filename);
export class utilHandlers {
    constructor(_super) {
        this._super = _super;
        this._client = _super._client;
        _super.addCommandHandler(this);
    }
    handler() {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = this._super.sender;
            const ownerNumber = Bot.ownerNumber;
            const isBanModeOn = this._super.isBanModeOn;
            const isOwner = this._super.isOwner;
            const isFromME = this._super.isFromME;
            const isCREATOR = ownerNumber.includes(sender);
            const client = this._super._client;
            const pStore = this._super._store;
            let msg = this._super.msg;
            //Serialize MessageCore
            let msg_serial = this._super.msg_serial;
            //const content = this._super.content
            const from = this._super.from;
            const type = this._super.type;
            const _0xec3b62 = type === 'conversation' && msg.message.conversation.startsWith(Bot.prefix) ? msg.message.conversation : type == 'imageMessage' && msg.message[type].caption.startsWith(Bot.prefix) ? msg.message[type].caption : type == 'videoMessage' && msg.message[type].caption.startsWith(Bot.prefix) ? msg.message[type].caption : (type == 'extendedTextMessage') && msg.message[type].text.startsWith(Bot.prefix) ? msg.message[type].text : type == 'buttonsResponseMessage' ? msg.message.buttonsResponseMessage['selectedButtonId'] : type == 'listResponseMessage' ? msg.message.listResponseMessage.singleSelectReply['selectedRowId'] : type == 'templateButtonReplyMessage' ? msg.message.templateButtonReplyMessage.selectedId : type === 'messageContextInfo' ? msg.message.buttonsResponseMessage.selectedButtonId : '';
            const body = this._super.body;
            const chats = this._super.chats;
            const dateFormat = BotDB.dateFormat;
            const time = BotDB.time;
            const now = BotDB.now;
            const messageC = this._super.messageC;
            const command = this._super.command;
            const commandWithPrefix = this._super.commandWithPrefix;
            const isCmd = this._super.isCmd;
            const args = this._super.args;
            //const _0x117b04 = body.split(' ');
            const argsLC = args.map(a => a.toLowerCase());
            const conversation = this._super.conversation;
            const q = this._super.q;
            const quoted = this._super.quoted;
            const jids = this._super.jids;
            const mime = this._super.mime;
            const isMedia = this._super.isMedia;
            const isGroupMsg = this._super.isGroupMsg;
            const AtSenderNUMBER = this._super.AtSenderNUMBER;
            const senderNUMBER = this._super.senderNUMBER;
            const cglobal = this._super.cglobal;
            const _atBotNumber = this._super._atBotNumber;
            const botControllers = this._super.botControllers;
            const isBotController = this._super.isBotController;
            const pushname = this._super.pushname;
            const groupMetadata = this._super.groupMetadata; //120363025246779605@g.us
            const groupId = this._super.groupId;
            const groupOwner = this._super.groupOwner;
            const groupDesc = this._super.groupDesc;
            const groupName = this._super.groupName;
            const groupMembers = this._super.groupMembers;
            const groupAdmins = this._super.groupAdmins;
            const isBotAdmin = this._super.isBotAdmin;
            const isAdmin = this._super.isAdmin;
            const isLevelinModeOn = this._super.isLevelinModeOn;
            const isAntiLinkModeOn = this._super.isAntiLinkModeOn;
            const isAntiLinkGroupModeOn = this._super.isAntiLinkGroupModeOn;
            const isWelcomeModeOn = this._super.isWelcomeModeOn;
            const isAntiVirtexModeOn = this._super.isAntiVirtexModeOn;
            const isAntifakes1 = this._super.isAntifakes1;
            const isAntifakes2 = this._super.isAntifakes2;
            const isForeignModeOn = this._super.isForeignModeOn;
            const isAnimeModeOn = this._super.isAnimeModeOn;
            const isFunModeOn = this._super.isFunModeOn;
            const isNSFWModeOn = this._super.isNSFWModeOn;
            const isSIMIModeOn = this._super.isSIMIModeOn;
            const isREGISTERED = this._super.isREGISTERED;
            const isBanned = this._super.isBanned;
            const isAFK = this._super.isAFK;
            const NameBot = Bot.NameBot;
            const total_hits = BotDB.totalCMD[0]['totalcmd'];
            try {
                const handlers = {
                    /* #region Note Creator Commands */
                    runNote: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0)) {
                            let theNotes = yield Notes.getNoteName(this._super.from);
                            let _what = this._super.isGroupMsg ? `group` : `chat`;
                            let _msg = '';
                            if (theNotes === false || (Array.isArray(theNotes) && theNotes.length === 0)) {
                                _msg += nl + '*┗⊱* ' + __(`this %s doesn't have notes yet.`, _what);
                            }
                            else {
                                _msg += nl + '*┗⊱* ' + __('Notes on this') + space + _what + ': ' + nl + '➣ ';
                                if (Array.isArray(theNotes))
                                    _msg += theNotes.join(nl + '➣ ');
                            }
                            let theTxt = '*┏━━⊱ 「 ' + __('NOTES') + ' 」*'
                                + nl + BotDB.idiomas.notes.display;
                            theTxt += nl + nl + _msg
                                + nl + '*┏━━⊱ 「 ' + __('USAGE') + ' 」*'
                                + nl + '┃ ' + BotDB.idiomas.use.command
                                + nl + commandObj.usage(Bot.prefix);
                            this._super.reply(theTxt);
                        }
                        else if (this._super.args.length > 0) {
                            let res = yield Notes.getNoteData(this._super.from, this._super.args[0]);
                            const createNoteCommand = UtilCommands.find(UtilCommands => UtilCommands.name == 'createnote');
                            let noteContent = '';
                            if (res && typeof res === 'object')
                                noteContent = res.content;
                            if (!res)
                                return this._super.reply(`${BotDB.idiomas.notes.none}\n${BotDB.idiomas.use.command} ${createNoteCommand === null || createNoteCommand === void 0 ? void 0 : createNoteCommand.usage}`);
                            let respon = `✪〘 ${this._super.args[0].toUpperCase()} 〙✪`;
                            respon += `\n\n${noteContent}`;
                            yield this._super.reply(respon);
                        }
                    }),
                    runCreatenote: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.args.length < 2 && !this._super.isQuotedChat)
                            return yield this._super.reply(`${commandObj.description} ${BotDB.idiomas.use.command} ${commandObj.usage}`);
                        if (this._super.isQuotedChat && this._super.hasNoArg())
                            return this._super.reply(BotDB.idiomas.notes.name);
                        let content = this._super._quoted ? this._super.quoted.text : this._super.arg1;
                        const noteName = this._super.args[0];
                        const respon = yield Notes.createNote(this._super.from, noteName, content);
                        const myMSG = (respon === false) ? BotDB.idiomas.notes.exists(noteName) : BotDB.idiomas.notes.created(noteName);
                        yield this._super.reply(myMSG);
                    }),
                    runDeletenote: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(`${commandObj.description} ${BotDB.idiomas.use.command} ${commandObj.usage}`);
                        const theNote = yield Notes.getNoteName(this._super.from);
                        if ((Array.isArray(theNote) && theNote.length !== 0) && theNote.includes(this._super.args[0])) {
                            this._super.reply(BotDB.idiomas.notes.willdelete + ``);
                        }
                        else {
                            this._super.reply(BotDB.idiomas.notes.none);
                        }
                    }),
                    runYesdeletenote: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return null;
                        const respon1 = yield Notes.deleteNote(this._super.from, this._super.args[0]);
                        yield this._super.reply((respon1 === false) ? `${BotDB.idiomas.notes.not_found(this._super.args[0])}` : `${BotDB.idiomas.notes.deleted(this._super.args[0])}`);
                    }),
                    /* #endregion */
                    runListonline: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this._super.isGroupMsg)
                            return this._super.reply(BotDB.idiomas.error.group);
                        let msgs = '╔══✪〘 ' + __('List Online') + ` 〙✪\n${global.readMore}`;
                        //TODO: check and solve tto get chat participants and their states for Bailays
                        lodash.filter(this._super._client.fetchStatus('participants'), (n) => !!(n === null || n === void 0 ? void 0 : n.type)).forEach(item => {
                            msgs += `╠> @${item.id.replace(/@c\.us/g, '')}\n`;
                        });
                        msgs += '╚═〘 *BodaoBot* 〙';
                        yield this._super.sendMentionedMessage(msgs);
                    }),
                    runRemind: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0) && this._super.quotedMsg === null)
                            return this._super.reply(BotDB.idiomas.remind.usage);
                        const dd = this._super.args[0].match(/\d+(d|D)/g);
                        const hh = this._super.args[0].match(/\d+(h|H)/g);
                        const mm = this._super.args[0].match(/\d+(m|M)/g);
                        const hhmm = this._super.args[0].match(/\d{2}:\d{2}/g);
                        let DDMM = this._super.args[0].match(/\d\d?\/\d\d?/g) || [moment(this._super.time * 1000).format('DD/MM')];
                        let milis = 0;
                        if (dd === null && hh === null && mm === null && hhmm === null) {
                            return this._super.reply(BotDB.idiomas.error.wrong_format + `! ` + __('enter time'));
                        }
                        else if (hhmm === null) {
                            let d = dd != null ? dd[0].replace(/d|D/g, '') : 0;
                            let h = hh != null ? hh[0].replace(/h|H/g, '') : 0;
                            let m = mm != null ? mm[0].replace(/m|M/g, '') : 0;
                            milis = (Number(d) * 24 * 60 * 60 * 1000) + (Number(h) * 60 * 60 * 1000) + (Number(m) * 60 * 1000);
                        }
                        else {
                            let DD = DDMM[0].replace(/\/\d\d?/g, '');
                            let MM = DDMM[0].replace(/\d\d?\//g, '');
                            milis = Date.parse(`${moment(this._super.time * 1000).format('YYYY')}-${MM}-${DD} ${hhmm[0]}:00 GMT+3`) - Date.parse(`${moment(this._super.time * 1000)}`);
                        }
                        if (milis < 0)
                            return this._super.reply(BotDB.idiomas.remind.past);
                        if (milis >= 864000000)
                            return this._super.reply(BotDB.idiomas.remind.late);
                        let content = this._super.arg.trim().substring(this._super.arg.indexOf(' ') + 1);
                        if (content === '')
                            return this._super.reply(BotDB.idiomas.error.wrong_format + `! ` + BotDB.idiomas.what.message);
                        if (milis === null)
                            return this._super.reply(BotDB.idiomas.error.sorry);
                        yield schedule.futureMilis(this._super._client, this._super.message, content, milis, (this._super.quotedMsg != null)).catch(e => console.log(e));
                        yield this._super.reply(__(`Reminder for`) + space + ` ${moment((this._super.time * 1000) + milis).format('DD/MM/YY HH:mm:ss')}` + space + __(`sets!`));
                    }),
                    runList: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0)) {
                            let thelist = yield Lists.getListName(this._super.from);
                            let _what = this._super.isGroupMsg ? `Group` : `Chat`;
                            let _msg;
                            if (thelist === false || (Array.isArray(thelist) && thelist.length === 0)) {
                                _msg = nl + '*┗⊱* ' + __(`this %s doesn't have a list yet.`, _what);
                            }
                            else {
                                _msg = nl + '*┗⊱* ' + __('Lists on this') + space + _what + ': ' + nl + '➣ ';
                                if (Array.isArray(thelist))
                                    _msg += thelist.join(nl + '➣ ');
                            }
                            let myTxt = '*┏━━⊱ 「 ' + __('LIST') + ' 」*'
                                + nl + BotDB.idiomas.list.display
                                + nl + nl + _msg
                                + nl + nl + '*┏━━⊱ 「 ' + __('USAGE') + ' 」*'
                                + BotDB.idiomas.list.createListCommandTXT
                                + BotDB.idiomas.list.delListCommandTXT
                                + BotDB.idiomas.list.fill
                                + BotDB.idiomas.list.addCommandTXT
                                + BotDB.idiomas.list.editCommandTXT
                                + BotDB.idiomas.list.delCommandTXT;
                            this._super.reply(myTxt);
                        }
                        else if (this._super.args.length > 0) {
                            let res = yield Lists.getListData(this._super.from, this._super.args[0]);
                            if (!res)
                                return this._super.reply(__('there is no list , please make it first.') + nl + BotDB.idiomas.use.command + boldSign + Bot.prefix + `createlist ${this._super.args[0]}* (please only use 1 word for ` + __('list name') + `)`);
                            let desc = '';
                            if (res.desc !== __("There isn't") + space) {
                                desc = `║ _${res.desc}_\n`;
                            }
                            let respon = `╔══✪〘 ` + __('List') + ` ${this._super.args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║` + nl;
                            res.listData.forEach((data, i) => {
                                respon += `║ ${i + 1}. ${data}\n`;
                            });
                            respon += '║' + nl + '╚═〘 *BodaoBot* 〙';
                            yield this._super.reply(respon);
                        }
                    }),
                    runCreatelist: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        var _a, _b;
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(BotDB.idiomas.list.createListCommandTXT);
                        const desc = (_b = (_a = this._super.arg.split('|')[1]) === null || _a === void 0 ? void 0 : _a.trim()) !== null && _b !== void 0 ? _b : __("There isn't") + space;
                        const respon = yield Lists.createList(this._super.from, this._super.args[0], desc);
                        yield this._super.reply((respon === false) ? __('List') + space + this._super.args[0] + __('already exists, use another name.') : __(`List`) + space + this._super.args[0] + space + __('successfully made.'));
                    }),
                    runDeletelist: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(BotDB.idiomas.list.delListCommandTXT);
                        const thelist = yield Lists.getListName(this._super.from);
                        if ((Array.isArray(thelist) && thelist.length !== 0) && thelist.includes(this._super.args[0])) {
                            this._super.reply(`[❗]` + __(`List`) + space + this._super.args[0] + space + __(`will be deleted.`) + space + nl + __(`Send`) + boldSign + `${Bot.prefix}yesdeletelist ${this._super.args[0]}` + boldSign + __('to confirm, ignore if not so.'));
                        }
                        else {
                            this._super.reply(__('List') + space + this._super.args[0] + __('there is none'));
                        }
                    }),
                    runYesdeletelist: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return null;
                        const respon1 = yield Lists.deleteList(this._super.from, this._super.args[0]);
                        yield this._super.reply((respon1 === false) ? __('List') + space + this._super.args[0] + __('there is none') : __('List') + this._super.args[0] + space + __('successfully deleted.'));
                    }),
                    runAddtolist: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(BotDB.idiomas.list.fillList + BotDB.idiomas.list.addCommandTXT);
                        if (this._super.numberOfArgs(1))
                            return this._super.reply(BotDB.idiomas.error.wrong_format + `, what's the name and contents woy`);
                        const thelist1 = yield Lists.getListName(this._super.from);
                        if ((Array.isArray(thelist1) && thelist1.length !== 0) && !thelist1.includes(this._super.args[0])) {
                            return this._super.reply(`List ${this._super.args[0]} ${BotDB.idiomas.notFound}.`);
                        }
                        else {
                            let newlist = this._super.arg.substr(this._super.arg.indexOf(' ') + 1).split('|').map((item) => {
                                return item.trim();
                            });
                            let res = yield Lists.addListData(this._super.from, this._super.args[0], newlist);
                            let desc = '';
                            if (res.desc !== "There isn't") {
                                desc = `║ _${res.desc}_\n`;
                            }
                            let respon = `╔══✪〘 List ${this._super.args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║\n`;
                            res.listData.forEach((data, i) => {
                                respon += `║ ${i + 1}. ${data}\n`;
                            });
                            respon += '║\n╚═〘 *BodaoBot* 〙';
                            yield this._super.reply(respon);
                        }
                    }),
                    runEditlist: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(BotDB.idiomas.list.editCommandTXT);
                        if (this._super.args.length < 3)
                            return this._super.reply(BotDB.idiomas.error.wrong_format + `. make sure there is a listname, index, the same content `);
                        const thelist1 = yield Lists.getListName(this._super.from);
                        if ((Array.isArray(thelist1) && thelist1.length !== 0) && !thelist1.includes(this._super.args[0])) {
                            return this._super.reply(`List ${this._super.args[0]} ${BotDB.idiomas.notFound}.`);
                        }
                        else {
                            let n = this._super.arg.substr(this._super.arg.indexOf(' ') + 1);
                            let newlist = n.substr(n.indexOf(' ') + 1);
                            let res = yield Lists.editListData(this._super.from, this._super.args[0], newlist, Number(this._super.args[1]) - 1);
                            let desc = '';
                            if (res.desc !== "There isn't ") {
                                desc = `║ _${res.desc}_\n`;
                            }
                            let respon = `╔══✪〘 List ${this._super.args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║\n`;
                            res.listData.forEach((data, i) => {
                                respon += `║ ${i + 1}. ${data}\n`;
                            });
                            respon += '║\n╚═〘 *BodaoBot* 〙';
                            yield this._super.reply(respon);
                        }
                    }),
                    runDelist: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(BotDB.idiomas.list.delCommandTXT);
                        if (this._super.numberOfArgs(1))
                            return this._super.reply(BotDB.idiomas.error.wrong_format + `, what's the ` + __('list name') + ` and number?`);
                        const thelist2 = yield Lists.getListName(this._super.from);
                        if ((Array.isArray(thelist2) && thelist2.length !== 0) && !thelist2.includes(this._super.args[0])) {
                            return this._super.reply(`List ${this._super.args[0]} ${BotDB.idiomas.notFound} .`);
                        }
                        else {
                            let number = this._super.arg.substr(this._super.arg.indexOf(' ') + 1).split(',').map((item) => {
                                return +item.trim() - 1;
                            });
                            yield number.reverse().forEach((num) => __awaiter(this, void 0, void 0, function* () {
                                yield Lists.removeListData(this._super.from, this._super.args[0], num);
                            }));
                            let res = yield Lists.getListData(this._super.from, this._super.args[0]);
                            let desc = '';
                            if (res.desc !== "There isn't ") {
                                desc = `║ _${res.desc}_` + nl;
                            }
                            let respon = `╔══✪〘 List ${this._super.args[0].replace(/^\w/, (c) => c.toUpperCase())} 〙✪\n${desc}║\n`;
                            res.listData.forEach((data, i) => {
                                respon += `║ ${i + 1}. ${data}` + nl;
                            });
                            respon += '║' + nl + '╚═〘 *BodaoBot* 〙';
                            yield this._super.reply(respon);
                        }
                    }),
                    runDel: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this._super.quotedMsg)
                            return this._super.reply(BotDB.idiomas.error.wrong_format + nl + __('Reply bot message with caption') + space + `${Bot.prefix}del`);
                        if (!this._super.isFromME)
                            return this._super.reply(BotDB.idiomas.error.wrong_format + nl + __('Reply bot message with caption') + space + `${Bot.prefix}del`);
                        yield this._super._client.deleteMessage(this._super.from, this._super.quotedMsg.id, false).catch(e => this._super.printError(e, false));
                    }),
                    default: () => {
                        //nothing to do
                    }
                };
                const runCommand = () => {
                    const userCommands = UtilCommands;
                    let foundCommand = userCommands.find(userCommands => userCommands.name == this._super.command);
                    if (foundCommand) {
                        if (foundCommand.type === 'option' && foundCommand.runable === 'y') {
                            //eval(foundCommand.script)(foundCommand,message)
                            //const myScript :any= foundCommand.script  ? foundCommand.script : ''
                            if (handlers.hasOwnProperty(foundCommand.script)) {
                                this._super._commandFound = true;
                                handlers[foundCommand.script](foundCommand);
                            }
                        }
                        else if (foundCommand.type === 'alias' && foundCommand.runable === 'y') {
                            let rootCommand = userCommands.find(userCommands => userCommands.name == (foundCommand === null || foundCommand === void 0 ? void 0 : foundCommand.root));
                            if (rootCommand) {
                                if (handlers.hasOwnProperty(rootCommand.script)) {
                                    this._super._commandFound = true;
                                    handlers[rootCommand.script](rootCommand);
                                    //eval(foundCommand.script)(foundCommand,message)
                                }
                            }
                            else {
                                return this._super.reply(__('command not found'));
                            }
                        }
                    }
                    else {
                        handlers['default']();
                    }
                };
                if (isCmd)
                    runCommand();
            }
            catch (err) {
                let error = String(err);
                //console.log(nl)
                logger.error(err);
                //console.log(nl)
            }
        });
    }
}
//# sourceMappingURL=utilHandlers.js.map
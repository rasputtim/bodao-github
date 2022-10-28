var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { exec } from 'child_process';
import { evaluate } from 'mathjs';
import moment from 'moment';
import path from 'path';
import { fileURLToPath } from 'url';
import { default as util, default as utils, inspect } from 'util';
import BotDB from '../../basededatos/database.js';
import kuakerzzz from '../../basededatos/uwudefender/destravasimple.js';
import Bot from '../../factory/bot.js';
import Utils from '../../factory/libs/functions.js';
import note from '../../factory/libs/note.js';
import { LocaleService } from '../../languajes/localeService.js';
import logger from './../../factory/logger.js';
;
//const localeService = container.resolve('localeService');
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
export default class NotCommandHandlers {
    constructor(_super) {
        this._super = _super;
        this._client = _super._client;
        _super.addNotCommandHandler(this);
    }
    //run default check for all messages
    // =>
    // >
    //$
    //simi
    default() {
        return __awaiter(this, void 0, void 0, function* () {
            const sender = this._super.sender;
            const ownerNumber = Bot.ownerNumber;
            const isBanModeOn = this._super.isBanModeOn;
            const isOwner = this._super.isOwner;
            const isFromME = this._super.isFromME;
            const isCREATOR = ownerNumber.includes(sender);
            const chats = this._super.chats;
            const from = this._super.from;
            const messageC = this._super.messageC;
            const chatsL = chats.toLowerCase();
            const messageCL = messageC.toLowerCase();
            const AtSenderNUMBER = this._super.AtSenderNUMBER;
            const isBotController = this._super.isBotController;
            const pushname = this._super.pushname;
            const groupOwner = this._super.groupOwner;
            const isAdmin = this._super.isAdmin;
            const isBanned = this._super.isBanned;
            const NameBot = Bot.NameBot;
            const client = this._super.client;
            const msgQuote = this._super.msgQuote;
            const BodaoBotURL = this._super.BodaoBotURL;
            const sendThumb = this._super.sendThumb;
            const audioQuote = this._super.audioQuote;
            const conversation = this._super.conversation;
            const jid = this._super.jid;
            /***** ANTI-AÚDIO ******/
            if (this._super.isGroupMsg && !this._super.isCmd && this._super.isAntiAudioModeOn && !isAdmin) {
                let author = pushname;
                if (this._super.isAudio) {
                    if (this._super.isKickModeOn) {
                        var usertoKick = this._super._sender.split('@')[0] + '@s.whatsapp.net';
                        this._client.groupParticipantsUpdate(this._super._from, [usertoKick], 'remove');
                    }
                    return this.sendMentionedMessage('Anti-Aúdio está ativo neste grupo, este é o motivo da remoção do usuário @' + this._super.sender.split('@')[0]);
                }
            }
            /***** ANTI-VIDEO ******/
            if (this._super.isGroupMsg && !this._super.isCmd && this._super.isAntiVideoModOn && !isAdmin) {
                if (this._super.isVideo) {
                    let author = pushname;
                    if (this._super.isKickModeOn) {
                        var usertoKick = this._super._sender.split('@')[0] + '@s.whatsapp.net';
                        this._client.groupParticipantsUpdate(this._super._from, [usertoKick], 'remove');
                    }
                    return this.sendMentionedMessage('Anti-Video está ativo neste grupo, este é o motivo da remoção do usuário @' + this._super.sender.split('@')[0]);
                }
            }
            /***** LIMITAÇÃO DE POSTS/FLOOD  *****/
            if (!this._super.isCmd && this._super.isImage) {
                const flood = this._super._chat.isFlooding(this._super._sender, this._super.time);
                if (flood === true)
                    this._super.reply(" *ATENÇÃO!* \n\nVocê está floodando muito!!!! \nSe continuar, irei mandar você para as profundezas do inferno.");
            }
            if (chats.startsWith('=>')) {
                if (!isFromME && !isCREATOR)
                    return;
                return yield this.sendMentionedMessage(util.format(yield eval(`(async () => { return ` + chats.slice(3) + ` })()`).catch(err => {
                    logger.error(err);
                })));
            }
            if (chats.startsWith('>')) {
                if (!isFromME && !isCREATOR)
                    return;
                try {
                    let evalResult = yield eval(this._super.q);
                    if (typeof evalResult !== 'string')
                        evalResult = utils.inspect(evalResult);
                    yield this.sendMentionedMessage(evalResult);
                }
                catch (err) {
                    this._super.msg_serial = String(err);
                    yield this.sendMentionedMessage(this._super.msg_serial);
                }
            }
            if (chats.startsWith('$')) {
                if (!isFromME && !isCREATOR)
                    return;
                exec(chats.slice(2), (_0x5a735e, _0x3e80b8) => {
                    if (_0x5a735e)
                        return this._super.sendMentionedMessage(_0x5a735e);
                    if (_0x3e80b8)
                        return this._super.sendMentionedMessage(_0x3e80b8);
                });
            }
            if (chats.startsWith('{}')) {
                if (isBanned)
                    return;
                if (!this._super.isBotController && this._super._user.isLimited)
                    return;
                if (!isCREATOR)
                    return;
                if (!this._super.isGroupMsg)
                    return;
                let _0x14b58b = this._super.quoted ? this._super.quoted : 'null';
                let sat = JSON.stringify(_0x14b58b, null, 2);
                let bang = util.format(sat);
                return client.sendMessage(from, {
                    'text': bang,
                    'mentions': [this._super._sender]
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': this._super.msgQuote
                }).catch(err => {
                    logger.error(err);
                    this._super.mySendMessage(BotDB.idiomas.Erreply());
                });
            }
            //SIMI - Conversation (chat) api
            if (this._super.isSIMIModeOn && !isFromME && this._super.body != undefined) {
                if (Bot.OnOffLine === true)
                    return;
                //if it is command return
                if (chats.startsWith(Bot.prefix))
                    return;
                //otherwise if it is conversation, talk to SIMI api
                try {
                    this._super.doSimi(this._super.body);
                }
                catch (_0x284302) {
                    this._super.sendMentionedMessage(BotDB.idiomas.ErrorResponse);
                }
            }
        });
    }
    handler() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const sender = this._super.sender;
            const ownerNumber = Bot.ownerNumber;
            const isBanModeOn = this._super.isBanModeOn;
            const isOwner = this._super.isOwner;
            const isFromME = this._super.isFromME;
            const isCREATOR = ownerNumber.includes(sender);
            //m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
            yield this.default();
            /**
                 * se eu estiver banido, ou a mensagem não for minha, ou eu não sou dono nem criador do bot, retorna
                 */
            if (isBanModeOn && !isFromME && !isOwner && !isCREATOR)
                return;
            let msg = this._super.msg;
            if (!msg.message)
                return;
            if (msg.key && msg.key.remoteJid === 'status@broadcast')
                return;
            if (this._super.id.startsWith('BAE5') && this._super.id.length === 16)
                return;
            const from = this._super.from;
            const chats = this._super.chats;
            const messageC = this._super.messageC;
            const chatsL = chats.toLowerCase();
            const messageCL = messageC.toLowerCase();
            const AtSenderNUMBER = this._super.AtSenderNUMBER;
            const isBotController = this._super.isBotController;
            const pushname = this._super.pushname;
            const groupOwner = this._super.groupOwner;
            const isAdmin = this._super.isAdmin;
            const isBanned = this._super.isBanned;
            const NameBot = Bot.NameBot;
            const client = this._super.client;
            const msgQuote = this._super.msgQuote;
            const BodaoBotURL = this._super.BodaoBotURL;
            const sendThumb = this._super.sendThumb;
            const audioQuote = this._super.audioQuote;
            const conversation = this._super.conversation;
            const jid = this._super.jid;
            const _0x15d83a = {
                'key': {
                    'participant': '0@s.whatsapp.net',
                    'remoteJid': '0@s.whatsapp.net'
                },
                'message': {
                    'groupInviteMessage': {
                        'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                        'inviteCode': 'm',
                        'groupName': 'P',
                        'caption': pushname + ': ' + conversation,
                        'jpegThumbnail': BotDB.images.logo
                    }
                }
            };
            switch (true) {
                case /^\b(olá|ola|oi|hello)\b/i.test(chats): {
                    yield this._super.reply(`Olá ${this._super.pushname} 👋`);
                    break;
                }
                case /^p$/i.test(chats): {
                    return !this._super.isGroupMsg ? this._super.mySendMessage(BotDB.idiomas.toShowMenu(Bot.prefix)) : null;
                }
                case /^(menu|start|help)$/i.test(chats): {
                    return yield this._super.mySendMessage(BotDB.idiomas.toShowMenu(Bot.prefix));
                }
                case /^=/.test(chats): {
                    try {
                        yield this._super.reply(`${evaluate(chats.slice(1).replace(/x/ig, '*')
                            .replace(/×/g, '*').replace(/÷/g, '/').replace(/%/g, '/100'))}`);
                    }
                    catch (e) {
                        this._super.reply(`${e.name} ${e.message}`);
                    }
                    break;
                }
                case /\bping\b/i.test(chats): {
                    return yield this._super.mySendMessage(`Pong!!!\nSpeed: _${Utils.processTime(this._super.t, moment().toDate())} Seconds_`);
                }
                case new RegExp(`\\b(${BotDB.sfx.join("|")})\\b`).test(chats === null || chats === void 0 ? void 0 : chats.toLowerCase()): {
                    const theSFX = chats === null || chats === void 0 ? void 0 : chats.toLowerCase().match(new RegExp(BotDB.sfx.join("|")));
                    const path = `./src/assets/sfx/${theSFX}.mp3`;
                    const _id = (this._super.quotedMsg != null) ? this._super.quotedMsgObj.id : this._super.id;
                    yield this._super.client.sendPtt(from, path, _id).catch(e => { return this._super.printError(e); });
                    break;
                }
                case /^#\S*$/ig.test(chats): { //comando para ler notas #nome da nota
                    let res = yield note.getNoteData(from, chats.slice(1));
                    if (!res)
                        return this._super.reply(`Note do not exist, please create them first.\nUse command: *${Bot.prefix}createnote ${this._super.chats.slice(1)} (write the contents)* \nPlease only use 1 word to name note `);
                    let respon = `✪〘 ${chats.slice(1).toUpperCase()} 〙✪`;
                    respon += `\n\n${res.content}`;
                    yield this._super.reply(respon);
                    break;
                }
                case /\b(bode|bodao|bodaobot|bodão|bodãobot)\b/ig.test(chats): {
                    if (!this._super.isCmd) {
                        let txt = chats.replace(/@\d+/g, '');
                        return this._super.doSimi(txt);
                    }
                    break;
                }
                case /^>/.test(chats): {
                    if (!this._super.isOwner)
                        return null;
                    this._super.client.simulateTyping(from, false);
                    try {
                        let evaled = eval(`(async() => {
                               try {
                                   ${chats.slice(2)}
                               } catch (e) {
                                   console.log(e)
                                   this._super.mySendMessage(e.toString())
                               }
                           })()`);
                        if (typeof evaled !== 'string')
                            evaled = inspect(evaled);
                        if (chats.includes('return'))
                            this._super.mySendMessage(`${evaled}`);
                        else
                            this._super.reply(`✅ OK!`);
                    }
                    catch (err) {
                        logger.error(err);
                        this._super.mySendMessage(`${err}`);
                    }
                    break;
                }
                case /^\$/.test(chats): {
                    if (!this._super.isOwner)
                        return null;
                    this._super.client.simulateTyping(from, false);
                    exec(chats.slice(2), (err, stdout, stderr) => {
                        if (err) {
                            this._super.mySendMessage(err);
                            console.error(err);
                        }
                        else {
                            this._super.mySendMessage(stdout + stderr);
                            console.log(stdout, stderr);
                        }
                    });
                    break;
                }
                default:
            }
            // Se o bot estiver dimensionado, ele responderá à mensagem 
            if (((_b = (_a = this._super.message) === null || _a === void 0 ? void 0 : _a.mentionedJidList) === null || _b === void 0 ? void 0 : _b.length) == 1 && ((_d = (_c = this._super.message) === null || _c === void 0 ? void 0 : _c.mentionedJidList) === null || _d === void 0 ? void 0 : _d.includes(this._super.botNumber))) {
                let txt = this._super.chats.replace(/@\d+/g, '');
                if (txt.length === 0) {
                    this._super.reply(BotDB.idiomas.what.wrong);
                }
                else {
                    this._super.doSimi(txt);
                }
            }
            //if (this._super.quotedMsg?.fromMe && !this._super.isCmd && this._super.type === `chat`) tebak.getAns(from).then(res => {
            //    if (!res) return this._super.doSimi(chats)
            //})
            if (chatsL.includes('prefixo?') || chatsL.includes('Prefixo?')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage(__(`In case you're wondering what the bot prefix is`) + `: ` + boldSign + Bot.prefix + `* "`);
            }
            if (messageCL.includes('destrava')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                if (isAdmin && !isFromME && !groupOwner) {
                    this._super.sendMentionedMessage(kuakerzzz());
                }
                else {
                    this._super.sendMentionedMessage(kuakerzzz());
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                    this._super._user.limitInc = 1;
                }
            }
            if (chatsL.includes('c suicida')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                (this._super.sendMentionedMessage(boldSign + __('suicide is not an option') + boldSign + ' 😞🤙'),
                    setTimeout(() => {
                        this._super.sendMentionedMessage('_*' + __(`it's the solution`) + '*_ 😎🤝');
                    }, 2500),
                    this._super._user.limitInc = 1);
            }
            if (chatsL.includes(`zzz`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage('*' + __('Are you sleepy or anemic?') + boldSign
                    + space + boldSign + __('Go to the doctor and you will notice the difference') + '; ');
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
            }
            if (chatsL.includes(`impostor`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                (this._super.sendMentionedMessage(`*AmongUs*`), this._super._user.limitInc = 1);
            }
            if (chatsL.includes(`ctm`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                (this._super.sendMentionedMessage(`*Cuida-Tu-Mundo*`), this._super._user.limitInc = 1);
            }
            if (chatsL.includes(`lptm`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                (this._super.sendMentionedMessage(`*La-Paja-Te-Mata*`), this._super._user.limitInc = 1);
            }
            if (chatsL.includes('ptm')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage('*Pronto-Te-Moriras*');
                this._super._user.limitInc = 1;
            }
            if (chatsL.includes(`puto bot`) || (chatsL.includes(`bot puto`) || (chatsL.includes(`pinche bot`)
                || (chatsL.includes(`bot gey`) || (chatsL.includes(`bot gay`)))))) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                let result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12, result13, result14, result15, result16, result17, result18, result19, result20, result21, result22, result23, result24, result25, result26, result27, result28, result29, result30, result31, result32, result33, result34, result35, result36, result37, result38, result39, result40, result41, result42, result43, result44, result45, result46, result47, result48, result49, result50, result51, result52, result53, result54, result55, result56, result57, result58, result59, result60, result61, result62, result63, result64, result65, result66, result67, result68, result69, result70, result71, result72, result73, result74, result75, result76, result77, result78, result79, result80;
                var stickDataBase = [result0 = BotDB.getStickerWebP('rpt1'), result1 = BotDB.getStickerWebP('rpt2'), result2 = BotDB.getStickerWebP('rpt3'), result3 = BotDB.getStickerWebP('rpt4'), result4 = BotDB.getStickerWebP('rpt5'), result5 = BotDB.getStickerWebP('rpt6'), result6 = BotDB.getStickerWebP('rpt7'), result7 = BotDB.getStickerWebP('rpt8'), result8 = BotDB.getStickerWebP('rpt9'), result9 = BotDB.getStickerWebP('rpt10'), result10 = BotDB.getStickerWebP('rpt11'), result11 = BotDB.getStickerWebP('rpt12'), result12 = BotDB.getStickerWebP('rpt13'), result13 = BotDB.getStickerWebP('rpt14'), result14 = BotDB.getStickerWebP('rpt15'), result15 = BotDB.getStickerWebP('rpt16'), result16 = BotDB.getStickerWebP('rpt17'), result17 = BotDB.getStickerWebP('rpt18'), result18 = BotDB.getStickerWebP('rpt19'), result19 = BotDB.getStickerWebP('rpt20'), result20 = BotDB.getStickerWebP('rpt21'), result21 = BotDB.getStickerWebP('rpt22'), result22 = BotDB.getStickerWebP('rpt23'), result23 = BotDB.getStickerWebP('rpt24'), result24 = BotDB.getStickerWebP('rpt25'), result25 = BotDB.getStickerWebP('rpt26'), result26 = BotDB.getStickerWebP('rpt27'), result27 = BotDB.getStickerWebP('rpt28'), result28 = BotDB.getStickerWebP('rpt29'), result29 = BotDB.getStickerWebP('rpt30'), result30 = BotDB.getStickerWebP('rpt31'), result31 = BotDB.getStickerWebP('rpt32'), result32 = BotDB.getStickerWebP('rpt33'), result33 = BotDB.getStickerWebP('rpt34'), result34 = BotDB.getStickerWebP('rpt35'), result35 = BotDB.getStickerWebP('rpt36'), result36 = BotDB.getStickerWebP('rpt37'), result37 = BotDB.getStickerWebP('rpt38'), result38 = BotDB.getStickerWebP('rpt39'), result39 = BotDB.getStickerWebP('rpt40'), result40 = BotDB.getStickerWebP('rpt41'), result41 = BotDB.getStickerWebP('rpt42'), result42 = BotDB.getStickerWebP('rpt43'), result43 = BotDB.getStickerWebP('rpt44'), result44 = BotDB.getStickerWebP('rpt45'), result45 = BotDB.getStickerWebP('rpt46'), result46 = BotDB.getStickerWebP('rpt47'), result47 = BotDB.getStickerWebP('rpt48'), result48 = BotDB.getStickerWebP('rpt49'), result49 = BotDB.getStickerWebP('rpt50'), result50 = BotDB.getStickerWebP('rpt51'), result51 = BotDB.getStickerWebP('rpt52'), result52 = BotDB.getStickerWebP('rpt53'), result53 = BotDB.getStickerWebP('rpt54'), result54 = BotDB.getStickerWebP('rpt55'), result55 = BotDB.getStickerWebP('rpt56'), result56 = BotDB.getStickerWebP('rpt57'), result57 = BotDB.getStickerWebP('rpt58'), result58 = BotDB.getStickerWebP('rpt59'), result59 = BotDB.getStickerWebP('rpt60'), result60 = BotDB.getStickerWebP('rpt61'), result61 = BotDB.getStickerWebP('rpt62'), result62 = BotDB.getStickerWebP('rpt63'), result63 = BotDB.getStickerWebP('rpt64'), result64 = BotDB.getStickerWebP('rpt65'), result65 = BotDB.getStickerWebP('rpt66'), result66 = BotDB.getStickerWebP('rpt67'), result67 = BotDB.getStickerWebP('rpt68'), result68 = BotDB.getStickerWebP('rpt69'), result69 = BotDB.getStickerWebP('rpt70'), result70 = BotDB.getStickerWebP('rpt71'), result71 = BotDB.getStickerWebP('rpt72'), result72 = BotDB.getStickerWebP('rpt73'), result73 = BotDB.getStickerWebP('rpt74'), result74 = BotDB.getStickerWebP('rpt75'), result75 = BotDB.getStickerWebP('rpt76'), result76 = BotDB.getStickerWebP('rpt77')];
                var randomStk = this._super.selectRamdomFromArray(stickDataBase);
                this._super._client.sendMessage(from, {
                    'sticker': randomStk,
                    'mentions': [sender]
                }, {
                    'quoted': _0x15d83a
                })
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1
                    , this._super._user.limitInc = 1;
            }
            if (chatsL.includes(`thank you bot`) || (chatsL.includes(`thanks bot`))) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super._client.sendMessage(from, {
                    'text': AtSenderNUMBER + ' to serve you, my king',
                    'mentions': [sender]
                }, {
                    'quoted': {
                        'key': Object.assign({ 'fromMe': false, 'participant': '0@s.whatsapp.net' }, from ? {
                            'remoteJid': `16505434800@s.whatsapp.net`
                        } : {}),
                        'message': {
                            'productMessage': {
                                'product': {
                                    'productImage': {
                                        'mimetype': `image/jpeg`,
                                        'jpegThumbnail': sendThumb
                                    },
                                    'title': '' + NameBot,
                                    'description': `@RLSystems`,
                                    'currencyCode': `USD`,
                                    'priceAmount1000': `5000000`,
                                    'salePriceAmount1000': '500',
                                    'url': `https://git.creasp.org.br/rasputtim`,
                                    'retailerId': `000000`,
                                    'productImageCount': 0x5
                                },
                                'businessOwnerJid': '0@s.whatsapp.net'
                            }
                        }
                    }
                });
            }
            if (chatsL.includes('te amo bot') || (chatsL.includes('bot te amo'))) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                let result0, result1, result2, result3, result4, result5, result6, result7;
                var _0x2a3631 = [result0 = BotDB.getStickerWebP('love1'), result1 = BotDB.getStickerWebP('love6'), result2 = BotDB.getStickerWebP('love2'), result3 = BotDB.getStickerWebP('love3'), result4 = BotDB.getStickerWebP('love4'), result5 = BotDB.getStickerWebP('love5')], _0x3f62e6 = this._super.selectRamdomFromArray(_0x2a3631);
                this._super._client.sendMessage(from, {
                    'sticker': _0x3f62e6,
                    'mentions': [sender]
                }, {
                    'quoted': {
                        'key': {
                            'participant': '0@s.whatsapp.net'
                        },
                        'message': {
                            'locationMessage': {
                                'name': pushname + ` <3`,
                                'jpegThumbnail': BotDB.images.logo
                            }
                        }
                    }
                });
            } //UwU = Blessed Face 
            //UwU or uwu is another way of typing the smiley face
            if (messageCL.includes(`uwu`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                let result1, result2, result3, result4, result5;
                var sticker = [result1 = BotDB.getStickerWebP('cringe1'),
                    result2 = BotDB.getStickerWebP('cringe2'),
                    result3 = BotDB.getStickerWebP('cringe3'),
                    result4 = BotDB.getStickerWebP('cringe4'),
                    result5 = BotDB.getStickerWebP('cringe5')];
                var stickerSelected = this._super.selectRamdomFromArray(sticker);
                this._super._client.sendMessage(from, {
                    'sticker': stickerSelected,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                });
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
            }
            //OwO = surprised Face
            //Usually an expression used by...furries..when they find something arousingly intresting.
            if (messageCL.includes(`owo`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var result0 = BotDB.getStickerWebP('owobot');
                (this._super._client.sendMessage(from, {
                    'sticker': result0,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                }), this._super._user.limitInc = 1, this._super._user.limitInc = 1, this._super._user.limitInc = 1, this._super._user.limitInc = 1, this._super._user.limitInc = 1);
            }
            //awa = Literal definition means you are cute and wonderful 
            //and I want to protect your smile and you deserve everything good in the world.
            if (messageCL.includes(`awa`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var result0 = BotDB.getStickerWebP('awabot');
                (this._super._client.sendMessage(from, {
                    'sticker': result0,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                }), this._super._user.limitInc = 1);
            }
            if (messageCL.includes(`ewe`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var result0 = BotDB.getStickerWebP('ewebot');
                (this._super._client.sendMessage(from, {
                    'sticker': result0,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                }), this._super._user.limitInc = 1);
            }
            if (messageCL.includes(`unu`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var result0 = BotDB.getStickerWebP('unubot');
                (this._super._client.sendMessage(from, {
                    'sticker': result0,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                }), this._super._user.limitInc = 1);
            }
            if (messageCL.includes(`7v7`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var result0 = BotDB.getStickerWebP('7v7bot');
                (this._super._client.sendMessage(from, {
                    'sticker': result0,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                }), this._super._user.limitInc = 1);
            }
            if (messageCL.includes(`7w7`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var result0 = BotDB.getStickerWebP('7w7bot');
                (this._super._client.sendMessage(from, {
                    'sticker': result0,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                }), this._super._user.limitInc = 1);
            }
            if (messageCL.includes(`7u7`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var result0 = BotDB.getStickerWebP('7u7bot');
                (this._super._client.sendMessage(from, {
                    'sticker': result0,
                    'mentions': [sender]
                }, {
                    'quoted': msgQuote
                }), this._super._user.limitInc = 1);
            }
            if (messageCL.includes('tonto')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage('*ˢᵉ ᵈᵉᵗᵉᶜᵗᵒ ᵘⁿ ᶦⁿˢᵘˡᵗᵒ ᵐᵘʸ ᶠᵘᵉʳᵗᵉ*');
            }
            if (messageCL.includes('bobo')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage('*ˢᵉ ᵈᵉᵗᵉᶜᵗᵒ ᵘⁿ ᶦⁿˢᵘˡᵗᵒ ᵐᵘʸ ᶠᵘᵉʳᵗᵉ*');
            }
            if (messageCL.includes('papanatas')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage(` *ˢᵉ ᵈᵉᵗᵉᶜᵗᵒ ᵘⁿ ᶦⁿˢᵘˡᵗᵒ ᵐᵘʸ ᶠᵘᵉʳᵗᵉ*
          _*ᴾᵃᵖᵃⁿᵃᵗᵃˢ*_`);
            }
            if (messageCL.includes('perseve')) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage(`*ˢᵉ ᵈᵉᵗᵉᶜᵗᵒ ᵘⁿ ᶦⁿˢᵘˡᵗᵒ ᵐᵘʸ ᶠᵘᵉʳᵗᵉ*
          _*ᴾᵉʳˢᵉᵛᵉ* _`);
            }
            if (messageCL.includes(`pelele`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage(`*ˢᵉ ᵈᵉᵗᵉᶜᵗᵒ ᵘⁿ ᶦⁿˢᵘˡᵗᵒ ᵐᵘʸ ᶠᵘᵉʳᵗᵉ*
          _*ᴾᵉˡᵉˡᵉ*_`);
            }
            if (messageCL.includes(`pamplinas`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage(`*ˢᵉ ᵈᵉᵗᵉᶜᵗᵒ ᵘⁿ ᶦⁿˢᵘˡᵗᵒ ᵐᵘʸ ᶠᵘᵉʳᵗᵉ*
          _*ᴾᵃᵐᵖˡᶦⁿᵃˢ*_`);
            }
            if (messageCL.includes(`chispas`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super.sendMentionedMessage(`*ˢᵉ ᵈᵉᵗᵉᶜᵗᵒ ᵘⁿ ᶦⁿˢᵘˡᵗᵒ ᵐᵘʸ ᶠᵘᵉʳᵗᵉ*
          _*ᶜʰᶦˢᵖᵃˢ*_`);
            }
            if (chatsL.includes('pasen porno') || (chatsL.includes(`pasen xxx`))) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                this._super._client.sendMessage(from, {
                    'text': `https://www.interpol.int 𝙸𝚗𝚝𝚎𝚛𝚙𝚘𝚕 𝚖𝚘𝚗𝚒𝚝𝚘𝚛𝚎𝚊 𝚕𝚘𝚜 𝚐𝚛𝚞𝚙𝚘𝚜 𝚍𝚎 𝚠𝚑𝚊𝚝𝚜𝚊𝚙𝚙
          *` + pushname + `️* , 𝚂𝚎𝚐𝚞𝚗 𝚕𝚊𝚜 𝚗𝚘𝚛𝚖𝚊𝚜 𝚍𝚎 𝚆𝚑𝚊𝚝𝚜𝙰𝚙𝚙 𝚎𝚜𝚎 𝚝𝚒𝚙𝚘 𝚍𝚎 𝚖𝚊𝚝𝚎𝚛𝚒𝚊𝚕 𝚎𝚜𝚝𝚊𝚗 𝚙𝚛𝚘𝚑𝚒𝚋𝚒𝚍𝚘𝚜, 𝙿𝚘𝚛 𝚛𝚊𝚣𝚘𝚗𝚎𝚜 𝚍𝚎 𝚜𝚎𝚐𝚞𝚛𝚒𝚍𝚊𝚍 𝚝𝚞 𝚗𝚞𝚖𝚎𝚛𝚘 𝚜𝚎𝚛𝚊 𝚊𝚐𝚎𝚗𝚍𝚊𝚍𝚘 𝚎𝚗 𝚕𝚊 *Database*`,
                    'mentions': [sender]
                }, {
                    'quoted': {
                        'key': {
                            'fromMe': false,
                            'participant': '0@s.whatsapp.net',
                            'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
                        },
                        'message': {
                            'orderMessage': {
                                'itemCount': 2022,
                                'status': 200,
                                'thumbnail': BotDB.getImageJpg('rgdata'),
                                'surface': 200,
                                'message': `Usuario: ` + pushname + '\x0aNumero: ' + AtSenderNUMBER,
                                'orderTitle': 'Matt_M',
                                'sellerJid': '0@s.whatsapp.net'
                            }
                        },
                        'contextInfo': {
                            'forwardingScore': 999,
                            'isForwarded': true
                        },
                        'sendEphemeral': true
                    }
                });
                this._super._user.limitInc = 1;
            }
            // ===========  AUDIO  SFX  =============================
            const createAudioMsgObj = (myAudio, fileName, name = null) => {
                const nameOnly = name ? name : fileName.split('.').slice(0, -1).join('.');
                const myAydioMsg = {
                    'audio': myAudio,
                    'contextInfo': {
                        'externalAdReply': {
                            'title': `${nameOnly} >~<`,
                            'body': `Bodão_Corp`,
                            'sourceUrl': BodaoBotURL,
                            'thumbnail': sendThumb
                        }
                    },
                    'fileName': `${fileName}`,
                    'mimetype': 'audio/mpeg',
                    'ptt': true
                };
                return myAydioMsg;
            };
            const getSoundFile = (filename, name = null) => __awaiter(this, void 0, void 0, function* () {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var mAudio = BotDB.getAudioUwu(filename);
                this._super._client.sendMessage(from, createAudioMsgObj(mAudio, filename, name), {
                    'quoted': msgQuote
                });
                this._super._user.limitInc = 1;
            });
            const getSoundFileXD = (filename, name = null) => __awaiter(this, void 0, void 0, function* () {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var mAudio = BotDB.getAudioXd(filename);
                this._super._client.sendMessage(from, createAudioMsgObj(mAudio, filename, name), {
                    'quoted': msgQuote
                });
                this._super._user.limitInc = 1;
            });
            if (messageCL.includes(`kawai`)) {
                getSoundFile('Kwaii.m4a');
            }
            if (messageCL.includes(`baka`)) {
                getSoundFile('baka.mp3');
            }
            if (messageCL.includes(`onich`)) {
                getSoundFile('onich.mp3', 'Oni-Chan');
            }
            if (messageCL.includes('yutki')) {
                getSoundFile('yutki.m4a', 'Yutki');
            }
            if (messageCL.includes(`yokese`)) {
                getSoundFile('yokese.m4a', 'Yokese');
            }
            if (messageCL.includes('yajaro')) {
                getSoundFile('yajaro.m4a', 'Yajaro!');
            }
            if (messageCL.includes(`woau`)) {
                getSoundFile('woau.m4a');
            }
            if (messageCL.includes(`unga`)) {
                getSoundFile('unga.m4a', 'Ungaaa');
            }
            if (messageCL.includes(`umai`)) {
                getSoundFile('umai.m4a', 'Umai...');
            }
            if (messageCL.includes(`imaaa`)) {
                getSoundFile('uma.m4a', 'Imaaa!');
            }
            if (messageCL.includes(`uchinchi`)) {
                getSoundFile('uchinchi.m4a', 'Uchinchi');
            }
            if (messageCL.includes(`tuturu`)) {
                getSoundFile('tuturu.m4a', 'Tuturu');
            }
            if (messageCL.includes(`talcho`)) {
                getSoundFile('talcho.m4a', 'Talcho');
            }
            if (messageCL.includes(`ssss`)) {
                getSoundFile('sss.m4a', 'Suprise!!!');
            }
            if (messageCL.includes(`ohayou`) || (messageCL.includes('Ohayou') || (messageCL.includes('ohayo') || messageCL.includes(`Ohayo`)))) {
                getSoundFile('ohayo.m4a', 'Ohayo');
            }
            if (messageCL.includes('sempai')) {
                getSoundFile('sempai.m4a', 'Sempai');
            }
            if (messageCL.includes(`pupu`)) {
                getSoundFile('pupu.m4a', 'Pupu');
            }
            if (messageCL.includes('pikachu')) {
                getSoundFile('pikachu.m4a', 'Pikachu ⚡');
            }
            if (messageCL.includes('ooaa')) {
                getSoundFile('ooaa.m4a', 'Ooaa');
            }
            if (messageCL.includes('omg')) {
                getSoundFile('omg.m4a', 'OMG');
            }
            if (messageCL.includes(`omaiwa`)) {
                getSoundFile('omaiwa.m4a', 'Omaiwa');
            }
            if (messageCL.includes(`omaiga`)) {
                getSoundFile('omaiga.m4a', 'Omaiga');
            }
            if (messageCL.includes(`ñañañi`)) {
                getSoundFile('ñañañi.m4a', 'Ñañañi');
            }
            if (messageCL.includes(`ñaña`)) {
                getSoundFile('ñaña.m4a', 'Ñaña');
            }
            if (messageCL.includes(`nya`)) {
                getSoundFile('nya.m4a', 'Nya');
            }
            if (messageCL.includes(`niconico`)) {
                getSoundFile('niconico.m4a', 'Nico-nico');
            }
            if (messageCL.includes('nani')) {
                getSoundFile('nani.m4a', 'Nani');
            }
            if (messageCL.includes('motomoto')) {
                getSoundFile('motomoto.m4a', 'Motomoto');
            }
            if (messageCL.includes('mma')) {
                getSoundFile('mma.m4a', 'Mma...');
            }
            if (messageCL.includes(`mitamita`)) {
                getSoundFile('mitamita.m4a', 'Mita-mita');
            }
            if (messageCL.includes(`kobarashi`)) {
                getSoundFile('kobarashi.m4a', 'Kobarashi');
            }
            if (messageCL.includes('kataka')) {
                getSoundFile('kataka.m4a', 'Kataka');
            }
            if (messageCL.includes(`jai`)) {
                getSoundFile('jai.m4a', 'Jai...');
            }
            if (messageCL.includes(`jentai`)) {
                getSoundFile('hentai.m4a', 'Jentai 7w7');
            }
            if (messageCL.includes('asennn')) {
                getSoundFile('asen.m4a', 'Asennn!');
            }
            if (messageCL.includes(`anana`)) {
                getSoundFile('anana.m4a', 'Anana');
            }
            if (chatsL.includes(`papu papu`)) {
                getSoundFile('papus.m4a');
                getSoundFile('papudance');
            }
            if (chatsL.includes('ª')) {
                getSoundFile('aaa.m4a', 'ª');
            }
            if (chatsL.includes(`ara ara`)) {
                getSoundFile('araara.mp3', 'Ara-ara');
            }
            if (messageCL.includes('kudasai')) {
                getSoundFile('yamete_completo.mp3', 'Yamete kudasai!');
            }
            if (chatsL.includes('yamete')) {
                getSoundFile('yamete.mp3', 'Yamete kudasai!');
            }
            if (chatsL.includes(`buenos dias`) || (chatsL.includes(`Buenos dias`) || (chatsL.includes(`buenos días`) || chatsL.includes(`Buenos días`)))) {
                getSoundFileXD('Bdia.m4a');
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
                this._super._user.limitInc = 1;
            }
            if (chatsL.includes('si 👍')) {
                getSoundFileXD('si_sp.m4a', 'Si 👍');
            }
            if (chatsL.includes(`no returbio`) || chatsL.includes(`No re turbio`)) {
                getSoundFileXD('turrbio.m4a', 'No!, Re-Turbio... ._.');
            }
            if (chatsL.includes(`oh me vengo`)) {
                getSoundFileXD('ohhh_xd.m4a', 'Oh! me vengo... 🥵');
            }
            if (chatsL.includes(`con flores`)) {
                getSoundFileXD('con_flores.m4a', '🥀 Con flores... 🌹');
            }
            if (chatsL.includes(__("don't say that daddy"))) {
                getSoundFileXD('no_papu.m4a', "No papu :'v'");
            }
            if (chatsL.includes(`no chupala`)) {
                getSoundFileXD('no-chupala.m4a', 'No, chupala... 😎');
            }
            if (messageCL.includes(`bodão`) || messageCL.includes(`bodao`)) {
                if (isBanned)
                    return;
                if (!isBotController && this._super._user.isLimited)
                    return;
                var theAudio = BotDB.getStickerWebP('thunderGoats');
                this._super._client.sendMessage(from, {
                    'sticker': theAudio,
                    'mentions': [sender]
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
                                'caption': 'Bodão Corp:\n10--1849\n07-01-1943',
                                'jpegThumbnail': BotDB._imgBotGod
                            }
                        }
                    }
                });
                this._super._user.limitInc = 1;
            }
        });
    }
}
//# sourceMappingURL=notCommand.js.map
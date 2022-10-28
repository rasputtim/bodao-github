var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { generateWAMessageFromContent, prepareWAMessageMedia } from '@adiwajshing/baileys';
import proto from '@adiwajshing/baileys/WAProto/index.js';
import translate from '@vitalets/google-translate-api';
import chalk from 'chalk';
import { exec } from 'child_process';
import fs, { writeFileSync } from 'fs';
import { createRequire } from "module";
import moment from 'moment';
import toPdf from 'office-to-pdf';
import path from 'path';
import { fileURLToPath } from 'url';
import BotDB from '../basededatos/database.js';
import goatmode from '../basededatos/uwudefender/goatmode.js';
import Bot from '../factory/bot.js';
import LibraryDB from '../factory/library.js';
import Utils from '../factory/libs/functions.js';
import imageMan from '../factory/libs/imageManipulation.js';
import logger from '../factory/logger.js';
import { LocaleService } from '../languajes/localeService.js';
import { commandsArray } from '../messages/commands.js';
import MessageCore from '../messages/message.js';
import { downloadHandlers } from './handlers/downloadHandlers.js';
import NotCommandHandlers from './handlers/notCommand.js';
import { utilHandlers } from './handlers/utilHandlers.js';
const require = createRequire(import.meta.url);
const { Canvas } = require('canvas-constructor/cairo');
//const localeService = container.resolve('localeService');
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const excBold = '*[ ! ]';
const boldSign = '*';
const Waproto = proto.proto;
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
let file = __filename; //require.resolve(__filename);
const numidioma = Bot.numidioma;
let midioma = 'pt';
let MyApiKey = 'nktesla', monospace = '```';
const more = '';
let nwn = more.repeat(850);
////let vote: any = []
////let upvote;
//let devote;
class MessageGod extends MessageCore {
    constructor(client, pMessage, pStore) {
        const asuper = super(client, pMessage, pStore);
        this._super = asuper;
        this.client = client;
        this.pMessage = pMessage;
        this.pStore = pStore;
        this.addCommandHandler(this);
    }
    /**
     * Build Build the teslaGod Object and runs the async stuff
     * @param {*} client
     * @param {*} pMessage
     * @param {*} pStore
     * @returns the MessageGod object
     */
    static build(client, pMessage, pStore) {
        const myObj = new MessageGod(client, pMessage, pStore);
        if (myObj.body && !myObj.isCmd) {
            const myNotComObj = new NotCommandHandlers(myObj);
        }
        else {
            const myUtilHandler = new utilHandlers(myObj);
            const myDownloadHandlers = new downloadHandlers(myObj);
        }
        return MessageCore.doSomeAsyncStuff(myObj)
            .then(function (async_result) {
            const groupdata = async_result;
            return myObj;
        });
    }
    default() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    handler() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sender = this.sender;
                const ownerNumber = Bot.ownerNumber;
                const isBanModeOn = this.isBanModeOn;
                const isOwner = this.isOwner;
                const isFromME = this.isFromME;
                const isCREATOR = ownerNumber.includes(sender);
                const client = this.client;
                const pStore = this.pStore;
                let msg = this.msg;
                //Serialize MessageCore
                let msg_serial = this.msg_serial;
                //const content = this.content
                const from = this.from;
                const type = this.type;
                const _0xec3b62 = type === 'conversation' && msg.message.conversation.startsWith(Bot.prefix) ? msg.message.conversation : type == 'imageMessage' && msg.message[type].caption.startsWith(Bot.prefix) ? msg.message[type].caption : type == 'videoMessage' && msg.message[type].caption.startsWith(Bot.prefix) ? msg.message[type].caption : (type == 'extendedTextMessage') && msg.message[type].text.startsWith(Bot.prefix) ? msg.message[type].text : type == 'buttonsResponseMessage' ? msg.message.buttonsResponseMessage['selectedButtonId'] : type == 'listResponseMessage' ? msg.message.listResponseMessage.singleSelectReply['selectedRowId'] : type == 'templateButtonReplyMessage' ? msg.message.templateButtonReplyMessage.selectedId : type === 'messageContextInfo' ? msg.message.buttonsResponseMessage.selectedButtonId : '';
                const body = this.body;
                const chats = this.chats;
                const dateFormat = BotDB.dateFormat;
                const time = BotDB.time;
                const now = BotDB.now;
                const messageC = this.messageC;
                const command = this.command;
                const commandWithPrefix = this.commandWithPrefix;
                const isCmd = this.isCmd;
                const args = this.args;
                //const _0x117b04 = body.split(' ');
                const argsLC = args.map(a => a.toLowerCase());
                const conversation = this.conversation;
                const q = this.q;
                const quoted = this.quoted;
                const jids = this.jids;
                const mime = this.mime;
                const isMedia = this.isMedia;
                const isGroupMsg = this.isGroupMsg;
                const AtSenderNUMBER = this.AtSenderNUMBER;
                const senderNUMBER = this.senderNUMBER;
                const cglobal = this.cglobal;
                const _atBotNumber = this._atBotNumber;
                const botControllers = this.botControllers;
                const isBotController = this.isBotController;
                const pushname = this.pushname;
                const groupMetadata = this.groupMetadata; //120363025246779605@g.us
                const groupId = this.groupId;
                const groupOwner = this.groupOwner;
                const groupDesc = this.groupDesc;
                const groupName = this.groupName;
                const groupMembers = this.groupMembers;
                const groupAdmins = this.groupAdmins;
                const isBotAdmin = this.isBotAdmin;
                const isAdmin = this.isAdmin;
                const isLevelinModeOn = this.isLevelinModeOn;
                const isAntiLinkModeOn = this.isAntiLinkModeOn;
                const isAntiLinkGroupModeOn = this.isAntiLinkGroupModeOn;
                const isWelcomeModeOn = this.isWelcomeModeOn;
                const isAntiVirtexModeOn = this.isAntiVirtexModeOn;
                const isAntiFloodModeOn = this.isAntiFloodModeOn;
                const isAntifakes1 = this.isAntifakes1;
                const isAntifakes2 = this.isAntifakes2;
                const isForeignModeOn = this.isForeignModeOn;
                const isAnimeModeOn = this.isAnimeModeOn;
                const isFunModeOn = this.isFunModeOn;
                const isNSFWModeOn = this.isNSFWModeOn;
                const isSIMIModeOn = this.isSIMIModeOn;
                const isREGISTERED = this.isREGISTERED;
                const isBanned = this.isBanned;
                const isAFK = this.isAFK;
                const NameBot = Bot.NameBot;
                const total_hits = BotDB.totalCMD[0]['totalcmd'];
                const handlers = {
                    runNeoQR: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isOwner && !isFromME && !isCREATOR)
                            return this.mySendMessage(BotDB.idiomas.SoloCreador());
                        exec(`bash neoqr.sh`, (_0x822b, _0x56bf2e) => {
                            if (_0x822b)
                                return this.mySendMessage(_0x822b);
                            if (_0x56bf2e)
                                this.showMessageOK(`La sesión actual del bot fue eliminada correctamente, ahora podras generar un nuevo código QR para escanear ✓`);
                        });
                    }),
                    runLanguage: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isOwner && !isFromME && !isCREATOR)
                            return this.mySendMessage(BotDB.idiomas['SoloCreador']());
                        if (args[0] == 'id') {
                            BotDB.idiomas = 'id';
                            BotDB.lenguatext = `bahasa Indo`;
                            this.sendMentionedMessage(BotDB.idiomas.BotIdiomChanged(BotDB.lenguatext));
                        }
                        else {
                            if (args[0] == 'en') {
                                BotDB.idiomas = 'en';
                                BotDB.lenguatext = `English Language`;
                                this.sendMentionedMessage(BotDB.idiomas.BotIdiomChanged(BotDB.lenguatext));
                            }
                            else {
                                if (args[0] == 'es') {
                                    BotDB.idiomas = 'es';
                                    BotDB.lenguatext = 'Lenguaje Español';
                                    this.sendMentionedMessage(BotDB.idiomas.BotIdiomChanged(BotDB.lenguatext));
                                }
                                else if (args[0] == 'pt') {
                                    let idiomas = 'pt';
                                    let midioma = 'pt';
                                    let lenguatext = `Idioma Português`;
                                    this.sendMentionedMessage(BotDB.idiomas.BotIdiomChanged(BotDB.lenguatext));
                                }
                                else {
                                    const protones = [{
                                            'buttonId': Bot.prefix + `comandos`,
                                            'buttonText': {
                                                'displayText': `[ MENU 📖 ]`
                                            },
                                            'type': 0x1
                                        }];
                                    let message = {
                                        'caption': monospace + `[Lenguaje|Language|bahasa|Língua] :` + monospace + `

🇵🇪
*┣⊱ Lenguaje disponible español ☰*
*┣━⊱* _¿Como activar?, Ejemplo:_
*┗━━⊱* ` + (Bot.prefix + command) + ` es
🇺🇸
*┣⊱ English language available ☰*
*┣━⊱* _How to activate?, Example:_
*┗━━⊱* ` + (Bot.prefix + command) + ` en
🇮🇩
*┣⊱ Tersedia bahasa Indonesia ☰*
*┣━⊱* _Bagaimana cara mengaktifkannya?, Contoh:_
*┗━━⊱* ` + (Bot.prefix + command) + ' id\n🇧🇷\n*┣⊱ Língua portuguesa disponível ☰*\n*┣━⊱* _Como ativar?, Exemplo:_\n*┗━━⊱* ' + (Bot.prefix + command) + ` pt
`,
                                        'footer': monospace + `[NOTA] : Esto no afecta a los comandos del bot
[NOTE] : This does not affect the bot commands
[CATATAN] : Ini tidak mempengaruhi perintah bot
[NOTA] : Isso não afeta os comandos do bot` + monospace + nl,
                                        'location': {
                                            'jpegThumbnail': BotDB.getImageJpg('MultiHD')
                                        },
                                        'buttons': protones,
                                        'headerType': 'LOCATION',
                                        'mentions': [this._sender]
                                    };
                                    client.sendMessage(from, message);
                                }
                                ;
                            }
                        }
                        this.addSPAMFilter(from);
                    }),
                    runReiniciarlimite: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!isOwner && !isFromME && !isCREATOR)
                            return;
                        const objetlimit = [];
                        yield fs.writeFileSync(path.resolve(__dirname, './src/basededatos/Usersgod/limit.json'), JSON.stringify(objetlimit));
                        yield this.sendMentionedMessage(`Se reiniciaron los limites con exito ✓
Para ver los cambios es necesario re-iniciar el bot!`);
                    }),
                    runAImg: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isGroupMsg)
                            return this.mySendMessage(BotDB.idiomas.SoloGp());
                        if (!quoted)
                            return this.mySendMessage('Envie ó Responda un sticker con el comando ' + (Bot.prefix + command));
                        if (!this.isWebP)
                            return this.mySendMessage('Envie ó Responda un sticker con el comando ' + (Bot.prefix + command));
                        this.showWaitMessage2('_Wait ' + pushname + `, processing your request.._`);
                        let media = yield client.downloadAndSaveMediaMessage(quoted);
                        try {
                            let _0x4e122c = yield LibraryDB.ScrapMini.webp2mp4File(media);
                            var ramdomSoundFile = yield Utils.getRandom(`.png`);
                            exec(`ffmpeg -i ` + media + ' ' + ramdomSoundFile, _0x852a26 => {
                                fs.unlinkSync(media);
                                if (_0x852a26)
                                    return client.sendMessage(from, {
                                        'video': {
                                            'url': _0x4e122c.result,
                                            'caption': `Sticker ` + command
                                        }
                                    }, {
                                        'quoted': this.msgQuote
                                    });
                                const buffer = fs.readFileSync(ramdomSoundFile);
                                client.sendMessage(from, {
                                    'image': buffer,
                                    'jpegThumbnail': BotDB.mythumb
                                }, {
                                    'quoted': this.msgQuote
                                }), fs.unlinkSync(ramdomSoundFile);
                            });
                        }
                        catch (err) {
                            var ramdomSoundFile = yield Utils.getRandom('.png');
                            exec('ffmpeg -i ' + media + ' ' + ramdomSoundFile, _0x182536 => {
                                fs.unlinkSync(media);
                                if (_0x182536)
                                    return this.mySendMessage(BotDB.idiomas.Erreply());
                                const buffer = fs.readFileSync(ramdomSoundFile);
                                client.sendMessage(from, {
                                    'image': buffer,
                                    'jpegThumbnail': BotDB.mythumb
                                }, {
                                    'quoted': this.msgQuote
                                });
                                fs.unlinkSync(ramdomSoundFile);
                            });
                        }
                        this.setUserConstraints();
                    }),
                    runDeathNote: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isGroupMsg)
                            return this.mySendMessage(BotDB.idiomas.SoloGp());
                        if (!isBotAdmin)
                            return this.mySendMessage(BotDB.idiomas.AdminBot());
                        if (!isAdmin && !isFromME)
                            return this.mySendMessage(BotDB.idiomas.SoloAdm());
                        if (!q)
                            return this.mySendMessage(boldSign + exc + __(' Add a reason for execution'));
                        if (q.length < 6)
                            return this.mySendMessage(boldSign + exc + __(' The reason is very short*'));
                        var _0x5c95b4 = yield client.groupMetadata(from);
                        var _0x1d30e8 = _0x5c95b4.participants;
                        var _0xacd6dd = [];
                        _0x1d30e8.map((_0x2f7cd1) => __awaiter(this, void 0, void 0, function* () {
                            _0xacd6dd.push(_0x2f7cd1.id.replace(`c.us`, `s.whatsapp.net`));
                        }));
                        var _0x3a52c9 = this.selectRamdomFromArray(_0xacd6dd);
                        client.sendMessage(from, {
                            'text': `*[ Death Note ]* 📓

┏━⊱ *Seleccinado:* @` + _0x3a52c9.split('@')[0] + `
┗⊱ *Reason for his execution:* 
_` + q + '_',
                            'mentions': [_0x3a52c9]
                        }, {
                            'ephemeralExpiration': "0x18*0xe10",
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
                                        'caption': `⚰️@` + _0x3a52c9.split('@')[0] + ' 💀',
                                        'jpegThumbnail': BotDB.images.pressF
                                    }
                                }
                            }
                        });
                        setTimeout(() => {
                            client.groupParticipantsUpdate(from, [_0x3a52c9], 'remove')
                                .catch(err => {
                                logger.error(err);
                                this.mySendMessage(BotDB.idiomas.Erreply());
                            });
                            client.sendMessage(from, {
                                'text': 'Press [F]',
                                'mentions': [this._sender]
                            }, {
                                'ephemeralExpiration': "0x18*0xe10",
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
                                            'caption': 'C come una manzana* 🍎',
                                            'jpegThumbnail': this.globalThumb
                                        }
                                    }
                                }
                            });
                        }, 3500);
                        this.setUserConstraints();
                    }),
                    runC1: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isFromME) {
                            const myMsg = {
                                'text': AtSenderNUMBER + ` Este comando se usa desde el numero del bot`,
                                'mentions': [this._sender]
                            };
                            const myOptions = {
                                'ephemeralExpiration': "0x18*0xe10",
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
                                            'caption': pushname + ' ' + __('Use it at your own risk') + '!!!',
                                            'jpegThumbnail': BotDB.images.exclamation
                                        }
                                    }
                                }
                            };
                            return client.sendMessage(from, myMsg, myOptions);
                        }
                        if (!isGroupMsg)
                            return this.mySendMessage(BotDB.idiomas.SoloGp());
                        if (isBotAdmin) {
                            const myAdminMsg = {
                                'text': pushname + ` Why do you want to affect your group if you are an administrator T~T`
                            };
                            const myAdminOptions = {
                                'quoted': {
                                    'key': Object.assign({ 'fromMe': false, 'participant': '0@s.whatsapp.net' }, from ? {
                                        'remoteJid': `${Bot.CREATOR_NUMBER}@s.whatsapp.net`
                                    } : {}),
                                    'message': {
                                        'orderMessage': {
                                            'orderId': `5219984907794`,
                                            'itemCount': 69,
                                            'status': 'INQUIRY',
                                            'surface': `CATALOG`,
                                            'message': '' + (q ? q : goatmode),
                                            'orderTitle': '' + (q ? q : goatmode),
                                            'sellerJid': `${Bot.CREATOR_NUMBER}@s.whatsapp.net`
                                        }
                                    }
                                }
                            };
                            return client.sendMessage(from, myAdminMsg, myAdminOptions);
                        }
                        const myAnyMediaMessageContent = {
                            'image': BotDB.images.logo /*,
                            'jpegThumbnail': this.picThumb*/
                        };
                        const myMediaGenerationOptions = {
                            'upload': client.waUploadToServer
                        };
                        //message: AnyMediaMessageContent, options: MediaGenerationOptions
                        let myPreparedMediaMSG = yield prepareWAMessageMedia(myAnyMediaMessageContent, myMediaGenerationOptions);
                        const myWAMessageContent = Waproto.Message.fromObject({
                            'productMessage': {
                                'product': {
                                    'productImage': myPreparedMediaMSG.imageMessage,
                                    'productId': `4458590017530875`,
                                    'title': '' + goatmode,
                                    'currencyCode': `PEN`,
                                    'priceAmount1000': `-699`,
                                    'productImageCount': 0x1
                                },
                                'businessOwnerJid': `${Bot.CREATOR_NUMBER}@s.whatsapp.net`
                            }
                        });
                        const myMessageGenerationOptionsFromContent = {
                            'userJid': from,
                            'quoted': msg
                        };
                        //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
                        let myMedia = generateWAMessageFromContent(from, myWAMessageContent, myMessageGenerationOptionsFromContent);
                        let _0x212f4c = [{
                                'title': groupName + (nl + goatmode),
                                'rows': [{
                                        'title': groupMembers.length,
                                        'rowId': Bot.prefix + 'c1',
                                        'description': '' + goatmode
                                    }]
                            }];
                        let _0x5c79f0 = Waproto.Message.fromObject({
                            'listMessage': Waproto.ListMessage.fromObject({
                                'title': '' + goatmode,
                                'buttonText': 'Click Aqui_ [ ! ]',
                                'description': 'Maria a 5 km...',
                                'listType': 1,
                                'sections': _0x212f4c
                            })
                        });
                        let _0x47f3b0 = [{
                                'buttonId': Bot.prefix + 'c1',
                                'buttonText': {
                                    'displayText': '' + (q ? q : goatmode)
                                },
                                'type': 0x1
                            }, {
                                'buttonId': Bot.prefix + 'c1',
                                'buttonText': {
                                    'displayText': '' + goatmode
                                },
                                'type': 0x1
                            }, {
                                'buttonId': Bot.prefix + 'c1',
                                'buttonText': {
                                    'displayText': '' + goatmode
                                },
                                'type': 0x1
                            }];
                        yield client.relayMessage(from, _0x5c79f0, {
                            'messageId': this.id
                        });
                        yield client.sendMessage(from, {
                            'caption': '' + goatmode,
                            'footer': groupName + nl + goatmode,
                            'location': {
                                'jpegThumbnail': BotDB.mythumb
                            },
                            'buttons': _0x47f3b0,
                            'headerType': 'LOCATION',
                            'mentions': groupMembers.map(_0x435fcc => _0x435fcc.id)
                        });
                        yield client.relayMessage(from, myMedia.message, {
                            'messageId': myMedia.key.id
                        });
                        setTimeout(() => {
                            client.groupLeave(from).catch(err => {
                                logger.error(err);
                            });
                        }, 5000);
                        this._user.addXp(this.from, 450);
                        this._user.addLevel(this.from, 1);
                    }),
                    runMenuAnime: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isGroupMsg)
                            return this.mySendMessage(BotDB.idiomas.SoloGp());
                        if (!isAnimeModeOn)
                            return this.mySendMessage(boldSign + exc + __(' El modo anime esta apagado'));
                        if (!isREGISTERED && !isFromME)
                            return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
                        this.showimageMessageWithCommand(BotDB._imgMyAnime, BotDB.idiomas['AniMenu'](Bot.prefix, monospace));
                        this.addSPAMFilter(from);
                        this.setUserConstraints();
                    }),
                    showArtmenu: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isGroupMsg)
                            return this.mySendMessage(BotDB.idiomas.SoloGp());
                        if (!isFunModeOn)
                            return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
                        if (!isREGISTERED && !isFromME)
                            return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
                        this.showimageMessageWithCommand(BotDB.images.crearHD, BotDB.idiomas['MenuArte'](Bot.prefix, monospace));
                        this.setUserConstraints();
                    }),
                    runLabiblia: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        if (!isGroupMsg)
                            return this.mySendMessage(BotDB.idiomas.SoloGp());
                        if (!isNSFWModeOn)
                            return this.sendMentionedMessage(__(`H mode is off`));
                        if (!isREGISTERED && !isFromME)
                            return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
                        this.showimageMessageWithCommand(BotDB.getImageJpg('nsfw'), BotDB.idiomas['MenuH'](Bot.prefix, monospace));
                        this.setUserConstraints();
                    }),
                    runSerbot: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (isBanned)
                            return;
                        if (!this.isBotController && this._user.isLimited)
                            return;
                        this.sendMentionedMessage(__(`*This command still doesn't work in the MultiDevice bot!*`)
                            + nl + `~` + __(`Library`) + `: Baileys-MD~`);
                        this.setUserConstraints();
                    }),
                    doing: () => {
                        //const author = msg.author || msg.from
                        //const name = contact.name || contact.verifiedName || contact.pushname || 'Oculto pelo user'
                        /*const pfpk = await resolveImage(
                            await getBase64(
                                await client.getProfilePicUrl(author) || 'https://i.ibb.co/5Fkyq2J/semfoto.jpg'
                            )
                        )*/
                        //const requiredXp = 50 * (Math.pow(2, level) - 1)
                        //let sts = (await contact.getAbout())
                        //let mrzl1 = (`${sts ? sts.slice(0,30) : 'Biografia oculta pelo usuário'}`.toUpperCase())
                        //let mrzl2 = (`${sts ? sts.slice(30).length > 30 ? sts.slice(33)+'...' : sts.slice(30) : ''}`)
                        const gradient = new Canvas(1024, 80).createLinearGradient(0, 0, 1024, 80, [
                            {
                                position: 0,
                                color: "#FF0000",
                            },
                            {
                                position: 0.5,
                                color: "#BF00FF"
                            },
                            {
                                position: 1,
                                color: "#0000FF"
                            }
                        ]);
                        const canvas = new Canvas(1000, 500)
                            .createRoundedClip(0, 0, 1000, 600, 30) //(x: number, y: number, width: number, height: number, radius: number | BeveledRadiusOptions): Canvas
                            .setColor('#202428')
                            .fill()
                            //.printImage(await resolveImage(Buffer.from(fs.readFileSync('./media/images/azul-claro28.jpg'),'base64')), 0, 0, 1024, 640)
                            .setColor(gradient)
                            .printRectangle(0, 310, 1020, 3)
                            .setColor('#0061bc')
                            .createRoundedClip(250, 290, 500, 40, 30)
                            .printRectangle(250, 290, 500, 40)
                            .setTextFont('45px Code Bold')
                            .setTextBaseline('top')
                            .setColor('white')
                            .printRectangle(884, 20, 40, 40)
                            .printRectangle(0, 500, 1024, 150)
                            .setColor('white')
                            .printText('LYLIA BOT MENU'.split('').join(' '), 40, 18)
                            .setStroke('white')
                            .setStrokeWidth(15)
                            .setGlobalAlpha(.3)
                            .printStrokeRectangle(40, 108, 256, 256)
                            .setGlobalAlpha(1)
                            .setColor('black')
                            .setTextFont('500 45px Sans')
                            .setTextAlign('center')
                            .printText(('Bodão Bot' + '\n' + "powered by RL"), 512, 530)
                            .setStroke('black')
                            .setStrokeWidth(10)
                            .printStrokeRectangle(-20, -20, 1064, 100)
                            .printStrokeRectangle(-20, 500, 1064, 200)
                            /*.printImage(bc, 984, 114, 40, 350)
                            .printImage(dm, 886, 22, 36, 36)
                            .printImage(pfpk, 40, 108, 256, 256)*/
                            .setTextFont('600 29px Sans')
                            .setTextAlign('start')
                            .printText(`Nome: bodão powered by rafael
              \nUser ID: uoyotorytriytouuy
              \nPlataforma: AAAAAAAAAAAAAAAAAAAAAAAAAAA
              \nNúmero: +555555555555555555`, 326, 108)
                            .printText(`RANK: 7\n
      LEVEL: 200\n
      XP 100/300`, 764, 108);
                        //#endregion
                        /*
                            (message.guild.member(user) && message.guild.member(user).premiumSince)
                            ? message.guild.member(user).premiumSince
                            ? canvas.printText(`\n\n\n\n\n\n\n\nBoost: ${moment(message.guild.member(user).premiumSince).format('DD/MM/YYYY')}`, 326, 108)
                            : false
                            : false
                        */
                        //var text = fs.readFileSync(filename, "utf-8");
                        /*for (let n = 0; n < badges.length; n++) {
                            let bad = await resolveImage(flags[badges[n]])
                            canvas.printImage(bad, 40 + (96 * n), 400, bad.width / 2, bad.height / 2)
                            }
                        */
                        const canva2 = canvas.toBuffer(); //.toString('base64')
                        const options = { gif: true, caption: "hello!" }; // some metadata & caption
                        const myOption = {
                            'ephemeralExpiration': "0x18*0xe10",
                            'quoted': this.msg
                        };
                        this._client.sendMessage(this._from, {
                            'image': canva2,
                            'jpegThumbnail': '',
                            'caption': 'caption',
                            'mentions': [this._sender]
                        }, myOption).catch(err => {
                            (logger.error(err), this.mySendMessage(BotDB.idiomas.Erreply()));
                        });
                        //this.showimageMessageWithCommand(canva2,'hello')
                    },
                    runDoctopdf: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this.isQuotedDoc)
                            return this.reply(`Convert doc/docx/ppt/pptx to pdf.\n\nSend the document then reply to the document/file with ${Bot.prefix}pdf`);
                        if (/\.docx|\.doc|\.pptx|\.ppt/g.test(this.quotedMsg.filename) && this.isQuotedDoc) {
                            this.sendText(msg.wait());
                            const encDocs = yield this._client.decryptMedia(this.quotedMsg);
                            toPdf(encDocs).then((pdfBuffer) => {
                                writeFileSync("./src/assets/media/result.pdf", pdfBuffer);
                                this.sendFile("./src/assets/media/result.pdf", this.quotedMsg.filename.replace(/\.docx|\.doc|\.pptx|\.ppt/g, '.pdf'), '');
                            }, (err) => { this.printError(err); });
                        }
                        else {
                            this.reply("Sorry the file format doesn't match");
                        }
                    }),
                    runTranslate: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this.isREGISTERED)
                            return yield this.reply(msg.notRegistered());
                        //if (this.isLimit()) return await this.reply(msg.limit())
                        //this.addLimit()
                        if (this.quotedMsg) {
                            const textos = this.quotedMsg.body;
                            const languagets = this.args[0];
                            translate(textos, { to: languagets }).then(ress => { this.reply(ress.text); });
                        }
                        else {
                            const texto = this.q.substring(0, this.q.indexOf('|') - 1);
                            const languaget = this.q.substring(this.q.lastIndexOf('|') + 2);
                            translate(texto, { to: languaget }).then(res => { this.reply(res.text); });
                        }
                    }),
                    runOcr: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this.isMedia && !this.isQuotedImage)
                            return this.reply(`Scan the text from the image. Reply pictures or send pictures with  caption ${Bot.prefix}ocr`);
                        try {
                            this.sendText(msg.wait());
                            let enc = this.isQuotedImage ? this.quotedMsg : this.message;
                            let mediaData = yield this._client.decryptMedia(enc);
                            let _url = yield Utils.uploadImages(mediaData, 'tmp_', false);
                            let resu = yield LibraryDB.api.ocr(_url).catch(this.printError);
                            this.reply(resu);
                        }
                        catch (err) {
                            this.printError(err);
                        }
                        /**
                         * if (!BotDB.isRegistered) return await this.reply(msg.notRegistered())
                                if (isMedia && isImage || isQuotedImage || isQuotedSticker) {
                                    await this.reply(msg.wait())
                                    const encryptMedia = isQuotedImage || isQuotedSticker ? this.quotedMsg : message
                                    const mediaData = await this._client.decryptMedia(encryptMedia, uaOverride)
                                    fs.writeFileSync(`./temp/${sender.id}.jpg`, mediaData)
                                    ocrtess.recognize(`./temp/${sender.id}.jpg`, ocrconf)
                                        .then(async (text) => {
                                            await this.reply( `*...:* *OCR RESULT* *:...*\n\n${text}`)
                                            fs.unlinkSync(`./temp/${sender.id}.jpg`)
                                        })
                                        .catch(async (err) => {
                                            console.error(err)
                                            await this.reply( msg.error.error())
                                        })
                                } else {
                                    await this.reply(msg.wrongFormat())
                                }
                         */
                    }),
                    runQrcode: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this.hasNoArg())
                            return this.reply(`Para gerar um código QR, type  ${Bot.prefix}qrcode <kata>\nExample:  ${Bot.prefix}qrcode nama saya BodaoBot`);
                        this.reply(msg.wait());
                        yield this.sendFFU(`http://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(this.arg)}&size=500x500`, '', '');
                    }),
                    runTinyUrl: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this.hasNoArg())
                            return this.reply(`type  ${Bot.prefix}shortlink <url>`);
                        if (!this.isURL(this.args[0]))
                            return this.reply('Desculpe, a URL que você enviou é inválida. Certifique-se de usar o formato http/https');
                        const shorted = yield Utils.urlShortener(this.args[0]);
                        yield this.sendText(shorted).catch(e => { return this.printError(e); });
                    }),
                    runMemefy: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        if ((this.isMedia || this.isQuotedImage || this.isQuotedSticker) && this.args.length >= 1) {
                            try {
                                if ((_a = this.quotedMsg) === null || _a === void 0 ? void 0 : _a.isAnimated)
                                    return this.reply(`Error! It does not support animated stickers.`);
                                this.reply(msg.wait());
                                let top = '', bottom = '';
                                if (!/\|/g.test(this.arg)) {
                                    bottom = this.arg;
                                }
                                else {
                                    top = this.arg.split('|')[0];
                                    bottom = this.arg.split('|')[1];
                                }
                                let encryptMedia = (this.isQuotedImage || this.isQuotedSticker) ? this.quotedMsg : this.message;
                                let mediaData = yield this._client.decryptMedia(encryptMedia);
                                if (this.isQuotedSticker)
                                    mediaData = yield imageMan.webpToPng(mediaData);
                                let imgUrl = yield Utils.uploadImages(mediaData, 'tmp_', false);
                                let sUrl = LibraryDB.api.memegen(imgUrl, top, bottom);
                                if (!this.isQuotedSticker)
                                    this.sendFFU(sUrl, 'image.png', 'Here you\'re').catch(e => { return this.printError(e); });
                                else
                                    yield this.client.sendStickerfromUrl(this.from, sUrl, null, this.stickerMetadata)
                                        .then(() => {
                                        this.sendText(msg.success.sticker);
                                        const elapsed = Utils.processTime(this.t, moment().toDate());
                                        logger.info(`${msg.sticker.process}${elapsed} ${msg.second(elapsed)}`);
                                    }).catch(e => this.printError(e, false));
                            }
                            catch (err) {
                                this.printError(err);
                            }
                        }
                        else {
                            yield this.reply(`Sem imagem/formato errado! Favor enviar foto com legenda  ${Bot.prefix}memefy <teks_atas> | <teks_bawah>\n` +
                                `Example: ${Bot.prefix}memefy esse texto no topo | este é o texto inferior`);
                        }
                        /**
                        *  case 'ttg':
                                      if (!BotDB.isRegistered(senderID)) return await this.reply(msg.notRegistered())
                                      if (!this.q) return await this.reply(msg.wrongFormat())
                                      if (limit.isLimit(sender.id, BotDB.limit, BotDB.limitCount, BotDB.isPremium(senderID), BotDB.isOwnerBot(senderID))) return await this.reply( msg.limit())
                                      this.addLimit()
                                      await this.reply(msg.wait())
                                      // eslint-disable-next-line no-case-declarations
                                      let sUrl = api.vhtearlink(this.q)
                                      //Sends a sticker from a given URL
                                      await this.client.sendStickerfromUrl(from, sUrl, null, { author: BotDB.authorWm, pack: packWm })
                                          .then(() => logger.info('Success creating GIF!'))
                                          .catch(async (err) => {
                                              console.error(err)
                                              await this.reply( msg.error.error())
                                          })
                                          break;
                        */
                        /**
                        *  if (!BotDB.isRegistered) return await this.reply(msg.notRegistered())
                                      if (!this.q) return await this.reply(msg.wrongFormat())
                                      if (this.isLimit()) return await this.reply(msg.limit())
                                      this.addLimit()
                                      await this.reply(msg.wait())
                                      await this.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${this.q}&apikey=${config.vhtear}`, null, { author: authorWm, pack: packWm })
                                          .then(() => logger.info('Success creating GIF!'))
                                          .catch(async (err) => {
                                              console.error(err)
                                              await this.reply( msg.error.error())
                                          })
                        */
                    }),
                    runFlip: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this.isMedia && this.numberOfArgs(0) && !this.isQuotedImage)
                            return this.reply(`Flip the image vertically or horizontally. Upload a photo with caption :\n` +
                                `${Bot.prefix}virar h -> to flip horizontally \n` +
                                `${Bot.prefix}virar v -> to flip vertically`);
                        const _enc = this.isQuotedImage ? this.quotedMsg : this.message;
                        const _img = yield this._client.decryptMedia(_enc).catch(e => { return this.printError(e); });
                        let image = yield imageMan.readImage(_img);
                        let path = './src/assets/media/virarped.png';
                        if (this.args[0] === 'v')
                            image.flip(false, true).write(path);
                        else if (this.args[0] === 'h')
                            image.flip(true, false).write(path);
                        else
                            return this.reply(`Argumen salah.\n` +
                                `${Bot.prefix}virar h -> to rotate horizontally \n` +
                                `${Bot.prefix}virar v -> to flip vertically`);
                        yield this.sendImage(path, '', '');
                    }),
                    default: () => {
                        //nothing to do
                    }
                };
                const runCommand = () => {
                    commandsArray.forEach(userCommands => {
                        let foundCommand = userCommands.find(userCommands => userCommands.name == command);
                        if (foundCommand) {
                            if (foundCommand.type === 'option' && foundCommand.runable === 'y') {
                                //eval(foundCommand.script)(foundCommand,message)
                                //const myScript :any= foundCommand.script  ? foundCommand.script : ''
                                if (handlers.hasOwnProperty(foundCommand.script)) {
                                    handlers[foundCommand.script](foundCommand);
                                }
                            }
                            else if (foundCommand.type === 'alias' && foundCommand.runable === 'y') {
                                let rootCommand = userCommands.find(userCommands => userCommands.name == (foundCommand === null || foundCommand === void 0 ? void 0 : foundCommand.root));
                                if (rootCommand) {
                                    if (handlers.hasOwnProperty(rootCommand.script)) {
                                        handlers[rootCommand.script](rootCommand);
                                        //eval(foundCommand.script)(foundCommand,message)
                                    }
                                }
                                else {
                                    return this.reply(__('command not found'));
                                }
                            }
                        }
                        else {
                            handlers['default']();
                        }
                    });
                };
                if (isCmd)
                    runCommand();
            }
            catch (err) {
                let error = String(err);
                console.log(nl);
                logger.error(err);
                console.log(nl);
            }
        });
    }
}
;
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.cyan('\n\n' + __filename + ':'));
    delete require.cache[file];
    require(file);
});
export default MessageGod;
//# sourceMappingURL=messageGod.js.map
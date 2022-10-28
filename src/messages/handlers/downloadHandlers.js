var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
//import ffmpeg from 'fluent-ffmpeg'
import ytdl from 'bodao-ytdl-core';
import fs from 'fs-extra';
import lodash from 'lodash';
import moment from 'moment-timezone';
import path from 'path';
import { fileURLToPath } from 'url';
import BotDB from '../../basededatos/database.js';
import FileDB from '../../basededatos/fileDatabase.js';
import canvas from '../../custom_modules/canvas.js';
import Bot from '../../factory/bot.js';
import LibraryDB from '../../factory/library.js';
import api from '../../factory/libs/api.js';
import scraper from '../../factory/libs/bodaoscrapper.js';
import Utils from '../../factory/libs/functions.js';
import { LocaleService } from '../../languajes/localeService.js';
import logger from './../../factory/logger.js';
import { commandsArray } from './../commands.js';
const { existsSync, writeFileSync, readdirSync, readFileSync, writeFile, unlinkSync, createWriteStream } = fs;
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const excBold = '*[ ! ]';
const boldSign = '*';
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
let file = __filename; //require.resolve(__filename);
export class downloadHandlers {
    constructor(_super) {
        this._super = _super;
        this._client = _super._client;
        _super.addCommandHandler(this);
        this.sender = this._super.sender;
        this.ownerNumber = Bot.ownerNumber;
        this.isBanModeOn = this._super.isBanModeOn;
        this.isOwner = this._super.isOwner;
        this.isFromME = this._super.isFromME;
        this.isCREATOR = this._super.isCREATOR;
        this.client = this._super._client;
        this.pStore = this._super._store;
        this.msg = this._super.msg;
        //Serialize MessageCore
        this.msg_serial = this._super.msg_serial;
        //const content = this._super.content
        this.from = this._super.from;
        this.type = this._super.type;
    }
    handler() {
        return __awaiter(this, void 0, void 0, function* () {
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
                    runFacebookd: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        const commandName = commandObj.name;
                        /*let type = ''
                        const aliases1 = findAlias(DownloadCommands,'facebook')
                        if (aliases1 instanceof Array) {
                            aliases1.push('facebook')
                        }
                        const aliases2 = findAlias(DownloadCommands,'twitter')
                        if (aliases2 instanceof Array) {
                            aliases2.push('twitter')
                        }
                        if (aliases1.includes(commandName)) type = 'fb'
                        if (aliases2.includes(commandName)) type = 'tw'
                        //if (aliases typeof == 'object') {}
                        */
                        if (!this._super.isREGISTERED)
                            return yield this._super.reply(BotDB.idiomas.notRegistered);
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(commandObj.description + ` - ` + commandObj.usage);
                        if (!this._super.isURL(this._super.url) && !this._super.url.includes('facebook') && !this._super.url.includes('twitter')) {
                            return yield this._super.reply(BotDB.idiomas.downloading.invalidlink);
                        }
                        if (this._super._user.isLimited)
                            return yield this._super.reply(BotDB.idiomas.limit());
                        let durs = this._super.duration;
                        this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        let res = yield scraper.bodaoScrapper.allinone(this._super.url).catch(n => {
                            return this._super.printError(n);
                        });
                        let _id = this._super.quotedMsg != null ? this._super.msg.id : this._super.id;
                        //let qualities:any = []
                        if (res.medias.length > 0) {
                            let _msg = `${BotDB.idiomas.downloading.waitvideo}\n`;
                            for (let u of res.medias) {
                                //qualities.push(u.quality)
                                _msg += `${BotDB.idiomas.quality}: ${u.quality} : ` + (yield Utils.urlShortener(u.url)) + '\n';
                            }
                            if (res.medias.length > 0) {
                                this._super.mySendMessage(_msg);
                            }
                            let uls;
                            if (commandName === 'facebook')
                                uls = lodash.find(res.medias, { quality: 'sd' }).url || lodash.find(res.medias, { quality: 'hd' }).url;
                            if (commandName === 'twitter')
                                uls = res[1].url || res[0].url;
                            if (uls)
                                this._super.sendFFU(uls, '', '');
                            else
                                this._super.mySendMessage(`${BotDB.idiomas.downloading.privatelink}`);
                        }
                        else {
                            this._super.mySendMessage(`${BotDB.idiomas.errorOcurred}`);
                        }
                    }),
                    runYtmp3d: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.hasNoArg())
                            return this._super.reply(commandObj.description + ` - ` + commandObj.usage);
                        if (this._super.arg.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/) === null)
                            return this._super.reply(BotDB.idiomas.downloading.invalidlink);
                        let durs = this._super.duration;
                        this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        try {
                            let ret = yield LibraryDB.ScrapMini.ytdl(this._super.args[0]);
                            if (ret) {
                                let { name, inf, stream } = ret;
                                if (Number(inf.lengthSeconds) > 900)
                                    return this._super.reply(BotDB.idiomas.downloading.videoduration);
                                let dur = `${('0' + (Number(inf.lengthSeconds) / 60).toFixed(0)).slice(-2)}:${('0' + (Number(inf.lengthSeconds) % 60)).slice(-2)}`;
                                let estimasi = Number(inf.lengthSeconds) / 200;
                                let est = estimasi.toFixed(0);
                                let messag = BotDB.idiomas.ytResult(inf.video_url, inf.title, inf.ownerChannelName, dur, inf.viewCount, inf.uploadDate, est);
                                this._super.sendFFU(`${inf.thumbnails[3].url}`, messag, ``);
                                let path = `./src/assets/media/temp_${this._super.time}.mp3`;
                                /*
                                                    ffmpeg({ source: stream })
                                                        .setFfmpegPath('./bin/ffmpeg')
                                                        .on('error', (err) => {
                                                            //logger.error(err.message)
                                                            this._super.reply(BotDB.idiomas.error.norm)
                                                            if (existsSync(path)) unlinkSync(path)
                                                        })
                                                        .on('end', async () => {
                                                            const elapsed = Utils.processTime(this._super.time, moment().toDate())
                                                            await this._super.sendFile( path, `${name}.mp3`, '')
                                                            //logger.info(`${BotDB.idiomas.audio.process} ${elapsed} ${BotDB.idiomas.second(elapsed)}`)
                                                            if (existsSync(path)) unlinkSync(path)
                                                        })
                                                        .saveToFile(path)
                                                        */
                            }
                        }
                        catch (err) {
                            //logger.error(err)
                            this._super.reply(BotDB.idiomas.error.norm);
                        }
                    }),
                    runytmp4d: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.hasNoArg())
                            return this._super.reply(commandObj.description + ` - ` + commandObj.usage);
                        if (this._super.arg.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/) === null)
                            return this._super.reply(BotDB.idiomas.downloading.invalidlink);
                        let durs = this._super.duration;
                        this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        try {
                            let path = `./src/assets/media/temp_${this._super.time}.mp4`;
                            let ret = yield LibraryDB.ScrapMini.ytdl(this._super.args[0]);
                            if (ret) {
                                let { name, inf, stream } = ret;
                                if (Number(inf.lengthSeconds) > 900)
                                    return this._super.reply(BotDB.idiomas.downloading.videoduration);
                                let dur = `${('0' + (Number(inf.lengthSeconds) / 60).toFixed(0)).slice(-2)}:${('0' + (Number(inf.lengthSeconds) % 60)).slice(-2)}`;
                                let estimasi = Number(inf.lengthSeconds) / 100;
                                let est = estimasi.toFixed(0);
                                let messag = BotDB.idiomas.ytResult(inf.video_url, inf.title, inf.ownerChannelName, dur, inf.viewCount, inf.uploadDate, est);
                                this._super.sendFFU(`${inf.thumbnails[3].url}`, messag, ``);
                                ytdl(name, { quality: 'highest' }).pipe(createWriteStream(path))
                                    .on('error', (err) => {
                                    this._super.printError(err, false);
                                    if (existsSync(path))
                                        unlinkSync(path);
                                })
                                    .on('finish', () => __awaiter(this, void 0, void 0, function* () {
                                    const elapsed = Utils.processTime(this._super.time, moment().toDate());
                                    yield this._super.sendFile(path, `${name}.mp4`, inf.title);
                                    //logger.info(`${BotDB.idiomas.video.process} ${elapsed} ${BotDB.idiomas.second(elapsed)}`)
                                    if (existsSync(path))
                                        unlinkSync(path);
                                }));
                            }
                        }
                        catch (err) {
                            //logger.error(err)
                            this._super.reply(BotDB.idiomas.error.norm);
                        }
                    }),
                    runJoox: (ComandObj) => __awaiter(this, void 0, void 0, function* () {
                        /** Joox is a music streaming service owned by Tencent,
                         * launched in January 2015. Joox is the biggest music
                         * streaming app in Asian markets such as Hong Kong,
                         * Macau, Indonesia, Malaysia, Myanmar, Thailand and also
                         * the South African market
                        */
                        // By Hafizh
                        if (!this._super.isREGISTERED)
                            return yield this._super.reply(BotDB.idiomas.notRegistered());
                        if (!this._super.q)
                            return yield this._super.reply(BotDB.idiomas.wrongFormat());
                        if (this._super._user.isLimited)
                            return yield this._super.reply(BotDB.idiomas.limit());
                        this._super.showSearchingMessage(BotDB.idiomas.SearchResult(this._super.pushname));
                        const dataJoox = yield axios.get(`https://api.vhtear.com/music?query=${this._super.q}&apikey=${FileDB.apiKeys.vhtear}`);
                        const cardJoox = new canvas.Spotify()
                            .setAuthor(dataJoox.data.result[0].penyanyi)
                            .setAlbum(dataJoox.data.result[0].album)
                            .setStartTimestamp(dataJoox.data.result[0].duration)
                            .setEndTimestamp(10)
                            .setImage(dataJoox.data.result[0].linkImg)
                            .setTitle(dataJoox.data.result[0].judul);
                        cardJoox.build()
                            .then((buffer) => __awaiter(this, void 0, void 0, function* () {
                            canvas.write(buffer, `${this._super.sender}_joox.png`);
                            yield this._super.sendFile(`${this._super.sender}_joox.png`, 'joox.png', BotDB.idiomas.joox(dataJoox.data));
                            fs.unlinkSync(`${this._super.sender}_joox.png`);
                            yield this._super.sendFFU(dataJoox.data.result[0].linkMp3, 'joox.mp3', '');
                        }))
                            .catch((err) => __awaiter(this, void 0, void 0, function* () {
                            console.error(err);
                            yield this._super.reply(BotDB.idiomas.error.error());
                        }));
                    }),
                    runTiktokpic: (ComandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this._super.isREGISTERED)
                            return yield this._super.reply(BotDB.idiomas.notRegistered());
                        if (!this._super.q)
                            return yield this._super.reply(BotDB.idiomas.wrongFormat());
                        if (this._super._user.isLimited)
                            return yield this._super.reply(BotDB.idiomas.limit());
                        this._super.showSearchingMessage(BotDB.idiomas.SearchResult(this._super.pushname));
                        try {
                            //logger.info(`Get profile pic for ${this._super.q}`)
                            const tkt = yield axios.get(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${this._super.q}`);
                            if (tkt.data.error)
                                return this._super.reply(tkt.data.error);
                            yield this._super.sendFFU(tkt.data.result, 'tiktokpic.jpg', 'Ini :D');
                            //logger.info(BotDB.idiomas.success.sending + ' TikTok profile pic!')
                        }
                        catch (err) {
                            console.error(err);
                            yield this._super.reply(BotDB.idiomas.error.error());
                        }
                    }),
                    runTiktokd: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        const commandName = commandObj.name;
                        if (!this._super.isREGISTERED)
                            return yield this._super.reply(BotDB.idiomas.notRegistered);
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(commandObj.description + ` - ` + commandObj.usage);
                        if (!this._super.isURL(this._super.url) && !this._super.url.includes('tiktok')) {
                            return yield this._super.reply(BotDB.idiomas.downloading.invalidlink);
                        }
                        if (this._super._user.isLimited)
                            return yield this._super.reply(BotDB.idiomas.limit());
                        let durs = this._super.duration;
                        this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        let res = yield scraper.bodaoScrapper.allinone(this._super.url).catch(n => {
                            return this._super.printError(n);
                        });
                        let _id = this._super.quotedMsg != null ? this._super.msg.id : this._super.id;
                        //let qualities:any = []
                        if ((res === null || res === void 0 ? void 0 : res.url.length) > 0) {
                            let _msg = `${BotDB.idiomas.downloading.waitvideo}\n`;
                            for (let u of res.url) {
                                //qualities.push(u.quality)
                                _msg += `${BotDB.idiomas.quality}: ${u.type} : ` + (yield Utils.urlShortener(u.url)) + '\n';
                            }
                            if (res.url.length > 0) {
                                this._super.mySendMessage(_msg);
                            }
                            let uls;
                            if (commandName === 'tiktok')
                                uls = res.url.find((v) => v.type === 'mp4');
                            if (uls.url)
                                this._super.sendFFU(uls.url, '', '');
                            else
                                this._super.mySendMessage(`${BotDB.idiomas.downloading.privatelink}`);
                        }
                        else {
                            this._super.mySendMessage(`${BotDB.idiomas.errorOcurred}`);
                        }
                    }),
                    runtiktoknowm: (ComandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(`Download Tiktok without watermark. How to do it?\nJust type ${Bot.prefix}tiktok (video address) \nWithout parentheses`);
                        let urls = this._super.url;
                        if (!this._super.isURL(urls)) {
                            return this._super.reply(BotDB.idiomas.downloading.invalidlink);
                        }
                        let _id = this._super.quotedMsg != null ? this._super.msg.id : this._super.id;
                        let durs = this._super.duration;
                        yield this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        try {
                            let _mp4Url;
                            if (!/\d/.test(this._super.command)) {
                                let result = yield scraper.snaptik(urls);
                                _mp4Url = result === null || result === void 0 ? void 0 : result.source;
                            }
                            if (this._super.command.endsWith('1')) {
                                let result = yield scraper.snaptik(urls);
                                _mp4Url = result === null || result === void 0 ? void 0 : result.server1;
                            }
                            if (this._super.command.endsWith('2')) {
                                let ress = yield scraper.ssstik(urls);
                                _mp4Url = ress === null || ress === void 0 ? void 0 : ress.mp4;
                            }
                            if (_mp4Url != undefined) {
                                yield this._super.sendFFU(_mp4Url, '', '');
                            }
                        }
                        catch (err) {
                            //logger.error(err)
                            return this._super.reply(BotDB.idiomas.error.norm + `\nUse *${Bot.prefix}tiktok1 ${Bot.prefix}tiktok2* or *${Bot.prefix}tiktok3* to  try another server `);
                        }
                    }),
                    runLinedl: (ComandObj) => __awaiter(this, void 0, void 0, function* () {
                        // chikaa chantexxzz
                        if (!this._super.isREGISTERED)
                            return yield this._super.reply(BotDB.idiomas.notRegistered());
                        if (this._super.isGroupMsg)
                            return yield this._super.reply(BotDB.idiomas.pcOnly());
                        if (!this._super.isURL(this._super.url) && !this._super.url.includes('store.line.me'))
                            return yield this._super.reply(BotDB.idiomas.wrongFormat());
                        if (this._super._user.isLimited)
                            return yield this._super.reply(BotDB.idiomas.limit());
                        LibraryDB.ScrapMini.line(this._super.url)
                            .then((res) => __awaiter(this, void 0, void 0, function* () {
                            yield this._super.sendFFU(res.thumb, 'line.png', `*「 LINE STICKER DOWNLOADER 」*\n\n➸ *Title*: ${res.title}\n➸ *Sticker type*: ${res.type}\n\n_Media is being sent, Please wait a moment ..._`);
                            for (let i = 0; i < res.sticker.length; i++) {
                                yield this._super._client.sendStickerfromUrl(`${res.sticker[i]}`, null, { author: Bot.cocreador, pack: Bot.packWm });
                                //logger.info(BotDB.idiomas.success.sending + ' Line sticker!')
                            }
                        }))
                            .catch((err) => __awaiter(this, void 0, void 0, function* () {
                            console.error(err);
                            yield this._super.reply(BotDB.idiomas.error.error());
                        }));
                    }),
                    runTiktokmp3: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        const commandName = commandObj.name;
                        if (!this._super.isREGISTERED)
                            return yield this._super.reply(BotDB.idiomas.notRegistered);
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(commandObj.description + ` - ` + commandObj.usage);
                        if (!this._super.isURL(this._super.url) && !this._super.url.includes('tiktok')) {
                            return yield this._super.reply(BotDB.idiomas.downloading.invalidlink);
                        }
                        if (this._super._user.isLimited)
                            return yield this._super.reply(BotDB.idiomas.limit());
                        let durs = this._super.duration;
                        this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        let res = yield scraper.bodaoScrapper.allinone(this._super.url).catch(n => {
                            return this._super.printError(n);
                        });
                        let _id = this._super.quotedMsg != null ? this._super.msg.id : this._super.id;
                        //let qualities:any = []
                        if ((res === null || res === void 0 ? void 0 : res.url.length) > 0) {
                            let _msg = `${BotDB.idiomas.downloading.waitvideo}\n`;
                            for (let u of res.url) {
                                //qualities.push(u.quality)
                                _msg += `${BotDB.idiomas.quality}: ${u.type} : ` + (yield Utils.urlShortener(u.url)) + '\n';
                            }
                            if (res.url.length > 0) {
                                this._super.mySendMessage(_msg);
                            }
                            let uls;
                            if (commandName === 'tiktok')
                                uls = res.url.find((v) => v.type === 'mp3');
                            if (uls.url)
                                this._super.sendFFU(uls.url, '', '');
                            else
                                this._super.mySendMessage(`${BotDB.idiomas.downloading.privatelink}`);
                        }
                        else {
                            this._super.mySendMessage(`${BotDB.idiomas.errorOcurred}`);
                        }
                    }),
                    runIgstory: (ComandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (!this._super.numberOfArgs(2))
                            return this._super.reply(`${BotDB.idiomas.downloading.inst_story} \n` +
                                `${BotDB.idiomas.use} ${Bot.prefix}igstory <username> <serial number>\n` +
                                `Example  : ${Bot.prefix}igstory awkarin 1`);
                        let durs = this._super.duration;
                        this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        let data = yield scraper.saveFromStory(this._super.args[0].replace(/@/, '')).catch(e => this._super.printError(e, false));
                        if (!data)
                            return this._super.reply(`❌ ${BotDB.idiomas.xNotFound('Stories')}`);
                        if ((data === null || data === void 0 ? void 0 : data.length) < this._super.args[1])
                            return this._super.reply(`❌ ${BotDB.idiomas.xNotFound('Stories')}.Number of stories available: ${data.length}`);
                        this._super.sendFFU(data[+this._super.args[1] - 1], '', '', {}, false);
                    }),
                    runIgdl: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                        //bodaoScrapper.instagram('https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link')
                        const commandName = commandObj.name;
                        if (!this._super.isREGISTERED)
                            return yield this._super.reply(BotDB.idiomas.notRegistered);
                        if (this._super.numberOfArgs(0))
                            return this._super.reply(commandObj.description + ` - ` + commandObj.usage);
                        if (!this._super.isURL(this._super.url) && !this._super.url.includes('instagram')) {
                            return yield this._super.reply(BotDB.idiomas.downloading.invalidlink);
                        }
                        if (this._super._user.isLimited)
                            return yield this._super.reply(BotDB.idiomas.limit());
                        let durs = this._super.duration;
                        this._super.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
                        let res = yield scraper.bodaoScrapper.instagram(this._super.url).catch(n => {
                            return this._super.printError(n);
                        });
                        let _id = this._super.quotedMsg != null ? this._super.msg.id : this._super.id;
                        //let qualities:any = []
                        if ((res === null || res === void 0 ? void 0 : res.length) > 0) {
                            let _msg = `${BotDB.idiomas.downloading.waitvideo}\n`;
                            for (let u of res) {
                                //qualities.push(u.quality)
                                _msg += `${BotDB.idiomas.quality}: ${u.type} : ` + (yield Utils.urlShortener(u.url)) + '\n';
                            }
                            if (res.length > 0) {
                                this._super.mySendMessage(_msg);
                            }
                            let uls;
                            if (commandName === 'instagram')
                                uls = res[0].url;
                            if (uls)
                                this._super.sendFFU(uls, '', '');
                            else
                                this._super.mySendMessage(`${BotDB.idiomas.xNotFound('Error')}}`);
                        }
                        else {
                            this._super.mySendMessage(`${BotDB.idiomas.errorOcurred}`);
                        }
                    }),
                    runPlayd: (ComandObj) => __awaiter(this, void 0, void 0, function* () {
                        if (this._super.hasNoArg())
                            return this._super.reply(`Para pesquisar músicas do youtube \n\nUsar: ${Bot.prefix}play <song title>\nExample: ${Bot.prefix}play radioactive but im waking up`);
                        let _ytresult = yield api.ytsearch(this._super.arg).catch(e => { return this._super.printError(e); });
                        let ytresult = _ytresult[0];
                        const hasDurationProperty = Object.prototype.hasOwnProperty.call(ytresult, 'duration');
                        if (!hasDurationProperty)
                            return this._super.reply(`Desculpe, o recurso está em reparo`);
                        try {
                            if (ytresult.seconds > 900)
                                return this._super.reply(BotDB.idiomas.downloading.videoduration);
                            let estimasi = ytresult.seconds / 200;
                            let est = estimasi.toFixed(0);
                            yield this._super.sendFFU(`${ytresult.thumbnail}`, `Vídeos encontrados!!\n\n` +
                                `${global.q3}Título    :${global.q3} ${ytresult.title}\n` +
                                `${global.q3}Canal :${global.q3} ${ytresult.author.name}\n` +
                                `${global.q3}Duração  :${global.q3} ${ytresult.timestamp}\n` +
                                `${global.q3}Uploaded:${global.q3} ${ytresult.ago}\n` +
                                `${global.q3}Visualizações   :${global.q3} ${ytresult.views}\n` +
                                `${global.q3}Url     :${global.q3} ${ytresult.url}\n\n` +
                                `O áudio está sendo enviado em ± ${est} minutos`, ``);
                            //Download video and save as MP3 file
                            let path = `./src/assets/media/temp_${this._super.time}.mp3`;
                            let stream = ytdl(ytresult.videoId, { quality: 'highestaudio' });
                            /*ffmpeg({ source: stream })
                                .setFfmpegPath('./bin/ffmpeg')
                                .on('error', (err) => {
                                    if (existsSync(path)) unlinkSync(path)
                                    this._super.printError(err, false)
                                })
                                .on('end', async () => {
                                    
                                    await this._super.sendFile( path, `audio.mp3`, '')
                                    const elapsed = Utils.processTime(this._super.time, moment().toDate())
                                    //logger.info(`${BotDB.idiomas.audio.process} ${elapsed} ${BotDB.idiomas.second(elapsed)}`)
                                    Utils.sleep(2000).then(() => { if (existsSync(path)) unlinkSync(path) })
                                })
                                .saveToFile(path)*/
                        }
                        catch (err) {
                            //logger.error(err)
                            this._super.reply(BotDB.idiomas.error.norm);
                        }
                    }),
                    runButton: (commandObj) => __awaiter(this, void 0, void 0, function* () {
                    }),
                    default: () => {
                        //nothing to do
                    }
                };
                const runCommand = () => {
                    commandsArray.forEach(userCommands => {
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
                    });
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
downloadHandlers.logger = console;
//# sourceMappingURL=downloadHandlers.js.map
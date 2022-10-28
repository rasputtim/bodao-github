var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { downloadContentFromMessage, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } from '@adiwajshing/baileys';
import proto from '@adiwajshing/baileys/WAProto/index.js';
import chalk from 'chalk';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import * as isPorn from 'is-porn';
import pkg2 from 'lodash';
import { createRequire } from "module";
import moment from 'moment-timezone';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import BotDB from '../basededatos/database.js';
import FileDB from '../basededatos/fileDatabase.js';
import Bot from '../factory/bot.js';
import Chat from '../factory/chat.js';
import Group from '../factory/group.js';
import LibraryDB from '../factory/library.js';
import antiRough from '../factory/libs/antirough.js';
import Utils from '../factory/libs/functions.js';
import imageMan from '../factory/libs/imageManipulation.js';
import timeMan from '../factory/libs/timeManipulation.js';
import _pino from '../factory/logger.js';
import { PluginManager } from '../factory/pluginManager.js';
import Stats from '../factory/stats.js';
import { BotRoles, ChatType, EMediaConvertType, EQuotedReturnEnum } from '../factory/types/index.js';
import User from '../factory/user.js';
import { LocaleService } from '../languajes/localeService.js';
import CommandManager from './commands.js';
let monospace = '```';
const logger = _pino;
const { sample } = pkg2;
const __ = LocaleService.__;
const __n = LocaleService.__n;
const exc = '[ ! ]';
const excBold = '*[ ! ]';
const boldSign = '*';
const Waproto = proto.proto;
const __dirname = path.resolve();
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
let file = __filename; //require.resolve(__filename);
const nl = '\n';
const more = '';
let nwn = more.repeat(850);
let hit_today = [];
let vote = [];
const baileys = {
    downloadContentFromMessage: downloadContentFromMessage,
    generateWAMessage: generateWAMessage,
    getContentType: getContentType,
    generateWAMessageFromContent: generateWAMessageFromContent,
    prepareWAMessageMedia: prepareWAMessageMedia,
    Waproto: proto.proto,
    createRequire: createRequire
};
export default class MessageCore {
    /**
     *
     * @param client the Bayleis conn object
     * @param pMessage
     * @param pStore
     * @returns
     */
    constructor(client, pMessage, pStore) {
        var _b, _c;
        this._isModerator = false; //todo implement moderator mode
        this._botNumber = ''; //is the BotAdmin. The phone number of that read the qrcode
        this._commandFound = false; //true if the commenad was found in some of the commandHandlers
        this._NameBot = Bot.botName + 'ᴮʸ⁻ᴿᴸ';
        this._commandHandlers = [];
        this._notCommandHandlers = [];
        this._globalThumb = null;
        this._picThumb = null;
        this._sendThumb = null;
        this._isToxic = false; //true if the conversation is considered toxic/rough
        this._user = {};
        this._chat = {};
        this._stat = {};
        this.destrava = `*DESTRAVA DO BODÃO 🤖 POWERED BY RAFEL LODUCA㊗* ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오  ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너 ㅜ로오너ㅜ랄 ㅜ로 ㅜ로오너ㅜ랄오 ㅜ로오 ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄 ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄ㅜ랄너ㅜ랄너ㅜ랄너ㅜ랄ㅜ ㅜ로오너ㅜ랄로오너ㅜ랄너ㅜ랄너ㅜ랄`;
        this.travaPv = '';
        this.createAudioMsgObj = (myAudio, fileName, name = null) => {
            const nameOnly = name ? name : fileName.split('.').slice(0, -1).join('.');
            const myAydioMsg = {
                'audio': myAudio,
                'contextInfo': {
                    'externalAdReply': {
                        'title': `${nameOnly} >~<`,
                        'body': `Bodão_Corp`,
                        'sourceUrl': this.BodaoBotURL,
                        'thumbnail': this.sendThumb
                    }
                },
                'fileName': `${fileName}`,
                'mimetype': 'audio/mpeg',
                'ptt': true
            };
            return myAydioMsg;
        };
        this.getSoundFile = (fileName, name = null) => __awaiter(this, void 0, void 0, function* () {
            let allowedExtensions = /(\.mp3|\.m4a)$/i;
            let extension = fileName.split('.').pop();
            //let extension2 = fileName.substring(fileName.lastIndexOf('.') + 1);
            let fileToGet;
            if (extension === fileName) {
                fileToGet = fileName + '.mp3';
            }
            else if (!allowedExtensions.exec(fileName)) {
                console.log('Please upload file having extensions .mp3/.m4a only.');
                return false;
            }
            else
                fileToGet = fileName;
            var mAudio = BotDB.getAudioUwu(fileToGet);
            this._client.sendMessage(this.from, this.createAudioMsgObj(mAudio, fileToGet, name), {
                'quoted': this.msgQuote
            });
            this._user.limitInc = 1;
        });
        //not used objects =========
        this._0x153ea7 = {
            'key': Object.assign({ 'participant': '0@s.whatsapp.net' }, this.from ? {
                'remoteJid': Bot._2_QUANTUM_BOT_GROUP_ID
            } : {}),
            'message': {
                'videoMessage': {
                    'title': '' + this.NameBot,
                    'h': `UwU`,
                    'seconds': '359996400',
                    'gifPlayback': `true`,
                    'caption': '' + this.NameBot,
                    'jpegThumbnail': BotDB.images.logo
                }
            }
        };
        this._0x4cf0ce = {
            'key': {
                'fromMe': false,
                'participant': '0@s.whatsapp.net',
                'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
            },
            'message': {
                'orderMessage': {
                    'itemCount': 737,
                    'status': 200,
                    'thumbnail': BotDB.images.logo,
                    'surface': 200,
                    'message': Utils.saluHora + ('\n' + this.pushname + '\n'),
                    'orderTitle': Bot.packWm,
                    'sellerJid': '0@s.whatsapp.net'
                }
            },
            'contextInfo': {
                'forwardingScore': 999,
                'isForwarded': true
            },
            'sendEphemeral': true
        };
        this._0x523c55 = {
            'key': {
                'fromMe': false,
                'participant': '0@s.whatsapp.net',
                'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
            },
            'message': {
                'orderMessage': {
                    'itemCount': 2022,
                    'status': 200,
                    'thumbnail': BotDB.images.logo,
                    'surface': 200,
                    'message': '' + this.NameBot,
                    'orderTitle': Bot.packWm,
                    'sellerJid': '0@s.whatsapp.net'
                }
            },
            'contextInfo': {
                'forwardingScore': 999,
                'isForwarded': true
            },
            'sendEphemeral': true
        };
        this._0x2de8e1 = {
            'key': {
                'participant': '0@s.whatsapp.net'
            },
            'message': {
                'documentMessage': {
                    'title': '' + this.NameBot,
                    'jpegThumbnail': BotDB.images.logo
                }
            }
        };
        this._0x54bb93 = {
            'key': Object.assign({ 'fromMe': false, 'participant': '0@s.whatsapp.net' }, this.from ? {
                'remoteJid': Bot._2_QUANTUM_BOT_GROUP_ID
            } : {}),
            'message': {
                'videoMessage': {
                    'title': '' + this.NameBot,
                    'h': `UwU`,
                    'seconds': `359996400`,
                    'caption': '' + this.NameBot,
                    'jpegThumbnail': BotDB.images.logo
                }
            }
        };
        this._0x10571a = {
            'key': {
                'participant': '0@s.whatsapp.net'
            },
            'message': {
                'locationMessage': {
                    'name': '' + this.NameBot,
                    'jpegThumbnail': BotDB.images.logo
                }
            }
        };
        this._0x1387c3 = {
            'key': Object.assign({ 'participant': '0@s.whatsapp.net' }, this.from ? {
                'remoteJid': Bot._3_QUANTUM_BOT_GROUP_ID
            } : {}),
            'message': {
                'contactMessage': {
                    'displayName': '' + this.NameBot,
                    'vcard': `BEGIN:VCARD
VERSION:3.0
N:XL;` + this.pushname + ',;;;\x0aFN:' + this.pushname + `,
item1.TEL;waid=${Bot.CREATOR_NUMBER}:${Bot.CREATOR_NUMBER}
item1.X-ABLabel:Ponsel
END:VCARD`,
                    'jpegThumbnail': BotDB.images.logo,
                    'thumbnail': BotDB.images.logo,
                    'sendEphemeral': true
                }
            }
        };
        this._msg = pMessage.messages[0];
        const msg = this._msg;
        this._store = pStore;
        this._client = client;
        if (!msg.message)
            return;
        //const _0x117b04 = body.split(' ');
        this._msg_serial = LibraryDB.smsg(this._client, this._msg, this._store);
        msg.message = Object.keys(msg.message)[0] === 'ephemeralMessage' ? msg.message.ephemeralMessage.message : msg.message;
        if (msg.key && msg.key.remoteJid === 'status@broadcast')
            return;
        if (msg.key.id.startsWith('BAE5') && msg.key.id.length === 16)
            return;
        //Serialize Message
        /* when is group from = groupID
           when is private from = sender
        */
        msg.chat = this._from = msg.key.remoteJid;
        this._isGroupMsg = this._from.endsWith('@g.us');
        //=========NUMBERS SESSION=============================
        /**the sender of the message
         * when is group, sender = participant who sent the message
         * when is private, sender = participant who sent the message
        */
        //'5511986571658@s.whatsapp.net'
        this._sender = this._msg_serial.sender;
        //this._client.user.id is the bot Number, that is the number who read the QrCode
        this._botNumber = Utils.formatWAUserNumber(this._client.user.id); //5511986378728@s.whatsapp.net
        //removes the ":XX" from the user.id
        // this._cglobal = this._client.user.id.split(':')[0] + '@s.whatsapp.net' //5511986378728@s.whatsapp.net
        this._atBotNumber = '@' + this._botNumber; //'@5511986378728'
        this._AtSenderNUMBER = '@' + this._sender.split('@')[0]; //'@5511986571658'
        this._senderNUMBER = this._sender.split('@')[0]; //'5511986571658'
        /**
         * list of all users tha can control the BOT itself
         * the creator, co cretors owners who purchased it,
         */
        this._botControllers = [...Bot.botcontrol, ...Bot.ownerNumber, Bot.cglobal];
        /**
        * Gets mentioned jid list
        * @description An Set of all mentioned numbers in this message.
        */
        this._jids = [...new Set([...this._msg.mentionedJid || [], ...this._msg.quoted ? [this._msg.quoted.sender] : []])];
        //=========END NUMBERS SESSION=============================   
        //is the bot the sender ?
        this._fromMe = this._msg.key.fromMe;
        this._isFromME = this._fromMe;
        this._type = getContentType(msg.message);
        this._body = this._type === 'conversation' ? this._msg.message.conversation : this._type == 'imageMessage' ? this._msg.message.imageMessage.caption : this._type == 'videoMessage' ? this._msg.message['videoMessage'].caption : this._type == 'extendedTextMessage' ? this._msg.message.extendedTextMessage.text : this._type == 'buttonsResponseMessage' ? msg.message.buttonsResponseMessage['selectedButtonId'] : this._type == 'listResponseMessage' ? this._msg.message.listResponseMessage.singleSelectReply.selectedRowId : this._type == 'templateButtonReplyMessage' ? this._msg.message.templateButtonReplyMessage.selectedId : '';
        this._quoted = this._msg.quoted ? this._msg.quoted : null;
        if (this._body === '..' && this.type === 'extendedTextMessage' /*&& (['chat', 'imageMessage', 'videoMessage'].includes(this.content))*/) {
            // inject quotedMsg as Ms
            //let _t = message.t
            //this._msg.message = this._msg.quoted
            //message.t = _t
        }
        // whole chats body
        this._chats = this._type === 'conversation' ? this._msg.message.conversation : this._type === 'extendedTextMessage' ? this._msg.message.extendedTextMessage.text : '';
        this._croppedChats = (((_b = this._chats) === null || _b === void 0 ? void 0 : _b.length) > 40) ? ((_c = this._chats) === null || _c === void 0 ? void 0 : _c.substring(0, 40)) + '...' : this._chats;
        //this._args = this._body.trim().split(/ +/).slice(1); //remove the first element (command) from array
        this._args = this._body.trim().split(/\s+/).slice(1);
        this._arg = this._body.trim().substring(this._body.indexOf(' ') + 1);
        //first argument
        this._arg0 = Array.isArray(this._args) && this._args.length > 0 ? this.args[0] : '';
        //second argument
        this._arg1 = this._arg.trim().substring(this._arg.indexOf(' ') + 1);
        this._arg2 = Array.isArray(this._args) && this._args.length > 0 ? this.args[2] : '';
        this._ar = this._args.map((v) => v.toLowerCase());
        this._url = this.isQuotedChat ? this._quoted.text : this._body;
        this._mimetype = this.getMimetype();
        this._user = User.getUserFromId(this._sender);
        this._user.client = this._client;
        this._user.pushName = this._msg ? this._msg.pushName : 'A/Z';
        //[this._msg.chat = this._from
        this._chat = Chat.getChatFromId(this._msg.chat);
        this._chat.name = this._msg.chat.name;
        this._chat.client = this._client;
        if (this._isGroupMsg) {
            this._chat.type = ChatType.GROUP;
            this._chat.setUpGroup();
        }
        else
            this._chat.type = ChatType.PRIVATE;
        this._stat = Stats.getstatsforChatUser(this._chat, this._user);
        //if(this._isGroupMsg && !this._group) 
        //group methods
        // this.getGroupMetaData()
        const { isFiltered: isSPAMFiltered, addFilter: addSPAMFilter } = LibraryDB.antiSpam;
        this._isSPAMFiltered = isSPAMFiltered;
        this._addSPAMFilter = addSPAMFilter;
        this._client.decriptMedia = (message) => __awaiter(this, void 0, void 0, function* () {
            return this._client.downloadAndBufferMediaMessage(message);
        });
        this._client.sendImage = (jid, path, quoted, options = {}) => __awaiter(this, void 0, void 0, function* () {
            let buff = Buffer.isBuffer(path) ? path : (/^data:.*?\/.*?;base64,/i).test(path) ? Buffer.from((path.split) `,`[1], 'base64') : (/^https?:\/\//).test(path) ? yield yield Utils.getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer['alloc'](0);
            let buffer;
            if (options && (options.packname || options.author)) {
                buffer = yield imageMan.writeExifImg(buff, options);
            }
            else {
                buffer = yield imageMan.imageToWebp(buff);
            }
            yield this._client.sendMessage(jid, Object.assign({ 'image': buffer }, options), {
                'quoted': quoted
            });
            return buffer;
        });
        this._client.sendImageAsSticker = (jid, path, quoted, options = {}) => __awaiter(this, void 0, void 0, function* () {
            let buff = Buffer.isBuffer(path) ? path : (/^data:.*?\/.*?;base64,/i).test(path) ? Buffer.from((path.split) `,`[1], 'base64') : (/^https?:\/\//).test(path) ? yield yield Utils.getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer['alloc'](0);
            let buffer;
            return (options && (options.packname || options.author) ? buffer = yield imageMan.writeExifImg(buff, options) : buffer = yield imageMan.imageToWebp(buff), yield this._client.sendMessage(jid, Object.assign({ 'sticker': {
                    'url': buffer
                } }, options), {
                'quoted': quoted
            }), buffer);
        });
        /**
         *
         * @param {*} jId
         * @param {*} path
         * @param {*} quoted
         * @param {*} options
         * @returns the object {message, path of the message }
        */
        this._client.sendVideoAsSticker = (jId, path, quoted, options) => __awaiter(this, void 0, void 0, function* () {
            let buff = Buffer.isBuffer(path) ? path : (/^data:.*?\/.*?;base64,/i).test(path) ? Buffer['from']((path.split) `,`[1], `base64`) : (/^https?:\/\//).test(path) ? yield yield Utils.getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer['alloc'](0);
            let buffer;
            if (options && (options.packname || options.author)) {
                buffer = yield imageMan.writeExifVid(buff, options);
            }
            else {
                buffer = yield imageMan.videoToWebp(buff);
            }
            const fullMessage = yield this._client.sendMessage(jId, Object.assign({ 'sticker': {
                    'url': buffer
                } }, options), {
                'quoted': quoted
            });
            return { fullMessage, buffer };
        });
        client.createMessage = (from, myContent, ...options) => __awaiter(this, void 0, void 0, function* () {
            //jid: string, content: AnyMessageContent, options: MessageGenerationOptions
            const myOptions = {
                options,
                'userJid': client.authState.creds.me.id,
                'upload': client.waUploadToServer
            };
            return yield generateWAMessage(from, myContent, myOptions);
        });
    }
    getMimetype() {
        var _b;
        if (!this._quoted) {
            switch (this._msg.mtype) {
                case 'conversation':
                    return 'text/plain';
                case 'videoMessage':
                    return this._msg.message.videoMessage.mimetype;
                case 'audioMessage':
                    return this._msg.message.audioMessage.mimetype;
                case 'documentMessage':
                    return this._msg.message.documentMessage.mimetype;
                case 'imageMessage':
                    return this._msg.message.imageMessage.mimetype;
                case 'stickerMessage':
                    return this._msg.message.stickerMessage.mimetype;
                default:
                    return 'unknown';
            }
        }
        else {
            return this._quoted ? (((_b = this._quoted) === null || _b === void 0 ? void 0 : _b.msg) || this._quoted).mimetype : 'unknow';
        }
    }
    updateMsgStats() {
        var _b;
        if (!this._stat)
            return;
        if (!this._quoted) {
            switch (this._msg.mtype) {
                case 'conversation':
                    return this._stat.text++;
                case 'videoMessage':
                    return this._stat.video++;
                case 'audioMessage':
                    return this._stat.audio++;
                case 'documentMessage':
                    return this._stat.docs++;
                case 'imageMessage':
                    return this._stat.images++;
                case 'stickerMessage':
                    return this._stat.sticker++;
                default:
                    return this._stat.unknown++;
            }
        }
        else {
            let mime = (((_b = this._quoted) === null || _b === void 0 ? void 0 : _b.msg) || this._quoted).mimetype;
            switch (mime) {
                case 'conversation':
                    return this._stat.text++;
                case 'videoMessage':
                    return this._stat.video++;
                case 'audioMessage':
                    return this._stat.audio++;
                case 'documentMessage':
                    return this._stat.docs++;
                case 'imageMessage':
                    return this._stat.images++;
                case 'stickerMessage':
                    return this._stat.sticker++;
                default:
                    return this._stat.unknown++;
            }
        }
    }
    addCommandHandler(pointer) {
        this._commandHandlers.push(pointer);
    }
    addNotCommandHandler(pointer) {
        this._notCommandHandlers.push(pointer);
    }
    //=============CHECK ON BOT MODES =====================
    doSimi(inp) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!inp)
                return;
            let apiSimi; // set default simi di /lib/index.js
            if (!this._chat.isSimiOn)
                return null;
            if (BotDB.simi == 1)
                apiSimi = (q) => LibraryDB.api.simiLol(q);
            if (BotDB.simi == 2)
                apiSimi = (q) => LibraryDB.api.simiPais(q);
            if (BotDB.simi == 3)
                apiSimi = (q) => LibraryDB.api.simiZeks(q);
            if (BotDB.simi == 4)
                apiSimi = (q) => LibraryDB.api.simiSumi(q);
            if (BotDB.simi == 5)
                apiSimi = (q) => LibraryDB.api.simiSimi(q);
            let respon = yield apiSimi(inp.replace(/\b(sero)\b/ig, 'simi')).catch(e => {
                return logger.error(e);
            });
            if (respon) {
                logger.info('[LOGS] Simi respond:' + respon);
                const resp = '▸ ' + respon.replace(/\b(simi|simsim|simsimi)\b/ig, 'sero');
                //this.reply(resp)
                this._client.sendMessage(this._from, {
                    'text': resp,
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
                                'caption': this.NameBot + '🗣️' + this.pushname,
                                'jpegThumbnail': BotDB.images.similogo
                            }
                        }
                    }
                }).catch(error => {
                    logger.error('' + this.command), logger.error(error);
                });
            }
        });
    }
    /**
     * log rough words
     */
    logRough() {
        if (!this.isCmd && this.isAntitoxicModeOn && this.isGroupMsg) {
            logger.info('[BADW] ' +
                ' de ' + this.pushname + ' em ' + this._from || this._chat.name); //this.formattedTitle/)
        }
    }
    /**
     *
     * @returns true if the user is not banned
     */
    filterBanned() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._user.isBanned && !this.isGroupMsg && this.isCmd) {
                return this.sendText(`Sorry, you have been banned by a bot for violating the Rules or Terms and Conditions (${Bot.prefix}tnc).\nPlease chat with the /owners of the unbans. `)
                    .then(() => {
                    logger.info('[BANd] ' + `${this.command}[${this.args.length}]` + ' from ' + this.pushname);
                });
            }
            else if (this._user.isBanned && this.isCmd) {
                return logger.info('[BANd] ' + `${this.command}[${this.args.length}]` + ' from ' + this.pushname + ' in ' + this.from || this._chat.name); //this.formattedTitle)
            }
            else if (this._user.isBanned)
                return null;
            else
                return true;
        });
    }
    checkEnabled() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isGroupMsg && (this._chat.isBotEnabled === false) && this.command != 'enablebot') {
                if (this.isCmd)
                    this.mySendMessage('⛔ DISABLED!');
                if ((yield this.isSenderGroupAdmin) && this.isCmd)
                    this.mySendMessage(`enviar *${Bot.prefix}enablebot* to  ativar!`);
                return null;
            }
        });
    }
    checkRough() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._chat.isAntitoxicOn && !this.isCmd) {
                this._isToxic = yield antiRough.lookingRough(this.chats);
            }
        });
    }
    antiRough() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isCmd && this.isGroupMsg && (this._chat.isAntitoxicOn) && ['chat', 'video', 'image'].includes(this.type) && this.isToxic) {
                const _penalty = sample([1000, 2000, 3000, 5000, 10000]);
                const penaltyChain = BotDB.getPenaltyChain();
                const find = penaltyChain.get('groups').find({ id: this.groupId }).value();
                if (find && find.id === this.groupId) {
                    //test getvalue over lodash get
                    const existUser = penaltyChain.get('groups').filter({ id: this.groupId }).map('members').value()[0];
                    //const existUser = getValue(BotDB.dbPenalty.data, 'groups').filter({ id: this.groupId }).map('members').value()[0] 
                    const isIn = antiRough.inArray(this._sender, existUser);
                    if (existUser && isIn !== false) {
                        const penalty = penaltyChain.get('groups').filter({ id: this.groupId }).map('members[' + isIn + ']')
                            .find({ id: this._sender }).update('penalty', n => n + _penalty).value();
                        BotDB.dbPenalty.write();
                        if (penalty) {
                            yield this.reply(`${BotDB.idiomas.badw}\n\nPenalty +${_penalty}\nTotal : Rp` + Utils.formatin(penalty.penalty) + `${this._chat.isAntitoxicOn && !this.isBotGroupAdmin ? `\nAuto kick if fine> 20rb` : ''}`);
                            if (penalty.penalty > 20000 && this._chat.isKickModeOn && !this.isBotGroupAdmin) {
                                this.reply(`╔══✪〘 SAFE  〙✪\n║\n║ You will be kicked from the group.\n║ Because your penalty exceeds 20k.\n║ Mampos~\n║\n╚═〘 BodaoBot 〙`);
                                penaltyChain.get('groups').filter({ id: this.groupId }).map('members[' + isIn + ']')
                                    .remove({ id: this._sender }).value();
                                BotDB.dbPenalty.write();
                                yield Utils.sleep(3000);
                                Chat.kickUser(this._sender, this._from);
                                this._client.removeParticipant(this.groupId, this._sender);
                            }
                            if (penalty.penalty >= 2000000 && this._chat.isBannedModeOn) {
                                User.banUser(this._sender);
                                this.reply(`╔══✪〘 SAFE 〙✪\n║\n║ You have been banned by the bot.\n║ Because your penalty exceeds 2 million.\n║ Mampos~\n║\n║ Penalty -2.000.000\n║\n╚═〘 BodaoBot 〙`);
                                penaltyChain.get('groups').filter({ id: this.groupId }).map('members[' + isIn + ']')
                                    .find({ id: this._sender }).update('penalty', n => n - 2000000).value();
                                BotDB.dbPenalty.write();
                            }
                        }
                    }
                    else {
                        const cekMember = penaltyChain.get('groups').filter({ id: this.groupId }).map('members').value()[0];
                        if (cekMember.length === 0) {
                            penaltyChain.get('groups').find({ id: this.groupId }).set('members', [{ id: this._sender, penalty: _penalty }]).value();
                            BotDB.dbPenalty.write();
                        }
                        else {
                            const foundUser = penaltyChain.get('groups').filter({ id: this.groupId }).map('members').value()[0];
                            foundUser.push({ id: this._sender, penalty: _penalty });
                            yield this.reply(`${BotDB.idiomas.badw}\n\nPenalty +Rp${Utils.formatin(_penalty)}${this._chat.isAntitoxicOn && !this.isBotGroupAdmin ? `\nAuto kick if penalty > 20rb` : ''}`);
                            penaltyChain.get('groups').find({ id: this.groupId }).set('members', foundUser).value();
                            BotDB.dbPenalty.write();
                        }
                    }
                }
                else {
                    penaltyChain.get('groups').push({ id: this.groupId, members: [{ id: this._sender, penalty: _penalty }] }).value();
                    BotDB.dbPenalty.write();
                    yield this.reply(`${BotDB.idiomas.badw}\n\nPenalty +${_penalty}\nTotal : Rp${Utils.formatin(_penalty)}${this._chat.isAntitoxicOn && !this.isBotGroupAdmin ? `\nAuto kick if penalty > 20rb` : ''}`);
                }
            }
        });
    }
    /**Todo Add user into the blacklist of the bot // ou chat??? */
    addBlackList(participant) {
        if (this.isBlackListed) {
            BotDB.blackList.push(participant.replace(/\D/g, ''));
            fs.writeFileSync(FileDB.blackListDB, JSON.stringify(BotDB.blackList));
        }
    }
    removeBlackList(participant) {
        if (!this.isBlackListModeOn)
            return this.reply("BlackList is not active in this Group");
        var numbers = BotDB.blackList;
        console.log("numbers1", numbers);
        var position = numbers.findIndex(element => element.includes(participant));
        numbers.splice(position, 1);
        fs.writeFileSync(FileDB.blackListDB, JSON.stringify(BotDB.blackList));
        if (position < 0)
            return false;
        else
            return true;
    }
    //make this private
    groupChecks() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._isGroupMsg)
                return;
            let sender = this._sender;
            let isCmd = this.isCmd;
            //==============================
            //*** ANTI ANUNCIO DE BOTS ***//
            if (this.isGroupMsg && this._msg.mentionedJid.length >= 10 && !this.isAdmin) {
                yield this.reply(__('No ads here...'));
                this.kickSender();
                return this.sendMentionedMessage(__(`Why don't you go advertise in the whorehouse???`));
            }
            /***** ANTI-PALAVRAS ******/
            if (this.isGroupMsg && this.isAntiWordsModeOn && !this.isAdmin) {
                if (this._body.length >= 1) {
                    logger.info("msg grande", this._body.length);
                    if (this.isAntiWord) {
                        yield this.reply(__('No ads here...'));
                        if (this.isBlackListModeOn)
                            this.addBlackList(this.sender);
                        //remove user from group // kick
                        this.kickSender();
                        return this.sendMentionedMessage('Antipalavras está ativo neste grupo, este é o motivo da remoção do usuário @' + this.sender.split('@')[0]);
                    }
                }
            }
            //==================================
            //process level TODO: Checar esse metodo
            if (this.isLevelinModeOn && this.isREGISTERED) {
                const senderLevel = this._user.getLevel(this.from);
                try {
                    const xp = Math.floor((Math.random() * 50)); //(1000)
                    const myXP = 5000 * (Math.pow(2, senderLevel) - 1);
                    const getLevel = this._user.getLevel(this.from);
                    this._user.addXp(this.from, xp);
                    const LevelingXp = this._user.getXp(this.from);
                    if (myXP <= LevelingXp) {
                        this._user.addLevel(this.from, 1);
                        this._user.limitDec = 4;
                        const levelup = BotDB.idiomas.NivelUp(Utils.dateComplete, this.AtSenderNUMBER, getLevel, getLevel, sender, this.levelBar, LevelingXp, this.role, this.role2);
                        /**
                             * jid: string,
                             content: AnyMessageContent,
                             options: MiscMessageGenerationOptions & { waitForAck?: boolean } = { waitForAck: true }
                             */
                        const myContentt = {
                            'text': '' + levelup,
                            'mentions': [this._sender]
                        };
                        const options = {
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
                                        'caption': '' + this.pushname,
                                        'jpegThumbnail': BotDB._imgLevelUP
                                    }
                                }
                            }
                        };
                        this._client.sendMessage(this._from, myContentt, options);
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
            // check minimum amount of members
            try {
                const mLength = this.groupMembers.length;
                if (mLength <= Bot.minimogrupo) {
                    this.sendMentionedMessage(`Hmmm...`), setTimeout(() => {
                        this._client.groupLeave(this._from);
                    }, 3500);
                    setTimeout(() => {
                        this.sendMentionedMessage(BotDB.idiomas['MinGp1']() + (' wa.me/' + Bot.botcontrol[0].slice(0, -15)));
                    }, 2500);
                    setTimeout(() => {
                        this.sendMentionedMessage(BotDB.idiomas['MinGp2']() + (' ' + Bot.minimogrupo));
                    }, 0);
                }
            }
            catch (err) {
                console.error(err);
            }
            logger.info(this.groupAdmins);
            //-======= ]check AFK (Away from keyboard)[
            /*
       async checkAFK(){
               if (this.isGroupMsg) {
                   for (let ment of this.mentionedJidList) {
                       if (afk.checkAfkUser(ment, BotDB.afk)) {
                           const getId = afk.getAfkId(ment, BotDB.afk)
                           const getReason = afk.getAfkReason(getId, BotDB.afk)
                           const getTime = afk.getAfkTime(getId, BotDB.afk)
                           await this.reply(msg.afkMentioned(getReason, getTime), this.id)
                       }
                   }
                   if (afk.checkAfkUser(this.sender.id, BotDB.afk) && !this.isCmd) {
                       BotDB.afk.splice(afk.getAfkPosition(this.sender.id, BotDB.afk), 1)
                       fs.writeFileSync(BotDB.afkDB, JSON.stringify(BotDB.afk))
                       await this.sendText( msg.afkDone(this.pushname))
                   }
               }
           }
       
       
            */
            if (!this._fromMe && this._fromMe)
                return;
            for (let userId of this._jids) {
                if (User.users[userId] && User.users[userId].isAFK) {
                    const afkReason = this._user.afkReason;
                    const afkTime = this._user.afkStartTime;
                    const msg = `📴 *` + __('The named user is currently absent') + `*`
                        + nl
                        + `┏⊱ *` + __('Raason') + `*`
                        + nl
                        + `┗━⊱ `
                        + afkReason + '\n';
                    this.sendMentionedMessage(msg);
                }
            }
            if (this.isAFK && !isCmd) {
                const afkTime = this._user.afkStartTime;
                const afkReason = this._user.afkReason;
                const afkElapsedTime = timeMan.parseTime((yield Date.now()) - parseInt(afkTime));
                const msg = '*' + this.pushname + '* ' + __('I am no longer AFK!') + nl +
                    __('welcome back :D');
                this.sendMentionedMessage(msg);
                try {
                    this._user.disableAfk(BotDB.time);
                }
                catch (err) {
                    return this.mySendMessage(err);
                }
            }
            //======= ] end AFK [
            //=========  START FOOD CHECK ===============
        });
    }
    /**
     * avoid not safe for work (NSFW) links
     */
    antiNFSWLink() {
        return __awaiter(this, void 0, void 0, function* () {
            // Anti NSFW link include porn links
            if (this.isGroupMsg && !this.isBotGroupAdmin && this.isBotGroupAdmin && this.isNSFWModeOn && !this.isOwner) {
                if (this.isURL(this.chats)) {
                    let x = this.isURL(this.chats);
                    const classify = new URL((x == null ? '' : x));
                    logger.info('[FILTER] ' + 'Checking link:' + classify.hostname);
                    isPorn(classify.hostname, (err, status) => __awaiter(this, void 0, void 0, function* () {
                        if (err)
                            return console.error(err);
                        if (status) {
                            logger.info('[NSFW] ' + 'The link is classified as NSFW!');
                            yield this.reply(BotDB.idiomas.linkNsfw()); //, this.id)
                            // await this._client.removeParticipant(this.groupId, this.sender.id)
                        }
                        else {
                            logger.info(('[NEUTRAL]') + 'The link is safe!');
                        }
                    }));
                }
            }
        });
    }
    checkNFSWWords() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield antiRough.cariNsfw(this.chats.toLowerCase());
        });
    }
    checkPorn() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isAntiPornModeOn || !this.isImage)
                return false;
            let enc = (this.isQuotedImage || this.isQuotedSticker) ? this.quotedMsg : this.message;
            let mediaData = yield this._client.downloadAndBufferMediaMessage(enc);
            if (yield BotDB.antiPorn.check(mediaData)) {
                yield this.reply("*NSFW (porn) Detected*❗"); //, this.id)
                // remove user from group
                //await this.client.group.toggleEvent(metadata.id, [M.participant], true, true, 'remove')
                //logger.info(`[NSFW] - detected from ${this.sender.id}` )
                return true;
            }
            return false;
        });
    }
    /**
     * kick sender from the group if kick mode is on
     */
    kickSender(reason = 'unknown') {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isKickModeOn) {
                var usertoKick = this._senderNUMBER + '@s.whatsapp.net';
                const theMSG = __('O usuário @%s foi removido por %s, se for um engano, adicione-o novamente', usertoKick, reason);
                yield this.mySendMessage(theMSG);
                this._client.groupParticipantsUpdate(this._from, [usertoKick], 'remove').catch(err => {
                    this.mySendMessage(BotDB.idiomas.Erreply());
                });
                ;
            }
        });
    }
    //ANTIVIRTEX OR (ANTITRAVAS) // Msgs too Long
    checkVirtex() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isGroupMsg) {
                if (this.isVirtexMSG) {
                    //Admin sent virtex MSG
                    if (this.isAdmin)
                        return this._client.sendMessage(this._from, {
                            'text': BotDB.idiomas.NoTraba1(),
                            'mentions': [this._sender]
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
                                        'caption': '' + this.NameBot,
                                        'jpegThumbnail': BotDB.images.exclamation
                                    }
                                }
                            }
                        });
                    // othe members besides group admin sent Virtex
                    let saltos = (nl)['repeat'](400);
                    //kicks out sender from group
                    setTimeout(() => {
                        this.kickSender(__('Virtex Detection'));
                        this._chat.disableBot();
                    }, 1000);
                    const theMSGClose = +nl + __('O grupo foi fechado por segurança, caso você seja admin, abra o grupo usando o comando /abrir');
                    setTimeout(() => {
                        this._client.sendMessage(this._from, {
                            'text': BotDB.idiomas.NoTraba2(saltos, this._senderNUMBER + '@s.whatsapp.net', this.pushname)
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
                                        'caption': '' + this.NameBot,
                                        'jpegThumbnail': BotDB.images.pressF
                                    }
                                }
                            }
                        });
                    }, 0);
                    this.addBlackList(this.sender);
                    const response = yield this._client.sendMessage(this._from, { text: this.destrava }); // send a message
                    // sends a message to delete the given message
                    // this deletes the message for everyone
                    setTimeout(() => {
                        this._client.sendMessage(this._from, { delete: response.key });
                    }, 1000);
                }
            }
            else { //anti Virtex for privateChat
                if (this.travaPv == this.from)
                    return;
                this.travaPv = this.from;
                const response = yield this._client.sendMessage(this._from, { text: this.destrava }); // send a message
                yield this._client.updateBlockStatus(this._from, "block"); // Block user
                setTimeout(() => {
                    this._client.sendMessage(this._from, { delete: response.key });
                }, 1000);
            }
        });
    }
    //AntiLink Share
    checkAntiLink() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isGroupMsg && this.isAntiLinkModeOn && !this._msg.key.fromMe && this.isLinkMSG) {
                if (this.isAdmin)
                    return this._client.sendMessage(this._from, {
                        'text': BotDB.idiomas['NoLinks2'](),
                        'mentions': [this._sender]
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
                                    'caption': '' + this.NameBot,
                                    'jpegThumbnail': BotDB.images.exclamation
                                }
                            }
                        }
                    });
                this.kickSender();
            }
        });
    }
    checkAntiLinkGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            //AntiLinkGroup Share
            if (this.isGroupMsg && this.isAntiLinkGroupModeOn && !this._msg.key.fromMe && this.isGroupLinkMSG) {
                const thislinkgp = yield this._client.groupInviteCode(this._from);
                if (this._chats.includes('https://chat.whatsapp.com/' + thislinkgp))
                    return this._client.sendMessage(this._from, {
                        'text': BotDB.idiomas['NoLinks1'](),
                        'mentions': [this._sender]
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
                                    'caption': '' + this.NameBot,
                                    'jpegThumbnail': BotDB.images.exclamation
                                }
                            }
                        }
                    });
                if (this.isAdmin)
                    return this._client.sendMessage(this._from, {
                        'text': BotDB.idiomas['NoLinks2'](),
                        'mentions': [this._sender]
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
                                    'caption': '' + this.NameBot,
                                    'jpegThumbnail': BotDB.images.exclamation
                                }
                            }
                        }
                    });
                if (!this.isBotAdmin)
                    return this._client.sendMessage(this._from, {
                        'text': BotDB.idiomas['NoLinks3'](),
                        'mentions': [this._sender]
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
                                    'caption': this.NameBot + ' ',
                                    'jpegThumbnail': BotDB.images.exclamation
                                }
                            }
                        }
                    });
                this.kickSender();
            }
        });
    }
    checkGroupSpan() {
        if (!this.isGroupMsg)
            return;
        // =======check group spam ========
        if (this.isCmd && this._isSPAMFiltered(this._from)) {
            logger.info(chalk.redBright(`[ ! ]`), chalk.green('[ SPAMER CMD] Comando :'), chalk.whiteBright('' + this.command), chalk.greenBright('='), chalk.green(this.AtSenderNUMBER) + '\n');
            const options = {
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
                            'caption': BotDB.idiomas.NoSpam2(this.pushname),
                            'jpegThumbnail': BotDB.images.exclamation
                        }
                    }
                }
            };
            return this._client.sendMessage(this._from, {
                'text': BotDB.idiomas.NoSpam1(),
                'mentions': [this._sender]
            }, options);
        }
        ;
    }
    /**
     * Ant Private Mode is True. Private Chat with Bot is prohibited
     */
    checkPrivateChat() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isBotController && !this.isGroupMsg && Bot.isAntiPrivateModeOn === true) {
                var _0x45940e = 'wa.me/' + Bot.botcontrol[0].slice(0, -15);
                yield this._client.sendMessage(this._from, {
                    'text': BotDB.idiomas['NoPriv'](_0x45940e),
                    'mentions': [this._sender]
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
                                'caption': this.NameBot + ' ',
                                'jpegThumbnail': BotDB.images.pressF
                            }
                        }
                    }
                });
                setTimeout(() => {
                    this._client.updateBlockStatus(this._sender, `block`);
                }, 3000);
            }
        });
    }
    /*
    
    
    
    */
    checkSpan() {
        if (this.isGroupMsg)
            return;
        if (this.isCmd && this._isSPAMFiltered(this._from)) {
            console.log(chalk.redBright(`[ ! ]`), chalk.green('[ SPAMER CMD] Comando :'), chalk.whiteBright('' + this.command), chalk.greenBright('='), chalk.green(this.AtSenderNUMBER) + '\n');
            const options = {
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
                            'caption': BotDB.idiomas.NoSpam2(this.pushname),
                            'jpegThumbnail': BotDB.images.exclamation
                        }
                    }
                }
            };
            const message = {
                'text': BotDB.idiomas.NoSpam1(),
                'mentions': [this._sender]
            };
            this._client.sendMessage(this._from, message, options);
        }
        ;
    }
    //============END BOT MODES CHECKS ===========
    logCommands() {
        if (this._from === undefined)
            return;
        //log de comandos no console
        if (!this.isGroupMsg && this.isCmd)
            console.log('\x1b[1;31m~\x1b[1;37m>', '[[1;32mEJECUTANDO[1;37m]', Utils.color('<['), chalk.rgb(255, 131, 0).underline(this.command), Utils.color(']>'), 'Por', Utils.color(this.pushname), 'Chat', Utils.color(this.isGroupMsg ? this.groupName : 'Privado'), 'Fecha', Utils.color(BotDB.time), Utils.color('\n[_>]'));
        if (!this.isGroupMsg && !this.isCmd)
            console.log('[1;31m~[1;37m>', '[[1;34mRECIVIDO[1;37m]', Utils.color('{'), chalk.rgb(255, 131, 0).underline(this.chats || this.type), Utils.color('}'), 'De', Utils.color(this.sender.split('@')[0]), 'Chat', Utils.color(this.isGroupMsg ? this.groupName : 'Privado'), 'Fecha', Utils.color(BotDB.time));
        if (this.isCmd && this.isGroupMsg)
            console.log('\x1b[1;31m~\x1b[1;37m>', '[[1;32mEJECUTANDO[1;37m]', Utils.color('<['), chalk.rgb(255, 131, 0).underline(this.command), Utils.color(']>'), 'Por', Utils.color(this.pushname), 'En el Grupo', Utils.color(this.isGroupMsg ? this.groupName : 'Privado'), 'Fecha', Utils.color(BotDB.time), Utils.color('\n[_>]'));
        if (!this.isCmd && this.isGroupMsg)
            console.log('[1;31m~[1;37m>', '[\x1b[1;34mRECIVIDO\x1b[1;37m]', Utils.color('{'), chalk.rgb(255, 131, 0).underline(this.chats || this.type), Utils.color('}'), 'De', Utils.color(this.sender.split('@')[0]), 'En el Grupo', Utils.color(this.isGroupMsg ? this.groupName : 'Privado'), 'Fecha', Utils.color(BotDB.time));
        //logger
        if (!this.isGroupMsg && this.isCmd)
            logger.trace('[[1;32mEJECUTANDO[1;37m]' + '<[' + chalk.rgb(255, 131, 0).underline(this.command) + ']>' + 'Por' + this.pushname + 'Chat' + (this.isGroupMsg ? this.groupName : 'Privado') + 'Fecha' + (BotDB.time) + '\n[_>]');
        if (!this.isGroupMsg && !this.isCmd)
            logger.trace('[[1;34mRECIVIDO[1;37m]' + '{' + chalk.rgb(255, 131, 0).underline(this.chats || this.type) + '}' + 'De' + this.sender.split('@')[0] + 'Chat' + (this.isGroupMsg ? this.groupName : 'Privado') + 'Fecha' + BotDB.time);
        if (this.isCmd && this.isGroupMsg)
            logger.trace('[[1;32mEJECUTANDO[1;37m]' + '<[' + chalk.rgb(255, 131, 0).underline(this.command) + ']>' + 'Por' + this.pushname + 'En el Grupo' + (this.isGroupMsg ? this.groupName : 'Privado') + 'Fecha' + BotDB.time + '\n[_>]');
        if (!this.isCmd && this.isGroupMsg)
            logger.trace('[\x1b[1;34mRECIVIDO\x1b[1;37m]' + '{' + chalk.rgb(255, 131, 0).underline(this.chats || this.type) + '}' + 'De' + this.sender.split('@')[0] + 'En el Grupo' + (this.isGroupMsg ? this.groupName : 'Privado') + 'Fecha' + BotDB.time);
    }
    getNecessaruBotLevel(handler) {
        let levelNeeded;
        if (handler.UserPermitionsCheckEnabled.bot_perm_creator)
            levelNeeded = BotRoles.CREATOR;
        else {
            if (handler.UserPermitionsCheckEnabled.bot_perm_controller)
                levelNeeded = BotRoles.CONTROLLER;
            else {
                if (handler.UserPermitionsCheckEnabled.bot_perm_owner)
                    levelNeeded = BotRoles.OWNER;
                else {
                    if (handler.UserPermitionsCheckEnabled.bot_perm_admin)
                        levelNeeded = BotRoles.BOTADMIN;
                    else {
                        if (!this.isGroupMsg) {
                            levelNeeded = BotRoles.COMMONUSER;
                        }
                        else { //group
                            if (handler.UserPermitionsCheckEnabled.group_perm_admin)
                                levelNeeded = BotRoles.GROUPADMIN;
                            else {
                                if (handler.UserPermitionsCheckEnabled.group_perm_moderator)
                                    levelNeeded = BotRoles.GROUPMODERATOR;
                                else
                                    levelNeeded = BotRoles.COMMONUSER;
                            }
                        }
                    }
                }
            }
        }
        return levelNeeded;
    }
    /**
     * check if a command can or not run
     * @param handler //the plugin handler that claims to be allowed to run
     * @returns true if the command is allowed to run
     */
    isAllowed(handler) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if it is for owners and moderators
            //check if it is a group
            //check if there is limit
            //check registered
            //if pass all checks. allow to run
            //check if it has more than one media check to act like a or filter instead of a and
            //==========FIRST CHECK PLUGIN LEVEL RESTRICTIONS
            if (CommandManager.isTAGBlockedToRun(this._chat, this._user, handler.tags[0])) {
                yield this.sendMentionedMessage(BotDB.idiomas.NotAllow);
                return Promise.resolve(false);
            }
            if (CommandManager.isCommandBlockedToRun(this._chat, this._user, this.command)) {
                yield this.sendMentionedMessage(BotDB.idiomas.NotAllow);
                return Promise.resolve(false);
            }
            if (!handler)
                return Promise.resolve(false);
            if (!handler.isRunable) {
                yield this.sendMentionedMessage(BotDB.idiomas.NotAllow);
                return Promise.resolve(false);
            }
            //==========SECOND CHECK MODES
            //PlaneModeCheckEnabled = PlaneMode({COMMON:true})
            //RegisterModeCheckEnabled = RegisterMode({REGISTERED:true})
            //OffensiveModeCheckEnabled = OffensiveMode({SFW:true})
            //CHECK Offensive Mode
            if (handler.OffensiveModeCheckEnabled['NFSW'] === true && !this.isNSFWModeOn) {
                yield this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
                return Promise.resolve(false);
            }
            // CCHECK REGISTER MODE
            if (handler.RegisterModeCheckEnabled['REGISTERED'] === true && !this.isREGISTERED && !this.isFromME) {
                yield this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
                return Promise.resolve(false);
            }
            //CHECK PLANE MODE
            if (handler.SecurityModesCheckEnabled['PREMIUM'] === true && !this.isPremiumModeOn) {
                if (this._chat.isPremiumTastingOn) {
                    yield this.sendMentionedMessage(BotDB.idiomas.ModPremiumTasting());
                }
                else {
                    yield this.sendMentionedMessage(BotDB.idiomas.ModPremiumNo());
                    return Promise.resolve(false);
                }
            }
            //CHECK SECURITY modes check
            if (!handler.SecurityModesCheckEnabled.mode_safe) {
                if (handler.SecurityModesCheckEnabled.mode_ban && this.isBanned) {
                    yield this.sendMentionedMessage(BotDB.idiomas.Baneao(this.AtSenderNUMBER));
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_fakes) {
                    yield this.sendMentionedMessage(BotDB.idiomas.ModFakeNo());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_fakesgroup) {
                    yield this.sendMentionedMessage(BotDB.idiomas.ModFakeGrNo());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_blacklist && !this.isBlackListModeOn) {
                    yield this.sendMentionedMessage(BotDB.idiomas.ModBlackListNo());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_fun && !this.isFunModeOn) {
                    yield this.sendMentionedMessage(BotDB.idiomas.ModFunNo());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_virtex && !this.isAntiVirtexModeOn) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoVirtex());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_link) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoLink());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_linkgrou) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoForeign());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_foreign && !this.isForeignModeOn) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoForeign());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_porn) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoPorn());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_image) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoImage());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_video) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoVideo());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_audio) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoAudio());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_words) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoWords());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_flood && !this.isAntiFloodModeOn) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoFlood());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_toxic) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoToxic());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_anti_private) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NoPrivate());
                    return Promise.resolve(false);
                }
                if (handler.SecurityModesCheckEnabled.mode_kick) {
                    yield this.showNotRegisteredMSG(BotDB.idiomas.NokICK());
                    return Promise.resolve(false);
                }
            }
            //CHECK ResourceModesCheckEnabled MODES
            if (handler.ResourceModesCheckEnabled.mode_limitcheck && (this._user.isLimited && !this.isBotController)) {
                yield this.sendMentionedMessage(BotDB.idiomas.SinLimite(this.pushname));
                return Promise.resolve(false);
            }
            if (handler.ResourceModesCheckEnabled.mode_welcome) {
                yield this.sendMentionedMessage(BotDB.idiomas.ModWelcomeNo());
                return Promise.resolve(false);
            }
            if (handler.ResourceModesCheckEnabled.mode_viewonce) {
                yield this.sendMentionedMessage('error not yet messaged');
                return Promise.resolve(false);
            }
            if (handler.ResourceModesCheckEnabled.mode_simi && this.isSIMIModeOn) {
                return Promise.resolve(false);
            }
            if (handler.ResourceModesCheckEnabled.mode_leveling) {
                yield this.sendMentionedMessage(BotDB.idiomas.ModLevelingNo());
                return Promise.resolve(false);
            }
            if (handler.ResourceModesCheckEnabled.mode_afk) {
                yield this.sendMentionedMessage('not yet messaged');
                return Promise.resolve(false);
            }
            if (handler.ResourceModesCheckEnabled.mode_offline && Bot.OnOffLine === true) {
                yield this.sendMentionedMessage(BotDB.idiomas.ModOffYes());
                return Promise.resolve(false);
            }
            //========END MODES CHECK ===========
            /*
              ADMINcheckEnabled: boolean,
              BOTADMINcheckEnabled: boolean,
              CREATORcheckEnabled : boolean,
              MODERATORCheck: boolean,
              OWNERCheck: boolean,
              //user permissions
      UserPermitionsCheckEnabled ={
        bot_perm_controller:false,
        group_perm_admin: false,
        bot_perm_owner: false,
        bot_perm_admin: false,
        group_perm_moderator: false,
        bot_perm_creator: false
      }
            */
            //========START PERMITIONS CHECK ====
            let levelNeeded; //= this.getNecessaruBotLevel(handler)
            if (handler.UserPermitionsCheckEnabled.bot_perm_creator) {
                levelNeeded = BotRoles.CREATOR;
                if (!this.isCREATOR) {
                    yield this.sendMentionedMessage(BotDB.idiomas.SoloCreador());
                    return Promise.resolve(false);
                }
            }
            else {
                if (handler.UserPermitionsCheckEnabled.bot_perm_controller) {
                    levelNeeded = BotRoles.CONTROLLER;
                    if (!this.isCREATOR && !this.isBotController) {
                        yield this.sendMentionedMessage(BotDB.idiomas.SoloCreador());
                        return Promise.resolve(false);
                    }
                }
                else {
                    levelNeeded = BotRoles.OWNER;
                    if (handler.UserPermitionsCheckEnabled.bot_perm_owner) {
                        if (!this.isCREATOR && !this.isBotController && !this.isOwner) {
                            yield this.sendMentionedMessage(BotDB.idiomas.SoloOwner());
                            return Promise.resolve(false);
                        }
                    }
                    else {
                        if (handler.UserPermitionsCheckEnabled.bot_perm_admin) {
                            levelNeeded = BotRoles.BOTADMIN;
                            if (!this.isCREATOR && !this.isBotController && !this.isOwner && !this.isBotAdmin) {
                                yield this.sendMentionedMessage(BotDB.idiomas.AdminBot());
                                return Promise.resolve(false);
                            }
                        }
                        else {
                            if (!this.isGroupMsg) {
                                levelNeeded = BotRoles.COMMONUSER;
                            }
                            else { //group
                                if (handler.UserPermitionsCheckEnabled.group_perm_admin) {
                                    levelNeeded = BotRoles.GROUPADMIN;
                                    if (!this.isAdmin) {
                                        yield this.sendMentionedMessage(BotDB.idiomas.SoloAdm());
                                        return Promise.resolve(false);
                                    }
                                }
                                else {
                                    if (handler.UserPermitionsCheckEnabled.group_perm_moderator) {
                                        levelNeeded = BotRoles.GROUPMODERATOR;
                                        if (!this.isModerator) {
                                            yield this.sendMentionedMessage(BotDB.idiomas.SoloModerator());
                                            return Promise.resolve(false);
                                        }
                                    }
                                    else
                                        levelNeeded = BotRoles.COMMONUSER;
                                }
                            }
                        }
                    }
                }
            }
            /*
            
                  switch(levelNeeded){
                    case BotRoles.CREATOR:
                      if(!this.isCREATOR){
                        await this.sendMentionedMessage(BotDB.idiomas.SoloCreador());
                        return Promise.resolve(false);
                      }
                    case BotRoles.CONTROLLER:
                      if(!this.isBotController){
                        await this.sendMentionedMessage(BotDB.idiomas.SoloCreador());
                        return Promise.resolve(false);
                      }
                     
                    case BotRoles.OWNER:
                    if(!this.isOwner && !this.isBotController && !this.isCREATOR){
                      await this.sendMentionedMessage(BotDB.idiomas.SoloOwner());
                      return Promise.resolve(false);
                    }
                    
                    case BotRoles.BOTADMIN:
                    if(!this.isBotAdmin){
                      await this.sendMentionedMessage(BotDB.idiomas.AdminBot());
                      return Promise.resolve(false);
                    }
                     
                    case BotRoles.GROUPADMIN:
                    if(!this.isAdmin){
                      await this.sendMentionedMessage(BotDB.idiomas.SoloAdm());
                      return Promise.resolve(false);
                    }
                    case BotRoles.GROUPMODERATOR:
                    if(!this.isModerator){
                      await this.sendMentionedMessage(BotDB.idiomas.SoloModerator());
                      return Promise.resolve(false);
                    }
                    case BotRoles.COMMONUSER:
                    break;
                    //case BotRoles.UNKNOWN:
                    //break;
                  }
                  */
            /*
            
            if (handler.UserPermitionsCheckEnabled.group_perm_admin && (!this.isAdmin && !this.isFromME)){
              await this.sendMentionedMessage(BotDB.idiomas.SoloAdm());
              return Promise.resolve(false);
            }
            if (handler.UserPermitionsCheckEnabled.bot_perm_admin && !this.isBotAdmin&& !this.isCREATOR) {
              await this.sendMentionedMessage(BotDB.idiomas.AdminBot());
              return Promise.resolve(false);
            }
            if (handler.UserPermitionsCheckEnabled.bot_perm_creator && !this.isCREATOR) {
              await this.sendMentionedMessage(BotDB.idiomas.SoloCreador());
              return Promise.resolve(false);
            }
            if (handler.UserPermitionsCheckEnabled.bot_perm_owner && !this.isOwner && !this.isCREATOR) {
              await this.sendMentionedMessage(BotDB.idiomas.SoloOwner());
              return Promise.resolve(false);
            }
            if (handler.UserPermitionsCheckEnabled.group_perm_moderator && !this.isModerator && !this.isCREATOR) {
              await this.sendMentionedMessage(BotDB.idiomas.SoloModerator());
              return Promise.resolve(false);
            }
            if (handler.UserPermitionsCheckEnabled.bot_perm_controller && !this.isBotController && !this.isCREATOR) {
              await this.sendMentionedMessage(BotDB.idiomas.SoloCreador());
              return Promise.resolve(false);
            }
          */
            //========END PERMITIONS CHECK ====
            //========START MESAGES CHECK =====
            /*
            //message checks
           QuotedMSGCheck: IQuotedCheck
           GROUPcheckEnabled: boolean,
           PARAMETERCheckEnabled:boolean,
            MessagesCheckEnabled ={
        msg_quoted_check: false,
        msg_group_check: true,
        msg_parameter_check: false
      }*/
            //messages checks
            if (handler.MessagesCheckEnabled.msg_parameter_check && !this.cmdHaveArgs) {
                if (handler.missingArgMsg && handler.missingArgMsg !== '') {
                    yield this.sendMentionedMessage(handler.missingArgMsg);
                    return Promise.resolve(false);
                }
                else {
                    yield this.sendMentionedMessage(handler.usage);
                    return Promise.resolve(false);
                }
            }
            if (handler.MessagesCheckEnabled.msg_group_check && !this.isGroupMsg) {
                yield this.sendMentionedMessage(BotDB.idiomas.SoloGp());
                return Promise.resolve(false);
            }
            // MessagesCheckEnabled. msg_quoted_check
            if ((handler.QuotedMSGCheck.enabled && handler.QuotedMSGCheck.type === EQuotedReturnEnum.ANY) && !this.isQuotedMsg) {
                yield this.sendMentionedMessage(handler.usage);
                return Promise.resolve(false);
            }
            if ((handler.QuotedMSGCheck.enabled && handler.QuotedMSGCheck.type === EQuotedReturnEnum.AUD) && !this.isQuotedAudio) {
                yield this.sendMentionedMessage(handler.usage);
                return Promise.resolve(false);
            }
            if ((handler.QuotedMSGCheck.enabled && handler.QuotedMSGCheck.type === EQuotedReturnEnum.VID) && !this.isQuotedVideo) {
                yield this.sendMentionedMessage(handler.usage);
                return Promise.resolve(false);
            }
            if ((handler.QuotedMSGCheck.enabled && handler.QuotedMSGCheck.type === EQuotedReturnEnum.IMG) && !this.isQuotedImage) {
                yield this.sendMentionedMessage(handler.usage);
                return Promise.resolve(false);
            }
            if ((handler.QuotedMSGCheck.enabled && handler.QuotedMSGCheck.type === EQuotedReturnEnum.STK) && !this.isQuotedSticker) {
                yield this.sendMentionedMessage(handler.usage);
                return Promise.resolve(false);
            }
            if ((handler.QuotedMSGCheck.enabled && handler.QuotedMSGCheck.type === EQuotedReturnEnum.NONE) && !this.isQuotedMsg)
                return Promise.resolve(false);
            //========END MESAGES CHECKS =====
            //========START MEDIA CHECKS =====
            /*
            //media checks
              VIDEOcheckEnabled: boolean,
              STICKERcheckEnabled: boolean,
              AUDIOcheckEnabled: boolean,
              IMAGEcheckEnabled: boolean,
              WEBPcheckEnabled: boolean,
      
              // Media Checks
              MediaCheckEnabled = {
                media_video: false,
                media_sticker: false,
                media_audio: false,
                media_image : false,
                media_webp  : false
              }
            */
            let mediacheckCount = 0;
            if (handler.MediaCheckEnabled.media_video)
                mediacheckCount++;
            if (handler.MediaCheckEnabled.media_sticker)
                mediacheckCount++;
            if (handler.MediaCheckEnabled.media_audio)
                mediacheckCount++;
            if (handler.MediaCheckEnabled.media_image)
                mediacheckCount++;
            if (handler.MediaCheckEnabled.media_webp)
                mediacheckCount++;
            if (mediacheckCount > 0 && this.isMedia) {
                let ORCheck = false;
                if (handler.MediaCheckEnabled.media_video && (this.quoted.mtype === 'videoMessage')) {
                    ORCheck = true;
                }
                if (handler.MediaCheckEnabled.media_audio && (this.quoted.mtype === 'audioMessage')) {
                    ORCheck = true;
                }
                if (handler.MediaCheckEnabled.media_image && (/image/).test(this.mime)) {
                    ORCheck = true;
                }
                if (handler.MediaCheckEnabled.media_webp && (/webp/).test(this.mime)) {
                    ORCheck = true;
                }
                if (handler.MediaCheckEnabled.media_sticker && (this.quoted.mtype === 'stickerMessage')) {
                    ORCheck = true;
                }
                if (!ORCheck) {
                    yield this.sendMentionedMessage(handler.usage);
                    return Promise.resolve(false);
                }
            }
            else if (mediacheckCount > 0 && !this.isMedia) {
                yield this.sendMentionedMessage(handler.usage);
                return Promise.resolve(false);
            }
            return Promise.resolve(true);
        });
    }
    //run default check for all messages
    //check antivirtex
    // Ant Private Mode is True. Private Chat with Bot is prohibited
    //antilink
    //antilinkgroup
    // =>
    // >
    //$
    //simi
    default() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkVirtex();
            if (this._isGroupMsg) {
                this.groupChecks();
                this.checkGroupSpan();
                yield this.checkAntiLinkGroup();
            }
            else {
                this.checkSpan();
                yield this.checkAntiLink();
                yield this.checkPrivateChat();
            }
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /**
                 * se eu estiver banido, ou a mensagem não for minha, ou eu não sou dono nem criador do bot, retorna
                 */
                if (this.isBanModeOn && !this.isFromME && !this.isOwner && !this.isCREATOR)
                    return;
                if (!this._msg.message)
                    return;
                if (this._msg.key && this._msg.key.remoteJid === 'status@broadcast')
                    return;
                //run default check for all messages
                yield this.default();
                this.logCommands();
                //Count msg received
                this.updateMsgStats();
                this._stat.messages++;
                BotDB._botStats.messages++;
                //========custom bot messages===========
                let myDate = 0;
                if ((new Date().valueOf() * 1 - myDate) > 1000) {
                    let uptime = yield BotDB.runtime;
                    yield this._client.query({
                        'tag': 'iq',
                        'attrs': {
                            'to': '@s.whatsapp.net',
                            'type': `set`,
                            'xmlns': 'status'
                        },
                        'content': [{
                                'tag': `status`,
                                'attrs': {},
                                'content': Buffer.from(`<[ ${Bot.botName} ]>` + uptime, `utf-8`)
                            }]
                    }).catch(err => err);
                    myDate = new Date().valueOf() * 1;
                }
                //Test Public/Private MODE
                if (!this.isFromME && !this.isBotController && Bot.isBodaoMode === true)
                    return;
                if (this.isCmd) {
                    //BotDB.todayHits++
                    this._stat.todayHits++;
                    this._stat.commandUse = this.command;
                    BotDB._botStats.todayHits++;
                    BotDB._botStats.commandUse = this.command;
                    //BotDB.updateStats()
                    // Command hits count
                    //const searchIndex = PluginManager._plugins.findIndex((hand) => {
                    //  return hand.command===this.command
                    // });
                    var object = PluginManager.getPluginForCommand(this.command);
                    let myType = typeof object[0];
                    let allowed = false;
                    if (myType === 'object')
                        allowed = yield this.isAllowed(object[0]);
                    if (Array.isArray(object) && myType === 'object' && allowed) {
                        this._commandFound = true;
                        yield object[0].handler(this); //,{b:BotDB,u:Utils,l:LibraryDB,c:baileys})
                    }
                    else if (myType === 'undefined') {
                        //meta
                        //download commands
                        this._commandHandlers.forEach((a) => {
                            const hand = a;
                            if (!this._commandFound)
                                hand.handler();
                        });
                        if (!this._commandFound)
                            yield this.sendMentionedMessage(__('command not found'));
                    }
                    //for (let name in PluginManager._plugins) {
                    //instance creation here
                    //const instance = PluginManager._plugins[name]
                    //instance.handler(this)
                    //}
                    //typescript: https://newbedev.com/dynamically-loading-a-typescript-class-reflection-for-typescript
                    //var loader = new InstanceLoader(PluginManager._plugins);
                    //var example = /*<IExample>*/ loader.getInstance(name, 'A', 'B');
                    //alert(example.handler());
                    //}
                }
                else
                    this._notCommandHandlers.forEach((a) => __awaiter(this, void 0, void 0, function* () { yield a.handler(); }));
                //this._stat.save()
                //BotDB._botStats.save()
                Stats.saveStats();
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    /**
     *
     * @param myObj
     * @returns a promessa de devolver uma url da imagem
     */
    static picSender(myObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sender = myObj._isGroupMsg ? (myObj._msg.key.participant ? myObj._msg.key.participant : myObj._msg.participant) : myObj._msg.key.remoteJid;
                if (sender) {
                    if (Group._isGroup(sender) || Chat.isChat(sender)) {
                        let mypic = yield myObj._client.profilePictureUrl(sender); //hd image:profilePictureUrl(sender, 'image')
                        if (mypic)
                            return mypic;
                    }
                    return null;
                }
                else
                    throw "Sender null";
            }
            catch (err) {
                logger.error(err);
                return null;
            }
        });
    }
    get stickerMetadata() { return { pack: 'Created with', author: 'BodãoBot', keepScale: true }; }
    get stickerMetadataCircle() { return { pack: 'Created with', author: 'BodãoBot', circle: true }; }
    get stickerMetadataCrop() { return { pack: 'Created with', author: 'BodãoBot', cropPosition: 'center' }; }
    /* is the BotAdmin*/
    //cglobal is the one who read the QrCode
    get cglobal() { return this._botNumber; }
    //botNumber is the one who read the QrCode
    get botNumber() { return this._botNumber; }
    get isSenderGroupAdmin() { return this._chat.group ? this._chat.group._isGroupAdm : false; }
    get isBotGroupAdmin() { return this._chat.group ? this._chat.group._isBotGroupAdmin : false; }
    get isSPAMFiltered() { return this._isSPAMFiltered; }
    get addSPAMFilter() { return this._addSPAMFilter; }
    get globalThumb() { return this._globalThumb; }
    get picThumb() { return this._picThumb; }
    get sendThumb() { return this._sendThumb ? this._sendThumb : new Buffer(''); }
    get NameBot() { return this._NameBot; }
    get AtSenderNUMBER() { return this._AtSenderNUMBER; }
    get botControllers() { return this._botControllers; }
    get quoted() { return this._quoted; }
    /*ok*/ get quotedMsg() { return this._quoted; }
    /**
    * Body  of message
    *
    * @description: The body of the message. If the message type is chat , body will be the text of the chat.
    * If the message type is some sort of media, then this body will be the thumbnail of the media.
    */
    /*ok*/ get body() { return this._body ? this._body : false; }
    /*ok*/ get chats() { return this._chats; }
    /**
     * Gets chat id
     * * A chat id ends with `@c.us` or `@g.us` for group chats.
     *
     * @example A group chat: `"447123456789-1445627445@g.us"`
     * @example A group chat: `"447123456789@g.us"`
     *
     */
    /*ok*/ get chatId() { return this._from; }
    /*ok*/ get from() { return this._from; }
    /* when is group groupID = from )*/
    /*ok*/ get groupId() { return this._isGroupMsg ? this._chat.group ? this._chat.group.id : '' : ''; }
    get groupMetadata() { return this._isGroupMsg ? this._chat.group ? this._chat.group.metadata : Object.assign({}, Group.defaultMetaData) : Object.assign({}, Group.defaultMetaData); }
    /** this groupId is the same as this._from */
    /**
     * Gets type
     * @description  The type of the message, see [[MessageTypes]]
    */
    /*ok*/ get type() { return this._type; }
    /*ok*/ get args() { return this._args; }
    /*ok*/ get arg() { return this._arg; }
    get arg0() { return this._arg0; }
    /*ok*/ get arg1() { return this._arg1; }
    get arg2() { return this._arg2; }
    // args in lower case format
    get argsLC() { return this._args.map(a => a.toLowerCase()); }
    /*ok*/ get ar() { return this._ar; }
    /**
     * Gets mimetype
     */
    get mime() { return this._mimetype; }
    /**
     * Gets mimetype
     */
    /*ok*/ get mimetype() { return this._mimetype; }
    /*ok*/ get isGroupMsg() { return this._isGroupMsg; }
    /*ok*/ get sender() { return this._sender; }
    get senderNUMBER() { return this._senderNUMBER; }
    /**
     * Gets mentioned jid list
     * @description A Set of all mentioned numbers in this message.
    */
    get jids() { return this._jids; }
    /*ok*/ get mentionedJidList() { return this._jids; }
    get mentionedIds() { return this._jids; }
    get msg_serial() { return this._msg_serial; }
    get messageC() { return this._body.slice(0).trim().split(/ +/).shift().toLowerCase(); } //Args
    /*ok*/ get command() { return this._body.startsWith(Bot.prefix) ? this._body.replace(Bot.prefix, '').trim().split(/ +/).shift().toLowerCase() : ''; }
    get commandWithPrefix() { return this._chats.slice(0).trim().split(/ +/).shift().toLowerCase(); }
    /*ok*/ get isCmd() { var _b; return (_b = this._body) === null || _b === void 0 ? void 0 : _b.startsWith(Bot.prefix); }
    get content() { return JSON.stringify(this._msg.message); }
    /**
     * Gets message
     * @description The message object
     */
    /*ok*/ get message() { return this._msg.message; }
    get _0xec3b62() { return this._type === 'conversation' && this._msg.message.conversation.startsWith(Bot.prefix) ? this._msg.message.conversation : this._type == 'imageMessage' && this._msg.message[this._type].caption.startsWith(Bot.prefix) ? this._msg.message[this._type].caption : this._type == 'videoMessage' && this._msg.message[this._type].caption.startsWith(Bot.prefix) ? this._msg.message[this._type].caption : (this._type == 'extendedTextMessage') && this._msg.message[this._type].text.startsWith(Bot.prefix) ? this._msg.message[this._type].text : this._type == 'buttonsResponseMessage' ? this._msg.message.buttonsResponseMessage['selectedButtonId'] : this._type == 'listResponseMessage' ? this._msg.message.listResponseMessage.singleSelectReply['selectedRowId'] : this._type == 'templateButtonReplyMessage' ? this._msg.message.templateButtonReplyMessage.selectedId : this._type === 'messageContextInfo' ? this._msg.message.buttonsResponseMessage.selectedButtonId : ''; }
    get msg() { return this._msg; }
    get conversation() { return this._msg.text ? this._msg.text : this._msg.message.conversation; }
    /**
     * the arguments for the currente command, if it is a command
     */
    /*ok*/ get q() { return this.args.length > 0 ? this._args.join(' ') : null; }
    get url() { return this._url; }
    get id() { return this._msg.key.id; }
    get messageID() { return this._msg.kei.id; }
    get duration() { return this.quotedMsg ? this.quotedMsg.duration : this.message.duration; }
    /**
     * return true if it is a command with arguments
     */
    get cmdHaveArgs() { return !(this._args.join(' ') === ''); }
    get isCREATOR() { return (Bot.CREATOR_NUMBER + '@s.whatsapp.net') === this._sender; }
    get isFromME() { return this._isFromME; }
    get isModerator() { return this._isModerator; }
    /*ok*/ get isOwner() { return Bot.ownerNumber.includes(this._sender); }
    get isBotController() { var _b; return (_b = this._botControllers) === null || _b === void 0 ? void 0 : _b.includes(this._sender); }
    /**
     * Gets pushname
     * @description  verifiedName is the name of someone who uses a business account
     */
    /*ok*/ get pushname() { return this._user.pushName; }
    /*ok*/ get t() { return this._msg.messageTimestamp; }
    get time() { return this._msg.messageTimestamp; }
    get groupOwner() { var _b; return this._isGroupMsg ? (_b = this._chat.group) === null || _b === void 0 ? void 0 : _b.metadata.owner : String(''); }
    get groupDesc() { var _b; return this._isGroupMsg ? (_b = this._chat.group) === null || _b === void 0 ? void 0 : _b.metadata.desc : String(''); }
    get groupName() { var _b; return this._isGroupMsg ? (_b = this._chat.group) === null || _b === void 0 ? void 0 : _b.metadata.subject : String(''); }
    get groupMembers() { var _b, _c; return this._isGroupMsg ? (_c = (_b = this.chatId) === null || _b === void 0 ? void 0 : _b.group) === null || _c === void 0 ? void 0 : _c.participants : []; }
    get groupAdmins() { var _b, _c, _d; return this._isGroupMsg ? ((_b = this._chat) === null || _b === void 0 ? void 0 : _b.group) ? (_d = (_c = this._chat) === null || _c === void 0 ? void 0 : _c.group) === null || _d === void 0 ? void 0 : _d.groupAdmins : [] : []; }
    get isBotAdmin() { return this._isGroupMsg ? this._chat.group ? this._chat.group.isBotAdmin(this.botNumber) : false : false; }
    /**
     * Check if is the Sender of the message admin
     * @date 15/07/2022 - 23:18:24
     *
     * @readonly
     * @type {*}
     */
    get isAdmin() { return this._isGroupMsg ? this._chat.group ? this._chat.group.isSenderAdmin(this._sender) : false : false; }
    get isLevelinModeOn() { return this._isGroupMsg ? this._chat.isLevelingOn : false; }
    /**
     * AntiLink mode. It is not allowed to share links
     * return true if AntiLink mode  is enabled for this chat
     */
    get isAntiLinkModeOn() { return this._isGroupMsg ? this._chat.isAntiLinkOn : false; }
    /**
     * return true if is a Link Message
     */
    get isLinkMSG() {
        var _b;
        let link = false;
        if (!this._body || !this._chats)
            return link;
        if (((_b = this.body) === null || _b === void 0 ? void 0 : _b.match(/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/gi)) !== null) {
            link = true;
        }
        if (this._chats.includes('https://') || this._chats.includes(`http://`)) {
            link = true;
        }
        return link;
    }
    /**
     * AntiLinkGroup mode. It is not allowed to share links of WhatsApp os other Groups
     * return true if AntiLinkGroup mode is enabled for this chat
     */
    get isAntiLinkGroupModeOn() { return this._isGroupMsg ? this._chat.isAntiLinkGroupOn : false; }
    /**
     * return true is if it is a LinkGroup Message
     */
    get isGroupLinkMSG() {
        var _b;
        let ret = false;
        if (((_b = this._body) === null || _b === void 0 ? void 0 : _b.match(/chat\.whatsapp\.com/gi)) !== null) {
            ret = true;
        }
        if (this.chats.includes(`chat.whatsapp.com`) || (this.chats.includes(`getsnap.link`)
            || (this.chats.includes(`m.kwai.me`) || (this.chats.includes(`instagram.com`)
                || (this.chats.includes('t.me') || (this.chats.includes('whatsthemes.com')
                    || (this.chats.includes(`nysL.com`) || (this.chats.includes(`discord.gg`)
                        || this.chats.includes(`getsnap.link`))))))))) {
            ret = true;
        }
        return ret;
    }
    get isWelcomeModeOn() { return this._isGroupMsg ? this._chat.isWelcomeOn : false; }
    get isAntifakes1() { return this._isGroupMsg ? this._chat.isAntiFakeOn : false; }
    get isAntifakes2() { return this._isGroupMsg ? this._chat.isAntiFakeGroupOn : false; }
    get isAntitoxicModeOn() { return this._isGroupMsg ? this._chat.isAntitoxicOn : false; }
    ;
    get isToxic() { return this._isToxic; }
    get isAntiImageModeOn() { return this._isGroupMsg ? this._chat.isAntiImageOn : false; }
    ;
    get isAntiAudioModeOn() { return this._isGroupMsg ? this._chat.isAntiAudioOn : false; }
    ;
    /**Todo: check if this message is classified in the antiword feature */
    get isAntiWord() { return false; }
    get isAntiWordsModeOn() { return this._isGroupMsg ? this._chat.isAntiWordsOn : false; }
    ;
    get isAntiPornModeOn() { return this._isGroupMsg ? this._chat.isAntiPornOn : false; }
    ;
    /**
     * return true if virtex mode is enabled and this is a long message
     */
    get isVirtexMSG() {
        //if(msg.type == 'location') msg.body = ''
        // if(msg.type == 'vCard' || msg.type == 'multi_vcard') msg.body == ''
        //if(msg.type == 'oversized') return true
        if (this.isAntiVirtexModeOn && !this._msg.key.fromMe) {
            //message lenght > 1200 characters
            if (this.chats.length > Bot.virtextSize)
                return true;
        }
        return false;
    }
    get isAntiVideoModOn() { return this._isGroupMsg ? this._chat.isAntiVideoOn : false; }
    get isAntiVirtexModeOn() { return this._isGroupMsg ? this._chat.isAntiVirtexOn : false; }
    get isAntiFloodModeOn() { return this._isGroupMsg ? this._chat.isAntiFloodOn : false; }
    ;
    get isSIMIModeOn() { return this._isGroupMsg ? this._chat.isSimiOn : false; }
    get isPremiumModeOn() { return this._isGroupMsg ? this._chat.isPremiumOn : false; }
    get isBlackListModeOn() { return this._isGroupMsg ? this._chat.isBlackListOn : false; }
    ;
    get isBlackListed() { return BotDB.blackList.includes(this.sender); }
    get isBanned() { return this._chat.isBannedModeOn ? this._user.isBanned : false; }
    get isKickModeOn() { return this._isGroupMsg ? this._chat.isKickModeOn : false; }
    get isForeignModeOn() { return this._isGroupMsg ? this._chat.isForeignOn : false; }
    get isAnimeModeOn() { return this._isGroupMsg ? this._chat.isAnimeOn : false; }
    get isFunModeOn() { return this._isGroupMsg ? this._chat.isDiversionOn : false; }
    get isNSFWModeOn() { return this._isGroupMsg ? this._chat.isNSFWOn : false; }
    get isBanModeOn() { return this._chat.isBannedModeOn; }
    get isPorn() { return false; }
    //user
    get isREGISTERED() { return this._user.isRegistered; }
    get isAFK() { return this._user.isAFK; }
    get _0x4e5640() { return this.type == 'extendedTextMessage'; }
    /*ok*/ get isMedia() { return /image|video|sticker|audio/.test(this._mimetype); }
    get isMedia2() { return this.type === "imageMessage" || this.type === "videoMessage"; }
    get isQuotedMsg() { return this.type === 'extendedTextMessage'; }
    /*ok*/ get isQuotedImage() { return this.type === 'extendedTextMessage' && this.content.includes('imageMessage'); }
    /*ok*/ get isQuotedVideo() { return this.type === 'extendedTextMessage' && this.content.includes('videoMessage'); }
    /*ok*/ get isQuotedAudio() { return this.type === 'extendedTextMessage' && this.content.includes('audioMessage'); }
    /*ok*/ get isQuotedSticker() { return this.type === 'extendedTextMessage' && this.content.includes('stickerMessage'); }
    get isQuotedDoc() { return this.type === 'extendedTextMessage' && this.content.includes('documentMessage'); }
    get isImage() { return this.type === 'stickerMessage' || this.type === 'imageMessage' || (/image/).test(this.mime) || this.isQuotedSticker || this.isQuotedImage; }
    get isDoc() { return this.type === 'documentMessage' || this.isQuotedDoc; }
    get isWebP() { return (/webp/).test(this.mime) || this.isQuotedAudio; }
    get isVideo() { return this.type === 'videoMessage' || (/video/).test(this.mime) || this.isQuotedVideo; }
    get isAudio() { return this.type === 'audioMessage' || (/audio/).test(this.mime) || this.isQuotedAudio; }
    get isLink() {
        let urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return this._body.match(urlRegex);
    }
    get isSticker() { return this.type === 'stickerMessage' || this.isQuotedSticker; }
    //======================
    //======================
    /**
     * Gets whether is quoted chat (if this is a reply message and is a conversation (not media))
     */
    /*ok*/ get isQuotedChat() { return this._quoted ? this._quoted.mtype === 'conversation' : false; }
    /*missing isQuoted
   
    get isQuotedLocation() { return this._quotedMsg?.type === 'location'}
    get isQuotedDocs() { return this._quotedMsg?.type === 'document'}
    get isQuotedPtt() { return this._quotedMsg?.type === 'ptt'}
    get isQuotedPng() { return this.isQuotedDocs && this._quotedMsg.filename.includes('.png')}
    get isQuotedWebp() { return this.isQuotedDocs && this._quotedMsg.filename.includes('.webp')}
    get isQuotedGif() { return this._quotedMsg && this._quotedMsg.mimetype === 'image/gif'}
    get isQuotedVoice() { return this._quotedMsg && this._quotedMsg.type === 'ptt'}
   */
    get BodaoBotURL() { return this.selectRamdomFromArray(BotDB._siteArray); }
    // end not used objects
    get msgQuote() {
        return ({
            'key': {
                'remoteJid': this._from,
                'fromMe': false,
                'id': this._msg.key.id,
                'participant': this._sender
            },
            'message': {
                'conversation': this.conversation
            }
        }) ? this._msg : this._msg;
    }
    get msgQuoteWithLogo() {
        return {
            'key': {
                'participant': '0@s.whatsapp.net',
                'remoteJid': '0@s.whatsapp.net'
            },
            'message': {
                'groupInviteMessage': {
                    'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                    'inviteCode': 'm',
                    'groupName': 'P',
                    'caption': '' + this._NameBot,
                    'jpegThumbnail': BotDB.images.logo
                }
            }
        };
    }
    get audioQuote() {
        return {
            'key': Object.assign({ 'participant': '0@s.whatsapp.net' }, this._from ? {
                'remoteJid': Bot._2_QUANTUM_BOT_GROUP_ID
            } : {}),
            'message': {
                'audioMessage': {
                    'mimetype': 'audio/ogg; codecs=opus',
                    'seconds': 359996400,
                    'ptt': 'true'
                }
            }
        };
    }
    get activationChoiceButtons() {
        return [{
                'quickReplyButton': {
                    'displayText': '< [ ' + BotDB.idiomas.ActiVar() + ' ] >',
                    'id': Bot.prefix + this.command + ' on'
                }
            }, {
                'quickReplyButton': {
                    'displayText': '< [ ' + BotDB.idiomas.DesActiVar() + ' ] >',
                    'id': Bot.prefix + this.command + ` off`
                }
            }];
    }
    get usedMem() { return process.memoryUsage(); }
    get cpuInfo() {
        var myCPU;
        return os.cpus().map(cpu => {
            myCPU = cpu;
            myCPU.total = Object.keys(cpu.times).reduce((_0x2c7344, _0x4fbc2b) => _0x2c7344 + cpu.times[_0x4fbc2b], 0);
            return myCPU;
        });
    }
    get myCPUInfo() {
        return this.cpuInfo.reduce((_0x46169f, _0x5ae406, _0x21b6db, { length: _0x15a410 }) => {
            return (_0x46169f.total += _0x5ae406.total, _0x46169f.speed += _0x5ae406.speed / _0x15a410, _0x46169f.times.user += _0x5ae406.times.user, _0x46169f.times.nice += _0x5ae406.times.nice, _0x46169f.times.sys += _0x5ae406.times.sys, _0x46169f.times.idle += _0x5ae406.times.idle, _0x46169f.times.irq += _0x5ae406.times.irq, _0x46169f);
        }, {
            'speed': 0,
            'total': 0,
            'times': {
                'user': 0,
                'nice': 0,
                'sys': 0,
                'idle': 0,
                'irq': 0x0
            }
        });
    }
    get role() { return this._user.getRole(this._from); }
    ;
    get role2() { return this._user.getRole2(this._from); }
    ;
    get levelBar() { return this._user.getLevelBar(this._from); }
    ;
    //===arguments======
    /**
     * @return true if there is no argument
     */
    hasNoArg() {
        return this.args.length == 0;
    }
    /**
     *
     * @param {*} number the number of arguments to check against
     * @returns true if the number of arguments is the same as the requested
     */
    numberOfArgs(number) {
        return this._args.length === number;
    }
    /**
     *
     * @param {*} argument argument to check against the first arg
     * @returns true if parameter is equal ar[0]
     */
    checkFirstArg(argument) {
        return this._ar[0] === argument;
    }
    showButtonsChoice(user, header, footer, buttons) {
        return this._client.sendMessage(user, {
            'text': header,
            'mentions': [this._sender],
            'footer': footer,
            'templateButtons': buttons
        }, {
            'quoted': this.msgQuote
        });
    }
    selectRamdomFromArray(myArray) {
        const index = Math.floor(Math.random() * myArray.length);
        const choice = myArray[index];
        return choice;
    }
    sendText(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                Promise.reject('no Txt');
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
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
                                'caption': '[ ! ]' + this.pushname + '[ ! ]',
                                'jpegThumbnail': BotDB.images.exclamation
                            }
                        }
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    mySendMessage(txt) {
        if (!txt)
            return;
        this._client.sendMessage(this._from, {
            'text': txt,
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
                        'caption': '[ ! ]' + this.pushname + '[ ! ]',
                        'jpegThumbnail': BotDB.images.exclamation
                    }
                }
            }
        }).catch(err => {
            Utils.treatError(err, logger);
            this.printError(err);
            return;
        });
    }
    /**
    * @param {String} url url: Link que você deseja enviar
    * @param {String} caption Caption
    * @param {Object} mdataOpts mdataOpts: (opcional) opções de envio
    * @param {Object} mimetype the mime type of the file
    * @returns
    */
    sendFileFromUrl(url, caption, mdataOpts = {}, mimetype) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isURL(url))
                return Promise.reject('Not a Url');
            var buffer = yield Utils.getBuffer(url);
            //console.log(mdata.name)
            //let mdata2 = new MessageMedia(mdata.mimetype,mdata.data,fname)
            //if (!mdataOpts.quotedMessageId) mdataOpts.quotedMessageId = msg.id._serialized
            if (mimetype === 'image') {
                this._client.sendMessage(this._from, {
                    'image': buffer,
                    'jpegThumbnail': BotDB._imgMyAnime,
                    'caption': BotDB.idiomas.ImageRequestedBy(this.command, this.AtSenderNUMBER),
                    'fileLength': 737000000000000,
                    'mentions': [this._sender]
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': {
                        'key': {
                            'fromMe': false,
                            'participant': '0@s.whatsapp.net',
                            'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
                        },
                        'message': {
                            'orderMessage': {
                                'itemCount': 737,
                                'status': 200,
                                'thumbnail': this.sendThumb,
                                'surface': 200,
                                'message': this.pushname + ` [_>] ` + caption,
                                'orderTitle': Bot.packWm,
                                'sellerJid': '0@s.whatsapp.net'
                            }
                        }
                    }
                });
            }
            else {
                return this._client.sendMessage(this._from, {
                    'audio': buffer,
                    'fileName': caption,
                    'mimetype': mimetype,
                    'ptt': true
                }, {
                    'quoted': this.msgQuote
                });
            }
        });
    }
    /**
    * Sends a file from the Url or custom options
    * @param url string https://i.giphy.com/media/oYtVHSxngR3lC/200w.mp4
    * @param caption string xxxxx
    * @param filename string 'video.mp4'
    * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
    * @param sendWait true to send a wait message
    */
    sendFFU(url, caption = '', filename = '', requestConfig = {}, sendWait = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isURL(url))
                return Promise.reject('Not a Url');
            try {
                if (sendWait)
                    this.showWaitMessage(BotDB.idiomas.wait());
                if (!caption)
                    caption = '';
                if (!filename)
                    filename = '';
                return yield this.sendFileFromUrl(url, caption, {}, 'image');
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    printError(error, sendToOwner = true, senderIDror = true) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let e = '';
                let errMsg = '';
                if (typeof error === "string") {
                    logger.error(error);
                    e = error;
                    errMsg = `${error}`;
                }
                else if (error instanceof Error) {
                    logger.error(error);
                    e = error.message;
                    errMsg = `${error.name} ${error.message}`;
                }
                if (!errMsg.includes("Connection Closed")) {
                    let errorText = (BotDB.idiomas.Erreply() + nl + e); //.replace(/['‘’"“”]/g, '')
                    if (senderIDror)
                        yield this.mySendMessage(errorText);
                    let cropErr = errMsg.length > 100 ? errMsg.substr(0, 100) + '...' : errMsg;
                    const err = '[ERR>] ' + " { " + this._croppedChats + " } " + e;
                    //console.log.error(err)
                    errorText = (`{ ${this.chats} }\n${cropErr}`); //.replace(/['‘’"“”]/g, '')
                    const myAdminMsg = {
                        'text': errorText
                    };
                    if (sendToOwner) {
                        yield this._client.sendMessage(Bot.ownerNumber, myAdminMsg);
                    }
                }
                return;
            }
            catch (err) {
                Utils.treatError(err, logger);
                return;
            }
        });
    }
    // send a mentions message
    //const sentMsg  = await conn.sendMessage(id, { text: '@12345678901', mentions: ['12345678901@s.whatsapp.net'] })
    sendMentionedMessage(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                return Promise.reject();
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
                    'contextInfo': {
                        'mentionedJid': [...txt.matchAll(/@(\d{0,16})/g)].map(n => n[1] + '@s.whatsapp.net')
                    }
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': this.msgQuote
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showProcessingMsg(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                Promise.reject('no Txt');
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
                    'mentions': [this._sender]
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': {
                        'key': {
                            'participant': '0@s.whatsapp.net'
                        },
                        'message': {
                            'documentMessage': {
                                'title': `♻️ ` + this._NameBot + `
    📲 ` + this.pushname,
                                'jpegThumbnail': fs.readFileSync('./multimedia/images/ProcesHd.jpg')
                            }
                        }
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    reply(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                Promise.reject('no Txt');
            return yield this.mySendMessage(txt);
        });
    }
    // send a reply messagge
    //const sentMsg  = await conn.sendMessage(id, { text: 'oh hello there' }, { quoted: message })
    sendReplyWithPicThumb(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                Promise.reject('no Txt');
            try {
                const msg = {
                    'text': txt,
                    'mentions': [this._sender]
                };
                const options = {
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
                                'caption': '' + Utils.dateComplete,
                                'jpegThumbnail': this.picThumb
                            }
                        }
                    }
                };
                return yield this._client.sendMessage(this._from, msg, options);
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showMessageOK(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                Promise.reject('no Txt');
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
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
                                'caption': '' + Utils.dateComplete,
                                'jpegThumbnail': BotDB._imgOK
                            }
                        }
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    sendMessageCOMMAND(image, thumbNail, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image || !Buffer.isBuffer(image))
                return Promise.reject('no image');
            //using myoption1 generates error
            //todo: solve it
            try {
                const myOption1 = {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': {
                        'key': {
                            'fromMe': false,
                            'participant': '0@s.whatsapp.net',
                            'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
                        },
                        'message': {
                            'orderMessage': {
                                'itemCount': 737,
                                'status': 200,
                                'thumbnail': this.sendThumb,
                                'surface': 200,
                                'message': this.pushname + ` [_>] ` + this.command,
                                'orderTitle': Bot.packWm,
                                'sellerJid': '0@s.whatsapp.net'
                            }
                        }
                    }
                };
                const myOption = {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': this.msg
                };
                return yield this._client.sendMessage(this._from, {
                    'image': image,
                    'jpegThumbnail': thumbNail,
                    'caption': caption,
                    'mentions': [this._sender]
                }, myOption);
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showNotRegisteredMSG(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                return Promise.reject('no Txt');
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
                    'contextInfo': {
                        'externalAdReply': {
                            'title': BotDB.idiomas['NoReg'](this.pushname),
                            'body': BotDB.idiomas['PreFijo']() + (' " ' + Bot.prefix + ' \"'),
                            'previewType': 'PHOTO',
                            'thumbnailUrl': '',
                            'thumbnail': BotDB.images.logo,
                            'sourceUrl': '' + this.BodaoBotURL,
                            'mentions': [this._sender]
                        }
                    }
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': this.msgQuote
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showWaitMessage(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                return Promise.reject('no Txt');
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
                    'mentions': [this._sender]
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': {
                        'key': {
                            'participant': '0@s.whatsapp.net'
                        },
                        'message': {
                            'documentMessage': {
                                'title': '🎨 ' + this._NameBot + nl + `📲 ` + this.pushname,
                                'jpegThumbnail': fs.readFileSync('./multimedia/images/DesignHD.jpg')
                            }
                        }
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showWaitMessage2(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                return Promise.reject('no Txt');
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
                    'mentions': [this._sender]
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': {
                        'key': {
                            'participant': '0@s.whatsapp.net'
                        },
                        'message': {
                            'documentMessage': {
                                'title': `🧰 ` + this._NameBot + nl + `📲 ` + this.pushname,
                                'jpegThumbnail': fs.readFileSync(`./multimedia/images/WorkingHD.jpg`)
                            }
                        }
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showSearchingMessage(txt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!txt)
                return Promise.reject('no Txt');
            try {
                return yield this._client.sendMessage(this._from, {
                    'text': txt,
                    'mentions': [this._sender]
                }, {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': {
                        'key': {
                            'participant': '0@s.whatsapp.net'
                        },
                        'message': {
                            'documentMessage': {
                                'title': `🔎 ` + this._NameBot + '\x0a📲 ' + this.pushname,
                                'jpegThumbnail': fs.readFileSync(`./multimedia/images/BusquedaHD.jpg`)
                            }
                        }
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showImageFromURLWithPushName(imageURL, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!imageURL)
                return Promise.reject('no imageURL');
            try {
                return yield this._client.sendMessage(this._from, {
                    'image': {
                        'url': imageURL
                    },
                    'jpegThumbnail': BotDB.mythumb,
                    'caption': caption,
                    'mentions': [this._sender]
                }, {
                    'quoted': {
                        'key': {
                            'fromMe': false,
                            'participant': '0@s.whatsapp.net',
                            'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
                        },
                        'message': {
                            'orderMessage': {
                                'itemCount': 737,
                                'status': 200,
                                'thumbnail': this.globalThumb,
                                'surface': 200,
                                'message': this.pushname + ' => ' + this.q,
                                'orderTitle': Bot.packWm,
                                'sellerJid': '0@s.whatsapp.net'
                            }
                        }
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    showimageMessageWithCommand(image, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!image || !Buffer.isBuffer(image))
                return Promise.reject('no image');
            try {
                return yield this._client.sendMessage(this._from, {
                    'image': image,
                    'jpegThumbnail': BotDB.mythumb,
                    'caption': caption,
                    'mentions': [this._sender]
                }, {
                    'quoted': {
                        'key': {
                            'fromMe': false,
                            'participant': '0@s.whatsapp.net',
                            'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
                        } /*,  //não aparece no iphone do arthur
                        'message': {
                          'orderMessage': {
                            'itemCount': 737,
                            'status': 200,
                            'thumbnail': this.sendThumb,
                            'surface': 200,
                            'message': '[ ' + this.command + ' ☰ ]',
                            'orderTitle': Bot.packWm,
                            'sellerJid': '0@s.whatsapp.net'
                          }
                        } */
                    }
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    /**
     * Send a message with google location
     * @param latitude <cityCoordinates latitude>
     * @param longitude  <cityCoordinates longitude>
     */
    showMessageLocation(latitude, longitude) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!latitude || !latitude)
                return Promise.reject('no coordinates');
            const loc = {
                'degreesLatitude': latitude,
                'degreesLongitude': longitude,
                'jpegThumbnail': BotDB.mythumb
            };
            try {
                return yield this._client.sendMessage(this._from, {
                    'caption': '🧿',
                    'location': loc,
                    'mentions': [this._sender]
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    /* #region Helper Functions */
    /**
     * @param file DataURL data:image/xxx;base64,xxx or the RELATIVE (should start with `./` or `../`) path of the file you want to send. With the latest version, you can now set this to a normal URL (for example [GET] `https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_2500kB.jpg`).
     * @param filename string xxxxx
     * @param caption string xxxxx*
     * */
    sendImage(file, name, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file || !name || !caption)
                return Promise.reject('missing parameter');
            try {
                return yield this._client.sendImage(this.from, file, name, caption, this.id)
                    .catch(e => {
                    this.printError(e);
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    /**
     * send File from path (in the filesystem)
     * @param path
     * @param filename
     * @param type
     * @returns
     */
    sendFile(path, filename, type = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (!file || !filename || !type)
                return Promise.reject('missing parameter');
            try {
                return yield this._client.sendFile(this._from, path, filename);
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    /**
     * send a file
     * @param {*} buffer the file to send
     * @param {*} filename the file name
     * @returns
     */
    sendFileFromBuffer(buffer, filename, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename || !type || !Buffer.isBuffer(buffer))
                return Promise.reject('missing parameter');
            try {
                const audioIcon = `🎧 `;
                const videoIcon = `🎞️ `;
                let myIcon = videoIcon;
                switch (type) {
                    case 'audio':
                        myIcon = audioIcon;
                        break;
                    case 'video':
                        myIcon = videoIcon;
                        break;
                    default:
                        myIcon = videoIcon;
                }
                return yield this._client.sendMessage(this._from, {
                    'audio': buffer,
                    'contextInfo': {
                        'externalAdReply': {
                            'title': myIcon + this.NameBot + ` 🎶`,
                            'body': '' + this.command,
                            'previewType': 'PHOTO',
                            'thumbnail': BotDB.images.logo,
                            'sourceUrl': '' + this.BodaoBotURL
                        }
                    },
                    'mimetype': 'audio/mp4',
                    'fileName': filename
                }, {
                    'quoted': this.msgQuote
                });
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    checkRemaininLimit() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = this._user.getRemainingLimit();
                if (limit <= 0) {
                    const msg = {
                        'text': BotDB.idiomas.SinLimite(this.pushname),
                        'mentions': [this._sender]
                    };
                    const options = {
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
                                    'caption': '' + this._NameBot,
                                    'jpegThumbnail': BotDB._imgPressF
                                }
                            }
                        }
                    };
                    return yield this._client.sendMessage(this._from, msg, options);
                }
                else {
                    return yield this.sendMentionedMessage(BotDB.idiomas.Limite(this.pushname) + (' : ' + limit));
                }
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    isURL(link) {
        return link.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'));
    }
    ;
    showActiveUsers(txt, mentions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const message = {
                    'text': txt.trim(),
                    'mentions': mentions
                };
                const options1 = {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': this.msgQuote
                };
                return yield this._client.sendMessage(this._from, message, options1);
            }
            catch (err) {
                Utils.treatError(err, logger);
                this.printError(err);
                return Promise.reject(err);
            }
        });
    }
    /**
     * setup user constraints (limit,xp,level,and spanFilter)
     * @param {*} xp
     * @param {*} level
     * @param {*} addSpan if will add spamfilter
     */
    setUserConstraints(xp = 450, level = 1, addSpan = true) {
        if (addSpan)
            this.addSPAMFilter(this._from);
        this._user.limitInc = 1;
        this._user.addXp(this.from, xp);
        this._user.addLevel(this.from, level);
    }
    sfxSave(sfxName) {
        return __awaiter(this, void 0, void 0, function* () {
            let durs = this.quotedMsg ? this.quotedMsg.duration : this.message.duration;
            this.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
            const mediaData = yield this._client.downloadAndBufferMediaMessage(this.quoted);
            const temp = './multimedia/';
            const mime = this.mimetype ? this.mimetype : 'mp3';
            const fileInput = path.join(temp, 'sfx', `${sfxName}.${mime.replace(/.+\//, '')}`);
            const fileInputPath = path.resolve(__dirname, fileInput);
            try {
                const file = fs.writeFileSync(fileInputPath, mediaData);
            }
            catch (err) {
                //console.log.error(BotDB.idiomas.Erreply() + err.message)
                this.reply(BotDB.idiomas.Erreply());
                Utils.unlinkIfExists(fileInputPath);
            }
            this.reply('sfx added with success');
        });
    }
    //https://www.vacing.com/ffmpeg_audio_filters/index.html
    mediaConverter(Filter, filterName, type = EMediaConvertType.Complex) {
        return __awaiter(this, void 0, void 0, function* () {
            let durs = this.quotedMsg ? this.quotedMsg.seconds : 0;
            this.reply(BotDB.idiomas.wait() + `\nEstimete ± ${(+durs / 100).toFixed(0)} minute.`);
            const mediaData = yield this._client.downloadAndBufferMediaMessage(this.quoted);
            const temp = FileDB._tempDirPath;
            //let fileInputPath = `./src/assets/media/in_${filterName}_${this.t}.mp3`
            //let fileOutputPath = `./src/assets/media/out_${filterName}_${this.t}.mp3`
            const mime = this.mimetype ? this.mimetype : 'mp3';
            const fileInput = path.join(temp, 'audio', `in_${filterName}.${mime.replace(/.+\//, '')}`);
            const fileOutput = path.join(temp, 'audio', `out_${filterName}.mp3`);
            const fileInputPath = path.resolve(__dirname, fileInput);
            const fileOutputPath = path.resolve(__dirname, fileOutput);
            try {
                const file = fs.writeFileSync(fileInputPath, mediaData);
                /*.on('error', (err) => {
                    console.log.error(BotDB.idiomas.Erreply() + err.message)
                    this.reply(BotDB.idiomas.Erreply())
                    Utils.unlinkIfExists(fileInputPath, fileOutputPath)
                })
                */
                const ffcomand = ffmpeg(fileInputPath)
                    .setFfmpegPath(FileDB._ffmpegPath)
                    .format('mp3');
                switch (type) {
                    case EMediaConvertType.Audio:
                        ffcomand.audioFilter(Filter);
                        break;
                    case EMediaConvertType.Video:
                        ffcomand.videoFilter(Filter);
                        break;
                    case EMediaConvertType.Complex:
                        ffcomand.complexFilter(Filter);
                        break;
                    default:
                        ffcomand.complexFilter(Filter);
                        break;
                }
                ffcomand.on('start', (commandLine) => {
                    console.log('\x1b[1;31m~\x1b[1;37m>', '[[1;32m FFmpeg[1;37m]', JSON.stringify(commandLine));
                })
                    .on('progress', (progress) => {
                    console.log('\x1b[1;31m~\x1b[1;37m>', '[[1;32m FFmpeg[1;37m]', JSON.stringify(progress));
                })
                    .on('error', (err) => {
                    //console.log.error(BotDB.idiomas.Erreply() + err.message)
                    if (filterName === 'custom')
                        this.reply(err.message + '\nExample Pode ser visto aqui  https://www.vacing.com/ffmpeg_audio_filters/index.html');
                    else
                        this.reply(BotDB.idiomas.Erreply());
                    Utils.unlinkIfExists(fileInputPath, fileOutputPath);
                })
                    .on('end', () => __awaiter(this, void 0, void 0, function* () {
                    const elapsed = Utils.processTime(parseInt(BotDB.time), moment().toDate());
                    const buffer = fs.readFileSync(fileOutputPath);
                    yield this.sendFileFromBuffer(buffer, `${filterName}.mp3`, 'audio');
                    //console.log.info(`Audio Processed for ${processTime(this.t, moment().toDate())} ${msg.second(elapsed)}`)
                    setTimeout(() => {
                        Utils.unlinkIfExists(fileInputPath, fileOutputPath);
                    }, 30000);
                }))
                    .saveToFile(fileOutputPath);
            }
            catch (err) {
                Utils.treatError(err, logger);
                //console.log.error(BotDB.idiomas.Erreply() + err.message)
                if (filterName === 'custom')
                    this.reply(err + '\nExample Pode ser visto aqui  https://www.vacing.com/ffmpeg_audio_filters/index.html');
                else
                    this.reply(BotDB.idiomas.Erreply());
                Utils.unlinkIfExists(fileInputPath, fileOutputPath);
                return Promise.reject(err);
            }
        });
    }
}
_a = MessageCore;
//async methods
/*
static async _getGroupAdmins(este:any) :Promise<Array<any>> {

 if (este._isGroupMsg) {
     const members = await este._group._getGroupMembers(este)
     if(Array.isArray(members) ){
       const admins = members.filter(member => member.admin !== null).map(m => m.id)
       este._groupAdmins = admins
       return admins
     }else return []
   
 }else {
   return await Promise.resolve([])
 }
 

}*/
MessageCore._isBotGroupAdmin = (este) => __awaiter(void 0, void 0, void 0, function* () {
    if (este._isGroupMsg) {
        let myGroup;
        if (!este._group)
            myGroup = este._group = Group.getGroupForChat(este._from);
        else
            myGroup = este._group;
        if (myGroup) {
            const admins = yield myGroup.getGroupAdmins();
            const isAdmin = admins ? admins.includes(este._botNumber) : false;
            este._isBotGroupAdm = isAdmin;
            Promise.resolve(isAdmin);
        }
        else
            Promise.resolve(false);
    }
    else
        return yield Promise.resolve(false);
});
MessageCore.doSomeAsyncStuff = (myObj) => __awaiter(void 0, void 0, void 0, function* () {
    if (myObj.isGroupMsg) {
        let myGroup;
        if (!myObj._group)
            myGroup = myObj._group = Group.getGroupForChat(myObj._from);
        else
            myGroup = myObj._group;
        if (myGroup) {
            const groupMetaData = yield myGroup.getGroupMetaData(myObj);
            const groupMembers = yield myGroup.getGroupMembers(myObj);
            const isGadmin = yield myGroup.isBotGroupAdmin(myObj);
        }
        const isBotAdmin = yield MessageCore._isBotGroupAdmin(myObj);
    }
    try {
        let from = myObj._msg.key.remoteJid;
        if (myObj && myObj._client && from) {
            var pic = yield myObj._client.profilePictureUrl(from, 'image');
            myObj._picThumb = yield Utils.getBuffer(pic);
        }
        else
            throw "From Null";
    }
    catch (err) {
        logger.error(err);
        myObj._picThumb = BotDB.sinthumb;
    }
    try {
        let jid = myObj._botNumber;
        if (myObj && myObj._client && jid) {
            var picGlobal = yield myObj._client.profilePictureUrl(jid, 'image');
            myObj._globalThumb = yield Utils.getBuffer(picGlobal);
        }
        else
            throw "Jid Null";
    }
    catch (err) {
        logger.error(err);
        myObj._globalThumb = BotDB.sinthumb;
    }
    try {
        const theimgUrl = yield MessageCore.picSender(myObj);
        if (theimgUrl) {
            myObj._sendThumb = yield Utils.getBuffer(theimgUrl);
        }
        else {
            myObj._sendThumb = BotDB.sinthumb;
        }
        //console.log('got sendThumb')
    }
    catch (err) {
        logger.err(err);
        myObj._sendThumb = BotDB.sinthumb;
    }
    return;
});
//# sourceMappingURL=message.js.map
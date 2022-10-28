var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { isJidGroup, isJidUser } from '@adiwajshing/baileys';
import axios from 'axios';
import chalk from 'chalk';
import { default as crypto } from 'crypto';
import { fileTypeFromBuffer } from 'file-type';
import { writeFile } from 'fs';
import fs from 'fs-extra';
import { sizeFormatter } from 'human-readable';
import moment from 'moment-timezone';
import request from 'request';
import spin from 'spinnies';
//import Connection from '../../bodaomain.js';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import util from 'util';
import FileDB from '../../basededatos/fileDatabase.js';
import logger from '../../factory/logger.js';
import { LocaleService } from '../../languajes/localeService.js';
import UserAgentManager from '../userAgentsManager.js';
import resizeImage from './resizeImage.js';
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const boldSign = '*';
let monospace = '```';
const more = '';
let nwn = more.repeat(850);
//import logger from '../services/logger.mjs'
/*
import afk from './afk.js'
import api from './api.js'
import canvas from './canvas.js'
import cekResi from './cekResi.js'
import daily from './daily.js'
import downloader from './downloader.js'
import fun from './fun.js'
import tebak from './guessing.js'
import { cariNsfw, lookingRough } from './kataKotor.js'
import level from './level.js'
import limit from './limit.js'
import list from './list.js'
import loader from './loader.js'
import getLocationData from './location.js'
import menuId from './menu.js'
import msg from './messages.js'
import misc from './misc.js'
import note from './note.js'
import nsfw from './nsfw.js'
import Premium from './premium.js'
import register from './register.js'
import reminder from './reminder.js'
import resep from './resep.js'
import schedule from './schedule.js'
import scraper from './scraper.js'
import sewa from './sewa.js'
import urlShortener from './shortener.js'
import toxic from './toxic.js'
import weeaboo from './weeaboo.js'
*/
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
let file = __filename; //require.resolve(__filename);
const { tz, duration } = moment;
const { head } = request;
const { existsSync, unlinkSync, readFileSync, createWriteStream, writeFileSync } = fs;
tz.setDefault('America/Sao_Paulo').locale('pt-br');
/*

String.prototype.toDHms = function () {
    var sec_num = parseInt(this, 10) // don't forget the second param
    var hours = Math.floor(sec_num / 3600)
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60)
    var seconds = sec_num - (hours * 3600) - (minutes * 60)
    var days = 0
    if (hours >= 24) { days = Math.floor(hours / 24); hours = hours % 24 }
    return days + ' days ' + hours + ' hours ' + minutes + ' minutes ' + seconds + ' secs'
}
*/
//
export default class Utils {
    /**
     * check if the object has a specific key
     * @param key
     * @param obj
     * @returns
     */
    static isObjKey(key, obj) {
        return key in obj;
    }
    /**
      * sanitize user input before processin it
      * @param strings
      * @param values
      */
    static sanitize(strings, ...values) {
        //const dirty = strings.reduce((prev, next, i) => `${prev}${next}${values[i]} || ''}`, '');
        var clean = strings.replace(/&#x20;/g, " ");
        clean = clean.replace(/&Aacute;/g, "Á");
        clean = clean.replace(/&Agrave;/g, "À");
        clean = clean.replace(/&Acirc;/g, "Â");
        clean = clean.replace(/&Atilde;/g, "Ã");
        clean = clean.replace(/&Ccedil;/g, "Ç");
        clean = clean.replace(/&Egrave;/g, "È");
        clean = clean.replace(/&Eacute;/g, "É");
        clean = clean.replace(/&Ecirc;/g, "Ê");
        clean = clean.replace(/&Ograve;/g, "Ò");
        clean = clean.replace(/&Oacute;/g, "Ó");
        clean = clean.replace(/&Ocirc;/g, "Ô");
        clean = clean.replace(/&Otilde;/g, "Õ");
        clean = clean.replace(/&Ugrave;/g, "Ù");
        clean = clean.replace(/&Uacute;/g, "Ú");
        clean = clean.replace(/&Ucirc;/g, "Û");
        clean = clean.replace(/&aacute;/g, "á");
        clean = clean.replace(/&agrave;/g, "à");
        clean = clean.replace(/&acirc;/g, "â");
        clean = clean.replace(/&atilde;/g, "ã");
        clean = clean.replace(/&ccedil;/g, "ç");
        clean = clean.replace(/&egrave;/g, "è");
        clean = clean.replace(/&eacute;/g, "é");
        clean = clean.replace(/&ecirc;/g, "ê");
        clean = clean.replace(/&ograve;/g, "ò");
        clean = clean.replace(/&oacute;/g, "ó");
        clean = clean.replace(/&ocirc;/g, "ô");
        clean = clean.replace(/&otilde;/g, "õ");
        clean = clean.replace(/&ugrave;/g, "ù");
        clean = clean.replace(/&uacute;/g, "ú");
        clean = clean.replace(/&ucirc;/g, "û");
        return clean;
    }
    /**
     * remove item from array
     * @param items array
     * @param index index of the item to remove (delete)
     * @returns the array without the removed item
     */
    static removeItemWithSlice(items, index) {
        const firstArr = items.slice(0, index);
        const secondArr = items.slice(index + 1);
        return [...firstArr, ...secondArr];
    }
    /**
     * Select a ramdom item from array. sililar to Lodash
     * @param myArray
     * @returns
     */
    static selectRamdomFromArray(myArray) {
        const index = Math.floor(Math.random() * myArray.length);
        const choice = myArray[index];
        return choice;
    }
    /**
    * Create shorturl
    *
    * @param  {String} url
    */
    static urlShortener(url) {
        return new Promise((resolve, reject) => {
            logger.info('Creating short url...');
            Utils.fetchText(`https://tinyurl.com/api-create.php?url=${url}`, {})
                .then((text) => resolve(text))
                .catch((err) => reject(err));
        });
    }
    static getGlobalSpinner(disableSpins = false) {
        const spinner = Utils.spinner;
        if (!Utils.globalSpinner)
            Utils.globalSpinner = new spin({ color: 'blue', succeedColor: 'green', spinner, disableSpins });
        return Utils.globalSpinner;
    }
    static start(id, text) {
        try {
            Utils.spins.add(id, { text: text });
        }
        catch (err) {
            console.log(err);
        }
    }
    static success(id, text) {
        try {
            Utils.spins.succeed(id, { text: text });
        }
        catch (err) {
            console.log(err);
        }
    }
    static close(id, text) {
        try {
            Utils.spins.fail(id, { text: text });
        }
        catch (err) {
            console.log(err);
        }
    }
    static format(...args) {
        return util.format(...args);
    }
    static getGroupAdmins(participantes) {
        var admins = [];
        for (let i of participantes) {
            i.admin === "admin" ? admins.push(i.id) : '';
        }
        return admins;
    }
    /**
     *
     * @param {*} format  to get only time:'HH:m:s'
     * @param {*} date
     * @returns the date/time in the desired format
     */
    static getTime(format, date) {
        if (date) {
            return moment(date).locale('pt-br').format(format);
        }
        else {
            return moment.tz('America/Sao_Paulo').locale('pt-br').format(format);
        }
    }
    static getTimefromTimestamp(timestamp) {
        var date = new Date(timestamp * 1000);
        let time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return time;
    }
    static _sleep(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => setTimeout(resolve, ms));
        });
    }
    static clockString(seconds) {
        let h = isNaN(seconds) ? '--' : Math.floor(seconds % (3600 * 24) / 3600);
        let m = isNaN(seconds) ? '--' : Math.floor(seconds % 3600 / 60);
        let s = isNaN(seconds) ? '--' : Math.floor(seconds % 60);
        return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
    }
    static fetchJson(url, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theAgent = UserAgentManager.getRandomAgent();
                //const theAgent ='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                options ? options : {};
                const res = yield axios(Object.assign({ method: 'GET', url: url, headers: {
                        'User-Agent': theAgent
                    } }, options));
                return res.data;
            }
            catch (err) {
                return err;
            }
        });
    }
    static fetchJsonPOST(url, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theAgent = UserAgentManager.getRandomAgent();
                //'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
                options ? options : {};
                const res = yield axios(Object.assign({ method: 'POST', url: url, headers: {
                        'User-Agent': theAgent
                    } }, options));
                return res.data;
            }
            catch (err) {
                return err;
            }
        });
    }
    static getBuffer(url, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                options ? options : {};
                const res = yield axios(Object.assign(Object.assign({ method: "get", url, headers: {
                        'DNT': '1',
                        'Upgrade-Insecure-Request': '1'
                    } }, options), { responseType: 'arraybuffer' }));
                return Promise.resolve(res.data);
            }
            catch (e) {
                return e;
            }
        });
    }
    static jsonformat(string) {
        return JSON.stringify(string, null, 2);
    }
    static logic(check, inp, out) {
        if (inp.length !== out.length)
            throw new Error('La entrada y la salida deben tener la misma longitud'); //traducido :v
        for (let i in inp)
            if (util.isDeepStrictEqual(check, inp[i]))
                return out[i];
        return null;
    }
    static parseMention(text = '') {
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    }
    static getRandom(ext) {
        return `${Math.floor(Math.random() * 10000)}${ext}`;
    }
    //[[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
    /* eslint-disable no-undef */
    /**
    * Get text with color
    * @param  {String} text
    * @param  {String} color
    * @return  {String} Return text with color
    */
    static _color(text, color) {
        return !color ? chalk.blueBright(text) : chalk[color](text);
    }
    /**
     * Get Time duration
     * @param  {number} timestamp
     * @param  {Date|string} now
     * @return duration in econds
     */
    static processTime(timestamp, now) {
        // timestamp => timestamp when message was received
        if (typeof now === 'string')
            now = moment(now);
        const dur = duration(now - Number(moment(timestamp * 1000))).asSeconds();
        return dur;
    }
    /**
     * is it url?
     * @param  {String} url
     */
    static isUrl(url) {
        return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi));
    }
    /**
     *Download any media from URL
     *@param {String} url
     *@param {Path} locate
     *@param {Callback} callback
     */
    static download(url, path, callback) {
        head(url, () => {
            request(url)
                .pipe(createWriteStream(path))
                .on('close', callback);
        });
    }
    static createReadFileSync(path) {
        if (existsSync(path)) {
            return readFileSync(path);
        }
        else {
            writeFileSync(path, '[]');
            return readFileSync(path);
        }
    }
    static formatin(duit) {
        let reverse = duit.toString().split('').reverse().join('');
        let ribuan = reverse.match(/\d{1,3}/g);
        ribuan = ribuan.join('.').split('').reverse().join('');
        return ribuan;
    }
    static inArray(needle, haystack) {
        let length = haystack.length;
        for (let i = 0; i < length; i++) {
            if (haystack[i].id == needle)
                return i;
        }
        return -1;
    }
    static last(array, n) {
        if (array == null)
            return void 0;
        if (n == null)
            return array[array.length - 1];
        return array.slice(Math.max(array.length - n, 0));
    }
    static unlinkIfExists(path, path2 = '') {
        if (existsSync(path))
            unlinkSync(path);
        if (existsSync(path2))
            unlinkSync(path2);
    }
    static lolApi(slash, parm /*= { text: null, text2: null, text3: null, img: null }*/) {
        const { apiLol } = JSON.parse(fs.readFileSync(FileDB.informationDB));
        let ptext = (parm.text != null) ? `&text=${encodeURIComponent(parm.text)}` : '';
        let ptext2 = (parm.text2 != null) ? `&text=${encodeURIComponent(parm.text2)}` : '';
        let ptext3 = (parm.text3 != null) ? `&text=${encodeURIComponent(parm.text3)}` : '';
        let pimg = (parm.img != null) ? `&img=${parm.img}` : '';
        return `https://api.lolhuman.xyz/api/${slash}?apikey=${apiLol}${ptext}${ptext2}${ptext3}${pimg}`;
    }
    /**
     * Create serial ID.
     * @param {number} size
     * @returns {string}
     */
    static createSerial(size) {
        return crypto.randomBytes(size).toString('hex').slice(0, size);
    }
    /**
     * return date (now) in human readeble format, acoording locale
     */
    static get dateComplete() {
        let date = new Date();
        return date.toLocaleDateString('pt-br', /*Utils.Dateoptions*/ { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    static get saluHora() {
        let date = new Date();
        let SaluHora = '';
        switch (date.getHours()) {
            case 0:
                SaluHora = "Boa Madrugada";
                break;
            case 1:
                SaluHora = "Boa Madrugada";
                break;
            case 2:
                SaluHora = "Boa Madrugada";
                break;
            case 3:
                SaluHora = "Bom Dia";
                break;
            case 4:
                SaluHora = "Bom Dia";
                break;
            case 5:
                SaluHora = "Bom Dia";
                break;
            case 6:
                SaluHora = "Bom Dia!!!";
                break;
            case 7:
                SaluHora = "Tenha um excelente dia";
                break;
            case 8:
                SaluHora = "Tenha um excelente dia";
                break;
            case 9:
                SaluHora = "Tenha um excelente dia";
                break;
            case 10:
                SaluHora = "Tenha um excelente dia";
                break;
            case 11:
                SaluHora = "Bom Dia";
                break;
            case 12:
                SaluHora = "Bom Dia";
                break;
            case 13:
                SaluHora = "Bom Dia";
                break;
            case 14:
                SaluHora = "Boa tarde";
                break;
            case 15:
                SaluHora = "Boa tarde";
                break;
            case 16:
                SaluHora = "Boa tarde";
                break;
            case 17:
                SaluHora = "Boa tarde";
                break;
            case 18:
                SaluHora = "Boa tarde";
                break;
            case 19:
                SaluHora = "Boa tarde";
                break;
            case 20:
                SaluHora = "Boa Noite";
                break;
            case 21:
                SaluHora = "Boa Noite";
                break;
            case 22:
                SaluHora = "Boa Noite";
                break;
            case 23:
                SaluHora = "Boa Noite";
                break;
        } //24 Horas con saludos :v
        return SaluHora;
    }
    static color(text, color = '') {
        return (color == '') ? chalk.green(text) : chalk[color](text);
    }
    /**
     * Normalize a string. replace acents and diacritics characters
     * @param {*} str
     * @returns
     */
    static stringNormalize(str) {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    static convertSticker(base64, author, pack) {
        let fileLenght = '151330';
        const theAgent = UserAgentManager.getRandomAgent();
        //'axios/0.21.1'
        return new Promise((resolve, reject) => {
            axios('https://sticker-api-tpe3wet7da-uc.a.run.app/prepareWebp', {
                method: 'POST',
                headers: { Accept: 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8', 'User-Agent': theAgent, 'Content-Length': fileLenght },
                data: `{"image": "${base64}","stickerMetadata":{"author":"${author}","pack":"${pack}","keepScale":true,"removebg":"HQ"},"sessionInfo":{"WA_VERSION":"2.2106.5","PAGE_UA":"WhatsApp/2.2037.6 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36","WA_AUTOMATE_VERSION":"3.6.10 UPDATE AVAILABLE: 3.6.11","BROWSER_VERSION":"HeadlessChrome/88.0.4324.190","OS":"Windows Server 2016","START_TS":1614310326309,"NUM":"6247","LAUNCH_TIME_MS":7934,"PHONE_VERSION":"2.20.205.16"},"config":{"sessionId":"session","headless":true,"qrTimeout":20,"authTimeout":0,"cacheEnabled":false,"useChrome":true,"killProcessOnBrowserClose":true,"throwErrorOnTosBlock":false,"chromiumArgs":["--no-sandbox","--disable-setuid-sandbox","--aggressive-cache-discard","--disable-cache","--disable-application-cache","--disable-offline-load-stale-cache","--disk-cache-size=0"],"executablePath":"C:\\\\Program Files (x86)\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe","skipBrokenMethodsCheck":true,"stickerServerEndpoint":true}}`
            }).then(({ data }) => {
                resolve(data.webpBase64);
            }).catch(reject);
        });
    }
    /**
   * Returns an array with arrays of the given size.
   *
   * @param myArray {Array} array to split
   * @param chunk_size {Integer} Size of every group
   */
    static chunkArray(myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];
        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }
        return tempArray;
    }
    /**
  * treat Error
  * @param error
  * @param logger
  * @returns
  */
    static treatError(error, logger) {
        if (Utils.isObjKey('output', error)) {
            //const conn = Connection.wa 
            //if (conn) conn.createSession('bodao_bot')
        }
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
        return null;
    }
    /**
     * Give a time timit to wait for a promise
     * @param timeLimit
     * @param task
     * @param failureValue
     * @returns
     */
    static fulfillWithTimeLimit(timeLimit, task, failureValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let timeout;
            const timeoutPromise = new Promise((resolve, reject) => {
                timeout = setTimeout(() => {
                    resolve(failureValue);
                }, timeLimit);
            });
            const response = yield Promise.race([task, timeoutPromise]);
            if (timeout) { //the code works without this but let's be safe and clean up the timeout
                clearTimeout(timeout);
            }
            return response;
        });
    }
    static formatWAUserNumber(number) {
        let ret;
        if (isJidGroup(number))
            ret = '';
        //number ends with @s.whatsapp.net
        if (number.includes(':')) {
            ret = number.split(":")[0] + '@s.whatsapp.net';
        }
        else {
            if (isJidUser(number))
                ret = number;
        }
        return ret;
    }
}
_a = Utils;
Utils.isNumber = x => typeof x === 'number' && !isNaN(x);
Utils.delay = ms => Utils.isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms));
Utils.spinner = {
    "interval": 120,
    "frames": [
        "=           [BodãoBot ✓] 🕛",
        "===         [BodãoBot ✓] 🕐",
        "=====       [BodãoBot ✓] 🕑",
        "=======     [BodãoBot ✓] 🕒",
        "=====       [BodãoBot ✓] 🕓",
        "===         [BodãoBot ✓] 🕔",
        "=           [BodãoBot ✓] 🕕",
        "===         [BodãoBot ✓] 🕖",
        "=====       [BodãoBot ✓] 🕗",
        "=======     [BodãoBot ✓] 🕙",
        "=====       [BodãoBot ✓] 🕚",
        "===         [BodãoBot ✓] 🕛"
    ]
};
Utils.spins = Utils.getGlobalSpinner(false);
Utils.formatp = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});
Utils.sleep = (delay) => new Promise((resolve) => {
    setTimeout(() => { resolve(true); }, delay);
});
/**
* Fetch Text from Url
*
* @param {String} url
* @param {Object} options
*/
Utils.fetchText = (url, options) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(url, options);
        const text = yield response.text();
        return resolve(text);
    }
    catch (err) {
        console.error(err);
        reject(err);
    }
}));
/**
 * Fetch base64 from url
 * @param {String} url
 */
Utils.fetchBase64 = (url, mimetype) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(url);
        const _mimetype = mimetype || res.headers.get('content-type');
        res.buffer()
            .then((result_1) => resolve(`data:${_mimetype};base64,` + result_1.toString('base64')));
    }
    catch (err) {
        console.error(err);
        reject(err);
    }
}));
/**
 * Get buffer from direct media.
 * @param {string} url
 * @param {object} [options]
 * @returns {Promise<Buffer>}
 */
Utils.fetchBuffer = (url, options) => {
    return new Promise((resolve, reject) => {
        return fetch(url, options)
            .then((response) => response.buffer())
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    });
};
/**
 * Upload Image to Telegra.ph
 *
 * @param  {String} base64 image buffer
 * @param  {Boolean} resize
 */
Utils.uploadImages = (buffData, fileName, resize) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const FileType = yield fileTypeFromBuffer(buffData);
    const { ext } = FileType ? FileType : {
        ext: 'unknown'
    };
    const filePath = './src/assets/media/tmp.' + ext;
    const _buffData = resize ? yield resizeImage(buffData, false) : buffData;
    writeFile(filePath, _buffData, { encoding: 'base64' }, (err) => {
        if (err)
            return reject(err);
        // logger.info('Uploading image to telegra.ph server...')
        const fileData = readFileSync(filePath);
        const form = new FormData();
        form.append('file', fileData, `${fileName}.${ext}`);
        fetch('https://telegra.ph/upload', {
            method: 'POST',
            body: form
        })
            .then(res => res.json())
            .then((res) => {
            if (res.error)
                return reject(res.error);
            resolve('https://telegra.ph' + res[0].src);
        })
            .then(() => unlinkSync(filePath))
            .catch(e => reject(e));
    });
}));
// previous cmd
Utils.previousCmds = [];
Utils.prev = {
    savePrevCmd: (inpSender, prevCmd) => {
        if (!Utils.prev.hasPrevCmd(inpSender)) {
            Utils.previousCmds.push({ sender: inpSender, prevCmd: prevCmd });
            setTimeout(() => {
                Utils.prev.delPrevCmd(inpSender);
            }, 15000);
        }
    },
    getPrevCmd: (inpSender) => {
        return Utils.previousCmds.find(n => n.sender == inpSender).prevCmd;
    },
    hasPrevCmd: (inpSender) => {
        return !!Utils.previousCmds.find(n => n.sender == inpSender);
    },
    delPrevCmd: (inpSender) => {
        Utils.previousCmds = Utils.previousCmds.filter(({ sender }) => sender !== inpSender);
    }
};
/**
 * Dateoptions  of utils
 *  dateStyle, timeStyle, calendar, dayPeriod, numberingSystem, localeMatcher, weekday, era, year, month, day, hour, minute, second, fractionalSecondDigits, timeZoneName.
 */
Utils.Dateoptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
export class msgFilter {
}
_b = msgFilter;
// Message Filter / Message Cooldowns
msgFilter.usedCommandRecently = new Set();
/**
 * Check is number filtered
 * @param  {String} from
 */
msgFilter.isFiltered = (from) => {
    return !!_b.usedCommandRecently.has(from);
};
/**
 * Add number to filter
 * @param  {String} from
 */
msgFilter.addFilter = (from, delay) => {
    _b.usedCommandRecently.add(from);
    setTimeout(() => {
        return _b.usedCommandRecently.delete(from);
    }, delay); // 1sec is delay before processing next command
};
//https://metring.com.br/javascript-substituir-caracteres-especiais
msgFilter.replaceSpecialChars = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .replace(/([^\w]+|\s+)/g, '-') // Substitui espaço e outros caracteres por hífen
        .replace(/\-\-+/g, '-') // Substitui multiplos hífens por um único hífen
        .replace(/(^-+|-+$)/, ''); // Remove hífens extras do final ou do inicio da string
};
export class DataCache {
    constructor(fetchFunction, minutesToLive = 10) {
        this.millisecondsToLive = minutesToLive * 60 * 1000;
        this.fetchFunction = fetchFunction;
        this.cache = null;
        this.getData = this.getData.bind(this);
        this.resetCache = this.resetCache.bind(this);
        this.isCacheExpired = this.isCacheExpired.bind(this);
        this.fetchDate = new Date(0);
    }
    isCacheExpired() {
        return (this.fetchDate.getTime() + this.millisecondsToLive) < new Date().getTime();
    }
    getData() {
        if (!this.cache || this.isCacheExpired()) {
            logger.warn('expired - fetching new data');
            return this.fetchFunction()
                .then((data) => {
                this.cache = data;
                this.fetchDate = new Date();
                return data;
            });
        }
        else {
            logger.info('cache hit');
            return Promise.resolve(this.cache);
        }
    }
    resetCache() {
        this.fetchDate = new Date(0);
    }
}
//============Auto Actualización :v=======================//
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logger.info(chalk.cyan(`\n\n${__filename} :\n[!] ` + __('It was updated successfully') + ` ✓\n\n`));
    delete require.cache[file]; //require not defined. fix....
    require(file);
});
//# sourceMappingURL=functions.js.map
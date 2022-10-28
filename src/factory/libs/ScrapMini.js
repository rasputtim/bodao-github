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
import ytdl from 'bodao-ytdl-core';
import chalk from 'chalk';
import * as cheerio from 'cheerio';
import FormData from 'form-data';
import fs from 'fs';
import { Agent } from 'https';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { twitter } from 'video-url-link';
import FileDB from '../../basededatos/fileDatabase.js';
import _pino from '../../factory/logger.js';
import { LocaleService } from '../../languajes/localeService.js';
import UserAgentManager from '../userAgentsManager.js';
import Utils from './functions.js';
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const boldSign = '*';
let monospace = '```';
const more = '';
let nwn = more.repeat(850);
const twtGetInfo = promisify(twitter.getInfo);
const agent = new Agent({
    rejectUnauthorized: false
});
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
let file = __filename; //require.resolve(__filename);
/*
//desobfuscating function with hex codes
const mymeta = fs.readFile( './libreria/ScrapMini.js','utf-8', function(err, data){
      
    if (err) {
      return this.logger.error(err);
    }
    var result = data;
    
    for (let i = 100; i < 2000 ; i++) {
        const removeStr = `get_obfusc_value\\(0x${i.toString(16)}\\)` //variable /get_obfusc_2_value\(1598\)/g
        const regex =  new RegExp(removeStr,'g'); // correct way ${get_obfusc_2_value(i)}
        let x=1598;
        let expressao = get_obfusc_value(i)
        var result = result.replace(regex, `\`${expressao}\``);
    }
    fs.writeFile('./ScrapMini-desob.js', result, 'utf8', function (err) {
       if (err) return logger.error(err);
    });
  });

*/
export default class ScrapMini {
    static bytesToSize(thesize) {
        return new Promise((resolve, reject) => {
            const typesArray = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (thesize === 0)
                return `n/a`;
            const index = Math.floor(Math.log(thesize) / Math.log(0x400));
            if (index === 0)
                resolve(thesize + ' ' + typesArray[index]);
            resolve((thesize / Math.pow(0x400, index))['toFixed'](1) + ' ' + typesArray[index]);
        });
    }
    ;
    static dlmediafire(_0x10a5b3) {
        return __awaiter(this, void 0, void 0, function* () {
            const wepPage = yield axios.get(_0x10a5b3);
            const $ = cheerio.load(wepPage.data);
            const _0x23f246 = [];
            const _0x247a83 = $('a#downloadButton').attr('href');
            const _0x2faf57 = $(`a#downloadButton`).text().replace('Download', '').replace('(', '').replace(')', '').replace('\x0a', '').replace('\x0a', '').replace(`                         `, '');
            const _0x24bf6d = _0x247a83 === null || _0x247a83 === void 0 ? void 0 : _0x247a83.split('/');
            if (_0x24bf6d) {
                const _0x1cfab1 = _0x24bf6d[5];
                let mime = _0x1cfab1.split('.');
                let theMime = mime[1];
                _0x23f246.push({
                    'nombre': _0x1cfab1,
                    'mime': theMime,
                    'size': _0x2faf57,
                    'link': _0x247a83
                });
                return _0x23f246;
            }
        });
    }
    static wikipedia(searchText) {
        return __awaiter(this, void 0, void 0, function* () {
            const searchResult = yield axios.get('https://es.m.wikipedia.org/w/index.php?search=' + searchText);
            const $ = cheerio.load(searchResult.data);
            const resultsArray = [];
            let _0x4feca9 = $('#mf-section-0').find('p').text();
            let _0x26fed0 = $(`#mf-section-0`).find(`div > div > a > img`).attr(`src`);
            _0x26fed0 = _0x26fed0 ? _0x26fed0 : '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png';
            _0x26fed0 = `https:` + _0x26fed0;
            let _0x422402 = $(`h1#section_0`).text();
            resultsArray.push({
                'wikip': _0x4feca9,
                'thumb': _0x26fed0,
                'title': _0x422402
            });
            return resultsArray;
        });
    }
    ;
    static pinterest(searchText) {
        return new Promise((_0x99b1a5, reject) => __awaiter(this, void 0, void 0, function* () {
            axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + searchText, {
                'headers': {
                    'cookie': `_auth=1; _b="AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg="; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0`
                }
            }).then(({ data: _0x4586ef }) => {
                const $ = cheerio.load(_0x4586ef), _0x4cc718 = [], _0x3d969d = [];
                $(`div > a`).get()['map'](_0x5a36b6 => {
                    const _0x37211f = $(_0x5a36b6).find(`img`).attr(`src`);
                    _0x4cc718.push(_0x37211f);
                }), _0x4cc718['forEach'](_0x53a0bc => {
                    if (_0x53a0bc == undefined)
                        return;
                    _0x3d969d.push(_0x53a0bc.replace(/236/g, `736`));
                }), _0x3d969d['shift'](), _0x99b1a5(_0x3d969d);
            });
        }));
    }
    static wallpaper(searchText, _0x278f23 = '1') {
        return new Promise((resolve, reject) => {
            axios.get(`https://www.besthdwallpaper.com/search?CurrentPage=` + _0x278f23 + `&q=` + searchText).then(({ data: _0xd6b36e }) => {
                let $ = cheerio.load(_0xd6b36e), resultsArray = [];
                $(`div.grid-item`)['each'](function (_0x434fe7, _0x245260) {
                    resultsArray.push({
                        'title': $(_0x245260).find(`div.info > a > h3`).text(),
                        'type': $(_0x245260).find('div.info > a:nth-child(2)').text(),
                        'source': 'https://www.besthdwallpaper.com/' + $(_0x245260).find(`div > a:nth-child(3)`).attr('href'),
                        'image': [$(_0x245260).find('picture > img').attr(`data-src`) || $(_0x245260).find(`picture > img`).attr(`src`), $(_0x245260).find(`picture > source:nth-child(1)`).attr(`srcset`), $(_0x245260).find(`picture > source:nth-child(2)`).attr(`srcset`)]
                    });
                }), resolve(resultsArray);
            });
        });
    }
    static wikimedia(searchText) {
        return new Promise((resolve, reject) => {
            axios.get(`https://commons.wikimedia.org/w/index.php?search=` + searchText + `&title=Special:MediaSearch&go=Go&type=image`).then(_0x16c0a0 => {
                let $ = cheerio.load(_0x16c0a0.data), resultsArray = [];
                $(`.sdms-search-results__list-wrapper > div > a`)['each'](function (_0xbe131c, _0xd663ab) {
                    resultsArray.push({
                        'title': $(_0xd663ab).find(`img`).attr('alt'),
                        'source': $(_0xd663ab).attr(`href`),
                        'image': $(_0xd663ab).find('img').attr(`data-src`) || $(_0xd663ab).find('img').attr(`src`)
                    });
                }), resolve(resultsArray);
            });
        });
    }
    static quotesAnim() {
        return new Promise((resolve, reject) => {
            let _0x2dd406 = Math.floor(Math['random']() * 0xb8);
            axios.get('https://otakotaku.com/quote/feed/' + _0x2dd406).then(({ data: _0x3ac1fc }) => {
                const $ = cheerio.load(_0x3ac1fc), resultsArray = [];
                $(`div.kotodama-list`)['each'](function (_0x526e03, _0xf2ddc1) {
                    resultsArray.push({
                        'link': $(_0xf2ddc1).find('a').attr(`href`),
                        'gambar': $(_0xf2ddc1).find(`img`).attr(`data-src`),
                        'karakter': $(_0xf2ddc1).find(`div.char-name`).text()['trim'](),
                        'anime': $(_0xf2ddc1).find(`div.anime-title`).text()['trim'](),
                        'episode': $(_0xf2ddc1).find('div.meta').text(),
                        'up_at': $(_0xf2ddc1).find(`small.meta`).text(),
                        'quotes': $(_0xf2ddc1).find(`div.quote`).text()['trim']()
                    });
                }), resolve(resultsArray);
            }).catch(reject);
        });
    }
    static aiovideodl(linkToDownload) {
        const theAgent = UserAgentManager.getRandomAgent();
        //`Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36`
        return new Promise((resolve, reject) => {
            axios({
                'url': `https://aiovideodl.ml/`,
                'method': `GET`,
                'headers': {
                    'user-agent': theAgent,
                    'cookie': `PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653`
                }
            }).then(result => {
                let $ = cheerio.load(result.data), _0x33f1ab = $(`#token`).attr(`value`);
                axios({
                    'url': 'https://aiovideodl.ml/wp-json/aio-dl/video-data/',
                    'method': `POST`,
                    'headers': {
                        'user-agent': theAgent,
                        'cookie': 'PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653'
                    },
                    'data': new URLSearchParams(Object['entries']({
                        'url': linkToDownload,
                        'token': _0x33f1ab
                    }))
                }).then(({ data: _0x4fd6e7 }) => {
                    resolve(_0x4fd6e7);
                });
            }).catch(err => {
                reject(err);
            });
            ;
        });
    }
    /**
        * Get YouTube media from URL.
        * @param {string} url
        * @returns { }  { inf, stream} video information and stream data
        */
    static ytdl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Utils.isUrl(url))
                return;
            //get the link code
            let ytid = url.substr((url.indexOf('=')) != -1 ? (url.indexOf('=') + 1) : (url.indexOf('be/') + 3));
            ytid = ytid.replace(/&.+/g, '').replace(/>/g, '');
            let { videoDetails: inf } = yield ytdl.getInfo(ytid, {});
            return {
                name: ytid,
                inf: inf,
                stream: ytdl(ytid, { quality: 'highestaudio' })
            };
        });
    }
    static ytMp4(linkToDownload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const videoInfo = yield ytdl.getInfo(linkToDownload, {});
                let resultsArray = [];
                for (let index = 0; index < videoInfo.formats['length']; index++) {
                    let myVideoInfo = videoInfo.formats[index];
                    if (myVideoInfo['container'] == 'mp4' && myVideoInfo['hasVideo'] == !![] && myVideoInfo['hasAudio'] == !![]) {
                        let { qualityLabel: myVideoQuality, contentLength: sizeBytes } = myVideoInfo;
                        let mySize = yield ScrapMini.bytesToSize(sizeBytes);
                        resultsArray[index] = {
                            'video': myVideoInfo.url,
                            'quality': myVideoQuality,
                            'size': mySize
                        };
                    }
                    ;
                }
                ;
                if (resultsArray.length > 0) {
                    let myQuality = resultsArray['filter'](_0x5a98aa => _0x5a98aa['video'] != undefined && _0x5a98aa['size'] != undefined && _0x5a98aa['quality'] != undefined);
                    let myTinyURL = yield axios.get(`https://tinyurl.com/api-create.php?url=` + myQuality[0]['video']);
                    let myResult = myTinyURL.data;
                    let myTitle = videoInfo['videoDetails']['title'];
                    let myDescription = videoInfo['videoDetails']['description'];
                    let myViews = videoInfo['videoDetails']['viewCount'];
                    let myLikes = videoInfo['videoDetails']['likes'];
                    let myDislikes = videoInfo['videoDetails']['dislikes'];
                    let myChannel = videoInfo['videoDetails']['ownerChannelName'];
                    let myUploadDate = videoInfo['videoDetails']['uploadDate'];
                    let myThumb = videoInfo['player_response']['microformat']['playerMicroformatRenderer']['thumbnail']['thumbnails'][0].url;
                    return {
                        'title': myTitle,
                        'result': myResult,
                        'quality': myQuality[0]['quality'],
                        'size': myQuality[0]['size'],
                        'thumb': myThumb,
                        'views': myViews,
                        'likes': myLikes,
                        'dislike': myDislikes,
                        'channel': myChannel,
                        'uploadDate': myUploadDate,
                        'desc': myDescription
                    };
                }
                else if (Utils.isObjKey('videoDetails', videoInfo)) {
                    const haveID = yield ytdl.validateURL(linkToDownload);
                    const result = videoInfo.videoDetails;
                    let myQuality = '';
                    let myTinyURL = yield axios.get(`https://tinyurl.com/api-create.php?url=` + linkToDownload);
                    let myResult = myTinyURL.data;
                    let myTitle = videoInfo['videoDetails']['title'];
                    let myDescription = videoInfo['videoDetails']['description'];
                    let myViews = videoInfo['videoDetails']['viewCount'];
                    let myLikes = videoInfo['videoDetails']['likes'];
                    let myDislikes = videoInfo['videoDetails']['dislikes'];
                    let myChannel = videoInfo['videoDetails']['ownerChannelName'];
                    let myUploadDate = videoInfo['videoDetails']['uploadDate'];
                    let myThumb = videoInfo['player_response']['microformat']['playerMicroformatRenderer']['thumbnail']['thumbnails'][0].url;
                    return {
                        'title': myTitle,
                        'result': myResult,
                        'quality': '',
                        'size': '',
                        'thumb': myThumb,
                        'views': myViews,
                        'likes': myLikes,
                        'dislike': myDislikes,
                        'channel': myChannel,
                        'uploadDate': myUploadDate,
                        'desc': myDescription
                    };
                }
            }
            catch (error) {
                Utils.treatError(error, ScrapMini.logger);
                return null;
            }
            ;
        });
    }
    ;
    static ytMp3(linkToDownload) {
        return __awaiter(this, void 0, void 0, function* () {
            ytdl.getInfo(linkToDownload, {}).then((videoInfo) => __awaiter(this, void 0, void 0, function* () {
                let resultsArray = [];
                let _0xbaf2d6 = null;
                let _0x1d0911 = null;
                let _0x308ed5 = null;
                if (videoInfo.formats && videoInfo.formats.length > 0) {
                    for (let index = 0; index < videoInfo.formats['length']; index++) {
                        let _0x433ca6 = videoInfo.formats[index];
                        if (_0x433ca6['mimeType'] == `audio/webm; codecs="opus"`) {
                            let { contentLength: _0x3f44ae } = _0x433ca6, _0x2db80a = yield ScrapMini.bytesToSize(_0x3f44ae);
                            resultsArray[index] = {
                                'audio': _0x433ca6.url,
                                'size': _0x2db80a
                            };
                        }
                        ;
                    }
                    ;
                    _0xbaf2d6 = resultsArray['filter'](_0xb7c3f5 => _0xb7c3f5['audio'] != undefined && _0xb7c3f5['size'] != undefined);
                    _0x1d0911 = _0xbaf2d6 ? yield axios.get('https://tinyurl.com/api-create.php?url=' + _0xbaf2d6[0]['audio']) : null;
                    _0x308ed5 = _0x1d0911 ? _0x1d0911.data : null;
                }
                let _0x50fee4 = videoInfo['videoDetails']['title'];
                let _0x57a28c = videoInfo['videoDetails']['description'];
                let _0x3afe8e = videoInfo['videoDetails']['viewCount'];
                let _0x1decd8 = videoInfo['videoDetails']['likes'];
                let _0x4f4767 = videoInfo['videoDetails']['dislikes'];
                let _0x34f1c9 = videoInfo['videoDetails']['ownerChannelName'];
                let _0x1f05c6 = videoInfo['videoDetails']['uploadDate'];
                let _0x23451c = videoInfo['player_response']['microformat']['playerMicroformatRenderer']['thumbnail']['thumbnails'][0].url;
                return {
                    'title': _0x50fee4,
                    'result': _0x308ed5 ? _0x308ed5 : '',
                    'size': _0xbaf2d6 ? _0xbaf2d6[0]['size'] : '',
                    'thumb': _0x23451c,
                    'views': _0x3afe8e,
                    'likes': _0x1decd8,
                    'dislike': _0x4f4767,
                    'channel': _0x34f1c9,
                    'uploadDate': _0x1f05c6,
                    'desc': _0x57a28c
                };
            })).catch(err => {
                Utils.treatError(err, ScrapMini.logger);
                return null;
            });
        });
    }
    static TelegraPh(_0x316c17) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (!fs['existsSync'](_0x316c17))
                return reject(new Error(`Archivo no encontrado ;-;`));
            try {
                const _0xedea8e = new FormData();
                _0xedea8e.append(`file`, fs.createReadStream(_0x316c17));
                const _0x596cf9 = yield axios({
                    'url': `https://telegra.ph/upload`,
                    'method': `POST`,
                    'headers': Object.assign({}, _0xedea8e['getHeaders']()),
                    'data': _0xedea8e
                });
                return resolve(`https://telegra.ph` + _0x596cf9.data[0]['src']);
            }
            catch (_0x4cd43f) {
                return reject(new Error(String(_0x4cd43f)));
            }
        }));
    }
    static UploadFile(_0x501bbd) {
        return __awaiter(this, void 0, void 0, function* () {
            const theAgent = UserAgentManager.getRandomAgent();
            //'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const _0x393c97 = new FormData();
                _0x393c97.append(`files[]`, fs.createReadStream(_0x501bbd)), yield axios({
                    'url': `https://uguu.se/upload.php`,
                    'method': 'POST',
                    'headers': Object.assign({ 'User-Agent': theAgent }, _0x393c97['getHeaders']()),
                    'data': _0x393c97
                }).then(_0x28ef1f => {
                    resolve(_0x28ef1f.data['files'][0]);
                }).catch(err => reject(err));
            }));
        });
    }
    static webp2mp4File(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const form = new FormData();
            form.append('new-image-url', '');
            form.append('new-image', fs.createReadStream(path));
            axios({
                method: 'post',
                url: 'https://s6.ezgif.com/webp-to-mp4',
                data: form,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${form._boundary}`
                }
            }).then(({ data }) => {
                const bodyFormThen = new FormData();
                const $ = cheerio.load(data);
                const file = $('input[name="file"]').attr('value');
                bodyFormThen.append('file', file);
                bodyFormThen.append('convert', "Convert WebP to MP4!");
                axios({
                    method: 'post',
                    url: 'https://ezgif.com/webp-to-mp4/' + file,
                    data: bodyFormThen,
                    headers: {
                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                    }
                }).then(({ data }) => {
                    const $ = cheerio.load(data);
                    const result = 'https:' + $('div#output > p.outfile > video > source').attr('src');
                    return Promise.resolve({
                        status: true,
                        message: "Agradecido con MRHRTZ :3",
                        result: result
                    });
                }).catch(err => {
                    Utils.treatError(err, this.logger);
                    return Promise.reject;
                });
            }).catch(err => {
                Utils.treatError(err, this.logger);
                return Promise.reject;
            });
        });
    }
    /**
         * Get Joox music metadata from title.
         * @param {string} title
         * @returns {Promise<object>}
         */
    static joox(title) {
        return new Promise((resolve, reject) => {
            ScrapMini.logger.info(`Get Joox music from ${title}...`);
            Utils.fetchJson(`https://api.vhtear.com/music?query=${title}&apikey=${FileDB.apiKeys.vhtear}`)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
    /**
    * Get Twitter media from URL.
    * @param {string} url
    * @returns {Promise<object>}
    */
    static tweet(url) {
        return new Promise((resolve, reject) => {
            ScrapMini.logger.info(`Get Twitter media from ${url}`);
            twtGetInfo(url, {}, (error, info) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(info);
                }
            });
        });
    }
    /**
    * Get TikTok video with no WM.
    * @param {string} url
    * @returns {Promise<object>}
    */
    static tikNoWm(url) {
        return new Promise((resolve, reject) => {
            ScrapMini.logger.info(`Get TikTok with no WM from ${url}`);
            Utils.fetchJson(`https://videfikri.com/api/tiktok/?url=${url}`)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
    /**
    * Get modded APK from moddroid.
    * @param {string} query
    * @returns {Promise<object>}
    */
    static modroid(query) {
        return new Promise((resolve, reject) => {
            ScrapMini.logger.info(`Searching for ${query}...`);
            Utils.fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${query}&apikey=${FileDB.apiKeys.tobz}`)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
    /**
    * Get modded APK from happymod.
    * @param {string} query
    * @returns {Promise<object>}
    */
    static happymod(query) {
        return new Promise((resolve, reject) => {
            ScrapMini.logger.info(`Searching for ${query}...`);
            Utils.fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${query}&apikey=${FileDB.apiKeys.tobz}`)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
    /**
    * Get Line sticker from URL.
    * @param {string} url
    * @returns {Promise<object>}
    */
    static line(url) {
        return new Promise((resolve, reject) => {
            ScrapMini.logger.info(`Get Line sticker from ${url}`);
            Utils.fetchJson(`http://enznoire.herokuapp.com/line?url=${url}`)
                .then((result) => resolve(result))
                .catch((err) => reject(err));
        });
    }
}
ScrapMini.logger = _pino.child({ class: 'bodão scrapper' });
/*export {
   dlmediafire,
   wikipedia,
   pinterest,
   wallpaper,
   wikimedia,
   quotesAnime,
   aiovideodl,
   ytMp4,
   ytMp3,
   UploadFile,
   TelegraPh,
   webp2mp4File
};
*/
fs.watchFile(file, () => {
    fs.unwatchFile(file), _pino.info(chalk['cyan']('\x0a\x0a' + __filename + ' :\x0a[!] ' + __('It was updated successfully') + monospace + ' ✓\x0a\x0a')), delete require['cache'][file], require(file);
});
//# sourceMappingURL=ScrapMini.js.map
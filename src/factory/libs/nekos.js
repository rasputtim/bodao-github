var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { get } from 'https';
import fetch from "node-fetch";
import { URL, URLSearchParams } from 'url';
import BotDB from '../../basededatos/database.js';
import Utils from './functions.js';
;
export const nekosLife_img = {
    TICKLE: "tickle",
    SLAP: "slap",
    POKE: "poke",
    PAT: "pat",
    NEKO: "neko",
    MEOW: "meow",
    LIZARD: "lizard",
    KISS: "kiss",
    HUG: "hug",
    FOXGIRL: "foxGirl",
    FEED: "feed",
    CUDDLE: "cuddle",
    NEKOGIF: "nekoGif",
    KOMONOMIMI: "kemonomimi",
    HOLO: "holo",
    SMUG: "smug",
    BAKA: "baka",
    WOOF: "woof",
    WALLPAPER: "wallpaper",
    GOOSE: "goose",
    GECG: "gecg"
};
export const nekosLife_img_neko = {
    NEKO: "neko",
    FOX_GIRL: "fox_girl",
    NGIF: "ngif",
    WAIFU: "waifu",
    AVATAR: "avatar"
};
export const nekosLifeCats = {
    WHY: "why",
    CAT: "cat",
    OWOIFY: "OwOify",
    EIGHTBALL: "eightBall",
    FACT: "fact",
    SPOILER: "spoiler"
};
//=======NEKOS BEST TYPES===================
//https://github.com/nekos-best/docs/blob/main/src/api/endpoints.md
//Type: Use the type query to get 1 images or 2 GIFs results.
export const nekosBestType = {
    IMAGE: 1,
    GIF: 2
};
export const nekosBestIMG = {
    HUSBUNDO: 'husbando',
    KITSUNE: 'kitsune',
    NEKO: 'neko',
    WAIFU: 'waifu'
};
export const nekosBestGIF = {
    BAKA: 'baka',
    BITE: 'bite',
    BLUSH: 'blush',
    BORED: 'bored',
    CRY: 'cry',
    CUDDLE: 'cuddle',
    DANCE: 'dance',
    FACEPALM: 'facepalm',
    FEED: 'feed',
    HANDHOLD: 'handhold',
    HAPPY: 'happy',
    HIGHFIVE: 'highfive',
    HUG: 'hug',
    KICK: 'kick',
    KISS: 'kiss',
    LAUGH: 'laugh',
    PAT: 'pat',
    POKE: 'poke',
    POUT: 'pout',
    PUNCH: 'punch',
    SHOOT: 'shoot',
    SHRUG: 'shrug',
    SLAP: 'slap',
    SLEEP: 'sleep',
    SMILE: 'smile',
    SMUG: 'smug',
    STARE: 'stare',
    THINK: 'think',
    THUMBSUP: 'thumbsup',
    TICKLE: 'tickle',
    WAVE: 'wave',
    WINK: 'wink',
    YEET: 'yeet'
};
function getContent(url) {
    return new Promise((resolve, reject) => {
        get(url, (res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                res.resume();
                reject(`Request failed. Status code: ${statusCode}`);
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    resolve(parsedData);
                }
                catch (e) {
                    reject(`Error: ${e.message}`);
                }
            });
        }).on('error', (err) => {
            reject(`Error: ${err.message}`);
        });
    });
}
class NekosLifeClient {
    constructor() {
        this.endpoints = BotDB.nekosEndPoints;
        let self = this;
        let baseURL = 'https://nekos.life/api/v2';
        Object.keys(this.endpoints).forEach((endpoint) => __awaiter(this, void 0, void 0, function* () {
            self[endpoint] = function (queryParams = '') {
                return __awaiter(this, void 0, void 0, function* () {
                    let url = new URL(`${baseURL}${this.endpoints[endpoint]}`);
                    queryParams !== '' ? url.search = new URLSearchParams(queryParams).toString() : '';
                    return yield getContent(url.toString());
                });
            };
        }));
    }
}
export function getNekosBest(category = nekosBestIMG.NEKO, amount = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://nekos.best/api/v2/${category}?amount=${amount}`);
        const json = yield response.json();
        //console.log(json.results[0].url)
        return Promise.resolve(json.results ? json.results[0] : false);
    });
}
/**
* search specific Anime from Nekos Best (https://nekos.best/)
* GET /search?query=Search_String&type=X&category=X&amount=X
* Type: Use the type query to get 1 images or 2 GIFs results.
* Optional parameters:  (category / amount)
*
* * categories:
* Categories
    Images (.png)
    husbando, kitsune, neko, waifu
    GIFs (.gif)

    baka, bite, blush, bored, cry, cuddle, dance, facepalm, feed, handhold, happy, highfive, hug, kick,kiss, laugh, pat, poke, pout, punch, shoot, shrug, slap, sleep, smile, smug, stare, think, thumbsup, tickle, wave, wink, yeet
* amount: The amount query may be used to retrieve multiple assets at once. The amount is a number such that 1 ≤ X ≤ 20.
 Result:
 "results":[
    {
       "anime_name":"Sword Art Online",
       "url":"https://nekos.best/api/v2/hug/008.gif"
    },
    {
       "anime_name":"Hibike! Euphonium",
       "url":"https://nekos.best/api/v2/hug/004.gif"
    }
 ]
    * @returns image from site Nekos.best
*/
export function searchNekosBest(search_string, type = nekosBestType.IMAGE, category = null, amount = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!search_string || search_string === '' || typeof search_string !== 'string')
            return Promise.reject('missing argument');
        if (category) {
            //check type and category match
            if (Utils.isObjKey(category, nekosBestIMG)) {
                type = nekosBestType.IMAGE;
            }
            else if (Utils.isObjKey(category, nekosBestGIF)) {
                type = nekosBestType.GIF;
            }
            else {
                category = null;
            }
        }
        try {
            let response;
            if (category) {
                response = yield fetch(`https://nekos.best/api/v2/search?query=${search_string}&type=${type}&category=${category}&amount=${amount}`);
            }
            else {
                response = yield fetch(`https://nekos.best/api/v2/search?query=${search_string}&type=${type}`);
            }
            const json = yield response.json();
            //console.log(json.results[0].url)
            if (Array.isArray(json.results) && json.results.length > 0)
                return Promise.resolve(json.results[0]);
            else if (json.errors)
                return Promise.resolve(json.errors);
        }
        catch (err) {
            return Promise.resolve(false);
        }
    });
}
export const waifyPicsType = {
    SFW: 'sfw',
    NSFW: 'nsfw'
};
export const waifuPicsCatSFW = {
    WAIFY: 'waifu',
    NEKO: 'neko',
    SHINOBU: 'shinobu',
    MEGUMIN: 'megumin',
    BULLY: 'bully',
    CUDDLE: 'cuddle',
    CRY: 'cry',
    HUG: 'hug',
    AWOO: 'awoo',
    KISS: 'kiss',
    LICK: 'lick',
    PAT: 'pat',
    SMUG: 'smug',
    BONK: 'bonk',
    YEET: 'yeet',
    BLUSH: 'blush',
    SMILE: 'smile',
    WAVE: 'wave',
    HIGHFIVE: 'highfive',
    HANDHOLD: 'handhold',
    NOM: 'nom',
    BITE: 'bite',
    GLOMP: 'glomp',
    SLAP: 'slap',
    KILL: 'kill',
    KICK: 'kick',
    HAPPY: 'happy',
    WINK: 'wink',
    POKE: 'poke',
    DANCE: 'dance',
    CRINGE: 'cringe'
};
export const waifuPicsCatNSFW = {
    WAIFU: 'waifu',
    NEKO: 'neko',
    TRAP: 'trap',
    BLOWJOB: 'blowjob'
};
//=========WAIFU PICS=================
//https://github.com/Waifu-pics/waifu-api
//https://waifu.pics/docs
// METHOD: POST
// URL: https://api.waifu.pics/many/type/category
// METHOD: GET
// URL: https://api.waifu.pics/type/category
/*
many:
type:   sfw / nsfw
category: swf: waifu
neko
shinobu
megumin
bully
cuddle
cry
hug
awoo
kiss
lick
pat
smug
bonk
yeet
blush
smile
wave
highfive
handhold
nom
bite
glomp
slap
kill
kick
happy
wink
poke
dance
cringe
          nsfw:waifu, neko, trap, blowjob
*/
export function getWaifuPics(type = waifyPicsType.SFW, category = waifuPicsCatSFW.NEKO) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield Utils.fetchJson(`https://api.waifu.pics/${type}/${category}`);
            return Promise.resolve(response);
        }
        catch (err) {
            console.log(err);
        }
    });
}
//Nekos.moe
//https://nekos.moe/api/v1/random/image?nsfw=true&count=1
//to get the image: https://nekos.moe/image/{id}
const nekosMoeTags = {
    0: '1girl',
    1: '3;',
    2: 'all fours',
    3: 'animal ears',
    4: 'aqua eyes',
    5: 'bangs',
    6: 'barefoot',
    7: 'black skirt',
    8: 'blonde hair',
    9: 'blush',
    10: 'cat ears',
    11: 'cat girl',
    12: 'cat tail',
    13: 'closed mouth',
    14: 'dutch angle',
    15: 'eyebrows visible through hair',
    16: 'hair between eyes',
    17: 'long hair',
    18: 'looking at viewer',
    19: 'one eye closed',
    20: 'original',
    21: 'pleated skirt',
    22: 'ribbed sweater',
    23: 'sidelocks',
    24: 'simple background',
    25: 'skirt',
    26: 'solo',
    27: 'stretch',
    28: 'sweater',
    29: 'tail',
    30: 'top down bottom up',
    31: 'white background'
};
export function getNekosMoe(nsfw = false, count = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield Utils.fetchJson(`https://nekos.moe/api/v1/random/image?nsfw=${nsfw}&count=${count}`);
            const imge = response.images[0];
            if (Utils.isObjKey('id', imge)) {
                const id = imge.id;
                const image = { url: `https://nekos.moe/image/${id}` };
                return Promise.resolve(image);
            }
            else {
                return Promise.reject(false);
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
/**
 *
 * @param searchString
 * @param searchParams
 * POST /images/search
Content-Type: application/json
 *
 * id 	String;
nsfw 	Boolean;
uploader 	String | Object;
artist 	String;
tags 	Array<String>;
sort 	String* 	"newest" 	false
posted_before 	Number (milliseconds);
posted_after 	Number (milliseconds);
skip 	Number 0-2500 	0 	false
limit 	Number 1-50 	20 	false
 * @returns
 */
export function searchNekosMoe(searchString, searchParams = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!searchString || searchString === '' || typeof searchString !== 'string')
            return Promise.reject('missing argument');
        if (!searchParams || searchParams === '' || typeof searchParams !== 'object')
            return Promise.reject('missing argument');
        try {
            let response;
            response = yield Utils.fetchJsonPOST(`https://nekos.moe/api/v1/images/search`, searchParams);
            const json = yield response.json();
            //console.log(json.results[0].url)
            if (Array.isArray(json.results) && json.results.length > 0)
                return Promise.resolve(json.results[0]);
            else if (json.errors)
                return Promise.resolve(json.errors);
        }
        catch (err) {
            return Promise.resolve(false);
        }
    });
}
export default NekosLifeClient;
//# sourceMappingURL=nekos.js.map
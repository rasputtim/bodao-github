/**
 * @ Author: AirMineral Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Tempat consume api
 */
import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs-extra';
import { Agent } from 'https';
import lodash from 'lodash';
import yts from 'yt-search';
import FileDB from '../../basededatos/fileDatabase.js';
import Bot from '../../factory/bot.js';
const { sample } = lodash;
const agent = new Agent({
    rejectUnauthorized: false
});
const { get } = axios;
const { readFileSync } = fs;
// eslint-disable-next-line no-unused-vars
const { apiFarzain, apiItech, apiZeks, apiLol, apiGenius, apiOcr, vhtear } = JSON.parse(readFileSync(FileDB.settingAPIDB));
global.APIs = {
    // name: 'https://website'
    zenz: 'https://zenzapis.xyz',
    nrtm: 'https://nurutomo.herokuapp.com',
    bg: 'http://bochil.ddns.net',
    xteam: 'https://api.xteam.xyz',
    melcanz: 'httpa://melcanz.com',
    lol: 'https://api.lolhuman.xyz',
    zahir: 'https://zahirr-web.herokuapp.com',
    zeks: 'https://api.zeks.xyz',
    pencarikode: 'https://pencarikode.xyz',
    LeysCoder: 'https://leyscoders-api.herokuapp.com'
};
global.APIKeys = {
    // 'https://website': 'apikey'
    'https://zenzapis.xyz': 'hdiiofficial',
    'https://api.xteam.xyz': '243bfaf72f276a41',
    'https://melcanz.com': 'pRsGgtLR',
    'https://api.lolhuman.xyz': '44dab6525da4f83bb6f5515f',
    'https://zahirr-web.herokuapp.com': 'zahirgans',
    'https://api.zeks.xyz': 'apivinz',
    'https://pencarikode.xyz': 'pais',
    'https://leyscoders-api.herokuapp.com': 'dappakntlll'
};
const quote = () => new Promise((resolve, reject) => {
    let slash = sample(["quotes", "quotes2", "quotes3"]);
    get(`https://api.i-tech.id/tools/${slash}?key=${apiItech}`)
        .then((res) => {
        let text = '';
        let hasAuthorProperty = Object.prototype.hasOwnProperty.call(res.data, 'author');
        if (hasAuthorProperty) {
            text = `Author: ${res.data.author}\n\nQuote: ${res.data.result}`;
        }
        else {
            text = res.data.result;
        }
        resolve(text);
    })
        .catch((err) => {
        reject(err);
    });
});
const ytsearch = (query) => new Promise((resolve, reject) => {
    yts(query)
        .then((res) => {
        let data = res.all.slice(0, 5);
        resolve(data);
    }).catch((err) => {
        reject(err);
    });
});
const artinama = (nama) => new Promise((resolve, reject) => {
    get(`https://api.zeks.xyz/api/artinama?apikey=${apiZeks}&nama=${encodeURIComponent(nama)}`)
        .then((res) => {
        resolve(res.data.result);
    })
        .catch((err) => {
        reject(err);
    });
});
const lyric = (query) => new Promise((resolve, reject) => {
    get(`https://api.genius.com/search?q=${encodeURIComponent(query)}&access_token=${apiGenius}`)
        .then(res => {
        if (res.data.meta.status != 200)
            reject(res.data.meta.status + res.data.meta.message);
        const { hits } = res.data.response;
        if (hits[0]) {
            get(hits[0].result.url).then(resu => {
                var _a;
                const $ = load(resu.data);
                let lyrics = $('div[class="lyrics"]').text().trim();
                if (!lyrics) {
                    lyrics = '';
                    $('div[class^="Lyrics__Container"]').each((i, elem) => {
                        if ($(elem).text().length !== 0) {
                            let snippet = $(elem).html() ? $(elem).html() : ''
                                .replace(/<br>/g, '\n')
                                .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, '');
                            lyrics += $('<textarea/>').html(snippet).text().trim() + '\n\n';
                        }
                    });
                }
                if (!lyrics)
                    return resolve(`Error! Lirik tidak ditemukan.`);
                resolve(`${(_a = hits[0]) === null || _a === void 0 ? void 0 : _a.result.full_title}\n\n${lyrics.trim()}`);
            }).catch(reject);
        }
        else {
            get(`https://scrap.terhambar.com/lirik?word=${encodeURIComponent(query)}`, { httpsAgent: agent })
                .then((res) => {
                var _a, _b;
                resolve((_b = (_a = res.data) === null || _a === void 0 ? void 0 : _a.result) === null || _b === void 0 ? void 0 : _b.lirik);
            })
                .catch((err) => {
                reject(err);
            });
        }
    }).catch(reject);
});
const cuaca = (daerah) => new Promise((resolve, reject) => {
    get(`https://rest.farzain.com/api/cuaca.php?id=${encodeURIComponent(daerah)}&apikey=${apiFarzain}`)
        .then((res) => {
        if (res.data.respon.cuaca == null)
            resolve('Sorry your area is not available');
        const text = `Weather in: ${res.data.respon.tempat}\n\nWeather: ${res.data.respon.cuaca}\nWind: ${res.data.respon.angin}\nDesk: ${res.data.respon.deskripsi}\nKelembapan: ${res.data.respon.kelembapan}\nSuhu: ${res.data.respon.suhu}\nUdara: ${res.data.respon.udara}`;
        resolve(text);
    })
        .catch((err) => {
        reject(err);
    });
});
const tulis = (teks) => new Promise((resolve, reject) => {
    get(`https://arugaz.herokuapp.com/api/nulis?text=${encodeURIComponent(teks)}`)
        .then((res) => {
        resolve(`${res.data.result}`);
    })
        .catch((err) => {
        reject(err);
    });
});
/**
*
* @param  {String} query
*
*/
const random = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'AdviceAnimals', 'MemeEconomy', 'memes', 'terriblefacebookmemes', 'historymemes', 'okbuddyretard', 'nukedmemes'];
const sreddit = (reddit = '') => new Promise((resolve, reject) => {
    if (reddit === '')
        reddit = sample(random);
    get('https://meme-api.herokuapp.com/gimme/' + reddit)
        .then((rest) => {
        resolve(rest.data);
    })
        .catch((err) => {
        reject(err);
    });
});
/**
 * create custom meme
 * return a link to the api that will create a custom meme
 * @param  {String} imageUrl
 * @param  {String} topText
 * @param  {String} bottomText
 */
const memegen = (imageUrl, top, bottom) => {
    let topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s');
    let bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/%/g, '~p').replace(/#/g, '~h').replace(/\//g, '~s');
    return `https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`;
};
/**
 * create custom meme
 * return a link to the api that will create a custom meme
 * @param  {String} imageUrl
 * @param  {String} topText
 * @param  {String} bottomText
 */
const vhtearlink = (q) => {
    return `https://api.vhtear.com/textxgif?text=${q}&apikey=${vhtear}`;
};
/**
 *
 * @param  {String} query
 *
 */
const pinterest = (wall) => new Promise((resolve, reject) => {
    get('https://fdciabdul.tech/api/pinterest?keyword=' + encodeURIComponent(wall), { httpsAgent: agent })
        .then((result) => {
        resolve(result.data);
    })
        .catch((err) => {
        reject(err);
    });
});
/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiLol = (inp) => new Promise((resolve, reject) => {
    get(`https://api.lolhuman.xyz/api/simi?apikey=${apiLol}&text=${encodeURIComponent(inp)}`)
        .then(res => {
        resolve(res.data.result);
    })
        .catch((e) => {
        reject(`SimiLol error: ` + e.message);
    });
});
/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiPais = (inp) => new Promise((resolve, reject) => {
    get(`https://pencarikode.xyz/api/simsimii?apikey=pais&text=${encodeURIComponent(inp)}`)
        .then(res => {
        resolve(res.data.result);
    })
        .catch((e) => {
        reject(`SimiPais error: ` + e.message);
    });
});
/**
 *
 * @param  {String} query
 * @returns {String} msg
 */
const simiZeks = (inp) => new Promise((resolve, reject) => {
    get(`https://api.zeks.xyz/api/simi?apikey=${apiZeks}&text=${encodeURIComponent(inp)}`)
        .then(res => {
        resolve(res.data.result);
    })
        .catch((e) => {
        reject(`SimiZeks error: ` + e.message);
    });
});
/**
 * https://sim.vuiz.net/
 * @param  {String} query
 * @returns {String} msg
 */
const simiSumi = (inp) => new Promise((resolve, reject) => {
    get(`https://simsumi.herokuapp.com/api?text=${encodeURIComponent(inp)}`)
        .then(res => {
        resolve(res.data.success);
    })
        .catch((e) => {
        reject(`Simisumi error: ` + e.message);
    });
});
const simiSimi = (imp) => new Promise((resolve, reject) => {
    //const botMessage = `` + this._super.body 
    //var SIMIresponse = await Utils.fetchJson(botMessage);
    get(`https://api.simsimi.net/v2/?text=${encodeURIComponent(imp)}` + `&lc=` + Bot.numidioma)
        .then(res => {
        resolve(res.data.success);
    })
        .catch((e) => {
        reject(`Simisimi error: ` + e.message);
    });
});
/**
 *
 * @param  {String} url
 
 */
const ocr = (url) => new Promise((resolve, reject) => {
    get(`https://api.ocr.space/parse/imageurl?apikey=${apiOcr}&url=${url}`)
        .then(res => {
        var _a, _b, _c, _d;
        if (((_a = res.data) === null || _a === void 0 ? void 0 : _a.IsErroredOnProcessing) == true)
            resolve((_b = res.data) === null || _b === void 0 ? void 0 : _b.ErrorMessage);
        else
            resolve((_d = (_c = res.data) === null || _c === void 0 ? void 0 : _c.ParsedResults[0]) === null || _d === void 0 ? void 0 : _d.ParsedText);
    })
        .catch(err => {
        reject(err);
    });
});
const ttdl = (url) => new Promise((resolve, reject) => {
    get(`https://hardianto-chan.herokuapp.com/api/download/tiktok?apikey=hardianto&url=${encodeURIComponent(url)}`)
        .then(res => {
        resolve(res.data);
    }).catch(reject);
});
export default {
    pinterest,
    artinama,
    ytsearch,
    simiPais,
    simiSumi,
    simiSimi,
    simiZeks,
    simiLol,
    sreddit,
    memegen,
    quote,
    cuaca,
    tulis,
    lyric,
    ttdl,
    ocr,
    vhtearlink
};
//# sourceMappingURL=api.js.map
import BotDB from '../../basededatos/database.js';
import Utils from './functions.js';
const { config } = JSON.parse(BotDB.createReadFileSync('../config.json'));
export default class weaboo {
}
/**
 * Get anime info from Kusonime.
 * @param {string} title
 * @returns {Promise<object>}
 */
weaboo.anime = (title) => new Promise((resolve, reject) => {
    weaboo.logger.info(`Get anime info from Kusonime for ${title}...`);
    Utils.fetchJson(`https://arugaz.herokuapp.com/api/kuso?q=${title}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get manga info from Komiku.
 * @param {string} title
 * @returns {Promise<object>}
 */
weaboo.manga = (title) => new Promise((resolve, reject) => {
    weaboo.logger.info(`Get manga info from Komiku for ${title}...`);
    Utils.fetchJson(`https://arugaz.herokuapp.com/api/komiku?q=${title}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get random waifu image.
 * @param {boolean} [nsfw=false]
 * @returns {Promise<object>}
 */
weaboo.waifu = (nsfw) => new Promise((resolve, reject) => {
    if (nsfw === true) {
        weaboo.logger.info('Get NSFW waifu image...');
        Utils.fetchJson('https://waifu.pics/api/nsfw/waifu')
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    }
    else {
        weaboo.logger.info('Get SFW waifu image...');
        Utils.fetchJson('https://waifu.pics/api/sfw/waifu')
            .then((result) => resolve(result))
            .catch((err) => reject(err));
    }
});
/**
 * Search for anime source from image.
 * @param {Buffer} imageBase64
 * @returns {Promise<object>}
 */
weaboo.wait = (imageBase64) => new Promise((resolve, reject) => {
    weaboo.logger.info('Searching for anime source...');
    Utils.fetchJson('https://trace.moe/api/search', {
        method: 'POST',
        body: JSON.stringify({ image: imageBase64 }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get Anitoki latest update.
 * @returns {Promise<object>}
 */
weaboo.anitoki = () => new Promise((resolve, reject) => {
    weaboo.logger.info('Get Anitoki latest update...');
    Utils.fetchJson(`https://melodicxt.herokuapp.com/api/anitoki?apiKey=${config.melodic}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get Neonime latest update.
 * @returns {Promise<object>}
 */
weaboo.neonime = () => new Promise((resolve, reject) => {
    weaboo.logger.info('Get Neonime latest update...');
    Utils.fetchJson('https://enznoire.herokuapp.com/neolatest')
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get Anoboy anime on-going list.
 * @returns {Promise<object>}
 */
weaboo.anoboy = () => new Promise((resolve, reject) => {
    weaboo.logger.info('Get Anoboy on-going...');
    Utils.fetchJson(`https://api.vhtear.com/ongoinganoboy&apikey=${config.vhtear}`)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get Random anime sticker
 * @returns {string}
 */
weaboo.snime = () => new Promise((resolve, reject) => {
    weaboo.logger.info('Get anime sticker...');
    Utils.fetchText('https://raw.githubusercontent.com/rashidsiregar28/data/main/animestick', {})
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get random video loli.
 * @returns {string}
 */
weaboo.loli = () => new Promise((resolve, reject) => {
    weaboo.logger.info('Get random video loli...');
    Utils.fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/random/main/loli.txt', {})
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
//# sourceMappingURL=weeaboo.js.map
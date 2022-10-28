import { Logger } from 'pino';
export default class weaboo {
    static logger: Console | Logger;
    /**
     * Get anime info from Kusonime.
     * @param {string} title
     * @returns {Promise<object>}
     */
    static anime: (title: any) => Promise<unknown>;
    /**
     * Get manga info from Komiku.
     * @param {string} title
     * @returns {Promise<object>}
     */
    static manga: (title: any) => Promise<unknown>;
    /**
     * Get random waifu image.
     * @param {boolean} [nsfw=false]
     * @returns {Promise<object>}
     */
    static waifu: (nsfw: any) => Promise<unknown>;
    /**
     * Search for anime source from image.
     * @param {Buffer} imageBase64
     * @returns {Promise<object>}
     */
    static wait: (imageBase64: any) => Promise<unknown>;
    /**
     * Get Anitoki latest update.
     * @returns {Promise<object>}
     */
    static anitoki: () => Promise<unknown>;
    /**
     * Get Neonime latest update.
     * @returns {Promise<object>}
     */
    static neonime: () => Promise<unknown>;
    /**
     * Get Anoboy anime on-going list.
     * @returns {Promise<object>}
     */
    static anoboy: () => Promise<unknown>;
    /**
     * Get Random anime sticker
     * @returns {string}
     */
    static snime: () => Promise<unknown>;
    /**
     * Get random video loli.
     * @returns {string}
     */
    static loli: () => Promise<unknown>;
}
//# sourceMappingURL=weeaboo.d.ts.map
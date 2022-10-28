/// <reference types="node" />
import ytdl from 'bodao-ytdl-core';
import type { Logger } from 'pino';
export default class ScrapMini {
    static logger: Console | Logger;
    static bytesToSize(thesize: any): Promise<unknown>;
    static dlmediafire(_0x10a5b3: any): Promise<any>;
    static wikipedia(searchText: any): Promise<any>;
    static pinterest(searchText: any): Promise<unknown>;
    static wallpaper(searchText: any, _0x278f23?: string): Promise<unknown>;
    static wikimedia(searchText: any): Promise<unknown>;
    static quotesAnim(): Promise<unknown>;
    static aiovideodl(linkToDownload: any): Promise<unknown>;
    /**
        * Get YouTube media from URL.
        * @param {string} url
        * @returns { }  { inf, stream} video information and stream data
        */
    static ytdl(url: any): Promise<{
        name: any;
        inf: ytdl.MoreVideoDetails;
        stream: import("stream").Readable;
    } | undefined>;
    static ytMp4(linkToDownload: any): Promise<{
        title: string;
        result: any;
        quality: any;
        size: any;
        thumb: string;
        views: string;
        likes: number | null;
        dislike: number | null;
        channel: string;
        uploadDate: string;
        desc: string | null;
    } | null | undefined>;
    static ytMp3(linkToDownload: any): Promise<void>;
    static TelegraPh(_0x316c17: any): Promise<unknown>;
    static UploadFile(_0x501bbd: any): Promise<unknown>;
    static webp2mp4File(path: any): Promise<void>;
    /**
         * Get Joox music metadata from title.
         * @param {string} title
         * @returns {Promise<object>}
         */
    static joox(title: any): Promise<unknown>;
    /**
    * Get Twitter media from URL.
    * @param {string} url
    * @returns {Promise<object>}
    */
    static tweet(url: any): Promise<unknown>;
    /**
    * Get TikTok video with no WM.
    * @param {string} url
    * @returns {Promise<object>}
    */
    static tikNoWm(url: any): Promise<unknown>;
    /**
    * Get modded APK from moddroid.
    * @param {string} query
    * @returns {Promise<object>}
    */
    static modroid(query: any): Promise<unknown>;
    /**
    * Get modded APK from happymod.
    * @param {string} query
    * @returns {Promise<object>}
    */
    static happymod(query: any): Promise<unknown>;
    /**
    * Get Line sticker from URL.
    * @param {string} url
    * @returns {Promise<object>}
    */
    static line(url: any): Promise<unknown>;
}
//# sourceMappingURL=ScrapMini.d.ts.map
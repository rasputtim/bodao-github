/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-05-01 19:29:50
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)

 * @ Description: Scrape tipis-tipis lah daripada pake api
 */
import { Logger } from 'pino';
import { Browser } from 'puppeteer';
import bcv_parser from "../../custom_modules/Scripture-Parser/js/pt_bcv_parser.js";
declare class bodaoScrapper {
    static logger: Console | Logger;
    static bcv: bcv_parser;
    static _browser: Browser;
    static getBrowser(): Promise<Browser>;
    static instagram(url: any): Promise<void | ({
        thumbnail: string;
    } & {
        url: string;
    })[]>;
    static instaStory(username: any): Promise<void>;
    static tiktok(url: any): Promise<void>;
    static allinone(url: any): Promise<any>;
    static image(keyword: any): Promise<void>;
}
declare function lirik(judul: any): Promise<unknown>;
declare const _default: {
    bodaoScrapper: typeof bodaoScrapper;
    useragents: () => Promise<unknown>;
    pinterestAbdul: (wall: any) => Promise<unknown>;
    pinterestLight: (query: any) => Promise<unknown>;
    saveFromStory: (username: any) => Promise<unknown>;
    pinterest_: (querry: any) => Promise<unknown>;
    saveFrom: (url: any, isIG?: boolean) => Promise<unknown>;
    snaptik: (url: any) => Promise<unknown>;
    gimage: (query: any) => Promise<unknown>;
    ssstik: (url: any) => Promise<unknown>;
    lirik: typeof lirik;
    ssweb: (path: any, url: any, viewPort?: {
        width: number;
        height: number;
    }) => Promise<unknown>;
    kbbi: (query: any) => Promise<unknown>;
    scriptures: (what: any) => Promise<unknown>;
};
export default _default;
//# sourceMappingURL=bodaoscrapper.d.ts.map
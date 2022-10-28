/* eslint-disable no-async-promise-executor */
/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-05-01 19:29:50
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)

 * @ Description: Scrape tipis-tipis lah daripada pake api
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// BY SEROBOT => https://github.com/dngda/bot-whatsapp
import { aiovideodl, googleImage, instagramdl, instagramdlv2, instagramStory, instagramStoryv2, pinterest, savefrom, stickerTelegram, tiktokdl, tiktokdlv2, wallpaper } from '@bochilteam/scraper';
import axios from "axios";
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import { Agent } from 'https';
import lodash from "lodash";
import path from 'path';
import puppeteer from 'puppeteer';
import bcv_parser from "../../custom_modules/Scripture-Parser/js/pt_bcv_parser.js";
import Utils from './functions.js';
const { sample } = lodash;
const agent = new Agent({
    rejectUnauthorized: false
});
const __dirname = path.resolve();
/*  pupeeter scrap example
https://www.scrapehero.com/how-to-build-a-web-scraper-using-puppeteer-and-node-js/
 let bookingUrl = 'insert booking URL';
 (async () => {
 const browser = await puppeteer.launch({ headless: true });
 const page = await browser.newPage();
 await page.setViewport({ width: 1920, height: 926 });
 await page.goto(bookingUrl);
 // get hotel details
 let hotelData = await page.evaluate(() => {
 let hotels = [];
 // get the hotel elements
 let hotelsElms = document.querySelectorAll('div.sr_property_block[data-hotelid]');
 // get the hotel data
 hotelsElms.forEach((hotelelement) => {
 let hotelJson = {};
 try {
 hotelJson.name = hotelelement.querySelector('span.sr-hotel__name').innerText;
 hotelJson.reviews = hotelelement.querySelector('span.review-score-widget__subtext').innerText;
 hotelJson.rating = hotelelement.querySelector('span.review-score-badge').innerText;
 if(hotelelement.querySelector('strong.price')){
 hotelJson.price = hotelelement.querySelector('strong.price').innerText;
 }
 }
 catch (exception){
 }
 hotels.push(hotelJson);
 });
 return hotels;
 });
 console.dir(hotelData);
 })();

*/
class bodaoScrapper {
    static getBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            if (bodaoScrapper._browser) {
                res = bodaoScrapper._browser = yield puppeteer.launch({ headless: true });
            }
            else
                res = bodaoScrapper._browser;
            return Promise.resolve(res);
        });
    }
    //urlteste: https://www.instagram.com/reel/CXK49yFLtJ_/?utm_source=ig_web_copy_link
    static instagram(url) {
        return __awaiter(this, void 0, void 0, function* () {
            // Instagram Downloader
            instagramdl(url).then(console.log).catch(console.error);
            instagramdlv2(url).then(console.log).catch(console.error);
            // use both to handle error
            instagramdl(url).catch((_) => instagramdlv2(url)).then(console.log);
            // Use async/await or top level await
            const result1 = yield instagramdl(url).catch(console.error);
            bodaoScrapper.logger.info(result1);
            const result2 = yield instagramdlv2(url).catch(console.error);
            bodaoScrapper.logger.info(result2);
            return result1;
        });
    }
    static instaStory(username) {
        return __awaiter(this, void 0, void 0, function* () {
            // Instagram Story downloader
            //const username = 'freefirebgid'
            const story = yield instagramStory(username).catch((_) => __awaiter(this, void 0, void 0, function* () { return yield instagramStoryv2(username); }));
            bodaoScrapper.logger.info(story);
        });
    }
    static tiktok(url) {
        return __awaiter(this, void 0, void 0, function* () {
            // Tiktok downloader
            // Tiktok downloader v1
            //const url = 'https://www.tiktok.com/@tiktok/video/6844446901010982300'
            tiktokdl(url).then(console.log).catch(console.error);
            // tiktokdl v2
            tiktokdlv2(url).then(console.log).catch(console.error);
            // async / await 
            bodaoScrapper.logger.info(yield tiktokdl(url).catch(console.error));
            bodaoScrapper.logger.info(yield tiktokdlv2(url).catch(console.error));
        });
    }
    static allinone(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let video;
            if (url.includes('facebook')) {
                // Facebook video downloader
                video = yield aiovideodl(url);
            }
            if (url.includes('twitter')) {
                // Twitter video downloader
                video = yield aiovideodl(url);
            }
            if (url.includes('tiktok')) {
                // Tiktok downloader
                video = yield savefrom(url);
            }
            if (url.includes('instagram')) {
                // Instagram downloader
                video = yield savefrom(url);
            }
            return video;
        });
    }
    static image(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            // Images
            //const keyword = 'minecraft'
            // Google image
            bodaoScrapper.logger.info(yield googleImage(keyword));
            // Pinterest image
            bodaoScrapper.logger.info(yield pinterest(keyword));
            // Wallpaper
            bodaoScrapper.logger.info(yield wallpaper(keyword));
            // Sticker telegram
            bodaoScrapper.logger.info(yield stickerTelegram(keyword));
        });
    }
}
bodaoScrapper.bcv = new bcv_parser;
/**
 * Search KBBI
 *
 * @param  {String} query
 * @returns {Promise} <String> arti
 */
const kbbi = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const url = 'https://kbbi.web.id/';
        axios.get(url + query).then(res => {
            const $ = cheerio.load(res.data);
            const arti = $('div#d1').text().trim();
            resolve(arti);
        }).catch(reject);
    });
});
/**
 * Search Pinterest using puppeteer
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} `Promise` resolve url
*/
const pinterestLight = (query) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://id.pinterest.com/search/pins/?rs=typed&q=";
    let page = yield (yield bodaoScrapper.getBrowser()).newPage();
    yield page.setViewport({ width: 1920, height: 926 });
    yield page.goto(url + encodeURIComponent(query)).catch((e) => reject(e));
    yield page.waitForSelector(".Collection", {
        visible: true,
    });
    let resu = yield page.$$eval(`img.GrowthUnauthPinImage__Image`, (e) => {
        return e.map(el => {
            var _a;
            return (_a = el.getAttribute("src")) === null || _a === void 0 ? void 0 : _a.replace("236x", "originals");
        });
    });
    resolve(resu);
    yield page.close();
}));
/**
 *
 * @param  {String} query
 *
 */
const pinterestAbdul = (wall) => new Promise((resolve, reject) => {
    axios.get('https://fdciabdul.tech/api/pinterest?keyword=' + encodeURIComponent(wall), { httpsAgent: agent })
        .then((result) => {
        resolve(result.data);
    })
        .catch((err) => {
        reject(err);
    });
});
const useragents = () => new Promise((resolve, reject) => {
    let lst = ['Firefox', 'Internet+Explorer', 'Opera', 'Safari', 'Chrome', 'Edge', 'Android+Webkit+Browser'];
    let br = Utils.selectRamdomFromArray(lst);
    let url = 'http://www.useragentstring.com/pages/useragentstring.php?name=' + br;
    axios.get(url, {
        headers: {
            "sec-ch-ua": "\"Chromium\";v=\"90\", \"Opera GX\";v=\"76\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "upgrade-insecure-requests": "1",
            "cookie": "csrftoken=ebe0be3a93cea6072be18633add953a2; _b=\"AVezvd6F4UtE24FUsA6INxipyZZDoSpyCc5vaJK4QDYXmExosVEc4h6WkiKhlVtQ430=\"; cm_sub=denied; fba=True; _ga=GA1.2.862909259.1620474446; g_state={\"i_l\":0}; _auth=1; _pinterest_sess=TWc9PSZ0VEZqZmdDSlJYaGU5REIvNklIcVlnMjE5b0ZraTE5REJVQ0JiMUwxTkZZaGFoVk1sRDVhOFlwQzhkQnQ0YkMwRlNyV0lIWUFlK0ZVTkVxYUhKNmlvZ0R1UXlQYTBRRVVhMU1yYkpmcXpHK3UyNjNhckRqUFFOYVJVa3RnVmJtVzd2MmRGaHFMZUpLNVhtaHptTDhWSnBSdXhZY0FhRnRTN3J1S0V4cGtsVTBxeE54NkF2blVNSFV3R0NTQTR1bVVNRURGVGdnYlN5UjdBbk9YcHVGbGI3a1kwd1dEZDgrZVM1SDc3V0pJMm00OWxKUDVNQjBLVlFocTB4Mjg1M1RnbGxBaFAxbS9MTnVzei91cEQvcjBtakp6N0ZnU2t1Y3NxWW1DRDV1Q3h0ankvQ3FEWGh3MXczcXBHNXJpYVNCMHB6dUoxMGF6ZzVxN2VqQVBoSElSd0tiQk41ZVRPQXlOaGNpNzVQMWJSeVZJbCtYYVMxQ1ZRUFUwalU3eGVzMGRySlNzdWo1NG5uaXNFM3ZpT0o0TkZHR1daUXlwaXFQclMwa04raW9xVnVaTTRSVGEzTE03TVlZcmZYVDd5UmVPd2lZaGw4aE9VMHJBd0tidEsrcHdPWk96RlFMekVLTzY3VU1PL0tIYUdwUE1IWVdJNnJXalBkU09Sb3dEaHlQVVR1T1RqNW5Sc2FRdmVkZmhkMk9HNHBCL0ZpZ3NMdmZvVW9ReVltTFBCTlNLWHpray9LNWJ2UTNvTlBzVm9aZjRvYWRvRFhla0dBNzdveWJVYXZmVFp2cnFFNU5DYUVwSHhxeDlIajNIVTlHaEVYdGptWm5mSGVSRmtIMmQwVVVVZlVCVEh6UHB3TnBtdWV0b2l6L3VTc3pXMXFGN3lHS3ZJM3BwL0NrWVJDMm1HY2tROGxuQVFRNS9OUW45R3dtSk8zeFJidVFSTG1qTG5PelAvKzd3T3lrN1NoKzBHVGNTY1pGSEY0bW8xcGVmc3NtclBhTWE2QUMxOXNpQWUwRmo4UHl0ZGpwUzhUQXVhbjYwT0ZJeHhHai8yOWFUVTA1Wkx2czN4VSttLzMvbkFVQ2svWnZvNC9xZ3E4VkhYSFZ5elo4TzhtU0o5c3ZDcEJyYjE3QVI1WHlmTTFhWThvWHQ1T0tSTWRsWnI3a1lpU245dEVLd1lZSXRremtkTUZmcVA2YUg0c1UrSk1JOWJVRzZpcWd3T0NVaFZkdUh3UUdURi9sbDBqT2pBZVV2ZnlTQzc5ZnBMYkFMQ1ZsWjdIYWcmaDc1Uk5kK2I4MjFMUXBaVUthci9rVHpCUWRvPQ==; _pinterest_cm=\"TWc9PSYxZnpkMS9XN29Rd2R0TnpBN0RzVktja1J4NUtINUJqRzNGODFXS0xES1pndWlNVm52a0d3V0JocmVIS3p5eDdnNXNZa0hGelNQNDBSTFRId3ZhTFFIQjRGOW1lNlJZMzFiVlg1MHhSOFpmMGhRZUoySUpJZDIyWlVYMjRXNHRaL1lodFl4eW1jWjNyTklpbytYbHZyd29nRm5DY0pQOGgyUWpDdk9zQ1craXR5VEZoNHV4ZzRnOXV4SUFFSStYZCsmT08zMFI1bktXa3pwSDFtK3NNRWpxWWNpQzNzPQ==\"; _routing_id=\"595f24cd-7f4c-4495-aa67-37212d099cd8\"; sessionFunnelEventLogged=1"
        }
    })
        .then((result) => {
        const pathToSave = path.resolve(__dirname, './src/basededatos/usuariosgod/useragents.json');
        const $ = cheerio.load(result.data);
        const lista = [];
        const arti = $('ul').each(function (a, b) {
            $(b).find('a').each(function (c, d) {
                let Link = $(d).text().trim();
                lista.push(Link);
            });
            fs.writeFileSync('', JSON.stringify(lista));
            resolve(lista);
        });
        //.text().trim()
        console.log(lista);
        resolve(result.data);
    })
        .catch((err) => {
        reject(err);
    });
});
// By RA awokoawk
const pinterest_ = (querry) => new Promise((resolve, reject) => {
    let ress = {};
    axios.get(`https://id.pinterest.com/search/pins/?q=` + querry, {
        headers: {
            "sec-ch-ua": "\"Chromium\";v=\"90\", \"Opera GX\";v=\"76\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "upgrade-insecure-requests": "1",
            "cookie": "csrftoken=ebe0be3a93cea6072be18633add953a2; _b=\"AVezvd6F4UtE24FUsA6INxipyZZDoSpyCc5vaJK4QDYXmExosVEc4h6WkiKhlVtQ430=\"; cm_sub=denied; fba=True; _ga=GA1.2.862909259.1620474446; g_state={\"i_l\":0}; _auth=1; _pinterest_sess=TWc9PSZ0VEZqZmdDSlJYaGU5REIvNklIcVlnMjE5b0ZraTE5REJVQ0JiMUwxTkZZaGFoVk1sRDVhOFlwQzhkQnQ0YkMwRlNyV0lIWUFlK0ZVTkVxYUhKNmlvZ0R1UXlQYTBRRVVhMU1yYkpmcXpHK3UyNjNhckRqUFFOYVJVa3RnVmJtVzd2MmRGaHFMZUpLNVhtaHptTDhWSnBSdXhZY0FhRnRTN3J1S0V4cGtsVTBxeE54NkF2blVNSFV3R0NTQTR1bVVNRURGVGdnYlN5UjdBbk9YcHVGbGI3a1kwd1dEZDgrZVM1SDc3V0pJMm00OWxKUDVNQjBLVlFocTB4Mjg1M1RnbGxBaFAxbS9MTnVzei91cEQvcjBtakp6N0ZnU2t1Y3NxWW1DRDV1Q3h0ankvQ3FEWGh3MXczcXBHNXJpYVNCMHB6dUoxMGF6ZzVxN2VqQVBoSElSd0tiQk41ZVRPQXlOaGNpNzVQMWJSeVZJbCtYYVMxQ1ZRUFUwalU3eGVzMGRySlNzdWo1NG5uaXNFM3ZpT0o0TkZHR1daUXlwaXFQclMwa04raW9xVnVaTTRSVGEzTE03TVlZcmZYVDd5UmVPd2lZaGw4aE9VMHJBd0tidEsrcHdPWk96RlFMekVLTzY3VU1PL0tIYUdwUE1IWVdJNnJXalBkU09Sb3dEaHlQVVR1T1RqNW5Sc2FRdmVkZmhkMk9HNHBCL0ZpZ3NMdmZvVW9ReVltTFBCTlNLWHpray9LNWJ2UTNvTlBzVm9aZjRvYWRvRFhla0dBNzdveWJVYXZmVFp2cnFFNU5DYUVwSHhxeDlIajNIVTlHaEVYdGptWm5mSGVSRmtIMmQwVVVVZlVCVEh6UHB3TnBtdWV0b2l6L3VTc3pXMXFGN3lHS3ZJM3BwL0NrWVJDMm1HY2tROGxuQVFRNS9OUW45R3dtSk8zeFJidVFSTG1qTG5PelAvKzd3T3lrN1NoKzBHVGNTY1pGSEY0bW8xcGVmc3NtclBhTWE2QUMxOXNpQWUwRmo4UHl0ZGpwUzhUQXVhbjYwT0ZJeHhHai8yOWFUVTA1Wkx2czN4VSttLzMvbkFVQ2svWnZvNC9xZ3E4VkhYSFZ5elo4TzhtU0o5c3ZDcEJyYjE3QVI1WHlmTTFhWThvWHQ1T0tSTWRsWnI3a1lpU245dEVLd1lZSXRremtkTUZmcVA2YUg0c1UrSk1JOWJVRzZpcWd3T0NVaFZkdUh3UUdURi9sbDBqT2pBZVV2ZnlTQzc5ZnBMYkFMQ1ZsWjdIYWcmaDc1Uk5kK2I4MjFMUXBaVUthci9rVHpCUWRvPQ==; _pinterest_cm=\"TWc9PSYxZnpkMS9XN29Rd2R0TnpBN0RzVktja1J4NUtINUJqRzNGODFXS0xES1pndWlNVm52a0d3V0JocmVIS3p5eDdnNXNZa0hGelNQNDBSTFRId3ZhTFFIQjRGOW1lNlJZMzFiVlg1MHhSOFpmMGhRZUoySUpJZDIyWlVYMjRXNHRaL1lodFl4eW1jWjNyTklpbytYbHZyd29nRm5DY0pQOGgyUWpDdk9zQ1craXR5VEZoNHV4ZzRnOXV4SUFFSStYZCsmT08zMFI1bktXa3pwSDFtK3NNRWpxWWNpQzNzPQ==\"; _routing_id=\"595f24cd-7f4c-4495-aa67-37212d099cd8\"; sessionFunnelEventLogged=1"
        }
    }).then(res => {
        const $ = cheerio.load(res.data);
        let hasil = [];
        $('body > div > div > div > div > div > div > div > div > div > div > div').each(function (a, b) {
            $(b).find('div').each(function (c, d) {
                let Link = $(d).find('div > div > div > div > a').find('img').attr('src');
                hasil.push(Link);
            });
        });
        let Data = new Set();
        hasil.forEach(h => {
            if (h === undefined)
                return;
            Data.add(h.replace('236x', 'originals'));
        });
        ress = {
            status: res.status,
            author: "RA",
            result: Array.from(Data)
        };
        resolve(ress.result);
    }).catch(reject);
});
/**
 * Search Google image
 *
 * @param  {Object} puppeteer browser
 * @param  {String} query
 * @returns {Promise} `Promise` that resolve url of image
 */
const gimage = (query) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://www.google.com/search?tbm=isch&q=";
    let page = yield (yield bodaoScrapper.getBrowser()).newPage();
    yield page.setViewport({ width: 1920, height: 926 });
    yield page.goto(url + encodeURIComponent(query)).catch((e) => reject(e));
    yield page
        .content()
        .then((html) => {
        let pattrn = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*(jpg|jpeg))/g;
        let res = html.match(pattrn);
        resolve(sample(res));
    })
        .catch((e) => reject(e));
    yield page.close();
}));
/**
 * Screenshot web
 *
 * @param  {Object} puppeteer browser
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve `true`
 */
const ssweb = (path, url, viewPort = {
    width: 1366,
    height: 1080,
}) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield (yield bodaoScrapper.getBrowser()).newPage();
    yield page.setViewport({ width: 1920, height: 926 });
    yield page.setViewport(viewPort);
    yield page.goto(url);
    setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield page
            .screenshot({
            path: path,
        })
            .catch((e) => reject(e));
        yield page.close();
        resolve(true);
    }), 5000);
}));
/**
 * Ssstik scraper
 *
 * @param  {Object} puppeteer browser
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
 */
const ssstik = (url) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield (yield bodaoScrapper.getBrowser()).newPage();
        yield page.setViewport({ width: 1920, height: 926 });
        let baseUrl = "https://ssstik.io";
        yield page.goto(baseUrl);
        yield page.type("#main_page_text", `${url}`);
        yield page.click("#submit", {
            delay: 300,
        });
        yield page.waitForSelector("#target > div > div.result_overlay", {
            timeout: 300,
        });
        let mp4 = yield page.$eval("#target > div > div.result_overlay > a.without_watermark", (element) => {
            return element.getAttribute("href");
        });
        let mp3 = yield page.$eval("#target > div > div.result_overlay > a.music", (element) => {
            return element.getAttribute("href");
        });
        resolve({
            mp4: baseUrl + mp4,
            mp3: mp3,
        });
        page.close();
    }
    catch (error) {
        let e = '';
        let errMsg = '';
        if (typeof error === "string") {
            bodaoScrapper.logger.error(error);
            e = error;
            errMsg = `${error}`;
        }
        else if (error instanceof Error) {
            bodaoScrapper.logger.error(error);
            e = error.message;
            errMsg = `${error.name} ${error.message}`;
            if (error.name == 'TimeoutError')
                resolve(null);
            else
                reject(error);
        }
    }
}));
/**
 * Snaptik scraper
 *
 * @param  {Object} puppeteer browser instance
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
*/
const snaptik = (url) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield (yield bodaoScrapper.getBrowser()).newPage();
        yield page.setViewport({ width: 1920, height: 926 });
        const baseUrl = 'https://snaptik.app/';
        yield page.goto(baseUrl);
        yield page.type("#url", `${url}`);
        yield page.click("#submiturl", {
            delay: 300,
        });
        yield page.waitForSelector("div.snaptik-right", {
            timeout: 300,
        });
        let d1 = yield page.$eval("div.snaptik-right > div > a", (element) => {
            return element.getAttribute("href");
        });
        let d2 = yield page.$eval("div.snaptik-right > div > a:nth-child(2)", (element) => {
            return element.getAttribute("href");
        });
        let d3 = yield page.$eval("div.snaptik-right > div > a:nth-child(3)", (element) => {
            return element.getAttribute("href");
        });
        if (d1 == undefined || d3 == undefined)
            reject(undefined);
        page.close();
        resolve({
            server1: (d1 === null || d1 === void 0 ? void 0 : d1.startsWith('/')) ? baseUrl + d1 : d1,
            server2: (d2 === null || d2 === void 0 ? void 0 : d2.startsWith('/')) ? baseUrl + d2 : d2,
            source: (d3 === null || d3 === void 0 ? void 0 : d3.startsWith('/')) ? baseUrl + d3 : d3,
        });
    }
    catch (error) {
        let e = '';
        let errMsg = '';
        if (typeof error === "string") {
            bodaoScrapper.logger.error(error);
            e = error;
            errMsg = `${error}`;
        }
        else if (error instanceof Error) {
            bodaoScrapper.logger.error(error);
            e = error.message;
            errMsg = `${error.name} ${error.message}`;
            if (error.name == 'TimeoutError')
                resolve(null);
            else
                reject(error);
        }
    }
}));
/**
 * saveFrom scraper
 *
 * @param  {Object} puppeteer browser instance
 * @param  {String} url
 * @returns {Promise<Array>} `Promise` that resolve obj
 */
const saveFrom = (url, isIG = false) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield (yield bodaoScrapper.getBrowser()).newPage();
        yield page.setViewport({ width: 1920, height: 926 });
        yield page.goto("https://en.savefrom.net/20/");
        yield page.waitForSelector("#sf_url", {
            timeout: 300,
        });
        yield page.type("#sf_url", `${url}`);
        yield page.click("#sf_submit", {
            delay: 300,
        });
        yield page.waitForSelector("div.media-result", {
            timeout: 300,
        });
        if (isIG) {
            let res = yield page.$eval(`#sf_result > div > div > div.info-box > div.link-box > div.def-btn-box > a`, (a) => {
                return a.getAttribute('href');
            });
            page.close();
            resolve(res);
        }
        else {
            let res = yield page.$$eval("#sf_result > div > div.result-box.video > div.info-box > div.link-box > div.drop-down-box > div.list > div > div > div > a", (a) => {
                let resu = a.map(el => {
                    let data = {};
                    data.url = el.getAttribute("href");
                    data.quality = el.getAttribute("data-quality");
                    data.type = el.getAttribute("data-type");
                    return data;
                });
                return resu;
            });
            page.close();
            resolve(res);
        }
    }
    catch (error) {
        let e = '';
        let errMsg = '';
        if (typeof error === "string") {
            bodaoScrapper.logger.error(error);
            e = error;
            errMsg = `${error}`;
        }
        else if (error instanceof Error) {
            bodaoScrapper.logger.error(error);
            e = error.message;
            errMsg = `${error.name} ${error.message}`;
            if (error.name == 'TimeoutError')
                resolve(null);
            else
                reject(error);
        }
    }
}));
/**
 * saveFrom scraper
 *
 * @param  {Object} puppeteer browser instance
 * @param  {String} url
 * @returns {Promise} `Promise` that resolve obj
 */
const saveFromStory = (username) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = yield (yield bodaoScrapper.getBrowser()).newPage();
        yield page.setViewport({ width: 1920, height: 926 });
        yield page.goto("https://en.savefrom.net/20-download-instagram-stories.html");
        yield page.waitForSelector("#sf_url", {
            timeout: 300,
        });
        yield page.type("#sf_url", `${username}`);
        yield page.click("#sf_submit", {
            delay: 300,
        });
        yield page.waitForSelector("#ig-stories-root > div > div > div.ig-stories__content > ul", {
            timeout: 300,
        });
        let res = yield page.$$eval("#ig-stories-root > div > div > div.ig-stories__content > ul > li", (li) => {
            let resu = li.map(el => {
                var _a;
                return (_a = el === null || el === void 0 ? void 0 : el.querySelector('a')) === null || _a === void 0 ? void 0 : _a.href;
            });
            return resu;
        });
        page.close();
        resolve(res);
    }
    catch (error) {
        let e = '';
        let errMsg = '';
        if (typeof error === "string") {
            bodaoScrapper.logger.error(error);
            e = error;
            errMsg = `${error}`;
        }
        else if (error instanceof Error) {
            bodaoScrapper.logger.error(error);
            e = error.message;
            errMsg = `${error.name} ${error.message}`;
            if (error.name == 'TimeoutError')
                resolve(null);
            else
                reject(error);
        }
    }
}));
function lirik(judul) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        axios.get('https://www.musixmatch.com/search/' + judul + '/tracks')
            .then(({ data }) => __awaiter(this, void 0, void 0, function* () {
            const $ = cheerio.load(data);
            const thumbs = $('div.media-card-picture > img');
            const listItems = $('div.media-card-body > div > h2'); //".showArtirst");
            const listAuthors = $('div.media-card-body > div > h3'); //".showArtirst");
            const listItemsResp = [];
            listItems.each(function (idx, el) {
                const title = $(el).find('a > span').text();
                //console.log('title: ' + title);
                const arthors = [];
                const authorNameLink = $(listAuthors[idx]).find('span > span > a');
                const thumbName = $(thumbs[idx]).attr('alt');
                let thumbLink = '';
                if (thumbName.includes(title)) {
                    thumbLink = $(thumbs[idx]).attr('srcset');
                }
                let _limk = 'https://www.musixmatch.com';
                for (let index = 0; index < authorNameLink.length; index++) {
                    let autLink = $(authorNameLink[index]).attr('href');
                    let authorName = $(authorNameLink[index]).text();
                    arthors.push({ link: _limk + autLink, name: authorName });
                }
                const _link = _limk + $('div.media-card-body > div > h2').find('a').attr('href');
                listItemsResp.push({ title: title, link: _link, authors: arthors, thumb: thumbLink });
                //console.log('link: ' + _link);
            });
            /*
            const hasil = {};
            let limk = 'https://www.musixmatch.com'
            const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
                await axios.get(link)
                .then(({ data }) => {
                    const $$ = cheerio.load(data)
                    hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
                    $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
               hasil.lirik = $$(b).find('span > p > span').text() +'\n' + $$(b).find('span > div > p > span').text()
               })
           })*/
            resolve(listItemsResp);
        }))
            .catch(reject);
    }));
}
function lirikList(judul) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        axios.get('https://www.musixmatch.com/search/' + judul)
            .then(({ data }) => __awaiter(this, void 0, void 0, function* () {
            const $ = cheerio.load(data);
            const listItems = $("li"); //".showArtirst");
            bodaoScrapper.logger.info(listItems.length); // 2
            listItems.each(function (idx, el) {
                bodaoScrapper.logger.info($(el).text());
            });
            const hasil = {};
            let limk = 'https://www.musixmatch.com';
            const link = limk + $('div.media-card-body > div > h2').find('a').attr('href');
            yield axios.get(link)
                .then(({ data }) => {
                const $$ = cheerio.load(data);
                hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src');
                $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function (a, b) {
                    hasil.lirik = $$(b).find('span > p > span').text() + '\n' + $$(b).find('span > div > p > span').text();
                });
            });
            resolve(hasil);
        }))
            .catch(reject);
    }));
}
/*
https://www.churchofjesuschrist.org/study/scriptures?lang=por&platform=web

velho
https://www.churchofjesuschrist.org/study/scriptures/ot?lang=por



Página-título
https://www.churchofjesuschrist.org/study/scriptures/ot/title-page
Introdução
https://www.churchofjesuschrist.org/study/scriptures/ot/introduction

Gênesis
https://www.churchofjesuschrist.org/study/scriptures/ot/gen
Êxodo
https://www.churchofjesuschrist.org/study/scriptures/ot/ex
Levítico
https://www.churchofjesuschrist.org/study/scriptures/ot/lev
Números
https://www.churchofjesuschrist.org/study/scriptures/ot/lev
Deuteronômio
https://www.churchofjesuschrist.org/study/scriptures/ot/deut
Josué
https://www.churchofjesuschrist.org/study/scriptures/ot/josh
Juízes
https://www.churchofjesuschrist.org/study/scriptures/ot/judg
Rute
https://www.churchofjesuschrist.org/study/scriptures/ot/ruth
1 Samuel
https://www.churchofjesuschrist.org/study/scriptures/ot/1-sam
2 Samuel
https://www.churchofjesuschrist.org/study/scriptures/ot/2-sam
1 Reis
https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs
2 Reis
https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs
1 Crônicas
https://www.churchofjesuschrist.org/study/scriptures/ot/1-chr
2 Crônicas
https://www.churchofjesuschrist.org/study/scriptures/ot/2-chr
Esdras
https://www.churchofjesuschrist.org/study/scriptures/ot/ezra
Neemias
https://www.churchofjesuschrist.org/study/scriptures/ot/neh
Ester
https://www.churchofjesuschrist.org/study/scriptures/ot/esth
Jó
https://www.churchofjesuschrist.org/study/scriptures/ot/job
Salmos
https://www.churchofjesuschrist.org/study/scriptures/ot/ps
Provérbios
https://www.churchofjesuschrist.org/study/scriptures/ot/prov
Eclesiastes
https://www.churchofjesuschrist.org/study/scriptures/ot/eccl
Cantares de Salomão
https://www.churchofjesuschrist.org/study/scriptures/ot/song1
https://www.churchofjesuschrist.org/study/scriptures/ot/jer
Lamentações
https://www.churchofjesuschrist.org/study/scriptures/ot/lam
Ezequiel
https://www.churchofjesuschrist.org/study/scriptures/ot/ezek
Daniel
https://www.churchofjesuschrist.org/study/scriptures/ot/dan
Oseias
https://www.churchofjesuschrist.org/study/scriptures/ot/hosea
Joel
https://www.churchofjesuschrist.org/study/scriptures/ot/joel
Amós
https://www.churchofjesuschrist.org/study/scriptures/ot/amos

Obadias
https://www.churchofjesuschrist.org/study/scriptures/ot/obad
Jonas
https://www.churchofjesuschrist.org/study/scriptures/ot/jonah
Miqueias
https://www.churchofjesuschrist.org/study/scriptures/ot/micah
Naum
https://www.churchofjesuschrist.org/study/scriptures/ot/nahum
Habacuque
https://www.churchofjesuschrist.org/study/scriptures/ot/hab
Sofonias
https://www.churchofjesuschrist.org/study/scriptures/ot/zeph
Ageu
https://www.churchofjesuschrist.org/study/scriptures/ot/hag
Zacarias
https://www.churchofjesuschrist.org/study/scriptures/ot/zech
Malaquias
https://www.churchofjesuschrist.org/study/scriptures/ot/mal









---------------------------------------------------------------------------------
novo


---------------------------------------------------------------------------
lm
https://www.churchofjesuschrist.org/study/scriptures/bofm?lang=por





----------------------------------------------------------------------------
d&C
https://www.churchofjesuschrist.org/study/scriptures/dc-testament?lang=por

Introdução e Cronologia

    Página de Título
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/title-page
    Introdução
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/introduction
    
    Ordem Cronológica do Conteúdo
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/chron-order
Seções
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc
Declarações Oficiais
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/od

sessões


Seção 1
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/1

Seção 2
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/2

Seção 3
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/3
Seção 4

....

sessão 138
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/138


------------------------------------------------------------------------
PGV
https://www.churchofjesuschrist.org/study/scriptures/pgp?lang=por



Página de Título
https://www.churchofjesuschrist.org/study/scriptures/pgp/title-page
Introdução
https://www.churchofjesuschrist.org/study/scriptures/pgp/introduction
Moisés
https://www.churchofjesuschrist.org/study/scriptures/pgp/moses
Abraão
https://www.churchofjesuschrist.org/study/scriptures/pgp/abr
Joseph Smith—Mateus
https://www.churchofjesuschrist.org/study/scriptures/pgp/js-m/1

Joseph Smith—História
https://www.churchofjesuschrist.org/study/scriptures/pgp/js-h/1

Regras de Fé
https://www.churchofjesuschrist.org/study/scriptures/pgp/a-of-f/1

---------------------------------------------------------------------


Guia para Estudo das Escrituras







-------------------------------------------------------------------------

escritura especifica
mosiah 4.27
https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4.27?lang=eng#26

------------------------------------------------------------
search   pão da vida
https://www.churchofjesuschrist.org/search?lang=por&query=p%C3%A3o%20da%20vida&facet=scriptures&subfacet=nt&highlight=true&page=1


*/
const scripture = [
    { bookName: [{ lang: 'eng', name: 'old testment' }, { lang: 'por', name: 'velho testmento' }],
        api: 'ot' },
    { bookName: [{ lang: 'eng', name: 'new testment' }, { lang: 'por', name: 'novo testmento' }],
        api: 'nt' },
    { bookName: [{ lang: 'eng', name: 'doctrine and covenants' }, { lang: 'por', name: 'doutrina e convênios' }],
        api: 'dc-testament' },
    { bookName: [{ lang: 'eng', name: 'book of mormon' }, { lang: 'por', name: 'livro de mormon' }],
        api: 'bofm' },
    { bookName: [{ lang: 'eng', name: 'Pearl of Great Price' }, { lang: 'por', name: 'pérola de grande valor' }],
        api: 'pgp' },
    { bookName: [{ lang: 'eng', name: 'section' }, { lang: 'por', name: 'seção' }],
        api: 'dc' },
    { bookName: [{ lang: 'eng', name: 'chronological order' }, { lang: 'por', name: 'Ordem Cronológica do Conteúdo' }],
        api: 'chron-order' },
    { bookName: [{ lang: 'eng', name: 'introduction' }, { lang: 'por', name: 'introdução' }],
        api: 'introduction' },
    { bookName: [{ lang: 'eng', name: 'title page' }, { lang: 'por', name: 'Página de Título' }],
        api: 'title-page' }
];
const ot = {
    'name': 'ot',
    'data': { bookName: [{ lang: 'eng', name: 'old testment' }, { lang: 'por', name: 'velho testamento' }],
        api: 'ot' },
    'Página-título': { api: 'title-page', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/title-page' },
    'Introdução': { api: 'introduction', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/introduction' },
    'Gênesis': { api: 'gen', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/gen' },
    'Êxodo': { api: 'ex', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ex' },
    'Levítico': { api: 'lev', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/lev' },
    'Números': { api: 'num', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/num' },
    'Deuteronômio': { api: 'deut', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/deut' },
    'Josué': { api: 'josh', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/josh' },
    'Juízes': { api: 'judg', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/judg' },
    'Rute': { api: 'ruth', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ruth' },
    '1 Samuel': { api: '1-sam', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/1-sam' },
    '2 Samuel': { api: '2-sam', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/2-sam' },
    '1 Reis': { api: '1-kgs', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs' },
    '2 Reis': { api: '2-kgs', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs' },
    '1 ': { api: '1-chr', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/1-chr' },
    '2 Crônicas': { api: '2-chr', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/2-chr' },
    'Esdras': { api: 'ezra', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ezra' },
    'Neemias': { api: 'neh', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/neh' },
    'Ester': { api: 'esth', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/esth' },
    'Jó': { api: 'job', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/job' },
    'Salmos': { api: 'ps', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ps' },
    'Provérbios': { api: 'prov', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/prov' },
    'Eclesiastes': { api: 'eccl', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/eccl' },
    'Jeremias': { api: 'song1', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/song1' },
    'Cantares de Salomão': { api: 'jer', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/jer' },
    'Lamentações': { api: 'lam', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/lam' },
    'Ezequiel': { api: 'ezek', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ezek' },
    'Daniel': { api: 'dan', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/dan' },
    'Oseias': { api: 'hosea', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/hosea' },
    'Joel': { api: 'joel', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/joel' },
    'Amós': { api: 'amos', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/amos' },
    'Obadias ': { api: 'obad', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/obad' },
    'Jonas': { api: 'jonah', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/jonah' },
    'Miqueias': { api: 'micah', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/micah' },
    'Naum': { api: 'nahum', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/nahum' },
    'Habacuque': { api: 'hab', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/hab' },
    'Sofonias': { api: 'zeph', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/zeph' },
    'Ageu': { api: 'hag', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/hag' },
    'Zacarias': { api: 'zech', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/zech' },
    'Malaquias': { api: 'mal', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/mal' }
};
const nt = {
    'name': 'nt',
    'data': { bookName: [{ lang: 'eng', name: 'new testment' }, { lang: 'por', name: 'novo testamento' }],
        api: 'nt' },
    'mateus': { api: 'matt', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/matt' },
    'Marcos': { api: 'mark', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/mark' },
    'Lucas': { api: 'luke', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/luke' },
    'João': { api: 'john', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/john' },
    'Atos': { api: 'acts', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/acts' },
    'Romanos': { api: 'rom', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/rom' },
    '1 Coríntios': { api: '1-cor', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-cor' },
    '2 Coríntios': { api: '2-cor', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-cor' },
    'Gálatas': { api: 'gal', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/gal' },
    'Efésios': { api: 'eph', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/eph' },
    'Filipenses': { api: 'philip', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/philip' },
    'Colossenses': { api: 'col', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/col' },
    '1 Tessalonicenses': { api: '1-thes', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-thes' },
    '2 Tessalonicenses': { api: '2-thes', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-thes' },
    '1 Timóteo': { api: '1-tim', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-tim' },
    '2 Timóteo': { api: '2-tim', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-tim' },
    'Tito': { api: 'titus', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/titus' },
    'Filemom': { api: 'philem', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/philem' },
    'Hebreus': { api: 'heb', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/heb' },
    'Tiago': { api: 'james', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/james' },
    '1 Pedro': { api: '1-pet', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-pet' },
    '2 Pedro': { api: '2-pet', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-pet' },
    '1 João': { api: '1-jn', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-jn' },
    '2 João': { api: '2-jn', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-jn/1' },
    '3 João': { api: '3-jn', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/3-jn/1' },
    'Judas': { api: 'jude', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/jude/1' },
    'Apocalipse': { api: 'rev', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/rev' }
};
const bofm = {
    'name': 'bofm',
    'data': { bookName: [{ lang: 'eng', name: 'book of mormon' }, { lang: 'por', name: 'livro de mormon' }], api: 'bofm' },
    'Página de Título': { api: 'title-page', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/title-page' },
    'Página de Título do Livro de Mórmon': { api: 'bofm-title', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/bofm-title' },
    'Introdução': { api: 'introduction', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/introduction' },
    'Depoimento de Três Testemunhas': { api: 'three', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/three' },
    'Depoimento de Oito Testemunhas': { api: 'eight', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/eight' },
    'Testemunho do Profeta Joseph Smith': { api: 'js', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/js' },
    'Breve Explicação sobre o Livro de Mórmon': { api: 'explanation', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/explanation' },
    'Ilustrações': { api: 'illustrations', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/illustrations' },
    '1 Néfi': { api: '1-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne' },
    '2 Néfi': { api: '2-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne' },
    'Jacó': { api: 'jacob', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob' },
    'Enos': { api: 'enos', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/enos/1' },
    'Jarom': { api: 'jarom', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/jarom/1' },
    'Ômni': { api: 'omni', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/omni/1' },
    'Palavras de Mórmon': { api: 'w-of-m', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/w-of-m/1' },
    'Mosias': { api: 'mosiah', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah' },
    'Alma': { api: 'alma', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma' },
    'Helamã': { api: 'hel', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/hel' },
    '3 Néfi': { api: '3-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne' },
    '4 Néfi': { api: '4-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/4-ne/1' },
    'Mórmon': { api: 'morm', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/morm' },
    'Éter': { api: 'ether', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/ether' },
    'Morôni': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/moro' },
    'Guia de Referências do Livro de Mórmon': { api: 'reference', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/reference' },
};
const dc = {};
const pgp2 = [
    { section: [{ lang: 'eng', name: 'Title Page' }, { lang: 'por', name: 'Página de Título' }],
        api: 'title-page' },
    { section: [{ lang: 'eng', name: 'introduction' }, { lang: 'por', name: 'Introdução' }],
        api: 'introduction' },
    { section: [{ lang: 'eng', name: 'Moses' }, { lang: 'por', name: 'Moisés' }],
        api: 'moses' },
    { section: [{ lang: 'eng', name: 'Abraham' }, { lang: 'por', name: 'Abraão' }],
        api: 'abr' },
    { section: [{ lang: 'eng', name: 'Joseph Smith—Matthew' }, { lang: 'por', name: 'Joseph Smith—Mateus' }],
        api: 'js-m/1' },
    { section: [{ lang: 'eng', name: 'Joseph Smith—History' }, { lang: 'por', name: 'Joseph Smith—História' }],
        api: 'js-h/1' },
    { section: [{ lang: 'eng', name: 'Articles of Faith' }, { lang: 'por', name: 'Regras de Fé' }],
        api: 'a-of-f/1' },
];
const pgp = {
    'name': 'dc',
    'data': { bookName: [{ lang: 'eng', name: 'Pearl of Great Price' }, { lang: 'por', name: 'pérola de grande valor' }], api: 'pgp' },
    'Página de Título': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/title-page' },
    'Introdução': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/introduction' },
    'Moisés': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/moses' },
    'Abraão': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/abr' },
    'Joseph Smith—Mateus': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/js-m/1' },
    'Joseph Smith—História': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/js-h/1' },
    'Regras de Fé': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/a-of-f/1' },
};
const allScriptures = [ot, nt, bofm, dc, pgp];
const scriptures = (what) => new Promise((resolve, reject) => {
    const getScriptureyBook = (book) => {
        let retValue = null;
        allScriptures.forEach((esc, index) => {
            const found = Object.entries(esc).find((es) => {
                return es['0'] === book;
            });
            if (found) {
                found.scripture = allScriptures[index];
                retValue = found;
                return found;
            }
        });
        return retValue;
    };
    const do_parse = (s) => {
        var osises = bodaoScrapper.bcv.parse(s).osis_and_indices();
        if (osises.length > 0) {
            var th1 = "Original Text";
            var th2 = "OSIS Value";
        }
        for (var i = 0, last = osises.length; i < last; i++) {
            var osis = osises[i];
            var text = s.substr(osis.indices[0], osis.indices[1] - osis.indices[0]);
            var td2 = osis.osis;
        }
    };
    let parsed = null;
    //range
    //integer
    try {
        parsed = bodaoScrapper.bcv.parse(what); //.parsed_entities(); //"João 3:4-13,16"); // Returns the `bcv` object.
        //let parsed2 = do_parse(what)
    }
    catch (err) {
        bodaoScrapper.logger.error(err);
    }
    const parsedScripture = parsed.entities['0'];
    let book = parsed.passage.books['0'].value;
    let chapter = 0;
    Object.keys(parsedScripture.passages).forEach(key => {
        let step = parsedScripture.passages[key];
        let type = step.type;
        switch (type) {
            case 'range':
                let start = step.start;
                //book = start.b
                let start_chapter = start.c;
                let start_verse = start.v;
                let end = step.end;
                let end_chapter = end.c;
                let end_verse = end.v;
                chapter = start_chapter;
                break;
            case 'integer':
                let info = step.start;
                //book = info.b
                chapter = info.c;
                let verse = info.v;
                break;
        }
        //use key and value here
    });
    const escr = getScriptureyBook(book);
    const siteLink = 'https://www.churchofjesuschrist.org/study/scriptures';
    const escrFound = escr.scripture.name; //scripture[4].api
    const section = escr['1'].api;
    const verses = [];
    let lang = '?lang=eng';
    lang = '?lang=por';
    axios.get(siteLink + '/' + escrFound + '/' + section + '/' + chapter + lang)
        .then(({ data }) => __awaiter(void 0, void 0, void 0, function* () {
        const $ = cheerio.load(data);
        const listItems = $('div.body-block > p');
        //const IGNORE_SELECTORS = ['[name="sup"]']
        /*
        .each(function(index,b) {
            // Range Name
            bodaoScrapper.logger.info("iteration - ", index);
            bodaoScrapper.logger.info("name - ", $(this).text().trim());
            //let text = $(b).text() //+' '+ $(b).find('a').text()
            //verses.push(text)
            })
            */
        //for (let i =0 ; i < listItems.length ; i++) {
        //let listItems3 = $(listItems[i]).attr('name="sup"')
        //remove notes
        for (let i = 0; i < listItems.length; i++) {
            let listItems3 = $(listItems[i]).find('a').children().attr('name', 'sup').remove();
            //$(listItems3).each(function(index,b) {
            // Range Name
            //bodaoScrapper.logger.info("iteration - ", index);
            //bodaoScrapper.logger.info("name - ", $(this).text().trim());
            //let text = $(b).text() //+' '+ $(b).find('a').text()
            //verses.push(text)
            //	});
        }
        $(listItems).each(function (index, b) {
            // Range Name
            //bodaoScrapper.logger.info("iteration - ", index);
            let verse = $(this).text().trim();
            //bodaoScrapper.logger.info("name - ", verse);
            //let text = $(b).text() //+' '+ $(b).find('a').text()
            verses.push(verse);
        });
        resolve({ scripture: escr, book: book, chapter: chapter, passages: parsedScripture.passages, verses: verses });
    })).catch(reject);
});
export default {
    bodaoScrapper,
    useragents,
    pinterestAbdul,
    pinterestLight,
    saveFromStory,
    pinterest_,
    saveFrom,
    snaptik,
    gimage,
    ssstik,
    lirik,
    ssweb,
    kbbi,
    scriptures
};
/*
Gui para estudo das escrituras
-------------------------------------------------------------------------






A

   Aarão, Filho de Mosias

   Aarão, Irmão de Moisés

   Aarônico, Sacerdócio

   Abede-Nego

   Abel

   Abençoado, Abençoar, Bênção

   Abinádi

   Abominação, Abominável

   Abominável Igreja

   Abraão

   Abraão, Convênio de

   Abrão

   Abundância

   Acabe

   Ação de Graças, Agradecido, Agradecimento

   Aconselhar, Conselho

   Acreditar

   Adão

   Adão-ondi-Amã

   Adoção

   Adorar

   Adultério

   Adversário

   Adversidade

   Advertência, Advertir, Prevenir

   Advogado

   Agar

   Ageu

   Agripa

   Águas Vivas

   Álcool

   Alegria

   Alfa e Ômega

   Alma

   Alma, Filho de Alma

   Alma, o Pai

   Altar

   Amaldiçoar, Maldições

   Amalequitas (Livro de Mórmon)

   Amalequitas (Velho Testamento)

   Amaliquias

   Amém

   Amon, Descendente de Zaraenla

   Amon, Filho de Mosias

   Amor

   Amós

   Amuleque

   Ana, Mãe de Samuel

   Ana, Profetiza

   Ananias de Damasco

   Ananias de Jerusalém

   Anás

   Ancião

   Ancião de Dias

   Andar, Andar com Deus

   André

   Anjos

   Anjos Ministradores

   Anlici, Anlicitas

   Anticristo

   Ânti-néfi-leítas

   Apocalipse do Apóstolo João

   Apócrifos, Livros

   Apoio aos Líderes da Igreja

   Apostasia

   Apóstolo

   Arbítrio

   Arca

   Arca da Aliança

   Arcanjo

   Arco-Íris

   Armadura

   Armagedom

   Armazém

   Arrepender-se, Arrependimento

   Artimanhas Sacerdotais

   Árvore da Vida

   Asa

   Ascensão

   Aser

   Assassinato

   Assíria

   Atalaia, Sentinela, Vigiar

   Atender, Dar ouvidos

   Atos dos Apóstolos

   Autoridade

   Autoridades Gerais

   Avarento, Avareza

   Azeite

B

   Baal

   Babel, Babilônia

   Balaão

   Bálsamo de Gileade

   Barnabé

   Barrabás

   Bartolomeu

   Batalha nos Céus

   Bate-Seba

   Batismo, Batizar

   Batismo de Criancinhas

   Batista

   Beatitudes

   Beber, Bêbado

   Bebidas Alcoólicas

   Belém

   Belsazar

   Bem-Aventuranças

   Bem-Estar

   Bênção

   Bênção dos Doentes

   Bênçãos Patriarcais

   Benjamim, Filho de Jacó

   Benjamim, Pai de Mosias

   Betânia

   Betel

   Betsabá

   Bíblia

   Bíblia, Tradução de Joseph Smith

   Bispo

   Bispo Presidente

   Blasfemar, Blasfêmia

   Boaz

   Bom Pastor

   Bosque Sagrado

C

   Cadeia de Carthage (EUA)

   Cadeia de Liberty, Missouri (EUA)

   Caifás

   Caim

   Calebe

   Calúnias

   Calvário

   Caminho

   Campo

   Canaã, Cananeus

   Cânone

   Cantar

   Cantares de Salomão

   Cão

   Caridade

   Carnal

   Carne

   Casa (Lar)

   Casa de Israel

   Casa do Senhor

   Casamento, Casar

   Casamento no Templo

   Casamento Plural

   Castidade

   Castigar, Castigo, Corrigir, Repreender

   Cativeiro

   Ceia do Senhor

   Ceifa, Colheita

   Celibato

   Centurião

   César

   Céu

   Chamado, Chamado por Deus, Chamar

   Chamado (Vocação) e Eleição

   Chaves do Sacerdócio

   Circuncisão

   Ciro

   Ciúme

   Cizânia

   Cobiçar

   Cólera

   Coligação de Israel

   Colobe

   Colossenses, Epístola aos

   Combinações Secretas

   Compaixão

   Compelir, Constranger

   Comportamento Homossexual

   Compreensão, Entendimento

   Comum Acordo

   Comunhão

   Concupiscência

   Condado de Jackson, Missouri (EUA)

   Condenação, Condenar

   Confessar, Confissão

   Confiança, Confiar

   Confirmação

   Confraternizar

   Conhecimento

   Consagrar, Lei da Consagração

   Consciência

   Conselho dos Doze

   Conselho nos Céus

   Consolador

   Constituição

   Constranger

   Contenção, Contenda

   Controle da Natalidade

   Convênio

   Convênio Abraâmico

   Convênio Eterno

   Conversão, Converter

   Coração

   Coração Quebrantado

   Coragem, Corajoso

   Cordeiro de Deus

   Coriânton

   Coriântumr

   Coríntios, Epístola aos

   Corior

   Cornélio

   Coroa

   Corpo

   Couraça

   Côvado

   Cowdery, Oliver

   Crença, Crer

   Criação, Criar

   Criação Espiritual

   Criador

   Criança(s)

   Cristãos

   Cristo

   Crônicas

   Cronologia

   Crucificação

   Cruz

   Cúbito

   Culpa

   Cumora, Monte

   Curar, Curas

D

   Dã

   Dalila

   Damasco

   Daniel

   Dario

   Davi

   Débora

   Declaração Oficial 1

   Declaração Oficial 2

   Deidade

   Descansar, Descanso

   Deseret

   Designação

   Desprezar, Desprezo

   Destruidor

   Deus

   Deuteronômio

   Dever

   Dez Mandamentos

   Dez Tribos

   Diabo

   Diácono

   Dia do Sábado (Dia de Descanso)

   Dia do Senhor

   Difamação

   Dignidade, Digno

   Diligência

   Dilúvio no Tempo de Noé

   Dinheiro

   Discernimento, Dom de

   Disciplinar

   Discípulo

   Discípulos Nefitas

   Discussão

   Dispensação

   Dispersão de Israel

   Dívida

   Divórcio

   Dízimos

   Doença, Doente

   Dolo

   Dom

   Dom do Espírito Santo

   Domingo

   Dons do Espírito

   Dons Espirituais

   Dormir

   Doutrina de Cristo

   Doutrina e Convênios

   Doze, Quórum dos

   Doze Tribos de Israel

E

   Eclesiastes

   Éden

   Efésios, Epístola aos

   Efraim

   Egito

   Egitus

   Élder (Ancião)

   Eleição

   Eleitos

   Eli

   Elias

   Elias, o Profeta

   Eliseu

   Eloim

   Emanuel

   Enfermidade, Enfermo

   Enganar, Engano, Fraude

   Enoque

   Enos, Filho de Jacó

   Ensinar, Mestre

   Entendimento

   Epístolas Paulinas

   Esaías

   Esaú

   Escola dos Profetas

   Escolher, Escolhido (verbo)

   Escolhido (adjetivo ou substantivo)

   Escriba

   Escrituras

   Escrituras Perdidas

   Escutar

   Esdras

   Esmolas

   Esperança

   Espírito

   Espírito Contrito

   Espírito Santo

   Espíritos Malignos

   Esposa

   Esposo

   Estaca

   Estandarte

   Estandarte da Liberdade

   Ester

   Estêvão

   Estimar

   Éter

   Eu Sou

   Eva

   Evangelho

   Evangelhos

   Evangelista

   Exaltação

   Excomunhão

   Êxodo

   Expiação, Expiar

   Ezequias

   Ezequiel

F

   Família

   Faraó

   Fariseus

   Fayette, Nova York (EUA)

   Fazer

   Fé

   Felicidade, Feliz

   Filemom

   Filemom, Epístola a

   Filho(s)

   Filho de Deus

   Filho do Homem

   Filhos de Cristo

   Filhos de Deus

   Filhos de Helamã

   Filhos de Israel

   Filhos de Mosias

   Filhos de Perdição

   Filhos e Filhas de Deus

   Filipe

   Filipenses, Epístola aos

   Filisteus

   Fim do Mundo

   Fogo

   Fornicação

   Fraqueza

   Fraudar, Fraude, Fraudulento

   Fruto Proibido

G

   Gabriel

   Gade, Filho de Jacó

   Gade, o Vidente

   Gadiânton

   Gálatas, Espístola aos

   Galileia

   Gamaliel

   Genealogia

   Gênesis

   Gentios

   Gerar

   Getsêmani

   Gideão (Livro de Mórmon)

   Gideão (Velho Testamento)

   Glória

   Glória Celestial

   Glória Telestial

   Glória Terrestre

   Gogue

   Gólgota

   Golias

   Gomorra

   Governo

   Gozo

   Graça

   Grande e Abominável Igreja

   Grão de Mostarda

   Gratidão

   Graus de Glória

   Guerra

   Guerra nos Céus

H

   Habacuque

   Hades

   Hagar

   Hagote

   Harris, Martin

   Hebraico

   Hebreus, Epístola aos

   Hebrom

   Helamã, Filho de Alma

   Helamã, Filho de Helamã

   Helamã, Filho do Rei Benjamim

   Helamã, Filhos de

   Herdeiro

   Herodes

   Herodias

   Hímni

   Hino

   História da Família

   Homem, Homens

   Homem de Santidade

   Homem Natural

   Homicídio

   Honestidade, Honesto

   Honra, Honrar

   Hosana

   Humildade, Humilde, Humilhar

   Hyde, Orson

I

   Idolatria

   Igreja, Grande e Abominável

   Igreja, Nome da

   Igreja de Jesus Cristo

   Igreja de Jesus Cristo dos Santos dos Últimos Dias, A

   Igreja Verdadeira, Sinais da

   Imersão

   Imoralidade

   Imoralidade Sexual

   Imortal, Imortalidade

   Império Romano

   Ímpio

   Imposição de Mãos

   Imundície, Imundo

   Incredulidade

   Inferno

   Infinito

   Inimizade

   Iniquidade, Iníquo

   Injustiça, Injusto

   Inocência, Inocente

   Inspiração, Inspirar

   Integridade

   Inteligência(s)

   Inveja

   Investidura, Investir

   Ira

   Irmã(s), Irmão(s)

   Irmão de Jarede

   Isabel

   Isaías

   Isaque

   Ismael, Filho de Abraão

   Ismael, Sogro de Néfi

   Israel

   Issacar

J

   Jacó, Filho de Isaque

   Jacó, Filho de Leí

   Jactância

   Jafé

   Jardim do Éden

   Jardim do Getsêmani

   Jarede

   Jarede, Irmão de

   Jareditas

   Jarom

   Jejuar, Jejum

   Jeová

   Jeremias

   Jericó

   Jeroboão

   Jerubaal

   Jerusalém

   Jerusalém, Nova

   Jessé

   Jesus Cristo

   Jetro

   Jezabel

   Jó

   João, Filho de Zebedeu

   João Batista

   Joel

   Joio

   Jonas

   Jônatas

   Josafá

   José, Filho de Jacó

   José, Marido de Maria

   José, Vara de

   José de Arimateia

   Joseph Smith Jr.

   Josias

   Josué

   Judá

   Judas

   Judas, Irmão de Tiago

   Judas Iscariotes

   Judeus

   Jugo

   Juízes, Livro dos

   Juízo Final

   Julgar

   Juramento

   Juramento e Convênio do Sacerdócio

   Jurar

   Justiça

   Justificação, Justificar

   Justo(s)

K

   Kimball, Spencer W.

L

   Labão, Irmão de Rebeca

   Labão, o Guardião das Placas de Latão

   Ladrões de Gadiânton

   Lamã

   Lamanitas

   Lamentações, Livro de

   Lamôni

   Lar

   Lavado, Lavamento, Lavar

   Lázaro

   Lei

   Leí, Comandante Militar Nefita

   Leí, Missionário Nefita

   Leí, Pai de Néfi

   Lei de Moisés

   Lemuel

   Lepra

   Levi

   Leviandade

   Levitas

   Levítico

   Lia

   Liahona

   Liberdade, Livre

   Libertador

   Lími

   Limpo e Imundo

   Língua

   Linguagem

   Línguas, Dom das

   Livre-arbítrio

   Livro da Vida

   Livro de Mandamentos

   Livro de Mórmon

   Livro de Recordações

   Livros Apócrifos

   Ló

   Louvar, Louvor

   Lucas

   Lúcifer

   Lugar Santíssimo

   Luz, Luz de Cristo

M

   Mãe

   Magogue

   Malaquias

   Maledicência

   Mamom

   Maná

   Manassés

   Mandamentos, Os Dez

   Mandamentos de Deus

   Manifesto

   Mansidão, Manso, Mansuetude

   Mãos, Imposição de

   Marcos

   Maria, Mãe de Jesus

   Maria, Mãe de Marcos

   Maria de Betânia

   Maria Madalena

   Marido

   Mar Morto

   Marsh, Thomas B.

   Marta

   Mártir, Martírio

   Mar Vermelho

   Matar

   Mateus

   Matias

   Matusalém

   Mau Gênio

   Mediador

   Meditar

   Melquisedeque

   Menino(s)

   Mente

   Mentir, Mentiroso

   Mesaque

   Messias

   Mestre, Sacerdócio Aarônico

   Mexerico

   Miguel

   Milagre

   Milênio

   Ministério, Ministro

   Miqueias

   Miriã

   Misericórdia, Misericordioso

   Missionários

   Missouri

   Mistérios de Deus

   Moabe

   Modelo

   Moisés

   Monte das Oliveiras

   Monte Sinai

   Moralidade

   Mordomia, Mordomo

   Mórmon, Livro de

   Mórmon, Profeta Nefita

   Mórmon(s)

   Morôni, Capitão

   Morôni, Filho de Mórmon

   Moronia, Filho do Capitão Moroni

   Mortal, Mortalidade

   Morte, Segunda

   Morte Espiritual

   Morte Física

   Mortos, Salvação para os

   Mosias, Filho do rei Benjamim

   Mosias, Filhos de

   Mosias, Pai do Rei Benjamim

   Muleque

   Mulher, Mulheres

   Mundanismo

   Mundo

   Mundo Espiritual

   Murmurar

   Música

N

   Naamã

   Nabucodonosor

   Naftali

   Nascer de Deus, Nascer de Novo

   Natã

   Natanael

   Naum

   Nauvoo, Illinois (EUA)

   Nazaré

   Neemias

   Néfi, Filho de Helamã

   Néfi, Filho de Leí

   Néfi, Filho de Néfi, Filho de Helamã

   Nefitas

   Neor

   Nicodemos

   Nínive

   Noé, Filho de Zênife

   Noé, Patriarca Bíblico

   Noemi

   Nome da Igreja

   Nova Jerusalém

   Novo e Eterno Convênio

   Novo Testamento

   Números

O

   Obadias

   Obede

   Obedecer, Obediência, Obediente

   Obra Missionária

   Obras

   Obras-Padrão

   Ociosidade, Ocioso

   Odiar, Ódio

   Ofender

   Oferta

   Oficial, Ofício

   Óleo

   Olho(s)

   Oliveira

   Oliveiras, Monte das

   Ômega

   Ômner

   Ômni

   Onipotente

   Onipresente

   Onisciente

   Oposição

   Oração

   Oração do Senhor, A

   Ordem Unida

   Ordenação, Ordenar

   Ordenanças

   Orgulho

   Oseias

   Ouvido, Ouvir

P

   Paciência

   Pacificador

   Pai Celestial

   Pai Eterno

   Pai Nosso, O

   Pais

   Pai Terreno

   Palavra de Deus

   Palavra de Sabedoria

   Pão da Vida

   Paorã

   Parábola

   Paraíso

   Partridge, Edward

   Páscoa

   Páscoa da Ressurreição

   Pastor

   Patriarca, Patriarcal

   Patten, David W.

   Paulo

   Paz

   Pecado

   Pecado Imperdoável

   Pedir

   Pedra de Esquina

   Pedro

   Peitoral

   Pelegue

   Pena de Morte

   Pensamentos

   Pentateuco

   Pentecostes

   Perdição

   Perdoar

   Perfeito

   Pérola de Grande Valor

   Perseguição, Perseguir

   Perseverar

   Phelps, William W.

   Pilatos, Pôncio

   Placas

   Placas de Latão

   Placas de Ouro

   Plano de Redenção

   Plano de Salvação

   Pobres

   Poder

   Poligamia

   Pomba, Sinal da

   Ponderar

   Pornografia

   Pratt, Orson

   Pratt, Parley Parker

   Predestinação

   Pregar

   Preordenação

   Presidência

   Presidente

   Prestar Contas, Responsabilidade, Responsável

   Primeira Presidência

   Primeira Visão

   Primeiros Princípios do Evangelho

   Primícias

   Primogênito

   Primogenitura

   Princípio

   Prisão Espiritual

   Profanidade

   Profano

   Profecia, Profetizar

   Profeta

   Profetisa

   Provérbio

   Publicano

   Pureza, Puro

Q

   Queda de Adão e Eva

   Querubins

   Quiscúmen

   Quórum

R

   Rafael

   Rameumpton

   Raquel

   Realistas

   Rebeca

   Rebeldia, Rebelião

   Recato

   Redenção, Plano de

   Redenção, Redimido, Redimir

   Redentor

   Regras de Fé

   Reino de Deus ou Reino dos Céus

   Reis

   Remissão de Pecados

   Repreender

   Responsabilidade, Idade da

   Ressurreição

   Restauração, Restituição

   Restauração do Evangelho

   Retidão

   Reuel

   Revelação

   Revelação de João

   Reverência

   Rigdon, Sidney

   Rio Jordão

   Riquezas

   Roboão

   Rocha

   Roma

   Romanos, Epístola aos

   Roubar, Roubo

   Rúben

   Rumores

   Rute

S

   Sábado

   Sabedoria

   Sacerdócio

   Sacerdócio, Chaves do

   Sacerdócio, Ordenação

   Sacerdócio Aarônico

   Sacerdócio de Melquisedeque

   Sacerdócio Levítico

   Sacerdote, Sacerdócio Aarônico

   Sacerdote, Sacerdócio de Melquisedeque

   Sacramento

   Sacrifício

   Sadraque

   Saduceus

   Sagrado

   Sal

   Salém

   Salmo

   Salomão

   Salvação

   Salvação, Plano de

   Salvação de Crianças

   Salvação para os Mortos

   Salvador

   Sam

   Samaria

   Samaritanos

   Samuel, o Lamanita

   Samuel, Profeta do Velho Testamento

   Sangue

   Sansão

   Santidade

   Santificação

   Santo (adjetivo)

   Santo (substantivo)

   Santo de Israel, O

   Santo dos Santos

   Santo Espírito

   Santo Espírito da Promessa

   Sara

   Sarar

   Saria

   Satanás

   Saúde

   Saul, Rei de Israel

   Saulo de Tarso

   Sega

   Segunda Vinda de Jesus Cristo

   Segundo Consolador

   Segundo Estado

   Selamento, Selar

   Sem

   Semblante

   Semente de Abraão

   Senhor

   Senhor dos Exércitos

   Sensual, Sensualidade

   Sentinela

   Sentir

   Sepulcro, Sepultura

   Serém

   Seres Transladados

   Sermão da Montanha

   Serpente de Bronze

   Serviço

   Sete

   Setenta

   Sião

   Siblon

   Simão, o Zelote

   Simão Pedro

   Simbolismo

   Simeão

   Sinagoga

   Sinais da Igreja Verdadeira

   Sinais do Nascimento e da Morte de Jesus Cristo

   Sinais dos Tempos

   Sinal

   Sinédrio

   Siz

   Smith, Emma Hale

   Smith, Hyrum

   Smith, Joseph, Jr.

   Smith, Joseph, Sênior

   Smith, Joseph F.

   Smith, Lucy Mack

   Smith, Samuel H.

   Sodoma

   Sofonias

   Sonho

   Sono

   Sortes

   Sumo Conselho

   Sumo Sacerdócio

   Sumo Sacerdote

T

   Tabaco, Fumo

   Tabernáculo

   Talento

   Taylor, John

   Teâncum

   Temor

   Templo, A Casa do Senhor

   Templo de Kirtland, Ohio (EUA)

   Tentação, Tentar

   Terra

   Terra da Promissão

   Tessalonicenses, Epístola aos

   Testamento

   Testemunha

   Testemunhas do Livro de Mórmon

   Testemunho

   Testificar

   Tiago, Filho de Alfeu

   Tiago, Filho de Zebedeu

   Tiago, Irmão do Senhor

   Timóteo

   Timóteo, Epístolas a

   Tito

   Tito, Epístola a

   Tomé

   Tradições

   Tradução de Joseph Smith (TJS)

   Traduzir

   Transfiguração

   Três Discípulos Nefitas

   Trevas Espirituais

   Trevas Exteriores

   Tribos Perdidas

   Trindade

U

   Última Ceia

   Últimos Dias

   Um

   Unção, Ungir

   Ungido, O

   Unidade

   Unigênito

   Ur

   Urim e Tumim

V

   Vaidade, Vão

   Valente, Valor

   Vara de Efraim

   Vara de José

   Vara de Judá

   Velar, Vigiar

   Velho Testamento

   Verdade

   Véu

   Vicário

   Vida

   Vida eterna

   Vida Pré-mortal

   Vidente

   Vigiar

   Vingança

   Vinha do Senhor

   Vir a Cristo

   Virgem

   Virgem Maria

   Virtude

   Visão

   Viúva

   Vivificar

   Voto

   Voz

W

   Whitmer, David

   Whitmer, John

   Whitmer, Peter, Jr.

   Whitney, Newel K.

   Williams, Frederick G.

   Woodruff, Wilford

Y

   Young, Brigham

Z

   Zacarias (Novo Testamento)

   Zacarias (Velho Testamento)

   Zaraenla

   Zebulom

   Zedequias

   Zeezrom

   Zelo, Zeloso

   Zênife

   Zenoque

   Zenos

   Zípora

   Zorã, Zoramitas

   Zorobabel
*/
//# sourceMappingURL=bodaoscrapper.js.map
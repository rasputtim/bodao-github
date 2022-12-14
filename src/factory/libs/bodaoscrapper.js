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



P??gina-t??tulo
https://www.churchofjesuschrist.org/study/scriptures/ot/title-page
Introdu????o
https://www.churchofjesuschrist.org/study/scriptures/ot/introduction

G??nesis
https://www.churchofjesuschrist.org/study/scriptures/ot/gen
??xodo
https://www.churchofjesuschrist.org/study/scriptures/ot/ex
Lev??tico
https://www.churchofjesuschrist.org/study/scriptures/ot/lev
N??meros
https://www.churchofjesuschrist.org/study/scriptures/ot/lev
Deuteron??mio
https://www.churchofjesuschrist.org/study/scriptures/ot/deut
Josu??
https://www.churchofjesuschrist.org/study/scriptures/ot/josh
Ju??zes
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
1 Cr??nicas
https://www.churchofjesuschrist.org/study/scriptures/ot/1-chr
2 Cr??nicas
https://www.churchofjesuschrist.org/study/scriptures/ot/2-chr
Esdras
https://www.churchofjesuschrist.org/study/scriptures/ot/ezra
Neemias
https://www.churchofjesuschrist.org/study/scriptures/ot/neh
Ester
https://www.churchofjesuschrist.org/study/scriptures/ot/esth
J??
https://www.churchofjesuschrist.org/study/scriptures/ot/job
Salmos
https://www.churchofjesuschrist.org/study/scriptures/ot/ps
Prov??rbios
https://www.churchofjesuschrist.org/study/scriptures/ot/prov
Eclesiastes
https://www.churchofjesuschrist.org/study/scriptures/ot/eccl
Cantares de Salom??o
https://www.churchofjesuschrist.org/study/scriptures/ot/song1
https://www.churchofjesuschrist.org/study/scriptures/ot/jer
Lamenta????es
https://www.churchofjesuschrist.org/study/scriptures/ot/lam
Ezequiel
https://www.churchofjesuschrist.org/study/scriptures/ot/ezek
Daniel
https://www.churchofjesuschrist.org/study/scriptures/ot/dan
Oseias
https://www.churchofjesuschrist.org/study/scriptures/ot/hosea
Joel
https://www.churchofjesuschrist.org/study/scriptures/ot/joel
Am??s
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

Introdu????o e Cronologia

    P??gina de T??tulo
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/title-page
    Introdu????o
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/introduction
    
    Ordem Cronol??gica do Conte??do
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/chron-order
Se????es
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc
Declara????es Oficiais
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/od

sess??es


Se????o 1
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/1

Se????o 2
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/2

Se????o 3
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/3
Se????o 4

....

sess??o 138
https://www.churchofjesuschrist.org/study/scriptures/dc-testament/dc/138


------------------------------------------------------------------------
PGV
https://www.churchofjesuschrist.org/study/scriptures/pgp?lang=por



P??gina de T??tulo
https://www.churchofjesuschrist.org/study/scriptures/pgp/title-page
Introdu????o
https://www.churchofjesuschrist.org/study/scriptures/pgp/introduction
Mois??s
https://www.churchofjesuschrist.org/study/scriptures/pgp/moses
Abra??o
https://www.churchofjesuschrist.org/study/scriptures/pgp/abr
Joseph Smith???Mateus
https://www.churchofjesuschrist.org/study/scriptures/pgp/js-m/1

Joseph Smith???Hist??ria
https://www.churchofjesuschrist.org/study/scriptures/pgp/js-h/1

Regras de F??
https://www.churchofjesuschrist.org/study/scriptures/pgp/a-of-f/1

---------------------------------------------------------------------


Guia para Estudo das Escrituras







-------------------------------------------------------------------------

escritura especifica
mosiah 4.27
https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah/4.27?lang=eng#26

------------------------------------------------------------
search   p??o da vida
https://www.churchofjesuschrist.org/search?lang=por&query=p%C3%A3o%20da%20vida&facet=scriptures&subfacet=nt&highlight=true&page=1


*/
const scripture = [
    { bookName: [{ lang: 'eng', name: 'old testment' }, { lang: 'por', name: 'velho testmento' }],
        api: 'ot' },
    { bookName: [{ lang: 'eng', name: 'new testment' }, { lang: 'por', name: 'novo testmento' }],
        api: 'nt' },
    { bookName: [{ lang: 'eng', name: 'doctrine and covenants' }, { lang: 'por', name: 'doutrina e conv??nios' }],
        api: 'dc-testament' },
    { bookName: [{ lang: 'eng', name: 'book of mormon' }, { lang: 'por', name: 'livro de mormon' }],
        api: 'bofm' },
    { bookName: [{ lang: 'eng', name: 'Pearl of Great Price' }, { lang: 'por', name: 'p??rola de grande valor' }],
        api: 'pgp' },
    { bookName: [{ lang: 'eng', name: 'section' }, { lang: 'por', name: 'se????o' }],
        api: 'dc' },
    { bookName: [{ lang: 'eng', name: 'chronological order' }, { lang: 'por', name: 'Ordem Cronol??gica do Conte??do' }],
        api: 'chron-order' },
    { bookName: [{ lang: 'eng', name: 'introduction' }, { lang: 'por', name: 'introdu????o' }],
        api: 'introduction' },
    { bookName: [{ lang: 'eng', name: 'title page' }, { lang: 'por', name: 'P??gina de T??tulo' }],
        api: 'title-page' }
];
const ot = {
    'name': 'ot',
    'data': { bookName: [{ lang: 'eng', name: 'old testment' }, { lang: 'por', name: 'velho testamento' }],
        api: 'ot' },
    'P??gina-t??tulo': { api: 'title-page', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/title-page' },
    'Introdu????o': { api: 'introduction', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/introduction' },
    'G??nesis': { api: 'gen', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/gen' },
    '??xodo': { api: 'ex', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ex' },
    'Lev??tico': { api: 'lev', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/lev' },
    'N??meros': { api: 'num', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/num' },
    'Deuteron??mio': { api: 'deut', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/deut' },
    'Josu??': { api: 'josh', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/josh' },
    'Ju??zes': { api: 'judg', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/judg' },
    'Rute': { api: 'ruth', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ruth' },
    '1 Samuel': { api: '1-sam', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/1-sam' },
    '2 Samuel': { api: '2-sam', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/2-sam' },
    '1 Reis': { api: '1-kgs', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/1-kgs' },
    '2 Reis': { api: '2-kgs', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/2-kgs' },
    '1 ': { api: '1-chr', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/1-chr' },
    '2 Cr??nicas': { api: '2-chr', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/2-chr' },
    'Esdras': { api: 'ezra', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ezra' },
    'Neemias': { api: 'neh', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/neh' },
    'Ester': { api: 'esth', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/esth' },
    'J??': { api: 'job', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/job' },
    'Salmos': { api: 'ps', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ps' },
    'Prov??rbios': { api: 'prov', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/prov' },
    'Eclesiastes': { api: 'eccl', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/eccl' },
    'Jeremias': { api: 'song1', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/song1' },
    'Cantares de Salom??o': { api: 'jer', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/jer' },
    'Lamenta????es': { api: 'lam', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/lam' },
    'Ezequiel': { api: 'ezek', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/ezek' },
    'Daniel': { api: 'dan', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/dan' },
    'Oseias': { api: 'hosea', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/hosea' },
    'Joel': { api: 'joel', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/joel' },
    'Am??s': { api: 'amos', link: 'https://www.churchofjesuschrist.org/study/scriptures/ot/amos' },
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
    'Jo??o': { api: 'john', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/john' },
    'Atos': { api: 'acts', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/acts' },
    'Romanos': { api: 'rom', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/rom' },
    '1 Cor??ntios': { api: '1-cor', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-cor' },
    '2 Cor??ntios': { api: '2-cor', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-cor' },
    'G??latas': { api: 'gal', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/gal' },
    'Ef??sios': { api: 'eph', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/eph' },
    'Filipenses': { api: 'philip', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/philip' },
    'Colossenses': { api: 'col', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/col' },
    '1 Tessalonicenses': { api: '1-thes', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-thes' },
    '2 Tessalonicenses': { api: '2-thes', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-thes' },
    '1 Tim??teo': { api: '1-tim', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-tim' },
    '2 Tim??teo': { api: '2-tim', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-tim' },
    'Tito': { api: 'titus', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/titus' },
    'Filemom': { api: 'philem', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/philem' },
    'Hebreus': { api: 'heb', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/heb' },
    'Tiago': { api: 'james', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/james' },
    '1 Pedro': { api: '1-pet', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-pet' },
    '2 Pedro': { api: '2-pet', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-pet' },
    '1 Jo??o': { api: '1-jn', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/1-jn' },
    '2 Jo??o': { api: '2-jn', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/2-jn/1' },
    '3 Jo??o': { api: '3-jn', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/3-jn/1' },
    'Judas': { api: 'jude', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/jude/1' },
    'Apocalipse': { api: 'rev', link: 'https://www.churchofjesuschrist.org/study/scriptures/nt/rev' }
};
const bofm = {
    'name': 'bofm',
    'data': { bookName: [{ lang: 'eng', name: 'book of mormon' }, { lang: 'por', name: 'livro de mormon' }], api: 'bofm' },
    'P??gina de T??tulo': { api: 'title-page', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/title-page' },
    'P??gina de T??tulo do Livro de M??rmon': { api: 'bofm-title', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/bofm-title' },
    'Introdu????o': { api: 'introduction', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/introduction' },
    'Depoimento de Tr??s Testemunhas': { api: 'three', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/three' },
    'Depoimento de Oito Testemunhas': { api: 'eight', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/eight' },
    'Testemunho do Profeta Joseph Smith': { api: 'js', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/js' },
    'Breve Explica????o sobre o Livro de M??rmon': { api: 'explanation', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/explanation' },
    'Ilustra????es': { api: 'illustrations', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/illustrations' },
    '1 N??fi': { api: '1-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/1-ne' },
    '2 N??fi': { api: '2-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/2-ne' },
    'Jac??': { api: 'jacob', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/jacob' },
    'Enos': { api: 'enos', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/enos/1' },
    'Jarom': { api: 'jarom', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/jarom/1' },
    '??mni': { api: 'omni', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/omni/1' },
    'Palavras de M??rmon': { api: 'w-of-m', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/w-of-m/1' },
    'Mosias': { api: 'mosiah', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/mosiah' },
    'Alma': { api: 'alma', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/alma' },
    'Helam??': { api: 'hel', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/hel' },
    '3 N??fi': { api: '3-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/3-ne' },
    '4 N??fi': { api: '4-ne', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/4-ne/1' },
    'M??rmon': { api: 'morm', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/morm' },
    '??ter': { api: 'ether', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/ether' },
    'Mor??ni': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/moro' },
    'Guia de Refer??ncias do Livro de M??rmon': { api: 'reference', link: 'https://www.churchofjesuschrist.org/study/scriptures/bofm/reference' },
};
const dc = {};
const pgp2 = [
    { section: [{ lang: 'eng', name: 'Title Page' }, { lang: 'por', name: 'P??gina de T??tulo' }],
        api: 'title-page' },
    { section: [{ lang: 'eng', name: 'introduction' }, { lang: 'por', name: 'Introdu????o' }],
        api: 'introduction' },
    { section: [{ lang: 'eng', name: 'Moses' }, { lang: 'por', name: 'Mois??s' }],
        api: 'moses' },
    { section: [{ lang: 'eng', name: 'Abraham' }, { lang: 'por', name: 'Abra??o' }],
        api: 'abr' },
    { section: [{ lang: 'eng', name: 'Joseph Smith???Matthew' }, { lang: 'por', name: 'Joseph Smith???Mateus' }],
        api: 'js-m/1' },
    { section: [{ lang: 'eng', name: 'Joseph Smith???History' }, { lang: 'por', name: 'Joseph Smith???Hist??ria' }],
        api: 'js-h/1' },
    { section: [{ lang: 'eng', name: 'Articles of Faith' }, { lang: 'por', name: 'Regras de F??' }],
        api: 'a-of-f/1' },
];
const pgp = {
    'name': 'dc',
    'data': { bookName: [{ lang: 'eng', name: 'Pearl of Great Price' }, { lang: 'por', name: 'p??rola de grande valor' }], api: 'pgp' },
    'P??gina de T??tulo': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/title-page' },
    'Introdu????o': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/introduction' },
    'Mois??s': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/moses' },
    'Abra??o': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/abr' },
    'Joseph Smith???Mateus': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/js-m/1' },
    'Joseph Smith???Hist??ria': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/js-h/1' },
    'Regras de F??': { api: 'moro', link: 'https://www.churchofjesuschrist.org/study/scriptures/pgp/a-of-f/1' },
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
        parsed = bodaoScrapper.bcv.parse(what); //.parsed_entities(); //"Jo??o 3:4-13,16"); // Returns the `bcv` object.
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

   Aar??o, Filho de Mosias

   Aar??o, Irm??o de Mois??s

   Aar??nico, Sacerd??cio

   Abede-Nego

   Abel

   Aben??oado, Aben??oar, B??n????o

   Abin??di

   Abomina????o, Abomin??vel

   Abomin??vel Igreja

   Abra??o

   Abra??o, Conv??nio de

   Abr??o

   Abund??ncia

   Acabe

   A????o de Gra??as, Agradecido, Agradecimento

   Aconselhar, Conselho

   Acreditar

   Ad??o

   Ad??o-ondi-Am??

   Ado????o

   Adorar

   Adult??rio

   Advers??rio

   Adversidade

   Advert??ncia, Advertir, Prevenir

   Advogado

   Agar

   Ageu

   Agripa

   ??guas Vivas

   ??lcool

   Alegria

   Alfa e ??mega

   Alma

   Alma, Filho de Alma

   Alma, o Pai

   Altar

   Amaldi??oar, Maldi????es

   Amalequitas (Livro de M??rmon)

   Amalequitas (Velho Testamento)

   Amaliquias

   Am??m

   Amon, Descendente de Zaraenla

   Amon, Filho de Mosias

   Amor

   Am??s

   Amuleque

   Ana, M??e de Samuel

   Ana, Profetiza

   Ananias de Damasco

   Ananias de Jerusal??m

   An??s

   Anci??o

   Anci??o de Dias

   Andar, Andar com Deus

   Andr??

   Anjos

   Anjos Ministradores

   Anlici, Anlicitas

   Anticristo

   ??nti-n??fi-le??tas

   Apocalipse do Ap??stolo Jo??o

   Ap??crifos, Livros

   Apoio aos L??deres da Igreja

   Apostasia

   Ap??stolo

   Arb??trio

   Arca

   Arca da Alian??a

   Arcanjo

   Arco-??ris

   Armadura

   Armagedom

   Armaz??m

   Arrepender-se, Arrependimento

   Artimanhas Sacerdotais

   ??rvore da Vida

   Asa

   Ascens??o

   Aser

   Assassinato

   Ass??ria

   Atalaia, Sentinela, Vigiar

   Atender, Dar ouvidos

   Atos dos Ap??stolos

   Autoridade

   Autoridades Gerais

   Avarento, Avareza

   Azeite

B

   Baal

   Babel, Babil??nia

   Bala??o

   B??lsamo de Gileade

   Barnab??

   Barrab??s

   Bartolomeu

   Batalha nos C??us

   Bate-Seba

   Batismo, Batizar

   Batismo de Criancinhas

   Batista

   Beatitudes

   Beber, B??bado

   Bebidas Alco??licas

   Bel??m

   Belsazar

   Bem-Aventuran??as

   Bem-Estar

   B??n????o

   B??n????o dos Doentes

   B??n????os Patriarcais

   Benjamim, Filho de Jac??

   Benjamim, Pai de Mosias

   Bet??nia

   Betel

   Betsab??

   B??blia

   B??blia, Tradu????o de Joseph Smith

   Bispo

   Bispo Presidente

   Blasfemar, Blasf??mia

   Boaz

   Bom Pastor

   Bosque Sagrado

C

   Cadeia de Carthage (EUA)

   Cadeia de Liberty, Missouri (EUA)

   Caif??s

   Caim

   Calebe

   Cal??nias

   Calv??rio

   Caminho

   Campo

   Cana??, Cananeus

   C??none

   Cantar

   Cantares de Salom??o

   C??o

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

   Centuri??o

   C??sar

   C??u

   Chamado, Chamado por Deus, Chamar

   Chamado (Voca????o) e Elei????o

   Chaves do Sacerd??cio

   Circuncis??o

   Ciro

   Ci??me

   Ciz??nia

   Cobi??ar

   C??lera

   Coliga????o de Israel

   Colobe

   Colossenses, Ep??stola aos

   Combina????es Secretas

   Compaix??o

   Compelir, Constranger

   Comportamento Homossexual

   Compreens??o, Entendimento

   Comum Acordo

   Comunh??o

   Concupisc??ncia

   Condado de Jackson, Missouri (EUA)

   Condena????o, Condenar

   Confessar, Confiss??o

   Confian??a, Confiar

   Confirma????o

   Confraternizar

   Conhecimento

   Consagrar, Lei da Consagra????o

   Consci??ncia

   Conselho dos Doze

   Conselho nos C??us

   Consolador

   Constitui????o

   Constranger

   Conten????o, Contenda

   Controle da Natalidade

   Conv??nio

   Conv??nio Abra??mico

   Conv??nio Eterno

   Convers??o, Converter

   Cora????o

   Cora????o Quebrantado

   Coragem, Corajoso

   Cordeiro de Deus

   Cori??nton

   Cori??ntumr

   Cor??ntios, Ep??stola aos

   Corior

   Corn??lio

   Coroa

   Corpo

   Coura??a

   C??vado

   Cowdery, Oliver

   Cren??a, Crer

   Cria????o, Criar

   Cria????o Espiritual

   Criador

   Crian??a(s)

   Crist??os

   Cristo

   Cr??nicas

   Cronologia

   Crucifica????o

   Cruz

   C??bito

   Culpa

   Cumora, Monte

   Curar, Curas

D

   D??

   Dalila

   Damasco

   Daniel

   Dario

   Davi

   D??bora

   Declara????o Oficial 1

   Declara????o Oficial 2

   Deidade

   Descansar, Descanso

   Deseret

   Designa????o

   Desprezar, Desprezo

   Destruidor

   Deus

   Deuteron??mio

   Dever

   Dez Mandamentos

   Dez Tribos

   Diabo

   Di??cono

   Dia do S??bado (Dia de Descanso)

   Dia do Senhor

   Difama????o

   Dignidade, Digno

   Dilig??ncia

   Dil??vio no Tempo de No??

   Dinheiro

   Discernimento, Dom de

   Disciplinar

   Disc??pulo

   Disc??pulos Nefitas

   Discuss??o

   Dispensa????o

   Dispers??o de Israel

   D??vida

   Div??rcio

   D??zimos

   Doen??a, Doente

   Dolo

   Dom

   Dom do Esp??rito Santo

   Domingo

   Dons do Esp??rito

   Dons Espirituais

   Dormir

   Doutrina de Cristo

   Doutrina e Conv??nios

   Doze, Qu??rum dos

   Doze Tribos de Israel

E

   Eclesiastes

   ??den

   Ef??sios, Ep??stola aos

   Efraim

   Egito

   Egitus

   ??lder (Anci??o)

   Elei????o

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

   Enos, Filho de Jac??

   Ensinar, Mestre

   Entendimento

   Ep??stolas Paulinas

   Esa??as

   Esa??

   Escola dos Profetas

   Escolher, Escolhido (verbo)

   Escolhido (adjetivo ou substantivo)

   Escriba

   Escrituras

   Escrituras Perdidas

   Escutar

   Esdras

   Esmolas

   Esperan??a

   Esp??rito

   Esp??rito Contrito

   Esp??rito Santo

   Esp??ritos Malignos

   Esposa

   Esposo

   Estaca

   Estandarte

   Estandarte da Liberdade

   Ester

   Est??v??o

   Estimar

   ??ter

   Eu Sou

   Eva

   Evangelho

   Evangelhos

   Evangelista

   Exalta????o

   Excomunh??o

   ??xodo

   Expia????o, Expiar

   Ezequias

   Ezequiel

F

   Fam??lia

   Fara??

   Fariseus

   Fayette, Nova York (EUA)

   Fazer

   F??

   Felicidade, Feliz

   Filemom

   Filemom, Ep??stola a

   Filho(s)

   Filho de Deus

   Filho do Homem

   Filhos de Cristo

   Filhos de Deus

   Filhos de Helam??

   Filhos de Israel

   Filhos de Mosias

   Filhos de Perdi????o

   Filhos e Filhas de Deus

   Filipe

   Filipenses, Ep??stola aos

   Filisteus

   Fim do Mundo

   Fogo

   Fornica????o

   Fraqueza

   Fraudar, Fraude, Fraudulento

   Fruto Proibido

G

   Gabriel

   Gade, Filho de Jac??

   Gade, o Vidente

   Gadi??nton

   G??latas, Esp??stola aos

   Galileia

   Gamaliel

   Genealogia

   G??nesis

   Gentios

   Gerar

   Gets??mani

   Gide??o (Livro de M??rmon)

   Gide??o (Velho Testamento)

   Gl??ria

   Gl??ria Celestial

   Gl??ria Telestial

   Gl??ria Terrestre

   Gogue

   G??lgota

   Golias

   Gomorra

   Governo

   Gozo

   Gra??a

   Grande e Abomin??vel Igreja

   Gr??o de Mostarda

   Gratid??o

   Graus de Gl??ria

   Guerra

   Guerra nos C??us

H

   Habacuque

   Hades

   Hagar

   Hagote

   Harris, Martin

   Hebraico

   Hebreus, Ep??stola aos

   Hebrom

   Helam??, Filho de Alma

   Helam??, Filho de Helam??

   Helam??, Filho do Rei Benjamim

   Helam??, Filhos de

   Herdeiro

   Herodes

   Herodias

   H??mni

   Hino

   Hist??ria da Fam??lia

   Homem, Homens

   Homem de Santidade

   Homem Natural

   Homic??dio

   Honestidade, Honesto

   Honra, Honrar

   Hosana

   Humildade, Humilde, Humilhar

   Hyde, Orson

I

   Idolatria

   Igreja, Grande e Abomin??vel

   Igreja, Nome da

   Igreja de Jesus Cristo

   Igreja de Jesus Cristo dos Santos dos ??ltimos Dias, A

   Igreja Verdadeira, Sinais da

   Imers??o

   Imoralidade

   Imoralidade Sexual

   Imortal, Imortalidade

   Imp??rio Romano

   ??mpio

   Imposi????o de M??os

   Imund??cie, Imundo

   Incredulidade

   Inferno

   Infinito

   Inimizade

   Iniquidade, In??quo

   Injusti??a, Injusto

   Inoc??ncia, Inocente

   Inspira????o, Inspirar

   Integridade

   Intelig??ncia(s)

   Inveja

   Investidura, Investir

   Ira

   Irm??(s), Irm??o(s)

   Irm??o de Jarede

   Isabel

   Isa??as

   Isaque

   Ismael, Filho de Abra??o

   Ismael, Sogro de N??fi

   Israel

   Issacar

J

   Jac??, Filho de Isaque

   Jac??, Filho de Le??

   Jact??ncia

   Jaf??

   Jardim do ??den

   Jardim do Gets??mani

   Jarede

   Jarede, Irm??o de

   Jareditas

   Jarom

   Jejuar, Jejum

   Jeov??

   Jeremias

   Jeric??

   Jerobo??o

   Jerubaal

   Jerusal??m

   Jerusal??m, Nova

   Jess??

   Jesus Cristo

   Jetro

   Jezabel

   J??

   Jo??o, Filho de Zebedeu

   Jo??o Batista

   Joel

   Joio

   Jonas

   J??natas

   Josaf??

   Jos??, Filho de Jac??

   Jos??, Marido de Maria

   Jos??, Vara de

   Jos?? de Arimateia

   Joseph Smith Jr.

   Josias

   Josu??

   Jud??

   Judas

   Judas, Irm??o de Tiago

   Judas Iscariotes

   Judeus

   Jugo

   Ju??zes, Livro dos

   Ju??zo Final

   Julgar

   Juramento

   Juramento e Conv??nio do Sacerd??cio

   Jurar

   Justi??a

   Justifica????o, Justificar

   Justo(s)

K

   Kimball, Spencer W.

L

   Lab??o, Irm??o de Rebeca

   Lab??o, o Guardi??o das Placas de Lat??o

   Ladr??es de Gadi??nton

   Lam??

   Lamanitas

   Lamenta????es, Livro de

   Lam??ni

   Lar

   Lavado, Lavamento, Lavar

   L??zaro

   Lei

   Le??, Comandante Militar Nefita

   Le??, Mission??rio Nefita

   Le??, Pai de N??fi

   Lei de Mois??s

   Lemuel

   Lepra

   Levi

   Leviandade

   Levitas

   Lev??tico

   Lia

   Liahona

   Liberdade, Livre

   Libertador

   L??mi

   Limpo e Imundo

   L??ngua

   Linguagem

   L??nguas, Dom das

   Livre-arb??trio

   Livro da Vida

   Livro de Mandamentos

   Livro de M??rmon

   Livro de Recorda????es

   Livros Ap??crifos

   L??

   Louvar, Louvor

   Lucas

   L??cifer

   Lugar Sant??ssimo

   Luz, Luz de Cristo

M

   M??e

   Magogue

   Malaquias

   Maledic??ncia

   Mamom

   Man??

   Manass??s

   Mandamentos, Os Dez

   Mandamentos de Deus

   Manifesto

   Mansid??o, Manso, Mansuetude

   M??os, Imposi????o de

   Marcos

   Maria, M??e de Jesus

   Maria, M??e de Marcos

   Maria de Bet??nia

   Maria Madalena

   Marido

   Mar Morto

   Marsh, Thomas B.

   Marta

   M??rtir, Mart??rio

   Mar Vermelho

   Matar

   Mateus

   Matias

   Matusal??m

   Mau G??nio

   Mediador

   Meditar

   Melquisedeque

   Menino(s)

   Mente

   Mentir, Mentiroso

   Mesaque

   Messias

   Mestre, Sacerd??cio Aar??nico

   Mexerico

   Miguel

   Milagre

   Mil??nio

   Minist??rio, Ministro

   Miqueias

   Miri??

   Miseric??rdia, Misericordioso

   Mission??rios

   Missouri

   Mist??rios de Deus

   Moabe

   Modelo

   Mois??s

   Monte das Oliveiras

   Monte Sinai

   Moralidade

   Mordomia, Mordomo

   M??rmon, Livro de

   M??rmon, Profeta Nefita

   M??rmon(s)

   Mor??ni, Capit??o

   Mor??ni, Filho de M??rmon

   Moronia, Filho do Capit??o Moroni

   Mortal, Mortalidade

   Morte, Segunda

   Morte Espiritual

   Morte F??sica

   Mortos, Salva????o para os

   Mosias, Filho do rei Benjamim

   Mosias, Filhos de

   Mosias, Pai do Rei Benjamim

   Muleque

   Mulher, Mulheres

   Mundanismo

   Mundo

   Mundo Espiritual

   Murmurar

   M??sica

N

   Naam??

   Nabucodonosor

   Naftali

   Nascer de Deus, Nascer de Novo

   Nat??

   Natanael

   Naum

   Nauvoo, Illinois (EUA)

   Nazar??

   Neemias

   N??fi, Filho de Helam??

   N??fi, Filho de Le??

   N??fi, Filho de N??fi, Filho de Helam??

   Nefitas

   Neor

   Nicodemos

   N??nive

   No??, Filho de Z??nife

   No??, Patriarca B??blico

   Noemi

   Nome da Igreja

   Nova Jerusal??m

   Novo e Eterno Conv??nio

   Novo Testamento

   N??meros

O

   Obadias

   Obede

   Obedecer, Obedi??ncia, Obediente

   Obra Mission??ria

   Obras

   Obras-Padr??o

   Ociosidade, Ocioso

   Odiar, ??dio

   Ofender

   Oferta

   Oficial, Of??cio

   ??leo

   Olho(s)

   Oliveira

   Oliveiras, Monte das

   ??mega

   ??mner

   ??mni

   Onipotente

   Onipresente

   Onisciente

   Oposi????o

   Ora????o

   Ora????o do Senhor, A

   Ordem Unida

   Ordena????o, Ordenar

   Ordenan??as

   Orgulho

   Oseias

   Ouvido, Ouvir

P

   Paci??ncia

   Pacificador

   Pai Celestial

   Pai Eterno

   Pai Nosso, O

   Pais

   Pai Terreno

   Palavra de Deus

   Palavra de Sabedoria

   P??o da Vida

   Paor??

   Par??bola

   Para??so

   Partridge, Edward

   P??scoa

   P??scoa da Ressurrei????o

   Pastor

   Patriarca, Patriarcal

   Patten, David W.

   Paulo

   Paz

   Pecado

   Pecado Imperdo??vel

   Pedir

   Pedra de Esquina

   Pedro

   Peitoral

   Pelegue

   Pena de Morte

   Pensamentos

   Pentateuco

   Pentecostes

   Perdi????o

   Perdoar

   Perfeito

   P??rola de Grande Valor

   Persegui????o, Perseguir

   Perseverar

   Phelps, William W.

   Pilatos, P??ncio

   Placas

   Placas de Lat??o

   Placas de Ouro

   Plano de Reden????o

   Plano de Salva????o

   Pobres

   Poder

   Poligamia

   Pomba, Sinal da

   Ponderar

   Pornografia

   Pratt, Orson

   Pratt, Parley Parker

   Predestina????o

   Pregar

   Preordena????o

   Presid??ncia

   Presidente

   Prestar Contas, Responsabilidade, Respons??vel

   Primeira Presid??ncia

   Primeira Vis??o

   Primeiros Princ??pios do Evangelho

   Prim??cias

   Primog??nito

   Primogenitura

   Princ??pio

   Pris??o Espiritual

   Profanidade

   Profano

   Profecia, Profetizar

   Profeta

   Profetisa

   Prov??rbio

   Publicano

   Pureza, Puro

Q

   Queda de Ad??o e Eva

   Querubins

   Quisc??men

   Qu??rum

R

   Rafael

   Rameumpton

   Raquel

   Realistas

   Rebeca

   Rebeldia, Rebeli??o

   Recato

   Reden????o, Plano de

   Reden????o, Redimido, Redimir

   Redentor

   Regras de F??

   Reino de Deus ou Reino dos C??us

   Reis

   Remiss??o de Pecados

   Repreender

   Responsabilidade, Idade da

   Ressurrei????o

   Restaura????o, Restitui????o

   Restaura????o do Evangelho

   Retid??o

   Reuel

   Revela????o

   Revela????o de Jo??o

   Rever??ncia

   Rigdon, Sidney

   Rio Jord??o

   Riquezas

   Robo??o

   Rocha

   Roma

   Romanos, Ep??stola aos

   Roubar, Roubo

   R??ben

   Rumores

   Rute

S

   S??bado

   Sabedoria

   Sacerd??cio

   Sacerd??cio, Chaves do

   Sacerd??cio, Ordena????o

   Sacerd??cio Aar??nico

   Sacerd??cio de Melquisedeque

   Sacerd??cio Lev??tico

   Sacerdote, Sacerd??cio Aar??nico

   Sacerdote, Sacerd??cio de Melquisedeque

   Sacramento

   Sacrif??cio

   Sadraque

   Saduceus

   Sagrado

   Sal

   Sal??m

   Salmo

   Salom??o

   Salva????o

   Salva????o, Plano de

   Salva????o de Crian??as

   Salva????o para os Mortos

   Salvador

   Sam

   Samaria

   Samaritanos

   Samuel, o Lamanita

   Samuel, Profeta do Velho Testamento

   Sangue

   Sans??o

   Santidade

   Santifica????o

   Santo (adjetivo)

   Santo (substantivo)

   Santo de Israel, O

   Santo dos Santos

   Santo Esp??rito

   Santo Esp??rito da Promessa

   Sara

   Sarar

   Saria

   Satan??s

   Sa??de

   Saul, Rei de Israel

   Saulo de Tarso

   Sega

   Segunda Vinda de Jesus Cristo

   Segundo Consolador

   Segundo Estado

   Selamento, Selar

   Sem

   Semblante

   Semente de Abra??o

   Senhor

   Senhor dos Ex??rcitos

   Sensual, Sensualidade

   Sentinela

   Sentir

   Sepulcro, Sepultura

   Ser??m

   Seres Transladados

   Serm??o da Montanha

   Serpente de Bronze

   Servi??o

   Sete

   Setenta

   Si??o

   Siblon

   Sim??o, o Zelote

   Sim??o Pedro

   Simbolismo

   Sime??o

   Sinagoga

   Sinais da Igreja Verdadeira

   Sinais do Nascimento e da Morte de Jesus Cristo

   Sinais dos Tempos

   Sinal

   Sin??drio

   Siz

   Smith, Emma Hale

   Smith, Hyrum

   Smith, Joseph, Jr.

   Smith, Joseph, S??nior

   Smith, Joseph F.

   Smith, Lucy Mack

   Smith, Samuel H.

   Sodoma

   Sofonias

   Sonho

   Sono

   Sortes

   Sumo Conselho

   Sumo Sacerd??cio

   Sumo Sacerdote

T

   Tabaco, Fumo

   Tabern??culo

   Talento

   Taylor, John

   Te??ncum

   Temor

   Templo, A Casa do Senhor

   Templo de Kirtland, Ohio (EUA)

   Tenta????o, Tentar

   Terra

   Terra da Promiss??o

   Tessalonicenses, Ep??stola aos

   Testamento

   Testemunha

   Testemunhas do Livro de M??rmon

   Testemunho

   Testificar

   Tiago, Filho de Alfeu

   Tiago, Filho de Zebedeu

   Tiago, Irm??o do Senhor

   Tim??teo

   Tim??teo, Ep??stolas a

   Tito

   Tito, Ep??stola a

   Tom??

   Tradi????es

   Tradu????o de Joseph Smith (TJS)

   Traduzir

   Transfigura????o

   Tr??s Disc??pulos Nefitas

   Trevas Espirituais

   Trevas Exteriores

   Tribos Perdidas

   Trindade

U

   ??ltima Ceia

   ??ltimos Dias

   Um

   Un????o, Ungir

   Ungido, O

   Unidade

   Unig??nito

   Ur

   Urim e Tumim

V

   Vaidade, V??o

   Valente, Valor

   Vara de Efraim

   Vara de Jos??

   Vara de Jud??

   Velar, Vigiar

   Velho Testamento

   Verdade

   V??u

   Vic??rio

   Vida

   Vida eterna

   Vida Pr??-mortal

   Vidente

   Vigiar

   Vingan??a

   Vinha do Senhor

   Vir a Cristo

   Virgem

   Virgem Maria

   Virtude

   Vis??o

   Vi??va

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

   Z??nife

   Zenoque

   Zenos

   Z??pora

   Zor??, Zoramitas

   Zorobabel
*/
//# sourceMappingURL=bodaoscrapper.js.map
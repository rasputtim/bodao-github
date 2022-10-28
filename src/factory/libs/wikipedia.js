/**
* Made by Adul Aldy Nana MD
**/
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
import * as cheerio from 'cheerio';
function wikipedia(querry) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const link = yield axios.get(`https://id.wikipedia.org/wiki/${querry}`);
            const $ = cheerio.load(link.data);
            let judul = $('#firstHeading').text().trim();
            let thumb = $('#mw-content-text').find('div.mw-parser-output > div:nth-child(1) > table > tbody > tr:nth-child(2) > td > a > img').attr('src') || `//i.ibb.co/nzqPBpC/http-error-404-not-found.png`;
            let isi = [];
            $('#mw-content-text > div.mw-parser-output').each(function (rayy, Ra) {
                let penjelasan = $(Ra).find('p').text().trim();
                isi.push(penjelasan);
            });
            for (let i of isi) {
                const data = {
                    status: link.status,
                    result: {
                        judul: judul,
                        thumb: 'https:' + thumb,
                        isi: i
                    }
                };
                return data;
            }
        }
        catch (err) {
            var notFond = {
                status: link.status,
                Pesan: eror
            };
            return notFond;
        }
    });
}
let handler = (m, { conn, text }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!text)
        throw `uhm.. cari apa?\n\ncontoh:\n.wiki nodejs`;
    wikipedia(`${text}`).then(res => {
        m.reply(res.result.isi);
    }).catch(() => { m.reply('Tidak Ditemukan'); });
});
handler.help = ['wikipedia <pencarian>'];
handler.tags = ['internet'];
handler.command = /^(wiki(pedia)?)$/i;
module.exports = handler;
//# sourceMappingURL=wikipedia.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
Si
*/
import cheerio from "cheerio";
import cookie from "cookie";
import FormData from "form-data";
import fetch from "node-fetch";
import UserAgentManager from "../userAgentsManager.js";
class Textpro {
    static post(url, formdata = {}, cookies) {
        return __awaiter(this, void 0, void 0, function* () {
            let encode = encodeURIComponent;
            const theAgent = UserAgentManager.getRandomAgent();
            //"GoogleBot"
            let body = Object.keys(formdata)
                .map((key) => {
                let vals = formdata[key];
                let isArray = Array.isArray(vals);
                let keys = encode(key + (isArray ? "[]" : ""));
                if (!isArray)
                    vals = [vals];
                let out = [];
                for (let valq of vals)
                    out.push(keys + "=" + encode(valq));
                return out.join("&");
            })
                .join("&");
            return yield fetch(`${url}?${body}`, {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Accept-Language": "en-US,en;q=0.9",
                    "User-Agent": theAgent,
                    Cookie: cookies,
                },
            });
        });
    }
    /**
     * TextPro Scraper
     * @function
     * @param {String} url - Your phootoxy url, example https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html.
     * @param {String[]|string} text - Text (required). example ["text", "text 2 if any"]
     */
    static run(url, text) {
        return __awaiter(this, void 0, void 0, function* () {
            const theAgent = UserAgentManager.getRandomAgent();
            //"GoogleBot"
            if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url))
                throw new Error("Url inválido! -.-");
            const geturl = yield fetch(url, {
                method: "GET",
                headers: {
                    "User-Agent": theAgent,
                },
            });
            const caritoken = yield (geturl === null || geturl === void 0 ? void 0 : geturl.text());
            const x = geturl.headers;
            let hasilcookie;
            if (x) {
                hasilcookie = x
                    .get("set-cookie")
                    .split(",")
                    .map((v) => cookie.parse(v))
                    .reduce((a, c) => {
                    return Object.assign(Object.assign({}, a), c);
                }, {});
            }
            hasilcookie = {
                __cfduid: hasilcookie.__cfduid,
                PHPSESSID: hasilcookie.PHPSESSID,
            };
            hasilcookie = Object.entries(hasilcookie)
                .map(([name, value]) => cookie.serialize(name, value))
                .join("; ");
            const $ = cheerio.load(caritoken);
            const token = $('input[name="token"]').attr("value");
            let _resUlt = new FormData();
            if (typeof text === "string")
                text = [text];
            for (let texts of text)
                _resUlt.append("text[]", texts);
            _resUlt.append("submit", "Go");
            _resUlt.append("token", token);
            _resUlt.append("build_server", "https://textpro.me");
            _resUlt.append("build_server_id", 1);
            const geturl2 = yield fetch(url, {
                method: "POST",
                headers: Object.assign({ Accept: "*/*", "Accept-Language": "en-US,en;q=0.9", "User-Agent": theAgent, Cookie: hasilcookie }, _resUlt.getHeaders()),
                body: _resUlt.getBuffer(),
            });
            const caritoken2 = yield geturl2.text();
            const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
            if (!token2)
                throw new Error("Token no encontrado!");
            const prosesimage = yield Textpro.post("https://textpro.me/effect/create-image", JSON.parse(token2[1]), hasilcookie);
            const hasil = yield prosesimage.json();
            return `https://textpro.me${hasil.fullsize_image}`;
        });
    }
}
export default Textpro;
//# sourceMappingURL=textpro.js.map
/*
Gracias a su creador :D
*/
import async from 'async';
import escapeStringRegexp from 'escape-string-regexp';
import fakeUa from 'fake-useragent';
import fs from 'fs';
import http from "http";
import MultiStream from 'multistream';
import request from 'request';
import url from 'url';
import logger from '../../factory/logger.js';
import { LocaleService } from '../../languajes/localeService.js';
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const boldSign = '*';
let monospace = '```';
const more = '';
let nwn = more.repeat(850);
export default class gtts {
    static Text2Speech(_lang, _debug = false) {
        var lang = _lang || 'pt-br';
        var debug = _debug || false;
        lang = lang.toLowerCase();
        if (!gtts.LANGUAGES[lang])
            //throw new Error('Lenguaje no soportado: ' + lang);
            lang = 'pt-br';
        var getArgs = gtts.getArgsFactory(lang);
        return {
            tokenize: gtts.tokenize,
            createServer: (port) => gtts.createServer(getArgs, port),
            stream: (text) => gtts.stream(getArgs, text),
            save: (filepath, text, callback) => gtts.save(getArgs, filepath, text, callback)
        };
    }
    static save(getArgs, filepath, text, callback) {
        var text_parts = gtts.tokenize(text);
        var total = text_parts.length;
        async.eachSeries(text_parts, (part, cb) => {
            var index = text_parts.indexOf(part);
            var headers = gtts.getHeader();
            var args = getArgs(part, index, total);
            var fullUrl = gtts.GOOGLE_TTS_URL + args;
            var writeStream = fs.createWriteStream(filepath, {
                flags: index > 0 ? 'a' : 'w'
            });
            request({
                uri: fullUrl,
                headers: headers,
                method: 'GET'
            })
                .pipe(writeStream);
            writeStream.on('finish', cb);
            writeStream.on('error', cb);
        }, callback);
    }
    static stream(getArgs, text) {
        var text_parts = gtts.tokenize(text);
        var total = text_parts.length;
        return MultiStream(text_parts.map(function (part, index) {
            var headers = gtts.getHeader();
            var args = getArgs(part, index, total);
            var fullUrl = gtts.GOOGLE_TTS_URL + args;
            return request({
                uri: fullUrl,
                headers: headers,
                method: 'GET'
            });
        }));
    }
    static getHeader() {
        var headers = {
            "User-Agent": fakeUa()
        };
        logger.info('headers', headers);
        return headers;
    }
    static getArgsFactory(lang) {
        return function (text, index, total) {
            var textlen = text.length;
            var encodedText = encodeURIComponent(text);
            var language = lang || 'en';
            return `?ie=UTF-8&tl=${language}&q=${encodedText}&total=${total}&idx=${index}&client=tw-ob&textlen=${textlen}`;
        };
    }
    static tokenize(text) {
        var text_parts = [];
        if (!text)
            throw new Error(__('Sin texto, no hay audio') + ' -.-');
        var punc = '¡!()[]¶;|°•—«»≤≥«»‹›\n ';
        var punc_list = punc.split('').map(function (char) {
            return escapeStringRegexp(char);
        });
        var pattern = punc_list.join('|');
        var parts = text.split(new RegExp(pattern));
        parts = parts.filter(p => p.length > 0);
        var output = [];
        var i = 0;
        for (let p of parts) {
            if (!output[i]) {
                output[i] = '';
            }
            if (output[i].length + p.length < gtts.MAX_CHARS) {
                output[i] += ' ' + p;
            }
            else {
                i++;
                output[i] = p;
            }
        }
        output[0] = output[0].substr(1);
        return output;
    }
    static createServer(getArgs, port) {
        var server = http.createServer(function (req, res) {
            var queryData = url.parse(req.url, true).query;
            var argsCallback = getArgs;
            if (queryData && queryData.lang && gtts.LANGUAGES[queryData.lang]) {
                argsCallback = gtts.getArgsFactory(queryData.lang);
            }
            if (queryData && queryData.text) {
                res.writeHead(200, { 'Content-Type': 'audio/mpeg' });
                gtts.stream(argsCallback, queryData.text).pipe(res);
            }
            else {
                logger.info(req.headers);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    code: -1,
                    message: __('Missing text') + '.' + monospace + __('Please try') + `: ${req.headers.host}?text=your+text`
                }));
            }
        });
        server.listen(port);
        logger.info(__("Text-to-Speech Server running on port") + monospace + port);
    }
}
gtts.GOOGLE_TTS_URL = 'http://translate.google.com/translate_tts';
gtts.MAX_CHARS = 100;
gtts.LANGUAGES = {
    'af': 'Afrikaans',
    'sq': 'Albanian',
    'ar': 'Arabic',
    'hy': 'Armenian',
    'ca': 'Catalan',
    'zh': 'Chinese',
    'zh-cn': 'Chinese (Mandarin/China)',
    'zh-tw': 'Chinese (Mandarin/Taiwan)',
    'zh-yue': 'Chinese (Cantonese)',
    'hr': 'Croatian',
    'cs': 'Czech',
    'da': 'Danish',
    'nl': 'Dutch',
    'en': 'English',
    'en-au': 'English (Australia)',
    'en-uk': 'English (United Kingdom)',
    'en-us': 'English (United States)',
    'eo': 'Esperanto',
    'fi': 'Finnish',
    'fr': 'French',
    'de': 'German',
    'el': 'Greek',
    'ht': 'Haitian Creole',
    'hi': 'Hindi',
    'hu': 'Hungarian',
    'is': 'Icelandic',
    'id': 'Indonesian',
    'it': 'Italian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'la': 'Latin',
    'lv': 'Latvian',
    'mk': 'Macedonian',
    'no': 'Norwegian',
    'pl': 'Polish',
    'pt': 'Portuguese',
    'pt-br': 'Portuguese (Brazil)',
    'ro': 'Romanian',
    'ru': 'Russian',
    'sr': 'Serbian',
    'sk': 'Slovak',
    'es': 'Spanish',
    'es-es': 'Spanish (Spain)',
    'es-us': 'Spanish (United States)',
    'sw': 'Swahili',
    'sv': 'Swedish',
    'ta': 'Tamil',
    'th': 'Thai',
    'tr': 'Turkish',
    'vi': 'Vietnamese',
    'cy': 'Welsh'
};
//# sourceMappingURL=gtts.js.map
export default class gtts {
    static GOOGLE_TTS_URL: string;
    static MAX_CHARS: number;
    static LANGUAGES: {
        af: string;
        sq: string;
        ar: string;
        hy: string;
        ca: string;
        zh: string;
        'zh-cn': string;
        'zh-tw': string;
        'zh-yue': string;
        hr: string;
        cs: string;
        da: string;
        nl: string;
        en: string;
        'en-au': string;
        'en-uk': string;
        'en-us': string;
        eo: string;
        fi: string;
        fr: string;
        de: string;
        el: string;
        ht: string;
        hi: string;
        hu: string;
        is: string;
        id: string;
        it: string;
        ja: string;
        ko: string;
        la: string;
        lv: string;
        mk: string;
        no: string;
        pl: string;
        pt: string;
        'pt-br': string;
        ro: string;
        ru: string;
        sr: string;
        sk: string;
        es: string;
        'es-es': string;
        'es-us': string;
        sw: string;
        sv: string;
        ta: string;
        th: string;
        tr: string;
        vi: string;
        cy: string;
    };
    static Text2Speech(_lang: any, _debug?: boolean): {
        tokenize: typeof gtts.tokenize;
        createServer: (port: any) => void;
        stream: (text: any) => any;
        save: (filepath: any, text: any, callback: any) => void;
    };
    static save(getArgs: any, filepath: any, text: any, callback: any): void;
    static stream(getArgs: any, text: any): any;
    static getHeader(): {
        "User-Agent": any;
    };
    static getArgsFactory(lang: any): (text: any, index: any, total: any) => string;
    static tokenize(text: any): any[];
    static createServer(getArgs: any, port: any): void;
}
//# sourceMappingURL=gtts.d.ts.map
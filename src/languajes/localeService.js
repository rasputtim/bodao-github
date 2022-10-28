import * as fs from 'fs';
import i18n from 'i18n';
import path from 'path';
import FileDB from '../basededatos/fileDatabase.js';
const __dirname = path.resolve();
/**
 * LocaleService
 */
const i18nOptionsDB = path.resolve(__dirname, FileDB.i18config);
const options = JSON.parse(fs.readFileSync(i18nOptionsDB));
const localePath = path.resolve(__dirname, options.directory);
options.directory = localePath;
export class LocaleService {
    /**
     *
     * @param i18nProvider The i18n provider
     */
    constructor(opts) {
        //LocaleService.i18nProvider = opts.i18nProvider;
        if (!LocaleService.i18nProvider)
            LocaleService.i18nProvider = i18n;
        LocaleService.i18nProvider.configure(options);
        LocaleService.i18nProvider.setLocale(options.defaultLocale);
        LocaleService._this = this;
    }
    // static _i18n: LocaleService = LocaleService.build();
    static get i18n() {
        if (LocaleService._this == null) {
            LocaleService.build();
        }
        return LocaleService.i18nProvider;
    }
    static build() {
        const obj = new LocaleService(null);
        return obj;
    }
    /**
     *
     * @returns {string} The current locale code
     */
    getCurrentLocale() {
        return LocaleService.i18n.getLocale();
    }
    /**
     *
     * @returns string[] The list of available locale codes
     */
    static getLocales() {
        return LocaleService.i18n.getLocales();
    }
    getLocales() {
        return LocaleService.getLocales();
    }
    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    static _setLocale(locale) {
        if (LocaleService.getLocales().indexOf(locale) !== -1) {
            LocaleService.i18n.setLocale(locale);
        }
    }
    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    setLocale(locale) {
        LocaleService._setLocale(locale);
    }
    /**
     *
     * @param string String to translate
     * @param args Extra parameters
     * @returns {string} Translated string
     */
    static __(string, ...args) {
        return LocaleService.i18n.__(string, ...args);
    }
    __(string, args = undefined) {
        return LocaleService.__(string, args = undefined);
    }
    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     */
    static __n(phrase, count) {
        return LocaleService.i18n.__n(phrase, count);
    }
    __n(phrase, count) {
        return LocaleService.__n(phrase, count);
    }
}
//private static _i18nProvider = i18n
LocaleService.i18nProvider = i18n;
LocaleService._this = null;
//# sourceMappingURL=localeService.js.map
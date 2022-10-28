import i18n from 'i18n';
export declare class LocaleService {
    private static i18nProvider;
    private static _this;
    /**
     *
     * @param i18nProvider The i18n provider
     */
    constructor(opts: any);
    static get i18n(): typeof i18n;
    static build(): LocaleService;
    /**
     *
     * @returns {string} The current locale code
     */
    getCurrentLocale(): string;
    /**
     *
     * @returns string[] The list of available locale codes
     */
    static getLocales(): string[];
    getLocales(): string[];
    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    static _setLocale(locale: any): void;
    /**
     *
     * @param locale The locale to set. Must be from the list of available locales.
     */
    setLocale(locale: any): void;
    /**
     *
     * @param string String to translate
     * @param args Extra parameters
     * @returns {string} Translated string
     */
    static __(string: any, ...args: any[]): string;
    __(string: any, args?: undefined): string;
    /**
     *
     * @param phrase Object to translate
     * @param count The plural number
     * @returns {string} Translated string
     */
    static __n(phrase: any, count: any): string;
    __n(phrase: any, count: any): string;
}
//# sourceMappingURL=localeService.d.ts.map
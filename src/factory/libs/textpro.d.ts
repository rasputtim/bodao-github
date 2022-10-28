declare class Textpro {
    static post(url: any, formdata: {} | undefined, cookies: any): Promise<import("node-fetch").Response>;
    /**
     * TextPro Scraper
     * @function
     * @param {String} url - Your phootoxy url, example https://photooxy.com/logo-and-text-effects/make-tik-tok-text-effect-375.html.
     * @param {String[]|string} text - Text (required). example ["text", "text 2 if any"]
     */
    static run(url: any, text: any): Promise<string>;
}
export default Textpro;
//# sourceMappingURL=textpro.d.ts.map
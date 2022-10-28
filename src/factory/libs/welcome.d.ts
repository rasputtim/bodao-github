export = render;
/**
 * Render SVG Welcome
 * @param {object} param0
 * @param {string} param0.wid
 * @param {string} param0.pp
 * @param {string} param0.name
 * @param {string} param0.text
 * @param {string} param0.background
 * @returns {Promise<Buffer>}
 */
declare function render({ wid, pp, name, title, text, background, }?: {
    wid: string;
    pp: string;
    name: string;
    text: string;
    background: string;
}, format?: string): Promise<Buffer>;
//# sourceMappingURL=welcome.d.ts.map
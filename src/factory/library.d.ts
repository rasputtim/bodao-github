import antiSpam from './libs/antispam.js';
import gtts from './libs/gtts.js';
import Level from './libs/level.js';
import list from './libs/list.js';
import note from './libs/note.js';
import Register from './libs/register.js';
import schedule from './libs/schedule.js';
import Apimini from './libs/ScrapMini.js';
import Textpro from './libs/textpro.js';
export default class LibraryDB {
    static get level(): typeof Level;
    static get antiSpam(): typeof antiSpam;
    static get textpro(): typeof Textpro;
    static get register(): typeof Register;
    static get gtts(): typeof gtts;
    static get ScrapMini(): typeof Apimini;
    static get api(): {
        pinterest: (wall: any) => Promise<unknown>;
        artinama: (nama: any) => Promise<unknown>;
        ytsearch: (query: any) => Promise<any>;
        simiPais: (inp: any) => Promise<unknown>;
        simiSumi: (inp: any) => Promise<unknown>;
        simiSimi: (imp: any) => Promise<unknown>;
        simiZeks: (inp: any) => Promise<unknown>;
        simiLol: (inp: any) => Promise<unknown>;
        sreddit: (reddit?: string | undefined) => Promise<unknown>;
        memegen: (imageUrl: any, top: any, bottom: any) => string;
        quote: () => Promise<unknown>;
        cuaca: (daerah: any) => Promise<unknown>;
        tulis: (teks: any) => Promise<unknown>;
        lyric: (query: any) => Promise<unknown>;
        ttdl: (url: any) => Promise<unknown>;
        ocr: (url: any) => Promise<unknown>;
        vhtearlink: (q: any) => string;
    };
    static get smsg(): (conn: any, m: any, store: any) => any;
}
export { list, note, schedule };
//# sourceMappingURL=library.d.ts.map
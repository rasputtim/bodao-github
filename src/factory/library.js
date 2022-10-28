import antiSpam from './libs/antispam.js';
import api from './libs/api.js';
import gtts from './libs/gtts.js';
import Level from './libs/level.js';
import list from './libs/list.js';
import note from './libs/note.js';
import Register from './libs/register.js';
import schedule from './libs/schedule.js';
import Apimini from './libs/ScrapMini.js';
import smsg from './libs/serializer.js';
import Textpro from './libs/textpro.js';
export default class LibraryDB {
    static get level() { return Level; }
    static get antiSpam() { return antiSpam; }
    static get textpro() { return Textpro; }
    static get register() { return Register; }
    static get gtts() { return gtts; }
    static get ScrapMini() { return Apimini; }
    static get api() { return api; }
    static get smsg() { return smsg; }
}
export { list, note, schedule };
//# sourceMappingURL=library.js.map
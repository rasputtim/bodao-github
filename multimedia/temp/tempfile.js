var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import proto from '@adiwajshing/baileys/WAProto/index.js';
import Bot from '../src/factory/bot.js';
import Utils from '../src/factory/libs/functions.js';
import _pino from '../src/factory/logger.js';
import { PluginClass } from '../src/factory/pluginManager.js';
import { LocaleService } from '../src/languajes/localeService.js';
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const boldSign = '*';
let monospace = '```';
const more = '';
let nwn = more.repeat(850);
const Waproto = proto.proto;
/**
 * Mode one is public or private
 */
export default class utilsGruposWa extends PluginClass {
    constructor() {
        super('configfile');
        this.command = ['gruposwa', 'wagrupos'];
        this.usage = (command) => {
            if (!command)
                return Bot.prefix + this.command[0];
            else
                return Bot.prefix + command;
        };
        this.help = this.command.map(v => this.usage(v));
        this.tags = ['UTILS'];
        this.shortDesc = __('get WA groups');
        this.description = __('get WA groups for you to join');
        this.commandRegex = /^(gruposwa|wagrupos)$/i;
        this.logger = _pino.child({ class: this.command[0] });
        this.ResourceModesCheckEnabled.mode_limitcheck = true;
        this.ResourceModesCheckEnabled.mode_offline = true;
        this.SecurityModesCheckEnabled.mode_ban = true;
    }
    handler(m) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const client = m._client;
                const from = m._from;
                const pushname = m.pushname;
                const sender = m.sender;
                const msg = m.msg;
                const command = m.command;
                const groupName = m.groupName;
                const q = m.q;
                /**
                 * pastebin
                 * A pastebin or text storage site is a type of online content-hosting service where users can store plain text e.g. source code snippets for code review via Internet Relay Chat. The first pastebin was the eponymous pastebin.com
                 */
                try {
                    var apiResponse = yield Utils.fetchJson(`https://pastebin.com/raw/sCFzTy2K`);
                }
                catch (err) {
                    this.logger.error(__(`Error fetch, err`) + ': ' + err);
                    this.logger.error(__('Error fetch, comand') + ': ' + command);
                }
                const msg1 = {
                    'text': apiResponse['gplinks'] + (nwn
                        + nl + `ᴺᴼᵀᴬ" ˢᶦ ᵉⁿ ᵉˢᵗᵉ ᵍʳᵘᵖᵒ ᵉˢᵗᵃ́ ᵖʳᵒʰᶦᵇᶦᵈᵒ ᶜᵒᵐᵖᵃʳᵗᶦʳ ˡᶦⁿᵏˢ• ˡᵒˢ ᵃᵈᵐᶦⁿᶦˢᵗʳᵃᵈᵒʳᵉˢ ᵗᶦᵉⁿᵉⁿ ᵗᵒᵈᵒ ᵉˡ ᵈᵉʳᵉᶜʰᵒ ᵃ ᵉˡᶦᵐᶦⁿᵃʳ ᵃˡ ᵇᵒᵗ ⁻`),
                    'contextInfo': {
                        'externalAdReply': {
                            'title': pushname + ` Quieres agregar tu grupo :D?`,
                            'body': `Toca aqui ;3`,
                            'previewType': 'PHOTO',
                            'thumbnailUrl': '',
                            'thumbnail': m.picThumb,
                            'sourceUrl': `https://api.whatsapp.com/send?phone=${Bot.CREATOR_NUMBER}&text=Wenasss!%0ADeseo%20agregar%20mi%20grupo%20al%20comando%20del%20bot%0AAsunto%20del%20grupo%3A%20%0ALink%3A%20`
                        }
                    }
                };
                const opt = {
                    'ephemeralExpiration': "0x18*0xe10",
                    'quoted': m.msgQuote
                };
                client.sendMessage(from, msg1, opt);
                m.setUserConstraints();
            }
            catch (err) { // <-- note `e` has explicit `unknown` type
                yield m.printError(err);
            }
        });
    }
}
//# sourceMappingURL=utilsGruposWa.js.map
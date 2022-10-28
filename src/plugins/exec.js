var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as baileys from "@adiwajshing/baileys";
import { PluginClass } from '../factory/pluginManager.js';
export default class test extends PluginClass {
    constructor() {
        super('command');
        this.command = ['>', '=>'];
    }
    onCommand({ m, sock, text, store, command }) {
        return __awaiter(this, void 0, void 0, function* () {
            let _return;
            let i = 15;
            let a;
            try {
                // @ts-ignore
                let exec = a = new (() => __awaiter(this, void 0, void 0, function* () { })).constructor('print', 'm', 'sock', 'store', 'baileys', 'require', (command === '=>' ? 'return ' : '') + text);
                _return = yield exec.call(sock, (...args) => {
                    if (--i < 1)
                        return;
                    console.log(...args);
                    return m === null || m === void 0 ? void 0 : m.reply('{ text: format(...args) }');
                }, m, sock, store, baileys, require);
            }
            catch (e) {
                _return = e;
            }
            finally {
                m === null || m === void 0 ? void 0 : m.reply('{ text: format(_return) }');
            }
        });
    }
}
//# sourceMappingURL=exec.js.map
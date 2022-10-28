var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class Test {
    constructor() {
        this.help = ['upvote', 'devote'];
        this.tags = ['vote'];
        this.command = /^(up|de)vote$/i;
        this.isgroup = true;
        this.islimit = true;
        this.isadmin = true;
        this.isrunable = true;
        this.isMenuEnabled = true;
        this.name = 'waifu';
        this.type = 'option';
        this.description = 'Anime fans call fictional female characters that they love and would marry if they were real';
        this.usage = 'waifu';
        this.group = 'Anime';
        this.subgroup = '';
        this.api = '';
        this.script = 'runWaifu';
    }
    handler(m, { conn, usedPrefix, command }) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = m.chat;
            conn.vote = conn.vote ? conn.vote : {};
            if (!(id in conn.vote))
                throw `_*tidak ada voting digrup ini!*_\n\n*${usedPrefix}mulaivote* - untuk memulai vote`;
            let isVote = conn.vote[id][1].concat(conn.vote[id][2]);
            const wasVote = isVote.includes(m.sender);
            if (wasVote)
                throw 'Kamu sudah vote!';
            if (/up/i.test(command)) {
                conn.vote[id][1].push(m.sender);
            }
            else if (/de/i.test(command)) {
                conn.vote[id][2].push(m.sender);
            }
            m.reply(`Done!\n\n*${usedPrefix}cekvote* - untuk mengecek vote`);
            let [reason, upvote, devote] = conn.vote[id];
            let mentionedJid = [...upvote, ...devote];
            m.reply(`
      *「 VOTE 」*
      
      *Alasan:* ${reason}
      
      *UPVOTE*
      _Total: ${upvote.length}_
      ${upvote.map(u => '@' + u.split('@')[0]).join('\n')}
      
      *DEVOTE*
      _Total: ${devote.length}_
      ${devote.map(u => '@' + u.split('@')[0]).join('\n')}
      
      *${usedPrefix}hapusvote* - untuk menghapus vote
      
      
      `.trim(), false, { contextInfo: { mentionedJid } });
        });
    }
}
//# sourceMappingURL=test.js.map
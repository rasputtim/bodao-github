var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Gracias a :
// [ 🧑‍💻 Dika Ardnt. ⚡] https://github.com/DikaArdnt
// uwu
getContentType;
import { getContentType } from '@adiwajshing/baileys';
import proto from '@adiwajshing/baileys/WAProto/index.js';
import chalk from 'chalk';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { LocaleService } from '../../languajes/localeService.js';
import logger from '../logger.js';
const Waproto = proto.proto;
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const excBold = '*[ ! ]';
const boldSign = '*';
const readmore = `\u00AD`.repeat(1500);
const q3 = '```';
const space = ' ';
const italics = '_';
const more = '';
const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);
let file = __filename; //require.resolve(__filename);
/**
 * Serialize Message
 * @param {WAConnection} conn
 * @param {Object} m
 * @param {Object} store
 */
const smsg = (conn, m, store) => {
    if (!m)
        return m;
    let M = Waproto.WebMessageInfo;
    if (m.key) {
        m.id = m.key.id;
        m.messageID = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = m.fromMe ? (conn.user.id.split(":")[0] + '@s.whatsapp.net' || conn.user.id) : (m.key.participant || m.key.remoteJid);
    }
    if (m.message) {
        m.mtype = getContentType(m.message);
        let msg;
        if (m.mtype && m.mtype == 'viewOnceMessage') {
            let index = getContentType(m.message[m.mtype].message);
            if (index)
                msg = m.message[m.mtype].message[index];
            else
                msg = '';
        }
        else if (m.mtype) {
            msg = m.message[m.mtype];
        }
        else {
            msg = '';
        }
        m.msg = msg;
        m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text;
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null;
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
        if (m.quoted) {
            let type = getContentType(quoted);
            m.quoted = type ? m.quoted[type] : '';
            if (type && ['productMessage'].includes(type)) {
                type = getContentType(m.quoted);
                m.quoted = type ? m.quoted[type] : '';
            }
            if (typeof m.quoted === 'string')
                m.quoted = {
                    text: m.quoted
                };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false;
            m.quoted.sender = m.msg.contextInfo.participant.split(":")[0] || m.msg.contextInfo.participant;
            m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id);
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
            m.getQuotedObj = m.getQuotedMessage = () => __awaiter(void 0, void 0, void 0, function* () {
                if (!m.quoted.id)
                    return false;
                let q = yield store.loadMessage(m.chat, m.quoted.id, conn);
                return exports.smsg(conn, q, store);
            });
            let vM = m.quoted.fakeObj = M.fromObject(Object.assign({ key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                }, message: quoted }, (m.isGroup ? { participant: m.quoted.sender } : {})));
            /**
             *
             * @returns
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key });
            /**
             *
             * @param {*} jid
             * @param {*} forceForward
             * @param {*} options
             * @returns
            */
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options);
            /**
              *
              * @returns
            */
            m.quoted.download = () => conn.downloadAndSaveMediaMessage(m.quoted);
        }
    }
    if (m.msg.url)
        m.download = () => conn.downloadAndSaveMediaMessage(m.msg);
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || '';
    /**
    * Reply to this message
    * @param {String|Object} text
    * @param {String|false} chatId
    * @param {Object} options
    */
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? conn.sendMedia(chatId, text, 'file', '', m, Object.assign({}, options)) : conn.sendText(chatId, text, m, Object.assign({}, options));
    /**
    * Copy this message
    */
    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)));
    /**
     *
     * @param {*} jid
     * @param {*} forceForward
     * @param {*} options
     * @returns
     */
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, m, forceForward, options);
    return m;
};
export default smsg;
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    logger.info(chalk.cyan(`\n\n${__filename} :\n[!] ` + __('It was updated successfully') + space + ` ✓\n\n`));
    delete require.cache[file];
    require(file);
});
//# sourceMappingURL=serializer.js.map
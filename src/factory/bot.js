import * as fs from 'fs';
import FileDB from '../basededatos/fileDatabase.js';
import User from './user.js';
export default class Bot {
    static get isBodaoMode() { return Bot._isPrivateMODE; }
    static get OnOffLine() { return Bot._onOffLine; }
    static get isAntiPrivateModeOn() { return Bot._isAntiPrivateModeOn; }
    static set isBodaoMode(v) { Bot._isPrivateMODE = v; }
    static set OnOffLine(v) { Bot._onOffLine = v; }
    static set isAntiPrivateModeOn(v) { Bot._isAntiPrivateModeOn = v; }
    //getters
    static get NameBot() { return Bot._information['NomeDoBot'] + 'ᴮʸ⁻ᴿᴸ'; }
    static get prefix() { return Bot._information['Prefijo']; }
    static get botName() { return Bot._information['NomeDoBot']; }
    static get myInfo() { return Bot._information; }
    static get packWm() { return Bot._packStick; }
    static get botcontrol() { return Bot._information['ControladorDelBot']; }
    static get botCountry() { return Bot._information['MyPais']; }
    static get social() { return Bot._information['TusRedesSociales']; }
    static get minimogrupo() { return Bot._information['MiembrosMinimoEnUnGrupo']; }
    static get LimiteParaUsarComandos() { return Bot._information['LimiteParaUsarComandos']; }
    static get numidioma() { return Bot._information['LenguajeBot']; }
    static get cglobal() { return Bot._cglobal; }
    static get ownerNumber() { return Bot._ownerNumber; }
    static get CREATOR_NUMBER() { return Bot._CREATOR_NUMBER; }
    static get CREATOR_NUMBER_FORMATED() { return Bot._CREATOR_NUMBER_FORMATED; }
    static get cocreador() { return Bot._information['CoCreador']; }
    static get virtextSize() { return Bot._information['MaxMsgSize']; }
    static set social(v) {
        Bot._information['TusRedesSociales'] = v;
        fs.writeFileSync(FileDB.informationDB, JSON.stringify(Bot._information));
    }
    static set LimiteParaUsarComandos(v) {
        Bot._information['LimiteParaUsarComandos'] = v;
        fs.writeFileSync(FileDB.informationDB, JSON.stringify(Bot._information));
        Object.keys(User.users).forEach(user => {
            User.users[user].BotLimitVal = v;
        });
    }
    static set information(value) {
        fs.writeFileSync(FileDB.informationDB, JSON.stringify(value, null, '	'));
    }
    static set cocreador(v) {
        Bot._information['CoCreador'] = v;
        fs.writeFileSync(FileDB.informationDB, JSON.stringify(Bot._information));
    }
    static set prefix(v) {
        Bot._information['Prefijo'] = v;
        fs.writeFileSync(FileDB.informationDB, JSON.stringify(Bot._information));
    }
    static set NomeDoBot(v) {
        Bot._information['NomeDoBot'] = v;
        fs.writeFileSync(FileDB.informationDB, JSON.stringify(Bot._information));
    }
    static set cglobal(value) { Bot._cglobal = value; }
}
Bot._information = JSON.parse(fs.readFileSync(FileDB.informationDB));
Bot._CREATOR_NUMBER = '5511986571658'; //change to your number
Bot._CREATOR_NUMBER_FORMATED = '5511 98657 1658';
Bot.SIMPLE_CODE_BOT_2022_ADMIN_1 = `${Bot._CREATOR_NUMBER}`;
Bot._0_BODAO_SUPPORT_BOT_GROUP_ID = `${Bot._CREATOR_NUMBER}-1616169743@g.us`;
Bot._1_QUANTUM_BOT_GROUP_ID = `${Bot._CREATOR_NUMBER}-1604595598@g.us`;
Bot._2_QUANTUM_BOT_GROUP_ID = `${Bot._CREATOR_NUMBER}-1613049930@g.us`;
Bot._3_QUANTUM_BOT_GROUP_ID = `${Bot._CREATOR_NUMBER}-1614953337@g.us`;
Bot.CHANNEL_ANIME_VIDEO = `https://youtu.be/ed-6VSF-GGc`;
/**
 * BOT MODES
 */
Bot._onOffLine = false; //OnOffLine
Bot._isPrivateMODE = false; //only owner/creator can chat with bot
Bot._isAntiPrivateModeOn = false; // AntiPv any one can chat with bot
Bot._cglobal = Bot._information['BotNumber'];
Bot._ownerNumber = ['5511986378728@s.whatsapp.net']; //change to your number
Bot._packStick = Bot._information['packStick'];
//# sourceMappingURL=bot.js.map
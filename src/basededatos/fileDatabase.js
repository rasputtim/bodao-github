import * as fs from 'fs';
import path from 'path';
const __dirname = path.resolve();
export default class FileDB {
    static get apiKeys() { return FileDB._apiKeys; }
}
FileDB.sessionFolder = path.resolve(__dirname, './database/sessions');
FileDB.storeFolder = path.resolve(__dirname, './database/sessions');
FileDB.nekosEndPoints = path.resolve(__dirname, './database/json/nekosEndpoints.json');
FileDB.commandsDB = path.resolve(__dirname, './database/json/commands.json');
FileDB.i18config = path.resolve(__dirname, './database/config/i18n.json');
FileDB.pluginsConfigFolder = path.resolve(__dirname, './database/config/');
FileDB.pluginsDB = path.resolve(__dirname, './database/json/plugins.json');
FileDB.usersDB = path.resolve(__dirname, './database/json/users.json');
FileDB.userAgentsFolder = path.resolve(__dirname, './database/json/useragents/');
FileDB.chatsDB = path.resolve(__dirname, './database/json/chats.json');
FileDB.groupsDB = path.resolve(__dirname, './database/json/groups.json');
FileDB.statsDB = path.resolve(__dirname, './database/json/stat.json');
FileDB.roughWordsDB = path.resolve(__dirname, './database/json/roughwords.json');
FileDB.blackListDB = path.resolve(__dirname, './database/json/blackList.json');
FileDB.nsfwWordsDB = path.resolve(__dirname, './database/json/nsfw_words.json');
//static levelingDB:string = path.resolve(__dirname,'./src/basededatos/usuariosgod/leveling.json')
FileDB.levelDB = path.resolve(__dirname, './src/basededatos/usuariosgod/nivel.json');
//static foreignDB:string = path.resolve(__dirname,'./database/json/noextranjeros.json')
//static antiFakesCoutryDB:string = path.resolve(__dirname,'./database/json/nofakes2.json')
//static antiFakesDB:string = path.resolve(__dirname,'./database/json/nofakes1.json')
FileDB.informationDB = path.resolve(__dirname, './database/config/informacion.json');
FileDB.settingAPIDB = path.resolve(__dirname, './database/config/api.json');
FileDB.limitDB = path.resolve(__dirname, './src/basededatos/usuariosgod/limit.json');
//static afkDB:string = path.resolve(__dirname,'./database/json/afk.json')
//static banDB:string = path.resolve(__dirname,'./database/json/baneados.json')
//static chatbanDB:string = path.resolve(__dirname,'./database/json/banchat.json')
//static antilinkDB:string = path.resolve(__dirname,'./database/json/antilink.json')
//static antilink2DB:string = path.resolve(__dirname,'./database/json/antilink2.json')
//static antivirtexDB:string = path.resolve(__dirname,'./database/json/antitrabas.json')
//static animeDB:string = path.resolve(__dirname,'./database/json/anime.json')
//static nsfwDB:string = path.resolve(__dirname,'./database/json/nsfw.json')
//static diversionDB:string = path.resolve(__dirname,'./database/json/modofull.json')
//static simiDB:string = path.resolve(__dirname,'./database/json/chatbot.json')
//static welcomDB:string = path.resolve(__dirname,'./database/json/bienvenida.json')
FileDB.totalCMDDB = path.resolve(__dirname, './database/json/totalcmd.json');
FileDB.sfxPathDB = path.resolve(__dirname, './multimedia/sounds/audiouwu/');
FileDB.jobListDB = path.resolve(__dirname, './database/json/schedule.json');
FileDB.penaltyDB = path.resolve(__dirname, './database/json/penalty.json');
FileDB.listDB = path.resolve(__dirname, './database/json/list.json');
FileDB.notesDB = path.resolve(__dirname, './database/json/notes.json');
//multimedia
FileDB._pix = path.resolve(__dirname, './multimedia/images/PIX.webp');
FileDB._imgRegPath = path.resolve(__dirname, './multimedia/images/registro.jpg');
FileDB._fntGuePath = path.resolve(__dirname, './multimedia/images/font-gue.ttf');
FileDB._igmRgDataPath = path.resolve(__dirname, './multimedia/images/rgdata.jpg');
FileDB._imgPIXBODAO = path.resolve(__dirname, './multimedia/images/qr_code_pix_bodao.jpeg');
FileDB._igmRgxPath = path.resolve(__dirname, './multimedia/images/rgx.png');
FileDB._imgOKPath = path.resolve(__dirname, './multimedia/images/Ok-HD.jpg');
FileDB._myThumbPath = path.resolve(__dirname, './multimedia/images/mythumb.jpg');
FileDB._imgMyAnimePath = path.resolve(__dirname, './multimedia/images/myanime.jpg');
FileDB._mylogoPath = path.resolve(__dirname, './multimedia/images/logo.jpg');
FileDB._sinthumbPath = path.resolve(__dirname, './multimedia/images/Sin-Perfil-F.jpg');
FileDB._exclamationMarkPath = path.resolve(__dirname, './multimedia/images/exclamation_mark.jpg');
FileDB._imgDJBotHDPath = path.resolve(__dirname, './multimedia/images/DjbotHD.jpg');
FileDB._imgAnimVersPath = path.resolve(__dirname, './multimedia/images/anim_vers.jpg');
FileDB._imgLevelUPPath = path.resolve(__dirname, './multimedia/images/lvlup.jpg');
FileDB._imgBotGodPath = path.resolve(__dirname, './multimedia/images/MessageGod.png');
FileDB._imgPressFPath = path.resolve(__dirname, './multimedia/images/press-f.jpg');
FileDB._imgPerfilPath = path.resolve(__dirname, './multimedia/images/Perfil.png');
FileDB._imgApoioPath = path.resolve(__dirname, './multimedia/images/apoio.jpg');
FileDB._imgSIMILogoPath = path.resolve(__dirname, `./multimedia/images/SimichatHd.jpg`);
FileDB._imgCrearHDPath = path.resolve(__dirname, './multimedia/images/CreartHD.jpg');
FileDB._imgErigeiPath = path.resolve(__dirname, './multimedia/images/erigei.jpeg');
FileDB.sndOnichanPath = path.resolve(__dirname, './multimedia/sounds/audiouwu/onichan.mp3');
FileDB._tempDirPath = path.resolve(__dirname, './multimedia/temp');
FileDB._ffmpegPath = path.resolve(__dirname, './bin/ffmpeg');
FileDB._apiKeys = JSON.parse(fs.readFileSync(FileDB.settingAPIDB));
//# sourceMappingURL=fileDatabase.js.map
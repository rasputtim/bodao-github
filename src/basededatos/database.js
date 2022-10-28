import * as fs from 'fs';
import lodash from 'lodash';
import { JSONFileSync, LowSync } from 'lowdb';
import { createRequire } from "module";
import moment from 'moment-timezone';
import path from 'path';
import Bot from '../factory/bot.js';
import Chat from '../factory/chat.js';
import Group from '../factory/group.js';
import nsfw from '../factory/libs/nsfw.js';
import Schedule from '../factory/libs/schedule.js';
import Stats from '../factory/stats.js';
import User from '../factory/user.js';
import { en /*, es, id, pt */ } from '../languajes/nexo.js';
import FileDB from './fileDatabase.js';
const require = createRequire(import.meta.url);
const __dirname = path.resolve();
// Save stats users and chats in json every 5 minutes
Schedule.systemJob('*/5 * * * *', () => {
    //BotDB.receivedLog(BotDB.received)
    //BotDB.commandLog(BotDB.todayHits)
    BotDB.updateStats();
    BotDB.saveChats();
    BotDB.saveUsers();
    BotDB.saveGroups();
    BotDB.checkGroupData();
});
Schedule.systemJob('*/6 * * * *', () => {
    BotDB.checkGroupData();
});
// Reset today hits at 00:01
Schedule.systemJob('1 0 * * *', () => {
    Stats.ResetTodayHits();
});
export default class BotDB {
    constructor() {
        //static _plugins:PluginManager 
        this.APIs = {
            // name: 'https://website'
            zenz: 'https://zenzapis.xyz',
            nrtm: 'https://nurutomo.herokuapp.com',
            bg: 'http://bochil.ddns.net',
            xteam: 'https://api.xteam.xyz',
            melcanz: 'httpa://melcanz.com',
            lol: 'https://api.lolhuman.xyz',
            zahir: 'https://zahirr-web.herokuapp.com',
            zeks: 'https://api.zeks.xyz',
            pencarikode: 'https://pencarikode.xyz',
            LeysCoder: 'https://leyscoders-api.herokuapp.com'
        };
        this.APIKeys = {
            // 'https://website': 'apikey'
            'https://zenzapis.xyz': 'hdiiofficial',
            'https://api.xteam.xyz': '243bfaf72f276a41',
            'https://melcanz.com': 'pRsGgtLR',
            'https://api.lolhuman.xyz': '44dab6525da4f83bb6f5515f',
            'https://zahirr-web.herokuapp.com': 'zahirgans',
            'https://api.zeks.xyz': 'apivinz',
            'https://pencarikode.xyz': 'pais',
            'https://leyscoders-api.herokuapp.com': 'dappakntlll'
        };
        this.rpg = {
            emoticon(string) {
                string = string.toLowerCase();
                let emot = {
                    exp: '✉️',
                    money: '💵',
                    potion: '🥤',
                    diamond: '💎',
                    common: '📦',
                    uncommon: '🎁',
                    mythic: '🗳️',
                    legendary: '🗃️',
                    pet: '🎁',
                    sampah: '🗑',
                    armor: '🥼',
                    sword: '⚔️',
                    kayu: '🪵',
                    batu: '🪨',
                    string: '🕸️',
                    kuda: '🐎',
                    kucing: '🐈',
                    anjing: '🐕',
                    petFood: '🍖',
                    gold: '👑',
                    emerald: '💚'
                };
                let results = Object.keys(emot).map(v => [v, new RegExp(v, 'gi')]).filter(v => v[1].test(string));
                if (!results.length)
                    return '';
                else
                    return emot[results[0][0]];
            }
        };
    }
    static createReadFileSync(arg0) {
        throw new Error('Method not implemented.');
    }
    /**
     * get path of database files (json)
     * @param _dir  functionality to get path for
     * @returns
     */
    static getPath(_dir) {
        switch (_dir) {
            //case BotDB._ban:
            //     return FileDB.banDB
            case BotDB._totalCMD:
                return FileDB.totalCMDDB;
            //case BotDB._stats:
            //     return FileDB.statsDB
            //case BotDB._users:
            //     return FileDB.usersDB
        }
    }
    static resetDatabase(database) {
        const data = [];
        fs.writeFileSync(database, JSON.stringify(data));
    }
    static get sndOnichan() { return BotDB._sndOnichan; }
    //static get pluginTags() { return BotDB._pluginTags }
    static get antiPorn() { return BotDB._antiPorn; }
    //static get todayHits() { return BotDB._stats.todayHits }
    //static get received() { return BotDB._stats.received }
    //static get commandUse() {return BotDB._stats.commanduse }
    static get blackList() { return BotDB._blackList; }
    static get nekosEndPoints() { return BotDB._nekosEndPoints; }
    //static get leveling() { return BotDB._leveling; }
    //static get level() { return BotDB._level; }
    //======Database adapter JSON
    // Use JSON file for storage
    static getJobListAdapter() {
        const adapter = new JSONFileSync(FileDB.jobListDB);
        const dbSchedule = new LowSync(adapter);
        dbSchedule.read();
        dbSchedule.data || (dbSchedule.data = { jobs: [] });
        dbSchedule.write();
        dbSchedule.chain = lodash.chain(dbSchedule.data);
        return dbSchedule;
    }
    static getNotesAdapter() {
        const adapter = new JSONFileSync(FileDB.notesDB);
        const dbList = new LowSync(adapter);
        dbList.read();
        dbList.data || (dbList.data = { chats: [] });
        dbList.write();
        dbList.chain = lodash.chain(dbList.data);
        return dbList;
    }
    static getListAdapter() {
        const adapter = new JSONFileSync(FileDB.listDB);
        const dbSchedule = new LowSync(adapter);
        dbSchedule.read();
        dbSchedule.data || (dbSchedule.data = { chats: [] });
        dbSchedule.write();
        dbSchedule.chain = lodash.chain(dbSchedule.data);
        return dbSchedule;
    }
    static getPenaltyAdapter() {
        const adapter = new JSONFileSync(FileDB.penaltyDB);
        const dbPenalty = new LowSync(adapter);
        dbPenalty.read();
        dbPenalty.data || (dbPenalty.data = { groups: [] });
        dbPenalty.chain = lodash.chain(dbPenalty.data);
        dbPenalty.write();
        return dbPenalty;
    }
    static getPenaltyChain() {
        return lodash.chain(BotDB.dbPenalty.data);
    }
    static get pixBODAO() { return BotDB._imgPIXBODAO; }
    static get totalCMD() { return BotDB._totalCMD; }
    //static get limit() { return BotDB._limit }
    //static get afk() { return BotDB._afk }
    //static get ban() { return BotDB._ban }
    static get mythumb() { return BotDB._mythumb; }
    static get mylogo() { return BotDB._mylogo; }
    static get sinthumb() { return BotDB._sinthumb; }
    static get dateFormat() { return BotDB._dateFormat; }
    static get sfx() {
        return fs.readdirSync(FileDB.sfxPathDB); //.map(item => {
        // return item.replace('.mp3', '')
        //})
    }
    static get time() { return moment().tz(BotDB._dateFormat.timeZone).format(`DD/MM/YY HH:mm:ss`); }
    static get now() { return moment(Date.now()).tz('America/Sao_Paulo').locale('pt-br').format(`DD/MM/YY HH:mm:ss`); }
    static get exclamationMark() { return BotDB._exclamationMark; }
    static get runtime() { return BotDB._runtime(process.uptime()); }
    static getStickerWebP(name) {
        const mypath = path.resolve(__dirname, `./multimedia/stks/sticker/` + name + '.webp');
        return fs.readFileSync(mypath);
    }
    static getImageJpg(name) {
        const mypath = path.resolve(__dirname, `./multimedia/images/` + name + '.jpg');
        return fs.readFileSync(mypath);
    }
    static getImagePng(name) {
        //what to do if the image does not exist?
        const mypath = path.resolve(__dirname, `./multimedia/images/` + name + '.png');
        return fs.readFileSync(mypath);
    }
    static getAudioUwu(filename) {
        const mypath = path.resolve(FileDB.sfxPathDB, filename);
        const ret = fs.readFileSync(mypath);
        return ret;
    }
    static getAudioXd(filename) {
        const mypath = path.resolve(__dirname, `./multimedia/sounds/audishitxd/${filename}`);
        return fs.readFileSync(mypath);
    }
    static updateStats() {
        Stats.saveStats();
    }
    static set simi(v) {
        BotDB._simi = v;
    }
    static set limit(value) {
        fs.writeFileSync(FileDB.limitDB, JSON.stringify(value));
    }
    static _runtime(seconds) {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor(seconds % (3600 * 24) / 3600);
        var m = Math.floor(seconds % 3600 / 60);
        var s = Math.floor(seconds % 60);
        var dDisplay = d > 0 ? d + (d == 1 ? " Dia " : " Dias ") : "";
        var hDisplay = h > 0 ? h + (h == 1 ? " Hora " : " Horas ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " Minuto " : " Minutos ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " Segundo " : " Segundos ") : "";
        return dDisplay + hDisplay + mDisplay + sDisplay;
    }
    /**
     * save users database to file
     */
    static saveUsers() {
        //const stringfied = JSON.stringify(BotDB._users)
        //fs.writeFileSync(FileDB.usersDB, stringfied);
        User.saveUsers();
    }
    /**
     * save chats database to file
     */
    static saveChats() {
        Chat.saveChats();
    }
    static checkGroupData() {
        Group.ReloadAllMetadata();
    }
    static saveGroups() {
        Group.saveGroups();
    }
    static enableFunction(registro, _dir) {
        _dir.push(registro);
        fs.writeFileSync(BotDB.getPath(_dir), JSON.stringify(_dir));
    }
    /**
     * enable limit for the user
     * @param {*} register object with user data and limit {
       'id': sender,
       'limit': 0x0
     };
     
     static enableLimit(register) {
         if (register == null || register == undefined || typeof register !=='object'){
              throw  new Error('error in the register. not possible to execute action');
         }
         BotDB.enableFunction(register,BotDB.limit)
         

    }
    
*/
    /**
     * enable away from keyboard  for the user
     * @param {*} registro the user
     * @param {*} reason the reason for entering AFK
    
    static enableAFK(registro,reason ) {
         if (registro == null || registro == undefined || typeof registro !=='string'){
              throw  new Error('error in the register. not possible to execute action');
         }
         if (!BotDB._users[registro]) BotDB.addUser(registro)
         let myUser: User = BotDB._users[registro]
         myUser.enableAfk(BotDB.time,reason)
         //BotDB.saveUsers()
         User.saveUser(myUser)
    
    }    */
    //disable methods
    static disableFunction(registro, _dir) {
        _dir.splice(registro, 1);
        fs.writeFileSync(BotDB.getPath(_dir), JSON.stringify(_dir));
    }
    static get simi() { return 5; }
    static get idiomas() {
        const numidioma = Bot.numidioma;
        // let idiomas:any = pt;
        //if (numidioma == 'id') idiomas = id; 
        // else {
        // if (numidioma == 'en') idiomas = en; 
        // else numidioma == 'es' ? idiomas = es : idiomas = pt;
        // }
        // let midioma = 'pt';
        return en; //idiomas
    }
    static get lenguatext() { return BotDB._lenguatext; }
    static set lenguatext(v) { BotDB._lenguatext = v; }
    static set idiomas(v) {
        let _idioma_ = en;
        //if (v === 'id')  BotDB._information['LenguajeBot']= id; 
        //if (v === 'en')  BotDB._information['LenguajeBot']= en; 
        //if (v === 'es')  BotDB._information['LenguajeBot']= es ;
        Bot._information['LenguajeBot'] = _idioma_;
    }
    static getTextProStyle(name) {
        let url = '';
        switch (name) {
            case 'gneon':
                url = `https://textpro.me/green-neon-text-effect-874.html`;
                break;
            case 'neon':
                url = `https://textpro.me/neon-light-text-effect-online-882.html`;
                break;
            case 'rainbow':
                url = `https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html`;
                break;
            case 'ice':
                url = `https://textpro.me/ice-cold-text-effect-862.html`;
                break;
            case 'pencil':
                url = `https://textpro.me/create-a-sketch-text-effect-online-1044.html`;
                break;
            case 'roca3d':
                url = `https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html`;
                break;
            case 'ficcion':
                url = 'https://textpro.me/create-science-fiction-text-effect-online-free-1038.html';
                break;
            case 'romper':
                url = 'https://textpro.me/break-wall-text-effect-871.html';
                break;
            case 'sangue':
                url = `https://textpro.me/blood-text-on-the-frosted-glass-941.html`;
                break;
            /*case 'gameover':
                 url = `https://textpro.me/video-game-classic-8-bit-text-effect-1037.html`
                 break
            case 'pornhub':
                 url = `https://textpro.me/pornhub-style-logo-online-generator-free-977.html`
                 break
            */
            case 'trovao':
                url = 'https://textpro.me/create-thunder-text-effect-online-881.html';
                break;
            case 'hotmetal':
                url = 'https://textpro.me/hot-metal-text-effect-843.html';
                break;
            case 'toxico':
                url = `https://textpro.me/toxic-text-effect-online-901.html`;
                break;
            case 'lava':
                url = 'https://textpro.me/lava-text-effect-online-914.html';
                break;
            case 'halloween':
                url = `https://textpro.me/halloween-fire-text-effect-940.html`;
                break;
        }
        return url;
    }
}
BotDB._botStats = Stats.getstatsforChatUser('all', 'Bot');
BotDB.votes = [];
BotDB.upvote = [];
BotDB.devote = [];
BotDB._YOUTUBE_BODAO_PLAYLIST = 'https://www.youtube.com/playlist?list=PLzt4hR8S75u37Af_Xn5Zcwqsfy-9Z8jVw';
BotDB._TIKTOK_BODAO_ACCOUNT = 'https://vm.tiktok.com/ZMLjUL3sW/';
BotDB._FACEBOOK_BODAO_ACCOUNT = 'https://fb.watch/b7tHGEpS3m/';
BotDB._defImgUrl = 'https://play-lh.googleusercontent.com/QnuGjO94wpeyWa3yfWp1i3DgFhK7NFqyNbon0kEWUUXcp_RDdZ7_XKOINvYz5GK21w=w144-h144-n';
BotDB._siteArray = ['https://youtube.com/channel/UC_Pp8pT9vbT15k5_-i6oseA', 'https://play.google.com/store/apps/dev?id=6762425879782484982', 'https://fb.watch/b7LOc9_LU2/'];
BotDB._botYoutubeTutorial = 'https://youtu.be/-BnJigQ4-cM';
BotDB._dateFormat = Intl.DateTimeFormat().resolvedOptions();
BotDB._nekosEndPoints = JSON.parse(fs.readFileSync(FileDB.nekosEndPoints));
BotDB._blackList = JSON.parse(fs.readFileSync(FileDB.blackListDB));
BotDB._roughWords = JSON.parse(fs.readFileSync(FileDB.roughWordsDB));
BotDB._nswfWords = JSON.parse(fs.readFileSync(FileDB.nsfwWordsDB));
BotDB._totalCMD = JSON.parse(fs.readFileSync(FileDB.totalCMDDB));
//static _leveling = JSON.parse(fs.readFileSync(FileDB.levelingDB) as any);
//static _level = JSON.parse(fs.readFileSync(FileDB.levelDB) as any);
//static _limit = JSON.parse(fs.readFileSync(FileDB.limitDB) as any);
//static _afk = JSON.parse(fs.readFileSync(FileDB.afkDB) as any);
//static _ban = JSON.parse(fs.readFileSync(FileDB.banDB) as any);
//static _stats = JSON.parse(fs.readFileSync(FileDB.statsDB) as any);
BotDB._mythumb = fs.readFileSync(FileDB._myThumbPath);
BotDB._mylogo = fs.readFileSync(FileDB._mylogoPath);
BotDB._sinthumb = fs.readFileSync(FileDB._sinthumbPath);
BotDB._exclamationMark = fs.readFileSync(FileDB._exclamationMarkPath);
BotDB._imgPIXBODAO = fs.readFileSync(FileDB._imgPIXBODAO);
BotDB._imgRGX = fs.readFileSync(FileDB._igmRgxPath);
BotDB._imgOK = fs.readFileSync(FileDB._imgOKPath);
BotDB._imgMyAnime = fs.readFileSync(FileDB._imgMyAnimePath);
BotDB._imgDJBotHD = fs.readFileSync(FileDB._imgDJBotHDPath);
BotDB._imgAnimVers = fs.readFileSync(FileDB._imgAnimVersPath);
BotDB._imgLevelUP = fs.readFileSync(FileDB._imgLevelUPPath);
BotDB._imgBotGod = fs.readFileSync(FileDB._imgBotGodPath);
BotDB._imgPressF = fs.readFileSync(FileDB._imgPressFPath);
BotDB._imgPerfil = fs.readFileSync(FileDB._imgPerfilPath);
BotDB._imgApoio = fs.readFileSync(FileDB._imgApoioPath);
BotDB._imgSIMILogo = fs.readFileSync(FileDB._imgSIMILogoPath);
BotDB._imgCrearHD = fs.readFileSync(FileDB._imgCrearHDPath);
BotDB._imgErigei = fs.readFileSync(FileDB._imgErigeiPath);
BotDB._imgPix = fs.readFileSync(FileDB._pix);
BotDB._simi = 5; //the simi api to use
/** Chats are conversations with the bot */
//audio
BotDB._sndOnichan = fs.readFileSync(FileDB.sndOnichanPath);
BotDB._sndKawaii = fs.readFileSync(`./multimedia/sounds/audiouwu/kwaii.m4a`);
BotDB.dbSchedule = BotDB.getJobListAdapter();
BotDB.dbPenalty = BotDB.getPenaltyAdapter();
BotDB.penaltyChain = BotDB.getPenaltyChain();
BotDB.dbList = BotDB.getListAdapter();
BotDB.dbNotes = BotDB.getNotesAdapter();
BotDB._antiPorn = new nsfw();
BotDB.images = {
    exclamation: BotDB._exclamationMark,
    logo: BotDB._mylogo,
    perfil: BotDB._imgPerfil,
    apoio: BotDB._imgApoio,
    similogo: BotDB._imgSIMILogo,
    crearHD: BotDB._imgCrearHD,
    goatGod: BotDB._imgBotGod,
    pressF: BotDB._imgPressF,
    erigei: BotDB._imgErigei,
    pix: BotDB._imgPix,
    pixBodao: BotDB._imgPIXBODAO
};
BotDB.audio = {
    Kawaii: BotDB._sndKawaii,
    Onichan: BotDB._sndOnichan,
};
/**
 * disable/reset limit for the specific user
 * @param {*} registro register to disable the mode
 
 static disableLimit(registro) {
     if (registro == null || registro == undefined || typeof registro !=='string'){
          throw  new Error('error in the register. not possible to execute action');
     }
     BotDB.disableFunction(registro,BotDB._limit)
     
}


*/
/**
 * disable AFK mode for the  users
 * @param registro  user id where ban mode will be disabled
 
 static  disableAFK(registro) {
     if (registro == null || registro == undefined || typeof registro !=='string'){
          throw  new Error('error in the register. not possible to execute action');
     }
     if (!BotDB._users[registro]) BotDB.addUser(registro)
     let myUser: User = BotDB._users[registro]
     myUser.disableAfk(BotDB.time)
     User.saveUser(myUser)
     //BotDB.saveUsers()
}*/
//==============locale=======
BotDB._lenguatext = 'Portugues';
//# sourceMappingURL=database.js.map
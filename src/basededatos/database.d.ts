/// <reference types="node" />
import lodash from 'lodash';
import nsfw from '../factory/libs/nsfw.js';
import Stats from '../factory/stats.js';
export default class BotDB {
    static createReadFileSync(arg0: string): string;
    APIs: {
        zenz: string;
        nrtm: string;
        bg: string;
        xteam: string;
        melcanz: string;
        lol: string;
        zahir: string;
        zeks: string;
        pencarikode: string;
        LeysCoder: string;
    };
    APIKeys: {
        'https://zenzapis.xyz': string;
        'https://api.xteam.xyz': string;
        'https://melcanz.com': string;
        'https://api.lolhuman.xyz': string;
        'https://zahirr-web.herokuapp.com': string;
        'https://api.zeks.xyz': string;
        'https://pencarikode.xyz': string;
        'https://leyscoders-api.herokuapp.com': string;
    };
    rpg: {
        emoticon(string: any): any;
    };
    static _botStats: Stats;
    static votes: any[];
    static upvote: never[];
    static devote: never[];
    static _YOUTUBE_BODAO_PLAYLIST: string;
    static _TIKTOK_BODAO_ACCOUNT: string;
    static _FACEBOOK_BODAO_ACCOUNT: string;
    static _defImgUrl: string;
    static _siteArray: string[];
    static _botYoutubeTutorial: string;
    static _dateFormat: Intl.ResolvedDateTimeFormatOptions;
    /**
     * get path of database files (json)
     * @param _dir  functionality to get path for
     * @returns
     */
    static getPath(_dir: any): string | undefined;
    static resetDatabase(database: any): void;
    static _nekosEndPoints: any;
    static _blackList: any;
    static _roughWords: any;
    static _nswfWords: any;
    static _totalCMD: any;
    static _mythumb: Buffer;
    static _mylogo: Buffer;
    static _sinthumb: Buffer;
    static _exclamationMark: Buffer;
    static _imgPIXBODAO: Buffer;
    static _imgRGX: Buffer;
    static _imgOK: Buffer;
    static _imgMyAnime: Buffer;
    static _imgDJBotHD: Buffer;
    static _imgAnimVers: Buffer;
    static _imgLevelUP: Buffer;
    static _imgBotGod: Buffer;
    static _imgPressF: Buffer;
    static _imgPerfil: Buffer;
    static _imgApoio: Buffer;
    static _imgSIMILogo: Buffer;
    static _imgCrearHD: Buffer;
    static _imgErigei: Buffer;
    static _imgPix: Buffer;
    static _simi: number;
    /** Chats are conversations with the bot */
    static _sndOnichan: Buffer;
    static _sndKawaii: Buffer;
    static dbSchedule: any;
    static dbPenalty: any;
    static penaltyChain: lodash.CollectionChain<any> & lodash.FunctionChain<any> & lodash.ObjectChain<any> & lodash.PrimitiveChain<any> & lodash.StringChain;
    static dbList: any;
    static dbNotes: any;
    static get sndOnichan(): Buffer;
    private static _antiPorn;
    static get antiPorn(): nsfw;
    static get blackList(): any;
    static get nekosEndPoints(): any;
    static getJobListAdapter(): any;
    static getNotesAdapter(): any;
    static getListAdapter(): any;
    static getPenaltyAdapter(): any;
    static getPenaltyChain(): lodash.CollectionChain<any> & lodash.FunctionChain<any> & lodash.ObjectChain<any> & lodash.PrimitiveChain<any> & lodash.StringChain;
    static get pixBODAO(): Buffer;
    static get totalCMD(): any;
    static get mythumb(): Buffer;
    static get mylogo(): Buffer;
    static get sinthumb(): Buffer;
    static get dateFormat(): Intl.ResolvedDateTimeFormatOptions;
    static get sfx(): string[];
    static get time(): string;
    static get now(): string;
    static get exclamationMark(): Buffer;
    static get runtime(): string;
    static getStickerWebP(name: string): Buffer;
    static getImageJpg(name: string): Buffer;
    static getImagePng(name: string): Buffer;
    static images: {
        exclamation: Buffer;
        logo: Buffer;
        perfil: Buffer;
        apoio: Buffer;
        similogo: Buffer;
        crearHD: Buffer;
        goatGod: Buffer;
        pressF: Buffer;
        erigei: Buffer;
        pix: Buffer;
        pixBodao: Buffer;
    };
    static getAudioUwu(filename: string): Buffer;
    static getAudioXd(filename: string): Buffer;
    static audio: {
        Kawaii: Buffer;
        Onichan: Buffer;
    };
    static updateStats(): void;
    static set simi(v: number);
    static set limit(value: any);
    static _runtime(seconds: any): string;
    /**
     * save users database to file
     */
    static saveUsers(): void;
    /**
     * save chats database to file
     */
    static saveChats(): void;
    static checkGroupData(): void;
    static saveGroups(): void;
    static enableFunction(registro: any, _dir: any): void;
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
    static disableFunction(registro: any, _dir: any): void;
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
    static _lenguatext: string;
    static get simi(): number;
    static get idiomas(): any;
    static get lenguatext(): string;
    static set lenguatext(v: string);
    static set idiomas(v: string);
    static getTextProStyle(name: string): string;
}
//# sourceMappingURL=database.d.ts.map
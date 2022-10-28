import Base_ from "./base.js";
import { IUserStat } from "./types/index.js";
export default class Stats extends Base_ {
    static defaultStaticReg: IUserStat;
    static db: any;
    static _stats: Stats[];
    _chat: string;
    _user: string;
    _messages: number;
    _sticker: number;
    _images: number;
    _video: number;
    _audio: number;
    _text: number;
    _docs: number;
    _warns: number;
    _duelWin: number;
    _duelLost: number;
    _todayHits: number;
    _unknown: number;
    _commands: {};
    constructor(chatId: string, userId: string, data?: null);
    _parse(obj: any): void;
    static getStatsAdapter(path: any): any;
    static get statsChain(): any;
    static loadStatObjects(): Stats[];
    static ResetTodayHits(): void;
    getStatsObj(): IUserStat;
    static getstatsforChatUser(chatId: any, userId: any): Stats;
    save(): void;
    /**
     *
     * @param chat chat to save in database
     * @returns
     */
    static saveStat(Classe: Stats): true | undefined;
    static saveStats(): any;
    get messages(): number;
    get sticker(): number;
    get images(): number;
    get video(): number;
    get audio(): number;
    get text(): number;
    get docs(): number;
    get warns(): number;
    get duelWin(): number;
    get duelLost(): number;
    get todayHits(): number;
    get unknown(): number;
    get commands(): {};
    get stats(): IUserStat;
    static get botStats(): IUserStat;
    set messages(v: number);
    set sticker(v: number);
    set images(v: number);
    set video(v: number);
    set audio(v: number);
    set text(v: number);
    set docs(v: number);
    set warns(v: number);
    set duelWin(v: number);
    set duelLost(v: number);
    set unknown(v: number);
    set todayHits(v: number);
    set commandUse(v: string);
}
//# sourceMappingURL=stats.d.ts.map
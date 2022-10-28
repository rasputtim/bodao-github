import { makeInMemoryStore, WAProto } from "@adiwajshing/baileys";
import makeLegacySocket from "@adiwajshing/baileys/lib/LegacySocket";
import makeMDSocket from "@adiwajshing/baileys/lib/Socket";
import { EMediaConvertType, EQuotedReturnEnum, IPlugin } from '../interfaces/intPlugin.js';
import IMessageCore from '../interfaces/messageInt.js';
declare type Exclusive<T extends Record<PropertyKey, unknown>, U extends Record<PropertyKey, unknown>> = (T & {
    [k in Exclude<keyof U, keyof T>]?: never;
}) | (U & {
    [k in Exclude<keyof T, keyof U>]?: never;
});
export { IMessageCore, EQuotedReturnEnum, EMediaConvertType, IPlugin };
export declare type CreateFunction<T extends any[], R> = (...arg: T) => R;
export declare type ExcludeFromTuple<T extends readonly any[], E> = T extends [infer F, ...infer R] ? [F] extends [E] ? ExcludeFromTuple<R, E> : [
    F,
    ...ExcludeFromTuple<R, E>
] : [];
export declare type First<T extends any[]> = T extends [infer I, ...infer _L] ? I : never;
export declare type Last<T extends any[]> = T extends [...infer _I, infer L] ? L : never;
export declare type Tail<T extends any[]> = T extends [infer _I, ...infer L] ? L : never;
export declare type MessageTypes = keyof WAProto.IMessage;
export declare type AnyWASocket = ReturnType<typeof makeMDSocket>;
export declare type LegacyWASocket = ReturnType<typeof makeLegacySocket>;
declare type Mode_BAN = 'mode_ban';
declare type Mode_FAKES = 'mode_fakes';
declare type Mode_FAKESGROUP = 'mode_fakesgroup';
declare type Mode_BLACKLIST = 'mode_blacklist';
declare type Mode_FUN = 'mode_fun';
declare type ModeANTI_VIRTEX = 'mode_anti_virtex';
declare type ModeANTI_LINK = 'mode_anti_link';
declare type ModeANTI_LINKGROUP = 'mode_anti_linkgrou';
declare type ModeANTI_FOREIGN = 'mode_anti_foreign';
declare type ModeANTI_PORN = 'mode_anti_porn';
declare type ModeANTI_IMAGE = 'mode_anti_image';
declare type ModeANTI_VIDEO = 'mode_anti_video';
declare type ModeANTI_AUDIO = 'mode_anti_audio';
declare type ModeANTI_WORDS = 'mode_anti_words';
declare type ModeANTI_FLOOD = 'mode_anti_flood';
declare type ModeANTI_TOXIC = 'mode_anti_toxic';
declare type ModeANTI_PRIVATE = 'mode_anti_private';
declare type ModeKICK = 'mode_kick';
declare type ModeSAFE = 'mode_safe';
export declare type Modes = Mode_BAN | Mode_FAKES | Mode_FAKESGROUP | Mode_BLACKLIST | Mode_FUN | ModeANTI_VIRTEX | ModeANTI_LINK | ModeANTI_LINKGROUP | ModeANTI_FOREIGN | ModeANTI_PORN | ModeANTI_IMAGE | ModeANTI_VIDEO | ModeANTI_AUDIO | ModeANTI_WORDS | ModeANTI_FLOOD | ModeANTI_TOXIC | ModeANTI_PRIVATE | ModeKICK | ModeSAFE;
export declare type securityModesCheck = Record<Modes, boolean>;
declare type QuotedCheck = "msg_quoted_check";
declare type GROUPCheck = "msg_group_check";
declare type PARAMETERCheck = "msg_parameter_check";
declare type MsgsQualifiers = QuotedCheck | GROUPCheck | PARAMETERCheck;
export declare type messagesChecks = Record<MsgsQualifiers, boolean>;
declare type MediaVideo = 'media_video';
declare type MediaSticker = 'media_sticker';
declare type MediaAudio = 'media_audio';
declare type MediaImage = 'media_image';
declare type MediaWebP = 'media_webp';
declare type MediaTypes = MediaVideo | MediaSticker | MediaAudio | MediaImage | MediaWebP;
export declare type mediaChecks = Record<MediaTypes, boolean>;
export interface onCommand {
    m?: IMessageCore;
    sock?: AnyWASocket;
    text?: string;
    args?: string[];
    _args?: string[];
    store?: ReturnType<typeof makeInMemoryStore>;
    command?: string;
}
export interface ParserOptions {
    loadMessage?: (jid: string, id: string) => Promise<WAProto.IWebMessageInfo> | null;
    sendMessage?: AnyWASocket['sendMessage'];
}
export interface INote {
    name: string;
    content: string;
}
export declare type tag_PREMIUN = 'PREMIUN';
export declare type planeModePREMIUN = Record<tag_COMMON, boolean>;
export declare type planeModeCOMMON = Record<tag_PREMIUN, boolean>;
export declare type planeModeCheck_t = planeModePREMIUN | planeModeCOMMON;
declare type planeModeCheckXOR_t = Exclusive<planeModePREMIUN, planeModeCOMMON>;
/**
 * Using this function to initialize the variables typed planeModeCheck_t will
 * guaranee they have exclusive one key with true valoue while te other will e false in runtime
 * @param param0 PREMIUM OR COMMON
 * @returns the object typed planeModeCheck_t with exclusive one key being true
 */
export declare const PlaneMode: ({ PREMIUN, COMMON }: planeModeCheckXOR_t) => planeModeCheck_t;
export declare type tag_NSFW = 'NSFW';
export declare type tag_SFW = 'SFW';
export declare type offensiveModeNSFW = Record<tag_NSFW, boolean>;
export declare type offensiveModeSFW = Record<tag_SFW, boolean>;
export declare type offensiveModeCheck_t = offensiveModeNSFW | offensiveModeSFW;
declare type offensiveModeCheckXOR_t = Exclusive<offensiveModeNSFW, offensiveModeSFW>;
/**
   * Using this function to initialize the variables typed offensiveModeCheck_t will
   * guaranee they have exclusive one key with true valoue while te other will e false in runtime
   * @param param0 NSFW,SFW
   * @returns the object typed offensiveModeCheck_t with exclusive one key being true
   */
export declare const OffensiveMode: ({ NSFW, SFW }: offensiveModeCheckXOR_t) => offensiveModeCheck_t;
export declare type tag_REGISTERED = 'REGISTERED';
export declare type tag_ALL = 'ALL';
export declare type registerModeREGISTERED = Record<tag_REGISTERED, boolean>;
export declare type registerModeALL = Record<tag_ALL, boolean>;
export declare type registerModeCheck_t = registerModeREGISTERED | registerModeALL;
export declare type registerModeCheckXOR_t = Exclusive<registerModeREGISTERED, registerModeALL>;
/**
   * Using this function to initialize the variables typed registerModeCheck_t will
   * guaranee they have exclusive one key with true valoue while te other will e false in runtime
   * @param param0 REGISTERED, ALL
   * @returns the object typed registerModeCheck_t with exclusive one key being true
   */
export declare const RegisterMode: ({ REGISTERED, ALL }: registerModeCheckXOR_t) => registerModeCheck_t;
declare type Mode_LIMITCHECK = 'mode_limitcheck';
declare type Mode_WELCOME = 'mode_welcome';
declare type Mode_VIEWONCE = 'mode_viewonce';
declare type Mode_SIMI = 'mode_simi';
declare type Mode_LEVELING = 'mode_leveling';
declare type Mode_AFK = 'mode_afk';
declare type Mode_OFFLINE = 'mode_offline';
declare type ResourceModes = Mode_LIMITCHECK | Mode_WELCOME | Mode_VIEWONCE | Mode_SIMI | Mode_LEVELING | Mode_OFFLINE | Mode_AFK;
export declare type resourceModesCheck_t = Record<ResourceModes, boolean>;
export declare type tag_ANIME = 'ANIME';
export declare type tag_CONTROL = 'CONTROL';
export declare type tag_CONVERTER = 'CONVERTER';
export declare type tag_STICKER = 'STICKER';
export declare type tag_FUN = 'FUN';
export declare type tag_HENTAI = 'HENTAI';
export declare type tag_TOOLS = 'TOOLS';
export declare type tag_ARTISTIC = 'ARTISTIC';
export declare type tag_UTILS = 'UTILS';
export declare type tag_DONLOAD = 'DOWNLOAD';
export declare type tag_SEARCH = 'SEARCH';
export declare type tag_SPIRITUAL = 'RELIGION';
export declare type tag_MENU = 'MENU';
export declare type tag_MASONIC = 'MASONIC';
export declare type tag_COMMON = 'COMMON';
export declare type tag_EXOTERIC = 'EXOTERIC';
export declare type tag_MODES = 'MODES';
export declare type tag_BOT = 'BOT';
export declare type tag_GROUP = 'GROUP';
export declare type TAGS = tag_ANIME | tag_CONTROL | tag_CONVERTER | tag_STICKER | tag_FUN | tag_HENTAI | tag_TOOLS | tag_ARTISTIC | tag_UTILS | tag_DONLOAD | tag_SEARCH | tag_SPIRITUAL | tag_MENU | tag_MASONIC | tag_COMMON | tag_EXOTERIC | tag_MODES | tag_BOT | tag_GROUP;
/**
 * type:
 * option
 * link    => option without a command. the command will run insithe other  (the linked) CommandDescriptor_t
 * alias
 *
 *
 */
export declare type yesNo = 'yes' | 'no' | 'y' | 'n';
export declare type commandHandlerType = 'option' | 'link' | 'alias';
export declare type commandHandlerOptions = {
    runable: yesNo;
    enabled: yesNo;
    name: string;
    type: commandHandlerType;
    description: string;
    group: TAGS;
    usage: string;
    script: string;
};
export declare type innerPluginOptions = {
    name?: string;
    class: string;
    file: string;
    commands: string[];
};
export declare type userPluginOptions = {
    name: string;
    fileName: string;
};
export declare type IComandAlias = {
    runable: string;
    enabled: string;
    name: string;
    type: string;
    root: string;
};
export declare type handlerCommandDescriptor_t = commandHandlerOptions | IComandAlias;
export declare type CommandDescriptor_t = handlerCommandDescriptor_t | innerPluginOptions | userPluginOptions;
export declare const ChatType: {
    readonly PRIVATE: 0;
    readonly GROUP: 1;
    readonly UNKNOWN: 2;
};
export declare type ChatType_t = typeof ChatType[keyof typeof ChatType];
declare type permBotController = 'bot_perm_controller';
declare type permBotCreator = 'bot_perm_creator';
declare type permBotOwner = 'bot_perm_owner';
declare type permBotAdmin = 'bot_perm_admin';
declare type permGroupModerator = 'group_perm_moderator';
declare type permGroupAdmin = 'group_perm_admin';
export declare type Permissions = permBotCreator | permBotOwner | permGroupModerator | permGroupAdmin | permBotAdmin | permBotController;
export declare type userPermCheck = Record<Permissions, boolean>;
export declare const BotRoles: {
    readonly CREATOR: 1;
    readonly CONTROLLER: 2;
    readonly OWNER: 3;
    readonly BOTADMIN: 4;
    readonly GROUPADMIN: 5;
    readonly GROUPMODERATOR: 6;
    readonly COMMONUSER: 7;
    readonly UNKNOWN: 8;
};
export declare type BotRoles_t = typeof BotRoles[keyof typeof BotRoles];
export declare type IUserStat = {
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
    _commands: object;
    _todayHits: number;
    _unknown: number;
};
//# sourceMappingURL=index.d.ts.map
import { GroupMetadata } from "@adiwajshing/baileys";
import { proto } from "@adiwajshing/baileys/WAProto";
import Chat from '../../factory/chat.js';
import User from '../../factory/user.js';
export default abstract class IMessageCore {
    abstract _msg: Object;
    abstract _sender: string;
    abstract _senderNUMBER: string;
    abstract _from: string;
    abstract _isFromME: boolean;
    abstract _fromMe: string;
    abstract _AtSenderNUMBER: string;
    abstract _quoted: Object | null;
    abstract _atBotNumber: any;
    abstract _commandFound: boolean;
    /**
     * mentioned Jids  of message
     * The jid is the identifier used by whatsapp for each or group. It use to be cc+phone@s.whatsapp.net for users and cc+phone-timestamp@g.us for groups.
     */
    abstract _jids: string[];
    abstract mentionedIds: string[];
    abstract _args: any[];
    abstract _url: string;
    abstract _ar: any;
    abstract _arg: any[];
    abstract _arg0: any;
    abstract _arg1: any;
    abstract _arg2: any;
    abstract _chats: any;
    abstract _croppedChats: any;
    abstract _msg_serial: object;
    abstract _store: Record<string, any>;
    abstract _botControllers: string[];
    abstract _isModerator: boolean;
    abstract _client: any;
    abstract _NameBot: string;
    abstract _botNumber: string;
    abstract _commandHandlers: Array<any>;
    abstract _notCommandHandlers: Array<any>;
    abstract _globalThumb: any;
    abstract _picThumb: any;
    abstract _sendThumb: any;
    abstract _isSPAMFiltered: boolean;
    abstract _addSPAMFilter: any;
    abstract _type: keyof proto.IMessage;
    abstract _mimetype: string;
    abstract _body: object;
    abstract _isGroupMsg: boolean;
    abstract _user: User;
    abstract _chat: Chat;
    constructor();
    abstract addCommandHandler(pointer: any): any;
    abstract addNotCommandHandler(pointer: any): any;
    abstract groupChecks(): void | null | Promise<void>;
    abstract checkGroupSpan(): Promise<proto.WebMessageInfo>;
    abstract checkSpan(): void | null;
    abstract logCommands(): any;
    abstract isAllowed(handler: any): Promise<boolean | void>;
    abstract run(): any;
    abstract default(): any;
    abstract doSimi(txt: string | null): any;
    static _getGroupAdmins: any;
    static doSomeAsyncStuff: any;
    abstract isSPAMFiltered: boolean;
    abstract addSPAMFilter(from: string): Record<string, any>;
    abstract globalThumb: any;
    abstract picThumb: any;
    abstract sendThumb: any;
    abstract NameBot: string;
    abstract AtSenderNUMBER: string;
    abstract botControllers: Array<any>;
    abstract quoted: Record<string, any>;
    abstract quotedMsg: Record<string, any>;
    abstract body: string;
    abstract chats: Record<string, any>;
    abstract type: string;
    abstract args: string[];
    abstract arg: string;
    abstract arg0: string;
    abstract arg1: string;
    abstract arg2: string;
    abstract from: string;
    abstract argsLC: string;
    abstract ar: string;
    /**
     * Gets mimetype
     */
    abstract mime: string;
    /**
     * Gets mimetype
     */
    abstract mimetype: string;
    abstract isGroupMsg: boolean;
    abstract cglobal: string;
    abstract sender: string;
    abstract senderNUMBER: string;
    abstract isMedia: boolean;
    /**
     * Gets mentioned jid list
     * @description A Set of all mentioned numbers in this message.
    */
    abstract jids: Array<any>;
    abstract mentionedJidList: Array<any>;
    abstract msg_serial: object;
    abstract messageC: object;
    abstract command: string;
    abstract commandWithPrefix: string;
    abstract isCmd: boolean;
    abstract content: string;
    /**
     * Gets message
     * @description The message object
     */
    abstract message: object;
    abstract _0xec3b62: object;
    abstract msg: Record<string, any> & Record<'key', any>;
    abstract conversation: object;
    abstract q: string | null;
    abstract isFromME: boolean;
    abstract isCREATOR: boolean;
    abstract isBotController: boolean;
    abstract isOwner: boolean;
    abstract isBotAdmin: boolean;
    abstract isAdmin: boolean;
    abstract isModerator: boolean;
    /**
     * Gets pushname
     * @description  verifiedName is the name of someone who uses a business account
     */
    abstract pushname: string;
    abstract groupMetadata: GroupMetadata;
    abstract groupId: string;
    abstract groupOwner: string;
    abstract groupDesc: string;
    abstract groupName: string;
    abstract groupMembers: Array<any>;
    abstract groupAdmins: Array<any>;
    abstract isLevelinModeOn: boolean;
    abstract isAntiLinkModeOn: boolean;
    abstract isAntiLinkGroupModeOn: boolean;
    abstract isWelcomeModeOn: boolean;
    abstract isAntifakes1: boolean;
    abstract isAntifakes2: boolean;
    abstract isAntiVirtexModeOn: boolean;
    abstract isAntiFloodModeOn: boolean;
    abstract isForeignModeOn: boolean;
    abstract isAnimeModeOn: boolean;
    abstract isFunModeOn: boolean;
    abstract isNSFWModeOn: boolean;
    abstract isSIMIModeOn: boolean;
    abstract isBanModeOn: boolean;
    abstract isREGISTERED: boolean;
    abstract isBanned: boolean;
    abstract isAFK: boolean;
    abstract isMedia2: boolean;
    abstract isQuotedMsg: boolean;
    abstract isQuotedImage: boolean;
    abstract isQuotedVideo: boolean;
    abstract isQuotedAudio: boolean;
    abstract isQuotedSticker: boolean;
    abstract isQuotedChat: boolean;
    abstract isImage: boolean;
    abstract isWebP: boolean;
    abstract duration: number;
    abstract BodaoBotURL: string;
    abstract url: string;
    abstract id: string;
    abstract messageID: string;
    abstract msgQuote: Record<string, any> & Record<'key', any>;
    abstract msgQuoteWithLogo: Record<string, any>;
    abstract audioQuote: Record<string, any>;
    abstract activationChoiceButtons: Array<any>;
    abstract usedMem: Record<string, any>;
    abstract cpuInfo: any;
    abstract myCPUInfo: Record<string, any>;
    abstract role: string;
    abstract role2: string;
    abstract levelBar: string;
    /**
     * Time  of imessage core
     * timestamp
     */
    abstract time: number;
    abstract showButtonsChoice(user: any, header: any, footer: any, buttons: any): Record<string, any>;
    abstract selectRamdomFromArray(myArray: any): any;
    abstract mySendMessage(txt: string): void | Promise<proto.WebMessageInfo>;
    abstract sendMentionedMessage(txt: string): void | Promise<proto.WebMessageInfo>;
    abstract showProcessingMsg(txt: string): any;
    abstract reply(txt: string): any;
    abstract sendReplyWithPicThumb(txt: string): any;
    abstract showMessageOK(txt: string): any;
    abstract showMessageLocation(latitude: any, longitude: any): any;
    /**
       * @param {String} url url: Link que você deseja enviar
       * @param {String} fname fname: (opcional) nome do arquivo
       * @param {Object} mdataOpts mdataOpts: (opcional) opções de envio
       * @param {Object} mimetype the mime type of the file
       * @returns
       */
    abstract sendFileFromUrl(url: any, fname: any, mdataOpts: object, mimetype: any): any;
    abstract sendMessageCOMMAND(image: any, thumbNail: any, caption: any): any;
    abstract showNotRegisteredMSG(txt: string): any;
    abstract showWaitMessage(txt: any): any;
    abstract showWaitMessage2(txt: any): any;
    abstract showSearchingMessage(txt: any): any;
    abstract showImageFromURLWithPushName(image: any, caption: any): any;
    abstract showimageMessageWithCommand(image: any, caption: any): any;
    abstract sendFileFromBuffer(buffer: any, filename: any, type: any): any;
    /**
     * Send File fro path
     * @param path path to the file
     * @param filename filename
     * @param type mimetype
     */
    abstract sendFile(path: any, filename: any, type: any): any;
    abstract checkRemaininLimit(): any;
    abstract isURL(link: any): boolean;
    abstract showActiveUsers(txt: any, mentions: any): any;
    abstract setUserConstraints(xp?: number, level?: number, addSpan?: boolean): any;
    abstract sfxSave(sfxName: any): any;
    abstract mediaConverter(complexFilter: string | string[], filterName: string, type?: any): any;
    abstract printError(e: unknown, sendToOwner?: boolean, senderIDror?: boolean): any;
    /**
     * @return true if there is no argument
     */
    abstract hasNoArg(): boolean;
    /**
     *
     * @param {*} number the number of arguments to check against
     * @returns true if the number of arguments is the same as the requested
     */
    abstract numberOfArgs(amount: number): boolean;
    /**
     * check if the first argument is what you expect
     * @param {*} argument argument to check against the first arg
     * @returns true if parameter is equal ar[0]
     */
    abstract checkFirstArg(argument: any): boolean;
    abstract getSoundFile(filename: any, name?: any): any;
    /**
         * Sends a file by Url or custom options
         * @param url string https://i.giphy.com/media/oYtVHSxngR3lC/200w.mp4
         * @param caption string xxxxx
         * @param filename string 'video.mp4'
         * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
         * @param sendWait true to send a wait message
         */
    abstract sendFFU(url: any, caption?: string, filename?: string, requestConfig?: object, sendWait?: boolean): any;
}
//# sourceMappingURL=messageInt.d.ts.map
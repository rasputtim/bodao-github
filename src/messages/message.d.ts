/// <reference types="node" />
/// <reference types="node" />
import { GroupMetadata, GroupParticipant } from '@adiwajshing/baileys';
import Chat from '../factory/chat.js';
import IMessageCore from '../factory/interfaces/messageInt.js';
import Stats from '../factory/stats.js';
import { EMediaConvertType, IPlugin } from '../factory/types/index.js';
import User from '../factory/user.js';
export default class MessageCore implements IMessageCore {
    _msg: any;
    _botControllers: any;
    _sender: any;
    _senderNUMBER: any;
    _from: any;
    _isFromME: any;
    _isModerator: boolean;
    _fromMe: any;
    _botNumber: string;
    _AtSenderNUMBER: any;
    _quoted: any;
    _atBotNumber: any;
    _jids: any;
    _args: any;
    _url: any;
    _ar: any;
    _arg: any;
    _arg0: any;
    _arg1: any;
    _arg2: any;
    _chats: any;
    _croppedChats: any;
    _msg_serial: any;
    _store: any;
    _commandFound: boolean;
    /**
     * Group metadata of message core
     * id: string;
         owner: string | undefined;
         subject: string;
         creation: number;
         desc?: string;
         descOwner?: string;
         descId?: string;
         // is set when the group only allows admins to change group settings
         restrict?: boolean;
         //is set when the group only allows admins to write messages
         announce?: boolean;
         participants: GroupParticipant[];
         ephemeralDuration?: number;
     */
    _client: any;
    _NameBot: string;
    _commandHandlers: any;
    _notCommandHandlers: any;
    _globalThumb: null;
    _picThumb: null;
    _sendThumb: Buffer | null;
    _isSPAMFiltered: any;
    _addSPAMFilter: any;
    _type: any;
    _body: any;
    _mimetype: any;
    _isGroupMsg: any;
    _isToxic: boolean;
    _user: User;
    _chat: Chat;
    _stat: Stats;
    destrava: string;
    travaPv: string;
    /**
     *
     * @param client the Bayleis conn object
     * @param pMessage
     * @param pStore
     * @returns
     */
    constructor(client: any, pMessage: any, pStore: any);
    getMimetype(): any;
    updateMsgStats(): number | undefined;
    addCommandHandler(pointer: any): void;
    addNotCommandHandler(pointer: any): void;
    doSimi(inp: string | null): Promise<null | undefined>;
    /**
     * log rough words
     */
    logRough(): void;
    /**
     *
     * @returns true if the user is not banned
     */
    filterBanned(): Promise<any>;
    checkEnabled(): Promise<null | undefined>;
    checkRough(): Promise<void>;
    antiRough(): Promise<void>;
    /**Todo Add user into the blacklist of the bot // ou chat??? */
    addBlackList(participant: any): void;
    removeBlackList(participant: any): boolean | Promise<void>;
    groupChecks(): Promise<any>;
    /**
     * avoid not safe for work (NSFW) links
     */
    antiNFSWLink(): Promise<void>;
    checkNFSWWords(): Promise<unknown>;
    checkPorn(): Promise<boolean>;
    /**
     * kick sender from the group if kick mode is on
     */
    kickSender(reason?: string): Promise<void>;
    checkVirtex(): Promise<any>;
    checkAntiLink(): Promise<any>;
    checkAntiLinkGroup(): Promise<any>;
    checkGroupSpan(): any;
    /**
     * Ant Private Mode is True. Private Chat with Bot is prohibited
     */
    checkPrivateChat(): Promise<void>;
    checkSpan(): void;
    logCommands(): void;
    private getNecessaruBotLevel;
    /**
     * check if a command can or not run
     * @param handler //the plugin handler that claims to be allowed to run
     * @returns true if the command is allowed to run
     */
    isAllowed(handler: IPlugin): Promise<boolean>;
    default(): Promise<void>;
    run(): Promise<undefined>;
    static _isBotGroupAdmin: (este: any) => Promise<boolean | undefined>;
    /**
     *
     * @param myObj
     * @returns a promessa de devolver uma url da imagem
     */
    static picSender(myObj: any): Promise<any>;
    static doSomeAsyncStuff: (myObj: any) => Promise<void>;
    get stickerMetadata(): {
        pack: string;
        author: string;
        keepScale: boolean;
    };
    get stickerMetadataCircle(): {
        pack: string;
        author: string;
        circle: boolean;
    };
    get stickerMetadataCrop(): {
        pack: string;
        author: string;
        cropPosition: string;
    };
    get cglobal(): string;
    get botNumber(): string;
    get isSenderGroupAdmin(): boolean;
    get isBotGroupAdmin(): boolean;
    get isSPAMFiltered(): any;
    get addSPAMFilter(): any;
    get globalThumb(): null;
    get picThumb(): null;
    get sendThumb(): Buffer;
    get NameBot(): string;
    get AtSenderNUMBER(): any;
    get botControllers(): string[];
    get quoted(): any;
    get quotedMsg(): any;
    /**
    * Body  of message
    *
    * @description: The body of the message. If the message type is chat , body will be the text of the chat.
    * If the message type is some sort of media, then this body will be the thumbnail of the media.
    */
    get body(): any;
    get chats(): any;
    /**
     * Gets chat id
     * * A chat id ends with `@c.us` or `@g.us` for group chats.
     *
     * @example A group chat: `"447123456789-1445627445@g.us"`
     * @example A group chat: `"447123456789@g.us"`
     *
     */
    get chatId(): any;
    get from(): any;
    get groupId(): string;
    get groupMetadata(): GroupMetadata;
    /** this groupId is the same as this._from */
    /**
     * Gets type
     * @description  The type of the message, see [[MessageTypes]]
    */
    get type(): any;
    get args(): any;
    get arg(): any;
    get arg0(): any;
    get arg1(): any;
    get arg2(): any;
    get argsLC(): any;
    get ar(): any;
    /**
     * Gets mimetype
     */
    get mime(): any;
    /**
     * Gets mimetype
     */
    get mimetype(): any;
    get isGroupMsg(): any;
    get sender(): any;
    get senderNUMBER(): any;
    /**
     * Gets mentioned jid list
     * @description A Set of all mentioned numbers in this message.
    */
    get jids(): any;
    get mentionedJidList(): any;
    get mentionedIds(): any;
    get msg_serial(): any;
    get messageC(): any;
    get command(): any;
    get commandWithPrefix(): any;
    get isCmd(): any;
    get content(): string;
    /**
     * Gets message
     * @description The message object
     */
    get message(): any;
    get _0xec3b62(): any;
    get msg(): any;
    get conversation(): any;
    /**
     * the arguments for the currente command, if it is a command
     */
    get q(): any;
    get url(): any;
    get id(): any;
    get messageID(): any;
    get duration(): any;
    /**
     * return true if it is a command with arguments
     */
    get cmdHaveArgs(): boolean;
    get isCREATOR(): boolean;
    get isFromME(): any;
    get isModerator(): boolean;
    get isOwner(): boolean;
    get isBotController(): any;
    /**
     * Gets pushname
     * @description  verifiedName is the name of someone who uses a business account
     */
    get pushname(): string;
    get t(): any;
    get time(): any;
    get groupOwner(): string;
    get groupDesc(): string;
    get groupName(): string;
    get groupMembers(): GroupParticipant[];
    get groupAdmins(): GroupParticipant[];
    get isBotAdmin(): boolean;
    /**
     * Check if is the Sender of the message admin
     * @date 15/07/2022 - 23:18:24
     *
     * @readonly
     * @type {*}
     */
    get isAdmin(): boolean;
    get isLevelinModeOn(): boolean;
    /**
     * AntiLink mode. It is not allowed to share links
     * return true if AntiLink mode  is enabled for this chat
     */
    get isAntiLinkModeOn(): boolean;
    /**
     * return true if is a Link Message
     */
    get isLinkMSG(): boolean;
    /**
     * AntiLinkGroup mode. It is not allowed to share links of WhatsApp os other Groups
     * return true if AntiLinkGroup mode is enabled for this chat
     */
    get isAntiLinkGroupModeOn(): boolean;
    /**
     * return true is if it is a LinkGroup Message
     */
    get isGroupLinkMSG(): boolean;
    get isWelcomeModeOn(): boolean;
    get isAntifakes1(): boolean;
    get isAntifakes2(): boolean;
    get isAntitoxicModeOn(): boolean;
    get isToxic(): boolean;
    get isAntiImageModeOn(): boolean;
    get isAntiAudioModeOn(): boolean;
    /**Todo: check if this message is classified in the antiword feature */
    get isAntiWord(): boolean;
    get isAntiWordsModeOn(): boolean;
    get isAntiPornModeOn(): boolean;
    /**
     * return true if virtex mode is enabled and this is a long message
     */
    get isVirtexMSG(): boolean;
    get isAntiVideoModOn(): boolean;
    get isAntiVirtexModeOn(): boolean;
    get isAntiFloodModeOn(): boolean;
    get isSIMIModeOn(): boolean;
    get isPremiumModeOn(): boolean;
    get isBlackListModeOn(): boolean;
    get isBlackListed(): any;
    get isBanned(): boolean;
    get isKickModeOn(): boolean;
    get isForeignModeOn(): boolean;
    get isAnimeModeOn(): boolean;
    get isFunModeOn(): boolean;
    get isNSFWModeOn(): boolean;
    get isBanModeOn(): boolean;
    get isPorn(): boolean;
    get isREGISTERED(): boolean;
    get isAFK(): boolean;
    get _0x4e5640(): boolean;
    get isMedia(): boolean;
    get isMedia2(): boolean;
    get isQuotedMsg(): boolean;
    get isQuotedImage(): boolean;
    get isQuotedVideo(): boolean;
    get isQuotedAudio(): boolean;
    get isQuotedSticker(): boolean;
    get isQuotedDoc(): boolean;
    get isImage(): boolean;
    get isDoc(): boolean;
    get isWebP(): boolean;
    get isVideo(): boolean;
    get isAudio(): boolean;
    get isLink(): any;
    get isSticker(): boolean;
    /**
     * Gets whether is quoted chat (if this is a reply message and is a conversation (not media))
     */
    get isQuotedChat(): boolean;
    get BodaoBotURL(): any;
    get msgQuote(): any;
    get msgQuoteWithLogo(): {
        key: {
            participant: string;
            remoteJid: string;
        };
        message: {
            groupInviteMessage: {
                groupJid: string;
                inviteCode: string;
                groupName: string;
                caption: string;
                jpegThumbnail: Buffer;
            };
        };
    };
    get audioQuote(): {
        key: {
            remoteJid?: string | undefined;
            participant: string;
        };
        message: {
            audioMessage: {
                mimetype: string;
                seconds: number;
                ptt: string;
            };
        };
    };
    get activationChoiceButtons(): {
        quickReplyButton: {
            displayText: string;
            id: string;
        };
    }[];
    get usedMem(): NodeJS.MemoryUsage;
    get cpuInfo(): any[];
    get myCPUInfo(): any;
    get role(): string;
    get role2(): string;
    get levelBar(): string;
    /**
     * @return true if there is no argument
     */
    hasNoArg(): boolean;
    /**
     *
     * @param {*} number the number of arguments to check against
     * @returns true if the number of arguments is the same as the requested
     */
    numberOfArgs(number: any): boolean;
    /**
     *
     * @param {*} argument argument to check against the first arg
     * @returns true if parameter is equal ar[0]
     */
    checkFirstArg(argument: any): boolean;
    createAudioMsgObj: (myAudio: any, fileName: string, name?: string | null) => object;
    getSoundFile: (fileName: any, name?: null | string) => Promise<false | undefined>;
    showButtonsChoice(user: any, header: any, footer: any, buttons: any): any;
    selectRamdomFromArray(myArray: any): any;
    sendText(txt: any): Promise<any>;
    mySendMessage(txt: any): void;
    /**
    * @param {String} url url: Link que você deseja enviar
    * @param {String} caption Caption
    * @param {Object} mdataOpts mdataOpts: (opcional) opções de envio
    * @param {Object} mimetype the mime type of the file
    * @returns
    */
    sendFileFromUrl(url: any, caption: any, mdataOpts: {} | undefined, mimetype: any): Promise<any>;
    /**
    * Sends a file from the Url or custom options
    * @param url string https://i.giphy.com/media/oYtVHSxngR3lC/200w.mp4
    * @param caption string xxxxx
    * @param filename string 'video.mp4'
    * @param requestConfig {} By default the request is a get request, however you can override that and many other options by sending this parameter. You can read more about this parameter here: https://github.com/axios/axios#request-config
    * @param sendWait true to send a wait message
    */
    sendFFU(url: any, caption?: string, filename?: string, requestConfig?: {}, sendWait?: boolean): Promise<any>;
    printError(error: unknown, sendToOwner?: boolean, senderIDror?: boolean): Promise<void>;
    sendMentionedMessage(txt: any): Promise<any>;
    showProcessingMsg(txt: any): Promise<any>;
    reply(txt: any): Promise<void>;
    sendReplyWithPicThumb(txt: any): Promise<any>;
    showMessageOK(txt: any): Promise<any>;
    sendMessageCOMMAND(image: Buffer, thumbNail: any, caption: any): Promise<any>;
    showNotRegisteredMSG(txt: any): Promise<any>;
    showWaitMessage(txt: any): Promise<any>;
    showWaitMessage2(txt: any): Promise<any>;
    showSearchingMessage(txt: any): Promise<any>;
    showImageFromURLWithPushName(imageURL: string, caption: any): Promise<any>;
    showimageMessageWithCommand(image: Buffer, caption: any): Promise<any>;
    /**
     * Send a message with google location
     * @param latitude <cityCoordinates latitude>
     * @param longitude  <cityCoordinates longitude>
     */
    showMessageLocation(latitude: any, longitude: any): Promise<any>;
    /**
     * @param file DataURL data:image/xxx;base64,xxx or the RELATIVE (should start with `./` or `../`) path of the file you want to send. With the latest version, you can now set this to a normal URL (for example [GET] `https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_2500kB.jpg`).
     * @param filename string xxxxx
     * @param caption string xxxxx*
     * */
    sendImage(file: any, name: any, caption: any): Promise<any>;
    /**
     * send File from path (in the filesystem)
     * @param path
     * @param filename
     * @param type
     * @returns
     */
    sendFile(path: any, filename: any, type?: any): Promise<any>;
    /**
     * send a file
     * @param {*} buffer the file to send
     * @param {*} filename the file name
     * @returns
     */
    sendFileFromBuffer(buffer: any, filename: any, type: any): Promise<any>;
    checkRemaininLimit(): Promise<any>;
    isURL(link: any): any;
    showActiveUsers(txt: any, mentions: any): Promise<any>;
    /**
     * setup user constraints (limit,xp,level,and spanFilter)
     * @param {*} xp
     * @param {*} level
     * @param {*} addSpan if will add spamfilter
     */
    setUserConstraints(xp?: number, level?: number, addSpan?: boolean): void;
    sfxSave(sfxName: any): Promise<void>;
    mediaConverter(Filter: any, filterName: any, type?: EMediaConvertType): Promise<undefined>;
    _0x153ea7: {
        key: {
            remoteJid?: string | undefined;
            participant: string;
        };
        message: {
            videoMessage: {
                title: string;
                h: string;
                seconds: string;
                gifPlayback: string;
                caption: string;
                jpegThumbnail: Buffer;
            };
        };
    };
    _0x4cf0ce: {
        key: {
            fromMe: boolean;
            participant: string;
            remoteJid: string;
        };
        message: {
            orderMessage: {
                itemCount: number;
                status: number;
                thumbnail: Buffer;
                surface: number;
                message: string;
                orderTitle: any;
                sellerJid: string;
            };
        };
        contextInfo: {
            forwardingScore: number;
            isForwarded: boolean;
        };
        sendEphemeral: boolean;
    };
    _0x523c55: {
        key: {
            fromMe: boolean;
            participant: string;
            remoteJid: string;
        };
        message: {
            orderMessage: {
                itemCount: number;
                status: number;
                thumbnail: Buffer;
                surface: number;
                message: string;
                orderTitle: any;
                sellerJid: string;
            };
        };
        contextInfo: {
            forwardingScore: number;
            isForwarded: boolean;
        };
        sendEphemeral: boolean;
    };
    _0x2de8e1: {
        key: {
            participant: string;
        };
        message: {
            documentMessage: {
                title: string;
                jpegThumbnail: Buffer;
            };
        };
    };
    _0x54bb93: {
        key: {
            remoteJid?: string | undefined;
            fromMe: boolean;
            participant: string;
        };
        message: {
            videoMessage: {
                title: string;
                h: string;
                seconds: string;
                caption: string;
                jpegThumbnail: Buffer;
            };
        };
    };
    _0x10571a: {
        key: {
            participant: string;
        };
        message: {
            locationMessage: {
                name: string;
                jpegThumbnail: Buffer;
            };
        };
    };
    _0x1387c3: {
        key: {
            remoteJid?: string | undefined;
            participant: string;
        };
        message: {
            contactMessage: {
                displayName: string;
                vcard: string;
                jpegThumbnail: Buffer;
                thumbnail: Buffer;
                sendEphemeral: boolean;
            };
        };
    };
}
//# sourceMappingURL=message.d.ts.map
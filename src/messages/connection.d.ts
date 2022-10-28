/// <reference types="node" />
/// <reference types="node" />
import proto from '@adiwajshing/baileys/WAProto/index.js';
import { PathLike } from 'fs';
import type { Logger } from 'pino';
export default class Connection {
    static isModule: boolean;
    static _started: boolean;
    storeFolder: PathLike;
    hosts: string[];
    owners: string[];
    logger: Console | Logger;
    static sessions: Map<any, any>;
    static retries: Map<any, any>;
    static _waConfig: {} | null;
    static _wa: any;
    constructor();
    static get wa(): any;
    static set waConfig(obj: any);
    static decodeJid(jid: any): any;
    static updateNameToDb(conn: any, contacts: any): void;
    static sendBotUnavalableMessage(conn: any): void;
    static sendBotAvailableMessage(conn: any): void;
    static getSessionsFolder(): string;
    static getSessionsFile(sessionId?: string): string;
    static getStoreFile(sessionId?: string): string;
    static isSessionExists: (sessionId: any) => boolean;
    static isStoreExists: (sessionId: any) => void;
    shouldReconnect(sessionId: any): boolean;
    deleteSession(sessionId: any, isLegacy?: boolean): void;
    onChatsSets(): void;
    createSession(sessionId: any, isLegacy?: boolean, res?: null): Promise<void>;
    cleanup(): void;
    /**
     * Init all sessions previously stored in the database folder
     */
    init(): void;
    /**
     * getBuffer hehe
     * @param {String|Buffer} path
     * @param {Boolean} returnFilename
     */
    static getFile(PATH: any, returnAsFilename: any): Promise<{
        data: Buffer;
        ext: import("file-type").FileExtension;
        mime: import("file-type").MimeType;
        res: any;
        filename: any;
    } | {
        data: Buffer;
        mime: "application/octet-stream";
        ext: ".bin";
        res: any;
        filename: any;
    }>;
    /**
     * waitEvent
     * @param {*} eventName
     * @param {Object} conn
     * @param {Boolean} is
     * @param {Number} maxTries
     * @returns
     */
    static waitEvent(conn: any, eventName: any, is?: () => boolean, maxTries?: number): Promise<unknown>;
    /**
      * Send Media/File with Automatic Type Specifier
      * @param {Object} conn
      * @param {String} jid
      * @param {String|Buffer} path
      * @param {String} filename
      * @param {String} caption
      * @param {Object} quoted
      * @param {Boolean} ptt
      * @param {Object} options
      */
    static sendFile(conn: any, jid: any, path: any, filename: string | undefined, caption: string | undefined, quoted: any, ptt?: boolean, options?: any): Promise<any>;
    /**
    * Send Contact
    * @param {Object} conn
    * @param {String} jid
    * @param {String} number
    * @param {String} name
    * @param {Object} quoted
    * @param {Object} options
    */
    static sendContact(conn: any, jid: any, number: any, name: any, quoted: any, options: any): Promise<any>;
    /**
    * send Button
    * @param {Object} conn
    * @param {String} jid
    * @param {String} contentText
    * @param {String} footer
    * @param {Buffer|String} buffer
    * @param {String[]} buttons
    * @param {Object} quoted
    * @param {Object} options
    */
    static sendButton(conn: any, jid: any, contentText: any, footer: any, buffer: any, buttons: any, quoted: any, options: any): Promise<any>;
    /**
    * cMod
    * @param {Object} conn
    * @param {String} jid
    * @param {*} message
    * @param {String} text
    * @param {String} sender
    * @param {*} options
    * @returns
    */
    static cMod(conn: any, jid: any, message: any, text?: string, sender?: any, options?: {}): proto.proto.WebMessageInfo;
    /**
      * Exact Copy Forward
      * @param {String} jid
      * @param {Object} message
      * @param {Boolean|Number} forwardingScore
      * @param {Object} options
      */
    static copyNForward(conn: any, jid: any, message: any, forwardingScore?: boolean, options?: {}): Promise<proto.proto.WebMessageInfo>;
    /**
    * Download media message
    * @param {Object} m
    * @param {String} type
    * @param {fs.PathLike|fs.promises.FileHandle} filename
    * @returns {Promise<fs.PathLike|fs.promises.FileHandle|Buffer>}
    */
    static downloadM(m: any, type: any, filename?: string): Promise<string | Buffer>;
    static downloadAndSaveMediaMessage(message: any, caption: any, add_extension_to_fIlename?: boolean): Promise<any>;
    static downloadAndBufferMediaMessage(message: any): Promise<Buffer>;
    /**
    * Get name from jid
    * @param {String} jid
    * @param {Boolean} withoutContact
    */
    static getName(conn: any, jid: any, withoutContact?: boolean): any;
    static saveName(conn: any, id: any, name?: string): Promise<void>;
    static pushMessage: (conn: any, m: any) => void;
    static getBusinessProfile(conn: any, jid: any): Promise<{
        jid?: undefined;
        address?: undefined;
        description?: undefined;
        website?: undefined;
        email?: undefined;
        category?: undefined;
    } | {
        jid: string;
        address: string | undefined;
        description: string | undefined;
        website: string | undefined;
        email: string | undefined;
        category: string | undefined;
    }>;
    /**
    * Serialize Message, so it easier to manipulate
    * @param {Object} m
    */
    static serializeM: (conn: any, m: any) => any;
    /**
    * Read message
    * @param {String} jid
    * @param {String|undefined|null} participant
    * @param {String} messageID
    */
    static chatRead(conn: any, jid: any, participant: any, messageID: any): Promise<any>;
    /**
      * Parses string into mentionedJid(s)
      * @param {String} text
      */
    static parseMention(text?: string): string[];
    /**
     * Add useful methods and utilities to the connection object
     * @param conn the connection
     */
    setupConnectionMethods(conn: any): void;
    /**
     * Setup event handlers
     * @param conn
     * @param store
     * @param logger
     * @param sessionId
     * @param saveCreds
     * @param isLegacy
     */
    setUpEvents(conn: any, store: any, logger: any, sessionId: string | undefined, saveCreds: any, isLegacy: any): Promise<false | undefined>;
}
//# sourceMappingURL=connection.d.ts.map
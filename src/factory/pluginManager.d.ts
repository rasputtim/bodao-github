/// <reference types="node" />
import { FSWatcher } from 'fs';
import type { Logger } from 'pino';
import { IPlugin, IPlugins } from '../factory/interfaces/intPlugin.js';
import { EQuotedReturnEnum, IMessageCore, TAGS } from './types/index.js';
declare type Callback = (error?: Error | Boolean, message?: any) => any;
interface IPluginSource {
    _files: string[];
    _folder: string;
    _loaded: boolean;
    _sources: IPluginFile[];
    constructor: Function;
    get folder(): string;
    get files(): string[];
    get sources(): IPluginFile[];
    get isLoaded(): boolean;
}
interface IPluginFile {
    _name: string;
    _folder: string;
    _content: any;
    constructor: Function;
    get name(): string;
    get folder(): string;
    get content(): any;
}
export declare class PluginFile implements IPluginFile {
    _name: string;
    _folder: string;
    _content: any;
    constructor(file: any);
    get name(): string;
    get folder(): string;
    get content(): any;
    set folder(v: string);
    set content(c: any);
}
export declare class localPlugins implements IPluginSource {
    _sources: IPluginFile[];
    _files: string[];
    _folder: string;
    _loaded: boolean;
    constructor(folder: any);
    get folder(): string;
    get files(): string[];
    get sources(): IPluginFile[];
    get isLoaded(): boolean;
}
export declare class restPlugins implements IPluginSource {
    _sources: IPluginFile[];
    _files: string[];
    _folder: string;
    _loaded: boolean;
    _callback: (s: IPluginSource) => Promise<void>;
    /**
     *
     * @param site site address to get the plugins ex.`http://localhost:8000/v1/bodao/plugins`
     * @param callback function to run when load is finished
     */
    constructor(site: string, callback: (s: IPluginSource) => Promise<void>);
    get folder(): string;
    get files(): string[];
    get sources(): IPluginFile[];
    get isLoaded(): boolean;
    getBodaoPluginList(): Promise<void>;
    getBodaoPlugin(pgname: any): Promise<unknown>;
}
export declare class PluginManager {
    static CommandsFromPluginsArray: any[];
    static pluginFilter: (filename: any) => boolean;
    static configFilter: (filename: any) => boolean;
    static _plugins: IPlugins;
    static _pluginTags: Set<TAGS>;
    static _configFiles: string[];
    static pluginConfigFolder: string;
    static pluginFolders: IPluginSource[];
    static restPluginLoad: boolean;
    static watcher: {
        [fileName: string]: FSWatcher;
    };
    static logger: Console | Logger;
    static filter: RegExp;
    private static _loadedAll;
    private static fn_id;
    static getCommandsAdapter(path: any): any;
    /**
     * Db  of commands for the plugin manager
     */
    static db: any;
    static start(): void;
    static get isAllLoaded(): boolean;
    static get pluginTags(): TAGS[];
    static addPluginFolder(folder: IPluginSource): void;
    static delPluginFolder(folder: any, alreadyClosed?: Boolean): IPluginSource[];
    static addPlugin(source: string | any, cb?: Callback): Promise<any>;
    static delPlugin(file: string): void;
    /**
     * Get all plugins for the specific tag
     * @param myTag the tag (group) to get plugins for
     * @returns an array with the plugins or null
     */
    static getPlufinsForTag(myTag: any): Array<any>;
    /**
  * Save Command To Database
  * @param {String} className
  * @param {String} fileName
  * @param {String} content
  * @returns {boolean}`true` if success
  */
    static saveCommand(className: any, fileName: any, commandName: any): boolean | undefined;
    /**
       * Get all plugins for the specific tag
       * @param myTag the tag (group) to get plugins for
       * @returns an array with the plugins or null
       */
    static getCommands(): Array<any>;
    /**
    * get plugin from the command index
    * @param commandindex
    */
    static getPlufinFromIndex(commandidx: any): IPlugin | null;
    static getPluginForCommand(theCommand: any): IPlugin[];
    /**
     * Load all tags in the _pluginTags variable
     * @param tag
     * @returns nothing
     */
    static getTagOptions(tag: any): void;
    /**
  * @param T the type/intergace of the class to get instance for Ex __Plugin
  * @param context the object with the class definition
  * @param name the name of the class
  * @param args the arguments of the class constructor
  * @returns the instance of the class
  */
    static getInstance<T>(context: any, name: object, ...args: any[]): T;
    /**
     * onde the plugin file is imported, this method create te plugin
     * @param obj the imported plugin file
     * @param filename the fiename of the imported plugin
     * @param index the index of the plugin, important the index must be unique
     */
    static createPlugin(obj: any, filename: any, index: any): void;
    /**
     * Load Plugins on the folder ./Plugins
     * to use imported modues use the sintax: let moduleName = PluginManager._plugins[filename].default;
     */
    static loadPlugins(folder: IPluginSource): Promise<void>;
    static reloadPlugins(_ev: any, filename: any): boolean | undefined;
    /**
   * save users database to file
   */
    static save(): void;
    /**
     * Disable Commnand/plugin for the entire bot
     * @param theCommand the command name for the plugin to disable
     * @returns true if it was disables with success
     */
    static disblePlugin(theCommand: string): boolean;
    static enablePluginByClassName(classname: any): boolean;
    static disablePluginByClassName(classname: any): boolean;
    static enablePlugin(theCommand: string): boolean;
    static showPluginInMenuByClassName(name: string): boolean;
    static showPluginInMenu(theCommand: string): boolean;
    static showNotPluginInMenuByClassName(name: string): boolean;
    static showNotPluginInMenu(theCommand: string): boolean;
    static reloadHandler(restatConn: any): boolean;
    static freezePlugins(): void;
}
export declare class PluginClass implements IPlugin {
    logger: Console | Logger;
    static defaultResourceModesCheckEnabled: {
        mode_limitcheck: boolean;
        mode_welcome: boolean;
        mode_viewonce: boolean;
        mode_simi: boolean;
        mode_leveling: boolean;
        mode_afk: boolean;
        mode_offline: boolean;
    };
    ResourceModesCheckEnabled: {
        mode_limitcheck: boolean;
        mode_welcome: boolean;
        mode_viewonce: boolean;
        mode_simi: boolean;
        mode_leveling: boolean;
        mode_afk: boolean;
        mode_offline: boolean;
    };
    static defaultSecurityModesCheckEnabled: {
        mode_ban: boolean;
        mode_fakes: boolean;
        mode_fakesgroup: boolean;
        mode_blacklist: boolean;
        mode_fun: boolean;
        mode_anti_virtex: boolean;
        mode_anti_link: boolean;
        mode_anti_linkgrou: boolean;
        mode_anti_foreign: boolean;
        mode_anti_porn: boolean;
        mode_anti_image: boolean;
        mode_anti_video: boolean;
        mode_anti_audio: boolean;
        mode_anti_words: boolean;
        mode_anti_flood: boolean;
        mode_anti_toxic: boolean;
        mode_anti_private: boolean;
        mode_kick: boolean;
        mode_safe: boolean;
    };
    SecurityModesCheckEnabled: {
        mode_ban: boolean;
        mode_fakes: boolean;
        mode_fakesgroup: boolean;
        mode_blacklist: boolean;
        mode_fun: boolean;
        mode_anti_virtex: boolean;
        mode_anti_link: boolean;
        mode_anti_linkgrou: boolean;
        mode_anti_foreign: boolean;
        mode_anti_porn: boolean;
        mode_anti_image: boolean;
        mode_anti_video: boolean;
        mode_anti_audio: boolean;
        mode_anti_words: boolean;
        mode_anti_flood: boolean;
        mode_anti_toxic: boolean;
        mode_anti_private: boolean;
        mode_kick: boolean;
        mode_safe: boolean;
    };
    static defaultPlaneModeCheckEnabled: import("./types/index.js").planeModeCheck_t;
    static defaultRegisterModeCheckEnabled: import("./types/index.js").registerModeCheck_t;
    static defaultOffensiveModeCheckEnabled: import("./types/index.js").offensiveModeCheck_t;
    PlaneModeCheckEnabled: import("./types/index.js").planeModePREMIUN | import("./types/index.js").planeModeCOMMON;
    RegisterModeCheckEnabled: import("./types/index.js").registerModeREGISTERED | import("./types/index.js").registerModeALL;
    OffensiveModeCheckEnabled: import("./types/index.js").offensiveModeNSFW | import("./types/index.js").offensiveModeSFW;
    static defaultUserPermitionsCheckEnabled: {
        bot_perm_controller: boolean;
        group_perm_admin: boolean;
        bot_perm_owner: boolean;
        bot_perm_admin: boolean;
        group_perm_moderator: boolean;
        bot_perm_creator: boolean;
    };
    UserPermitionsCheckEnabled: {
        bot_perm_controller: boolean;
        group_perm_admin: boolean;
        bot_perm_owner: boolean;
        bot_perm_admin: boolean;
        group_perm_moderator: boolean;
        bot_perm_creator: boolean;
    };
    static defaultMessagesCheckEnabled: {
        msg_quoted_check: boolean;
        msg_group_check: boolean;
        msg_parameter_check: boolean;
    };
    MessagesCheckEnabled: {
        msg_quoted_check: boolean;
        msg_group_check: boolean;
        msg_parameter_check: boolean;
    };
    static defaultMediaCheckEnabled: {
        media_video: boolean;
        media_sticker: boolean;
        media_audio: boolean;
        media_image: boolean;
        media_webp: boolean;
    };
    MediaCheckEnabled: {
        media_video: boolean;
        media_sticker: boolean;
        media_audio: boolean;
        media_image: boolean;
        media_webp: boolean;
    };
    static defaultQuotedMSGCheck: {
        enabled: boolean;
        type: EQuotedReturnEnum;
    };
    QuotedMSGCheck: {
        enabled: boolean;
        type: EQuotedReturnEnum;
    };
    CONFIGFILE: any;
    CONFIGFOLDER: string;
    tags: TAGS[];
    commandIndex: number;
    command: ReadonlyArray<string>;
    help: ReadonlyArray<string>;
    shortDesc: string;
    description: string;
    commandRegex: RegExp;
    usage: string | Function;
    private _showInMenu;
    private _runable;
    fail: null;
    constructor(configFilename?: string | null);
    /**
     * check if key is some property of the Pluginclass class and ,
     * if it is, return the correct property to be setted
     * @param key
     */
    getProperty(key: any): import("./types/index.js").offensiveModeNSFW | import("./types/index.js").offensiveModeSFW | import("./types/index.js").registerModeREGISTERED | import("./types/index.js").registerModeALL | import("./types/index.js").planeModePREMIUN | import("./types/index.js").planeModeCOMMON | {
        mode_ban: boolean;
        mode_fakes: boolean;
        mode_fakesgroup: boolean;
        mode_blacklist: boolean;
        mode_fun: boolean;
        mode_anti_virtex: boolean;
        mode_anti_link: boolean;
        mode_anti_linkgrou: boolean;
        mode_anti_foreign: boolean;
        mode_anti_porn: boolean;
        mode_anti_image: boolean;
        mode_anti_video: boolean;
        mode_anti_audio: boolean;
        mode_anti_words: boolean;
        mode_anti_flood: boolean;
        mode_anti_toxic: boolean;
        mode_anti_private: boolean;
        mode_kick: boolean;
        mode_safe: boolean;
    } | {
        bot_perm_controller: boolean;
        group_perm_admin: boolean;
        bot_perm_owner: boolean;
        bot_perm_admin: boolean;
        group_perm_moderator: boolean;
        bot_perm_creator: boolean;
    } | {
        msg_quoted_check: boolean;
        msg_group_check: boolean;
        msg_parameter_check: boolean;
    } | {
        media_video: boolean;
        media_sticker: boolean;
        media_audio: boolean;
        media_image: boolean;
        media_webp: boolean;
    } | {
        enabled: boolean;
        type: EQuotedReturnEnum;
    } | {
        mode_limitcheck: boolean;
        mode_welcome: boolean;
        mode_viewonce: boolean;
        mode_simi: boolean;
        mode_leveling: boolean;
        mode_afk: boolean;
        mode_offline: boolean;
    } | undefined;
    set conf(v: string);
    get conf(): string;
    get isRunable(): boolean;
    get isInMenu(): boolean;
    set runable(v: boolean);
    set showInMenu(v: boolean);
    toggleInMenu(): void;
    toggleRunable(): void;
    handler(m: IMessageCore): Promise<any>;
}
export {};
//# sourceMappingURL=pluginManager.d.ts.map
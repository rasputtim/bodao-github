import { IMessageCore, mediaChecks, messagesChecks, offensiveModeCheck_t, planeModeCheck_t, registerModeCheck_t, resourceModesCheck_t, securityModesCheck, TAGS, userPermCheck } from '../types/index.js';
export declare enum EQuotedReturnEnum {
    ANY = "default",
    AUD = "audio",
    VID = "video",
    STK = "sticker",
    IMG = "image",
    NONE = "none"
}
export declare enum EMediaConvertType {
    Audio = 1,
    Video = 2,
    Complex = 3
}
export interface IComUsage {
    name: string;
    value: number;
}
interface IHandlerFunc {
    (m: IMessageCore): Promise<any>;
}
export interface IPlugin {
    /**
     * check if the required parameter is present in the command
     */
    SecurityModesCheckEnabled: securityModesCheck;
    UserPermitionsCheckEnabled: userPermCheck;
    MessagesCheckEnabled: messagesChecks;
    MediaCheckEnabled: mediaChecks;
    QuotedMSGCheck: {
        enabled: boolean;
        type: EQuotedReturnEnum;
    };
    ResourceModesCheckEnabled: resourceModesCheck_t;
    PlaneModeCheckEnabled: planeModeCheck_t;
    RegisterModeCheckEnabled: registerModeCheck_t;
    OffensiveModeCheckEnabled: offensiveModeCheck_t;
    help: ReadonlyArray<string>;
    tags: ReadonlyArray<TAGS>;
    description: string;
    shortDesc: string;
    command: ReadonlyArray<string>;
    commandIndex: number;
    commandRegex: RegExp;
    usage: string | Function;
    showInMenu: boolean;
    runable: boolean;
    fail: any;
    constructor: Function;
    isRunable: boolean;
    isInMenu: boolean;
    fileName?: string;
    CONFIGFILE: string;
    toggleInMenu: Function;
    toggleRunable: Function;
    conf: string;
    /**
     * message to show when is missing the parameter for the current command
     */
    missingArgMsg?: string;
    handler: IHandlerFunc;
}
export interface IPlugins {
    [propName: string]: IPlugin;
}
export {};
//# sourceMappingURL=intPlugin.d.ts.map
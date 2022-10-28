import Chat from "../factory/chat";
import { CommandDescriptor_t, TAGS } from "../factory/types";
import User from "../factory/user";
declare const OwnerCommands: Array<CommandDescriptor_t>;
declare const FunCommands: Array<CommandDescriptor_t>;
declare const ModerationCommands: Array<CommandDescriptor_t>;
declare const BotCommands: Array<CommandDescriptor_t>;
declare const ConvertCommands: Array<CommandDescriptor_t>;
declare const AnimeCommands: Array<CommandDescriptor_t>;
declare const HentaiCommands: Array<CommandDescriptor_t>;
declare const FullModeCommands: Array<CommandDescriptor_t>;
declare const ArtCommands: Array<CommandDescriptor_t>;
declare const ReligionCommands: Array<CommandDescriptor_t>;
declare const CreatorCommands: Array<CommandDescriptor_t>;
declare const MandatoryCommands: Array<CommandDescriptor_t>;
declare const StickerCommands: Array<CommandDescriptor_t>;
declare const DownloadCommands: Array<CommandDescriptor_t>;
declare const UtilCommands: Array<CommandDescriptor_t>;
declare const commandsArray: Array<Array<CommandDescriptor_t>>;
export { commandsArray, BotCommands, ModerationCommands, OwnerCommands, CreatorCommands, ConvertCommands, FunCommands, AnimeCommands, HentaiCommands, FullModeCommands, ArtCommands, MandatoryCommands, ReligionCommands, StickerCommands, DownloadCommands, UtilCommands };
declare const CMode: {
    readonly OR: 0;
    readonly AND: 1;
};
declare type CommandMode = typeof CMode[keyof typeof CMode];
export default class CommandManager {
    static commandMode: CommandMode;
    static TAGS_Array: TAGS[];
    static isTAG(s: TAGS): boolean;
    /**
     * check if a string is a TAG
     * @param s
     * return the TAG (type) if the s parameter is a TAG or Null case not
     */
    static getIsTAG(s: string): TAGS | null;
    static isTAGBlockedToRun(chat: Chat, user: User, tag: TAGS): boolean;
    static isCommand(s: string): boolean;
    static isCommandBlockedToRun(chat: Chat, user: User, command: string): boolean;
}
//# sourceMappingURL=commands.d.ts.map
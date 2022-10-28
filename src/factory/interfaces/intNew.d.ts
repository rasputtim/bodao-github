declare type CommPromote = 'PromoteMember';
declare type CommDemote = 'DemoteMember';
declare type CommProfile = 'Profile';
declare type CommSerbot = 'Serbot';
declare type __Commands = CommPromote | CommDemote | CommProfile | CommSerbot;
declare type CommandGroup<__Command extends __Commands> = `Command_${__Command}`;
declare type AllCommandGroup = CommandGroup<CommPromote> | CommandGroup<CommDemote> | CommandGroup<CommProfile> | CommandGroup<CommSerbot>;
declare type PlugAntiSpan = 'antiSpan';
declare type PlugLevel = 'level';
declare type PlugLimit = 'limit';
declare type PlugRegister = 'register';
declare type PlugPremium = 'premium';
declare type __Plugins = PlugAntiSpan | PlugLevel | PlugLimit | PlugRegister | PlugPremium;
declare type PluginGroup<__Plugin extends __Plugins> = `Plugin_${__Plugin}`;
declare type AllPluginGroup = PluginGroup<PlugAntiSpan> | PluginGroup<PlugLevel> | PluginGroup<PlugLimit> | PluginGroup<PlugRegister> | PluginGroup<PlugPremium>;
declare type BotHandler = 'Bot';
declare type ModerationHandler = 'Moderation';
declare type OwnerHandler = 'Owner';
declare type CreatorHandler = 'Creator';
declare type ConvertHandler = 'Convert';
declare type FunHandler = 'Fun';
declare type AnimeHandler = 'Anime';
declare type HentaiHandler = 'Hentai';
declare type FullModeHandler = 'FullMode';
declare type ArtHandler = 'Art';
declare type MandatoryHandler = 'Mandator';
declare type ReligionHandler = 'Religio';
declare type StickerHandler = 'Sticker';
declare type UtilHandler = 'Util';
declare type DownloadHandler = 'Download';
declare type SearchHandler = 'Search';
declare type MiscHandler = 'Misc';
declare type LevelHandler = 'Level';
declare type RoughHandler = 'Rough';
declare type MasonicHandler = 'Masonic';
declare type Handlers = BotHandler | ModerationHandler | OwnerHandler | CreatorHandler | ConvertHandler | FunHandler | AnimeHandler | HentaiHandler | FullModeHandler | ArtHandler | MandatoryHandler | ReligionHandler | StickerHandler | UtilHandler | DownloadHandler | SearchHandler | MiscHandler | LevelHandler | RoughHandler | MasonicHandler;
declare type HandlerGroup<Handler extends Handlers> = `Handler_${Handler}`;
declare type AllHandlerGroup = HandlerGroup<BotHandler> | HandlerGroup<ModerationHandler>;
declare type FuelType = 'electrical' | 'petrol';
declare type AllFactoryGroups = AllCommandGroup | AllPluginGroup | AllHandlerGroup;
declare type GroupToPluginHandler<Group extends AllFactoryGroups> = Group extends AllHandlerGroup ? HandlerFactory : Group extends AllPluginGroup ? PluginFactory : Group extends AllCommandGroup ? CommandFactory : PluginFactory | HandlerFactory | CommandFactory;
interface IBotFactory<Group extends AllFactoryGroups> {
    create: (model: Group) => GroupToPluginHandler<Group> | null;
}
declare const isCommand: (com: any) => any;
declare const isHandler: (com: any) => any;
declare const isPlugin: (com: any) => any;
/**
 * This is our Creator
 */
declare class BotFactory implements IBotFactory<AllFactoryGroups> {
    private commandFactory;
    private handlerFactory;
    private pluginFactory;
    private isCommandGroup;
    private isHandlerGroup;
    private isPluginGroup;
    create<Group extends AllFactoryGroups>(pluginGroup: Group): GroupToPluginHandler<Group> | null;
}
/**
 * This is a ConcreteCreator
 */
declare class HandlerFactory implements IBotFactory<AllHandlerGroup> {
    create(pluginGroup: AllHandlerGroup): HandlerFactory | null;
}
/**
 * This is a ConcreteCreator
 */
declare class PluginFactory implements IBotFactory<AllPluginGroup> {
    create(pluginGroup: AllPluginGroup): PluginFactory | null;
}
/**
 * This is a ConcreteCreator
 */
declare class CommandFactory implements IBotFactory<AllCommandGroup> {
    create(pluginGroup: AllCommandGroup): CommandFactory | null;
}
/**
 * This is our Product
 */
declare abstract class Plugins<__Plugin extends AllPluginGroup> {
    plugin: __Plugin;
    private _help;
    private _command;
    private _onlyForGroups;
    private _canBeLimited;
    private _onlyForAdmins;
    private _isRunable;
    private _isMenuEnabled;
    private _name;
    private _type;
    private _description;
    private _usage;
    private _commandGroup;
    private _commandSubGroup;
    private _api;
    private _script;
    private _tags;
    constructor(plugin: __Plugin);
    drive(): void;
}
//# sourceMappingURL=intNew.d.ts.map
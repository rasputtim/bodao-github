"use strict";
const isCommand = (com) => {
    return com.startsWith('Command_');
};
const isHandler = (com) => {
    return com.startsWith('Handler_');
};
const isPlugin = (com) => {
    return com.startsWith('Plugin_');
};
/**
 * This is our Creator
 */
class BotFactory {
    constructor() {
        this.commandFactory = new CommandFactory();
        this.handlerFactory = new HandlerFactory();
        this.pluginFactory = new PluginFactory();
    }
    // private bmwFactory = new ModerationFactory();
    isCommandGroup(pluginGroup) {
        return isCommand(pluginGroup);
    }
    isHandlerGroup(pluginGroup) {
        return isHandler(pluginGroup);
    }
    isPluginGroup(pluginGroup) {
        return isPlugin(pluginGroup);
    }
    create(pluginGroup) {
        if (this.isCommandGroup(pluginGroup)) {
            return this.commandFactory.create(pluginGroup);
        }
        if (this.isHandlerGroup(pluginGroup)) {
            return this.handlerFactory.create(pluginGroup);
        }
        if (this.isPluginGroup(pluginGroup)) {
            return this.pluginFactory.create(pluginGroup);
        }
        return null;
    }
}
/**
 * This is a ConcreteCreator
 */
class HandlerFactory {
    create(pluginGroup) {
        switch (pluginGroup) {
            /*  case 'Bot_runSerbot':
                  return new Serbot();
              case 'Bot_showMyProfile':
                  return new showMyProfile();*/
            default:
                return null;
        }
    }
}
/**
 * This is a ConcreteCreator
 */
class PluginFactory {
    create(pluginGroup) {
        switch (pluginGroup) {
            case 'Plugin_antiSpan':
            //return new Serbot();
            case 'Plugin_level':
            //return new showMyProfile();*/
            default:
                return null;
        }
    }
}
/**
 * This is a ConcreteCreator
 */
class CommandFactory {
    create(pluginGroup) {
        switch (pluginGroup) {
            /*case 'Moderation_runPromoteMember':
                return new PromoteMember();
            case 'Moderation_runDemoteMember':
                return new DemoteMember();*/
            default:
                return null;
        }
    }
}
/**
 * This is our Product
 */
class Plugins {
    constructor(plugin) {
        //console.log(`Created the following plugin: ${brand} - ${this.model}`);
        this.plugin = plugin;
        this._help = [];
        this._command = /^(up|de)vote$/i;
        this._onlyForGroups = true;
        this._canBeLimited = true;
        this._onlyForAdmins = true;
        this._isRunable = true;
        this._isMenuEnabled = true;
        this._name = 'waifu';
        this._type = 'option';
        this._description = 'Anime fans call fictional female characters that they love and would marry if they were real';
        this._usage = 'waifu';
        this._commandGroup = 'Anime';
        this._commandSubGroup = '';
        this._api = '';
        this._script = 'runWaifu';
        this._tags = [];
    }
    drive() {
        //console.log(`${this.brand} [${this.model}] is driving with ${this.fuelType}`);
    }
}
/*
abstract class __Plugin extends Plugins<AllPluginGroup> {
    constructor(public model: HandlerGroup<BotHandler>) {
        super('Handler_Bot');
    }

    public specialBotFunction() {
        console.log('Only audi plugins can do this.')
    }
}

abstract class Handler extends Plugins<BotHandler> {
    constructor(public model: HandlerGroup<BotHandler>, public fuelType: FuelType) {
        super('Handler_Bot');
    }

    public specialBotFunction() {
        console.log('Only audi plugins can do thuis.')
    }
}


abstract class Command extends Plugins<ModerationHandler> {
    constructor(public model: HandlerGroup<ModerationHandler>, public fuelType: FuelType) {
        super('Moderation', model, fuelType);
    }

    public specialModerationFunction() {
        console.log('Only bmw plugins can do this.')
    }
}


// This is a ConcreteProduct

class showMyProfile extends Command {
    constructor() {
        super('Bot_showMyProfile', 'electrical');
    }
}


// This is a ConcreteProduct

class Serbot extends Command {
    constructor() {
        super('Bot_runSerbot', 'electrical');
    }
}

abstract class Moderation extends Plugins<ModerationHandler> {
    constructor(public model: HandlerGroup<ModerationHandler>, public fuelType: FuelType) {
        super('Moderation', model, fuelType);
    }

    public specialModerationFunction() {
        console.log('Only bmw plugins can do this.')
    }
}


 // This is a ConcreteProduct

class DemoteMember extends Moderation {
    constructor() {
        super('Moderation_runDemoteMember', 'electrical');
    }
}


// This is a ConcreteProduct

class PromoteMember extends Moderation {
    constructor() {
        super('Moderation_runPromoteMember', 'petrol');
    }
}

const pluginFactory = new PluginFactory();

const commandPlugins: AllFactoryGroups[] = ['Moderation_runPromoteMember', 'Bot_showMyProfile', 'Bot_runSerbot', 'Moderation_runDemoteMember'];

const plugins = commandPlugins.map(model => pluginFactory.create(model)?.drive());

const audi = pluginFactory.create('Bot_runSerbot');
const bmw = pluginFactory.create('Moderation_runPromoteMember');

audi?.specialBotFunction();
bmw?.specialModerationFunction()

*/ 
//# sourceMappingURL=intNew.js.map
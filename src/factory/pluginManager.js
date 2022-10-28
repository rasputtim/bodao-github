var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as fs from 'fs';
import { existsSync } from 'fs';
import lodash from 'lodash';
import { JSONFileSync, LowSync } from 'lowdb';
import { createRequire } from "module";
import path, { join, resolve } from 'path';
import syntaxerror from 'syntax-error';
import FileDB from '../basededatos/fileDatabase.js';
import _pino from '../factory/logger.js';
import CommandManager from '../messages/commands.js';
import Utils from './libs/functions.js';
import { EQuotedReturnEnum, OffensiveMode, PlaneMode, RegisterMode } from './types/index.js';
const MyPkg = JSON.parse(fs.readFileSync('package.json'));
const pkgType = MyPkg.main === 'index.ts' ? 'ts' : 'js';
const __dirname = path.resolve();
const require = createRequire(import.meta.url);
export class PluginFile {
    constructor(file) {
        this._folder = '';
        this._name = file;
    }
    ;
    get name() { return this._name; }
    get folder() { return this._folder; }
    get content() { return this._content; }
    set folder(v) { this._folder = v; }
    set content(c) { this._content = c; }
}
export class localPlugins {
    constructor(folder) {
        this._sources = [];
        this._loaded = false;
        this._folder = path.resolve(__dirname, folder);
        this._files = fs.readdirSync(this._folder).filter(PluginManager.pluginFilter);
        this._files.forEach((file => {
            const f = new PluginFile(file);
            this._sources.push(f);
            f.folder = this._folder;
            const pluginFile = path.join(this._folder, file);
            f.content = pluginFile;
        }));
        this._loaded = true;
    }
    get folder() {
        return this._folder;
    }
    get files() {
        return this._files;
    }
    get sources() { return this._sources; }
    get isLoaded() { return this._loaded; }
}
export class restPlugins {
    /**
     *
     * @param site site address to get the plugins ex.`http://localhost:8000/v1/bodao/plugins`
     * @param callback function to run when load is finished
     */
    constructor(site, callback) {
        this._sources = [];
        this._files = [];
        this._loaded = false;
        this._folder = site;
        this._callback = callback;
        this.getBodaoPluginList();
    }
    get folder() {
        return this._folder;
    }
    get files() {
        return this._files;
    }
    get sources() { return this._sources; }
    get isLoaded() { return this._loaded; }
    getBodaoPluginList() {
        return __awaiter(this, void 0, void 0, function* () {
            //wait server to load
            const result = yield Utils.fetchJson(this._folder, {});
            this._files = result;
            if (result && Array.isArray(result)) {
                for (let idx in result) {
                    const file = result[idx];
                    const f = new PluginFile(file);
                    const c = yield this.getBodaoPlugin(file);
                    this._sources.push(f);
                    f.content = c;
                    f.folder = this._folder;
                }
                this._loaded = true;
                yield this._callback(this);
            }
        });
    }
    getBodaoPlugin(pgname) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield Utils.fetchText(`${this._folder}/${pgname}`, {});
            //console.log(file)
            return file;
        });
    }
}
export class PluginManager {
    static getCommandsAdapter(path) {
        const adapter = new JSONFileSync(path);
        const dbCommands = new LowSync(adapter);
        dbCommands.read();
        //if there is no data create the db
        dbCommands.data || (dbCommands.data = { commandList: [] });
        dbCommands.write();
        dbCommands.chain = lodash.chain(dbCommands.data);
        return dbCommands;
    }
    static start() {
        const plf1 = join(__dirname, './src/plugins');
        //const plf2 =join(__dirname, '../plugins')
        if (!PluginManager.restPluginLoad) {
            //restPlugin Loading must wait for the server side of the rest to be loaded
            const pfl3 = new localPlugins('./bodao-github/plugins');
            //PluginManager.addPluginFolder(plf1)
            //PluginManager.addPluginFolder(plf2)
            PluginManager.addPluginFolder(pfl3);
            PluginManager._configFiles = fs.readdirSync(PluginManager.pluginConfigFolder).filter(PluginManager.configFilter);
            PluginManager.loadPlugins(pfl3);
        }
        else {
            const { bodaoPlugins } = JSON.parse(fs.readFileSync(FileDB.settingAPIDB));
            const pf = new restPlugins(bodaoPlugins, PluginManager.loadPlugins);
            PluginManager.addPluginFolder(pf);
            PluginManager._configFiles = fs.readdirSync(PluginManager.pluginConfigFolder).filter(PluginManager.configFilter);
        }
    }
    static get isAllLoaded() { return PluginManager._loadedAll; }
    static get pluginTags() { return Array.from(PluginManager._pluginTags); }
    static addPluginFolder(folder) {
        if (Utils.isUrl(folder.folder))
            PluginManager.pluginFolders.push(folder);
        if (!existsSync(folder.folder))
            return;
        let resolved = path.resolve(folder.folder);
        PluginManager.logger.info(resolved);
        if (resolved in PluginManager.watcher)
            return;
        PluginManager.pluginFolders.push(folder);
        /*
        PluginManager.pluginFolders[0].files.push(resolved)
    
        //need to filter the files
        let plugins = readdirSync(resolved)
        let loaded: Promise<any>[] = []
    
        //load plugins for this folder
        for (const plugin of plugins) {
          loaded.push(PluginManager.addPlugin(join(resolved, plugin)).catch(e => e))
        }
    
        
        fs.watch(filename, listener):fs.FSWatcher
    
      It will check for changes in a file and it will return an object fs.FSWatcher
      , where filename is a file o directory.
        listener is a callback function with two arguments, (eventType, filename), where eventType can be rename or change and filename is the file on the watch.
        options are optional.
    
        
        let watcher = fs.watch(resolved, async (_event, filename) => {
          try {
            if (!PluginManager.filter.test(filename)) return
            let dir = join(resolved, filename)
            if (dir in require.cache) {
              delete require.cache[dir]
              if (existsSync(dir)) {
                PluginManager.logger.info(`re - require plugin '${filename}' in ${folder}`)
                await PluginManager.addPlugin(dir)
              } else {
                PluginManager.logger.info(`deleted plugin '${filename}' in ${folder}`)
                return await PluginManager.delPlugin(dir)
              }
            } else PluginManager.logger.info(`requiring new plugin '${filename}' in ${folder}`)
            let err = false// syntaxerror(readFileSync(dir), filename)
            if (err) PluginManager.logger.error(`syntax error while loading '${filename}'\n${err} in ${folder}`)
            else await PluginManager.addPlugin(dir)
          } catch (e) {
            PluginManager.logger.error(`failed to add '${filename}' in ${folder}`, e)
          }
        })
     
        watcher.on('close', () => PluginManager.delPluginFolder(resolved, true))
    
        //add plugin to the watcher list
       
        Promise.all
        This method can be useful for aggregating the results of multiple promises.
        It is typically used when there are multiple related asynchronous tasks that the overall code relies on to work successfully — all of whom we want to fulfill before the code execution continues.
       
        PluginManager.watcher[resolved] = watcher
        return {
          watcher,
          loaded: Promise.all(loaded),
        } */
    }
    static delPluginFolder(folder, alreadyClosed = false) {
        let resolved = resolve(folder);
        if (!alreadyClosed)
            PluginManager.watcher[resolved].close();
        delete PluginManager.watcher[resolved];
        return PluginManager.pluginFolders.splice(PluginManager.pluginFolders[0].files.indexOf(resolved), 1);
    }
    static addPlugin(source, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof source === 'function' && 'prototype' in source) {
                let fn = 'prototype' in source ? new source : source;
                PluginManager._plugins[PluginManager.fn_id++] = fn;
                return typeof cb === 'function' ? cb(false, fn) : Promise.resolve(fn);
            }
            else {
                if (!PluginManager.filter.test(source))
                    return typeof cb === 'function' ? cb(true) : Promise.reject();
                let pathToFile = resolve(source);
                return Promise.resolve(import(source.replace('.js', '')))
                    .then(plugin => {
                    let module = 'default' in plugin ? plugin.default : plugin;
                    return 'prototype' in module ? new module : module;
                })
                    .then(plugin => {
                    PluginManager._plugins[pathToFile] = plugin;
                    if (typeof cb === 'function')
                        cb(false, plugin);
                    return plugin;
                });
            }
        });
    }
    static delPlugin(file) {
        let pathToFile = resolve(file);
        delete PluginManager._plugins[file];
        delete PluginManager._plugins[pathToFile];
    }
    /**
     * Get all plugins for the specific tag
     * @param myTag the tag (group) to get plugins for
     * @returns an array with the plugins or null
     */
    static getPlufinsForTag(myTag) {
        if (!PluginManager._plugins)
            return [];
        const plugins = new Set;
        Object.entries(PluginManager._plugins).forEach(([pluginFile, plugin], index) => {
            // 👇️ name Tom 0, country Chile 1
            PluginManager.logger.info(pluginFile, plugin, index);
            if (plugin && 'tags' in plugin) {
                const found = plugin.tags.find(t => t === myTag);
                if (found)
                    plugins.add(plugin);
            }
        });
        return Array.from(plugins);
    }
    /**
  * Save Command To Database
  * @param {String} className
  * @param {String} fileName
  * @param {String} content
  * @returns {boolean}`true` if success
  */
    static saveCommand(className, fileName, commandName) {
        var _a;
        try {
            PluginManager.db.read();
            const find = PluginManager.db.chain.get('commandList').find({ class: className }).value();
            if (find && find.class === className) {
                const getCommand = ((_a = PluginManager.db.chain.get('commandList').find({ class: className }).value()) === null || _a === void 0 ? void 0 : _a.commands) || [];
                const isIn = lodash.findIndex(getCommand, commandName);
                if (isIn != -1) {
                    return false;
                }
                else {
                    getCommand.push(commandName);
                    PluginManager.db.chain.get('commandList').find({ class: className }).set('commands', getCommand).value();
                    PluginManager.db.data = PluginManager.db.chain;
                    PluginManager.db.write();
                    return true;
                }
            }
            else {
                PluginManager.db.chain.get('commandList').push({ class: className, file: fileName, commands: [commandName] }).value();
                PluginManager.db.data = PluginManager.db.chain;
                PluginManager.db.write();
                return true;
            }
        }
        catch (err) {
            PluginManager.logger.error(err);
        }
    }
    /**
       * Get all plugins for the specific tag
       * @param myTag the tag (group) to get plugins for
       * @returns an array with the plugins or null
       */
    static getCommands() {
        if (!PluginManager._plugins)
            return [];
        const plugins = new Set;
        Object.entries(PluginManager._plugins).forEach(([pluginClassName, plugin], index) => {
            // 👇️ name Tom 0, country Chile 1
            PluginManager.logger.info(pluginClassName, plugin, index);
            if (plugin && 'command' in plugin)
                for (let tag of plugin.command) {
                    let obj = {
                        class: pluginClassName,
                        file: plugin.fileName ? plugin.fileName : '',
                        command: Array.from(plugin.command)
                    };
                    PluginManager.CommandsFromPluginsArray.push(obj);
                    plugin.command.forEach(com => {
                        PluginManager.saveCommand(pluginClassName, plugin.fileName, com);
                    });
                }
        });
        //fs.writeFileSync(FileDB.commandsDB, JSON.stringify(PluginManager.CommandsFromPluginsArray))
        return Array.from(PluginManager.CommandsFromPluginsArray);
    }
    /**
    * get plugin from the command index
    * @param commandindex
    */
    static getPlufinFromIndex(commandidx) {
        if (!PluginManager._plugins)
            return null;
        let retP = null;
        Object.entries(PluginManager._plugins).every(([pluginFile, plugin], index) => {
            // 👇️ name Tom 0, country Chile 1
            PluginManager.logger.info(pluginFile, plugin, index);
            if (plugin && 'commandIndex' in plugin && plugin.commandIndex === Number(commandidx)) {
                retP = plugin;
                return false;
            }
            else
                return true;
        });
        return retP;
    }
    static getPluginForCommand(theCommand) {
        return Object.keys(PluginManager._plugins)
            .filter(handler => {
            var commands = PluginManager._plugins[handler].command;
            if (!Array.isArray(commands)) {
                return PluginManager._plugins[handler].command === theCommand;
            }
            else {
                var teste = false;
                commands.forEach(com => {
                    if (com === theCommand) {
                        teste = true;
                    }
                });
                return teste;
            }
        })
            .map(userName => PluginManager._plugins[userName]);
    }
    /**
     * Load all tags in the _pluginTags variable
     * @param tag
     * @returns nothing
     */
    static getTagOptions(tag) {
        if (!PluginManager._plugins)
            return;
        Object.entries(PluginManager._plugins).forEach(([pluginFile, plugin], index) => {
            if (plugin && 'tags' in plugin)
                for (let tag of plugin.tags)
                    PluginManager._pluginTags.add(tag);
        });
    }
    /**
  * @param T the type/intergace of the class to get instance for Ex __Plugin
  * @param context the object with the class definition
  * @param name the name of the class
  * @param args the arguments of the class constructor
  * @returns the instance of the class
  */
    static getInstance(context, name, ...args) {
        var obj = Object.create(context.default.prototype);
        var instance = new obj.constructor(args);
        PluginManager.logger.info(`new instance plugin created: '${name['name']}'`);
        return instance;
    }
    /**
     * onde the plugin file is imported, this method create te plugin
     * @param obj the imported plugin file
     * @param filename the fiename of the imported plugin
     * @param index the index of the plugin, important the index must be unique
     */
    static createPlugin(obj, filename, index) {
        //obj.default.name is he name of the class
        //must garantte the plugin filename is the same as the name of theclass
        let filenameold = obj.default.name;
        let plugin = PluginManager._plugins[filename] = PluginManager.getInstance(obj, obj.default);
        PluginManager._plugins[filename].commandIndex = index;
        PluginManager._plugins[filename].fileName = filename;
        if (PluginManager.pluginFolders[0].files.length <= index) {
            PluginManager._loadedAll = true;
            // PluginManager.save()
        }
        //console.log(` ${obj.default.name}-msgParameter `,PluginManager._plugins['aniFrase'].MessagesCheckEnabled.msg_parameter_check)
        //create the tags array
        if (plugin && 'tags' in plugin)
            for (let tag of plugin.tags)
                PluginManager._pluginTags.add(tag);
    }
    /**
     * Load Plugins on the folder ./Plugins
     * to use imported modues use the sintax: let moduleName = PluginManager._plugins[filename].default;
     */
    static loadPlugins(folder) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = 1;
            if (PluginManager.pluginFolders[0])
                for (let idx in folder.files) {
                    try {
                        //const x = './teste.ts';
                        //     const a = await import(x);
                        // `a` is imported and can be used here
                        const filename = folder.files[idx];
                        let pluginFile;
                        let source;
                        if (!PluginManager.restPluginLoad) {
                            pluginFile = folder.sources[idx].content;
                        }
                        else {
                            source = folder.sources[idx].content;
                            pluginFile = path.join(__dirname, `./plugins/${filename}`); //must be thisf older in order to use the no
                            fs.writeFileSync(pluginFile, source);
                        }
                        //if the rest load plugin is enableb, load the plugin file from the rest API 
                        //and use the temp file
                        //pluginFile = 'file:///home/dono/projetos/Nodejs/Whatsapp-bots/websocket-based/bodao-websock/multimedia/temp/tempfile.js'
                        //pluginFile = `data:text/javascript,${source};`
                        try {
                            const test = fs.existsSync(pluginFile);
                            if (test) {
                                import(pluginFile).then((obj) => {
                                    //obj.default.name is he name of the class
                                    //must garantte the plugin filename is the same as the name of theclass
                                    let filenameold = obj.default.name;
                                    let plugin = PluginManager._plugins[filenameold] = PluginManager.getInstance(obj, obj.default);
                                    PluginManager._plugins[filenameold].commandIndex = index;
                                    PluginManager._plugins[filenameold].fileName = filename;
                                    if (PluginManager.pluginFolders[0].files.length <= index) {
                                        PluginManager._loadedAll = true;
                                        // PluginManager.save()
                                    }
                                    //console.log(` ${obj.default.name}-msgParameter `,PluginManager._plugins['aniFrase'].MessagesCheckEnabled.msg_parameter_check)
                                    //create the tags array
                                    if (plugin && 'tags' in plugin)
                                        for (let tag of plugin.tags)
                                            PluginManager._pluginTags.add(tag);
                                    //fs.unlinkSync( pluginFile)
                                });
                                //PluginManager.createPlugin(obj, filename, index)
                                index++;
                            }
                        }
                        catch (err) {
                            console.log(err.message);
                            PluginManager.logger.error(`loading error, e.g. if no such module: ${err}`);
                        }
                    }
                    catch (e) {
                        console.error(e);
                        delete PluginManager._plugins[idx];
                    }
                }
        });
    }
    static reloadPlugins(_ev, filename) {
        if (PluginManager.pluginFilter(filename)) {
            let dir = ''; //path.join(PluginManager.pluginFolders[0], filename)
            if (dir in require.cache) {
                delete require.cache[dir];
                if (fs.existsSync(dir))
                    console.info(`re - require plugin '${filename}'`);
                else {
                    console.warn(`deleted plugin '${filename}'`);
                    return delete PluginManager._plugins[filename];
                }
            }
            else
                console.info(`requiring new plugin '${filename}'`);
            let err = syntaxerror(fs.readFileSync(dir), filename);
            if (err)
                console.error(`syntax error while loading '${filename}'\n${err}`);
            else
                try {
                    PluginManager._plugins[filename] = require(dir);
                }
                catch (e) {
                    console.error(e);
                }
                finally {
                    PluginManager._plugins = Object.fromEntries(Object.entries(PluginManager._plugins).sort(([a], [b]) => a.localeCompare(b)));
                }
        }
    }
    /**
   * save users database to file
   */
    static save() {
        const stringfied = JSON.stringify(PluginManager._plugins);
        fs.writeFileSync(FileDB.pluginsDB, stringfied);
    }
    /**
     * Disable Commnand/plugin for the entire bot
     * @param theCommand the command name for the plugin to disable
     * @returns true if it was disables with success
     */
    static disblePlugin(theCommand) {
        const pg = PluginManager.getPluginForCommand(theCommand);
        const pgk = Object.keys(pg);
        const thePlugin = pg[0];
        const classname = thePlugin.constructor.name; //I could disable it by the classname
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.runable = false;
            return true;
        }
        else {
            return false;
        }
    }
    static enablePluginByClassName(classname) {
        const thePlugin = PluginManager._plugins[classname];
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.runable = true;
            return true;
        }
        else {
            return false;
        }
    }
    static disablePluginByClassName(classname) {
        const thePlugin = PluginManager._plugins[classname];
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.isRunable = false;
            return true;
        }
        else {
            return false;
        }
    }
    static enablePlugin(theCommand) {
        const pg = PluginManager.getPluginForCommand(theCommand);
        const pgk = Object.keys(pg);
        const thePlugin = pg[0];
        const classname = thePlugin.constructor.name; //Icluld disableit by the classname
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.runable = true;
            return true;
        }
        else {
            return false;
        }
    }
    static showPluginInMenuByClassName(name) {
        const thePlugin = PluginManager._plugins[name];
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.showInMenu = false;
            return true;
        }
        else {
            return false;
        }
    }
    static showPluginInMenu(theCommand) {
        const pg = PluginManager.getPluginForCommand(theCommand);
        const pgk = Object.keys(pg);
        const thePlugin = pg[0];
        const classname = thePlugin.constructor.name; //Icluld disableit by the classname
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.showInMenu = false;
            return true;
        }
        else {
            return false;
        }
    }
    static showNotPluginInMenuByClassName(name) {
        const thePlugin = PluginManager._plugins[name];
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.showInMenu = true;
            return true;
        }
        else {
            return false;
        }
    }
    static showNotPluginInMenu(theCommand) {
        const pg = PluginManager.getPluginForCommand(theCommand);
        const pgk = Object.keys(pg);
        const thePlugin = pg[0];
        const classname = thePlugin.constructor.name; //Icluld disableit by the classname
        if (thePlugin && typeof thePlugin === 'object') {
            thePlugin.showInMenu = true;
            return true;
        }
        else {
            return false;
        }
    }
    static reloadHandler(restatConn) {
        //let handler = imports('./handler')
        if (restatConn) {
            //try { global.conn.ws.close() } catch { }
            // global.conn = {
            //   ...global.conn, ...simple.makeWASocket(connectionOptions)
            //}
        }
        //if (!PluginManager.isInit) {
        //conn.ev.off('messages.upsert', conn.handler)
        //conn.ev.off('group-participants.update', conn.participantsUpdate)
        //conn.ev.off('message.delete', conn.onDelete)
        //conn.ev.off('connection.update', conn.connectionUpdate)
        //conn.ev.off('creds.update', conn.credsUpdate)
        // }
        //conn.welcome = 'Hallo Sayang\nSelamat datang wahai Member Baru, di grup @subject\n\n@desc'
        //conn.bye = 'Sipp! Beban Berkurang satu'
        //conn.spromote = '@user sekarang admin!'
        //conn.sdemote = '@user sekarang bukan admin!'
        ///conn.handler = handler.handler.bind(conn)
        //conn.participantsUpdate = handler.participantsUpdate.bind(conn)
        //conn.onDelete = handler.delete.bind(conn)
        //conn.connectionUpdate = connectionUpdate.bind(conn)
        //conn.credsUpdate = saveState.bind(conn)
        //conn.ev.on('messages.upsert', conn.handler)
        //conn.ev.on('group-participants.update', conn.participantsUpdate)
        //conn.ev.on('message.delete', conn.onDelete)
        // conn.ev.on('connection.update', conn.connectionUpdate)
        //conn.ev.on('creds.update', conn.credsUpdate)
        // isInit = false
        return true;
    }
    static freezePlugins() {
        //Object.freeze(reload)
        //fs.watch(path.join(__dirname, 'plugins'), reload)
        //PluginManager.reloadHandler()
    }
}
PluginManager.CommandsFromPluginsArray = [];
PluginManager.pluginFilter = filename => /\.js$/.test(filename);
PluginManager.configFilter = filename => /\.conf$/.test(filename);
//the object  container for the loaded plugins
PluginManager._plugins = {};
//tag list with all tags 
PluginManager._pluginTags = new Set;
PluginManager.pluginConfigFolder = FileDB.pluginsConfigFolder;
PluginManager.pluginFolders = [];
PluginManager.restPluginLoad = pkgType === 'js' ? true : false;
PluginManager.watcher = {};
PluginManager.logger = _pino.child({ class: 'plugin_manager' });
PluginManager.filter = /.js$/i;
PluginManager._loadedAll = false; //true when all files from plugin folder were loaded
PluginManager.fn_id = 0;
/**
 * Db  of commands for the plugin manager
 */
PluginManager.db = PluginManager.getCommandsAdapter(FileDB.commandsDB);
export class PluginClass {
    constructor(configFilename = null) {
        this.ResourceModesCheckEnabled = Object.assign({}, PluginClass.defaultResourceModesCheckEnabled);
        this.SecurityModesCheckEnabled = Object.assign({}, PluginClass.defaultSecurityModesCheckEnabled);
        this.PlaneModeCheckEnabled = Object.assign({}, PluginClass.defaultPlaneModeCheckEnabled);
        this.RegisterModeCheckEnabled = Object.assign({}, PluginClass.defaultRegisterModeCheckEnabled);
        this.OffensiveModeCheckEnabled = Object.assign({}, PluginClass.defaultOffensiveModeCheckEnabled);
        this.UserPermitionsCheckEnabled = Object.assign({}, PluginClass.defaultUserPermitionsCheckEnabled);
        this.MessagesCheckEnabled = Object.assign({}, PluginClass.defaultMessagesCheckEnabled);
        this.MediaCheckEnabled = Object.assign({}, PluginClass.defaultMediaCheckEnabled);
        this.QuotedMSGCheck = Object.assign({}, PluginClass.defaultQuotedMSGCheck);
        this.CONFIGFOLDER = PluginManager.pluginConfigFolder;
        this.tags = [];
        this.commandIndex = 0;
        this.command = [];
        this.help = [];
        this.shortDesc = '';
        this.description = '';
        this.commandRegex = /^()$/i;
        this.usage = '';
        this._showInMenu = true;
        this._runable = true;
        this.fail = null;
        this.logger = _pino.child({ class: 'PluginClass' });
        this.CONFIGFILE = configFilename ? path.join(this.CONFIGFOLDER, configFilename) : '';
        const child = Object.getPrototypeOf(this).constructor;
        //child class name
        const childName = child.name;
        if (PluginManager._configFiles.includes(childName + '.conf')) {
            this.CONFIGFILE = path.join(this.CONFIGFOLDER, childName + '.conf');
            this.conf = this.CONFIGFILE;
        }
    }
    /**
     * check if key is some property of the Pluginclass class and ,
     * if it is, return the correct property to be setted
     * @param key
     */
    getProperty(key) {
        if (Object.keys(this.ResourceModesCheckEnabled).includes(key)) {
            return this.ResourceModesCheckEnabled;
        }
        if (Object.keys(this.SecurityModesCheckEnabled).includes(key)) {
            return this.SecurityModesCheckEnabled;
        }
        if (Object.keys(this.PlaneModeCheckEnabled).includes(key)) {
            return this.PlaneModeCheckEnabled;
        }
        if (Object.keys(this.RegisterModeCheckEnabled).includes(key)) {
            return this.RegisterModeCheckEnabled;
        }
        if (Object.keys(this.OffensiveModeCheckEnabled).includes(key)) {
            return this.OffensiveModeCheckEnabled;
        }
        if (Object.keys(this.UserPermitionsCheckEnabled).includes(key)) {
            return this.UserPermitionsCheckEnabled;
        }
        if (Object.keys(this.MessagesCheckEnabled).includes(key)) {
            return this.MessagesCheckEnabled;
        }
        if (Object.keys(this.MediaCheckEnabled).includes(key)) {
            return this.MediaCheckEnabled;
        }
        if (Object.keys(this.QuotedMSGCheck).includes(key)) {
            return this.QuotedMSGCheck;
        }
    }
    set conf(v) {
        try {
            const child = Object.getPrototypeOf(this).constructor;
            //child class name
            const childName = child.name;
            const readFile = fs.readFileSync(v);
            const config = JSON.parse(readFile)[childName];
            let keys = Object.keys(config);
            if (keys.includes('ResourceModesCheckEnabled')) {
                this.ResourceModesCheckEnabled = Object.assign({}, config.ResourceModesCheckEnabled);
                delete config.ResourceModesCheckEnabled;
            }
            // else  this.ResourceModesCheckEnabled = PluginClass.defaultResourceModesCheckEnabled
            if (keys.includes('SecurityModesCheckEnabled')) {
                this.SecurityModesCheckEnabled = Object.assign({}, config.SecurityModesCheckEnabled);
                delete config.SecurityModesCheckEnabled;
            }
            //else this.SecurityModesCheckEnabled = PluginClass.defaultSecurityModesCheckEnabled 
            if (keys.includes('PlaneModeCheckEnabled')) {
                this.PlaneModeCheckEnabled = Object.assign({}, config.PlaneModeCheckEnabled);
                delete config.PlaneModeCheckEnabled;
            }
            //else this.PlaneModeCheckEnabled = PluginClass.defaultPlaneModeCheckEnabled 
            if (keys.includes('RegisterModeCheckEnabled')) {
                this.RegisterModeCheckEnabled = Object.assign({}, config.RegisterModeCheckEnabled);
                delete config.RegisterModeCheckEnabled;
            }
            //else this.RegisterModeCheckEnabled = PluginClass.defaultRegisterModeCheckEnabled
            if (keys.includes('OffensiveModeCheckEnabled')) {
                this.OffensiveModeCheckEnabled = Object.assign({}, config.OffensiveModeCheckEnabled);
                delete config.OffensiveModeCheckEnabled;
            }
            //else this.OffensiveModeCheckEnabled =  PluginClass.defaultOffensiveModeCheckEnabled
            if (keys.includes('UserPermitionsCheckEnabled')) {
                this.UserPermitionsCheckEnabled = Object.assign({}, config.UserPermitionsCheckEnabled);
                delete config.UserPermitionsCheckEnabled;
            }
            //else this.UserPermitionsCheckEnabled = PluginClass.defaultUserPermitionsCheckEnabled
            if (keys.includes('MessagesCheckEnabled')) {
                this.MessagesCheckEnabled = Object.assign({}, config.MessagesCheckEnabled);
                delete config.MessagesCheckEnabled;
            }
            //else this.MessagesCheckEnabled = PluginClass.defaultMessagesCheckEnabled
            if (keys.includes('MediaCheckEnabled')) {
                this.MediaCheckEnabled = Object.assign({}, config.MediaCheckEnabled);
                delete config.MediaCheckEnabled;
            }
            //else this.MediaCheckEnabled = PluginClass.defaultMediaCheckEnabled
            if (keys.includes('QuotedMSGCheck')) {
                this.QuotedMSGCheck = Object.assign({}, config.QuotedMSGCheck);
                delete config.QuotedMSGCheck;
            }
            //else this.QuotedMSGCheck = PluginClass.defaultQuotedMSGCheck
            if (keys.includes('tags')) {
                config.tags.forEach(element => {
                    if (CommandManager.isTAG(element)) {
                        this.tags.push(element);
                    }
                });
                delete config.tags;
            }
            //else this.tags = []
            //ReadOnly Property
            if (keys.includes('command')) {
                /*config.command.forEach(element => {
                  if(CommandManager.isCommand(element)) {
                    this.command.push(element)
                  }
                  
                });*/
                delete config.command;
            }
            //else this.command = []
            //ReadOnly Property
            if (keys.includes('help')) {
                /*config.help.forEach(element => {
                  
                    this.help.push(element)
                });
                */
                delete config.help;
            }
            //else this.help = []
            if (keys.includes('shortDesc')) {
                this.shortDesc = config.shortDesc;
                delete config.shortDesc;
            }
            //else this.shortDesc = ''
            if (keys.includes('description')) {
                this.description = config.description;
                delete config.description;
            }
            //else this.description = ''
            if (keys.includes('commandRegex')) {
                this.commandRegex = config.commandRegex;
                delete config.commandRegex;
            }
            //else this.commandRegex = ''
            if (keys.includes('usage')) {
                this.usage = config.usage;
                delete config.usage;
            }
            //else this.usage = ''
            if (keys.includes('fail')) {
                this.fail = config.fail;
                delete config.fail;
            }
            //else this.fail = null
            if (keys.includes('_showInMenu')) {
                this._showInMenu = config._showInMenu;
                delete config._showInMenu;
            }
            //else this._showInMenu = true
            if (keys.includes('_runable')) {
                this._runable = config._runable;
                delete config._runable;
            }
            if (keys.includes('commandIndex')) {
                delete config.commandIndex;
            }
            if (keys.includes('fileName')) {
                delete config.fileName;
            }
            if (keys.includes('logger')) {
                delete config.logger;
            }
            //else this._runable = true
            keys = Object.keys(config);
            if (keys.length > 0) {
                //============ load individual properties =============
                keys.forEach((key) => {
                    let prop = this.getProperty(key);
                    if (prop)
                        prop[key] = config[key];
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    get conf() {
        const stringfied = JSON.stringify(this);
        return stringfied;
    }
    get isRunable() { return this._runable; }
    get isInMenu() { return this._showInMenu; }
    set runable(v) { this._runable = v; }
    set showInMenu(v) { this._showInMenu = v; }
    toggleInMenu() {
        this._showInMenu ? false : true;
    }
    toggleRunable() {
        this._runable ? false : true;
    }
    handler(m) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
PluginClass.defaultResourceModesCheckEnabled = {
    mode_limitcheck: false,
    mode_welcome: false,
    mode_viewonce: false,
    mode_simi: false,
    mode_leveling: false,
    mode_afk: false,
    mode_offline: false,
};
PluginClass.defaultSecurityModesCheckEnabled = {
    mode_ban: false,
    mode_fakes: false,
    mode_fakesgroup: false,
    mode_blacklist: false,
    mode_fun: false,
    mode_anti_virtex: false,
    mode_anti_link: false,
    mode_anti_linkgrou: false,
    mode_anti_foreign: false,
    mode_anti_porn: false,
    mode_anti_image: false,
    mode_anti_video: false,
    mode_anti_audio: false,
    mode_anti_words: false,
    mode_anti_flood: false,
    mode_anti_toxic: false,
    mode_anti_private: false,
    mode_kick: false,
    mode_safe: false
};
PluginClass.defaultPlaneModeCheckEnabled = PlaneMode({ COMMON: true });
PluginClass.defaultRegisterModeCheckEnabled = RegisterMode({ ALL: true });
PluginClass.defaultOffensiveModeCheckEnabled = OffensiveMode({ SFW: true });
//user permissions
PluginClass.defaultUserPermitionsCheckEnabled = {
    bot_perm_controller: false,
    group_perm_admin: false,
    bot_perm_owner: false,
    bot_perm_admin: false,
    group_perm_moderator: false,
    bot_perm_creator: false
};
//messages checks
PluginClass.defaultMessagesCheckEnabled = {
    msg_quoted_check: false,
    msg_group_check: false,
    msg_parameter_check: false
};
// Media Checks
PluginClass.defaultMediaCheckEnabled = {
    media_video: false,
    media_sticker: false,
    media_audio: false,
    media_image: false,
    media_webp: false
};
//QuotedMsg Check
PluginClass.defaultQuotedMSGCheck = {
    enabled: false,
    type: EQuotedReturnEnum.NONE
};
//# sourceMappingURL=pluginManager.js.map
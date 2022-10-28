//import db from "./util/Database";
//import Plugins, { PluginClass } from "./util/PluginManager";
import esMain from 'es-main';
import { createRequire } from "module";
import { PluginManager } from './factory/pluginManager.js';
import UserAgentManager from './factory/userAgentsManager.js';
import Connection from './messages/connection.js';
//import { Server } from './server/server.mjs';
//import container from './server/container.mjs';
//const BodaoServer = container.resolve('server');
/*

*/
const require = createRequire(import.meta.url);
//const localeService = container.resolve('localeService');
//localeService.setLocale('pt-br')
PluginManager.start();
UserAgentManager.start();
// run in main file
//start();
/*  ES5
if (require.main === module) {
     // this module was run directly from the command line as in node xxx.js
     Connection.isModule = false
     var bot = new Connection
     bot.start()
} else {
     // this module was not run directly from the command line and probably loaded by something else
}*/
//ES6
if (esMain(import.meta)) {
    // The script was run directly.
    Connection.isModule = false;
    var bot = new Connection;
    //bot.createSession('bodao_bot')
    bot.init();
}
export default Connection;
//# sourceMappingURL=bodaomain.js.map
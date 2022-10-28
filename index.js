//import db from "./util/Database";
//import Plugins, { PluginClass } from "./util/PluginManager";
import CFonts from 'cfonts';
import cluster from 'cluster';
import dotenvSafe from 'dotenv-safe';
import esMain from 'es-main';
import * as fs from 'fs';
import { cpus } from 'node:os';
import process from 'node:process';
import path from 'path';
import Readline from 'readline';
import yargs from 'yargs';
import BodaoServer from './server/server.js';
import { PluginManager } from './src/factory/pluginManager.js';
import UserAgentManager from './src/factory/userAgentsManager.js';
import Connection from './src/messages/connection.js';
//import { Server } from './server/server.mjs';
//import container from './server/container.mjs';
dotenvSafe.config();
const MyPkg = JSON.parse(fs.readFileSync('package.json'));
const pkgType = MyPkg.main === 'index.ts' ? 'ts' : 'js';
//const BodaoServer = container.resolve('server');
/*
const Server = new BodaoServer();
Server.init().then(server => {
    //server.logger.info('Server running at:' + server.info.uri);
    console.log('Server running on: ',server.info.uri)
    //ES6
     if (esMain(import.meta)) {
     // The script was run directly.
     Connection.isModule = false
     var bot = new Connection
     bot.start()
     }
  }).catch(err => {
   // BodaoServer.logger.error(err);
   console.log('error: ',err)
  });
*/
const run = () => {
    console.log('Starting...');
    const isServerLoad = pkgType === 'js' ? false : true;
    if (process.env.MODE_CLUSTER === 'enabled') {
        const numCPUs = cpus().length;
        const __dirname = path.resolve();
        const rl = Readline.createInterface(process.stdin, process.stdout);
        function errorMsg() {
            console.error('Something must be wrong with the connection ...');
        }
        const timeouts = [];
        var isRunning = [false, false];
        const clusterMap = {};
        //https://medium.com/js-imaginea/clustering-inter-process-communication-ipc-in-node-js-748f981214e9
        /**
         * Start a js file
         * @param {String} file `path/to/file`
         */
        const start = (file, num) => {
            if (isRunning[num])
                return;
            isRunning[num] = true;
            let args = [path.join(__dirname, file), ...process.argv.slice(2)];
            CFonts.say([process.argv[0], ...args].join(' '), {
                font: 'console',
                align: 'center',
                gradient: ['red', 'magenta']
            });
            cluster.setupPrimary({
                exec: path.join(__dirname, file),
                args: args.slice(1),
            });
            if (cluster.isPrimary) {
                console.log('Master process is running with pid:', process.pid);
                clusterMap['primary ' + num] = process.pid;
                // Fork workers.
                for (let i = 0; i < numCPUs; i++) {
                    const customId = i + 100 + (num * 1000);
                    const worker = cluster.fork({ workerId: customId });
                    clusterMap[worker.id] = customId;
                }
            }
            else {
                console.log('Worker started with pid:', process.pid);
            }
            cluster.on('fork', (worker) => {
                console.log('worker is dead:', worker.isDead());
            });
            cluster.on('message', (worker, data) => {
                console.log('[RECEIVED]', data);
                switch (data) {
                    case 'reset':
                        worker.kill();
                        isRunning[num] = false;
                        start.apply(this, [file, num]);
                        break;
                    case 'uptime':
                        worker.send(process.uptime());
                        break;
                }
            });
            cluster.on('disconnect', (worker) => {
                console.log(`The worker #${worker.id} has disconnected`);
            });
            cluster.on('exit', (worker, code, signal) => {
                isRunning[num] = false;
                console.log('worker %d died (%s). restarting...', worker.process.pid, signal || code);
                if (code === 0)
                    return;
                fs.watchFile(args[0], () => {
                    fs.unwatchFile(args[0]);
                    start(file, num);
                });
            });
            cluster.on('fork', (worker) => {
                timeouts[worker.id] = setTimeout(errorMsg, 2000);
            });
            let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());
            if (!opts['test'])
                if (!rl.listenerCount('message'))
                    rl.on('line', line => {
                        cluster.emit('message', line.trim());
                    });
            // console.log(p)
        };
        if (isServerLoad)
            start('dist/server/servermain.js', 0);
        start('dist/src/bodaomain.js', 1);
    }
    else {
        UserAgentManager.start();
        if (isServerLoad) {
            const Server = new BodaoServer();
            Server.init().then(server => {
                //server.logger.info('Server running at:' + server.info.uri);
                console.log('Server running on: ', server.info.uri);
                PluginManager.start();
                //ES6
                if (esMain(import.meta)) {
                    // The script was run directly.
                    Connection.isModule = false;
                    var bot = new Connection;
                    //bot.createSession('bodao_bot')
                    bot.init();
                }
            }).catch(err => {
                // BodaoServer.logger.error(err);
                console.log('error: ', err);
            });
        }
        else {
            PluginManager.start();
            //ES6
            if (esMain(import.meta)) {
                // The script was run directly.
                Connection.isModule = false;
                var bot = new Connection;
                //bot.createSession('bodao_bot')
                bot.init();
            }
        }
    }
};
try {
    run();
}
catch (err) {
    console.log('error: ', err);
    console.log('lets restart the bot');
    run();
}
//# sourceMappingURL=index.js.map
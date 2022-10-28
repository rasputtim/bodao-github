import moment from 'moment-timezone';
import path from 'path';
import pinoLogger from 'pino';
moment.tz.setDefault('America/Sao_Paulo').locale('pt-br');
//https://betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/
const __dirname = path.resolve();
const levels = {
    trace: 90,
    emerg: 80,
    alert: 70,
    crit: 60,
    error: 50,
    warn: 40,
    notice: 30,
    info: 20,
    debug: 10,
};
/*const streams = [
     { stream: process.stdout }
     ]
const streams2 = Object.keys(levels).map((level) => {
     return {
               level: level,
               stream: pinoLogger.destination(`${__dirname}/logging/app-${level}.log`),
          };
     });
Array.prototype.push.apply(streams,streams2);

//orig pinoLogger({  })

const _pino = pinoLogger(
  {
    transport: { target: 'pino-pretty' },
    prettyPrint: { levelFirst: true, ignore: 'hostname', translateTime: true },
    level: process.env.PINO_LOG_LEVEL || 'debug',
    customLevels: levels,
    useOnlyCustomLevels: true,
    timestamp: () => { return ', "time":' +  moment().format('DD/MM/YY HH:mm:ss')},
    formatters: {
      level: (label) => {
        return { level: label };
      },
    },
  },

  pinoLogger.multistream(streams, {
     levels,
     dedupe: true,
   })
);
*/
const FILE_TARGETS = Object.keys(levels).map((level) => {
    return {
        level: level,
        target: `${__dirname}/src/factory/transports/transport-${level}.mjs`,
        options: { destination: `${__dirname}/logging/app-${level}.log` }
    };
});
const THE_TARGETS = [
    {
        //level: 'info',
        target: 'pino-pretty' // must be installed separately
    },
    {
        level: 'info',
        target: `${__dirname}/src/factory/transports/transport-info.mjs`,
        options: { destination: `${__dirname}/logging/app-info.log` }
    },
    {
        level: 'error',
        target: `${__dirname}/src/factory/transports/transport-error.mjs`,
        options: { destination: `${__dirname}/logging/app-error.log` }
    },
    {
        level: 'warn',
        target: `${__dirname}/src/factory/transports/transport-warn.mjs`,
        options: { destination: `${__dirname}/logging/app-warn.log` }
    },
    {
        level: 'notice',
        target: `${__dirname}/src/factory/transports/transport-notice.mjs`,
        options: { destination: `${__dirname}/logging/app-notice.log` }
    },
    {
        level: 'crit',
        target: `${__dirname}/src/factory/transports/transport-crit.mjs`,
        options: { destination: `${__dirname}/logging/app-crit.log` }
    },
    {
        level: 'emerg',
        target: `${__dirname}/src/factory/transports/transport-emerg.mjs`,
        options: { destination: `${__dirname}/logging/app-emerg.log` }
    },
    {
        level: 'alert',
        target: `${__dirname}/src/factory/transports/transport-alert.mjs`,
        options: { destination: `${__dirname}/logging/app-alert.log` }
    },
    {
        level: 'debug',
        target: `${__dirname}/src/factory/transports/transport-debug.mjs`,
        options: { destination: `${__dirname}/logging/app-debug.log` }
    },
    {
        level: 'trace',
        target: `${__dirname}/src/factory/transports/transport-trace.mjs`,
        options: { destination: `${__dirname}/logging/app-trace.log` }
    }
];
const transports = pinoLogger.transport({
    targets: THE_TARGETS,
    levels: levels
});
const _pino = pinoLogger(transports);
export default _pino;
/**
 * logger.fatal('fatal');
logger.error('error');
logger.warn('warn');
logger.info('info');
logger.debug('debug');
logger.trace('trace');
 */ 
//# sourceMappingURL=logger.js.map
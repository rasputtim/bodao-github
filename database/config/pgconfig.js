
import moment from 'moment';
import path from 'path';
const __dirname = path.resolve();
export const Config = {
    debug:true,
    winston: {
        /**
         * The File transport supports a variety of file writing options. If you are looking for daily log rotation see DailyRotateFile

            level: Level of messages that this transport should log (default: level set on parent logger).
            silent: Boolean flag indicating whether to suppress output (default false).
            eol: Line-ending character to use. (default: os.EOL).
            filename: The filename of the logfile to write output to.
            maxsize: Max size in bytes of the logfile, if the size is exceeded then a new file is created, a counter will become a suffix of the log file.
            maxFiles: Limit the number of files created when the size of the logfile is exceeded.
            tailable: If true, log files will be rolled based on maxsize and maxfiles, but in ascending order. The filename will always have the most recent log lines. The larger the appended number, the older the log file. This option requires maxFiles to be set, or it will be ignored.
            maxRetries: The number of stream creation retry attempts before entering a failed state. In a failed state the transport stays active but performs a NOOP on it's log function. (default 2)
            zippedArchive: If true, all log files but the current one will be zipped.
            options: options passed to fs.createWriteStream (default {flags: 'a'}).
            stream: DEPRECATED The WriteableStream to write output to.

         */
        file: {
          level: 'info',
          filename: `${__dirname}/logging/macfacil.log`,
          handleExceptions: true,
          json: true,
          maxsize: 5242880, // 5MB
          maxFiles: 5/*,
          colorize: false,*/
        },
        /**
         * 
            level: Level of messages that this transport should log (default: level set on parent logger).
            silent: Boolean flag indicating whether to suppress output (default false).
            eol: string indicating the end-of-line characters to use (default os.EOL)
            stderrLevels Array of strings containing the levels to log to stderr instead of stdout, for example ['error', 'debug', 'info']. (default [])
            consoleWarnLevels Array of strings containing the levels to log using console.warn or to stderr (in Node.js) instead of stdout, for example ['warn', 'debug']. (default [])

         */
        console: {
          level: 'debug'/*,
          handleExceptions: true,
          json: false,
          colorize: true,*/
        },
        rotate: {
          level: 'debug',
          prettyPrint: true,
          silent: false,
          colorize: false,
          filename: `${__dirname}/logging/macfacil-rotate.log`,
          timestamp: () => moment(new Date()).format('YYYY-MM-DD hh:mm:ss'),
          json: false,
          maxFiles: 10,
          datePattern: '.yyyy-MM-dd',
        }
      }

}


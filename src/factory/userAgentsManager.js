var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/*
Si
*/
import * as fs from 'fs';
import { createRequire } from "module";
import path from 'path';
import FileDB from '../basededatos/fileDatabase.js';
import _pino from '../factory/logger.js';
import Utils from './libs/functions.js';
const __dirname = path.resolve();
const require = createRequire(import.meta.url);
export default class UserAgentManager {
    /**
     *
     */
    static start() {
        UserAgentManager._Files = fs.readdirSync(UserAgentManager._Folder).filter(UserAgentManager.agentsFilter);
        UserAgentManager.load();
        if (UserAgentManager._userAgents.length > 0)
            UserAgentManager._loadedAll = true;
    }
    /**
    * Load user agents in the files of the usrAgentFilesFolder
    */
    static load() {
        return __awaiter(this, void 0, void 0, function* () {
            let index = 1;
            for (let filename of UserAgentManager._Files) {
                try {
                    const theFile = path.join(UserAgentManager._Folder, filename);
                    const readFile = fs.readFileSync(theFile);
                    const fileContent = JSON.parse(readFile);
                    if (Array.isArray(fileContent) && fileContent.length > 0) {
                        fileContent.forEach((reg) => {
                            UserAgentManager._userAgents.push(reg);
                        });
                    }
                }
                catch (error) {
                    Utils.treatError(error, UserAgentManager.logger);
                }
            }
        });
    }
    static getRandomAgent() {
        if (UserAgentManager._loadedAll) {
            return Utils.selectRamdomFromArray(UserAgentManager._userAgents);
        }
    }
}
/**
 * User agent files of user agents
 */
UserAgentManager._Folder = FileDB.userAgentsFolder;
/**
 * User agent files loaded from the _userAgentFilesFolder
 */
UserAgentManager._Files = [];
/**
 * Filtered User agents to use
 */
UserAgentManager._userAgents = [];
UserAgentManager.agentsFilter = filename => /\.json$/.test(filename);
UserAgentManager.logger = _pino.child({ class: 'userAgents_manager' });
UserAgentManager._loadedAll = false; //true when all files from agents folder were loaded
//# sourceMappingURL=userAgentsManager.js.map
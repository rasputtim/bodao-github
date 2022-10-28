import type { Logger } from 'pino';
export default class UserAgentManager {
    /**
     * User agent files of user agents
     */
    static _Folder: string;
    /**
     * User agent files loaded from the _userAgentFilesFolder
     */
    static _Files: string[];
    /**
     * Filtered User agents to use
     */
    static _userAgents: string[];
    static agentsFilter: (filename: any) => boolean;
    static logger: Console | Logger;
    private static _loadedAll;
    /**
     *
     */
    static start(): void;
    /**
    * Load user agents in the files of the usrAgentFilesFolder
    */
    static load(): Promise<void>;
    static getRandomAgent(): any;
}
//# sourceMappingURL=userAgentsManager.d.ts.map
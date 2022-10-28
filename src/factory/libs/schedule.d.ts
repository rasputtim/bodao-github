import { JobCallback } from 'node-schedule';
import type { Logger } from 'pino';
export default class Schedule {
    static logger: Console | Logger;
    static _systemJobFunctions: {
        time: string;
        func: JobCallback;
    }[];
    static getJobListAdapter(): any;
    static db: any;
    static systemJob: (time: string, callback: JobCallback) => void;
    static futureMilis: (client: any, msg: any, content: any, milis: any, isQuoted: any) => Promise<unknown>;
    static loadJob: (client: any, from: any, quotedId: any, content: any, date: any, isQuoted: any) => Promise<unknown>;
    static sendMsg: (client: any, isQuoted: any, from: any, txt: any, quotedId: any) => Promise<unknown>;
    static delJob: (from: any, date: any) => Promise<unknown>;
    static saveJob: (from: any, quotedId: any, content: any, date: any, isQuoted: any) => Promise<unknown>;
}
//# sourceMappingURL=schedule.d.ts.map
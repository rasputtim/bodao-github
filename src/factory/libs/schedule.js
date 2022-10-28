var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Cron not cron job message wkwkw
 */
import lodash from 'lodash';
import { JSONFileSync, LowSync } from 'lowdb';
import { scheduleJob } from 'node-schedule';
import path from 'path';
import FileDB from '../../basededatos/fileDatabase.js';
import _pino from '../../factory/logger.js';
const __dirname = path.resolve();
export default class Schedule {
    static getJobListAdapter() {
        const adapter = new JSONFileSync(FileDB.jobListDB);
        const dbSchedule = new LowSync(adapter);
        dbSchedule.read();
        dbSchedule.data || (dbSchedule.data = { jobs: [] });
        dbSchedule.write();
        dbSchedule.chain = lodash.chain(dbSchedule.data);
        return dbSchedule;
    }
}
Schedule.logger = _pino.child({ class: 'scheduller-class' });
Schedule._systemJobFunctions = [];
Schedule.db = Schedule.getJobListAdapter();
/*
time =
*    *    *    *    *    *
┬    ┬    ┬    ┬    ┬    ┬
│    │    │    │    │    │
│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
│    │    │    │    └───── month (1 - 12)
│    │    │    └────────── day of month (1 - 31)
│    │    └─────────────── hour (0 - 23)
│    └──────────────────── minute (0 - 59)
└───────────────────────── second (0 - 59, OPTIONAL)
*/
Schedule.systemJob = (time, callback) => {
    Schedule._systemJobFunctions.push({ time: time, func: callback });
    scheduleJob(time, callback);
};
Schedule.futureMilis = (client, msg, content, milis, isQuoted) => new Promise((resolve, reject) => {
    const when = new Date(Date.now() + milis);
    if (when == null)
        reject(`futureMilis returned` + false);
    scheduleJob(when, function (txt) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Schedule.sendMsg(client, isQuoted, msg.from, txt, isQuoted ? msg.quotedMsgObj.id : null).catch(e => reject(e));
            Schedule.delJob(msg.from, when);
        });
    }.bind(null, content));
    const quotedId = isQuoted ? msg.quotedMsgObj.id : null;
    Schedule.saveJob(msg.from, quotedId, content, when, isQuoted);
    resolve(true);
});
Schedule.loadJob = (client, from, quotedId, content, date, isQuoted) => new Promise((resolve, reject) => {
    var now = new Date();
    var dateJob = new Date(date);
    if (dateJob === null)
        reject(`loadJob returned` + false);
    if (dateJob <= now || dateJob === null) {
        Schedule.delJob(from, date);
        resolve(true);
    }
    scheduleJob(dateJob, function (txt) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Schedule.sendMsg(client, isQuoted, from, txt, quotedId).catch(e => reject(e));
            Schedule.delJob(from, date);
        });
    }.bind(null, content));
    resolve(true);
});
Schedule.sendMsg = (client, isQuoted, from, txt, quotedId) => new Promise((resolve, reject) => {
    var _a;
    var content = txt.replace(/@\d+/g, '');
    if (!isQuoted) {
        client.sendText(from, content).catch(e => reject(e));
    }
    else {
        client.reply(from, content, quotedId).catch(e => reject(e));
    }
    const mentions = (_a = txt.trim().match(/@\d+/g)) !== null && _a !== void 0 ? _a : 0;
    if (mentions !== 0) {
        let res = 'Mentions: ';
        mentions.forEach(m => {
            res += `${m} `;
        });
        client.this.ch.sendTextWM(res).catch(e => reject(e));
    }
    Schedule.logger.info(`ScheduledJob from ${from} Launched`);
    resolve(true);
});
Schedule.delJob = (from, date) => new Promise((resolve, reject) => {
    try {
        const res = Schedule.db.chain.get('jobs').remove({ from: from, date: date }).value();
        Schedule.db.write();
        resolve(res);
    }
    catch (e) {
        reject(e);
    }
});
Schedule.saveJob = (from, quotedId, content, date, isQuoted) => new Promise((resolve, reject) => {
    try {
        const res = Schedule.db.chain.get('jobs').push({
            from: from,
            quotedId: quotedId,
            content: content,
            date: date,
            isQuoted: isQuoted
        }).value();
        Schedule.db.write();
        resolve(res);
    }
    catch (e) {
        reject(e);
    }
});
//# sourceMappingURL=schedule.js.map
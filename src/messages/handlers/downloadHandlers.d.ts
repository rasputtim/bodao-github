import type { Logger } from 'pino';
import { IMessageCore } from '../../factory/types/index.js';
export declare class downloadHandlers {
    static logger: Console | Logger;
    _super: IMessageCore;
    _client: any;
    sendMentionedMessage: any;
    mySendMessage: any;
    sender: any;
    ownerNumber: any;
    isBanModeOn: any;
    isOwner: any;
    isFromME: any;
    isCREATOR: any;
    client: any;
    pStore: any;
    msg: any;
    msg_serial: any;
    from: any;
    type: any;
    constructor(_super: IMessageCore);
    handler(): Promise<void>;
}
//# sourceMappingURL=downloadHandlers.d.ts.map
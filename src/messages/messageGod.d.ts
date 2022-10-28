import MessageCore from '../messages/message.js';
declare class MessageGod extends MessageCore {
    _super: any;
    client: any;
    pMessage: any;
    pStore: any;
    constructor(client: any, pMessage: any, pStore: any);
    /**
     * Build Build the teslaGod Object and runs the async stuff
     * @param {*} client
     * @param {*} pMessage
     * @param {*} pStore
     * @returns the MessageGod object
     */
    static build(client: any, pMessage: any, pStore: any): Promise<MessageGod>;
    default(): Promise<void>;
    handler(): Promise<void>;
}
export default MessageGod;
//# sourceMappingURL=messageGod.d.ts.map
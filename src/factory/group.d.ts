import { GroupMetadata, GroupParticipant } from "@adiwajshing/baileys";
import type { Logger } from 'pino';
import { IMessageCore } from "./types/index.js";
export default class Group {
    static db: any;
    static _groups: Group[];
    static _updateTime: number;
    static UPDATE_INTERVAL: number;
    static defaultParticipant: GroupParticipant;
    static defaultMetaData: GroupMetadata;
    private static _timeLimit;
    static _conn: any;
    _metadata: GroupMetadata;
    _participants: GroupParticipant[];
    _lastUpdated: number;
    _admins: GroupParticipant[];
    _superAdmins: GroupParticipant[];
    _isBotAdmin: boolean;
    _isBotSuperAdmin: boolean;
    _id: string;
    _isGroupAdm: boolean;
    _isBotGroupAdmin: boolean;
    logger: Console | Logger;
    constructor(chatId: any, obj?: Group | null);
    _parse(obj: any): void;
    static _isGroup(GroupId: any): boolean;
    /**
     *
     * @returns true if it is a group Chat
     */
    get isGroup(): boolean;
    static set conn(v: any);
    static getAdapter(path: any): any;
    /**
    * return true if the passed metadata is the default one.
    * this indicates that it was not possible to load the correct values from WA
    * @param metadata
    * @returns return true if the passed metadata is the default one.
    */
    static isDefaultMetadata(metadata: GroupMetadata): boolean;
    /**
     * Description placeholder
     * @date 11/07/2022 - 00:30:11
     * return true if the object have real metadata received from WA
     * @static
     * @readonly
     * @type {boolean}
     */
    get isRealMetadataLoaded(): boolean;
    /**
     * Return true if it passed more tha Group.upDateTime since last update of the _groupMetaData
     * @date 11/07/2022 - 23:12:53
     *
     * @readonly
     * @type {boolean}
     */
    get isPast(): boolean;
    static get GroupChain(): any;
    static getGroupForChat(chatId: any): Group | null;
    static loadObjects(): Group[];
    loadDataFromWA(): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    getGroupMetaData(este: IMessageCore): Promise<GroupMetadata | null>;
    ReloadMetadata(): Promise<false | undefined>;
    static ReloadAllMetadata(): Promise<void>;
    getGroupMembers(este: IMessageCore): Promise<GroupParticipant[] | null>;
    getGroupAdmins(): Promise<GroupParticipant[]>;
    /**
     *
     * @param este Message
     * @returns true if the sender of the mesasage is Group Admin
     */
    isBotGroupAdmin(este: IMessageCore): Promise<boolean>;
    /**
     * Save this class to File
     */
    save(): void;
    /**
     * Save the Passed Class to file
     * @param Classe group to save in database
     * @returns
     */
    static saveGroup(Classe: Group): boolean;
    /**
     * Save the entire memory database to file
     * @returns the LowSync Adapter
     */
    static saveGroups(): any;
    /**
     * return true if the group is loaded in database
     * @param groupId the id of the group
     * @returns
     */
    static isGroupInDatabase(groupId: any): Group | false;
    /**
     * Update Group Metadata
     * @param groupId the id of the group to update data
     * @param grData the data
     * @returns
     */
    static updateGroupData(groupId: any, grData: Partial<GroupMetadata>): false | undefined;
    get id(): string;
    get metadata(): GroupMetadata;
    isSenderAdmin(userId: any): boolean;
    isBotAdmin(botId: any): boolean;
    get groupAdmins(): GroupParticipant[];
    get participants(): GroupParticipant[];
    getMetaData(): Promise<any>;
    join(inviteCode: any): Promise<any>;
    leave(): Promise<any>;
    getInviteCode(): Promise<any>;
    groupRevokeInvite(): Promise<any>;
    getInfo(inviteCode: any): Promise<any>;
    static _joinInviteMessage(conn: any, groupId: any, groupInviteMessage: any): Promise<any>;
    joinInviteMessage(groupInviteMessage: any): Promise<any>;
    groupToggleEphemeral(expiration: any): Promise<any>;
    static create(conn: any, title: string, participants: string[], welcome?: boolean): Promise<{
        (): Promise<void>;
        <T>(value: T | PromiseLike<T>): Promise<T>;
    } | undefined>;
    addMember(participants: string[]): Promise<any>;
    demoteMember(participants: string[]): Promise<any>;
    prometoMember(participants: string[]): Promise<any>;
    changeSubject(New_Subject: string): Promise<void>;
    changeDescription(New_Description: string): Promise<void>;
}
//# sourceMappingURL=group.d.ts.map
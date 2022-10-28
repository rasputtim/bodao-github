var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import lodash from "lodash";
import { JSONFileSync, LowSync } from "lowdb";
import FileDB from "../basededatos/fileDatabase.js";
import MessageCore from "../messages/message.js";
import Chat from "./chat.js";
import Utils from "./libs/functions.js";
import _pino from './logger.js';
export default class Group {
    constructor(chatId, obj = null) {
        //_groupMetadata:GroupMetadata | null = null
        this._metadata = Object.assign({}, Group.defaultMetaData);
        //_groupMembers:GroupParticipant[] | null = null
        this._participants = [];
        this._lastUpdated = 0;
        //_groupAdmins = [] as string[]
        this._admins = [];
        this._superAdmins = [];
        this._isBotAdmin = false;
        this._isBotSuperAdmin = false;
        //_isRealData:boolean = false  //quicker way than isRealMetadataLoaded
        this._id = '';
        this._isGroupAdm = false; //if the sender is a group dmin
        this._isBotGroupAdmin = false; //if the bot is a group admin
        this._id = chatId;
        this.logger = _pino.child({ class: chatId });
        if (obj && obj._id)
            this._parse(obj);
    }
    _parse(obj) {
        if (!Group._conn)
            Group._conn = obj ? obj._client : null;
    }
    static _isGroup(GroupId) {
        if (!GroupId || typeof GroupId !== 'string')
            return false;
        return GroupId.includes('@g.us');
    }
    /**
     *
     * @returns true if it is a group Chat
     */
    get isGroup() { return this._id ? this._id.includes('@g.us') : false; }
    static set conn(v) { Group._conn = v; }
    static getAdapter(path) {
        const adapter = new JSONFileSync(path);
        const dbGroups = new LowSync(adapter);
        dbGroups.read();
        dbGroups.data || (dbGroups.data = { _groups: [] });
        dbGroups.write();
        dbGroups.chain = lodash.chain(dbGroups.data);
        return dbGroups;
    }
    /**
    * return true if the passed metadata is the default one.
    * this indicates that it was not possible to load the correct values from WA
    * @param metadata
    * @returns return true if the passed metadata is the default one.
    */
    static isDefaultMetadata(metadata) {
        return lodash.isEqual(Group.defaultMetaData, metadata);
    }
    /**
     * Description placeholder
     * @date 11/07/2022 - 00:30:11
     * return true if the object have real metadata received from WA
     * @static
     * @readonly
     * @type {boolean}
     */
    get isRealMetadataLoaded() {
        return !Group.isDefaultMetadata(this._metadata);
    }
    /**
     * Return true if it passed more tha Group.upDateTime since last update of the _groupMetaData
     * @date 11/07/2022 - 23:12:53
     *
     * @readonly
     * @type {boolean}
     */
    get isPast() {
        const isPast = (Date.now() - this._lastUpdated >= Group.UPDATE_INTERVAL) ? true : false;
        return isPast;
    }
    static get GroupChain() {
        if (Group.db.chain)
            return Group.db.chain;
        else
            Group.db.chain = lodash.chain(Group.getAdapter(FileDB.groupsDB).data);
        return Group.db.chain;
    }
    static getGroupForChat(chatId) {
        if (!chatId)
            return null;
        if (!Group._isGroup(chatId))
            return null;
        if (!Group._groups) {
            Group._groups = Group.loadObjects(); //in memory database
        }
        if (chatId instanceof Chat) {
            chatId = chatId.id;
        }
        if (typeof chatId === 'object') {
            chatId = chatId.id;
        }
        let found = Group._groups.find((ch) => {
            return (ch._id == chatId);
        });
        if (!found) {
            const newStat = new Group(chatId);
            Group._groups.push(newStat);
            return newStat;
        }
        else
            return found;
    }
    static loadObjects() {
        let _data = [];
        try {
            if (!Group.db) {
                Group.db = Group.getAdapter(FileDB.groupsDB);
            }
            Group.db.read();
            if (Group.GroupChain) {
                const OBJECTS = Group.GroupChain.map((stat) => {
                    if (stat.length > 0) {
                        stat.forEach((st) => {
                            if (Group._isGroup(st._id)) {
                                let theGroup = new Group(st._id, st);
                                if (theGroup._id)
                                    _data.push(theGroup);
                            }
                        });
                    }
                }).value();
            }
            return _data;
        }
        catch (err) {
            Utils.treatError(err, _pino);
            return _data;
        }
    }
    loadDataFromWA() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return Promise.resolve;
            try {
                //const metadata:GroupMetadata = await Utils.fulfillWithTimeLimit(Group._timeLimit,Group._conn.groupMetadata(this._id),Object.assign({},  Group.defaultMetaData))
                const metadata = yield Group._conn.groupMetadata(this._id);
                if (!Group.isDefaultMetadata(metadata)) {
                    this._metadata = metadata;
                    //this._isRealData = true
                    this._lastUpdated = Date.now();
                    //setup participants
                    this._participants = metadata.participants;
                    //setup admins
                    this._admins = [];
                    this._superAdmins = [];
                    this._metadata.participants.forEach((p) => {
                        if (p.isAdmin || p.admin === 'admin') {
                            this._admins.push(p);
                        }
                        if (p.isSuperAdmin || p.admin === 'superadmin') {
                            this._superAdmins.push(p);
                        }
                    });
                    //is admin
                    this._admins.forEach((ad) => {
                        if (ad.id == this._id) {
                            this._isBotAdmin = true;
                        }
                    });
                    //is superAdmin
                    this._superAdmins.forEach((ad) => {
                        if (ad.id == this._id) {
                            this._isBotSuperAdmin = true;
                        }
                    });
                }
            }
            catch (err) {
                Utils.treatError(err, this.logger);
            }
        });
    }
    getGroupMetaData(este) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let from = este._from;
                let ret = null;
                if (!Group._conn)
                    Group._conn = este._client;
                if (este._isGroupMsg) {
                    if (this.isRealMetadataLoaded && !this.isPast) {
                        //este._groupMetadata = this._metadata
                        ret = this._metadata;
                    }
                    else {
                        yield this.loadDataFromWA();
                        if (Group.isDefaultMetadata(this._metadata)) {
                            ret = Object.assign({}, Group.defaultMetaData);
                            //este._groupMetadata = ret
                        }
                        else {
                            //este._groupMetadata = this._metadata
                            ret = this._metadata;
                        }
                    }
                }
                else {
                    //este._groupMetadata = null
                    ret = null;
                }
                return ret;
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return null;
            }
        });
    }
    ReloadMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            try {
                if (!this._lastUpdated || this._lastUpdated == 0)
                    this._lastUpdated = Date.now();
                let isPast = (Date.now() - this._lastUpdated >= Group.UPDATE_INTERVAL) ? true : false;
                if (!this.isRealMetadataLoaded || isPast) {
                    if (Group._isGroup(this._id))
                        Group._conn.groupMetadata(this._id).then(metadata => {
                            this._metadata = metadata;
                            this._lastUpdated = Date.now();
                            return;
                        }).catch(err => {
                            Utils.treatError(err, this.logger);
                            return false;
                        });
                    return;
                }
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return false;
            }
        });
    }
    static ReloadAllMetadata() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn)
                return;
            if (!Group._groups) {
                Group._groups = Group.loadObjects(); //in memory database
            }
            Group._groups.forEach((gr) => __awaiter(this, void 0, void 0, function* () {
                if (gr._id && gr.isGroup)
                    yield gr.ReloadMetadata();
            }));
        });
    }
    getGroupMembers(este) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!este)
                return null;
            if (!(este instanceof MessageCore))
                return null;
            const from = este._from;
            if (este._isGroupMsg) {
                if (this.isRealMetadataLoaded && !this.isPast) {
                    return this._participants;
                }
                else {
                    yield this.loadDataFromWA();
                    if (Group.isDefaultMetadata(this._metadata)) {
                        //default
                        const defMembers = [Object.assign({}, Group.defaultParticipant)];
                        //este._groupMembers = defMembers
                        return defMembers;
                    }
                    else {
                        //este._groupMetadata = this._metadata
                        //este._groupMembers = this._participants
                    }
                    return this._participants;
                }
                return this._participants;
            }
            else {
                //este._groupMembers = null
                return null;
            }
        });
    }
    getGroupAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.isRealMetadataLoaded && !this.isPast) {
                    return Promise.resolve(this._admins);
                }
                else {
                    if (!Group._conn || !this.isGroup)
                        return [];
                    yield this.loadDataFromWA();
                    if (!Group.isDefaultMetadata(this._metadata)) {
                        return this._admins.concat(this._superAdmins);
                    }
                    return Promise.resolve([]);
                }
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return Promise.resolve([]);
            }
        });
    }
    /**
     *
     * @param este Message
     * @returns true if the sender of the mesasage is Group Admin
     */
    isBotGroupAdmin(este) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!este)
                    return false;
                if (!(este instanceof MessageCore))
                    return false;
                //when is group from = groupID
                const from = este._from;
                let ret = false;
                if (este._isGroupMsg) {
                    if (this.isRealMetadataLoaded && !this.isPast) {
                        return (this._isBotAdmin || this._isBotSuperAdmin);
                    }
                    else {
                        yield this.loadDataFromWA();
                        if (!Group.isDefaultMetadata(this._metadata)) {
                            return (this._isBotAdmin || this._isBotSuperAdmin);
                        }
                        else
                            return false;
                    }
                }
                else {
                    return ret;
                }
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return false;
            }
        });
    }
    /**
     * Save this class to File
     */
    save() {
        Group.saveGroup(this);
    }
    /**
     * Save the Passed Class to file
     * @param Classe group to save in database
     * @returns
     */
    static saveGroup(Classe) {
        if (!Classe)
            return false;
        if (Classe && !Classe._id)
            return false;
        const chatId = Classe._id;
        try {
            Group.db.read(); //get da current database
            let chatFoundchain = Group.db.chain;
            let chatFound = chatFoundchain.get('_groups').find({ _id: chatId }).value();
            if (chatFound) {
                //find the user 
                chatFound.set(Classe).value();
                Group.db.data = Group.db.chain;
                Group.db.write();
                return true;
            }
            else { //create the chat element and the user
                chatFoundchain.push(Classe).value();
                Group.db.data = Group.db.chain;
                Group.db.write();
                return true;
            }
        }
        catch (err) {
            Utils.treatError(err, _pino);
            return false;
        }
    }
    /**
     * Save the entire memory database to file
     * @returns the LowSync Adapter
     */
    static saveGroups() {
        if (!Group._groups) {
            Group._groups = Group.loadObjects(); //in memory database
        }
        const adapter = new JSONFileSync(FileDB.groupsDB);
        const dbGroup = new LowSync(adapter);
        dbGroup.read();
        dbGroup.data = { _groups: Group._groups };
        dbGroup.write();
        dbGroup.chain = lodash.chain(dbGroup.data);
        return dbGroup;
    }
    //============update data based on events
    //
    /**
     * return true if the group is loaded in database
     * @param groupId the id of the group
     * @returns
     */
    static isGroupInDatabase(groupId) {
        if (!groupId || !Group._isGroup(groupId))
            return false;
        if (!Group._groups)
            return false;
        const found = Group._groups.find((gr) => {
            return gr._id === groupId;
        });
        if (found)
            return found;
        else
            return false;
    }
    /**
     * Update Group Metadata
     * @param groupId the id of the group to update data
     * @param grData the data
     * @returns
     */
    static updateGroupData(groupId, grData) {
        if (!groupId || !Group._isGroup(groupId))
            return false;
        const theGroup = Group.isGroupInDatabase(groupId);
        if (!theGroup) {
            //create group
        }
        else {
            if (Utils.isObjKey('owner', grData)) {
                const grOwner = grData.owner;
                theGroup._metadata.owner = grOwner;
            }
            if (Utils.isObjKey('subject', grData)) {
                const grsubject = grData.subject;
                theGroup._metadata.subject = grsubject;
            }
            if (Utils.isObjKey('subjectOwner', grData)) {
                const grsubjectOwner = grData.subjectOwner;
                theGroup._metadata.subjectOwner = grsubjectOwner;
            }
            if (Utils.isObjKey('subjectTime', grData)) {
                const grsubjectTime = grData.subjectTime;
                theGroup._metadata.subjectTime = grsubjectTime;
            }
            if (Utils.isObjKey('creation', grData)) {
                const grcreation = grData.creation;
                theGroup._metadata.creation = grcreation;
            }
            if (Utils.isObjKey('desc', grData)) {
                const grdesc = grData.desc;
                theGroup._metadata.desc = grdesc;
            }
            if (Utils.isObjKey('descOwner', grData)) {
                const grdescOwner = grData.descOwner;
                theGroup._metadata.descOwner = grdescOwner;
            }
            if (Utils.isObjKey('descId', grData)) {
                const grdescId = grData.descId;
                theGroup._metadata.descId = grdescId;
            }
            if (Utils.isObjKey('restrict', grData)) {
                const grrestrict = grData.restrict;
                theGroup._metadata.restrict = grrestrict;
            }
            if (Utils.isObjKey('announce', grData)) {
                const grannounce = grData.announce;
                theGroup._metadata.announce = grannounce;
            }
            if (Utils.isObjKey('size', grData)) {
                const grsize = grData.size;
                theGroup._metadata.size = grsize;
            }
            if (Utils.isObjKey('participants', grData)) {
                const grparticipants = grData.participants;
                theGroup._metadata.participants = grparticipants ? grparticipants : theGroup._metadata.participants;
            }
            if (Utils.isObjKey('ephemeralDuration', grData)) {
                const grephemeralDuration = grData.ephemeralDuration;
                theGroup._metadata.ephemeralDuration = grephemeralDuration;
            }
        }
    }
    //=== sync methods ========
    get id() { return this._id; }
    //remember that the non default values must be loaded by the async methods befor using the sync ones,
    //otherwise the returned data will be only default static values.
    get metadata() { return this._metadata; }
    isSenderAdmin(userId) {
        let found = this._superAdmins.find(gr => gr.id === userId) || this._admins.find(gr => gr.id === userId);
        return found ? true : false;
    }
    isBotAdmin(botId) {
        return this.isSenderAdmin(botId);
    }
    get groupAdmins() {
        return this._admins;
    }
    get participants() {
        return this._participants;
    }
    // ======== WA GROUP MESSING AROUND
    //To query the metadata of a group
    getMetaData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return Promise.resolve;
            try {
                if (this.isGroup) {
                    const metadata = yield Group._conn.groupMetadata(this._id);
                    console.log(metadata.id + ", title: " + metadata.subject + ", description: " + metadata.desc);
                    return metadata;
                }
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return Promise.reject(err);
            }
        });
    }
    //To join the group using the invitation code
    join(inviteCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Group._conn || !this.isGroup)
                    return;
                const response = yield Group._conn.groupAcceptInvite(inviteCode);
                this.logger.info("joined to: " + response);
                return response;
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return Promise.reject(err);
            }
        });
    }
    leave() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Group._conn || !this.isGroup)
                    return;
                const response = yield Group._conn.groupLeave(this._id);
                this.logger.info("leaved group: " + response);
                return response;
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return Promise.reject(err);
            }
        });
    }
    getInviteCode() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Group._conn || !this.isGroup)
                    return;
                const response = yield Group._conn.groupInviteCode(this._id);
                this.logger.info("leaved group: " + response);
                return response;
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return Promise.reject(err);
            }
        });
    }
    groupRevokeInvite() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Group._conn || !this.isGroup)
                    return;
                const response = yield Group._conn.groupRevokeInvite(this._id);
                this.logger.info("leaved group: " + response);
                return response;
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return Promise.reject(err);
            }
        });
    }
    //To get info group by invite code
    getInfo(inviteCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!Group._conn || !this.isGroup)
                    return;
                const response = yield Group._conn.groupGetInviteInfo(inviteCode);
                this.logger.info("group information: " + response);
                return response;
            }
            catch (err) {
                Utils.treatError(err, this.logger);
                return Promise.reject(err);
            }
        });
    }
    //To join the group using groupInviteMessage
    static _joinInviteMessage(conn, groupId, groupInviteMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!conn)
                return Promise.resolve;
            if (groupId.includes('@g.us')) {
                const response = yield conn.groupAcceptInviteV4(groupId, groupInviteMessage);
                _pino.info("joined to: " + response);
                return response;
            }
        });
    }
    joinInviteMessage(groupInviteMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            return Group._joinInviteMessage(Group._conn, this._id, groupInviteMessage);
        });
    }
    groupToggleEphemeral(expiration) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            const response = yield Group._conn.groupToggleEphemeral(this._id, expiration);
            this.logger.info("group groupToggleEphemeral: " + response);
            return response;
        });
    }
    //To create a group
    //participants: ["1234@s.whatsapp.net", "4564@s.whatsapp.net"]
    static create(conn, title, participants, welcome = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!conn)
                return Promise.resolve;
            // title & participants
            const group = yield conn.groupCreate(title, participants);
            _pino.info("created group with id: " + group.gid);
            if (welcome)
                conn.sendMessage(group.id, { text: 'hello there' }); // say hello to everyone on the group
        });
    }
    //To add/remove people to a group or demote/promote people
    // id & people to add to the group (will throw error if it fails)
    //To add/remove people to a group
    //participants: ["abcd@s.whatsapp.net", "efgh@s.whatsapp.net"]
    addMember(participants) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            const response = yield Group._conn.groupParticipantsUpdate(this._id, participants, "add");
            return response;
        });
    }
    //To demote people
    demoteMember(participants) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            const response = yield Group._conn.groupParticipantsUpdate(this._id, participants, "demote");
            return response;
        });
    }
    //To promote people
    prometoMember(participants) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            const response = yield Group._conn.groupParticipantsUpdate(this._id, participants, "promote");
            return response;
        });
    }
    //To change the group's subject
    changeSubject(New_Subject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            yield Group._conn.groupUpdateSubject(this._id, New_Subject);
        });
    }
    //To change the group's description
    changeDescription(New_Description) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Group._conn || !this.isGroup)
                return;
            yield Group._conn.groupUpdateDescription(this._id, New_Description);
        });
    }
}
Group.db = Group.getAdapter(FileDB.groupsDB);
Group._groups = Group.loadObjects();
//regular updates are performed by event
Group._updateTime = 360; // (minutes)
Group.UPDATE_INTERVAL = 1000 * 60 * Group._updateTime;
Group.defaultParticipant = {
    id: 'defaultParticipant',
    /** name of the contact, you have saved on your WA */
    name: 'defaultParticipant',
    /** name of the contact, the contact has set on their own on WA */
    notify: 'defaultParticipant',
    /** I have no idea */
    verifiedName: 'defaultParticipant',
    imgUrl: 'defaultParticipant',
    status: 'defaultParticipant',
    isAdmin: false,
    isSuperAdmin: false,
    admin: null
};
Group.defaultMetaData = {
    id: 'defaultGroupMetaData',
    owner: undefined,
    subject: 'defaultGroupMetaData',
    creation: 0,
    desc: 'defaultGroupMetaData',
    descOwner: 'defaultGroupMetaData',
    descId: 'defaultGroupMetaData',
    /** is set when the group only allows admins to change group settings */
    restrict: true,
    /** is set when the group only allows admins to write messages */
    announce: true,
    participants: [Group.defaultParticipant],
    ephemeralDuration: 0
};
Group._timeLimit = 4000; // 1 sec = 1000 time limit
Group._conn = null;
//# sourceMappingURL=group.js.map
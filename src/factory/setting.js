export default class setting {
    constructor() {
        this._anon = true;
        this._anticall = true;
        this._antispam = true;
        this._antitroli = true;
        this._backup = true;
        this._backupDB = 0;
        this._groupOnly = true;
        this._jadibot = true;
        this._nsfw = true;
        this._status = 0;
        this._statusUpdate = true;
        this._antivirus = true;
        this._publicjoin = true;
        this._autogetmsg = true;
    }
    //getters
    get anon() { return this._anon; }
    get anticall() { return this._anticall; }
    get antispam() { return this._antispam; }
    get antitroli() { return this._antitroli; }
    get backup() { return this._backup; }
    get backupDB() { return this._backupDB; }
    get groupOnly() { return this._groupOnly; }
    get jadibot() { return this._jadibot; }
    get nsfw() { return this._nsfw; }
    get status() { return this._status; }
    get statusUpdate() { return this._statusUpdate; }
    get antivirus() { return this._antivirus; }
    get publicjoin() { return this._publicjoin; }
    get autogetmsg() { return this._autogetmsg; }
    //setters
    set anon(v) { this._anon = v; }
    set anticall(v) { this._anticall = v; }
    set antispam(v) { this._antispam = v; }
    set antitroli(v) { this._antitroli = v; }
    set backup(v) { this._backup = v; }
    set backupDB(v) { this._backupDB = v; }
    set groupOnly(v) { this._groupOnly = v; }
    set jadibot(v) { this._jadibot = v; }
    set nsfw(v) { this._nsfw = v; }
    set status(v) { this._status = v; }
    set statusUpdate(v) { this._statusUpdate = v; }
    set antivirus(v) { this._antivirus = v; }
    set publicjoin(v) { this._publicjoin = v; }
    set autogetmsg(v) { this._autogetmsg = v; }
}
//# sourceMappingURL=setting.js.map
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import EventEmitter from "node:events";
let path = require('path');
let fs = require('fs').promises;
let { promisify } = require('util');
let { google } = require('googleapis');
// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, '..', 'token.json');
class GoogleAuth extends EventEmitter {
    constructor() {
        super();
    }
    authorize(credentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let token;
            const { client_secret, client_id } = credentials;
            const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, `http://localhost:${port}`);
            try {
                token = JSON.parse(yield fs.readFile(TOKEN_PATH));
            }
            catch (e) {
                const authUrl = oAuth2Client.generateAuthUrl({
                    access_type: 'offline',
                    scope: SCOPES
                });
                this.emit('auth', authUrl);
                let code = yield promisify(this.once).bind(this)('token');
                token = yield oAuth2Client.getToken(code);
                yield fs.writeFile(TOKEN_PATH, JSON.stringify(token));
            }
            finally {
                yield oAuth2Client.setCredentials(token);
            }
        });
    }
    token(code) {
        this.emit('token', code);
    }
}
class GoogleDrive extends GoogleAuth {
    constructor() {
        super();
        this.path = '/drive/api';
    }
    getFolderID(path) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    infoFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    folderList(path) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    downloadFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    uploadFile(path) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
module.exports = {
    GoogleAuth,
    GoogleDrive,
};
//# sourceMappingURL=gdrive.js.map
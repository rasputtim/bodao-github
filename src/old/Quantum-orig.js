"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function _0x1156() { const _0x126468 = ['<[\x20Quantum-bot\x20]>', 'silent', './libreria/funciones', '15NwJDZk', 'groupParticipantsUpdate', 'close', 'remove', 'Conexion\x20perdida,\x20reconectando...\x20u.u', 'blue', 'red', '3386026ukbyiP', 'sendMessage', 'MyPais', 'slice', 'groupAcceptInvite', '664837QpzcKu', '\x0a\x0aError\x20en\x20el\x20archivo\x20:', '\x0aCONECTADO\x20UwUr\x0a', 'store', '603016RSRZdn', 'NomeDoBot', 'pino', '\x0a\x0a[!]\x20Session\x20del\x20dispositivo\x20desconectado,\x20elimine\x20la\x20sesión\x20y\x20vuelva\x20a\x20escanear.\x0a\x0a[!]\x20Session\x20from\x20the\x20disconnected\x20device,\x20delete\x20the\x20session\x20and\x20rescan.\x0a\x0a[!]\x20Sesi\x20dari\x20perangkat\x20yang\x20terputus,\x20hapus\x20sesi\x20dan\x20pindai\x20ulang.\x0a\x0a[!]\x20Sessão\x20do\x20dispositivo\x20desconectado,\x20exclua\x20a\x20sessão\x20e\x20verifique\x20novamente.\x0a\x0a', '@adiwajshing/baileys', 'image', 'CB:call', '\x0aCONECTANDO...\x20U.U', '[_>]\x20', 'GtxTtrORaAaDdDWBGGX5R5', 'repeat', 'split', 'writeFileSync', 'includes', 'Wlc4', 'LOCATION', 'ControladorDelBot', 'Wlc3', 'parse', 'fromCharCode', 'AutoSaludo', 'endsWith', '4780432RVLnlD', './meta', 'block', 'cfonts', 'startsWith', 'despedida\x20', '[\x20PING\x20🏓\x20]', 'FDeG', 'updateBlockStatus', './basededatos/json/noextranjeros.json', 'center', 'readFileSync', 'connection.update', 'call-creator', 'BotNumber', 'say', 'group-participants.update', 'https://i.ibb.co/5Fkyq2J/semfoto.jpg', '51995386439-1616169743@g.us', './multimedia/images/Sin-Perfil-F.jpg', 'menu\x20', '0@s.whatsapp.net', 'creds.update', 'child', '6097896LeaZuz', 'messages.upsert', './basededatos/json/bienvenida.json', 'output', 'open', 'bind', 'Ejecutando\x20el\x20Bot\x20mas\x20shidori\x20tercer\x20mundista.\x0aComenzando\x20ejecucion\x20del\x20script...', 'action', '1949558tbXpda', 'add', 'statusCode', './lenguajes/nexo', 'catch', './libreria/myfunc', './session.json', './libreria/color', 'Safari', '4583745sKhqEV', 'profilePictureUrl', './basededatos/json/nofakes1.json', 'simple', 'log', './libreria/calendario', 'candy', '51995386439', '[\x20MENU\x20☰\x20]', 'Wlc5', 'attrs', '1.0.0', 'content', 'groupMetadata', 'desc', 'participants']; _0x1156 = function () { return _0x126468; }; return _0x1156(); }
const _0x426b51 = _0x1bc8;
(function (_0x221378, _0x3de93b) { const _0x5252d3 = _0x1bc8, _0x2bd314 = _0x221378(); while (!![]) {
    try {
        const _0x39cbde = parseInt(_0x5252d3(0x23a)) / 0x1 + -parseInt(_0x5252d3(0x212)) / 0x2 + parseInt(_0x5252d3(0x22e)) / 0x3 * (parseInt(_0x5252d3(0x23e)) / 0x4) + -parseInt(_0x5252d3(0x21b)) / 0x5 + parseInt(_0x5252d3(0x20a)) / 0x6 + -parseInt(_0x5252d3(0x235)) / 0x7 + parseInt(_0x5252d3(0x1f2)) / 0x8;
        if (_0x39cbde === _0x3de93b)
            break;
        else
            _0x2bd314['push'](_0x2bd314['shift']());
    }
    catch (_0x3eda84) {
        _0x2bd314['push'](_0x2bd314['shift']());
    }
} }(_0x1156, 0xa074f), console[_0x426b51(0x21f)](_0x426b51(0x210)));
function _0x1bc8(_0x4e5a96, _0x3982be) { const _0x115620 = _0x1156(); return _0x1bc8 = function (_0x1bc898, _0xd4c73d) { _0x1bc898 = _0x1bc898 - 0x1eb; let _0x4b0f42 = _0x115620[_0x1bc898]; return _0x4b0f42; }, _0x1bc8(_0x4e5a96, _0x3982be); }
const { default: makeWASocket, fetchLatestBaileysVersion, useSingleFileAuthState, makeInMemoryStore, DisconnectReason, GroupMetadata } = require(_0x426b51(0x242)), { state, saveState } = useSingleFileAuthState(_0x426b51(0x218)), fs = require('fs'), pino = require(_0x426b51(0x240)), { color } = require(_0x426b51(0x219)), { smsg } = require(_0x426b51(0x217)), { dateComplete, saludHora } = require(_0x426b51(0x220)), { start, success, close } = require(_0x426b51(0x22d)), _welcom = JSON[_0x426b51(0x1ee)](fs[_0x426b51(0x1fd)](_0x426b51(0x20c))), _antifakes1 = JSON[_0x426b51(0x1ee)](fs[_0x426b51(0x1fd)](_0x426b51(0x21d))), _antifakes2 = JSON['parse'](fs[_0x426b51(0x1fd)]('./basededatos/json/nofakes2.json')), _noForeigns = JSON[_0x426b51(0x1ee)](fs['readFileSync'](_0x426b51(0x1fb)));
let sinthumb = fs['readFileSync'](_0x426b51(0x205));
const { en, id, es, pt } = require(_0x426b51(0x215));
idiomas = es, MyInfo = JSON[_0x426b51(0x1ee)](fs[_0x426b51(0x1fd)]('./src/informacion.json')), prefix = MyInfo['Prefijo'], NameBot = MyInfo[_0x426b51(0x23f)] + 'ᴮʸ⁻ᴺᴷ', botcontrol = MyInfo[_0x426b51(0x1ec)], prepais = MyInfo[_0x426b51(0x237)], cglobal = MyInfo[_0x426b51(0x200)];
const more = String[_0x426b51(0x1ef)](0x200e);
let nvn = more[_0x426b51(0x248)](0xfa1), nwn = more[_0x426b51(0x248)](0x352);
const CFonts = require(_0x426b51(0x1f5));
CFonts[_0x426b51(0x201)]('' + NameBot, { 'font': _0x426b51(0x21e), 'color': _0x426b51(0x221), 'align': _0x426b51(0x1fc), 'gradient': [_0x426b51(0x234), _0x426b51(0x233)] });
const store = makeInMemoryStore({ 'logger': pino()[_0x426b51(0x209)]({ 'level': _0x426b51(0x22c), 'stream': _0x426b51(0x23d) }) });
function NKstart() {
    return __awaiter(this, void 0, void 0, function* () { const _0x50777f = _0x426b51; let { version: _0x2857d5, isLatest: _0x195162 } = yield fetchLatestBaileysVersion(); const _0x2b36b0 = makeWASocket({ 'logger': pino({ 'level': _0x50777f(0x22c) }), 'printQRInTerminal': !![], 'browser': [_0x50777f(0x22b), _0x50777f(0x21a), _0x50777f(0x226)], 'auth': state, 'version': _0x2857d5 }); _0x2b36b0['ev']['on'](_0x50777f(0x1fe), (_0x481ebd) => __awaiter(this, void 0, void 0, function* () { var _a, _b; const _0x32f107 = _0x50777f, { connection: _0x595c4b, lastDisconnect: _0x1b39e4 } = _0x481ebd; _0x595c4b === _0x32f107(0x20e) && (minvitacion = _0x32f107(0x247), _0x2b36b0[_0x32f107(0x239)](minvitacion)['catch'](_0x1308f1 => { const _0xb03461 = _0x32f107; console[_0xb03461(0x21f)](_0x1308f1); }), cglobal = _0x2b36b0['user']['id'][_0x32f107(0x249)](':')[0x0] + '@s.whatsapp.net', MyInfo[_0x32f107(0x200)] = cglobal, fs[_0x32f107(0x24a)]('./src/informacion.json', JSON['stringify'](MyInfo, null, '\x09')), success('2', _0x32f107(0x23c))); if (_0x595c4b == 'connecting')
        start('2', _0x32f107(0x245));
    else
        _0x595c4b === _0x32f107(0x230) && (console[_0x32f107(0x21f)](color('[!]', _0x32f107(0x234)), color(_0x32f107(0x232), _0x32f107(0x234))), ((_b = (_a = _0x1b39e4['error']) === null || _a === void 0 ? void 0 : _a[_0x32f107(0x20d)]) === null || _b === void 0 ? void 0 : _b[_0x32f107(0x214)]) !== DisconnectReason['loggedOut'] ? NKstart() : console[_0x32f107(0x21f)](color(_0x32f107(0x241), _0x32f107(0x234)))); })), _0x2b36b0['ev']['on'](_0x50777f(0x208), () => saveState), store[_0x50777f(0x20f)](_0x2b36b0['ev']), _0x2b36b0['ws']['on'](_0x50777f(0x244), (_0x33ce3f) => __awaiter(this, void 0, void 0, function* () { const _0xef5575 = _0x50777f, _0x1b8d71 = _0x33ce3f[_0xef5575(0x227)][0x0][_0xef5575(0x225)][_0xef5575(0x1ff)]; let _0x2ddf2a = '' + botcontrol[0x0][_0xef5575(0x238)](0x0, -0xf); if (_0x33ce3f[_0xef5575(0x227)][0x0]['tag'] == 'offer', _0xef5575(0x222), _0x2ddf2a) {
        var _0xa41a80 = 'wa.me/' + botcontrol[0x0]['slice'](0x0, -0xf);
        _0x2b36b0[_0xef5575(0x236)](_0x1b8d71, { 'text': idiomas['BanCall'](_0xa41a80) }, { 'quoted': { 'key': { 'participant': '0@s.whatsapp.net', 'remoteJid': _0xef5575(0x207) }, 'message': { 'groupInviteMessage': { 'groupJid': _0xef5575(0x204), 'inviteCode': 'm', 'groupName': 'P', 'caption': '' + NameBot, 'jpegThumbnail': fs[_0xef5575(0x1fd)]('../multimedia/images/teslagod.jpeg') } } } }), yield sleep(0x1f40), yield _0x2b36b0[_0xef5575(0x1fa)](_0x1b8d71, _0xef5575(0x1f4));
    } })), _0x2b36b0['ev']['on'](_0x50777f(0x202), (_0x30f1dd) => __awaiter(this, void 0, void 0, function* () { const _0x188f8a = _0x50777f; if (_noForeigns['includes'](_0x30f1dd['id'])) {
        const _0x5d1e3e = yield _0x2b36b0[_0x188f8a(0x228)](_0x30f1dd['id'])[_0x188f8a(0x216)](_0x5daaef => { const _0x31004a = _0x188f8a; console[_0x31004a(0x21f)](idiomas[_0x31004a(0x1f9)]()); });
        _0x30f1dd['action'] == _0x188f8a(0x213) && (numero = _0x30f1dd[_0x188f8a(0x22a)][0x0], !numero['split']('@')[0x0][_0x188f8a(0x1f6)](prepais) && setTimeout(function () {
            return __awaiter(this, void 0, void 0, function* () { const _0x336556 = _0x188f8a; _0x2b36b0[_0x336556(0x22f)](_0x5d1e3e['id'], [numero], 'remove'); });
        }, 0x3e8));
    } if (_0x30f1dd[_0x188f8a(0x211)] == _0x188f8a(0x213)) {
        const _0x815b41 = yield _0x2b36b0[_0x188f8a(0x228)](_0x30f1dd['id'])[_0x188f8a(0x216)](_0x3c5b23 => { });
        let _0x3dbd4b = _0x30f1dd[_0x188f8a(0x22a)][0x0];
        if (_0x3dbd4b['startsWith']('51995386439'))
            return _0x2b36b0[_0x188f8a(0x236)](_0x815b41['id'], { 'text': idiomas[_0x188f8a(0x1f0)]() }, { 'quoted': { 'key': { 'participant': _0x188f8a(0x207), 'remoteJid': _0x188f8a(0x207) }, 'message': { 'groupInviteMessage': { 'groupJid': _0x188f8a(0x204), 'inviteCode': 'm', 'groupName': 'P', 'caption': '' + NameBot, 'jpegThumbnail': fs[_0x188f8a(0x1fd)]('./multimedia/images/teslagod.jpeg') } } } });
    } if (_antifakes2[_0x188f8a(0x24b)](_0x30f1dd['id'])) {
        const _0x3cf46c = yield _0x2b36b0[_0x188f8a(0x228)](_0x30f1dd['id'])[_0x188f8a(0x216)](_0x5f09a6 => { });
        if (_0x30f1dd[_0x188f8a(0x211)] == _0x188f8a(0x213)) {
            gnume = _0x30f1dd['participants'][0x0];
            if (gnume['startsWith']('1'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3cf46c['id'], [gnume], _0x188f8a(0x231));
        }
    } if (_antifakes1[_0x188f8a(0x24b)](_0x30f1dd['id'])) {
        const _0x3820e0 = yield _0x2b36b0[_0x188f8a(0x228)](_0x30f1dd['id'])[_0x188f8a(0x216)](_0x283e2d => { });
        if (_0x30f1dd[_0x188f8a(0x211)] == _0x188f8a(0x213)) {
            gnum = _0x30f1dd[_0x188f8a(0x22a)][0x0];
            if (gnum[_0x188f8a(0x1f6)]('20'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum['startsWith']('21'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('22'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum['startsWith']('23'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum['startsWith']('24'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('25'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('26'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('27'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('29'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('30'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('31'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('32'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('33'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('34'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum['startsWith']('35'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum['startsWith']('36'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('37'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum['startsWith']('38'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum['startsWith']('39'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('40'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('41'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum['startsWith']('42'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('43'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('44'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('45'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('46'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('47'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('48'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('49'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('60'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('61'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('62'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('63'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('64'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum['startsWith']('65'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('66'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('67'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('68'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('69'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('7'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum['startsWith']('80'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum['startsWith']('81'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('82'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('84'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('85'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('86'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('88'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('90'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('91'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('92'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('93'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('94'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('95'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('96'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('97'))
                return _0x2b36b0['groupParticipantsUpdate'](_0x3820e0['id'], [gnum], 'remove');
            if (gnum[_0x188f8a(0x1f6)]('98'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
            if (gnum[_0x188f8a(0x1f6)]('99'))
                return _0x2b36b0[_0x188f8a(0x22f)](_0x3820e0['id'], [gnum], _0x188f8a(0x231));
        }
    } if (!_welcom[_0x188f8a(0x24b)](_0x30f1dd['id']))
        return; console[_0x188f8a(0x21f)](_0x30f1dd); try {
        let _0x18831a = yield _0x2b36b0[_0x188f8a(0x228)](_0x30f1dd['id'])[_0x188f8a(0x216)](_0x347828 => { });
        const _0x30d425 = _0x30f1dd['id'][_0x188f8a(0x1f1)]('@g.us'), _0xc6b76a = _0x30d425 ? _0x18831a[_0x188f8a(0x229)] : '';
        let _0x3bbb20 = _0x30f1dd[_0x188f8a(0x22a)];
        for (let _0x1ff223 of _0x3bbb20) {
            try {
                ppuser = yield _0x2b36b0[_0x188f8a(0x21c)](_0x1ff223, _0x188f8a(0x243));
            }
            catch (_c) {
                ppuser = _0x188f8a(0x203);
            }
            try {
                imgwai = yield getBuffer(ppuser);
            }
            catch (_d) {
                imgwai = sinthumb;
            }
            if (_0x30f1dd[_0x188f8a(0x211)] == _0x188f8a(0x213))
                buttttons = [{ 'buttonId': prefix + _0x188f8a(0x206), 'buttonText': { 'displayText': _0x188f8a(0x223) }, 'type': 0x1 }, { 'buttonId': prefix + 'rebote\x20', 'buttonText': { 'displayText': _0x188f8a(0x1f8) }, 'type': 0x1 }], _0x2b36b0['sendMessage'](_0x30f1dd['id'], { 'caption': idiomas[_0x188f8a(0x1ed)](_0x1ff223, _0x18831a, dateComplete, _0xc6b76a, nwn), 'footer': '\x0a' + NameBot, 'location': { 'jpegThumbnail': imgwai }, 'buttons': buttttons, 'headerType': _0x188f8a(0x1eb), 'mentions': [_0x1ff223] });
            else
                _0x30f1dd['action'] == _0x188f8a(0x231) && (buttttons2 = [{ 'buttonId': prefix + _0x188f8a(0x1f7), 'buttonText': { 'displayText': _0x188f8a(0x246) + idiomas[_0x188f8a(0x24c)]() }, 'type': 0x1 }], _0x2b36b0[_0x188f8a(0x236)](_0x30f1dd['id'], { 'caption': idiomas[_0x188f8a(0x224)](_0x1ff223), 'footer': '\x0a' + NameBot, 'location': { 'jpegThumbnail': imgwai }, 'buttons': buttttons2, 'headerType': _0x188f8a(0x1eb), 'mentions': [_0x1ff223] }));
        }
    }
    catch (_0x26850d) {
        console['log'](_0x26850d);
    } })), _0x2b36b0['ev']['on'](_0x50777f(0x20b), (_0x4f3cb0) => __awaiter(this, void 0, void 0, function* () { const _0x3083f5 = _0x50777f; try {
        require(_0x3083f5(0x1f3))(_0x2b36b0, _0x4f3cb0, store, _welcom, _antifakes1, _antifakes2, _noForeigns);
    }
    catch (_0x17bec0) {
        console['log'](_0x3083f5(0x23b)), console['log'](_0x17bec0), console['log']('\x0a\x0a');
    } })); });
}
NKstart();
//# sourceMappingURL=Quantum-orig.js.map
import fs from 'fs';
import pkg from 'lodash';
import FileDB from '../basededatos/fileDatabase.js';
import Utils from '../factory/libs/functions.js';
import { PluginManager } from '../factory/pluginManager.js';
import { LocaleService } from '../languajes/localeService.js';
const { sample } = pkg;
//const localeService = container.resolve('localeService');
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const excBold = '*[ ! ]';
const boldSign = '*';
const readmore = `\u00AD`.repeat(1500);
const q3 = '```';
const space = ' ';
const italics = '_';
const more = '';
let nwn = more.repeat(850);
const MyPkg = JSON.parse(fs.readFileSync('./package.json'));
const MyInfo = JSON.parse(fs.readFileSync(FileDB.informationDB));
const wait1 = __('⏳ Pronto, em andamento!');
const wait2 = __('⏳ Ok, calma, espere um minuto!');
const wait3 = __('⏳ Por favor, espere um minuto...');
const wait4 = __('⏳ Shap, por favor espere!');
const wait5 = __('⏳ Tudo bem, seja paciente!');
const wait6 = __('⏳ Em andamento!');
const wait7 = __('⏳ Uau!');
const waits = [
    wait1,
    wait2,
    wait3,
    wait4,
    wait5,
    wait6,
    wait7
];
//"ه†ɴᵉᶠᵉʳʲᵉᵖᵉʳᵘʳᵃꦿ ᴀᵏᵉⁿᵃᵗᵒⁿ₂₀₁₉†࿐ཽ༵",
const pongs = [
    __('Lose the game*\nFong 🏓'),
    __(`🏓 Pong!!! 🏓`),
    __(`🏓 Pong!!! 🏓`),
    __(`Pong 🏓`),
    __(`Pong 🏓`),
    __(`Pong 🏓`),
    __(`Pong 🏓`),
    __('Respond with a 160km/h punch*\nPong 🏓'),
    __(`Pong 🏓`),
    __(`Pong 🏓`),
    __('He hits him on the head*\nPong 🏓'),
    __(`Pong 🏓`),
    __(`Pong 🏓`),
    __(`Breaks his skull*\nPong!!!🏓`),
    __('Pong 🏓'),
    __(`Pong 🏓`),
    __(`Pong 🏓`),
    __(`Pong 🏓`),
    __(`He wins the game*\n🏓 Pong!!! 🏓`),
    __(`Kills him*\nPong!!! 🏓🏓🏓`)
];
const eng = {
    use: {
        command: __('use the command:')
    },
    abuse: {
        active: __('🟢 The anti-abuse feature is active!'),
        inative: __('🔴 The anti-word feature is not active yet!'),
        activated: __('🟢 The anti-abuse feature has been activated'),
        deactivated: __('🔴 The anti-abuse feature has been disabled'),
        none: __(`No one has said anything rude yet`),
        standings: __('Temporary Penalties standings'),
        reseted: __("The standings have been reset.")
    },
    notes: {
        display: __('Displays notes stored in the bot database.'),
        none: __('Note: there is none, please add one first.'),
        not_found: (notename) => __(`Note %s there is none .`, notename),
        name: __(`What's the note name?`),
        created: (notename) => __(`Note %s successfully created.`, notename),
        deleted: (notename) => __(`Note %s successfully deleted.`, notename),
        exists: (notename) => __(`Note %s already exists, use another name.`, notename),
        willdelete: (notename) => __(`[❗] Note %s will be deleted.`, notename),
        confirm: (notename) => nl + __(`Send *%s yesdeletenote %s* to confirm, ignore if not so.`, '/', notename)
    },
    remind: {
        usage: 'Send messages at specified time.'
            + nl + boldSign + `/remind <xdxhxm> ` + __(`<Text or contents>`) + boldSign
            + nl + __('Fill x with numbers. For example 1d1h1m = 1 day more than 1 hour and 1 minute')
            + nl + __(`Example`) + `: /remind ` + __(`1h5m Don't forget to drink!`)
            + nl + __(`Bot will resend the message 'Don't forget to drink!' after 1 hour 5 minutes.`)
            + nl + nl + `*/remind` + space + __(`<DD/MM-hh:mm> <Text or contents>* for specific date and time`)
            + nl + `*/remind <dd :mm> <Text or contents>* for today's time`
            + nl + `Example: /remind 04/15-12:00 Don't forget to drink!`
            + nl + `Bot will resend the message 'Don't forget to drink!' on 15/04 at 12:00 a.m. of the current year. `
            + nl + nl + 'Note: waktu dalam GMT+3/WIB',
        past: __('Reminder of the past?') +
            __('Hmm interesting...')
            + nl + nl + __(`Yes I can't`),
        late: __(`It's too late, a maximum of 10 days ahead`)
    },
    list: {
        display: +nl + __('Displays a list stored in the bot database.'),
        createListCommandTXT: nl + __(`To create a list`) + space + __('use the command:')
            + nl + `-> */createlist <` + __('list name') + `> | <Information>*`
            + nl + space + __('for example') + `: /createlist ` + __('task') + `  | ` + __('Duties of') + ` PTI 17`
            + nl + __('please only use 1 word for') + space + __('list name'),
        delListCommandTXT: nl + __(`To delete the list and its contents`) + space + __('use the command:')
            + nl + `-> */deletelist <` + __('list name') + `>*`
            + nl + space + __('for example') + `: ` + `/deletelist` + space + __('task'),
        fillList: nl + __(`To fill the list`) + space + __('use the command:'),
        delCommandTXT: +nl + __(`To remove *fill* list`) + space + __('use the command:')
            + nl + `-> */delist <` + __('list name') + `> <` + __('number') + ` fill  list>*`
            + nl + __(`Can be more than 1 separator using comma`) + ` (,) ` + __('for example') + `: /delist task  1, 2, 3`,
        addCommandTXT: nl + `-> */addtolist <` + __('list name') + `> <fill>* can be more than 1 using separator | `
            + nl + space + __('for example') + `: ` + `/addtolist` + space + __('task') + space + __(`Maths Chapter 1 deadline 2021 | Introduction to Accounting Chapter 2`),
        editCommandTXT: nl + __(`To edit a list`) + __('use the command:')
            + nl + `-> */editlist <` + __('list name') + `> <` + __('number') + `> <fill >* `
            + nl + `example: /editlist task  1 Maths Chapter 2 deadline 2021`,
    },
    pong: () => {
        const randIndex = Math.floor(Math.random() * pongs.length);
        return pongs[randIndex];
    },
    wait: () => {
        const randIndex = Math.floor(Math.random() * waits.length);
        return waits[randIndex];
    },
    titleAFK: __('「 AFK 」'),
    titleMenu: __('「 MENU 」'),
    titleAntiFlood: __('「 ANTI-FLOOD 」'),
    titleTime: __('TIMEZONES'),
    titleAnime: __('「 MODO-ANIME 」'),
    titleAntiPorn: __('「 ANTI PORN 」'),
    titleAntiFakes: __(`「 ANTI-FALSOS 」`),
    titleAntiFakes2: __(`「 ANTI-FALSOS-2 」`),
    titleAntiForeign: __(`「 ANTI-EXTRANJEROS 」`),
    titleAntiLink: __(`「 ANTI-LINK 」`),
    titleAntiGroup: __(`「 ANTI-LINK-MULTIPLE 」`),
    titleAntiVirtex: __(`「 ANTI-TRABAS 」`),
    titleBan: __(`「 BANEAR-CHAT 」`),
    titleChat: __(`「 CHAT-BOT 」`),
    titleFull: __('「 MODO-FULL 」'),
    titleHentai: __(`「 MODO-H 7w7 」`),
    titleLevel: __(`「 NIVELEAR 」`),
    titleWelcome: __(`「 BIENBENIDA-AUTOMÁTICA 」`),
    titlePremium: __(`「 PREMIUM 」`),
    titleIntro: __(`「 INTRO 」`),
    linkNsfw: () => {
        return nl + '*── 「 ' + __('ANTI NSFW LINK') + ' 」 ──*'
            + nl + __(`You've sent a group link!`)
            + nl + __(`Sorry, but you have to leave...`);
    },
    Greetings: [__('Hello'), __('Wenas'), __('Que tal'), __('Hi'), __('Hello'), __('Olá'), __('Namaste'), __('Hey!'), __('Aloha'), __('Konnichi wa'), __('My king'), __('Que hay'), __('How are you'), __('Oi')],
    reportErrorFound: (usedPrefix, command) => { return __('If you find an error message, report it using this command: /erro <command> <error>\n\nExample:\n /error %s Good afternoon owner, I found an error like this <copy/tag the error message>', usedPrefix + command); },
    reportShort: () => { return __('The report is too short, at least 10 characters!'); },
    reportLong: () => { return __("Report is too long, 1000 characters max!"); },
    reportFrom: () => { return 'Dari'; },
    From: () => { return 'From'; },
    Message: () => { return 'Message'; },
    badw: sample([
        'Estou cansado de escrever seus pecados 😒',
        'Yo rasah nggo misuh cuk! 😠',
        'Cuidado com seu colega de digitação! 😉',
        'Istighfar dulu sodaraku 😀',
        'Qual é o problema? 🤔',
        'Astaghfirullah...',
        'Hadehh...'
    ]),
    reportMessage: (command) => {
        return __('Message sent to bot owner, if %s is just messing around there will be no response.', command.toLowerCase());
    },
    PanelSubMenu: (tag, prefix, pushname, actividad, role, showdisabled = false) => {
        const plugArray = PluginManager.getPlufinsForTag(tag);
        let textOption = `~|------------------------------|~`
            + nl + `*☷   COMANDOS    ☷*`
            + nl + `~|------------------------------|~`
            + nl + `*| ` + __('GROUP') + ': ' + __(tag) + `*              `
            + nl + `*╰─────────────────* `;
        plugArray.forEach((plugin, opt) => {
            if (showdisabled || plugin.isInMenu) {
                if (Array.isArray(plugin.command)) {
                    const unShown = !plugin.isInMenu ? __('(no show)') : '';
                    const disabled = !plugin.isRunable;
                    const short = plugin.shortDesc !== '' ? plugin.shortDesc : plugin.description.slice(0, 20).trim();
                    plugin.command.forEach((element, index) => {
                        if (index == 0 && plugin.command.length > 1) {
                            textOption += nl + `║╭──────── `;
                            textOption += nl + `║├ *${prefix}${element}` + boldSign + space + unShown;
                            if (disabled)
                                textOption += nl + '║├ ' + boldSign + '_' + __('disabled') + '_' + boldSign;
                            textOption += nl + '║├ ' + '_' + short + '_';
                            textOption += nl + '║├─> ' + boldSign + __('ᶦⁿᵈᵉˣ') + boldSign + ` [${plugin.commandIndex}]`;
                            textOption += nl + '║├─> ' + boldSign + __('ᵃᵖᵉᴸᶦᵈᵒˢ') + boldSign;
                        }
                        else if (index == 0 && plugin.command.length == 1) {
                            textOption += nl + `║╭──────── `;
                            textOption += nl + `║├ *${prefix}${element}` + boldSign + space + unShown;
                            if (disabled)
                                textOption += nl + '║├ ' + boldSign + '_' + __('disabled') + '_' + boldSign;
                            textOption += nl + '║├─> ' + boldSign + __('ᶦⁿᵈᵉˣ') + boldSign + ` [${plugin.commandIndex}]`;
                            textOption += nl + '║├ ' + '_' + short + '_';
                            textOption += nl + `║╰──────── `;
                        }
                        else if (index == plugin.command.length - 1) {
                            textOption += nl + `║├─> ${prefix}${element}`;
                            textOption += nl + `║╰──────── `;
                        }
                        else
                            textOption += nl + `║├─> ${prefix}${element}`;
                    });
                }
            }
        });
        return `${space}< [ ${MyInfo.NomeDoBot} ] >${space}
╔═══════════`
            + nl + '║❂ ' + __('active time') + `: ${actividad}`
            + nl + '║❂ ' + __('bot version') + `: ${MyPkg.version}`
            + nl + '║❂ ' + __('The Creator') + `: ${MyInfo.CoCreador}`
            + nl + '║❂ ' + __('Prefix') + `: 「  ${prefix}  」`
            + nl + '║❂ ' + __('User') + `: ${pushname}️`
            + nl + '║❂ ' + __(`User's Function`) + ':'
            + nl + `║  ${role}`
            + nl + '╚═══════════'
            + `${nwn}


${textOption}

`;
    },
    PanelMenuHelp: (index, prefix, pushname, actividad, role) => {
        const testArg = isNaN(index);
        let plugin;
        if (testArg === true) {
            plugin = PluginManager.getPluginForCommand(index)[0];
        }
        else {
            plugin = PluginManager.getPlufinFromIndex(index);
        }
        let textOption = '';
        if (plugin && plugin.isInMenu) {
            const type = typeof (plugin === null || plugin === void 0 ? void 0 : plugin.usage);
            const usage = plugin ? type === 'function' ? plugin === null || plugin === void 0 ? void 0 : plugin.usage() : plugin === null || plugin === void 0 ? void 0 : plugin.usage : __('no usage');
            const help = plugin ? plugin === null || plugin === void 0 ? void 0 : plugin.help[0] : __('no help');
            const descriptions = plugin ? plugin === null || plugin === void 0 ? void 0 : plugin.description : __('no description');
            textOption =
                nl + boldSign + `╔═══════════` + boldSign
                    + nl + boldSign + `║ _` + __("index") + `: ${index}_` + boldSign
                    + nl + boldSign + `║╭—` + __('description') + boldSign
                    + nl + '   ' + descriptions
                    + nl + boldSign + `╔═══════════` + boldSign
                    + nl + boldSign + `║╭—` + __('usage') + boldSign
                    + nl + '   ' + usage
                    + nl + boldSign + `╔═══════════` + boldSign
                    + nl + boldSign + `║╭—` + __('help') + boldSign
                    + nl + '   ' + help;
        }
        else {
            textOption = __('command Not Found') + space + __('or') + space + __('is not allowed to be shown');
        }
        return `${space}< [ ${MyInfo.NomeDoBot} ] >${space}`
            + nl + '╔═══════════'
            + nl + '║❂ ' + __('active time') + `: ${actividad}`
            + nl + '║❂ ' + __('bot version') + `: ${MyPkg.version}`
            + nl + '║❂ ' + __('The Creator') + `: ${MyInfo.CoCreador}`
            + nl + '║❂ ' + __('Prefix') + `: 「  ${prefix}  」`
            + nl + '║❂ ' + __('User') + `: ${pushname}`
            + nl + '║❂ ' + __(`User's Function`) + `: `
            + nl + `║  ${role}`
            + nl + '╚═══════════'
            + `${nwn}
    ${textOption}

`;
    },
    PanelMenu: (prefix, pushname, actividad, role, disabledTags, showDisabled = false) => {
        let tagText = "";
        PluginManager.pluginTags.forEach(tag => {
            const isUnshown = disabledTags.includes(tag);
            const disabled = isUnshown ? __('(bd)') : '';
            if (showDisabled || !isUnshown) {
                tagText += nl + ` <[${tag}]>` + space + disabled;
            }
        });
        return `${space}< [ ${MyInfo.NomeDoBot} ] >${space}`
            + nl + '╔═══════════'
            + nl + '║❂ ' + __('active time') + ` : ${actividad}`
            + nl + '║❂ ' + __('bot version') + ` : ${MyPkg.version}`
            + nl + '║❂ ' + __('The Creator') + ` : ${MyInfo.CoCreador}`
            + nl + '║❂ ' + __('Prefix') + ` : 「  ${prefix}  」`
            + nl + '║❂ ' + __('User') + `: ${pushname}`
            + nl + '║❂ ' + __(`User's Function`) + `: `
            + nl + `║  ${role}`
            + `${nwn}
~|-------------------------|~
⮕ * GRUPOS DE COMANDOS  ☷*
~|-------------------------|~

${tagText}

`;
    },
    FooterPM: (CovidApi) => {
        return '┏「  ' + __('DATA') + ' - COVID19 」─┓'
            + nl + '┃➲ ' + __('Positive cases') + `: ${CovidApi.cases}`
            + nl + '┃✯ ' + __('Recovered') + `: ${CovidApi.recovered}`
            + nl + '┃❥ ' + __('Treaties') + `: ${CovidApi.active}`
            + nl + '┃✞ ' + __('Deceased') + `: ${CovidApi.deaths}`
            + nl + '┗─━─━ 「 🌎 」 ━─━─┛';
    },
    GetHelp: (prefixo) => {
        return '┏━─' + '「 ' + __('GET HELP') + ' 」' + '━──┓'
            + nl + '┃➲ ' + __('To get help') + ': '
            + nl + '┃➲ ' + prefixo + __('help') + ' < ' + __('command index') + ' >'
            + nl + '┃➲ ' + __('Example') + ': ' + prefixo + 'help 24'
            + nl + '┃➲ ' + __('or')
            + nl + '┃➲ ' + prefixo + __('help') + ' < ' + __('command name') + ' >'
            + nl + '┃➲ ' + __('Example') + ': ' + prefixo + 'help play'
            + nl + `┗━─━─━ 「 🌎 」 ━─━─━─┛`;
    },
    MenuList: (tag, prefix, showdisabled = false) => {
        let txt = '╔═══════════';
        let icon = '☞';
        if (tag === 'ARTISTIC')
            txt += nl + '║' + space + '[ ' + __('CREATE-LOGOS') + ' ]' + space;
        if (tag === 'ANIME')
            txt += nl + '║' + space + '[ ' + __('ANIME-MENU') + ' ]' + space;
        if (tag === 'HENTAI')
            txt += nl + '║' + space + '[ ' + __('MENU +18') + ' ]' + space;
        if (tag === 'ANIME')
            icon = '圆';
        if (tag === 'HENTAI')
            icon = '㋡';
        const plugArray = PluginManager.getPlufinsForTag(tag);
        plugArray.forEach((plugin, opt) => {
            if (showdisabled || plugin.isInMenu) {
                if (Array.isArray(plugin.command)) {
                    const unShown = !plugin.isInMenu ? __('(no show)') : '';
                    const disabled = !plugin.isRunable ? __('(bd)') : '';
                    txt += nl + '║' + icon + space + prefix + plugin.command[0] + space + unShown + space + disabled;
                }
            }
        });
        return txt + nl + '╚═══════════';
    },
    BanCall: (helpcall) => {
        return __('The calls to the Bot number are forbidden!')
            + nl
            + __('Contact the creator : %s', helpcall);
    },
    AutoSaludo: () => {
        return __('*_My main creator joined the group_ ✓*')
            + nl
            + __('*[ Welcome nwn ]*');
    },
    Wlc1: () => {
        return __('Give me a star');
    },
    Wlc2: () => {
        return __('Creator');
    },
    Wlc3: (num, metadata, dateComplete, gpdesc) => {
        return __('⚡ *Welcome ')
            + __(`@${num.split("@")[0]} to this great group :` + boldSign)
            + nl
            + metadata.subject
            + nl
            + __('⚡ *Date of admission : %s*', dateComplete)
            + nl
            + __('⚡ _*I hope and you like your stay here, do not forget to respect the participants and the rules*_ ')
            + nl + nl
            + __(`*Group norms currently :* `)
            + nl
            + gpdesc;
    },
    Wlc4: () => {
        return __('BYE BYE... 😔');
    },
    Wlc5: (num) => {
        return exc + ` Left the group : @${num.split("@")[0]}`;
    },
    NoSpam1: () => {
        return __('*Wait a few seconds before using another command ✓*');
    },
    NoSpam2: (pushname) => {
        return exc + __(` %s Please don't saturate the bot ;-;`, pushname);
    },
    NoReg: (pushname) => {
        return exc + __(' %s You must register to start using the bot', pushname);
    },
    NoNsfw: () => {
        return nl + '*── 「 ' + __('ANTI NSFW') + ' 」 ──*'
            + nl + __(`You've sent a forbidem command!`);
    },
    NoPorn: () => {
        return nl + '*── 「 ' + __('ANTI PORN') + ' 」 ──*'
            + nl + __(`You've sent a forbidem command!`);
    },
    NoImage: () => {
        return nl + '*── 「 ' + __('ANTI IMAGE') + ' 」 ──*'
            + nl + __(`You've sent a forbidem command!`);
    },
    NoVideo: () => {
        return nl + '*── 「 ' + __('ANTI VIDEO') + ' 」 ──*'
            + nl + __(`You've sent a forbidem command!`);
    },
    NoAudio: () => {
        return nl + '*── 「 ' + __('ANTI AUDIO') + ' 」 ──*'
            + nl + __(`You've sent a forbidem command!`);
    },
    NoFlood: () => {
        return nl + '*── 「 ' + __('ANTI FLOOD') + ' 」 ──*'
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    NoWords: () => {
        return nl + '*── 「 ' + __('ANTI BAD WORDS') + ' 」 ──*'
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    NoToxic: () => {
        return nl + '*── 「 ' + __('ANTI TOXIC') + ' 」 ──*'
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    NoPrivate: () => {
        return nl + '*── 「 ' + __('ANTI PRIVATE') + ' 」 ──*'
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    NoKICK: () => {
        return nl + '*── 「 ' + __('ANTI KICK') + ' 」 ──*'
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    NoForeign: () => {
        return nl + '*── 「 ' + __('ANTI FOREIGN') + ' 」 ──*'
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    NoLink: () => {
        return nl + '*── 「 ' + __('ANTI LINK') + ' 」 ──*'
            + nl + __(`sending links is forbiden`)
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    NoVirtex: () => {
        return nl + '*── 「 ' + __('ANTI VIRTEX') + ' 」 ──*'
            + nl + __(`you are sending too long messages`)
            + nl + __(`you got caught by the security system. Your command has been blocked`);
    },
    PreFijo: () => {
        return __('Prefix:');
    },
    error: {
        error: __('An error has occurred:'),
        wrong_format: __("Wrong format"),
        sorry: __('Sorry there is an error!'),
        norm: __('❌ Sorry, something went wrong! Please try again a few minutes later.'),
        not_active: __('Sorry, This resource is not active right now!'),
        guiphy: __('Sorry giphy stickers order can only use giphy links. [https://giphy.com] '),
        guiphyCode: __('Failed to fetch giphy code '),
        admin: __('⛔ This command is for group admins only!'),
        owner: __('⛔ This command is only for bot owners!'),
        group: __('⛔ Sorry, this command can only be used within groups!'),
        botAdm: __('⛔ This command can only be used when the bot is admin'),
        join: __(`💣Failed! Looks like a bot got kicked out of that group, huh? Well bots can't login again dong`),
        fileTooBig: __('Sorry, an error occurred or the file is too large!'),
        limit: __('Sorry, an error has occurred or the usage limit has been reached!'),
        notClearBG: __('Sorry, object and background boundaries are unclear!'),
        nameMessage: (name, message) => {
            return __("Error: %s - Message: %s", name, message);
        }
    },
    success: {
        sending: __('Success sending'),
        join: '✅ Entrou no grupo via link!',
        sticker: 'Aqui está o seu sticker 🎉',
        greeting: `Oi pessoal 👋 Me apresentando: BodãoBot 🤖` +
            `Para ver os comandos ou menus disponíveis to o bot, envie */menu*. Mas primeiro entenda */tnc*`,
        spam: __('Success sending spam!'),
        bible: __('Success sending  Bible!'),
        audio: __("Success Audio"),
        stkToImg: __("Sticker successfully converted to image!")
    },
    what: {
        message: __(`What's the message?`),
        wrong: __(`Yes, what's wrong?`),
        text: __("What's the text sir?"),
        looking: __("What are you looking for?")
    },
    search: {
        bible: 'Searching for Bible info...',
        lyrics: (query) => {
            return `Searching lyrics for ${query}...`;
        },
        wikipedia: (query) => {
            return `Searching for ${query} in Wikipedia...`;
        },
        account: (username) => {
            return `Searching account for ${username}`;
        },
        receipt: (food) => {
            return `Searching  receipt for ${food}...`;
        },
        sticker: (query) => {
            return `Searching for sticker on ${query}...`;
        },
        youtube: (query) => {
            return `Searching for ${query} in YouTube ...`;
        },
        playstore: (query) => {
            return `Searching for ${query} in Play Store ...`;
        },
        shopee: (query) => {
            return `Searching for ${query} in Shopee...`;
        },
        whois: (ip) => {
            return `Look-up IP for ${ip}`;
        },
        movie: (title) => {
            return `Searching for Movie ${title}...`;
        },
        twitterTrend: 'Searching for Twitter trending...',
    },
    time: {
        actual: __(`Bot's current time zone`)
    },
    Erreply: () => {
        return excBold + __(' An unexpected error occurred u.u ') + exc + boldSign;
    },
    ErrorResponse: () => {
        return excBold + __('No Response') + exc + boldSign;
    },
    ErrorFetch: (command) => {
        return __('Error fetching command: %s', command);
    },
    SinLimite: (pushname) => {
        return excBold + __(' %s Your limit to use the bot is exhausted ;-;*\nIf you level up they are given to you : ~+3 limit~', pushname);
    },
    SinLimite2: (pushname) => {
        return excBold + __(' Sorry %s you ran out of limits to continue using the bot T~T', pushname) + boldSign;
    },
    Limite: (pushname) => {
        let msg1 = __('*┏━━⊱ 「 LIMIT 」*');
        let msg2 = __('*┗⊱ _%s Your remaining limit is_*', pushname);
        let msg = msg1 + nl + msg2;
        return msg;
    },
    NivelUp: (dateComplete, senderNumber, getLevel, getLevelingLevel, sender, per, getLevelingXp, role, role2) => {
        return __('「 ⚡LEVEL UPGRADE⚡  」')
            + nl + nl
            + __('➸ *Date* : %s', dateComplete)
            + nl + __('➸ *User* : %s', senderNumber)
            + nl + __('➸ *Level* : %s -> %s', getLevel, getLevelingLevel(sender))
            + nl + __('➸ *Level progress : %s*', per)
            + nl + __('➸ *XP* : %s', getLevelingXp(sender))
            + nl + __('➸ *According to your XP you become* : %s', role)
            + nl + __('➸ *Power level* : %s', role2)
            + nl
            + nl + __('⚡ *Level Up Bonus :*')
            + nl + __('_[ + 3 limit ]_');
    },
    MinGp1: () => {
        return __('Ask for support or help');
    },
    MinGp2: () => {
        return excBold + __(' Sorry, minimum number of members required in the group must be :') + boldSign;
    },
    NoTraba1: () => {
        return __('An administrator has just sent text that contains many characters -.-')
            + nl + __('If he wans not An Administrtor I would kick him out');
    },
    NoTraba2: (saltos, eliminar, pushname) => {
        return __('Mark chat as read ✓')
            + nl
            + saltos
            + nl
            + '=> '
            + __('The number : %s', eliminar)
            + nl + '=> '
            + __('Alias : %s', pushname)
            + nl
            + exc
            + __(' You have just sent a text that contains so many characters which can cause device crashes');
    },
    NoPriv: (privcre) => {
        return exc + __(' Private chat is prohibited ')
            + exc
            + nl +
            __('My creator in case you need help : %s', privcre);
    },
    NoLinks1: () => {
        return __('The good thing is that the link detected is from this group');
    },
    NoLinks2: () => {
        return exc + ` This user cannot be deleted`;
    },
    NoLinks3: () => {
        return __('Luckily I am not an administrator, I will not be able to delete you :v');
    },
    //♻️//
    Pong: (conexiont) => {
        return __('Response speed : ${conexiont} milliseconds');
    },
    NoReg2: (prefix) => {
        return excBold + __(' You are not registered in my database*')
            + nl
            + nl
            + __('_Example to register_ :')
            + nl
            + __('%srg YourName|YourAge', prefix);
    },
    SoloGp: () => {
        return excBold + __(' This command can only be used in groups') + boldSign;
    },
    SoloAdm: () => {
        return excBold + __(' This command can only be used by administrators') + boldSign;
    },
    YaActivo: (command) => {
        return __('The command %s was already active in this group', command);
    },
    YaActivoSi: (command, groupName) => {
        return __('*%s activated in the group* : %s', command, groupName);
    },
    YaActivoNo: (command, groupName) => {
        return __('*%s deactivated in the group* : %s', command, groupName);
    },
    ActiVar: () => {
        return __('ACTIVATE [✓]');
    },
    DesActiVar: () => {
        return __('DEACTIVATE [X]');
    },
    AdminBot: () => {
        return excBold + __(' The bot has to be an administrator') + boldSign;
    },
    SoloCreador: () => {
        return excBold + __(' This command can only be used by the creator of the bot') + boldSign;
    },
    SoloOwner: () => {
        return excBold + __(' This command can only be used by the Owner of the bot') + boldSign;
    },
    SoloModerator: () => {
        return excBold + __(' This command can only be used by the moderator of the bot') + boldSign;
    },
    //⚡//
    Modo0: () => {
        return __('[ OWNER MODE ON/OFF ]');
    },
    Modo1: () => {
        return __('OWNER ON🔒');
    },
    Modo2: () => {
        return __('OWNER OFF 🔓');
    },
    Modo3: () => {
        return __('Owner mode disabled, now all participants can use the BOT');
    },
    Modo4: () => {
        return __('Owner mode enabled, now only the owner of the bot can use it');
    },
    ModNet0: () => {
        return __('[ MODE 2 ]');
    },
    ModNet1: () => {
        return __('OFF-LINE 🚫');
    },
    ModNet2: () => {
        return __('ON-LINE 🌐');
    },
    ModNet3: () => {
        return __('Bot On-line mode, now all commands are available');
    },
    ModNet4: () => {
        return __('Bot Off-line mode, now only some commands will be available');
    },
    NoPriv1: () => {
        return __('Anti-Private mode disabled');
    },
    NoPriv2: () => {
        return __('Anti-Private mode activated, now everyone who talks to the bot in private will be blocked');
    },
    ModFakeNo: () => {
        return exc + __('Fake mode disabled');
    },
    ModFakeYes: () => {
        return exc + __('Fake mode enabled');
    },
    ModBlackListNo: () => {
        return exc + __('BlackList mode disabled');
    },
    ModBlackListYes: () => {
        return exc + __('BlackList mode enabled');
    },
    ModLevelingNo: () => {
        return exc + __('Leveling mode disabled');
    },
    ModLevelingYes: () => {
        return exc + __('Leveling mode enabled');
    },
    ModFakeGrNo: () => {
        return exc + __('Fake Group mode disabled');
    },
    ModWelcomeYes: () => {
        return exc + __('Welcome mode enabled');
    },
    ModWelcomeNo: () => {
        return exc + __('Welcome mode disabled');
    },
    ModFakeGrYes: () => {
        return exc + __('Fake Group mode enabled');
    },
    ModPremiumNo: () => {
        return exc + __('Premium mode disabled');
    },
    ModPremiumYes: () => {
        return exc + __('Premium mode enabled');
    },
    ModPremiumTasting: (endTasting) => {
        __('Premium mode disabled')
            + nl + __('However, Bodão allows you to use the Premium commands for a period of time, so you can get to know them better.')
            + nl + __('The tasting mode ends in....') + ': ' + endTasting
            + nl + __('To find out how to get the premium mode, contact the Bot owner, or the developer.')
            + nl + __('to know more about PREMIUM MODE use the command /premium');
    },
    ModFunYes: () => {
        return exc + __('Fun mode enabled');
    },
    ModFunNo: () => {
        return exc + __('Fun mode disabled');
    } //✍️//
    ,
    ModOffNo: () => {
        return exc + __('OffLine mode disabled');
    },
    ModOffYes: () => {
        return exc + __('OffLine mode enabled') + __('*No internet (>﹏<)*');
    }, PreDit0: () => {
        return excBold + __(' Type only a symbol or number') + boldSign;
    },
    PreDit1: () => {
        return excBold + __(' Only one digit is accepted for the prefix ') + exc + boldSign;
    },
    PreDit2: () => {
        return __('The prefix was correctly altered ✓')
            + nl
            + __('New prefix:');
    },
    NomBot0: () => {
        return excBold + __(' Type a name or nickname') + boldSign;
    },
    NomBot1: () => {
        return excBold + __(' The name must contain 15 characters maximum ') + exc + boldSign;
    },
    NomBot2: () => {
        return __('The bot name was successfully altered ✓')
            + nl
            + __('New name:');
    },
    PrinCre0: () => {
        return excBold + __(' Write your name or nickname') + boldSign;
    },
    PrinCre1: () => {
        return excBold + __(' The name must contain 25 characters maximum ') + exc + boldSign;
    },
    PrinCre2: () => {
        return __('The creator\'s name was correctly altered ✓')
            + nl
            + __('New name:');
    },
    MyRed0: () => {
        return excBold + __(' Place or paste your social networks') + boldSign;
    },
    MyRed1: () => {
        return excBold + __(' The text must contain 300 characters maximum ') + exc + boldSign;
    },
    MyRed2: () => {
        return __('The information for social networks has been edited :')
            + nl;
    },
    UsLimit0: () => {
        return excBold + __(' Write the limit you want*')
            + nl
            + __('_Current limit to use commands :_');
    },
    UsLimit1: () => {
        return excBold + __(' only numbers accepted') + boldSign;
    },
    UsLimit2: () => {
        return excBold + __(' You cannot put a value lower than') + boldSign;
    },
    UsLimit3: () => {
        return excBold + __(' Only 5 characters maximum are accepted ') + exc + boldSign;
    },
    UsLimit4: () => {
        return __('Limit changed by the value of :');
    },
    PfBot0: () => {
        return __('The bot profile was changed successfully');
    },
    PfBot1: () => {
        return __('Previous profile: ');
    },
    ProCes: (pushname) => {
        return __('_Processing, %s please wait..._', pushname);
    },
    QuImage: (prefix, command) => {
        return __('Send or Reply an image with the command %s', prefix + command);
    },
    SuPrim: () => {
        return excBold + __(' This action can only be used by replying to a recent message from the bot') + boldSign;
    },
    NoTexto: () => {
        return excBold + __(' And the text?') + boldSign;
    },
    BcGrupos0: (gmap) => {
        return __('sending transmission to %s groups, ending in %s seconds', gmap.length, gmap.length * 1.5);
    },
    BcGrupos1: (gmap) => {
        return __('Message transmitted to %s groups ✓', gmap.length);
    },
    BcTodos0: (tmap) => {
        return __('Transmitting message in %s chats\nending in %s seconds', tmap.length, tmap.length * 1.5);
    },
    BcTodos1: () => {
        return __('⚡ *Simultaneous message shared successfully :D*⚡');
    },
    BanUser0: () => {
        return __('Banned user');
    },
    BanUser1: () => {
        return __('Unbanned user');
    },
    //📝//
    CerrarGp0: (pushname, prefix, command) => {
        return `*${pushname} At what time do you want to close the group?*
  \n\n_Usage example_ : \n${prefix + command} 10 seconds`;
    },
    CerrarGp1: (UwU, pushname) => {
        return `*The group will close ${UwU}*
  \n_Action executed by : ${pushname}_`;
    },
    CerrarGp2: () => {
        return __('*[ Group closed successfully ✓ ]') + boldSign;
    },
    AbrirGp: () => {
        return __('*[ Open group ✓ ]') + boldSign;
    },
    NomGp0: () => {
        return excBold + __(' Maximum characters is 25') + boldSign;
    },
    NomGp1: (groupName) => {
        return __('Group name changed successfully ✓')
            + nl
            + __('New name : [ %s ]', groupName);
    },
    DesGp0: () => {
        return excBold + __(' Maximum characters 512') + boldSign;
    },
    DesGp1: (nwn, groupDesc) => {
        return __('Group description changed successfully ✓')
            + nl
            + __('New description : ')
            + nwn
            + nl
            + groupDesc;
    },
    PfGp0: () => {
        return __('Group profile changed successfully');
    },
    PfGp1: () => {
        return __('Previous image : ');
    },
    //🧑‍💻//
    ToDos: (groupName, pushname, texto) => {
        return __('⚡ *Summoning the members of the group* : %s', groupName)
            + nl
            + __('*~> summoner* : _%s_', pushname)
            + nl
            + __('*~> Message* : _%s_', (texto ? texto : 'There is no :v'))
            + nl;
    },
    DarP: (usuariop, pushname) => {
        return __('*The participant @%s was made admin of the group ✓*', usuariop)
            + nl
            + __('_Action executed by %s_', pushname);
    },
    QuitP: (usuarioq, pushname) => {
        return __('*The administrator @%s was demoted from being admin ✓*', usuarioq)
            + nl
            + __('_Action executed by %s_', pushname);
    },
    KickUSer: (adiuser, pushname) => {
        return `*The participant @${adiuser} was removed from the group ✓*\n_Action executed by ${pushname}_`;
    },
    UsEnLinea: () => {
        return __('=> [ Online User List ]')
            + nl
            + __('=> Quantity : ');
    },
    //
    Baneao: (senderNumber) => {
        return __('%s you are banned, now you will not be able to use the bot :v', senderNumber);
    },
    BotInfo: () => {
        return __('[ ' + __('INFO-BOT') + ' ]');
    },
    GraciAs: () => {
        return __('[ ' + __('SUPPORT') + ' ]');
    },
    MasCmds: () => {
        return __('[ ' + __('MORE COMMANDS') + ' ☰ ]');
    },
    VerCmds: () => {
        return '[ ' + __('SEE COMMANDS') + ' ☰ ]';
    },
    YaReg: () => {
        return excBold + __('You were already registered in my database') + boldSign;
    },
    MyReg: () => {
        return excBold + __('Please add a slash between the texts*\n" | "');
    },
    MyReg0: () => {
        return excBold + __('Please add a slash between name and age*\n" | "');
    },
    MyReg1: () => {
        return excBold + __('In age only numbers are accepted -.-') + boldSign;
    },
    MyReg2: () => {
        return excBold + __('Bruh the name is too long ._.') + boldSign;
    },
    MyReg3: (age) => {
        return excBold + __('Maximum age %s years', age) + boldSign;
    },
    MyReg4: (age) => {
        return excBold + __('Minimum age %s years', age) + boldSign;
    },
    MyReg5: (nwn, time, nomreg, pushname, edreg, sender, codereg) => {
        return __('〘  *REGISTRO* 〙')
            + nwn
            + nl
            + '❥' + __('Registration date and time')
            + nl
            + '❥'
            + time
            + nl
            + '┏─━─━━─━─━━─━─'
            + nl
            + '╠≽️ '
            + boldSign + __('Registered Name') + boldSign + ': '
            + nl + '╠≽️ ' + nomreg
            + nl + '╠≽️ '
            + __('*Name used in whatsapp*: *%s*', pushname)
            + nl + '╠≽️ '
            + __('*Age* : *%s*', edreg)
            + nl + '╠≽️ '
            + __('*Nº*: ')
            + nl + '╠≽️ '
            + __('*wa.me/%s*', sender.split("@")[0])
            + '┗─━─━━─━─━━─━─'
            + nl
            + __('_Registration code_ : *%s* ', codereg);
    },
    MyReg6: () => {
        return __('Have a great day! :D');
    },
    CmdsR0: () => {
        return __('More commands');
    },
    CmdsR1: () => {
        return __('Random-Menu');
    },
    CmdsA0: () => {
        return __('Artistic');
    },
    CmdsA1: () => {
        return __('Create-Logos');
    },
    CmdsO0: () => {
        return __('Otaku/Anime');
    },
    CmdsO1: () => {
        return __('Random-Anime');
    },
    CmdsH0: () => {
        return __('Hentai/Anime');
    },
    CmdsH1: () => {
        return __('The-Bible');
    },
    MCmds0: () => {
        return __('Tap here ⚡');
    },
    MCmds1: () => {
        return __('Select only one option');
    },
    AntLinkInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ́  ᴬⁿᵗᶦ ˡᶦⁿᵏˢ ᵉ ᵉⁿˡᵃᶜᵉˢ ᵐᵘˡᵗᶦᵖˡᵒˢ');
    }, AntiFakeInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ́  ᴬⁿᵗᶦ ⁿᵘᵐᵉʳᵒˢ ᶠᵃˡˢᵒˢ ᵒ ᵛᶦʳᵗᵘᵃᶦˢ');
    },
    AFKInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᴬᶠᴷ');
    },
    FunModeInfo: () => {
        return __('Info:')
            + nl
            + 'ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵃ ᵐᵃᶦᵒʳᶦᵃ ᵈᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ 𐞥ᵘᵉ ᵒ ᵇᵒᵗ ᶜᵒⁿᵗᵉᵐ ';
    },
    BanModeInfo: () => {
        return __('Info:')
            + nl
            + 'ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ de banimento no chat ';
    },
    KickModeInfo: () => {
        return 'ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ kick no chat'; //'Info:\x0aᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵇᵃⁿᵉ ᵒ ᵍʳᵘᵖᵒ ᵃᵗᵘᵃˡ ᵖᵃʳᵃ ᶦ́ᵐᵖᵉᵈᶦ⁻ˡᵒ ᵈᵉ ᵘˢᵃʳ ᵒ ᵇᵒᵗ'
    },
    EnableInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵘᵐ ᶜʰᵃᵗ⁻ᵇᵒᵗ ᵉᵐ ᵘᵐ ᵍʳᵘᵖᵒ ᵈᵒ ʷʰᵃᵗˢᵃᵖᵖ');
    },
    AntiForeignInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᶜᵒⁿᵗʳᵃ ⁿᵘᵐᵉʳᵒˢ ᵈᵉ ᵖʳᵉᶠᶦˣᵒˢ ᵈᶦᶠᵉʳᵉⁿᵗᵉˢ ᵈᵒ ᶜʳᶦᵃᵈᵒʳ');
    },
    AntiFakes2Info: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᶜᵒⁿᵗʳᵃ ⁿᵘᵐᵉʳᵒˢ ᶠᵃˡˢᵒˢ ᵃᵐᵉʳᶦᶜᵃⁿᵒˢ ⁽⁺¹⁾');
    },
    AntiLinkInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᴬⁿᵗᶦ ˡᶦⁿᵏˢ ᵈᵉ ʷʰᵃᵗˢᵃᵖᵖ ᵉ ᵒᵘᵗʳᵃˢ ʳᵉᵈᵉˢ ˢᵒᶜᶦᵃᶦˢ');
    },
    AntiVirtexInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᴬⁿᵗᶦ ᵗᵉˣᵗᵒˢ ᶜᵒᵐ ᵛᶦʳᵒˢ ⁿᵒ ᵂʰᵃᵗˢᵃᵖᵖ');
    },
    AntiPrivateInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᴬⁿᵗᶦ ᵖʳᶦᵛᵃᵈᵒ')
            + nl
            + __('ᶜʰᵃᵗ ᵖʳᶦᵛᵃᵈᵒ ᶜᵒᵐ ᵇᵒᵗ ᵖʳᵒᶦᵇᶦᵈᵒ');
    },
    AutoWelcomeInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵃˢ ᵇᵒᵃˢ ᵛᶦⁿᵈᵃˢ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃˢ');
    },
    LevelingInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵘᵐ ⁿᶦᵛᵉˡ ᶦⁿᵗᵉʳᵃᵗᶦᵛᵒ ᵖᵃʳᵃ ᵒˢ ᵖᵃʳᵗᶦᶜᶦᵖᵃⁿᵗᵉˢ');
    },
    HentaiInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ ᵃᵈᵘˡᵗᵒˢ ⁽⁺¹⁸⁾');
    },
    AnimeInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵒ ᵐᵒᵈᵒ ᵃⁿᶦᵐᵉ ');
    },
    AntiPornInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵒ ᵐᵒᵈᵒ  ᴬⁿᵗᶦ ᵖᵒʳⁿ ');
    },
    OffLineInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᵒᶠᶠ ˡᶦⁿᵉ ');
    },
    AntiFloodInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᴬⁿᵗᶦ ᶠˡᵒᵒᵈ');
    },
    PremiumInfo: () => {
        return __('Info:')
            + nl
            + __('ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ ᵖʳᵉᵐᶦᵘᵐ');
    },
    NotAllow: __('command not allowed to run'),
    BotIdiomChanged: (lang) => {
        __(' idioma do bot foi alterado com sucesso para: %s ', lang);
    },
    PromoteAdmin: __('Which participant do you want to make an administrator?'),
    Promote: __('promote'),
    DemoteAdmin: __('Which administrator do you want to remove his position?'),
    Demote: __('demote'),
    Remove: __('remove'),
    UserKick: __('Which user do you want to remove!?'),
    ProfileMemory: __('Memory consumption'),
    ProfileArch: __('Architecture'),
    ProfileSpeed: __('Processing speed'),
    ProfileConnection: __('Connection speed'),
    ProfilePlataform: __('Platform'),
    Library: __('Library'),
    ProfileExecTime: __('Execution time'),
    ProfileVersion: __('Bot version'),
    ImageRequestedBy: (command, senderNUMBER) => {
        return '┏━━⊱ ' + __('Image') + ': ' + command
            + nl
            + '┣━⊱ ' + __('Requested by') + ': ' + senderNUMBER
            + nl
            + '┗⊱ ' + __('Date') + ': ' + Utils.dateComplete;
    },
    ImageRequestedBywithSource: (command, senderNUMBER, source = null) => {
        const img = source ? source.source_url : command;
        const art_name = source ? source.artist_name : '';
        const art_href = source ? source.artist_href : '';
        return '┏━━⊱ ' + __('Image') + ': ' + img
            + nl + '┣━⊱ ' + __('artist name') + ': ' + art_name
            + nl + '┣━⊱ ' + __('artist url') + ': ' + art_href
            + nl + '┣━⊱ ' + __('Requested by') + ': ' + senderNUMBER
            + nl
            + '┗⊱ ' + __('Date') + ': ' + Utils.dateComplete;
    },
    ImageTextPro1: (command, text, pushname) => {
        return nl +
            __('*┏━❪CREATE-LOGOS❫━*')
            + nl
            + '*┃*'
            + nl
            + '*┣ ' + __('The Draw') + '*: _'
            + command
            + `_`
            + nl
            + `*┃*`
            + nl
            + '*┣ ' + __('Text') + '*: _' + text
            + `_`
            + nl + `*┃*`
            + nl + '*┣ ' + __('Author') + '*: _' + pushname + `_`
            + nl + `*┃*`
            + nl + '*┣ ' + __('Creation Date') + '*: _' + Utils.dateComplete + `_`
            + nl + `*┃*`
            + nl + `*┗❪ TextPro_1 ❫━*`;
    },
    ImageTextPro2: (command, text, pushname) => {
        return nl +
            __('*┏━❪CREATE-LOGOS❫━*')
            + nl
            + '*┃*'
            + nl
            + '*┣ ' + __('The Draw') + '*: _'
            + command
            + `_`
            + nl
            + `*┃*`
            + nl
            + '*┣ ' + __('Text') + '*: _' + text
            + `_`
            + nl + `*┃*`
            + nl + '*┣ ' + __('Author') + '*: _' + pushname + `_`
            + nl + `*┃*`
            + nl + '*┣ ' + __('Creation Date') + '*: _' + Utils.dateComplete + `_`
            + nl + `*┃*`
            + nl + `*┗❪ TextPro_2 ❫━*`;
    },
    SearchResult: (pushname) => {
        return '_' + __(`Seraching Result`) + ', ' + pushname + ' ' + __('please wait') + '..._';
    },
    tos: (ownerNumber) => {
        if (Array.isArray(ownerNumber) && ownerNumber.length > 0) {
            ownerNumber = ownerNumber[0];
        }
        else if (Array.isArray(ownerNumber) && ownerNumber.length === 0) {
            ownerNumber = '';
        }
        const number = ownerNumber.replace(/@c.us|@s.whatsapp.net/g, '');
        return nl
            + boldSign + '── 「 ' + __('TERMS OF SERVICE') + ' 」 ──' + boldSign
            + __(`This bot is an open-source bot, come with the name of Bodão which is available on GitHub.
The owner/hoster of this bot is independent from the responsibility and supervision of the developer (Rasputtim).
Owner/hoster may plagiarize, add, delete, replace source code with notes *DO NOT SELL* this source code in any form.
If an error occurs, the first person you should contact is the owner/hoster.`)
            + nl + __('If you want to contributing to this project, visit:')
            + nl + __('https://github.com/Rasputtim/BodaoBot')
            + nl + __('Contact persons:')
            + nl + __('wa.me/%s (Owner/hoster)', number)
            + nl + __('wa.me/5511986571658 (Developer)')
            + nl
            + nl + __('If you want to have a Bot like this, that is to be a Bot Owner')
            + nl + __('Contact the Developer')
            + nl + __('wa.me/5511986571658 (Developer)')
            + nl
            + nl + __('You guys can also support me to keep this bot up to date with:')
            + nl + nl
            + __('Thank you!')
            + nl
            + __('Bodão Corp.');
    },
    textTnC: () => {
        return nl + __('BodãoBot is a Bot')
            + nl + __('*Bot* is an acronym for the word Robot which means a system programmed by a computer') + '.'
            + nl + __('Therefore, the answer or answer made by Bodão is not human') + '.'
            + nl + __('By using this bot, you *agree* to the following terms and conditions') + ':'
            + nl + '- ' + __('Pause each command') + '.'
            + nl + '- ' + __('Do not connect to Bodão, or you will be automatically blocked') + '.'
            + nl + '- ' + __('Spam is strictly prohibited. Captured = automatically banned') + '.'
            + nl + '- ' + __('Os Bodão will not respond to your complaints') + '.'
            + nl + '- ' + __('Bodão does not save uploaded images/media') + '.'
            + nl + '- ' + __('Bodão does not store your personal data anywhere') + '.'
            + nl + '- ' + __('Bodão is not responsible for requests to him') + '.'
            + nl + '- ' + __('Bodão runs on the server separately (not on your mobile)') + '.'
            + nl + '- ' + __('Bodão will be monitored regularly by the owner, so there is a possibility that the chat will be read by him') + '.'
            + nl + '- ' + __('Logs will be cleared at the beginning of each month or when necessary') + '.'
            + nl + __(`Are you interested in this open source project?`)
            + nl + __(`Collaborate now: https://github.com/rasputtim/`)
            + nl + nl
            + __(`Yours sincerely`) + ','
            + nl
            + __('The Bodão') + '.';
    },
    textMenuHeader: (pushname) => {
        let n = new Date().getHours();
        let ucapan = ''; //means saudação
        if (3 < n && n <= 9)
            ucapan = `*Bom Dia  🌤️*`;
        else if (9 < n && n <= 14)
            ucapan = `*Boa Tarde ☀️*`;
        else if (14 < n && n <= 18)
            ucapan = `*Boa Tarde 🌻*`;
        else
            ucapan = `*Boa Noite 💤*`;
        /*
        Além de ${q3}(/)${q3} o bot também responderá aos seguintes símbolos:
      ${q3}\\ / ! $ ^ % & + . , -${q3}
      Responda à sua mensagem contendo o comando
      com '..' (ponto duplo) to enviá-lo de volta.
        */
        return nl + __('hi')
            + nl + `${pushname}!`
            + nl + `${ucapan} 👋️`
            + nl + __(`let me introduce myself, i'm the`)
            + nl
            + `
            ━━━
┏━━┓┃┃┃┃┃┏┓━━━┓━━━┓
┃┏┓┃┃┃┃┃┃┃┃┏━┓┃┏━┓┃
┃┗┛┗┓━━┓━┛┃┃┃┃┃┃┃┃┃
┃┏━┓┃┏┓┃┏┓┃┗━┛┃┃┃┃┃
┃┗━┛┃┗┛┃┗┛┃┏━┓┃┗━┛┃
┗━━━┛━━┛━━┛┛┃┗┛━━━┛
┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃
┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃┃

┏━━┓┃┃┃┃┏┓┃
┃┏┓┃┃┃┃┃┛┗┓
┃┗┛┗┓━━┓┓┏┛
┃┏━┓┃┏┓┃┃┃┃
┃┗━┛┃┗┛┃┃┗┓
┗━━━┛━━┛┗━┛
┃┃┃┃┃┃┃┃┃┃┃
┃┃┃┃┃┃┃┃┃┃┃`
            + nl + nl
            + __(`Here are some of my features:✨
I have a lot of commands, so
they are divided into groups:

TO CONVERT
SEARCH
DOWNLOAD
...

to use my commands you must use the prefix / before the command:
Example: /menu

To know which commands in a GROUP, use:
/listacomandos <GROUP>
Example: /listacomandos CONVERTER

To learn how to use a command use:
/help <command>
Example: /help ytmp3`)
            + nl + readmore
            + __(`Notes:
Don't be blocked for nothing! ⛔
Send the command help <command> to see what each option means.

Calculator operations use prefix =
(for example: =10+2+4)`);
    },
    textMenuAFooter: () => {
        return nl + __(`Notes:

I have an AI conversational mode
To talk to me, simi mode must be enabled.
Ask the bot owner to enable it so we can chat.

Hope you have a great day!✨
If you find this bot useful, please *donate* ✨`);
    },
    textPremium: () => {
    },
    toShowMenu: (prefix) => {
        return __(`to show menu use the prefix %s before the comand, that is: /menu`, prefix);
    }
};
export default eng;
/*
⡏⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠉⠹
⡇⢸⣿⡟⠛⢿⣷⠀⢸⣿⡟⠛⢿⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡇⠀⢸⣿⡇⠀
⡇⢸⣿⣧⣤⣾⠿⠀⢸⣿⣇⣀⣸⡿⠃⢸⣿⡇⠀⢸⣿⡇⢸⣿⣇⣀⣸⣿⡇⠀
⡇⢸⣿⡏⠉⢹⣿⡆⢸⣿⡟⠛⢻⣷⡄⢸⣿⡇⠀⢸⣿⡇⢸⣿⡏⠉⢹⣿⡇⠀
⡇⢸⣿⣧⣤⣼⡿⠃⢸⣿⡇⠀⢸⣿⡇⠸⣿⣧⣤⣼⡿⠁⢸⣿⡇⠀⢸⣿⡇⠀
⣇⣀⣀⣀⣀⣀⣀⣄⣀⣀⣀⣀⣀⣀⣀⣠⣀⡈⠉⣁⣀⣄⣀⣀⣀⣠⣀⣀⣀⣰
⣇⣿⠘⣿⣿⣿⡿⡿⣟⣟⢟⢟⢝⠵⡝⣿⡿⢂⣼⣿⣷⣌⠩⡫⡻⣝⠹⢿⣿⣷
⡆⣿⣆⠱⣝⡵⣝⢅⠙⣿⢕⢕⢕⢕⢝⣥⢒⠅⣿⣿⣿⡿⣳⣌⠪⡪⣡⢑⢝⣇
⡆⣿⣿⣦⠹⣳⣳⣕⢅⠈⢗⢕⢕⢕⢕⢕⢈⢆⠟⠋⠉⠁⠉⠉⠁⠈⠼⢐⢕⢽
⡗⢰⣶⣶⣦⣝⢝⢕⢕⠅⡆⢕⢕⢕⢕⢕⣴⠏⣠⡶⠛⡉⡉⡛⢶⣦⡀⠐⣕⢕
⡝⡄⢻⢟⣿⣿⣷⣕⣕⣅⣿⣔⣕⣵⣵⣿⣿⢠⣿⢠⣮⡈⣌⠨⠅⠹⣷⡀⢱⢕
⡝⡵⠟⠈⢀⣀⣀⡀⠉⢿⣿⣿⣿⣿⣿⣿⣿⣼⣿⢈⡋⠴⢿⡟⣡⡇⣿⡇⡀⢕
⡝⠁⣠⣾⠟⡉⡉⡉⠻⣦⣻⣿⣿⣿⣿⣿⣿⣿⣿⣧⠸⣿⣦⣥⣿⡇⡿⣰⢗⢄
⠁⢰⣿⡏⣴⣌⠈⣌⠡⠈⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣬⣉⣉⣁⣄⢖⢕⢕⢕
⡀⢻⣿⡇⢙⠁⠴⢿⡟⣡⡆⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣵⣿
⡻⣄⣻⣿⣌⠘⢿⣷⣥⣿⠇⣿⣿⣿⣿⣿⣿⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣷⢄⠻⣿⣟⠿⠦⠍⠉⣡⣾⣿⣿⣿⣿⣿⣿⢸⣿⣦⠙⣿⣿⣿⣿⣿⣿⣿⣿⠟
⡕⡑⣑⣈⣻⢗⢟⢞⢝⣻⣿⣿⣿⣿⣿⣿⣿⠸⣿⠿⠃⣿⣿⣿⣿⣿⣿⡿⠁⣠
⡝⡵⡈⢟⢕⢕⢕⢕⣵⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣶⣿⣿⣿⣿⣿⠿⠋⣀⣈⠙
⡝⡵⡕⡀⠑⠳⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠛⢉⡠⡲⡫⡪⡪⡣
*/
//# sourceMappingURL=eng.js.map
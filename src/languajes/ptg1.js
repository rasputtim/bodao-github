import fs from 'fs';
import { PluginManager } from '../factory/pluginManager.js';
//const localeService = container.resolve('localeService');
//const __ = LocaleService.__
//const __n = LocaleService.__n
const nl = '\n';
const exc = '[ ! ]';
const excBold = '*[ ! ]';
const boldSign = '*';
const MyPkg = JSON.parse(fs.readFileSync('./package.json'));
const MyInfo = JSON.parse(fs.readFileSync('./src/informacion.json'));
const wait1 = '⏳ Pronto, em andamento!';
const wait2 = '⏳ Ok, calma, espere um minuto!';
const wait3 = '⏳ Por favor, espere um minuto...';
const wait4 = '⏳ Shap, por favor espere!';
const wait5 = '⏳ Tudo bem, seja paciente!';
const wait6 = '⏳ Em andamento!';
const wait7 = '⏳ Uau!';
const waits = [
    wait1,
    wait2,
    wait3,
    wait4,
    wait5,
    wait6,
    wait7
];
const pongs = [
    'Perca o jogo*\nFong 🏓',
    `🏓 Pong!!! 🏓`,
    `🏓 Pong!!! 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    'Responda com um soco de 160km/h*\nPong 🏓',
    `Pong 🏓`,
    `Pong 🏓`,
    'Ele bate na cabeça dele*\nPong 🏓',
    `Pong 🏓`,
    `Pong 🏓`,
    `Quebra o crânio*\nPong!!!🏓`,
    'Pong 🏓',
    `Pong 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    `Ele ganha o jogo*\n🏓 Pong!!! 🏓`,
    `Mata ele*\nPong!!! 🏓🏓🏓`
];
let tags = {
    'main': 'MENU UTAMA',
    'game': 'MENU GAME',
    'rpg': 'MENU RPG',
    'xp': 'MENU EXP',
    'premium': 'MENU PREMIUM',
    'group': 'MENU GROUP',
    'absen': 'MENU ABSEN',
    'vote': 'MENU VOTE',
    'owner': 'MENU OWNER',
    'fun': 'MENU FUN',
    'sticker': 'MENU CONVERT',
    'maker': 'MENU MAKER',
    'github': 'MENU GITHUB',
    'internet': 'INTERNET',
    'kerang': 'MENU KERANG',
    'anime': 'MENU ANIME',
    'downloader': 'DOWNLOADER',
    'nsfw': 'MENU NSFW',
    'tools': 'MENU TOOLS',
    'advanced': 'ADVANCED',
    'quotes': 'MENU QUOTES',
    'info': 'MENU INFO',
};
const oldmenu = (prefix) => {
    return `
~|-------------------------|~
⮕ *_COMANDOS_  ☷*
~|-------------------------|~

*╔═══════════*
*║ _MULTIMÍDIA :_*
*║╭——————————*
*║├ ${prefix}informacões*
*║├ ${prefix}apoio*
*║├ ${prefix}wame*
*║├ ${prefix}meulimite*
*║├ ${prefix}meunivel*
*║├ ${prefix}estadobot*
*║├ ${prefix}criador*
*║├ ${prefix}grupoinfo*
*║├ ${prefix}admins*
*║├ ${prefix}grupolink*
*║├ ${prefix}loja*
*║├ ${prefix}horario*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _PASSATEMPO :_*
*║╭——————————*
*║├ ${prefix}quien*
*║├ ${prefix}ruleta*
*║├ ${prefix}caçaniqueis*
*║├ ${prefix}calumnia*
*║├ ${prefix}dados*
*║├ ${prefix}dado*
*║├ ${prefix}emparejar*
*║├ ${prefix}top5*
*║├ ${prefix}top10 
*║├ ${prefix}testgay*
*║├ ${prefix}votacion*
*║├ ${prefix}sivotar*
*║├ ${prefix}novotar*
*║├ ${prefix}vervotos*
*║├ ${prefix}reiniciarvotos*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _CONVERSOR :_*
*║╭——————————*
*║├ ${prefix}sticker*
*║├ ${prefix}stickergif*
*║├ ${prefix}rescom*
*║├ ${prefix}aimg*
*║├ ${prefix}reversavid*
*║├ ${prefix}lentovid*
*║├ ${prefix}acelerarvid*
*║├ ${prefix}amp3*
*║├ ${prefix}aumentarbajo*
*║├ ${prefix}distorsionado*
*║├ ${prefix}lento*
*║├ ${prefix}demonio*
*║├ ${prefix}superveloz*
*║├ ${prefix}ardilla*
*║├ ${prefix}nightcore*
*║├ ${prefix}inframundo*
*║├ ${prefix}lojaimg*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _CMDS ADMINS :_*
*║╭——————————*
*║├ ${prefix}cgpen*
*║├ ${prefix}agp*
*║├ ${prefix}nombregp*
*║├ ${prefix}editdesgp*
*║├ ${prefix}fotogrupo*
*║├ ${prefix}invocar*
*║├ ${prefix}darpoder*
*║├ ${prefix}quitarpoder*
*║├ ${prefix}ban*
*║├ ${prefix}withlink*
*║├ ${prefix}lenguaje*
*║╰┬> ATIVADORES*
*║╭╯*
*║├ ${prefix}modofull*
*║├ ${prefix}modoanime*
*║├ ${prefix}hmodo*
*║├ ${prefix}nivelear*
*║├ ${prefix}antilink*
*║├ ${prefix}antilink2*
*║├ ${prefix}antitraba*
*║├ ${prefix}antifakes*
*║├ ${prefix}antiextranjeros*
*║├ ${prefix}wlc*
*║╰┬> JOGOS*
*║╭╯*
*║├ ${prefix}deathnote*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _CMDS DO CRIADOR :_*
*║╭——————————*
*║├ ${prefix}modo1*
*║├ ${prefix}publico*
*║├ ${prefix}privado*
*║├ ${prefix}modo2*
*║├ ${prefix}withlink*
*║├ ${prefix}nolink*
*║├ ${prefix}noprivado*
*║├ ${prefix}siprivado*
*║├ ${prefix}predit*
*║├ ${prefix}verip*
*║├ ${prefix}nombrebot*
*║├ ${prefix}mycreador*
*║├ ${prefix}misredes*
*║├ ${prefix}editarlimite*
*║├ ${prefix}perfilbot*
*║├ ${prefix}suprimir*
*║├ ${prefix}bcgc*
*║├ ${prefix}bc*
*║├ ${prefix}banear*
*║├ ${prefix}quitarbaneo*
*║├ ${prefix}.*
*║╰┬> ATIVADORES*
*║╭╯*
*║├ ${prefix}chatbot*
*║├ ${prefix}banchat*
*║╰┬> ~MODO KUAKER~*
*║ ~NOTE- Esses comandos estão bloqueados por vírus~*
*║ ~cuidado ao usá-los!~*
*║╭╯*
*║├ ${prefix}c1*
*║╰┬> AVANÇADO*
*║╭╯*
*║├=>*
*║├ >*
*║├ $*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _MAIS COMANDOS EXTRAS :_*
*║╭——————————*
*║├ ${prefix}mascmds*
*║├ ${prefix}randmenu*
*║├ ${prefix}crealogos*
*║├ ${prefix}mianime*
*║├ ${prefix}labiblia*
*║╰——————————*
*╚═══════════*

`;
};
const ptg = {
    pong: () => {
        const randIndex = Math.floor(Math.random() * pongs.length);
        return pongs[randIndex];
    },
    wait: () => {
        const randIndex = Math.floor(Math.random() * waits.length);
        return waits[randIndex];
    },
    time: {
        titleTime: 'TIMEZONES',
        actual: 'Zona horaria actual del bot\n'
    },
    Greetings: ['Olá', 'Que tal', 'Oi', 'Olá', 'Olá', 'Namaste', 'Ei!', 'Aloha', 'Meu Rei', `como você está`, 'oi', 'foda-se bem'],
    PanelSubMenu: (tag, prefix, pushname, actividad, role, monospace, nwn) => {
        const plugArray = PluginManager.getPlufinsForTag(tag);
        let textOption = `╔═══════════`
            + `\n║ _${tag} :_`
            + `\n║╭——————————`;
        plugArray.forEach(plugin => {
            if (plugin.showInMenu) {
                if (Array.isArray(plugin.command)) {
                    plugin.command.forEach((element, index) => {
                        if (index == 0 && plugin.command.length > 1) {
                            textOption += `\n║├ *${prefix}${element}*`;
                            textOption += `\n║├─> *ᵃᵖᵉᴸᶦᵈᵒˢ*`;
                        }
                        else if (index == 0 && plugin.command.length == 1) {
                            textOption += `\n║├ *${prefix}${element}*`;
                            textOption += `\n║╰──────── `;
                        }
                        else if (index == plugin.command.length - 1) {
                            textOption += `\n║╰─> ${prefix}${element}`;
                        }
                        else
                            textOption += `\n║├─> ${prefix}${element}`;
                    });
                }
            }
        });
        return `${monospace}< [ ${MyInfo.NomeDoBot} ] >${monospace}
╔═══════════
║❂ Tempo ativo : ${actividad}
║❂ Versão do bot : ${MyPkg.version}
║❂ O Criador : ${MyInfo.CoCreador}
║❂ Prefixo : 「  ${prefix}  」
║❂ Cliente : ${pushname}️
║❂ Função do cliente : ${role}
╚═══════════
${nwn}
~|-------------------------|~
⮕ *COMANDOS  ☷*
~|-------------------------|~

${textOption}

`;
    },
    PanelMenu: (prefix, pushname, actividad, role, monospace, nwn) => {
        let tagText = "";
        PluginManager.pluginTags.forEach(tag => {
            tagText += `\n <[${tag}]>`;
        });
        return `${monospace}< [ ${MyInfo.NomeDoBot} ] >${monospace}
╔═══════════
║❂ Tempo ativo : ${actividad}
║❂ Versão do bot : ${MyPkg.version}
║❂ O Criador : ${MyInfo.CoCreador}
║❂ Prefixo : 「  ${prefix}  」
║❂ Cliente : ${pushname}️
║❂ Função do cliente : ${role}
╚═══════════
${nwn}
~|-------------------------|~
⮕ * GRUPOS DE COMANDOS  ☷*
~|-------------------------|~

${tagText}

`;
    },
    FooterPM: (CovidApi) => {
        return `┏「 DADOS - COVID19 」─┓
┃➲ Casos positivos : ${CovidApi.cases}
┃✯ Recuperado : ${CovidApi.recovered}
┃❥ Tratados : ${CovidApi.active}
┃✞ Morto : ${CovidApi.deaths}
┗─━─━ 「 🌎 」 ━─━─┛`;
    },
    PanelMenu2: (prefix, monospace) => {
        return `${monospace}[ MENU-RANDOM ]${monospace}
 
╔═══════════
║
╠═> MULTIMÍDIA
║➣ ${prefix}miperfil
║➣ ${prefix}gruposwa
║➣ ${prefix}voz
║➣ ${prefix}covid19
║➣ ${prefix}clima
║➣ ${prefix}github
║➣ ${prefix}traductor
║➣ ${prefix}pinterest
║➣ ${prefix}imagen
║➣ ${prefix}google
║➣ ${prefix}wikipedia
║➣ ${prefix}playstore
║➣ ${prefix}letra
║➣ ${prefix}wallpaper
║➣ ${prefix}tiktok
║
╠═> DOWNLOADER
║➣ ${prefix}mediafire
║➣ ${prefix}play
║➣ ${prefix}play2
║➣ ${prefix}fbdl
║➣ ${prefix}tiktokdl
║
╠═> PASSATEMPO
║➣ ${prefix}simi
║➣ ${prefix}minidatos
║➣ ${prefix}minombre
║➣ ${prefix}frasesamor
║➣ ${prefix}preguntame
║➣ ${prefix}vof
║➣ ${prefix}notificacion
║➣ ${prefix}tumama
║➣ ${prefix}comediante
║➣ ${prefix}consejo
║➣ ${prefix}randimg
║➣ ${prefix}djbot
║➣ ${prefix}xd
║➣ ${prefix}cachorros
║➣ ${prefix}gatos
║➣ ${prefix}patos
╚═══════════
`;
    },
    MenuArte: (prefix, monospace) => {
        return `${monospace}[ CRIAR-LOGOTIPO ]${monospace}
 
╔═══════════
║☞ ${prefix}attp
║☞ ${prefix}halloween
║☞ ${prefix}lava
║☞ ${prefix}toxico
║☞ ${prefix}hotmetal
║☞ ${prefix}tempestade
║☞ ${prefix}gneon
║☞ ${prefix}neontxt
║☞ ${prefix}arcoiris
║☞ ${prefix}gelo
║☞ ${prefix}lapis
║☞ ${prefix}gameover
║☞ ${prefix}roca3d
║☞ ${prefix}ficcion
║☞ ${prefix}romper
║☞ ${prefix}sangre
║☞ ${prefix}pornhub
╚═══════════
`;
    },
    AniMenu: (prefix, monospace) => {
        return `${monospace}[ ANIME-MENU ]${monospace}
 
╔═══════════
║圆 ${prefix}himnootaku
║圆 ${prefix}reconime
║圆 ${prefix}name?
║圆 ${prefix}anifrase
║圆 ${prefix}waifu
║圆 ${prefix}waifuhd
║圆 ${prefix}facehd
║圆 ${prefix}aniwpp
║圆 ${prefix}neko
║圆 ${prefix}neko2
║圆 ${prefix}neko3
║圆 ${prefix}snime
║圆 ${prefix}otakutest
╚═══════════
`;
    },
    MenuH: (prefix, monospace) => {
        return `${monospace}[ MENU +18 ]${monospace}
 
╔═══════════
║㋡ ${prefix}stickerh
║㋡ ${prefix}hentai
║㋡ ${prefix}hentai2
║㋡ ${prefix}hwaifu
║㋡ ${prefix}hneko
║㋡ ${prefix}traph
║㋡ ${prefix}lewd
║㋡ ${prefix}lewdk
║㋡ ${prefix}cum_jpg
║㋡ ${prefix}pussy_jpg
║㋡ ${prefix}feet
║㋡ ${prefix}lewdkemo
║㋡ ${prefix}solo
║㋡ ${prefix}avatar
║㋡ ${prefix}nsfw_avatar
║㋡ ${prefix}erokemo
║㋡ ${prefix}ero
║㋡ ${prefix}hololewd
║㋡ ${prefix}tits
║㋡ ${prefix}eroyuri
║㋡ ${prefix}yuri
║㋡ ${prefix}keta
║㋡ ${prefix}eron
║㋡ ${prefix}erok
║㋡ ${prefix}erofeet
║㋡ ${prefix}femdom
║㋡ ${prefix}futanari
╚═══════════
`;
    },
    BanCall: (helpcall) => {
        return `As chamadas para o número do bot são proibidas!\nEntre em contato com o criador : ${helpcall}`;
    },
    AutoSaludo: () => {
        return `*_Meu criador principal entrou no grupo_ ✓*\n*[ Receber nwn ]*`;
    },
    Wlc1: () => {
        return `Me dê uma estrela`;
    },
    Wlc2: () => {
        return `O Criador`;
    },
    Wlc3: (num, metadata, dateComplete, gpdesc) => {
        return `⚡ *Receber @${num.split("@")[0]} a este grande grupo :*\n${metadata.subject}\n⚡ *Data de admissão : ${dateComplete}*\n⚡ _*Espero e que goste da sua estadia aqui, não se esqueça de respeitar os participantes e as regras*_ ;)\n\n*Normas do grupo atualmente :* \n${gpdesc}`;
    },
    Wlc4: () => {
        return `TCHAU... 😔`;
    },
    Wlc5: (num) => {
        return `[ ! ] Deixou o grupo : @${num.split("@")[0]}`;
    },
    NoSpam1: () => {
        return `*Aguarde alguns segundos antes de usar outro comando ✓*`;
    },
    NoSpam2: (pushname) => {
        return `[ ! ] ${pushname} Por favor, não sature o bot ;-;`;
    },
    NoReg: (pushname) => {
        return `[ ! ] ${pushname} Você deve se registrar para começar a usar o bot`;
    },
    PreFijo: () => {
        return `Prefixo:`;
    },
    Erreply: () => {
        return `*[ ! ] Um erro inesperado ocorreu u.u [ ! ]*`;
    },
    SinLimite: (pushname) => {
        return `*[ ! ] ${pushname} Seu limite para usar o bot está esgotado ;-;*\nSe você subir de nível, eles são dados a você : ~+3 limite~`;
    },
    SinLimite2: (pushname) => {
        return `*[ ! ] Sinto muito ${pushname} você ficou sem limites para continuar usando o bot T~T*`;
    },
    Limite: (pushname) => {
        return `*┏━━⊱ 「 LIMITE 」*
*┗⊱ _${pushname} Seu limite restante é_*`;
    },
    NivelUp: (dateComplete, senderNumber, getLevel, LevelingLevel, sender, per, LevelingXp, role, role2) => {
        return `「 ⚡ATUALIZAÇÃO DE NÍVEL⚡  」\n\n➸ *Data* : ${dateComplete}\n➸ *Do utilizador* : ${senderNumber}\n➸ *Nível* : ${getLevel} -> ${LevelingLevel}\n➸ *Progresso de nível : ${per}*\n➸ *XP* : ${LevelingXp}\n➸ *De acordo com o seu XP você se torna* : ${role}\n➸ *Nível de poder* : ${role2}\n\n⚡ *Bônus de subida de nível :*\n_[ + 3 limite ]_`;
    },
    MinGp1: () => {
        return `Peça apoio ou ajuda`;
    },
    MinGp2: () => {
        return `*[ ! ] Desculpe, o número mínimo de membros exigido no grupo deve ser :*`;
    },
    NoTraba1: () => {
        return `Um administrador acabou de enviar um texto que contém muitos caracteres -.-`;
    },
    NoTraba2: (saltos, eliminar, pushname) => {
        return `Marcar bate-papo como lido ✓\n${saltos}\n=> O número : ${eliminar}\n=> Alias : ${pushname}\n[ ! ] Você acabou de enviar um texto que contém muitos caracteres que podem causar falhas no dispositivo`;
    },
    NoPriv: (privcre) => {
        return `[ ! ] O bate-papo privado é proibido [ ! ]\nMeu criador caso precise de ajuda : ${privcre}`;
    },
    NoLinks1: () => {
        return `O bom é que o link detectado é deste grupo owo`;
    },
    NoLinks2: () => {
        return `[ ! ] Este usuário não pode ser excluído`;
    },
    NoLinks3: () => {
        return `Felizmente, não sou administrador, não poderei excluir você :v`;
    }
    //♻️//
    ,
    Pong: (conexiont) => {
        return `velocidade de resposta : ${conexiont} milissegundos`;
    },
    NoReg2: (prefix) => {
        return `*[ ! ] Você não está cadastrado em meu banco de dados*\n\n_Exemplo para registrar_ :\n${prefix}rg SeuNome|SuaIdade`;
    },
    SoloGp: () => {
        return `*[ ! ] Este comando só pode ser usado em grupos*`;
    },
    SoloAdm: () => {
        return `*[ ! ] Este comando só pode ser usado por administradores*`;
    },
    YaActivo: (command) => {
        return `O comando ${command} já estava ativo neste grupo`;
    },
    YaActivoSi: (command, groupName) => {
        return `*${command} ativado no grupo* : ${groupName}`;
    },
    YaActivoNo: (command, groupName) => {
        return `*${command} desativado no grupo* : ${groupName}`;
    },
    ActiVar: () => {
        return `ATIVAR [✓]`;
    },
    DesActiVar: () => {
        return `DESATIVAR [X]`;
    },
    AdminBot: () => {
        return `*[ ! ] O bot tem que ser um administrador*`;
    },
    SoloCreador: () => {
        return `*[ ! ] Este comando só pode ser usado pelo criador do bot*`;
    }
    //⚡//
    ,
    Modo0: () => {
        return `[ MODO 1 ]`;
    },
    Modo1: () => {
        return `PRIVADO 🔒`;
    },
    Modo2: () => {
        return `PUBLICO 🔓`;
    },
    Modo3: () => {
        return `Modo público ativado, agora todos os participantes podem usar o bot`;
    },
    Modo4: () => {
        return `Modo privado ativado, agora apenas o criador do bot pode usá-lo`;
    },
    ModNet0: () => {
        return `[ MODO OFFLINE ]`;
    },
    ModNet1: () => {
        return `DESLIGADA 🚫`;
    },
    ModNet2: () => {
        return `ON-LINE 🌐`;
    },
    ModNet3: () => {
        return `Modo Bot In-Line, agora todos os comandos estão disponíveis`;
    },
    ModNet4: () => {
        return `Modo Bot Offline, agora apenas alguns comandos estarão disponíveis`;
    },
    NoPriv0: () => {
        return `[ ANTI-PRIVADO ]`;
    },
    NoPriv1: () => {
        return `Ativar modo PRIVADO 📳`;
    },
    NoPriv2: () => {
        return `Desativar modo PRIVADO 📴`;
    },
    NoPriv3: () => {
        return `Modo anti-privado ativado, agora todos que falarem com o bot em particular serão bloqueados`;
    },
    NoPriv4: () => {
        return `Modo anti-privado desativado`;
    }
    //✍️//
    ,
    PreDit0: () => {
        return `*[ ! ] Digite apenas um símbolo ou número*`;
    },
    PreDit1: () => {
        return `*[ ! ] Apenas um dígito é aceito para o prefixo [ ! ]*`;
    },
    PreDit2: () => {
        return `O prefixo foi corretamente alterado ✓\nNovo prefixo:`;
    },
    NomBot0: () => {
        return `*[ ! ] Digite um nome ou apelido*`;
    },
    NomBot1: () => {
        return `*[ ! ] O nome deve conter no máximo 15 caracteres [ ! ]*`;
    },
    NomBot2: () => {
        return `O nome do bot foi alterado com sucesso ✓\nNovo nome:`;
    },
    PrinCre0: () => {
        return `*[ ! ] Escreva seu nome ou apelido*`;
    },
    PrinCre1: () => {
        return `*[ ! ] O nome deve conter no máximo 25 caracteres [ ! ]*`;
    },
    PrinCre2: () => {
        return `O nome do criador foi alterado corretamente ✓\nNovo nome:`;
    },
    MyRed0: () => {
        return `*[ ! ] Coloque ou cole suas redes sociais*`;
    },
    MyRed1: () => {
        return `*[ ! ] O texto deve conter no máximo 300 caracteres [ ! ]*`;
    },
    MyRed2: () => {
        return `As informações para redes sociais foram editadas :\n`;
    },
    UsLimit0: () => {
        return `*[ ! ] Escreva o limite desejado*\n_Limite atual para usar comandos :_`;
    },
    UsLimit1: () => {
        return `*[ ! ] Apenas números aceitos*`;
    },
    UsLimit2: () => {
        return `*[ ! ] Você não pode colocar um valor menor que*`;
    },
    UsLimit3: () => {
        return `*[ ! ] Apenas 5 caracteres no máximo são aceitos [ ! ]*`;
    },
    UsLimit4: () => {
        return `Limite alterado pelo valor de :`;
    },
    PfBot0: () => {
        return `O perfil do bot foi alterado com sucesso`;
    },
    PfBot1: () => {
        return `Perfil anterior : `;
    },
    ProCes: (pushname) => {
        return `_Em processamento, ${pushname} por favor espere..._`;
    },
    QuImage: (prefix, command) => {
        return `Envie ou responda uma imagem com o comando ${prefix + command}`;
    },
    SuPrim: () => {
        return `*[ ! ] Esta ação só pode ser usada respondendo a uma mensagem recente do bot*`;
    },
    NoTexto: () => {
        return `*[ ! ] E o texto?*`;
    },
    BcGrupos0: (gmap) => {
        return `Enviando transmissão para ${gmap.length} grupos, Acabando ${gmap.length * 1.5} segundos`;
    },
    BcGrupos1: (gmap) => {
        return `Mensagem transmitida para ${gmap.length} grupos ✓`;
    },
    BcTodos0: (tmap) => {
        return `Transmitindo mensagem em ${tmap.length} chats\nAcabando ${tmap.length * 1.5} segundos`;
    },
    BcTodos1: () => {
        return `⚡ *Mensagem simultânea compartilhada com sucesso :D*⚡`;
    },
    BanUser0: () => {
        return `Usuário banido`;
    },
    BanUser1: () => {
        return `usuário não banido`;
    }
    //📝//
    ,
    CerrarGp0: (pushname, prefix, command) => {
        return `*${pushname} A que horas pretende encerrar o grupo?*\n\n_Exemplo de uso_ : \n${prefix + command} 10 segundos`;
    },
    CerrarGp1: (UwU, pushname) => {
        return `*O grupo vai fechar ${UwU}*\n_Ação executada por : ${pushname}_`;
    },
    CerrarGp2: () => {
        return `*[ Grupo fechado com sucesso ✓ ]*`;
    },
    AbrirGp: () => {
        return `*[ Grupo aberto ✓ ]*`;
    },
    NomGp0: () => {
        return `*[ ! ] O máximo de caracteres é 25*`;
    },
    NomGp1: (groupName) => {
        return `Nome do grupo alterado com sucesso ✓\nNovo nome : [ ${groupName} ]`;
    },
    DesGp0: () => {
        return `*[ ! ] Máximo de caracteres 512*`;
    },
    DesGp1: (nwn, groupDesc) => {
        return `Descrição do grupo alterada com sucesso ✓\nNova descrição : ${nwn}\n${groupDesc}`;
    },
    PfGp0: () => {
        return `Perfil do grupo alterado com sucesso`;
    },
    PfGp1: () => {
        return `Imagem anterior : `;
    }
    //🧑‍💻//
    ,
    ToDos: (groupName, pushname, texto) => {
        return `⚡ *Convocando os membros do grupo* : ${groupName}\n*~> Invocador* : _${pushname}_\n*~> Mensagem* : _${texto ? texto : 'Não há :v'}_\n`;
    },
    DarP: (usuariop, pushname) => {
        return `*O participante @${usuariop} foi feito administrador do grupo ✓*\n_Ação executada por ${pushname}_`;
    },
    QuitP: (usuarioq, pushname) => {
        return `*O administrador @${usuarioq} foi rebaixado de administrador ✓*\n_Accion ejecutada por ${pushname}_`;
    },
    BanSer: (adiuser, pushname) => {
        return `*O participante @${adiuser} foi removido do grupo ✓*\n_Ação executada por ${pushname}_`;
    },
    UsEnLinea: () => {
        return `=> [ Lista de usuários on-line ]\n=> Quantidade : `;
    }
    //
    ,
    Baneao: (senderNumber) => {
        return `${senderNumber} você está banido, agora você não poderá usar o bot :v`;
    },
    BotInfo: () => {
        return `[ INFO-BOT ]`;
    },
    GraciAs: () => {
        return `[ APOIO ]`;
    },
    MasCmds: () => {
        return `[ MAIS COMANDOS ☰ ]`;
    },
    VerCmds: () => {
        return `[ VER COMANDOS ☰ ]`;
    },
    YaReg: () => {
        return `*[ ! ] Você já estava cadastrado no meu banco de dados*`;
    },
    MyReg0: () => {
        return `*[ ! ] Adicione uma barra entre o nome e a idade*\n" | "`;
    },
    MyReg1: () => {
        return `*[ ! ] Na idade apenas números são aceitos -.-*`;
    },
    MyReg2: () => {
        return `*[ ! ] Bruh o nome é muito longo ._.*`;
    },
    MyReg3: () => {
        return `*[ ! ] Idade máxima 30 anos*`;
    },
    MyReg4: () => {
        return `*[ ! ] Idade mínima 13 anos*`;
    },
    MyReg5: (nwn, time, nomreg, pushname, edreg, sender, codereg) => {
        return `〘  *REGISTRO* 〙${nwn}\n❥Data e hora de inscrição \n❥${time}\n┏─━─━━─━─━━─━─\n╠≽️ *Nome registrado* : *${nomreg}*\n╠≽️ *Nome usado no whatsapp* : *${pushname}*\n╠≽️ *Idade* : *${edreg}*\n╠≽️ *Nº* : *wa.me/${sender.split("@")[0]}*\n┗─━─━━─━─━━─━─\n_Código de Registo_ : *${codereg}* `;
    },
    MyReg6: () => {
        return `Que você tenha um excelente dia! :D`;
    },
    CmdsR0: () => {
        return `Mais comandos`;
    },
    CmdsR1: () => {
        return `Random-Menu`;
    },
    CmdsA0: () => {
        return `Artístico`;
    },
    CmdsA1: () => {
        return `Criar-Logos`;
    },
    CmdsO0: () => {
        return `Otaku/Anime`;
    },
    CmdsO1: () => {
        return `Random-Anime`;
    },
    CmdsH0: () => {
        return `Hentai/Anime`;
    },
    CmdsH1: () => {
        return `A-Bíblia`;
    },
    MCmds0: () => {
        return `Toque aqui ⚡`;
    },
    MCmds1: () => {
        return `Selecione apenas uma opção`;
    },
    AntLinkInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ́ ᴬⁿᵗᶦ ˡᶦⁿᵏˢ ᵉ ᵉⁿˡᵃᶜᵉˢ ᵐᵘˡᵗᶦᵖˡᵒˢ`;
    }, AntiFakeInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ́  ᴬⁿᵗᶦ ⁿᵘᵐᵉʳᵒˢ ᶠᵃˡˢᵒˢ ᵒ ᵛᶦʳᵗᵘᵃᶦˢ`;
    },
    FunModeInfo: () => {
        return `Info:
ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵃ ᵐᵃᶦᵒʳᶦᵃ ᵈᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ 𐞥ᵘᵉ ᵒ ᵇᵒᵗ ᶜᵒⁿᵗᵉᵐ `;
    },
    BanModeInfo: () => {
        return 'Info:\x0aᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵇᵃⁿᵉ ᵒ ᵍʳᵘᵖᵒ ᵃᵗᵘᵃˡ ᵖᵃʳᵃ ᶦ́ᵐᵖᵉᵈᶦ⁻ˡᵒ ᵈᵉ ᵘˢᵃʳ ᵒ ᵇᵒᵗ';
    },
    EnableInfo: () => {
        return `Info:
ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵘᵐ ᶜʰᵃᵗ⁻ᵇᵒᵗ ᵉᵐ ᵘᵐ ᵍʳᵘᵖᵒ ᵈᵒ ʷʰᵃᵗˢᵃᵖᵖ`;
    },
    AntiForeignInfo: () => {
        return `Info:
ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᶜᵒⁿᵗʳᵃ ⁿᵘᵐᵉʳᵒˢ ᵈᵉ ᵖʳᵉᶠᶦˣᵒˢ ᵈᶦᶠᵉʳᵉⁿᵗᵉˢ ᵈᵒ ᶜʳᶦᵃᵈᵒʳ`;
    },
    AntiFakes2Info: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᶜᵒⁿᵗʳᵃ ⁿᵘᵐᵉʳᵒˢ ᶠᵃˡˢᵒˢ ᵃᵐᵉʳᶦᶜᵃⁿᵒˢ ⁽⁺¹⁾`;
    },
    AntiLinkInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᴬⁿᵗᶦ ˡᶦⁿᵏˢ ᵈᵉ ʷʰᵃᵗˢᵃᵖᵖ ᵉ ᵒᵘᵗʳᵃˢ ʳᵉᵈᵉˢ ˢᵒᶜᶦᵃᶦˢ`;
    },
    AntiVirtexInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᵃᵒ ᴬⁿᵗᶦ ᵗᵉˣᵗᵒˢ ᶜᵒᵐ ᵛᶦʳᵒˢ ⁿᵒ ᵂʰᵃᵗˢᵃᵖᵖ`;
    },
    AntiPrivateInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᴬⁿᵗᶦ ᵖʳᶦᵛᵃᵈᵒ
  \n ᶜʰᵃᵗ ᵖʳᶦᵛᵃᵈᵒ ᶜᵒᵐ ᵇᵒᵗ ᵖʳᵒᶦᵇᶦᵈᵒ`;
    },
    AutoWelcomeInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵃˢ ᵇᵒᵃˢ ᵛᶦⁿᵈᵃˢ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃˢ`;
    },
    LevelingInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵘᵐ ⁿᶦᵛᵉˡ ᶦⁿᵗᵉʳᵃᵗᶦᵛᵒ ᵖᵃʳᵃ ᵒˢ ᵖᵃʳᵗᶦᶜᶦᵖᵃⁿᵗᵉˢ`;
    },
    HentaiInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ ᵃᵈᵘˡᵗᵒˢ ⁽⁺¹⁸⁾`;
    },
    AnimeInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵒ ᵐᵒᵈᵒ ᵃⁿᶦᵐᵉ `;
    },
    OffLineInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᵒᶠᶠ ˡᶦⁿᵉ `;
    },
    BotIdiomChanged: (lang) => {
        ' idioma do bot foi alterado com sucesso para %s ';
    },
    PromoteAdmin: 'Which participant do you want to make an administrator?',
    Promote: 'promote',
    DemoteAdmin: 'Which administrator do you want to remove his position?',
    Demote: 'demote',
    Remove: 'remove',
    UserKick: 'Qual usuário você deseja remover!?',
    ProfileMemory: 'Consumo de Memória: ',
    ProfileArch: 'Arquitetura: ',
    ProfileSpeed: 'Velocidade de procesamento: ',
    ProfileConnection: 'Velocidade de Conexão: ',
    ProfilePlataform: 'Plataforma: ',
    Library: 'Biblioteca',
    ProfileExecTime: 'Tempo de Execução:',
    ProfileVersion: 'Versão do Bot: '
};
export default ptg;
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
//# sourceMappingURL=ptg1.js.map
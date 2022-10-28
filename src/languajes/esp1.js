import fs from 'fs';
//const localeService = container.resolve('localeService');
////const __ = LocaleService.__
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
    'Pierde la partida*\nFong 🏓',
    `🏓 Pong!!! 🏓`,
    `🏓 Pong!!! 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    'Responde con un golpe a 160 kmh*\nPong 🏓',
    `Pong 🏓`,
    `Pong 🏓`,
    'Le da un golpe en la cabeza*\nPong 🏓',
    `Pong 🏓`,
    `Pong 🏓`,
    `Le rompe el craneo*\nPong!!!🏓`,
    'Pong 🏓',
    `Pong 🏓`,
    `Pong 🏓`,
    `Pong 🏓`,
    `Le gana la partida*\n🏓 Pong!!! 🏓`,
    `Lo mata*\nPong!!! 🏓🏓🏓`
];
const esp = {
    pong: () => {
        const randIndex = Math.floor(Math.random() * pongs.length);
        return pongs[randIndex];
    },
    wait: () => {
        const randIndex = Math.floor(Math.random() * waits.length);
        return waits[randIndex];
    },
    titleTime: 'ZONAS TIEMPO',
    Greetings: ['Hola', `Wenas`, `Que tal`, 'Hi', `Hello`, `Olá`, `Namaste`, `Hey!`, `Aloha`, `Konnichi wa`, `Mi king`, `Que hay`, `Como estas`, 'Oi', 'Joder Buenas'],
    PanelMenu: (prefix, pushname, actividad, role, monospace, nvn) => {
        return `${monospace}< [ ${MyInfo.NomeDoBot} ] >${monospace}
╔═══════════
║❂ Tiempo activo : ${actividad}
║❂ Version del bot : ${MyPkg.version}
║❂ Dueño : ${MyInfo.CoCreador}
║❂ Prefijo : 「  ${prefix}  」
║❂ Cliente : ${pushname}️
║❂ Rol del Cliente : ${role}
╚═══════════
${nvn}
~|-------------------------|~
⮕ *_COMANDOS_  ☷*
~|-------------------------|~

╔═══════════
║ _CONVERSORES :_
║╭——————————
║├ ${prefix}sticker
║├ ${prefix}tiendaimg
║├ ${prefix}aimg
║├ ${prefix}inframundo
║├ ${prefix}nightcore
║├ ${prefix}happyhardcore
║├ ${prefix}ardilla
║├ ${prefix}superveloz
║├ ${prefix}demonio
║├ ${prefix}lento
║├ ${prefix}distorcionado
║├ ${prefix}aumentarbajo
║├ ${prefix}amp3
║├ ${prefix}acelerarvid
║├ ${prefix}lentovid
║├ ${prefix}reversavid
║├ ${prefix}rescom
║╰——————————
╚═══════════
╔═══════════
║ _CMDS-CASUAL :_
║╭——————————
║├ ${prefix}miperfil
║├ ${prefix}informacion
║├ ${prefix}apoyo
║├ ${prefix}baneados
║├ ${prefix}miwasa
║├ ${prefix}milimite
║├ ${prefix}minivel
║├ ${prefix}estadobot
║├ ${prefix}creador
║├ ${prefix}infogrupo
║├ ${prefix}admins
║├ ${prefix}grupolink
║├ ${prefix}tienda
║├ ${prefix}horario
║├ ${prefix}keyaudio
║╰——————————
╚═══════════
╔═══════════
║ _PASATIEMPO :_
║╭——————————
║├ ${prefix}quien
║├ ${prefix}ruleta
║├ ${prefix}tragamoneda
║├ ${prefix}calumnia
║├ ${prefix}dados
║├ ${prefix}dado
║├ ${prefix}emparejar
║├ ${prefix}top5
║├ ${prefix}top10
║├ ${prefix}testgay
║├ ${prefix}votacion
║├ ${prefix}vervotos
║├ ${prefix}reiniciarvotos
║├ ${prefix}afk
║╰——————————
╚═══════════
╔═══════════
║ _CMDS ADMINS :_
║╭——————————
║├ ${prefix}cgpen
║├ ${prefix}agp
║├ ${prefix}editnamegp
║├ ${prefix}editdesgp
║├ ${prefix}fotogrupo
║├ ${prefix}invocar
║├ ${prefix}darpoder
║├ ${prefix}quitarpoder
║├ ${prefix}ban
║├ ${prefix}activos
║╰┬> _ACTIVADORES_
║╭╯
║├ ${prefix}modofull
║├ ${prefix}animeuwu
║├ ${prefix}hmodo
║├ ${prefix}nivelear
║├ ${prefix}wlc
║├ ${prefix}antitraba
║├ ${prefix}antilink
║├ ${prefix}antilink2
║├ ${prefix}antifakes
║├ ${prefix}antifakes2
║├ ${prefix}antiextranjeros
║╰┬> _JUEGOS_
║╭╯
║├ ${prefix}deathnote
║╰——————————
╚═══════════
╔═══════════
║ _CMDS DUEÑO :_
║╭——————————
║├ ${prefix}modo1
║├ ${prefix}modo2
║├ ${prefix}antiprivado
║├ ${prefix}predit
║├ ${prefix}nombrebot
║├ ${prefix}midueño
║├ ${prefix}misredes
║├ ${prefix}editarlimite
║├ ${prefix}neoqr
║├ ${prefix}perfilbot
║├ ${prefix}suprimir
║├ ${prefix}bcgc
║├ ${prefix}bc
║├ ${prefix}banear
║├ ${prefix}quitarbaneo
║├ ${prefix}.
║├ ${prefix}lenguaje
║╰┬> _ACTIVADORES_
║╭╯
║├ ${prefix}chatbot
║├ ${prefix}banchat
║╰┬> ~MODO KUAKER~
║ ~PSDT- Estos comandos son de virustraba~
║ ~ten cuidado al usarlos!~
║╭╯
║├ ${prefix}c1
║╰┬> _AVANZADO_
║╭╯
║├ =>
║├ >
║├ $
║╰——————————
╚═══════════
╔═══════════
║ _MAS COMANDOS EXTRA :_
║╭——————————
║├ ${prefix}mascmds
║├ ${prefix}randmenu
║├ ${prefix}crealogos
║├ ${prefix}mianime
║├ ${prefix}labiblia
║╰——————————
╚═══════════
`;
    },
    FooterPM: (CovidApi) => {
        return `┏「 DATOS - COVID19 」─┓
┃➲ Casos positivos : ${CovidApi.cases}
┃✯ Recuperados : ${CovidApi.recovered}
┃❥ Tratados : ${CovidApi.active}
┃✞ Fallecidos : ${CovidApi.deaths}
┗─━─━ 「 🌎 」 ━─━─┛`;
    },
    PanelMenu2: (prefix, monospace) => {
        return `${monospace}[ MENU-RANDOM ]${monospace}
 
╔═══════════
║
║➣ ${prefix}verip
║➣ ${prefix}gruposwa
║➣ ${prefix}vos
║➣ ${prefix}simi
║➣ ${prefix}covid
║➣ ${prefix}clima
║➣ ${prefix}github
║➣ ${prefix}traductor
║➣ ${prefix}pinterest
║➣ ${prefix}imagen
║➣ ${prefix}google
║➣ ${prefix}wikipedia
║➣ ${prefix}playstore
║➣ ${prefix}letra
║➣ ${prefix}xd
║➣ ${prefix}perros
║➣ ${prefix}gatos
║➣ ${prefix}pato
║➣ ${prefix}wallpaper
║➣ ${prefix}tiktok
║
╠═> DESCARGADOR
║➣ ${prefix}mediafire
║➣ ${prefix}play
║➣ ${prefix}play2
║➣ ${prefix}ytmp3
║➣ ${prefix}ytmp4
║➣ ${prefix}fbdl
║➣ ${prefix}tiktokdl
║
╠═> PASATIEMPO
║➣ ${prefix}preguntame
║➣ ${prefix}v_o_f
║➣ ${prefix}notificacion
║➣ ${prefix}tumama
║➣ ${prefix}comediante
║➣ ${prefix}consejo
║➣ ${prefix}randimg
║➣ ${prefix}djbot
║➣ ${prefix}minidatos
║➣ ${prefix}frasesamor
║➣ ${prefix}minombre
╚═══════════
`;
    },
    MenuArte: (prefix, monospace) => {
        return `${monospace}[ CREA-LOGOS ]${monospace}
 
╔═══════════
║☞ ${prefix}attp
║☞ ${prefix}halloween
║☞ ${prefix}lava
║☞ ${prefix}toxico
║☞ ${prefix}metalrojo
║☞ ${prefix}tempestade
║☞ ${prefix}gneon
║☞ ${prefix}neontxt
║☞ ${prefix}arcoiris
║☞ ${prefix}gelo
║☞ ${prefix}lapis
║☞ ${prefix}roca3d
║☞ ${prefix}ficcion
║☞ ${prefix}romper
║☞ ${prefix}sangre
║☞ ${prefix}gameover
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
        return `Las llamadas al numero del bot estan prohibidos!\nPongase en contacto con mi dueño : ${helpcall}`;
    },
    FDeG: () => {
        return `\n\nEl numero del bot fue eliminado de un grupo!\n\n`;
    },
    AutoSaludo: () => {
        return `*_Joder, mi creador principal se unio al grupo_ ✓*\n*[ Se bienvenido nwn ]*`;
    },
    Wlc1: () => {
        return `Regalame una estrella`;
    },
    Wlc2: () => {
        return `Creador`;
    },
    Wlc3: (num, metadata, dateComplete, gpdesc, nwn, nvn) => {
        return `⚡ *Bienvenid@ @${num.split("@")[0]} a este grandioso grupo :*\n${metadata.subject}\n⚡ *Fecha de ingreso : ${dateComplete}*\n⚡ _*Espero y te agrade tu estancia aqui, no olvides respetar a los participantes y las reglas*_ ;)\n\n*Normas del grupo actualmente :* \n${nwn}\n${gpdesc}`;
    },
    Wlc4: () => {
        return `ADIOS... 😔`;
    },
    Wlc5: (num) => {
        return `[ ! ] C fue alv : @${num.split("@")[0]}`;
    },
    NoSpam1: () => {
        return `*Espere unos segundos antes de usar otro comando ✓*`;
    },
    NoSpam2: (pushname) => {
        return `[ ! ] ${pushname} Por favor no sature al bot ;-;`;
    },
    NoReg: (pushname) => {
        return `[ ! ] ${pushname} Debe de registrarse para comenzar a usar al bot`;
    },
    PreFijo: () => {
        return `Prefijo:`;
    },
    Erreply: () => {
        return `*[ ! ] Ocurrio un error inesperado u.u [ ! ]*`;
    },
    SinLimite: (pushname) => {
        return `*[ ! ] ${pushname} Su límite para usar al bot se agotaron ;-;*\nSi sube de nivel se le regalarán : ~+3 de limite~\n_~ᴬˡ ᶜʳᵉᵃᵈᵒʳ ᵈᵉˡ ᵇᵒᵗ ⁿᵒ ˡᵉ ᵃᶠᵉᶜᵗᵃʳᵃ ᵉˡ ˡᶦᵐᶦᵗᵉ~_ `;
    },
    Limite: (pushname) => {
        return `*┏━━⊱ 「 LIMITE 」*
*┗⊱ _${pushname} Tu limite restante es_*`;
    },
    NivelUp: (dateComplete, senderNumber, getLevel, getLevelingLevel, sender, per, getLevelingXp, role, role2) => {
        return `「 ⚡ACTUALIZACION DE NIVEL⚡  」\n\n➸ *Fecha* : ${dateComplete}\n➸ *Usuario* : ${senderNumber}\n➸ *Nivel* : ${getLevel} -> ${getLevelingLevel(sender)}\n➸ *Progreso de nivel : ${per}*\n➸ *XP* : ${getLevelingXp(sender)}\n➸ *De acuerdo a tu XP pasas a ser* : ${role}\n➸ *Nivel de poder* : ${role2}\n\n⚡ *Bonificación por subir de nivel :*\n_[ + 3 de límite ]_`;
    },
    MinGp1: () => {
        return `Pedir soporte o ayuda a`;
    },
    MinGp2: () => {
        return `*[ ! ] Lo siento, minimo de miembros requeridos en el grupo debe ser :*`;
    },
    NoTraba1: () => {
        return `Un administrador acaba de enviar texto que contiene muchos caracteres -.-`;
    },
    NoTraba2: (saltos, eliminar, pushname) => {
        return `Marcar el chat como leido ✓\n${saltos}\n=> El número : ${eliminar}\n=> Alias : ${pushname}\n[ ! ] Acaba de enviar un texto que contiene muchos caracteres que puede ocasionar fallos en los dispositivos`;
    },
    NoPriv: (privcre) => {
        return `[ ! ] El chat por privado esta prohibido [ ! ]\nMi dueño por si necesita ayuda : ${privcre}`;
    },
    NoLinks1: () => {
        return `Joder, lo weno es que el enlace detectado es de este grupo owo`;
    },
    NoLinks2: () => {
        return `[ ! ] Este usuario no puede ser eliminado`;
    },
    NoLinks3: () => {
        return `Por suerte no soy acmin, asi que no puedo expulsarte :v`;
    }
    //♻️//
    ,
    Pong: (conexiont) => {
        return `Velocidad de respuesta : ${conexiont} Milisegundos`;
    },
    NoReg2: (prefix) => {
        return `*[ ! ] No estas registrado en mi base de datos*\n\n_Ejemplo para registrarse_ :\n${prefix}rg TuNombre|TuEdad`;
    },
    SoloGp: () => {
        return `*[ ! ] Este comando solo se puede usar en grupos*`;
    },
    SoloAdm: () => {
        return `*[ ! ] Este comando solo puede ser usado por los administradores*`;
    },
    YaActivo: (command) => {
        return `El comando ${command} ya estuvo activo en este grupo`;
    },
    YaActivoSi: (command, groupName) => {
        return `*${command} activado en el grupo* : ${groupName}`;
    },
    YaActivoNo: (command, groupName) => {
        return `*${command} desactivado en el grupo* : ${groupName}`;
    },
    ActiVar: () => {
        return `ACTIVAR [✓]`;
    },
    DesActiVar: () => {
        return `DESACTIVAR [X]`;
    },
    AdminBot: () => {
        return `*[ ! ] El bot tiene que ser administrador*`;
    },
    SoloCreador: () => {
        return `*[ ! ] Este comando solo puede ser usado por el dueño del bot*`;
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
        return `Modo publico activado, ahora todos los participantes podran usar al bot`;
    },
    Modo4: () => {
        return `Modo privado activado, ahora solo el dueño del bot podra usarlo`;
    },
    ModNet0: () => {
        return `[ MODO 2 ]`;
    },
    ModNet1: () => {
        return `SIN-LINEA 🚫`;
    },
    ModNet2: () => {
        return `EN-LINEA 🌐`;
    },
    ModNet3: () => {
        return `Bot modo En-Linea, ahora todos los comandos estan disponibles`;
    },
    ModNet4: () => {
        return `Bot modo Sin-Linea, ahora solo algunos comandos estaran disponibles`;
    },
    NoPriv0: () => {
        return `[ ANTI-PRIVADO ]`;
    },
    NoPriv1: () => {
        return `SI-PRIVADOS 📳`;
    },
    NoPriv2: () => {
        return `NO-PRIVADOS 📴`;
    },
    NoPriv3: () => {
        return `Modo Anti-Privado activado, ahora todo aquel que hable al bot por privado sera bloqueado`;
    },
    NoPriv4: () => {
        return `Modo Anti-Privado desactivado`;
    }
    //✍️//
    ,
    PreDit0: () => {
        return `*[ ! ] Escriba solo un simbolo o numero*`;
    },
    PreDit1: () => {
        return `*[ ! ] Solo se acepta un digito para el prefijo [ ! ]*`;
    },
    PreDit2: () => {
        return `El prefijo fue alterado correctamente ✓\nPrefijo nuevo:`;
    },
    NomBot0: () => {
        return `*[ ! ] Escriba un nombre o apodo*`;
    },
    NomBot1: () => {
        return `*[ ! ] El nombre debe contener 15 caracteres como maximo [ ! ]*`;
    },
    NomBot2: () => {
        return `El nombre del bot fue alterado correctamente ✓\nNombre nuevo:`;
    },
    PrinCre0: () => {
        return `*[ ! ] Escriba su nombre o apodo*`;
    },
    PrinCre1: () => {
        return `*[ ! ] El nombre debe contener 25 caracteres como maximo [ ! ]*`;
    },
    PrinCre2: () => {
        return `El nombre del dueño fue alterado correctamente ✓\nNombre nuevo:`;
    },
    MyRed0: () => {
        return `*[ ! ] Coloque o pegue sus redes sociales*`;
    },
    MyRed1: () => {
        return `*[ ! ] El texto debe contener 300 caracteres como maximo [ ! ]*`;
    },
    MyRed2: () => {
        return `Se edito la informacion para redes sociales :\n`;
    },
    UsLimit0: () => {
        return `*[ ! ] Escriba el límite que desee*\n_Limite actual para usar comandos :_`;
    },
    UsLimit1: () => {
        return `*[ ! ] Solo se aceptan numeros*`;
    },
    UsLimit2: () => {
        return `*[ ! ] No puede poner un valor mas bajo que*`;
    },
    UsLimit3: () => {
        return `*[ ! ] Solo se aceptan 5 caracteres como maximo [ ! ]*`;
    },
    UsLimit4: () => {
        return `Limite cambiado por el valor de :`;
    },
    PfBot0: () => {
        return `Se cambio el perfil del bot con éxito`;
    },
    PfBot1: () => {
        return `Perfil anterior : `;
    },
    ProCes: (pushname) => {
        return `_Procesando, ${pushname} por favor espere..._`;
    },
    QuImage: (prefix, command) => {
        return `Envie ó Responda una imagen con el comando ${prefix + command}`;
    }
    //
    ,
    SuPrim: () => {
        return `*[ ! ] Esta accion solo puede usarse respondiendo un mensaje reciente del bot*`;
    },
    NoTexto: () => {
        return `*[ ! ] Y el texto?*`;
    },
    BcGrupos0: (gmap) => {
        return `Enviando transmisión a ${gmap.length} grupos, Finalizando en ${gmap.length * 1.5} segundos`;
    },
    BcGrupos1: (gmap) => {
        return `Mensaje transmitido a ${gmap.length} grupos ✓`;
    },
    BcTodos0: (tmap) => {
        return `Transmitiendo mensaje en ${tmap.length} chats activos\nFinalizando en ${tmap.length * 1.5} segundos`;
    },
    BcTodos1: () => {
        return `⚡ *Mensaje simultaneo compartido con exito :D*⚡`;
    },
    BanUser0: () => {
        return `Usuario baneado`;
    },
    BanUser1: () => {
        return `Usuario desbaneado`;
    }
    //📝//
    ,
    CerrarGp0: (pushname, prefix, command) => {
        return `*${pushname} en que tiempo desea cerrar el grupo?*\n\n_Ejemplo de uso_ : \n${prefix + command} 10 segundos`;
    },
    CerrarGp1: (UwU, pushname) => {
        return `*El grupo se cerrará en ${UwU}*\n_Accion ejecutada por : ${pushname}_`;
    },
    CerrarGp2: () => {
        return `*[ Se cerro el grupo con exito ✓ ]*`;
    },
    AbrirGp: () => {
        return `*[ Grupo abierto ✓ ]*`;
    },
    NomGp0: () => {
        return `*[ ! ] máximo de carácteres es 25*`;
    },
    NomGp1: (groupName) => {
        return `Se cambio el nombre del grupo con éxito ✓\nNombre nuevo : [ ${groupName} ]`;
    },
    DesGp0: () => {
        return `*[ ! ] Máximo de carácteres 512*`;
    },
    DesGp1: (nwn, groupDesc) => {
        return `Se cambio la descripción del grupo con éxito ✓\nNueva descripción : ${nwn}\n${groupDesc}`;
    },
    PfGp0: () => {
        return `Se cambio el perfil del grupo con éxito`;
    },
    PfGp1: () => {
        return `Imagen anterior : `;
    }
    //🧑‍💻//
    ,
    ToDos: (groupName, pushname, texto) => {
        return `⚡ *Invocando a los integrantes del grupo* : ${groupName}\n*~> Invocador* : _${pushname}_\n*~> Mensaje* : _${texto ? texto : 'No hay :v'}_\n`;
    },
    DarP: (usuariop, pushname) => {
        return `*El participante @${usuariop} fue convertido en administrador del grupo ✓*\n_Accion ejecutada por ${pushname}_`;
    },
    QuitP: (usuarioq, pushname) => {
        return `*El administrador @${usuarioq} fue degradado de ser admin ✓*\n_Accion ejecutada por ${pushname}_`;
    },
    BanSer: (adiuser, pushname) => {
        return `*El participante @${adiuser} fue eliminado del grupo ✓*\n_Accion ejecutada por ${pushname}_`;
    },
    UsEnLinea: () => {
        return `=> [ Lista de usuarios en linea ]\n=> Cantidad : `;
    }
    //
    ,
    Baneao: (senderNumber) => {
        return `${senderNumber} estas baneado, ahora no podrás usar al bot :v`;
    },
    SinLimite: (pushname) => {
        return `*[ ! ] Lo siento ${pushname} te quedaste sin límites para seguir usando al bot T~T*\nˢᶦ ˢᵘᵇᵉˢ ᵈᵉ ⁿᶦᵛᵉˡ• ˢᵉ ˡᵉ ʳᵉᵍᵃˡᵃʳᵃⁿ ~⁺³ ᵈᵉ ˡᶦ́ᵐᶦᵗᵉ~`;
    },
    BotInfo: () => {
        return `[ INFO-BOT ]`;
    },
    GraciAs: () => {
        return `[ APOYO ]`;
    },
    MasCmds: () => {
        return `[ MAS COMANDOS ☰ ]`;
    },
    YaReg: () => {
        return `*[ ! ] Ya estuviste registrado en mi base de datos*`;
    },
    MyReg0: () => {
        return `*[ ! ] Por favor agregue una barra en medio de nombre y edad*\n" | "`;
    },
    MyReg1: () => {
        return `*[ ! ] En edad solo se aceptan números -.-*`;
    },
    MyReg2: () => {
        return `*[ ! ] Bruh el nombre es muy largo ._.*`;
    },
    MyReg3: () => {
        return `*[ ! ] Maximo de edad 30 años*`;
    },
    MyReg4: () => {
        return `*[ ! ] Minimo de edad 13 años*`;
    },
    MyReg5: (nwn, time, nomreg, pushname, edreg, sender, codereg) => {
        return `〘  *REGISTRO* 〙${nwn}\n❥Fecha y hora de Registro \n❥${time}\n┏─━─━━─━─━━─━─\n╠≽️ *Nombre Registrado : ${nomreg}*\n╠≽️ *Nombre usado en whatsapp : ${pushname}*\n╠≽️ *Edad : ${edreg}*\n╠≽️ *Nº : wa.me/${sender.split("@")[0]}*\n┗─━─━━─━─━━─━─\n_Codigo de registro_ : *${codereg}* `;
    },
    MyReg6: () => {
        return `Que tengas un excelente día! :D`;
    },
    CmdsR0: () => {
        return `Mas comandos`;
    },
    CmdsR1: () => {
        return `Random-Menu`;
    },
    CmdsA0: () => {
        return `Artístico`;
    },
    CmdsA1: () => {
        return `Crear-Logos`;
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
        return `La-Biblia`;
    },
    MCmds0: () => {
        return `Toque Aqui ⚡`;
    },
    MCmds1: () => {
        return `Seleccione solo una opción`;
    },
    AntLinkInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᶜᶦᵒ́ⁿ ᴬⁿᵗᶦ ˡᶦⁿᵏˢ ʸ ᵉⁿˡᵃᶜᵉˢ ᵐᵘˡᵗᶦᵖˡᵉˢ`;
    },
    AntiFakeInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᶜᶦᵒ́ⁿ ᴬⁿᵗᶦ ⁿᵘᵐᵉʳᵒˢ ᶠᵃˡˢᵒˢ ᵒ ᵛᶦʳᵗᵘᵃˡᵉˢ`;
    },
    FunModeInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᶜᵗᶦᵛᵃ ˡᵃ ᵐᵃʸᵒʳᶦ́ᵃ ᵈᵉ ᶜᵒᵐᵃⁿᵈᵒˢ ᑫᵘᵉ ᶜᵒⁿᵗᶦᵉⁿᵉ ᵉˡ ᵇᵒᵗ`;
    },
    BanModeInfo: () => {
        return 'Info:\x0aᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵇᵃⁿᵉᵃ ᵉˡ ᵍʳᵘᵖᵒ ᵃᶜᵗᵘᵃˡ ᵖᵃʳᵃ ᵉᵛᶦᵗᵃʳ ᵘˢᵃʳ ᵃˡ ᵇᵒᵗ';
    },
    EnableInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵘⁿ ᶜʰᵃᵗ⁻ᵇᵒᵗ ᵉⁿ ᵘⁿ ᵍʳᵘᵖᵒ ᵈᵉ ʷʰᵃᵗˢᵃᵖᵖ`;
    },
    AntiForeignInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᶜᶦᵒ́ⁿ ᶜᵒⁿᵗʳᵃ ⁿᵘᵐᵉʳᵒˢ ᵈᶦˢᵗᶦⁿᵗᵒˢ ᵃˡ ᵖʳᵉᶠᶦʲᵒ ᵈᵉˡ ᶜʳᵉᵃᵈᵒʳ`;
    },
    AntiFakes2Info: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᶜᶦᵒ́ⁿ ᶜᵒⁿᵗʳᵃ ⁿᵘᵐᵉʳᵒˢ ᵉˢᵗᵃᵈᵒᵘⁿᶦᵈᵉⁿˢᵉˢ ⁺¹`;
    },
    AntiLinkInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᶜᶦᵒ́ⁿ ᴬⁿᵗᶦ ˡᶦⁿᵏˢ ᵈᵉ ʷʰᵃᵗˢᵃᵖᵖ ʸ ᵒᵗʳᵃˢ ʳᵉᵈᵉˢ ˢᵒᶜᶦᵃˡᵉˢ`;
    },
    AntiVirtexInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵖʳᵒᵗᵉᶜᶜᶦᵒ́ⁿ ᴬⁿᵗᶦ ᵗʳᵃᵇᵃˢ ᵉⁿ ᵂʰᵃᵗˢᵃᵖᵖ`;
    },
    AntiPrivateInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᴬⁿᵗᶦ ᵖʳᶦᵛᵃᵈᵒ
  \n ᶜʰᵃᵗ ᵖʳᶦᵛᵃᵈᵒ ᶜᵒᵐ ᵇᵒᵗ ᵖʳᵒᶦᵇᶦᵈᵒ`;
    },
    AutoWelcomeInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ˡᵃˢ ᵇᶦᵉⁿᵛᵉⁿᶦᵈᵃˢ ᵃᵘᵗᵒᵐᵃ́ᵗᶦᶜᵃˢ`;
    },
    LevelingInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᶜᵒᵐᵃⁿᵈᵒ ᵃᶜᵗᶦᵛᵃ ᵘⁿ ⁿᶦᵛᵉˡ ᶦⁿᵗᵉʳᵃᶜᵗᶦᵛᵒ ᵖᵃʳᵃ ˡᵒˢ ᵖᵃʳᵗᶦᶜᶦᵖᵃⁿᵗᵉˢ`;
    },
    HentaiInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᶜᵗᶦᵛᵃ ˡᵒˢ ᶜᵒᵐᵃⁿᵈᵒˢ ʰᵉⁿᵗᵃᶦ ⁺¹⁸`;
    },
    AnimeiInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵒ ᵐᵒᵈᵒ ᵃⁿᶦᵐᵉ `;
    },
    OffLineInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᵒᶠᶠ ˡᶦⁿᵉ `;
    },
    PromoteAdmin: 'A que participante desea convertirlo en administrador?',
    Promote: 'promote',
    DemoteAdmin: 'A que administrador desea quitarle su puesto?',
    Demote: 'demote',
    Remove: 'remove',
    UserKick: 'A que usuario desea eliminar!?',
    ProfileMemory: 'Consumó de memoria',
    ProfileArch: 'Arquitectura',
    ProfileSpeed: 'Velocidad de procesamiento',
    ProfileConnection: 'Velocidad de conexion',
    ProfilePlataform: 'Plataforma',
    Library: 'Libreria',
    ProfileExecTime: 'Tiempo de ejecucion',
    ProfileVersion: 'Version del bot:'
};
export default esp;
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
//# sourceMappingURL=esp1.js.map
import fs from 'fs';
const MyPkg = JSON.parse(fs.readFileSync('./package.json'));
const MyInfo = JSON.parse(fs.readFileSync('./src/informacion.json'));
const ind = {
    titleTime: 'TIMEZONES',
    Greetings: ['Halo', `Wenas`, `Que tal`, 'Hai', `Halo`, `Olá`, `Namaste`, `Hei!`, `Aloha`, `Konnichi wa`, `Mi king`, `Que hay`, `Apa kabar`, 'Oi', 'Fuck Good'],
    reportErrorFound: (usedPrefix, command) => { return 'kalo kamu nemu pesan eror, lapor pake perintah ini\n\ncontoh:\n %s selamat siang owner, sy menemukan eror seperti berikut <copy/tag pesan erornya>', usedPrefix + command; },
    reportShort: () => { return 'Laporan terlalu pendek, minimal 10 karakter!'; },
    reportLong: () => { return "Laporan terlalu panjang, maksimal 1000 karakter!"; },
    From: () => { return 'Dari'; },
    Message: () => { return 'Pesan'; },
    reportMessage: (command) => {
        return 'Pesan terkirim kepemilik bot, jika %s hanya main-main tidak akan ditanggapi.', command.toLowerCase();
    },
    PanelMenu: (prefix, pushname, actividad, role, monospace, nwn) => {
        return `${monospace}< [ ${MyInfo.NomeDoBot} ] >${monospace}
╔═══════════
║❂ Waktu aktif : ${actividad}
║❂ Versi bot : ${MyPkg.version}
║❂ Pencipta : ${MyInfo.CoCreador}
║❂ Awalan : 「  ${prefix}  」
║❂ Klien : ${pushname}️
║❂ Peran Klien : ${role}
╚═══════════
${nwn}
~|-------------------------|~
⮕ *_PERINTAH_  ☷*
~|-------------------------|~

*╔═══════════*
*║ _MULTIMEDIA :_*
*║╭——————————*
*║├ ${prefix}informacion*
*║├ ${prefix}apoyo*
*║├ ${prefix}wame*
*║├ ${prefix}milimite*
*║├ ${prefix}minivel*
*║├ ${prefix}estadobot*
*║├ ${prefix}creador*
*║├ ${prefix}gpinfo*
*║├ ${prefix}admins*
*║├ ${prefix}gplink*
*║├ ${prefix}tienda*
*║├ ${prefix}horario*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _PASTIME :_*
*║╭——————————*
*║├ ${prefix}quien*
*║├ ${prefix}ruleta*
*║├ ${prefix}tragamoneda*
*║├ ${prefix}calumnia*
*║├ ${prefix}dados*
*║├ ${prefix}dado*
*║├ ${prefix}emparejar*
*║├ ${prefix}top5*
*║├ ${prefix}testgay*
*║├ ${prefix}votacion*
*║├ ${prefix}sivotar*
*║├ ${prefix}novotar*
*║├ ${prefix}vervotos*
*║├ ${prefix}reiniciarvotos*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _KONVERTER :_*
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
*║├ ${prefix}tiendaimg*
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
*║╰┬> AKTIVATOR*
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
*║╰┬> PERMAINAN*
*║╭╯*
*║├ ${prefix}deathnote*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _CMDS PENCIPTA :_*
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
*║╰┬> AKTIVATOR*
*║╭╯*
*║├ ${prefix}chatbot*
*║├ ${prefix}banchat*
*║╰┬> ~MODE KUAKER~*
*║ ~NOTE- Perintah-perintah ini dikunci oleh virus~*
*║ ~hati-hati saat menggunakannya!~*
*║╭╯*
*║├ ${prefix}c1*
*║╰┬> CANGGIH*
*║╭╯*
*║├=>*
*║├ >*
*║├ $*
*║╰——————————*
*╚═══════════*
*╔═══════════*
*║ _LEBIH BANYAK PERINTAH TAMBAHAN :_*
*║╭——————————*
*║├ ${prefix}mascmds*
*║├ ${prefix}randmenu*
*║├ ${prefix}crealogos*
*║├ ${prefix}mianime*
*║├ ${prefix}labiblia*
*║╰——————————*
*╚═══════════*
`;
    },
    FooterPM: (CovidApi) => {
        return `┏「 DATA - COVID19 」─┓
┃➲ Kasus positif : ${CovidApi.cases}
┃✯ Pulih : ${CovidApi.recovered}
┃❥ Perjanjian : ${CovidApi.active}
┃✞ Almarhum : ${CovidApi.deaths}
┗─━─━ 「 🌎 」 ━─━─┛`;
    },
    PanelMenu2: (prefix, monospace) => {
        return `${monospace}[ RANDOM-MENU ]${monospace}
 
╔═══════════
║
╠═> MULTIMEDIA
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
╠═> PENGUNDUH
║➣ ${prefix}mediafire
║➣ ${prefix}play
║➣ ${prefix}play2
║➣ ${prefix}fbdl
║➣ ${prefix}tiktokdl
║
╠═> PASTIME
║➣ ${prefix}simi
║➣ ${prefix}minidatos
║➣ ${prefix}minombre
║➣ ${prefix}frasesamor
║➣ ${prefix}top10
║➣ ${prefix}preguntame
║➣ ${prefix}v_o_f
║➣ ${prefix}notificacion
║➣ ${prefix}tumama
║➣ ${prefix}comediante
║➣ ${prefix}consejo
║➣ ${prefix}randimg
║➣ ${prefix}djbot
║➣ ${prefix}xd
║➣ ${prefix}perros
║➣ ${prefix}gatos
║➣ ${prefix}patos
╚═══════════
`;
    },
    MenuArte: (prefix, monospace) => {
        return `${monospace}[ BUAT-LOGO ]${monospace}
 
╔═══════════
║☞ ${prefix}attp
║☞ ${prefix}halloween
║☞ ${prefix}lava
║☞ ${prefix}toxico
║☞ ${prefix}metalrojo
║☞ ${prefix}tormenta
║☞ ${prefix}gneon
║☞ ${prefix}neontxt
║☞ ${prefix}arcoiris
║☞ ${prefix}hielo
║☞ ${prefix}lapiz
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
        return `Panggilan ke nomor bot dilarang!\nHubungi pencipta : ${helpcall}`;
    },
    AutoSaludo: () => {
        return `*_Pencipta utama saya bergabung dengan grup_ ✓*\n*[ Selamat datang nwn ]*`;
    },
    Wlc1: () => {
        return `Beri aku bintang`;
    },
    Wlc2: () => {
        return `Pencipta`;
    },
    Wlc3: (num, metadata, dateComplete, gpdesc) => {
        return `⚡ *Selamat datang @${num.split("@")[0]} ke grup hebat ini :*\n${metadata.subject}\n⚡ *Tanggal penerimaan : ${dateComplete}*\n⚡ _*Saya harap dan Anda suka tinggal di sini, jangan lupa untuk menghormati peserta dan aturannya*_ ;)\n\n*Norma kelompok saat ini :* \n${gpdesc}`;
    },
    Wlc4: () => {
        return `SELAMAT TINGGAL... 😔`;
    },
    Wlc5: (num) => {
        return `[ ! ] Meninggalkan grup : @${num.split("@")[0]}`;
    },
    NoSpam1: () => {
        return `*Tunggu beberapa detik sebelum menggunakan perintah lain ✓*`;
    },
    NoSpam2: (pushname) => {
        return `[ ! ] ${pushname} Tolong jangan menjenuhkan bot ;-;`;
    },
    NoReg: (pushname) => {
        return `[ ! ] ${pushname} Anda harus mendaftar untuk mulai menggunakan bot`;
    },
    PreFijo: () => {
        return `Awalan:`;
    },
    Erreply: () => {
        return `*[ ! ] Terjadi kesalahan tak terduga u.u [ ! ]*`;
    },
    SinLimite: (pushname) => {
        return `*[ ! ] ${pushname} Batas Anda untuk menggunakan bot habis ;-;*\nJika Anda naik level, mereka diberikan kepada Anda : ~+3 batas~`;
    },
    Limite: (pushname) => {
        return `*┏━━⊱ 「 MEMBATASI 」*
*┗⊱ _${pushname} Batas Anda yang tersisa adalah_*`;
    },
    NivelUp: (dateComplete, senderNumber, getLevel, getLevelingLevel, sender, per, getLevelingXp, role, role2) => {
        return `「 ⚡PENINGKATAN TINGKAT⚡  」\n\n➸ *Tanggal* : ${dateComplete}\n➸ *Pengguna* : ${senderNumber}\n➸ *Tingkat* : ${getLevel} -> ${getLevelingLevel(sender)}\n➸ *Kemajuan tingkat : ${per}*\n➸ *XP* : ${getLevelingXp(sender)}\n➸ *Menurut XP Anda, Anda menjadi* : ${role}\n➸ *Tingkat kekuatan* : ${role2}\n\n⚡ *Bonus Naik Level :*\n_[ + 3 batas ]_`;
    },
    MinGp1: () => {
        return `Minta dukungan atau bantuannya`;
    },
    MinGp2: () => {
        return `*[ ! ] Maaf, jumlah minimum anggota yang diperlukan dalam grup harus :*`;
    },
    NoTraba1: () => {
        return `Seorang administrator baru saja mengirim teks yang berisi banyak karakter -.-`;
    },
    NoTraba2: (saltos, eliminar, pushname) => {
        return `Tandai obrolan sebagai telah dibaca ✓\n${saltos}\n=> Nomor : ${eliminar}\n=> Alias : ${pushname}\n[ ! ] Anda baru saja mengirim teks yang berisi banyak karakter yang dapat menyebabkan perangkat mogok`;
    },
    NoPriv: (privcre) => {
        return `[ ! ] Obrolan pribadi dilarang [ ! ]\nPencipta saya jika Anda membutuhkan bantuan : ${privcre}`;
    },
    NoLinks1: () => {
        return `Untung tautan yang terdeteksi berasal dari grup ini owo`;
    },
    NoLinks2: () => {
        return `[ ! ] Pengguna ini tidak dapat dihapus`;
    },
    NoLinks3: () => {
        return `Untungnya saya bukan administrator, saya tidak akan dapat menghapus Anda :v`;
    }
    //♻️//
    ,
    Pong: (conexiont) => {
        return `kecepatan respon : ${conexiont} milidetik`;
    },
    NoReg2: (prefix) => {
        return `*[ ! ] Anda tidak terdaftar di database saya*\n\n_Contoh untuk mendaftar_ :\n${prefix}rg NamaAnda|UsiaAnda`;
    },
    SoloGp: () => {
        return `*[ ! ] Perintah ini hanya dapat digunakan dalam grup*`;
    },
    SoloAdm: () => {
        return `*[ ! ] Perintah ini hanya dapat digunakan oleh administrator*`;
    },
    YaActivo: (command) => {
        return `Perintah ${command} sudah aktif di grup ini`;
    },
    YaActivoSi: (command, groupName) => {
        return `*${command} diaktifkan di grup* : ${groupName}`;
    },
    YaActivoNo: (command, groupName) => {
        return `*${command} dinonaktifkan di grup* : ${groupName}`;
    },
    ActiVar: () => {
        return `MENGAKTIFKAN [✓]`;
    },
    DesActiVar: () => {
        return `MENONAKTIFKAN [X]`;
    },
    AdminBot: () => {
        return `*[ ! ] Bot harus menjadi administrator*`;
    },
    SoloCreador: () => {
        return `*[ ! ] Perintah ini hanya dapat digunakan oleh pembuat bot*`;
    }
    //⚡//
    ,
    Modo0: () => {
        return `[ MODE 1 ]`;
    },
    Modo1: () => {
        return `PRIBADI 🔒`;
    },
    Modo2: () => {
        return `PUBLIK 🔓`;
    },
    Modo3: () => {
        return `Mode publik diaktifkan, sekarang semua peserta dapat menggunakan bot`;
    },
    Modo4: () => {
        return `Mode pribadi diaktifkan, sekarang hanya pembuat bot yang dapat menggunakannya`;
    },
    ModNet0: () => {
        return `[ MODE 2 ]`;
    },
    ModNet1: () => {
        return `OFF-LINE 🚫`;
    },
    ModNet2: () => {
        return `ON-LINE 🌐`;
    },
    ModNet3: () => {
        return `Mode Bot In-Line, sekarang semua perintah tersedia`;
    },
    ModNet4: () => {
        return `Mode Bot Off-line, sekarang hanya beberapa perintah yang tersedia`;
    },
    NoPriv1: () => {
        return `Mode Anti-Pribadi dinonaktifkan`;
    },
    NoPriv2: () => {
        return `Mode Anti-Pribadi diaktifkan, sekarang semua orang yang berbicara dengan bot secara pribadi akan diblokir`;
    }
    //✍️//
    ,
    PreDit0: () => {
        return `*[ ! ] Ketik hanya simbol atau angka*`;
    },
    PreDit1: () => {
        return `*[ ! ] Hanya satu digit yang diterima untuk awalan [ ! ]*`;
    },
    PreDit2: () => {
        return `Awalan diubah dengan benar ✓\nAwalan baru:`;
    },
    NomBot0: () => {
        return `*[ ! ] Ketik nama atau nama panggilan*`;
    },
    NomBot1: () => {
        return `*[ ! ] Nama harus berisi maksimal 15 karakter [ ! ]*`;
    },
    NomBot2: () => {
        return `Nama bot berhasil diubah ✓\nNama baru:`;
    },
    PrinCre0: () => {
        return `*[ ! ] Tulis nama atau nama panggilan Anda*`;
    },
    PrinCre1: () => {
        return `*[ ! ] Nama harus berisi maksimal 25 karakter [ ! ]*`;
    },
    PrinCre2: () => {
        return `Nama pencipta diubah dengan benar ✓\nNama baru:`;
    },
    MyRed0: () => {
        return `*[ ! ] Tempatkan atau tempel jejaring sosial Anda*`;
    },
    MyRed1: () => {
        return `*[ ! ] Teks harus berisi maksimal 300 karakter [ ! ]*`;
    },
    MyRed2: () => {
        return `Informasi untuk jejaring sosial telah diedit :\n`;
    },
    UsLimit0: () => {
        return `*[ ! ] Tulis batas yang Anda inginkan*\n_Batas saat ini untuk menggunakan perintah :_`;
    },
    UsLimit1: () => {
        return `*[ ! ] Hanya nomor yang diterima*`;
    },
    UsLimit2: () => {
        return `*[ ! ] Anda tidak dapat memberi nilai lebih rendah dari*`;
    },
    UsLimit3: () => {
        return `*[ ! ] Hanya maksimal 5 karakter yang diterima [ ! ]*`;
    },
    UsLimit4: () => {
        return `Batas diubah oleh nilai :`;
    },
    PfBot0: () => {
        return `Profil bot berhasil diubah`;
    },
    PfBot1: () => {
        return `Profil sebelumnya : `;
    },
    ProCes: (pushname) => {
        return `_Pengolahan, ${pushname} Harap tunggu..._`;
    },
    QuImage: (prefix, command) => {
        return `Kirim atau Balas gambar dengan perintah ${prefix + command}`;
    },
    SuPrim: () => {
        return `*[ ! ] Tindakan ini hanya dapat digunakan dengan membalas pesan terbaru dari bot*`;
    },
    NoTexto: () => {
        return `*[ ! ] Dan teksnya?*`;
    },
    BcGrupos0: (gmap) => {
        return `Mengirimkan transmisi ke ${gmap.length} kelompok, Berakhir di ${gmap.length * 1.5} detik`;
    },
    BcGrupos1: (gmap) => {
        return `Pesan dikirim ke ${gmap.length} kelompok ✓`;
    },
    BcTodos0: (tmap) => {
        return `Mengirimkan pesan dalam ${tmap.length} chats\nBerakhir di ${tmap.length * 1.5} detik`;
    },
    BcTodos1: () => {
        return `⚡ *Pesan simultan berhasil dibagikan :D*⚡`;
    },
    BanUser0: () => {
        return `Pengguna yang diblokir`;
    },
    BanUser1: () => {
        return `Pengguna yang tidak diblokir`;
    }
    //📝//
    ,
    CerrarGp0: (pushname, prefix, command) => {
        return `*${pushname} Jam berapa Anda ingin menutup grup?*\n\n_contoh penggunaan_ : \n${prefix + command} 10 detik`;
    },
    CerrarGp1: (UwU, pushname) => {
        return `*Grup akan ditutup ${UwU}*\n_Tindakan yang dilakukan oleh : ${pushname}_`;
    },
    CerrarGp2: () => {
        return `*[ Grup berhasil ditutup ✓ ]*`;
    },
    AbrirGp: () => {
        return `*[ Grup terbuka ✓ ]*`;
    },
    NomGp0: () => {
        return `*[ ! ] Marakter maksimum adalah 25*`;
    },
    NomGp1: (groupName) => {
        return `Nama grup berhasil diubah ✓\nNama baru : [ ${groupName} ]`;
    },
    DesGp0: () => {
        return `*[ ! ] Karakter maksimum 512*`;
    },
    DesGp1: (nwn, groupDesc) => {
        return `Deskripsi grup berhasil diubah ✓\nDeskripsi baru : ${nwn}\n${groupDesc}`;
    },
    PfGp0: () => {
        return `Profil grup berhasil diubah`;
    },
    PfGp1: () => {
        return `Gambar sebelumnya : `;
    }
    //🧑‍💻//
    ,
    ToDos: (groupName, pushname, texto) => {
        return `⚡ *Memanggil anggota grup* : ${groupName}\n*~> Pemanggil* : _${pushname}_\n*~> Pesan* : _${texto ? texto : 'Tidak ada :v'}_\n`;
    },
    DarP: (usuariop, pushname) => {
        return `*Peserta @${usuariop} dijadikan admin grup ✓*\n_Tindakan yang dilakukan oleh ${pushname}_`;
    },
    QuitP: (usuarioq, pushname) => {
        return `*Administrator @${usuarioq} diturunkan dari admin ✓*\n_Tindakan yang dilakukan oleh ${pushname}_`;
    },
    BanSer: (adiuser, pushname) => {
        return `*Peserta @${adiuser} telah dikeluarkan dari grup ✓*\n_Tindakan yang dilakukan oleh ${pushname}_`;
    },
    UsEnLinea: () => {
        return `=> [ Daftar Pengguna Online ]\n=> Kuantitas : `;
    }
    //
    ,
    Baneao: (senderNumber) => {
        return `${senderNumber} Anda dilarang, sekarang Anda tidak akan dapat menggunakan bot :v`;
    },
    SinLimite: (pushname) => {
        return `*[ ! ] Maaf ${pushname} Anda kehabisan batas untuk terus menggunakan bot T~T*`;
    },
    BotInfo: () => {
        return `[ INFO-BOT ]`;
    },
    GraciAs: () => {
        return `[ MENDUKUNG ]`;
    },
    MasCmds: () => {
        return `[ PERINTAH LEBIH BANYAK ☰ ]`;
    },
    YaReg: () => {
        return `*[ ! ] Anda sudah terdaftar di database saya*`;
    },
    MyReg0: () => {
        return `*[ ! ] Tolong tambahkan garis miring antara nama dan usia*\n" | "`;
    },
    MyReg1: () => {
        return `*[ ! ] Di usia hanya angka yang diterima -.-*`;
    },
    MyReg2: () => {
        return `*[ ! ] Bru namanya terlalu panjang ._.*`;
    },
    MyReg3: () => {
        return `*[ ! ] Usia maksimal 30 tahun*`;
    },
    MyReg4: () => {
        return `*[ ! ] Usia minimal 13 tahun*`;
    },
    MyReg5: (nwn, time, nomreg, pushname, edreg, sender, codereg) => {
        return `〘  *REGISTRO* 〙${nwn}\n❥Tanggal dan waktu pendaftaran \n❥${time}\n┏─━─━━─━─━━─━─\n╠≽️ *Nama terdaftar* : *${nomreg}*\n╠≽️ *Nama yang digunakan di whatsapp* : *${pushname}*\n╠≽️ *Usia* : *${edreg}*\n╠≽️ *Nº* : *wa.me/${sender.split("@")[0]}*\n┗─━─━━─━─━━─━─\n_Kode registrasi_ : *${codereg}* `;
    },
    MyReg6: () => {
        return `Semoga harimu menyenangkan! :D`;
    },
    CmdsR0: () => {
        return `Lebih banyak perintah`;
    },
    CmdsR1: () => {
        return `Random-Menu`;
    },
    CmdsA0: () => {
        return `Artistik`;
    },
    CmdsA1: () => {
        return `Buat-Logo`;
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
        return `Ketuk di sini ⚡`;
    },
    MCmds1: () => {
        return `Pilih hanya satu pilihan`;
    },
    OffLineInfo: () => {
        return `Info:
  ᴱˢᵗᵉ ᵐᵒᵈᵒ ᵃᵗᶦᵛᵃ ᵐᵒᵈᵒ ᵒᶠᶠ ˡᶦⁿᵉ `;
    },
    BotIdiomChanged: (lang) => {
        'Bahasa bot berhasil diubah ke %s ✓', lang;
    }
};
export default ind;
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
//# sourceMappingURL=ind.js.map
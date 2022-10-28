import { BotCommands, ConvertCommands, DownloadCommands, FunCommands, LevelCommands, MandatoryCommands, MasonCommands, MiscCommands, ModerationCommands, OwnerCommands, ReligionCommands, RoughCommands, SearchCommands, StickerCommands, UtilCommands } from '../../messages/commands.js';
import { PluginManager } from '../pluginManager.js';
let space = ' ';
const more = '';
let nwn = more.repeat(850); //it print 850 characters so that makes whatsapp add 'read more' button
let q3 = '```';
let readMore = `\u00AD`.repeat(1500); //it print 1500 characters so that makes whatsapp add 'read more' button
/**
 * @ Author: BodaoBot Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Menu
 */
const textTnC = () => {
    return `
    BodãoBot é um *Bot* 
    *Bot* é um acrônimo to a palavra Robot que significa um sistema programado por um computador.
    Portanto, a resposta ou resposta feita pelo Bodão não é de humanos.
    
    Ao usar este bot, você *concorda* com os seguintes termos e condições:
    - Dê uma pausa de cada comando.
    - Não ligue to o Bodão, ou você será bloqueado automaticamente.
    - Spam é estritamente proibido. Capturado = automaticamente banido.
    - Os Bodão não responderá às suas reclamações.
    - O Bodão não salva as imagens/mídia enviadas.
    - O Bodão não armazenam seus dados pessoais em nenhum lugar.
    - O Bodão não é responsável pelos pedidos to ele.
    - O Bodão é executado no servidor separadamente (não no seu celular).
    - O Bodão será monitorado regularmente pelo proprietário, portanto existe a possibilidade de que o chat seja lido por ele.
    - Os Logs serão limpos no início de cada mês ou quando julgar necessário.
    
    Ficou interessado neste projeto de código aberto?
    Colabore agora: https://github.com/dngda/bot-whatsapp
    
    Atenciosamente,
    
    -O Bodão.`;
};
/*

Por favor, não exclua meu link do github, preciso do seu apoio! obrigado.

*/
const textMenuBotInformation = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 BOT 」 ──*\n';
    let count = 0;
    BotCommands.forEach(option => {
        if (((option.type === 'option' || option.type === 'link') && option.enabled === 'y') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            BotCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 💬 Informações 💬 〙✪ 
    Comandos do Bot

    ${text}

〘 *BodãoBot* 〙
_Index of [2]_
    `;
};
const textMenuConverters = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 BOT 」 ──*\n';
    let count = 0;
    ConvertCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            ConvertCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 🎊 Conversores 🎊 〙✪ 
    Comandos de conversão de formatos e tipos

    ${text}

〘 *BodãoBot* 〙
_Index of [13]_
     `;
};
const textMenuSearch = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 PROCURAR 」 ──*\n';
    let count = 0;
    SearchCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            SearchCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 🎊 Procura 🎊 〙✪ 
    Comandos de Procura em diversos sites

    ${text}

〘 *BodãoBot* 〙
_Index of [14]_
     `;
};
const textMenuUtility = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 UTILIDADES 」 ──*\n';
    let count = 0;
    UtilCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            UtilCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 🤩 Utilidades 🤩 〙✪ 
    Várias Utilidades

    ${text}

〘 *BodãoBot* 〙
_Index of [11]_
    `;
};
const textMenuFreeMason = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 FREEMASON 」 ──*\n';
    let count = 0;
    MasonCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            MasonCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 🕋 Maçonaria 🕋 〙✪ 

    ${text}

〘 *BodãoBot* 〙
_Index of [15]_
    `;
};
const textMenuReligion = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 RELIGION 」 ──*\n';
    let count = 0;
    ReligionCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            ReligionCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 🕋 islamismo 🕋 〙✪ 

    ${text}

〘 *BodãoBot* 〙
_Index of [12]_
    `;
};
const textMenuDownloader = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 DOWNLOADER 」 ──*\n';
    let count = 0;
    DownloadCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            DownloadCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 📩 Downloader 📩 〙✪ 

    ${text}

〘 *BodãoBot* 〙
_Index of [8]_
    `;
};
const textMenuMandatory = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 MANDATORY 」 ──*\n';
    let count = 0;
    MandatoryCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            MandatoryCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘  ‼️ Obrigatório ‼️ 〙✪ 

    ${text}

〘 *BodãoBot* 〙
_Index of [1]_
    `;
};
const textMenuAntiRough = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 ANIMOSIDADES 」 ──*\n';
    let count = 0;
    RoughCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            RoughCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ✪〘 📩 Animosidades 📩 〙✪ 

    ${text}

〘 *BodãoBot* 〙
_Index of [5]_
    `;
};
const textMenuHeader = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let n = (new Date(t * 1000)).getHours();
    let ucapan = ''; //means saudação
    if (3 < n && n <= 9)
        ucapan = `*Bom Dia  🌤️*`;
    else if (9 < n && n <= 14)
        ucapan = `*Boa Tarde ☀️*`;
    else if (14 < n && n <= 18)
        ucapan = `*Boa Tarde 🌻*`;
    else
        ucapan = `*Boa Noite 💤*`;
    return `
Olá, ${pushname}!
${ucapan} 👋️
deixa eu me apresentar, eu sou o
${q3}
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
┃┃┃┃┃┃┃┃┃┃┃

${q3}
Aqui estão algumas das minhas características:✨
${readMore}
Notas:
Não seja  bloqueado instantaneamente à toa! ⛔
Envie comandos no arguments to ver o que cada opção significa.
Além de ${q3}(/)${q3} o bot também responderá aos seguintes símbolos:
${q3}\\ / ! $ ^ % & + . , -${q3}

As operações da calculadora usam prefixo =
(for instance: =10+2+4)`;
};
const textMenuAFooter = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    return `
Notas:
Responda à sua mensagem contendo o comando
com '..' (ponto duplo) to enviá-lo de volta.

O chat com triggers (bot, sero, serobot) ou tag será respondido pelo simsimi.

Espero que você tenha um ótimo dia!✨
Se você achar este bot útil, por favor *doe* ✨`;
};
const textMenu = (pushname, t, prefix) => {
    let n = (new Date(t * 1000)).getHours();
    let ucapan = ''; //means saudação
    if (3 < n && n <= 9)
        ucapan = `*Bom Dia  🌤️*`;
    else if (9 < n && n <= 14)
        ucapan = `*Boa Tarde ☀️*`;
    else if (14 < n && n <= 18)
        ucapan = `*Boa Tarde 🌻*`;
    else
        ucapan = `*Boa Noite 💤*`;
    return `
Olá, ${pushname}!
${ucapan} 👋️
deixa eu me apresentar, eu sou o
${q3}
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
┃┃┃┃┃┃┃┃┃┃┃

${q3}


`;
};
/*

Por favor, não exclua meu link do github, preciso do seu apoio! obrigado.

*/
const textMenuModeration = (prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 MODERAÇÃO 」 ──*\n';
    let count = 0;
    ModerationCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            ModerationCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ⚠ [ *Administrador do Grupo* ] ⚠ 
Aqui estão os recursos de administração do grupo neste bot!

    ${text}

_Index of [7]_
    `;
};
const textMenuOwner = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 DONO 」 ──*\n';
    let count = 0;
    OwnerCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            OwnerCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ⚠ [ *Dono apenas* ] ⚠ 
    Aqui estão os recursos do proprietário neste bot!

    ${text}

〘 *BodãoBot* 〙
_Index of [9]_
    `;
};
/*

Dimohon untuk tidak menghapus link github saya, butuh support a partir de kalian! makasih.

*/
const textDonasi = () => {
    return `
    Olá, obrigado por usar este bot, to apoiar este bot, você pode ajudar doando:
    
    Bitcoin: 14vHto4CCXmEwC6BVsifyVmMxxsGydRHCS
    USDT (Trc20): TB29LW37akLR5VmCkatK3ppxftUogSA8SU
    
    Qualquer quantia ajudará muito no desenvolvimento desse bot.
    Obrigado. ~Bodão`;
};
const textMenuSticker = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 MISC 」 ──*\n';
    let count = 0;
    StickerCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            StickerCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    🎊 [ *Stickers* ] 🎊 
    Aqui estão os recursos do proprietário neste bot!

    ${text}

〘 *BodãoBot* 〙

_Index of [4]_
    `;
};
//==============
const menu = (prefix, jumlahUser, level, xp, role, pushname, requiredXp, premium) => {
    let tagText = "";
    PluginManager.pluginTags.forEach(tag => {
        tagText += `\n <[${tag}]>`;
    });
    return `
*── 「 WELCOME 」 ──*

======================
➸ *Name*: ${pushname}
➸ *Level*: ${level}
➸ *XP*: ${xp} / ${requiredXp}
➸ *Role*: ${role}
➸ *Premium*: ${premium}
======================

Total registered: *${jumlahUser}*

The following menus are available:

${tagText}

Type *${prefix}menu* index_number to open the selected page menu.

Note:
Treat the bot well, dev will act firmly if the user violates the rules.
This bot has anti-spam in the form of a cooldown command for *5  seconds* every time you use it.
    `;
};
const textMenuMisc = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 MISC 」 ──*\n';
    let count = 0;
    MiscCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            MiscCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    🎊 [ *Miscelaneos* ] 🎊 
    Aqui estão os recursos do proprietário neste bot!

    ${text}

〘 *BodãoBot* 〙
_Index of [3]_`;
};
const textMenuFun = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 FUN 」 ──*\n';
    let count = 0;
    FunCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            FunCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `
    ⚠ *── 「 FUN 」 ──* ⚠ 
    Aqui estão Entretenimentos

    ${text}

〘 *BodãoBot* 〙
_Index of [6]_
    `;
};
const textMenuLeveling = (pushname, t, prefix) => {
    let m = (namaMenu) => `*${prefix}${namaMenu}*`;
    let text = '*── 「 LEVELING 」 ──*\n';
    let count = 0;
    LevelCommands.forEach(option => {
        if ((option.type === 'option' || option.type === 'link') && option.enabled === 'y') {
            text += `${count++}. `;
            text += m(option.name) + '\n';
            text += option.description + '\n';
            let aliases = ' ';
            LevelCommands.forEach(alias => {
                if (alias.root === option.name && option.enabled === 'y') {
                    aliases += ' - ';
                    aliases += alias.name;
                }
            });
            text += `Aliases: ${aliases}. \n`;
            const usage = option.usage ? option.usage.replace(option.name, m(option.name)) : '';
            text += 'Usage: ' + usage + '\n';
            text += '\n';
        }
    });
    return `

    ${text}

〘 *BodãoBot* 〙
_Index of [10]_`;
};
export default {
    textTnC,
    textMenu,
    textMenuHeader,
    textMenuOwner,
    textMenuModeration,
    textDonasi,
    textMenuSticker,
    textMenuBotInformation,
    textMenuConverters,
    textMenuSearch,
    textMenuUtility,
    textMenuReligion,
    textMenuDownloader,
    textMenuMandatory,
    textMenuAntiRough,
    textMenuAFooter,
    textMenuLeveling,
    textMenuFun,
    textMenuMisc,
    textMenuFreeMason,
    menu
};
//# sourceMappingURL=menus.js.map
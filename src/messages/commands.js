const OwnerCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'verip',
        type: 'option',
        description: 'Show IP information',
        usage: 'verip',
        group: 'CONTROL',
        script: 'runVerip'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'midueño',
        type: 'alias',
        root: 'miduenho'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ban',
        type: 'option',
        description: 'Adiciona ou remove usuarios banidos',
        usage: 'ban add/del @user/62812xxxxxxxx',
        group: 'CONTROL',
        script: 'runBan'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'c1',
        type: 'option',
        description: '???',
        usage: 'c1',
        group: 'CONTROL',
        script: 'runC1'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '=>',
        type: 'link',
        description: '=>',
        usage: '=>',
        group: 'COMMON',
        script: ''
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '>',
        type: 'link',
        description: '>',
        usage: '>',
        group: 'COMMON',
        script: ''
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '$',
        type: 'link',
        description: '$',
        usage: '$',
        group: 'COMMON',
        script: ''
    } /*,
    {
         runable:'y',
         enabled:'y',
         name: 'addsfx',
         type: 'option',
         description: 'add sound effect to bot',
         usage: 'reply audio with command addsfx <name>',
         group: 'UTILS',
         script: 'runAddSfx'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'leaveall',
         type: 'option',
         description: 'Sair de todos os grupos, exceto premium (Limpeza).',
         usage: 'leaveall',
         group: 'CONTROL',
         script: 'runLeaveAll'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'leavealp',
         type: 'option',
         description: 'Sair de todos os grupos',
         usage: 'leaveall',
         group: 'CONTROL',
         script: 'runLeaveAllP'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'addkasar',
         type: 'option',
         description: 'Adicionar discurso retórico ao banco de dados. É necessário reiniciar.',
         usage: 'addkasar',
         group: 'CONTROL',
         script: 'runAddRough '
    },
    {
         runable:'y',
         enabled:'y',
         name: 'restart',
         type: 'option',
         description: 'Reinicie o nodejs. Apenas Windows.',
         usage: 'restart',
         group: 'CONTROL',
         script: 'runRestart'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'listgroup',
         type: 'option',
         description: 'Retornar toda a lista de grupos',
         usage: 'listgroup',
         group: 'CONTROL',
         script: 'runListGroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'income',
         type: 'option',
         description: 'Get income from all groups.',
         usage: 'income',
         group: 'CONTROL',
         script: 'runIncome'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'addincome',
         type: 'option',
         description: 'Add income',
         usage: 'addincome',
         group: 'CONTROL',
         script: 'runAddIncome'
    },
    ,
    {
         runable:'y',
         enabled:'y',
         name: 'addprem',
         type: 'option',
         description: 'Adicione grupos ao premium.',
         usage: 'addprem @user/62812xxxxxxxx',
         group: 'CONTROL',
         script: 'runAddPrem'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'premium',
         type: 'option',
         description: 'Add/remove premium users.',
         usage: 'premium add/del @user',
         group: 'CONTROL',
         script: 'runPremium'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'unblock',
         type: 'option',
         description: 'Desbloqueie usuários.',
         usage: 'unblock @user/62812xxxxxxxx',
         group: 'CONTROL',
         script: 'runUnblock'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'u',
         type: 'alias',
         root: 'unblock'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'unblok',
         type: 'alias',
         root: 'unblock'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'block',
         type: 'option',
         description: 'Block user.',
         usage: 'block @user/62812xxxxxxxx',
         group: 'CONTROL',
         script: 'runBlock'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'clearexitedgroup',
         type: 'option',
         description: 'Exclua o grupo de bate-papo que foi removido.',
         usage: 'clearexitedgroup',
         group: 'CONTROL',
         script: 'runClearex'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'getinfo',
         type: 'option',
         description: 'Obtenha informações a partir do link de grupo.',
         usage: 'getinfo',
         group: 'CONTROL',
         script: 'runGetInfo'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'getstory',
         type: 'option',
         description: 'Obter história wa.',
         usage: 'getstory',
         group: 'CONTROL',
         script: 'runGetStory'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'deleteall',
         type: 'option',
         description: 'Exclua todos os bate-papos, incluindo grupos, sem sair do grupo.',
         usage: 'deleteall',
         group: 'CONTROL',
         script: 'runDeleteAll'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'clearall',
         type: 'option',
         description: 'Deletes all chats on the bot account.. Limpe todos os bate-papos sem excluir bate-papos.',
         usage: 'clearall',
         group: 'CONTROL',
         script: 'runClearAll'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'cleanchat',
         type: 'option',
         description: 'Simule limpar todo o bate-papo como às 01:01',
         usage: 'cleanchat',
         group: 'CONTROL',
         script: 'runCleanChat'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'getses',
         type: 'option',
         description: 'Take a screenshot of the session from the bot account.',
         usage: 'getses',
         group: 'CONTROL',
         script: 'runGetSes'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'eval',
         type: 'option',
         description: 'Evaluate the JavaScript code.',
         usage: 'eval',
         group: 'CONTROL',
         script: 'runEval'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'ev',
         type: 'alias',
         root: 'eval'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'shutdown',
         type: 'option',
         description: 'Shutdown bot.',
         usage: 'shutdown',
         group: 'CONTROL',
         script: 'runShutDown'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'setstatus',
         type: 'option',
         description: 'Set about me.',
         usage: 'status* text',
         group: 'CONTROL',
         script: 'runSetStatus'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'setstat',
         type: 'alias',
         root: 'setstatus'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'setstats',
         type: 'alias',
         root: 'setstatus'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'serial',
         type: 'option',
         description: "Check user's serial.",
         usage: 'serial user_serial',
         group: 'CONTROL',
         script: 'runSerial'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'mute',
         type: 'option',
         description: 'Mute all users.',
         usage: 'Use mute to mute and use mute once again to unmute.',
         group: 'CONTROL',
         script: 'runMute'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'setgname',
         type: 'option',
         description: "Change bot's name. Maximum 25 characters.",
         usage: 'name new_username',
         errormessage: '',
         group: 'CONTROL',
         script: 'runSetGname'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'refresh',
         type: 'option',
         description: "Refreshing web whatsapp page",
         usage: 'name new_username',
         errormessage: '',
         group: 'CONTROL',
         script: 'runRefresh'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'leavegroup',
         type: 'option',
         description: "Leave Group",
         usage: 'leave',
         errormessage: '',
         group: 'CONTROL',
         script: 'runLeaveGroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'owneronly',
         type: 'option',
         description: "turn owneronly mode on/off",
         usage: 'owneronly on/off',
         errormessage: '',
         group: 'CONTROL',
         script: 'runOwneronlyGroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'deleterent',
         type: 'option',
         description: "delete rent of the bot",
         usage: 'deleterent',
         errormessage: '',
         group: 'CONTROL',
         script: 'runDeletRent'
    }*/
];
const FunCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'quem',
        type: 'option',
        description: 'diversion/Hobby',
        usage: 'quien',
        group: 'FUN',
        script: 'runWho'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'quien',
        type: 'alias',
        root: 'quem'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'roleta',
        type: 'option',
        description: 'Russian roulette Game',
        usage: 'roleta',
        group: 'FUN',
        script: 'runRoulette'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ruleta',
        type: 'alias',
        root: 'roleta'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caçaniqueis',
        type: 'option',
        description: 'Bring coins Game',
        usage: 'trazmoedas',
        group: 'FUN',
        script: 'runCoins'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'trazmoedas',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'trazmoeda',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tragamoneda',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caça-níqueis',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caça-niqueis',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caça-niquel',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caça-níquel',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caçaniquel',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caçaníquel',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tragamonedas',
        type: 'alias',
        root: 'caçaniqueis'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'calunia',
        type: 'option',
        description: 'Game of slander',
        usage: 'calunia',
        group: 'FUN',
        script: 'runSlander'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'calúnia',
        type: 'alias',
        root: 'calunia'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'calumnia',
        type: 'alias',
        root: 'calunia'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'slander',
        type: 'alias',
        root: 'calunia'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'dados',
        type: 'option',
        description: 'Dice Games',
        usage: 'dados',
        group: 'FUN',
        script: 'runDices'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'dado',
        type: 'option',
        description: 'Dice Games',
        usage: 'dados',
        group: 'FUN',
        script: 'runDice'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'cupido',
        type: 'option',
        description: 'Game of Pairing',
        usage: 'cupido',
        group: 'FUN',
        script: 'runCupido'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'emparejar',
        type: 'alias',
        root: 'cupido'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'pair',
        type: 'alias',
        root: 'cupido'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'top5',
        type: 'option',
        description: 'Show top Five',
        usage: 'top5',
        group: 'FUN',
        script: 'runTopFive'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'top10',
        type: 'option',
        description: 'Show top ten',
        usage: 'top10',
        group: 'FUN',
        script: 'runTopTen'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'testegay',
        type: 'option',
        description: 'Game of Gay Testing',
        usage: 'testegay',
        group: 'FUN',
        script: 'runGayTest'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'testgay',
        type: 'alias',
        root: 'testegay'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'votar',
        type: 'option',
        description: 'Manage Voting',
        usage: 'votar',
        group: 'FUN',
        script: 'runVote'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'votação',
        type: 'alias',
        root: 'votar'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'vote',
        type: 'alias',
        root: 'votar'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'votacion',
        type: 'alias',
        root: 'votar'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'votación',
        type: 'alias',
        root: 'votar'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'sivotar',
        type: 'option',
        description: 'Vote yes',
        usage: 'sivotar',
        group: 'FUN',
        script: 'runVoteForYes'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'novotar',
        type: 'option',
        description: 'Vote No',
        usage: 'novotar',
        group: 'FUN',
        script: 'runVoteForNo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'vervotos',
        type: 'option',
        description: 'See Votes',
        usage: 'vervotos',
        group: 'FUN',
        script: 'runSeeVotes'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reiniciarvotos',
        type: 'option',
        description: 'reset Votes',
        usage: 'reiniciarvotos',
        group: 'FUN',
        script: 'runResetVotes'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'afk',
        type: 'option',
        description: 'Enter Away from keyboard (unavailable)',
        usage: 'afk reason',
        group: 'UTILS',
        script: 'runAFK'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'audiokey',
        type: 'option',
        description: 'Show available audio effects.',
        usage: 'audiokey',
        group: 'FUN',
        script: 'runSfx'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'listvn',
        type: 'alias',
        root: 'audiokey',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'keyaudio',
        type: 'alias',
        root: 'audiokey',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'sfx',
        type: 'alias',
        root: 'audiokey',
    }
    /*
{
     runable:'y',
     enabled:'y',
     name: 'zodiac',
     type: 'option',
     description: 'Weekly zodiac fortune.',
     usage: 'zodiac zodiac',
     group: 'FUN',api:'vhtear',
     script: 'runZodiac'
},
{
     runable:'y',
enabled:'y',
name: 'zodiak',
     type: 'alias',
     root: 'zodiac',
},
{
     runable:'y',
enabled:'y',
name: 'VoD',
     type: 'option',
     description: 'Grupos apenas. Verdade ou desafio?',
     usage: 'VoD',
     group: 'FUN',
     subgroup: 'vod',
     api:'vhtear',
     script: 'runVoD'
},
{
     runable:'y',
enabled:'y',
name: 'verdade',
     type: 'option',
     description: 'usado durante o jogo verdade ou desafio',
     usage: 'verdade',
     group: 'FUN',
     subgroup: 'vod',
     script: 'runVerdade'
},
{
     runable:'y',
enabled:'y',
name: 'desafio',
     type: 'option',
     description: 'usado durante o jogo verdade ou desafio',
     usage: 'desafio',
     group: 'FUN',
     subgroup: 'vod',
     script: 'runDesafio'
},
{
     runable:'y',
enabled:'y',
name: 'simnao',
     type: 'option',
     description: 'Você pergunta e o Bot responde',
     usage: 'desafio',
     group: 'FUN',
     subgroup: 'vod',
     script: 'runSimNao'
},
{
     runable:'y',
enabled:'y',
name: 'kiss',
     type: 'option',
     description: 'Kiss someone ( ͡° ͜ʖ ͡°).',
     usage: 'Send image with caption kiss or reply image with caption kiss',
     group: 'FUN',
     script: 'runKiss'
},
{
     runable:'y',
enabled:'y',
name: 'asupan',
     type: 'option',
     description: 'Daily dose of TikTok.',
     usage: 'asupan',
     group: 'FUN',
     script: 'runAsupan'
} */
];
const ModerationCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'darpoder',
        type: 'option',
        description: 'Promote member to become admin. (Tornar administrador)',
        usage: 'darpoder @member1',
        group: 'CONTROL',
        script: 'runPromoteMember'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'promote',
        type: 'alias',
        root: 'darpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ascender',
        type: 'alias',
        root: 'darpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tirarpoder',
        type: 'option',
        description: 'Demote member from admin. (Revogar direitos de administrador)',
        usage: 'tirarpoder @member1',
        group: 'CONTROL',
        script: 'runDemoteMember'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'degradar',
        type: 'alias',
        root: 'tirarpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'quitarpoder',
        type: 'alias',
        root: 'tirarpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'demote',
        type: 'alias',
        root: 'tirarpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'expulsar',
        type: 'option',
        description: 'Remove members from the group.',
        usage: 'expulsar @member1',
        group: 'CONTROL',
        script: 'runKickMember'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ban',
        type: 'alias',
        root: 'tirarpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'funar',
        type: 'alias',
        root: 'tirarpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'kick',
        type: 'alias',
        root: 'tirarpoder',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ativos',
        type: 'option',
        description: 'Mention all group members.',
        usage: 'ativos',
        group: 'CONTROL',
        script: 'runEveryone'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'everyone',
        type: 'alias',
        root: 'ativos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'activos',
        type: 'alias',
        root: 'ativos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'todos',
        type: 'option',
        description: 'Tag all members(Grupos apenas. Marque todos os membros.)',
        usage: 'todos',
        group: 'CONTROL',
        script: 'runTagall'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tagall',
        type: 'alias',
        root: 'todos'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'invocar',
        type: 'alias',
        root: 'todos'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'alle',
        type: 'alias',
        root: 'todos'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fotogrupo',
        type: 'option',
        description: 'Change group icon.',
        usage: 'Send images with caption fotogrupo or reply to the images with a caption fotogrupo.',
        group: 'CONTROL',
        script: 'runGroupIcon'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'groupicon',
        type: 'alias',
        root: 'fotogrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'perfilgrupo',
        type: 'alias',
        root: 'fotogrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nomegrupo',
        type: 'option',
        description: 'Alterar nome do grupo',
        usage: 'nomegrupo groupname',
        group: 'CONTROL',
        script: 'runSetGname'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'setgname',
        type: 'alias',
        root: 'nomegrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'settitle',
        type: 'alias',
        root: 'nomegrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'editnomegp',
        type: 'alias',
        root: 'nomegrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gpname',
        type: 'alias',
        root: 'nomegrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'namegp',
        type: 'alias',
        root: 'nomegrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gpname',
        type: 'alias',
        root: 'nomegrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'descgrupo',
        type: 'option',
        description: 'Change Group Description',
        usage: 'descgrupo groupdescription',
        group: 'CONTROL',
        script: 'runSetGdesc'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'editdesgp',
        type: 'alias',
        root: 'descgrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gpdesc',
        type: 'alias',
        root: 'descgrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'descgp',
        type: 'alias',
        root: 'descgrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'agp',
        type: 'option',
        description: 'Open the Bot',
        usage: 'agp',
        group: 'CONTROL',
        script: 'runOpenBot'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ativachat',
        type: 'option',
        description: 'Ative o chat (c0nversation) com o bot neste grupo',
        usage: 'ativachat',
        group: 'CONTROL',
        script: 'runativachat'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'chatbot',
        type: 'alias',
        root: 'ativachat'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'disablebot',
        type: 'option',
        description: 'desativa o bot neste grupo',
        usage: 'disablebot (segundos/minutos/horas)',
        group: 'CONTROL',
        script: 'runDisableBot'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fgp',
        type: 'alias',
        root: 'disablebot'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'banchat',
        type: 'option',
        description: 'Disable/enable ban Mode',
        usage: 'ban on/off',
        group: 'CONTROL',
        script: 'runBanMode'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'chatban',
        type: 'alias',
        root: 'banchat'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'banearchat',
        type: 'alias',
        root: 'banchat'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modocompleto',
        type: 'option',
        description: 'Enable/disable full mode',
        usage: 'modocompleto',
        group: 'CONTROL',
        script: 'runFunMode'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'completo',
        type: 'alias',
        root: 'modocompleto'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modofull',
        type: 'alias',
        root: 'modocompleto'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modoanime',
        type: 'option',
        description: 'Enable/disable Anime mode',
        usage: 'modoanime',
        group: 'CONTROL',
        script: 'runAnimeMode'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'animeuwu',
        type: 'alias',
        root: 'modoanime'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'anime',
        type: 'alias',
        root: 'modoanime'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modohentai',
        type: 'option',
        description: 'Enable/disable Hentai mode',
        usage: 'modohentai',
        group: 'CONTROL',
        script: 'runHentaiMode'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modoh',
        type: 'alias',
        root: 'modohentai'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hmode',
        type: 'alias',
        root: 'modohentai'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nivelamento',
        type: 'link',
        description: 'Enable/disable Leveling',
        usage: 'nivelamento',
        group: 'COMMON',
        script: ''
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'notamorte',
        type: 'option',
        description: 'Death Note game for admins',
        usage: 'notamorte on/off',
        group: 'CONTROL',
        script: 'runDeathNote'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'deathnote',
        type: 'alias',
        root: 'antivirus'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'deatnote',
        type: 'alias',
        root: 'antivirus'
    },
    /*,


    {
         runable:'y',
         enabled:'y',
         name: 'add',
         type: 'option',
         description: 'Add users to group.',
         usage: 'add 628xxxxxxxxxx',
         group: 'CONTROL',
         script: 'runAddGroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'leave',
         type: 'option',
         description: 'Leave bot from group.',
         usage: 'leave',
         group: 'CONTROL',
         script: 'runLeaveGroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'nsfw',
         type: 'option',
         description: 'Toogle NSFW mode.',
         usage: 'nsfw on/off',
         group: 'CONTROL',
         script: 'runNSFW'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'antinsfw',
         type: 'option',
         description: 'Toogle anti-NSFW link.',
         usage: 'antinsfw on/off',
         group: 'CONTROL',
         script: 'runAntiNSFW'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'rgrouplink',
         type: 'option',
         description: 'Send a invite link of current group.',
         usage: 'rgrouplink',
         group: 'CONTROL',
         script: 'runRgGroupLink'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'mutegroup',
         type: 'option',
         description: 'Set group to admin only who can send a message.',
         usage: 'mutegroup group on/off',
         group: 'CONTROL',
         script: 'runMuteGroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'mutegc',
         type: 'alias',
         root: 'mutegroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'group',
         type: 'alias',
         root: 'mutegroup'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'groupstats',
         type: 'option',
         description: 'Verifique o status da configuração do grupo',
         usage: 'groupstats',
         group: 'CONTROL',
         script: 'runGroupStats'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'revoke',
         type: 'option',
         description: 'Revoke invite link of current group. (Redefinir link do grupo)',
         usage: 'revoke',
         group: 'CONTROL',
         script: 'runRevoke'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'autosticker',
         type: 'option',
         description: 'Toogle auto-sticker feature. Every sended image will made into a sticker.',
         usage: 'autosticker on/off',
         group: 'CONTROL',
         script: 'runAutoStiker'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'autostik',
         type: 'alias',
         root: 'autosticker'
    },
    {
      runable:'y',
         enabled:'y',
         name: 'autostiker',
      type: 'alias',
      root: 'autosticker'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'antikasarkick',
         type: 'option',
         description: 'Expulsão automática  quem é Rude no grupo',
         usage: 'antikasarkick on/off',
         errormessage: '',
         group: 'CONTROL',
         script: 'runAntiSarkastick'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'antivirtex',
         type: 'option',
         description: ' Expulsão automática  que envia mensagens muito longas',
         usage: 'antivirtex on/off',
         errormessage: '',
         group: 'CONTROL',
         script: 'runAntiVirtex'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'antidelete',
         type: 'option',
         description: ' Anti-excluir mensagens no grupo',
         usage: 'antidelete on/off',
         errormessage: '',
         group: 'CONTROL',
         script: 'runAntiDelete'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'yesbye',
         type: 'option',
         description: ' Leave group and delete chat confirmation',
         usage: 'yesbye',
         errormessage: 'Este comand não deve aparecer no menu- criar mecanismo',
         group: 'CONTROL',
         script: 'runYesbye'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'bye',
         type: 'option',
         description: ' Leave group and delete chat pre command (Grupos apenas. Retire os bots.)',
         usage: 'bye',
         errormessage: '',
         group: 'CONTROL',
         script: 'runBye'
    }*/
];
//cmds casual
const BotCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'serbot',
        type: 'option',
        description: '???',
        group: 'CONTROL',
        usage: 'serbot',
        script: 'runSerbot',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'rentbot',
        type: 'alias',
        root: 'serbot'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'despedida',
        type: 'option',
        description: '???',
        group: 'CONTROL',
        usage: 'despedida',
        script: 'runDespedida',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'meuperfil',
        type: 'option',
        description: 'Show user profile',
        group: 'CONTROL',
        usage: 'meuperfil',
        script: 'showMyProfile',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'miperfil',
        type: 'alias',
        root: 'meuperfil'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'perfil',
        type: 'option',
        description: 'Show  profile information',
        group: 'CONTROL',
        usage: 'perfil',
        script: 'showProfileInfo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'info',
        type: 'alias',
        root: 'perfil'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'informacion',
        type: 'alias',
        root: 'perfil'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'informações',
        type: 'alias',
        root: 'perfil'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'informação',
        type: 'alias',
        root: 'perfil'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'apoio',
        type: 'option',
        description: 'Show Help information fromCreator',
        group: 'CONTROL',
        usage: 'apoio',
        script: 'runApoio'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'CONTROL',
        type: 'option',
        description: 'Show Owner information',
        group: 'COMMON',
        usage: 'CONTROL',
        script: 'runOwner'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'criador',
        type: 'alias',
        root: 'CONTROL'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'banidos',
        type: 'option',
        description: 'Show Banned users',
        group: 'COMMON',
        usage: 'apoio',
        script: 'runBanned'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'baneados',
        type: 'alias',
        root: 'banidos'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'meuwa',
        type: 'option',
        description: 'Show User Wa information',
        group: 'CONTROL',
        usage: 'meuwa',
        script: 'runWaInfo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'wame',
        type: 'alias',
        root: 'meuwa'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'wa.me',
        type: 'alias',
        root: 'meuwa'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'miwasa',
        type: 'alias',
        root: 'meuwa'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'level',
        type: 'link',
        description: 'Show Level information',
        group: 'COMMON',
        usage: 'apoio',
        script: 'runLevel'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'meunivel',
        type: 'alias',
        root: 'level'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'milevel',
        type: 'alias',
        root: 'level'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'limit',
        type: 'option',
        description: 'Check your remainings limit.',
        usage: 'limit',
        group: 'CONTROL',
        script: 'runLimit'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'meulimite',
        type: 'alias',
        root: 'limit'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'milimit',
        type: 'alias',
        root: 'limit'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'estado',
        type: 'option',
        description: 'status do Bot',
        usage: 'estado',
        group: 'CONTROL',
        script: 'runStats'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'stats',
        type: 'alias',
        root: 'estado'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'status',
        type: 'alias',
        root: 'estado'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'botstat',
        type: 'alias',
        root: 'estado'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'estadobot',
        type: 'alias',
        root: 'estado'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'infogrupo',
        type: 'option',
        description: 'Show group information',
        usage: 'infogrupo',
        group: 'CONTROL',
        script: 'runInfoGroup'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'grupoinfo',
        type: 'alias',
        root: 'infogrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'infogp',
        type: 'alias',
        root: 'infogrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gpinfo',
        type: 'alias',
        root: 'infogrupo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'admins',
        type: 'option',
        description: 'Show Group Admins',
        group: 'CONTROL',
        usage: 'admins',
        script: 'showAdmins',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'administradores',
        type: 'alias',
        root: 'admins'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'audiokey',
        type: 'link',
        description: 'Show available audio effects.',
        usage: 'audiokey',
        group: 'FUN',
        script: ''
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fullmenu',
        type: 'option',
        description: 'Show FullMode Commands menu',
        usage: 'fullmenu',
        group: 'CONTROL',
        script: 'showFullmenu'
    },
    { runable: 'y',
        enabled: 'y',
        name: 'crealogos',
        type: 'option',
        description: 'Show Art Commands menu',
        usage: 'crealogos',
        group: 'CONTROL',
        script: 'showArtmenu'
    } /*,

    {
        
         runable:'y',
         enabled:'y',
         name: 'menucomp',
         type: 'option',
         description: 'mostra o Menu Completo',
         group: 'CONTROL',
         usage: 'menu index_number  ou menu',
         script: 'showMenuCompleto',
    },
    {
         runable:'y',
         enabled:'y',
         name: 'menuent',
         type: 'option',
         description: 'Mostra o Menu Entretenimento',
         usage: 'menuent',
         group: 'CONTROL',
         script: 'showMenuEntretenimento'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'menuadmin',
         type: 'option',
         description: 'menu default',
         usage: 'menuadmin',
         errormessage: msg.error.group,
         group: 'CONTROL',
         script: 'showMenuAdmin'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'menuowner',
         type: 'option',
         description: 'menu default',
         usage: 'menuowner',
         errormessage: msg.error.owner,
         group: 'CONTROL',
         script: 'showMenuOwner'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'join',
         type: 'option',
         description: '(Join to group via link.)Alugue um bot to participar do grupo se houver um slot disponível.',
         usage: "join group's_link",
         group: 'CONTROL',
         icon: "⛔",
         script: 'runJoin'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'serv',
         type: 'alias',
         root: 'join'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'trial',
         type: 'option',
         description: 'faça um teste do Bot',
         usage: 'trial',
         errormessage: msg.error.owner,
         group: 'CONTROL',
         script: 'runTrial'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'donate',
         type: 'link',
         description: 'donate',
         usage: 'donate',
         group: 'COMMON',
         script: ''
    },
    {
         runable:'y',
         enabled:'y',
         name: 'donasi',
         type: 'alias',
         root: 'donate'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'ping',
         type: 'option',
         description: 'Check the bot speed.',
         usage: 'ping',
         errormessage: '',
         group: 'CONTROL',
         script: 'runPing'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'speed',
         type: 'alias',
         root: 'ping'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'listblock',
         type: 'option',
         description: 'Check blocked numbers.',
         usage: 'listblock',
         errormessage: '',
         group: 'CONTROL',
         script: 'runListblock'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'delete',
         type: 'option',
         description: 'Delete messages from bots.',
         usage: 'Reply to deleted messages with a caption *${prefix}delete*.',
         errormessage: '',
         group: 'CONTROL',
         script: 'runDelete'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'del',
         type: 'alias',
         root: 'delete'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'report',
         type: 'option',
         description: 'Report bugs to dev.',
         usage: 'report text',
         errormessage: '',
         group: 'CONTROL',
         script: 'runReport'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'tos',
         type: 'option',
         description: 'Terms of service.',
         usage: 'tos',
         errormessage: '',
         group: 'CONTROL',
         script: 'runTos'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'getpic',
         type: 'option',
         description: "Send user's profile pic.",
         usage: 'getpic @user/62812xxxxxxxx',
         errormessage: '',
         group: 'CONTROL',
         script: 'runGetpic'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'premiumcheck',
         type: 'option',
         description: 'Premium active time check.',
         usage: 'premiumcheck',
         errormessage: '',
         group: 'CONTROL',
         script: 'runPremiumcheck'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'cekpremium',
         type: 'alias',
         root: 'premiumcheck'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'premiumlist',
         type: 'option',
         description: 'Premium users list.',
         usage: 'premiumlist',
         errormessage: '',
         group: 'CONTROL',
         script: 'runPremiumlist'
    },
    {
         runable:'y',
         enabled:'y',
         name: 'listpremium',
         type: 'alias',
         root: 'premiumlist'
    }*/
];
const ConvertCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'getimage',
        type: 'link',
        root: 'StickerCommands'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'sticker',
        type: 'link',
        root: 'StickerCommands'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lojaimg',
        type: 'option',
        description: 'Show shop card for the image',
        group: 'CONTROL',
        usage: 'reply to an image with command lojaimg',
        script: 'runShopImg',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tiendaimg',
        type: 'alias',
        root: 'lojaimg'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aimg',
        type: 'option',
        description: '????',
        group: 'CONVERTER',
        usage: 'Reply sticker with command aimg',
        script: 'runAImg',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'inframundo',
        type: 'option',
        description: 'Apply a inframundo effect to sound.',
        usage: 'reply audio with command inframundo',
        group: 'CONVERTER',
        script: 'runInframundo'
    } /*,
    {
         runable:'y',
         enabled:'y',
         name: 'nightcore',
         type: 'option',
         description: 'Apply a nightcore effect to sound.',
         usage: 'Please quote/reply audio or voice notes with command nightcore',
         group: 'CONVERTER',
         
         script: 'runNightcore'
    }*/,
    {
        runable: 'y',
        enabled: 'y',
        name: 'nightcore',
        type: 'option',
        description: 'Apply a NightCore effect to sound.',
        usage: 'reply audio with command nightcore',
        group: 'CONVERTER',
        script: 'runNightcore2'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'happyhardcore',
        type: 'alias',
        root: 'nightcore'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ardilla',
        type: 'option',
        description: 'Apply a Ardilla effect to sound.',
        usage: 'reply audio with command ardilla',
        group: 'CONVERTER',
        script: 'runArdilla'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'superveloz',
        type: 'option',
        description: 'Apply a Superveloz effect to sound.',
        usage: 'reply audio with command superveloz',
        group: 'CONVERTER',
        script: 'runSuperveloz'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'supervelos',
        type: 'alias',
        root: 'superveloz'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'demonio',
        type: 'option',
        description: 'Apply a Demonic effect to sound.',
        usage: 'reply audio with command demonio',
        group: 'CONVERTER',
        script: 'runDemo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'deepslow',
        type: 'option',
        description: 'Apply a deepslow effect to sound.',
        usage: 'reply audio with command deepslow',
        group: 'CONVERTER',
        script: 'runDeepslow'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lento',
        type: 'alias',
        root: 'deepslow'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'distorcao',
        type: 'option',
        description: 'Apply a Distortion effect to sound.',
        usage: 'reply audio with command distorcao',
        group: 'CONVERTER',
        script: 'runDistortion'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'distorcionado',
        type: 'alias',
        root: 'distorção'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'distorcionado',
        type: 'alias',
        root: 'distorcao'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'distorsionado',
        type: 'alias',
        root: 'distorção'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'distortion',
        type: 'alias',
        root: 'distorcao'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aumentarbaixo',
        type: 'option',
        description: 'Apply a Increase Bass effect to sound.',
        usage: 'reply audio with command aumentarbaixo',
        group: 'CONVERTER',
        script: 'runBassIncrease'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'bass',
        type: 'alias',
        root: 'aumentarbaixo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aumentarbajo',
        type: 'alias',
        root: 'aumentarbaixo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tomp3',
        type: 'option',
        description: 'Convert mp4/video to mp3/audio.',
        usage: 'Send a video with caption tomp3 or reply video with a caption tomp3',
        group: 'CONVERTER',
        script: 'runTomp3'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'amp3',
        type: 'alias',
        root: 'tomp3'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aceleravid',
        type: 'option',
        description: 'Increase Video speed',
        usage: 'Send a video with caption aceleravid or reply video with a caption tomp3',
        group: 'CONVERTER',
        script: 'runIncreaseVidSpeed'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aceleravideo',
        type: 'alias',
        root: 'aceleravid'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aceleravídeo',
        type: 'alias',
        root: 'aceleravid'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'acelerarvid',
        type: 'alias',
        root: 'aceleravid'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reduzvid',
        type: 'option',
        description: 'Decrease Video speed',
        usage: 'Send a video with caption reduzvid or reply video with a caption tomp3',
        group: 'CONVERTER',
        script: 'runDecreaseVidSpeed'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lentovid',
        type: 'alias',
        root: 'aceleravid'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reversevid',
        type: 'option',
        description: 'Apply a reverse effect to video.',
        usage: 'reply video with command reverse',
        group: 'CONVERTER',
        script: 'runReverseVid'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reversavid',
        type: 'alias',
        root: 'reversevid'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'rescom',
        type: 'option',
        description: 'Apply a Rescom effect to video.',
        usage: 'reply video with command rescom',
        group: 'CONVERTER',
        script: 'runRescom'
    }
    /*
         {
              runable:'y',
         enabled:'y',
         name: 'robot',
              type: 'option',
              description: 'Apply a robot effect to sound.',
              usage: 'reply audio with command robot',
              group: 'CONVERTER',
              
              script: 'runRobot'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'earrape',
              type: 'option',
              description: 'Apply a earrape effect to sound.',
              usage: 'reply audio with command earrape',
              group: 'CONVERTER',
              
              script: 'runEarrape'
         },
         {
              runable:'y',
              enabled:'y',
              name: 'deepslow',
              type: 'option',
              description: 'Apply a deepslow effect to sound.',
              usage: 'reply audio with command deepslow',
              group: 'CONVERTER',
              
              script: 'runDeepslow'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'samarkan',
              type: 'option',
              description: 'Apply a samarkan effect to sound.',
              usage: 'reply audio with command samarkan',
              group: 'CONVERTER',
              
              script: 'runSamarkan'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'vibrato',
              type: 'option',
              description: 'Apply a vibrato effect to sound.',
              usage: 'reply audio with command vibrato',
              group: 'CONVERTER',
              
              script: 'runVibrato'
         },
         {
              runable:'y',
         enabled:'y',
         name: '8d',
              type: 'option',
              description: 'Apply a 8d effect to sound.',
              usage: 'reply audio with command 8d',
              group: 'CONVERTER',
              
              script: 'run8d'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'cf',
              type: 'option',
              description: 'Filtro complexo ffmpeg personalizado (somente usuário especialista)',
              usage: 'reply audio with command cf',
              group: 'CONVERTER',
              
              script: 'runCf'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'doctopdf',
              type: 'option',
              description: 'Converta imagens/vídeos em adesivos.',
              usage: 'reply document with command doctopdf',
              group: 'CONVERTER',
              
              script: 'runDoctopdf'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'pdf',
              type: 'alias',
              root: 'doctopdf'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'tts',
              type: 'option',
              description: 'Converta texto em voz do Google.Create a Text to Speech. You need a language code, you can find it here https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes',
              usage: 'tts <language code > <text>',
              group: 'CONVERTER',
              
              script: 'runTts'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'dizer',
              type: 'alias',
              root: 'tts'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'traduzir',
              type: 'option',
              description: '(Translate a text.) converte linguagem do Texto do Google Tradutor.',
              usage: 'traduzir text | code_lang',
              group: 'CONVERTER',
              script: 'runTranslate'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'trad',
              type: 'alias',
              root: 'traduzir'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'tr',
              type: 'alias',
              root: 'traduzir'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'ocr',
              type: 'option',
              description: 'Digitalize o texto da imagem.',
              usage: ' Send images with caption ocr or reply to the images/stickers with a caption ocr.',
              group: 'CONVERTER',
              script: 'runOcr'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'qrcode',
              type: 'option',
              description: 'Crie QRcode a partir de texto',
              usage: 'qrcode text',
              group: 'CONVERTER',
              
              script: 'runQrcode'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'qr',
              type: 'alias',
              root: 'qrcode'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'atalho',
              type: 'option',
              description: 'Converta url em url curta (encirtador de url)',
              usage: 'atalho url_link',
              group: 'CONVERTER',
              
              script: 'runTinyUrl'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'memefy',
              type: 'option',
              description: 'Adicione texto às imagens.',
              usage: 'reply image with command memefy',
              group: 'CONVERTER',
              
              script: 'runMemefy'
         },
         {
              runable:'y',
         enabled:'y',
         name: 'ttg',
              type: 'alias',
              root: 'memefy',
         },
         {
              runable:'y',
         enabled:'y',
         name: 'virar',
              type: 'option',
              description: 'Vire a imagem horizontalmente/vertical.',
              usage: 'reply image with command virar',
              group: 'CONVERTER',
              script: 'runFlip'
         }
         ,
         {
              runable:'y',
         enabled:'y',
         name: 'hilih',
              type: 'option',
              description: '???',
              usage: 'reply image with command hilih',
              group: 'CONVERTER',
              script: 'runHilih'
         }
    
    */
];
const AnimeCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'mianime',
        type: 'option',
        description: 'Show Menu Anime',
        usage: 'mianime',
        group: 'ANIME',
        script: 'runMenuAnime'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reconime',
        type: 'option',
        description: 'Recomends Animes for you to watch',
        usage: 'reconime',
        group: 'ANIME',
        script: 'runReconime'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'himnootaku',
        type: 'option',
        description: 'Play The anthem of the otakus, anime rap',
        usage: 'himnootaku',
        group: 'ANIME',
        script: 'runHimnootaku'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'himnotaku',
        type: 'alias',
        root: 'himnootaku',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'name?',
        type: 'option',
        description: '???',
        usage: 'reply a anime with the command name?',
        group: 'ANIME',
        script: 'runWait'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'wait',
        type: 'alias',
        root: 'name?',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'anifrase',
        type: 'option',
        description: '???',
        usage: 'anifrase',
        group: 'ANIME',
        script: 'runAnifrase'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fraseani',
        type: 'alias',
        root: 'anifrase',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'waifu',
        type: 'option',
        description: 'Anime fans call fictional female characters that they love and would marry if they were real',
        usage: 'waifu',
        group: 'ANIME',
        script: 'runWaifu'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'waifus',
        type: 'alias',
        root: 'waifu',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'waifuhd',
        type: 'option',
        description: 'Anime fans call fictional female characters that they love and would marry if they were real',
        usage: 'waifuhd',
        group: 'ANIME',
        script: 'runWaifuHD'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hdwaifu',
        type: 'alias',
        root: 'waifuHD',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'faceuhd',
        type: 'option',
        description: 'Show anyme Faces',
        usage: 'facehd',
        group: 'ANIME',
        script: 'runFaceHD'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hdface',
        type: 'alias',
        root: 'faceuhd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aniwpp',
        type: 'option',
        description: 'Show anime WallPaper',
        usage: 'aniwpp',
        group: 'ANIME',
        script: 'runAnimeWallPaper'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'aniwpp',
        type: 'alias',
        root: 'aniwpp',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'neko',
        type: 'option',
        description: 'Get Ramdom Anime from Nekos Site',
        usage: 'neko',
        group: 'ANIME',
        script: 'runNekos'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nekos',
        type: 'alias',
        root: 'neko',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'neko2',
        type: 'option',
        description: 'Get Ramdom Anime from Nekos v2 Site',
        usage: 'neko2',
        group: 'ANIME',
        script: 'runNekos2'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nekos2',
        type: 'alias',
        root: 'neko2',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'neko3',
        type: 'option',
        description: 'Get Ramdom Anime from Nekos v3 Site',
        usage: 'neko3',
        group: 'ANIME',
        script: 'runNekos3'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nekos3',
        type: 'alias',
        root: 'neko3',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'snime',
        type: 'option',
        description: 'Get Ramdom Sticker from Anime of these types smug, hug, slap, kiss, tickle, ngif',
        usage: 'snime',
        group: 'ANIME',
        script: 'runSnime'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'otakutest',
        type: 'option',
        description: 'Get Ramdom Sticker from Anime of these types smug, hug, slap, kiss, tickle, ngif',
        usage: 'otakutest',
        group: 'ANIME',
        script: 'runOtakutest'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'testotaku',
        type: 'alias',
        root: 'otakutest',
    }
];
const HentaiCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'stickerh',
        type: 'option',
        description: '???',
        usage: 'stickerh',
        group: 'HENTAI',
        script: 'runStickerh'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hsticker',
        type: 'alias',
        root: 'stickerh',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'sh',
        type: 'alias',
        root: 'stickerh',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hs',
        type: 'alias',
        root: 'stickerh',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hentai',
        type: 'option',
        description: '???',
        usage: 'hentai',
        group: 'HENTAI',
        script: 'runHentai'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'jentai',
        type: 'alias',
        root: 'hentai',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hentai2',
        type: 'option',
        description: '???',
        usage: 'hentai2',
        group: 'HENTAI',
        script: 'runHentai2'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'jentai2',
        type: 'alias',
        root: 'hentai2',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hwaifu',
        type: 'option',
        description: '???',
        usage: 'hwaifu',
        group: 'HENTAI',
        script: 'runHwaifu'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'waifuh',
        type: 'alias',
        root: 'hwaifu',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hneko',
        type: 'option',
        description: '???',
        usage: 'hneko',
        group: 'HENTAI',
        script: 'runHneko'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nekoh',
        type: 'alias',
        root: 'hneko',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'traph',
        type: 'option',
        description: '???',
        usage: 'traph',
        group: 'HENTAI',
        script: 'runTraph'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'htrap',
        type: 'alias',
        root: 'traph',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lewd',
        type: 'option',
        description: '???',
        usage: 'lewd',
        group: 'HENTAI',
        script: 'runLewd'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lewdk',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'cum_jpg',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'pussy_jpg',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'feet',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lewdkemo',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'solo',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'avatar',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'avatar',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nsfw_avatar',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'erokemo',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ero',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hololewd',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tits',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'eroyuri',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'yuri',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'keta',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'eron',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'erok',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'erofeet',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'femdom',
        type: 'alias',
        root: 'lewd',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'futanari',
        type: 'alias',
        root: 'lewd',
    }
];
const FullModeCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'gruposwa',
        type: 'option',
        description: '???',
        usage: 'gruposwa',
        group: 'FUN',
        script: 'runGruposwa'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'wagrupos',
        type: 'alias',
        root: 'gruposwa',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'voz',
        type: 'option',
        description: '???',
        usage: 'voz',
        group: 'FUN',
        script: 'runVoz'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'vos',
        type: 'alias',
        root: 'voz',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'covid',
        type: 'option',
        description: '???',
        usage: 'covid',
        group: 'FUN',
        script: 'runCovid'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'covid19',
        type: 'alias',
        root: 'covid',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'clima',
        type: 'option',
        description: '???',
        usage: 'clima',
        group: 'FUN',
        script: 'runClima'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'github',
        type: 'option',
        description: '???',
        usage: 'github',
        group: 'FUN',
        script: 'runGithub'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'traductor',
        type: 'option',
        description: '???',
        usage: 'traductor',
        group: 'FUN',
        script: 'runTraductor'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tr',
        type: 'alias',
        root: 'traductor',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'pinterest',
        type: 'option',
        description: '???',
        usage: 'pinterest',
        group: 'FUN',
        script: 'runPinterest'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'imagen',
        type: 'option',
        description: '???',
        usage: 'imagen',
        group: 'FUN',
        script: 'runImagen'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'google',
        type: 'option',
        description: '???',
        usage: 'google',
        group: 'FUN',
        script: 'runGoogle'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'wikipedia',
        type: 'option',
        description: '???',
        usage: 'wikipedia',
        group: 'FUN',
        script: 'runWikipedia'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'playstore',
        type: 'option',
        description: '???',
        usage: 'playstore',
        group: 'FUN',
        script: 'runPlaystore'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'letra',
        type: 'option',
        description: '???',
        usage: 'letra',
        group: 'FUN',
        script: 'runLetra'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'wallpaper',
        type: 'option',
        description: '???',
        usage: 'wallpaper',
        group: 'FUN',
        script: 'runWallpaper'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'wpp',
        type: 'alias',
        root: 'wallpaper',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fundo',
        type: 'alias',
        root: 'wallpaper',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tiktok',
        type: 'option',
        description: '???',
        usage: 'tiktok',
        group: 'FUN',
        script: 'runTiktok'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tktk',
        type: 'alias',
        root: 'tiktok',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'mediafire',
        type: 'option',
        description: '???',
        usage: 'mediafire',
        group: 'FUN',
        script: 'runMediafire'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'play',
        type: 'option',
        description: '???',
        usage: 'play',
        group: 'FUN',
        script: 'runPlay'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'play2',
        type: 'option',
        description: '???',
        usage: 'play2',
        group: 'FUN',
        script: 'runPlay2'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'ytmp3',
        type: 'option',
        description: '???',
        usage: 'ytmp3',
        group: 'FUN',
        script: 'runYtmp3'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'ytmp4',
        type: 'option',
        description: '???',
        usage: 'ytmp4',
        group: 'FUN',
        script: 'runYtmp4'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'facebook',
        type: 'option',
        description: '???',
        usage: 'facebook',
        group: 'FUN',
        script: 'runFacebook'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fbdl',
        type: 'alias',
        root: 'facebook',
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'fbhd',
        type: 'option',
        description: '???',
        usage: 'fbhd',
        group: 'FUN',
        script: 'runFbhd'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tiktokdl',
        type: 'option',
        description: '???',
        usage: 'tiktokdl',
        group: 'FUN',
        script: 'runTiktokdl'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tktkdl',
        type: 'alias',
        root: 'tiktokdl',
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'tkvid',
        type: 'option',
        description: '???',
        usage: 'tkvid',
        group: 'FUN',
        script: 'runTkvid'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'tkmp3',
        type: 'option',
        description: '???',
        usage: 'tkmp3',
        group: 'FUN',
        script: 'runTkmp3'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'simi',
        type: 'option',
        description: '???',
        usage: 'simi',
        group: 'FUN',
        script: 'runSimi'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'bot',
        type: 'alias',
        root: 'simi',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'minidatos',
        type: 'option',
        description: '???',
        usage: 'minidatos',
        group: 'FUN',
        script: 'runMinidatos'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'minidato',
        type: 'alias',
        root: 'minidatos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fraseamor',
        type: 'option',
        description: '???',
        usage: 'fraseamor',
        group: 'FUN',
        script: 'runFraseamor'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'frasesamor',
        type: 'alias',
        root: 'fraseamor',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'minombre',
        type: 'option',
        description: '???',
        usage: 'minombre',
        group: 'FUN',
        script: 'runMinombre'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'preguntame',
        type: 'option',
        description: '???',
        usage: 'preguntame',
        group: 'FUN',
        script: 'runPreguntame'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'vof',
        type: 'option',
        description: '???',
        usage: 'vof',
        group: 'FUN',
        script: 'runVof'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'v_o_f',
        type: 'alias',
        root: 'vof',
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'vofrpt1',
        type: 'option',
        description: '???',
        usage: 'vofrpt1',
        group: 'FUN',
        script: 'runVofrpt1'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'vofrpt2',
        type: 'option',
        description: '???',
        usage: 'vofrpt2',
        group: 'FUN',
        script: 'runVofrpt2'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'citation',
        type: 'option',
        description: '???',
        usage: 'citation',
        group: 'FUN',
        script: 'runQuotes'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'notificacion',
        type: 'alias',
        root: 'citation',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'notificação',
        type: 'alias',
        root: 'citation',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'suamae',
        type: 'option',
        description: 'Get Jokes from TUmama - (Jokes fromof mothers)',
        usage: 'suamae',
        group: 'FUN',
        script: 'runJokesTumama'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'comediante',
        type: 'option',
        description: '???',
        usage: 'comediante',
        group: 'FUN',
        script: 'runComediante'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'consejo',
        type: 'option',
        description: '???',
        usage: 'consejo',
        group: 'FUN',
        script: 'runConsejo'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'randimg',
        type: 'option',
        description: '???',
        usage: 'randimg',
        group: 'FUN',
        script: 'runRandimg'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'djbot',
        type: 'option',
        description: '???',
        usage: 'djbot',
        group: 'FUN',
        script: 'runDjbot'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'xd',
        type: 'option',
        description: '???',
        usage: 'xd',
        group: 'FUN',
        script: 'runXd'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'cao',
        type: 'option',
        description: '???',
        usage: 'cao',
        group: 'FUN',
        script: 'runDogs'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'caes',
        type: 'alias',
        root: 'cao',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'cães',
        type: 'alias',
        root: 'cao',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'cão',
        type: 'alias',
        root: 'cao',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'cachorro',
        type: 'alias',
        root: 'cao',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'dog',
        type: 'alias',
        root: 'cao',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gatos',
        type: 'option',
        description: '???',
        usage: 'gatos',
        group: 'FUN',
        script: 'runCats'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gato',
        type: 'alias',
        root: 'gatos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'meow',
        type: 'alias',
        root: 'gatos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'cat',
        type: 'alias',
        root: 'gatos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'patos',
        type: 'option',
        description: '???',
        usage: 'patos',
        group: 'FUN',
        script: 'runPatos'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'pato',
        type: 'alias',
        root: 'patos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ganzo',
        type: 'alias',
        root: 'patos',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ganso',
        type: 'alias',
        root: 'patos',
    }
];
const ArtCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'attp',
        type: 'option',
        description: '???',
        usage: 'attp text',
        group: 'ARTISTIC',
        script: 'runAttp'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'halloween',
        type: 'option',
        description: '???',
        usage: 'halloween text',
        group: 'ARTISTIC',
        script: 'runHalloween'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hallowen',
        type: 'alias',
        root: 'halloween',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'haloween',
        type: 'alias',
        root: 'halloween',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'halowen',
        type: 'alias',
        root: 'halloween',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lava',
        type: 'option',
        description: '???',
        usage: 'lava text',
        group: 'ARTISTIC',
        script: 'runLava'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'toxico',
        type: 'option',
        description: '???',
        usage: 'toxico text',
        group: 'ARTISTIC',
        script: 'runToxico'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'toxic',
        type: 'alias',
        root: 'toxico',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tóxico',
        type: 'alias',
        root: 'toxico',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hotmetal',
        type: 'option',
        description: '???',
        usage: 'hotmetal text',
        group: 'ARTISTIC',
        script: 'runHotmetal'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'metalquente',
        type: 'alias',
        root: 'hotmetal',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tóxico',
        type: 'alias',
        root: 'toxico',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tempestade',
        type: 'option',
        description: '???',
        usage: 'tempestade text',
        group: 'ARTISTIC',
        script: 'runThunder'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'thunder',
        type: 'alias',
        root: 'tempestade',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tormenta',
        type: 'alias',
        root: 'tempestade',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gneon',
        type: 'option',
        description: '???',
        usage: 'gneon text',
        group: 'ARTISTIC',
        script: 'runGneon'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'neong',
        type: 'alias',
        root: 'gneon',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'neontxt',
        type: 'option',
        description: '???',
        usage: 'neontxt text',
        group: 'ARTISTIC',
        script: 'runNeontxt'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'txtneon',
        type: 'alias',
        root: 'neontxt',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'arcoiris',
        type: 'option',
        description: '???',
        usage: 'arcoiris text',
        group: 'ARTISTIC',
        script: 'runRaimbow'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'raimbow',
        type: 'alias',
        root: 'arcoiris',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gelo',
        type: 'option',
        description: '???',
        usage: 'gelo text',
        group: 'ARTISTIC',
        script: 'runIce'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ice',
        type: 'alias',
        root: 'gelo',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hielo',
        type: 'alias',
        root: 'gelo',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lapis',
        type: 'option',
        description: '???',
        usage: 'lapis text',
        group: 'ARTISTIC',
        script: 'runPencil'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lapiz',
        type: 'alias',
        root: 'lapis',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lápis',
        type: 'alias',
        root: 'lapis',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'gameover',
        type: 'option',
        description: '???',
        usage: 'gameover text',
        group: 'ARTISTIC',
        script: 'runGameover'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'roca3d',
        type: 'option',
        description: '???',
        usage: 'roca3d text',
        group: 'ARTISTIC',
        script: 'runRoca3d'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '3droca',
        type: 'alias',
        root: 'roca3d',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'roka3d',
        type: 'alias',
        root: 'roca3d',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '3droka',
        type: 'alias',
        root: 'roca3d',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ficcion',
        type: 'option',
        description: '???',
        usage: 'ficcion text',
        group: 'ARTISTIC',
        script: 'runFiccion'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'romper',
        type: 'option',
        description: '???',
        usage: 'romper text',
        group: 'ARTISTIC',
        script: 'runRomper'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'sangre',
        type: 'option',
        description: '???',
        usage: 'sangre text',
        group: 'ARTISTIC',
        script: 'runSangre'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'pornhub',
        type: 'option',
        description: '???',
        usage: 'pornhub text',
        group: 'ARTISTIC',
        script: 'runPornhub'
    }
];
const ReligionCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'labiblia',
        type: 'option',
        description: '???',
        usage: 'labiblia',
        group: 'ARTISTIC',
        script: 'runLabiblia'
    }
];
const CreatorCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'banuser',
        type: 'option',
        description: 'Banir usuários',
        usage: 'ban @user/62812xxxxxxxx',
        group: 'CONTROL',
        script: 'runBanUser'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'banear',
        type: 'alias',
        root: 'banuser'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'unbanuser',
        type: 'option',
        description: 'Desbanir usuários',
        usage: 'unbanuser  @user/62812xxxxxxxx',
        group: 'CONTROL',
        script: 'runUnBanUser'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'desbanear',
        type: 'alias',
        root: 'unbanuser'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'quitarbaneo',
        type: 'alias',
        root: 'unbanuser'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modo1',
        type: 'option',
        description: ' Private Mode',
        usage: 'modo1',
        group: 'CONTROL',
        script: 'runModeOne'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modopublico',
        type: 'option',
        description: ' Start Public Mode',
        usage: 'modopublico',
        group: 'CONTROL',
        script: 'runModePublic'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'mododono',
        type: 'option',
        description: ' Start Creator Mode. Only Creator can use the Bot',
        usage: 'mododono',
        group: 'CONTROL',
        script: 'runModePrivate'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'antiprivado',
        type: 'option',
        description: 'Enable/Disable Anti-Private mode. Avoid people to talk to the bot in private',
        usage: 'antiprivado',
        group: 'CONTROL',
        script: 'runAntiPrivate'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'noprivado',
        type: 'option',
        description: 'disable private mode',
        usage: '>',
        group: 'CONTROL',
        script: 'runDisableAntiPrivate'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'siprivado',
        type: 'option',
        description: 'enable private mode',
        usage: '>',
        group: 'CONTROL',
        script: 'runEnableAntiPrivate'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'modo2',
        type: 'option',
        description: ' Start Mode 2',
        usage: 'modo2',
        group: 'CONTROL',
        script: 'runModeTwo'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'withlink',
        type: 'option',
        description: ' ????',
        usage: 'withlink',
        group: 'CONTROL',
        script: 'runWithLink'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: 'nolink',
        type: 'option',
        description: 'Enable No Link (internet) Mode',
        usage: 'nolink',
        group: 'CONTROL',
        script: 'runNoLink'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'prefix',
        type: 'option',
        description: 'Change Command Prefix',
        usage: 'prefix',
        group: 'CONTROL',
        script: 'runPrefix'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'nombrebot',
        type: 'option',
        description: 'Change the name of the Bot',
        usage: 'nombrebot newName',
        group: 'CONTROL',
        script: 'runBotName'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'miduenho',
        type: 'option',
        description: 'Change Bot Creator name',
        usage: 'miduenho newName',
        group: 'CONTROL',
        script: 'runOwnerName'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'misredes',
        type: 'option',
        description: 'Add Creator Social Networks',
        usage: 'misredes newName',
        group: 'CONTROL',
        script: 'runSocialNet'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'editarlimite',
        type: 'option',
        description: 'Edit Limit to use commands',
        usage: 'editarlimite newLimit',
        group: 'CONTROL',
        script: 'runLimitEdit'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'neoqr,',
        type: 'option',
        description: 'Creanet New Qr Code',
        usage: 'neoqr,',
        group: 'CONTROL',
        script: 'runNeoQR'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'mudabotimagem',
        type: 'option',
        description: 'Change Bot Profile image',
        usage: 'perfilbot',
        group: 'CONTROL',
        script: 'runProfile'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'suprimir',
        type: 'option',
        description: 'Show Bot Profile',
        usage: 'suprimir',
        group: 'CONTROL',
        script: 'runSuprimir'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'bcgroup',
        type: 'option',
        description: ' Transmita to todos os grupos',
        usage: 'bcgroup text.',
        group: 'CONTROL',
        script: 'runBcGroup'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'bcg',
        type: 'alias',
        root: 'bcgroup'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'bcgc',
        type: 'alias',
        root: 'bcgroup'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'bc',
        type: 'option',
        description: 'To broadcast to all chats',
        usage: 'type: bc [chat content]',
        group: 'CONTROL',
        script: 'runBC'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lenguaje',
        type: 'option',
        description: 'Change Bot language',
        usage: 'lenguaje new_idiom',
        group: 'CONTROL',
        script: 'runLanguage'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'language',
        type: 'alias',
        root: 'lenguaje'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'língua',
        type: 'alias',
        root: 'lenguaje'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lingua',
        type: 'alias',
        root: 'lenguaje'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'bahasa',
        type: 'alias',
        root: 'lenguaje'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'idioma',
        type: 'alias',
        root: 'lenguaje'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'idiom',
        type: 'alias',
        root: 'lenguaje'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reiniciarlimite',
        type: 'option',
        description: 'Restart Limit',
        usage: 'reiniciarlimite',
        group: 'CONTROL',
        script: 'runReiniciarlimite'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'unete',
        type: 'option',
        description: '???',
        usage: 'unete',
        group: 'CONTROL',
        script: 'runJoinGroup'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'totag',
        type: 'option',
        description: '???',
        usage: 'totag',
        group: 'CONTROL',
        script: 'runtTotag'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'hidetag',
        type: 'alias',
        root: 'totag'
    },
    {
        runable: 'y',
        enabled: 'n',
        name: '{}',
        type: 'option',
        description: 'Get MEssage Object from WhatsApp',
        usage: '{} sem o prefixo',
        group: 'CONTROL',
        script: ''
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '=>',
        type: 'option',
        description: '???',
        usage: '=> sem o prefixo',
        group: 'CONTROL',
        script: ''
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '>',
        type: 'option',
        description: '???',
        usage: '=> sem o prefixo',
        group: 'CONTROL',
        script: ''
    },
    {
        runable: 'y',
        enabled: 'y',
        name: '$',
        type: 'option',
        description: '???',
        usage: '$ sem o prefixo',
        group: 'CONTROL',
        script: ''
    }
];
const MandatoryCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'rg',
        type: 'option',
        description: 'Register a user',
        usage: 'rg',
        group: 'COMMON',
        script: 'runRegister'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reg',
        type: 'alias',
        root: 'rg'
    }
];
const StickerCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'sticker',
        type: 'option',
        description: 'Convert Image or Video to Sticker',
        group: 'STICKER',
        usage: 'reply to an image with command lojaimg',
        script: 'runImgToSticker',
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'stiker',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'stickergif',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'sgif',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'stk',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 's',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'estiker',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'esticker',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'estick',
        type: 'alias',
        root: 'sticker'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'estik',
        type: 'alias',
        root: 'sticker'
    }
];
const DownloadCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'button',
        type: 'option',
        description: 'use buttons',
        usage: 'button',
        group: 'DOWNLOAD',
        script: 'runButton'
    }, {
        runable: 'y',
        enabled: 'y',
        name: 'facebookd',
        type: 'option',
        description: 'Download Facebook video post.',
        usage: 'facebook video_link',
        group: 'DOWNLOAD',
        script: 'runFacebookd'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fb',
        type: 'alias',
        root: 'facebook'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'fbdl',
        type: 'alias',
        root: 'facebook'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ytmp3d',
        type: 'option',
        description: 'Download YouTube audio.',
        usage: 'ytmp3 link',
        group: 'DOWNLOAD',
        script: 'runYtmp3d'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ytmp4d',
        type: 'option',
        description: 'Download YouTube video.',
        usage: 'ytmp4 link',
        group: 'DOWNLOAD',
        script: 'runytmp4d'
    },
    {
        runable: 'n',
        enabled: 'n',
        name: 'joox',
        type: 'option',
        description: 'Download music from Joox.',
        usage: "joox song's_title",
        group: 'DOWNLOAD',
        script: 'runJoox'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'twitter',
        type: 'option',
        description: 'Download Twitter video post.',
        usage: 'twitter video_link',
        group: 'DOWNLOAD',
        script: 'runFacebook'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'twt',
        type: 'alias',
        root: 'twitter'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'twdl',
        type: 'alias',
        root: 'twitter'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tiktokpic',
        type: 'option',
        description: 'Download TikTok profile pic.',
        usage: 'tiktokpic username',
        group: 'DOWNLOAD',
        script: 'runTiktokpic'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tiktokd',
        type: 'option',
        description: 'Downlaod TikTok video.',
        usage: 'tiktok Link',
        group: 'DOWNLOAD',
        script: 'runTiktokd'
    },
    {
        runable: 'n',
        enabled: 'n',
        name: 'tiktoknowm',
        type: 'option',
        description: 'Download TikTok video with no WM.( Baixe o tiktok sem marca dágua.)',
        usage: 'tiktoknowm Link',
        group: 'DOWNLOAD',
        script: 'runtiktoknowm'
    },
    {
        runable: 'n',
        enabled: 'n',
        name: 'tt',
        type: 'alias',
        root: 'tiktoknowm'
    },
    {
        runable: 'n',
        enabled: 'n',
        name: 'tktnowm',
        type: 'alias',
        root: 'tiktoknowm'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'linedl',
        type: 'option',
        description: 'Line sticker downloader.',
        usage: 'linedl sticker_link',
        group: 'DOWNLOAD',
        script: 'runLinedl'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'tiktokmp3',
        type: 'option',
        description: 'Baixe a música no link do Tiktok.',
        usage: 'tiktokmp3 Link',
        group: 'DOWNLOAD',
        script: 'runTiktokmp3'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'ttmp3',
        type: 'alias',
        root: 'tiktokmp3'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'igstory',
        type: 'option',
        description: 'Download igstory according to the username and the order of the story.',
        usage: 'igstory user',
        group: 'DOWNLOAD',
        script: 'runIgstory'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'igdl',
        type: 'option',
        description: 'Baixe a mídia do link do Instagram.',
        usage: 'igdl Link',
        group: 'DOWNLOAD',
        script: 'runIgdl'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'playd',
        type: 'option',
        description: 'Para pesquisar músicas do youtube',
        usage: 'play Link',
        group: 'DOWNLOAD',
        script: 'runPlayd'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'canvas',
        type: 'option',
        description: 'test canvas',
        usage: 'canvas',
        group: 'DOWNLOAD',
        script: 'doing'
    }
];
const prefix = '/';
const UtilCommands = [
    {
        runable: 'y',
        enabled: 'y',
        name: 'note',
        type: 'option',
        description: 'Crie notas ou notas armazenadas no bot.',
        usage: `note <note name> or use  #namenote
                \nTo create a note:\n-> *${prefix}createnote <name note> <fill  note>* for example: ${prefix}createnote rules Fill in the notes here 
                \nTo delete a note:\n-> *${prefix}deletenote <name note>* for example: ${prefix}deletenote rules
                    `,
        group: 'UTILS',
        script: 'runNote'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'notes',
        type: 'alias',
        root: 'note'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'createnote',
        type: 'option',
        description: 'Crie notas ou notas armazenadas no bot.',
        usage: `createnote <note name> <contents>  \n(please only use 1 word as the note name)
                  for example: createnote rules fill  notebook\nOr reply to chat with createnote*`,
        group: 'UTILS',
        script: 'runCreatenote'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'deletenote',
        type: 'option',
        description: 'To delete a note and its contents',
        usage: `deletenote <note name>
                  \nfor example: deletenote rules`,
        group: 'UTILS',
        script: 'runDeletenote'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'yesdeletenote',
        type: 'option',
        description: 'confirma to apagar notas.',
        usage: 'yesdeletenote',
        group: 'UTILS',
        script: 'runYesdeletenote'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'confirmdeletenote',
        type: 'alias',
        root: 'yesdeletenote'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'listonline',
        type: 'option',
        description: 'Grupos apenas. Marque todos os membros online.',
        usage: 'listonlin',
        group: 'UTILS',
        script: 'runListonline'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'remind',
        type: 'option',
        description: 'Envie uma nova mensagem de acordo com o horário especificado.',
        usage: 'remind',
        group: 'UTILS',
        script: 'runRemind'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'reminder',
        type: 'alias',
        root: 'remind'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'list',
        type: 'option',
        description: 'Displays a list stored in the bot database.',
        usage: 'list <name list>',
        group: 'UTILS',
        script: 'runList'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'lists',
        type: 'alias',
        root: 'list'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'createlist',
        type: 'option',
        description: 'Crie lista ou salva lista no bot.',
        usage: 'createlist <list name>',
        group: 'UTILS',
        script: 'runCreatelist'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'deletelist',
        type: 'option',
        description: 'apaga lista no bot.',
        usage: 'deletelist',
        group: 'UTILS',
        script: 'runDeletelist'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'yesdeletelist',
        type: 'option',
        description: 'confirma to apagar uma lista.',
        usage: 'yesdeletelist',
        group: 'UTILS',
        script: 'runYesdeletelist'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'confirmdeletelist',
        type: 'alias',
        root: 'yesdeletelist'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'addtolist',
        type: 'option',
        description: 'Adiciona item na lista.',
        usage: 'addtolist',
        group: 'UTILS',
        script: 'runAddtolist'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'editlist',
        type: 'option',
        description: 'Edita a lista.',
        usage: 'editlist',
        group: 'UTILS',
        script: 'runEditlist'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'delist',
        type: 'option',
        description: 'Apaga Lista',
        usage: 'delist',
        group: 'UTILS',
        script: 'runDelist'
    },
    {
        runable: 'y',
        enabled: 'y',
        name: 'del',
        type: 'option',
        description: 'Excluir mensagens de bot.',
        usage: 'del',
        group: 'UTILS',
        script: 'runDel'
    }
];
const commandsArray = [
    BotCommands,
    ModerationCommands,
    OwnerCommands,
    ConvertCommands,
    FunCommands,
    AnimeCommands,
    HentaiCommands,
    FullModeCommands,
    ArtCommands,
    ReligionCommands,
    MandatoryCommands,
    CreatorCommands,
    StickerCommands,
    DownloadCommands,
    UtilCommands
];
export { commandsArray, BotCommands, ModerationCommands, OwnerCommands, CreatorCommands, ConvertCommands, FunCommands, AnimeCommands, HentaiCommands, FullModeCommands, ArtCommands, MandatoryCommands, ReligionCommands, StickerCommands, DownloadCommands, UtilCommands };
const CMode = {
    OR: 0,
    AND: 1, //only both blocking (group or user) cause command to not be allowed to run
};
export default class CommandManager {
    static isTAG(s) { return CommandManager.TAGS_Array.includes(s); }
    /**
     * check if a string is a TAG
     * @param s
     * return the TAG (type) if the s parameter is a TAG or Null case not
     */
    static getIsTAG(s) {
        let returnObj = null;
        switch (s.toUpperCase()) {
            case 'ANIME':
                returnObj = 'ANIME';
                break;
            case 'CONTROL':
                returnObj = 'CONTROL';
                break;
            case 'CONVERTER':
                returnObj = 'CONVERTER';
                break;
            case 'STICKER':
                returnObj = 'STICKER';
                break;
            case 'FUN':
                returnObj = 'FUN';
                break;
            case 'HENTAI':
                returnObj = 'HENTAI';
                break;
            case 'TOOLS':
                returnObj = 'TOOLS';
                break;
            case 'ARTISTIC':
                returnObj = 'ARTISTIC';
                break;
            case 'UTILS':
                returnObj = 'UTILS';
                break;
            case 'DOWNLOAD':
                returnObj = 'DOWNLOAD';
                break;
            case 'SEARCH':
                returnObj = 'SEARCH';
                break;
            case 'RELIGION':
                returnObj = 'RELIGION';
                break;
            case 'MENU':
                returnObj = 'MENU';
                break;
            case 'MASONIC':
                returnObj = 'MASONIC';
                break;
            case 'COMMON':
                returnObj = 'COMMON';
                break;
            case 'EXOTERIC':
                returnObj = 'EXOTERIC';
                break;
            case 'BOT':
                returnObj = 'BOT';
                break;
            case 'GROUP':
                returnObj = 'GROUP';
                break;
            case 'MODES':
                returnObj = 'MODES';
                break;
        }
        return returnObj;
    }
    static isTAGBlockedToRun(chat, user, tag) {
        const isChatBlocked = chat.isTagBlocked(tag);
        const isUserBlocked = user.isTagBlockedForChat(chat.id, tag);
        switch (CommandManager.commandMode) {
            case CMode.OR:
                return isChatBlocked || isUserBlocked;
            case CMode.AND:
                return isChatBlocked && isUserBlocked;
        }
    }
    static isCommand(s) {
        return true;
    }
    static isCommandBlockedToRun(chat, user, command) {
        const isChatBlocked = chat.isCommandBlocked(command);
        const isUserBlocked = user.isCommandBlockedForChat(chat.id, command);
        switch (CommandManager.commandMode) {
            case CMode.OR:
                return isChatBlocked || isUserBlocked;
            case CMode.AND:
                return isChatBlocked && isUserBlocked;
        }
    }
}
CommandManager.commandMode = CMode.OR;
CommandManager.TAGS_Array = [
    'ANIME',
    'CONTROL',
    'CONVERTER',
    'STICKER',
    'FUN',
    'HENTAI',
    'TOOLS',
    'ARTISTIC',
    'UTILS',
    'DOWNLOAD',
    'SEARCH',
    'RELIGION',
    'MENU',
    'MASONIC',
    'COMMON',
    'EXOTERIC',
    'MODES',
    'BOT',
    'GROUP'
];
//# sourceMappingURL=commands.js.map
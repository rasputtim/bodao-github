"use strict";
const handlers = {
/*showMenu: async (commandObj) =>
          {
            if (isBanned) return this.mySendMessage(BotDB.idiomas.Baneao(AtSenderNUMBER));
            if (!this.isBotController && this._user.isLimited) return this.mySendMessage(BotDB.idiomas.SinLimite(pushname));
            if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
            const covidInfo = await Utils.fetchJson(`https://coronavirus-19-api.herokuapp.com/countries/brazil`)
            const botActivityy = BotDB.runtime;
            client.createMessage = async (from, myContent, ...options) => {
              //jid: string, content: AnyMessageContent, options: MessageGenerationOptions
              return await generateWAMessage(from, myContent, {
                options,
                'userJid': client.authState.creds.me.id,
                'upload': client.waUploadToServer
              });
            };
            const sendMenu = async (_0x27a7d3, _0x4664ea, _0x38915b, pMessageCreated) => {
              const message = {
                'templateMessage': {
                  'hydratedTemplate': {
                    ...pMessageCreated.message,
                    'hydratedContentText': BotDB.idiomas.PanelMenu(Bot.prefix, pushname, botActivityy, this.role, monospace, nwn),
                    'hydratedFooterText': BotDB.idiomas['FooterPM'](covidInfo) + ('\n┏⊱ ' + NameBot + `
  ┗━⊱ ` + BotDB.lenguatext + ' ✓'),
                    'hydratedButtons': [{
                      'urlButton': {
                        'displayText': BotDB.idiomas.Wlc1() + ` ;3`,
                        'url': `https://git.creasp.org.br/rasputtim/bodaobot`
                      }
                    }, {
                      'callButton': {
                        'displayText': BotDB.idiomas.Wlc2() + ` nwn`,
                        'phoneNumber': `+${Bot.CREATOR_NUMBER_FORMATED}`
                      }
                    }, {
                      'quickReplyButton': {
                        'displayText': BotDB.idiomas['BotInfo'](),
                        'id': Bot.prefix + 'botinfo'
                      }
                    }, {
                      'quickReplyButton': {
                        'displayText': BotDB.idiomas.GraciAs(),
                        'id': Bot.prefix + 'support'
                      }
                    }, {
                      'quickReplyButton': {
                        'displayText': BotDB.idiomas['MasCmds'](),
                        'id': Bot.prefix + `mascmds`
                      }
                    }]
                  }
                }
              }
              //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
              var  media = await generateWAMessageFromContent(from, message, {});
              client.relayMessage(_0x27a7d3, media.message, {
                'messageId': media.key.id
              });
            };
            await sendMenu(from, BotDB.idiomas['PanelMenu'](Bot.prefix, pushname, botActivityy, this.role, monospace, nwn), NameBot + ' ✓', await client.createMessage(from, {
              'image': BotDB.images.logo,
              'jpegThumbnail': this.sendThumb
            }))
            this.addSPAMFilter(from)
            this._user.limitInc = 1
            this._user.addXp(this.from, 450)
            this._user.addLevel(this.from, 2);
          },
          runFunMode:async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isFunModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            

            try{
              BotDB.enableFunMode(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
            }catch(err){
              return this.mySendMessage(err);
            }
                            
          } else {
            if (q && q === 'off') {
              
              try{
                BotDB.disableFunMode(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }
            
            }
              else if(!q) {
                this.showButtonsChoice(from, '「 MODO-FULL 」',BotDB.idiomas.FunModeInfo(), this.activationChoiceButtons);
              
          }
          }
        },
        runAnimeMode: (commanObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isAnimeModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));

              try{
                BotDB.enableAnime(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }
             
          } else {
            if (q && q === 'off') {
              
              try{
                BotDB.disableAnime(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }
                   
            } else if (!q) {
              this.showButtonsChoice(from, '「 MODO-ANIME 」',BotDB.idiomas.AnimeInfo(), this.activationChoiceButtons);
          }
          }
        },
        runHentaiMode: (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isNSFWModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            
              
              try{
                BotDB.enableNsfw(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }

          } else {
            if (q && q === 'off') {

              try{
                BotDB.disableNsfw(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }

            }else if(!q) {
              this.showButtonsChoice(from, `「 MODO-H 7w7 」`, BotDB.idiomas.HentaiInfo(), this.activationChoiceButtons);
          }
          }
        },
        runLeveling: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isLevelinModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            
              try{
                BotDB.enableLeveling(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
                }catch(err){
                  return this.mySendMessage(err);
                }
              
              
          } else {
            if (q && q === 'off') {

              try{
              BotDB.disableLeveling(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }
              
            
            }
              else if(!q)  {
                this.showButtonsChoice(from, `「 NIVELEAR 」`, BotDB.idiomas.LevelingInfo(), this.activationChoiceButtons);
            }
          }
        },
        runWelcome: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isWelcomeModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            
                try{
                BotDB.enableWelcome(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
                }catch(err){
                  return this.mySendMessage(err);
                }
          } else {
            if (q && q === 'off') {

                       
              try{
              BotDB.disableWelcome(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }
            }
               else if(!q) {
               howButtonsChoice(from, `「 BIENBENIDA-AUTOMÁTICA 」`, BotDB.idiomas.AutoWelcomeInfo(), this.activationChoiceButtons);
          }
          }
        },
        runAntiVirus: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isAntiVirtexModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            
            try{
              BotDB.enableAntivirtex(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
            }catch(err){
              return this.mySendMessage(err);
            }
              
          } else {
            if (q && q === 'off') {

              

              try{
                BotDB.disableAntivirtex(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }
            
            }
              else if(!q) { this.showButtonsChoice(from, `「 ANTI-TRABAS 」`, BotDB.idiomas.AntiVirtexInfo(), this.activationChoiceButtons);
          }
          }
        },
        runAntiLink: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isAntiLinkModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            
            try{
              BotDB.enableAntilink(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
            }catch(err){
              return this.mySendMessage(err);
            }
            
            
          } else {
            if (q && q === 'off') {

              try{
                BotDB.disableAntilink(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName));
              }catch(err){
                return this.mySendMessage(err);
              }
             
            }
             else if(!q) { this.showButtonsChoice(from, `「 ANTI-LINK 」`, BotDB.idiomas.AntiLinkInfo() , this.activationChoiceButtons)
          }
          }
        },
        runAntiLinkGroup: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isAntiLinkGroupModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            try{
              BotDB.enableAntiLinkGroup(register)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName));
            }catch(err){
              return this.mySendMessage(err);
            }
          } else {
            if (q && q === 'off') {
              try{
                BotDB.disableAntilinkGroup(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName));
              }catch(err){
                return this.mySendMessage(err);
              }
            }
            else if(!q) {
            this.showButtonsChoice(from, `「 ANTI-LINK-MULTIPLE 」`, BotDB.idiomas.AntLinkInfo(), this.activationChoiceButtons);
          }
        }
        },
        runAntiFakes: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            try {
              BotDB.enableAntiFake(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName));
            }catch(err){
              return this.mySendMessage(err);
            }
            if (isAntifakes1) return this.mySendMessage(BotDB.idiomas.YaActivo(command));

            try{
              BotDB.enableAntiFake(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName));
            }catch(err){
              return this.mySendMessage(err);
            }
            
            
          } else {
            if (q && q === 'off') {

              try{
                BotDB.disableAntiFake(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName));
              }catch(err){
                return this.mySendMessage(err);
              }

            }else if(!q) {
            this.showButtonsChoice(from, `「 ANTI-FALSOS 」`, BotDB.idiomas['AntiFakeInfo'](), this.activationChoiceButtons);
          }
        }
        },
        runAntiFakesEUA: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isAntifakes2) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            try {
              BotDB.enableAntiFakeCountry(from)
              this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
            }catch(err){
              return this.mySendMessage(err);
            }
            
          } else {
            if (q && q === 'off') {
             
              try {
                BotDB.disableAntiFakeCountry(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName))
              }catch(err){
                return this.mySendMessage(err);
              }
            
            }
            else if (!q ){
              const buttons = this.activationChoiceButtons

              this.showButtonsChoice(from, `「 ANTI-FALSOS-2 」`, BotDB.idiomas.AntiFakes2Info(), buttons)
            }
          }
        },
        runAntiForeign: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          if (q && q === 'on') {
            if (isForeignModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
              try {
                BotDB.enableForeign(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName));
              }catch(err){
                return this.mySendMessage(err);
              }
            
          } else {
            if (q && q === 'off') {
              try {
                BotDB.disableForeign(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoNo(command, groupName));
              }catch(err){
                return this.mySendMessage(err);
              }
                            
            }
            else if ( !q) {
              this.showButtonsChoice(from, `「 ANTI-EXTRANJEROS 」`, BotDB.idiomas.AntiForeignInfo(), this.activationChoiceButtons)
          };
          }
        },

        runEnableBot: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas.SoloCreador());
          if (q && q === 'on') {
            if (isSIMIModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            
               
              try{
                BotDB.enableSimi(from)
                this.sendReplyWithPicThumb(BotDB.idiomas.YaActivoSi(command, groupName))
              }
              catch(err){
                return this.mySendMessage(err);
              }
           
          } else {
            if (q && q === 'off') {

             
              try{
                BotDB.disableSimi(from)
                this.showMessageOK(BotDB.idiomas.YaActivoNo(command, groupName))
              }
              catch(err){
                return this.mySendMessage(err);
              }
            }
              else if(!q) {
              this.showButtonsChoice(from, `「 CHAT-BOT 」`, BotDB.idiomas.EnableInfo(), this.activationChoiceButtons);
          }
          }
        },
        runOpenBot: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
          client.groupSettingUpdate(from, 'not_announcement')
          client.sendMessage(from, {
            'text': BotDB.idiomas.AbrirGp()
          }, {
            'quoted': this.msgQuoteWithLogo
          });
        },
        runBanMode: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas.SoloCreador());
          if (q && q === 'on') {
            if (isBanModeOn) return this.mySendMessage(BotDB.idiomas.YaActivo(command));
            try{
              BotDB.enableChatban(from)
              this.showMessageOK(BotDB.idiomas.YaActivoSi(command, groupName))
            }
            catch(err){
              return this.mySendMessage(err);
            }
          } else {
            if (q && q === 'off') {
             
              try{
                BotDB.disableChatban(from)
                this.showMessageOK(BotDB.idiomas.YaActivoNo(command, groupName))
              }
              catch(err){
                return this.mySendMessage(err);
              }
            }
            else if(!q )  {
              this.showButtonsChoice(from, `「 BANEAR-CHAT 」`, BotDB.idiomas.BanModeInfo(), this.activationChoiceButtons);
          }
        }
        },
        runBanUser: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          var userToBan = msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.quoted ? msg.quoted.sender : q.replace(/[^-9]/g, '') + '@s.whatsapp.net'
          var _0x251395 = userToBan.slice(0, -15);
          if (userToBan.startsWith(`${ Bot.CREATOR_NUMBER}`)) return this.sendMentionedMessage('ª');
          if (userToBan.startsWith('' + cglobal.slice(0, -15))) return this.sendMentionedMessage('ª');
          if (isNaN(_0x251395 && msg.mentionedJid[0] && q)) {
            this.showMessageOK(BotDB.idiomas.BanUser0() + (' @' + _0x251395))
            try{
              BotDB.banUser(userToBan)
            }catch(err){
              return this.mySendMessage(err);
            }
            
          } else this.mySendMessage('A que usuario desea banear!?');
        },
        runUnBanUser: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (!q) return this.mySendMessage(`A que usuario desea desbanear!?`);
          var userToBan = q.replace(/[^-9]/g, '') + '@s.whatsapp.net';
          this.showMessageOK(BotDB.idiomas['BanUser1']() + (' @' + userToBan.slice(0, -15)))
          try{
            BotDB.disableBan(userToBan)
          }catch(err){
            return this.mySendMessage(err);
          }
        },
        runModeOne: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          this.showButtonsChoice(from, BotDB.idiomas.Modo0(), Bot.cocreador + ' ✓', [{
            'quickReplyButton': {
              'displayText': BotDB.idiomas['Modo1'](),
              'id': Bot.prefix + 'privado'
            }
          }, {
            'quickReplyButton': {
              'displayText': BotDB.idiomas['Modo2'](),
              'id': Bot.prefix + `publico`
            }
          }]);
        },
        runModePublic: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (this.isBodaoMode === false) return;
          
            this.isBodaoMode = false
            this.showMessageOK(BotDB.idiomas['Modo3']())
            
        },
        runModePrivate: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (this.isBodaoMode === true) return;
          (this.isBodaoMode = true, this.showMessageOK(BotDB.idiomas['Modo4']()));
        },
        runAntiPrivate: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          this.showButtonsChoice(from, BotDB.idiomas['NoPriv0'](), Bot.cocreador + ' ✓', [{
            'quickReplyButton': {
              'displayText': BotDB.idiomas.NoPriv1(),
              'id': Bot.prefix + 'siprivado'
            }
          }, {
            'quickReplyButton': {
              'displayText': BotDB.idiomas.NoPriv2(),
              'id': Bot.prefix + `noprivado`
            }
          }]);
        },
        runEnableAntiPrivate: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas.SoloCreador());
          if (this.isAntiPrivateModeOn === false) return;
          this.isAntiPrivateModeOn = false
          this.showMessageOK(BotDB.idiomas['NoPriv3']());
        },
        runDisableAntiPrivate: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (this.isAntiPrivateModeOn === true) return;
          this.isAntiPrivateModeOn = true
          this.showMessageOK(BotDB.idiomas['NoPriv4']());
        },
        runModeTwo: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          this.showButtonsChoice(from, BotDB.idiomas.ModNet0(), Bot.cocreador + ' ✓', [{
            'quickReplyButton': {
              'displayText': BotDB.idiomas['ModNet1'](),
              'id': Bot.prefix + 'nolink'
            }
          }, {
            'quickReplyButton': {
              'displayText': BotDB.idiomas['ModNet2'](),
              'id': Bot.prefix + `withlink`
            }
          }]);
        },
        runWithLink: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (this.OnOffLine === false) return;
          this.OnOffLine = false
          this.showMessageOK(BotDB.idiomas['ModNet3']());
        },
        runNoLink: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (this.OnOffLine === true) return;
          this.OnOffLine = true
          this.showMessageOK(BotDB.idiomas['ModNet4']());
        },
        runPrefix: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (args.length < 1) return this.mySendMessage(BotDB.idiomas['PreDit0']());
          if (args[0].length >= 2) return this.mySendMessage(BotDB.idiomas['PreDit1']());
          
            Bot.prefix = args[0]
            MyInfo['Prefijo'] = Bot.prefix
            fs.writeFileSync('./src/informacion.json', JSON.stringify(MyInfo, null, '\x09'))
            this.showMessageOK(BotDB.idiomas.PreDit2() + (' " ' + Bot.prefix + ' \"'))
            
        },
        runBotName: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (args.length < 1) return this.mySendMessage(BotDB.idiomas['NomBot0']());
          if (args[0].length >= 16) return this.mySendMessage(BotDB.idiomas['NomBot1']());
        
            const NameBot = args[0]
            MyInfo.NomeDoBot = NameBot
            fs.writeFileSync('./src/informacion.json', JSON.stringify(MyInfo, null, '\x09'))
            this.showMessageOK(BotDB.idiomas.NomBot2() + (' " ' + NameBot + ' \"'))
            
        },
        runOwnerName: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
          if (args.length < 1) return this.mySendMessage(BotDB.idiomas.PrinCre0());
          if (args[0].length >= 26) return this.mySendMessage(BotDB.idiomas.PrinCre1());
          
            Bot.cocreador = args[0]
            MyInfo['CoCreador'] = Bot.cocreador
            fs.writeFileSync('./src/informacion.json', JSON.stringify(MyInfo, null, '\x09'))
            this.showMessageOK(BotDB.idiomas['PrinCre2']() + (' \" ' + Bot.cocreador + ' \"'))
            
        },
        runSocialNet: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas.SoloCreador());
          if (args.length < 1) return this.mySendMessage(BotDB.idiomas['MyRed0']());
          if (args[0].length >= 301) return this.mySendMessage(BotDB.idiomas['MyRed1']());
          
            Bot.social = q
            MyInfo['TusRedesSociales'] = BotDB.social
            fs.writeFileSync('./src/informacion.json', JSON.stringify(MyInfo, null, '\x09'))
            this.showMessageOK(BotDB.idiomas['MyRed2']() + (nl + monospace + Bot.social + monospace))
        },
        runLimitEdit: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas.SoloCreador());
          if (args.length < 1) return this.mySendMessage(BotDB.idiomas['UsLimit0']() + (' ' + LibraryDB.limit.limitVal));
          if (isNaN(q)) return await this.mySendMessage(BotDB.idiomas['UsLimit1']());
          if (q < LibraryDB.limit.limitVal) return this.mySendMessage(BotDB.idiomas['UsLimit2']() + (' ' + LibraryDB.limit.limitVal + '*'));
          if (args[0].length >= 6) return this.mySendMessage(BotDB.idiomas.UsLimit3());
          
            LibraryDB.limit.limitVal = q
            Bot.LimiteParaUsarComandos = LibraryDB.limit.limitVal
            fs.writeFileSync('./src/informacion.json', JSON.stringify(MyInfo, null, '\x09'))
            this.showMessageOK(BotDB.idiomas['UsLimit4']() + (' ' + LibraryDB.limit.limitVal))
        },*/
/*
runProfile: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas['SoloCreador']());
 if (!quoted) return this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
 if (!(/image/).test(mime)) throw this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
 if ((/webp/).test(mime)) throw this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
 var media = await client.downloadAndSaveMediaMessage(quoted);
 (this.showProcessingMsg(BotDB.idiomas.ProCes(pushname)), await client['updateProfilePicture'](cglobal, {
   'url': media
 }).catch(_0x3b2fe8 => fs.unlinkSync(media)), client.sendMessage(from, {
   'image': {
     'url': media
   },
   'caption': BotDB.idiomas['PfBot0'](),
   'mentions': [this._sender]
 }, {
   'ephemeralExpiration': "0x18*0xe10",
   'quoted': {
     'key': {
       'participant': '0@s.whatsapp.net',
       'remoteJid': '0@s.whatsapp.net'
     },
     'message': {
       'groupInviteMessage': {
         'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
         'inviteCode': 'm',
         'groupName': 'P',
         'caption': Utils.dateComplete + ' > ' + BotDB.idiomas['PfBot1'](),
         'jpegThumbnail': this.globalThumb
       }
     }
   }
 }));
},
runSuprimir: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas.SoloCreador());
 if (!quoted) return false;
 let {chat: _0x36f0e3, fromMe: _0x3274e0, id: _0x1af668, isBaileys: _0xf9bb77} = quoted;
 if (!_0xf9bb77) return this.mySendMessage(BotDB.idiomas['SuPrim']());
 client.sendMessage(from, {
   'delete': {
     'remoteJid': from,
     'fromMe': true,
     'id': quoted.id,
     'participant': quoted['sender']
   }
 });
},
runBcGroup: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(excBold + __(' Este comando solo puede ser usado por el dueño del bot'));
 if (!q) return this.mySendMessage(excBold + __(' Y el texto?'));
 let _0x48c503 = await client.groupFetchAllParticipating(), _0x38edc3 = Object['entries'](_0x48c503).slice(0).map(_0x123890 => _0x123890[1]);
 var _0x43817b = _0x38edc3.map(_0x673882 => _0x673882.id);
 this.sendMentionedMessage(BotDB.idiomas.BcGrupos0(_0x43817b));
 if (isMedia) {
   var media= await client.downloadAndSaveMediaMessage(quoted);
   for (let _0x4a29f3 of _0x43817b) {
     (await Utils._sleep(1500), client.sendMessage(_0x4a29f3, {
       'image': {
         'url': BotDB._defImgUrl
       },
       'jpegThumbnail': BotDB.mythumb,
       'caption': q
     }));
   }
   this.showMessageOK(BotDB.idiomas.BcGrupos1(_0x43817b));
 } else {
   for (let _0x1f8d4b of _0x43817b) {
     (await Utils._sleep(1500), client.sendMessage(_0x1f8d4b, {
       'text': q,
       'contextInfo': {
         'externalAdReply': {
           'title': `[📡TRANSMISIÓN 🛰️]`,
           'body': '' + NameBot,
           'previewType': 'PHOTO',
           'thumbnail': BotDB.mythumb,
           'sourceUrl': '' + this.BodaoBotURL
         }
       }
     }));
   }
   this.showMessageOK(BotDB.idiomas['BcGrupos1'](_0x43817b));
 }
},
runBC: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isOwner && !isFromME && !isCREATOR) return this.mySendMessage(BotDB.idiomas.SoloCreador());
 let _0x4f988a = '' + (q ? q : '✍️');
 var totalchat = await pStore.chats.all().map(_0x131d3a => _0x131d3a.id);
 if (isMedia && quoted.mtype === 'imageMessage' && _0x4f988a) {
   this.sendMentionedMessage(BotDB.idiomas['BcTodos0'](totalchat));
   var media= await client.downloadAndSaveMediaMessage(quoted);
   for (let _0x509847 of totalchat) {
     (await Utils._sleep(1500), client.sendMessage(_0x509847, {
       'image': {
         'url': BotDB._defImgUrl
       },
       'caption': _0x4f988a
     }, {
       'quoted': {
         'key': {
           'participant': '0@s.whatsapp.net',
           ...from ? {
             'remoteJid': Bot._2_QUANTUM_BOT_GROUP_ID
           } : {}
         },
         'message': {
           'videoMessage': {
             'title': NameBot + ' 📡',
             'h': `UwU`,
             'seconds': '359996400',
             'gifPlayback': `true`,
             'caption': NameBot + ' 📡',
             'jpegThumbnail': BotDB.mythumb
           }
         }
       }
     }));
   }
   this.showMessageOK(BotDB.idiomas.BcTodos1());
 } else {
   if (isMedia && quoted.mtype === 'videoMessage' && _0x4f988a) {
     this.sendMentionedMessage(BotDB.idiomas['BcTodos0'](totalchat));
     var media= await client.downloadAndSaveMediaMessage(quoted);
     for (let _0x1cea34 of totalchat) {
       (await Utils._sleep(1500), client.sendMessage(_0x1cea34, {
         'video': {
           'url': BotDB._defImgUrl
         },
         'mimetype': `video/mp4`,
         'caption': _0x4f988a
       }, {
         'quoted': {
           'key': {
             'fromMe': false,
             'participant': '0@s.whatsapp.net',
             ...from ? {
               'remoteJid': Bot._2_QUANTUM_BOT_GROUP_ID
             } : {}
           },
           'message': {
             'videoMessage': {
               'title': NameBot + ' 📡',
               'h': `UwU`,
               'seconds': `359996400`,
               'caption': NameBot + ' 📡',
               'jpegThumbnail': BotDB.mythumb
             }
           }
         }
       }));
     }
     this.showMessageOK(BotDB.idiomas['BcTodos1']());
   } else {
     if (isMedia && quoted.mtype === 'audioMessage' && _0x4f988a) {
       this.sendMentionedMessage(BotDB.idiomas.BcTodos0(totalchat));
       var media= await client.downloadAndSaveMediaMessage(quoted);
       for (let _0x5b76f3 of totalchat) {
         (await Utils._sleep(1500), client.sendMessage(_0x5b76f3, {
           'audio': {
             'url': BotDB._defImgUrl
           },
           'contextInfo': {
             'externalAdReply': {
               'title': '' + _0x4f988a,
               'body': NameBot + ' 📡',
               'sourceUrl': BotDB._botYoutubeTutorial,
               'thumbnail': BotDB.mythumb
             }
           },
           'mimetype': 'audio/mp4',
           'fileName': NameBot + '.mp3'
         }, {
           'quoted': this.audioQuote
         }));
       }
       this.showMessageOK(BotDB.idiomas['BcTodos1']());
     } else {
       if (isMedia && quoted.mtype === 'stickerMessage' && _0x4f988a) {
         this.sendMentionedMessage(BotDB.idiomas['BcTodos0'](totalchat));
         var media= await client.downloadAndSaveMediaMessage(quoted);
         for (let _0x14f672 of totalchat) {
           (await Utils._sleep(1500), client.sendMessage(_0x14f672, {
             'sticker': {
               'url': BotDB._defImgUrl
             },
             'contextInfo': {
               'externalAdReply': {
                 'title': '' + _0x4f988a,
                 'body': NameBot + ' 📡',
                 'sourceUrl': this.BodaoBotURL,
                 'thumbnail': BotDB.mythumb
               }
             }
           }));
         }
         this.showMessageOK(BotDB.idiomas['BcTodos1']());
       } else this.sendMentionedMessage('Por favor responda un archivo multimedia, como Imagen/Sticker/Audio/Video\nCon el comando: ' + (Bot.prefix + command));
     }
   }
 }
},*/
/*
runDisableBot: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  if (args[1] == `segundos`) var _0x1cc642 = args[0] + `000`; else {
    if (args[1] == `minutos`) var _0x1cc642 = args[0] + `0000`; else {
      if (args[1] == 'horas') var _0x1cc642 = args[0] + `00000`; else return this.mySendMessage(BotDB.idiomas.CerrarGp0(pushname, Bot.prefix, command));
    }
  }
  (this.sendReplyWithPicThumb(BotDB.idiomas['CerrarGp1'](q, pushname)), setTimeout(() => {
    
    (client.groupSettingUpdate(from, `announcement`), client.sendMessage(from, {
      'text': BotDB.idiomas.CerrarGp2()
    }, {
      'quoted': this.msgQuoteWithLogo
    }));
  }, _0x1cc642));
},
runSetGname: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  if (q.length >= 26) return this.mySendMessage(BotDB.idiomas['NomGp0']());
    await client.groupUpdateSubject(from, q)
    this.sendReplyWithPicThumb(BotDB.idiomas['NomGp1'](groupName))
},
runSetGdesc: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  if (q.length >= 513) return this.mySendMessage(BotDB.idiomas['DesGp0']());
  await client.groupUpdateDescription(from, q)
  this.sendReplyWithPicThumb(BotDB.idiomas['DesGp1'](nwn, groupDesc))
},
runGroupIcon: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  if (!quoted) return this.mySendMessage(BotDB.idiomas.QuImage(Bot.prefix, command));
  if (!(/image/).test(mime)) return this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
  if ((/webp/).test(mime)) return this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
  var media = await client.downloadAndSaveMediaMessage(quoted);
  
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
  await client.updateProfilePicture(from, {
    'url': media
  }).catch(_0x46bc5a => fs.unlinkSync(media))
  client.sendMessage(from, {
    'image': {
      'url': media
    },
    'caption': BotDB.idiomas['PfGp0'](),
    'mentions': [this._sender]
  }, {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': {
      'key': {
        'participant': '0@s.whatsapp.net',
        'remoteJid': '0@s.whatsapp.net'
      },
      'message': {
        'groupInviteMessage': {
          'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
          'inviteCode': 'm',
          'groupName': 'P',
          'caption': Utils.dateComplete + ` > ` + BotDB.idiomas['PfGp1'](),
          'jpegThumbnail': this.picThumb
        }
      }
    }
  })
},
runTagall: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  const texto = '' + q;
  var groupMetadata2  = await client.groupMetadata(from)
  var groupMembers2 = groupMetadata2 .participants;
  let txt = BotDB.idiomas.ToDos(groupName, pushname, texto) + nwn
    + nl +'╔═══ஜ۩۞۩ஜ═══╗'+ nl;
  for (let member of groupMembers2) {
    txt += '╠➥ @' + member.id.split('@')[0] + nl;
  }
  txt += `╚═══════════`
  client.sendMessage(from, {
    'text': txt,
    'mentions': groupMembers2.map(_0x4877c0 => _0x4877c0.id)
  })
  this.setUserConstraints();
}
runPromoteMember: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  if (!q) return this.mySendMessage(boldSign+ BotDB.idiomas.PromoteAdmin +boldSign);
  var _0x37b8f4 = q.replace(/[^-9]/g, '') + '@s.whatsapp.net'
  var usuarioP = _0x37b8f4.slice(0, -15);
  await client.groupParticipantsUpdate(from, [_0x37b8f4], BotDB.idiomas.Promote )
  
   this.showMessageOK(BotDB.idiomas.DarP(usuarioP, pushname))
   this.addSPAMFilter(from);
},
runDemoteMember: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  if (!q) return this.mySendMessage(boldSign+ BotDB.idiomas.DemoteAdmin +boldSign);
  var _0x37b8f4 = q.replace(/[^-9]/g, '') + '@s.whatsapp.net'
  var usuarioP = _0x37b8f4.slice(0, -15);
  
    await client.groupParticipantsUpdate(from, [_0x37b8f4],BotDB.idiomas.Demote)
    this.showMessageOK(BotDB.idiomas.QuitP(usuarioP, pushname))
    this.addSPAMFilter(from);
},
runKickMember: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  var _0x37b8f4 = msg.mentionedJid[0] ? msg.mentionedJid[0] : msg.quoted ? msg.quoted['sender'] : q.replace(/[^-9]/g, '') + '@s.whatsapp.net'
  var adiUser = _0x37b8f4.slice(0, -15);
  if (_0x37b8f4.startsWith(Bot.SIMPLE_CODE_BOT_2022_ADMIN_1)) return this.sendMentionedMessage('ª');
  if (_0x37b8f4.startsWith('' + cglobal.slice(0, -15))) return this.sendMentionedMessage('ª');
  
  if (isNaN(adiUser && msg.mentionedJid[0] && q)) {
      await client.groupParticipantsUpdate(from, [_0x37b8f4], BotDB.idiomas.Remove)
      this.showMessageOK(BotDB.idiomas.BanSer(adiUser, pushname))
    }
    else {
      this.mySendMessage(BotDB.idiomas.UserKick)
      this.addSPAMFilter(from)
  };
},
runEveryone: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isAdmin && !isFromME) return this.mySendMessage(BotDB.idiomas.SoloAdm());
  let who = args && (/\d+\-\d+@g.us/).test(args[0]) ? args[0] : from
  let activeUsers = [...Object.keys(pStore.presences[who]), cglobal];
  let myTxt = BotDB.idiomas['UsEnLinea']()
  + activeUsers.length + '\n\n'
  + activeUsers.map(uname => `🧐🍷 @`
  + uname.replace(/@.+/, '')).join(`\n`)
  this.showActiveUsers(myTxt, activeUsers)
  return this.addSPAMFilter(from);
},*/
/*
runInframundo: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage('Envie ó Responda una audio con el comando ' + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage(`Envie ó Responda un audio con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2(BotDB.idiomas.wait());
  var media = await client.downloadAndSaveMediaMessage(quoted);
 
  const ramdomSoundFile = Utils.getRandom('.mp3')
  exec(`ffmpeg -i ` + media + ' -filter:a \"atempo=1.7,asetrate=3486\" ' + ramdomSoundFile, (_0x994721, _0x50552e, _0x21858b) => {
    
    fs.unlinkSync(media);
    if (_0x994721) return this.mySendMessage(BotDB.idiomas.Erreply());
    
      const buffer = fs.readFileSync(ramdomSoundFile)
      client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': `🎧 ` + NameBot + ` 🎛️`,
          'body': '' + command,
          'previewType': 'PHOTO',
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': 'audio/mp4',
      'fileName': (q ? q : pushname) + '.mp3'
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
    
  })
  this.setUserConstraints()
  
  
},
runNightcore2: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una audio con el comando ` + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage(`Envie ó Responda un audio con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2(BotDB.idiomas.wait());
  var media = await client.downloadAndSaveMediaMessage(quoted);
  
  const ramdomSoundFile = Utils.getRandom('.mp3')
  exec(`ffmpeg -i ` + media + ` -filter:a atempo=1.06,asetrate=55125 ` + ramdomSoundFile, (_0x82c4c8, _0x36ef2d, _0x1e5f63) => {
    
    fs.unlinkSync(media);
    if (_0x82c4c8) return this.mySendMessage(BotDB.idiomas.Erreply());
    
      const buffer = fs.readFileSync(ramdomSoundFile)
      client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': `🎧 ` + NameBot + ` 🎛️`,
          'body': '' + command,
          'previewType': 'PHOTO',
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': 'audio/mp4',
      'fileName': (q ? q : pushname) + '.mp3'
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
    
  })
  this.setUserConstraints()
  
},
runArdilla: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una audio con el comando ` + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage('Envie ó Responda un audio con el comando ' + (Bot.prefix + command));
  this.showWaitMessage2(`_Aguarde ` + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  
  const  ramdomSoundFile = Utils.getRandom('.mp3')
  exec('ffmpeg -i ' + media + ` -filter:a "atempo=0.8,asetrate=65100" ` + ramdomSoundFile, (_0x186f01, _0x11dff1, _0x2347ee) => {
    
    fs.unlinkSync(media);
    if (_0x186f01) return this.mySendMessage(BotDB.idiomas.Erreply());
    
    const  buffer = fs.readFileSync(ramdomSoundFile)
    client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': `🎧 ` + NameBot + ` 🎛️`,
          'body': '' + command,
          'previewType': `PHOTO`,
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': 'audio/mp4',
      'fileName': (q ? q : pushname) + `.mp3`
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
    
  })
  this.setUserConstraints()
  
},
runSuperveloz: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una audio con el comando ` + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage(`Envie ó Responda un audio con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2('_Aguarde ' + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  
  const  ramdomSoundFile = Utils.getRandom('.mp3')
  exec('ffmpeg -i ' + media + ` -filter:a "atempo=1.0,asetrate=95100" ` + ramdomSoundFile, (_0x34d5a4, _0x561618, _0x239c59) => {
   
    fs.unlinkSync(media);
    if (_0x34d5a4) return this.mySendMessage(BotDB.idiomas.Erreply());
    
      const buffer = fs.readFileSync(ramdomSoundFile)
      client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': '🎧 ' + NameBot + ` 🎛️`,
          'body': '' + command,
          'previewType': `PHOTO`,
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': `audio/mp4`,
      'fileName': (q ? q : pushname) + `.mp3`
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
    
  })
  this.setUserConstraints()
  
},
runDemo: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una audio con el comando ` + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage(`Envie ó Responda un audio con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2('_Aguarde ' + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  
  const  ramdomSoundFile = Utils.getRandom('.mp3')
  exec(`ffmpeg -i ` + media + ` -filter:a "atempo=1.6,asetrate=22100" ` + ramdomSoundFile, (_0x22c352, _0x254b03, _0x3d1976) => {
    
    fs.unlinkSync(media);
    if (_0x22c352) return this.mySendMessage(BotDB.idiomas.Erreply());
    
      const buffer = fs.readFileSync(ramdomSoundFile)
      client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': '🎧 ' + NameBot + ` 🎛️`,
          'body': '' + command,
          'previewType': 'PHOTO',
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': `audio/mp4`,
      'fileName': (q ? q : pushname) + `.mp3`
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
    
  })
  this.setUserConstraints()
  
},
runDeepslow: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una audio con el comando ` + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage('Envie ó Responda un audio con el comando ' + (Bot.prefix + command));
  this.showWaitMessage2(`_Aguarde ` + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  
  const ramdomSoundFile = Utils.getRandom('.mp3')
  exec('ffmpeg -i ' + media + ' -filter:a \"atempo=0.7,asetrate=44100\" ' + ramdomSoundFile, (_0x35f2b7, _0x5d76d7, _0x14d439) => {
    
    fs.unlinkSync(media);
    if (_0x35f2b7) return this.mySendMessage(BotDB.idiomas.Erreply());
    
      const buffer = fs.readFileSync(ramdomSoundFile)
      client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': `🎧 ` + NameBot + ` 🎛️`,
          'body': '' + command,
          'previewType': 'PHOTO',
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': 'audio/mp4',
      'fileName': (q ? q : pushname) + '.mp3'
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
    
  })
  this.setUserConstraints()
  
  
},
runDistortion: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una audio con el comando ` + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage('Envie ó Responda un audio con el comando ' + (Bot.prefix + command));
  this.showWaitMessage2(`_Aguarde ` + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  
    const ramdomSoundFile = Utils.getRandom('.mp3')
    exec(`ffmpeg -i ` + media + ` -af equalizer=f=44:width_type=o:width=2:g=56 ` + ramdomSoundFile, (_0x35caf9, _0x3ceafe, _0x563530) => {
    
    fs.unlinkSync(media);
    if (_0x35caf9) return this.mySendMessage(BotDB.idiomas.Erreply());
    
      const buffer:any = fs.readFileSync(ramdomSoundFile)
      client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': `🎧 ` + NameBot + ' 🎛️',
          'body': '' + command,
          'previewType': `PHOTO`,
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': 'audio/mp4',
      'fileName': (q ? q : pushname) + `.mp3`
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
  })
  this.setUserConstraints()
  
},
runBassIncrease: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage('Envie ó Responda una audio con el comando ' + (Bot.prefix + command));
  if (!(/audio/).test(mime)) return this.mySendMessage(`Envie ó Responda un audio con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2(BotDB.idiomas.wait());
  var media = await client.downloadAndSaveMediaMessage(quoted);
  const ramdomSoundFile = Utils.getRandom('.mp3')
  exec('ffmpeg -i ' + media + ` -af equalizer=f=34:width_type=o:width=2:g=25 ` + ramdomSoundFile, (_0x4ab148, _0x58f0d4, _0x2842a4) => {
    
    fs.unlinkSync(media);
    if (_0x4ab148) return this.mySendMessage(BotDB.idiomas.Erreply());
    
     const buffer = fs.readFileSync(ramdomSoundFile)
     client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': '🎧 ' + NameBot + ` 🎛️`,
          'body': '' + command,
          'previewType': `PHOTO`,
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': `audio/mp4`,
      'fileName': (q ? q : pushname) + `.mp3`
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
  })
  
  this.setUserConstraints()
},
runTomp3: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una video con el comando ` + (Bot.prefix + command));
  if (!(/video/).test(mime)) return this.mySendMessage(`Envie ó Responda un video con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2('_Aguarde ' + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  const ramdomSoundFile = Utils.getRandom(`.mp4`)
  exec(`ffmpeg -i ` + media + ' ' + ramdomSoundFile, _0x5c45df => {
    
    fs.unlinkSync(media);
    if (_0x5c45df) return this.mySendMessage(BotDB.idiomas.Erreply());
    const buffer = fs.readFileSync(ramdomSoundFile)
    
    client.sendMessage(from, {
      'audio': buffer,
      'contextInfo': {
        'externalAdReply': {
          'title': `🎞️ ` + NameBot + ` 🎶`,
          'body': '' + command,
          'previewType': 'PHOTO',
          'thumbnail': BotDB.images.logo,
          'sourceUrl': '' + this.BodaoBotURL
        }
      },
      'mimetype': 'audio/mp4',
      'fileName': (q ? q : pushname) + '.mp3'
    }, {
      'quoted': this.msgQuote
    })
    fs.unlinkSync(ramdomSoundFile)
  })
  this.setUserConstraints()
},
runIncreaseVidSpeed: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una video con el comando ` + (Bot.prefix + command));
  if (!(/video/).test(mime)) return this.mySendMessage(`Envie ó Responda un video con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2(BotDB.idiomas.wait());
  var media = await client.downloadAndSaveMediaMessage(quoted);
  const ramdomSoundFile = Utils.getRandom(`.mp4`)
  exec(`ffmpeg -i ` + media + ` -filter_complex "[0:v]setpts=0.5*PTS[v];[0:a]atempo=2[a]" -map "[v]" -map "[a]" ` + ramdomSoundFile, _0x3dc2c8 => {
    
    fs.unlinkSync(media);
    if (_0x3dc2c8) return this.mySendMessage(BotDB.idiomas.Erreply());
    
    const buffer453 = fs.readFileSync(ramdomSoundFile)
    client.sendMessage(from, {
      'video': buffer453,
      'caption': '┏━━⊱' + command + `
┗⊱By ` + pushname
    })
    fs.unlinkSync(ramdomSoundFile)
  })
  this.setUserConstraints()
},
runDecreaseVidSpeed: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage('Envie ó Responda una video con el comando ' + (Bot.prefix + command));
  if (!(/video/).test(mime)) return this.mySendMessage(`Envie ó Responda un video con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2(`_Aguarde ` + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  const ramdomSoundFile = Utils.getRandom('.mp4')
  exec(`ffmpeg -i ` + media + ` -filter_complex "[0:v]setpts=2*PTS[v];[0:a]atempo=0.5[a]" -map "[v]" -map "[a]" ` + ramdomSoundFile, _0x5d549d => {
    
    fs.unlinkSync(media);
    if (_0x5d549d) return this.mySendMessage(BotDB.idiomas.Erreply());
    
      const buffer453 = fs.readFileSync(ramdomSoundFile)
      client.sendMessage(from, {
      'video': buffer453,
      'caption': `┏━━⊱` + command + ' \n┗⊱By ' + pushname
    })
     fs.unlinkSync(ramdomSoundFile)
  })
  this.setUserConstraints()
},
runReverseVid: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda una video con el comando ` + (Bot.prefix + command));
  if (!(/video/).test(mime)) return this.mySendMessage(`Envie ó Responda un video con el comando ` + (Bot.prefix + command));
  this.showWaitMessage2(`_Aguarde ` + pushname + `, estoy procesando su pedido..._`);
  var media = await client.downloadAndSaveMediaMessage(quoted);
  const ramdomSoundFile = Utils.getRandom('.mp4')
  exec('ffmpeg -i ' + media + ' -vf reverse -af areverse ' + ramdomSoundFile, _0x416176 => {
    
    fs.unlinkSync(media);
    if (_0x416176) return this.mySendMessage(BotDB.idiomas.Erreply());
    const buffer453 = fs.readFileSync(ramdomSoundFile)
    client.sendMessage(from, {
      'video': buffer453,
      'caption': '┏━━⊱' + command + `
┗⊱By ` + pushname
    })
     fs.unlinkSync(ramdomSoundFile)
  })
  this.setUserConstraints()
},
runRescom: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(`Envie ó Responda un video ó imagen con el comando ` + (Bot.prefix + command));
  if (!(/image|video/).test(mime)) return this.mySendMessage('Envie ó Responda un video ó imagen con el comando ' + (Bot.prefix + command));
  try {
    var _0x522c4a = quoted.caption;
    this.sendMentionedMessage('' + _0x522c4a);
  } catch {
    this.mySendMessage(BotDB.idiomas.Erreply());
  }
  this.setUserConstraints()
},
runImgToSticker: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!quoted) return this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
  if (!(/image|video/).test(mime)) return this.mySendMessage(`Envie ó Responda un video ó imagen con el comando ` + (Bot.prefix + command));
  this.sendMentionedMessage(BotDB.idiomas.ProCes(pushname));
  if ((/image/).test(mime)) {
    var _0x1085b6 = await quoted.download()
    const _0x13f676 = await client.sendImageAsSticker(from, _0x1085b6, msg, {
      'packname': '' + (q ? q : groupName),
      'author': (pushname ? pushname : Bot.packWm) + ` ` + (NameBot ? NameBot : Bot.botName)
    });
    await fs.unlinkSync(_0x13f676);
  } else {
    if ((/video/).test(mime)) {
      if (quoted['seconds'] > 11) return this.mySendMessage(excBold + __(' Máximo duración de vídeo son 10 segundos*'));
      var _0x1085b6 = await quoted.download()
      const _0x13f676 = await client.sendVideoAsSticker(from, _0x1085b6, msg, {
        'packname': '' + (q ? q : groupName),
        'author': (pushname ? pushname : `Bodão Corp`) + ` ` + (NameBot ? NameBot : Bot.botName)
      })
      await fs.unlinkSync(_0x13f676.buffer);
    } else return this.mySendMessage(excBold + __(' Por favor Envie o Responda un video o una imagen usando el comando ') + (Bot.prefix + command)
    + `\n*_NOTA : duracion de video 1 a 10 segundos_ ✓`);
  }
  this.setUserConstraints();
},
runShowTime: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());

  const _0x305d5d = moment().tz('America/Sao_Paulo').format(`DD/MM HH:mm:ss`)
  const _0x462119 = moment().tz(`America/Mexico_City`).format('DD/MM HH:mm')
  const _0x416669 = moment().tz('America/La_Paz').format(`DD/MM HH:mm`)
  const _0x10cdb1 = moment().tz('America/Santiago').format(`DD/MM HH:mm`)
  const _0x51eabf = moment().tz(`America/Argentina/Buenos_Aires`).format(`DD/MM HH:mm`)
  const _0x4ebc55 = moment().tz(`America/Bogota`).format(`DD/MM HH:mm`)
  const _0x315a27 = moment().tz(`America/Guayaquil`).format('DD/MM HH:mm')
  const _0x352657 = moment().tz('America/Costa_Rica').format('DD/MM HH:mm')
  const _0x1c7e5d = moment().tz(`America/Havana`).format(`DD/MM HH:mm`)
  const _0x10b943 = moment().tz('America/Guatemala').format(`DD/MM HH:mm`)
  const _0xb605dd = moment().tz(`America/Tegucigalpa`).format(`DD/MM HH:mm`)
  const _0x44c1f4 = moment().tz(`America/Managua`).format(`DD/MM HH:mm`)
  const _0x4db8a4 = moment().tz(`America/Panama`).format('DD/MM HH:mm')
  const _0x41787b = moment().tz('America/Montevideo').format('DD/MM HH:mm')
  const _0x59b0cd = moment().tz(`America/Caracas`).format(`DD/MM HH:mm`)
  const _0x412f15 = moment().tz(`America/Asuncion`).format(`DD/MM HH:mm`)
  const _0x5be6b3 = moment().tz(`America/New_York`).format('DD/MM HH:mm')
  const _0x274fd6 = moment().tz(`Asia/Jakarta`).format(`DD/MM HH:mm`)
  const _0x547f41 = moment().tz(`America/Sao_Paulo`).format('DD/MM HH:mm');
  
  this.showButtonsChoice(from, monospace + `「 ZONA-HORARIA 🌎 」`
  + `\n⌚Peru       : ` + _0x305d5d
  + `\n⌚Mexico     : ` + _0x462119
  + '\n⌚Bolivia    : ' + _0x416669
  + `\n⌚Chile      : ` + _0x10cdb1
  + `\n⌚Argentina  : ` + _0x51eabf
  + `\n⌚Colombia   : ` + _0x4ebc55
  + '\n⌚Ecuador    : ' + _0x315a27
  + `\n⌚Costa_Rica : ` + _0x352657
  + `\n⌚Cuba       : ` + _0x1c7e5d
  + '\n⌚Guatemala  : ' + _0x10b943
  + `\n⌚Honduras   : ` + _0xb605dd
  + '\n⌚Nicaragua  : ' + _0x44c1f4
  + `\n⌚Panama     : ` + _0x4db8a4
  + `\n⌚Uruguay    : ` + _0x41787b
  + `\n⌚Venezuela  : ` + _0x59b0cd
  + `\n⌚Brasil     : ` + _0x547f41
  + `\n⌚Nova York  : ` + _0x5be6b3
  + `\n⌚Paraguay   : ` + _0x412f15
  + monospace + nl, 'Zona horaria actual del bot\n'
  + dateFormat.timeZone + ' : '
  + now, [{
    'buttonId': Bot.prefix + `ping`,
    'buttonText': {
      'displayText': '??'
    },
    'type': 0x1
  }, {
    'buttonId': Bot.prefix + 'rebote',
    'buttonText': {
      'displayText': '🥵'
    },
    'type': 0x1
  }])
  this.setUserConstraints()
},
runPing: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  const _0x1d736c = speed()
  const _0x4a0fc2 = speed() - _0x1d736c
  const _0x527e17 = _0x4a0fc2.toFixed(4) + 'MS'
  

  const randPong = BotDB.idiomas.pong()

  this.sendMentionedMessage(randPong + (__('Response speed:') + _0x527e17 + " " + __('Miliseconds')))
  this._user.limitInc = 1
  this._user.limitInc = 1
  this._user.limitInc = 1
  this._user.limitInc = 1
  this._user.limitInc = 1
},*/
/*
showMyProfile: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  var myPrepMedia = await prepareWAMessageMedia({
    'image': this.sendThumb //,
    //'jpegThumbnail': BotDB.mythumb
  }, {
    'upload': client.waUploadToServer
  });
    axios.get(`https://numlookupapi.com/api/validate/+` + senderNUMBER + `?apikey=32461480-7ada-11ec-a4a4-5b1bd71794f1`).then(_0xb98666 => {
    const myWAMessageContent =  Waproto.Message.fromObject({
      'templateMessage': {
        'hydratedTemplate': {
          'imageMessage': myPrepMedia['imageMessage'],
          'hydratedContentText': `💻 <[ PERFIL DE USUARIO]> 🌐\n⚡ | INFO DE USUARIO |`
          + monospace
          + `\n➢ Nombre : `
          + pushname
          + '\n➢ Usuario registrado : '
          + (isREGISTERED ? `[✓]` : '[X]')
          + '\n➢ Nombre de registro : '
          + registeredUSER.nombre + '\n➢ Edad : '
          + registeredUSER.edad
          + `\n➢ Fecha de registro : `
          + registeredUSER['fecha']
          + `\n➢ Código de registro : `
          + registeredUSER['scode']
          + '\n➢ Es administrador : '
          + (isAdmin ? `[✓]` : `[X]`)
          + '\n➢ Solicitud desde : '
          + (isGroupMsg ? `Un Grupo` : `Chat privado`)
          + ' '
          + nwn
          + `\n➢ Pais : `
          + _0xb98666.data['country_name']
          + `\n➢ Prefijo de pais : `
          + _0xb98666['data']['country_prefix']
          + `\n➢ Origen del número : `
          + _0xb98666['data']['location']
          + `\n➢ Link de Número : wa.me/`
          + senderNUMBER + `
          ➢ Número valido : `
          + (_0xb98666['data']['valid'] ? `[✓]` : `[X]`)
          + '\n➢ Dispositivo mobil : '
          + (_0xb98666['data']['line_type'] ? `[✓]` : `[X]`)
          + `\n➢ Operadora : `
          + _0xb98666['data']['carrier']
          + `\n➢ Tipo de linea : `
          + _0xb98666['data']['line_type']
          + `\n➢ Formato local : `
          + _0xb98666.data['local_format']
          + `\n➢ Formato internacional : `
          + _0xb98666['data']['international_format']
          + '\n➢ Código de pais : '
          + _0xb98666.data.country_code
          + nl + monospace + nl,
          'hydratedButtons': [{
            'urlButton': {
              'displayText': 'Apoyar Al Creador ✓',
              'url': this.BodaoBotURL
            }
          }]
        }
      }
    })
    const myMessageGenerationOptionsFromContent = {
      'userJid': from,
      'quoted': msg
    }
    //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
    const myMedia = generateWAMessageFromContent(from,myWAMessageContent, myMessageGenerationOptionsFromContent );
    
    const options = {
      'messageId': myMedia.key.id
    }
    
    client.relayMessage(from, myMedia.message, options);
     }
     , _0x18f4b1 => {
    
    client.sendMessage(from, {
      'image': this.sendThumb,
      'jpegThumbnail': BotDB.mythumb,
      'caption': '💻 <[ PERFIL DE USUARIO]> 🌐\n    \n⚡ | INFO DE USUARIO |\n'
      + monospace
      + `\n➢ Número : `
      + AtSenderNUMBER
      + `\n➢ Nombre : `
      + pushname
      + '\n➢ Usuario registrado : '
      + (isREGISTERED ? '[✓]' : `[X]`)
      + `\n➢ Nombre de registro : `
      + registeredUSER['nombre']
      + `\n➢ Edad : `
      + registeredUSER['edad']
      + `\n➢ Fecha de registro : `
      + registeredUSER.fecha
      + `\n➢ Código de registro : `
      + registeredUSER.scode
      + `\n➢ Es administrador : `
      + (isAdmin ? `[✓]` : '[X]')
      + `\n➢ Solicitud desde : `
      + (isGroupMsg ? `Un Grupo` : `Chat privado`)
      + '\n➢ Link de Número : wa.me/' + senderNUMBER
      + nl + monospace
    }, {
      'quoted': this.msgQuote
    });
  })
  this._user.limitInc = 1
  this._user.addXp(this.from, 450)
  this._user.addLevel(this.from, 2)
  
  
},
runWho: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!q) return this.mySendMessage(excBold + ' Invente un asunto*\n_Ejm:_\n' + (Bot.prefix + command) + ` es gey?`);
  if (q.length < 5) return this.mySendMessage(excBold + __(' El asunto es muy corto'));
  var _0x5c95b4 = await client.groupMetadata(from)
  var _0x1d30e8 = _0x5c95b4.participants
  var _0xacd6dd: string[] = [];
  _0x1d30e8.map(async _0x2fe17c => {
    
    _0xacd6dd.push(_0x2fe17c.id.replace(`c.us`, `s.whatsapp.net`));
  });
  var _0x3ebff7 = _0xacd6dd[Math.floor(Math.random() * _0xacd6dd.length)];
  (client.sendMessage(from, {
    'text': `\n*=>* @` + _0x3ebff7.split('@')[0] + nl,
    'mentions': [_0x3ebff7]
  }, {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': this.msgQuote
  }), this.setUserConstraints());
}, */
/*runVoz: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(excBold + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (args.length < 1) return this.showButtonsChoice(from, excBold + __(' Despues de usar el comando ` + command + `, tiene que agregar el prefijo del idioma en el cual desea escuchar el audio*
` + nwn + '\nIdiomas disponibles : \n\n  \'af\': \'Africano\',\n  \'sq\': \'Albanes\',\n  \'ar\': \'Arabico\',\n  \'hy\': \'Armenio\',\n  \'ca\': \'Catalan\',\n  \'zh\': \'Chino\',\n  \'zh-cn\': \'Chino (Mandarin/China)\',\n  \'zh-tw\': \'Chino (Mandarin/Taiwanes)\',\n  \'zh-yue\': \'Chino (Cantones)\',\n  \'hr\': \'Croata\',\n  \'cs\': \'Checo\',\n  \'da\': \'Danes\',\n  \'nl\': \'Holandes\',\n  \'en\': \'Ingles\',\n  \'en-au\': \'Ingles (Australia)\',\n  \'en-uk\': \'Ingles (Reino unido)\',\n  \'en-us\': \'Ingles (Estados unidos)\',\n  \'eo\': \'Esperanto\',\n  \'fi\': \'Finlandes\',\n  \'fr\': \'Frances\',\n  \'de\': \'Aleman\',\n  \'el\': \'Griego\',\n  \'ht\': \'Criollo haitiano\',\n  \'hi\': \'Hindio\',\n  \'hu\': \'Hungaro\',\n  \'is\': \'islandes\',\n  \'id\': \'Indonesio\',\n  \'it\': \'Italiano\',\n  \'ja\': \'Japones\',\n  \'ko\': \'Koreano\',\n  \'la\': \'Latino\',\n  \'lv\': \'Leton\',\n  \'mk\': \'Macedonio\',\n  \'no\': \'Noruego\',\n  \'pl\': \'Polaco\',\n  \'pt\': \'Portugues\',\n  \'pt-br\': \'Portugues (Brazil)\',\n  \'ro\': \'Rumano\',\n  \'ru\': \'Ruso\',\n  \'sr\': \'Serbio\',\n  \'sk\': \'Slovaco\',\n  \'es\': \'Español\',\n  \'es-es\': \'Español (España)\',\n  \'es-us\': \'Español (Estados Unidos)\',\n  \'sw\': \'Swahili\',\n  \'sv\': \'Sueco\',\n  \'ta\': \'Tamil\',\n  \'th\': \'Tailandes\',\n  \'tr\': \'Turco\',\n  \'vi\': \'Vietnamita\',\n  \'cy\': \'Gales\'', 'Ejemplo de uso:\n\n' + (Bot.prefix + command) + ` es hola
-> "es" = prefijo español
--> "hola" = texto

` + Bot.cocreador + ' ✓', [{
    'buttonId': Bot.prefix + 'ping',
    'buttonText': {
      'displayText': '🔥'
    },
    'type': 0x1
  }]);
  const _0x4b2a8e = LibraryDB.gtts.Text2Speech(args[0]);
  if (args.length < 2) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  
    const dtt = body.slice(8)
    const ranm = Utils.getRandom('.mp3')
    const rano = Utils.getRandom(`.ogg`)
    
    if( dtt.length > 600) {

       this.sendMentionedMessage(`Maximo de caracteres 600`)
      
    }
    const myCallBack =  () =>{
    
        exec(`ffmpeg -i ` + ranm + ` -ar 48000 -vn -c:a libopus ` + rano, _0x2567fe => {
          
          
            fs.unlinkSync(ranm)
            this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
            const buff = fs.readFileSync(rano)
            
          
          if (_0x2567fe) return this.mySendMessage(BotDB.idiomas.Erreply());
          client.sendMessage(from, {
            'audio': buff,
            'fileName': pushname + '.mp3',
            'mimetype': 'audio/mpeg',
            'ptt': true
          }, {
            'quoted': this.msgQuote
          })
          fs.unlinkSync(rano);
        });
    }
    _0x4b2a8e.save (ranm, dtt,  ()=> {
    
      exec(`ffmpeg -i ` + ranm + ` -ar 48000 -vn -c:a libopus ` + rano, _0x2567fe => {
        
        
          fs.unlinkSync(ranm)
          this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
          const buff = fs.readFileSync(rano)
          
        
        if (_0x2567fe) return this.mySendMessage(BotDB.idiomas.Erreply());
        client.sendMessage(from, {
          'audio': buff,
          'fileName': pushname + '.mp3',
          'mimetype': 'audio/mpeg',
          'ptt': true
        }, {
          'quoted': this.msgQuote
        })
        fs.unlinkSync(rano);
      });
  })
    this.setUserConstraints()
  
},
runSimi: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (isSIMIModeOn) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(excBold + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (args.length < 1) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  let _0x1c627e = q;
  try {
    var _0x1ec235 = await Utils.fetchJson('https://api.simsimi.net/v2/?text=' + _0x1c627e + `&lc=es`, {
      'method': 'get'
    });
  } catch (_0x28e62f) {
    this.sendMentionedMessage(BotDB.idiomas.ErrorResponse);
  }
  let _0x43bec7 = _0x1ec235['success'];
  client.sendMessage(from, {
    'text': _0x43bec7,
    'mentions': [this._sender]
  }, {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': {
      'key': {
        'participant': '0@s.whatsapp.net',
        'remoteJid': '0@s.whatsapp.net'
      },
      'message': {
        'groupInviteMessage': {
          'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
          'inviteCode': 'm',
          'groupName': 'P',
          'caption': NameBot + `🗣️` + pushname,
          'jpegThumbnail': BotDB.images.similogo
        }
      }
    }
  }).catch(_0x3fad70 => {
    
    (console.log('' + command), console.log(_0x3fad70));
  })
   this.setUserConstraints()
},*/
/*
runMinidatos: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(excBold + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  try {
    var _0x2536bc = await Utils.fetchJson(`https://docs-jojo.herokuapp.com/api/fakta-unik`, {
      'method': `get`
    }), _0x1f921e = await Utils.fetchJson(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=` + _0x2536bc['result']);
  } catch (_0x2d90ca) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  
  this.sendMentionedMessage(`
🔖 ` + _0x1f921e[0][0][0] + nl)
  this.setUserConstraints()

}, */
/*
runGneon: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let myStyle = `https://textpro.me/green-neon-text-effect-874.html`;
  try {
    var apiResponse = await Utils.fetchJson('https://nk-api.vercel.app/api/tpro1?apikey=' + MyApiKey + '&estilo=' + myStyle + `&text1=` + q);
  } catch (_0x48ef62) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let logo = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(myStyle, '' + q).then(async _0x2015bf => {
    
    this.sendMessageCOMMAND({
      'url': _0x2015bf
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': logo
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runNeontxt: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let myStyle = `https://textpro.me/neon-light-text-effect-online-882.html`;
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + '&estilo=' + myStyle + `&text1=` + q);
  } catch (_0x4a6e39) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x4f4cef = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(myStyle, '' + q).then(async _0x27ffbe => {
   
    this.sendMessageCOMMAND({
      'url': _0x27ffbe
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x4f4cef
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runRaimbow: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas.NoTexto());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let tpResponse = `https://textpro.me/3d-rainbow-color-calligraphy-text-effect-1049.html`;
  try {
    var apiResponse = await Utils.fetchJson('https://nk-api.vercel.app/api/tpro1?apikey=' + MyApiKey + `&estilo=` + tpResponse + '&text1=' + q);
  } catch (_0x3a2ea8) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x3a2d26 = apiResponse.resultado.logo;
  LibraryDB.textpro.run(tpResponse, '' + q).then(async _0x56a46f => {
    
    this.sendMessageCOMMAND({
      'url': _0x56a46f
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x3a2d26
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runIce: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage('_Espere ' + pushname + `, estoy trabajando en su solicitud..._`);
  let myStyle = `https://textpro.me/ice-cold-text-effect-862.html`;
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + '&estilo=' + myStyle + `&text1=` + q);
  } catch (_0x1b9088) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0xf66e12 = apiResponse.resultado.logo;
  LibraryDB.textpro.run(myStyle, '' + q)
  .then(async _0x77d62c => {
    
    this.sendMessageCOMMAND({
      'url': _0x77d62c
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0xf66e12
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints()
},
runPencil: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas.NoTexto());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let myStyle = `https://textpro.me/create-a-sketch-text-effect-online-1044.html`;
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + `&estilo=` + myStyle + `&text1=` + q);
  } catch (_0x1ee1a0) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x286f92 = apiResponse.resultado.logo;
  LibraryDB.textpro.run(myStyle, '' + q)
  .then(async _0x4efe22 => {
   
    this.sendMessageCOMMAND({
      'url': _0x4efe22
    }, BotDB.images.crearHD,BotDB.idiomas.ImageTextPro1(command,q,pushname));
  })
  .catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x286f92
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
   this.setUserConstraints()
},
runRoca3d: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let myStyle = `https://textpro.me/3d-stone-cracked-cool-text-effect-1029.html`;
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + `&estilo=` + myStyle + `&text1=` + q);
  } catch (err) {
    console.log(`Error fetch, err: ` + err);
    console.log('Error fetch, comando: ' + command);
  }
  let _0x132eb1 = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(myStyle, '' + q)
  .then(async _0x259c53 => {
   
    this.sendMessageCOMMAND({
      'url': _0x259c53
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x132eb1
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runFiccion: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas.NoTexto());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let myStyle = 'https://textpro.me/create-science-fiction-text-effect-online-free-1038.html';
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + `&estilo=` + myStyle + '&text1=' + q);
  } catch (_0x373497) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x3a83c6 = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(myStyle, '' + q).then(async _0x469b6c => {
    
    this.sendMessageCOMMAND({
      'url': _0x469b6c
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  })
  .catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x3a83c6
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runRomper: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let tpResponse = 'https://textpro.me/break-wall-text-effect-871.html';
  try {
    var apiResponse = await Utils.fetchJson('https://nk-api.vercel.app/api/tpro1?apikey=' + MyApiKey + `&estilo=` + tpResponse + `&text1=` + q);
  } catch (_0x346cf4) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x243dea = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(tpResponse, '' + q)
  .then(async _0x22079d => {
   
    this.sendMessageCOMMAND({
      'url': _0x22079d
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  })
  .catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x243dea
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
   this.setUserConstraints();
},
runSangre: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas.NoTexto());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let myStyle = `https://textpro.me/blood-text-on-the-frosted-glass-941.html`;
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + `&estilo=` + myStyle + '&text1=' + q);
  } catch (_0x546cc1) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0xb05e1d = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(myStyle, '' + q).then(async _0x1fdce5 => {
    
    this.sendMessageCOMMAND({
      'url': _0x1fdce5
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(_0x150b05 => {
    
    this.sendMessageCOMMAND({
      'url': _0xb05e1d
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints()
},*/
/*
showMorecmds: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  const _0x897e62 = ['Hola', `Wenas`, `Que tal`, 'Hi', `Hello`, `Olá`, `Namaste`, `Hey!`, `Aloha`, `Konnichi wa`, `Mi king`, `Que hay`, `Como estas`, 'Oi', 'Joder Buenas'], _0x2a54b1 = _0x897e62[Math.floor(Math.random() * _0x897e62.length)];
  const myking = '' + _0x2a54b1;
  const listOptions = [{
    'title': BotDB.idiomas.CmdsR0() + ' ♻️',
    'rows': [{
      'title': BotDB.idiomas['CmdsR1'](),
      'rowId': Bot.prefix + 'randmenu',
      'description': 'ᴸᶦˢᵗᵃ ᵈᵉ ᶜᵒᵐᵃⁿᵈᵒˢ ᵛᵃʳᶦᵃᵈᵒˢ'
    }]
  }, {
    'title': BotDB.idiomas['CmdsA0']() + ` 🎨`,
    'rows': [{
      'title': BotDB.idiomas['CmdsA1'](),
      'rowId': Bot.prefix + `crealogos`,
      'description': `ᶜᵒᵐᵃⁿᵈᵒˢ ᵖᵃʳᵃ ᶜʳᵉᵃʳ ˡᵒᵍᵒˢ ʸ ᵐᵃˢ`
    }]
  }, {
    'title': BotDB.idiomas['CmdsO0']() + ` 🀄`,
    'rows': [{
      'title': BotDB.idiomas.CmdsO0(),
      'rowId': Bot.prefix + 'mianime',
      'description': `ᶜᵒᵐᵃⁿᵈᵒˢ ᵒᵗᵃᵏᵘ⁻ᵃⁿᶦᵐᵉ ᵛᵃʳᶦᵃᵈᵒ`
    }]
  }, {
    'title': BotDB.idiomas['CmdsH0']() + ' 🥵',
    'rows': [{
      'title': BotDB.idiomas.CmdsH0(),
      'rowId': Bot.prefix + 'labiblia',
      'description': `ᶜᵒᵐᵃⁿᵈᵒˢ ʰᵉⁿᵗᵃᶦ⁻ᶜᵃʳᵗᵒᵒⁿ ⁺¹⁸`
    }]
  }];
  var listObject = Waproto.Message.fromObject({
    'listMessage': Waproto.ListMessage.fromObject({
      'title': `┏━━⊱「 ` + myking + ' ' + pushname + ' 」',
      'buttonText': BotDB.idiomas['MCmds0'](),
      'description': `┗⊱ ` + BotDB.idiomas['MCmds1']() + ` :3`,
      'listType': 1,
      'sections': listOptions
    })
  });
  (await client.relayMessage(from, listObject, {
    'messageId': msg.key.id
  }), this.addSPAMFilter(from),
   this._user.limitInc = 1
   , this._user.addXp(this.from, 450)
   , this._user.addLevel(this.from, 2));
},
runGameover: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  if (!q.includes('|')) return this.mySendMessage(BotDB.idiomas.MyReg());
  
    const text1 = q.split('|')[0]
    const text2 = q.split('|')[1]
    this.showWaitMessage(BotDB.idiomas.ProCes(pushname))
    
  let myStyle = `https://textpro.me/video-game-classic-8-bit-text-effect-1037.html`;
  try {
    var apiResponse = await Utils.fetchJson('https://nk-api.vercel.app/api/tpro2?apikey=' + MyApiKey + `&estilo=` + myStyle + '&text1=' + text1 + `&text2=` + text2);
  } catch (_0x15295d) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x4e7a65 = apiResponse.resultado['logo'];
  
    LibraryDB.textpro.run(myStyle, ['' + text1, '' + text2]).then(async _0x472323 => {
   
    this.sendMessageCOMMAND({
      'url': _0x472323
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(_0x394820 => {
    
    this.sendMessageCOMMAND({
      'url': _0x4e7a65
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runPornhub: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  if (!q.includes('|')) return this.mySendMessage(BotDB.idiomas.MyReg());
  
    const text1 = q.split('|')[0]
    const text2 = q.split('|')[1]
    this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let tpResponse = `https://textpro.me/pornhub-style-logo-online-generator-free-977.html`;
  try {
    var apiResponse = await Utils.fetchJson('https://nk-api.vercel.app/api/tpro2?apikey=' + MyApiKey + '&estilo=' + tpResponse + `&text1=` + text1 + `&text2=` + text2);
  } catch (err) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x4292f6 = apiResponse.resultado['logo'];

    LibraryDB.textpro.run(tpResponse, ['' + text1, '' + text2]).then(async _0x4287f5 => {
    
    this.sendMessageCOMMAND({
      'url': _0x4287f5
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(_0x181813 => {
    
    this.sendMessageCOMMAND({
      'url': _0x4292f6
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runHalloween: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let _0x49069d = `https://textpro.me/halloween-fire-text-effect-940.html`;
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + `&estilo=` + _0x49069d + '&text1=' + q);
  } catch (_0x4f14ce) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let logo = apiResponse.resultado['logo'];
  
  LibraryDB.textpro.run(_0x49069d, '' + q)
  .then(async _0x10c9f8 => {
    
    this.sendMessageCOMMAND({
      'url': _0x10c9f8
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': logo
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();

},
runLava: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let _0x68fd79 = 'https://textpro.me/lava-text-effect-online-914.html';
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + '&estilo=' + _0x68fd79 + `&text1=` + q);
  } catch (err) {
    console.log(`Error fetch, err: ` + err);
    console.log('Error fetch, comando: ' + command);
  }
  let logo = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(_0x68fd79, '' + q).then(async _0x426aa6 => {
    
    this.sendMessageCOMMAND({
      'url': _0x426aa6
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
   
    this.sendMessageCOMMAND({
      'url': logo
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runToxico: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let _0x277b29 = `https://textpro.me/toxic-text-effect-online-901.html`;
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + `&estilo=` + _0x277b29 + `&text1=` + q);
  } catch (err) {
    console.log(`Error fetch, err: ` + err);
    console.log('Error fetch, comando: ' + command);
  }
  let _0x24f4b0 = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(_0x277b29, '' + q).then(async _0xcf6c57 => {
    
    this.sendMessageCOMMAND({
      'url': _0xcf6c57
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x24f4b0
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runHotmetal: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  this.showWaitMessage(BotDB.idiomas.ProCes(pushname));
  let tpResponse = 'https://textpro.me/hot-metal-text-effect-843.html';
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + '&estilo=' + tpResponse + `&text1=` + q);
  } catch (err) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x529388 = apiResponse.resultado['logo'];
  
    LibraryDB.textpro.run(tpResponse, '' + q).then(async _0x1f54ef => {
    
    this.sendMessageCOMMAND({
      'url': _0x1f54ef
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(_0x5169c4 => {
    
    this.sendMessageCOMMAND({
      'url': _0x529388
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
runThunder: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(excBold + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas.NoTexto());
  this.showWaitMessage('_Espere ' + pushname + `, estoy trabajando en su solicitud..._`);
  let tpResponse = 'https://textpro.me/create-thunder-text-effect-online-881.html';
  try {
    var apiResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/tpro1?apikey=` + MyApiKey + `&estilo=` + tpResponse + '&text1=' + q);
  } catch (_0x2c9f66) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  let _0x58fa90 = apiResponse.resultado['logo'];
  LibraryDB.textpro.run(tpResponse, '' + q).then(async _0x424c6c => {
   
    this.sendMessageCOMMAND({
      'url': _0x424c6c
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro1(command,q,pushname));
  }).catch(err => {
    
    this.sendMessageCOMMAND({
      'url': _0x58fa90
    }, BotDB.images.crearHD, BotDB.idiomas.ImageTextPro2(command,q,pushname));
  })
  this.setUserConstraints();
},
showProfileInfo: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  var _0x5ddc81 = speed()
  var _0x153281 = speed() - _0x5ddc81;
  const neww = performance.now()
  const oldd = performance.now()
  let myCpuInfo = ''
  if(this.cpuInfo[0]) {
    myCpuInfo = `_Total CPU Usage_`
    + this.cpuInfo[0]['model'].trim() + ' ('
    + this.myCPUInfo.speed + ' MHZ)\n'
    + Object.keys(this.myCPUInfo.times).map(_0x30345c => `- *` + (_0x30345c + '*').padEnd(6) + ': ' + (100 * this.myCPUInfo.times[_0x30345c] / this.myCPUInfo.total).toFixed(2) + '%').join(nl)
    + `_CPU Core(s) Used (`
    + this.cpuInfo.length
    + ` Core CPU)_`
    + this.cpuInfo.map((_0x471afc, _0x3c7613) => _0x3c7613 + 1
    + '. ' + _0x471afc['model'].trim()
    + ' (' + _0x471afc.speed
    + ` MHZ)`
    + Object.keys(_0x471afc.times).map(_0x31a3f1 => '- *' + (_0x31a3f1 + '*')['padEnd'](6) + ': ' + (100 * _0x471afc.times[_0x31a3f1] / _0x471afc.total).toFixed(2) + '%').join(nl)).join('\n\n')
  }
            
  const respon = (`》 *BOT : (active)* 《 `
  + nwn
  + nl
  + '┏─━─━━──━━─━─┓'
  + nl
  + '➪ *'
  + BotDB.idiomas.ProfileVersion
  +'_0.1.0-beta.2_*'
  + nl
  + '➪ * Whatsapp NickName: _'
  + client.user['name']
  + nl
  + '_*➪ *Today Hits: _'
  + BotDB.todayHits.length
  + nl
  + '_*➪ *'
  + BotDB.idiomas.ProfileExecTime
  +' _'
  + BotDB.runtime
  + nl
  + '._*➪ *'
  + BotDB.idiomas.Library
  + ': _Baileys-MD_*➪ *'
  + nl
  + BotDB.idiomas.ProfilePlataform
  + '_'
  + os['platform']()
  + nl
  + 'n_*➪ *'
  + BotDB.idiomas.ProfileConnection
  +'_'
  + _0x153281.toFixed(4)
  + nl
  + ' S._*➪ *'
  + BotDB.idiomas.ProfileSpeed
  +'_'
  + (oldd - neww)
  + nl
  + ' MLS._*➪ *RAM: _'
  + Utils.formatp(os['totalmem']() - os.freemem())
  + ' Restantes De '
  + Utils.formatp(os['totalmem']())
  + nl
  + '_*➪ *Base OS: _'
  + os['type']()
  + nl
  + '_*➪ *'
  + BotDB.idiomas.ProfileArch
  +  '_'
  + os.arch()
  + '_*'
  + nl
  + '➪ *Host: _'
  + os['hostname']()
  + '_*'
  + nl
  + '➫ *'
  + BotDB.idiomas.ProfileMemory
  +'*'
  + nl
  + Object.keys(this.usedMem).map((_0x1d774e, _0x4c9898, _0x3306b8) => _0x1d774e['padEnd'](Math['max'](..._0x3306b8.map(_0x117d4c => _0x117d4c.length)), ' ')
  + ': '
  + Utils.formatp(this.usedMem[_0x1d774e])).join(nl)
  + `➫ `
  + myCpuInfo
  + nl
  + '┗─━─「 ✵ 」━─━─┛').trim()

  const mediaMessage = {
    'image': BotDB.images.perfil ,
    'jpegThumbnail': BotDB.images.logo
  }
  const mediaOptions = {
    'upload': client.waUploadToServer
  }

  var myPrepMedia = await prepareWAMessageMedia(mediaMessage, mediaOptions);
  const myFooter = {
    'displayText': Utils.dateComplete,
    'url': `https://git.creasp.org.br/rasputtim/bodao-bot`
  }
  const myWAMessageContent = Waproto.Message.fromObject({
    'templateMessage': {
      'hydratedTemplate': {
        'imageMessage': myPrepMedia.imageMessage,
        'hydratedContentText': respon,
        'hydratedButtons': [{
          'urlButton': myFooter
        }]
      }
    }
  })
  const myMessageGenerationOptionsFromContent = {
    'userJid': from,
    'quoted': this.msgQuote
  }
  //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
  const media = generateWAMessageFromContent(from,myWAMessageContent , myMessageGenerationOptionsFromContent);
  client.relayMessage(from, media.message, {
    'messageId': media.key.id
  })
  this.setUserConstraints();
},

*/
/*
        runOtakutest: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isAnimeModeOn) return;
          if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
          let questions = [__('get bullied for being an otaku?'), `uwu?`, __(`you know how to sing some opening?`), __('you take a bath?')
          , __(`are you social or antisocial?`), __(`you imitate some movement of an anime character?`),
          __(`some anime that makes you laugh out loud?`), __(`the most kawaii character that you like?`),
          __('do you like lolis?'), __(`do you know or have you seen any cosplayers?`), __(`what is being an otaku for you?`),
          __(`would you recommend 5 animes, like which ones?`), __('anime you don\'t like'), __(`anime you hate the most`),
          __(`power you would like to have from an anime character`), __(`would you like to live your life like in an anime? Like which one?`),
          __(`anime character you're in love with?`), __(`if you were reincarnated in an anime world, what would it be?`),
          __('do you know what onichan means?'), __(`Have you ever sung the opening of your favorite anime?`),
          __(`what kind of anime do you like the most?`), __(`do you make drawings or manga?`), __(`openings that you don't stop listening to`),
          __( 'do you like h3nta1?'), __('Do you know Japanese words?'), __(`How often do you watch anime?`),
          __(`Do you go or have you gone to anime and manga conventions?`), __(`What anime do you watch or have you watched recently?`),
          __(`Do you listen to songs/openings from your favorite series?`), __(`How many anime series have you watched?`),
          __('Would you like to meet someone who has the same qualities as your favorite anime character?'),
          __(`What is being an otaku for you?`), __(`Did you start this alone or did a friend or relative start you?`),
          __(`Which is the genre you like the most?`), __(`anime with which you cried?`), __(`name of the author of naruto?`),
          __(`name of the author of dragon ball?`), __(`do you read any manga? title?`), __('are you attentive to the release of new animes?'),
          __(`Does any family member know that you are an otaku?`), __('Do your friends know that you are an otaku?'), __(`Do you have any posters, pillows, toys, decorations from an anime?`),
          __(`What did you think of the bocu no pico anime? If you haven't seen it, I recommend it!!!`), __(`Do you like NTR?`),
          __(`did you see a yaoi anime? name?`), __(`what do you do if someone badmouths your fav anime?`),
          __(`they give you money to watch legal anime, would you continue to watch it illegally?`),
          __(`would you like to go to japan? why?`), __(`who do you think is stronger goku or saitma?`),
          __(`what do you think of the classic|old anime?`), __('What is the name of Naruto\'s Son according to the manga?'),
          __(`first anime you watched?`), __(`anime you watched and didn't like?`), __(`animes you want to watch but haven't seen?`),
          __(`your anime crush?(waifu)(husbando)`), __(`favorite anime couple did you see?`), __(`best anime villain?`),
          __(`best anime fight you saw?`), __(`saddest scene you saw in an anime?`),
          __('anime character who is similar to you?'), __('old anime that doesn\'t go out of style for you?'),
          __(`pets|favorite anime animals?`), __(`what anime do you think has the best animation?`),
          __('second favorite anime character(female)?'), __('favorite main anime character(female)?'),
          __(`favorite main anime(male) character?`), __(`favorite secondary anime(male) character?`),
          __(`the most epic anime scene for you?`), __(`anime character that makes you nervous?`),
          __(`favorite weapon from an anime you saw?`), __(`the saddest death in an anime you saw?`),
          __(`the best anime fight?`), __(`the coolest anime scene for you?`),
          __('an anime you wish was real?'), __(`favorite phrase of an anime character?`),
          __(`anime you wish would never end?`), __(`name of your favorite anime?`)];
          let ramdomQuestion = this.selectRamdomFromArray(questions);
          let theQuestion = '▪︎ ' + AtSenderNUMBER + nl + '▪︎ _*' + ramdomQuestion + `*_ `;
          this.sendMentionedMessage(theQuestion)
          this.setUserConstraints();
        }, */
/*
  runHimnootaku: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    
      this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
      const apiResponse = BotDB.getAudioUwu('flp.m4a')
      client.sendMessage(from, {
      'audio': apiResponse,
      'contextInfo': {
        'externalAdReply': {
          'title': pushname + ` 🎧`,
          'mediaType': 2,
          'thumbnail': BotDB._imgDJBotHD,
          'previewType': 'VIDEO',
          'mediaUrl': Bot.CHANNEL_ANIME_VIDEO
        }
      },
      'fileName': `HimnOtaku.mp3`,
      'mimetype': 'audio/mpeg',
      'ptt': true
    }, {
      'quoted': this.audioQuote
    })
    this.setUserConstraints()
    
  },
  runReconime: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    try {
      var apiResponse = await Utils.fetchJson(`https://pastebin.com/raw/ZQjU0P6Z`);
    } catch (_0x505c4b) {
      this.logger.error(BotDB.idiomas.ErrorFetch(command));
    }
    (client.sendMessage(from, {
      'image': BotDB._imgAnimVers,
      'caption': apiResponse['recomendacion']
    }, {
      'quoted': this.msgQuote
    }), console.log(`⡏⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠋⠉⠉⠉⠉⠉⠉⠉⠉⠉⠉⠙⠉⠉⠉⠹
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
`), this.setUserConstraints());
  },
  runWait: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    if (!quoted) return this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
    if (!this.isImage) return this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
    if (this.isWebP) return this.mySendMessage(BotDB.idiomas['QuImage'](Bot.prefix, command));
    this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
    let media = await client.downloadAndSaveMediaMessage(quoted);
    if (this.isImage) {
      let _0xd640ed = await LibraryDB.ScrapMini.TelegraPh(media);
      const _0x34f1de = await Utils.fetchJson('https://api.trace.moe/search?cutBorders&url=' + encodeURIComponent('' + _0xd640ed));
      this.sendMentionedMessage('' + (_0x34f1de.result[0].similarity < 0.89 ? __('If the result is not what you expected, try using a good resolution image of an "anime" scene') + '  ' : __('I do not guarantee that the result is 100% accurate')+ ' '));
      let _0x4907b3 = await Utils.getBuffer(_0x34f1de.result[0].video), _0x23dd91 = await Utils.getBuffer(_0x34f1de.result[0]['image']);
      client.sendMessage(from, {
        'document': {
          'url': _0x34f1de.result[0]['video']
        },
        'contextInfo': {
          'externalAdReply': {
            'title': `🎴 `+ __('Episode') + ': ' + (_0x34f1de.result[0]['episode'] ? _0x34f1de.result[0]['episode'] : __(`Not Found u.u`)),
            'body': `🔮 `+__('similarity to the picture')+ ' ' + (_0x34f1de.result[0].similarity * 100).toFixed(1) + '%',
            'previewType': 'PHOTO',
            'thumbnailUrl': '',
            'thumbnail': _0x23dd91,
            'sourceUrl': '' + _0x34f1de.result[0]['video']
          }
        },
        'mimetype': 'video/mp4',
        'fileName': '🔖' + _0x34f1de.result[0].filename,
        'jpegThumbnail': _0x23dd91
      }, {
        'quoted': this.msgQuote
      }).catch(_0x56bdb6 => {
        
        (console.log(_0x56bdb6), this.mySendMessage(BotDB.idiomas.Erreply()));
      });
    } else {
      if (!this.isImage) {
        let _0x1e3ac0 = await LibraryDB.ScrapMini.UploadFile(media);
        const _0x1528ec = await Utils.fetchJson(`https://api.trace.moe/search?cutBorders&url=` + encodeURIComponent('' + _0x1e3ac0));
        this.sendMentionedMessage('' + (_0x1528ec.result[0].similarity < 0.89 ? `Si el resultado no es lo que esperabas, prueba usar una imagen con buena resolución de una escena "anime" ` : `No te aseguro que el resultado sea 100% preciso `));
        let _0x117344 = await Utils.getBuffer(_0x1528ec.result[0].video);
        let myContent = {
          'video': _0x117344,
          'fileName': `QueAnime?.mp4`,
          'mimetype': `video/mp4`,
          'caption': `🔖Name ` + ': ' + _0x1528ec.result[0].filename + `
🎴Episodio : ` + (_0x1528ec.result[0]['episode'] ? _0x1528ec.result[0]['episode'] : `Not Found u.u`) + '\n🔮Similitud a la imagen ' + (_0x1528ec.result[0].similarity * 100).toFixed(1) + `%
⛓️Url de descarga ` + ': ' + _0x1528ec.result[0]['video'] + nl
        }
        const myOption = {
          'quoted': this.msgQuote
        }
        
        client.sendMessage(from, myContent, myOption);
      }
    }
    
      await fs.unlinkSync(media)
      this.addSPAMFilter(from)
      this._user.limitInc = 1
      this._user.limitInc = 1
      this._user.addXp(this.from, 450)
      this._user.addLevel(this.from, 1)
      
  },
  runAnifrase: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    
    try {
      var _0x3656fb = await Utils.fetchJson(`https://animechan.vercel.app/api/random`)
      var _0xa3f904 = await Utils.fetchJson(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=` + _0x3656fb.quote);
    } catch (err) {
      console.log(__(`Error fetch, err`) + ': ' + err);
      console.log(__('Error fetch, comand')+': ' + command);
    }
    
      this.sendMentionedMessage(nl
      + '  🎴'+__('Anime') + ': ' + _0x3656fb['anime']
      + nl + '  🀄'+__('Character') + ': ' + _0x3656fb['character']
      + nl + '  🧧'+__('Phrase') + ': ' + _0xa3f904[0][0][0] + nl)
      this.setUserConstraints();
  },
  runWaifu: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    try {
      var nekosResponse = await Utils.fetchJson('https://waifu.pics/api/sfw/waifu');
    } catch (_0x2ae187) {
      this.logger.error(BotDB.idiomas.ErrorFetch(command));
    }
    var buffer = await Utils.getBuffer(nekosResponse.url);
    (this.sendMessageCOMMAND(buffer, BotDB._imgMyAnime, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER)), this.setUserConstraints());
  },
  runWaifuHD: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    try {
      var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/waifu`);
    } catch (err) {
      this.logger.error(BotDB.idiomas.ErrorFetch(command));
    }
    var buffer = await Utils.getBuffer(nekosResponse['url']);
    var myContent = {
      'image': buffer,
      'jpegThumbnail': BotDB._imgMyAnime,
      'caption': BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER),
      'fileLength': 69000000000,
      'mentions': [this._sender]
    }
    const myOptions = {
      'ephemeralExpiration': "0x18*0xe10",
      'quoted': {
        'key': {
          'fromMe': false,
          'participant': '0@s.whatsapp.net',
          'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
        },
        'message': {
          'orderMessage': {
            'itemCount': 737,
            'status': 200,
            'thumbnail': this.sendThumb,
            'surface': 200,
            'message': pushname + ` [_>] ` + command,
            'orderTitle': Bot.packWm,
            'sellerJid': '0@s.whatsapp.net'
          }
        }
      }
    }
    client.sendMessage(from, myContent,myOptions)
    this.addSPAMFilter(from)
    this._user.limitInc = 1
    this._user.addXp(this.from, 450)
    this._user.addLevel(this.from, 1)
  },
  runFaceHD: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    try {
      var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/gasm`);
    } catch (err) {
      console.log(__(`Error fetch, err`) + ': ' + err);
    console.log(__('Error fetch, comand')+': ' + command);
    }
    var buffer = await Utils.getBuffer(nekosResponse['url']);
    (client.sendMessage(from, {
      'image': buffer,
      'jpegThumbnail': BotDB._imgMyAnime,
      'caption': BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER),
      'fileLength': 737000000000000,
      'mentions': [this._sender]
    }, {
      'ephemeralExpiration': "0x18*0xe10",
      'quoted': {
        'key': {
          'fromMe': false,
          'participant': '0@s.whatsapp.net',
          'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
        },
        'message': {
          'orderMessage': {
            'itemCount': 737,
            'status': 200,
            'thumbnail': this.sendThumb,
            'surface': 200,
            'message': pushname + ` [_>] ` + command,
            'orderTitle': Bot.packWm,
            'sellerJid': '0@s.whatsapp.net'
          }
        }
      }
    }), this.setUserConstraints());
  },
  runAnimeWallPaper: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    try {
      var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/wallpaper`);
    } catch (_0x53bd25) {
      this.logger.error(BotDB.idiomas.ErrorFetch(command));
    }
    var buffer = await Utils.getBuffer(nekosResponse['url']);
    
      this.sendMessageCOMMAND(buffer, BotDB._imgMyAnime, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
      this.setUserConstraints();
  },
  runNekos: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    var animeTypes = ['neko`, `fox_girl`, `kemonomimi'], _0x1f64ce = this.selectRamdomFromArray(animeTypes);
    try {
      var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/` + _0x1f64ce);
    } catch (err) {
      this.logger.error(BotDB.idiomas.ErrorFetch(command));
    }
    var buffer = await Utils.getBuffer(nekosResponse['url']);
    
      this.sendMessageCOMMAND(buffer, BotDB._imgMyAnime,BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
      , this.setUserConstraints()
  },
  runNekos2: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    try {
      var nekosResponse = await Utils.fetchJson('https://nekos.best/api/v1/nekos');
    } catch (_0x1a50c7) {
      this.logger.error(BotDB.idiomas.ErrorFetch(command));
    }
    var buffer = await Utils.getBuffer(nekosResponse.url);
    
      this.sendMessageCOMMAND(buffer, BotDB._imgMyAnime, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
      this.setUserConstraints()
      
  },
  runNekos3: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    try {
      var nekosResponse = await Utils.fetchJson(`https://waifu.pics/api/sfw/neko`);
    } catch (err) {
      console.log(__(`Error fetch, err`) + ': ' + err);
    console.log(__('Error fetch, comand')+': ' + command);
    }
    var buffer = await Utils.getBuffer(nekosResponse['url']);
    
      this.sendMessageCOMMAND(buffer, BotDB._imgMyAnime, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
      this.setUserConstraints();
  },
  runSnime: async (commandObj) =>
  {
    if (isBanned) return;
    if (!this.isBotController && this._user.isLimited) return;
    if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
    if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
    if (!isAnimeModeOn) return;
    if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
    this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
    var animeTypes = [`smug`, `hug`, 'slap', `kiss`, `tickle`, 'ngif']
    var _0x1f64ce = this.selectRamdomFromArray(animeTypes);
    try {
      var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/` + _0x1f64ce);
    } catch (_0x5e5730) {
      this.logger.error(BotDB.idiomas.ErrorFetch(command));
    }
    var buffer = await Utils.getBuffer(nekosResponse.url)
    var _0x13f676 = await client.sendVideoAsSticker(from, buffer, msg, {
      'packname': '' + groupName,
      'author': '' + (NameBot ? NameBot : Bot.botName)
    });
    
      await fs.unlinkSync(_0x13f676.buffer)
      this.setUserConstraints()
      
      
  },*/
/*
runTraductor: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
try {
  var textojid = msg.quoted.text;
} catch {
  textojid = q;
}
try {
  var _0x1f921e = await Utils.fetchJson('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=' + midioma + `&dt=t&q=` + textojid);
} catch (err) {
  console.log(__(`Error fetch, err`) + ': ' + err);
  console.log(__('Error fetch, comand')+': ' + command);
}

  this.sendMentionedMessage(_0x1f921e[0][0][0])
  this.setUserConstraints()
},
runPinterest: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
let _0x29abb2 = await hx['pinterest'](q)
, _0x37ad46 = this.selectRamdomFromArray(_0x29abb2)
, _0x2a7c81 = await Utils.getBuffer(_0x37ad46);

  this.showImageFromURLWithPushName(_0x2a7c81, `*`+ `[ PINTEREST-CHAN ]`+` ✓*`
  + nl + '*~> ' + __('Result for') + '* : _' + q + '_')
this.setUserConstraints()
},
runImagen: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
let theResults = promisify(imgugul);
for (let _0x3f7947 = 0; _0x3f7947 < 1; _0x3f7947++) {
  let results = await theResults('' + q) || [];
  let {url: _0x317a23, width: _0x4f7bcc, height: _0x2a313f} = this.selectRamdomFromArray(results) || ({});
  if (!_0x317a23) return this.mySendMessage(BotDB.idiomas.Erreply());
  this.showImageFromURLWithPushName({
    'url': _0x317a23
  }, `*[ `+ 'GOOGLE-CHAN' +` ] ✓*`
  + nl + '*~> ' + __('Result for') + '* : _' + q + `_`
  + nl + '*~> ' + __('Size') + '* : _' + _0x4f7bcc + ` x ` + _0x2a313f + ' PX_');
}
this.setUserConstraints()
},
runGoogle: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
let _0x3eeda3 = await google({
  'query': q
})
let _0x1e8e27 = '';
for (let _0x215ffe of _0x3eeda3) {
  _0x1e8e27 += `*` + __('Title') + ':* '
  + _0x215ffe.title + nl +`*` + __(`Link`) + ':* '
  + _0x215ffe.link
  + nl +`*` + __(`Content`) + ':* ' + _0x215ffe.snippet + '\n\n';
}
var _0x105c70 = _0x1e8e27.trim();
this.showImageFromURLWithPushName(BotDB.getImageJpg('GugulHD'), `〘  *GOOGLE* 〙`
+ nl +`_~> ` + __('Results for') + ': ' + q + '_\n' + nwn + nl + _0x105c70)
this.setUserConstraints();
},
runWikipedia: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
var media = await LibraryDB.ScrapMini.wikipedia(q).catch(_0x30fe92 => {
  return this.mySendMessage(BotDB.idiomas.Erreply());
});
this.showImageFromURLWithPushName( media[0].thumb, `|| *WIKIPEDIA* ||` + nl
+ `_~> ` + __('Results for') + ': ' + q + '_\n' + nwn + nl + media[0]['wikip'])
this.setUserConstraints();
},
runPlaystore: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
let _0x410ac1 = await hx['playstore'](q), _0x5960ee = `*「 PLAY-STORE 」*`
+ nl + '*~> ' + __('Result for') + '* : _' + q + `_`
+ nl + `*==========⊹⊱✫⊰⊹==========*` + nwn;
for (let _0x146ab6 of _0x410ac1) {
  _0x5960ee += nl + '- *' + __('Name')+ '*: _'
  + _0x146ab6['name']
  + '_' + nl + '- *'+ __('direct link') +'*: _'
  + _0x146ab6['link']
  + '_' + nl + '- *'+ __('Developer') + '*: _'
  + _0x146ab6['developer']
  + '_' + nl + '- *'+ __('Developer Link') + '*: _'
  + _0x146ab6['link_dev'] + `_`
  + nl + `*==========⊹⊱✫⊰⊹==========*`;
}

const myWAMessageContent = Waproto.Message.fromObject({
  'templateMessage': {
    'hydratedTemplate': {
      'hydratedContentText': _0x5960ee,
      'locationMessage': {
        'jpegThumbnail': BotDB.getImageJpg('GplayHD')
      },
      'hydratedFooterText': `🎮 ` + NameBot,
      'hydratedButtons': [{
        'urlButton': {
          'displayText': q,
          'url': _0x410ac1[0]['link']
        }
      }]
    }
  }
})

const myMessageGenerationOptionsFromContent = {
  'userJid': sender,
  'quoted': this.msgQuote
}



//jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
const media = generateWAMessageFromContent(from, myWAMessageContent, myMessageGenerationOptionsFromContent);
await client.relayMessage(from, media.message, {
  'messageId': media.key.id
});
return this.setUserConstraints();
},
runRandimg: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
try {
  var apiResponse = await Utils.getBuffer(`https://pastebin.com/raw/EUHNaCAH`);
} catch (err) {
  console.log(__(`Error fetch, err`) + ': ' + err);
  console.log(__('Error fetch, comand')+': ' + command);
}

  const jsonData = JSON.parse(apiResponse)
  let randKey = this.selectRamdomFromArray(jsonData)
var _0x34c901 = [{
  'buttonId': '' + (Bot.prefix + command),
  'buttonText': {
    'displayText': `< [ OTRO ] >`
  },
  'type': 0x1
}];
let _0xddf000 = {
  'image': {
    'url': randKey.result
  },
  'caption': '💾',
  'footer': NameBot + '\nᴺᴼᵀᴬ⁼ ᴱˢᵗᵃ́ˢ ᶦᵐᵃ́ᵍᵉⁿᵉˢ ⁿᵒ ᵖᵘᵉᵈᵉⁿ ᶜᵒⁿᵛᵉʳᵗᶦʳˢᵉ ᵃ ˢᵗᶦᶜᵏᵉʳˢ',
  'buttons': _0x34c901,
  'headerType': 0x4
};

  client.sendMessage(from, _0xddf000, {
  'quoted': msg
})
 this.setUserConstraints();
},
runDjbot: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
try {
  var apiResponse = await Utils.getBuffer('https://pastebin.com/raw/W8jLrvcq');
} catch (_0x56701f) {
  this.logger.error(BotDB.idiomas.ErrorFetch(command));
}

  const jsonData = JSON.parse(apiResponse)
  
  const randKey = this.selectRamdomFromArray(jsonData)
  const nkptt = await Utils.getBuffer(randKey['resulptt'])
  client.sendMessage(from, {
  'audio': nkptt,
  'contextInfo': {
    'externalAdReply': {
      'title': pushname + ` 🎧`,
      'mediaType': 2,
      'thumbnail': BotDB._imgDJBotHD,
      'previewType': `VIDEO`,
      'mediaUrl': Bot.CHANNEL_ANIME_VIDEO
    }
  },
  'fileName': `DjQuantum.mp3`,
  'mimetype': 'audio/mpeg',
  'ptt': true
}, {
  'quoted': this.audioQuote
})
this.setUserConstraints();
},*/
/*
runGruposwa: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  
  try {
    var apiResponse = await Utils.fetchJson(`https://pastebin.com/raw/sCFzTy2K`);
  } catch (err) {
    console.log(__(`Error fetch, err`) + ': ' + err);
    console.log(__('Error fetch, comand')+': ' + command);
  }

  const msg = {
    'text': apiResponse['gplinks'] + (nwn
      + nl + `ᴺᴼᵀᴬ" ˢᶦ ᵉⁿ ᵉˢᵗᵉ ᵍʳᵘᵖᵒ ᵉˢᵗᵃ́ ᵖʳᵒʰᶦᵇᶦᵈᵒ ᶜᵒᵐᵖᵃʳᵗᶦʳ ˡᶦⁿᵏˢ• ˡᵒˢ ᵃᵈᵐᶦⁿᶦˢᵗʳᵃᵈᵒʳᵉˢ ᵗᶦᵉⁿᵉⁿ ᵗᵒᵈᵒ ᵉˡ ᵈᵉʳᵉᶜʰᵒ ᵃ ᵉˡᶦᵐᶦⁿᵃʳ ᵃˡ ᵇᵒᵗ ⁻`),
    'contextInfo': {
      'externalAdReply': {
        'title': pushname + ` Quieres agregar tu grupo :D?`,
        'body': `Toca aqui ;3`,
        'previewType': 'PHOTO',
        'thumbnailUrl': '',
        'thumbnail': this.picThumb,
        'sourceUrl': `https://api.whatsapp.com/send?phone=${ Bot.CREATOR_NUMBER}&text=Wenasss!%0ADeseo%20agregar%20mi%20grupo%20al%20comando%20del%20bot%0AAsunto%20del%20grupo%3A%20%0ALink%3A%20`
      }
    }
  };
  const opt = {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': this.msgQuote
  };
   client.sendMessage(from, msg, opt)
   this.setUserConstraints()
  
},

runCovid: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
  try {
    var apiResponse = await Utils.fetchJson('https://coronavirus-19-api.herokuapp.com/countries/' + (q ? q : `world`));
  } catch (err) {
    console.log(__(`Error fetch, err`) + ': ' + err);
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }


  const myWAMessageContent= Waproto.Message.fromObject({
    'templateMessage': {
      'hydratedTemplate': {
        'hydratedContentText': monospace
        + `[ COVID-19 ]`
        + monospace
        + nl + nl +'🌁 ' + __('Place') + ': '
        + (q ? q : __('World'))
        + nl + `🫁 ` + __('Positive cases') + ': '
        + apiResponse.cases
        + nl + '🤧 ' + __('Today\'s Cases') + ': '
        + apiResponse['todayCases']
        + nl + `💀 ` + __('Deceased') + ': '
        + apiResponse['deaths']
        +  nl + `⚰️ ` + __('Deceased today') + ': '
        + apiResponse['todayDeaths']
        +  nl + '🤒 ' + __('Recovered') + ': '
        + apiResponse.recovered
        + nl + `😷 ` + __('In recovery') + ': '
        + apiResponse.active
        + nl + '😵 ' + __('Critical cases') + ': '
        + apiResponse['critical']
        + nl + '🫂 ' + __('Cases per million') + ': '
        + apiResponse.casesPerOneMillion
        + nl + `☠️ ` + __('Deaths per million') + ': '
        + apiResponse['deathsPerOneMillion']
        + nl + `💉 ` + __('Total Tests') + ': '
        + apiResponse.totalTests
        + nl + `🔬 ` + __('Tests per million') + ': '
        + apiResponse['testsPerOneMillion'],
        'locationMessage': {
          'jpegThumbnail': BotDB.getImageJpg('MultiHD')
        },
        'hydratedFooterText': '🦠 ' + NameBot,
        'hydratedButtons': [{
          'urlButton': {
            'displayText': `COVID-MUNDO 🌎`,
            'url': `https://www.worldometers.info/coronavirus/#countries`
          }
        }]
      }
    }
  })

  const myMessageGenerationOptionsFromContent = {
    'userJid': sender,
    'quoted': this.msgQuote
  }
  //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
  const myMedia = generateWAMessageFromContent(from, myWAMessageContent, myMessageGenerationOptionsFromContent );
  
  
  await client.relayMessage(from, myMedia.message, {
    'messageId': myMedia.key.id
  });
  return  this.setUserConstraints()
},
runClima: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(boldSign + exc + __(' Introduzca el Name de la City'));
  this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
  try {
    var apiResponse = await Utils.fetchJson(`http://api.openweathermap.org/data/2.5/weather?q=` + q + `&APPID=bf7edee0001ec62e54c9364f1067d6d8&units=metric`);
  } catch (err) {
    console.log(__(`Error fetch, err`) + ': ' + err);
    console.log(__('Error fetch, comand') + ': ' + command);
  }
  var _0x4c55bc = apiResponse['weather'], _0x4a1be0 = apiResponse.main, _0x1d4a06 = apiResponse['coord'];
  
    const loc = {
    'degreesLatitude': _0x1d4a06.lat,
    'degreesLongitude': _0x1d4a06['lon'],
    'jpegThumbnail': BotDB.mythumb
  }
  await client.sendMessage(from, {
    'caption': '🧿',
    'location': loc,
    'mentions': [this._sender]
  })
  this.sendMentionedMessage(monospace
    + `[ ` + __('CLIMATE') + ` ]`
  + monospace
  + nl + `📆 ` + __('Date') + ': '
+ time
+ nl + `🌁 ` + __('City') + ': '
+ apiResponse['name']
+ nl + `🗺️ ` + __('Timezone') + ': '
+ apiResponse.timezone
+ nl + '📄 ' + __('Description') + ': '
+ _0x4c55bc[0]['description']
+ nl + '🌡️ ' + __('Temperature') + ': Min '
+ _0x4a1be0['temp_min']
+ `ºC / Max `
+ _0x4a1be0['temp_max']
+ 'ºC'
+ nl + '🎭 ' + __('Sensation') + ': '
+ _0x4a1be0['feels_like']
+ nl + `🏞️ ` + __('Atmospheric pressure') + ': '
+ _0x4a1be0.pressure
+ 'milibars'
+ _0x4a1be0['humidity']
+ `%`
+ nl + `👁️ Visibility` + ': '
+ apiResponse.visibility
+ `msnm`
+ nl + `🌪️ ` +__('Wind: Speed') + ` `
+ apiResponse.wind.speed
+ `km/h`
+ nl + `☁️ ` +__('Clouds') + ': '
+ apiResponse['clouds'].all + '%')
this.setUserConstraints();
},
runGithub: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
  try {
    var apiResponse = await Utils.fetchJson(`https://api.github.com/users/` + (q ? q : `Bodão Corp`));
  } catch (err) {
    console.log(__(`Error fetch, err`) + ': ' + err);
    console.log(__('Error fetch, comand')+': ' + command);
  }
  var _0x33b284 = apiResponse.login
  var _0x54160d = await Utils.getBuffer(apiResponse['avatar_url']);
  
  const myWAMessageContent = Waproto.Message.fromObject({
    'templateMessage': {
      'hydratedTemplate': {
        'hydratedContentText': monospace
        + `[ ` +__('User-GITHUB') + `-🐱 ]`
        + monospace
        + nl + '🧿 ' + __('ID') + ': ' + apiResponse.id
        + nl + '⚡ ' + __('User') + ': '
        + apiResponse['login']
        + nl + `🔥 ` + __('Name') + ': '
        + apiResponse.name
        + nl + '🫂 '+ __('Followers') + ': '
        + apiResponse['followers']
        + nl + '🤝 '+ __('Following') + ': '
        + apiResponse['following']
        + nl + `🧰 ` + __('Repositories') + ': '
        + apiResponse['public_repos']
        + nl + `🏗️ ` + __('Company') + ': ' + apiResponse['company']
        + nl + `🧑‍💻 ` + __('Blog') + ': ' + apiResponse['blog']
        + nl + `🌎 ` + __('Location') + ': ' + apiResponse.location
        + nl + '📈 '+ __('Creation Date') + ': '
        + apiResponse['created_at']
        + nl + `📉 ` + __('Last Update') + ': '
        + apiResponse['updated_at']
        + nl + `📜 ` + __('Biography') + ': '
        + apiResponse['bio'],
        'locationMessage': {
          'jpegThumbnail': _0x54160d
        },
        'hydratedFooterText': `GITHUB [_>]` + NameBot,
        'hydratedButtons': [{
          'urlButton': {
            'displayText': '</ ' + apiResponse['login'] + ' >',
            'url': apiResponse['html_url']
          }
        }]
      }
    }
  })
  
  const myMessageGenerationOptionsFromContent = {
    'userJid': sender,
    'quoted': msg
  }
  //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
  const media = generateWAMessageFromContent(from, myWAMessageContent, myMessageGenerationOptionsFromContent);
  if (_0x33b284.includes(`Bodão Corp`)) {
    client.relayMessage(from, media.message, {
    'messageId': media.key.id
    })
    await client.sendMessage(from, {
      'audio': BotDB.getAudioUwu('OP.m4a'),
      'fileName': `MiCreador.mp3`,
      'mimetype': 'audio/mpeg',
      'ptt': true
      }, {
      'quoted': this.msgQuote
    })
  } else return await client.relayMessage(from, media.message, {
    'messageId': media.key.id
  });
  this.setUserConstraints()
},
runQuotes: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  try {
    var apiResponse = await Utils.fetchJson('https://api.kanye.rest/')
    var _0x1f921e = await Utils.fetchJson('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + apiResponse['quote']);
  } catch (err) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  this.sendMentionedMessage(_0x1f921e[0][0][0])
  this.setUserConstraints()
},
runJokesTumama: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  try {
    var apiResponse = await Utils.fetchJson(`https://yomomma-api.herokuapp.com/jokes`)
    var _0x1f921e = await Utils.fetchJson('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='+Bot.numidioma+'&dt=t&q=' + apiResponse['joke']);
  } catch (err) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  this.sendMentionedMessage(_0x1f921e[0][0][0])
   this.setUserConstraints()
},*/
/*
runDices: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  this.sendMentionedMessage(`Lanzando dados...`);
  try {
    const _0xd96abe = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    
      const dadu = _0xd96abe[Math.floor(Math.random() * _0xd96abe.length)]
      const dador = BotDB.getStickerWebP(dadu)
      client.sendMessage(from, {
      'sticker': dador,
      'mentions': [this._sender]
    }, {
      'quoted': this.msgQuote
    })
  } catch (_0x3f5015) {
    const _0x15a3af = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const dadu = _0x15a3af[Math.floor(Math.random() * _0x15a3af.length)]
    const dadu2 = _0x15a3af[Math.floor(Math.random() * _0x15a3af.length)]
    this.sendMentionedMessage(dadu + `
` + dadu2)

  }
  this.setUserConstraints()
}
runDice: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  const _0x3c1efe: Array<any> = [`⚀
⚁`, `⚀
⚂`, `⚀
⚃`, `⚀
⚄`, '⚀\n      ⚅', `⚀
⚀`, `⚁
⚁`, '⚁\n      ⚂', `⚁
⚃`, `⚁
⚄`, `⚁
⚅`, `⚁
⚀`, `⚂
⚁`, `⚂
⚂`, `⚂
⚃`, `⚂
⚄`, `⚂
⚅`, `⚂
⚀`, `⚃
⚁`, `⚃
⚂`, `⚃
⚃`, '⚃\n      ⚄', `⚃
⚅`, '⚃\n      ⚀', `⚄
⚁`, `⚄
⚂`, '⚄\n      ⚃', `⚄
⚄`, '⚄\n      ⚅', `⚅
⚀`, `⚅
⚁`, `⚅
⚂`, `⚅
⚃`, `⚅
⚄`, `⚅
⚅`, `⚅
⚀`]
  const _0x88d1d8 = _0x3c1efe[Math.floor(Math.random() * _0x3c1efe.length).valueOf()]
  
  client.sendMessage(from, {
    'text': _0x88d1d8,
    'mentions': [this._sender]
  }, {
    'quoted': this.msgQuote
  })
  this.setUserConstraints()
  
},
runCupido: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  
  this.showWaitMessage(`_Generating Couple..._`)
  const jds:any = []
  const vivannn:any = BotDB.getAudioXd(`willy.m4a`)
  
  const _0x3205db = this.groupMembers ;
  const _0xf0380d = this.groupMembers ;
  const _0x237a42:any = _0x3205db[Math.floor(Math.random() * _0x3205db.length)];
  const _0x13b4f1:any = _0xf0380d[Math.floor(Math.random() * _0xf0380d.length)];
  
  const teks = `❥ *formed couple* :

┏─━─━─━∞◆∞━─━─━─┓
@`
+ _0x237a42.id.split('@')[0]
+ ' ❤️ @' + _0x13b4f1.id.split('@')[0]
+ `
┗─━─━─━∞◆∞━─━─━─┛
`
jds.push(_0x237a42.jid)
jds.push(_0x13b4f1.jid)
setTimeout(() => {
    this.sendMentionedMessage(teks);
  }, 500)
client.sendMessage(from, {
    'audio': vivannn,
    'fileName': `NoviosXD.mp3`,
    'mimetype': 'audio/mpeg',
    'ptt': true
  }, {
    'quoted': {
      'key': {
        'participant': '0@s.whatsapp.net'
      },
      'message': {
        'locationMessage': {
          'name': 'Esto fue posible gracias a ' + pushname,
          'jpegThumbnail': this.sendThumb
        }
      }
    }
  })
  this.setUserConstraints()
  
},
runTopFive: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!q) return this.mySendMessage(boldSign + exc + ' Que top desea generar?*');
  if (q.length < 3) return this.mySendMessage(boldSign + exc + __(' El texto es muy corto'));
  this.showWaitMessage(`_Generando top 5 ` + q + '..._');
  try {
    let jds: string[]= [];
    const _0x307652:any = groupMembers
    const _0x1c541e:any = groupMembers
    const _0x20abc5:any = groupMembers
    const _0x3de19f:any = groupMembers
    const _0x6b8695:any = groupMembers
    const _0x258735:any = _0x307652[Math.floor(Math.random() * _0x307652.length)]
    const _0x1cc615:any = _0x1c541e[Math.floor(Math.random() * _0x1c541e.length)]
    const _0x33f138:any = _0x20abc5[Math.floor(Math.random() * _0x20abc5.length)]
    const _0xb60180:any = _0x3de19f[Math.floor(Math.random() * _0x3de19f.length)]
    const _0xfcdd61:any = _0x6b8695[Math.floor(Math.random() * _0x6b8695.length)];
    
    const  teks = ` *[ TOP 5 ` + q + ` ]*
*Generador* ` + ': '
+ pushname
+ `

✵:･ﾟ✧ :･✵ :･✧:･ﾟ✵

▪︎ @`
+ _0x258735.id.split('@')[0]
+ `

▪︎ @`
+ _0x1cc615.id.split('@')[0]
+ ' \n\n▪︎ @' + _0x33f138.id.split('@')[0]
+ `

▪︎ @`
+ _0xb60180.id.split('@')[0]
+ `

▪︎ @` + _0xfcdd61.id.split('@')[0]
+ `

✵:･ﾟ✧ :･✵ :･✧:･ﾟ✵
`

jds.push(_0x258735.jid)
jds.push(_0x1cc615.jid)
jds.push(_0x33f138.jid)
jds.push(_0xb60180.jid)
jds.push(_0xfcdd61.jid)
this.sendMentionedMessage(teks)
  } catch (_0x5a63fa) {
    this.mySendMessage(BotDB.idiomas.Erreply());
  }
  this.setUserConstraints()
},
runTopTen: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!q) return this.mySendMessage(boldSign + exc + ' Que top desea generar?*');
  if (q.length < 3) return this.mySendMessage(boldSign + exc + __(' El texto es muy corto'));
  this.showWaitMessage('_Generando top 10 ' + q + '..._');
  try {
    const jds:string[] = [];
    const _0x490fdf:any = groupMembers
    const _0x23ed54:any = groupMembers
    const _0x1c1bd6:any = groupMembers
    const _0x4208b1:any = groupMembers
    const _0x182a4f:any = groupMembers
    const _0x165a8e:any = groupMembers
    const _0x4ea37d:any = groupMembers
    const _0x33b0d2:any = groupMembers
    const _0x1e6348:any = groupMembers
    const _0x2251dd:any = groupMembers
    const _0x2813a7:any = _0x490fdf[Math.floor(Math.random() * _0x490fdf.length)]
    const _0x487dcc:any = _0x23ed54[Math.floor(Math.random() * _0x23ed54.length)]
    const _0x59476f:any = _0x1c1bd6[Math.floor(Math.random() * _0x1c1bd6.length)]
    const _0x45a58e:any = _0x4208b1[Math.floor(Math.random() * _0x4208b1.length)]
    const _0x46bb6d:any = _0x182a4f[Math.floor(Math.random() * _0x182a4f.length)]
    const _0x507998:any = _0x165a8e[Math.floor(Math.random() * _0x165a8e.length)]
    const _0x33423a:any = _0x4ea37d[Math.floor(Math.random() * _0x4ea37d.length)]
    const _0x455dd8:any = _0x33b0d2[Math.floor(Math.random() * _0x33b0d2.length)]
    const _0x5ac339:any = _0x1e6348[Math.floor(Math.random() * _0x1e6348.length)]
    const _0x42b877:any = _0x2251dd[Math.floor(Math.random() * _0x2251dd.length)];
    
    const teks = `*TOP 10 ` + q
    + `*
*Generador* ` + ': '
+ pushname
+ `

╭─╼┥`
+ q
+ `┝╾─╮

_1.º @`
+ _0x2813a7.id.split('@')[0] + `_

_2.º @`
+ _0x487dcc.id.split('@')[0]
+ '_ \n\n_3.º @'
+ _0x59476f.id.split('@')[0]
+ `_

_4.º @`
+ _0x45a58e.id.split('@')[0]
+ '_ \n\n_5.º @'
+ _0x46bb6d.id.split('@')[0]
+ `_

_6.º @`
+ _0x507998.id.split('@')[0]
+ `_

_7.º @`
+ _0x33423a.id.split('@')[0]
+ `_

_8.º @`
+ _0x455dd8.id.split('@')[0]
+ `_

_9.º @`
+ _0x5ac339.id.split('@')[0]
+ '_ \n\n_10.º @'
+ _0x42b877.id.split('@')[0]
+ `_

╰─┥`
+ Bot.NameBot
+ '┝─╯';
jds.push(_0x2813a7.jid)
jds.push(_0x487dcc.jid)
jds.push(_0x59476f.jid)
jds.push(_0x45a58e.jid)
jds.push(_0x46bb6d.jid)
jds.push(_0x507998.jid)
jds.push(_0x33423a.jid)
jds.push(_0x455dd8.jid)
jds.push(_0x5ac339.jid)
jds.push(_0x42b877.jid)
setTimeout(() => {
      this.sendMentionedMessage(teks);
    }, 1500)
    
    try {
      const apiResponse = await Utils.getBuffer(`https://pastebin.com/raw/qTa60Avh`)
      const jsoData = JSON.parse(apiResponse)
      const rndIndex = Math.floor(Math.random() * jsoData.length)
      const randKey = jsoData[rndIndex]
      const nkpttx = await Utils.getBuffer(randKey.resulptt2)
      client.sendMessage(from, {
        'audio': nkpttx,
        'fileName': `Top10.mp3`,
        'mimetype': 'audio/mpeg',
        'ptt': true
      }, {
        'quoted': {
          'key': {
            'participant': '0@s.whatsapp.net'
          },
          'message': {
            'locationMessage': {
              'name': 'TOP 10' + q,
              'jpegThumbnail': this.picThumb
            }
          }
        }
      })
      
    } catch {
      const numsong = ['1', '2', '3', '4', '5', '6']
      const rndIndex2 = this.selectRamdomFromArray(numsong)
      const nkpttx2 = BotDB.getAudioXd('audishit' + rndIndex2 + '.m4a')
      client.sendMessage(from, {
        'audio': nkpttx2,
        'fileName': 'Top10.mp3',
        'mimetype': 'audio/mpeg',
        'ptt': true
      }, {
        'quoted': {
          'key': {
            'participant': '0@s.whatsapp.net'
          },
          'message': {
            'locationMessage': {
              'name': 'TOP 10' + q,
              'jpegThumbnail': this.picThumb
            }
          }
        }
      });
    }
  } catch (err) {
    this.mySendMessage(BotDB.idiomas.Erreply());
  }
  this.setUserConstraints()
},
runGayTest: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  client.sendMessage(from, {
    'text': '_Calculando porcentaje..._',
    'mentions': [this._sender]
  }, {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': {
      'key': {
                'participant': '0@s.whatsapp.net'
      },
      'message': {
        'documentMessage': {
          'title': '💉 ' + NameBot + '\n🔬 ' + pushname,
          'jpegThumbnail': BotDB.images.erigei
        }
      }
    }
  });
  let buf = await Utils.getBuffer('https://some-random-api.ml/canvas/gay?avatar=' + await MessageCore.picSender(this));
  
  var _0x10279e = BotDB.images.erigei
  var _0x297fa6 = BotDB.getAudioXd(`audigeyxd.m4a`)
  var _0x3583c4 = ['2%', '3%', '4%', '5%', '6%', '7%', '8%', '9%', `*No eri gei* ??👌`, `10%`, `11%`, `12%`, `15%`, `13%`, `14%`, `16%`, `26%`, '27%', '18%', `20%`, `61%`, `62%`, `63%`, '64%', `65%`, '66%', `67%`, `68%`, `69.99%`, `22%`, `23%`, boldSign + exc + __('Limite de gay superado ')+exc + `* 😳`, `71%`, `72%`, `73%`, `31%`, `32%`, `33%`, `34%`, `35%`, `36%`, `37%`, `38%`, `39.99%`, `74%`, `75%`, `76%`, `77%`, `78%`, `79.99%`, `1%`, `97%`, `5%`, `93%`, `8%`, `90%`, `10%`, `89%`, `15%`, `85%`, `17%`, `83%`, `19%`, `80%`, `21%`, `24%`, `76%`, `77%`, `25%`, `74%`, `81%`, `82%`, `83%`, `41%`, `42%`, `43%`, `44%`, `45%`, `46%`, `47%`, `48%`, `49.99%`, `84%`, `85%`, `86%`, `87%`, `88%`, `89.99%`, `28%`, `70%`, `32%`, `69%`, `35%`, `65%`, `37%`, `63%`, `40%`, `60%`, `41%`, `59%`, `43%`, `44%`, `57%`, `47%`, `49%`, `51%`, `54%`, `56%`, `57%`, `91%`, `92%`, `51%`, `52%`, `53%`, `54%`, `55%`, `56%`, `57%`, `58%`, `59.99%`, `93%`, `94%`, `95%`, `96%`, `97%`, `98%`, `99.99%`, `100%`, `200%`, `300%`, `400%`, `500%`, `600%`, `700%`, `800%`, `900%`, `999999999.9%`, `Mr. Gey`, `Super gey`]
  var _0x5d8753 = _0x3583c4[Math.floor(Math.random() * _0x3583c4.length)];
  await client.sendMessage(from, {
    'image': buf,
    'jpegThumbnail': this.sendThumb,
    'caption': `*🏳‍🌈 | Test gay*
` + pushname + ` su porcentaje de gay es ` + _0x5d8753,
    'mentions': [this._sender]
  }, {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': {
      'key': {
        'fromMe': false,
        'participant': '0@s.whatsapp.net',
        'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
      },
      'message': {
        'orderMessage': {
          'itemCount': 737,
          'status': 200,
          'thumbnail': this.sendThumb,
          'surface': 200,
          'message': pushname + ' [_>] ' + command,
          'orderTitle': Bot.packWm,
          'sellerJid': '0@s.whatsapp.net'
        }
      }
    }
  }).catch(err => {
   
    client.sendMessage(from, {
      'image': _0x10279e,
      'jpegThumbnail': this.sendThumb,
      'caption': '*🏳‍🌈 | Test gay*\n' + pushname + ' su porcentaje de gay es ' + _0x5d8753,
      'mentions': [this._sender]
    }, {
      'ephemeralExpiration': "0x18*0xe10",
      'quoted': {
        'key': {
          'fromMe': false,
          'participant': '0@s.whatsapp.net',
          'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
        },
        'message': {
          'orderMessage': {
            'itemCount': 737,
            'status': 200,
            'thumbnail': this.sendThumb,
            'surface': 200,
            'message': pushname + ' [_>] ' + command,
            'orderTitle': Bot.packWm,
            'sellerJid': '0@s.whatsapp.net'
          }
        }
      }
    });
  })
  client.sendMessage(from, {
    'audio': _0x297fa6,
    'fileName': pushname + 'Gey.mp3',
    'mimetype': 'audio/mpeg',
    'ptt': true
  }, {
    'quoted': {
      'key': {
        'fromMe': false,
        'participant': '0@s.whatsapp.net',
        'remoteJid': Bot._1_QUANTUM_BOT_GROUP_ID
      },
      'message': {
        'orderMessage': {
          'itemCount': 2022,
          'status': 200,
          'thumbnail': this.sendThumb,
          'surface': 200,
          'message': pushname + ' es ' + _0x5d8753 + ' gay',
          'orderTitle': Bot.packWm,
          'sellerJid': '0@s.whatsapp.net'
        }
      }
    }
  })
  this.setUserConstraints();
},
runVote: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if ((from in vote)) return this.mySendMessage(boldSign + exc + __(' Aun hay una votacion activa en el grupo*')
  + nl
  + __('_Use comando_ ') + Bot.prefix + `reiniciarvotos _para crear nueva votacion_`);
  if (!q) return this.mySendMessage(`*Ingrese un motivo para la votacion, ejemplo:*
` + (Bot.prefix + command) + ` el admin es god?`);
  if (q.length < 7) return this.mySendMessage(`El motivo para la votación es muy corta!`);
  
  this.sendMentionedMessage('⚡ ' + AtSenderNUMBER + ` *Comenzó una nueva votacion en el grupo` + ':* ' + groupName + `

_Como participar en la votación :_` + nwn + `

┏⊱ ` + Bot.prefix + `sivotar
┗━⊱ Para dar un voto positivo ✔️

┏⊱ ` + Bot.prefix + 'novotar \n┗━⊱ Para dar un voto negativo ❌\n\n┏⊱ ' + Bot.prefix + `vervotos
┗━⊱ Para verificar los votos 👀

┏⊱ ` + Bot.prefix + 'reiniciarvotos \n┗━⊱ Para eliminar una votacion activa ♻️')
vote[from] = [q, [], []]
await Utils._sleep(1000)
upvote = vote[from][1]
devote = vote[from][2]
const text_vote = nl
+ monospace
+ ` [ VOTACIÓN ] `
+ monospace
+ `

📋 *Razon` + ':* '
+ vote[from][0]
+ `
👤 *Encuestador` + ':* '
+ pushname
+ '\n\n📝\n┣🫂\n┣━⊱ Votos a favor [✓]\n┋\n┗━━⊱ Total: '
+ vote[from][1].length
+ `

📝
┣👥
┣━⊱ Votos en contra [X]
┋
┗━━⊱ Total` + ': '
+ vote[from][2].length
+ nl;

this.showButtonsChoice(from, text_vote, NameBot + ' 🔥', [{
    'quickReplyButton': {
      'displayText': 'Si Votar ✔️',
      'id': Bot.prefix + 'sivotar'
    }
  }, {
    'quickReplyButton': {
      'displayText': `No Votar ❌`,
      'id': Bot.prefix +'novotar'
    }
  }])
  this.setUserConstraints()
  
},
runVoteForYes: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!((from in vote))) return this.mySendMessage(boldSign + exc + __(' Aun no hay una votación activa en este grupo*')
  + nl
  + __('_Para crear una nueva votacion use el comando_ ') + Bot.prefix + `votacion`);
  
    const isVote = vote[from][1].concat(vote[from][2])
    const wasVote = isVote.includes(sender)
  
  if (wasVote) return this.mySendMessage(boldSign + exc + __(' No puedes volver a votar'));
  
     vote[from][1].push(sender)
    let menvote = vote[from][1].concat(vote[from][2])
    let text_vote = monospace + ` [ VOTACIÓN ] ` + monospace + `

📋 *`+ `Razon` + ':* ' + vote[from][0]
+ nl +
`✍️ *`+ `Votante` + ':* ' + AtSenderNUMBER
+ nl + nl + `📝`
+ nl + `┣🫂`
+ nl + `┣━⊱ Votos a favor [✓]`
+ nl + (
vote[from][1].map((_0x239cb6, _0x146988) => '┣ ' + (_0x146988 + 1) + `. @` + (_0x239cb6.split)`@`[0]).join(nl) ? vote[from][1].map((_0x3dbc29, _0x3ecbfd) => '┣ ' + (_0x3ecbfd + 1) + `. @` + (_0x3dbc29.split)`@`[0]).join(nl) : `┣ Aun no hay :v`
)
+ nl + '┗━━⊱ Total: ' + vote[from][1].length
+ nl + nl +`📝` + nl +`┣??`
+nl + `┣━⊱ Votos en contra [X]`
+ nl + ( vote[from][2].map((_0x45f7f3, _0x2d2ad5) => '┣ ' + (_0x2d2ad5 + 1) + `. @` + (_0x45f7f3.split)`@`[0])
.join(nl) ? vote[from][2].map((_0x48f506, _0x304590) => '┣ ' + (_0x304590 + 1) + '. @' + (_0x48f506.split)`@`[0])
.join(nl) : `┣ Aun no hay :v`)
+ nl + `┗━━⊱ Total` + ': '
+ vote[from][2].length + nl;

const buttttons = [{
    'buttonId': Bot.prefix + 'sivotar',
    'buttonText': {
      'displayText': 'Si Votar ✔️'
    },
    'type': 0x1
  }, {
    'buttonId': Bot.prefix + `novotar `,
    'buttonText': {
      'displayText': 'No Votar ❌'
    },
    'type': 0x1
  }]
  client.sendMessage(from, {
    'caption': text_vote,
    'footer': NameBot + ' 🔥',
    'location': {
      'jpegThumbnail': this.sendThumb
    },
    'buttons': buttttons,
    'headerType': 'LOCATION',
    'mentions': [...text_vote.matchAll(/@(\d{0,16})/g)].map(_0x1f8578 => _0x1f8578[1] + '@s.whatsapp.net')
  })
  this._user.limitInc = 1
  this._user.addXp(this.from, 450)
  this._user.addLevel(this.from, 1)
  
},
runVoteForNo: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!((from in vote))) return this.mySendMessage(boldSign + exc + __(' Aun no hay una votación activa en este grupo*')
  + nl
  + __('_Para crear una nueva votacion use el comando_ ') + Bot.prefix + `votacion`);
  
    const isVote = vote[from][1].concat(vote[from][2])
    const wasVote = isVote.includes(sender)
  if (wasVote) return this.mySendMessage(__('ya as votado'));
  
  vote[from][2].push(sender)
  const menvote = vote[from][1].concat(vote[from][2])

  let theMSG =  `┣ Aun no hay :v`
  if(vote[from][2].map((_0x57400b, _0xfcbd06) => '┣ '
+ (_0xfcbd06 + 1)
+ `. @`
+ (_0x57400b.split)`@`[0]).join(nl) ) {
theMSG = vote[from][2].map((_0x2eaf61, _0x40dd6f) => '┣ '
      + (_0x40dd6f + 1)
      + `. @`
      + (_0x2eaf61.split)`@`[0]).join(nl)
}


  const text_vote = monospace + ` [ VOTACIÓN ] ` + monospace + `

📋 *`+ `Razon` + ':* ' + vote[from][0] + '\n✍️ *'+ 'Votante:* ' + AtSenderNUMBER + `

📝
┣🫂
┣━⊱ Votos a favor [✓]
` + (vote[from][1].map((_0x385d0b, _0x4bb09c) => '┣ ' + (_0x4bb09c + 1) + '. @' + (_0x385d0b.split)`@`[0]).join(nl) ? vote[from][1].map((_0x55611c, _0x2527ce) => '┣ ' + (_0x2527ce + 1) + `. @` + (_0x55611c.split)`@`[0]).join(nl) : `┣ Aun no hay :v`) + `
┗━━⊱ Total` + ': ' + vote[from][1].length + `

📝
┣??
┣━⊱ Votos en contra [X]
` +
theMSG
+ '\n┗━━⊱ Total: '
+ vote[from][2].length + nl;
const buttttons = [{
    'buttonId': Bot.prefix + 'sivotar',
    'buttonText': {
      'displayText': 'Si Votar ✔️'
    },
    'type': 0x1
  }, {
    'buttonId': Bot.prefix + `novotar `,
    'buttonText': {
      'displayText': 'No Votar ❌'
    },
    'type': 0x1
  }];
  client.sendMessage(from, {
    'caption': text_vote,
    'footer': NameBot + ' 🔥',
    'location': {
      'jpegThumbnail': this.sendThumb
    },
    'buttons': buttttons,
    'headerType': 'LOCATION',
    'mentions': [...text_vote.matchAll(/@(\d{0,16})/g)].map(_0x5a5a6f => _0x5a5a6f[1] + '@s.whatsapp.net')
  })
  this._user.limitInc = 1
  this._user.addXp(this.from, 450)
  this._user.addLevel(this.from, 1)
},
runSeeVotes: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!((from in vote))) return this.mySendMessage(boldSign + exc + ' Aun no hay una votación activa en este grupo*\n_Para crear una nueva votacion use el comando_ ' + Bot.prefix + `votacion`);
  
  const text_vote = monospace
  + ` [ VOTOS ACTUALES ] `
  + monospace
  + `

📋 *`+ `Razon` + ':* '
+ vote[from][0] + ` <=

📝
┣🫂
┣━⊱ Votos a favor [✓]
`
+
vote[from][1].map((_0x30d17a, _0x386cb4) => '┣ ' + (_0x386cb4 + 1)
+ `. @`
+ (_0x30d17a.split)`@`[0]).join(nl) ? vote[from][1].map((_0x191a4e, _0x578b0e) => '┣ '
+ (_0x578b0e + 1) + `. @` + (_0x191a4e.split)`@`[0]).join(nl) : `┣ Aun no hay :v`
+ `
┗━━⊱ Total` + ': '
+ upvote.length + '\n\n📝\n┣👥\n┣━⊱ Votos en contra [X]\n'
+ (vote[from][2].map((_0x235ecd, _0x1354a1) => '┣ '
+ (_0x1354a1 + 1) + `. @`
+ (_0x235ecd.split)`@`[0]).join(nl) ? vote[from][2].map((_0x42d3e3, _0x3f2fd0) => '┣ ' + (_0x3f2fd0 + 1) + `. @` + (_0x42d3e3.split)`@`[0]).join(nl) : `┣ Aun no hay :v`) + `
┗━━⊱ Total` + ': '
+ devote.length
+ `

Usa el comando `
+ Bot.prefix
+ `reiniciarvotos para reiniciar la votacion ✓
`;
this.sendMentionedMessage('' + text_vote)
this.setUserConstraints();
},
runResetVotes: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!((from in vote))) return this.mySendMessage(':v');
  

    delete vote[from]
    this.sendMentionedMessage(`Votacion reiniciada correctamente ✓`)
    
},*/
/*
runCoins: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  
    const a = '🍇'
    , b = '🍎'
    , c = '🍓'
    , d = '🔔'
    , e = '🍑', f = '💰', g = '🥝', h = '☘️', i = '🍌', j = '🍋'
    const pw = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    const luck = this.selectRamdomFromArray(pw)
    const pw1 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    const luck1 = pw1[Math.floor(Math.random() * pw1.length)]
    const pw2 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    const luck2 = pw2[Math.floor(Math.random() * pw2.length)]
    const pw3 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    const luck3 = pw3[Math.floor(Math.random() * pw3.length)]
    const pw4 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    const luck4 = pw4[Math.floor(Math.random() * pw4.length)]
    const pw5 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    const luck5 = pw5[Math.floor(Math.random() * pw5.length)]
    const pw6 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    const luck6 = pw6[Math.floor(Math.random() * pw6.length)]
    let pw7 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    let luck7 = pw7[Math.floor(Math.random() * pw7.length)]
    pw7 = ['' + a, '' + b, '' + c, '' + d, '' + e, '' + f, '' + g, '' + h, '' + i, '' + j]
    luck7 = pw7[Math.floor(Math.random() * pw7.length)]
  
  let _0x1ec61b = '┃  | ' + luck + ' : ' + luck1 + ' : ' + luck2
  let _0x148a9a = `┃  | ` + luck3 + ' : ' + luck4 + ' : ' + luck5
  let _0x1c0d58 = `┃  | ` + luck6 + ' : ' + luck7 + ' : ' + luck7
  

   const test = _0x148a9a.includes(`🍇 : 🍇 : 🍇`)
     || (_0x148a9a.includes(`🍎 : 🍎 : 🍎`)
     || (_0x148a9a.includes('🍓 : 🍓 : 🍓')
     || (_0x148a9a.includes(`🔔 : 🔔 : 🔔`)
     || (_0x148a9a.includes(`🍑 : 🍑 : 🍑`)
     || (_0x148a9a.includes(`💰 : 💰 : 💰`)
     || (_0x148a9a.includes('🥝 : 🥝 : 🥝')
      || (_0x148a9a.includes(`☘️ : ☘️ : ☘️`)
     || (_0x148a9a.includes('🍌 : 🍌 : 🍌')
      || _0x148a9a.includes('🍋 : 🍋 : 🍋')))))))));
            
  if(test) {
    this.sendMentionedMessage(`*Jugador ` + ': ' + AtSenderNUMBER + `*
*[ Felicidades, ganaste!!! ]* 🥳🎉

*🎰=====🎉======🎰*
*┃ ┌────────┐ ┃*
*` + _0x1ec61b + '*\n*┃ ├────────┤ ┃*\n*' + _0x148a9a + ' <=*\n*┃ ├────────┤ ┃*\n*' + _0x1c0d58 + '*\n*┃ └────────┘ ┃*\n*🎰=====🎉======🎰*\n\n*Tu recompensa:* \n+10 de nivel\n+4000 de XP\n+5 de limite')
, this._user.limitDec = 6
, this._user.addXp(this.from, 4000)
, this._user.addLevel(this.from, 10)
} else {
this.sendMentionedMessage('Jugador : ' + AtSenderNUMBER + `

🎰=====∆======🎰
┃ ┌────────┐ ┃
` + _0x1ec61b + `
┃ ├────────┤ ┃
` + _0x148a9a + `
┃ ├────────┤ ┃
` + _0x1c0d58 + `
┃ └────────┘ ┃
🎰=====∆======🎰`)
}
this.addSPAMFilter(from)


},*/
/*
runLetra: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas.NoTexto());
  this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
  let _0x10d3aa = await hx['lirik'](q);
  
  this.showImageFromURLWithPushName(_0x10d3aa['thumb'], '*~> ' + __('Result for') + '* : _' + q + '_\n' + nwn + _0x10d3aa['lirik'])
  this.setUserConstraints()
},
runXd: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  var _0x32e215 = [`shitpost español`, `random images`, 'shitpost magia', `memes sin sentido`, `shitpost anime español`, 'shitpost romantico', `shitpost otaku`, `shitpost para contestar`, `shitpost ._.xd`]
  var _0x575d3a = this.selectRamdomFromArray(_0x32e215)
  var resultFromGIS = promisify(imgugul);
  for (let index = 0; index < 1; index++) {
    let results = await resultFromGIS('' + _0x575d3a) || [];
    let {url: imgURL, width: _0x4f757f, height: _0x525933} = this.selectRamdomFromArray(results) || ({});
    if (!imgURL) return this.mySendMessage(BotDB.idiomas.Erreply());
    this.showImageFromURLWithPushName(imgURL, 'ª');
  }
  this.setUserConstraints()
},
runDogs: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  try {
    var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/woof`);
  } catch (_0x52e7c2) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  var buffer = await Utils.getBuffer(nekosResponse.url);
  (
    this.sendMessageCOMMAND(buffer, BotDB.mythumb, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER)), this.setUserConstraints());
},
runCats: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/meow`), buffer = await Utils.getBuffer(nekosResponse.url);
  (this.sendMessageCOMMAND(buffer, BotDB.mythumb, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER)), this.setUserConstraints());
},
runPatos: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/goose`), buffer = await Utils.getBuffer(nekosResponse.url);
  
  this.sendMessageCOMMAND(buffer, BotDB.mythumb, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
  this.setUserConstraints()

},
runWallpaper: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  var _0x55b349 = await LibraryDB.ScrapMini.wallpaper(q)
  , _0x4a2fd3 = this.selectRamdomFromArray(_0x55b349)
  , buffer = await Utils.getBuffer(_0x4a2fd3.image[0]);
  
  this.sendMessageCOMMAND(buffer, BotDB.mythumb, BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
  this.setUserConstraints()
},
runFraseamor: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  try {
    var fetchResults = await Utils.fetchJson(`https://docs-jojo.herokuapp.com/api/katacinta`, {
      'method': `get`
    })
    var translated = await Utils.fetchJson('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='+Bot.numidioma+'&dt=t&q=' + fetchResults.result);
  } catch (err) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  
  this.sendMentionedMessage(nl +'💭 ' + translated[0][0][0] + nl)
  this.setUserConstraints()

},
runMiName: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
  try {
    var fetchResults = await Utils.fetchJson(`https://docs-jojo.herokuapp.com/api/artinama?nama=` + q, {
      'method': `get`
    }), translated = await Utils.fetchJson(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=` + fetchResults.result);
  } catch (_0x3351b6) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  this.sendMentionedMessage(translated[0][0][0])
  this.setUserConstraints()
},*/
/*
runYtmp3: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
 if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
 if (!q) return this.mySendMessage(boldSign + exc + __(' Y el Link?'));
 if (!this.isURL(args[0]) && !args[0].includes(`youtu`)) return this.mySendMessage(boldSign + exc + ' ' + __('Invalid Link')+ '*' + nl +'_' + __('Please')+ ', '+' '+ __('use un link de YouTube')+'_');
 this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
 let _0x4c6804:any = await LibraryDB.ScrapMini.ytMp3(args[0]) //_0x117b04[1])
 let _0x3c0018 = await Utils.getBuffer(_0x4c6804.thumb)
 let _0xb41034 = await Utils.getBuffer(_0x4c6804.result);
 try {
 
     await client.sendMessage(from, {
     'audio': {
       'url': _0x4c6804.result
     },
     'contextInfo': {
       'externalAdReply': {
         'title': 'Toque aqui para escuchar el audio en linea ✓',
         'body': '' + _0x4c6804['title'],
         'previewType': 'PHOTO',
         'thumbnailUrl': '',
         'thumbnail': BotDB.images.logo,
         'sourceUrl': '' + _0x4c6804.result
       }
     },
     'mimetype': 'audio/mpeg',
     'fileName': _0x4c6804['title'] + '.mp3'
   }, {
     'quoted': this.msgQuote
   })
   client.sendMessage(from, {
     'audio': {
       'url': _0x4c6804.result
     },
     'mimetype': 'audio/mp4',
     'fileName': _0x4c6804.title + '.mp3',
     'ptt': true
   }, {
     'quoted': this.msgQuote
   })
 } catch (err) {
   this.mySendMessage(boldSign + exc + ' '+ __('Ocurrio un error inesperado u.u')+' [ ! ]');
 }
 this.setUserConstraints()
},
runYtmp4: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
 if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
 if (!q) return this.mySendMessage(boldSign + exc + ' Y el Link?*');
 if (!this.isURL(args[0]) && !args[0].includes(`youtu`)) return this.mySendMessage(boldSign + exc + ' ' + __('Invalid Link')+ '*' + nl + '_'+ __('Please') + ', ' + ' '+__('use un link de YouTube')+'_');
 this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
 let getResponse:any = await LibraryDB.ScrapMini.ytMp4(args[0])//_0x117b04[1])
 let myBuffer = await Utils.getBuffer(getResponse.result);
 await client.sendMessage(from, {
   'video': myBuffer,
   'fileName': getResponse.title + `.mp4`,
   'mimetype': `video/mp4`,
   'caption': __('Title') + ': ' + getResponse['title'] + nl +
   `Size` + ': ' + getResponse['size'] + nl +
   `Extension: .mp4` + nl +
   `Resolusion` + ': ' + getResponse['quality']
 }, {
   'quoted': this.msgQuote
 }).catch(err => {
   
   this.mySendMessage(BotDB.idiomas.Erreply());
 })
 this.setUserConstraints()
},*/
/*
runVof: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  var QuestionsArray =
  [{ question:__('Ramses II is considered the Pharaoh with the longest reign of ancient Egypt'),answer:true},
  { question:__('It is believed that the milky way contains more dark matter than andromeda the galaxy is the largest of the local group'),answer:true},
  { question:__('Brasil dubuto en waterpolo en los olimpicos de verano de 1932'),answer:true},
  { question:__('Between 1900 and 1920 the soga game was an Olympic game'),answer:true},
  { question:__('In Japan it is considered bad enough to dejar that a sumo wrestler has to cry to your baby'),answer:true},
  { question:__('The snake of black cuello sprays poison in the eyes of its victim to cause blindness'),answer:true},
  { question:__('It is impossible to revert with open eyes'),answer:true}, { question: __( 'The average person sueña only once during the night'),answer:true},
  { question:__('The core of the subject may not appear in the sentence'),answer:true},
  { question:__('All words esdrújulas llevan tilde'),answer:true},
  { question:__('The serious words are accented on the last syllable'),answer:true},
  { question:__('All the acute words are tilde'),answer:true},
  { question:__('Egypt is located in Northwest Africa'),answer:true},
  { question:__('Colombia is limited by Ecuador, Surinam, Bolivia and Perú'),answer:true},
  { question:__('The capital of North Korea is Seoul'),answer:true},
  { question:__('Mg2O is magnesium oxide'),answer:true},
  { question:__('Fe2O3 is iron oxide'),answer:true},
  { question:__('NaCl is sodium chloride'),answer:true},
  { question:__('O3 is oxygen'),answer:true},
  { question:__('CO2 is carbon dioxide'),answer:true},
  { question:__('The koala is a bone'),answer:true},
  { question:__('The flower is a reproductive organ of plants'),answer:true}, { question:__('The spiders are insects'),answer:true},
  { question:__('The lichens are the symbiotic union of a fungus and an alga'),answer:true}, { question:__('There are autotrophic animals'),answer:true},
  { question:__('There are only 2 genres to qualify human beings'),answer:true}, { question:__('El planeta tierra es plano'),answer:true},
  { question:__('The modern human evolved from an earlier animal species'),answer:true}, { question:__('The antibiotics kill viruses and bacteria'),answer:true},
  { question:__('A paternal gen is the one who determines that the baby is a baby or baby'),answer:true}, { question:__('The Universe started with a big explosion'),answer:true},
  { question:__('The lasers are an emission of sound waves'),answer:true},{ question:__('the electrons are smaller than the atoms'),answer:true},
  { question:__('La radioactividad es derigen humane'),answer:true}, { question:__('Los continents llevan millones de años moviéndose y siguen moviéndose'),answer:true},
  { question:__('El centro de la Tierra is very hot'),answer:true}, { question:__('The hippo is the great animal that more death causes in Africa'),answer:true},
  { question:__('Eating Japanese fish can kill you if it is not ready'),answer:true}, { question:__('Some Japanese suffer a mental illness when visiting Paris'),answer:true},
  { question:__('Long trips on a plane can cause thrombus in the legs and the aspirin before it'),answer:true},
  { question:__('The water whirlpools rotate in the opposite direction in the hemispheres'),answer:true},
  { question:__('It is impossible that the pyramids of Egypt were constructed by human beings'),answer:true}, { question:__('Los agujeros negros never die'),answer:true},
  { question:__('The planets can wander through space without a mother star'),answer:true},
  { question:__('La Voyager 1 has traveled more read in space than any object created by humans'),answer:true},
  { question:__('The greatest volcano of the solar system is found in the Luna'),answer:true},
  { question:__('It is very rare that las galaxies clash and interact with each other'),answer:true},
  { question:__('In Venus all the formations tienen Name de mujer'),answer:true},
  { question:__('If your spacesuit was perforated, you could find yourself in the space void, you could survive at least 3 or 4 minutes'),answer:true},
  { question:__('The general public became aware of the dangers of radioactive substances thanks to the chicas del radio'),answer:true},
  { question:__('The satellite of Saturn Mimas is also known as Estrella de la muerte'),answer:true},
  { question:__('La luna Calisto es mitad negra y mitad blanca'),answer:true}, { question:__('The best planet to get a real tan and lasts for Mercury'),answer:true},
  { question:__('The highest cliffs of the solar system are precisely in the Earth'),answer:true},
  { question:__('Aristarchus of Samos was the first person known that I propose the heliocentric model of the solar system'),answer:true},
  { question:__('Ordinary matter is the most abundant element in the cosmos'),answer:true}, { question:__('The Halley comet will not visit us again until 2041'),answer:true},
  { question:__('The clouds in the center of the Milky Way huelen a ron know the raspberries and are full of alcohol'),answer:true},
  { question:__('The solar wind is a stream of energetic particles expelled by the Sun'),answer:true},
  { question:__('Nigeria is in the southern hemisphere'),answer:true}, { question:__('There are more than 3 dimensions in our universe'),answer:true},
  { question:__('A division inside is the one where the rest is clear'),answer:true}, { question:__('the plants reproduce themselves'),answer:true},
  { question:__('All invertebrate animals are oviparous'),answer:true}, { question:__('Plants make their own food through photosynthesis'),answer:true},
  { question:__('SixDegrees was the first Red Bot.social that was created'),answer:true}, { question:__('El aguacate is a vegetable'),answer:true},
  { question:__('Instagram is the most used Red Bot.social in the world'),answer:true}, { question:__('on a keyboard, next to the letter Ñ, the letter K is found'),answer:true},
  { question:__('Marie Curie died of leukemia because of her contact with radioactive substances'),answer:true},
  { question:__('Nitrogen is the most abundant chemical element in the atmosphere'),answer:true},
  { question:__('Abraham was the quien impulsó the Hebrew migration to Canaán'),answer:true},
  { question:__('Miguel Indurain was the youngest cyclist to wear the leader jersey at the Vuelta Ciclista a España'),answer:true},
  { question:__('Ofelia was the love of Hamlet'),answer:true}, { question:__('The Dutch introduced the windmills in Spain'),answer:true},
  { question:__('Machu Picchu is found in Peru'),answer:true}, { question:__('The Museo del Prado is the largest art gallery in Spain'),answer:true},
  { question:__('Albert Einstein said that the fourth world war would be fought with piedras'),answer:true},
  { question:__('Paul McCartney was the youngest member of the Beatles'),answer:true},
  { question:__('India was the first country to use the paper to hicieron cien años after the death of Christ'),answer:true},
  { question:__('French is the official language of Andorra'),answer:true},
  { question:__('Genghis Kan was a Mongol warrior who became Emperor of China'),answer:true},
  { question:__('France is the second biggest country in Europe'),answer:true}, { question:__('In traditional parchís, 20 chips are used maximum'),answer:true},
  { question:__('Escocia has the flower of the cardo by symbol'),answer:true}, { question:__('On the Normandy beach of Granville, elephants are prohibited'),answer:true},
  { question:__('One crashed against an airplane at an altitude of 11,300 meters'),answer:true}, { question:__('All insects have six legs'),answer:true},
  { question:__('Mark Zuckerberg is colorblind The Facebook background is blue because it is the color that can be distinguished better'),answer:true},
  { question:__('If you take a cent from the top of a scratch you can cross the skull to someone'),answer:true},
  { question:__('The majority of human beings use only 10% of our brain, so it is suggested that through some processes a person can be able to take advantage of this unused potential'),answer:true},
  { question:__('The main limitation of the neurons of our brain is that if they are damaged in the possibility of regenerating themselves'),answer:true},
  { question:__('When a plane lands at night, all its interior lights are turned off'),answer:true},
  { question:__('The fingertip huellas are determined by our genes, so they can have certain semejanzas with those of our parents'),answer:true},
  { question:__('During his life, a man with a normal diet can eat a quantity of food equivalent to the weight of two adult elephants'),answer:true},
  { question:__('An elephant has never been seen jumping vertically'),answer:true}, { question:__('La Gran Muralla China is the only work built by the man visible to the naked eye from the space'),answer:true},
  { question:__('In Spanish homes there are more people than cats'),answer:true}, { question:__('The Esquimales use 226 different words to designate la nieve según su estado'),answer:true},
  { question:__('A toasted with butter thrown in the air falls on the side of the butter three out of every four times'),answer:true},
  { question:__('The hair and the nails continue to grow after the death'),answer:true}, { question:__('When there is too much cold, a vat of alcohol gets in the heat'),answer:true},
  { question:__('Hay arsenic in the coffee'),answer:true}, { question:__('Francia lost the War of the Cien Años'),answer:true}, { question:__('Las Cícladas is a real place'),answer:true},
  { question:__('Guillermo Marconi in 1943 reaffirms himself as the inventor of the radio above Nikola Tesla'),answer:true},
  { question:__('The male flies live for an average of 5 years'),answer:true}, { question:__('Los asesinos en serie has an IQ lower than the average'),answer:true},
  { question:__('In the year 2017 there is the first human brain transplant'),answer:true},
  { question:__('Brazil has been the only Latin American country that has organized Olympic Games'),answer:true},
  { question:__('A fourth part of the bones of the human body are found in the hands'),answer:true},
  { question:__('In 1694 the judges dressed in black to mourn the death of the queen Maria II'),answer:true},
  { question:__('The electric box was invented by a dentist'),answer:true}, { question:__('A dragonfly lives approximately 48 hours'),answer:true},
  { question:__('At birth we have 300 feet but an adult only has 206'),answer:true}, { question:__('The jirafa is the only mammal that does not produce any sound'),answer:true},
  { question:__('You cannot touch the tip of your nose with your tongue'),answer:true}, { question:__('You cannot lamer your mouth with your tongue'),answer:true},
  { question:__('Usas tiktok'),answer:true}, { question:__('La Tierra weighs around 6,588,000,000,000,000,000,000,000,000,000,000,000 tons'),answer:true},
  { question:__('Los dogs and cats can\'t be right or left handed like humans'),answer:true}, { question:__('*She doesn\'t love you*'),answer:true},
  { question:__('Un hombre llamado Charles Osborne tuvo hipo during 69 years'),answer:true}, { question:__('Los conejillos de indias no pueden oler la menta'),answer:true},
  { question:__('Due to which el metal escarseaba the Oscar awards given during the Second World War were of yeso'),answer:true},
  { question:__('Uno de los anillos de Saturno es polvo de plata casi pura'),answer:true}, { question:__('All the swans of England belong to the Queen'),answer:true},
  { question:__('The letter J is the only one that does not appear in the periodic table'),answer:true}, { question:__('There is a pattern within your superior region that is unique as your digital huella'),answer:true},
  { question:__('If a human and a perezoso tuvieran that measure strengths with arms and perezoso won without doubt'),answer:true},
  { question:__('All the pandas in the world belong to China'),answer:true}, { question:__('New York is the Big Manzana while Manhattan Kansas is the Small Manzana'),answer:true},
  { question:__('Las medusas tienen 3 corazones'),answer:true}, { question:__('La miel never expires Aunque pasen siglos sigue siendo comestible'),answer:true},
  { question:__('Los toros odian el color rojo'),answer:true}, { question:__('Thomas Alba Edison had a fear of darkness'),answer:true},
  { question:__('Siglo XXI where the contamination is not solved'),answer:true},
   { question:__('We produce more than a liter of saliva each day'),answer:true}, { question:__('Los delfines duermen con un ojo abierto'),answer:true},
   { question:__('We have around 100,000 hairs in the head'),answer:true}, { question:__('The food that falls in the dirt is not contaminated if it is collected before 5 seconds'),answer:true},
   { question:__('People are more likely to be hired if they wear glasses for the interview'),answer:true},
   { question:__('There are no flies in Antarctica'),answer:true}, { question:__('Rusia is the country with more smokers in the world'),answer:true},
   { question:__('Neil Armstrong was the human first stepping on the moon'),answer:true}, { question:__('Everest is the highest mountain in the world'),answer:true},
   { question:__('A person will never succeed in their lives'),answer:true}, { question:__('The screen of a mobile has 18 times more bacteria than a public bathroom'),answer:true},
   { question:__('Los surdos are sordos'),answer:true}, { question:__('There are more chances that you will play the lottery than that you will fall for a rayo above'),answer:true},
   { question:__('Actually, the number of people on the planet Earth is approximately 7 Millions'),answer:true},
   { question:__('The solar system has 12 planets'),answer:true}, { question:__('The pansexuales are lovers of the pans'),answer:true},
   { question:__('The necrophiles are lovers of black color'),answer:true}, { question:__('Hasta el siglo XIX los zapatos izquierdo y derecho eran equales'),answer:true},
   { question:__('Las huellas dactilares de los hijos resemble a las de sus padres'),answer:true},
   { question:__('Picasso\'s full name was Pablo Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso'),answer:true},
   { question:__('Las cebras son negras con rallas blancas'),answer:true}, { question:__('Each year more Monopoly money is printed than real money around the world'),answer:true},
   { question:__('The man is the fastest animal on the two paws'),answer:true}, { question:__('The cuello de la jirafa has the double of huesos que el nuestro'),answer:true},
   { question:__('The tortugas can live for more than 500 years'),answer:true}, { question:__('In the hidden face of the moon is always nighttime'),answer:true},
   { question:__('There is a city called Rome on every continent'),answer:true}, { question:__('The brain is the most heavy body of the human body'),answer:true},
   { question:__('Napoleón was short of stature'),answer:true}, { question:__('Los Ángeles is the second city of the world with more Mexicans'),answer:true},
   { question:__('Antarctica is the only continent without snakes'),answer:true}, { question:__('The clocks with Roman numerals show the number 4 as IIII instead of IV'),answer:true},
   { question:__('1 The jirafa is the only mammal that does not have vocal cords'),answer:true}, { question:__('The perezoso is the most sleeping animal'),answer:true},
   { question:__('Rabbits are rodents'),answer:true}, { question:__('The ostrich\'s eye is bigger than its brain'),answer:true}, { question:__('second to the periodic table H2O is water'),answer:true}];
  
  var RandomQuestion = this.selectRamdomFromArray(QuestionsArray);
  
    this.showButtonsChoice(from, monospace + nl + RandomQuestion.question
      + nl +' 🤓' + monospace, '' + NameBot, [{
    'quickReplyButton': {
      'displayText': `[ VERDADERO ]`,
      'id': Bot.prefix + 'vofrpt1 ' + RandomQuestion.answer
    }
  }, {
    'quickReplyButton': {
      'displayText': '[ FALSO ]',
      'id': Bot.prefix + 'vofrpt2 ' + RandomQuestion.answer
    }
  }])
 this.setUserConstraints()
  
},
runVofrpt1: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isREGISTERED && !isFromME) return;
  if(q=== true){
    this.sendMentionedMessage(AtSenderNUMBER + ' '+ __(`You you're right`))
  }else {
    this.sendMentionedMessage(AtSenderNUMBER + ' '+ __(`you're wrong`))
  }
  this.sendMentionedMessage(AtSenderNUMBER + ' '+ __(`why?`))
  this.addSPAMFilter(from);
},
runVofrpt2: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isREGISTERED && !isFromME) return;
  if(q=== false) {
    this.sendMentionedMessage(AtSenderNUMBER + ' '+ __(`You you're right`))
  }else {
    this.sendMentionedMessage(AtSenderNUMBER + ' '+ __(`you're wrong`))
  }
  
  this.addSPAMFilter(from);
},
runVerip: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(boldSign + exc + __(' Introduzca una IP Address'));
  if (!q.includes('19')) return this.mySendMessage(boldSign + exc + ' Use una IP Address valida de clase \"C\" !*');
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
  const apiQuery = 'http://ip-api.com/json/' + q + `?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,asname,reverse,mobile,proxy,hosting,query`
  axios.get(apiQuery)
  .then(IP_INFO => {
    const msg = {
      'image': this.sendThumb,
      'jpegThumbnail': BotDB.mythumb,
      'caption': __('⚡ | '+__('IP ADDRESS INFO')+ ' |') + monospace
      + nl + '➢ '+__(`IP Address`) + ': ' + q
      + nl + '➢ '+__(`Mobile`) + ': '
+ (IP_INFO.data['mobile'] ? `[✓]` : `[X]`)
+ nl + '➢ '+__(`Continent` ) +': '
+ (IP_INFO.data['continent'] ? IP_INFO.data.continent : __(`Not Found!`))
+ nl + '➢ '+__(`Continent Code`) + ': '
+ (IP_INFO.data['continentCode'] ? IP_INFO.data['continentCode'] : __(`Not Found!`))
+ nl + '➢ '+__('Country') + ': '
+ (IP_INFO.data.country ? IP_INFO.data.country : __(`Not Found!`))
+ nl + '➢ '+__('Country Code') +': '
+ (IP_INFO.data.countryCode ? IP_INFO.data.countryCode : __(`Not Found!`))
+ nl + '➢ '+__(`Region`) + ': '
+ (IP_INFO.data['region'] ? IP_INFO.data['region'] : __(`Not Found!`))
+ nl + '➢ '+__(`Region Name`) + ': '
+ (IP_INFO.data['regionName'] ? IP_INFO.data.regionName : __('Not Found!'))
+ nl + '➢ '+__(`City`) + ': '
+ (IP_INFO.data['city'] ? IP_INFO.data['city'] : __(`Not Found!`))
+ nl + '➢ '+__('District') +': '
+ (IP_INFO.data['district'] ? IP_INFO.data['district'] : __(`Not Found u.u`))
+ nl + '➢ '+__('Postal Code: ')
+ (IP_INFO.data['zip'] ? IP_INFO.data['zip'] : __('Not Found u.u'))
+ nl + '➢ '+__(`Latitude`) + ': '
+ (IP_INFO.data.lat ? IP_INFO.data['lat'] : __('Not Found!'))
+ nl + '➢ '+__(`Longitude` ) + ': '
+ (IP_INFO.data['lon'] ? IP_INFO.data['lon'] : __(`Not Found!`))
+ nl + '➢ '+__(`Timezone`) + ': '
+ (IP_INFO.data['timezone'] ? IP_INFO.data['timezone'] : __(`Not Found!`))
+ nl + '➢ '+__(`Offset`) + ': '
+ (IP_INFO.data['offset'] ? IP_INFO.data['offset'] : __(`Not Found!`))
+ nl + '➢ '+__(`Local Currency` ) + ': '
+ (IP_INFO.data.currency ? IP_INFO.data['currency'] : __('Not Found!'))
+ nl + '➢ '+__(`Internet Provider`) + ': '
+ (IP_INFO.data.isp ? IP_INFO.data['isp'] : __('Not Found!'))
+ nl + '➢ '+__(`Organization`) + ': '
+ (IP_INFO.data['org'] ? IP_INFO.data['org'] : __(`Not Found!`))
+ nl + '➢ '+__(`Sociedad `) + ': '
+ (IP_INFO.data.as ? IP_INFO.data.as : __(`Not Found!`))
+ nl + '➢ '+__(`DNS`) +': '
+ (IP_INFO.data['reverse'] ? IP_INFO.data['reverse'] : __(`Not Found u.u`))
+ nl + '➢ '+__('proxy Server') + ': '
+ (IP_INFO.data['proxy'] ? '[✓]' : `[X]`)
+ nl + '➢ '+__(`Site web`) + ': '
+ (IP_INFO.data['hosting'] ? `[✓]` : `[X]`) + nl + monospace
    }
    client.sendMessage(from, msg, {
      'quoted': this.msgQuote
    });
  }, error => {
    
    this.mySendMessage(BotDB.idiomas.Erreply());
  })
  this.setUserConstraints();
}, */
/*
runMediafire: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
 if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
 
 if (!q) return this.mySendMessage(boldSign + exc + __(' Y el Link?'));
 if (!this.isURL(args[0]) && !args[0].includes(`mediafire`)) return this.sendMentionedMessage(boldSign + exc + __(' Link invalido*')
 + nl
 + '_' + __('Please')+ ', ' + ' ' + __('use un link de MediaFire') + '_');
 this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
 const _0x621bdb = await LibraryDB.ScrapMini.dlmediafire(q);
 (client.sendMessage(from, {
   'document': {
     'url': _0x621bdb[0]['link']
   },
   'mimetype': _0x621bdb[0]['mime'],
   'fileName': '' + _0x621bdb[0]['Name'],
   'jpegThumbnail': BotDB.mythumb
 }, {
   'quoted': this.msgQuote
 }), this.setUserConstraints());
},
runPlay: async (commandObj) =>
{
 if (isBanned) return;
 if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
 if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
 if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
 this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
 let _0xfffff2 = encodeURIComponent(q);
 var apiResponse = null
 try {
   var nkResponse = await Utils.fetchJson(`https://nk-api.vercel.app/api/ytplay?apikey=` + MyApiKey + `&q=` + _0xfffff2)
   apiResponse = await axios.get('https://tinyurl.com/api-create.php?url=' + nkResponse['datos'].dl['mp3']);
   
 
 } catch (err) {
   this.logger.error(BotDB.idiomas.ErrorFetch(command));
 }

 let _0x2140f5 = apiResponse ?apiResponse['data'] : ''
 let _0x288963 = await Utils.getBuffer(nkResponse['informacion']['thumbnail']);
 await client.sendMessage(from, {
   'text': monospace + `Enviando audio, espere...` + monospace,
   'contextInfo': {
     'externalAdReply': {
       'title': '' + nkResponse['informacion']['title'],
       'body': `1:23 ━━━━●───────── ` + nkResponse['informacion']['timestamp'],
       'previewType': 'PHOTO',
       'thumbnailUrl': '',
       'thumbnail': _0x288963,
       'sourceUrl': _0x2140f5
     }
   }
 }, {
   'quoted': this.msgQuote
 })
 client.sendMessage(from, {
   'audio': {
     'url': _0x2140f5
   },
   'mimetype': 'audio/mpeg',
   'fileName': nkResponse['informacion'].title + '.mp3'
 }, {
   'quoted': this.msgQuote
 })
 this.addSPAMFilter(from)
 this._user.addXp(this.from, 450)
 this._user.addLevel(this.from, 1)
 
},
runPlay2: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
 if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
 if (!q) return this.mySendMessage(BotDB.idiomas['NoTexto']());
 this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
 let _0x54f0c8 = encodeURIComponent(q);
 try {
   var _0x1f9dc6 = await Utils.fetchJson(`https://nk-api.vercel.app/api/yts?apikey=` + MyApiKey + `&q=` + _0x54f0c8);
 } catch (_0x5983c8) {
   this.logger.error(BotDB.idiomas.ErrorFetch(command));
 }
 var _0x41ec43 = ['0', '1', '2'], _0xe33c35 = this.selectRamdomFromArray(_0x41ec43);
 let _0x4f703b = _0x1f9dc6.data[_0xe33c35], _0x1a15d7 = await Utils.getBuffer(_0x4f703b['thumbnail']);
 const botonez = [{
   'buttonId': Bot.prefix + `ytmp3 ` + _0x4f703b['url'],
   'buttonText': {
     'displayText': `[ AUDIO MP3 🔊 ]`
   },
   'type': 0x1
 }, {
   'buttonId': Bot.prefix + `ytmp4 ` + _0x4f703b['url'],
   'buttonText': {
     'displayText': `[ VIDEO MP4 🎞️ ]`
   },
   'type': 0x1
 }]
 client.sendMessage(from, {
   'caption': `✍️ Title ` + ': ' + _0x4f703b['title'] + `
⚡ Autor ` + ': ' + _0x4f703b.author.name + `
⏰ Duracion ` + ': ' + _0x4f703b['timestamp'] + `
👀 Vistas ` + ': ' + _0x4f703b.views + `
📆 Data de subida ` + ': ' + _0x4f703b['ago'] + `
📺 Canal ` + ': ' + _0x4f703b.author['url'] + `
📃 Description ` + ': ' + _0x4f703b['description'] + `
🧬 ID ` + ': ' + _0x4f703b['videoId'] + `
🌐 Url ` + ': ' + _0x4f703b.url,
   'footer': NameBot + ' 🔥',
   'location': {
     'jpegThumbnail': _0x1a15d7
   },
   'buttons': botonez,
   'headerType': 'LOCATION',
   'mentions': [this._sender]
 })
 this.setUserConstraints()
},
runFacebook: async (commandObj) =>
   {
     if (isBanned) return;
     if (!this.isBotController && this._user.isLimited) return;
     if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
     if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
     if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
     if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
     if (!q) return this.mySendMessage(boldSign + exc + __(' Y el Link?'));
     if (!this.isURL(q)) return this.mySendMessage(boldSign + exc + ' ' + __('Invalid Link')+ '*'
     + nl
     + '_' + __('Please') + ', ' + ' ' + __('use a Facebook Watch link')+ '_'
     + nl
     + __('Ejm : ') + (Bot.prefix + command) + ` https://fb.watch/bhndro5Un-/`);
     
     if (!q.includes(`fb.watch`)) return this.mySendMessage(boldSign + exc + __(' ' + __('Invalid Link')+ '*')
     + nl
     + '_' + __('Please') + ', ' + ' ' + __('use a Facebook Watch link') + '_'
     + nl+ __('nEjm : ') + (Bot.prefix + command) + ` https://fb.watch/bhndro5Un-/`);
     
     this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
     let apiResponse:any = await LibraryDB.ScrapMini.aiovideodl(this.isURL(q)[0]);
     var myMedia = apiResponse['medias'];
     
     const fbthumb = await Utils.getBuffer(apiResponse.thumbnail)
     const botonez = [{
       'buttonId': Bot.prefix + `fbsd ` + myMedia[0]['url'],
       'buttonText': {
         'displayText': 'VIDEO SD 💿'
       },
       'type': 0x1
     }, {
       'buttonId': Bot.prefix + `fbhd ` + myMedia[1].url,
       'buttonText': {
         'displayText': 'VIDEO HD 📀'
       },
       'type': 0x1
     }]
     client.sendMessage(from, {
       'caption': `✍️ Title ` + ': ' + apiResponse['title'] + `
🌐 Url ` + ': ' + apiResponse['url'] + `
┏━⊱🎥 Quality ` + ': ' + myMedia[0]['quality'] + `
┗⊱💿 Size ` + ': ' + myMedia[0].formattedSize + `
┏━⊱📽️ Quality ` + ': ' + myMedia[1]['quality'] + `
┗⊱📀 Size ` + ': ' + myMedia[1]['formattedSize'],
       'footer': NameBot + ' 🔥',
       'location': {
         'jpegThumbnail': fbthumb
       },
       'buttons': botonez,
       'headerType': 'LOCATION',
       'mentions': [this._sender]
     })
     this.setUserConstraints();
   },
   runFbsd: async (commandObj) =>
   {
     if (isBanned) return;
     if (!this.isBotController && this._user.isLimited) return;
     if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
     if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
     if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
     if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
     if (!q) return this.mySendMessage(boldSign + exc + ' Y el Link?*');
     if (!this.isURL(q)) return;
     this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
     client.sendMessage(from, {
       'video': {
         'url': q
       },
       'fileName': 'fbsd.mp4',
       'mimetype': `video/mp4`
     }, {
       'quoted': this.msgQuote
     })
     this.addSPAMFilter(from)
     this._user.limitInc = 1;
   },
   runFbhd: async (commandObj) =>
   {
     if (isBanned) return;
     if (!this.isBotController && this._user.isLimited) return;
     if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
     if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
     if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
     if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
     if (!q) return this.mySendMessage(boldSign + exc + __(' Y el Link?'));
     if (!this.isURL(q)) return;
     
       this.showProcessingMsg(BotDB.idiomas.ProCes(pushname)), client.sendMessage(from, {
       'video': {
         'url': q
       },
       'fileName': `fbsd.mp4`,
       'mimetype': `video/mp4`
     }, {
       'quoted': this.msgQuote
     })
     this.setUserConstraints();
   
   },*/
/*
runHwaifu: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isNSFWModeOn) return;
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
try {
var nekosResponse = await Utils.fetchJson(`https://waifu.pics/api/nsfw/waifu`);
} catch (err) {
console.log(__(`Error fetch, err`) + ': ' + err);
console.log(__('Error fetch, comand')+': ' + command);
}
var buffer = await Utils.getBuffer(nekosResponse.url);
this.sendMessageCOMMAND(buffer, BotDB.getImageJpg('nsfw'), BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
this.setUserConstraints();
},
runHneko: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isNSFWModeOn) return;
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
try {
var nekosResponse = await Utils.fetchJson(`https://waifu.pics/api/nsfw/neko`);
} catch (_0x4fb0b3) {
this.logger.error(BotDB.idiomas.ErrorFetch(command));
}
var buffer = await Utils.getBuffer(nekosResponse['url']);

this.sendMessageCOMMAND(buffer, BotDB.getImageJpg('nsfw')
,BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
this.setUserConstraints()

},
runTraph: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isNSFWModeOn) return;
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
try {
var nekosResponse = await Utils.fetchJson(`https://waifu.pics/api/nsfw/trap`);
} catch (err) {
console.log(__(`Error fetch, err`) + ': ' + err);
console.log(__('Error fetch, comand')+': ' + command);
}
var buffer = await Utils.getBuffer(nekosResponse['url']);
(this.sendMessageCOMMAND(buffer, BotDB.getImageJpg('nsfw'), BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER)), this.setUserConstraints());
},
runLewd: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isNSFWModeOn) return;
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
try {
var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/lewd`);
} catch (err) {
console.log(__(`Error fetch, err`) + ': ' + err);
console.log(__('Error fetch, comand')+': ' + command);
}
var buffer = await Utils.getBuffer(nekosResponse['url']);
(this.sendMessageCOMMAND(buffer, BotDB.getImageJpg('nsfw'), BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER)), this.setUserConstraints());
},
runStickerh: async (commandObj) =>
{
if (isBanned) return;
if (!this.isBotController && this._user.isLimited) return;
if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
if (!isNSFWModeOn) return;
if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
var stkArray = ['nsfw_neko_gif', 'blowjob', 'pussy', `Random_hentai_gif`, 'feetg', 'spank', `kuni`, `classic`, `boobs`, `anal`, 'solog', `les`]
var _0x37ab57 = this.selectRamdomFromArray(stkArray);
try {
var nekosResponse = await Utils.fetchJson('https://nekos.life/api/v2/img/' + _0x37ab57);
} catch (err) {
console.log(__(`Error fetch, err`) + ': ' + err);
console.log(__('Error fetch, comand')+': ' + command);
}
var buffer = await Utils.getBuffer(nekosResponse['url'])
, _0x13f676 = await client.sendVideoAsSticker(from, buffer, msg, {
'packname': '' + groupName,
'author': '' + (NameBot ? NameBot : Bot.botName)
});

await fs.unlinkSync(_0x13f676.buffer), this.setUserConstraints()

},*/
/*
runSfx: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (!isGroupMsg) return this.mySendMessage(boldSign + exc + __(' Este comando solo se puede usar en grupos'));
  let _0x3fb5ef = __('*[CLAVES DE AUDIOS]')
  + `\nᴺᵒ ᵉˢ ⁿᵉᶜᵉˢᵃʳᶦᵒ ᵘˢᵃʳ ᵉˡ ᵖʳᵉᶠᶦʲᵒ \n~`
  + Bot.prefix
  + '~\n'
  + nwn
  + ' '
  + monospace
  + nl + '♬ ' + `kawai`
  + nl + '♬ ' + `baka`
  + nl + '♬ ' + `onichan`
  + nl + '♬ ' + `yamete`
  + nl + '♬ ' + `kudasai`
  + nl + '♬ ' + `yutki`
  + nl + '♬ ' + `yokese`
  + nl + '♬ ' + `yajaro`
  + nl + '♬ ' + `woau`
  + nl + '♬ ' + `unga`
  + nl + '♬ ' + `umai`
  + nl + '♬ ' + `imaaa`
  + nl + '♬ ' + `uchinchi`
  + nl + '♬ ' + `tuturu`
  + nl + '♬ ' + `talcho`
  + nl + '♬ ' + `ssss`
  + nl + '♬ ' + `ohayou`
  + nl + '♬ ' + `sempai`
  + nl + '♬ ' + `pupu`
  + nl + '♬ ' + `pikachu`
  + nl + '♬ ' + `ooaa`
  + nl + '♬ ' + `omg`
  + nl + '♬ ' + `omaiwa`
  + nl + '♬ ' + `omaiga`
  + nl + '♬ ' + `ñañañi`
  + nl + '♬ ' + `ñaña`
  + nl + '♬ ' + `nya`
  + nl + '♬ ' + `niconico`
  + nl + '♬ ' + `nani`
  + nl + '♬ ' + `motomoto`
  + nl + '♬ ' + `mma`
  + nl + '♬ ' + `mitamita`
  + nl + '♬ ' + `kobarashi`
  + nl + '♬ ' + `kataka`
  + nl + '♬ ' + `jai`
  + nl + '♬ ' + `jentai`
  + nl + '♬ ' + `asennn`
  + nl + '♬ ' + `anana`
  + nl + '♬ ' + `ª`
  + nl + '♬ ' + `ara ara`
  + nl + '♬ ' + `si 👍`
  + nl + '♬ ' + `no returbio`
  + nl + '♬ ' + `oh me vengo`
  + nl + '♬ ' + `con flores`
  + nl + '♬ ' + `no digas eso papu`
  + nl + '♬ ' + `no chupala`
  + nl + '...'
  + nl + monospace;
  
  await client.sendMessage(from, {
    'text': _0x3fb5ef,
    'contextInfo': {
      'externalAdReply': {
        'title': pushname + ' Do you want to contribute with an audio?',
        'body': `Toca aqui ;3`,
        'sourceUrl': `https://api.whatsapp.com/send?phone=${ Bot.CREATOR_NUMBER}&text=Wenasss%2C%20quiero%20aportar%20audios%20al%20bot%20%0ATipo%20de%20audio%3A%20%0ADuracion%3A%20`,
        'thumbnail': this.sendThumb
      }
    }
  }, {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': this.msgQuote
  })
  this.setUserConstraints()
  
},*/
/*
runStats: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 
   let botonez = [{
   'buttonId': Bot.prefix + 'rebote',
   'buttonText': {
     'displayText': `[PING 🏓]`
   },
   'type': 0x1
 }]
 client.sendMessage(from, {
   'caption': `
*Grupo* : _[ ` + groupName + ' ]_\n\n*Bot participante <[' + NameBot + `]>* : _` + _atBotNumber + '_\n\n*Bot admin* : _' + (isBotAdmin ? `[✓]` : '[X]') + '_\n\n*Bot* : _' + (this.isBodaoMode ? `MODO-PRIVADO [ ! ]` : `MODO-PUBLICO [✓]`) + `_

*Bot* : _` + (this.OnOffLine ? `MODO-SIN-LINEA [ ! ]` : 'MODO-EN-LINEA [✓]') + `_

*Anti-Privado* : _` + (this.isAntiPrivateModeOn ? 'ACTIVADO [✓]' : `DESACTIVADO [X]`) + `_

*Modo anime* : _` + (isAnimeModeOn ? 'Activo [✓]' : 'Inactivo [X]') + `_

*Modo full* : _` + (isFunModeOn ? 'Activo [✓]' : `Inactivo [X]`) + `_

*Modo NSFW* : _` + (isNSFWModeOn ? `Activo [✓]` : 'Inactivo [X]') + `_

*Nivelear* : _` + (isLevelinModeOn ? 'Activo [✓]' : `Inactivo [X]`) + `_

*Antilink* : _` + (isAntiLinkModeOn ? `Activo [✓]` : `Inactivo [X]`) + `_

*Antilink 2* : _` + (isAntiLinkGroupModeOn ? `Activo [✓]` : `Inactivo [X]`) + `_

*Bienvenida* : _` + (isWelcomeModeOn ? `Activo [✓]` : `Inactivo [X]`) + '_\n\n*No falsos* : _'
+ (isAntifakes1 ? 'Activo [✓]' : 'Inactivo [X]') + `_

*No falsos 2* : _`
+ (isAntifakes2 ? `Activo [✓]` : 'Inactivo [X]') + `_

*Antitraba* : _`
+ (isAntiVirtexModeOn ? `Activo [✓]` : `Inactivo [X]`)
+ '_\n\n*Anti extranjeros* : _'
+ (isForeignModeOn ? `Activo [✓]` : `Inactivo [X]`) + `_

*Chat bot* : _`
+ (isSIMIModeOn ? `Activo [✓]` : `Inactivo [X]`) + '_\n',
   'footer': NameBot + ' ✓',
   'location': {
     'jpegThumbnail': BotDB.images.logo
   },
   'buttons': botonez,
   'headerType': 'LOCATION',
   'mentions': [sender, cglobal]
 })
 this.setUserConstraints()
 
 
},
runOwner: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 
 const myVcard = 'BEGIN:VCARD\n' // metadata of the contact card
 + 'VERSION:3.0\r\n'
 + 'FN:'
 + Bot.cocreador +'\r\n' // full name
 + 'ORG:Bodão Corporation Powered by RL;\r\n' // the organization of the contact
 + `TEL;type=CELL;type=VOICE;waid=${ Bot.CREATOR_NUMBER}:${Bot.CREATOR_NUMBER_FORMATED}\r\n`
 + `TITLE;CHARSET=UTF-8:⚡ Creador Principal\r\n`
 + `URL;CHARSET=UTF-8:https://www.paypal.me/\r\n`
 + 'END:VCARD'
   //create a new vCard
   var vCard = vCardsJS();
   //set properties
   vCard.firstName = Bot.cocreador;
   //vCard.middleName = 'J';
   //vCard.lastName = 'Nesser';
   vCard.organization = 'Bodão Corporation Powered by RL';
   //vCard.photo.attachFromUrl('https://cdn2.iconfinder.com/data/icons/animals-hipsters/92/icon106-10-512.png', 'PNG');
   vCard.workPhone =`${Bot.CREATOR_NUMBER}`;
   //vCard.birthday = new Date(1985, 0, 1);
   vCard.title = '⚡ Creador Principal';
   vCard.url = 'https://www.paypal.me/';
   //vCard.note = 'Notes on Eric';
   //set social media URLs
   //vCard.workAddress.label = 'Work Address';
   //vCard.workAddress.street = '123 Corporate Loop\nSuite 500';
   //vCard.workAddress.city = 'Los Angeles';
   //vCard.workAddress.stateProvince = 'CA';
   //vCard.workAddress.postalCode = '54321';
   //vCard.workAddress.countryRegion = '🇧🇷 São Paulo Brazil';
   //vCard.socialUrls['facebook'] = BotDB._FACEBOOK_BODAO_ACCOUNT;
   //vCard.socialUrls['tiktok'] = BotDB._TIKTOK_BODAO_ACCOUNT;
   //vCard.socialUrls['youtube'] = BotDB._YOUTUBE_BODAO_PLAYLIST;
  
   //save to file
   //vCard.saveToFile('./eric-nesser.vcf');
   
   //get as formatted string
   let myVcard2 =vCard.getFormattedString();
 
 //PROPERTY[;PARAMETER]:attribute[;attribute]
 /*'BEGIN:VCARD'
 + 'VERSION:3.0'
 + 'FN:'
 + Bot.cocreador
 + nl
 + `ORG:Otakus Tecnológicos;`
 + `item1.TEL;waid=${ Bot.CREATOR_NUMBER}:${Bot.CREATOR_NUMBER_FORMATED}`
 + `item1.Label:⚡ Creador Principal`
 + `item2.TEL;waid=`
 + ('' + Bot.botcontrol[0].slice(0, -15))
 + ':+' + (''
 + Bot.botcontrol[0].slice(0, -15))
 + '\nitem2.X-ABLabel:🤝 Dueño actual\n'
 + 'item3.EMAIL;type=INTERNET:https://Bodão Corp.wordpress.com/'
 + 'item3.X-ABLabel:Email\n'
 + 'item4.URL;Web:https://www.paypal.me/teslamelendez'
 + 'item4.ADR:;;🇵🇪 Peru;;;;\nitem5.X-ABLabel:Sexy El Que Lo Lea 7w7\nEND:VCARD';
 */
/*
 await client.sendMessage(from, {
   'contacts': {
     'displayname': `Bodão Corp`,
     'contacts': [{
       'vcard': myVcard
     }]
   }
 }, {
   'quoted': this.msgQuote
 })
 this.setUserConstraints(800,5)
 
},
runInfoGroup: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
 function formatDate(myDate, lang = 'es') {
   
   let date = new Date(myDate);
   return date.toLocaleDateString(lang, {
     'weekday': `long`,
     'day': `numeric`,
     'month': 'long',
     'year': `numeric`,
     'hour': `numeric`,
     'minute': `numeric`,
     'second': 'numeric'
   });
 }
 const groupInfo = await client.groupMetadata(groupId);
 var groupInfoTxt = (boldSign + __('Goup Name') + boldSign + + ': '
   + groupInfo.subject
   + nl + boldSign + __('Created by') + boldSign + ': _'
   + groupInfo.owner ? groupInfo.owner : exc
   + __('Creator number not found')
   + nl + boldSign + __('Creation Date') + boldSign + ': _'
   + formatDate(groupInfo.creation * 1000)
   + nl + boldSign + __('Number of members') + boldSign + ': _'
   + groupInfo.participants.length
   + nl + boldSign + __('Number of Administrators') + boldSign + ': _'
   + groupInfo.participants.filter(_0x48692c => _0x48692c.admin === 'admin').length
   + nl + boldSign + __('No administrators') + boldSign + ': _'
   + groupInfo.participants.filter(_0x20c23b => _0x20c23b.admin === null).length
   + nl + boldSign + __('Group ID') + boldSign + ': _'
   + groupInfo.id
   + nl + boldSign + __('Description')+ boldSign + ': '
   + nwn
   + nl
   + groupInfo.desc).trim();

   const myMsg = {
     'image': this.picThumb,
     'jpegThumbnail': BotDB.mythumb,
     'caption': groupInfoTxt,
     'mentions': [this._sender]
   }

   const myOption = {
     'ephemeralExpiration': "0x18*0xe10",
     'quoted': msg
   }

 client.sendMessage(from, myMsg, myOption)
 this.setUserConstraints(450,2)
 
},
showAdmins: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 var teks = '*' + __('Group Administrators') + '*' + ': '
 + groupMetadata.subject
 + `*Total* : _`
 + groupAdmins.length
 + '_\n\n'
 var no = 0

 for (let _0x43b223 of groupAdmins) {
   
     no += 1
     teks += `🛡 [`
     + no['toString']()
     + '] ⚡ @'
     + _0x43b223.split('@')[0]
     + nl
    
 }
 const myMsg = {
   'text': teks,
   'mentions': [groupAdmins]
 }

 const myOptions = {
   'ephemeralExpiration': "0x18*0xe10",
   'quoted': {
     'key': {
       'participant': '0@s.whatsapp.net',
       'remoteJid': '0@s.whatsapp.net'
     },
     'message': {
       'groupInviteMessage': {
         'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
         'inviteCode': 'm',
         'groupName': 'P',
         'caption': '' + Utils.dateComplete,
         'jpegThumbnail': this.picThumb
       }
     }
   }
 }
 
 client.sendMessage(from, myMsg, myOptions)
 this.setUserConstraints()
 
},
runGetGlink: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
 var inviteCode = await client.groupInviteCode(from);
 const myMsg = {
   'text': 'https://chat.whatsapp.com/' + inviteCode,
   'matchedText': 'https://chat.whatsapp.com/' + inviteCode,
   'description': groupDesc,
   'title': groupName,
   'previewType': `NONE`,
   'jpegThumbnail': BotDB.mythumb,
   'inviteLinkGroupType': `DEFAULT`
 }
 const myOptions =  {
   'quoted': this.msgQuote
 }

 client.sendMessage(from, myMsg ,myOptions)
 this.setUserConstraints()
 
},*/
/*
  runHentai: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isNSFWModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  try {
    var nekosResponse = await Utils.fetchJson(`https://akaneko-api.herokuapp.com/api/hentai`);
  } catch (err) {
    console.log(__(`Error fetch, err`) + ': ' + err);
    console.log(__('Error fetch, comand')+': ' + command);
  }
  var buffer = await Utils.getBuffer(nekosResponse.url);
  
  this.sendMessageCOMMAND(buffer, BotDB.getImageJpg('nsfw'),
  BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
  this.setUserConstraints();
},
runHentai2: async (commandObj) =>
{
  //nekos.life does not support nfsw
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isNSFWModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
  try {
    var nekosResponse = await Utils.fetchJson(`https://nekos.life/api/v2/img/hentai`);
  } catch (_0x57ebc0) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  var buffer = await Utils.getBuffer(nekosResponse['url']);
  this.sendMessageCOMMAND(buffer, BotDB.getImageJpg('nsfw'), BotDB.idiomas.ImageRequestedBy(command, AtSenderNUMBER))
  this.setUserConstraints();
},
runPreguntame: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));//
  var myQuestions = [__(`¿Crees que las amistades son para siempre?`), __(`¿Hasta qué punto llegarías por conseguir fama?`),
  __(`¿Qué te frustra más no haber conseguido?`), __(`¿Qué talento desearía tener?`), __('¿Cómo definirías tu tipo de sentido del humor?'),
  __(`¿Qué tipo de personas son más atractivas para ti?`), __(`¿Quién te ha influenciado más en esta vida?`),
  __('¿Con qué personaje de ficción te identificas más?'), __('¿Cuál ha sido tu mejor momento de tu vida?'),
  __(`¿Qué es lo que echas más de menos de tu infancia?`), __('¿Quién es la persona más importante de tu vida?'),
  __('¿Qué tipo de música te gusta más?'), __(`Si te hicieras un tatuaje, ¿de qué se trataría?`),
  __(`¿Qué es lo que más deseas en este mundo?`), __('¿Cuál es tu película favorita? ¿Por qué?'),
  __(`¿Cuál es el recuerdo más vergonzoso de tu infancia?`), __(`¿Qué comerías en tu última cena?`),
  __(`¿Hay alguna prenda de ropa que no te pondrías nunca?`), __('¿Qué superpoder tendrías si pudieras elegir?'),
  __(`Si dominaras el mundo, ¿qué harías para cambiarlo?`),__(`¿Tienes algún libro favorito? ¿Cuál es?`),
  __('¿Cuál sería tu trabajo soñado?'), __(`¿Tienes algún secreto que no me hayas contado?`),
  __(`¿Alguna vez te has descargado una app para ligar?`), __('¿Te has sentido atraído hacia una hermana (o hermano) de un amigo/a?'),
  __('¿Quieres más a tu perro (o gato) que a algún otro miembro de tu familia?'), __('¿Qué tipo de personas te asustan más?'),
  __(`¿Qué es lo más extraño que has hecho por comer algo que te apetecía?`), __(`Si te gastaran una broma pesada, ¿cómo te vengarías?`),
  __(`¿Cómo sería un día perfecto para ti?`), __(`Si pudieses saber sólo una cosa del futuro, ¿qué preguntarías?`),
  __(`Si fueras un fantasma que habita una casa encantada, ¿Cómo atraerías a la gente dentro?`),
  __(`¿Qué es lo que te pone más nervioso?`), __(`¿Cuál es el momento en el que te has sentido más sexy a lo largo de tu vida?`),
  __(`¿Qué harías si te diera un ataque de risa en una situación inapropiada o en lugar del que no puedes salir?`),
  __(`¿Qué es lo más vergonzoso que te han atrapado haciendo?`), __('¿A quién querrías ver desnudo/a y a quién odiarías ver así?'),
  __(`Si te tuvieras que poner un Name a ti mismo, ¿cuál sería?`), __(`¿Qué animal te gustaría ser y por qué?`),
  __(`¿Qué harías si ganaras la lotería?`), __(`Si pudieses intercambiar tu vida con alguien, ¿con quién sería?`),
  __('¿Cómo harías reír a alguien?'), __(`¿Qué parte de tu cuerpo te gusta más y por qué?`),
  __(`¿Qué es lo más loco que has hecho por amor?`), __('Si pudieras encerrar a alguien de por vida, ¿a quién sería?'),
  __(`¿Qué harías si un/a desconocido/a te besara en plena calle?`), __(`¿Cuál ha sido el sueño más extraño que has tenido nunca?`),
  __(`¿En qué época te hubiese gustado vivir?`),__(`¿Qué superpoder querrías tener?`),
  __(`Si tuvieras diez segundos para un deseo, ¿qué pedirías?`), __(`¿Sin cuál de los cinco sentidos podrías vivir?`),
  __('Si pudieras cenar con cualquier personaje histórico, ¿a quién elegirías?'),
  __(`Si te dijesen que eres inmortal y que ninguno de tus actos va a ser castigado, ¿qué sería lo primero que harías?`),
  __('Si fueses capaz de cambiar algo en el mundo... ¿qué cambiarías?'), __('Si pudieras viajar en el tiempo, ¿viajarías al pasado o al futuro?'),
  __(`¿Qué querías ser de adulto cuando eras niño?`), __('Si fueras un producto, ¿cuál sería tu Name?'),
  __('¿Por qué crees que te pusieron tu Name?'), __('¿crees que es peligroso comer halgo que cayo al suelo?'),
  __('Si los seres humanos crecemos a partir de aprender de nuestros errores, ¿por qué tenemos miedo a fallar?'),
  __(`¿Qué es lo que haces por la noche cuando no puedes dormir?`),__( '¿Cómo crees que vas a ser como pareja?'),
  __('¿Qué crees que es lo que te impide ser completamente feliz?'), __('¿Qué es lo que más miedo te da?'),
  __(`Si tuvieras suficiente dinero como para que no tener que trabajar nunca, ¿en qué te dedicarías en tu tiempo libre?`),
  __('¿Cómo cambiarías el mundo si pudieras?'), __(`Si pudieras convertirte en famoso, ¿qué te gustaría que fuera lo que te hiciera famoso?`),
  __(`Si pudieras viajar tres años atrás en el tiempo, ¿qué consejo te darías a ti mismo?`),
  __(`Piensa en la peor cosa que te haya ocurrido en toda tu vida. ¿Qué aprendiste sobre ello?`),
  __('¿Crees que el dinero ayuda a comprar la felicidad?'), __(`¿Cómo le explicarías la palabra “amor” a alguien sin usar la palabra “amor”?`),
  __(`¿Cómo describirías un día perfecto desde que te levantas hasta que te acuestas?`),
  __('¿Qué has aprendido en tu vida que consideras que te va a ser lo más útil?'), __(`Si pudieras vivir en cualquier lugar del mundo, ¿dónde sería?`),
  __(`Imagina que eres el presidente y necesitas escoger a tres personas para que te ayuden: ¿cuáles serían y por qué?`),
  __(`Si pudieras hacer un regalo a cada persona del mundo pero solo pudiera ser el mismo, ¿cuál sería?`),
  __(`Si pudieras tener un solo superpoder, ¿cuál sería?`), __(`¿Preferirías ser el jefe o un empleado?`),
  __(`¿Qué preferirías: 1.000.000 € hoy mismo o 1 céntimo duplicado cada día durante 30 días?`),
  __(`¿Crees que los de tu generación son realmente diferentes a cómo son las otras generaciones?`),
  __(`¿Cómo crees que se acabará el mundo?`), __(`¿Hay algo de tu cuerpo con lo que no te sientas a gusto?`),
  __(`¿Qué es lo que más te motiva?`), __(`¿Cómo de masculino o femenino te sientes?`), __(`¿Crees que los alienígenas existen?`),
  __('¿Qué series te gusta ver?'), __(`¿Quién es tu profesor favorito y cuál es el que peor te cae?`),
  __('¿Quién me dirías que es tu mejor amigo?'), __('¿Cuál crees que es la cosa más vergonzosa que ha hecho tu padre o madre?'),
  __(`¿Dónde te gustaría vivir?`), __(`¿En qué lugar transcurrirían tus vacaciones perfectas?`),
  __(`¿Me puedes describir tu dormitorio?`), __(`¿A qué personaje histórico te gustaría entrevistar?`),
  __('¿Qué tipo de ropa no llevarías puesta en ningún caso?'), __('¿Cuáles son tus tres bandas de música favoritas?')]
  

  var ramdomQuestion = this.selectRamdomFromArray(myQuestions);
  
  this.sendMentionedMessage('*' + pushname + '*'
  + '*~> _' + ramdomQuestion + '_*\n')
  this.setUserConstraints()
  
},
runComediante: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  try {
    var media = await fetch(`https://icanhazdadjoke.com/`, {
      'method': `GET`,
      'headers': {
        'Accept': 'application/json'
      }
    })
    var _0x3dc11f = await media['json']()
    var _0x1fecdc = encodeURIComponent(_0x3dc11f.joke)
    var translated = await Utils.fetchJson('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl='+Bot.numidioma+'&dt=t&q=' + _0x1fecdc)
    var _0x4a691f = translated[0]
    var _0x50c37a = _0x4a691f[1][0];
  } catch (_0x285d7a) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  await client.sendMessage(from, {
    'text': _0x4a691f[0][0],
    'mentions': [this._sender]
  }, {
    'ephemeralExpiration': "0x18*0xe10",
    'quoted': {
      'key': {
        'participant': '0@s.whatsapp.net',
        ...from ? {
          'remoteJid': Bot._2_QUANTUM_BOT_GROUP_ID
        } : {}
      },
      'message': {
        'videoMessage': {
          'title': `Sinsentido :v`,
          'h': `UwU`,
          'seconds': `359996400`,
          'gifPlayback': 'true',
          'caption': `Sinsentido :v`,
          'jpegThumbnail': BotDB.getImageJpg('ComediaHD')
        }
      }
    }
  })
  setTimeout(() => {
    this.sendMentionedMessage(_0x50c37a ? _0x50c37a : 'Mucha comedia 🤡');
  }, 3500)
  this.setUserConstraints()
  
  
},
runConsejo: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  try {
    var _0x3656fb = await Utils.fetchJson('https://api.adviceslip.com/advice')
    var _0xa3f904 = await Utils.fetchJson('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=es&dt=t&q=' + _0x3656fb['slip']['advice']);
  } catch (err) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  
    this.sendMentionedMessage(_0xa3f904[0][0][0])
    this.setUserConstraints()
},
    runTiktok: async (commandObj) =>
    {
      if (isBanned) return;
      if (!this.isBotController && this._user.isLimited) return;
      if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
      if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
      if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
      if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
      if (!q) return this.mySendMessage(boldSign + exc + __(' Introduzca el Name de User valido'));
      if (q.includes('https://')) return this.mySendMessage(`Please, solo use un Name o nickname!`);
      this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
      try {
        var apiResponse = await Utils.fetchJson(`https://www.tiktok.com/node/share/user/@` + q + '?user_agent=USER_AGENT&validUniqueId=USERNAME', {
          'method': 'GET',
          'headers': {
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36',
            'Accept': `application/json; charset=UTF-8`
          }
        });
      } catch (err) {
        this.logger.error(BotDB.idiomas.ErrorFetch(command));
      }
      let gMetaParams = apiResponse['seoProps'].metaParams
      let myUserInfo = apiResponse['userInfo'].user
      let myUserStats = apiResponse['userInfo']['stats'];
      let myBuffer = await Utils.getBuffer(apiResponse['userInfo'].user['avatarLarger']);
      
      const myWAMessageContent = Waproto.Message.fromObject({
        'templateMessage': {
          'hydratedTemplate': {
            'hydratedContentText': `✍️` + __(`Title`) + ': ' + gMetaParams.title
            + nl + `⚡ `+__(`User`) + ': ' + myUserInfo['uniqueId']
            + nl + `🔥 `+__(`NickName`) + ': ' + myUserInfo['nickname']
            + nl + `📝 `+__(`Signature`) + ': ' + myUserInfo.signature
            + nl + `🎭 `+__(`Followers`) + ': ' + myUserStats['followerCount']
            + nl + '🤝 '+__('Following') +': ' + myUserStats['followingCount']
            + nl + `❤️ `+__(`Likes`) + ': ' + myUserStats['heartCount']
            + nl + '🎞️ '+__('Videos') +': ' + myUserStats['videoCount']
            + nl + `🌐 `+__(`ID`) + ': ' + myUserInfo.id
            + nl + `📄 `+__(`Description`) + ': ' + gMetaParams.description,
            'locationMessage': {
              'jpegThumbnail': myBuffer
            },
            'hydratedFooterText': NameBot + ` ✓` + nl + ` ` + gMetaParams['applicableDevice'],
            'hydratedButtons': [{
              'urlButton': {
                'displayText': gMetaParams['keywords'],
                'url': gMetaParams.canonicalHref
              }
            }]
          }
        }
      })

      const myMessageGenerationOptionsFromContent = {
        'userJid': sender,
        'quoted': this.msgQuote
      }

      //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
      const media = generateWAMessageFromContent(from, myWAMessageContent,myMessageGenerationOptionsFromContent );
      await client.relayMessage(from, media.message, {
        'messageId': media.key.id
      });
      return this.setUserConstraints();
    },
    runTiktokdl: async (commandObj) =>
    {
      if (isBanned) return;
      if (!this.isBotController && this._user.isLimited) return;
      if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
      if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
      if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
      if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
      if (!q) return this.mySendMessage(boldSign + exc + __(' Y el Link?'));
      
      if (!this.isURL(q)) return this.mySendMessage(boldSign + exc + ' ' + __('Invalid Link')+ '*' + nl +'_' + __('Please')+ ', '+' use un link de Tik Tok_\nEjm : ' + (Bot.prefix + command) + ` https://vm.tiktok.com/ZMLr2J6xS/`);
      
      if (!q.includes(`vm.tiktok.com`)) return this.mySendMessage(boldSign + exc + __(' ' + __('Invalid Link')+ '*')
      +nl+ '_' + __('Please') + ', ' + ' ' + __('use un link de Tik Tok') + '_'
      + __('    Ejm : ') + (Bot.prefix + command) + ' https://vm.tiktok.com/ZMLr2J6xS/');
      
      this.showSearchingMessage(BotDB.idiomas.SearchResult(pushname));
      let apiResponse:any = await LibraryDB.ScrapMini.aiovideodl(this.isURL(q)[0]);
      let myMedias = apiResponse['medias'];
      let myBuffer = await Utils.getBuffer(apiResponse['thumbnail']);
      const botonez = [{
        'buttonId': Bot.prefix + `tkmp3 ` + myMedias[2]['url'],
        'buttonText': {
          'displayText': `AUDIO 📼`
        },
        'type': 0x1
      }, {
        'buttonId': Bot.prefix + 'tkvid ' + myMedias[1]['url'],
        'buttonText': {
          'displayText': `VIDEO 🎞️`
        },
        'type': 0x1
      }]
      client.sendMessage(from, {
        'caption': `✍️ `+ __(`Title`) + ': ' + apiResponse['source']
        + nl + `#️⃣ `+ __(`Description`) + ': ' + apiResponse['title']
        + nl + `🌐 `+ __(`Url`) + ': ' + apiResponse['url']
        + nl + `┏━━⊱📻 `+ __(`Quality`) + ': ' + myMedias[2]['quality']
        + nl + `┣━⊱📼 `+ __(`Extension`) + ': ' + myMedias[2].extension
        + nl + `┗⊱💿 `+ __(`Size`) + ': ' + myMedias[2]['formattedSize']
        + nl + `┏━━⊱📽️ `+ __(`Quality`) + ': ' + myMedias[1]['quality']
        + nl + `┣━⊱🎞️ `+ __(`Extension`) + ': ' + myMedias[1].extension
        + nl + `┗⊱📀 `+ __(`Size`) + ': ' + myMedias[1].formattedSize,
        'footer': NameBot + ' 🔥',
        'location': {
          'jpegThumbnail': myBuffer
        },
        'buttons': botonez,
        'headerType': 'LOCATION',
        'mentions': [this._sender]
      })
      this.setUserConstraints()
     },
    runTkmp3: async (commandObj) =>
    {
      if (isBanned) return;
      if (!this.isBotController && this._user.isLimited) return;
      if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
      if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
      if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
      if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
      if (!q) return this.mySendMessage(boldSign + exc + __(' Y el Link?'));
      if (!this.isURL(q)) return;
      this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
      client.sendMessage(from, {
        'audio': {
          'url': q
        },
        'mimetype': 'audio/mp4',
        'fileName': `TktkMp3.mp3`
      }, {
        'quoted': this.msgQuote
      })
      this.addSPAMFilter(from)
      this._user.limitInc = 1;
    },
    runTkvid: async (commandObj) =>
    {
      if (isBanned) return;
      if (!this.isBotController && this._user.isLimited) return;
      if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
      if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
      if (!isFunModeOn) return this.mySendMessage(boldSign + exc + ' El modo full esta desactivado*');
      if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
      if (!q) return this.mySendMessage(boldSign + exc + __(' Y el Link?'));
      if (!this.isURL(q)) return;
      
      this.showProcessingMsg(BotDB.idiomas.ProCes(pushname))
      client.sendMessage(from, {
        'video': {
          'url': q
        },
        'fileName': 'TktkVid.mp4',
        'mimetype': `video/mp4`
      }, {
        'quoted': this.msgQuote
      })
      this.setUserConstraints();
    },
    

runAttp: async (commandObj) =>
{
  if (isBanned) return;
  if (!this.isBotController && this._user.isLimited) return;
  if (this.OnOffLine === true) return this.mySendMessage(boldSign + exc + ' El bot quedo sin internet (>﹏<)*');
  if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
  if (!isFunModeOn) return;
  if (!isREGISTERED && !isFromME) return this.showNotRegisteredMSG(BotDB.idiomas.NoReg2(Bot.prefix));
  if (!q) return this.mySendMessage(BotDB.idiomas.NoTexto());
  let _0x218c4e = encodeURIComponent(q);
  try {
    var apiResponse = await Utils.getBuffer('https://api.xteam.xyz/attp?file&text=' + _0x218c4e);
  } catch (_0x5488df) {
    this.logger.error(BotDB.idiomas.ErrorFetch(command));
  }
  try {
    let _0x5d78c0 = `data:image/jpeg;base64,` + apiResponse['toString'](`base64`);
    var _0x5702a1 = await Utils.convertSticker(_0x5d78c0, (pushname ? pushname : Bot.cocreador) + ` & ` + NameBot, '' + (groupName ? groupName : `Bodão Corp`))
    var _0x4706ae = Buffer.from(_0x5702a1, `base64`);
    await client.sendMessage(from, {
      'sticker': _0x4706ae
    }, {
      'quoted': this.msgQuote
    });
  } catch (_0x1fcaef) {
    
      console.log(`Error: convertSticker`)
      client.sendMessage(from, {
      'sticker': apiResponse
    }, {
      'quoted': this.msgQuote
    })
    
  }
  this.setUserConstraints()
}, */
/*

runApoio: async (commandObj) =>

{
 if (isBanned) return;
 
 const sendSupportMsg = async (_0x26f8c8, content, footer, _0x471dd0) => {
   const myWAMessageContent = {
     'templateMessage': {
       'hydratedTemplate': {
         ..._0x471dd0.message,
         'hydratedContentText': content,
         'hydratedFooterText': footer,
         'hydratedButtons': [{
           'urlButton': {
             'displayText': `YouTube [ > ]`,
             'url': BotDB._YOUTUBE_BODAO_PLAYLIST
           }
         }, {
           'urlButton': {
             'displayText': `Tik-Tok [Ꮄ]`,
             'url': BotDB._TIKTOK_BODAO_ACCOUNT
           }
         }, {
           'urlButton': {
             'displayText': `Facebook 🅵`,
             'url': BotDB._FACEBOOK_BODAO_ACCOUNT
           }
         }]
       }
     }
   }
   //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
   var  media = await generateWAMessageFromContent(from, myWAMessageContent, {}as MessageGenerationOptionsFromContent);
   client.relayMessage(_0x26f8c8, media.message, {
     'messageId': media.key.id
   });
 };
 
   client.sendPresenceUpdate('composing', from)
   const myFooter= 'Bodão Corp\nᴺᵃᵒ ᵖᵉᵈᶦᵐᵒˢ ᵈᶦⁿʰᵉᶦʳᵒ• ᵃᵖᵉⁿᵃˢ ˢᵉᵘ ᵃᵖᵒᶦᵒ ⁿᵒˢ ʳᵉᵈᵉˢ '
   const myOptions = await client.createMessage(from, {
     'image': BotDB.images.apoio,
     'jpegThumbnail': this.sendThumb,
     'caption': `💻 *Social Networks* 📲
` + nwn + BotDB.social
   })
   const myContent=`💻 *Social Networks* 📲
   ` + nwn + Bot.social

   await sendSupportMsg(from, myContent, myFooter,myOptions)

   this._user.limitDec = 4
   this._user.addXp(this.from, 10000)
   this._user.addLevel(this.from, 10)
 
},
runBanned: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 let txt = '*_Lista de Users baneados [✓]_*\n' + nwn;
 for (let _0x1a0904 of BotDB.ban) {
   txt += `
*[X]* ~@` + _0x1a0904.split('@')[0] + '~\n';
 }
 (txt += `
*Total* ` + ': ' + BotDB.ban.length, client.sendMessage(from, {
   'text': txt.trim(),
   'mentions': BotDB.ban
 }, {
   'ephemeralExpiration': "0x18*0xe10",
   'quoted': this.msgQuote
 }), this.setUserConstraints());
},
runWaInfo: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
   const msgText = `⚡ *LINKS DE TU NUMERO* ⚡` + nwn
   + nl + `*Solicitado por* ` + ': ' + pushname
   + nl + nl + ' ▪︎ *Your direct whatsapp link is* :'
   + nl + nl + '▪︎ https://wa.me/' + senderNUMBER
   + nl + '*You can use this other*'
   + nl + `▪︎ https://api.whatsapp.com/send?phone=` + senderNUMBER + ' '
   

   const myMSG = {
     'text': msgText,
     'contextInfo': {
       'externalAdReply': {
         'title': `Toque aqui para ver una prueba del link`,
         'body': '' + NameBot,
         'previewType': 'PHOTO',
         'thumbnailUrl': '',
         'thumbnail': this.sendThumb,
         'sourceUrl': 'https://wa.me/' + senderNUMBER + `?text=Hola+` + pushname + `%0D%0A%E1%B4%AE%CA%B8+%E1%B4%BA%E1%B4%B7`,
         'mentions': [this._sender]
       }
     }
   }

   const myOptions = {
     'ephemeralExpiration': "0x18*0xe10",
     'quoted': this.msgQuote
   }

   client.sendMessage(from, myMSG, myOptions)
   this.setUserConstraints();
},
runLimit: async (commandObj) =>
{
 if (isBanned) return;
 if (isBotController) return this.mySendMessage('*' + pushname + ` limite: infinito ∞*`);
 if (!this.isBotController && this._user.isLimited) return this.mySendMessage(boldSign + exc + ' Lo siento '
 + pushname
 + ` te quedaste sin límites para seguir usando al bot T~T*
ˢᶦ ˢᵘᵇᵉˢ ᵈᵉ ⁿᶦᵛᵉˡ• ˢᵉ ˡᵉ ʳᵉᵍᵃˡᵃʳᵃⁿ ~⁺³ ᵈᵉ ˡᶦ́ᵐᶦᵗᵉ~`);
 if (this.checkRemaininLimit()) return;
 
 this._user.addXp(this.from, 450)
 this._user.addLevel(this.from, 1);
},
runLevel: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!isLevelinModeOn) return this.mySendMessage(boldSign + exc + ' Nivel no activado*');
 const _0x4ea497 =this._user.getLevel(from), _0x2601d9 = this._user.getXp(from);
 if (_0x4ea497 === undefined && _0x2601d9 === undefined) return this.mySendMessage(boldSign + exc + ' Nivel no activado*');
 var _0x44fc4b = `┏━━━━❉ *Nivel* ❉━━━━
┣⊱ User` + ': ' + AtSenderNUMBER + `
┣⊱ Name` + ': ' + pushname + '\n┣⊱ XP conseguido asta el momento:  ' + _0x2601d9 + '\n┣⊱ Su nivel actual es: ' + _0x4ea497 + `
┣⊱ Nivel de poder` + ': ' + this.role2 + `
┣⊱ De acuerdo al nivel es` + ': ' + this.role + `
┣⊱ Progreso de nivel` + ': ' + this.levelBar + `
┗━━━━━━━━━━━━━`;
 
   client.sendMessage(from, {
   'image': this.sendThumb,
   'jpegThumbnail': BotDB.mythumb,
   'caption': _0x44fc4b,
   'mentions': [this._sender]
 }, {
   'quoted': this.msgQuote
 })
  this.setUserConstraints()
 
},
runShop: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 const myAnyMediaMessageContent = {
   'image': BotDB.images.logo ,
   'jpegThumbnail': this.sendThumb
 }
 const MediaGenerationOptions = {
   'upload': client.waUploadToServer
 }
 //message: AnyMediaMessageContent, options: MediaGenerationOptions
 const myPrepMedia = await prepareWAMessageMedia(myAnyMediaMessageContent,MediaGenerationOptions )
  
 //'businessOwnerJid' show the contact vcard no campo "sobre a empresa"
 const myWAMessageContent = Waproto.Message.fromObject({
   'productMessage': {
     'product': {
       'productImage': myPrepMedia.imageMessage,
       'productId': `4458590017530875`,
       'title': '' + (q ? q : NameBot),
       'currencyCode': `PEN`,
       'priceAmount1000': `-66999`,
       'productImageCount': 0x1
     },
     'businessOwnerJid': `${Bot.CREATOR_NUMBER}@s.whatsapp.net`
   }
 })
 const myMessageGenerationOptionsFromContent = {
   'userJid': from,
   'quoted': this.msgQuote
 }
 //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
 const media = generateWAMessageFromContent(from, myWAMessageContent , myMessageGenerationOptionsFromContent);
 const options = {
   'messageId': media.key.id
 }
 client.relayMessage(from, media.message, options)
 this.setUserConstraints()

},
runShopImg: async (commandObj) =>
{
 if (isBanned) return;
 if (!this.isBotController && this._user.isLimited) return;
 if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
 if (!quoted) return this.mySendMessage(BotDB.idiomas.QuImage(Bot.prefix, command));
 if (!this.isImage) return this.mySendMessage(BotDB.idiomas.QuImage(Bot.prefix, command));
 if (this.isWebP) return this.mySendMessage(BotDB.idiomas.QuImage(Bot.prefix, command));
 this.showProcessingMsg(BotDB.idiomas.ProCes(pushname));
 var media = await client.downloadAndSaveMediaMessage(quoted)
 var myPrepMedia = await prepareWAMessageMedia({
   'image': {
     'url': media
   }
 }, {
   'upload': client.waUploadToServer
 })
 //'businessOwnerJid' show the contact vcard no campo "sobre a empresa"
 const myWAMessageContent = Waproto.Message.fromObject({
   'productMessage': {
     'product': {
       'productImage': myPrepMedia.imageMessage,
       'productId': `4458590017530875`,
       'title': '' + NameBot,
       'currencyCode': `PEN`,
       'priceAmount1000': '-66999',
       'productImageCount': 0x1
     },
     'businessOwnerJid': `${ Bot.CREATOR_NUMBER}@s.whatsapp.net`
   }
 })
 const myMessageGenerationOptionsFromContent = {
   'userJid': from,
   'quoted': this.msgQuote
 }
 //jid: string, message: WAMessageContent, options: MessageGenerationOptionsFromContent
 const myMedia = generateWAMessageFromContent(from, myWAMessageContent, myMessageGenerationOptionsFromContent);

 const options = {
   'messageId': myMedia.key.id
 }
 client.relayMessage(from, myMedia.message,  options)
 this.setUserConstraints()
 
},
*/
/*
        runRoulette: async (commandObj) =>
        {
          if (isBanned) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!isBotAdmin) return this.mySendMessage(BotDB.idiomas.AdminBot());
          var _0x2ee2e9 = '' + sender;
          
            this.sendMentionedMessage('Que la suerte te acompañe ' + pushname)
            setTimeout(() => {
            
            const _0x1bf2e6 = [`salvado`, `sanpedro`, `salvado`, 'salvado', `salvado`, `salvado`, 'salvado', `salvado`, 'salvado', 'salvado', `salvado`, `salvado`, `salvado`, `salvado`, 'salvado', 'salvado', `sanpedro`]
            const _0x16064f = [`aDiosito`, `aDiosito`];
            
            const tpa = this.selectRamdomFromArray(_0x1bf2e6)
            const tpb = this.selectRamdomFromArray(_0x16064f)
            const figb = BotDB.getStickerWebP(tpb)
            var _0xfd5e2c = ''
            if (tpa == 'salvado') _0xfd5e2c = `*[✓]* _Salvado mi king_`;
            else {
              if (tpa == 'sanpedro') _0xfd5e2c = boldSign + exc + __('* _Press F en el chat_');
            }
            
              if (_0xfd5e2c == boldSign + exc + __('* _Press F en el chat_')) {
                setTimeout(() => {
                const myMsg = {
                    'sticker': figb,
                    'mentions': [this._sender]
                    }
                const myOptions = {
                  'quoted': {
                    'key': {
                      'participant': '0@s.whatsapp.net',
                      'remoteJid': '0@s.whatsapp.net'
                    },
                    'message': {
                      'groupInviteMessage': {
                        'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                        'inviteCode': 'm',
                        'groupName': 'P',
                        'caption': '🗡️ ' + pushname + ' 💀',
                        'jpegThumbnail': BotDB.images.pressF
                      }
                    }
                  }
                }
              
                client.sendMessage(from, myMsg, myOptions);
            }, 500), setTimeout(() => {
              
              client.groupParticipantsUpdate(from, [_0x2ee2e9], BotDB.idiomas.Remove).catch(err => {
                
                console.log(err), this.mySendMessage(BotDB.idiomas.Erreply())
              });
            }, 3100)
          }
            
            client.sendMessage(from, {
              'text': _0xfd5e2c,
              'mentions': [this._sender]
            }, {
              'quoted': {
                'key': {
                  'participant': '0@s.whatsapp.net',
                  'remoteJid': '0@s.whatsapp.net'
                },
                'message': {
                  'groupInviteMessage': {
                    'groupJid': Bot._0_BODAO_SUPPORT_BOT_GROUP_ID,
                    'inviteCode': 'm',
                    'groupName': 'P',
                    'caption': pushname + ` 🙏`,
                    'jpegThumbnail': this.sendThumb
                  }
                }
              }
            })
            
          }, 3000)
          
        },
        runSlander: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!q) return this.mySendMessage(boldSign + exc + __(' Use bien el comando :*') + (Bot.prefix + command) + ` @tag|mensaje|respuesta`);
          if (!q.includes('|')) return this.mySendMessage(boldSign + exc + __(' Agrege barras entre cada palabra todo junto*')

+ __('_Ejemplo de uso_ : ')
+ (Bot.prefix + command) + ` @Useretiquetado|bendiceme|bendecido
~No olvide usar esta barra~ : " | "`);
          var _0x4bd54d = msg.mentionedJid[0] ? msg.mentionedJid[0] : sender, _0x146aad = q.split('|')[1] ? q.split('|')[1] : `No hay texto :v`, _0x2bc0d9 = q.split('|')[2] ? q.split('|')[2] : AtSenderNUMBER + ' use 2 barras\n@tag|mensaje|respuesta ✓';
          (client.sendMessage(from, {
            'text': _0x2bc0d9
          }, {
            'quoted': {
              'key': {
                'fromMe': false,
                'participant': _0x4bd54d,
                ...from ? {
                  'remoteJid': from
                } : {}
              },
              'message': {
                'conversation': _0x146aad
              }
            }
          }), this.setUserConstraints());
        },
        runAFK: async (commandObj) =>
        {
          if (isBanned) return;
          if (!this.isBotController && this._user.isLimited) return;
          if (!isGroupMsg) return this.mySendMessage(BotDB.idiomas.SoloGp());
          if (!q) return this.sendMentionedMessage( __('Please state your reason for leaving AFK') + nl +  __('Example of use : ') + Bot.prefix +  __(`afk I'll be working`));
          if (q.length < 10) return this.mySendMessage(boldSign + exc + monospace +__('The reason is very short'));
          if (isAFK) return this.sendMentionedMessage(`Damn, if you're going to be ghosting in the group, it's recommended that you leave: v`);
          const reason = q ? q : __(`Nothing.`);
          try{

            //LibraryDB.afk.addAfkUser(sender, time, reason, BotDB.afk);
            this._user.enableAfk(time,reason)
            const msg = boldSign + __('AFK function activated successfully') + boldSign +
            + nl +'➸ '+ boldSign + __('User') + boldSign + ': ' + pushname +
            + nl +'➸ '+ boldSign + __('Razon') + boldSign + ': ' + reason;
            this.sendMentionedMessage(msg)
            this.addSPAMFilter(from)
            this._user.addXp(this.from, 450)
            this._user.addLevel(this.from, 1);
          } catch(err:any){
            console.log(err)
          }
          
        },*/
};
//# sourceMappingURL=oldComands.js.map
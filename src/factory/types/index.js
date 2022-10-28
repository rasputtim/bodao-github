import { EMediaConvertType, EQuotedReturnEnum } from '../interfaces/intPlugin.js';
import IMessageCore from '../interfaces/messageInt.js';
export { IMessageCore, EQuotedReturnEnum, EMediaConvertType };
/**
 * Using this function to initialize the variables typed planeModeCheck_t will
 * guaranee they have exclusive one key with true valoue while te other will e false in runtime
 * @param param0 PREMIUM OR COMMON
 * @returns the object typed planeModeCheck_t with exclusive one key being true
 */
export const PlaneMode = ({ PREMIUN, COMMON }) => {
    if (PREMIUN) {
        return {
            PREMIUN: true,
            COMMON: false
        };
    }
    else {
        return {
            PREMIUN: false,
            COMMON: true
        };
    }
};
/**
   * Using this function to initialize the variables typed offensiveModeCheck_t will
   * guaranee they have exclusive one key with true valoue while te other will e false in runtime
   * @param param0 NSFW,SFW
   * @returns the object typed offensiveModeCheck_t with exclusive one key being true
   */
export const OffensiveMode = ({ NSFW, SFW }) => {
    if (NSFW) {
        return {
            NSFW: true,
            SFW: false
        };
    }
    else {
        return {
            NSFW: false,
            SFW: true
        };
    }
};
/**
   * Using this function to initialize the variables typed registerModeCheck_t will
   * guaranee they have exclusive one key with true valoue while te other will e false in runtime
   * @param param0 REGISTERED, ALL
   * @returns the object typed registerModeCheck_t with exclusive one key being true
   */
export const RegisterMode = ({ REGISTERED, ALL }) => {
    if (REGISTERED) {
        return {
            REGISTERED: true,
            ALL: false
        };
    }
    else {
        return {
            REGISTERED: false,
            ALL: true
        };
    }
};
///Chat types
export const ChatType = {
    PRIVATE: 0,
    GROUP: 1,
    UNKNOWN: 2,
};
export const BotRoles = {
    CREATOR: 1,
    CONTROLLER: 2,
    OWNER: 3,
    BOTADMIN: 4,
    GROUPADMIN: 5,
    GROUPMODERATOR: 6,
    COMMONUSER: 7,
    UNKNOWN: 8,
};
//# sourceMappingURL=index.js.map
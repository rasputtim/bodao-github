export declare const nekosLife_img: {
    readonly TICKLE: "tickle";
    readonly SLAP: "slap";
    readonly POKE: "poke";
    readonly PAT: "pat";
    readonly NEKO: "neko";
    readonly MEOW: "meow";
    readonly LIZARD: "lizard";
    readonly KISS: "kiss";
    readonly HUG: "hug";
    readonly FOXGIRL: "foxGirl";
    readonly FEED: "feed";
    readonly CUDDLE: "cuddle";
    readonly NEKOGIF: "nekoGif";
    readonly KOMONOMIMI: "kemonomimi";
    readonly HOLO: "holo";
    readonly SMUG: "smug";
    readonly BAKA: "baka";
    readonly WOOF: "woof";
    readonly WALLPAPER: "wallpaper";
    readonly GOOSE: "goose";
    readonly GECG: "gecg";
};
export declare type nekosLife_img_t = typeof nekosLife_img[keyof typeof nekosLife_img];
export declare const nekosLife_img_neko: {
    readonly NEKO: "neko";
    readonly FOX_GIRL: "fox_girl";
    readonly NGIF: "ngif";
    readonly WAIFU: "waifu";
    readonly AVATAR: "avatar";
};
export declare type nekosLife_img_neko_t = typeof nekosLife_img_neko[keyof typeof nekosLife_img_neko];
export declare const nekosLifeCats: {
    WHY: string;
    CAT: string;
    OWOIFY: string;
    EIGHTBALL: string;
    FACT: string;
    SPOILER: string;
};
export declare type nekosLifeCats_t = typeof nekosLifeCats[keyof typeof nekosLifeCats];
export declare const nekosBestType: {
    readonly IMAGE: 1;
    readonly GIF: 2;
};
export declare type nekosBestType_t = typeof nekosBestType[keyof typeof nekosBestType];
export declare const nekosBestIMG: {
    readonly HUSBUNDO: "husbando";
    readonly KITSUNE: "kitsune";
    readonly NEKO: "neko";
    readonly WAIFU: "waifu";
};
export declare const nekosBestGIF: {
    readonly BAKA: "baka";
    readonly BITE: "bite";
    readonly BLUSH: "blush";
    readonly BORED: "bored";
    readonly CRY: "cry";
    readonly CUDDLE: "cuddle";
    readonly DANCE: "dance";
    readonly FACEPALM: "facepalm";
    readonly FEED: "feed";
    readonly HANDHOLD: "handhold";
    readonly HAPPY: "happy";
    readonly HIGHFIVE: "highfive";
    readonly HUG: "hug";
    readonly KICK: "kick";
    readonly KISS: "kiss";
    readonly LAUGH: "laugh";
    readonly PAT: "pat";
    readonly POKE: "poke";
    readonly POUT: "pout";
    readonly PUNCH: "punch";
    readonly SHOOT: "shoot";
    readonly SHRUG: "shrug";
    readonly SLAP: "slap";
    readonly SLEEP: "sleep";
    readonly SMILE: "smile";
    readonly SMUG: "smug";
    readonly STARE: "stare";
    readonly THINK: "think";
    readonly THUMBSUP: "thumbsup";
    readonly TICKLE: "tickle";
    readonly WAVE: "wave";
    readonly WINK: "wink";
    readonly YEET: "yeet";
};
export declare type nekosBestResultType1_t = {
    anime_name: string;
    url: string;
};
export declare type nekosBestResultType2_t = {
    artist_href: string;
    artist_name: string;
    source_url: string;
    url: string;
};
export declare type nekosBestError_t = {
    code: number;
    errors: string;
};
export declare type nekosBestResult_t = {
    results: nekosBestResultType1_t[] | nekosBestResultType2_t[];
};
declare class NekosLifeClient {
    endpoints: any;
    constructor();
}
export declare function getNekosBest(category?: "neko", amount?: number): Promise<boolean | nekosBestResultType1_t | nekosBestResultType2_t>;
/**
* search specific Anime from Nekos Best (https://nekos.best/)
* GET /search?query=Search_String&type=X&category=X&amount=X
* Type: Use the type query to get 1 images or 2 GIFs results.
* Optional parameters:  (category / amount)
*
* * categories:
* Categories
    Images (.png)
    husbando, kitsune, neko, waifu
    GIFs (.gif)

    baka, bite, blush, bored, cry, cuddle, dance, facepalm, feed, handhold, happy, highfive, hug, kick,kiss, laugh, pat, poke, pout, punch, shoot, shrug, slap, sleep, smile, smug, stare, think, thumbsup, tickle, wave, wink, yeet
* amount: The amount query may be used to retrieve multiple assets at once. The amount is a number such that 1 ≤ X ≤ 20.
 Result:
 "results":[
    {
       "anime_name":"Sword Art Online",
       "url":"https://nekos.best/api/v2/hug/008.gif"
    },
    {
       "anime_name":"Hibike! Euphonium",
       "url":"https://nekos.best/api/v2/hug/004.gif"
    }
 ]
    * @returns image from site Nekos.best
*/
export declare function searchNekosBest(search_string: any, type?: nekosBestType_t, category?: null, amount?: number): Promise<string | boolean | nekosBestResultType1_t | nekosBestResultType2_t | undefined>;
export declare const waifyPicsType: {
    readonly SFW: "sfw";
    readonly NSFW: "nsfw";
};
export declare type waifyPicsType_t = typeof waifyPicsType[keyof typeof waifyPicsType];
export declare const waifuPicsCatSFW: {
    readonly WAIFY: "waifu";
    readonly NEKO: "neko";
    readonly SHINOBU: "shinobu";
    readonly MEGUMIN: "megumin";
    readonly BULLY: "bully";
    readonly CUDDLE: "cuddle";
    readonly CRY: "cry";
    readonly HUG: "hug";
    readonly AWOO: "awoo";
    readonly KISS: "kiss";
    readonly LICK: "lick";
    readonly PAT: "pat";
    readonly SMUG: "smug";
    readonly BONK: "bonk";
    readonly YEET: "yeet";
    readonly BLUSH: "blush";
    readonly SMILE: "smile";
    readonly WAVE: "wave";
    readonly HIGHFIVE: "highfive";
    readonly HANDHOLD: "handhold";
    readonly NOM: "nom";
    readonly BITE: "bite";
    readonly GLOMP: "glomp";
    readonly SLAP: "slap";
    readonly KILL: "kill";
    readonly KICK: "kick";
    readonly HAPPY: "happy";
    readonly WINK: "wink";
    readonly POKE: "poke";
    readonly DANCE: "dance";
    readonly CRINGE: "cringe";
};
export declare type waifuPicsCatSFW_t = typeof waifuPicsCatSFW[keyof typeof waifuPicsCatSFW];
export declare const waifuPicsCatNSFW: {
    readonly WAIFU: "waifu";
    readonly NEKO: "neko";
    readonly TRAP: "trap";
    readonly BLOWJOB: "blowjob";
};
export declare type waifuPicsCatNSFW_t = typeof waifuPicsCatNSFW[keyof typeof waifuPicsCatNSFW];
export declare type waifuPicsCat_t = waifuPicsCatSFW_t | waifuPicsCatNSFW_t;
export declare function getWaifuPics(type?: "sfw", category?: waifuPicsCat_t): Promise<any>;
export declare function getNekosMoe(nsfw?: boolean, count?: number): Promise<{
    url: string;
} | undefined>;
export declare type nekosMoeSortMethods_t = 'newest' | 'likes' | 'oldest' | 'relevance';
export interface nekosMoeSearchParams_t {
    'id'?: String;
    'nsfw'?: Boolean;
    'uploader'?: String | Object;
    'artist'?: String;
    'tags'?: Array<String>;
    'sort'?: nekosMoeSortMethods_t;
    'posted_before'?: Number;
    'posted_after'?: Number;
    'skip'?: Number;
    'limit'?: Number;
}
/**
 *
 * @param searchString
 * @param searchParams
 * POST /images/search
Content-Type: application/json
 *
 * id 	String;
nsfw 	Boolean;
uploader 	String | Object;
artist 	String;
tags 	Array<String>;
sort 	String* 	"newest" 	false
posted_before 	Number (milliseconds);
posted_after 	Number (milliseconds);
skip 	Number 0-2500 	0 	false
limit 	Number 1-50 	20 	false
 * @returns
 */
export declare function searchNekosMoe(searchString: string, searchParams?: nekosMoeSearchParams_t): Promise<string | boolean | nekosBestResultType1_t | nekosBestResultType2_t | undefined>;
export default NekosLifeClient;
//# sourceMappingURL=nekos.d.ts.map
/**
 * @ Author: AirMineral Team
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 * @ Description: Tempat consume api
 */
declare const _default: {
    pinterest: (wall: any) => Promise<unknown>;
    artinama: (nama: any) => Promise<unknown>;
    ytsearch: (query: any) => Promise<any>;
    simiPais: (inp: any) => Promise<unknown>;
    simiSumi: (inp: any) => Promise<unknown>;
    simiSimi: (imp: any) => Promise<unknown>;
    simiZeks: (inp: any) => Promise<unknown>;
    simiLol: (inp: any) => Promise<unknown>;
    sreddit: (reddit?: string | undefined) => Promise<unknown>;
    memegen: (imageUrl: any, top: any, bottom: any) => string;
    quote: () => Promise<unknown>;
    cuaca: (daerah: any) => Promise<unknown>;
    tulis: (teks: any) => Promise<unknown>;
    lyric: (query: any) => Promise<unknown>;
    ttdl: (url: any) => Promise<unknown>;
    ocr: (url: any) => Promise<unknown>;
    vhtearlink: (q: any) => string;
};
export default _default;
//# sourceMappingURL=api.d.ts.map
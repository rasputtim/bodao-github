/// <reference types="node" />
export declare type ffMpegReturn = {
    data: Buffer;
    filename: string;
};
declare function ffmpeg(buffer: any, args?: string[], ext?: string, ext2?: string): Promise<ffMpegReturn>;
/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
declare function toPTT(buffer: any, ext: any): Promise<ffMpegReturn>;
/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
declare function toAudio(buffer: any, ext: any): Promise<ffMpegReturn>;
/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension
 */
declare function toVideo(buffer: any, ext: any): Promise<ffMpegReturn>;
export { toAudio, toPTT, toVideo, ffmpeg, };
//# sourceMappingURL=converter.d.ts.map
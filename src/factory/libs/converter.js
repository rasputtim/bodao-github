var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
function ffmpeg(buffer, args = [], ext = '', ext2 = '') {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            let tmp = path.join(__dirname, '../tmp', +new Date + '.' + ext);
            let out = tmp + '.' + ext2;
            yield fs.promises.writeFile(tmp, buffer);
            spawn('ffmpeg', [
                '-y',
                '-i', tmp,
                ...args,
                out
            ])
                .on('error', reject)
                .on('close', (code) => __awaiter(this, void 0, void 0, function* () {
                try {
                    yield fs.promises.unlink(tmp);
                    if (code !== 0)
                        return reject(code);
                    resolve({ data: yield fs.promises.readFile(out), filename: out });
                    // await fs.promises.unlink(out)
                }
                catch (e) {
                    reject(e);
                }
            }));
        }
        catch (e) {
            reject(e);
        }
    }));
}
/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
function toPTT(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
    ], ext, 'ogg');
}
/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
function toAudio(buffer, ext) {
    return ffmpeg(buffer, [
        '-vn',
        '-c:a', 'libopus',
        '-b:a', '128k',
        '-vbr', 'on',
        '-compression_level', '10'
    ], ext, 'opus');
}
/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension
 */
function toVideo(buffer, ext) {
    return ffmpeg(buffer, [
        '-c:v', 'libx264',
        '-c:a', 'aac',
        '-ab', '128k',
        '-ar', '44100',
        '-crf', '32',
        '-preset', 'slow'
    ], ext, 'mp4');
}
export { toAudio, toPTT, toVideo, ffmpeg, };
//# sourceMappingURL=converter.js.map
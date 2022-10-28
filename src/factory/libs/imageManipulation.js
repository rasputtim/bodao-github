var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { default as crypto, default as Crypto } from 'crypto';
import { default as ff, default as Ffmpeg } from 'fluent-ffmpeg';
import { readFileSync, writeFileSync } from 'fs';
import fs from 'fs-extra';
import jimp from 'jimp';
import webp from "node-webpmux";
import { tmpdir } from "os";
import path from 'path';
const { read } = jimp;
// IMAGE MANIPULATION JAVASCRIPT CODE
//https://github.com/oliver-moran/jimp
export default class imageMan {
    static readImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield read(image);
        });
    }
    static imageToWebp(media) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmpFileOut = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
            const tmpFileIn = path.join(tmpdir(), `${crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.jpg`);
            fs.writeFileSync(tmpFileIn, media);
            yield new Promise((resolve, reject) => {
                ff(tmpFileIn)
                    .on("error", reject)
                    .on("end", () => resolve(true))
                    .addOutputOptions([
                    "-vcodec",
                    "libwebp",
                    "-vf",
                    "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
                ])
                    .toFormat("webp")
                    .save(tmpFileOut);
            });
            const buff = fs.readFileSync(tmpFileOut);
            fs.unlinkSync(tmpFileOut);
            fs.unlinkSync(tmpFileIn);
            return buff;
        });
    }
    static videoToWebp(media) {
        return __awaiter(this, void 0, void 0, function* () {
            const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
            const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.mp4`);
            fs.writeFileSync(tmpFileIn, media);
            yield new Promise((resolve, reject) => {
                ff(tmpFileIn)
                    .on("error", reject)
                    .on("end", () => resolve(true))
                    .addOutputOptions([
                    "-vcodec",
                    "libwebp",
                    "-vf",
                    "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
                    "-loop",
                    "0",
                    "-ss",
                    "00:00:00",
                    "-t",
                    "00:00:05",
                    "-preset",
                    "default",
                    "-an",
                    "-vsync",
                    "0"
                ])
                    .toFormat("webp")
                    .save(tmpFileOut);
            });
            const buff = fs.readFileSync(tmpFileOut);
            fs.unlinkSync(tmpFileOut);
            fs.unlinkSync(tmpFileIn);
            return buff;
        });
    }
    static writeExifImg(media, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            let wMedia = yield imageMan.imageToWebp(media);
            const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
            const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
            fs.writeFileSync(tmpFileIn, wMedia);
            if (metadata.packname || metadata.author) {
                const img = new webp.Image();
                const json = { "sticker-pack-id": `You-Are-Sexy-7w7`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] };
                const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
                const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
                const exif = Buffer.concat([exifAttr, jsonBuff]);
                exif.writeUIntLE(jsonBuff.length, 14, 4);
                yield img.load(tmpFileIn);
                fs.unlinkSync(tmpFileIn);
                img.exif = exif;
                yield img.save(tmpFileOut);
                return tmpFileOut;
            }
        });
    }
    static writeExifVid(media, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            let wMedia = yield imageMan.videoToWebp(media);
            const tmpFileIn = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
            const tmpFileOut = path.join(tmpdir(), `${Crypto.randomBytes(6).readUIntLE(0, 6).toString(36)}.webp`);
            fs.writeFileSync(tmpFileIn, wMedia);
            if (metadata.packname || metadata.author) {
                const img = new webp.Image();
                const json = { "sticker-pack-id": `You-Are-Sexy-7w7`, "sticker-pack-name": metadata.packname, "sticker-pack-publisher": metadata.author, "emojis": metadata.categories ? metadata.categories : [""] };
                const exifAttr = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00]);
                const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");
                const exif = Buffer.concat([exifAttr, jsonBuff]);
                exif.writeUIntLE(jsonBuff.length, 14, 4);
                yield img.load(tmpFileIn);
                fs.unlinkSync(tmpFileIn);
                img.exif = exif;
                yield img.save(tmpFileOut);
                return tmpFileOut;
            }
        });
    }
}
imageMan.webpToPng = (buff) => new Promise((resolve, reject) => {
    const inp = `./src/assets/media/sss.webp`;
    const out = `./src/assets/media/sss.png`;
    writeFileSync(inp, buff);
    Ffmpeg(inp)
        .setFfmpegPath('./bin/ffmpeg')
        .save(out)
        .on('end', () => {
        resolve(readFileSync(out));
    })
        .on('error', (e) => {
        reject(e);
    });
});
//# sourceMappingURL=imageManipulation.js.map
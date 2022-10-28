/**
 * @ Author: YogaSakti
 * @ Create Time: 2021-05-31 22:33:11
 * @ Modified by: Rasputtim(https://github.com/rasputtim/)
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fileTypeFromBuffer } from 'file-type';
import sharp from 'sharp';
import logger from '../logger.js';
/**
 * Resize image to buffer or base64
 * @param  {Buffer} bufferdata
 * @param  {Boolean} encode
 * @param  {String} mimType
 */
// eslint-disable-next-line no-async-promise-executor
const resizeImage = (buff, encode) => new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Resizeing image...');
    const FileType = yield fileTypeFromBuffer(buff);
    const mime = FileType ? FileType.mime : {
        mime: 'unknown'
    };
    sharp(buff, { failOnError: false })
        .resize(512, 512)
        .toBuffer()
        .then(resizedImageBuffer => {
        if (!encode)
            return resolve(resizedImageBuffer);
        logger.info('Create base64 from resizedImageBuffer...');
        const resizedImageData = resizedImageBuffer.toString('base64');
        const resizedBase64 = `data:${mime};base64,${resizedImageData}`;
        resolve(resizedBase64);
    })
        .catch(error => reject(error));
}));
export default resizeImage;
//# sourceMappingURL=resizeImage.js.map
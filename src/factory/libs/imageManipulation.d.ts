/// <reference types="node" />
export default class imageMan {
    static readImage(image: Buffer): Promise<import("@jimp/core").Jimp & import("@jimp/jpeg").JpegClass & import("@jimp/png").PNGClass & import("@jimp/plugin-blit").Blit & import("@jimp/plugin-blur").Blur & import("@jimp/plugin-circle").Circle & import("@jimp/plugin-color").Color & import("@jimp/plugin-contain").Contain & import("@jimp/plugin-cover").Cover & import("@jimp/plugin-displace").Displace & import("@jimp/plugin-dither").Dither & import("@jimp/plugin-flip").Flip & import("@jimp/plugin-fisheye").Fisheye & import("@jimp/plugin-gaussian").Gaussian & import("@jimp/plugin-invert").Invert & import("@jimp/plugin-mask").Mask & import("@jimp/plugin-normalize").Normalize & import("@jimp/plugin-rotate").Rotate & import("@jimp/plugin-scale").Scale & import("@jimp/plugin-shadow").Shadow & import("@jimp/plugin-threshold").Threshold & import("@jimp/plugin-crop").CropClass & import("@jimp/plugin-print").PrintClass & import("@jimp/plugin-resize").ResizeClass>;
    static webpToPng: (buff: any) => Promise<unknown>;
    static imageToWebp(media: any): Promise<any>;
    static videoToWebp(media: any): Promise<any>;
    static writeExifImg(media: any, metadata: any): Promise<string | undefined>;
    static writeExifVid(media: any, metadata: any): Promise<string | undefined>;
}
//# sourceMappingURL=imageManipulation.d.ts.map
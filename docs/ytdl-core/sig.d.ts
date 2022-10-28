/// <reference types="node" />
export const cache: Cache;
export function getFunctions(html5playerfile: string, options: any): Promise<Array<string>>;
export function extractFunctions(body: string): Array<string>;
export function setDownloadURL(format: any, decipherScript: vm.Script, nTransformScript: vm.Script): void;
export function decipherFormats(formats: Array<any>, html5player: string, options: any): Promise<{} | undefined>;
import Cache = require("./cache");
import vm = require("vm");
//# sourceMappingURL=sig.d.ts.map
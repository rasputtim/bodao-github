export namespace Config {
    const debug: boolean;
    namespace winston {
        namespace file {
            const level: string;
            const filename: string;
            const handleExceptions: boolean;
            const json: boolean;
            const maxsize: number;
            const maxFiles: number;
        }
        namespace console {
            const level_1: string;
            export { level_1 as level };
        }
        namespace rotate {
            const level_2: string;
            export { level_2 as level };
            export const prettyPrint: boolean;
            export const silent: boolean;
            export const colorize: boolean;
            const filename_1: string;
            export { filename_1 as filename };
            export function timestamp(): string;
            const json_1: boolean;
            export { json_1 as json };
            const maxFiles_1: number;
            export { maxFiles_1 as maxFiles };
            export const datePattern: string;
        }
    }
}
//# sourceMappingURL=pgconfig.d.ts.map
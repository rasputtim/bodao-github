export default class Test {
    handler(m: any, { conn, usedPrefix, command }: {
        conn: any;
        usedPrefix: any;
        command: any;
    }): Promise<void>;
    help: string[];
    tags: string[];
    command: RegExp;
    isgroup: boolean;
    islimit: boolean;
    isadmin: boolean;
    isrunable: boolean;
    isMenuEnabled: boolean;
    name: string;
    type: string;
    description: string;
    usage: string;
    group: string;
    subgroup: string;
    api: string;
    script: string;
}
//# sourceMappingURL=test.d.ts.map
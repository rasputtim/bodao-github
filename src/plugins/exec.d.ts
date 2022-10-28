import { PluginClass } from '../factory/pluginManager.js';
import { onCommand } from '../factory/types';
export default class test extends PluginClass {
    constructor();
    onCommand({ m, sock, text, store, command }: onCommand): Promise<void>;
}
//# sourceMappingURL=exec.d.ts.map
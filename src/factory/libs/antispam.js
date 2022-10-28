export default class antiSpam {
    /**
     * Check is number filtered
     * @param  {String} from
     */
    static isFiltered(from) { !!antiSpam.usedCommandRecently.has(from); }
    /**
     * Add number to filter
     * @param  {String} from
     */
    static addFilter(from) {
        antiSpam.usedCommandRecently.add(from);
        setTimeout(() => antiSpam.usedCommandRecently.delete(from), 5000); //Tiempo de espera en segundos ✓
    }
}
/*
Gracias a "No se quien sea el verdadero autor :'v" pero se le agradece :'3
*/
antiSpam.usedCommandRecently = new Set();
//# sourceMappingURL=antispam.js.map
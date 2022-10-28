declare class Level {
    /**
     * Get user rank.
     * @param {string} userId
     * @param {string} chatId
     * @param {object} _dir
     * @returns {number}
     */
    static getUserRank(userId: any, chatId: any, _dir: any): number;
    static xpGain: Set<unknown>;
    /**
     * Check is user exist in set.
     * @param {string} userId
     * @returns {boolean}
     */
    static isGained(userId: any): boolean;
    /**
     * Add user in set and delete it when it's 1 minute.
     * @param {string} userId
     */
    static addCooldown(userId: any): void;
    static getRole(theLevel: number): string;
    static selectRamdomFromArray(myArray: any): any;
    static getRole2(xp: number): string;
    static getLevelBar(level: number, xp: number): string;
}
export default Level;
//# sourceMappingURL=level.d.ts.map
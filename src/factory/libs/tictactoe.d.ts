export = TicTacToe;
declare class TicTacToe {
    static check(state: any): boolean;
    /**
     * ```js
     * TicTacToe.toBinary(1, 2) // 0b010000000
     * ```
     */
    static toBinary(x?: number, y?: number): number;
    /**
     * @returns {('X'|'O'|1|2|3|4|5|6|7|8|9)[]}
     */
    static render(boardX?: number, boardO?: number): ('X' | 'O' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[];
    constructor(playerX?: string, playerO?: string);
    playerX: string;
    playerO: string;
    _currentTurn: boolean;
    _x: number;
    _o: number;
    turns: number;
    get board(): number;
    get currentTurn(): string;
    get enemyTurn(): string;
    /**
     * @param player `0` is `X`, `1` is `O`
     *
     * - `-3` `Game Ended`
     * - `-2` `Invalid`
     * - `-1` `Invalid Position`
     * - ` 0` `Position Occupied`
     * - ` 1` `Sucess`
     * @returns {-3|-2|-1|0|1}
     */
    turn(player: number | undefined, x: number | undefined, y: any): -3 | -2 | -1 | 0 | 1;
    /**
     * @returns {('X'|'O'|1|2|3|4|5|6|7|8|9)[]}
     */
    render(): ('X' | 'O' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9)[];
    get winner(): string | false;
}
//# sourceMappingURL=tictactoe.d.ts.map
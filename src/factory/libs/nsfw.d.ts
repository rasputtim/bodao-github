export default class nsfw {
    loadingMessage: string;
    logo: string;
    nsfwModel: any;
    constructor();
    state: {
        model: null;
        graphic: string;
        titleMessage: string;
        message: string;
        predictions: never[];
        droppedImageStyle: {
            opacity: number;
        };
        blurNSFW: boolean;
        enableWebcam: boolean;
        loading: boolean;
        fileType: null;
        hardReset: boolean;
        gifControl: null;
        currentModelName: string;
    };
    setState(state: any): void;
    _loadModel: () => Promise<void>;
    /**
     * Get random lewd images from given subreddits.
     * @returns {Promise<object>}
     */
    static randomLewd: () => Promise<unknown>;
    /**
     * Get armpits pict.
     * @returns {Promise<object>}
     */
    static armpits: () => Promise<unknown>;
    /**
     * Get feets pict.
     * @returns {Promise<object>}
     */
    static feets: () => Promise<unknown>;
    /**
     * Get thighs pict.
     * @returns {Promise<object>}
     */
    static thighs: () => Promise<unknown>;
    /**
     * Get ass pict.
     * @returns {Promise<object>}
     */
    static ass: () => Promise<unknown>;
    /**
     * Get boobs pict.
     * @returns {Promise<object>}
     */
    static boobs: () => Promise<unknown>;
    /**
     * Get belly pict.
     * @returns {Promise<object>}
     */
    static belly: () => Promise<unknown>;
    /**
     * Get sideboobs pict.
     * @returns {Promise<object>}
     */
    static sideboobs: () => Promise<unknown>;
    /**
     * Get ahegao pict.
     * @returns {Promise<object>}
     */
    static ahegao: () => Promise<unknown>;
    /**
     * Get Pornhub metadata from URL.
     * @param {string} url
     * @returns {Promise<object>}
     */
    static phDl: (url: any) => Promise<unknown>;
    /**
     * Get XXX video from URL.
     * @param {string} url
     * @returns {Promise<object>}
     */
    static xxx: (url: any) => Promise<unknown>;
    /**
     * Get random cersex.
     * @returns {Promise<object>}
     */
    static cersex: () => Promise<unknown>;
    check: (image: any) => Promise<boolean>;
}
//# sourceMappingURL=nsfw.d.ts.map
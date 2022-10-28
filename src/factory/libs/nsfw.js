var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ph from '@justalk/pornhub-api';
import * as tf from '@tensorflow/tfjs-node';
import _ from 'lodash';
import * as nsfwjs from 'nsfwjs';
import path from 'path';
////import sm from 'source-map-support'
import FileDB from '../../basededatos/fileDatabase.js';
//sm.install();
import logger from '../../factory/logger.js';
import { LocaleService } from '../../languajes/localeService.js';
//import logger from '../services/logger.mjs'
import Utils from '../../factory/libs/functions.js';
const __ = LocaleService.__;
const __n = LocaleService.__n;
const nl = '\n';
const exc = '[ ! ]';
const boldSign = '*';
let monospace = '```';
const more = '';
let nwn = more.repeat(850);
const __dirname = path.resolve();
const mob1 = path.resolve(__dirname, './src/assets/nsfw/quant_nsfw_mobilenet/');
const mobMid = path.resolve(__dirname, './src/assets/nsfw/quant_mid/');
const incep = path.resolve(__dirname, './src/assets/nsfw/model/');
//localstorage://
const availableModels = {
    mobilenetv2: [mob1],
    mobilenetMid: [mobMid, { type: 'graph' }],
    inceptionv3: [incep, { size: 299 }],
};
export default class nsfw {
    constructor() {
        this.loadingMessage = __('Loading NSFWJS Model');
        this.logo = './logo.svg';
        this.state = {
            model: null,
            graphic: this.logo,
            titleMessage: __('Please hold, the model is loading...'),
            message: this.loadingMessage,
            predictions: [],
            droppedImageStyle: { opacity: 0.4 },
            blurNSFW: true,
            enableWebcam: false,
            loading: true,
            fileType: null,
            hardReset: false,
            gifControl: null,
            currentModelName: 'mobilenetMid',
        };
        this._loadModel = () => __awaiter(this, void 0, void 0, function* () {
            this.setState({
                titleMessage: _('Please hold, the model is loading...'),
                message: this.loadingMessage,
                droppedImageStyle: { opacity: 0.4 },
                graphic: this.logo,
                hardReset: true,
                predictions: [],
                loading: true,
            });
            // Load model from public folder
            this.nsfwModel = yield nsfwjs
                .load(); //...availableModels[this.state.currentModelName])
            /*.then((model) => {
              this.setState({
                model,
                titleMessage: this.state.enableWebcam ? camMessage : dragMessage,
                message: 'Ready to Classify',
                loading: false,
              })
            })
            nsfwjs.load(...availableModels[this.state.currentModelName]).then((m) => {
              this.nsfwModel = m
          }) */
            this.setState({
                model: this.nsfwModel,
                titleMessage: "ok",
                message: 'Ready to Classify',
                loading: false,
            });
        });
        this.check = (image) => __awaiter(this, void 0, void 0, function* () {
            const decodedImage = yield tf.node.decodeImage(image, 3);
            const predictions = yield this.nsfwModel.classify(decodedImage /* as tf.Tensor3D*/);
            let retval = false;
            predictions.forEach(item => {
                var perc = (item.probability * 100).toString().split('.');
                let percNumber = parseInt(perc[0]);
                logger.info(percNumber);
                if (item.className === 'Porn') {
                    logger.info("encoutr ");
                    if (percNumber >= 70) {
                        logger.info(__("Removed for spreading pornography..."));
                        retval = true;
                    }
                }
            });
            decodedImage.dispose();
            //if (predictions[0].className === 'Sexy' || predictions[0].className === 'Porn') return true
            return retval;
        });
        this._loadModel();
    }
    setState(state) {
    }
}
/**
 * Get random lewd images from given subreddits.
 * @returns {Promise<object>}
 */
nsfw.randomLewd = () => new Promise((resolve, reject) => {
    const tag = ['ecchi', 'lewdanimegirls', 'hentai', 'hentaifemdom', 'hentaiparadise', 'hentai4everyone', 'animearmpits', 'animefeets', 'animethighss', 'animebooty', 'biganimetiddies', 'animebellybutton', 'sideoppai', 'ahegao'];
    const randTag = tag[Math.floor(Math.random() * tag.length)];
    //logger.info(`Searching lewd from ${randTag} subreddit...`)
    Utils.fetchJson(`https://meme-api.herokuapp.com/gimme/${randTag}`, void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get armpits pict.
 * @returns {Promise<object>}
 */
nsfw.armpits = () => new Promise((resolve, reject) => {
    //logger.info('Searching for armpits...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/animearmpits', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get feets pict.
 * @returns {Promise<object>}
 */
nsfw.feets = () => new Promise((resolve, reject) => {
    //logger.info('Searching for feets...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/animefeets', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get thighs pict.
 * @returns {Promise<object>}
 */
nsfw.thighs = () => new Promise((resolve, reject) => {
    //logger.info('Searching for thighs...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/animethighss', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get ass pict.
 * @returns {Promise<object>}
 */
nsfw.ass = () => new Promise((resolve, reject) => {
    //logger.info('Searching for ass...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/animebooty', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get boobs pict.
 * @returns {Promise<object>}
 */
nsfw.boobs = () => new Promise((resolve, reject) => {
    //logger.info('Searching for boobs...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get belly pict.
 * @returns {Promise<object>}
 */
nsfw.belly = () => new Promise((resolve, reject) => {
    //logger.info('Searching for belly...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/animebellybutton', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get sideboobs pict.
 * @returns {Promise<object>}
 */
nsfw.sideboobs = () => new Promise((resolve, reject) => {
    //logger.info('Searching for sideboobs...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/sideoppai', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get ahegao pict.
 * @returns {Promise<object>}
 */
nsfw.ahegao = () => new Promise((resolve, reject) => {
    //logger.info('Searching for ahegao...')
    Utils.fetchJson('https://meme-api.herokuapp.com/gimme/ahegao', void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get Pornhub metadata from URL.
 * @param {string} url
 * @returns {Promise<object>}
 */
nsfw.phDl = (url) => new Promise((resolve, reject) => {
    //logger.info(`Get Pornhub metadata from ${url}`)
    ph.page(url, ['title', 'download_urls', 'thumbnail_url'])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get XXX video from URL.
 * @param {string} url
 * @returns {Promise<object>}
 */
nsfw.xxx = (url) => new Promise((resolve, reject) => {
    //logger.info(`Get XXX video from ${url}`)
    Utils.fetchJson(`https://api.vhtear.com/xxxdownload?link=${url}&apikey=${FileDB.apiKeys.vhtear}`, void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
/**
 * Get random cersex.
 * @returns {Promise<object>}
 */
nsfw.cersex = () => new Promise((resolve, reject) => {
    //logger.info('Get random cersex...')
    Utils.fetchJson(`https://api.vhtear.com/cerita_sex&apikey=${FileDB.apiKeys.vhtear}`, void 0)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
});
//# sourceMappingURL=nsfw.js.map
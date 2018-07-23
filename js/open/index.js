import EndPage from './page/end';
import ReseurPage from './page/resurgence.js';
import RankPage from './page/rank';
import WechatMPPage from './page/wechatMP';
import QrPage from './page/qr';
import BeyondPage from './page/beyond';
import Init from './page/init';
import HWData from './page/hwdata';

const init = new Init();

const endPage = new EndPage();
const reseurPage = new ReseurPage();
const friendRankPage = new RankPage();
const groupRankPage = new RankPage();
const worldRankPage = new RankPage();
const wechatMPPage = new WechatMPPage();
const qrPage = new QrPage();
const beyondPage = new BeyondPage();

wx.onMessage(({ command, data = {}}) => {
    switch (command) {
        case 'end':
            endPage.setData(data);
            break;
        case 'reseur':
            reseurPage.setTexture(data);
            break;
        case 'friendRank':
            friendRankPage.dataMiddleware('friendRank', data)
            break;
        case 'worldRank':
            worldRankPage.dataMiddleware('worldRank', data)
            break;
        case 'groupRank':
            groupRankPage.dataMiddleware('groupRank', data)
            break;
        case 'carport':
            carportPage.setTexture(data);
            break;
        case 'wechat':
            wechatMPPage.setTexture();
            break;
        case 'qr':
            qrPage.setTexture();
            break;
        case 'beyond':
            beyondPage.setTexture(data);
            break;
        case 'beyondReset':
            beyondPage.reset();
            break;
        case 'initHwData':
            new HWData(data);
            break;
        case 'clear':
            init.clearCvs(true, true);
            break;
    }
});
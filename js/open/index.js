import EndPage from './page/end';
import ReseurPage from './page/resurgence.js';
import RankPage from './page/rank';
import CarportPage from './page/carport';
import WechatMPPage from './page/wechatMP';
import QrPage from './page/qr';
import Init from './page/init';

const endPage = new EndPage();
const reseurPage = new ReseurPage();
const friendRankPage = new RankPage();
const groupRankPage = new RankPage();
const worldRankPage = new RankPage();
const carportPage = new CarportPage();
const wechatMPPage = new WechatMPPage();
const qrPage = new QrPage();
const init = new Init();

wx.onMessage(({ command, data = {} }) => {
    switch (command) {
        case 'end':
            endPage.setTexture(data);
            break;
        case 'reseur':
            reseurPage.setTexture(data);
            break;
        case 'friendRank':
            friendRankPage.clearCvs();
            friendRankPage.initFriendRankData()
                .then(() => friendRankPage.setTexture(data, 1))
            break;
        case 'worldRank':
            worldRankPage.clearCvs();
            worldRankPage.setTexture(data);
            break;
        case 'groupRank':
            groupRankPage.clearCvs();
            groupRankPage.initGroupRankData(data.shareTicket)
                .then(() => groupRankPage.setTexture(data, 2));
                // groupRankPage.setTexture(data, 2)
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
        case 'clear':
            init.clearCvs(true);
            break;
    }
});
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
            endPage.setTexture(data)
            endPage.initFriendRankData()
                .then((e) => {
                    endPage.setTexture(data);
                })
            break;
        case 'reseur':
            reseurPage.setTexture(data)
            reseurPage.initFriendRankData()
                .then((e) => {
                    reseurPage.setTexture(data);
                })
            break;
        case 'friendRank':
            friendRankPage.setTexture(1)
            friendRankPage.initFriendRankData()
                .then(() => {
                    friendRankPage.showData(data)
                })
            break;
        case 'worldRank':
            worldRankPage.setTexture(data)
            worldRankPage.initWorldRankData(data)
            worldRankPage.showData(data)
            break;
        case 'groupRank':
            groupRankPage.setTexture(2)
            groupRankPage.initGroupRankData(data.shareTicket)
                .then(() => groupRankPage.showData(data));
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
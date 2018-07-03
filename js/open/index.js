import EndPage from './page/end';
import ReseurPage from './page/resurgence.js';
import RankPage from './page/rank';
import WechatMPPage from './page/wechatMP';
import QrPage from './page/qr';
import Init from './page/init';

const endPage = new EndPage();
const reseurPage = new ReseurPage();
const friendRankPage = new RankPage();
const groupRankPage = new RankPage();
const worldRankPage = new RankPage();
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
            friendRankPage.setTexture(1)
            friendRankPage.initFriendRankData()
                .then(() => {
                    friendRankPage.showData(data)
                })
            break;
        case 'worldRank':
            worldRankPage.clearCvs();
            worldRankPage.setTexture(data);
            break;
        case 'groupRank':
            groupRankPage.setTexture(2)
            groupRankPage.initGroupRankData(data.shareTicket)
                .then(() => groupRankPage.showData(data));
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
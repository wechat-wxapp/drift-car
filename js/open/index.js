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
            endPage.setTexture(data);
            // endPage.initFriendRankData()
            //     .then((e) => {
            //         endPage.setTexture(data);
            //     })
            break;
        case 'reseur':
            reseurPage.setTexture(data)
            reseurPage.initFriendRankData()
                .then((e) => {
                    reseurPage.setTexture(data);
                })
            break;
        case 'friendRank':
            if(!data.isDriving || (data.isDriving == 'next' && !friendRankPage.noNext) || (data.isDriving == 'pre' && !friendRankPage.noPre)) {
                friendRankPage.setTexture(1, data.noScale)
                friendRankPage.showData(data, 'friendRank')
            }
            break;
        case 'worldRank':
            if(!data.isDriving || (data.isDriving == 'next' && !worldRankPage.noNext) || (data.isDriving == 'pre' && !worldRankPage.noPre)) {
                worldRankPage.setTexture(3, data)
                worldRankPage.showData(data, 'worldRank')
            }
            break;
        case 'groupRank':
            if(!data.isDriving || (data.isDriving == 'next' && !groupRankPage.noNext) || (data.isDriving == 'pre' && !groupRankPage.noPre)) {
                groupRankPage.setTexture(2)
                groupRankPage.showData(data, 'groupRank')
            //    setTimeout(()=> groupRankPage.showData(data, 'group'),500)
            }
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
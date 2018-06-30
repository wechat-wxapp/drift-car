// let sharedCanvas = wx.getSharedCanvas()
// let context = sharedCanvas.getContext('2d')
// context.fillStyle = 'green'
// context.fillRect(0, 0, 100, 100)

// const sharedCanvas = wx.getSharedCanvas();
// const cvs = sharedCanvas.getContext('2d');
//
// cvs.fillStyle = 'red'
// cvs.fillRect(0, 0, 500, 500)

import EndPage from './page/end';
import ReseurPage from './page/resurgence.js';
import RankPage from './page/rank';
import CarportPage from './page/carport';
import WechatMPPage from './page/wechatMP';
import QrPage from './page/qr';
import Beyond from './page/beyond';
import Init from './page/init';

const endPage = new EndPage();
const reseurPage = new ReseurPage();
const rankPage = new RankPage();
const carportPage = new CarportPage();
const wechatMPPage = new WechatMPPage();
const qrPage = new QrPage();
const BeyondPage = new Beyond();
const init = new Init();

init.getFriendsScore();

wx.onMessage(({ command, data }) => {
    switch (command) {
        case 'end':
            endPage.setTexture();
            break;
        case 'reseur':
            reseurPage.setTexture();
            break;
        case 'rank':
            rankPage.setTexture();
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
        case 'beyond':
            BeyondPage.setTexture(data);
            break;
    }
});

// function drawRankList (data) {
//     cvs.fillStyle = "#647fdc";
//     cvs.fillRect(0, 0, 100, 100);
//     cvs.font = "bold 70px Arial";
//     cvs.fillText('123', 100, 100);
// }
//
//
// wx.getFriendCloudStorage({
//     keyList: ['score'],
//     success: res => {
//         let data = res.data
//         drawRankList(data)
//     }
// })
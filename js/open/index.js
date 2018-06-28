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
import Init from './page/init';

const endPage = new EndPage();
const reseurPage = new ReseurPage();
const carportPage = new CarportPage();
const rankPage = new RankPage();
const init = new Init();

wx.onMessage(({ command, data }) => {
    switch (command) {
        case 'end':
            // endPage.setTexture();
            // reseurPage.setTexture();
            // rankPage.setTexture();
            carportPage.setTexture();
            break;
        case 'clear':
            init.clearCvs();
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
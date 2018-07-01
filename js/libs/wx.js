/**
 * 微信类
 * */
export default class WX {
    constructor() {
        openDataContext = wx.getOpenDataContext();

        wx.showShareMenu({ withShareTicket: true });

        this.shareTicket = 'noStareTicket';
        wx.onShow(res => {
            this.shareTicket = res.shareTicket;
            console.log('shareTicket: ', res, this.shareTicket);
        });

        // this.initAd()
        
        openDataContext.postMessage({
            command: 'init',
            data: {
                winWidth,
                winHeight
            }
        })
    }

    // initAd() {
    //     //???????2.0.4??
    //     const compareVersion = (v1, v2) => {
    //         let arr1 = v1.split('.');
    //         let arr2 = v2.split('.');
    //         for (let i = 0; i < arr1.length;i++) { 
	// 			if(arr1[i] > arr2[i]) return true
	// 			else if (arr1[i] == arr2[i]) continue
	// 			else return false
	// 		}
	// 		return true
    //     }
    //     const version = wx.getSystemInfoSync().version;
    //     if (compareVersion(version,`2.0.4`)) {
    //         this.rewardedVideoAd = wx.createRewardedVideoAd({adUnitId: `adVideo`})

    //     }
    // }
    
    sendMessage(command, data) {
        openDataContext.postMessage({ command, data })
    }

    setWxScore() {
        return new Promise((res, rej) => {
            wx.setUserCloudStorage({
                KVDataList: [{ key: "score", value: String(score) }],
                success: () => {
                    res();
                },
                fail: () => {
                    rej();
                },
                complete: () => {}
            })
        })
    }

    getFontFamily() {
        return new Promise((res, rej) => {
            wx.loadFont("https://static.cdn.24haowan.com/24haowan/test/js/xszt.TTF")
        })
    }
}
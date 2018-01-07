//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    Song: [
      {
        id: 1,
        title: "当你1",
        singer: "林俊杰1",
        images: 'https://www.allcdcovers.com/image_system/covers_th/0/2/02207cc7c98cd5a5bd8092786f171cc0.jpg'
      },
      {
        id: 2,
        title: "当你2",
        singer: "林俊杰2",
        images: 'https://www.allcdcovers.com/image_system/covers_th/7/5/7586f74beb492fbd87b085c90207afc5.jpg'
      },
      {
        id: 3,
        title: "当你3",
        singer: "林俊杰3",
        images: 'https://www.allcdcovers.com/image_system/covers_th/6/f/6f105bb86df0dd2f6361efcf0fadf9a7.jpg'
      },
    ],
    indicatorDots: true,
    indicatorColor: "#dbdbdb",
    indicatorActiveColor: "#d81e06",
    autoplay: true,
    interval: 5000,
    duration: 500,
    //windowHeight: 100,
    toView: 'red',
    scrollTop: 100,
    scrollLeft: 0
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../musicPlayer/musicPlayer?poster=' + songInfo.albumpic_big + "&name=" + songInfo.songname + "&author=" + songInfo.singername + "&src=" + songInfo.url
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

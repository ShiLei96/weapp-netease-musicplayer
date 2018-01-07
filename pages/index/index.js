//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
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
    requestResult: "",
    indicatorDots: true,
    indicatorColor: "#dbdbdb",
    indicatorActiveColor: "#d81e06",
    autoplay: true,
    interval: 5000,
    duration: 500,
    toView: 'red',
    scrollTop: 100,
    scrollLeft: 0,
    inputShowed: false,
    inputVal: ""
  },
  onReady: function () {
    var that = this
    qcloud.request({
      url: `${config.service.host}/weapp/hotlist`,
      login: false,
      success(result) {
        util.showSuccess('请求成功完成')
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        that.setData({
          requestResult: json.data.msg.songlist
        })

      },
      fail(error) {
        util.showModel('请求失败', error);
        console.log('request fail', error);
      }
    })

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

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },

  //事件处理函数
  bindViewTap: function (e) {
    console.log(e)
    var songInfo = this.data.requestResult[parseInt(e.currentTarget.dataset.id)]

    console.log("前: " + songInfo)
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

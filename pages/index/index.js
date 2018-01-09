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
    objectMultiArray: [
      [
        {
          id: 0,
          name: '华语'
        },
        {
          id: 1,
          name: '欧美'
        }

      ], [
        {
          id: 0,
          name: '影视原声'
        },
        {
          id: 1,
          name: 'ACG'
        },
        {
          id: 2,
          name: '校园'
        },
        {
          id: 3,
          name: '游戏'
        },
        {
          id: 4,
          name: '网络歌曲'
        }
      ]
    ],
    multiIndex2: [0, 0],
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
    inputVal: "",
    listTag: "推荐歌单"
  },
  onReady: async function () {
    var hotlist
    hotlist = await util.getHotlist("日语")
    this.setData({
      requestResult: hotlist
    })
  },

  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
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
    var songList = this.data.requestResult[parseInt(e.currentTarget.dataset.id)]
    console.log(songList)
    wx.navigateTo({
      url: '../playlist/playlist?playlistId=' + songList.id + '&in=0'
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      objectMultiArray: this.data.objectMultiArray,
      multiIndex2: this.data.multiIndex2
    };
    data.multiIndex2[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex2[0]) {
          case 0:
            data.objectMultiArray[1] = [
              { id: 0, name: '影视原声' },
              { id: 1, name: 'ACG' },
              { id: 2, name: '校园' },
              { id: 3, name: '游戏' },
              { id: 4, name: '网络歌曲' }
            ];
            break;
        }
        data.multiIndex2[1] = 0;
        // data.multiIndex[2] = 0;
        break;
    }
    this.setData(data);
  },
  onLoad: function () {
    var that = this
    // 调用登录接口
    qcloud.login({
      success(result) {
        if (result) {
          util.showSuccess('登录成功')
          app.globalData.userInfo = result

        } else {
          // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
          qcloud.request({
            url: config.service.requestUrl,
            login: true,
            success(result) {
              util.showSuccess('登录成功')
              console.log(result.data.data)
              app.globalData.userInfo = result.data.data
              console.log(app.globalData.userInfo)
            },

            fail(error) {
              util.showModel('请求失败', error)
              console.log('request fail', error)
            }
          })
        }
      },

      fail(error) {
        util.showModel('登录失败', error)
        console.log('登录失败', error)
      }
    })
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

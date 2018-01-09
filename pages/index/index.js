//index.js
//获取应用实例
const app = getApp()
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var column1 = new Array(
  { id: 0, name: '语种' },
  { id: 1, name: '风格' })
var column2 = new Array([
  { id: 0, name: '华语' },
  { id: 1, name: '欧美' },
  { id: 2, name: '日语' },
  { id: 3, name: '韩语' },
  { id: 4, name: '粤语' }],
  [{ id: 0, name: '流行' },
  { id: 1, name: '摇滚' },
  { id: 2, name: '古风' },
  { id: 3, name: '民谣' },
  { id: 4, name: '电子' },
  { id: 5, name: '轻音乐' }])
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
    objectMultiArray: [],
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



    this.setData({
      objectMultiArray: [column1, column2[0]]
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
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex2: [0,0]
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log(e)
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var column
    if (e.detail.column == 0) {
      switch (e.detail.value) {
        case 0:
          column = new Array(column1, column2[0]);
          break;
        case 1:
          column = new Array(column1, column2[1])
      }
    }
    this.setData({
      objectMultiArray: column
    });
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

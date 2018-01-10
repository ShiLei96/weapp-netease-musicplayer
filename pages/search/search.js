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
  inputTyping: async function (e) {
    var result = await util.getSuggest(e.detail.value)
    this.setData({
      requestResult: result.songs
    })
  },
  //事件处理函数
  playMusic: async function (e) {
    var song = await util.getMusicDetail(e.currentTarget.dataset.id)
    console.log("song:", song)
    app.globalData.song = {
      poster: song.al.picUrl,
      name: song.name,
      author: song.ar[0].name,
      songId:song.id
    }
    app.globalData.fromSearch = true
    wx.switchTab({
      url: '../musicPlayer/musicPlayer'
    })
  },
  onLoad: async function (options) {
    var result = await util.getSuggest(options.keywords)
    this.setData({
      requestResult: result.songs
    })
  },
})


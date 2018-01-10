var util = require('../../utils/util.js')
var varTimeout;
const globalBgAudioManager = getApp().backgroundAudioManager
const globalCourseAudioListManager = getApp().courseAudioListManager
const app = getApp()
var n = 0;
var animation = wx.createAnimation({
  duration: 8000,
  timingFunction: 'linear'
})
Page({
  data: {
    playBtn: "../res/pause1.png",
    prevBtn: "../res/prev1.png",
    nextBtn: "../res/next1.png",
    isSliding: false,
    playingTime: "00:00",
    songTime: "",
    progressValue: 0,
    animationData: {},
    poster: '',
    name: '',
    author: '',
    objectArray: []
  },
  onLoad: async function (options) {
    console.log("onLoad...")
    this.initBgAudioListManager();
    var userPlaylist
    userPlaylist = await util.getUserPlaylist(app.globalData.userInfo.openId)
    this.setData({
      objectArray: userPlaylist
    })


    console.log("加载完毕")

  },
  onShow: async function (options) {
    console.log("onShow...")
    this.startAnimation()
    if (app.globalData.fromSearch) {
      var song = app.globalData.song
      app.globalData.fromSearch = false
    }
    else {
      var song = await globalCourseAudioListManager.getCurrentAudio()
    }
    this.setData({
      poster: song.poster,
      name: song.name,
      author: song.author
    })
    console.log("songid :　" + song.songId)

    var src = await util.getMusicUrl(song.songId)
    if (globalBgAudioManager.audioId != song.songId) {
      globalBgAudioManager.src = src
    }
    globalBgAudioManager.audioId = song.songId
  },
  onReady: function (e) {
    console.log("onReady...")
  },
  onHide: function () {
    console.log("onHide...")
    clearTimeout(varTimeout)
    this.setData({
      animationData: {}
    })
  },
  onUnload: function () {
    console.log("onUnload...")
  },
  //动画相关函数
  rotatePic: function () {
    n = n + 1;
    animation.rotate(n * 180).step();
    this.setData({
      animationData: animation.export()
    })
    varTimeout = setTimeout(this.rotatePic.bind(this), 8000)
  },
  startAnimation: function () {
    n = n + 1
    animation.rotate(n * 180).step();
    this.setData({
      animationData: animation.export()
    })
    varTimeout = setTimeout(this.rotatePic.bind(this), 8000)
  },

  //音乐控制
  controlMusic: function () {
    if (globalBgAudioManager.paused) {
      globalBgAudioManager.play();
      this.setData({
        playBtn: "../res/pause1.png"
      })

    }
    else {
      globalBgAudioManager.pause();
      this.setData({
        playBtn: "../res/play1.png"
      })
    }
  },
  nextMusic: async function () {
    var song = await globalCourseAudioListManager.getNextAudio()
    this.setData({
      poster: song.poster,
      name: song.name,
      author: song.author
    })
    var src = await util.getMusicUrl(song.songId)
    console.log("下一首：" + "songid :　" + song.songId + "src : " + src)
    globalBgAudioManager.src = src
  },
  prevMusic: async function () {
    var song = await globalCourseAudioListManager.getPrevAudio()
    this.setData({
      poster: song.poster,
      name: song.name,
      author: song.author
    })
    var src = await util.getMusicUrl(song.songId)
    console.log("上一首：" + "songid :　" + song.songId + "src : " + src)
    globalBgAudioManager.src = src
  },
  sliderChanging: function () {
    this.setData({
      isSliding: true
    })
  },
  sliderChange: function (e) {
    if (globalBgAudioManager.paused) {
      this.controlMusic()
    }
    globalBgAudioManager.seek(e.detail.value * globalBgAudioManager.duration / 100)
    this.setData({
      isSliding: false
    })
  },
  bindPickerChange: function (e) {
    console.log(e)
    util.addSong2List(this.data.objectArray[e.detail.value].listid, globalCourseAudioListManager.getCurrentAudio().songId)
  },
  //播放器初始化
  initBgAudioListManager: function () {
    globalBgAudioManager.onPlay(() => {
      console.log("duration : " + globalBgAudioManager.duration)
      this.getSongTime()
    })

    globalBgAudioManager.onCanplay(() => {
      console.log("canplay")
      globalBgAudioManager.play()
    })

    globalBgAudioManager.onWaiting(() => {
      console.log("onWaiting...")
      wx.showLoading({
        title: '音频加载中…'
      });
      globalBgAudioManager.isWaiting = true;
    })

    globalBgAudioManager.onError((e) => {
      console.log("onError : " + JSON.stringify(e))
    })

    globalBgAudioManager.onEnded((e) => {
      console.log("onEnded...")
      this.nextMusic()
    })

    globalBgAudioManager.onStop((e) => {
      console.log("onStop...")
      console.log(e)
    })

    globalBgAudioManager.onTimeUpdate(() => {
      if (globalBgAudioManager.isWaiting) {
        globalBgAudioManager.isWaiting = false;
        setTimeout(() => {
          wx.hideLoading();
        }, 300)
      }

      //更新播放进度
      this.getSongTime()
      var rate = 100 * globalBgAudioManager.currentTime / globalBgAudioManager.duration
      var mm = parseInt(globalBgAudioManager.currentTime / 60)
      var ss = parseInt(globalBgAudioManager.currentTime % 60)
      if (mm < 10)
        mm = "0" + mm
      if (ss < 10)
        ss = "0" + ss
      var currentTime = mm + ":" + ss
      this.setData({
        playingTime: currentTime,
      })
      if (!this.data.isSliding) {
        this.setData({
          progressValue: rate
        })
      }
    })

  },
  getSongTime: function () {
    var mm = parseInt(globalBgAudioManager.duration / 60)
    var ss = parseInt(globalBgAudioManager.duration % 60)
    if (mm < 10)
      mm = "0" + mm
    if (ss < 10)
      ss = "0" + ss
    var duration = mm + ":" + ss;
    console.log(duration);
    this.setData({
      songTime: duration
    })
  }
})
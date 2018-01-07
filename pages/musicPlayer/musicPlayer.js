var util = require('../../utils/util.js')
var varTimeout;
const globalBgAudioManager = getApp().backgroundAudioManager
const globalCourseAudioListManager = getApp().courseAudioListManager
var n = 1;
var animation = wx.createAnimation({
  duration: 2000,
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
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://m10.music.126.net/20180105104237/8365022e20cfb07c4e596a9755800513/ymusic/1625/2b43/e004/526a7893269ab8699fd0fb8cd2fe7948'

  },
  onLoad: function (options) {
    console.log("onLoad...")
    this.setData({
      poster: options.poster,
      name: options.name,
      author: options.author,
      src: "http://m10.music.126.net/20180105104237/8365022e20cfb07c4e596a9755800513/ymusic/1625/2b43/e004/526a7893269ab8699fd0fb8cd2fe7948.mp3"
    })
    this.initBgAudioListManager();


    console.log("加载完毕")
  },
  onShow: function (options) {
    console.log("onShow...")
    animation.rotate(45).step()
    this.setData({
      animationData: animation.export()
    })
    //globalBgAudioManager.changeAudio()
  },
  onReady:async function (e) {
    console.log("onReady...")
    this.startAnimation()

    console.log("开始播放 src:" + globalCourseAudioListManager.audioList.song[globalCourseAudioListManager.currentIndex].src);
    console.log(globalBgAudioManager)
    console.log(globalCourseAudioListManager)
    var src = await util.getMusicUrl(418603066)
    await console.log(src)
    globalBgAudioManager.src = src
    //globalBgAudioManager.src = globalCourseAudioListManager.audioList.song[globalCourseAudioListManager.currentIndex].src
    //globalBgAudioManager.src = this.data.src
  },
  onHide: function () {
    console.log("onHide...")
  },
  onUnload: function () {
    console.log("onUnload...")
    n = 1
    clearTimeout(varTimeout)
  },
  initBgAudioListManager: function () {
    globalBgAudioManager.onPlay(() => {
      console.log("duration : " + globalBgAudioManager.duration)
      var duration = parseInt(globalBgAudioManager.duration / 60) + ":" + parseInt(globalBgAudioManager.duration % 60);
      if (globalBgAudioManager.duration / 60 < 10)
        duration = "0" + duration
      console.log(duration);
      this.setData({
        songTime: duration
      })
    })

    globalBgAudioManager.onCanplay(() => {
      console.log("canplay")
    })

    globalBgAudioManager.onWaiting(() => {
      wx.showLoading({
        title: '音频加载中…'
      });
      globalBgAudioManager.isWaiting = true;
      console.log("onWaiting...")
    })

    globalBgAudioManager.onError((e) => {
      console.log("onError : " + JSON.stringify(e))

    })

    globalBgAudioManager.onTimeUpdate(() => {
      if (globalBgAudioManager.isWaiting) {
        globalBgAudioManager.isWaiting = false;
        setTimeout(() => {
          wx.hideLoading();
        }, 300)
      }
      console.log(globalBgAudioManager.buffered)

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
    console.log("kaishih")

    globalBgAudioManager.changeAudio = function () {
      console.log("changeAudio")
    }

    console.log(globalBgAudioManager.isWaiting)

  },
  //动画相关函数
  rotatePic: function () {
    n = n + 1;
    animation.rotate(n * 45).step();
    this.setData({
      animationData: animation.export()
    })
    varTimeout = setTimeout(this.rotatePic.bind(this), 1500)
  },
  startAnimation: function () {
    varTimeout = setTimeout(this.rotatePic.bind(this), 1500)
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
  }
})
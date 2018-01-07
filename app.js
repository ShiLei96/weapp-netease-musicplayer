//app.js
var config = require('/config')
App({
  onLaunch: function () {

    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.backgroundAudioManager.isWaiting = false
    this.backgroundAudioManager.audioId = -1
    this.backgroundAudioManager.changeAudio = function () {
     }

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  courseAudioListManager: {
    getPrevAudio: function () {
      var readyPlayIndex = this.currentIndex == 0 ? Object.key(this.audioList.song).length - 1 : this.currentIndex + 1
      return this.audioList.song[readyPlayIndex]
    },
    getNextAudio: function () {
      var readyPlayIndex = this.currentIndex == Object.key(this.audioList.song).length - 1 ? 0 : this.currentIndex - 1
      return this.audioList.song[readyPlayIndex]
    },
    getCurrentAudio: function () {
      return this.audioList.song[currentIndex]
    },
    changeCurrentAudioByIndex(index) {
      this.currentIndex = index
    },
    changeAudioList: function (_audioList) {
      this.audioList = _audioList
    },
    courseInfo: {
    },
    audioList: {
      song: [{
        poster: 'http://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg',
        name: '交织together',
        author: '泠鸢yousa',
        src: 'http://m10.music.126.net/20180107002006/b37807fdddd19d01d0ac999214a7c981/ymusic/1625/2b43/e004/526a7893269ab8699fd0fb8cd2fe7948.mp3',
        songId:''
      },
      {
        poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        name: '一日都市 （人声本家）',
        author: 'Hanser',
        src: 'http://m10.music.126.net/20180107002006/b37807fdddd19d01d0ac999214a7c981/ymusic/1625/2b43/e004/526a7893269ab8699fd0fb8cd2fe7948.mp3',
        songId:''
      },
      ]
    },
    currentIndex: 0,
    playMode: config.playMode.order
  },

  globalData: {
    userInfo: null,
  }

})
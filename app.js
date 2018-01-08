//app.js
var config = require('/config')
App({
  onLaunch: function () {

    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.backgroundAudioManager.isWaiting = false
    this.backgroundAudioManager.audioId = -1
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
      var readyPlayIndex = this.currentIndex == 0 ? this.audioList.length - 1 : this.currentIndex - 1
      this.changeCurrentAudioByIndex(readyPlayIndex)
      return this.audioList[readyPlayIndex]
    },
    getNextAudio: function () {
      console.log("audioList length : "+this.audioList.length) //242
      console.log("currentIndex : "+this.currentIndex)
      var readyPlayIndex = this.currentIndex == this.audioList.length - 1 ? 0 : this.currentIndex + 1
      console.log("nextIndex ："+ readyPlayIndex)
      this.changeCurrentAudioByIndex(readyPlayIndex)
      return this.audioList[readyPlayIndex]
    },
    getCurrentAudio: function () {
      console.log("this currentindex : "+this.currentIndex)
      console.log(this.audioList)
      return this.audioList[this.currentIndex]
    },
    changeCurrentAudioByIndex(index) {
      this.currentIndex = index
    },
    changeAudioList: function (_audioList) {
      this.audioList = _audioList
    },
    courseInfo: {
    },
    audioList: {},
    currentIndex: 0,
    playMode: config.playMode.order
  },

  globalData: {
    userInfo: null,
  }

})
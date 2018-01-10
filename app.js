//app.js
var config = require('/config')
var qcloud = require('/vendor/wafer2-client-sdk/index')
var util = require('/utils/util.js')
App({
  onLaunch: function () {

    this.backgroundAudioManager = wx.getBackgroundAudioManager()
    this.backgroundAudioManager.isWaiting = false
    this.backgroundAudioManager.audioId = -1

    qcloud.setLoginUrl(config.service.loginUrl)
    

  },

courseAudioListManager: {
  getPrevAudio: function () {
    var readyPlayIndex = this.currentIndex == 0 ? this.audioList.length - 1 : this.currentIndex - 1
    this.changeCurrentAudioByIndex(readyPlayIndex)
    return this.audioList[readyPlayIndex]
  },
  getNextAudio: function () {
    var readyPlayIndex = this.currentIndex == this.audioList.length - 1 ? 0 : this.currentIndex + 1
    console.log("nextIndex ：" + readyPlayIndex)
    this.changeCurrentAudioByIndex(readyPlayIndex)
    return this.audioList[readyPlayIndex]
  },
  getCurrentAudio: function () {
    console.log("this currentindex : " + this.currentIndex)
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
  audioList: { },
  currentIndex: 0,
    playMode: config.playMode.order
},

globalData: {
  userInfo: null,
  fromSearch: false,
  song:{
    poster: '',
    name: '',
    author: '',
    songId:{},
  }
  }
})
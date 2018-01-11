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
      if (this.playMode == config.playMode.order | this.playMode == config.playMode.single){
        var readyPlayIndex = this.currentIndex == this.audioList.length - 1 ? 0 : this.currentIndex + 1
      }
      else{
        var readyPlayIndex = Math.round(Math.random() * this.audioList.length)
      }
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
    changeMode:function(){
      switch(this.playMode){
        case config.playMode.order: 
          this.playMode = config.playMode.random
          break;
        case config.playMode.random:
          this.playMode = config.playMode.single
          break;
        case config.playMode.single:
          this.playMode = config.playMode.order
          break;
      }
      return this.playMode
    },
    courseInfo: {
    },
    audioList: {},
    currentIndex: 0,
    playMode: config.playMode.order
  },
  changeTitle: function (title) {
    var s = title.substr(0, 14)
    return s + "..."
  },

  //对长度超过规定的copywriter属性进行修改
  changeWriter: function (copywriter) {
    var s = copywriter.substr(0, 15);
    return s + "...";
  },
  globalData: {
    userInfo: null,
    fromSearch: false,
    song: {
      poster: '',
      name: '',
      author: '',
      songId: {},
    }
  }
})
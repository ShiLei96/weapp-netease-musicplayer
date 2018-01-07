//logs.js
const util = require('../../utils/util.js')
const globalCourseAudioListManager = getApp().courseAudioListManager

Page({
  data: {
    logs: [],
    playlist:{},

  },
  onLoad:async function () {
    console.log("onLoad...")
    var playlist
    playlist = await util.getPlaylistDetail(454371535)
    console.log(playlist)
    this.setData({
      playlist: playlist
    })
  },
  playMusic: function(e){
    console.log(e)
    
  }

})

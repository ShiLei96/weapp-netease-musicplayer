//logs.js
const util = require('../../utils/util.js')
const globalCourseAudioListManager = getApp().courseAudioListManager

Page({
  data: {
    logs: [],
    playlist: {},

  },
  onLoad: async function (options) {
    console.log("onLoad...")

    var _playlist
    var _in = options.in
    console.log("in=" + _in)
    if (_in == 0) {
      _playlist = await util.getPlaylistDetail(options.playlistId)
    } else if (_in == 1) {
      _playlist = await util.getPlaylistDetail(options.playlistId)
    }


    this.setData({
      playlist: _playlist
    })
    this.playlist = _playlist
    console.log("playlist:")
    console.log(this.playlist)
  },
  playMusic: function (e) {
    console.log(e)
    var audiolist = []
    var songs = this.playlist.songlist
    for (var index in songs) {
      var song = { poster: "", name: "", author: "", songId: -1, src: "" }
      song.poster = songs[index].al.picUrl
      song.name = songs[index].name
      song.author = songs[index].ar[0].name
      song.songId = songs[index].id
      audiolist[index] = song
    }

    console.log("audiolist: ")
    console.log(audiolist)

    globalCourseAudioListManager.audioList = audiolist
    globalCourseAudioListManager.currentIndex = e.currentTarget.dataset.id
    console.log("currentIndex:" + globalCourseAudioListManager.currentIndex)
    wx.navigateTo({
      url: '../musicPlayer/musicPlayer'
    })
  }
})
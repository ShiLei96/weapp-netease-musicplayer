const util = require('../../utils/util.js')
const globalCourseAudioListManager = getApp().courseAudioListManager

Page({
  data: {
    playlist: {
      songlist:[]
    },
    isUserlist: false,
    playlistId: ""
  },
  onLoad: async function (options) {
    console.log("onLoad...")
    var _playlist = new Object()
    var _in = options.in
    console.log("in=" + _in)
    if (_in == 0) {
      this.setData({
        isUserlist: false
      })
      _playlist = await util.getPlaylistDetail(options.playlistId)
    } else if (_in == 1) {
      this.setData({
        isUserlist: true
      })
      __playlist = new Array()
      var songIds = await util.getUserPlaylistDetail(options.playlistId)
      console.log(songIds)
      for (index in songIds) {
        __playlist[index] = await util.getMusicDetail(songIds[index].songid)
      }
      console.log(__playlist)
      _playlist.songlist = __playlist
      _playlist.imgUrl="../res/yomi.jpg"
      _playlist.name = options.name
    }
    this.setData({
      playlist: _playlist,
      playlistId: options.playlistId
    })
    this.playlist = _playlist
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
    console.log("audiolist: ", audiolist)

    globalCourseAudioListManager.audioList = audiolist
    globalCourseAudioListManager.currentIndex = e.currentTarget.dataset.id
    console.log("currentIndex:" + globalCourseAudioListManager.currentIndex)
    wx.switchTab({
      url: '../musicPlayer/musicPlayer'
    })
  },
  playlistAction: function (e) {
    console.log(e)
    var that = this
    wx.showActionSheet({
      itemList: ['删除'],
      success: function (res) {
        //console.log(JSON.stringify(res))
        //console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          that.delSong(e.currentTarget.dataset.id)
          var pl = that.data.playlist
          pl.songlist.splice(e.currentTarget.dataset.id,1)
          that.setData({
            playlist:pl
          })
        }
      }
    })
  },

  delSong: async function (index) {
    console.log("playlist：", index,this.data.playlist.songlist)
    await util.delSong4List(this.data.playlistId, this.data.playlist.songlist[index].id)
  }
})
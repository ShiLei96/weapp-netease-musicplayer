var qcloud = require('../vendor/wafer2-client-sdk/index')
var config = require('../config')
var promise = require('es6-promise').Promise
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  })
}

var getMusicUrl = function (songId) {
  var p = new promise(function (resolve, reject){
    qcloud.request({
      url: `${config.service.host}/weapp/url?id=` + songId,
      login: false,
      success(result) {
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        console.log("请求getMusicUrl...")
        console.log(json.data)
        resolve(json.data.msg[0].url)
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  })
  return p
}

var getMusicDetail = function(songId) {
  console.log("songId:")
  console.log(songId)
  var p = new promise(function (resolve, reject) {
    qcloud.request({
      url: `${config.service.host}/weapp/songdetail?songId=` + songId,
      login: false,
      success(result) {
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        console.log("请求getMusicDetail...")
        console.log(json.data)
        resolve(json.data.msg[0])
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  })
  return p
}

//获取推荐歌单 index为歌单标签
var getHotlist = function (index) {
  var p = new promise(function (resolve, reject){
    qcloud.request({
      url: `${config.service.host}/weapp/hotlist?index=` + index,
      login: false,
      success(result) {
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        console.log("请求getHotlist...")
        console.log(json.data.msg)
        resolve(json.data.msg)
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  })
  return p
}

//获取歌单详细信息 playlistId为歌单Id
var getPlaylistDetail = function(playlistId){
    var p = new promise(function (resolve, reject){
    qcloud.request({
      url: `${config.service.host}/weapp/playlist?playlistId=` + playlistId,
      login: false,
      success(result) {
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        console.log("请求getPlaylistDetail...")
        console.log(json.data)
        resolve(json.data)
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  })
  return p
}

//获取用户创建的歌单 userId为open_id 返回值为listId 数组
var getUserPlaylist = function (userId) {
  var p = new promise(function (resolve, reject){
    qcloud.request({
      url: `${config.service.host}/weapp/query/getList?userid=` + userId,
      login: false,
      success(result) {
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        console.log("请求getUserPlaylist...")
        console.log(json.data)
        resolve(json.data.msg)
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  })
  return p
}

//获取用户创建歌单详情 playlistId为歌单Id 返回值为songId 数组
var getUserPlaylistDetail = function(playlistId){
    var p = new promise(function (resolve, reject){
    qcloud.request({
      url: `${config.service.host}/weapp/query/getSong?listid=` + playlistId,
      login: false,
      success(result) {
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        console.log("请求getUserPlaylistDetail...")
        console.log(json.data)
        resolve(json.data.msg)
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  })
  return p
}

//创建歌单 返回值为songId 数组
var createUserPlaylist = function (userId, listName) {
  console.log("开始新建歌单...userid="+userId+'&listname='+listName)
  var p = new promise(function (resolve, reject) {
    qcloud.request({
      url: `${config.service.host}/weapp/update/createList?userid=`+userId+'&listname='+listName,
      login: false,
      success(result) {
        var j = JSON.stringify(result.data)
        var json = JSON.parse(j)
        console.log("请求createUserPlaylist...")
        console.log(json.data)
        resolve(json.data)
      },
      fail(error) {
        console.log('request fail', error);
      }
    })
  })
  return p
}

module.exports = { formatTime, showBusy, showSuccess, showModel, getMusicUrl, getHotlist, getPlaylistDetail, getUserPlaylist, getUserPlaylistDetail, createUserPlaylist, getMusicDetail }

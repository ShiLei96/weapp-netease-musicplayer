//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    selectHideOrNot: "../res/pull.png",
    showModal: false,
    showBlock: true,
    userInfo: {},
    hasUserInfo: false,
    SongList:[],
    newPlayListName:''
  },
  upper: function (e) {
    console.log(e)
  },
  lower: function (e) {
    console.log(e)
  },
  scroll: function (e) {
    console.log(e)
  },
  //事件处理函数
  bindViewTap:async function (e) {
    console.log(e)


    wx.navigateTo({
      url: '../playlist/playlist?playlistId=' + e.currentTarget.dataset.id + '&in=1'
    })
  },

  /**
   * 弹窗
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm:async function (e) {
    this.hideModal();
    console.log(e)
    console.log(app.globalData.userInfo)
    console.log(this.data.newPlayListName)
    await util.createUserPlaylist(app.globalData.userInfo.openId, this.data.newPlayListName)
    this.setUserPlaylist()
  },
  onInputListName: function(e){
    console.log(e)
    this.setData({
      newPlayListName: e.detail.value
    })
  },
  onClick: function () {
    console.log("showBlock：" + this.data.showBlock)
    this.data.showBlock = !this.data.showBlock
    this.setData({
      showBlock: this.data.showBlock,
      selectHideOrNot: this.data.showBlock ? "../res/pull.png" : "../res/pull2.png"
    })
  },
  bindSettingTap: function () {
    var that = this
    wx.showActionSheet({
      itemList: ['创建新歌单', '歌单管理'],
      success: function (res) {
        //console.log(JSON.stringify(res))
        //console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          that.showDialogBtn()
        }
      }
    })
  },
  onShow: function () {
    console.log("onShow...")
  },
  onHide: function () {
    console.log("onHide...")
  },
  onReady: function () {
    console.log("onReady...")
    this.setUserPlaylist()
  },
  setUserPlaylist:async function(){
    var userPlaylist
    userPlaylist = await util.getUserPlaylist(app.globalData.userInfo.openId)
    console.log(userPlaylist)
    this.setData({
      SongList: userPlaylist
    })
  },
  onLoad: function () {
    console.log("onLoad....")
    console.log(app.globalData.userInfo)
  },
})


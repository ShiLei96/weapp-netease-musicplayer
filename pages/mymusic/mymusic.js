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
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    SongList: [
      {
        id: 1,
        title: "歌单1",
        images: 'https://www.allcdcovers.com/image_system/covers_th/0/2/02207cc7c98cd5a5bd8092786f171cc0.jpg'
      },
      {
        id: 2,
        title: "歌单2",
        images: 'https://www.allcdcovers.com/image_system/covers_th/7/5/7586f74beb492fbd87b085c90207afc5.jpg'
      },
      {
        id: 3,
        title: "歌单3",
        images: 'https://www.allcdcovers.com/image_system/covers_th/6/f/6f105bb86df0dd2f6361efcf0fadf9a7.jpg'
      },
    ],

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
  bindViewTap: function () {
    wx.navigateTo({
      url: '../musicPlayer/musicPlayer'
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
  onConfirm: function (e) {
    this.hideModal();
    console.log(e)
  },
  onInputListName: function(e){
    console.log(e)
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

  bindHiddenTap: function () {

  },
  onShow: function () {
    console.log("onShow...")
  },
  onHide: function () {
    console.log("onHide...")
  },
  onReady: async function () {
    console.log("onReady...")
    var hotlist
    hotlist = await util.getUserPlaylist()
    console.log(hotlist)
    // this.setData({
    //   requestResult: hotlist
    // })
  },
  onLoad: function () {
    console.log("onLoad...")
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

})


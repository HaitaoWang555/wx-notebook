//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    noteList: []
  },
  onLoad: function () {
    // 获取本地数据进行展示
  },
  onShow(){
    this.setData({
      noteList: wx.getStorageSync('noteData')
    })
  },
  addNote(){
    wx.navigateTo({
      url: '../editor/editor'
    })   
  }
})

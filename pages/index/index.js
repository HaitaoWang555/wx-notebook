//index.js

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
  dataDetail(e){
    let dataIndex = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../editor/editor?page=' + dataIndex
    })
  },
  addNote(){
    wx.navigateTo({
      url: '../editor/editor'
    })   
  }
})

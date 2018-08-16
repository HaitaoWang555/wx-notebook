//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    noteList: [
      {
        "title": "假数据假数据假数据假数据假数据",
        "date": "2018-8-16"
      }, {
        "title": "假数据假数据假数据假数据假数据",
        "date": "2018-8-16"
      }, {
        "title": "假数据假数据假数据假数据假数据",
        "date": "2018-8-16"
      }, {
        "title": "假数据假数据假数据假数据假数据",
        "date": "2018-8-16"
      }, {
        "title": "假数据假数据假数据假数据假数据",
        "date": "2018-8-16"
      }
    ]
  },
  onLoad: function () {
    // 获取本地数据进行展示
  },
  onShow(){

  },
  addNote(){
    wx.navigateTo({
      url: '../editor/editor'
    })   
  }
})

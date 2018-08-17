//index.js

Page({
  data: {
    noteList: [],
    isSetting: false,
    isQuery: []
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
  },
  showSetting(e){
    this.setData({
      isSetting: true
    })
    this.initQuery(false)
    this.chooseItem(e)
  },
  itemTap(e){
    if (!this.data.isSetting) {
      this.dataDetail(e)
    } else {
      this.chooseItem(e)
    }
  },
  initQuery(boolean){
    let num = this.data.noteList.length
    let isQueryArr = []
    for (let i = 0; i < num; i++) {
      isQueryArr.push({
        value: boolean
      })
    }
    this.setData({
      isQuery: isQueryArr
    })
  },
  changeQuery(curIndex){
    let isQueryArr = this.data.isQuery
    isQueryArr[curIndex].value = !isQueryArr[curIndex].value
    this.setData({
      isQuery: isQueryArr
    })
    console.log(this.data.isQuery)
  },
  chooseItem(e){
    let curIndex = e.currentTarget.dataset.index
    this.changeQuery(curIndex)
  },
  cancel(){
    this.setData({
      isSetting: false
    })
    this.initQuery(false)
  },
  allQuery(){
    this.initQuery(true)
  },
  delatePrompt(){
    let _this = this
    wx.showModal({
      title: '确定要删除么？',
      success: function (res) {
        if (res.confirm) {
          _this.delate()
        } else if (res.cancel) {
          wx.showToast({
            title: '已取消',
            duration: 2000
          })
        }
      }
    })   
  },
  delate(){
    let data = this.data.noteList
    let queryData = this.data.isQuery
    let num = 0
    for (let i = 0; i < queryData.length; i++) {
      if (queryData[i].value) {
        data.splice(i-num, 1)
        console.log(data)
        num += 1
      }
    }
    wx.setStorageSync('noteData', data)
    this.setData({
      noteList: wx.getStorageSync('noteData')
    })
    this.cancel()
  },
  onShareAppMessage: function () {
    return {
      title: '便签小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})

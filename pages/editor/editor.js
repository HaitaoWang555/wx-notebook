// pages/editor/editor.js
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisNoteData: null,
    isSave: false,
    isOldNote: false,
    noteIndex: 0,
    showDialog: false,
    bgImgList: [
     {'img': '/images/back1.jpg'},
      {'img': '/images/back2.jpg'} ,
      {'img':'/images/back3.jpg'},
      {'img':'/images/back4.jpg'}
    ],
    bgImg: '/images/back1.jpg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.page) {
      let data = this.getThisNote(options.page)
      this.setData({
        noteIndex: options.page,
        isSave: true,
        isOldNote: true,
        thisNoteData: data
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      bgImg: wx.getStorageSync('backgroundImg')
    })
  },
  formSubmit(e){
    if (this.data.isOldNote) {
      this.delateThisNote(this.data.noteIndex)
    }
    let formData = e.detail.value
    formData.date = util.formatTime(new Date())
    let noteData = wx.getStorageSync('noteData') || []
    noteData.unshift(formData)
    wx.setStorageSync('noteData', noteData)
    this.setData({
      isSave: true
    })
    wx.showToast({
      title: '已保存',
      icon: 'success',
      duration: 2000
    })
  },
  getThisNote(index){
    let data = wx.getStorageSync('noteData')
    return data[index]
  },
  delateThisNote(index) {
    let data = wx.getStorageSync('noteData')
    data.splice(index, 1)
    wx.setStorageSync('noteData', data)
  },
  edit(){
    this.setData({
      isSave: false
    })
    wx.showToast({
      title: '开始编辑吧',
      duration: 2000
    })
  },
  delete() {
    let _this = this
    wx.showModal({
      title: '确定要删除么？',
      success: function (res) {
        if (res.confirm) {
          // 从数据库中删除此组数据
          _this.delateThisNote(_this.data.noteIndex)
          wx.redirectTo({
            url: '../index/index'
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '已取消',
            duration: 2000
          })
        }
      }
    })
  },
  closeDialog(){
    this.setData({
      showDialog: false
    })
  },
  share(){
    wx.navigateTo({
      url: '../logs/logs'
    })   
  },
  setting(){
    this.setData({
      showDialog: true
    })
  },
  choseBg(e){
    let newBgImg = this.data.bgImgList[parseInt(e.currentTarget.dataset.index)].img
    wx.setStorageSync('backgroundImg', newBgImg)
    this.setData({
      bgImg: wx.getStorageSync('backgroundImg')
    })
    this.closeDialog()
  }
})
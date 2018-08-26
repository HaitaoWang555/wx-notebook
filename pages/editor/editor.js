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
    if (wx.getStorageSync('backgroundImg')) {
      this.setData({
        bgImg: wx.getStorageSync('backgroundImg')
      })
    }
  },
  formSubmit(e){
    let formData = e.detail.value
    if (formData.title === '') {
      wx.showToast({
        title: '请填写标题',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (formData.textarea === '') {
      wx.showToast({
        title: '请填写内容',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (this.data.isOldNote) {
      this.delateThisNote(this.data.noteIndex)
    }
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
  gpback(){
    if (this.data.isSave) {
      wx.navigateBack()
    } else {
      wx.showModal({
        title: '正在返回首页',
        content: '数据还未保存',
        confirmText: '确认返回',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack()
          } else if (res.cancel) {
            wx.showToast({
              title: '已取消',
              duration: 2000
            })
          }
        }
      })
    }
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
  },
  onShareAppMessage: function () {
    return {
      title: '便签小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  }
})
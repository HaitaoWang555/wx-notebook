// pages/editor/editor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSave: false,
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
  },
  formSubmit(e){
    console.log(e.detail.value)
    this.setData({
      isSave: true
    })
    wx.showToast({
      title: '已保存',
      icon: 'success',
      duration: 2000
    })
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
    wx.showModal({
      title: '确定要删除么？',
      success: function (res) {
        if (res.confirm) {
          // 从数据库中删除此组数据
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
    console.log(share)
  },
  setting(){
    this.setData({
      showDialog: true
    })
  },
  choseBg(e){
    this.setData({
      bgImg: this.data.bgImgList[parseInt(e.currentTarget.dataset.index)].img
    })
    this.closeDialog()
  }
})
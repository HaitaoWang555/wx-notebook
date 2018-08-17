#项目中使用到的API
---
- 页面的跳转
```
//保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面
wx.navigateTo({
  url: 'test?id=1'
})
//关闭当前页面，跳转到应用内的某个页面
wx.redirectTo({
  url: 'test?id=1'
})
//关闭所有页面，打开到应用内的某个页面
wx.reLaunch({
  url: 'test?id=1'
})
```
- 绑定事件函数
```
//使用 bindtap
<view class="addNote" bindtap="addNote">
```
- 改变与获取data中的函数
```
// 改变
this.setData({
  xxx: xxx
})
// 获取
this.data.xxx
```
- 自带Toast组件
```
wx.showToast({
  title: '已保存',
  icon: 'success',
  duration: 2000
})
```
- wx:key
```
wx:key="*this"
```
- 获取自定义变量
```
// wxml
<view class="itemList scroll_item"
  wx:for="{{bgImgList}}"
  wx:key="{{item.index}}"
>
  <image src="{{item.img}}" data-index="{{index}}" bindtap="choseBg"/>
</view>
// js
choseBg(e){
  // e.currentTarget.dataset.index
}
```
- scroll-view scroll-x 需要的css
```
.scroll_view {
  white-space: nowrap;
  display: flex;
}

.scroll_item {
  width: 350rpx;
  height: 420rpx;
  display: inline-block;
}
```
- 本地存储
```
wx.setStorageSync('noteData', noteData)
wx.getStorageSync('noteData')
wx.removeStorageSync('noteData')
```
- 长按事件
```
bindlongpress
```
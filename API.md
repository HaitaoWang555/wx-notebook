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
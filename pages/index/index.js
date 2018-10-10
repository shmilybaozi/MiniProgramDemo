// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '图图是全世界最可爱的喵咪',
    userInfo: null,
    isShow: true,
  },

  handleClick () {
    // 点击跳转到list页面
    // 需要回退用wx.navigateTo() 注意：不能跳转到tabBar的页面
    // 不需要回退可以用wx.redirectTo() 注意：不能跳转到tabBar的页面
    // 跳转到tabBar页面用：wx.switchTab()
    wx.switchTab({
      url: '/pages/list/list',
      success: (result)=>{

      },
      fail: (e)=>{
        console.log(e)
      },
      complete: ()=>{}
    });
  },

  handleGetUserInfo (data) {
    // 判断用户点击的是否是允许
    if (data.detail.rawData) {
      // 用户点击允许
      this.getUserInfo()
    }
  },

  getUserInfo () {
    // 判断用户是否授权
    wx.getSetting({
      success: (result)=>{
        if (result.authSetting['scope.userInfo']) {
          // 用户已经授权
          this.setData({
            isShow: false
          })
        } else {
          // 用户没有授权
          this.setData({
            isShow: true
          })
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });

    // 获取用户登录的信息
    wx.getUserInfo({
      success: (result)=>{
        // 更新data中的 userInfo
        this.setData({
          userInfo: result.userInfo
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 做一些初始化工作，发送Ajax请求，开启定时器
    console.log('onLoad 页面加载')
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady 页面初次渲染完成')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow 页面显示')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
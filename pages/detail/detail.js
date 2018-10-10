// pages/detail/detail.js
let datas = require('./../../datas/list-data.js')
let appDatas = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailObj: null,
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  handleCollection () {
    let isCollected = !this.data.isCollected
    let {index} = this.data
    // 更新isCollected状态
    this.setData({
      isCollected
    })
    // 提示用户
    let title = isCollected? '收藏成功' : '取消收藏'
    wx.showToast({
      title,
      icon: 'success',
    });
    // 缓存数据到本地
    // let obj = {} 每次都会覆盖上一次数据，无法达到预期效果
    wx.getStorage({
      key: 'isCollected',
      success: (result)=>{
        let obj = result.data
        obj[index] = isCollected
        wx.setStorage({
          key: 'isCollected',
          data: obj
        });
      },
    });
  },
  
  handleMusicPlay () {
    let isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })

    // 控制音乐播放
    if (isMusicPlay) {
      // 播放音乐
      let { dataUrl, title } = this.data.detailObj.music
      wx.playBackgroundAudio({
        dataUrl ,
        title,
      });
    } else {
      wx.playBackgroundAudio();
    }
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数值
    let index = options.index
    // 更新detailObj的状态值
    this.setData({
      detailObj: datas.list_data[index],
      index
    })

    // 根据本地缓存的数据判断用户是否收藏当前的文章
    let detailStorage = wx.getStorageSync('isCollected');
    if (!detailStorage) {
      // 在缓存中初始化空对象
      wx.setStorageSync('isCollected', {});
    }
    // 判断当前文章是否收藏
    if (detailStorage[index]) {
      this.setData({
        isCollected: true
      })
    }

    // 判断当前页面音乐是否在播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      this.setData({
        isMusicPlay: true
      })
    }

    // 监听音乐播放和暂停
    wx.onBackgroundAudioPlay((result)=>{
      // 修改isMusicPlay状态
      this.setData({
        isMusicPlay: true
      })
      // 修改appData中的状态值
      appDatas.data.isPlay = true
      appDatas.data.pageIndex = index
    });
    wx.onBackgroundAudioPause((result)=>{
      this.setData({
        isMusicPlay: false
      })
      appDatas.data.isPlay = false  
    });
  },

  // 分享
  handleShare () {
    wx.showActionSheet({
      itemList: [
        '分享到朋友圈',
        '分享到微博',
        '分享到QQ空间',
      ],
    });
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
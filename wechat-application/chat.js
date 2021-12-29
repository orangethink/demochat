// pages/ini/ini.js
//var util = require('../../utils/util.js');  
var status = true;

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    list:[],
    switch1Checked: false,
    inputActivity:" ",
    thingImage:'',
    imgShow:true
  },
  switch1Change:function(e){
		//设置是否仅自己可见
if(e.detail.value==true){
  this.setData({
    switch1Checked:"waiting"
  })

}
console.log(e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow:function(){
   this.getinfo();
  },
  bindInput: function (e) {
    
    this.setData({
      inputActivity: e.detail.value
    })
  },
  getinfo:function(){
    var obj=this;
    wx.request({
      //url:getApp().globalData.url+"",
      url:"博客地址/wx.php",
      data:{
        page:obj.data.page,
        md5: "getinfo",
      },
      method:"POST",
      header:{
        "Content-type":"application/x-www-form-urlencoded"
      },
      success:function(res) {
        if(res.statusCode==200){
          console.log(res.data);
          wx.showToast({
            title: '已刷新',
            icon: 'success',
            duration: 2000
                              });
obj.setData({
  total:res.data.total
})
if (obj.data.list.length==0) {
  obj.setData({
    list:res.data.list
  });

}else{
  obj.setData({
    list:obj.data.list.concat(res.data.list)
  });
}
    }},
      fail:function(res) {
        //console.log(this.record);
        console.log("failed");
      }
    });
  },
  	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {
		var obj=this;
		if ((obj.data.list.length < obj.data.total)&&(obj.data.page=obj.data.page + 1)) {
			
				obj.getinfo();
    
    }
	},
  bindThingImageInput: function() { //商品图片选择
    var that = this;
    var thingImage=that.data.thingImage
    wx.chooseImage({
      count: 9,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: res=>{
        var tempFilePaths = res.tempFilePaths;
        console.log(res.tempFilePaths)
        // if(thingImage==0){
        //   thingImage=tmpthingImage
        // }else{
        //   thingImage=thingImage.concat(tmpthingImage);
        // }
        that.setData({
          thingImage: res.tempFilePaths
        })
        wx.uploadFile({
          url: '博客地址/wxup.php', 
          filePath: tempFilePaths[0],
          name: 'file',
          // header: {
          //   'content-type': 'multipart/form-data' // 默认值
          // },
          formData: {
            'md5': 'submit'
          },
          success (res){
            const data = res.data
            console.log(res.data)
            that.setData({
              img:'<img src=/wxphoto/'+res.data+' />',
              imgShow:false
            })
            //do something
          }
        })
      }
    })
  },
  formSubmit: function(e) {
    var that=this;
    if(this.data.img){
      this.data.img= this.data.img;
    }else{
      this.data.img=''
    }
      wx.request({
        
        url:"博客地址/wx.php",
        data:{
          content:this.data.inputActivity+this.data.img,//内容
          status:this.data.switch1Checked,
          md5: "submit",
        },
        method:"POST",
        header:{
          "Content-type":"application/x-www-form-urlencoded"
        },
        success:function(res) {
          if(res.statusCode==200){
            console.log(res.data);
            wx.showToast({
              title: '已发布',
              icon: 'success',
              duration: 2000
                                });
  that.setData({
    inputActivity:'',
    img:'',
    thingImage:''
  })

      }},
        fail:function(res) {
          //console.log(this.record);
          console.log("failed");
        }
      });

    
    }
  

})
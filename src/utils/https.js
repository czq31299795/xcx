const https={
  request(options={}){
    const {url,method,data }=options;
    wx.showLoading({
      title:'加载中...'
    });
    return new Promise((resolve,reject) => {
      wx.request({
        url:url,
        method:method,
        data:data,
        success(res){
          wx.hideLoading();
          if(res.statusCode==404){
            reject();
            return false;
          }else if(res.statusCode!=200){
            wx.showToast({
              title:"网络出错，稍后再试！",
              icon:'none'
            });
            return false
          }
          //成功返回数据
          resolve(res.data);
        },
        fail(err){
          // 失败
          wx.hideLoading();
          reject(error);
        }
      })
    });
  }
};
export default https;

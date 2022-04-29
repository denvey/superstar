var a = getApp();

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        address_list: []
    },
    onLoad: function(a) {
        console.log(this.data.StatusBar), console.log(this.data.CustomBar);
    },
    onReady: function() {},
    addaddress: function() {
        wx.navigateTo({
            url: "/pages/my/address/addaddress"
        });
    },
    onShow: function() {
        var t = this;
        a.util.request({
            url: "entry/wxapp/getaddress",
            data: {
                m: a.globalData.module_name,
                op: "list"
            },
            method: "get",
            success: function(a) {
                console.log("", a.data), 0 == a.data.errno ? t.setData({
                    address_list: a.data.data
                }) : wx.showToast({
                    icon: "none",
                    title: a.data.message
                });
            },
            fail: function(a) {
                console.log(a), 9999 == a.data.errno && wx.showToast({
                    icon: "none",
                    title: "没有信息"
                });
            }
        });
    },
    select: function(t) {
        a.globalData.selectaddressid = t.currentTarget.dataset.id, wx.navigateBack({
            delta: -1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
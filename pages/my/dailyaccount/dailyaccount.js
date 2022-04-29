var a = getApp();

Page({
    data: {
        dailylist: [],
        pg: 0
    },
    onLoad: function(t) {
        this.setData({
            currency_name: a.globalData.currency_name
        }), this.getdailyaccount(0);
    },
    onReady: function() {},
    onShow: function() {},
    getdailyaccount: function(t) {
        var n = this;
        a.util.request({
            url: "entry/wxapp/getdailyaccount",
            data: {
                m: a.globalData.module_name,
                page: t
            },
            method: "get",
            success: function(a) {
                console.log("steal", a.data), 0 == a.data.errno && (n.data.dailylist.length > 0 ? n.data.dailylist = n.data.dailylist.concat(a.data.data) : n.data.dailylist = a.data.data, 
                n.setData({
                    dailylist: n.data.dailylist
                }));
            },
            fail: function(a) {
                wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("用户点击确定") : a.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pg = this.data.pg + 1, console.log("触发加载更多" + this.data.pg), this.getdailyaccount(this.data.pg);
    },
    onShareAppMessage: function() {}
});
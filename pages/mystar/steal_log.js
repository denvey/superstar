var t = getApp();

Page({
    data: {
        pg: 0,
        steallist: []
    },
    onLoad: function(t) {
        this.getlist(0);
    },
    onReady: function() {},
    onShow: function() {},
    getlist: function(a) {
        var n = this;
        t.util.request({
            url: "entry/wxapp/steallist",
            data: {
                m: t.globalData.module_name,
                page: a
            },
            method: "get",
            success: function(t) {
                console.log("steal", t.data), 0 == t.data.errno && (n.data.steallist.length > 0 ? n.data.steallist = n.data.steallist.concat(t.data.data) : n.data.steallist = t.data.data, 
                n.setData({
                    steallist: n.data.steallist
                }));
            },
            fail: function(t) {
                wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.data.message,
                    success: function(t) {
                        t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {
        this.data.pg = this.data.pg + 1, console.log("触发加载更多" + this.data.pg), this.getlist(this.data.pg);
    },
    onPullDownRefresh: function() {},
    onShareAppMessage: function() {}
});
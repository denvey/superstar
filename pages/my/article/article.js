var t = getApp();

Page({
    data: {},
    onLoad: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/getarticle",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(t) {
                console.log(t.data), 0 == t.data.errno && ("help" == a.type && (wx.setNavigationBarTitle({
                    title: "帮助中心"
                }), e.setData({
                    article: t.data.data.help_content
                })), "xieyi" == a.type && (wx.setNavigationBarTitle({
                    title: "使用协议"
                }), e.setData({
                    article: t.data.data.xieyi_content
                })), "about" == a.type && (wx.setNavigationBarTitle({
                    title: "关于我们"
                }), e.setData({
                    article: t.data.data.about_content
                })));
            },
            fail: function(t) {
                wx.showToast({
                    icon: "none",
                    title: "网络错误"
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
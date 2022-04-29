Page({
    data: {
        url: ""
    },
    onLoad: function(n) {
        this.setData({
            url: n.url
        });
    },
    onReady: function() {},
    onShow: function() {},
    loaded: function(n) {
        console.log(n);
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
var o = getApp();

Page({
    data: {},
    onLoad: function(o) {
        this.getinfo();
    },
    getinfo: function() {
        var n = this;
        o.util.request({
            url: "entry/wxapp/gettixianinfo",
            data: {
                m: o.globalData.module_name,
                title: ""
            },
            method: "get",
            success: function(o) {
                console.log(o.data), 0 == o.data.errno && n.setData({
                    memberinfo: o.data.data,
                    memberinfo_yue: parseFloat(o.data.data.yue).toLocaleString(),
                    memberinfo_frozen_money: parseFloat(o.data.data.frozen_money).toLocaleString()
                });
            },
            fail: function(o) {
                wx.showToast({
                    icon: "none",
                    title: "网络错误"
                });
            }
        });
    },
    tixian: function() {
        var n = this;
        o.util.request({
            url: "entry/wxapp/dotixian",
            data: {
                m: o.globalData.module_name,
                title: ""
            },
            method: "get",
            success: function(o) {
                console.log(o.data), 0 == o.data.errno && wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: o.data.message,
                    success: function(o) {
                        o.confirm ? n.getinfo() : o.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(o) {
                console.log(o.data), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: o.data.message,
                    success: function(o) {
                        o.confirm ? console.log("用户点击确定") : o.cancel && console.log("用户点击取消");
                    }
                });
            },
            complate: function(o) {
                console.log(o.data);
            }
        });
    },
    getPhoneNumber: function(n) {
        console.log(), console.log(n.detail.iv), console.log(n.detail.encryptedData);
        var e = this;
        "getPhoneNumber:ok" == n.detail.errMsg ? o.util.request({
            url: "entry/wxapp/getphonenumber",
            data: {
                m: o.globalData.module_name,
                iv: n.detail.iv,
                encryptedData: n.detail.encryptedData
            },
            method: "post",
            success: function(o) {
                console.log(o), 0 == o.data.errno ? e.tixian() : wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: o.data.message,
                    success: function(o) {
                        o.confirm ? console.log("用户点击确定") : o.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(o) {
                wx.showToast({
                    icon: "none",
                    title: o.data.message
                });
            }
        }) : wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "为避免恶意作弊，账号需绑定手机号才可以提现",
            success: function(o) {
                o.confirm ? console.log("用户点击确定") : o.cancel && console.log("用户点击取消");
            }
        });
    },
    showreasons: function(o) {
        console.log(o), null == o.currentTarget.dataset.txt ? wx.showModal({
            title: "详情",
            showCancel: !1,
            content: "无",
            success: function(o) {
                o.confirm ? console.log("用户点击确定") : o.cancel && console.log("用户点击取消");
            }
        }) : wx.showModal({
            title: "详情",
            showCancel: !1,
            content: o.currentTarget.dataset.txt,
            success: function(o) {
                o.confirm ? console.log("用户点击确定") : o.cancel && console.log("用户点击取消");
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
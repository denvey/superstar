var e = getApp();

Page({
    data: {
        memberinfo: [],
        loginmodal: !1,
        menulist: [ {
            icon: "/resource/icon/add.png",
            title: "地址管理",
            desc: "还没有添加收货地址",
            path: "/pages/my/address/address"
        }, {
            icon: "/resource/icon/message.png",
            title: "客服中心",
            desc: "问题咨询和交流群",
            path: "/pages/webview/webview?url=http://www.baidu.com"
        }, {
            icon: "/resource/icon/help.png",
            title: "帮助与反馈",
            desc: "",
            path: ""
        }, {
            icon: "/resource/icon/xieyi.png",
            title: "使用协议",
            desc: "",
            path: ""
        }, {
            icon: "/resource/icon/about.png",
            title: "关于我们",
            desc: "",
            path: ""
        } ]
    },
    onLoad: function(t) {
        this.setData({
            currency_name: e.globalData.currency_name,
            version: e.siteInfo.version,
            develop_version: e.globalData.develop_version
        });
    },
    onReady: function() {},
    onShow: function() {
        var t = this;
        e.util.islogin() ? (this.setData({
            islogin: !0
        }), e.util.request({
            url: "entry/wxapp/getuserinfo",
            data: {
                m: e.globalData.module_name,
                title: ""
            },
            method: "post",
            success: function(e) {
                console.log(e.data), 9999 == e.data.errno || (t.setData({
                    memberinfo: e.data.data,
                    memberinfo_integral: parseFloat(e.data.data.integral).toLocaleString()
                }), wx.setStorage({
                    key: "memberinfo",
                    data: e.data.data
                }));
            },
            fail: function(e) {
                wx.showToast({
                    icon: "none",
                    title: "网络错误"
                });
            }
        })) : this.setData({
            islogin: !1
        });
    },
    onHide: function() {},
    jumppage_index: function(e) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    jumppage_login: function(e) {
        wx.navigateTo({
            url: "/pages/auth/auth"
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
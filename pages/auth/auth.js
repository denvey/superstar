var e = getApp();

Page({
    data: {
        info: ""
    },
    onLoad: function(a) {
        console.log("我是app.globalData.invite_uid", e.globalData.invite_uid);
        var o = wx.getMenuButtonBoundingClientRect(), t = this;
        this.setData({
            MenuButton: o
        }), wx.getUserProfile || wx.showModal({
            title: "提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        }), e.util.request({
            url: "entry/wxapp/getloginbg",
            data: {
                m: e.globalData.module_name
            },
            method: "get",
            success: function(e) {
                console.log("getindexparameter", e.data), 0 == e.data.errno ? t.setData({
                    info: e.data.data.loginbackground
                }) : console.log("???", e.data.errno);
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    onReady: function() {},
    onShow: function() {},
    back: function() {
        wx.navigateBack({
            delta: -1
        });
    },
    onHide: function() {},
    onUnload: function() {},
    updateUserInfo: function(e) {
        var a = this, o = getApp();
        "getUserProfile:fail auth deny" != e.errMsg ? (o.util.getUserInfo(function(t) {
            console.log("userInfo", t), console.log("邀请者UID", o.globalData.invite_uid), t.sessionid ? o.util.request({
                url: "entry/wxapp/getuserinfo",
                data: {
                    m: o.globalData.module_name,
                    invite_uid: o.globalData.invite_uid ? o.globalData.invite_uid : 0
                },
                method: "post",
                success: function(t) {
                    if (console.log("登录返回信息", t.data), 9999 == t.data.errno) ; else {
                        console.log("登录成功"), "getUserProfile:ok" == e.errMsg ? (console.log("授权成功？", e), 
                        o.util.request({
                            url: "entry/wxapp/update",
                            data: {
                                m: o.globalData.module_name,
                                avatar: e.userInfo.avatarUrl,
                                nickname: e.userInfo.nickName,
                                city: e.userInfo.city,
                                sex: e.userInfo.gender
                            },
                            method: "post",
                            success: function(e) {
                                console.log("更新用户资料成功", e.data);
                            },
                            fail: function(e) {
                                console.log("更新用户资料失败", e);
                            }
                        })) : "getUserProfile:fail auth deny" == e.errMsg ? console.log("您拒绝了授权，无法登录。") : console.log(e.errMsg), 
                        a.setData({
                            memberinfo: t.data.data
                        });
                        try {
                            wx.setStorageSync("memberinfo", t.data.data);
                        } catch (e) {}
                        console.log("登录成功,设置memberinfo缓存成功"), a.getindexparameter(), wx.navigateBack({
                            delta: 1
                        });
                    }
                },
                fail: function(e) {
                    console.log("登录错误？", e);
                }
            }) : console.log("uid都没获取到？？");
        }), console.log("登录返回信息aa", e)) : wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "您拒绝了授权，无法登录",
            success: function(e) {
                e.confirm ? wx.navigateBack({
                    delta: 1
                }) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    onPullDownRefresh: function() {},
    getindexparameter: function() {
        e.util.request({
            url: "entry/wxapp/getindexparameter",
            data: {
                m: e.globalData.module_name
            },
            method: "get",
            success: function(a) {
                console.log("getindexparameter", a.data), 0 == a.data.errno && "1" == a.data.data.other_parameter.star_enable && (e.globalData.star_enable = !0, 
                e.globalData.bar_icon = a.data.data.other_parameter.bar_icon, e.globalData.currency_name = a.data.data.other_parameter.currency_name);
            },
            fail: function(e) {},
            complete: function() {}
        });
    },
    login: function() {
        var e = this;
        console.log("哈哈 新接口"), wx.getUserProfile({
            desc: "讲获取您的公开信息用于登录",
            success: function(e) {
                console.log(e);
            },
            fail: function(e) {
                console.log(e);
            },
            complete: function(a) {
                e.updateUserInfo(a);
            }
        });
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
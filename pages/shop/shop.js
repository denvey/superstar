var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        toolslist: [],
        modal: !1,
        select_pay_type: 0,
        payloading: 0,
        isios: ""
    },
    onLoad: function(a) {
        var e = this;
        this.setData({
            currency_name: t.globalData.currency_name
        }), this.gettools();
        try {
            wx.getSystemInfo({
                success: function(t) {
                    e.data.StatusBar = t.statusBarHeight;
                    var a = wx.getMenuButtonBoundingClientRect();
                    e.data.Custom = a, e.data.CustomBar = a.bottom + a.top - t.statusBarHeight;
                }
            });
            var o = wx.getSystemInfoSync();
            this.setData({
                isios: o.platform
            }), console.log(o.platform);
        } catch (t) {}
    },
    onReady: function() {},
    onShow: function() {},
    openmodal: function(a) {
        var e = this;
        t.util.islogin() ? (console.log(a.currentTarget.dataset.id), t.util.request({
            url: "entry/wxapp/pulltool",
            data: {
                m: t.globalData.module_name,
                id: a.currentTarget.dataset.id
            },
            method: "get",
            success: function(t) {
                console.log("openmodal", t.data), 0 == t.data.errno ? ("0" == t.data.data.ios_pay_show && "ios" == e.data.isios && (t.data.data.payment_wechatpay = 0), 
                e.setData({
                    selecttool: t.data.data
                }), 1 == t.data.data.payment_integral ? e.setData({
                    select_pay_type: 1
                }) : 1 == t.data.data.payment_wechatpay ? e.setData({
                    select_pay_type: 2
                }) : 1 == t.data.data.payment_balance && e.setData({
                    select_pay_type: 3
                })) : wx.showToast({
                    icon: "none",
                    title: t.data.message
                });
            },
            fail: function(t) {
                wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            }
        }), this.setData({
            modal: !0
        })) : wx.navigateTo({
            url: "/pages/auth/auth"
        });
    },
    closemodal: function() {
        this.setData({
            modal: !1
        });
    },
    payradioChange: function(t) {
        console.log(t), this.setData({
            select_pay_type: t.detail.value
        });
    },
    payradioclick: function(t) {
        this.setData({
            select_pay_type: t.currentTarget.dataset.paytype
        });
    },
    toolpay: function(a) {
        console.log(a.currentTarget.dataset.id);
        var e = this;
        2 == e.data.select_pay_type && e.data.selecttool.tool_price > 0 ? t.util.request({
            url: "entry/wxapp/gettoolswepaypara",
            data: {
                m: t.globalData.module_name,
                tool_id: a.currentTarget.dataset.id
            },
            method: "get",
            success: function(t) {
                console.log("gettoolswepaypara", t.data), wx.requestPayment({
                    timeStamp: t.data.data.timeStamp,
                    nonceStr: t.data.data.nonceStr,
                    package: t.data.data.package,
                    signType: "MD5",
                    paySign: t.data.data.paySign,
                    success: function(a) {
                        console.log("支付成功！"), e.setData({
                            payloading: 1
                        }), setTimeout(function() {
                            e.checkpayresult(t.data.data.local_order_data.order_id);
                        }, 3e3);
                    },
                    fail: function(t) {
                        wx.showToast({
                            icon: "none",
                            title: "订单支付失败"
                        }), e.setData({
                            openboxbuttonenable: !0
                        });
                    }
                });
            },
            fail: function(t) {
                console.log("gettoolswepaypara", t.data);
            }
        }) : t.util.request({
            url: "entry/wxapp/buytool",
            data: {
                m: t.globalData.module_name,
                tool_id: a.currentTarget.dataset.id,
                paytype: e.data.select_pay_type
            },
            method: "get",
            success: function(t) {
                console.log("buytool1", t), e.setData({
                    payloading: 3
                });
            },
            fail: function(t) {
                console.log("buytool2", t.data), e.setData({
                    payresnotice: t.data.message,
                    payloading: 2
                });
            }
        });
    },
    checkpayresultclick: function(t) {
        console.log(t.currentTarget.dataset.orderid), this.checkpayresult(t.currentTarget.dataset.orderid);
    },
    checkpayresult: function(a) {
        console.log("check order_id=", a);
        var e = this;
        e.setData({
            payloading: 1,
            paycheck_orderid: ""
        }), t.util.request({
            url: "entry/wxapp/checkpayresult",
            data: {
                m: t.globalData.module_name,
                orderid: a
            },
            method: "get",
            success: function(t) {
                console.log("订单支付结果", t), 0 == t.data.errno && e.setData({
                    payloading: 3,
                    paycheck_orderid: ""
                });
            },
            fail: function(t) {
                console.log("订单支付失败", t), wx.showToast({
                    icon: "none",
                    title: t.data.message
                }), e.setData({
                    payloading: 2,
                    paycheck_orderid: a,
                    payresnotice: "支付未成功"
                });
            },
            complete: function(t) {
                e.setData({
                    openboxbuttonenable: !0
                });
            }
        });
    },
    onHide: function() {},
    hidecheckpaymodal: function() {
        console.log("this.data.payloading", this.data.payloading), 3 == this.data.payloading && this.closemodal(), 
        this.setData({
            payloading: 0,
            paycheck_orderid: ""
        });
    },
    gotowearhouse: function() {
        wx.switchTab({
            url: "/pages/warehouse/warehouse"
        });
    },
    onUnload: function() {},
    gettools: function() {
        var a = this;
        t.util.request({
            url: "entry/wxapp/gettools",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(t) {
                console.log("gettools", t.data), 0 == t.data.errno ? a.setData({
                    toolslist: t.data.data
                }) : wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            },
            fail: function(t) {
                wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            },
            complete: function(t) {
                wx.stopPullDownRefresh({
                    success: function(t) {}
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.gettools();
    },
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
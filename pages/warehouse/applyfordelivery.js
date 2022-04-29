var e = require("../../@babel/runtime/helpers/typeof"), a = getApp();

Page({
    data: {
        prize: [],
        useraddress: [],
        member_prize_id: 0,
        modal: !1,
        payloading: 0
    },
    onLoad: function(e) {
        this.data.member_prize_id = e.id, a.globalData.selectaddressid;
    },
    getprize: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/applydelivery",
            data: {
                m: a.globalData.module_name,
                id: e.data.member_prize_id,
                op: "getinfo"
            },
            method: "get",
            success: function(a) {
                console.log("applydelivery", a.data), 0 == a.data.errno ? e.setData({
                    prize: a.data.data,
                    useraddress: a.data.data.user_address
                }) : wx.showToast({
                    icon: "none",
                    title: "获取参数失败"
                });
            },
            fail: function(a) {
                e.setData({
                    prize: a.data.data,
                    useraddress: a.data.data.user_address
                }), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(e) {
                        e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                    }
                });
            },
            complete: function() {
                e.setData({
                    loading: !1
                });
            }
        });
    },
    copyexpress: function() {
        wx.setClipboardData({
            data: this.data.prize.poster.express_sn,
            success: function(e) {}
        });
    },
    onReady: function() {},
    getPhoneNumber: function(e) {
        console.log(), console.log(e.detail.iv), console.log(e.detail.encryptedData);
        var t = this;
        "getPhoneNumber:ok" == e.detail.errMsg ? a.util.request({
            url: "entry/wxapp/getphonenumber",
            data: {
                m: a.globalData.module_name,
                iv: e.detail.iv,
                encryptedData: e.detail.encryptedData
            },
            method: "post",
            success: function(e) {
                console.log(e), 0 == e.data.errno ? t.clickdelivery() : wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: e.data.message,
                    success: function(e) {
                        e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: e.data.message,
                    success: function(e) {
                        e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                    }
                });
            }
        }) : wx.showModal({
            title: "提示",
            showCancel: !1,
            content: "为避免恶意作弊，账号需绑定手机号才可以申请发货",
            success: function(e) {
                e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
            }
        });
    },
    jumpminiapp: function(e) {
        wx.navigateToMiniProgram({
            appId: e.currentTarget.dataset.appid,
            path: e.currentTarget.dataset.path,
            success: function(e) {}
        });
    },
    onShow: function() {
        if (a.util.islogin()) {
            this.setData({
                islogin: !0
            }), console.log(a.globalData.selectaddressid), console.log(e(a.globalData.selectaddressid));
            var t = this;
            t.getprize(), "string" == typeof a.globalData.selectaddressid && a.util.request({
                url: "entry/wxapp/getaddress",
                data: {
                    m: a.globalData.module_name,
                    op: "one",
                    id: a.globalData.selectaddressid
                },
                method: "get",
                success: function(e) {
                    console.log("", e.data), 0 == e.data.errno ? t.setData({
                        useraddress: e.data.data
                    }) : (t.setData({
                        useraddress: []
                    }), wx.showToast({
                        icon: "none",
                        title: e.data.message
                    }));
                },
                fail: function(e) {
                    wx.showToast({
                        icon: "none",
                        title: "网络连接失败"
                    });
                }
            });
        } else this.setData({
            islogin: !1
        });
    },
    clickdelivery: function(e) {
        console.log(e);
        var a = this;
        if (1 != a.data.prize.prize.prize_type || a.data.useraddress.id) {
            if (0 == a.data.prize.prize_first_state || -2 == a.data.prize.prize_first_state) {
                var t = [];
                return "" !== a.data.prize.tmplids.fahuo_notice_tmplid && t.push(a.data.prize.tmplids.fahuo_notice_tmplid), 
                "" !== a.data.prize.tmplids.guoqi_notice_tmplid && t.push(a.data.prize.tmplids.guoqi_notice_tmplid), 
                "" !== a.data.prize.tmplids.shenhe_notice_tmplid && t.push(a.data.prize.tmplids.shenhe_notice_tmplid), 
                void wx.requestSubscribeMessage({
                    tmplIds: t,
                    success: function(e) {},
                    fail: function(e) {
                        console.log("订阅失败", e);
                    },
                    complete: function(e) {
                        a.todelivery();
                    }
                });
            }
            a.todelivery();
        } else wx.showModal({
            title: "提示",
            content: "请先填写收件信息",
            showCancel: !1,
            success: function(e) {
                e.confirm ? (wx.navigateTo({
                    url: "/pages/my/address/address"
                }), a.getprize()) : e.cancel && console.log("用户点击取消");
            }
        });
    },
    todelivery: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/applydelivery",
            data: {
                m: a.globalData.module_name,
                id: e.data.member_prize_id,
                useraddressid: e.data.useraddress.id,
                op: "delivery"
            },
            method: "get",
            success: function(a) {
                console.log("response", a.data), 0 == a.data.errno ? (console.log("申请完成1", a.data.message), 
                wx.showModal({
                    title: "提示",
                    content: a.data.message,
                    showCancel: !1,
                    success: function(a) {
                        a.confirm ? (console.log("用户点击确定1"), e.getprize()) : a.cancel && console.log("用户点击取消");
                    }
                })) : console.log("申请完成2", a.data.message);
            },
            fail: function(a) {
                console.log("fail", a), 800 == a.data.errno ? (console.log("支付邮费", a.data.message), 
                wx.requestPayment({
                    timeStamp: a.data.data.timeStamp,
                    nonceStr: a.data.data.nonceStr,
                    package: a.data.data.package,
                    signType: "MD5",
                    paySign: a.data.data.paySign,
                    success: function(t) {
                        console.log("支付成功！"), e.setData({
                            payloading: 1
                        }), setTimeout(function() {
                            e.checkpayresult(a.data.data.local_order_data.order_id);
                        }, 3e3);
                    },
                    fail: function(a) {
                        wx.showToast({
                            icon: "none",
                            title: "订单支付失败"
                        }), e.setData({
                            openboxbuttonenable: !0
                        });
                    }
                })) : wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(e) {
                        e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                    }
                });
            },
            complete: function() {}
        });
    },
    onHide: function() {},
    onUnload: function() {},
    recovery: function() {
        var e = this;
        wx.showModal({
            title: "提示",
            content: "平台将以¥" + e.data.prize.prize.prize_fragment.prizes_fragments_recovery_price + "的价格回收，请确认",
            success: function(t) {
                t.confirm ? (console.log("用户点击确定"), a.util.request({
                    url: "entry/wxapp/recycleprize",
                    data: {
                        m: a.globalData.module_name,
                        prizeid: e.data.member_prize_id
                    },
                    method: "get",
                    success: function(e) {
                        console.log("回收结果", e), 0 == e.data.errno && wx.showModal({
                            title: "提示",
                            showCancel: !1,
                            content: e.data.message,
                            success: function(e) {
                                e.confirm ? (console.log("用户点击确定"), wx.navigateBack({
                                    delta: -1
                                })) : e.cancel && console.log("用户点击取消");
                            }
                        });
                    },
                    fail: function(e) {
                        console.log("订单支付失败", e), wx.showModal({
                            title: "提示",
                            showCancel: !1,
                            content: e.data.message,
                            success: function(e) {
                                e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                            }
                        });
                    }
                })) : t.cancel && console.log("用户点击取消");
            }
        });
    },
    checkpayresultclick: function(e) {
        console.log(e.currentTarget.dataset.orderid), this.checkpayresult(e.currentTarget.dataset.orderid);
    },
    regetinfo: function() {
        this.getprize(), this.setData({
            payloading: 0
        });
    },
    copycdkey: function() {
        wx.setClipboardData({
            data: "卡密:\n" + this.data.prize.prize_inclusion.cdkey.cdkey.cdkey + "\n\n使用方法:\n" + this.data.prize.prize_inclusion.cdkey.cdkey_instructions,
            success: function(e) {}
        });
    },
    checkpayresult: function(e) {
        console.log("check order_id=", e);
        var t = this;
        t.setData({
            payloading: 1,
            paycheck_orderid: ""
        }), a.util.request({
            url: "entry/wxapp/checkpayresult",
            data: {
                m: a.globalData.module_name,
                orderid: e
            },
            method: "get",
            success: function(e) {
                console.log("订单支付结果", e), 0 == e.data.errno && t.setData({
                    payloading: 3,
                    paycheck_orderid: ""
                });
            },
            fail: function(a) {
                console.log("订单支付失败", a), wx.showToast({
                    icon: "none",
                    title: a.data.message
                }), t.setData({
                    payloading: 2,
                    paycheck_orderid: e,
                    payresnotice: "支付未成功"
                });
            },
            complete: function(e) {
                t.setData({
                    openboxbuttonenable: !0
                });
            }
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    sendprize: function(e) {
        console.log("要赠送的盒子ID", e.currentTarget.dataset.id);
        var t = this;
        a.util.request({
            url: "entry/wxapp/sendprize",
            data: {
                m: a.globalData.module_name,
                prizeid: t.data.member_prize_id
            },
            method: "get",
            success: function(e) {
                console.log("送出结果", e), 0 == e.data.errno && wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: e.data.message,
                    success: function(e) {
                        e.confirm ? (console.log("用户点击确定"), t.setData({})) : e.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(e) {
                wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: e.data.message,
                    success: function(e) {
                        e.confirm || e.cancel && console.log("用户点击取消");
                    }
                });
            }
        });
    },
    onShareAppMessage: function() {
        var e = 0, a = wx.getStorageSync("memberinfo"), t = this;
        return a.id && (e = a.id), console.log("uid", e), {
            title: "送你一个" + t.data.prize.prize.complete_prize_title,
            imageUrl: t.data.prize.prize.prize_pic,
            path: "/pages/index/index?sharetype=sendprize&senduid=" + e + "&prizeid=" + t.data.member_prize_id
        };
    }
});
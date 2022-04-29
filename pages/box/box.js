var t = getApp(), a = wx.createInnerAudioContext();

wx.createInnerAudioContext();

Page({
    data: {
        elect_pay_type: 0,
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        cashier: !1,
        openthebox_title: "此盒子可能开出",
        answer: "",
        islogin: !1,
        boxid: 0
    },
    onLoad: function(a) {
        this.data.boxid = a.id, t.util.islogin() ? this.setData({
            islogin: !0
        }) : this.setData({
            islogin: !1
        }), this.setData({
            currency_name: t.globalData.currency_name
        });
    },
    getbox: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/getboxinfobyid",
            data: {
                m: t.globalData.module_name,
                id: a
            },
            method: "get",
            success: function(t) {
                t.data.data.box_open_price = parseFloat(t.data.data.box_open_price), t.data.data.money.money = parseFloat(t.data.data.money.money), 
                t.data.data.money.integral = parseFloat(t.data.data.money.integral), t.data.data.box_open_integral = parseFloat(t.data.data.box_open_integral), 
                console.log("getboxinfo", t.data), 0 == t.data.errno ? e.setData({
                    openboxinfo: t.data.data
                }) : wx.showToast({
                    icon: "none",
                    title: t.data.message
                });
            },
            fail: function(t) {
                wx.showToast({
                    icon: "none",
                    title: t.data.message
                });
            }
        });
    },
    onReady: function() {},
    showcashier: function() {
        if (!t.util.islogin()) return this.setData({
            islogin: !1
        }), void wx.navigateTo({
            url: "/pages/auth/auth"
        });
        1 == this.data.openboxinfo.box_pay_payment_wechatpay ? this.setData({
            select_pay_type: 2
        }) : 1 == this.data.openboxinfo.box_pay_payment_integral ? this.setData({
            select_pay_type: 1
        }) : 1 == this.data.openboxinfo.box_pay_payment_balance && this.setData({
            select_pay_type: 3
        }), this.setData({
            cashier: !0
        });
    },
    hidecashier: function() {
        this.setData({
            cashier: !1
        });
    },
    onShow: function() {
        t.util.islogin() ? this.setData({
            islogin: !0
        }) : this.setData({
            islogin: !1
        }), this.getbox(this.data.boxid);
    },
    onHide: function() {},
    openthebox: function(a) {
        var e = this;
        if (console.log(a), 3 == e.data.select_pay_type && e.data.openboxinfo.money.money < e.data.openboxinfo.box_open_price) wx.showToast({
            title: "余额不足请选择其他支付方式",
            icon: "none"
        }); else if (1 == e.data.select_pay_type && e.data.openboxinfo.money.integral < e.data.openboxinfo.box_open_integral) wx.showToast({
            title: e.data.currency_name + "不足请选择其他支付方式",
            icon: "none"
        }); else if (0 != e.data.openboxbuttonenable) {
            e.setData({
                prize: [],
                openboxbuttonenable: !1,
                cashier: !1
            });
            var o = a.currentTarget.dataset.id;
            t.util.request({
                url: "entry/wxapp/openthebox",
                data: {
                    m: t.globalData.module_name,
                    box_id: o,
                    paytype: e.data.select_pay_type,
                    answer: e.data.answer,
                    zhonglvtool_id: e.data.select_toolsid,
                    zhonglvtool_choiceprize: e.data.choicezhonglvprize_index
                },
                method: "get",
                success: function(a) {
                    console.log("openthebox", a.data), 0 == a.data.errno ? 2 == e.data.select_pay_type && e.data.openboxinfo.box_open_price > 0 ? wx.requestPayment({
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
                        fail: function(t) {
                            wx.showToast({
                                icon: "none",
                                title: "订单支付失败"
                            }), e.setData({
                                openboxbuttonenable: !0
                            });
                        }
                    }) : (e.setData({
                        topNum: 0
                    }), e.showprize(a), wx.getStorage({
                        key: "guide",
                        success: function(t) {
                            console.log(t.data);
                        },
                        fail: function() {
                            t.globalData.guide[6] = !1, e.setData({
                                guide: t.globalData.guide
                            });
                        }
                    })) : (e.setData({
                        openthebox_animation: "openthebox_animation_fail"
                    }), setTimeout(function() {
                        e.setData({
                            openthebox_animation: ""
                        });
                    }, 700), wx.showToast({
                        icon: "none",
                        title: a.data.message
                    }), e.setData({
                        openboxbuttonenable: !0
                    }));
                },
                fail: function(t) {
                    e.setData({
                        openthebox_animation: "openthebox_animation_fail"
                    }), e.setData({
                        openboxbuttonenable: !0
                    }), setTimeout(function() {
                        e.setData({
                            openthebox_animation: ""
                        });
                    }, 700), wx.showToast({
                        icon: "none",
                        title: t.data.message
                    });
                }
            });
        } else wx.showToast({
            icon: "none",
            title: "请不要重复操作"
        });
    },
    inputanswer: function(t) {
        this.data.answer = t.detail.value;
    },
    viewprizesimg: function(t) {
        if (console.log(t.currentTarget.dataset.pic), console.log(this.data.openboxinfo.prizes_list), 
        "" != t.currentTarget.dataset.pic) {
            var a = [];
            for (var e in this.data.openboxinfo.prizes_list) a.push(this.data.openboxinfo.prizes_list[e].prize_pic);
            wx.previewImage({
                current: t.currentTarget.dataset.pic,
                urls: a
            });
        } else wx.showToast({
            icon: "none",
            title: "盒子信息已被隐藏"
        });
    },
    viewprizesname: function(t) {
        wx.showToast({
            icon: "none",
            title: t.currentTarget.dataset.name
        });
    },
    usetools: function(t) {
        var a = this, e = t.currentTarget.dataset.id, o = t.currentTarget.dataset.type;
        console.log(t), 0 == o && a.setData({
            select_toolsid: e,
            select_toolsindex: t.currentTarget.dataset.index,
            tools_zhonglv: !0,
            zhonglvtitle: a.data.openboxinfo.memberstools[t.currentTarget.dataset.index].tools.add_winning_probability
        }), 2 == o && (1 == a.data.openboxinfo.box_show_prizeslist ? wx.showToast({
            icon: "none",
            title: "此盒子已经显示奖品列表，无需使用"
        }) : a.setData({
            select_toolsid: e,
            tools_toushi: !0
        }));
    },
    choicezhonglvprize: function(t) {
        var a = this;
        a.setData({
            choicezhonglvprize_index: t.currentTarget.dataset.index,
            zhonglvtitle: a.data.openboxinfo.memberstools[a.data.select_toolsindex].tools.add_winning_probability
        });
    },
    usetoushi: function(a) {
        var e = this, o = this.data.select_toolsid;
        t.util.request({
            url: "entry/wxapp/usetoushitool",
            data: {
                m: t.globalData.module_name,
                toolsid: o,
                type: 2,
                boxid: e.data.openboxinfo.id
            },
            method: "get",
            success: function(t) {
                console.log("透视卡使用结果", t), 0 == t.data.errno && (e.data.openboxinfo.prizes_list = t.data.data.prizes_list, 
                e.data.openboxinfo.memberstools = t.data.data.memberstools, e.setData({
                    openboxinfo: e.data.openboxinfo
                }), wx.showToast({
                    icon: "none",
                    title: t.data.message
                }));
            },
            fail: function(t) {
                console.log("透视卡使用失败", t), wx.showToast({
                    icon: "none",
                    title: t.data.message
                });
            },
            complete: function(t) {
                e.hidetoolmodal();
            }
        });
    },
    choicezhonglvsubmit: function() {
        this.setData({
            tools_zhonglv: !1
        });
    },
    tobuytool: function() {
        wx.switchTab({
            url: "/pages/shop/shop"
        });
    },
    hidetoolmodal: function() {
        this.setData({
            tools_zhonglv: !1,
            tools_toushi: !1,
            choicezhonglvprize_index: -1
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
                console.log("订单支付结果", t), 0 == t.data.errno && (e.showprize(t), e.setData({
                    payloading: 0,
                    paycheck_orderid: ""
                }));
            },
            fail: function(t) {
                console.log("订单支付失败", t), wx.showToast({
                    icon: "none",
                    title: t.data.message
                }), e.setData({
                    payloading: 2,
                    paycheck_orderid: a
                });
            },
            complete: function(t) {
                e.setData({
                    openboxbuttonenable: !0
                });
            }
        });
    },
    hidecheckpaymodal: function() {
        this.setData({
            payloading: 0,
            paycheck_orderid: ""
        });
    },
    showprize: function(e) {
        var o = this;
        o.setData({
            cashier: !1,
            openthebox_animation: "openthebox_animation"
        }), setTimeout(function() {
            o.setData({
                openthebox_animation2: "slideleft-animation",
                openthebox_animation3: "openthebox_animation2",
                openthebox_animation4: "slideright-animation"
            });
        }, 1e3), setTimeout(function() {
            a.src = "/resource/voice/5012.jpg", a.play(), a.onError(function(t) {
                console.log(t);
            });
        }, 1700), setTimeout(function() {
            a.stop();
        }, 3300), setTimeout(function() {
            o.setData({
                showprize: !0,
                showprize_animation: "a-bouncein",
                openthebox_title: "开盒结果",
                openthebox_animation3: "",
                openboxbutton: !1,
                openboxbuttonenable: !0
            }), wx.vibrateLong(), setTimeout(function() {
                wx.getStorage({
                    key: "guide",
                    success: function(t) {
                        console.log(t.data);
                    },
                    fail: function() {
                        6 == t.globalData.guide_step && (t.globalData.guide[7] = !0, o.setData({
                            guide: t.globalData.guide
                        }));
                    }
                });
            }, 2e3);
        }, 2e3), e.data.data ? o.setData({
            prize: e.data.data
        }) : o.setData({
            prize: ""
        });
    },
    hideModal: function() {
        wx.navigateBack({
            delta: 0
        });
    },
    gotowarehouse: function() {
        wx.switchTab({
            url: "/pages/warehouse/warehouse"
        });
    },
    payradioChange: function(t) {
        console.log(t), this.setData({
            select_pay_type: t.detail.value
        });
    },
    payitemclick: function(t) {
        console.log(t.currentTarget.dataset.type), this.setData({
            select_pay_type: t.currentTarget.dataset.type
        });
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
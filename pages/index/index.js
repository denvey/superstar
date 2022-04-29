var e = require("../../@babel/runtime/helpers/defineProperty"), t = getApp(), a = wx.createInnerAudioContext(), o = wx.createInnerAudioContext(), n = null, i = null;

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        indextype: 0,
        text: "demo",
        jifen: 0,
        one_sec_productivity: 0,
        one_sec_productivity2: 0,
        modalName: "",
        boxtitle: "",
        danmulist: [],
        randomnum: 0,
        boxmodal: !1,
        showlogo: !1,
        loadingcomplete: !1,
        boxcontentmodal: !1,
        boxbuymodal: !1,
        getboxesmodal: !1,
        jifenfontsize: "40rpx",
        newboxclass: "newbox-none",
        newboxlist: [],
        bar_icon: [],
        headbg: !1,
        indexparameter: [],
        box_pageno: 0,
        xiding: !1,
        boxlist: [],
        loading: !0,
        danmu: !0,
        answer: "",
        online_member_data: [],
        recommendationbox: [],
        openboxinfo: [],
        MenuButton: [],
        select_pay_type: 0,
        openboxbuttonenable: !0,
        select_box_index: -1,
        liuliangzhu_parameter: [],
        ads: [],
        scrollontop: !0,
        scroll_start: 0,
        scroll_end: 0,
        select_toolsid: 0,
        choicezhonglvprize_index: -1,
        islogin: !0,
        reciveboxmodal: !1,
        buttonanimationfirst: "",
        recivebox: [],
        recivebox_boxid: 0,
        recivebox_senduid: 0,
        reciveprizemodal: !1,
        reciveprize: [],
        reciveprize_prizeid: 0,
        reciveprize_senduid: 0,
        winning_list_index: 0,
        danmususpend: !1,
        isios: "",
        box_class: [],
        classboxlist: [],
        selected_classid: 0,
        selected_tagid: 0,
        boxbyclass_pageno: 0,
        yindao: []
    },
    onLoad: function(e) {
        var a = this, o = this;
        new Date().toLocaleDateString();
        wx.getSystemInfo({
            success: function(e) {
                a.data.StatusBar = e.statusBarHeight;
                var t = wx.getMenuButtonBoundingClientRect();
                a.data.Custom = t, a.data.CustomBar = t.bottom + t.top - e.statusBarHeight;
            }
        });
        try {
            var n = wx.getSystemInfoSync();
            o.data.isios = n.platform, console.log(n.platform);
        } catch (e) {}
        switch (o.checkUpdate(), e.sharetype) {
          case "invite":
            console.log("接受邀请", e.uid), t.globalData.invite_uid = e.uid;
            break;

          case "sendbox":
            console.log("接收分享的礼物"), console.log(e), t.util.request({
                url: "entry/wxapp/receivebox",
                data: {
                    m: t.globalData.module_name,
                    boxid: e.boxid,
                    uid: e.senduid
                },
                method: "get",
                success: function(t) {
                    console.log("receivebox", t.data), 0 == t.data.errno ? o.setData({
                        recivebox: t.data.data,
                        recivebox_boxid: e.boxid,
                        recivebox_senduid: e.senduid,
                        reciveboxmodal: !0
                    }) : wx.showModal({
                        title: "提示",
                        showCancel: !1,
                        content: t.data.message,
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
            });
            break;

          case "sendprize":
            console.log("接收分享的奖品"), console.log(e), t.util.request({
                url: "entry/wxapp/receiveprize",
                data: {
                    m: t.globalData.module_name,
                    prizeid: e.prizeid,
                    uid: e.senduid
                },
                method: "get",
                success: function(t) {
                    console.log("receiveprize", t.data), 0 == t.data.errno ? o.setData({
                        reciveprize: t.data.data,
                        reciveprize_prizeid: e.prizeid,
                        reciveprize_senduid: e.senduid,
                        reciveprizemodal: !0
                    }) : wx.showModal({
                        title: "提示",
                        showCancel: !1,
                        content: t.data.message,
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
            });
            break;

          default:
            console.log("我是默认内容");
        }
        o = this;
        var i = wx.getMenuButtonBoundingClientRect();
        o.setData({
            MenuButton: i
        }), console.log("MenuButton", o.data.MenuButton), console.log(this);
        setInterval(function() {
            o.data.jifen = parseFloat(o.data.jifen + o.data.one_sec_productivity).toFixed(3), 
            o.data.jifen = parseFloat(o.data.jifen), o.data.jifen > 999999 ? o.setData({
                jifenfontsize: "35rpx"
            }) : o.setData({
                jifenfontsize: "40rpx"
            }), o.setData({
                jifenanimation: "jifen-animation"
            }), setTimeout(function() {
                o.setData({
                    jifenanimation: ""
                });
            }, 500), o.setData({
                jifens: o.data.jifen.toLocaleString()
            });
        }, 1e3), this.getindexparameter(), t.util.islogin() || o.setData({
            islogin: !1
        });
    },
    checkUpdate: function() {
        if (wx.canIUse("getUpdateManager")) {
            var e = wx.getUpdateManager();
            e.onCheckForUpdate(function(t) {
                console.log(t.hasUpdate), t.hasUpdate && (e.onUpdateReady(function() {
                    wx.showModal({
                        title: "更新提示",
                        content: "新版本已经准备好，是否重启当前应用？",
                        success: function(t) {
                            t.confirm && e.applyUpdate();
                        }
                    });
                }), e.onUpdateFailed(function() {
                    wx.showModal({
                        title: "发现新版本",
                        content: "请删除当前小程序，重新搜索打开..."
                    });
                }));
            });
        } else wx.showModal({
            title: "更新提示",
            content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
        });
    },
    receivebox: function() {
        var e = this;
        t.util.islogin() ? t.util.request({
            url: "entry/wxapp/receivebox",
            data: {
                m: t.globalData.module_name,
                boxid: e.data.recivebox_boxid,
                uid: e.data.recivebox_senduid
            },
            method: "post",
            success: function(t) {
                console.log("接收盒子操作返回", t.data), 0 == t.data.errno ? wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.data.message,
                    success: function(t) {
                        t.confirm ? (console.log("用户点击确定"), e.setData({
                            reciveboxmodal: !1,
                            reciveprizemodal: !1
                        }), e.data.box_pageno = 0) : t.cancel && console.log("用户点击取消");
                    }
                }) : wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.data.message,
                    success: function(t) {
                        t.confirm ? (console.log("用户点击确定"), e.setData({
                            reciveboxmodal: !1,
                            reciveprizemodal: !1
                        })) : t.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(t) {
                console.log("接收盒子操作返回", t.data), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.data.message,
                    success: function(t) {
                        t.confirm ? (e.setData({
                            reciveboxmodal: !1,
                            reciveprizemodal: !1
                        }), console.log("用户点击确定")) : t.cancel && console.log("用户点击取消");
                    }
                });
            }
        }) : wx.navigateTo({
            url: "/pages/auth/auth"
        });
    },
    changeclass: function(e) {
        console.log(e), this.setData({
            selected_classid: e.currentTarget.dataset.selected_classid,
            selected_tagid: 0
        }), this.getboxesbytagid(this.data.selected_tagid, this.data.selected_classid, 0);
    },
    danmuswitch: function(e) {
        console.log(e), 1 == e.detail.value ? this.setData({
            danmu: !0
        }) : this.setData({
            danmu: !1
        });
    },
    receiveprize: function() {
        var e = this;
        t.util.islogin() ? t.util.request({
            url: "entry/wxapp/receiveprize",
            data: {
                m: t.globalData.module_name,
                prizeid: e.data.reciveprize_prizeid,
                uid: e.data.reciveprize_senduid
            },
            method: "post",
            success: function(t) {
                console.log("接收奖品操作返回", t.data), t.data.errno, wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.data.message,
                    success: function(t) {
                        t.confirm ? (console.log("用户点击确定"), e.setData({
                            reciveboxmodal: !1,
                            reciveprizemodal: !1
                        })) : t.cancel && console.log("用户点击取消");
                    }
                });
            },
            fail: function(t) {
                console.log("接收盒子操作返回", t.data), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: t.data.message,
                    success: function(t) {
                        t.confirm ? (e.setData({
                            reciveboxmodal: !1,
                            reciveprizemodal: !1
                        }), console.log("用户点击确定")) : t.cancel && console.log("用户点击取消");
                    }
                });
            }
        }) : wx.navigateTo({
            url: "/pages/auth/auth"
        });
    },
    onReady: function() {
        var e = this;
        setTimeout(function() {
            try {
                if (void 0 === e.data.indexparameter.other_parameter.chapin_index) return;
            } catch (e) {
                return;
            }
            1 == e.data.indexparameter.other_parameter.chapin_index ? (console.log("首页插屏打开"), 
            wx.createInterstitialAd && ((i = wx.createInterstitialAd({
                adUnitId: e.data.indexparameter.liuliangzhu_parameter.chapin_adid
            })).onLoad(function() {}), i.onError(function(e) {}), i.onClose(function() {})), 
            i && i.show().catch(function(e) {
                console.error(e);
            })) : console.log("首页插屏关闭");
        }, 5e3);
    },
    clickgetfreebox: function() {
        n && n.show().catch(function() {
            n.load().then(function() {
                return n.show();
            }).catch(function(e) {
                console.log("激励视频 广告显示失败");
            });
        });
    },
    getfreebox: function(e) {
        var n = this;
        n.setData({
            newboxlist: []
        }), t.util.islogin() ? (console.log("已经登陆 执行业务流程"), t.util.request({
            url: "entry/wxapp/getfreebox",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(e) {
                console.log(e), 0 == e.data.errno ? (a.src = "/resource/voice/5018.jpg", a.play(), 
                n.setData({
                    newboxlist: e.data.data.reverse(),
                    scrolltop: 0
                }), console.log("newboxlist", n.data.newboxlist), n.setData({
                    leftcard_animation: "slideleft-animation",
                    rightcard_animation: "slideright-animation"
                }), a.onEnded(function() {
                    setTimeout(function() {
                        n.setData({
                            newboxclass: "newbox-animation",
                            newboxscrollwidth: n.newboxscrollwidth(n.data.newboxlist.length)
                        });
                    }, 100), o.src = "/resource/voice/5012.jpg", o.play(), o.onError(function(e) {
                        console.log(e);
                    }), setTimeout(function() {
                        wx.vibrateLong();
                    }, 300);
                }), a.onError(function(e) {
                    console.log(e);
                })) : (n.setData({
                    leftcard_animation: "a-shake"
                }), setTimeout(function() {
                    n.setData({
                        leftcard_animation: ""
                    });
                }, 300), wx.showToast({
                    icon: "none",
                    title: "没有可以领的盒子"
                }));
            },
            fail: function(e) {
                n.setData({
                    leftcard_animation: "a-shake"
                }), setTimeout(function() {
                    n.setData({
                        leftcard_animation: ""
                    });
                }, 300), wx.showToast({
                    icon: "none",
                    title: "没有可以领的盒子"
                });
            }
        })) : wx.navigateTo({
            url: "/pages/auth/auth"
        });
    },
    getpaybox: function(e) {
        var n = this;
        n.setData({
            newboxlist: []
        }), t.util.islogin() ? (console.log("已经登陆 执行业务流程"), t.util.request({
            url: "entry/wxapp/getpaybox",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(e) {
                console.log(e), 0 == e.data.errno ? (a.src = "/resource/voice/5018.jpg", a.play(), 
                n.setData({
                    newboxlist: e.data.data.reverse()
                }), console.log("newboxlist", n.data.newboxlist), n.setData({
                    leftcard_animation: "slideleft-animation",
                    rightcard_animation: "slideright-animation"
                }), a.onEnded(function() {
                    setTimeout(function() {
                        n.setData({
                            newboxclass: "newbox-animation",
                            newboxscrollwidth: n.newboxscrollwidth(n.data.newboxlist.length),
                            scrolltop: 0
                        });
                    }, 100), o.src = "/resource/voice/5012.jpg", o.play(), setTimeout(function() {
                        wx.vibrateLong();
                    }, 300);
                }), a.onError(function(e) {
                    console.log(e);
                })) : (n.setData({
                    rightcard_animation: "shake"
                }), setTimeout(function() {
                    n.setData({
                        rightcard_animation: ""
                    });
                }, 300), wx.showToast({
                    icon: "none",
                    title: "网络超时"
                }));
            },
            fail: function(e) {
                console.log(e), n.setData({
                    rightcard_animation: "a-shake"
                }), setTimeout(function() {
                    n.setData({
                        rightcard_animation: ""
                    });
                }, 300), wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: e.data.message,
                    success: function(e) {
                        e.confirm ? console.log("用户点击确定") : e.cancel && console.log("用户点击取消");
                    }
                });
            }
        })) : wx.navigateTo({
            url: "/pages/auth/auth"
        });
    },
    scroll: function(e) {
        e.detail.scrollTop > 1 && 1 == this.data.scrollontop && (this.data.scrollontop = !1);
    },
    ontop: function(e) {
        console.log("ontop", e), this.data.scrollontop = !0;
    },
    touchstart: function(e) {
        console.log(e), this.data.scroll_start = e.changedTouches[0].pageY;
    },
    touchend: function(e) {
        console.log(e), console.log("this.data.scroll_start", this.data.scroll_start), console.log("this.data.scroll_end", e.changedTouches[0].pageY), 
        console.log("this.data.scrollontop", this.data.scrollontop), e.changedTouches[0].pageY - this.data.scroll_start > 80 && 1 == this.data.scrollontop && this.hideModal();
    },
    showbox: function(e) {
        console.log(e);
        var a = this;
        t.globalData.guide[3] = !1, wx.getStorage({
            key: "guide",
            success: function(e) {
                console.log(e.data);
            },
            fail: function() {
                wx.createSelectorQuery().select("#openboxbutton").boundingClientRect(function(e) {
                    console.log("openboxbutton", e), t.globalData.guide[6] = !0, a.setData({
                        yindao_d: e,
                        guide: t.globalData.guide
                    });
                }).exec();
            }
        }), this.setData({
            guide: t.globalData.guide,
            scrolltop: 0,
            openthebox_animation: "",
            openthebox_animation2: "",
            openthebox_animation3: "",
            openthebox_animation4: "",
            openthebox_title: "此盒子可能开出",
            showprize: !1,
            showprize_animation: "",
            select_pay_type: 1,
            answer: "",
            openboxbutton: !0,
            click_box_index: e.currentTarget.dataset.indexid,
            openboxbuttonenable: !0
        }), wx.vibrateShort({
            type: "medium",
            success: function(e) {}
        }), setTimeout(function() {
            a.setData({});
        }, 300);
        var o = e.currentTarget.dataset.id;
        this.data.select_box_index = e.currentTarget.dataset.indexid, t.util.request({
            url: "entry/wxapp/getboxinfobymembersboxid",
            data: {
                m: t.globalData.module_name,
                boxid: o,
                os: a.data.isios
            },
            method: "get",
            success: function(t) {
                if (console.log("getboxinfo", t.data), 0 == t.data.errno) {
                    if (1 == e.currentTarget.dataset.canopen) return a.setData({
                        click_box_index: -1
                    }), void wx.showToast({
                        icon: "none",
                        title: "盒子已失效，无法打开"
                    });
                    a.setData({
                        openboxinfo: t.data.data,
                        select_pay_type: 1 == t.data.data.box_pay_payment_integral ? 1 : 1 == t.data.data.box_pay_payment_wechatpay ? 2 : 3,
                        boxmodal: !0,
                        openthebox_title: 1 == t.data.data.membersbox_state ? "此盒子已被打开" : "此盒子可能开出",
                        openboxbutton: 0 == t.data.data.membersbox_state && 1 == t.data.data.state
                    });
                } else wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            },
            fail: function(e) {
                wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            }
        });
    },
    delbox: function(a) {
        console.log("要删除的盒子ID", a.currentTarget.dataset.id);
        var o = this;
        wx.showModal({
            title: "提示",
            content: "此操作不可撤回，确认要删除吗？",
            success: function(n) {
                n.confirm ? (console.log("用户点击确定"), t.util.request({
                    url: "entry/wxapp/delbox",
                    data: {
                        m: t.globalData.module_name,
                        boxid: a.currentTarget.dataset.id
                    },
                    method: "get",
                    success: function(t) {
                        console.log("删除结果", t), 0 == t.data.errno && wx.showModal({
                            title: "提示",
                            showCancel: !1,
                            content: t.data.message,
                            success: function(t) {
                                t.confirm ? (console.log("用户点击确定"), o.setData(e({}, "boxlist[" + o.data.select_box_index + "].state", 2)), 
                                o.hideModal()) : t.cancel && console.log("用户点击取消");
                            }
                        });
                    },
                    fail: function(e) {
                        wx.showToast({
                            icon: "none",
                            title: e.data.message
                        });
                    }
                })) : n.cancel && console.log("用户点击取消");
            }
        });
    },
    onShareAppMessage: function() {
        var e = wx.getStorageSync("memberinfo"), t = 0;
        console.log("uid", e.id), e.id && (t = e.id);
        var a = this;
        return console.log(0 == this.data.openboxinfo ? "自定义转发标题" : this.data.openboxinfo.box_title), 
        console.log(0 == this.data.openboxinfo ? "" : this.data.openboxinfo.box_cover), 
        console.log(0 == this.data.openboxinfo ? "/pages/index/index" : "/pages/index/index?sharetype=sendbox&senduid=" + t + "&boxid=" + this.data.openboxinfo.membersbox_id), 
        {
            title: 0 == a.data.openboxinfo ? "礼品盒子无限抽！" : a.data.openboxinfo.box_title,
            imageUrl: 0 == a.data.openboxinfo ? "" : a.data.openboxinfo.box_cover,
            path: 0 == a.data.openboxinfo ? "/pages/index/index?sharetype=invite&uid=" + t : "/pages/index/index?sharetype=sendbox&senduid=" + t + "&boxid=" + a.data.openboxinfo.membersbox_id
        };
    },
    sendbox: function(e) {
        console.log("要赠送的盒子ID", e.currentTarget.dataset.id);
        var a = this;
        t.util.request({
            url: "entry/wxapp/sendbox",
            data: {
                m: t.globalData.module_name,
                boxid: e.currentTarget.dataset.id
            },
            method: "get",
            success: function(e) {
                console.log("送出结果", e), 0 == e.data.errno && wx.showModal({
                    title: "提示",
                    showCancel: !1,
                    content: e.data.message,
                    success: function(e) {
                        e.confirm ? (console.log("用户点击确定"), a.setData({})) : e.cancel && console.log("用户点击取消");
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
    openboxcontentmodal: function(e) {
        console.log(e), this.setData({
            scrollintoviewid: "content"
        });
    },
    openboxbuymodal: function(e) {
        console.log(e), this.setData({
            boxbuymodal: !0
        });
    },
    gotowarehouse: function() {
        wx.switchTab({
            url: "/pages/warehouse/warehouse"
        }), this.hideModal();
    },
    payradioChange: function(e) {
        console.log(e), this.setData({
            select_pay_type: e.detail.value
        });
    },
    payitemclick: function(e) {
        console.log(e.currentTarget.dataset.type), this.setData({
            select_pay_type: e.currentTarget.dataset.type
        });
    },
    openthebox: function(e) {
        var a = this;
        if (console.log(e), 0 != a.data.openboxbuttonenable) {
            a.setData({
                prize: [],
                openboxbuttonenable: !1
            });
            var o = e.currentTarget.dataset.id;
            t.util.request({
                url: "entry/wxapp/openthebox",
                data: {
                    m: t.globalData.module_name,
                    membersbox_id: o,
                    paytype: a.data.select_pay_type,
                    answer: a.data.answer,
                    zhonglvtool_id: a.data.select_toolsid,
                    zhonglvtool_choiceprize: a.data.choicezhonglvprize_index
                },
                method: "get",
                success: function(e) {
                    console.log("openthebox", e.data), 0 == e.data.errno ? 2 == a.data.select_pay_type && a.data.openboxinfo.box_open_price > 0 ? wx.requestPayment({
                        timeStamp: e.data.data.timeStamp,
                        nonceStr: e.data.data.nonceStr,
                        package: e.data.data.package,
                        signType: "MD5",
                        paySign: e.data.data.paySign,
                        success: function(t) {
                            console.log("支付成功！"), a.setData({
                                payloading: 1
                            }), setTimeout(function() {
                                a.checkpayresult(e.data.data.local_order_data.order_id);
                            }, 3e3);
                        },
                        fail: function(e) {
                            wx.showToast({
                                icon: "none",
                                title: "订单支付失败"
                            }), a.setData({
                                openboxbuttonenable: !0
                            });
                        }
                    }) : (a.setData({
                        topNum: 0
                    }), a.showprize(e), wx.getStorage({
                        key: "guide",
                        success: function(e) {
                            console.log(e.data);
                        },
                        fail: function() {
                            t.globalData.guide[6] = !1, a.setData({
                                guide: t.globalData.guide
                            });
                        }
                    })) : (a.setData({
                        openthebox_animation: "openthebox_animation_fail"
                    }), setTimeout(function() {
                        a.setData({
                            openthebox_animation: ""
                        });
                    }, 700), wx.showToast({
                        icon: "none",
                        title: e.data.message
                    }), a.setData({
                        openboxbuttonenable: !0
                    }));
                },
                fail: function(e) {
                    a.setData({
                        openthebox_animation: "openthebox_animation_fail"
                    }), a.setData({
                        openboxbuttonenable: !0
                    }), setTimeout(function() {
                        a.setData({
                            openthebox_animation: ""
                        });
                    }, 700), wx.showToast({
                        icon: "none",
                        title: e.data.message
                    });
                }
            });
        } else wx.showToast({
            icon: "none",
            title: "请不要重复操作"
        });
    },
    showprize: function(o) {
        var n = this;
        n.setData({
            openthebox_animation: "openthebox_animation"
        }), setTimeout(function() {
            n.setData({
                openthebox_animation2: "slideleft-animation",
                openthebox_animation3: "openthebox_animation2",
                openthebox_animation4: "slideright-animation"
            });
        }, 1e3), setTimeout(function() {
            a.src = "/resource/voice/5012.jpg", a.play(), a.onError(function(e) {
                console.log(e);
            });
        }, 1700), setTimeout(function() {
            a.stop();
        }, 3300), setTimeout(function() {
            n.setData({
                showprize: !0,
                showprize_animation: "a-bouncein",
                openthebox_title: "开盒结果",
                openthebox_animation3: "",
                openboxbutton: !1,
                openboxbuttonenable: !0
            }), wx.vibrateLong(), setTimeout(function() {
                wx.getStorage({
                    key: "guide",
                    success: function(e) {
                        console.log(e.data);
                    },
                    fail: function() {
                        6 == t.globalData.guide_step && (t.globalData.guide[7] = !0, n.setData({
                            guide: t.globalData.guide
                        }));
                    }
                });
            }, 2e3);
        }, 2e3), o.data.data ? n.setData({
            prize: o.data.data
        }) : n.setData({
            prize: ""
        }), console.log("根据下标修改", n.data.select_box_index), n.setData(e({}, "boxlist[" + n.data.select_box_index + "].state", 1));
    },
    onPullDownRefresh: function(e) {
        console.log("下拉刷新"), this.getindexparameter();
    },
    hideboxcontentModal: function() {
        this.setData({
            boxcontentmodal: !1
        });
    },
    newboxviewclose: function() {
        this.setData({
            leftcard_animation: "slideleft-back-animation",
            rightcard_animation: "slideright-back-animation",
            newboxclass: "newbox-none"
        }), this.getboxparameter();
    },
    hideboxbuymodal: function() {
        this.setData({
            boxbuymodal: !1
        });
    },
    hideModal: function() {
        var e = this;
        this.setData({
            boxmodal: !1,
            select_box_index: e.data.select_box_index,
            click_box_index: -1,
            select_toolsid: 0,
            choicezhonglvprize_index: -1,
            openboxinfo: []
        }), setTimeout(function() {
            e.setData({
                select_box_index: -1
            });
        }, 300);
    },
    hidegetboxesmodal: function() {
        this.setData({
            getboxesmodal: !1
        });
    },
    onShow: function() {
        var e = this;
        wx.getStorage({
            key: "guide",
            success: function(e) {
                console.log(e.data);
            },
            fail: function() {
                5 == t.globalData.guide_step && wx.createSelectorQuery().select("#buyboxbutton").boundingClientRect(function(a) {
                    console.log(a), t.globalData.guide[2] = !0, e.setData({
                        yindao_b: a,
                        guide: t.globalData.guide
                    });
                }).exec();
            }
        }), this.data.danmususpend = !1, t.util.islogin() && (e.setData({
            islogin: !0
        }), wx.getStorage({
            key: "guide",
            success: function(e) {
                console.log(e.data);
            },
            fail: function() {
                0 == t.globalData.guide_step && wx.createSelectorQuery().select("#lingqubutton").boundingClientRect(function(a) {
                    console.log(a), t.globalData.guide[0] = !0, e.setData({
                        yindao_a: a,
                        guide: t.globalData.guide
                    });
                }).exec();
            }
        })), this.setData({
            animation: "animation"
        }), e.data.boxlist.length;
    },
    onHide: function() {
        console.log("暂停弹幕"), this.data.danmususpend = !0;
    },
    onUnload: function() {},
    getpoints: function() {
        var e = this;
        t.globalData.guide[1] = !1, this.setData({
            getpoints_animation: "button-animation",
            guide: t.globalData.guide
        }), setTimeout(function() {
            e.setData({
                getpoints_animation: ""
            });
        }, 500), wx.switchTab({
            url: "/pages/mystar/mystar"
        });
    },
    newboxscrollwidth: function(e) {
        return console.log("新盒子个数", e), 1 == e ? "230rpx" : 2 == e ? "470rpx" : "100%";
    },
    getboxes: function() {
        if (wx.createSelectorQuery().select("#boxlist").boundingClientRect(function(a) {
            console.log("boxlist", a), t.globalData.guide[2] = !1, t.globalData.guide[3] = !0, 
            e.setData({
                yindao_c: a,
                guide: t.globalData.guide
            }), t.globalData.guide_step = 6;
        }).exec(), t.util.islogin()) {
            var e = this;
            e.setData({
                getboxparameter: []
            }), e.setData({
                getboxes_animation: "button-animation",
                leftcard_animation: "",
                rightcard_animation: "",
                newboxclass: "newbox-none"
            }), setTimeout(function() {
                e.setData({
                    getboxes_animation: ""
                });
            }, 500), e.getboxparameter();
        } else wx.navigateTo({
            url: "/pages/auth/auth"
        });
    },
    getboxparameter: function() {
        var e = this;
        t.util.request({
            url: "entry/wxapp/getboxparameter",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(t) {
                console.log(t.data), 0 == t.data.errno ? e.setData({
                    getboxesmodal: !0,
                    getboxparameter: t.data.data
                }) : wx.showToast({
                    icon: "none",
                    title: t.data.message
                });
            },
            fail: function(e) {
                wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            }
        });
    },
    guidenext: function(e) {
        console.log(e);
        0 == e.target.dataset.step && ("yes" == e.target.dataset.do ? (t.globalData.guide[1] = !0, 
        t.globalData.guide_step = 1) : wx.setStorage({
            key: "guide",
            data: "1"
        }), t.globalData.guide[0] = !1, this.setData({
            guide: t.globalData.guide
        })), 6 == e.target.dataset.step && (t.globalData.guide_step = 7, t.globalData.guide[7] = !1, 
        this.setData({
            guide: t.globalData.guide
        }), wx.setStorage({
            key: "guide",
            data: "1"
        }));
    },
    getindexmemberinfo: function() {
        var e = this;
        t.util.islogin() ? t.util.request({
            url: "entry/wxapp/getindexmemberinfo",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(t) {
                console.log("getindexmemberinfo", t.data), 0 == t.data.errno ? e.setData({
                    indexmemberinfo: t.data.data,
                    one_sec_productivity: t.data.data.calculate_available_integral.one_sec_productivity,
                    one_sec_productivity2: (60 * t.data.data.calculate_available_integral.one_sec_productivity).toFixed(3),
                    jifen: t.data.data.calculate_available_integral.final_integral,
                    online_member_data: t.data.data.online_member_data,
                    online_member_data_integral: parseFloat(t.data.data.online_member_data.integral).toLocaleString()
                }) : (console.log("???", t.data.errno), wx.showToast({
                    icon: "none",
                    title: t.data.message
                }));
            },
            fail: function(e) {
                console.log("???x", e), 8888 == e.data.errno ? (console.log("8888", e.data), wx.showToast({
                    icon: "none",
                    title: "登录态过期，请重新登录"
                }), wx.clearStorage({
                    success: function(e) {}
                })) : wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        }) : console.log("没有登陆终止流程1");
    },
    getindexparameter: function() {
        var e = this;
        e.selectComponent("#loading").show(), t.util.request({
            url: "entry/wxapp/getindexparameter",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(a) {
                if (console.log("getindexparameter", a.data), 0 == a.data.errno) {
                    e.setData({
                        indexparameter: a.data.data,
                        box_class: a.data.data.box_class,
                        liuliangzhu_parameter: a.data.data.liuliangzhu_parameter,
                        bar_icon: a.data.data.other_parameter.bar_icon,
                        box_tags: a.data.data.box_tags,
                        ads: a.data.data.ad
                    }), "1" == a.data.data.other_parameter.star_enable && (t.globalData.star_enable = !0), 
                    t.globalData.bar_icon = a.data.data.other_parameter.bar_icon, t.globalData.currency_name = a.data.data.other_parameter.currency_name, 
                    e.selectComponent("#bar").fuckyou();
                    var o = 0;
                    e.data.selected_classid = a.data.data.box_class[0].box_class_id, e.getboxesbytagid(0, 0, 0), 
                    setInterval(function() {
                        1 != e.data.danmususpend && ((o = Math.floor(4 * Math.random())) == e.data.randomnum || (e.data.danmulist.length >= a.data.data.winning_list.length - 1 ? (e.data.winning_list_index = -1, 
                        setTimeout(function() {
                            e.data.danmulist = [], e.data.winning_list_index = 0;
                        }, 2800)) : -1 !== e.data.winning_list_index && (e.data.winning_list_index = e.data.winning_list_index + 1, 
                        e.data.danmulist.push([ a.data.data.winning_list[e.data.winning_list_index], o ]), 
                        e.setData({
                            danmulist: e.data.danmulist
                        })), e.data.randomnum = o));
                    }, 1500), "" !== a.data.data.liuliangzhu_parameter.jili_adid && 1 == a.data.data.other_parameter.free_box_jiliad_enable && wx.createRewardedVideoAd && ((n = wx.createRewardedVideoAd({
                        adUnitId: a.data.data.liuliangzhu_parameter.jili_adid
                    })).onLoad(function() {}), n.onError(function(e) {}), n.onClose(function(t) {
                        console.log(t), t.isEnded ? e.getfreebox() : wx.showToast({
                            icon: "none",
                            title: "完整看完视频才能领取哦"
                        });
                    }));
                } else console.log("???", a.data.errno), wx.showToast({
                    icon: "none",
                    title: a.data.message
                });
            },
            fail: function(e) {
                console.log("???x", e), "request:fail url not in domain list" == e.errMsg ? wx.showModal({
                    cancelColor: "cancelColor",
                    title: '小程序服务器域名未配置，请到"mp.weixin.qq.com"菜单[开发管理->开发设置->服务器域名]中设置request合法域名'
                }) : wx.showModal({
                    cancelColor: "cancelColor",
                    title: e.errMsg
                }), wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            },
            complete: function() {
                wx.stopPullDownRefresh(), e.selectComponent("#bar").fuckyou(), e.setData({
                    loadingcomplete: !0
                }), e.selectComponent("#loading").hide();
            }
        });
    },
    onReachBottom: function() {
        this.getboxesbytagid(this.data.selected_tagid, this.data.selected_classid, this.data.boxbyclass_pageno);
    },
    jumpminiapp: function(e) {
        console.log(e.currentTarget.dataset), "" != e.currentTarget.dataset.appid ? wx.navigateToMiniProgram({
            appId: e.currentTarget.dataset.appid,
            path: e.currentTarget.dataset.path,
            success: function(e) {}
        }) : wx.showToast({
            icon: "none",
            title: "参数错误,appid为空"
        });
    },
    jumpurl: function(e) {
        console.log(e), "" != e.currentTarget.dataset.url ? wx.navigateTo({
            url: "/pages/webview/webview?url=" + e.currentTarget.dataset.url
        }) : wx.showToast({
            icon: "none",
            title: "参数错误,url为空"
        });
    },
    changetags: function(e) {
        console.log(e.currentTarget.dataset.classid), this.data.boxbyclass_pageno = 0, this.setData({
            selected_tagid: e.currentTarget.dataset.tagid
        }), this.getboxesbytagid(e.currentTarget.dataset.tagid, this.data.selected_classid, 0);
        var a = wx.createSelectorQuery().in(this);
        a.selectViewport().scrollOffset(), a.select("#boxlist").boundingClientRect(), a.exec(function(e) {
            console.log(e);
            var a = e[0].scrollTop + e[1].top - t.globalData.CustomBar;
            wx.pageScrollTo({
                scrollTop: a,
                duration: 500
            });
        });
    },
    getboxesbytagid: function(e, a, o) {
        var n = this;
        0 == o && (n.data.boxbyclass_pageno = 0), n.selectComponent("#loading").show(), 
        t.util.request({
            url: "entry/wxapp/gettagbox",
            data: {
                m: t.globalData.module_name,
                page: o,
                tagid: e,
                classid: a
            },
            method: "get",
            success: function(e) {
                console.log("getboxesbytagid", e.data), 0 == e.data.errno ? (0 == e.data.data.classbox.length && 0 == o ? (wx.showToast({
                    icon: "none",
                    title: "没有更多了"
                }), n.setData({
                    classboxlist: e.data.data.classbox
                })) : n.setData({
                    classboxlist: o > 0 ? n.data.classboxlist.concat(e.data.data.classbox) : e.data.data.classbox,
                    boxbyclass_pageno: n.data.boxbyclass_pageno + 1
                }), console.log("t.data.recommendationbox.length", n.data.recommendationbox.length), 
                n.setData({
                    recommendationbox: e.data.data.recommendation
                })) : wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            },
            fail: function(e) {
                console.log("fail", e), "request:fail url not in domain list" == e.errMsg ? wx.showModal({
                    cancelColor: "cancelColor",
                    title: '小程序服务器域名未配置，请到"mp.weixin.qq.com"菜单[开发管理->开发设置->服务器域名]中设置request合法域名'
                }) : wx.showModal({
                    cancelColor: "cancelColor",
                    title: e.errMsg
                }), wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            },
            complete: function() {
                wx.stopPullDownRefresh(), n.selectComponent("#loading").hide(), n.setData({
                    loading: !1
                });
            }
        });
    },
    getmemberboxes: function(e) {
        var a = this;
        0 == e && (a.data.box_pageno = 0), t.util.request({
            url: "entry/wxapp/getmemberboxes",
            data: {
                m: t.globalData.module_name,
                page: e
            },
            method: "get",
            success: function(t) {
                console.log("getmemberboxes", t.data), 0 == t.data.errno ? 0 == t.data.data.length && 0 == e ? (wx.showToast({
                    icon: "none",
                    title: "没有更多了"
                }), a.setData({
                    boxlist: t.data.data
                })) : a.setData({
                    boxlist: e > 0 ? a.data.boxlist.concat(t.data.data) : t.data.data,
                    box_pageno: a.data.box_pageno + 1
                }) : wx.showToast({
                    icon: "none",
                    title: t.data.message
                });
            },
            fail: function(e) {
                "request:fail url not in domain list" == e.errMsg ? wx.showModal({
                    cancelColor: "cancelColor",
                    title: '小程序服务器域名未配置，请到"mp.weixin.qq.com"菜单[开发管理->开发设置->服务器域名]中设置request合法域名'
                }) : wx.showModal({
                    cancelColor: "cancelColor",
                    title: e.errMsg
                }), wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            },
            complete: function() {
                wx.stopPullDownRefresh();
            }
        });
    },
    getboxinfo: function(e) {
        var a = this;
        t.util.request({
            url: "entry/wxapp/getboxinfobyid",
            data: {
                m: t.globalData.module_name,
                boxid: e
            },
            method: "get",
            success: function(e) {
                console.log("getboxinfo", e.data), 0 == e.data.errno ? a.setData({
                    openboxinfo: e.data.data
                }) : wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            },
            fail: function(e) {
                "request:fail url not in domain list" == e.errMsg ? wx.showModal({
                    cancelColor: "cancelColor",
                    title: '小程序服务器域名未配置，请到"mp.weixin.qq.com"菜单[开发管理->开发设置->服务器域名]中设置request合法域名'
                }) : wx.showModal({
                    cancelColor: "cancelColor",
                    title: e.errMsg
                }), wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            }
        });
    },
    tapmore: function() {
        this.data.recommendationbox.length < 4 && wx.showToast({
            title: "没有更多了",
            icon: "none"
        }), this.setData({
            scrollleft: 248
        });
    },
    imageLoad: function() {
        console.log("imageLoad"), this.setData({
            showlogo: !0
        });
    },
    onShareTimeline: function() {
        var e = wx.getStorageSync("memberinfo"), t = 0;
        console.log("uid", e.id), e.id && (t = e.id);
        var a = this;
        return console.log(0 == this.data.openboxinfo ? "自定义转发标题" : this.data.openboxinfo.box_title), 
        console.log(0 == this.data.openboxinfo ? "" : this.data.openboxinfo.box_cover), 
        console.log(0 == this.data.openboxinfo ? "/pages/index/index" : "/pages/index/index?sharetype=sendbox&senduid=" + t + "&boxid=" + this.data.openboxinfo.membersbox_id), 
        {
            title: 0 == a.data.openboxinfo ? "礼品盒子无限抽！" : a.data.openboxinfo.box_title,
            imageUrl: 0 == a.data.openboxinfo ? "" : a.data.openboxinfo.box_cover,
            query: 0 == a.data.openboxinfo ? "" : "sharetype=sendbox&senduid=" + t + "&boxid=" + a.data.openboxinfo.membersbox_id
        };
    },
    onPageScroll: function(e) {
        var t = this;
        e.scrollTop > 250 ? 0 == this.data.headbg && this.setData({
            headbg: !0
        }) : 1 == this.data.headbg && this.setData({
            headbg: !1
        }), e.scrollTop > 300 ? this.data.scrolltopenable || this.setData({
            scrolltopenable: !0
        }) : this.data.scrolltopenable && this.setData({
            scrolltopenable: !1
        }), wx.createSelectorQuery().in(this).select("#tagbar").boundingClientRect(function(e) {
            e.top <= t.data.CustomBar ? 0 == t.data.xiding && t.setData({
                xiding: !0
            }) : 1 == t.data.xiding && t.setData({
                xiding: !1
            });
        }).exec();
    }
});
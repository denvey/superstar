var a = getApp(), t = null;

Page({
    data: {
        StatusBar: a.globalData.StatusBar,
        CustomBar: a.globalData.CustomBar,
        jifen: 0,
        starparameter: [],
        one_sec_productivity: 0,
        one_sec_productivity2: 0,
        available_integral: 0,
        successmodalenable: !1,
        islogin: !0,
        isgzhtask: 0,
        isminiapptask: 0,
        miniapp_runtime: 0,
        intervalID: 0,
        liuliangzhu_parameter: [],
        selecttask: [],
        ads: [],
        pg: 0,
        questionmodal: !1,
        answer: "",
        inviterlist: [],
        show_jili_type: 0
    },
    onLoad: function(t) {
        var e = 0, n = this;
        this.setData({
            currency_name: a.globalData.currency_name
        }), setInterval(function() {
            (e = Math.floor(4 * Math.random())) == n.data.randomnum || (n.data.randomnum = e), 
            n.data.available_integral = parseFloat(n.data.available_integral + n.data.one_sec_productivity).toFixed(3), 
            n.data.available_integral = parseFloat(n.data.available_integral), n.setData({
                jifenanimation: "jifen-animation"
            }), setTimeout(function() {
                n.setData({
                    jifenanimation: ""
                });
            }, 500), n.setData({
                available_integral2: n.data.available_integral.toLocaleString()
            });
        }, 1e3);
    },
    onReady: function() {
        var t = this;
        wx.getStorage({
            key: "guide",
            success: function(a) {
                console.log(a.data);
            },
            fail: function() {
                wx.createSelectorQuery().select("#wjbutton").boundingClientRect(function(a) {
                    console.log("wjbutton", a), t.setData({
                        yindao_d: a
                    });
                }).exec(), a.globalData.guide[4] = !0, t.setData({
                    guide: a.globalData.guide
                });
            }
        });
    },
    dotask: function(a) {
        var e = this;
        switch (e.data.selecttask = [], console.log(e.data.tasklist[a.currentTarget.dataset.index]), 
        e.setData({
            selecttask: e.data.tasklist[a.currentTarget.dataset.index]
        }), e.data.selecttask.task_type) {
          case "1":
            console.log("????????????"), e.up_taskinfo(e.data.selecttask.id, "");
            break;

          case "2":
            console.log("????????????"), e.up_taskinfo(e.data.selecttask.id, "");
            break;

          case "3":
            console.log("???????????????"), wx.navigateTo({
                url: "/pages/webview/webview?url=" + e.data.selecttask.gzh_qrurl
            }), e.data.isgzhtask = e.data.selecttask.id;
            break;

          case "4":
            console.log("???????????????"), wx.navigateToMiniProgram({
                appId: e.data.selecttask.miniapp_appid,
                path: e.data.selecttask.miniapp_path,
                success: function(a) {
                    e.data.isminiapptask = e.data.selecttask.id, e.data.intervalID = setInterval(function() {
                        e.data.miniapp_runtime = e.data.miniapp_runtime + 1, e.data.miniapp_min_runtime = parseInt(e.data.selecttask.miniapp_runtime), 
                        console.log("?????????????????????", e.data.miniapp_runtime);
                    }, 1e3);
                },
                fail: function(a) {
                    console.log(a), wx.showModal({
                        title: "??????",
                        showCancel: !1,
                        content: a.errMsg,
                        success: function(a) {
                            a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                        }
                    });
                }
            });
            break;

          case "5":
            e.data.show_jili_type = 1, t && t.show().catch(function() {
                t.load().then(function() {
                    return t.show();
                }).catch(function(a) {
                    console.log("???????????? ??????????????????", a);
                });
            }), console.log("??????????????????");
            break;

          case "6":
            e.setData({
                answer: "",
                questionmodal: !0
            }), console.log("????????????");
        }
    },
    up_taskinfo: function(t, e) {
        var n = this;
        console.log("????????????taskid" + t), a.util.request({
            url: "entry/wxapp/uptaskinfo",
            data: {
                m: a.globalData.module_name,
                id: t,
                answer: e
            },
            method: "post",
            success: function(a) {
                console.log("uptaskinfo", a.data), 0 == a.data.errno ? (wx.showModal({
                    title: "??????",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                }), n.setData({
                    questionmodal: !1,
                    answer: ""
                })) : wx.showModal({
                    title: "??????",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                }), n.getindexparameter();
            },
            fail: function(a) {
                wx.showModal({
                    title: "??????",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                });
            }
        });
    },
    taskcardtap: function(a) {
        var t = this;
        console.log(a.currentTarget.dataset.id), this.setData({
            clicktaskid: a.currentTarget.dataset.id
        }), setTimeout(function() {
            t.setData({
                clicktaskid: ""
            });
        }, 500);
    },
    onShow: function() {
        var t = this;
        if (a.util.islogin()) {
            if (this.setData({
                islogin: !0
            }), t.getinviterlist(0), 0 !== t.data.isgzhtask && (t.up_taskinfo(t.data.isgzhtask, ""), 
            t.data.isgzhtask = 0), 0 !== t.data.isminiapptask) {
                if (clearInterval(t.data.intervalID), t.data.miniapp_runtime < t.data.miniapp_min_runtime) return wx.showModal({
                    title: "??????",
                    showCancel: !1,
                    content: "??????????????????" + t.data.miniapp_min_runtime + "????????????????????????",
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                }), t.data.isminiapptask = 0, t.data.miniapp_runtime = 0, void (t.data.miniapp_min_runtime = 0);
                t.up_taskinfo(t.data.isminiapptask, ""), t.data.isminiapptask = 0, t.data.miniapp_runtime = 0, 
                t.data.miniapp_min_runtime = 0;
            }
            this.getindexparameter();
        } else this.setData({
            islogin: !1
        });
    },
    onHide: function() {
        a.globalData.guide[5] = !1, a.globalData.guide_step < 5 && (a.globalData.guide_step = 5), 
        this.setData({
            guide: a.globalData.guide
        }), console.log("?????????onhide");
    },
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {
        this.data.pg = this.data.pg + 1, console.log("??????????????????" + this.data.pg), this.getinviterlist(this.data.pg);
    },
    onShareAppMessage: function() {
        var a = 0, t = wx.getStorageSync("memberinfo");
        return t.id && (a = t.id), console.log("uid", a), {
            title: "???????????????????????????",
            imageUrl: "",
            path: "/pages/index/index?sharetype=invite&uid=" + a
        };
    },
    clickgetintegral: function() {
        this.data.show_jili_type = 0, console.log("??????????????????"), t && t.show().catch(function() {
            t.load().then(function() {
                return t.show();
            }).catch(function(a) {
                console.log("???????????? ??????????????????");
            });
        });
    },
    getintegral: function(t) {
        var e = this;
        a.globalData.guide[4] = !1, a.globalData.guide[5] = !0, e.setData({
            guide: a.globalData.guide
        }), a.util.islogin() ? (console.log("???????????? ??????????????????"), a.util.request({
            url: "entry/wxapp/getintegral",
            data: {
                m: a.globalData.module_name
            },
            method: "get",
            success: function(a) {
                console.log("getintegral", a.data), 0 == a.data.errno ? (wx.showModal({
                    title: "????????????",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                }), e.getindexparameter()) : wx.showModal({
                    title: "??????",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                });
            },
            fail: function(a) {
                wx.showToast({
                    icon: "none",
                    title: a.data.message
                });
            }
        })) : (console.log("????????????"), wx.navigateTo({
            url: "/pages/auth/auth"
        }));
    },
    hidemodal: function() {
        this.setData({
            questionmodal: !1
        });
    },
    steal: function(t) {
        console.log(t);
        var e = this;
        a.util.request({
            url: "entry/wxapp/steal",
            data: {
                m: a.globalData.module_name,
                uid: t.currentTarget.dataset.uid
            },
            method: "get",
            success: function(a) {
                console.log("steal", a.data), 0 == a.data.errno && (wx.showModal({
                    title: "??????",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                }), e.getindexparameter());
            },
            fail: function(a) {
                wx.showModal({
                    title: "??????",
                    showCancel: !1,
                    content: a.data.message,
                    success: function(a) {
                        a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                    }
                });
            }
        });
    },
    inputanswer: function(a) {
        console.log(a.detail.value), this.data.answer = a.detail.value;
    },
    doanswertask: function() {
        this.up_taskinfo(this.data.selecttask.id, this.data.answer);
    },
    showsuccessmodal: function(a, t, e) {
        a ? this.setData({
            successmodalenable: !0,
            successmodal: {
                title: t,
                content: e
            }
        }) : this.setData({
            successmodalenable: !1
        });
    },
    getinviterlist: function(t) {
        var e = this;
        a.util.request({
            url: "entry/wxapp/getinviterlist",
            data: {
                m: a.globalData.module_name,
                page: e.data.pg
            },
            method: "get",
            success: function(a) {
                console.log("getinviterlist", a.data), 0 == a.data.errno && (e.data.pg > 0 ? e.data.inviterlist = e.data.inviterlist.concat(a.data.data) : e.data.inviterlist = a.data.data, 
                e.setData({
                    inviterlist: e.data.inviterlist
                }), e.data.inviterlist.length > 0 && wx.getStorage({
                    key: "guide",
                    success: function(a) {
                        wx.getStorage({
                            key: "juming_notice",
                            success: function(a) {},
                            fail: function() {
                                wx.setStorage({
                                    key: "juming_notice",
                                    data: "1"
                                }), e.setData({
                                    juming_notice: !0
                                });
                            }
                        });
                    },
                    fail: function() {}
                }));
            },
            fail: function(a) {}
        });
    },
    closenotice: function() {
        this.setData({
            juming_notice: !1
        });
    },
    getindexparameter: function() {
        var e = this;
        a.util.request({
            url: "entry/wxapp/getstarparameter",
            data: {
                m: a.globalData.module_name
            },
            method: "get",
            success: function(a) {
                console.log("getstarparameter", a.data), 0 == a.data.errno ? (e.setData({
                    starparameter: a.data.data,
                    one_sec_productivity: a.data.data.calculate_available_integral.one_sec_productivity,
                    one_sec_productivity2: (60 * a.data.data.calculate_available_integral.one_sec_productivity).toFixed(3),
                    available_integral: a.data.data.calculate_available_integral.final_integral,
                    onepeople_productivity: 86400 * a.data.data.calculate_available_integral.onepeople_second_integral,
                    tasklist: a.data.data.tasklist,
                    liuliangzhu_parameter: a.data.data.liuliangzhu_parameter,
                    ads: a.data.data.ad
                }), 1 != a.data.data.task_jili_enable && 1 != a.data.data.jiliad_enable || t || wx.createRewardedVideoAd && ((t = wx.createRewardedVideoAd({
                    adUnitId: e.data.liuliangzhu_parameter.jili_adid
                })).onLoad(function() {}), t.onError(function(a) {}), t.onClose(function(a) {
                    console.log(a), a.isEnded ? 0 == e.data.show_jili_type ? e.getintegral() : 1 == e.data.show_jili_type && e.up_taskinfo(e.data.selecttask.id, "") : wx.showModal({
                        title: "??????",
                        showCancel: !1,
                        content: "?????????????????????????????????",
                        success: function(a) {
                            a.confirm ? console.log("??????????????????") : a.cancel && console.log("??????????????????");
                        }
                    });
                }))) : wx.showToast({
                    icon: "none",
                    title: "??????????????????"
                });
            },
            fail: function(a) {
                wx.showToast({
                    icon: "none",
                    title: "??????????????????"
                });
            }
        });
    }
});
var t = getApp();

Page({
    data: {
        activeTab: 0,
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        TabCur: 0,
        loading: !1,
        upperthreshold: !1,
        scrollLeft: 0,
        prize_pg: 0,
        prize_list: [],
        tools_list: [],
        tool_pg: 0,
        islogin: !0,
        fahuosuccessmodal: !1,
        resulttitle: ""
    },
    onLoad: function(t) {
        var a = this;
        wx.getSystemInfo({
            success: function(t) {
                a.data.StatusBar = t.statusBarHeight;
                var e = wx.getMenuButtonBoundingClientRect();
                a.data.Custom = e, a.data.CustomBar = e.bottom + e.top - t.statusBarHeight;
            }
        });
    },
    getmembersprize: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/getmemberprizes",
            data: {
                m: t.globalData.module_name,
                page: a
            },
            method: "get",
            success: function(t) {
                console.log("getmemberprizes", t.data), 0 == t.data.errno ? (0 == t.data.data.length && 0 == a ? (wx.showToast({
                    icon: "none",
                    title: "没有更多了"
                }), e.setData({
                    prize_list: t.data.data
                })) : e.setData({
                    prize_list: a > 0 ? e.data.prize_list.concat(t.data.data) : t.data.data,
                    prize_pg: a + 1
                }), console.log(e.data.prize_list)) : wx.showToast({
                    icon: "none",
                    title: "获取参数失败"
                });
            },
            fail: function(t) {
                wx.showToast({
                    icon: "none",
                    title: "获取参数失败"
                });
            },
            complete: function() {
                e.setData({
                    loading: !1
                });
            }
        });
    },
    getmemberstools: function(a) {
        var e = this;
        t.util.request({
            url: "entry/wxapp/getmembertools",
            data: {
                m: t.globalData.module_name,
                page: a
            },
            method: "get",
            success: function(t) {
                console.log("getmembertools", t.data), 0 == t.data.errno ? (0 == t.data.data.length ? wx.showToast({
                    icon: "none",
                    title: "没有更多了"
                }) : e.setData({
                    tools_list: a > 0 ? e.data.tools_list.concat(t.data.data) : t.data.data,
                    tool_pg: a + 1
                }), console.log(e.data.tools_list)) : wx.showToast({
                    icon: "none",
                    title: "获取参数失败"
                });
            },
            fail: function(t) {
                wx.showToast({
                    icon: "none",
                    title: "获取参数失败"
                });
            },
            complete: function() {
                e.setData({
                    loading: !1
                });
            }
        });
    },
    tabSelect: function(t) {
        console.log(t), this.setData({
            TabCur: t.currentTarget.dataset.id,
            scrollLeft: 60 * (t.currentTarget.dataset.id - 1)
        });
    },
    pageChange: function(t) {
        console.log("PageChange:", t.detail.current), this.setData({
            activeTab: t.detail.current
        });
    },
    clickchange: function(t) {
        console.log("PageChange:", t.target.dataset.tab), this.setData({
            activeTab: t.target.dataset.tab
        }), 2 == t.target.dataset.tab && 0 == this.data.tool_pg && this.getmemberstools(0);
    },
    fahuo: function(t) {
        console.log(t);
        wx.navigateTo({
            url: "/pages/warehouse/applyfordelivery?id=" + t.currentTarget.dataset.id
        });
    },
    onRefresh: function() {
        console.log("刷新");
        this.data.prize_pg = 0, this.getmembersprize(this.data.prize_pg);
    },
    toolonRefresh: function() {
        console.log("刷新");
        this.data.prize_pg = 0, this.getmemberstools(this.data.prize_pg);
    },
    onReady: function() {},
    PageChange: function(t) {},
    onShow: function() {
        t.util.islogin() ? (this.setData({
            islogin: !0
        }), 1 != this.data.upperthreshold && 0 != this.data.prize_pg || (this.getmembersprize(0), 
        this.data.upperthreshold = !1)) : this.setData({
            islogin: !1
        });
    },
    scrolltoupper: function() {
        console.log("scrolltoupper"), this.data.upperthreshold = !0;
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    hidefahuosuccessmodal: function() {
        this.setData({
            fahuosuccessmodal: !1
        });
    },
    loadmore: function() {
        this.getmembersprize(this.data.prize_pg), console.log("上拉触底？", this.data.prize_pg);
    },
    onShareAppMessage: function() {}
});
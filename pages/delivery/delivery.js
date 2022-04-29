var t = getApp();

Page({
    data: {
        StatusBar: t.globalData.StatusBar,
        CustomBar: t.globalData.CustomBar,
        page_title: "",
        delivery: []
    },
    onLoad: function(t) {
        var a = this;
        "under_review" == t.state && a.setData({
            page_title: "待审核"
        }), "waiting_for_delivery" == t.state && a.setData({
            page_title: "待发货"
        }), "completed_delivery" == t.state && a.setData({
            page_title: "已审核"
        }), "waiting_for_receive" == t.state && a.setData({
            page_title: "待收货"
        }), "completed" == t.state && a.setData({
            page_title: "已完成"
        });
    },
    getlist: function() {
        var a = this;
        t.util.islogin() ? (console.log("已经登陆 执行业务流程"), t.util.request({
            url: "entry/wxapp/getdelivery",
            data: {
                m: t.globalData.module_name
            },
            method: "get",
            success: function(t) {
                if (console.log("getintegral", t.data), 0 == t.data.errno) {
                    var e = [];
                    "待审核" == a.data.page_title && (e = t.data.data.under_review), "待发货" == a.data.page_title && (e = t.data.data.waiting_for_delivery), 
                    "待收货" == a.data.page_title && (e = t.data.data.waiting_for_receive), "已完成" == a.data.page_title && (e = t.data.data.completed), 
                    "已审核" == a.data.page_title && (e = t.data.data.completed_delivery), a.setData({
                        delivery: e
                    });
                } else wx.showToast({
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
        })) : (console.log("还没登陆"), wx.navigateTo({
            url: "/pages/auth/auth"
        }));
    },
    onReady: function() {},
    onShow: function() {
        this.getlist();
    },
    fahuo: function(t) {
        console.log(t);
        wx.navigateTo({
            url: "/pages/warehouse/applyfordelivery?id=" + t.currentTarget.dataset.id
        });
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
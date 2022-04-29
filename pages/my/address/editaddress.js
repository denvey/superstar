var a = getApp();

Page({
    data: {
        address: []
    },
    onLoad: function(e) {
        var t = this;
        a.util.request({
            url: "entry/wxapp/getaddress",
            data: {
                m: a.globalData.module_name,
                op: "one",
                id: e.id
            },
            method: "get",
            success: function(a) {
                console.log("", a.data), 0 == a.data.errno ? t.setData({
                    address: a.data.data,
                    region: [ a.data.data.province, a.data.data.city, a.data.data.district ]
                }) : wx.showToast({
                    icon: "none",
                    title: a.data.message
                });
            },
            fail: function(a) {
                wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            }
        });
    },
    onReady: function() {},
    formbsumit: function(e) {
        console.log(e), "" != e.detail.value.name ? "" != e.detail.value.phone ? "" != e.detail.value.address ? a.util.request({
            url: "entry/wxapp/addaddress",
            data: {
                m: a.globalData.module_name,
                op: "edit",
                id: e.currentTarget.dataset.id,
                name: e.detail.value.name,
                phone: e.detail.value.phone,
                province: e.detail.value.area[0],
                city: e.detail.value.area[1],
                district: e.detail.value.area[2],
                address: e.detail.value.address,
                isdefault: 1 == e.detail.value.isdefault ? 1 : 0
            },
            method: "post",
            success: function(a) {
                console.log("getboxinfo", a.data), 0 == a.data.errno ? (wx.showToast({
                    icon: "none",
                    title: a.data.message
                }), wx.navigateBack({
                    delta: -1
                })) : wx.showToast({
                    icon: "none",
                    title: a.data.message
                });
            },
            fail: function(a) {
                wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            }
        }) : wx.showToast({
            icon: "none",
            title: "详细地址不能为空"
        }) : wx.showToast({
            icon: "none",
            title: "手机号不能为空"
        }) : wx.showToast({
            icon: "none",
            title: "收货人不能为空"
        });
    },
    deladdress: function(e) {
        a.util.request({
            url: "entry/wxapp/addaddress",
            data: {
                m: a.globalData.module_name,
                op: "del",
                id: e.currentTarget.dataset.id
            },
            method: "post",
            success: function(a) {
                console.log("getboxinfo", a.data), 0 == a.data.errno ? (wx.showToast({
                    icon: "none",
                    title: a.data.message
                }), wx.navigateBack({
                    delta: -1
                })) : wx.showToast({
                    icon: "none",
                    title: a.data.message
                });
            },
            fail: function(a) {
                wx.showToast({
                    icon: "none",
                    title: "网络连接失败"
                });
            }
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    RegionChange: function(a) {
        this.setData({
            region: a.detail.value
        });
    },
    onShareAppMessage: function() {}
});
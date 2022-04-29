var e = getApp();

Page({
    data: {
        region: [ "广东省", "广州市", "海珠区" ]
    },
    onLoad: function(e) {},
    onReady: function() {},
    formbsumit: function(a) {
        console.log(a.detail.value), "" != a.detail.value.name ? "" != a.detail.value.phone ? "" != a.detail.value.address ? e.util.request({
            url: "entry/wxapp/addaddress",
            data: {
                m: e.globalData.module_name,
                op: "add",
                name: a.detail.value.name,
                phone: a.detail.value.phone,
                province: a.detail.value.area[0],
                city: a.detail.value.area[1],
                district: a.detail.value.area[2],
                address: a.detail.value.address,
                isdefault: 1 == a.detail.value.isdefault ? 1 : 0
            },
            method: "post",
            success: function(e) {
                console.log("getboxinfo", e.data), 0 == e.data.errno ? (wx.showToast({
                    icon: "none",
                    title: e.data.message
                }), wx.navigateBack({
                    delta: -1
                })) : wx.showToast({
                    icon: "none",
                    title: e.data.message
                });
            },
            fail: function(e) {
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
    RegionChange: function(e) {
        this.setData({
            region: e.detail.value
        });
    },
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});
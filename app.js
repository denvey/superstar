var e = require("resource/js/util.js");

App({
    onLaunch: function(e) {
        var o = this;
        wx.getSystemInfo({
            success: function(e) {
                o.globalData.StatusBar = e.statusBarHeight;
                var t = wx.getMenuButtonBoundingClientRect();
                o.globalData.Custom = t, o.globalData.CustomBar = t.bottom + t.top - e.statusBarHeight;
            }
        });
    },
    onShow: function(e) {},
    onHide: function() {},
    onError: function(e) {
        console.log(e);
    },
    util: e,
    userInfo: {
        sessionid: null
    },
    tabBar: {
        color: "#999",
        selectedColor: "#f86b4f",
        borderStyle: "#fff",
        backgroundColor: "#fff",
        list: [ {
            pagePath: "/pages/index/index",
            iconPath: "/resource/icon/home.png",
            selectedIconPath: "/resource/icon/home-selected.png",
            text: "首页"
        }, {
            pagePath: "/pages/index/index",
            iconPath: "/resource/icon/home.png",
            selectedIconPath: "/resource/icon/home-selected.png",
            text: "首页"
        }, {
            pagePath: "/pages/index/index",
            iconPath: "/resource/icon/home.png",
            selectedIconPath: "/resource/icon/home-selected.png",
            text: "首页"
        }, {
            pagePath: "/pages/index/index",
            iconPath: "/resource/icon/home.png",
            selectedIconPath: "/resource/icon/home-selected.png",
            text: "首页"
        } ]
    },
    globalData: {
        guide: {
            0: !1,
            1: !1,
            2: !1,
            3: !1,
            4: !1,
            5: !1,
            6: !1,
            7: !1
        },
        star_enable: !1,
        bar_icon: [],
        guide_step: 0,
        juming_notice: 0,
        develop_version: "2.0.0",
        currency_name: "矿石",
        module_name: "greatriver_lottery_operation"
    },
    siteInfo: require("siteinfo.js")
});

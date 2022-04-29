var a = getApp();

Component({
    properties: {
        navtab: String,
        starenable: Boolean,
        scrolltop: {
            type: Boolean,
            value: !1,
            observer: function(a, t) {
                var e = this;
                console.log(a, t), a ? (this.setData({
                    indextitle: "返回顶部",
                    animation1: "rocket-animation"
                }), setTimeout(function() {
                    e.setData({});
                }, 1e3)) : (this.setData({
                    indextitle: "首页",
                    animation1: "rocket-animation2"
                }), setTimeout(function() {
                    e.setData({});
                }, 1e3));
            }
        }
    },
    data: {
        star_enable: !1,
        bar_icon: []
    },
    pageLifetimes: {
        show: function() {
            this.setData({
                star_enable: a.globalData.star_enable,
                bar_icon: a.globalData.bar_icon
            }), "index" == this.properties.navtab && this.setData({
                animation1: "animation"
            }), "warehouse" == this.properties.navtab && this.setData({
                animation2: "animation"
            }), "mystar" == this.properties.navtab && this.setData({
                animation3: "star-animation"
            }), "shop" == this.properties.navtab && this.setData({
                animation4: "animation"
            }), "my" == this.properties.navtab && this.setData({
                animation5: "animation"
            });
        },
        hide: function() {
            this.setData({
                animation1: "",
                animation2: "",
                animation3: "",
                animation4: "",
                animation5: ""
            });
        },
        resize: function() {}
    },
    methods: {
        fuckyou: function() {
            this.setData({
                star_enable: a.globalData.star_enable,
                bar_icon: a.globalData.bar_icon
            });
        },
        nav: function(a) {
            console.log(a), console.log("show", this.properties.navtab), console.log(this.properties.navtab), 
            "index" == this.properties.navtab && "index" == a.currentTarget.dataset.tabs && (console.log("我在首页，点的还是首页，出现火箭吧"), 
            wx.pageScrollTo({
                scrollTop: 0
            })), "index" == a.currentTarget.dataset.tabs && wx.switchTab({
                url: "/pages/index/index"
            }), "mystar" == a.currentTarget.dataset.tabs && wx.switchTab({
                url: "/pages/mystar/mystar"
            }), "warehouse" == a.currentTarget.dataset.tabs && wx.switchTab({
                url: "/pages/warehouse/warehouse"
            }), "shop" == a.currentTarget.dataset.tabs && wx.switchTab({
                url: "/pages/shop/shop"
            }), "my" == a.currentTarget.dataset.tabs && wx.switchTab({
                url: "/pages/my/my"
            });
        }
    }
});
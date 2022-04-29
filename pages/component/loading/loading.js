Component({
    properties: {},
    data: {
        loadingState: !1,
        maskState: !1,
        loadingText: "加载中..."
    },
    methods: {
        show: function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, a = t.mask, e = void 0 !== a && a, i = t.title, o = void 0 === i ? "加载中..." : i;
            this.setData({
                loadingState: !0,
                maskState: e,
                loadingText: o
            });
        },
        hide: function() {
            this.setData({
                loadingState: !1
            });
        }
    }
});
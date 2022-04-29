var e = require("../../../@babel/runtime/helpers/typeof");

module.exports = function(t) {
    var n = {};
    function r(e) {
        if (n[e]) return n[e].exports;
        var i = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return t[e].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
    }
    return r.m = t, r.c = n, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        });
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.t = function(t, n) {
        if (1 & n && (t = r(t)), 8 & n) return t;
        if (4 & n && "object" === e(t) && t && t.__esModule) return t;
        var i = Object.create(null);
        if (r.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: t
        }), 2 & n && "string" != typeof t) for (var o in t) r.d(i, o, function(e) {
            return t[e];
        }.bind(null, o));
        return i;
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(t, "a", t), t;
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 8);
}({
    8: function(e, t, n) {
        var r = n(9), i = ".weui-sticky";
        Component({
            options: {
                addGlobalClass: !0,
                pureDataPattern: /^_/,
                multipleSlots: !0
            },
            behaviors: [ r ],
            properties: {
                offsetTop: {
                    type: Number,
                    value: 0
                },
                zIndex: {
                    type: Number,
                    value: 99
                },
                disabled: {
                    type: Boolean,
                    value: !1
                },
                container: {
                    type: null
                }
            },
            data: {
                fixed: !1,
                height: 0,
                _attached: !1,
                _containerHeight: 0
            },
            observers: {
                disabled: function(e) {
                    this._attached && (e ? this.disconnectObserver() : this.initObserver());
                },
                container: function(e) {
                    "function" == typeof e && this.data.height && this.observerContainer();
                }
            },
            lifetimes: {
                attached: function() {
                    this.data._attached = !0, this.data.disabled || this.initObserver();
                },
                detached: function() {
                    this.data._attached = !1, this.disconnectObserver();
                }
            },
            methods: {
                getContainerRect: function() {
                    var e = this.data.container();
                    return new Promise(function(t) {
                        return e.boundingClientRect(t).exec();
                    });
                },
                initObserver: function() {
                    var e = this;
                    this.disconnectObserver(), this.getRect(i).then(function(t) {
                        e.setData({
                            height: t.height
                        }), e.observerContent(), e.observerContainer();
                    });
                },
                disconnectObserver: function(e) {
                    if (e) {
                        var t = this[e];
                        t && t.disconnect();
                    } else this.contentObserver && this.contentObserver.disconnect(), this.containerObserver && this.containerObserver.disconnect();
                },
                observerContent: function() {
                    var e = this, t = this.data.offsetTop;
                    this.disconnectObserver("contentObserver");
                    var n = this.createIntersectionObserver({
                        thresholds: [ 1 ],
                        initialRatio: 1
                    });
                    n.relativeToViewport({
                        top: -t
                    }), n.observe(i, function(t) {
                        e.data.disabled || e.setFixed(t.boundingClientRect.top);
                    }), this.contentObserver = n;
                },
                observerContainer: function() {
                    var e = this, t = this.data, n = t.container, r = t.height, o = t.offsetTop;
                    "function" == typeof n && (this.disconnectObserver("containerObserver"), this.getContainerRect().then(function(t) {
                        e.getRect(i).then(function(n) {
                            var s = n.top, a = t.top, c = t.height, u = s - a, d = e.createIntersectionObserver({
                                thresholds: [ 1 ],
                                initialRatio: 1
                            });
                            d.relativeToViewport({
                                top: c - r - o - u
                            }), d.observe(i, function(t) {
                                e.data.disabled || e.setFixed(t.boundingClientRect.top);
                            }), e.data._relativeTop = u, e.data._containerHeight = c, e.containerObserver = d;
                        });
                    }));
                },
                setFixed: function(e) {
                    var t = this.data, n = t.height, r = t._containerHeight, i = t._relativeTop, o = t.offsetTop, s = r && n ? e >= n + o + i - r && e < o : e < o;
                    this.triggerEvent("scroll", {
                        scrollTop: e,
                        isFixed: s
                    }), this.setData({
                        fixed: s
                    });
                }
            }
        });
    },
    9: function(e, t, n) {
        e.exports = Behavior({
            methods: {
                getRect: function(e) {
                    var t = this;
                    return new Promise(function(n, r) {
                        t.createSelectorQuery().select(e).boundingClientRect(function(t) {
                            t ? n(t) : r(new Error("can not find selector: " + e));
                        }).exec();
                    });
                },
                getAllRects: function(e) {
                    var t = this;
                    return new Promise(function(n, r) {
                        t.createSelectorQuery().selectAll(e).boundingClientRect(function(t) {
                            t && t.lenght > 0 ? n(t) : r(new Error("can not find selector: " + e));
                        }).exec();
                    });
                }
            }
        });
    }
});
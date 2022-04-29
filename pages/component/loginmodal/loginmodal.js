Component({
    properties: {},
    data: {},
    methods: {
        jumppage_login: function(e) {
            wx.navigateTo({
                url: "/pages/auth/auth"
            });
        },
        jumppage_index: function(e) {
            wx.switchTab({
                url: "/pages/index/index"
            });
        }
    }
});
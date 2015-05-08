rss.BaseScene = cc.Scene.extend({
    ctor: function() {
        this._super()

        this.r = {}
    },

    getSpace: function() {
        return this.r.space
    }
})
rss.BaseLayer = cc.Layer.extend({
    ctor: function(){
        this._super();

        this.r = {}
    },

    getSpace: function() {
        return this.r.space
    }
});
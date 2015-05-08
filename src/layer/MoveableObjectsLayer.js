/* Listens for movement control inputs */

var MoveableObjectsLayer = rss.BaseLayer.extend({
    controllee: null,

    ctor: function (space) {
        this._super();
    },

    init: function () {
        this._super()

        this.constructListeners()
    },


})
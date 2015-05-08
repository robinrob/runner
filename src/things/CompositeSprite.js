var CompositeSprite = cc.Sprite.extend({
    child_resources: null,
    components: null,

    ctor: function(resources) {
        cc.log("Sprite.ctor ...")
        this._super(resources.shift());

        this.child_resources = resources
        this.init()
    },

    init: function() {
        this.setChildren(this.child_resources)
    },

    setChildren: function(resources) {
        this.removeAllChildren()
        resources.forEach(function(res, index){
            var child = new cc.Sprite(res)
            child.setPosition(cc.p(this.width / 2, this.height / 2))
            // Add children at successively higher z-values in order to stack them on top of each other.
            this.addChild(child, index)
        }, this)

        this.components = [this].concat(this.getChildren())
    },

    setCompColor: function (i, color) {
        this.components[i].color = color
    },

    setChildColor: function (i, color) {
        this.getChildren()[i].setColor(color)
    }
})
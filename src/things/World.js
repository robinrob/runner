var World = rss.CircBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        this._super()

        this.draw()

        return this
    },

    draw: function() {
        this.r.draw.clear()
        this.drawCircle()
        this.drawDot()
    },

    drawCircle: function() {
        this.r.draw.drawCircle(
            this.getPos(),
            this.getRadius() + rss.ui.linewidth,
            0,
            this.getRadius() * 2,
            false,
            rss.ui.linewidth * 2,
            rss.setAlpha(this.getColor(), 200)
        )
    },

    drawDot: function() {
        this.r.draw.drawDot(
            this.getPos(),
            this.getRadius(),
            rss.setAlpha(this.getColor(), 128)
        )
    }
})

World.create = function(args) {
    return new World(args).init()
}
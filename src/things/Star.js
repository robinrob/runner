var Star = rss.CircBody.extend({
    ctor: function(args) {
        cc.log("Spaceship.ctor ...")
        //args.spriteCfg = {
        //    image: rss.res.coin0_png
        //}
        //args.spriteCfg = {
        //    image: rss.res.spaceship_png,
        //    pList: rss.res.spaceship_plist,
        //    name: ""
        //}
        //args.size = cc.size(rss.star.width, rss.star.height)
        args.radius = rss.star.width / 2
        args.mass = rss.star.mass

        this._super(args)
    },

    init: function() {
        this._super()

        this.setCollisionType(rss.tag.star)
        this.setSensor(true)

        return this
    },

    attachToWorld: function(world) {
        this.r.constraints = rss.fixedJoint(this, world, world.START_ANGLE)
    },

    getConstraints: function() {
        return this.r.constraints
    },

    draw: function() {
        if (this.r.draw) {
            this.r.draw.clear()
            this.drawCircle()
            this.drawDot()
        }
    },

    drawCircle: function() {
        this.r.draw.drawCircle(
            this.getPos(),
            this.getRadius(),
            0,
            this.getRadius() * 2,
            false,
            rss.ui.linewidth,
            rss.setAlpha(this.getColor(), 255)
        )
    },

    drawDot: function() {
        this.r.draw.drawDot(
            this.getPos(),
            this.getRadius(),
            rss.setAlpha(this.getColor(), 128)
        )
    },

    update: function() {
        this.draw()
    }
})

Star.create = function(args) {
    return new Star(args).init()
}
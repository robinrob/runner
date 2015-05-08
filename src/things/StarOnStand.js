var StarOnStand = cc.Node.extend({
    ctor: function(starArgs, standArgs) {
        this._super()

        this.r.star = Star.create(starArgs)

        var stand = rss.CircSegmentBody.create({
            pos: this.getWorld().getPos(),
            size: cc.size(width, length),
            radius: this.getWorld().getRadius() + float + height,
            // Use 20 segments per 5 degrees
            segments: 20 * rss.toDeg(width) / 5,
            offset: this.START_ANGLE - ang,
            mass: rss.item.mass
        })
        stand.setSensor(true)
        this.r.stand = stand
    },

    init: function() {
        this._super()
    }
})

StarOnStand.create = function(args) {
    return new StarOnStand(args).init()
}

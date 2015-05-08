rss.ConeBody = rss._DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.length, args.length)
        this._super(args)

        this.r.length = args.length
        this.r.radius = args.radius
        this.r.angle = cc.radiansToDegrees(2 * this.r.radius / this.r.length)
        this.r.segments = args.segments
        this.r.rotation = args.rotation - this.r.angle / 2
    },

    init: function() {
        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        var verts = []

        verts.push(0, 0)

        var gap = this.r.angle / this.r.segments
        for (var a = 90; a >= -90; a -= gap) {
            verts.push(
                this.r.length * Math.cos(cc.degreesToRadians(this.r.rotation)) + this.r.radius * Math.cos(cc.degreesToRadians(a + this.r.rotation)),
                this.r.length * Math.sin(cc.degreesToRadians(this.r.rotation)) + this.r.radius * Math.sin(cc.degreesToRadians(a + this.r.rotation))
            )
        }

        this.r.shape = new cp.PolyShape(this.r.body, verts, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))

        return this
    }
})

rss.ConeBody.create = function(args) {
    return new rss.ConeBody(args).init()
}
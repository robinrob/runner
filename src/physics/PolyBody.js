rss.PolyBody = rss._DynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size(args.radius * 2, args.radius + args.coneLength)
        this._super(args)

        this.r.radius = args.radius
        this.coneLength = args.coneLength
        this.r.segments = args.segments
    },

    init: function() {
        this._super()

        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        var pos = this.r.startPos

        var verts = []

        var p = cc.p(pos.x, pos.y - this.coneLength)

        for (var a = 0; a < 180; a += 180 / this.r.segments) {
            var x = pos.x + (this.r.radius * Math.cos(cc.degreesToRadians(a + 180)))
            verts.push(x)
            var y = pos.y + this.r.radius * Math.sin(cc.degreesToRadians(a))
            verts.push(y)
        }

        verts.push(p.x, p.y)

        for (var i = 0; i < verts.length; i += 2) {
            cc.log("x: " + verts[i])
            cc.log("y: " + verts[i+1])
        }

        //this.r.shape = new cp.PolyShape(this.r.body, verts, cp.v(0, 0))
        this.r.shape = new cp.PolyShape(this.r.body, verts, cp.v(0, 0))

        return this
    }
})

rss.PolyBody.create = function(args) {
    return new rss.PolyBody(args).init()
}
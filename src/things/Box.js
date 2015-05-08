rss.Box = rss._CompositeStaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.size = args.size
        this.r.width = args.size.width
        this.r.height = args.size.height
        this.r.thickness = args.thickness
        this.r.space = args.space
    },

    init: function() {
        this._super()
        this.constructWalls()

        this.addComp(this.r.left)
        this.addComp(this.r.right)
        this.addComp(this.r.bottom)
        this.addComp(this.r.top)
        return this
    },

    with3Walls: function() {
        this.r.comps = []
        this.addComp(this.r.left)
        this.addComp(this.r.right)
        this.addComp(this.r.bottom)
        return this
    },

    constructWalls: function() {
        cc.log("Box.init ...")

        this.walls = []

        var left = cp.v(this.r.thickness / 2, this.r.height / 2)
        var right = cp.v(this.r.width - this.r.thickness / 2, this.r.height / 2)
        var sVert = cc.size(this.r.thickness, this.r.height - this.r.thickness * 2)

        var top = cp.v(this.r.width / 2, this.r.height - this.r.thickness / 2)
        var bottom = cp.v(this.r.width / 2, this.r.thickness / 2)
        var sHoriz = cc.size(this.r.width, this.r.thickness)

        this.r.left = new rss.StaticRectBody.create({pos: left, size: sVert, space: this.r.space})
        this.r.left.shape.setElasticity(1.0)

        this.r.right = new rss.StaticRectBody.create({pos: right, size: sVert, space: this.r.space})
        this.r.right.shape.setElasticity(1.0)

        this.r.bottom = new rss.StaticRectBody.create({pos: bottom, size: sHoriz, space: this.r.space})
        this.r.bottom.shape.setElasticity(1.0)

        this.r.top = new rss.StaticRectBody.create({pos: top, size: sHoriz, space: this.r.space})
        this.r.top.shape.setElasticity(1.0)
    }
})

rss.Box.create = function(args) {
    args.thickness = 20
    return new rss.Box(args).init()
},

rss.Box.createOpen = function(args) {
    args.thickness = 20
    return new rss.Box(args).init().with3Walls()
}
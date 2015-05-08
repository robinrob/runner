rss.CircSegmentBody = rss._DynamicBody.extend({
    SCALE: 1.0,

    ctor: function(args) {
        this._super(args)

        this.r.radius = args.radius
        this.r.segments = args.segments
        this.r.offset = args.offset - this.getWidth()
        this.r.size.height = this.r.size.height || 1.0

        this.r.midPoint = this.r.offset + this.getWidth() / 2
        this.r.right = this.r.offset + this.getWidth()
        this.r.left = this.r.offset

        this.r.startAngle = args.startAngle

        this.r.space = args.space

        //this.r.omega = args.omega
        //this.r.ang = 0
    },

    init: function() {
        this._super()
        this.r.isInSpace = true

        if (this.getWidth() > 0) {
            this.initMe()
        }
        else {
            cc.log("angle should be greater than zero!")
        }

        return this
    },

    initMe: function() {
        // body
        this.r.body = new cp.Body(this.r.mass, cp.momentForBox(this.r.mass, this.r.size.width, this.r.size.height))
        this.r.body.setPos(this.getStartPos())

        // shape
        this.r.vertsXY = []
        this.r.verts = []

        var p = rss.polarToCartesian(this.r.radius * (1 - this.getHeight()), this.r.right)
        this.r.vertsXY.push(p.x, p.y)
        this.r.verts.push(p)

        var gap = this.getWidth() / this.r.segments
        for (var a = this.getWidth(); a >= 0; a -= gap) {
            p = cc.p(
                this.r.radius * Math.cos(a + this.r.offset),
                this.r.radius * Math.sin(a + this.r.offset)
            )
            this.r.vertsXY.push(p.x, p.y)
            this.r.verts.push(p)
        }

        p = rss.polarToCartesian(this.r.radius * (1 - this.getHeight()), this.r.left)

        this.r.vertsXY.push(p.x, p.y)
        this.r.verts.push(p)

        this.r.verts = rss.scaleVerts(this.r.verts, this.SCALE)

        this.r.shape = new cp.PolyShape(this.r.body, this.r.vertsXY, cp.v(0, 0))

        this.setJointP(cc.p(0, 0))

        this.anchorX = this.getStartPos().x
        this.anchorY = this.getStartPos().y

        this.r.draw = new cc.DrawNode()
        this.r.draw.setScale(1.0 / this.SCALE)
        this.addChild(this.r.draw)

        this.startAng = this.r.body.a
    },

    getTop: function(wantGlobal) {
        if (wantGlobal) {
            return rss.polarToCartesian(this.r.startPos.x + this.r.radius, this.r.midPoint)
        }
        else {
            return rss.polarToCartesian(this.r.radius, this.getWidth() / 2 + this.r.midPoint)
        }
    },

    getShapeTop: function(wantGlobal) {
        if (wantGlobal) {
            return rss.polarToCartesian(this.r.startPos.x + this.r.radius, this.r.midPoint)
        }
        else {
            return rss.polarToCartesian(this.r.radius * this.getHeight(), this.r.midPoint)
        }
    },

    getShapeBottom: function(wantGlobal) {
        if (wantGlobal) {
            return rss.sub(this.getShapeTop(true), this.getShapeTop(false))
        }
        else {
            return cc.p(0, 0)
        }
    },

    getVerts: function(wantGlobal) {
        if (wantGlobal) {
            return rss.offsetVerts(this.r.verts, this.r.startPos)
        }
        else {
            return this.r.verts
        }
    },

    getStartAngle: function() {
        return this.r.startAngle
    },

    draw: function(dt) {
        this.r.draw.clear()

        var ang = this.getAngle()
        var rightEdgeAng = rss.toDeg((this.getStartAngle() - (ang + this.getWidth() / 2)))
        var leftEdgeAng = rss.toDeg((this.getStartAngle() - (ang - this.getWidth() / 2)))
        var limit = 20
        if ((rightEdgeAng < limit) && (leftEdgeAng > (-1 * limit))) {
            //if (this.r.isInSpace == false) {
            //    cc.log("ADDING TO SPACE")
            //    this.addToSpace(rss.game.space)
            //    this.setAngle(this.r.ang)
            //    this.r.isInSpace = true
            //}
            this.r.draw.setPosition(this.getPos())
            this.r.draw.drawPoly(
                this.getVerts(false).reverse(),
                rss.setAlpha(this.getColor(), 128),
                rss.ui.linewidth / 2.0,
                rss.setAlpha(this.getColor(), 255)
            )
            this.r.draw.setAnchorPoint(0.5, 0)
            this.r.draw.setRotation(-1 * rss.toDeg(this.getAngle()))
        }
        //else if (this.r.isInSpace == true) {
        //    this.removeFromSpace(rss.game.space)
        //    this.r.isInSpace = false
        //}
    },

    update: function(dt) {
        this.draw(dt)
    }
})

rss.CircSegmentBody.create = function(args) {
    return new rss.CircSegmentBody(args).init()
}
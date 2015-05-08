rss._StaticBody = cc.Node.extend({
    ctor: function(args) {
        this._super()

        this.r = {}

        this.r.startPos = args.pos
        this.r.origin = args.pos
        this.r.jointPs = [cc.p()]

        this.r.size = args.size
        this.r.width = args.size.width
        this.r.height = args.size.height

        this.r.color = args.color || rss.colors.white
    },

    init: function() {
        rss.log("_StaticBody.init ...")
        this._super()
    },

    addToSpace: function(space) {
        space.addStaticShape(this.r.shape)
        return this
    },

    removeFromSpace: function(space) {
        var body = this.getBody()
        if (typeof body == "object") {
            //rss.log("CHECKING CONSTRAINTS")
            //space.constraints.forEach(function(constr) {
            //    //rss.log("CHECKING CONSTRAINT")
            //    if ((constr.a == body) || (constr.b == body)) {
            //        rss.log("REMOVING CONSTRAINT")
            //        space.removeConstraint(constr)
            //    }
            //})
            rss.log("REMOVING BODY")
            space.removeBody(body)
        }

        var shape = this.getShape()
        if (typeof shape == "object") {
            rss.log("REMOVING SHAPE")
            space.removeShape(shape)
        }

        if (typeof this.r.draw == "object") {
            rss.log("REMOVING DRAW NODE")
            this.r.shouldDraw = false
            this.r.draw.removeFromParent()
        }

        rss.log("REMOVING FROM PARENT")
        this.removeFromParent()
    },

    getStartPos: function() {
        return this.r.startPos
    },

    getPos: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                return this.r.body.getPos()
                break;
            case rss.box2D:
                return this.r.body.GetPosition()
                break;
        }
    },

    setPos: function(p) {
        switch(rss.physics) {
            case rss.chipmunk:
                this.r.body.setPos(p)
                break;
            case rss.box2D:
                this.r.body.setPosition(p.x, p.y)
                break;
        }
    },

    getX: function() {
        return this.r.body.getPos().x
    },

    getY: function() {
        return this.r.body.getPos().y
    },

    getTopLeft: function() {
        var pos = this.getPos()
        return cc.p(pos.x, pos.y + this.r.size.height / 2)
    },

    getTopLeftV: function() {
        return rss.toV(this.getTopLeft())
    },

    getJointP: function(wantGlobal) {
        if (wantGlobal) {
            return rss.add(this.getPos(), this.r.jointPs[0])
        }
        else {
            return this.r.jointPs[0]
        }
    },

    getStartPos: function() {
        return this.r.startPos
    },

    getSize: function() {
        return this.r.size
    },

    getWidth: function() {
        return this.r.size.width
    },

    getHeight: function() {
        return this.r.size.height
    },

    getRadius: function() {
        return this.r.radius
    },

    getWidthRad: function(radius) {
        return this.getWidth() / this.getRadius()
    },

    getHeightRad: function(radius) {
        return this.getHeight() / this.getRadius()
    },

    getShape: function() {
        return this.r.shape
    },

    getBody: function() {
        return this.r.body
    },

    getSprite: function() {
        return this.r.sprite
    },

    getDraw: function() {
        return this.r.draw
    },

    getStartPos: function() {
        return this.r.startPos
    },

    getOrigin: function() {
        return this.r.origin
    },

    setJointP: function(p) {
        this.r.jointPs[0] = p
    },

    getJointPs: function() {
        return this.r.jointPs
    },

    setJointPs: function(points) {
        this.r.jointPs = points
    },

    setGroup: function(group) {
        this.r.shape.group = group
    },

    getColor: function() {
        return this.r.color
    },

    setColor: function(color) {
        this.r.color = color
    },

    getState: function() {
        return this.r.state
    },

    setState: function(state) {
        this.r.state = state
    },

    setElasticity: function(e) {
        this.r.shape.setElasticity(e)
    },

    setFriction: function(f) {
        this.r.shape.setFriction(f)
    },

    setSensor: function(bool) {
        this.r.shape.setSensor(bool)
    },

    setCollisionType: function(type) {
        this.r.shape.setCollisionType(type)
    }
})
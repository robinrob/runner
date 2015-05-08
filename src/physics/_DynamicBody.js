rss._DynamicBody = rss._StaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.mass = args.mass
    },

    init: function() {
        this._super()
    },

    addToSpace: function(space) {
        space.addBody(this.r.body)
        space.addShape(this.r.shape)
        return this
    },

    getVel: function() {
        switch(rss.physics) {
            case rss.chipmunk:
                return this.r.body.getVel()
                break;
            case rss.box2D:
                return this.r.body.GetVelocity()
                break;
        }
    },

    setVel: function(v) {
        switch(rss.physics) {
            case rss.chipmunk:
                this.r.body.setVel(v)
                break;
            case rss.box2D:
                this.r.body.SetVelocity(v.x, v.y)
                break;
        }
    },

    getV: function() {
        return rss.toV(this.getPos())
    },

    getMass: function() {
        return this.r.body.m
    },

    getAngle: function() {
        return this.r.body.a
    },

    getAngleDeg: function() {
        return cc.radiansToDegrees(this.r.body.a)
    },

    setAngle: function(deg) {
        this.r.body.setAngle(deg)
    },

    getOffset: function() {
        return this.r.offset
    },

    getAngVel: function() {
        return this.r.body.getAngVel()
    },

    setAngVel: function(w) {
        this.r.body.w = w
    },

    applyForce: function (f) {
        this.r.body.applyForce(f, cp.v(0, 0))
    },

    applyForceAt: function (f, r) {
        this.r.body.applyForce(f, r)
    },

    applyImpulse: function (i) {
        this.r.body.applyImpulse(i, cp.v(0, 0))
    },

    applyImpulseAt: function (i, r) {
        this.r.body.applyImpulse(i, r)
    },

    applyAxialImpulse: function(impulse) {
        this.applyImpulse(impulse * this.r.body.rot.x, impulse * this.r.body.rot.y)
    }
})
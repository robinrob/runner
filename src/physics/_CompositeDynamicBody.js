rss._CompositeDynamicBody = rss._CompositeStaticBody.extend({
    ctor: function(args) {
        this._super(args)
    },

    init: function() {
        this._super()
    },

    getPos: function() {
        var comX = 0.0
        var comY = 0.0
        var mass = this.getMass()

        this.r.comps.forEach(function(comp) {
            comX += comp.getX() * comp.getMass() / mass
            comY += comp.getY() * comp.getMass() / mass
        })

        return cc.p(comX, comY)
    },

    setPos: function(x, y) {
        var com = this.getPos()
        var deltaX = x - com.x
        var deltaY = y - com.y

        this.r.comps.forEach(function(comp) {
            var x = comp.getPos().x + deltaX
            var y = comp.getPos().y + deltaY
            comp.setPos(x, y)
        })
    },

    getVel: function() {
        var vComX = 0.0
        var vComY = 0.0
        var mass = this.getMass()

        this.r.comps.forEach(function(comp) {
            var vel = comp.getVel()
            vComX += vel.x * comp.getMass() / mass
            vComY += vel.y * comp.getMass() / mass
        })

        return cp.v(vComX, vComY)
    },

    setVel: function(vx, vy) {
        this.r.comps.forEach(function(comp) {
            comp.setVel(vx, vy)
        })
    },

    getMass: function() {
        var mass = 0.0
        this.r.comps.forEach(function(comp) {
            mass += comp.getMass()
        })
        return mass
    },

    applyImpulse: function(i) {
        this.r.comps.forEach(function(comp) {
            comp.applyImpulse(i)
        })
    }
})
rss._CompositeStaticBody = rss._StaticBody.extend({
    ctor: function(args) {
        this._super(args)

        this.r.comps = []
        this.r.constraints = []
    },

    init: function() {
        cc.log("_CompositeStaticBody.init ...")
        this._super()

        this.r.comps = []
        this.r.constraints = []
    },

    addComp: function(comp) {
        this.r.comps.push(comp)
    },

    addToSpace: function(space) {
        this.r.comps.forEach(function(comp) {
            comp.addToSpace(space)
        })
        this.r.constraints.forEach(function(constr) {
            space.addConstraint(constr)
        })
        return this
    },

    addConstraint: function(constr) {
        this.r.constraints.push(constr)
    },

    addConstraints: function(constraints) {
        var that = this
        constraints.forEach(function(constr) {
            that.r.constraints.push(constr)
        })
    },

    setGroup: function(group) {
        this.r.comps.forEach(function(comp) {
            comp.r.shape.group = group
        })
    },

    setCollisionType: function(type) {
        this.r.comps.forEach(function(comp) {
            comp.r.shape.setCollisionType(type)
        })
    },

    setFriction: function(u) {
        this.r.comps.forEach(function(comp) {
            comp.setFriction(u)
        })
    },

    setElasticity: function(e) {
        this.r.comps.forEach(function(comp) {
            comp.setElasticity(e)
        })
    },

    setSensor: function(bool) {
        this.r.comps.forEach(function(comp) {
            comp.setSensor(bool)
        })
    }
})
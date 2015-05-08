var Man = rss._CompositeDynamicBody.extend({
    ctor: function(args) {
        args.size = cc.size()
        this._super(args)

        this.r.space = args.space
    },

    init: function() {
        cc.log("rss.man.init ...")
        this._super()

        this.r.state = rss.player.state.jumpDown

        // legs
        var leftLeg = this._constructLeg(
            this.r.worldX(-1 * (rss.man.width.leg + rss.man.width.crotch) / 2),
            this.r.worldY(rss.man.height.leg / 2)
        )

        var rightLeg = this._constructLeg(
            this.r.worldX(+1 * (rss.man.width.leg + rss.man.width.crotch) / 2),
            this.r.worldY(rss.man.height.leg / 2)
        )

        // torso
        var torso = this._constructTorso(
            this.r.worldX(0),
            leftLeg.getTopLeft().y + rss.man.height.crotch + rss.man.width.torso / 2)
        this.torso = torso

        // arms
        var rightArm = this._constructArm(
            this.r.worldX(-1 * (rss.man.width.torso + rss.man.width.armpit + rss.man.width.arm) / 2),
            torso.getTopLeft().y - rss.man.height.arm / 2
        )
        var leftArm = this._constructArm(
            this.r.worldX(+1 * (rss.man.width.torso + rss.man.width.armpit + rss.man.width.arm) / 2),
            torso.getTopLeft().y - rss.man.height.arm / 2
        )

        // head
        var head = this._constructHead(
            this.r.worldX(0),
            torso.getTopLeft().y + rss.man.height.neck + rss.man.height.head / 2
        )

        this.joinLimbs(torso, head)
        this.joinLimbs(leftArm, torso)
        this.joinLimbs(rightArm, torso)
        this.joinLimbs(leftLeg, torso)
        this.joinLimbs(rightLeg, torso)

        this.setCollisionType(rss.tag.player)
        return this
    },

    joinLimbs: function(limb1, limb2) {
        rss.pivotJoint(this.r.space, limb1, limb2)
    },

    worldX: function(x) {
        return this.getStartPos().x + x
    },

    worldY: function(y) {
        return this.getStartPos().y + y
    },

    worldCoords: function(x, y) {
        return cc.p(this.getStartPos().x + x, this.getStartPos().y + y)
    },

    _constructLimb: function(pos, size, mass, color) {
        var limb = new rss.RectBody(
            pos,
            size,
            mass,
            this.r.space
        )
        limb.setColor(color)
        limb.setJointP(cc.p(0, size.height / 2))

        limb.shape.setCollisionType(rss.tag.man);

        this.addComp(limb)

        return limb
    },

    _constructLeg: function(x, y) {
        var limb = this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.leg, rss.man.height.leg),
            rss.man.mass.leg,
            rss.colors.green
        )
        return limb
    },

    _constructArm: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.arm, rss.man.height.arm),
            rss.man.mass.arm,
            rss.colors.yellow
        )
    },

    _constructTorso: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.torso, rss.man.height.torso),
            rss.man.mass.torso,
            rss.colors.orange
        )
    },

    _constructHead: function(x, y) {
        return this._constructLimb(
            cc.p(x, y),
            cc.size(rss.man.width.head, rss.man.height.head),
            rss.man.mass.head,
            rss.colors.pink
        )
    },
    
    update: function(dt) {
        var p = this.getPos()
        var winSize = cc.director.getWinSize()
        var x = p.x
        var y = p.y
        var dix = 0.0, diy = 0.0

        if (this.r.rightInput()) {
            var impulse = this.getMass() * dt * 200
            this.applyImpulse(cp.v(impulse, 0))
        }
        if (this.r.leftInput()) {
            var impulse = this.getMass() * dt * 200
            this.applyImpulse(cp.v(-1 * impulse, 0))
        }

        if (this.r.state == rss.player.state.jumpUp) {
            if (this.getVel().y < 0.1) {
                this.r.state = rss.player.state.jumpDown
            }
        }
        else if (this.r.state == rss.player.state.running && this.upInput()) {
            this.r.state = rss.player.state.jumpUp
            var impulse = this.getMass() * dt * 3000
            this.applyImpulse(cp.v(0, impulse))
        }
    }
})

Man.create = function(args) {
    return new Man(args).init()
}
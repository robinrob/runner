var _Level = rss._CompositeDynamicBody.extend({
    START_ANGLE: Math.PI / 2,

    ctor: function(args) {
        cc.log("Level.ctor ...")
        args.size = rss.size()
        args.pos = rss.center()
        this._super(args)

        this.cfg = rss.levels[args.level - 1]
        cc.log("Level.ctor")
    },

    init:function() {
        cc.log("Level.init ...")
        this._super()

        this.addWorldMachine()
        this.addItems()

        cc.log("Level.init")
        return this
    },

    addWorldMachine: function() {
        var world = World.create({
            pos: rss.subY(rss.center(), this.cfg.radius + this.cfg.offset),
            radius: this.cfg.radius,
            offset: this.START_ANGLE,
            mass: rss.world.mass,
            color: rss.colors.red
        })
        world.setAngle(this.START_ANGLE)
        rss.world.state = rss.world.states.moving
        world.setCollisionType(rss.tag.ground)
        this.addItem(world)
        this.r.world = world

        var box = rss.StaticRectBody.create({pos: this.getWorld().getPos(), size: cc.size(10, 10)})
        this.addItem(box)
        this.addConstraints(rss.pivotJoint(box, this.getWorld()))
    },

    addStartFinishPad: function(gap, width) {
        gap = rss.toRad(gap)
        width = rss.toRad(width)

        var fromAng = this.end + gap

        var base = this.addSegment(gap, width, 20)
        base.setShouldPersist(true)
        base.setCollisionType(rss.tag.landingPad)

        finishSensor = this.addSegment(gap, width, rss.height() * 2)
        finishSensor.setShouldPersist(true)
        finishSensor.setCollisionType(rss.tag.startFinish)
        finishSensor.setSensor(true)

        this.end += gap + width
    },

    addStar: function(gap, height) {
        var gap = rss.toRad(gap)
        this.addStarAt(this.end + gap, height)
    },

    addStarAt: function(ang, height) {
        var star = Star.create({
            pos: cc.p(0, 0),
            color: rss.colors.yellow
        })
        var starWidth = this.widthToRad(star.getWidth())
        var p = rss.add(
            this.getWorld().getPos(),
            rss.polarToCartesian(
                this.getWorld().getRadius() + height,
                this.START_ANGLE - ang
            )
        )
        star.setPos(p)
        star.setCollisionType(rss.tag.star)
        star.setSensor(true)
        this.addItem(star)
        star.attachToWorld(this.getWorld())
        this.addConstraints(star.getConstraints())
    },

    addObstacle: function(gap, width, height) {
        gap = rss.toRad(gap)
        width = rss.toRad(width)

        var obstacle = this.addSegment(gap, width, height)
        obstacle.setColor(rss.colors.red)
        obstacle.setCollisionType(rss.tag.ground)

        this.end += gap + width

        return obstacle
    },

    addObstacleWithStar: function(gap, width, height) {
        this.addObstacle(gap, width, height)
        this.addStar(width / 2, height + 70)
    },

    /* Does not increment this.end */
    addFloatingObstacle: function(gap, width, height, float) {
        gap = rss.toRad(gap)
        width = rss.toRad(width)

        var obstacle = this.addSegment(gap, width, height, float)
        obstacle.setColor(rss.colors.red)
        obstacle.setCollisionType(rss.tag.ground)

        return obstacle
    },

    addFuelStrip: function(gap, width, height) {
        gap = rss.toRad(gap)
        width = rss.toRad(width)

        var strip = this.addSegment(gap, width, height)
        strip.setColor(rss.colors.green)
        strip.setCollisionType(rss.tag.fuel)
        strip.setElasticity(0.0)
        this.addConstraints(rss.fixedJoint(strip, this.getWorld(), this.START_ANGLE))

        this.end += gap + width
    },

    addRoundObstacle: function(fromAng, toAng) {
        fromAng = rss.toRad(fromAng)
        toAng = rss.toRad(toAng)

        var angle = this.START_ANGLE - (fromAng + (toAng - fromAng) / 2)
        var p = rss.polarToCartesian(this.r.radius, angle)

        var item = rss.CircBody.create({
            pos: rss.add(this.getWorld().getPos(), p),
            radius: this.radToWidth(toAng - fromAng),
            mass: rss.item.mass
        })
        item.setCollisionType(rss.tag.ground)
        this.addConstraints(rss.fixedJoint(item, this.getWorld(), this.START_ANGLE))
        this.addItem(item)

        this.end += gap + width
    },

    addSegment: function(gap, width, height, float) {
        return this.addSegmentAt(this.end + gap, width, height, float)
    },

    addSegmentAtDeg: function(ang, width, height, float) {
        return this.addSegmentAt(rss.toRad(ang), rss.toRad(width), height, float)
    },

    addSegmentAt: function(ang, width, height, float) {
        if (height && float) {
            length = height / (this.getWorld().getRadius() + float)
        }
        else {
            float = 0
            length = 1
        }

        var item = rss.CircSegmentBody.create({
            pos: this.getWorld().getPos(),
            size: cc.size(width, length),
            radius: this.getWorld().getRadius() + float + height,
            // Use 20 segments per 5 degrees
            segments: 20 * rss.toDeg(width) / 5,
            startAngle: ang,
            offset: this.START_ANGLE - ang,
            mass: rss.item.mass,
            space: rss.game.space,
            omega: this.cfg.omega
        })
        item.setLocalZOrder(-10)
        this.addConstraints(rss.fixedJoint(item, this.getWorld(), this.START_ANGLE))

        return this.addItem(item)
    },

    addItem: function(item) {
        item.setGroup(rss.tag.ground)
        this.addComp(item)
        this.getParent().addChild(item)

        return item
    },

    widthToRad: function(width) {
        return width / this.getWorld().getRadius()
    },

    widthToDeg: function(width) {
        return cc.radiansToDegrees((this.widthToRad(width)))
    },

    radToWidth: function(rad) {
        return this.r.radius * rad
    },

    degToWidth: function(deg) {
        return this.radToWidth(cc.degreesToRadians(deg))
    },

    stop: function() {
        rss.world.state = rss.world.states.stopped
    },

    resume: function() {
        rss.world.state = rss.world.states.moving
    },

    getAngle: function() {
        return this.getWorld().getAngle()
    },

    getWorld: function() {
        return this.r.world
    },

    update: function(dt) {
        if (rss.world.state == rss.world.states.moving) {
            this.getWorld().setAngVel(this.cfg.omega)
        }
        else if (rss.world.state == rss.world.states.stopped) {
            this.getWorld().setAngVel(0)
        }

        this.r.comps.forEach(function(comp){
            if (typeof comp.update != "undefined") {
                comp.update(dt)
            }
        })
    }
})
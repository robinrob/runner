var GameLayer = rss.BaseLayer.extend({
    ctor: function(space) {
        cc.log("GameLayer.ctor ...")
        this._super();

        //this._debugNode = new cc.PhysicsDebugNode(rss.game.space);
        //this._debugNode.setVisible(true);
        //this.addChild(this._debugNode, 10);

        this.constructListeners()
        cc.log("GameLayer.ctor")
    },

    constructListeners: function() {
        var that = this
        cc.eventManager.addListener({
            event: cc.EventListener.KEYBOARD,
            onKeyPressed:function (key, event) {
                if (key == cc.KEY.p) {
                    rss.keys[key] = !rss.keys[key];
                }
                else {
                    rss.keys[key] = true;
                }
            },
            onKeyReleased:function (key, event) {
                if (key != cc.KEY.p) {
                    rss.keys[key] = false;
                }
            }
        }, this);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function() { rss.keys[cc.KEY.up] = true; return true },
            onTouchEnded: function () { rss.keys[cc.KEY.up] = false }
        }, this);
    },

    processTouchDragEvent:function (event) {
        //Example implementation
        var winSize = cc.director.getWinSize();
        var delta = event.getDelta();
        var curPos = this.man.getPos()
        curPos = cc.pAdd(curPos, delta);
        curPos = cc.pClamp(curPos, cc.p(0, 0), cc.p(winSize.width, winSize.height));
        this.controllee.setPos(curPos.x, curPos.x)
        curPos = null;
    },

    init: function () {
        this._super()
        //this.item = CircFlyingObstacle.create({
        //    pos: rss.center(),
        //    size: cc.size(50, 50),
        //    mass: 50,
        //    radius: 200,
        //    angle: 90,
        //    rotation: 135,
        //    omega: 100
        //}).addToSpace(rss.game.space)

        this.initActors()

        rss.game.state = rss.game.states.ready
        cc.log("Ready!")

        //var item = CircFlyingObstacle.create({
        //    pos: this.r.worldPos,
        //    size: cc.size(50, 50),
        //    mass: 50,
        //    radius: this.r.level.getWorld().getRadius() + 20,
        //    angle: 5,
        //    rotation: this.START_ANGLE - 0,
        //    omega: 100
        //}).addToSpace(rss.game.space)

        return this
    },

    initActors: function() {
        cc.log("GameLayer.init ...")

        var level = new Level1({level: 1})
        this.addChild(level)
        level.init()
        level.setElasticity(0.0)
        level.setFriction(0.0)
        level.addToSpace(rss.game.space)
        this.r.level = level
        rss.world.state = rss.world.state.stopped

        var worldTop = this.getLevel().getWorld().getTop()

        var player = rss.Spaceship.create({
            pos: cc.p(),
            offset: cc.p(0, -10)
        })
        player.setPos(rss.addY(worldTop, player.getSize().height / 2 + 20))
        player.addToSpace(rss.game.space)
        this.addChild(player)
        player.setElasticity(0.0)
        player.setFriction(0.0)
        player.setGroup(rss.tag.player)
        player.setCollisionType(rss.tag.player)
        this.r.player = player
        rss.player.state = rss.player.states.landed

        //var top = rss.top().y + 200
        //var grooveHeight = top - worldTop.y
        //var groove = rss.StaticRectBody.create({
        //    pos: cc.p(rss.center().x, top - grooveHeight / 2),
        //    size: cc.size(0, grooveHeight)
        //}).addToSpace(rss.game.space)
        //groove.setJointPs([cc.p(0, groove.getSize().height / 2), cc.p(0, -1 * groove.getSize().height / 2)])
        ////groove.setGroup(rss.tag.player)
        //groove.setSensor(true)
        //
        //rss.game.space.addConstraints(rss.grooveJoint(groove, this.getPlayer()))
    },
    
    getLevel: function() {
        return this.r.level
    },
    
    getPlayer: function() {
        return this.r.player
    },

    update: function(dt) {
        if (rss.upInput() && (rss.game.state == rss.game.states.ready)) {
            this.getParent().getChildByTag(rss.tag.statsLayer).updateMsg("")
        }
        rss.game.space.gravity = rss.mult(rss.unitVecFromTo(this.getLevel().getWorld().getPos(), this.getPlayer().getPos()), rss.gravity)

        this.getPlayer().update(dt)
        this.getLevel().update(dt)
        this.getParent().getChildByTag(rss.tag.statsLayer).updateFuelMeter(this.getPlayer().getFuel())
        this.getParent().getChildByTag(rss.tag.statsLayer).updateDistanceMeter(rss.toDeg(this.getLevel().getWorld().getAngle()))
    }
})

GameLayer.create = function(space) {
    return new GameLayer(space).init()
}
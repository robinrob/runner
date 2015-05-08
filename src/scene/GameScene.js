var GameScene = rss.BaseScene.extend({
    onEnter:function () {
        cc.log("Scene.onEnter ...")
        this._super()

        this.initPhysics()

        this.addChild(GameLayer.create(rss.game.space), 0, rss.tag.gameLayer)
        this.addChild(StatsLayer.create(), 0, rss.tag.statsLayer)

        this.scheduleUpdate();
    },
    
    initPhysics: function() {
        rss.game.space = new cp.Space()
        //rss.game.space.gravity = cc.p(0, rss.gravity)
        
        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.ground,
            this.collisionGroundBegin.bind(this),
            null,
            null,
            this.collisionGroundSeparate.bind(this));

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.fuel,
            this.collisionFuelBegin.bind(this),
            null,
            null,
            this.collisionFuelSeparate.bind(this))

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.landingPad,
            this.collisionLandingPadBegin.bind(this),
            null,
            null,
            this.collisionLandingPadSeparate.bind(this))

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.startFinish,
            this.collisionStartFinishBegin.bind(this),
            null,
            null,
            this.collisionStartFinishSeparate.bind(this))

        rss.game.space.addCollisionHandler(
            rss.tag.player,
            rss.tag.star,
            this.collisionStarBegin.bind(this),
            null,
            null,
            null)
    },

    collisionGroundBegin:function () {
        if (rss.player.state != rss.player.states.refuelling) {
            cc.log("collisionGround.begin")
            var player = this.getChildByTag(rss.tag.gameLayer).player
            rss.player.state = rss.player.states.crashed
            cc.log("Game Over!")
            cc.director.pause()
            this.addChild(GameOverLayer.create())
        }
        // Absolutely required here - returning nothing gives same effect as returning false
        return true
    },

    
    collisionGroundSeparate: function() {
        cc.log("collisionGround.separate")
        if (rss.player.state != rss.player.states.refuelling) {
            rss.player.state = rss.player.states.flying
        }
    },

    collisionFuelBegin: function() {
        cc.log("collisionFuel.begin")
        rss.player.state = rss.player.states.refuelling
        // Absolutely required here - returning nothing gives same effect as returning false
        return true
    },

    collisionFuelSeparate: function() {
        cc.log("collisionFuel.separate")
        rss.player.state = rss.player.states.flying
    },

    collisionLandingPadBegin: function() {
        cc.log("collisionLandingPad.begin")
        rss.player.state = rss.player.states.landed
        rss.world.state = rss.world.states.stopped
        // Absolutely required here - returning nothing gives same effect as returning false
        return true
    },

    collisionLandingPadSeparate: function() {
        cc.log("collisionLandingPad.separate")
        rss.player.state = rss.player.states.flying
        rss.world.state = rss.world.states.moving
    },

    collisionStartFinishBegin: function() {
        cc.log("collisionStartFinish.begin")
        if (rss.game.state == rss.game.states.started) {
            this.getChildByTag(rss.tag.statsLayer).updateMsg("Completed!")
            cc.director.pause()
            cc.log("GAME OVER")
            this.addChild(GameOverLayer.create())
        }
    },

    collisionStartFinishSeparate: function() {
        cc.log("collisionStartFinish.separate")
        var angle = this.getChildByTag(rss.tag.gameLayer).getLevel().getWorld().getAngle()
        if (angle > rss.landingPad.angle / 2) {
            rss.game.state = rss.game.states.started
        }
    },

    collisionStarBegin: function(arbiters) {
        cc.log("CollisionStarBegin")
        var that = this
        var gameLayer = this.getChildByTag(rss.tag.gameLayer)
        var shape = arbiters.getShapes()[1]
        gameLayer.getChildren().forEach(function(child) {
            if (((typeof child.getShape) != "undefined") && (child.getShape() == shape)) {
                that.addObjectToRemove(child)
            }
        })
    },
    
    addObjectToRemove: function(obj) {
        this.r.objectsToRemove.push(obj)
    },

    shouldPhysicsRun: function() {
        return !rss.pauseInput() && ((rss.game.state == rss.game.states.touched) || (rss.game.state == rss.game.states.started))
    },

    update: function(dt) {
        this.r.objectsToRemove = []

        if (!rss.pauseInput()) {
            rss.game.space.step(dt);
            this.getChildByTag(rss.tag.gameLayer).update(dt);
        }
        if (rss.restartInput()) {
            cc.director.runScene(new GameScene())
        }

        var that = this
        this.r.objectsToRemove.forEach(function(obj) {
            obj.removeFromSpace(rss.game.space)
        })
    }
})
rss.RectPhysicsSprite = rss.RectBody.extend({
    ctor: function(args) {
        if (args.spriteCfg.pList) {
            this.constructAnimSprite(args.spriteCfg)
        }
        else {
            this.sprite = new cc.PhysicsSprite(args.spriteCfg.image)
        }
        args.size = this.sprite.getContentSize()

        this._super(args)
    },

    init: function() {
        this._super()

        this.sprite.setBody(this.r.body)
        this.addChild(this.sprite)

        return this
    },

    constructAnimSprite: function(spriteCfg) {
        cc.spriteFrameCache.addSpriteFrames(spriteCfg.pList);
        var spriteSheet = new cc.SpriteBatchNode(spriteCfg.spriteSheet)
        this.sprite = new cc.PhysicsSprite("#" + spriteCfg.name + "0.png");

        var animFrames = [];

        for (var i = 1; i < 4; i++) {
            var str = "" + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }

        this.animation = new cc.Animation(animFrames, 0.1);

        this.sprite.runAction(cc.animate(this.animation).repeatForever());
    }
})

rss.RectPhysicsSprite.create = function(args) {
    return new rss.RectPhysicsSprite(args).init()
}
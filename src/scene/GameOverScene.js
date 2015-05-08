var GameOverScene = rss.BaseScene.extend({
    onEnter:function () {
        cc.log("MenuScene.onEnter ...")
        this._super();

        this.addChild(GameOverLayer.create());
    }
});

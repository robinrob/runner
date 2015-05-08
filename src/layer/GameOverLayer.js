var GameOverLayer = rss.BaseLayer.extend({
    ctor : function(){
        cc.log("MenuLayer.ctor ...")
        this._super();
    },

    init:function(){
        cc.log("MenuLayer.init ...")
        this._super();

        var winsize = cc.director.getWinSize();
        var centerpos = cc.p(winsize.width / 2, winsize.height / 2);

        var menuItemPlay = new cc.MenuItemSprite(
            rss.ui.restartButton().normal,
            rss.ui.restartButton().selected,
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(centerpos);
        this.addChild(menu);

        return this
    },

    onPlay : function(){
        cc.log("MenuLayer.onPlay ...")
        cc.director.resume()
        cc.director.runScene(new GameScene());
    }
});

GameOverLayer.create = function() {
    return new GameOverLayer().init()
}
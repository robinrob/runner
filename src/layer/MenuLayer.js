var MenuLayer = rss.BaseLayer.extend({
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
            rss.ui.startButton().normal,
            rss.ui.startButton().selected,
            this.onPlay, this);
        var menu = new cc.Menu(menuItemPlay);
        menu.setPosition(centerpos);
        this.addChild(menu);

        return this
    },

    onPlay : function(){
        cc.log("MenuLayer.onPlay ...")
        cc.director.runScene(new GameScene());
    }
});

MenuLayer.create = function() {
    return new MenuLayer().init()
}
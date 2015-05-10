var rss = rss || {};

rss.chipmunk = "chipmunk"
rss.box2D = "box2d"
//rss.physics = rss.box2D
rss.physics = rss.chipmunk

rss.g = 100
rss.gravity = -500

rss.twoPI = 2 * Math.PI

rss.keys = []

rss.colors = {
    yellow: new cc.color(255, 255, 0, 255),
    green: new cc.color(0, 255, 0, 255),
    purple: new cc.color(174, 0, 255, 255),
    red: new cc.color(255, 0, 0, 255),
    pink: new cc.color(255, 0, 255, 255),
    orange: new cc.color(255, 78, 0, 255),
    maroon: new cc.color(172, 6, 84, 255),
    brown: new cc.color(145, 58, 6, 255),
    blue: new cc.color(6, 87, 234, 255),
    black: new cc.color(0, 0, 0, 255),
    white: new cc.color(255, 255, 255, 255)
}

rss.res = {
    spaceship0_png: "res/spaceship/0.png", // 60x33
    spaceship0_2png: "res/spaceship/0_2.png", // 120x66
    spaceship_png : "res/spaceship/spaceship.png", // 120x66
    spaceship_plist : "res/spaceship/spaceship.plist",

    //star0_png: "res/star/0.png",
    //star_png : "res/star/star.png",
    //star_plist : "res/star/star.plist",

    button_outer_png: "res/buttons/button-outer.png",

    button_n_inner_png: "res/buttons/button_n-inner.png",
    button_s_inner_png: "res/buttons/button_s-inner.png",

    start_n_text_png: "res/buttons/start_n-text.png",
    start_s_text_png: "res/buttons/start_s-text.png",

    restart_n_text_png: "res/buttons/restart_n-text.png",
    restart_s_text_png: "res/buttons/restart_s-text.png"
}

// Resources for pre-loading
rss.resources = [];
for (var i in rss.res) {
    rss.resources.push(rss.res[i]);
}

rss.spaceship = {
    mass: 1,
    acc: 1000
}
rss.spaceship.maxImp = rss.spaceship.mass * 50

rss.tag = {
    player: 1,
    ground: 2,
    fuel: 3,
    landingPad: 4,
    startFinish: 5,
    star: 6,
    invisible: 7,

    gameLayer: 99,
    statsLayer: 98
}

rss.player = {
    states: {
        landed: 0,
        flying: 1,
        refuelling: 2,
        crashed: 9
    }
}

rss.player.stateNames = {
    0: "landed",
    1: "flying",
    2: "refuelling",
    9: "crashed"
}

rss.world = {
    mass: 10000000,
    states: {
        stopped: 0,
        moving: 1
    }
}

rss.item = {
    mass: 100000
}

rss.star = {
    width: 30,
    height: 30,
    mass: 1
}

rss.landingPad = {
    angle: 5
}

rss.game = {
    states : {
        ready: 0,
        touched: 1,
        started: 2
    }
}

rss.game.stateNames = {
    0: "ready",
    1: "touched",
    2: "started"
}

rss.levels = [
    {
        radius: 2000,
        offset: 150,
        omega: 0.20
        //radius: 800,
        //offset: 150,
        //omega: 0.4
    }
]
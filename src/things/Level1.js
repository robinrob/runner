var Level1 = _Level.extend({
    addItems: function() {
        this.end = rss.toRad(-1.0 * rss.landingPad.angle / 2)
        this.addStartFinishPad(0, rss.landingPad.angle)

        this.addObstacleWithStar(2, 5, 30)
        this.addObstacleWithStar(2, 2, 40)
        this.addObstacleWithStar(2, 2, 50)
        this.addObstacleWithStar(2, 3, 60)
        this.addObstacleWithStar(2, 3, 70)

        this.addFuelStrip(2, 10, 20)

        this.addFloatingObstacle(4, 2, 30, 300)
        this.addObstacleWithStar(4, 2, 100, 150)

        this.addFloatingObstacle(0, 2, 30, 300)
        this.addObstacleWithStar(0, 2, 100, 150)

        this.addFloatingObstacle(0, 2, 30, 300)
        this.addObstacleWithStar(0, 2, 100, 150)

        this.addObstacle(8, 2, 120)
        this.addObstacle(2, 2, 100)
        this.addObstacle(2, 2, 70)
        this.addObstacle(2, 2, 50)

        this.addFuelStrip(1, 15, 20)

        this.addObstacle(2, 2, 30)
        this.addObstacle(2, 2, 40)
        this.addObstacle(2, 2, 50)

        this.addObstacle(4, 3, 90)
        this.addObstacle(2, 3, 80)
        this.addObstacle(2, 3, 70)
        this.addObstacle(2, 2, 100)
        this.addObstacle(2, 2, 20)
        this.addObstacle(2, 2, 100)

        this.addObstacle(4, 3, 90)
        this.addObstacle(2, 3, 80)
        this.addObstacle(2, 3, 70)

        this.addFuelStrip(3, 30)

        this.addObstacle(4, 3, 50)
        this.addObstacle(2, 3, 70)
        this.addObstacle(2, 3, 90)
        this.addObstacle(2, 3, 110)
        this.addObstacle(2, 3, 130)
        this.addObstacle(2, 3, 130)

        this.addObstacle(5, 3, 70)
        this.addObstacle(2, 3, 130)
        this.addObstacle(2, 3, 170)
        this.addObstacle(2, 2, 130)
        this.addObstacle(2, 3, 170)
        this.addObstacle(2, 3, 170)
        this.addObstacle(2, 2, 130)
        this.addObstacle(2, 2, 130)
        this.addObstacle(2, 2, 130)

        this.addObstacle(4, 2, 150)
        this.addObstacle(2, 2, 170)
        this.addObstacle(2, 2, 50)
        this.addObstacle(2, 2, 30)
        this.addObstacle(3, 2, 170)
        this.addObstacle(3, 3, 180)
        this.addObstacle(3, 3, 140)
        this.addObstacle(2, 2, 120)
        this.addObstacle(2, 3, 50)
        this.addObstacle(3, 3, 130)
        this.addObstacle(2, 2, 120)
        this.addObstacle(2, 3, 50)
        this.addObstacle(3, 3, 130)
        this.addObstacle(2, 2, 120)
        this.addObstacle(2, 3, 50)
        this.addObstacle(3, 3, 130)
        this.addObstacle(2, 2, 120)
        this.addObstacle(2, 3, 50)
        this.addObstacle(3, 3, 130)
        this.addObstacle(2, 2, 120)
    }
})

Level1.create = function(args) {
    return new Level1(args).init()
}
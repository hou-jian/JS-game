var Paddle = function(game) {
    var o = game.imageByName('paddle')
    o.x = 150
    o.y = 250
    o.speed = 10
    o.moveLeft = function() {
        if(this.x <= 0) {
            this.x = 0
            return
        }
        this.x -= this.speed
    }
    o.moveRight = function() {
        if(this.x >= 400 - this.image.width) {
            this.x = 400 - this.image.width
            return
        }
        this.x += this.speed
    }
    // 碰撞检测
    o.collide = function(ball) {

        if(ball.rectCollisionDetection(o)) {
            ball.speedY *= -1
        }
    }
    return o
}

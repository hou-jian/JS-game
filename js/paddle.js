var Paddle = function() {
    var image = imageFromPath('img/paddle.png')
    var o = {
        image: image,
        x: 150,
        y: 250,
        speed: 10,
    }
    o.moveLeft = function() {
        if (this.x <= 0) {
            this.x = 0
            return
        }
        this.x -= this.speed
    }
    o.moveRight = function() {
        if (this.x >= 400 - this.image.width) {
            this.x = 400 - this.image.width
            return
        }
        this.x += this.speed
    }
    // 碰撞检测
    o.collide = function(ball) {

        if (ball.rectCollisionDetection(o)) {
            ball.speedY *= -1
        }
    }
    return o
}

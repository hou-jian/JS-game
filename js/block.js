
var Block = function(x, y, l) {
    var image = imageFromPath('img/block.png')
    var o = {
        image: image,
        x: x,
        y: y,
        w: 50,
        h: 20,
        alive: true,
        lives: l
    }
    o.kill = function() {
        // 判断砖块生命值
        if (o.lives && o.lives > 1) {
            o.lives--
            return
        }
        o.alive = false
    }
    o.collide = function(ball) {
        if (this.alive) {
            // 碰撞检查
            if (ball.rectCollisionDetection(o)) {
                o.kill()
                ball.speedY *= -1
            }
        }

    }
    return o
}

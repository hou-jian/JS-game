var Block = function(x, y, l, game) {
    var o = game.imageByName('block')
    
    o.x = x
    o.y = y
    o.alive = true
    o.lives = l
    o.kill = function() {
        // 判断砖块生命值
        if(o.lives && o.lives > 1) {
            o.lives--
            return
        }
        o.alive = false
    }
    o.collide = function(ball) {
        // alive控制砖块显示与否
        if(this.alive) {
            // 碰撞检查
            if(ball.rectCollisionDetection(o)) {
                // 判断砖块血量
                o.kill()
                // 控制小球y轴移动方向
                ball.speedY *= -1
                return true
            }
        }

    }
    return o
}

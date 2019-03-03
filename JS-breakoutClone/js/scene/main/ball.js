var Ball = function(game) {
    var o = game.imageByName('ball')
    o.x = 100
    o.y = 200
    o.speedX = 5
    o.speedY = 5
    o.fired = false
    o.move = function(canvas) {
        if(o.fired) {
            //
            if(o.x < 0 || o.x + o.image.width > canvas.width) {
                o.speedX *= -1
            }
            if(o.y < 0 || o.y + o.image.height > canvas.height) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function() {
        o.fired = true
    }
    // x 为矩形,this为小球
    // o.碰撞检测 = function(ju) {
    //     if (ju.y + ju.image.height > this.y && ju.y < this.y + this.image.height) {
    //         if (ju.x < this.x && ju.x + ju.image.width > this.x) {
    //             return true
    //         }
    //     }
    //     return false
    // }
    o.rectCollisionDetection = function(rect) {
        return o.x < rect.x + rect.w &&
            o.x + o.w > rect.x &&
            o.y < rect.y + rect.h &&
            o.h + o.y > rect.y
    }
    // 检查是否点击到小球
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
    return o
}
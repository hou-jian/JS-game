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
        var half1Width = o.image.width / 2,
            half1Height = o.image.height / 2,
            half2Width = rect.image.width / 2,
            half2Height = rect.image.height / 2,
            cen1 = {
                x: o.x + half1Width,
                y: o.y + half1Height
            },
            cen2 = {
                x: rect.x + half2Width,
                y: rect.y + half2Height
            }

        return Math.abs(cen2.x - cen1.x) <= half1Width + half2Width && Math.abs(cen2.y - cen1.y) <= half1Height + half2Height;
    }

    return o
}
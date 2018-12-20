var e = function(selector) {
    return document.querySelector(selector)
}

var bindEvent = function(element, event, callback) {
    element.addEventListener(event, callback)
}

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var Paddle = function() {
    var image = imageFromPath('img/paddle.png')
    var o = {
        image: image,
        x: 150,
        y: 250,
        speed: 10,
    }
    o.moveLeft = function() {
        this.x -= this.speed
    }
    o.moveRight = function() {
        this.x += this.speed
    }
    o.collide = function(ball) {
        if (o.y < ball.y + ball.image.height) {
            if (o.x < ball.x ) {
                if (o.x + image.width > ball.x) {
                    ball.speedY *= -1
                }
            }
        }

    }
    return o
}

var Ball = function() {
    var image = imageFromPath('img/ball.png')
    var o = {
        image: image,
        x: 100,
        y: 200,
        speedX: 5,
        speedY: 5,
        fired: false,
    }
    o.move = function(canvas) {
        if (o.fired) {
            //
            if (o.x <= 0 || o.x >= canvas.width) {
                o.speedX *= -1
            }
            if (o.y <= 0 || o.y >= canvas.height) {
                o.speedY *= -1
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function() {
        o.fired = true
    }
    return o
}

var GuaGame = function() {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = e('#game-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // 处理事件
    bindEvent(window, 'keydown', function(event) {
        g.keydowns[event.key] = true
    })
    bindEvent(window, 'keyup', function(event) {
        g.keydowns[event.key] = false
    })
    g.registerAction = function(key, callback) {
        // 这里给该按键注册函数
        g.actions[key] = callback
    }
    // drawImage
    g.drawImage = function(img) {
        g.context.drawImage(img.image, img.x, img.y)
    }
    // times
    setInterval(function() {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            // 这里控制是否移动
            if (g.keydowns[key]) {
                // 这里加减paddle的x坐标
                g.actions[key]()
            }
        }
        // 清空画布
        context.clearRect(0, 0, canvas.width, canvas.height)
        g.updata(canvas)
        // 设置坐标
        g.draw()
    }, 1000 / 60)
    return g
}

var __main = function() {
    // 按键控制
    var game = GuaGame()
    // 滑块
    var paddle = Paddle()
    // 小球
    var ball = Ball()
    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })
    game.updata = function(canvas) {
        ball.move(canvas)
        // 判断相撞
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
    }
    // 设置paddle的新位置
    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
    }

}

__main()

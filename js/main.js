var loadLevel = function(n, game) {
    n = n - 1
    var level = levels[n]
    var l = []
    for(var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p[0], p[1], p[2], game)
        l.push(b)
    }
    return l
}

// ***** 一些全局属性 *****
// - 控制暂停
window.paused = false

// - 帧数
window.fps = 60

var debug = function(boolean, game, ball) {
    if(!boolean) {
        return
    }
    // 暂停小球
    bindEvent(window, 'keydown', function(event) {
        var k = event.key
        if(k === 'p') {
            paused = !paused
        } else if('1234567'.indexOf(k) > -1) {
            window.blocks = loadLevel(k, game)
        }
    })

    // 拖拽滑条控制fps
    var range = e('#id-range')
    bindEvent(range, 'input', function(event) {
        if(event.target.value < 1) {
            fps = 1
        } else {
            fps = event.target.value
        }
    })

    // 点击移动小球
    var ballStatus = false
    bindEvent(game.canvas, 'mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // 检查是否点中小球
        if(ball.hasPoint(x, y)) {
            // log(x, y)
            ball.x = x
            ball.y = y
            ballStatus = true
        }
    })
    bindEvent(game.canvas, 'mousemove', function(event) {
        if(ballStatus) {
            var x = event.offsetX
            var y = event.offsetY
            ball.x = x
            ball.y = y
        }

    })
    bindEvent(game.canvas, 'mouseup', function() {
        ballStatus = false
    })
}
var __main = function() {
    // 分数
    var score = 0
    // 需要载入的图片名称
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    // 控制画布
    var game = Game(images, function(game) {
        window.blocks = loadLevel(1, game)
        // 滑块
        var paddle = Paddle(game)
        // 小球
        var ball = Ball(game)
        debug(true, game, ball)

        // - 给按键绑定函数
        game.registerAction('a', function() {
            // 挡板左移
            paddle.moveLeft()
        })
        game.registerAction('d', function() {
            // 挡板有移
            paddle.moveRight()
        })
        game.registerAction('f', function() {
            // 发射小球
            ball.fire()
        })

        // - canvas更新数据
        game.updata = function(canvas) {
            // 暂停小球
            if(paused) {
                return
            }
            // 小球移动，与边界相撞则反弹
            ball.move(canvas)
            // 球和挡板相撞则反弹
            paddle.collide(ball)

            // 球和砖块相撞则反弹（批量检查）
            for(var i = 0; i < window.blocks.length; i++) {
                var b = blocks[i]
                // 检查碰撞
                if(b.collide(ball)) {
                    // 分数+100
                    score += 100
                }
            }
        }
        // - 绘制img
        game.draw = function() {
            game.drawImage(paddle)
            game.drawImage(ball)
            // 批量绘制砖块
            for(var i = 0; i < blocks.length; i++) {
                var b = blocks[i]
                // alive为true才绘制砖块
                if(b.alive) {
                    game.drawImage(b)
                }
            }
            // 绘制分数
            game.context.fillText('分数: ' + score, 10, 50)
        }
    })

}

__main()

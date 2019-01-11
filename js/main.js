var loadLevel = function(n) {
    n = n - 1
    var level = levels[n]
    var l = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p[0], p[1], p[2])
        l.push(b)
    }
    return l
}

// ***** 一些全局属性 *****
// - 控制暂停
window.paused = false
// - 载入指定关卡
window.blocks = loadLevel(1)
// - 帧数
window.fps = 60

var debug = function(boolean) {
    // 暂停小球
    bindEvent(window, 'keydown', function(event) {
        var k = event.key
        if (k === 'p') {
            paused = !paused
        } else if ('1234567'.indexOf(k) > -1) {
            blocks = loadLevel(k)
        }
    })

    var range = e('#id-range')
    bindEvent(range, 'input', function(event) {
        if (event.target.value < 1) {
            fps = 1
        } else {
            fps = event.target.value
        }
    })
}
var __main = function() {
    debug(true)

    // 画布刷新、控制
    // 参数为fps
    var game = Game()
    // 滑块
    var paddle = Paddle()
    // 小球
    var ball = Ball()

    // 按键事件
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

    // canvas更新状态
    game.updata = function(canvas) {
        // 暂停小球
        if (paused) {
            return
        }
        // 小球移动，与边界相撞则反弹
        ball.move(canvas)
        // 球和挡板相撞则反弹
        paddle.collide(ball)
        // 球和砖块相撞则反弹，(砖块有多个故遍历)
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            b.collide(ball)
        }

    }
    // canvas绘制img
    game.draw = function() {
        game.drawImage(paddle)
        game.drawImage(ball)
        // 批量绘制砖块
        for (var i = 0; i < blocks.length; i++) {
            var b = blocks[i]
            if (b.alive) {
                game.drawImage(b)
            }
        }
    }
}

__main()

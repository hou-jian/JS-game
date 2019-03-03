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

var __main = function() {

    // 需要载入的图片名称
    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }
    
    new Game(images, function(g) {
        var s = Scene(g)
        // 绘制场景
        g.runWithScene(s)
        // debug(暂停、拖拽...)
        s.debug(true)
    })
}

__main()

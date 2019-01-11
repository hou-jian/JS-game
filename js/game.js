var Game = function() {

    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = e('#game-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // 按键，按下移动，抬起停止
    bindEvent(window, 'keydown', function(event) {
        g.keydowns[event.key] = true
    })
    bindEvent(window, 'keyup', function(event) {
        g.keydowns[event.key] = false
    })

    // 绘制Image
    g.drawImage = function(img) {
        g.context.drawImage(img.image, img.x, img.y)
    }

    // 按下某个键，将其作为key指向回调函数
    // 并保存在对象里，便于批量调用
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    g.runloop = function() {
        // 得到actions里的key
        var actions = Object.keys(g.actions)
        // 遍历他得到单个key
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            // 检查状态，按下时为true，抬起false
            if (g.keydowns[key]) {
                // 调用actions对象里存的对应函数
                g.actions[key]()
            }
        }
        // 清空画布
        context.clearRect(0, 0, canvas.width, canvas.height)
        // 更新画布
        g.updata(canvas)
        // 绘制图片
        g.draw()
        setTimeout(function() {
            // 没秒更新一次页面
            g.runloop()
        }, 1000 / window.fps)
    }

    setTimeout(function() {
        g.runloop()
    }, 1000 / window.fps)

    return g
}

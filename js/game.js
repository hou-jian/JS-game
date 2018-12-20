var Game = function() {

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
    // 绘制Image
    g.drawImage = function(img) {
        g.context.drawImage(img.image, img.x, img.y)
    }
    g.runloop = function() {
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
        // 更新画布
        g.updata(canvas)
        // 绘制图片
        g.draw()
        setTimeout(function() {

            g.runloop()
        }, 1000 / window.fps)
    }
    setTimeout(function() {

        g.runloop()
    }, 1000 / window.fps)

    return g
}

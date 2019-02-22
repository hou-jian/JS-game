var Game = function(images, runCallback) {
    var g = {
        actions: {},
        keydowns: {},
        images: {}
    }
    // - 获取元素
    var canvas = e('#game-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // - 按键，按下移动true，抬起停止false
    bindEvent(window, 'keydown', function(event) {
        g.keydowns[event.key] = true
    })
    bindEvent(window, 'keyup', function(event) {
        g.keydowns[event.key] = false
    })

    // - 绘制Image
    g.drawImage = function(img) {
        g.context.drawImage(img.image, img.x, img.y)
    }

    // - 让传入的按键key值，指向回调函数。并保存在actions对象里
    g.registerAction = function(key, callback) {
        g.actions[key] = callback
    }

    // - 预先载入所有图片
    var loads = []
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            loads.push(1)
            g.images[name] = img
            
            if (loads.length == names.length) {
                g.run()
            }
        }
    }
    // - 更新页面
    g.runloop = function() {
        // - 批量处理按下某个键，进行某操作
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            // 得到单个key值
            var key = actions[i]
            // 检查状态，keydowns按下时为true，抬起false
            if (g.keydowns[key]) {
                // 调用key所对应的函数
                g.actions[key]()
            }
        }
        // - 清空画布
        context.clearRect(0, 0, canvas.width, canvas.height)
        // - 更新数据
        g.updata(canvas)
        // - 绘制图片(函数在main.js里)
        g.draw()
        // - 递归调用
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }
    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function() {
        runCallback(g)
        setTimeout(function() {
            g.runloop()
        }, 1000 / window.fps)
    }

    return g
}

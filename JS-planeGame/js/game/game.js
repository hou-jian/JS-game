class Game {
    constructor(images, runCallback) {

        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = e('#game-canvas')

        this.context = this.canvas.getContext('2d')
        
        // - 按键，按下移动true，抬起停止false
        bindEvent(window, 'keydown', (event) => {
            this.keydowns[event.key] = 'down'
        })
        bindEvent(window, 'keyup', (event) => {
            this.keydowns[event.key] = 'up'
        })
        this.init()
    }
    // game入口！
    init() {
        // - 预先载入所有图片
        var loads = []
        var names = Object.keys(this.images)
        for(var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name]
            let img = new Image()
            img.src = path
            img.onload = () => {
                loads.push(1)
                this.images[name] = img

                if(loads.length == names.length) {
                    // 资源载入完毕，开始执行
                    this.run()
                }
            }
        }
    }
    
    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    // - 绘制Image
    drawImage(img) {
        // log(img)
        this.context.drawImage(img.texture, img.x, img.y, img.w, img.h)
    }

    // - 让传入的按键key值，指向回调函数。并保存在actions对象里
    registerAction(key, callback) {

        this.actions[key] = callback
    }


    // - 每fps/1000擦除重绘canvas，以实现动画效果。
    runloop() {
        // - 批量处理按下某个键，进行某操作
        var actions = Object.keys(this.actions)
        for(var i = 0; i < actions.length; i++) {
            // 得到单个key值
            var key = actions[i]
            var status = this.keydowns[key]
            // log('status', status)
            if(status == 'down') {
                // 调用key所对应的函数
                this.actions[key]('down')
            } else if(status == 'up') {
                this.actions[key]('up')
                this.keydowns[key] = null
            }
        }
        // - 清空画布
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        // - 更新数据
        this.update(this.canvas)
        // - 绘制图片
        this.draw()
        // - 递归调用
        setTimeout(() => {
            this.runloop()
        }, 1000 / config.fps)
    }
    // 根据名字返回图片
    textureByName(name) {
        var img = this.images[name]
        return img
    }
    // 获取场景，并执行
    runWithScene(scene) {
        this.scene = scene
        setTimeout(() => {
            this.runloop()
        }, 1000 / config.fps)
    }
    // 用来替换场景对象，以实现不同场景间的切换
    replaceScene(scene) {
        this.scene = scene
    }
    // 资源载入完毕，执行回调
    run() {
        this.runCallback(this)
    }
}
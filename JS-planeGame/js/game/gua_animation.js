class GuaAnimation {
    constructor(game) {
        this.game = game
        this.x = 100
        this.y = 150
        this.count = 4
        this.index = 0
        this.animations = {
            idle: [],
            run: []
        }
        // 默认加载的动画图片名
        this.animationName = 'idle'

        for(let i = 0; i < 16; i++) {
            var name = `Idle${i + 1}`
            var t = game.textureByName(name)
            this.animations['idle'].push(t)
        }
        for(let i = 0; i < 20; i++) {
            var name = `Run${i + 1}`
            var t = game.textureByName(name)
            this.animations['run'].push(t)
        }
        this.texture = this.animations[this.animationName][0]
        this.w = this.texture.width / 3
        this.h = this.texture.height / 3

        this.flipX = false //控制水平翻转

    }
    update() {
        // log('animations', this.texture)
        // count控制多少帧切换一次状态
        this.count--
        if(this.count == 0) {
            this.count = 4
            this.index++

            this.texture = this.animations[this.animationName][this.index]


            this.w = this.texture.width / 3
            this.h = this.texture.height / 3
            this.index = this.index % (this.animations[this.animationName].length - 1)
        }
    }
    draw() {
        var context = this.game.context
        // 人物向左走，水平翻转
        if(this.flipX) {
            
            context.save()            
            var x = this.x + this.w / 2
            context.translate(x, 0)
            context.scale(-1, 1)
            context.translate(-x, 0)
            context.drawImage(this.texture, this.x, this.y, this.w, this.h)
            
            context.restore()
            
        } else {
            context.drawImage(this.texture, this.x, this.y, this.w, this.h)
        }

    }
    move(x, keyStatus) {
        // flipX控制是否水平翻转
        this.flipX = (x < 0)
        this.x += x
        // log('keyStatus', keyStatus)
        if(keyStatus == 'down') {
            this.changeAnimation('run')
        } else if(keyStatus == 'up') {
            // 抬起时需要把动画移动到起始帧，
            // 否则每个动画的帧数不同会出现bug
            this.index = 0
            this.changeAnimation('idle')
        }
    }
    changeAnimation(name) {
        this.animationName = name
    }

}
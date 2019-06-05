class SceneEnd extends GuaScene {
    constructor(game, playerX, playerY) {
        super(game)
        // 这是英雄机爆炸时的坐标
        this.playerX = playerX
        this.playerY = playerY
        this.setup()
    }
    setup() {
        // 背景
        this.bg = new Bg(this.game)
        // 该方法在GuaScene父类里
        this.addElement(this.bg)
        // 分数面板
        this.endBg = new EndBg(this.game)
        this.addElement(this.endBg)
        // 重玩按钮
        this.endRetry = new EndRetry(this.game, this.endBg.y)
        this.addElement(this.endRetry)
        // 英雄机爆炸动画
        this.planeExplode()

        // 
        // log(this.game.canvas)
        var a = function(e) {
            log(e)
        }
        var du = 'hwhw'
        var canvas = this.game.canvas
        canvas.addEventListener('mousemove', throttle((event) => {
            var x = event.offsetX
            var y = event.offsetY
            var retry = {}
            retry.x = this.endRetry.x
            retry.y = this.endRetry.y
            retry.w = this.endRetry.w
            retry.h = this.endRetry.h
            // 检查鼠标是否移入重玩按钮
            var s = this.blockCheck(x, y, retry)
            
            // s为true，替换按钮图片
            // 点击切换到scene类
            // 解绑事件
        }, 400))
    }
    update() {
        super.update()
    }

    planeExplode() {
        // 添加英雄机爆炸动画
        var animation = new GuaAnimation(this.game, 'explode', 9, this.playerX, this.playerY)
        this.addElement(animation)
    }
    blockCheck(x, y, o) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
}
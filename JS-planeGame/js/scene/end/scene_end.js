class SceneEnd extends GuaScene {
    constructor(game, playerX, playerY) {
        super(game)
        // 这是英雄机爆炸时的坐标
        this.playerX = playerX
        this.playerY = playerY
        // 分数
        this.score = this.game.score
        this.setup()
    }
    setup() {
        // -背景
        this.bg = new Bg(this.game)
        // addElement方法在父类里
        this.addElement(this.bg)

        // -分数面板
        this.scorePanel = new ScorePanel(this.game)
        this.addElement(this.scorePanel)

        // -重玩按钮
        this.endRetry = new EndRetry(this.game, this.scorePanel.y)
        this.addElement(this.endRetry)

        // -英雄机爆炸动画
        this.planeAnimation = new GuaAnimation(this.game, 'explode', 9, this.playerX, this.playerY)
        this.addElement(this.planeAnimation)

        var canvas = this.game.canvas
        // -光标移入移出重玩按钮，切换图片
        this.mousemoveToggleTexture(canvas)
        // -点击重玩按钮切换场景，并解绑canvas绑定的所有事件
        this.clickSwitchoverScene(canvas)
    }
    update() {
        super.update()
    }

    // 光标移入移出重玩按钮，切换图片
    mousemoveToggleTexture(canvas) {
        // throttle为节流函数，在game/assist.js里
        // 在点击重玩按钮切换场景时需要解绑，所以这里绑定在this上
        this.mousemoveFn = throttle((event) => {
            // log('mousemove')
            // 当前光标坐标
            var x = event.offsetX
            var y = event.offsetY
            // 重玩按钮参数
            var retry = {}
            retry.x = this.endRetry.x
            retry.y = this.endRetry.y
            retry.w = this.endRetry.w
            retry.h = this.endRetry.h
            // 检查光标是否移入重玩按钮
            var b = this.blockCheck(x, y, retry)
            // 重玩按钮切换图片(光标移入移出)
            this.endRetry.toggleTexture(b)
        }, 50)
        canvas.addEventListener('mousemove', this.mousemoveFn)
    }
    // 点击重玩按钮切换场景到scene.js,
    // 并解绑canvas绑定的事件
    clickSwitchoverScene(canvas) {
        // 单独写出来，便于解绑事件
        var clickFn = () => {
            // log('click')
            // 当前光标坐标
            var x = event.offsetX
            var y = event.offsetY
            // 重玩按钮参数
            var retry = {}
            retry.x = this.endRetry.x
            retry.y = this.endRetry.y
            retry.w = this.endRetry.w
            retry.h = this.endRetry.h
            // 检查光标是否点中重玩按钮
            var b = this.blockCheck(x, y, retry)
            if(b) {
                // 解绑canva上的事件
                canvas.removeEventListener('click', clickFn)
                canvas.removeEventListener('mousemove', this.mousemoveFn)
                // 重置参数
                this.game.score = 0
                // 切换场景到scene
                var s = new Scene(this.game)
                this.game.replaceScene(s)
            }
        }
        canvas.addEventListener('click', clickFn)
    }
    // 检查x,y 坐标是否在矩形o内
    blockCheck(x, y, o) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }
}
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // K的keyCode为75
        game.registerAction('75', function() {
            var s = new Scene(game)
            game.replaceScene(s)
        })
        this.setup()
       
    }
    setup() {

        // 添加背景
        this.bg = new Bg(this.game)
        this.addElement(this.bg)

        // 批量添加云
        for (var i = 0; i < 2; i++) {
            // 云的y坐标
            let y = -80 + (-200 * i)
            var yun = new Yun(this.game, y)
            this.addElement(yun)
        }

        // // 绘制标签
        // var label = new GuaLabel(this.game, '按K开始游戏')
        // this.addElement(label)

        // 开始按钮
        this.playButton = new PlayButton(this.game)
        this.addElement(this.playButton)

        var canvas = this.game.canvas
        this.mousemoveToggleTexture(canvas)
        this.clickSwitchoverScene(canvas)
    }
 
    // 光标移入移出开始按钮，切换图片
    mousemoveToggleTexture(canvas) {
        // throttle为节流函数，在game/assist.js里
        // 在点击开始按钮切换场景时需要解绑，所以这里绑定在this上
        this.mousemoveFn = throttle((event) => {
            // log('mousemove')
            // 当前光标坐标
            var x = event.offsetX
            var y = event.offsetY
            // 开始按钮参数
            var retry = {}
            retry.x = this.playButton.x
            retry.y = this.playButton.y
            retry.w = this.playButton.w
            retry.h = this.playButton.h
            // 检查光标是否移入重玩按钮
            var b = this.blockCheck(x, y, retry)
            // 重玩按钮切换图片(光标移入移出)
            this.playButton.toggleTexture(b)
        }, 50)
        canvas.addEventListener('mousemove', this.mousemoveFn)
    }
    // 点击开始按钮切换场景到scene.js,
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
            retry.x = this.playButton.x
            retry.y = this.playButton.y
            retry.w = this.playButton.w
            retry.h = this.playButton.h
            // 检查光标是否点中重玩按钮
            var b = this.blockCheck(x, y, retry)
            if(b) {
                // 切换场景到scene
                var s = new Scene(this.game)
                this.game.replaceScene(s)
                 // 解绑canva上的事件
                 canvas.removeEventListener('click', clickFn)
                 canvas.removeEventListener('mousemove', this.mousemoveFn)
                 canvas.style.cursor = 'default'
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
class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        this.bg = new GuaImage(this.game, 'bg')
        this.hero = new GuaImage(this.game, 'hero')
        this.hero.x = 200
        this.hero.y = 500
        this.hero.w = 51
        this.hero.h = 63
        this.enemy = new GuaImage(this.game, 'enemy')
        // 添加图片到页面
        this.addElement(this.bg)
        this.addElement(this.hero)
        this.addElement(this.enemy)
        // 移动飞机hero
        this.game.registerAction('d', () => {
            this.hero.x += 5
        })
        this.game.registerAction('a', () => {
            this.hero.x -= 5
        })
        this.game.registerAction('w', () => {
            this.hero.y -= 5
        })
        this.game.registerAction('s', () => {
            this.hero.y += 5
        })
    }
 
    // 调试用
    debug(boolean) {
        if(!boolean) {
            return
        }
        // 暂停
        bindEvent(window, 'keydown', function(event) {
            var k = event.key
            if(k === 'p') {
                paused = !paused
            } else if('1234567'.indexOf(k) > -1) {
                // window.blocks = loadLevel(k, game)
            }
        })

        // 拖拽滑条控制fps
        var range = e('#id-range')
        bindEvent(range, 'input', function(event) {
            if(event.target.value < 1) {
                fps = 1
            } else {
                fps = event.target.value
            }
        })

        // // 点击移动小球
        // var ballStatus = false
        // bindEvent(game.canvas, 'mousedown', function(event) {
        //     var x = event.offsetX
        //     var y = event.offsetY
        //     // 检查是否点中小球
        //     if(ball.hasPoint(x, y)) {
        //         // log(x, y)
        //         ball.x = x
        //         ball.y = y
        //         ballStatus = true
        //     }
        // })
        // bindEvent(game.canvas, 'mousemove', function(event) {
        //     if(ballStatus) {
        //         var x = event.offsetX
        //         var y = event.offsetY
        //         ball.x = x
        //         ball.y = y
        //     }

        // })
        // bindEvent(game.canvas, 'mouseup', function() {
        //     ballStatus = false
        // })
    }

}
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

        // 添加云
        this.yun0 = new Yun(this.game)
        this.addElement(this.yun0)

        // 绘制标签
        var label = new GuaLabel(this.game, '按K开始游戏')
        this.addElement(label)
    }
}
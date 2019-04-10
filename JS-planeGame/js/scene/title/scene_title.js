class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // 绘制标签
        var label = new GuaLabel(game, '按k开始页面')
        this.addElement(label)
        game.registerAction('k', function() {
            var s = new Scene(game)
            game.replaceScene(s)
            game.pause = false
        })
    }
}
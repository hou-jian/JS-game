class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // 绘制标签
        var label = new GuaLabel(game, '开始页面')
        this.addElement(label)
        this.setupInputs(s)
    }
    setupInputs(s) {
        this.game.registerAction('a', (keyStatus) => {
            s.move(-3, keyStatus)
        })
        this.game.registerAction('d', (keyStatus) => {
            s.move(3, keyStatus)
            
        })
    }
}
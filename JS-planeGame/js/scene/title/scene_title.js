class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // 绘制标签
        var label = new GuaLabel(game, '开始页面')
        this.addElement(label)

        var s = new GuaAnimation(game)
        // s.w = s.w / 3  
        // s.h = s.h / 3
        this.addElement(s)

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
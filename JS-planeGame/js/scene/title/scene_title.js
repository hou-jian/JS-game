class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        // 绘制标签
        var label = new GuaLabel(game, '开始页面')
        this.addElement(label)
 
    }
}
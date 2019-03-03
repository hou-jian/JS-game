class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('r', function() {
            var t = new SceneTitle(game)
            game.replaceScene(t)        
        })
    }
    draw() {
        this.game.context.fillText('游戏结束，按r重启游戏', 10, 50)

    }
}
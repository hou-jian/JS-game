var SceneEnd = function(game) {
    var s = {
        game: game,
    }
    game.registerAction('r', function() {
        var t = SceneTitle(game)
        game.replaceScene(t)        
    })
    s.draw = function() {
        // 绘制分数
        game.context.fillText('游戏结束，按r重启游戏', 10, 50)
        
    }

    s.updata = function() {

    }

    return s
}
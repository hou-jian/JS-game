var SceneTitle = function(game) {
    var s = {
        game: game,
    }
    game.registerAction('k', function() {
        var k = Scene(game)
        game.replaceScene(k)
    })
    s.draw = function() {
        // 绘制分数
        game.context.fillText('按k开始游戏', 10, 50)
        
    }

    s.updata = function() {

    }

    return s
}
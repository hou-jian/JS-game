var SceneEnd = function(game) {
    var s = {
        game: game,
    }

    s.draw = function() {
        // 绘制分数
        game.context.fillText('游戏结束', 10, 50)
        
    }

    s.updata = function() {

    }

    return s
}
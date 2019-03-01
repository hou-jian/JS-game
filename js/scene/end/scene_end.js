// var SceneEnd = function(game) {
//     var s = {
//         game: game,
//     }
//     game.registerAction('r', function() {
//         var t = new SceneTitle(game)
//         game.replaceScene(t)        
//     })
//     s.draw = function() {
//         // 绘制分数
//         game.context.fillText('游戏结束，按r重启游戏', 10, 50)
        
//     }

//     s.updata = function() {

//     }

//     return s
// }

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
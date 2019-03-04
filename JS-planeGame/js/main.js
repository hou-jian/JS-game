// ***** 一些供调试用的全局属性 *****
// - 控制暂停
window.paused = false
// - 帧数
window.fps = 60


var __main = function() {

    // 需要载入的图片名称
    var images = {
        bg1: 'assets/game/bg1.png',
        player: 'assets/player/player.png',
        enemy1: 'assets/enemy/enemy1.png',
        enemy2: 'assets/enemy/enemy2.png',
        enemy3: 'assets/enemy/enemy3.png',
        enemy4: 'assets/enemy/enemy4.png',
        enemy5: 'assets/enemy/enemy5.png',
        
    }
    
    // 通过回调函数的方式
    // 保证资源加载完毕后，再开始运行
    new Game(images, function(g) {
        var s = new Scene(g)
        // 绘制场景，入口
        g.runWithScene(s)
        debugOptions()
    })
    
    // 调试参数
    var debugOptions = function() {
        var range = e('#id-range')
        bindEvent(range, 'input', function(event) {
            if(event.target.value < 1) {
                fps = 1
            } else {
                fps = event.target.value
            }
        })
    }
}

__main()

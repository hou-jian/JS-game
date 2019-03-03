// ***** 一些供调试用的全局属性 *****
// - 控制暂停
window.paused = false
// - 帧数
window.fps = 60


var __main = function() {

    // 需要载入的图片名称
    var images = {
        bg: 'img/background.png',
        bullet: 'img/bullet1.png',
        hero: 'img/hero.png',
        enemy: 'img/enemy1.png',
        
    }
    
    // 通过回调函数的方式
    // 保证资源加载完毕后，再开始运行
    new Game(images, function(g) {
        var s = new Scene(g)
        // 绘制场景
        g.runWithScene(s)
        // debug(暂停、拖拽...)
        s.debug(true)
    })
}

__main()

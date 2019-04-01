// ***** 一些供调试用的全局属性 *****
// 配置
var config = {
    fps: 60,
    player_speed: 8,
    player_cooldown: 5,
    missile_speed: 5,
}
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
        yun0: 'assets/yun/Yun_0.png',
        yun1: 'assets/yun/Yun_1.png',
        yun2: 'assets/yun/Yun_2.png',
        yun3: 'assets/yun/Yun_3.png',
        yun4: 'assets/yun/Yun_4.png',
        missile1: 'assets/missile/missile1.png',
        particle: 'assets/game/particle.png', //爆炸颗粒
        
    }

    // 通过回调函数的方式,保证资源加载完毕后，再开始运行
    new Game(images, function(g) {
        // var s = new Scene(g)
        var s = new SceneTitle(g)
        // 绘制场景，入口
        g.runWithScene(s)
        debugOptions()
    })


    // 调试参数
    var debugOptions = function() {

        var bindEventAll = function(sel, eventName, callback) {
            var l = es(sel)
            for(let i = 0; i < l.length; i++) {
                var input = l[i]
                input.addEventListener(eventName, function(event) {
                    callback(event)
                })

            }
        }
        bindEventAll('.auto-slider', 'input', function(event) {
            var target = event.target
            var configOption = target.dataset.value
            var v = target.value
            if(v <= 0) {
                v = 1
            }
            // 让各配置值，等于滑条值
            eval(configOption + '=' + v)
            // 具体值可视化
            var label = target.closest('label').querySelector('.gua-label')
            label.innerText = v
        })
    }
}

__main()

// ***** 一些供调试用的全局属性 *****
// 配置
var config = {
    fps: 60,
    player_speed: 8,
    player_cooldown: 10,
    missile_speed: 5,
}

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
    // 英雄机爆炸动画
    explode1: 'assets/explode/s1.png',
    explode2: 'assets/explode/s2.png',
    explode3: 'assets/explode/s3.png',
    explode4: 'assets/explode/s4.png',
    explode5: 'assets/explode/s5.png',
    explode6: 'assets/explode/s6.png',
    explode7: 'assets/explode/s7.png',
    explode8: 'assets/explode/s8.png',
    explode9: 'assets/explode/s9.png',
    // 闲置动画
    Idle1: 'assets/test/Idle (1).png',
    Idle2: 'assets/test/Idle (2).png',
    Idle3: 'assets/test/Idle (3).png',
    Idle4: 'assets/test/Idle (4).png',
    Idle5: 'assets/test/Idle (5).png',
    Idle6: 'assets/test/Idle (6).png',
    Idle7: 'assets/test/Idle (7).png',
    Idle8: 'assets/test/Idle (8).png',
    Idle9: 'assets/test/Idle (9).png',
    Idle10: 'assets/test/Idle (10).png',
    Idle11: 'assets/test/Idle (11).png',
    Idle12: 'assets/test/Idle (12).png',
    Idle13: 'assets/test/Idle (13).png',
    Idle14: 'assets/test/Idle (14).png',
    Idle15: 'assets/test/Idle (15).png',
    Idle16: 'assets/test/Idle (16).png',
    // 跑步动画
    Run1: 'assets/test/Run (1).png',
    Run2: 'assets/test/Run (2).png',
    Run3: 'assets/test/Run (3).png',
    Run4: 'assets/test/Run (4).png',
    Run5: 'assets/test/Run (5).png',
    Run6: 'assets/test/Run (6).png',
    Run7: 'assets/test/Run (7).png',
    Run8: 'assets/test/Run (8).png',
    Run9: 'assets/test/Run (9).png',
    Run10: 'assets/test/Run (10).png',
    Run11: 'assets/test/Run (11).png',
    Run12: 'assets/test/Run (12).png',
    Run13: 'assets/test/Run (13).png',
    Run14: 'assets/test/Run (14).png',
    Run15: 'assets/test/Run (15).png',
    Run16: 'assets/test/Run (16).png',
    Run17: 'assets/test/Run (17).png',
    Run18: 'assets/test/Run (18).png',
    Run19: 'assets/test/Run (19).png',
    Run20: 'assets/test/Run (20).png',
}


var __main = function() {

    // 通过回调函数的方式,保证资源加载完毕后，再开始运行
    new Game(images, function(g) {
        // 加载场景
        // var s = new Scene(g)
        var s = new SceneTitle(g)
        
        // 传入场景，开始执行
        g.runWithScene(s)
        debugOptions(g)
    })


    // 调试参数
    var debugOptions = function(g) {

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

        g.registerAction('p', () => {
            g.pause = !g.pause
        })
    }
}

__main()

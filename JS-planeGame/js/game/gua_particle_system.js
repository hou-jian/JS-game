/*
    爆炸颗粒效果类
    使用方法：
    var ps = new GuaParticleSystem(game)
    this.addElement(ps) // 这是GuaScene类中的方法，用来绘制到页面
*/ 
class GuaParticle extends GuaImage {
    constructor(game) {
        super(game, 'particle')
        this.setup()
    }
    setup() {
        this.life = 20
    }
    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }
    update() {

        this.life--
        //随机角度移动
        this.x += this.vx
        this.y += this.vy

        // 加速度
        var n = 0.02
        this.vx += n * this.vx
        this.vy += n * this.vy
    }
}

class GuaParticleSystem {
    constructor(game) {   
        this.game = game
        this.setup()
    }
    setup() {
        // 这里为了测试把爆炸x y坐标写死了！
        this.x = 150
        this.y = 200
        this.numberOfParticles = 10
        this.particles = []
        this.duration = 30
    }
    update() {
        
        this.duration--
        // 添加颗粒
        if(this.particles.length <= this.numberOfParticles) {
            var p = new GuaParticle(this.game)
            var s = 2
            var vx = rnd(-s, s)
            var vy = rnd(-s, s)
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
   
        // 更新颗粒
        for(const p of this.particles) {
            p.update()
        }
        // 删除颗粒
        this.particles = this.particles.filter(function(p) {
            return p.life > 0
        })
        

    }
    draw() {
        for(const e of this.particles) {
            e.draw()
        }
    }
}

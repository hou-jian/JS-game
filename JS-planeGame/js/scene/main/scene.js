class Scene extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        // 添加背景
        this.bg = new Bg(this.game)
        this.addElement(this.bg)

        // 添加玩家飞机
        this.player = new Player(this.game)
        this.addElement(this.player)
        
        // 批量添加敌机
        this.NumberOfEnemies = 5
        this.enemies()
        
    }
    enemies() {
        var es = []
        for (let i = 0; i < this.NumberOfEnemies; i++) {
            var e = new Enemy(this.game)            
            this.addElement(e)
            es.push(e)
        }
        this.enemies = es
    }
    update() {
        super.update()
    }


}
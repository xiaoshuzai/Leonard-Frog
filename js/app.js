// 这是我们的玩家要躲避的敌人
var Enemy = function(sprite,x,y,speed) {
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.speed = speed;
};

var enemy1 = new Enemy('images/enemy-bug.png',-1,parseInt(Math.random() * 6) + 1,parseInt(Math.random() * 2) + 1 * 400);
// 如上不起作用

// var Enemy = function(sprite,x,y,speed) {
//     // 要应用到每个敌人的实例的变量写在这里
//     // 我们已经提供了一个来帮助你实现更多
//
//     // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
//     this.sprite = 'images/enemy-bug.png';
//
// 	//敌人在第几行开始出现，放在主页面后头，不然是从中间冒出来的
// 	  this.x = -5;
// 	//敌人竖直方向位置 -- 石头中的每一行都能出现， +1 是为了避开河流那一行
// 	  this.y = parseInt(Math.random() * 6) + 1;
//   //调整敌人在 x 轴上的速度
// 	  this.speed = (parseInt(Math.random() * 2) + 1) * 300;
// };



// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x = this.x + dt * this.speed;
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y * 85 - 20);
};

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
var Player = function() {
	this.sprite = 'images/char-boy.png';
	//初始位置第3列
	this.x = 2;
	//初始位置第8行 -- 最下边那个草其实不是，只不过是装饰层
	this.y = 8;
};
// 此为游戏必须的函数，用来更新玩家的位置
Player.prototype.update = function(keyCode) {
	switch(keyCode) {
		case 'left':
			this.x > 0 ? this.x-- : '';
			break;
		case 'up':
			this.y > 0 ? this.y-- : '';
			if (this.y === 0) {
        alert('Win');
				player = new Player();
			}
			break;
		case 'right':
			this.x < 4 ? this.x++ : '';
			break;
		case 'down':
			this.y < 8 ? this.y++ : '';
			break;
	}
};
// 此为游戏必须的函数，用来在屏幕上画出玩家
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 80 - 20);

};
// 此为游戏必须的函数，用来处理键盘事件
Player.prototype.handleInput = function(keyCode) {
	this.update(keyCode);
};

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
var allEnemies = [];
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

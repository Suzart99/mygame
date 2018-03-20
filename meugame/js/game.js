window.onload = function(){

	game = new Phaser.Game(1220, 600, Phaser.AUTO, '',{
		preload: carregaAssets,
		create: criaCenario,
		update: atualizaJogo
	});

}

function carregaAssets(){
	game.load.image('fundo', 'assets/fundo.jpg');
	game.load.image('chao', 'assets/chao.png')
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
	game.load.image('inimigo', 'assets/inimigo.png');

}

function criaFundo(){
	game.add.sprite(0, 0, 'fundo');
}

function criaCenario(){
	criaFundo();
	plataformas = game.add.group();
	criaChao();
	criaJogador();
	game.physics.startSystem(Phaser.Physics.ARCADE);
	cursors = game.input.keyboard.createCursorKeys();

	//inimigos
	inimigos = game.add.group();
	inimigos.enableBody = true;
	criaInimigo();
	criaPlataforma();

}

function criaChao(){
	plataformas.enableBody = true;
	chao = plataformas.create(0, game.world.height -30, 'chao');
	chao.body.immovable = true;
	chao.scale.setTo(2, 1);

}

function criaJogador(){
	jogador = game.add.sprite(50, game.world.height -350, 'dude');
	game.physics.arcade.enable(jogador);
	jogador.body.bounce.y = 0.2;
	jogador.body.gravity.y = 1500;
	jogador.body.collideWorldBounds = true;

	jogador.animations.add('left', [0,1,2,3],10, true);
	jogador.animations.add('right', [5,6,7,8],10, true);
}

function criaInimigo(){
	inimigo = inimigos.create(200, 500, 'inimigo');
	inimigo.body.gravity.y = 1500;
	inimigo.body.collideWorldBounds = true;
}

function atualizaJogo(){
	game.physics.arcade.collide(jogador, plataformas);

	jogador.body.velocity.x = 0;
	if(cursors.left.isDown){
		jogador.body.velocity.x = -250;
		jogador.animations.play('left');
	}else if(cursors.right.isDown){
		jogador.body.velocity.x = 250;
		jogador.animations.play('right');
	}else{
		jogador.animations.stop();
		jogador.frame = 4;
	}
	if(cursors.up.isDown && jogador.body.touching.down){
		jogador.body.velocity.y = -650;
	}

	//inimigo
	game.physics.arcade.collide(inimigos, plataformas);
	aproximaInimigo();

	//colisão
	game.physics.arcade.overlap(jogador, inimigos, encostouInimigo);


}

function aproximaInimigo(){
	inimigo - inimigos.children[0];
	inimigo.body.velocity.x = 0;

	if(inimigo.position.x < jogador.body.position.x){
		inimigo.body.velocity.x += 100;

	}else{
		inimigo.body.velocity.x -= 100;
	}
}

function encostouInimigo(jogador, inimigo){
		jogador.kill();
		textojogo = game.add.text(game.camera.width/2 -150, game.camera.height/2, "Game Over")

}

function criaPlataforma(){
	plataforma1 = plataformas.create(0,440, 'chao');
	plataforma1.body.immovable = true;

	plataforma2 = plataformas.create(550,350, 'chao');
	plataforma2.body.immovable = true;

	plataforma3 = plataformas.create(750,270, 'chao');
	plataforma3.body.immovable = false;

	plataforma4 = plataformas.create(300,300, 'chao');
	plataforma4.body.immovable = true;

	plataforma5 = plataformas.create(250,400, 'chao');
	plataforma5.body.immovable = true;
}
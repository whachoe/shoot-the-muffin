var GameOverScene = enchant.Class.create(enchant.Scene, {
    // The main gameplay scene.
    initialize: function() {
        // 1 - Call superclass constructor
        Scene.apply(this);

        var gameoverimg = new Sprite(160, 115);
        gameoverimg.image = game.assets['img/game-over.jpg'];
        gameoverimg.x = 85;
        gameoverimg.y = 95;

        // ScoreLabel
        var scoreLabel = new ScoreLabel(10, 10);
        scoreLabel.score = game.score;
        this.addChild(scoreLabel);

        // On click: Start the game
        var titlescene = new TitleScene();
        gameoverimg.on("touchstart", function (){
            game.replaceScene(titlescene);
            game.assets['sounds/johnson-long-version.mp3'].stop();
        });
        this.addChild(gameoverimg);

        game.assets['sounds/johnson-long-version.mp3'].play();

	if (scoreLabel.score >= low_score ) {
        	var name = window.prompt('Highscore!!! Your name:');
        	$.get('highscore.php?name='+encodeURIComponent(name)+'&score='+encodeURIComponent(scoreLabel.score.toString()))
		.always(function () {
		$.getJSON('js/highscores.json', function (data) {
		    $("#highscores_inner").empty();
		    $.each(data.scores, function (key, score) {
                    $("#highscores_inner").append('<li><span style="width: 80px">'+score.name+'</span><span style="margin-left: 20px; width: 80px">'+score.score+'</span></li>');
            	    });
                });
        	});

	}

        // Space also starts the game
//        this.on(enchant.Event.A_BUTTON_DOWN, function(){
//            game.replaceScene(titlescene);
//        });

    }
});

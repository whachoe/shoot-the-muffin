var low_score = 0;

enchant();
window.onload = function() {
    possibleEnemies = [
        'img/muffins/muffin1.png', 
        'img/muffins/muffin2.png', 
        'img/muffins/muffin3.png',
        'img/muffins/muffin4.png',
        'img/muffins/muffin5.png' 
    ]

    $(document).ready(function () {
        $.getJSON('js/highscores.json', function (data) {
            $.each(data.scores, function (key, score) {
                $("#highscores_inner").append('<li><span style="width: 80px">'+score.name+'</span><span style="margin-left: 20px; width: 80px">'+score.score+'</span></li>');        
                low_score = score.score;
            });
	    if (data.scores.length < 10) low_score = 0;
        });
    });

    game = new Game(320,320);
    game.keybind(32, 'a');  // Spacebar linked to A-event. For shooting
    game.score = 0;

    // Image assets
    game.preload('img/apple.png', 'img/spaceship.png', 'img/icon0.png', 'img/muffins/jorik.png', 'img/effect0.png', 'img/game-over.jpg', 'img/start.png');
    game.preload(possibleEnemies);

    // Sound assets
    game.preload('sounds/laser.wav', 'sounds/shot5.wav', 'sounds/johnson-long-version.mp3', 'sounds/se4.wav');

    // Styling
    game.fps = 60;
    game.scale = 2;

    game.onload = function() {
        // Load the title screen
        var titlescreen = new TitleScene();
        game.pushScene(titlescreen);
    };

    game.start(); //Begin the game
    window.scrollTo(0, 0);
}


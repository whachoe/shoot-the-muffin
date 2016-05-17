<?php

$scores = file_get_contents('js/highscores.json');
$scores = json_decode($scores, true);

if (isset($_REQUEST['name']) && isset($_REQUEST['score'])) {
    $index = 0;
    while ($index < count($scores['scores']) && $scores['scores'][$index]['score'] > $_REQUEST['score']) {
        $index++;
    }

    if ($index == count($scores['scores'])) 
	$scores['scores'][] = array('name' => $_REQUEST['name'], 'score' => $_REQUEST['score']);
    else 
    	array_splice($scores['scores'], $index, 0, [array('name' => $_REQUEST['name'], 'score' => $_REQUEST['score'])]);

    file_put_contents('js/highscores.json', json_encode($scores));
} 

// Just return the list in javascript format
$new_scores = [];

for ($i=0; $i < 10; $i++) {
    if (isset($scores['scores'][$i]))
        $new_scores['scores'][] = $scores['scores'][$i];
}

echo json_encode($new_scores);

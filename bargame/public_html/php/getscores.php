<?php
require 'connect-db.php';
$topFiveAllTime = array();
$topFiveToday = array();
$sqlAllTime = "SELECT name, score FROM scores ORDER BY score DESC";
if ($results = $db->query($sqlAllTime)) {
    if ($numberOfRows = $results->num_rows) {
        $i = 0;
        while ($i < 5 && $i < $numberOfRows) {
            $row = $results->fetch_object();
            $topFiveAllTime[] = $row;
            $i++;
        }
        $results->free();
    }
}

$sqlToday = "SELECT name, score FROM scores WHERE DATE(date)=CURDATE() ORDER BY score DESC";

if ( $results = $db->query($sqlToday) ) {
    if ($numberOfRows = $results->num_rows){
        $i = 0;
        while ($i < 5 && $i < $numberOfRows) {
            $row = $results->fetch_object();
            $topFiveToday[] = $row;
            $i++;
        }
        $results->free();
    }
}

$numberToday = count($topFiveToday);
for ($i = $numberToday; $i < 5; $i++) {
    $topFiveToday[] = array('name' => '...', 'score' => '...');
}
$total = array($topFiveAllTime, $topFiveToday);
echo json_encode($total);
<?php
require 'connect-db.php';

$name = isset($_POST['name']) ? $_POST['name'] : 'name_not_set';
$score = isset($_POST['score']) ? $_POST['score'] : 100;
$command = "INSERT INTO scores (name, score, date) VALUES ('".$name."', '".$score."', NOW())";

$message = "";
if ($update = $db->query($command)){
    $message = "Your score has been recorded";
} else {
    $message = "There has been an error. Sorry";
}
echo $message;
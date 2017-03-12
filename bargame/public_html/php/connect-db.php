<?php
$servername = "localhost";
$username = "id1021638_bargamedude";
$password = "340909076";
$dbname ="id1021638_bargame_db";

$db = new mysqli($servername, $username, $password, $dbname);

if ($db->connect_errno){
    echo "hey there's an error";
}

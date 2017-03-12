<?php

$fileName = 'users.txt';

$startedNewSession = $_POST['newSession'] or exit("Could not find POST['newSession']");

$dataFile = fopen($fileName, 'r+') or exit("Could not find file " . $fileName);

if (!is_numeric(fgets($dataFile))) exit("Contents of file " . $fileName . "is not a number");

$currentNumber = intval(fgets($dataFile));

if ($startedNewSession) {
    echo $currentNumber;
    $currentNumber++;
}
else $currentNumber--;

fwrite($dataFile, $newNumber);
fclose($dataFile);



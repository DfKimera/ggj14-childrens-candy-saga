<?php
header("Access-Control-Allow-Origin: *");

$levelName = $_POST['levelName'];

$localFSPath = "C:/Workspace/GGJ14/trunk/assets/";

$path = $localFSPath . basename($levelName).".json";

echo file_get_contents($path);

exit();

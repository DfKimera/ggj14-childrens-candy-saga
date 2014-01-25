<?php
header("Access-Control-Allow-Origin: *");

$levelName = $_GET['levelName'];

$localFSPath = "C:/Workspace/GGJ14/trunk/assets/";

$path = $localFSPath . basename($levelName).".png";

header("Content-type: image/png");
echo file_get_contents($path);

exit();

<?php
header("Access-Control-Allow-Origin: *");

$levelName = $_POST['levelName'];
$json = $_POST['json'];

$localFSPath = "C:/Workspace/GGJ14/trunk/assets/";

$path = $localFSPath . basename($levelName).".json";

file_put_contents($path, $json);

die("STATUS_OK");

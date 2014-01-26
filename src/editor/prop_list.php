<?php
header("Access-Control-Allow-Origin: *");

$localFSPath = "C:/Workspace/GGJ14/trunk/src/editor/props/";

$rawFiles = scandir($localFSPath);
$files = array();

foreach($rawFiles as $file) {
	if($file != "." && $file != "..") {
		array_push($files, $file);
	}
}

die(json_encode($files));

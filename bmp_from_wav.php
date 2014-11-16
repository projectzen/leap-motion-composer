<?php
	require("class.bpm.php");
	$file = $_POST['file'];
	#$cmd = 'soundstretch stdin -bpm < '.$file;
	#echo $cmd;
	#echo exec($cmd);
	#echo "<pre>$output</pre>";
	$bpm_detect = new bpm_detect($file);
	echo $bpm_detect->detectBPM();
?>

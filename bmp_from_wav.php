<?php
	//$file = $_POST['file'];
	$output = shell_exec('soundstretch stdin -bpm <'+$file);
	echo "<pre>$output</pre>";
?>

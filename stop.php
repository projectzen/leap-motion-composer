<?php
$fields_string = "";
//url-ify the data for the POST
foreach($_POST as $key=>$value) { 
	$fields_string .= $key.'='.$value.'&'; 
}
$fields_string = rtrim($fields_string,'&');

function curl_request($url) {
	//open connection
	$ch = curl_init();

	//set the url, number of POST vars, POST data
	echo $url_speed;
	curl_setopt($ch,CURLOPT_URL,$url);
	curl_setopt($ch,CURLOPT_POST,count($_POST));
	curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
	curl_setopt($ch, CURLOPT_USERPWD, ":"."12345");

	//execute post
	$result = curl_exec($ch);

	//close connection
	curl_close($ch);
}

curl_request("http://localhost:8080/requests/status.xml?command=pl_pause");
?>

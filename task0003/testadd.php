<?php 
	
	if(empty($_POST['data'])){
		exit('<h1>缺少必要的参数!!!!</h1>');
	}

	header("Content-Type:application/json");

	$str=serialize($_POST['data']);
	
	file_put_contents('newdata.json',$str);
	
 ?>
<?php 
require_once('cheshi.php');
if(empty($_GET['id'])){
	exit('<h1>缺少必要的参数!!</h1>');
}

$id=$_GET['id'];
$res=select('select title,time,content
	from content
	where id='.$id);

$json=json_encode($res);
	// var_dump($json);
echo $json;
?>
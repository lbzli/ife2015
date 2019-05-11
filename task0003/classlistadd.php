<?php 

if(empty($_GET['list'])){
	exit('<h1>缺少必要参数</h1>');
}

$list=explode(',',$_GET['list']);
// var_dump($list);

$connection=mysqli_connect('localhost','root','123456','ife');
if(!$connection){
	die('<h1>链接失败！</h1>');
}

mysqli_set_charset($connection,'utf8');

mysqli_query($connection,"TRUNCATE TABLE classify");

foreach ($list as $key) {
	$result=mysqli_query($connection,"INSERT into classify(name) VALUES('".$key."')");
}



var_dump($result);
?>
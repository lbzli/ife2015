<?php 

//这个文件用来访问数据库。
//会根据请求的参数来查找数据并返回（在这里我将其指定只访问content 表）
//查询的内容和方式会根据status的状态来使用不同的查询，返回不同的数据。
require_once('cheshi.php');

if(empty($_GET['id'])){
	exit('缺少必要的参数');
}

$id=$_GET['id'];
$status=isset($_GET['status'])?$_GET['status']:0;



if($status!=0){
	$date=select('SELECT distinct time from content WHERE second_id='.$id.' and status='.$status);

	// foreach ($date as $item) {
	// 	$item.push(select("select * from content where time='".$item['time']."' and second_id=1"));
	// }

	for ($i=0; $i <count($date) ; $i++) { 
		$date[$i][]=select("select id,title from content where time='".$date[$i]['time']."' and second_id=".$id." and status=".$status);
	}
}else {
	$date=select('SELECT distinct time from content WHERE second_id='.$id);
	for ($i=0; $i <count($date) ; $i++) { 
		$date[$i][]=select("select id,title from content where time='".$date[$i]['time']."' and second_id=".$id);
	}
}

$json=json_encode($date);

echo $json;

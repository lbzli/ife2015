<?php 
	require_once('cheshi.php');

	if(empty($_GET['id'])){
		exit('缺少必要的参数');
	}

	$id=$_GET['id'];

	$date=select('SELECT distinct time from content WHERE second_id='.$id);

	// foreach ($date as $item) {
	// 	$item.push(select("select * from content where time='".$item['time']."' and second_id=1"));
	// }

	for ($i=0; $i <count($date) ; $i++) { 
		$date[$i][]=select("select id,title from content where time='".$date[$i]['time']."' and second_id=".$id);
	}
	$json=json_encode($date);

	echo $json;

<?php 

	function select($sql){
		$connection=mysqli_connect('localhost','root','123456','ife');
		if(!$connection){
			die('<h1>链接失败！</h1>');
		}

		mysqli_set_charset($connection,'utf8');
		$data=array();

		if($result=mysqli_query($connection,$sql)){
			while($row=mysqli_fetch_assoc($result)){
				$data[]=$row;
			}
			mysqli_free_result($result);
		}

		mysqli_close($connection);

		return $data;

	}

	// header('Content_Type:application/json');
	// echo ;
	// $res=select('SELECT NAME from classify');
	// $res[0][]=array('name');
	// var_dump($res); 
	// echo select('SELECT count(1) from content')[0][0];
	// 
	// SELECT NAME from classify
	// SELECT task_name from task
	// 
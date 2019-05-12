<?php 
	
	$str=file_get_contents('data.json');
	echo unserialize($str);
 ?>

<?php 
/**
 * 下面的代码实现了json数据的封装。
 * 将数据保存到了data.json.
 */

// $arr=array(
// 	array(
// 		"title"=>"IFE项目",
// 		"mainid"=>1,
// 		"subitem"=>array(
// 			array(
// 				"name"=>"task1",
// 				"center"=>array(
// 					array(
// 						"id"=>1,
// 						"ctitle"=>"to-do 1",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 1",
// 						"status"=>1
// 					),
// 					array(
// 						"id"=>2,
// 						"ctitle"=>"to-do 2",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 1",
// 						"status"=>1
// 					)
// 				)
// 			),
// 			array(
// 				"name"=>"task2",
// 				"center"=>array(
// 					array(
// 						"id"=>3,
// 						"ctitle"=>"to-do 3",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 1",
// 						"status"=>1
// 					)
// 				)
// 			)
// 		)
// 	),
// 	array(
// 		"title"=>"毕业设计",
// 		"mainid"=>2,
// 		"subitem"=>array(
// 			array(
// 				"name"=>"task1",
// 				"center"=>array(
// 					array(
// 						"id"=>4,
// 						"ctitle"=>"to-do 1",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 1",
// 						"status"=>1
// 					),
// 					array(
// 						"id"=>5,
// 						"ctitle"=>"to-do 2",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 2",
// 						"status"=>1
// 					)
// 				)
// 			),
// 			array(
// 				"name"=>"task2",
// 				"center"=>array(
// 					array(
// 						"id"=>6,
// 						"ctitle"=>"to-do 3",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 3",
// 						"status"=>1
// 					)
// 				)
// 			)
// 		)
// 	),
// 	array(
// 		"title"=>"社团活动",
// 		"mainid"=>3,
// 		"subitem"=>array(
// 			array(
// 				"name"=>"task1",
// 				"center"=>array(
// 					array(
// 						"id"=>7,
// 						"ctitle"=>"to-do 4",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 4",
// 						"status"=>1
// 					),
// 					array(
// 						"id"=>8,
// 						"ctitle"=>"to-do 5",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 5",
// 						"status"=>1
// 					)
// 				)
// 			),
// 			array(
// 				"name"=>"task2",
// 				"center"=>array(
// 					array(
// 						"id"=>9,
// 						"ctitle"=>"to-do 6",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 6",
// 						"status"=>1
// 					)
// 				)
// 			)
// 		)
// 	),
// 	array(
// 		"title"=>"家庭分类",
// 		"mainid"=>4,
// 		"subitem"=>array(
// 			array(
// 				"name"=>"task1",
// 				"center"=>array(
// 					array(
// 						"id"=>10,
// 						"ctitle"=>"to-do 7",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 7",
// 						"status"=>1
// 					),
// 					array(
// 						"id"=>11,
// 						"ctitle"=>"to-do 8",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 8",
// 						"status"=>1
// 					)
// 				)
// 			),
// 			array(
// 				"name"=>"task2",
// 				"center"=>array(
// 					array(
// 						"id"=>12,
// 						"ctitle"=>"to-do 9",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 9",
// 						"status"=>1
// 					)
// 				)
// 			)
// 		)
// 	),
// 	array(
// 		"title"=>"默认分类",
// 		"mainid"=>5,
// 		"subitem"=>array(
// 			array(
// 				"name"=>"task1",
// 				"center"=>array(
// 					array(
// 						"id"=>13,
// 						"ctitle"=>"to-do 10",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 10",
// 						"status"=>1
// 					),
// 					array(
// 						"id"=>14,
// 						"ctitle"=>"to-do 11",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 11",
// 						"status"=>1
// 					)
// 				)
// 			),
// 			array(
// 				"name"=>"task2",
// 				"center"=>array(
// 					array(
// 						"id"=>15,
// 						"ctitle"=>"to-do 12",
// 						"time"=>"2019-05-11",
// 						"center"=>"这是to-do 12",
// 						"status"=>1
// 					)
// 				)
// 			)
// 		)
// 	)
// );

// $json=json_encode($arr);
// $file=serialize($json);
// file_put_contents('data.json',$file);
?>
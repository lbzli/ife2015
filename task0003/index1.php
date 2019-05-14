<?php 
require('cheshi.php');

$classify=select('select *
	from classify');
	?>
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>个人管理页面</title>
		<link rel="stylesheet" href="http://ife.io:82/css/index.css" />
	</head>
	<body>
		<div class="box">
			<div class="head"></div>
			<div class="main">
				<div class="left">
					<p></p>
					<div class="list">
					</div>
					<div class="addlistbtn">
						新增分类
					</div>
				</div>
				<div class="center">
					<div class="center-head">
						<span class="click" data-status=0>所有</span>
						<span data-status=1>未完成</span>
						<span data-status=2>已完成</span>
					</div>
					<div class="center-main">
					</div>
					<div class="center-footer">
						新增任务
					</div>
				</div>
				<div class="right">
					
					<form action="" method="post">
						<label for=""><input type="text" class="title" disabled="disable" /></label>
						<label for=""><input type="text" class="data" disabled="disable" /></label>
						<label for=""><textarea name="" id="" cols="30" rows="10" class="edit" disabled="disable"></textarea></label>
					</form>
				</div>
			</div>
			<div class="mark">
				<div class="addlist">
					<form action="">
						<label for="">
							<input type="text" name="addlist" id="" placeholder="请输入分类的名称" />
						</label>
						<button type="button">提交</button>
						<button type="button">取消</button>
					</form>
				</div>
			</div>
		</div>
		<script src="/js/index.js"></script>
		<script>
			onload=function(){
				get('get','read.php',{id:1},init);
			}

			
			

		

			
			
		</script>
	</body>
	</html>
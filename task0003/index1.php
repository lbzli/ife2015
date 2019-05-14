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
						<span>完成</span><span>编辑</span>
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

			(function(){
				var spanlist=document.querySelectorAll('.center-head span');
				for(var i=0;i<spanlist.length;i++){
					spanlist[i].onclick=obj.scree;
				}
			}());
			

			(function(){

				var addable=document.querySelector('.center-footer');
				addable.onclick=function(){
					var selected=document.querySelector('.list .yellow');
					var cselected=document.querySelector('.center-main .yellow');
					if(selected&&selected.tagName=="LI"&&!cselected){
						var input=document.querySelectorAll('.right input');
						for(var i=0;i<input.length;i++){
							input[i].disabled="";
						}
						input[0].setAttribute("placeholder","您可以添加新的任务了,请在这里输入标题。");
						input[1].setAttribute("placeholder","请在这里输入日期，格式为：xxxx-xx-xx");
						document.querySelector('.right textarea').disabled="";
						document.querySelector('.right textarea').setAttribute("placeholder","您可以在这里输入内容。");
						document.querySelector('.right span').onclick=addtask;
					}
				}

				function addtask(){
					var selected=document.querySelector('.list .yellow');
					var cselected=document.querySelector('.center-main .yellow');
					var x_coord;
					var y_coord;
					if(selected&&selected.tagName=="LI"&&!cselected){
						x_coord=selected.getAttribute('data-mainid');
						y_coord=selected.getAttribute('data-id');

						var addobj={
							id:Date.now(),
							ctitle:document.querySelectorAll('.right input')[0].value,
							time:document.querySelectorAll('.right input')[1].value,
							center:document.querySelector('.right textarea').value,
							status:1
						}
						get('get','read.php',{},function(res){
							res=JSON.parse(res);
							res[x_coord]['subitem'][y_coord]['center'].push(addobj);
							res=JSON.stringify(res);
							get('post','testadd.php',{data:res});
							location.reload();
						})
					}
				}
			}());

			
			
		</script>
	</body>
	</html>
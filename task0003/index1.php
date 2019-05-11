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
					<p>所有任务(<?php echo select('SELECT count(1) as count from content')[0]['count'] ?>)</p>
					<div class="list">
						分类列表
						<ul>
							<?php foreach ($classify as $item ): ?>
								<?php //这里使输出项目的名字和其内容的数量 ?>
								<li data-mainid=<?php echo $item['main_id']; ?>><i><?php echo $item['name']; ?></i> (<?php echo select('SELECT count(1) as count from content WHERE main_id='.$item['main_id'])[0]['count']; ?>)<span><a href="#">删除</a></span>
									<?php  //这里查询的是小任务的名字和其内容的数量（下面那行先获取全部task的信息）?>
									<?php $task=select('select * from task where main_id='.$item['main_id']) ?>
									<ul>									
										<?php foreach ($task as $key): ?>
											<li data-id=<?php echo $key['second_id']; ?>><?php echo $key['task_name']; ?>（<?php echo select('SELECT count(1) as count from content WHERE second_id='.$key['second_id'])[0]['count']; ?>）</li>
										<?php endforeach ?>
									</ul>
								</li>
							<?php endforeach ?>
						</ul>
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
						<?php $time=select('SELECT distinct time from content WHERE second_id=1') ?>
						<?php foreach ($time as $item): ?>
							<ul>
								<?php echo $item['time']; ?>
								<?php $content=select("select * from content where time='".$item['time']."' and second_id=1") ?>
								<?php foreach ($content as $key): ?>
									<li><?php echo $key['content']; ?></li>
								<?php endforeach ?>
							</ul>
						<?php endforeach ?>
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
						<button type="submit">提交</button>
						<button type="button">取消</button>
					</form>
				</div>
			</div>
		</div>
		<script src="/js/index.js"></script>
		<script>
			var list=document.querySelectorAll('.list li>ul>li');
			var spanlist=document.querySelectorAll('.center-head span');
			for(var i=0;i<list.length;i++){
				list[i].onclick=obj.click;
			}
			for(var i=0;i<spanlist.length;i++){
				spanlist[i].onclcik=obj.scree;
			}

			var list=document.querySelectorAll('.list li>ul>li');
			for(var i=0;i<list.length;i++){
				list[i].addEventListener('click',function(){
					
					for(var j=0;j<list.length;j++){
						list[j].classList.remove('yellow');
					}
					this.classList.add('yellow');
				});
			}

			var center_list=document.querySelectorAll('.center-main ul>li');
			for(var i=0;i<center_list.length;i++){
				center_list[i].addEventListener('click',function(){
					for(var j=0;j<center_list.length;j++){
						center_list[j].classList.remove('yellow');
					}
					this.classList.add('yellow');
				});
			}
		</script>
	</body>
	</html>
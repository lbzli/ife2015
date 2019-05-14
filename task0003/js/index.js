//get  一个Ajax请求
/**
  * [get 封装一个Ajax请求,这个会是一个公共的方法]
  * @param  {[type]}   method [请求方式]
  * @param  {[type]}   url    [请求的地址]
  * @param  {[type]}   parms  [请求的参数]
  * @param  {Function} done   [回调函数]
  */
  function get(method,url,parms,done){
  	method=method.toUpperCase();
  	done=done?done:function(res){};
  	var data=new Array();
  	for (key in parms) {
  		data.push(key+"="+parms[key])
  	}
  	var query=data.join("&");

  	var xhr=XMLHttpRequest?new XMLHttpRequest():new ActiveXObject();

  	xhr.onreadystatechange=function() {
  		if(xhr.readyState==4){
  			if(data.length>=2){
  				done(xhr.responseText,data);
  			}else if(done.name=="done2"){
  				done(xhr.responseText,parms['id']);
  			}else {
  				done(xhr.responseText);
  			}
  			
  		}
  	}
  	if(method=='GET'){
  		url+='?'+query;
  	}
  	var data2=null;
  	xhr.open(method, url);
  	if(method=="POST"){
  		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  		data2=query;
  	}
  	
  	xhr.send(data2);
  }

//del  分类部分的删除功能
/**
   * [del 这个是分类部分的删除功能，可以删除大的分类，也可以删除其二级目录]
   */
   function del(){
   	var parent=this.parentElement;
   	if(parent.tagName=="H4"){
   		if(parent.innerText.indexOf("默认分类")==-1){
   			get('get','read.php',{},function(res){
   				res=JSON.parse(res);
   				res.splice(parent.getAttribute('data-mainid'), 1);
   				res=JSON.stringify(res);
   				get('post','testadd.php',{data:res});
   			})
   		}
   		
   	}else if(parent.tagName=="LI"){
   		get('get','read.php',{},function(res){
   			res=JSON.parse(res);
   			res[parent.getAttribute('data-mainid')]['subitem'].splice(parent.getAttribute('data-id'), 1);
   			res=JSON.stringify(res);
   			get('post','testadd.php',{data:res});
   		})
   	}
   	console.log(this.parentElement.getAttribute('data-mainid'));
   	location.reload();
   	return false;
   }
   function cdel(){
   	var parent=this.parentElement;
   	var x_coord,y_coord,z_coord;
   	x_coord=parent.getAttribute('data-mainid');
   	y_coord=parent.getAttribute('data-id');
   	z_coord=parent.getAttribute('data-lcid');
   	get('get','read.php',{},function(res){
   		res=JSON.parse(res);
   		var search_data=res[x_coord]['subitem'][y_coord]['center'];
   		for(var i=0;i<search_data.length;i++){
   			if(search_data[i].id==z_coord){
   				z_coord=i;
   				break;
   			}
   		}
   		res[x_coord]['subitem'][y_coord]['center'].splice(z_coord, 1);
   		res=JSON.stringify(res);
   		get('post','testadd.php',{data:res});
   	})
   	location.reload();
   	return false;
   }
//init  页面初始化
/**
   * [init 页面初始化的函数，这个会作为一个回调函数来使用]
   * @param  {[type]} res [这个是响应过来的JSON数据]
   */
   function init(res){
   	var res=JSON.parse(res);
   	var result=""
   	var subitem;

	   	//使用这两个变量的原因是因为，在查找的时候直接使用索引会跟快的锁定目标（不这样，还要使用indexOf来判断位置）.
	   	//像这样直接可以使用索引的方式找到我们想要的。
	   	var nummain=0;
	   	var num;

	   	function maincount(){
	   		var count=0;
	   		for (key in res) {
	   			for (sub in res[key]['subitem']) {
	   				for (cnum in res[key]['subitem'][sub]['center']){
	   					count++;
	   				}
	   			}
	   		}
	   		return count;
	   	}

	   	function licount(key){
	   		var count=0;
	   		for (sub in res[key]['subitem']) {
	   			for (cnum in res[key]['subitem'][sub]['center']){
	   				count++;
	   			}
	   		}
	   		return count;
	   	}

	   	function taskcount(key,sub){
	   		var count=0;
	   		for (cnum in res[key]['subitem'][sub]['center']){
	   			count++;
	   		}
	   		return count;
	   	}
	   	document.querySelector('.left>p').innerHTML="所有任务（"+maincount()+"）";
	   	result="<h3>分类列表</h3>"
	   	for (key in res) {
	   		num=0;	
	   		result+="<ul><h4 data-mainid="+nummain+">"+res[key]['title']+" ("+licount(nummain)+")<a href='#'>X</a></h4>"
	   		subitem=res[key]['subitem'];
	   		for (item in subitem) {
	   			result+="<li data-mainid="+nummain+" data-id="+num+">"+subitem[item]['name']+"("+taskcount(nummain,num)+")<a href='#'>X</a></li>";
	   			num++;
	   		}
	   		result+="</ul>";
	   		nummain++;
	   	}
	   	document.querySelector('.list').innerHTML=result;
	   	var list=document.querySelectorAll('.list ul>li');
	   	for(var i=0;i<list.length;i++){
	   		list[i].onclick=obj.click;
	   	}
	   	var list=document.querySelectorAll('.list h4,li');
	   	for(var i=0;i<list.length;i++){
	   		list[i].addEventListener('click',function(){
	   			for(var j=0;j<list.length;j++){
	   				list[j].classList.remove('white');
	   			}
	   			this.classList.add('white');
	   		});
	   	}

	   	var alist=document.querySelectorAll('.list a');
	   	for(var i=0;i<alist.length;i++){
	   		alist[i].onclick=del;
	   	}
	   }

//done  处理center div的内容
/**
 * [done 这个函数会动态的处理center div的内容，作为一个回调函数来使用。]
 * @param  {[string]}   res [这个是响应体的内容]
 */
 function done(res,data){
 	res=JSON.parse(res);
 	var main_id=data[0].split('=')[1];
 	var id=data[1].split('=')[1];
 	var status=data[2]?data[2].split('=')[1]:0;
 	var result="";
	// console.log(res[main_id]['subitem'][id]['center']);
	
	var newdata=res[main_id]['subitem'][id]['center'];
	var datastr=new Array();
	datastr.push(newdata[0]['time']);
	for (key in newdata) {
		if(datastr.indexOf(newdata[key]['time'])==-1){
			datastr.push(newdata[key]['time']);
		}
	}
	datastr.sort();

	if(status==undefined||status==0){
		for (key in datastr) {
			result+="<ul><h4>"+datastr[key]+"</h4>";
			for (item in newdata) {
				if(newdata[item]['time']==datastr[key]){
					result+="<li onclick=obj.browse("+newdata[item]['id']+") data-mainid="+main_id+" data-id="+id+" data-lcid="+newdata[item]['id']+" data-status="+newdata[item]['status']+">"+newdata[item]['ctitle']+"<a href='#'>X</a></li>";
				}
			}
			result+="</ul>";
		}
	}else {
		for (key in datastr) {
			result+="<ul><h4>"+datastr[key]+"</h4>";
			for (item in newdata) {
				if(newdata[item]['time']==datastr[key]&&newdata[item]['status']==status){
					result+="<li onclick=obj.browse("+newdata[item]['id']+") data-mainid="+main_id+" data-id="+id+" data-lcid="+newdata[item]['id']+" data-status="+newdata[item]['status']+">"+newdata[item]['ctitle']+"<a href='#'>X</a></li>";
				}
			}
			result+="</ul>";
		}
	}

	

	document.querySelector('.center-main').innerHTML=result;
	var list=document.querySelectorAll('.center-main ul>li');
	for(var i=0;i<list.length;i++){
		list[i].addEventListener('click',function(){
			for(var j=0;j<list.length;j++){
				list[j].classList.remove('hui');
			}
			this.classList.add('hui');
		});
	}

	var alist=document.querySelectorAll('.center-main a');
	for(var i=0;i<alist.length;i++){
		alist[i].onclick=cdel;
	}
}

//done2 处理right div里的内容
/**
 * [done2 这个函数会动态的处理right div里的内容，作为一个回调函数来使用。]
 * @param  {[string]} res [这个是响应体的内容]
 */
 function done2(res,id){
 	res=JSON.parse(res);
 	var data=null;
 	for (key in res) {
 		for (sub in res[key]['subitem']) {
 			for (cnum in res[key]['subitem'][sub]['center']) {
 				if(res[key]['subitem'][sub]['center'][cnum]['id']==id){
 					data=res[key]['subitem'][sub]['center'][cnum];
 					break;
 				}
 			}
 			if(data!=null){break;}
 		}
 		if(data!=null){break;}
 	}
 	var result="";

 	console.log(data['status']);
 	if(data['status']==1){
 		result+="<span>完成</span><span>编辑</span>";
 		result+="<label for=''><input type='text' class='title' name='title' value='"+data['ctitle']+"' disabled='disabled'/></label>"
 		result+="<label for=''><input type='text' class='data' name='data' value='"+data['time']+"' disabled='disabled'/></label>"
 		result+="<label for=''><textarea name='' id='' name='conten' cols='30' rows='10' class='edit' disabled='disabled'>"+data['center']+"</textarea></label>"
 	}else {
 		result+="<label for=''><input type='text' class='title' name='title' value='"+data['ctitle']+"' disabled='disabled'/></label>"
 		result+="<label for=''><input type='text' class='data' name='data' value='"+data['time']+"' disabled='disabled'/></label>"
 		result+="<label for=''><textarea name='' id='' name='conten' cols='30' rows='10' class='edit' disabled='disabled'>"+data['center']+"</textarea></label>"
 	}

 	
 	document.getElementsByClassName('right')[0].getElementsByTagName('form')[0].innerHTML=result;

 	//下面是关于修改和更新数据的。
 	if(document.querySelectorAll('.right span').length!=0){
 		var editbtn=document.querySelectorAll('.right span')[1];
 		editbtn.onclick=function(){

 			var input=document.querySelectorAll('.right input');
 			for(var i=0;i<input.length;i++){
 				input[i].disabled="";
 			}
 			document.querySelector('.right textarea').disabled="";
 		}
 		var complete=document.querySelector('.right span');
 		complete.onclick=function(){
 			var cselected=document.querySelector('.center-main .hui');
 			var x_coord,y_coord,z_coord;
 			x_coord=cselected.getAttribute('data-mainid');
 			y_coord=cselected.getAttribute('data-id');
 			z_coord=cselected.getAttribute('data-lcid');
 			var search_data=res[x_coord]['subitem'][y_coord]['center'];
 			for(var i=0;i<search_data.length;i++){
 				if(search_data[i].id==z_coord){
 					z_coord=i;
 					break;
 				}
 			}
 			
 			//使用flag来获取disabled的值。就是判断是否是要修改数据，还是只是要改变状态。
 			var inputlist=document.querySelectorAll('.right input');
 			var flag=inputlist[0].disabled;//disabled的值为true表示无法修改。
 			if(flag){
 				res[x_coord]['subitem'][y_coord]['center'][z_coord]['status']=2;
 			}else {
 				res[x_coord]['subitem'][y_coord]['center'][z_coord]['ctitle']=inputlist[0].value;
 				res[x_coord]['subitem'][y_coord]['center'][z_coord]['time']=inputlist[1].value;
 				res[x_coord]['subitem'][y_coord]['center'][z_coord]['center']=document.querySelector('.right textarea').value;
 			}
 			// console.log(res[x_coord]['subitem'][y_coord]['center'][z_coord]);
 			res=JSON.stringify(res);
 			get('post','testadd.php',{data:res});
 			location.reload();
 		}
 	}
 }

//addlist  先把东西添加到页面，然后再修改数据。添加新分类函数
/**
 * [addlist 添加新分类函数]
 */
 function addlist(){
 	var inputstr=document.querySelector(".addlist input").value;
 	var selected=document.querySelector(".list .white");
 	if(!selected){
 		selected=document.querySelector('.list')
 		var newobj=document.createElement("ul");
 		newobj.innerText=inputstr;
 		selected.append(newobj);
 		// var x_coord=selected.getAttribute("data-mainid");
		// var y_coord=selected.getAttribute("data-id");
		var id=Date.now();
		var addobj={
			title:inputstr,
			mainid:id,
			subitem:[]
		};
		get('get','read.php',{},function(res){
			res=JSON.parse(res);
			res.push(addobj);
			res=JSON.stringify(res);
			get('post','testadd.php',{data:res});
			location.reload();
		})
	}else if(selected.tagName=="H4"){
		var newobj=document.createElement("li");
		newobj.innerText=inputstr;
		selected.parentElement.append(newobj);
		var x_coord=selected.getAttribute("data-mainid");
		// var y_coord=selected.getAttribute("data-id");

		var id=Date.now();
		var addobj={
			name:inputstr,
			center:[]
		};
		get('get','read.php',{},function(res){
			res=JSON.parse(res);
			res[x_coord]['subitem'].push(addobj);
			res=JSON.stringify(res);
			get('post','testadd.php',{data:res});
			location.reload();
		})
	}else if(selected.tagName=="LI"){

	}
}

//第一次使用单列模式
//功能是将点击事件封装，并且使用闭包来维护变量
//click 函数的功能使点击左边的那些列表内容发送第一次Ajax请求，将其对于的那些内容渲染到中间的那个列表里面。
//scree 函数的功能是点击实现数据的筛选。
/**
 * [这个类是使用单列模式生成的。会包含3个点击事件的函数（click，scree，browse），这些函数共同使用其内部的变量]
 * @param  {Object} ){	var data_id;	var  method;	var url;	var parms;	var object [description]
 * @return {[Object]}         [返回内部封装好的那个Object]
 */
 var obj=(function(){
 	var data_id;
 	var method;
 	var url;
 	var parms;
 	var object={};

 	object.click=function () {
 		data_id=this.getAttribute('data-id');
 		data_mainid=this.getAttribute('data-mainid');
 		method='get';
 		url='read.php';
 		parms={
 			mainid:data_mainid,
 			id:data_id
 		};
 		get(method,url,parms,done);
 	}
 	object.scree=function(){
 		spanlist=document.querySelectorAll('.center-head span');
 		for(var i=0;i<spanlist.length;i++){
 			spanlist[i].classList.remove("click");
 		}
 		this.classList.add("click");
 		
		// console.log(method,url,parms);
		if(url!=null){
			parms.status=this.getAttribute('data-status');
			get(method,url,parms,done);
		}
		
	}
	object.browse=function(id){
		// console.log(id);
		data_id=id;
		method='get';
		url='read.php';
		var bparms={
			id:data_id
		};
		get(method,url,bparms,done2);
	}
	return object;
})();

//一些页面的事件函数。
(function(){
 	/**
 	* 为添加按钮添加点击事件
 	* 这个按钮位于左边的div的下面。
 	*/
 	var mark=document.querySelector(".mark");
 	var btn=document.querySelectorAll(".mark button");
 	function show() {
 		mark.style.display ="block";
 	}
 	function hidden() {
 		mark.style.display = "none";
 	}
 	for(var i=0;i<btn.length;i++){
 		btn[i].onclick=hidden;
 	}
 	btn[0].addEventListener('click', addlist);
 	document.querySelector(".addlistbtn").onclick=show;

 	/**
 	* 为每一个删除按钮添加事件。
 	* 这些按钮是位于左边的列表里面的
 	*/
 	function mydelete(){
 		var message=confirm("您确定要删除这个分类？");
 		if(!message){
 			return false;
 		}
 	}
 	var alist=document.querySelectorAll(".list a");
 	for(var i=0;i<alist.length;i++){
 		alist[i].onclick=mydelete;
 	}
 })();


 (function(){
 	var spanlist=document.querySelectorAll('.center-head span');
 	for(var i=0;i<spanlist.length;i++){
 		spanlist[i].onclick=obj.scree;
 	}
 }());


 (function(){

 	var addable=document.querySelector('.center-footer');
 	addable.onclick=function(){
 		var selected=document.querySelector('.list .white');
 		var cselected=document.querySelector('.center-main .hui');
 		document.querySelector('.right form').innerHTML="<span>完成</span><label for=''><input type='text' class='title' disabled='disable' /></label><label for=''><input type='text' class='data' disabled='disable' /></label><label for=''><textarea name=' id=' cols='30' rows='10' class='edit' disabled='disable'></textarea></label>";

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
 		var selected=document.querySelector('.list .white');
 		var cselected=document.querySelector('.center-main .hui');
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
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
	   		result+="<ul><h4 data-mainid="+nummain+">"+res[key]['title']+" ("+licount(nummain)+")</h4>"
	   		subitem=res[key]['subitem'];
	   		for (item in subitem) {
	   			result+="<li data-mainid="+nummain+" data-id="+num+">"+subitem[item]['name']+"("+taskcount(nummain,num)+")</li>";
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
	   	var list=document.querySelectorAll('.list ul>li');
	   	for(var i=0;i<list.length;i++){
	   		list[i].addEventListener('click',function(){
	   			for(var j=0;j<list.length;j++){
	   				list[j].classList.remove('yellow');
	   			}
	   			this.classList.add('yellow');
	   		});
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

	if(status==undefined||status==0){
		for (key in datastr) {
			result+="<ul><h4>"+datastr[key]+"</h4>";
			for (item in newdata) {
				if(newdata[item]['time']==datastr[key]){
					result+="<li  onclick=obj.browse("+newdata[item]['id']+") data-id="+newdata[item]['id']+">"+newdata[item]['ctitle']+"</li>";
				}
			}
			result+="</ul>";
		}
	}else {
		for (key in datastr) {
			result+="<ul><h4>"+datastr[key]+"</h4>";
			for (item in newdata) {
				if(newdata[item]['time']==datastr[key]&&newdata[item]['status']==status){
					result+="<li onclick=obj.browse("+newdata[item]['id']+") data-id="+newdata[item]['id']+">"+newdata[item]['ctitle']+"</li>";
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
				list[j].classList.remove('yellow');
			}
			this.classList.add('yellow');
		});
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
 	result+="<label for=''><input type='text' class='title' name='title' disabled='disable' value='"+data['ctitle']+"'/></label>"
 	result+="<label for=''><input type='text' class='data' name='data' disabled='disable' value='"+data['time']+"'/></label>"
 	result+="<label for=''><textarea name='' id='' name='conten' cols='30' rows='10' class='edit' disabled='disable'>"+data['center']+"</textarea></label>"
 	document.getElementsByClassName('right')[0].getElementsByTagName('form')[0].innerHTML=result;
 }

//先把东西添加到页面，然后再修改数据。
/**
 * [addlist 添加新分类函数]
 */
 function addlist(){
	var inputstr=document.querySelector(".addlist input").value;
	var selected_li=document.querySelector(".list .yellow");
	var newobj=document.createElement("li")
	newobj.innerText=inputstr;
	selected_li.insertAdjacentElement("afterend",newobj);

	var x_coord=selected_li.getAttribute("data-mainid");
	var y_coord=selected_li.getAttribute("data-id");
	var addobj={
		name:inputstr,
		center:[]
	};
	get('get','read.php',{},function(res){
		res=JSON.parse(res);
		res[x_coord]['subitem'].splice(y_coord+1, 0, addobj);
		res=JSON.stringify(res);
		get('post','testadd.php',{data:res});
	})
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
 		parms.status=this.getAttribute('data-status');
		// console.log(method,url,parms);
		get(method,url,parms,done);
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

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
 


 /**
  * 封装一个Ajax请求
  * 这个会是一个公共的方法
  */
  function get(method,url,parms,done){
  	method=method.toUpperCase();
  	var data=new Array();
  	for (key in parms) {
  		data.push(key+"="+parms[key])
  	}
  	var query=data.join("&");

  	var xhr=XMLHttpRequest?new XMLHttpRequest():new ActiveXObject();

  	xhr.onreadystatechange=function() {
  		if(xhr.readyState==4){
  			done(xhr.responseText);
  		}
  	}
  	if(method=='GET'){
  		url+='?'+query;
  	}
  	var data2=null;
  	if(method=="POST"){
  		xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  		data2=query;
  	}
  	xhr.open(method, url);
  	xhr.send(data2);
  }


/**
 * [done 这个函数会动态的处理center div的内容]
 * @param  {[string]}   res [这个是响应体的内容]
 */
 function done(res){
 	res=JSON.parse(res);
	//测试用的代码用来检测查看返回来的数据
	// console.log(res);
	var result="";
	var result2="";

	for (item in res) {
		result+="<ul>"+res[item]['time'];
		result2="";
		// console.log(res[item]['time']);
		// console.log(res[item][0][0]);
		// console.log(res[item][0][1]);
		for (key in res[item][0]) {
			result2+="<li onclick='obj.browse("+res[item][0][key]['id']+")' data-id="+res[item][0][key]['id']+">"+res[item][0][key]['title']+"</li>";

			// console.log(res[item][0][key]['title']);
		}
		result+=result2;
		result+="</ul>";
	}

	document.getElementsByClassName("center-main")[0].innerHTML=result;
}



/**
 * [done2 这个函数会动态的处理right div里的内容]
 * @param  {[string]} res [这个是响应体的内容]
 */
 function done2(res){
	// console.log(res);
	res=JSON.parse(res);
	var result="";
	result+="<label for=''><input type='text' class='title' name='title' disabled='disable' value='"+res[0]['title']+"'/></label>"
	result+="<label for=''><input type='text' class='data' name='data' disabled='disable' value='"+res[0]['time']+"'/></label>"
	result+="<label for=''><textarea name='' id='' name='conten' cols='30' rows='10' class='edit' disabled='disable'>"+res[0]['content']+"</textarea></label>"
	document.getElementsByClassName('right')[0].getElementsByTagName('form')[0].innerHTML=result;
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
 		method='get';
 		url='select_task.php';
 		parms={
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
			url='centent.php';
			parms={
				id:data_id
			};
			get(method,url,parms,done2);
		}
		return object;
	})();





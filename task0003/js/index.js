/**
 * 为每一个删除按钮添加事件。
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

/**
 * 为添加按钮添加点击事件
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
  * 封装一个Ajax请求
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
				result2+="<li data-id="+res[item][0][key]['id']+">"+res[item][0][key]['title']+"</li>";

				// console.log(res[item][0][key]['title']);
			}
			result+=result2;
			result+="</ul>";
		}

		document.getElementsByClassName("center-main")[0].innerHTML=result;
	}

//第一次使用单列模式
//功能是将点击事件封装，并且使用闭包来维护变量
//click 函数的功能使点击左边的那些列表内容发送第一次Ajax请求，将其对于的那些内容渲染到中间的那个列表里面。
//scree 函数的功能是点击实现数据的筛选。
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
		return object;
	})();





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
  	console.log(res);
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


function click() {
	var data_id=this.getAttribute('data-id');
	var method='get';
	var url='select_task.php';
	var parms={
		id:data_id
	};
	get(method,url,parms,done);
}
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
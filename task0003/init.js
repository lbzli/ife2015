function init(res){
	var res=JSON.parse(res);
	var result=""
	var subitem;
	var num;
	// res[0]//ife的对象.
	// res[0]['title']//ife的名字。
	// res[0]['subitem'][0]['name']//task1

	for (key in res) {
		num=0;
		result+="<ul><h3>"+res[key]['title']+"</h3>"
		subitem=res[key]['subitem'];
		for (item in subitem) {
			num++;
			
			result+="<li data-id="+num+">"+subitem[item]['name']+"</li>";
		}
		result+="</ul>";
	}
	document.querySelector('.list').innerHTML=result;
}
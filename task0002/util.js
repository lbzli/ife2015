// 判断arr是否为一个数组，返回一个bool值
function isArray(arr){
    return arr.constructor===Array?true:false;
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn){
    return fn.constructor===Function?true:false;
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src){
    var newsrc;

    if(src.constructor===Number||src.constructor===String||src.constructor===Boolean){
        newsrc=src;
        return newsrc;
    }

    if(src.constructor===Date){
        newsrc=new Date(src);
        return newsrc;
    }

    if(src.constructor===Array){
        newsrc=new Array();
        for(var i=0;i<src.length;i++){
            newsrc[i]=cloneObject(src[i]);
        }
        return newsrc;
    }

    if(src.constructor===Object){
        newsrc=new Object();
        for(item in src){
            newsrc[item]=cloneObject(src[item]);
        }
        return newsrc;
    }
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr){
    for(var i=0;i<arr.length;i++){
        //从后面开始查找看一下找出来的那个元素的下表是否和
        //当前元素的下标相同，如果不同就表示是另外的一个相同的
        //元素，那我们就删除那个元素
        if(arr.lastIndexOf(arr[i])!=i){
            //删除那个元素
            arr.splice(arr.lastIndexOf(arr[i]),1)
            //重新对当前下标进行查找
            i--;
        }
    }
    return arr;
}

// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str){
    var newstr;
    var i,j;
    for(i=0;i<str.length;i++){
        if(str.charAt(i)!=' ')break;
    }
    for(j=str.length-1;j>=0;j--){
        if(str.charAt(j)!=' ')break;
    }
    // str.length-(i,str.length-1-j);
    // str.length-i-str.length+1+j;
    // j-i+1
    newstr=str.substr(i,(j-i+1));
    return newstr;
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr,fn){
    for(var i=0;i<arr.length;i++){
        fn(arr[i],i);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj){
    var i=0;
    for(item in obj){
        i++;
    }
    return i;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var arr = element.getAttribute('class').split(' ');
    arr.push(newClassName);
    element.setAttribute("class", arr.join(' '));
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var arr = element.getAttribute('class').split(' ');
    arr.pop(arr.indexOf(oldClassName));
    element.setAttribute('class', arr.join(' '));
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode == siblingNode.parentNode ? true : false;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var obj = {};
    obj.x = element.offsetLeft;
    obj.y = element.offsetTop;
    return obj;
}

// 可以通过id获取DOM对象，通过#标示，例如
//$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
//$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
//$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
//$("[data-log]"); // 返回第一个包含属性data-log的对象

//$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
//$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
function $(selector) {
    selector.trim();
    var selectorarr = new Array();
    if (selector.indexOf(' ') > 0) {
        selectorarr = selector.split(' ');
    } else {
        selectorarr.push(selector);
    }
    var targetObj = document;
    for (var i = 0; i < selectorarr.length; i++) {
        targetObj = search.apply(targetObj,[selectorarr[i]]);
    }
    return targetObj;
    function search(selector) {
        if (selector.charAt(0) == '#') {
            return this.getElementById(selector.substring(1));
        }

        if (selector.charAt(0) == '.') {
            return this.getElementsByClassName(selector.substring(1))[0];
        }

        if (selector.charAt(0) == '[') {
            //document.getElementsByTagName('body')[0].getElementsByTagName('*')[0].getAttribute('');
            // null
            // document.getElementsByTagName('body')[0].getElementsByTagName('*')[0].getAttribute('id');
            // "father"
            var target = selector.substring(1, selector.length - 1);
            var targetarr = target.split('=');
            var all = this.getElementsByTagName('*');
            for (var i = 0; i < all.length; i++) {
                if (all[i].getAttribute(targetarr[0]) === targetarr[1]||all[i].getAttribute(targetarr[0])!=null) {
                    return all[i];
                }
            }
        }

        return this.getElementsByTagName(selector)[0];
    }

}

/**
 * 给一个元素绑定一个针对event事件的响应，响应函数为监听器
 */
function addEvent(element, event, listener) {
    element.addEventListener(event, listener);
}

//移除元素对象对于事件事件发生时执行监听器的响应
function removeEvent(element, event, listener) {
    element.removeEventListener(event, listener);
}

//实现对click事件的绑定
function addClickEvent(element, listener) {
    element.addEventListener('click', listener);
}

//实现对于按输入键时的事件绑定
function addEnterEvent(element, listener) {
    onkeydown = function (e) {
        if (e.keyCode == 13) {
            element.addEventListener('click', listener);
        }
    }
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var arr = navigator.appVersion.split(' ');
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf('MSIE') != -1) {
            return arr[i];
        }
    }
    return -1;
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = cookieName + '=' + cookieValue + ((expriedays = null) ? '' : ';expires=' + date.toGMTString());
}

// 获取cookie值
function getCookie(cookieName){
    var strarr=document.cookie.split(' ');
    for(var i=0;i<strarr.length;i++){
        if(strarr[i].indexOf(cookieName)!=-1){
            return strarr[i];
        }
    }
    return '';
}

function ajax(method, url, params, done) {
    method = method.toUpperCase();
    var pairs = [];
    for (var key in params) {
        pairs.push(key + "=" + params[key]);
    }
    var querystring = pairs.join("&");
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState !== 4) return;
        try {
            done(JSON.parse(this.responseText))
        } catch (e) {
            done(this.responseText)
        }
    })

    if (method === "GET") {
        url += "?" + querystring;
    }

    xhr.open(method, url);

    var data = null;
    if (method === "POST") {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        data = querystring;
    }
    xhr.send(data);
}
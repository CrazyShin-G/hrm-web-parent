$().ready(function(){try{$("[data-toggle='tooltip']").tooltip()}catch(e){}try{$(".chosen-select").chosen()}catch(e){}try{$('.bootstrap-switch [type="checkbox"]').bootstrapSwitch({radioAllOff:true,onSwitchChange:function(e,t){$(e.target).prop("checked",t);$(e.target).change()}});$("[data-switch-toggle]").on("click",function(){var e=$(this).data("switch-toggle");return $("#switch-"+e).bootstrapSwitch("toggle"+e.charAt(0).toUpperCase()+e.slice(1))})}catch(e){}try{}catch(e){}try{$(".explanation").find(".explain-checkZoom").click(function(){if($(".explanation").hasClass("up")){$(".explanation").removeClass("up").addClass("down");$(".explanation").find(".explain-panel").slideToggle(200)}else{$(".explanation").addClass("up").removeClass("down");$(".explanation").find(".explain-panel").slideToggle(200)}})}catch(e){}try{searchMore()}catch(e){}try{$("input.icheck").iCheck({checkboxClass:"icheckbox_minimal-blue",radioClass:"iradio_minimal-blue",increaseArea:"20%"});$(".edit-table ul").mCustomScrollbar();popover();refurbish()}catch(e){}try{$('a,.btn,.checkBox,button,.selectpicker,input[type="radio"],input[type="checkbox"]').focus(function(){this.blur()})}catch(e){}try{$(".col-sm-8").find(".click-fade").click(function(){$(this).siblings(".edit").show()});$(".col-sm-8").find(".fa-times-circle").click(function(){$(this).parents(".edit").hide()})}catch(e){}try{$("body").on("click",".pwd-toggle",function(){var e=$(this).data("id");if($(".pwd-toggle").hasClass("fa-eye")){$(".pwd-toggle").removeClass("fa-eye");$(".pwd-toggle").addClass("fa-eye-slash");$("#"+e).attr("type","password")}else{$(".pwd-toggle").addClass("fa-eye");$(".pwd-toggle").removeClass("fa-eye-slash");$("#"+e).attr("type","text")}})}catch(e){}try{$("body").on("mouseover",".popover-box",function(){$(this).find(".popover-info").show()});$("body").on("mouseout",".popover-box",function(){$(this).find(".popover-info").hide()})}catch(e){}try{if($.isFunction($.loading.start)){$("body").on("click",".click-loading",function(){$.loading.start()})}}catch(e){}try{var t=document,a=t.getElementsByTagName("input"),o="placeholder"in t.createElement("input"),n=function(e){var t=e.getAttribute("placeholder"),a=e.defaultValue;if(a==""){e.value=t}e.onfocus=function(){if(e.value===t){this.value=""}};e.onblur=function(){if(e.value===""){this.value=t}}};if(!o){for(var i=0,c=a.length;i<c;i++){var s=a[i],r=s.getAttribute("placeholder");if(s.type==="text"&&r){n(s)}}}}catch(e){}$("form").find(":input").not(":hidden").first().focus()});$(window).scroll(function(){var e=$(window).scrollTop();if(e>=200){$(".scroll-to-top").addClass("active")}else{$(".scroll-to-top").removeClass("active")}});function searchMore(){$("#searchMore").click(function(){if($(".search-term .toggle").hasClass("hide")){$("#searchMore").text("收起筛选条件");$(".search-term .toggle").removeClass("hide")}else{$(".search-term .toggle").addClass("hide");$("#searchMore").text("更多筛选条件")}})}function refurbish(){$(".operate .reload").click(function(){$(".reload").find(".fa-refresh").addClass("fa-spin s02");setTimeout(function(){$(".reload i").removeClass("fa-spin s02")},800)})}function switchBtn(e,t){var a=new Array;a[0]=new Array("是","否");a[1]=new Array("开启","关闭");a[2]=new Array("允许","拒绝");var o=a[t];var n="#"+e;var i=i;if($(n).hasClass("open")){$(n).removeClass("open");$(n).html('<i class="fa fa-toggle-off"></i>'+o[1])}else{$(n).addClass("open");$(n).html('<i class="fa fa-toggle-on"></i>'+o[0])}}function popover(){$(".popover-box").hover(function(){$(this).find(".popover-info").fadeIn("fast")},function(){$(this).find(".popover-info").fadeOut("fast")})}ajax={};ajax.post=function(e){var t={type:"POST",async:true,dataType:"json",error:function(e){alert("失败"+e.status)}};t=$.extend(t,e);$.ajax(t)};ajax.get=function(e){var t={type:"GET",async:true,dataType:"json",error:function(e){alert("失败"+e.status)}};t=$.extend(t,e);$.ajax(t)};function AjaxRegion(e,t,a){var o=$("#"+t);$.ajax({type:"get",url:e,data:{parent_code:a},dataType:"json",success:function(e){if(e.code=="0"){var t=e.data;leve_text=regionLevel(t.level+1);o.html("<option value=''>"+leve_text+"</option>");$(t.list).each(function(e,t){o.append("<option value='"+t.region_code+"'>"+t.region_name+"</option>")})}else{$.msg("请求失败！",{icon:2})}},error:function(){$.msg("数据异常！",{icon:2})}})}function regionLevel(e){var t=new Array("国家","省","市","区/县","乡镇/街道");return t[e]}

//JS操作cookies方法!

//读取cookies
function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}
//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
//使用示例
// setCookie("name","hayden");
// alert(getCookie("name"));


//如果需要设定自定义过期时间
//那么把上面的setCookie　函数换成下面两个函数就ok;


//写cookies
function setCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
//程序代码
function setCookie(name,value,time){
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    //所以hrm.com为父域名的任何路径都能共享cookie
    //document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/"+";domain=.hrm.com";
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
}
function getsec(str){
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s"){
        return str1*1000;
    }else if (str2=="h"){
        return str1*60*60*1000;
    }else if (str2=="m"){
        return str1*60*1000;
    }else if (str2=="d"){
        return str1*24*60*60*1000;
    }
}
//这是有设定过期时间的使用示例：
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//暂时只写了这三种，不知道谁有更好的方法，呵呵
// setCookie("name","hayden","s20");

//axios初始化
axios.interceptors.request.use(config => {
    //如果已经登录了,每次都把token作为一个请求头传递过程

    let accessToken = getCookie("access-token");
    if (accessToken) {
        // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
        config.headers['access-token'] = accessToken;
    }
    console.debug('config',config)
    return config
}, error => {
    // Do something with request error
    Promise.reject(error)
})
axios.defaults.baseURL = "http://127.0.0.1:1030/services"//配置前缀
Vue.prototype.$http = axios //给Vue这个类添加一个原型的属性,这个类的对象都能调用
Vue.config.productionTip = false

//登录拦截判断 时候有accessToken
//是否能从localStrage获取获取用户,如果有自己跳过
//否则需要获取用户,再跳过
//var loginUrl = "http://user.hrm.com:6003/login.html"
var loginUrl = "http://127.0.0.1:6003/login.html"
$().ready(function(){
    // 登录拦截 要放行 login.html register
    let href = location.href;
    if(href.indexOf("login")!=-1 || href.indexOf("reg") !=-1)
        return;
    let accessToken = getCookie("access-token");
    if(!accessToken)
        location.href = loginUrl;

    let user = localStorage.getItem("user");
    if(!user){
        //保存用户到localStorage
        axios.get("/user/sso/ac/"+accessToken).then(res=>{
            var user = res.data;
            localStorage.setItem("user",user)
        })
    }
})

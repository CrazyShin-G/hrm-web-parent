$().ready(function() {

	try {
		// 头部导航下拉菜单
		//$('.menu-item .menu').hover(function() {
//			$(this).find('.menu-bd').toggle();
//		})

		$('.menu-item .menu').hover(function(){
			 $(this).find('.menu-bd').show();
		 },function(){
			 $(this).find('.menu-bd').hide();
		 }); 
	} catch (e) {
	}

	try {
		// 头部搜索 店铺、宝贝选择切换
		// $('.search-type li').click(function() {
		// $(this).addClass('cur').siblings().removeClass('cur');
		// $('#searchtype').val($(this).attr('num'));
		// });
		$('.search-type').hover(function() {
			$(this).css({
				"height": "auto",
				"overflow": "visible"
			});
		}, function() {
			$(this).css({
				"height": 36,
				"overflow": "hidden"
			});
		});
		var cur_value = $(".SZY-SEARCH-BOX-KEYWORD").attr('placeholder');
		$('.search-type li:not(".curr")').click(function() {
			var this_text = $(this).text();
			var this_num = $(this).attr('num');
			var curr_text = $(this).siblings('.curr').text();
			var curr_num = $(this).siblings('.curr').attr('num');
			if( this_num==1 ){
				$(".SZY-SEARCH-BOX-KEYWORD").attr('placeholder','');
				
			}else{
				$(".SZY-SEARCH-BOX-KEYWORD").attr('placeholder',cur_value);
			}
			
			$(this).text(curr_text).attr('num', curr_num).siblings('.curr').text(this_text).attr('num', this_num);
			$('.searchtype').val(this_num);
			$('.search-type').css({
				"height": 36,
				"overflow": "hidden"
			});
		})
	} catch (e) {
	}

	try {
		// 全部分类鼠标经过展开收缩效果
		$('.category-box-border .home-category').hover((function() {
			$('.expand-menu').css('display', 'inline-block');
		}), (function() {
			$('.expand-menu').css("display", "none");
		}));
	} catch (e) {
	}

	try {
		// 当前位置下拉弹框
		$('.breadcrumb .crumbs-nav').hover(function() {
			$(this).toggleClass('curr');
		})
	} catch (e) {
	}

	try {
		// 左侧分类弹框
		$('.list').each(function(){
			var all_width = [];
			var num = $(this).find('.subitems dl').length;
			for(var i=0 ; i< num ; i++){
				all_width.push(parseInt($(this).find('.subitems dl').eq(i).find('dt').find('em').text().length));
				$(this).find('.subitems dl').eq(i).find('dt').find('a').outerWidth()
			}
			$(this).find('.subitems dl dt').width(Math.max.apply(null,all_width)+'em');
		})

		$('.list').hover(function() {
			$(this).find('.categorys').show();
		}, function() {
			$(this).find('.categorys').hide();
		});
	} catch (e) {
	}

	try {
		// 右侧边栏
		$(window).scroll(function() {
			if ($(this).scrollTop() > $(window).height()) {
				$('.returnTop').show();
			} else {
				$('.returnTop').hide();
			}
		})

		$(".returnTop").click(function() {
			$('body,html').animate({
				scrollTop: 0
			}, 800);
			return false;
		});
		// 点击用户图标弹出登录框
		$('.quick-login .quick-links-a,.quick-login .quick-login-a,.customer-service-online a').click(function() {
			$('.pop-login,.pop-mask').show();
		})
		$('.quick-area').mouseover(function() {
			$(this).find('.quick-sidebar').show();
		});
		$('.quick-area').mouseout(function() {
			$(this).find('.quick-sidebar').hide();
		})
		// 移动图标出现文字
		$(".right-sidebar-panel li").mouseenter(function() {
			$(this).children(".popup").stop().animate({
				left: -92,
				queue: true
			});
			$(this).children(".popup").css("visibility", "visible");
			$(this).children(".ibar_login_box").css("display", "block");
		});
		$(".right-sidebar-panel li").mouseleave(function() {
			$(this).children(".popup").css("visibility", "hidden");
			$(this).children(".popup").stop().animate({
				left: -121,
				queue: true
			});
			$(this).children(".ibar_login_box").css("display", "none");
		});
		// 点击购物车、用户信息以及浏览历史事件
		$('.sidebar-tabs').click(function() {

			if ($('.right-sidebar-main').hasClass('right-sidebar-main-open') && $(this).hasClass('current')) {
				$('.right-sidebar-main').removeClass('right-sidebar-main-open');
				$(this).removeClass('current');
				$('.right-sidebar-panels').eq($(this).index() - 1).removeClass('animate-in').addClass('animate-out').css('z-index', 1);
			} else {
				$(this).addClass('current').siblings('.sidebar-tabs').removeClass('current');
				$('.right-sidebar-main').addClass('right-sidebar-main-open');
				$('.right-sidebar-panels').eq($(this).index() - 1).addClass('animate-in').removeClass('animate-out').css('z-index', 2).siblings('.right-sidebar-panels').removeClass('animate-in').addClass('animate-out').css('z-index', 1);
			}
		});
		$(".right-sidebar-panels").on('click', '.close-panel', function() {
			$('.sidebar-tabs').removeClass('current');
			$('.right-sidebar-main').removeClass('right-sidebar-main-open');
			$('.right-sidebar-panels').removeClass('animate-out');
		});
		$(document).click(function(e) {
			var target = $(e.target);
			if (target.closest('.right-sidebar-con').length == 0) {
				$('.right-sidebar-main').removeClass('right-sidebar-main-open');
				$('.sidebar-tabs').removeClass('current');
				$('.right-sidebar-panels').removeClass('animate-in').addClass('animate-out').css('z-index', 1);
			}
		})
	} catch (e) {
	}

	// Ajax快速登录
	$(".ajax-login").click(function() {
		$.login.show();
	});

	// 底部二维码切换
	$(".QR-code li").hover(function() {
		var index = $(this).index();
		$(this).addClass("current").siblings().removeClass("current");
		$(".QR-code .code").eq(index).removeClass("hide").siblings().addClass("hide");
	})

	// 在线客服
	$(".service-online").click(function() {
		var goods_id = $(this).data("goods_id");
		var shop_id = $(this).data("shop_id");
		var order_id = $(this).data("order_id");
		
		$.openim({goods_id:goods_id,shop_id:shop_id,order_id:order_id});
	})
	


});
function serviceOnLine(shop_id)
{
	$.openim({shop_id:shop_id});
}
// 动态、普通登录切换
function setTab(name, cursel, n) {
	for (i = 1; i <= n; i++) {
		var menu = $("#" + name + i);
		var con = $("#con_" + name + "_" + i);

		if (i == cursel) {
			$(con).show();
			$(menu).addClass("active");
		} else {
			$(con).hide();
			$(menu).removeClass("active");
		}
	}
}
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
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
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
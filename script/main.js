$(function() {
    // 左侧导航滑动静止
    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > 0) {
            $('.mainLeft').css('position', 'fixed').css('top', '60px');
            $('.mainRight').css('margin-left', '150px');
            $('.headerBox').css('box-shadow', '0 0 6px 2px  rgba(0,0,0,0.3)');

        } else if ($(window).scrollTop() == 0) {
            $('.mainLeft').css('position', 'static').css('top', '0px');
            $('.mainRight').css('margin-left', '0');
            $('.headerBox').css('box-shadow', '0 0 1px 0px  rgba(0,0,0,0.15)');
        }
        var friendTop = $('.friendTalk').offset().top + $('.friendTalk').outerHeight();
        var talkTop = $('.mainRight_l').height() - $('.hotTalk').height();
        if ($(window).scrollTop() > friendTop) {
            $('.hotTalk').css('position', 'fixed')
                .css('top', '60px')
                .css('margin-top', '0');
            if ($(window).scrollTop() >= talkTop) {
                $('.hotTalk')
                    .css('position', 'absolute')
                    .css('top', talkTop + 'px');
            }
        }
        else if ($(window).scrollTop() < friendTop) {
            $('.hotTalk').css('position', 'relative').css('top', '0').css('margin-top', '10px');
        }
    });
    // 发表框
    $('.w_input').bind('focus', function() {
        $('.textNum').css('display', 'block');
        $('.keys').css('display', 'none');
        check_textNum();
    }).bind('keyup', check_textNum).bind('paste', function() {
        setTimeout(check_textNum, 1);
    });
    $('.w_input').bind('blur', function() {
        if (check_textNum() == true) {
            $('.textNum').css('display', 'none');
            $('.keys').css('display', 'block');
        } else {
            $('.textErrorNum').css('display', 'block');
            $('.keys').css('display', 'none');
        }
    });
    function check_textNum() {
        var num = 140 - ($('.w_input').val().length);
        if (num >= 0) {
            $('.textNum .num').html(num);
            $('.textNum').css('display', 'block');
            $('.textErrorNum').css('display', 'none');
            return true;
        } else {
            $('.textErrorNum').css('display', 'block');
            $('.textErrorNum .errorNum').html(Math.abs(num));
            $('.textNum').css('display', 'none');
            return false;
        }
    }
    // 表情框
    $('.biaoqing').click(function() {
        $('.face_list').slideDown('fast');
    });
    $('.face_close').click(function() {
        $('.face_list').slideUp('fast')
    });
    // 搜索框
    $('.search').bind('focus', function() {
        $('.search_List').css('display', 'block');
    });
    for (var i = 0; i < $('.search_List li a').length; i++) {
        $('.search_List li a').eq(i).bind('mousedown', function() {
            $('.search').val($(this).text().substr(1));
            $('.search').bind('blur', function() {
                $('.search_List').css('display', 'none')
            })
        })
    }
    // 微博发表
    $('.send').click(function() {
        var text = $('.w_input').val();
        if (text.length == 0) {
            $('.send').unbind('click')
        } else {
            var userid = $('.userid').text()
            // console.log(text,userid);
            $.post('weibofabiao.php', {
                text: text,
                userid: userid
            }, function(response, status, xhr) {
                if (status == 'success') {
                    $('.weiboBox').eq(0)
                        .before(response)
                        .prev().css('display', 'none')
                        .css('opacity', '0')
                        .slideDown('normal')
                        .animate({
                            opacity: 1
                        });
                    $('.w_input').val("");
                } else if (response == '有问题？') {
                    alert('有问题!');
                }
            });
        }
    });
    /*事件绑定
    for(var i=0;i<$('.userImg').length;i++){
            (function(i){
                    var timer1=null;
                    $('.userImg').eq(i).mouseover(function(){
                            clearTimeout(timer1);
                            timer1=setTimeout(function(){
                                    $('.userInfo_box').eq(i).slideDown('normal');
                            },200);
                    });
                    $('.userImg').eq(i).mouseout(function(){
                            timer1=setTimeout(function(){
                                    $('.userInfo_box').eq(i).slideUp('normal');
                            },200);
                    })
                    $('.userInfo_box').eq(i).mouseover(function(){
                            clearTimeout(timer1);
                    });
                    $('.userInfo_box').eq(i).mouseout(function(){
                            clearTimeout(timer1);
                            timer1=setTimeout(function(){
                                    $('.userInfo_box').eq(i).slideUp('normal');
                            },200);
                    })
            })(i);
    }
    */
    // 事件委托         用户信息卡片
    $('.mainRight_l').on('mouseenter ', '.userImg,.userInfo_box', function(e) {
        var target = $(e.currentTarget);
        var parent = target.parent().parent().parent().get(0);
        var userName = target.attr('title');
        if ((target.hasClass('userImg'))) {
            if ($.contains(parent, $('.userInfo_box').get(0))) {
                clearTimeout(timer1);
                var timer1 = setTimeout(function() {
                    target.parent().parent().prev().animate({
                        height: "show",
                        opacity: "show",
                    })
                }, 200)
            } else {
                var timer1 = setTimeout(function() {
                    $.get('getUserInfo.php', {
                        userName: userName
                    }, function(response, status, xhr) {
                        if (status == 'success') {
                            var json = JSON.parse(response);
                            var html = '<div class="userInfo_box"><span class="arrow"><i class="jiantou_b"></i><em class="jiantou_t"></em></span><div class="userInfo_big_img"><div class="userInfo_big_tit"><p><a href="#"><img src="img/userImg2.jpg" alt="" /></a></p><p><a href="#" class="userName">' + json[0].userName + ' </a> <a href="#" class="otherName"> (' + json[0].otherName + ')</a></p><p>' + json[0].info + '</p></div></div><div class="userInfo_tool"><p class="info_num"><i>关注</i><a href="#"> ' + json[0].follow + '</a></p><p class="info_num"><i>粉丝</i><a href="#"> ' + json[0].fans + '</a></p><p class="info_num"><i>微博</i><a href="#"> ' + json[0].weibo + '</a></p><p class="address">北京 西城区</p><span class="foll_info">已关注</span><span class="pm">私信</span><span class="menu_tool">|||</span></div></div>'
                            target.parent().parent().before(html).prev().css('display', 'none').animate({
                                height: "show",
                                opacity: "show",
                            })
                        }
                    });
                }, 200);
            }
        } else {
            target.css('display', 'block')
        }
    });
    $('.mainRight_l').on('mouseleave', '.userInfo_box', function(e) {
        var target = $(e.currentTarget);
        clearTimeout(timer2);
        var timer2 = setTimeout(function() {
            $(target).animate({
                height: "hide",
                opacity: "hide",
            });
        }, 200)
    });
    // 微博加载
    $(".loadBtn").click(function() {
        $(this).text("正在加载中...").css('float', 'left').before("<i class='loadImg'></i>");
        $.ajax({
            url: 'getWeiboList.php',
            success: function(data, textStatus) {
                var json = JSON.parse(data);
                var html = "";
                for (var i = 0; i < json.length; i++) {
                    html += '<div class="weiboBox"><div class="userInfoBox clearfix"><div class="userInfo_sm"><div class="userImg fl" title="' + json[i].userid + '"><a href="#"><img src="img/userImg2.jpg" alt="" /></a></div><div class="Info fl" title="' + json[i].userid + '"><h3 class="userTit"><a href="#">' + json[i].userid + ' <img src="img/vipIcon2.png" alt="" /></a> <img src="img/lv_big.png" alt="" /></h3><p class="time"><em>' + getWeiboTime(json[i].date) + '</em><em>  来自</em> <em><a href="#">Xperia Z5</a></em></p></div></div><div class="weiboText"><p>' + json[i].content + '</p></div></div><div class="weiboTool"><ul><li><a href="#" class="collect iconNum">收藏</a></li><li><a href="#" class="transportNum iconNum">转发</a></li><li><a href="#" class="talkNum iconNum">评论</a></li><li><a href="#" class="goodNum iconNum">赞</a></li></ul></div></div>'
                }
                $('.weiboList .weiboBox').before(html);
                $(".loadWeibo").slideUp('normal');
            }
        });
        return false;
    });
    // 微博发表时间转换函数
    function getWeiboTime(t) {
        var nowTime = new Date();
        nowTime = nowTime.getTime() / 1000;
        var time = nowTime - t;
        var day = Math.round((parseInt(time) / (60 * 60 * 24)));
        var str = "";
        if (time < 30) {
            str = "刚刚";
        } else if (time < 60 && time > 30) {
            str = Math.round(time) + "秒前";
        } else if (time < 60 * 60) {
            str = Math.round((parseInt(time) / 60)) + "分钟前";
        } else if (time < 60 * 60 * 24) {
            str = Math.round((parseInt(time) / (60 * 60))) + "小时前";
        } else if (time < 60 * 60 * 24 * 3) {
            if (day == 1) {
                str = "昨天";
            } else {
                str = day + "天前";
            }
        } else {
            str = day + "天前";
        }
        return str;
    }

    // 登陆后
    $(".userid a").text(decodeURIComponent(getCookie('userName')));
    // 获取cookie
    function getCookie(name) {
        var cookieName = encodeURIComponent(name) + '=';
        // alert(cookieName);
        var cookieStart = document.cookie.indexOf(cookieName);
        var cookieValue = null;
        // alert(cookieStart);
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(';', cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            // alert(cookieEnd);
            // alert(cookieStart+cookieName.length);
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    }
    console.log(getCookie('userName'));
});

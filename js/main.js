var name_reg = /^[\u4E00-\u9FA5]{2,6}$/;
var phone_reg = /^(?:13\d|15\d|17\d|18\d)\d{5}(\d{3}|\*{3})$/;
var baseUrl="http://10.100.10.204:9090/portal";
$("#sendBtn").on("click",function(){
	if($(".userName").val().trim()==""){
		layer.open({
	        content:'姓名不能为空！',
	        skin: 'msg',
	        time: 2 //2秒后自动关闭
	    }); 
	    return false;
	}else if(!$(".userName").val().trim().match(name_reg)){
		layer.open({
	        content:'请输入正确姓名！',
	        skin: 'msg',
	        time: 2 //2秒后自动关闭
	    }); 
	    return false;
	}
	if($(".tel").val().trim()==""){
		layer.open({
	        content:'电话不能为空！',
	        skin: 'msg',
	        time: 2 //2秒后自动关闭
	    }); 
	    return false;
	}else if(!$(".tel").val().trim().match(phone_reg)){
		layer.open({
	        content:'请输入正确电话！',
	        skin: 'msg',
	        time: 2 //2秒后自动关闭
	    }); 
	    return false;
	}
	/*if($(".acreage").val()==""){
		layer.open({
	        content:'请选择户型面积！',
	        skin: 'msg',
	        time: 2 //2秒后自动关闭
	    }); 
		return false;
	}
	if($(".style").val()==""){
		layer.open({
	        content:'请选择装修风格！',
	        skin: 'msg',
	        time: 2 //2秒后自动关闭
	    }); 
		return false;
	}
	if($(".budget").val()==""){
		layer.open({
	        content:'请选择装修预算！',
	        skin: 'msg',
	        time: 2 //2秒后自动关闭
	    }); 
		return false;
	}*/
	$.ajax({  //出彩易装列表
        url: baseUrl+"/ws/myaccount/elevenEnroll",
        type:'post',
        data:JSON.stringify({
        	name:$(".userName").val().trim(),
        	mobile:$(".tel").val().trim(),
        	roomsize:$(".acreage").val(),
        	roomstyle:$(".style").val(),
        	money:$(".budget").val()
        }),
        dataType: 'json',
        contentType:'application/json',
        success:function(data){
            if(data.code=="0"){
              setTimeout(function(){
                $('.confirmYes').show()
                $('.confirmNo').hide()
              },500)
            }else if(data.code=="1"){
            	layer.open({
			        content:'请勿重复报名！',
			        skin: 'msg',
			        time: 2 //2秒后自动关闭
			    }); 
            }else{
            	layer.open({
			        content:'当前网络繁忙！',
			        skin: 'msg',
			        time: 2 //2秒后自动关闭
			    }); 
            }
	    },
	    error:function(){
	        layer.open({
		        content:'当前网络繁忙！',
		        skin: 'msg',
		        time: 2 //2秒后自动关闭
		    }); 
	    }
    });
})


function swiperBox(num) {
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    initialSlide :num,
    onSlideChangeEnd: function(swiper){
      if(swiper.activeIndex+1 == 5){
        $('.u-arrow').css({display:'none'});
      }else{
        $('.u-arrow').css({display:'block'});
      }
    }
  });
}
swiperBox(0);
$(function () {
  $('.swiper-slide,.swiper-box').css({height:$(window).height()});
  $('.page1img2').click(function () {
    swiperBox(4)
  });
  $('.pic_6_05').click(function () {
    //location.reload();
    $('.swiper-wrapper').css({transform: 'translate3d(0px, 0px, 0px)'});
  });
  var end_time = "",num = 0,musicIco = document.getElementById('music');
  var t = setInterval(function(){
    if(document.readyState=="loading"){
      if(num <= 20){
        num+=1;
      }
      document.getElementsByClassName('loadText')[0].innerHTML = num + '%';
      document.getElementsByClassName('loadBoxT')[0].style.width = num + '%';
    }
    if(document.readyState=="interactive"){
      setTimeout(function(){
        if(num <= 60){
          num+=2;
        }else if(num <= 80){
          num+=1;
        }
        document.getElementsByClassName('loadText')[0].innerHTML = num + '%';
        document.getElementsByClassName('loadBoxT')[0].style.width = num + '%';
      },1000)
    }
    if(document.readyState=="complete"){
      num+=3;
      document.getElementsByClassName('loadText')[0].innerHTML = num + '%';
      document.getElementsByClassName('loadBoxT')[0].style.width = num + '%';
      if(num >= 100){
        num = 100;
        document.getElementsByClassName('loadText')[0].innerHTML = '100%';
        aa();
      }
    }
  },100);
  var myVideo = document.getElementById("video1");
  function aa(){
    setTimeout(function(){
      end_time = (new Date()).getTime();
      // $(myVideo).height($(myVideo).width()*0.57)
      // //console.log(start_time,end_time);
      //console.log(end_time - start_time);
      //document.getElementsByClassName('mainBox')[0].style.display = 'block';
      document.getElementsByClassName('loadImgBox')[0].style.display = 'none';
//    document.body.style.background = '#000';
      clearInterval(t);
//    $('#video1').get(0).play();
		myVideo.play();
		document.addEventListener("WeixinJSBridgeReady", function () {
	      myVideo.play();
	    }, false);
	    document.addEventListener('YixinJSBridgeReady', function() {
	      myVideo.play();
	    }, false);
      $('.swiper-wrapper .swiper-slide').eq(0).addClass('startAnimate')
    },1000)
  }

  $('.loadImgBox, .page1Bg2').on('scroll', function (e) {
    e.preventDefault();
    return false;
  });

//function audioAutoPlay(id){
//  var audio = document.getElementById(id);
//  audio.play();
//  document.addEventListener("WeixinJSBridgeReady", function () {
//    audio.play();
//  }, false);
//  document.addEventListener('YixinJSBridgeReady', function() {
//    audio.play();
//  }, false);
//}
//audioAutoPlay('music');
//$('.musicIco img').click(function(){
//  if(!musicIco.paused){
//    musicIco.pause();
//    //$(this).addClass('active')
//    $(this).attr('src','images/video.png')
//  }else{
//    musicIco.play();
//    //$(this).removeClass('active')
//    $(this).attr('src','images/play.png')
//  }
//})
//var myVideo = document.getElementById("video1");
  $('.videoBg').click(function () {
    if(myVideo.paused) {
      myVideo.play();
//    musicIco.pause();
      $('.musicIco img').attr('src','images/video.png')
      $('.videoClick').attr('src','images/play.png')
    } else {
      myVideo.pause();
//    musicIco.play();
      $('.musicIco img').attr('src','images/play.png')
      $('.videoClick').attr('src','images/video.png')
      //myVideo.stop();
    }
  })
  myVideo.addEventListener("ended", function () {
//  musicIco.play();
    $('.musicIco img').attr('src','images/play.png')
    $('.videoClick').attr('src','images/video.png')
  }, false);
  myVideo.addEventListener("pause", function () {
//  musicIco.play();
    $('.musicIco img').attr('src','images/play.png')
    $('.videoClick').attr('src','images/video.png')
  }, false);
  myVideo.addEventListener("play", function () {
//  musicIco.pause();
    $('.musicIco img').attr('src','images/video.png')
    $('.videoClick').attr('src','images/play.png')
  }, false);

  /*vdo.addEventListener("webkitfullscreenchange", function(e) {
    if (!document.webkitIsFullScreen) {
      //退出全屏关闭视频
      myVideo.play();
      $('.musicIco img').attr('src','images/video.png')
    };
  })*/
})
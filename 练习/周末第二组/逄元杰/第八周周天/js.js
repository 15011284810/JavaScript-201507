/**
 * Created by Administrator on 2015-12-20.
 */
var main=document.querySelector("#main");
var winW=document.documentElement.clientWidth;
var winH=document.documentElement.clientHeight;
var desW=640;
var desH=1008;
if(winW/winH> desH/desW){
    main.style.webkitTransform="scale(winW/desW)";
}else{
    main.style.webkitTransform="scale(winH/dexH)";
}

var arr= ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png','phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png', 'phoneHeadName.png'];

var loadSpan=document.querySelector(".loadSpan");

fnLoad();
function fnLoad(){
    arr.forEach(function(){
        var oImg=new Image();
        oImg.src="images/"+arguments[0];
        oImg.onload=function(){
            n++;
            loadSpan.style.width=n/arr.length*100+"%";
        }
    })
}


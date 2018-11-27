//点击开始游戏 动态生成100个小格；
//leftClike
var startBtn=document.getElementById('btn');
var box=document.getElementById('box');
var flagBox=document.getElementById('flagBox');
var alertBox=document.getElementById('alertBox');
var alertImg=document.getElementById('alertImg');
var close=document.getElementById('close');
var score=document.getElementById('score');
var over=document.querySelector('.over');
var minesNum;
var mineOver;
var block;
var mineMap=[];
var startGame=true;

bindEvent();
function bindEvent(){
    startBtn.onclick=function(){
        if(startGame){
            box.style.display='block';
            flagBox.style.display='block';
            init();
            startGame=false;
        }

    }
    box.oncontextmenu=function(){
        return false;
    }
    box.onmousedown=function(e){
        var event=e.target||event.srcElement;//e.target 火狐只有这个，e.srcElement ie只有这个
        if(e.button==0){
            leftClick(event);
        }else if(e.button==2){
            rightClick(event);
        }
    }
    close.onclick=function(){
        alertBox.style.display='none';
        flagBox.style.display='none';
        box.style.display='none';
        box.innerHTML='';
        startGame=true;
    }
}
function init(){
    minesNum=10;
    mineOver=10;
    score.innerHTML=mineOver;
    for(var i=0;i<10;i++){
        for(var j=0;j<10;j++){
            var con=document.createElement('div');
            con.classList.add('block');
            con.setAttribute('id',i+'-'+j);
            box.appendChild(con);
            mineMap.push({mine:0});
        }
    }
    block=document.getElementsByClassName('block');
    while(minesNum){
        var mineIndex=Math.floor(Math.random()*100);
        if(mineMap[mineIndex].mine===0){
            block[mineIndex].classList.add('isLei');
            mineMap[mineIndex].mine=1;
            minesNum--;
        }


    }

}
function leftClick(dom){
    if(dom.classList.contains('flag')){   //如果这个方格上是旗子，那么点击左键无反应
        return;
    }
    var isLei=document.getElementsByClassName('isLei');
    if(dom && dom.classList.contains('isLei')){//如果是雷，则gameover
        // console.log('gameOver');
        for(var c=0;c<isLei.length;c++){
            isLei[c].classList.add('show');
        }
        setTimeout(function(){
            alertBox.style.display='block';
           over.innerText='gameOver';
            alertImg.style.backgroundImage='url("imges/111.jpg")';
        },800)
    }else{
        var n=0;
        var posArr=dom&&dom.getAttribute('id').split('-');
        var posX=posArr&&+posArr[0];
        var posY=posArr&&+posArr[1];
       dom.classList.add('check');
        dom&&dom.classList.add('num');
        for (var i=posX-1;i<=posX+1;i++){
            for(var j=posY-1;j<=posY+1;j++){
                var aroundBox=document.getElementById(i+'-'+j);
                if(aroundBox&&aroundBox.classList.contains('isLei')){
                    n++;
                }
            }
        }
        dom&&(dom.innerHTML=n);
        if(n==0){
            for (var k = posX - 1; k<= posX + 1; k++) {
                for (var f = posY - 1; f<= posY + 1; f++) {
                    var nearBox = document.getElementById(k + '-' + f);
                    if (nearBox && !nearBox.classList.contains('check')) {
                        leftClick(nearBox);
                    }
                }

            }
        }

    }
}function rightClick(dom){
    if(dom.classList.contains('num')){
        return;
    }
    dom.classList.toggle('flag');
    if(dom.classList.contains("flag")){
        mineOver--;
    }
    if(!dom.classList.contains('flag')){
        mineOver++;
    }
    score.innerHTML=mineOver;
    if(mineOver===0){
        alertBox.style.display='block';
       over.innerText='winner';
        alertImg.style.backgroundImage=url('imges/444.jpg');
    }
}
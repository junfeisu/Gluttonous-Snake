window.onload=function(){
	var container=document.getElementsByClassName('container');
	var partBody=document.getElementsByClassName('partBody');
 	var len=partBody.length;
 	var direction="down";
   	var snakeFood=document.getElementsByClassName('food');
  	var foodX,foodY;
  	var aaa=true;
  	var timer;
  	var timer1;
  	var timer2;
  	
     //初始化的样式
	for(var p=0;p<len;p++){
		partBody[p].style.top=partBody[0].offsetTop+20*p+'px';
		partBody[p].style.left=0+'px';
	}
 	partBody[len-1].style.backgroundColor="blue";
 	
    //通过监测键盘来前进
	document.onkeydown=function(){
		juge();
	}
	timer1=setInterval(end,500);
	timer2=setInterval(eatFood,500);
	autoFood();
	move(down,500);

	//判断游戏是否结束
	function end(){
		var posLeft=parseInt(partBody[len-1].style.left);  
		var posTop=parseInt(partBody[len-1].style.top); 
		if((posTop>460&&direction=="down")||(posTop<20&&direction=="up")||(posLeft>460&&direction=="right")||(posLeft<20&&direction=="left")){
			aaa=false;
			clearInterval(timer);
			alert('Game is Over');
			clearInterval(timer1);
 		}
		for(var i=0;i<len-1;i++){
			if(partBody[len-1].style.left==partBody[i].style.left&&partBody[len-1].style.top==partBody[i].style.top){
				aaa=false;
				alert('Game is Over');
				clearInterval(timer);
			}
		}
	}
	
	//判断方向
	
	function juge(ev){
		if(aaa==true){
			var oEvent=ev||event;
	   		if(oEvent.keyCode==37){
	 			if(direction=="right"){
	 				return '';
	 			}
	 			else{
	 				clearInterval(timer);
	 				move(left,500);
	 				direction="left";
	 			}
	 			eatFood();
	   		}

			if(oEvent.keyCode==38){
				if(direction=="down"){  
					return '';
				}
				else{
					clearInterval(timer); 
					move(up,500);
					direction="up";
				}
				eatFood();
	   		}

			if(oEvent.keyCode==39){
				if(direction=="left"){
					return '';
				}
				else{
					clearInterval(timer);
					move(right,500);
					direction="right";
					
				}
				eatFood();
	 		}
			if(oEvent.keyCode==40){
				if(direction=="up"){
					return '';
				}
				else{
					clearInterval(timer);
					move(down,500);
					direction="down";
				}
				eatFood();
			}
		}
		else{
			return "";
		}
	}

	function left(){
		for(var i=1;i<len;i++){
			partBody[i-1].style.left=partBody[i].offsetLeft+'px';
			partBody[i-1].style.top=partBody[i].offsetTop+'px';
		}

		partBody[len-1].style.left=partBody[len-1].offsetLeft-20+'px';
		partBody[len-1].style.top=partBody[len-1].offsetTop+'px';
		direction="left";
  	}

	function right(){
		for(var i=1;i<len;i++){
			partBody[i-1].style.left=partBody[i].offsetLeft+'px';
			partBody[i-1].style.top=partBody[i].offsetTop+'px';
		}

		partBody[len-1].style.left=partBody[len-1].offsetLeft+20+'px';
		partBody[len-1].style.top=partBody[len-1].offsetTop+'px';
		direction="right";
   	}

	function up(){
		for(var i=1;i<len;i++){
			partBody[i-1].style.left=partBody[i].offsetLeft+'px';
			partBody[i-1].style.top=partBody[i].offsetTop+'px';
		}

		partBody[len-1].style.left=partBody[len-1].offsetLeft+'px';
		partBody[len-1].style.top=partBody[len-1].offsetTop-20+'px';
		direction="up";
  	}    

	function down(){
		for(var i=1;i<len;i++){
			partBody[i-1].style.left=partBody[i].offsetLeft+'px';
			partBody[i-1].style.top=partBody[i].offsetTop+'px';
        }

		partBody[len-1].style.left=partBody[len-1].offsetLeft+'px';
		partBody[len-1].style.top=partBody[len-1].offsetTop+20+'px';
		direction="down";
 	}
    //生成食物
 	function autoFood(){
  		foodX=20*parseInt(Math.random()*24);
 		foodY=20*parseInt(Math.random()*24);
 		partBody=document.getElementsByClassName('partBody');
 		for(var i=0;i<partBody.length;i++){
 			console.log(parseInt(partBody[i].style.left));
 			if(foodX==parseInt(partBody[i].style.left)&&foodY==parseInt(partBody[i].style.top)){
 				autoFood();
 			}
 		}
   		food=document.createElement('div');
 		food.setAttribute('class','food');
  		container[0].appendChild(food);
   		snakeFood[0].style.left=foodX+'px';
	 	snakeFood[0].style.top=foodY+'px';
 	}
    
    //蛇吃食物长大
    function eatFood(){
     	if(parseInt(partBody[len-1].style.left)==foodX&&parseInt(partBody[len-1].style.top)==foodY){
            container[0].removeChild(snakeFood[0]);
            var partBodyCreate=document.createElement('div');
            partBodyCreate.setAttribute('class','partBody');
            partBodyCreate.setAttribute('index','1');
            container[0].insertBefore(partBodyCreate,partBody[len-2]);
            partBody=document.getElementsByClassName('partBody');
            partBody[len-2].style.left=partBody[len-3].offsetLeft+'px';
            partBody[len-2].style.top=partBody[len-3].offsetTop+'px';

            len=partBody.length;
            if(direction=='left'){
            	partBody[len-1].style.left=partBody[len-2].offsetLeft-20+'px';
	            partBody[len-1].style.top=partBody[len-2].offsetTop+'px'; 
            }
            else if(direction=='right'){
            	partBody[len-1].style.left=partBody[len-2].offsetLeft+20+'px';
	            partBody[len-1].style.top=partBody[len-2].offsetTop+'px';
            }
            else if(direction=='up'){
            	partBody[len-1].style.left=partBody[len-2].offsetLeft+'px';
	            partBody[len-1].style.top=partBody[len-2].offsetTop-20+'px';
            }
            else{
            	partBody[len-1].style.left=partBody[len-2].offsetLeft+'px';
	            partBody[len-1].style.top=partBody[len-2].offsetTop+20+'px';
            }
            partBody[len-1].style.backgroundColor='blue';
            partBody[len-2].style.backgroundColor='red';

            autoFood();
            juge();
    	}
    	else{
	    	return '';
	    }
    }
    //蛇自己移动
    function move(abc,time){
    	timer=setInterval(abc,time);
    }
}
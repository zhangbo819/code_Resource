// 数字滚动
$(function(){
    var tem = `
        <div class="showNumItem">
            <div class="oneNumbers">
                <span class='digit'>0</span>
                <span class='digit'>1</span>
                <span class='digit'>2</span>
                <span class='digit'>3</span>
                <span class='digit'>4</span>
                <span class='digit'>5</span>
                <span class='digit'>6</span>
                <span class='digit'>7</span>
                <span class='digit'>8</span>
                <span class='digit'>9</span>
                <span class='digit'>0</span> 
            </div>
        </div>
    `;
    var oneNumbers=$(".oneNumbers");
    oneNumbers.css("transition","all 1s");
    var initTransform = [],
        transitionTimer = [];


    function set(num,node,HEIGHT=86){
        let html="",
			hgt10 = HEIGHT*10,
			numlen = num.length;

        // 动态生成数字
        for(let i=0;i<numlen;i++){
            html+=tem
        }
        node.html(html);
        //console.log("set over")
		oneNumbers=node.find(".oneNumbers");

		//显示 所有偶数行的最下面的0
		for(let i=0;i<numlen;i++){
				let oneNumber = oneNumbers.eq(i);
				if(i%2!==0) {
 					oneNumber.css("transition",""); 
					oneNumber.css("transform","translateY(-"+hgt10+"px)")
				}
		}
    }

    function go(num,node,time,HEIGHT=86){
        let numlen = num.length,
            hgt10 = HEIGHT*10,
            loadTime,
            loadTimes = [],
            loadTimeobj = {};

		oneNumbers=node.find(".oneNumbers");

        //数字滚动       
        for(let i=0;i<time;i++){
            loadTime = 0.9;
            for(let j=0;j<numlen;j++){
                loadTime = (Number( loadTime ) + 0.1).toFixed(1);
                let oneNumber = oneNumbers.eq(j);
                
                oneNumber.css("transition","all "+ loadTime +"s");

                setTimeout(function(){
                    var index = oneNumber.parent().index();

                    if(i!=time-1){
                        if(oneNumber[0])  var oneTra = oneNumber[0].style.transition;
                        if(!loadTimeobj[oneTra] && oneTra) {
                            loadTimes.push(oneTra);
                            loadTimeobj[oneTra]=1;
                        }

                        oneNumber.css("transition",loadTimes[index]);
						oneNumber.css("transform","translateY("+(
							(j%2!==0)?0:-hgt10
						)+"px)")
                    }
                    else{
                        oneNumber.css("transition",loadTimes[index]);
                        oneNumber.css("transform","translateY(-"+(HEIGHT*num[index])+"px)")
                    }
                }, Math.floor(i*loadTime*1000+50))

                setTimeout(function(){
					
                    if(i!=time-1){
                        oneNumber.css("transition",""); 

						oneNumber.css("transform","translateY("+(
							(j%2!==0)?-hgt10:0
						)+"px)")
                    }       
                },Math.floor(i*loadTime*1000 + loadTime*1000))

            }
            
        }

    }

    var $node = $(".sli-item1>.showNumber");

    set("19940819",$node);
    setTimeout(function(){
       go("19940819",$node,5); 
    },50) 
//    setInterval(function(){
//        var arr = function(){
//                var arr = [],len=0;
//                while(!len){
//                    len= Math.floor(Math.random()*10)
//                }
//
//                for(var i=0;i<len;i++){
//                    arr.push(Math.floor(Math.random()*10))
//                }
//                return arr
//            }();
//        // var p1 = new Promise(function(resolve, reject){
//        //     console.log("set start");
//        //     set(arr,$node);
//        //     if(true) {
//        //         setTimeout(function(){
//        //             console.log("setTimeout start")
//        //             console.log("resolve start");
//        //             resolve();
//        //             console.log("resolve over");
//        //         });
//        //     }
//        //     else reject();
//        // });
//        // p1.then(function(result){
//        //     console.log("go start");
//        //     go(arr,$node,3000)
//        //     console.log("go over");
//        // }); 
//        set(arr,$node);
//        setTimeout(function(){go(arr.toString().replace(/,/g,""),$node,3)}) 
//    },6000)


})
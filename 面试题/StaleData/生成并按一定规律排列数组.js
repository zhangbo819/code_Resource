function fn(){
	var arr = [];
	for(var i=0;i<10;i++){
		arr.push(parseInt(Math.random()*100))	
    }
	return arr.sort((a,b)=>a-b )
}

function mySort(arr){
	var obj ={};
	for(var i=0,len=arr.length;i<len;i++){
		var key = Math.floor(arr[i]/10);
		if(obj[key]===undefined){
			obj[key]=[arr[i]];
		}else{
			obj[key].push(arr[i]);
		}
    }
	return Object.values(obj)
}

console.log(mySort(fn()))
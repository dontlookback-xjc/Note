function compute(start,end,height){
	return function(item){
			let pNum, y;
		if (item.markTime.slice(-2, -1) === '3') pNum = Math.floor(item.markTime) + 0.5
		else pNum = Math.floor(item.markTime)
		//超过最迟
		if (pNum > end) {
			y = (end - start) * 2 * height
		}
		//少于最早
		else {
			let num = pNum - start
			num >= 0 ? y = height * num * 2 : y = 0
		}
		console.log(y)
			return y
			
	}
	
	
}
export default compute
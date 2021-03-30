<template>
	<view >
		<uni-nav-bar left-icon="back" @clickLeft="back" right-text="" :title="openerData.name"
			backgroundColor="rgba( 173,215,237)" shadow="false" color="white"></uni-nav-bar>
		
		<!-- 主题 -->
		<view class="content">
			<view class="plan" v-for="(value,index) in array" 
			:class="{'active':index==activeIndex}" >
				<view class="i">
					<svg class="icon" aria-hidden="true">
						<use :href="'#icon-'+icon[value.subject]"></use>
					</svg>
				</view>

				<view class="detail">{{value.detail}}</view>
				<view class="time"> {{value.markTime|replace}}</view>

			</view>
		</view>
	</view>
</template>

<script>
	import d from "../../js/Date.js"
	var interval
	export default {
		data() {
			return {
				icon: {
					'学习': 'xuexi',
					'运动': 'duanlian',
					'生活': 'icon'
				},
				openerData: undefined,
				show:false,
				now:0
			};
		},
		filters:{
			replace(item){
				return item.replace('.',':')
			}
		}
		,
		methods: {
			back() {
				
					uni.navigateTo({
						url: '../index/index',
						events: {}
					})
				
			
			}
		},
		created() {
			const eventChannel = this.getOpenerEventChannel()
		
			eventChannel.on('acceptDataFromOpenerPage', (data)=>{
				
				this.openerData = data.data
				console.log(this.openerData)
				this.show=true
				
			
			})
		},
		computed:{
			array(){
				let result=this.openerData.schedule
				result=result.sort((item,item2)=>{return item.markTime-item2.markTime})
			
				return result
			},
			activeIndex(){
				var result
				//不在范围
				console.log(this.array)
				let array=this.array.map(item=> parseInt(item.markTime))
				if(this.now<array[0]||this.now>array[array.length-1])
					
				return  null
				//范围之内
				else {
					let star=0,end=array.length-1;
						function sort(start,end,array,target){
							if(start==end) {
								result=start; return start
							}
							let middle=Math.floor((star+end)/2)
							let num=array[middle]
							
							
							 if(num<target) sort(middle+1,end,array,target)
							else if(num>target) sort(start,middle-1,array,target)
							 
							else if(num==target)  {result=middle; return}
						
						}
					sort(0,end,array,parseFloat(this.now))
					
					return result
					
				}
			}
		},
		onShow(){

			this.now=d().Format('h.mm')
			// interval=setInterval(()=>{
			// 	this.now=d().Format('h.mm')
			// },1000*60)
		

		},
		onUnload(){
			clearInterval(interval) 
		}
	}
</script>

<style lang="scss">

	
	.content {

.active{
	color: $text;
	background-color:$assistance ;
}
		.plan {
			display: flex;
			align-items: center;
			font-size: 20px;
			height: 100rpx;
			.i {
				font-size: 30px;
				width: 20%;
				text-align: center;
				color: $bg;
			}

			

			.detail {
				width: 55%;
					
			}

			.time {
				flex: 1;
				text-align: right;
				padding-right:90rpx ;
				
			}

		}
	}
</style>

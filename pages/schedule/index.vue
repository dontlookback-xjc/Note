<template>
	<view >
		<uni-nav-bar left-icon="back" @clickLeft="back" right-text="" title="日程"
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

				<view class="detail">
				<view class="title">{{value.title+' : '}}</view>
				<view>{{value.detail}}</view>
				</view>
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
				
				
			
			})
		},
		mounted(){
			if(!this.openerData) {this.bus.toIndex() ;return}
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
								if(array[start]!=target)
								result=start-1; return 
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
		watch:{
			activeIndex(){
				let plan=this.array[this.activeIndex]
				uni.vibrate({
				    success: function () {
				        uni.showToast({
				        	title:plan.title+' : '+plan.detail
				        })
				    }
				});
			}
		},
		onShow(){
		
			this.now=d().Format('h.mm')
			interval=setInterval(()=>{
				this.now=d().Format('h.mm')
			},1000*60)
		

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
			margin-top: 100rpx;
			display: flex;
			
			font-size: 20px;
			
			.i {
				font-size: 30px;
				width: 20%;
				text-align: center;
				color: $bg;
			}

			

			.detail {
					font-size: 16px;
				width: 55%;
					.title{
						font-size: 20px;
						color:$text
					}
			}

			.time {
				flex: 1;
				text-align: right;
				padding-right:90rpx ;
				
			}

		}
	}
</style>

<template>
	<view  style="overflow-y: scroll;height: 650px;">
	<uni-nav-bar left-icon="back"   title="New Schedule"
		backgroundColor="rgba( 173,215,237)" fixed="true" shadow="true" color="white"></uni-nav-bar>
	<view   class="page"  >
		
		   <view class="setTime">
			   <view>Set Time</view>
			   <view style="display: flex;">
				   <input type="number" @blur="startTime=$event.detail.value;checkNum($event,'start')" :value="startTime" />
				    <view style="padding: 0 20rpx;">To</view>
				   <input type="number" @blur="endTime=$event.detail.value;checkNum($event,'end')" :value="endTime"  /> 
			   </view>
		   
		   </view>
		<view class="content" style="position: relative;">
		
			<view class="timeLine" id="timeLine" style="top:12px" v-if="lineShow">
				<view v-for="(item,index) in clock" 
				:key="index" 
				:style="{height:clockHeight*2+'px'}">{{item}}</view>
			</view>

			<movable-area class="area"  :style="{height:clock.length*clockHeight*2.5+'px'}" >
				<movable-view :y="y[index]" class="plan" direction="vertical" @change="move($event,index)"
					@touchend.stop="touchend(index)" @touchstart="touchstart(index)"
					v-for="(item,index) in plan" :key="index">
					<view class="title">{{item.title}} {{markTime[index]}}</view>
					<hr class="hr" />
					<view class="detail">{{item.detail}}</view>

				</movable-view>
			</movable-area>

			
			
		</view>
	</view>
	<view style="position: fixed;bottom: 20px;left: 50%;transform: translateX(-75px);">
		<bubbleButton :handleClick="submit"  :isExpand="isExpand" ></bubbleButton>
	</view>
	</view>
</template>

<script>
	var timeOut;
	var flag=true;
	import bubbleButton from "../../components/bubbleButton.vue"
	
	export default {
		data() {
			return {
				y: [],
				plan: [],
				clockHeight:25,
				height:undefined,
				oldY:[],
				startTime:8,
				endTime:16,
				markTime:[],
				planIndex:undefined,
				isExpand:false


			};
		},
		components: {
			bubbleButton
		},
		computed: {
		
			add(){
				this.plan.push({subject:'s',title:'t',detail:'d'})
			},
			clock(){	
					console.log(typeof this.endTime)
					var end
					if(!this.endTime||parseInt(this.endTime) <parseInt(this.startTime)){
						end=16
					}
					else{
						end=parseInt(this.endTime);
			
					} 
					console.log(end)
					let result=Array.from( 
					new Array(end+1)
					.keys())
					.slice(this.startTime)
					
					return result
				
				
				
			},
			lineShow(){
				// if(!this.endTime||this.endTime<=this.startTime) return false
				// else
				 return true
			}
		},
		methods: {
			move(e,index) {			
				this.oldY[index] = e.detail.y
	
			// console.log('moveY', this.oldY[this.planIndex])

			},
			checkNum(e,params){
				var value=e.detail.value
				if(params=='start'){
					value<0?this.startTime=0:'';
					value>24?this.startTime=24:'';
				}
				if(params=='end'){
					value<0?this.endTime=0:'';
					value>24?this.endTime=24:'';
				}
				
			},
			submit(){
				
			},
			touchstart(index){
				this.planIndex=index
				
				this.oldY[index]=this.y[index]
			},
			touchend() {
			
		
				if (this.oldY[this.planIndex] !== null) {
				let num=Math.round(this.oldY[this.planIndex] / (this.clockHeight))
				num>this.clock.length*2-2?num=this.clock.length*2-2:''
					//防止原值不移动
				this.$set(this.y, this.planIndex, this.oldY[this.planIndex])
				var roundY = num* (this.clockHeight)
				this.oldY[this.planIndex]=null
				//标记时间
			
				setTimeout(() => {
					this.$set(this.y, this.planIndex, roundY)
					
				}, 10)
			
				this.markTime[this.planIndex]=num%2?this.clock[num/2-0.5]+':30':this.clock[num/2]+':00'

				
				 }

			},
		submit(){
		
			if(this.markTime.length<this.plan.length) {
				uni.showToast({
					title:'有尚未设定时间的计划'
					
				})
				return
			}
				this.isExpand=true
			var data=this.plan.map((item,index)=>{
				return Object.assign({},this.plan[index]
				,{time:this.markTime[index]})
			
			}) 
			console.log(data)
			uni.setStorage({
				key: 'schedule',
				data,
				success:()=>{
					setTimeout(()=>{
						this.isExpand=false
					},300)
				}
			
			});
			
		}
		},
		mounted() {
			this.plan = this.bus.plan;
			this.y = this.plan.map((item, index) => {
				return index * 100
			})

			// this.test();
		}
	}
</script>

<style lang="scss">
	.page{
		background-color: white;margin-top:12px ;
	}
	.setTime{
		color: $text;
		font-size: 18px;
		display: flex;
		justify-content:space-between;
		margin-bottom: 10px;
		padding-left:10px;
		
		input{
			width: 80rpx;
			@include  border-bottom;
			text-align: center;
		}}
		
	.content {
		color: $bg;
		width: 100%;

		.area {
			font-size: 16px;
			
			width: 100%;
		
			.plan {
			
				width: 100%;
				
				color: white;
				.title{
					background-color: $bg;
					width: 220rpx;
					border-radius:  13px 13px 0 0;
					font-size: 14px;
				}
				.detail{
					background-color: $bg;
					width: 220rpx;
					border-radius:   0 0 13px 13px;
					max-height: 100rpx
				}
				view {
					
					margin-left: 10px;
					padding-left: 10px;
					font-size: 18px;
					text-overflow: ellipsis;
				  white-space: normal;
					overflow: hidden;
					box-shadow: 1px 1px 1px 1px;
				}
				.hr{
					margin: 0;
					 background-color: $bg;
					 border: 0;height: 1px;
				}
			}
		}

		.timeLine {
			position: absolute;
			right: 0px;
		

			width: 100rpx;
			text-align: center;
			font-size: 20px;

		}
	.submit {
		position: relative;
		left: 50%;
		transform: translateX(-75px);
		border: 0px;
		margin: auto auto;
		width: 150px;
		background-color: rgba($bg, $alpha: 0.0);
		border-radius: 25px;
		height: 50px;
		font-size: 20px;
		text-align: center;
		color: white;
	}
	}
</style>

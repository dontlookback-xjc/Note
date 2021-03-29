<template>
	<view >
		<uni-nav-bar left-icon="back" @clickLeft="back" right-text="" :title="openerData.name"
			backgroundColor="rgba( 173,215,237)" shadow="false" color="white"></uni-nav-bar>
		
		<!-- 主题 -->
		<view class="content">
			<view class="plan" v-for="(value,index) in array" 
			:class="{'active':array[index].markTime<now&&array[index+1]>now}" >
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
				return this.openerData.schedule.data
			}
		},
		onShow(){

			var time=d.Format('h.mm')
			this.now=time
		

			
				
		},
		onLoad(option) {
		
			
		}
	}
</script>

<style lang="scss">
	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	
	}
	
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
				
			}

		}
	}
</style>

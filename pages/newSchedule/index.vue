<template>
	<view class="" style="position: relative;">
		<view class="content">
			<view class="timeLine" id="timeLine">
				<view v-for="(item,index) in clock" 
				:key="index" :style="{height:clockHeight+'px'}">{{item}}</view>

			</view>
			<movable-area class="area">
				<movable-view :y="y[index]" class="plan" direction="vertical"  
				@change="move"  @touchend="touchend(index)"    
					v-for="(item,index) in plan" :key="index">
					{{item.title}}{{y[index]}}
				</movable-view>
			</movable-area>


		</view>
	</view>
</template>

<script>
	var timeOut;

	export default {
		data() {
			return {
				y: [],
				plan: [],
				clock: [7, 8, 9, 10],
				height: 0,
				oldY:null,
				
				
			};
		},
		components: {

		},
		computed: {
			clockHeight() {
				
				return this.height / 10 
			}
		},
		methods: {
			move(e) {
				
			this.oldY=e.detail.y
			

			},
			touchend(index){
				
			
				console.log(this.y[index])
			
				
				if(this.oldY!==null) {
					this.$set(this.y, index , Math.round(this.oldY/this.clockHeight) *this.clockHeight)
				}
				console.log(this.y[index])
				this.oldY=null
			}
		},
		mounted() {
			this.plan = this.bus.plan;
			
			const query = uni.createSelectorQuery().in(this);
			query.select('#timeLine').boundingClientRect(data => {
				this.height = data.height;
			
			}).exec();
			this.y=this.plan.map((item,index)=>{return index*100})
			console.log(this.y)

		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		height: 600px;
		border-top: 1px #333333 solid;
		border-bottom: 1px #333333 solid;


		.area {

			height: 600px;
			width: 100%;

			.plan {
				color: white;
				background-color: blue;
				width: 50px;
				height: 50px;
			}
		}

		.timeLine {
			position: absolute;
			right: 0px;
			height: 100%;
			
			width: 100rpx;
			text-align: center;
			font-size: 20px;
			
		}
	}
</style>

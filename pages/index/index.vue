<template>
	<view  :style="{height:viewHeight}">
	
		<myMask>
			<view  class="content">
				
					<view  class="bottom">
							<view>Last Schedule</view>
							<view @click="newSchedule">New Schedule</view>
					
					</view>
			</view>
		</myMask>
		
	</view>


</template>

<script>

	import myMask from  "@/components/mask/index.vue"
	export default {
		data(){
			return{
				viewHeight:0
			}
		},
		components: {
			myMask
		},
		methods:{
			newSchedule(){
				uni.navigateTo({
					url:'../newSchedule/index'
				})
			}
		},
		mounted(){
			uni.getSystemInfo({
							success:(res)=>{
								console.log(JSON.stringify(res))
								// this.viewHeight=res.windowHeight-44+'px'
								this.viewHeight=res.windowHeight+'px'
								
							
							}
						});
		}
	}
</script>

<style lang="scss">
	
	.content{
		display: flex;height: 100%;
		font-size: 16px;
		color: rgba($text, $alpha: 1.0);
		
		.bottom{
			display: flex;
			justify-content: space-between;
			align-self: flex-end;width: 100%;
			
			padding: 0 30rpx 20rpx;
		}
		
	}

</style>

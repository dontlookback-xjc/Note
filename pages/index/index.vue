<template>
	<view  :style="{height:viewHeight}">
	
		<myMask :title="title">
			<view  class="content">
				
					<view  class="bottom">
							<view @click="lastSchedule">Last Schedule</view>
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
				viewHeight:0,
				title:'Index'
			}
		},
		components: {
			myMask
		},
		methods:{
			newSchedule(){
				uni.navigateTo({
					url:'../setSchedule/index'
				})
			},
			lastSchedule(){
				uni.getStorage({
					key:'schedule',
					success:(data)=>{
						let array=data.data
						uni.navigateTo({
							url:"../schedule/index",
							success: (res) => {
								// 通过eventChannel向被打开页面传送数据
							
								res.eventChannel.emit('acceptDataFromOpenerPage', {
									data:array[array.length-1]
								})
							},
						})
					}
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

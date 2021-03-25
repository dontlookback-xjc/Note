<template>

	<view class="t1">
		<view class="topic">
			<slot>
			</slot>
		</view>
	</view>

</template>

<script>
	export default {
	name:"test"
	}
</script>

<style lang="scss">
	//item
	.t1 {
		background-color: rgba($assistance, $alpha: 0.4);
	
		height: 100rpx;
		width: 220rpx;
		border-radius: 30rpx;
		display: flex;
		margin: 10rpx 0;
		align-items: center;

		// animation: show 1s   forwards  ;
	
		.topic {
			background-color: $assistance;
			height: 80rpx;
			width: 90%;
			line-height: 80rpx;
			text-align: center;
			border-radius: 20rpx;
			margin: 0rpx auto;
			font-family: PingFang SCi;
			font-size: 16px;
			color: rgba($text, $alpha: 1.0);
		}
	}
</style>

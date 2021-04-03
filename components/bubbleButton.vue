<template>
	<view style="display: flex;align-items: center;height: 150rpx;">
		<view class="bubbles" :class="{'expand':isExpand}">
		
		</view>
		<button @click="handleClick" class="submit">
		{{isExpand?'Loading':(text?text:'Submit')}}
		</button>
	</view>
</template>

<script>
	export default {
	
		props:[
			'handleClick',
			'isExpand',
			'text'
		]
	}
</script>

<style lang="scss">
	.bubbles {
	
		display: flex;
		align-items: center;
		transform-origin: center center;
		margin: 0 auto;
		transition: ease-out .7s;
		width: 150px;
		background-color: $bg;
		border-radius: 25px;
		height: 50px;
		border: 0;
	
	}
	
	.expand {
		// width: 300px;
		// height: 100px;
		// border-radius: 50px;
		transform: scale(1.5);
		background-color: $assistance;
	}
	
	.submit {
		position: absolute;
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
	
	.submit::after {
		border: 0px;
	}
</style>

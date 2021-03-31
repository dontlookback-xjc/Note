<template>
	<view class="mask">
		<view :class="{'gray':maskShow}" @click="$emit('maskClick');"></view>
		<view :class="{'blur':maskShow}" style="height: 100%;">
			<slot></slot>
		</view>
		
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				
			};
		},
		mounted(){
			
		},
		methods:{
			
		}
		,props:['maskShow']
	}
</script>

<style lang="scss">
	.mask{
		height: 100%;
	
		.gray{
			width: 700px;
			height: 100%;
			position: absolute;
			background-color:rgba($color: #000000, $alpha:0.2);
			z-index: 2;
	
		}
		.blur{
			filter: blur(2px);
			
		}
		}
</style>

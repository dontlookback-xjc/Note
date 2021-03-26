<template>
	<view class="mask">
		<view :class="{'gray':maskShow}"></view>
		<view :class="{'blur':maskShow}">
			<slot></slot>
		</view>
		
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				maskShow:false
			};
		},
		mounted(){
				this.bus.$on('showTopics',()=>{
					this.maskShow=!this.maskShow
				})
		}
	}
</script>

<style lang="scss">
	
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
</style>

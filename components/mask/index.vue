<template>
	<view style="height:100%">
		<my-menu title="New Plan"></my-menu>
		<my-mask :maskShow="maskShow">
			<slot></slot>
		</my-mask>
	</view>
</template>

<script>

	import myMenu from "../menu/index.vue"
	import myMask from "./mask.vue"
	export default {
		data() {
			return {
				maskShow:false
			};
		},
		components:{
			myMenu,
			myMask
		},
		mounted(){
				this.bus.$on('showTopics', () => {
					this.maskShow=!this.maskShow
				})
		}
	}
</script>

<style lang="scss">
	
</style>

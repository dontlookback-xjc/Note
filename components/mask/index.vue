<template>
	<view style="height:100%">
		<my-menu :title="title" ></my-menu>
		<my-mask :maskShow="maskShow" @maskClick="maskClick">
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
		props:['title'],
		components:{
			myMenu,
			myMask
		},
		methods:{
			maskClick(){
				this.bus.$emit('showTopics')
			}
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

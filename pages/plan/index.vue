<template>
	<view class="">
		<my-menu title="New Plan"></my-menu>
		<my-mask>
			<plan></plan>
		</my-mask>
	</view>
</template>

<script>
	import plan from "@/components/plan/plan.vue"
	import myMenu from "@/components/menu/index.vue"
	import myMask from "@/components/mask.vue"
	export default {
		data() {
			return {
				
			};
		},
		components:{
			plan,
			myMenu,
			myMask
		}
	}
</script>

<style lang="scss">
	
</style>

<template>
	<view class="">
		<my-menu title="New Plan"></my-menu>
		<plan></plan>
	</view>
</template>

<script>
	import plan from "@/components/plan/plan.vue"
	import myMenu from "@/components/menu/index.vue"
	export default {
		data() {
			return {
				
			};
		},
		components:{
			plan,
			myMenu
		}
	}
</script>

<style lang="scss">
	
</style>

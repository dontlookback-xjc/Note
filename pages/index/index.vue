<template>
	<view>
		<uni-nav-bar left-icon="back" 
		right-text="菜单" 
		title="Note"
		backgroundColor="#55dbff"
		fixed="true" shadow="true" color="white"
		></uni-nav-bar>
		
	 <transition></transition>
	</view>
</template>

<script>
	import transition from "@/components/transition.vue"
	export default {
		data() {
			return {
		
			}
		},
		methods:{
		
		},
		components: {
			transition
		},
		computed:{
			//计算主题列表

		},
	
	}
</script>

<style lang="scss">

	
</style>

<template>
	<view style="overflow-y:hidden; ">
		<uni-nav-bar left-icon="list" @clickLeft="bus.$emit('showTopics')" right-icon="compose"  @clickRight="toEdit" :title="title"
			backgroundColor="rgba( 173,215,237)" fixed="true" shadow="true" color="white"></uni-nav-bar>
		<transitionList   style="z-index: 20;"></transitionList>
	</view>
</template>

<script>
	
	import transitionList from "@/components/menu/transition.vue"
	
	export default {
		data() {
			return {
			

			}
		},
		methods: {
			toEdit(){
				uni.navigateTo({
					url:"../../pages/edit/index"
				})
			}
		},
		components: {
			transitionList
		},
		props:{
			title:{
				type:String,
				default:'Note'
				
			}
		},
		computed: {
			
			
		},
	
		mounted(){
		
			}
		


	}
</script>

<style lang="scss">
	
</style>

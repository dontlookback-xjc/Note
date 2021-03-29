<template>

	<view>
		<transition name="fade">
		
					<view v-show="show" style="background-color: red;">1</view>
				<!-- <view v-show="s2"  style="background-color: #BBF3FF;">2</view> -->
			
		
		
			
		</transition>
		
	</view>
</template>

<script>
	var interval = 0
	var delayTime
	import box from '@/components/menu/box.vue'
	export default {
		data() {
			return {
				show:true,
				s2:true
			

			}
		},
		props: {
			componentName: {
				type: String,
				default: 'box'
			},


		},
		computed: {
			list(){
				
			},
		
		},
		methods: { 
			
		
		},

		components: {
			
		},
		 mounted() {
			 
			 setTimeout(()=>{
				 this.show=false
			 },1000)
			 setTimeout(()=>{
			 		this.s2=false
			 },2000)
			
		}

	}
</script>

<style lang="scss">


	// 1


		.fade-enter-active,
		.fade-leave-active {
			transition: .8s;
		}

		.fade-enter,
		.fade-leave-to {
			opacity: 0;
			
		}

		.fade-enter-to,
		.fade-leave {
			left: 0rpx
		}


</style>

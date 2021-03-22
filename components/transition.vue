<template>

	<view class="topics">
		<component :is="componentName" :class="{'show':(index<showIndex)-hiding,'transition':true}"
			v-for="(value,index) in externalData " :key="index">
			<view @click="showSwitch(false,handleClick(value));">
				{{value}}
			</view>
		</component>
	</view>
</template>

<script>
	var interval=0
	import box from '@/components/box.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				showIndex: 0,
				hiding: 1,
			}
		},
		props: {
			componentName: {
				type: String,
				default: 'box'
			},
			externalData: {
				type: Array,

			},
			handleClick: {
				type: Function,
				default:()=>{}
			}
		},
		methods: {
			showSwitch(add = true,cb) {
			
				if(interval) {return;} 
				this.hiding==add?this.showIndex = 0:'';
				add ? this.hiding = 0 : this.hiding = 1
				let duration = Math.ceil((2 / this.externalData.length) * 100)
				interval = setInterval(() => {
					this.showIndex += 1;
					let flag = 1;
					flag = this.showIndex % 3;
					if (!flag) {
						clearInterval(interval)
						interval=0;
						//此处时间需要解耦
						if(cb){setTimeout(()=>{cb();this.showSwitch()},400)}
						
						
					}
				}, duration)
				
			},
			showSecondTopic: function() {}
		},

		components: {
			box
		},

		mounted() {
			this.showSwitch();
		},
	}
</script>

<style lang="scss">
	.topics {
		position: absolute;
		background-color: rgba($color:$cyan, $alpha: 0.7);
		height: 100%;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		width: 260rpx;

		.transition {
			transition: 0.7s;
		}

		.show {
			opacity: 1 !important;
			left: 0rpx !important;
		}

	}

	@keyframes show {
		0% {
			opacity: 0;
			left: -40rpx;
		}

		100% {
			opacity: 1;
			left: 0rpx;
		}

	}
</style>

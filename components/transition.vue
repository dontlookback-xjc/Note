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
	var interval = 0
	import box from '@/components/box.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				showIndex: 0,
				hiding: 0,
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
				default: () => {}
			}
		},
		methods: {
			showSwitch(add = true, cb) {
				var duration
				if (interval) {
					return;
				}
				this.hiding == add ? this.showIndex = 0 : '';
				add ? this.hiding = 0 : this.hiding = 1;
				//根据数量返回合适时间间隔
					if (this.externalData.length) {
					duration = Math.ceil(2 / this.externalData.length) * 150
					
					interval = setInterval(() => {
						this.showIndex += 1;
						let flag = this.showIndex % 3;
						//结束判断
						if (!flag) {
							clearInterval(interval)
							interval = 0;
							//此处时间需要解耦
							if (cb) {
								setTimeout(() => {
									cb();
									this.showSwitch()
								}, 300)
							}
						}
					}, duration)
				}

			},
			showSecondTopic: function() {}
		},

		components: {
			box
		},
		mounted(){
				this.showSwitch();
		}
		// beforeUpdate() {


		// },
		// Updated() {
		// 	console.log('Updated')

		// 
		// },
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
			position: relative;
			align-items: center;
			opacity: 0;
			left: -80rpx;

		}

		.show {
			opacity: 1 !important;
			left: 0rpx !important;
		}

	}
</style>

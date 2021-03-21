<template>

		<view class="topics">
			<component  :is="componentName" :class="{'show':(index<showIndex)-hiding,'transition':true}"
				v-for="(topic,index) in topics " :key="index">
				<view @click="showSwitch(false)">
						{{topic}}
				</view>
			</component>
		</view>
</template>

<script>
	import box from '@/components/box.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				plans: [{
						name: '跑步',
						type: {
							name: "运动",
						}
					},
					{
						name: '前端',
						type: {
							name: "学习",
						}
					},
					{
						name: '做菜',
						type: {
							name: "生活",
						}
					}

				],
				showIndex: 0,
				hiding: 0,
				
			}
		},
		props:{
			componentName:{
				type:String,
				default:'box'
			}
		},
		methods: {
			showSwitch: function(add = true) {
				add ? this.hiding = 0 : this.hiding = 1
				this.showIndex = 0;
				let duration = Math.ceil((2 / this.topics.length) * 100)
				let interval = setInterval(() => {
					this.showIndex += 1;
					let flag = 1;
					flag = (this.showIndex - this.topics.length) % 3
					if (!flag) {
						clearInterval(interval)
					}
				}, duration)
			}
		},
		components: {
			box
		},
		computed: {
			//计算主题列表
			topics() {
				let set = {};
				this.plans.forEach((item) => {
					set[item.type.name] = 1;
				})
				let result = []
				for (let item in set) {
					result.push(item)
				}
				return result
			}
		},
		mounted() {

			this.showSwitch()


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

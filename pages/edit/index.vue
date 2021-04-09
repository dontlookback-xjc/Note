<template>
	<view>
		<uni-nav-bar left-icon="home" @clickLeft="bus.toIndex" @clickRight="modelMultiple"
			:right-text="multiple?'取消':'多选'" title="Edit" backgroundColor="rgba( 173,215,237)" fixed="true"
			color="white"></uni-nav-bar>
		<view style="display: flex;">
			<view class="tab" :class="{'stab':tabIndex==1}" @click="multiple?'':tabIndex=0">Schedule </view>
			<view class="tab" :class="{'stab':tabIndex==0}" @click="multiple?'':tabIndex=1">Plan</view>
		</view>

		<empty v-if="!Object.keys(schedule)&&tabIndex==0" />
		<checkbox-group @change="change">
			<transition name="slide-fade">
				<view v-if="tabIndex===0" class="content" :style="{left:multiple?'0rpx':left,height:bus.viewHeight}">
					<view v-if="schedule" v-for="(item,index) in schedule" :key="item.addTime">
						
						<label class="schedule">
							<!-- 左 -->

							<checkbox class="left" :value="item.date" :style="{opacity:multiple?1:0}" />

							<!-- 中 -->
							<view style="height: 100rpx;width: 500rpx;padding:0 50rpx;">
								<view style="display: flex;justify-content: space-between;align-items: center;">
									<view>日程: <text style="color: gray;">{{" "+item.name}}</text></view>
									<view style="font-size: 16px;">
										创建日期 {{item.addTime|time }}
									</view>
								</view>

								<view class="plan">事项：
									<text style="color: gray;">
										{{item.schedule|toString}}
									</text>
								</view>

							</view>
							<!-- 右 -->
							<view class="left" style="font-size: 26px;" :style="{opacity:multiple?0:1}">
								<svg class="icon" aria-hidden="true" @click="edit(item)">
									<use href="#icon-bianji"></use>
								</svg>
							</view>

						</label>

					</view>

				</view>
			</transition>
		</checkbox-group>
		<!-- 按钮 -->


		<transition name="slide-fadeReverse">
			<empty v-if="!plan.length&&tabIndex==1" />
			<view class="content" :style="{left:multiple?'0rpx':left}" v-if="tabIndex==1">
				<view v-if="tabIndex==1" v-for="(item,index) in plan" :key="item.detail">
					<!-- 行 -->
					<label class="schedule">
						<!-- 左 -->
						<checkbox-group @change="change">
							<checkbox class="left" :value="index.toString()" :style="{opacity:multiple?1:0}" />
						</checkbox-group>
						<!-- 中 -->
						<view style="width: 500rpx;padding:0 50rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view>事项: <text style="color: gray;">{{" "+item.title}}</text></view>
								<view style="font-size: 16px;">
									{{item.subject}}
								</view>
							</view>

							<view class="plan">
								<text style="width: 100rpx;white-space: nowrap;">计划:</text>

								<view style="color: gray;flex:1">
									{{item.detail}}
								</view>
							</view>

						</view>
						<!-- 右 -->
						<view class="left" style="font-size: 26px;" :style="{opacity:multiple?0:1}">
							<svg class="icon" style="color: #aa0000;" aria-hidden="true" @click="editPlan(index)">
								<use href="#icon-shanchudefuben"></use>
							</svg>
						</view>

					</label>

				</view>

			</view>
		</transition>
		<view style="position: absolute;left: 50%;bottom: 100rpx; transform: translateX(-75px);">
			<bubbleButton 　:isExpand="isExpand" :handleClick="deleteSchedule" :text="multiple?'Delete':'New'">
			</bubbleButton>
		</view>
	</view>
</template>

<script>
	import d from "@/js/Date.js"
	import bubbleButton from "@/components/bubbleButton.vue"
	import empty from "@/components/empty/index.vue"
	export default {
		data() {
			return {
				schedule: null,
				multiple: false,
				left: '-150rpx',
				check: [],
				isExpand: false,
				tabIndex: 0,
				plan: null,
				map: null
			}
		},
		filters: {
			time(item) {
				
				return d(item).Format('yyyy.M.d')
			},
			toString(array) {
				return array.map(item => item.title).join('   ')
			}
		},
		components: {
			bubbleButton,
			empty
		},

		methods: {
			modelMultiple() {
				this.multiple = !this.multiple
				this.map = null

			},
			deleteSchedule() {

				//正常模式跳转为新建
				if (!this.multiple) {
					if (!this.tabIndex) {
						uni.navigateTo({
							url: '../setSchedule/index'
						})
					} else {
						uni.navigateTo({
							url: '../plan/index'
						})
					}

					return
				}

				this.isExpand = true
				this.multiple = false
				//对日程还是计划操作
				let key, result
				if (!this.tabIndex) {
					for (key in this.map) {
						if (this.map[key])
							delete this.schedule[key]
					}
					result = this.schedule
				} else {
					for (var i = this.map.length - 1; i >= 0; i--) {
						if (this.map[i]) this.plan.splice(this.check[i], 1)

					}
					result = this.plan
				}

				uni.setStorage({
					key: this.tabIndex ? 'plan' : 'schedule',
					data: result
				})
				setTimeout(() => {
					this.isExpand = false
				}, 300)


			},
			edit(item) {

				uni.navigateTo({
					url: '../setSchedule/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据

						res.eventChannel.emit('acceptDataFromOpenerPage', {
							key: item.date
						})
					},
				})
			},
			editPlan(index) {


				this.plan.splice(index, 1)
				uni.setStorage({
					key: 'plan',
					data: this.plan
				})
			},
			change(e) {
				if (!this.tabIndex) {
					this.map = {}
				} else if (this.tabIndex) {
					this.map = []
				}
				e.detail.value[0]
				e.detail.value.forEach((item) => {
					this.map[item] = true
				})



			}

		},
		created() {

			this.bus.$on('schedule', (schedule) => {
				this.schedule = schedule
			})



		},
		onShow() {
			

			uni.getStorage({
				key: 'schedule',
				success: (res) => {
					this.schedule = res.data

				}
			})
			uni.getStorage({
				key: 'plan',
				success: (res) => {
					this.plan = res.data
					
				}
			})
			if (this.bus.viewHeight) return

			uni.getSystemInfo({
				success: (res) => {
					// this.viewHeight=res.windowHeight-44+'px'
					this.bus.viewHeight = res.windowHeight
					this.viewHeight = this.bus.viewHeight - 63 - 44 + 'px'

				}
			});
		}
	}
</script>

<style lang="scss">
	.slide-fade-enter-active {
		transition: .3s ease;
	}

	.slide-fade-leave-active {
		transition: .3s ease;
	}

	.slide-fade-enter,
	.slide-fade-leave-to {
		transform: translateX(-750rpx);
		opacity: 0;
	}

	.slide-fadeReverse-enter-active {
		transition: .3s ease;
	}

	.slide-fadeReverse-leave-active {
		transition: .3s ease;
	}

	.slide-fadeReverse-enter,
	.slide-fadeReverse-leave-to {
		transform: translateX(750rpx);
		opacity: 0;
	}

	.tab {
		margin: 20rpx 20rpx;
		padding: 20rpx 40rpx;
		border-radius: 40rpx;
		height: 46rpx;
		font-size: 18px;
		color: $assistance;
		background-color: $bg;

	}

	.stab {
		color: $bg;
		background-color: $assistance;

	}

	.content {

		font-size: 18px;
		color: $text;
		overflow-x: hidden;
		position: absolute;
		transition: .7s;
		width: 1125rpx;
		height: 1500rpx;

		.schedule {

			padding: 10rpx 0;
			display: flex;

			.fade {
				opacity: 0;
			}

			.left {
				transition: .3s;
				width: 150rpx;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
			}

			.plan {
				display: flex;



			}

		}
	}
</style>

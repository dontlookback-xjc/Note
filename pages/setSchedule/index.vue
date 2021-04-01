<template>

	<view style="overflow-y: scroll;height: 650px;">
		<my-mask :maskShow="maskShow" @maskClick="maskShow=!maskShow">

			<uni-nav-bar left-icon="back" @clickLeft="back" title="Set Schedule" backgroundColor="rgba( 173,215,237)"
				fixed="true" shadow="true" color="white"></uni-nav-bar>
			<view class="page">

				<!-- 两个按钮 -->
				<view class="top">
					<view style="padding-left: 20rpx;" @click="toAddPlan">
						<uni-icons color="rgb(81, 157, 204)" type="plus" size="24" />
						Plan
					</view>
					<view @click="addExistingPlan">
						<uni-icons color="rgb(81, 157, 204)" type="plus-filled" size="24" />
						Existing Plan
					</view>

					<view class="setTime">

						<view>SET FROM </view>
						<input type="number" @blur="startTime=Math.floor( $event.detail.value);checkNum($event,'start')"
							:value="startTime" />
						<view style="padding: 0 20rpx;">TO</view>
						<input type="number" @blur="endTime=$event.detail.value;checkNum($event,'end')"
							:value="endTime" />

					</view>
				</view>
				<!-- 主体 -->
				<view class="content" style="position: relative;display: flex;">
					<view class="bg"
						:style="{height:clock.length*clockHeight*2+100+'px',lineHeight:clock.length*clockHeight*2+100+'px'}">
						←Delete
					</view>
					<view class="left" :class="{'leftShow':boundCheck}"
						:style="{height:clock.length*clockHeight*2+100+'px',lineHeight:clock.length*clockHeight*2+100+'px'}">
						<svg class="icon" aria-hidden="true" @click="deletePlan(index)">
							<use href="#icon-shanchudefuben"></use>
						</svg>
					</view>
					<!-- 右 -->
					<view class="timeLine" id="timeLine" style="top:8px" v-if="lineShow">
						<view v-for="(item,index) in clock" :key="index" :style="{height:clockHeight*2+'px'}">{{item}}
						</view>
					</view>
					<!-- 移动区域 -->
					<movable-area class="area" :style="{height:clock.length*clockHeight*2+100+'px'}" v-show="lineShow">
						<movable-view :y="item.y" :x="item.x" out-of-bounds="true" class="plan" direction="all"
							@change="move($event,index)" @touchend.stop="touchend(index)"
							@touchstart="touchstart(index)" v-for="(item,index) in plan" :key="index+item.detail">
							<view class="title"><text>{{item.title}}	</text>  <input style="display: inline-block;width: 90rpx;" type="text" :value="item.markTime"
									@blur="changeTime($event,index)" /> </view>
							<hr class="hr" />
							<view class="detail">{{item.detail}}</view>

						</movable-view>
					</movable-area>

				</view>
			</view>
			<view style="position: fixed;bottom: 20px;left: 50%;transform: translateX(-75px);">
				<bubbleButton :handleClick="submit"></bubbleButton>
			</view>
		</my-mask>

		<!-- 底部列表 -->
		<transition name="fade">

			<view :class="{'modal':maskShow}" v-if="maskShow">

				<!-- 上部 -->
				<view style="display: flex;">
					<view class="subject" :class="{'active':subject===''}" @click="subject=''">All</view>
					<!-- key 遍历 -->
					<view class="subject" :class="{'active':subject===item}"
						v-for="(item,index) in Object.keys(sortedPlan)" @click="subject=item">
						{{item}}
					</view>
				</view>

				<hr style="border-color:#89e4ff;margin: 5px 0;">

				<view class="boxWrap">

					<view class="box" v-for="(item,index,array) in subject?sortedPlan[subject]:StoragedPlan"
						:class="{'checked':item.checked}" @click="choose(item)">

						<view>{{item.title}}</view>
						<view style="height: 90rpx;width: 100%;overflow:hidden;
					text-overflow: ellipsis;">{{item.detail}}
						</view>
					</view>
				</view>

				<view class="button" @click="existingPlanPush"> submit</view>
			</view>
		</transition>

	</view>
</template>

<script>
	var timeOut;
	var flag = true;
	var t
	var schedule, index, ar, update;
	import bubbleButton from "../../components/bubbleButton.vue"
	import myMask from "@/components/mask/mask.vue"
	import timToY from "@/js/timeToY.js"
	export default {
		data() {
			return {

				plan: [],
				clockHeight: 25,
				height: undefined,

				startTime: 8,
				endTime: 16,
				markTime: [],
				maskShow: false,
				subject: '',
				planIndex: 0,
				boundCheck: false,
				update: false


			};
		},
		components: {
			bubbleButton,
			myMask
		},
		computed: {

			clock() {

				var end
				if (!this.endTime || parseInt(this.endTime) < parseInt(this.startTime)) {
					end = 16
				} else {
					end = parseInt(this.endTime);

				}

				let result = Array.from(
						new Array(end + 1)
						.keys())
					.slice(this.startTime)

				return result

			},
			lineShow() {
				if (this.endTime < this.startTime) {
					uni.showToast({
						title: '请设置正确的时间',
						icon: 'none'

					})
					return false
				} else return true
			},
			sortedPlan() {
				let set = {};
				//无分类数据
				this.StoragedPlan.forEach((item) => {
					if (!set[item.subject]) {
						set[item.subject] = []
					}
					set[item.subject].push(item)
				})

				return set
			}
		},
		methods: {
			back() {
				let pages = getCurrentPages();
				if (pages.length > 1) {
					uni.navigateBack()
				} else {
					uni.navigateTo({
						url: '../index/index',
						events: {}
					})
				}


			},
			choose(item) {

				item.checked = !item.checked
				this.$forceUpdate()
			},
			move(e, index) {

				this.plan[index].oldY = e.detail.y
				this.plan[index].x = e.detail.x
				if (e.detail.x < 0) this.boundCheck = true
				else this.boundCheck = false

			},
			toAddPlan() {
				uni.navigateTo({
					url: '../addPlan/index'
				})
			},
			addExistingPlan() {
				this.maskShow = !this.maskShow

				this.StoragedPlan.forEach(
					(item) => {
						Object.assign(item, {
							checked: false
						})
					}
				)
			},
			checkNum(e, params) {

				var value = e.detail.value
				if (params == 'start') {
					value < 0 ? this.startTime = 0 : '';
					value > 24 ? this.startTime = 24 : '';
					0 <= value <= 24 ? this.startTime = value : ''

				}
				if (params == 'end') {
					value < 0 ? this.endTime = 0 : '';
					value > 24 ? this.endTime = 24 : '';
				}

			},
			touchstart(index) {
				this.planIndex = index

				this.plan[index].oldY = this.plan[index].y
			},
			touchend() {

				var item = this.plan[this.planIndex]
				if (item.x < 0) {
					uni.showModal({
						content: '确定要删除该计划吗',
						success: (res) => {
							if (res.confirm) {

								this.plan.splice(this.planIndex, 1)
								this.planIndex = null
								// console.log('用户点击确定');
							} else if (res.cancel) {
								// console.log('用户点击取消');
							}
						}
					});
				}
				if (item.oldY !== null) {

					let num = Math.round(item.oldY / (this.clockHeight))

					num > this.clock.length * 2 - 2 ? num = this.clock.length * 2 - 2 : ''

					//防止原值不移动
					item.y = item.oldY

					// this.$set(this.y, this.planIndex, this.oldY[this.planIndex])
					var roundY = num * (this.clockHeight)


					//邻近移动
					setTimeout(() => {
						item.y = roundY

					}, 10)

					//标记时间
					item.markTime = num % 2 ? this.clock[num / 2 - 0.5] + '.30' : this.clock[num / 2] +
						'.00'

				}

			},
			existingPlanPush() {
				this.StoragedPlan.forEach((item, index) => {

					if (item.checked) {
						Object.assign(item, {
							markTime: null
						})
						let e = {
							y: 100 * index,
							oldY: 0,
							x: 0
						}
						let obj = Object.assign(e, item)

						this.plan.push(obj)
					}
				})

				this.maskShow = !this.maskShow

			},
			changeTime(e, index) {
				let item=this.plan[index]
				t = timToY(this.startTime, this.endTime, this.clockHeight)
				console.log(this.plan,index)
				let time=e.detail.value
			
				if(time>this.endTime) time=this.endTime+":00"
				if(time<this.startTime) time=this.startTime+":00"
				item.markTime=time
				item.y=t(item)

			},
			submit() {

				this.plan.forEach((item) => {
					if (!item.markTime) {
						uni.showToast({
							title: '有尚未设定时间的计划'
						})
						return
					}
				})


				var data = this.plan.map(item => {

					let {
						detail,
						markTime,
						subject,
						title
					} = item
					return {
						detail,
						markTime,
						subject,
						title
					}
				})

				uni.navigateTo({
					url: '../newSchedule/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据

						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data
						})
					},
				})


			}
		},
		onLoad(option) {

			const eventChannel = this.getOpenerEventChannel()

			eventChannel.on('acceptDataFromOpenerPage', (data) => {

				var key = data.key

				ar = uni.getStorageSync('schedule')[key].schedule;
				//获得数据,根据时间移动到近似位置
				if (ar) {
					var t = timToY(this.startTime, this.endTime, this.clockHeight)
					this.plan = ar.map((item) => {
						return Object.assign({
							y: t(item),
							odlY: 0
						}, item)
					})
				}
			})
		},
		created() {
			this.StoragedPlan = uni.getStorageSync('plan')


			// this.test();
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: white;
		margin-top: 12px;
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: .8s;
	}

	.fade-enter,
	.fade-leave-to {
		opacity: 0;
		top: 100% !important
	}

	.fade-enter-to,
	.fade-leave {}

	.modal {
		overflow-y: scroll;
		position: absolute;
		top: 50%;
		background-color: $assistance;
		height: 50%;
		width: 100%;
		z-index: 10;

		.button {

			width: 200rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: $assistance;
			margin: 100rpx auto 0;
			text-align: center;
			font-size: 16px;
			background-color: $bg;
			border-radius: 40rpx;
		}

		.subject {
			width: 100px;
			font-size: 16px;
			color: $bg;
		}

		.active {
			color: gray;

		}

		.boxWrap {
			display: flex;

			flex-wrap: wrap;

			.box {
				background-color: $bg;
				color: $assistance;

				width: 27%;
				border-radius: 10rpx;
				padding: 10rpx;
				font-size: 16px;
				height: 150rpx;
				display: flex;
				flex-direction: column;
				margin-left: 2%;
				justify-content: space-between;
				border: 1px $bg solid;
			}

			.checked {
				border: 1px red solid;
			}
		}
	}

	.top {
		color: $text;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		padding-bottom: 10rpx;

		.setTime {

			display: flex;
			justify-content: flex-end;
			margin-bottom: 10px;
			padding-left: 10px;

			input {
				width: 40rpx;
				@include border-bottom;
				text-align: center;
				box-sizing: border-box;
			}
		}

	}

	.bg {
		text-align: center;
		font-size: 60px;
		position: absolute;
		width: 100%;

	}

	.left {

		color: white;
		font-size: 30px;
		background-color: #ff3a3a;
		width: 60rpx;
		z-index: 0;
		position: fixed;
		transition: 0.4s;
		opacity: 0;

	}

	.leftShow {
		opacity: 1;

	}

	.content {
		overflow-x: hidden;
		color: $bg;
		width: 100%;

		.area {
			font-size: 16px;

			width: 50%;

			.plan {


				color: white;

				.title {
					background-color: $bg;
					width: 220rpx;
					border-radius: 13px 13px 0 0;
					font-size: 14px;
					display: flex;
					align-items: center;
					
				}

				.detail {
					background-color: $bg;
					width: 220rpx;
					border-radius: 0 0 13px 13px;
					max-height: 90rpx;
					overflow: hidden;
				}

				view {

					margin-left: 30px;
					padding-left: 10px;
					font-size: 18px;
					text-overflow: ellipsis;
					white-space: normal;
					overflow: hidden;
					box-shadow: 1px 1px 1px 1px;
				}

				.hr {
					width: 750rpx;
					margin: 0;
					background-color: $bg;
					border: 0;
					height: 1px;
				}
			}
		}

		.timeLine {
			position: absolute;
			right: 0px;


			width: 100rpx;
			text-align: center;
			font-size: 20px;

		}

		.submit {
			position: relative;
			left: 50%;
			transform: translateX(-75px);
			border: 0px;
			margin: auto auto;
			width: 150px;
			background-color: rgba($bg, $alpha: 0.0);
			border-radius: 25px;
			height: 50px;
			font-size: 20px;
			text-align: center;
			color: white;
		}
	}
</style>

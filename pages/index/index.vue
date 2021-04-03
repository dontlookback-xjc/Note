<template>
	<view style="overflow-y: scroll;width: 750rpx;">
		<myMask :title="title" >
			<view class="content" :style="{height:viewHeight}">
				<view class="top">
					<text v-if="todaySchedule">
						今天有{{todaySchedule.schedule.length}}项计划</text>
					<text v-else="todaySchedule">
						今天还没有安排计划</text>
				</view>

				<view class="week">

					<view class="day" v-for="(item,index) in day" :class="{'active':w==index}">
						周{{'日一二三四五六'.substr(index,1)}}<br>
						<text>{{item}}</text>

						<view class="i" v-if="schedule[date[index]]">
							<uni-icons size="14" :color="w==index?'white':'rgb(81, 157, 204)'"
								type="smallcircle-filled">
							</uni-icons>
						</view>
					</view>
				</view>
				<scheduleList :schedule="todaySchedule"></scheduleList>
				<view class="bottom">
					<view @click="newSchedule">New Schedule</view>
				</view>
			</view>
		</myMask>

	</view>


</template>

<script>
	import myMask from "@/components/mask/index.vue"
	import scheduleList from "@/components/schedule/index.vue"
	export default {
		data() {
			return {
				viewHeight: 0,
				title: 'Index',
				day: [],
				date: [],
				w: null,
				schedule: null,
			}
		},

		components: {
			myMask,
			scheduleList
		},
		computed: {
			todaySchedule() {
				let result = this.schedule[this.date[this.w]]
				if (result) return result


			}
		},
		methods: {
			newSchedule() {
				uni.navigateTo({
					url: '../setSchedule/index'
				})
			}

		},
		created() {
		
			this.viewHeight = this.bus.getViewHeight();
			this.viewHeight = this.bus.viewHeight - 44 + "px"
			var date = new Date();
			var y, w, d, m
			y = date.getFullYear();
			w = date.getDay();
			d = date.getDate()
			m = date.getMonth();
			this.w = w
			var sunday = new Date(y, m, d - w).getDate()
			var endDay = new Date(y, m, 0).getDate()
			//不跨月
			if (sunday + 6 <= endDay) {
				let result = Array.from(Array(sunday + 6 + 1).keys()).slice(sunday)
				this.day = result
				let Date = y + '.' + (m + 1) + '.'
				this.date = result.map(item => Date + item)

				// 跨月
			} else {
				//跨月数组左
				let result = Array.from(Array(endDay + 1).keys()).slice(sunday)
				let i = 1;
				let lastDate

				//跨年
				if (m == 0) {
					lastDate = y - 1 + '.12.'
				} else {
					// 不跨年
					lastDate = y + '.' + m + '.'
				}

				this.date = result.map(item => lastDate + item)
				//跨月数组右
				lastDate = y + '.' + (m + 1) + '.'

				while (result.length != 7) {
					result.push(i);
					this.date.push(lastDate + i++)
				}
				this.day = result

				// sunday

			}

			// this.date.forEach((item,index)=>{if(this.schedule[item]) return index)})
		},onShow() {
				this.schedule = uni.getStorageSync('schedule')
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-flow: column;
		height: 100%;
		font-size: 16px;
		color: rgba($text, $alpha: 1.0);

		// align-items:flex-start;
		// justify-content: flex-end;
		// align-content:flex-start;

		.top {
			background-image: url(135527719.jpg);
			background-size: 100%;
			font-size: 30px;
			width: 100%;
			color: white;
			height: 300rpx;
		}

		.active {
			background-color: $text;
			color: $assistance;
		}

		.week {
			display: flex;
			width: 100%;
			background-color: $assistance;

			.day {

				height: 140rpx;
				font-size: 18px;
				text-align: center;
				flex: 1;

				.i {
					margin: 0 auto;
					position: relative;
					top: -8px;
				}
			}

		}

		.bottom {
			display: flex;
			flex: 1;
			align-items: flex-end;
			justify-content: flex-end;

			width: 100%;
			box-sizing: border-box;
			padding: 0 30rpx 20rpx;
		}

	}
</style>

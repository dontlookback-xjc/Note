<template>

	<view>
		<view class="topics" :style="{left:showTopics?'0':ListLeft}">

			<!-- #ifndef MP-WEIXIN -->
			<transition name="fade">

				<component :is="componentName" style="position: relative;" v-show="!temp">
					<!-- 获得父列表 -->
					<!-- cb后为 1级 有temp 为all,cb前0级无temp all . cb后0级有temp 点,cb前1级无temp点  -->
					<view @click="delayClick(all)" v-html="level+Boolean(temp)==1 ?'...':'All'">

					</view>
				</component>
			</transition>
			<view class="transition" 
			v-for="(value,index) in temp?temp:list " 
			:key="index" :class="{'show':hiding?index>showIndex:index<showIndex}">


				<component :is="componentName" 
					>
					<!-- /获得子列表 -->
					<view @click="delayClick(showMessage,value);">
						<!-- {{level?value:index}} -->
						{{level+Boolean(temp)==1?value.name:value}}
					</view>
				</component>
			</view>
			<!-- #endif -->

		</view>
	</view>
</template>

<script>
	var interval = 0
	var delayTime
	import box from '@/components/menu/box.vue'
	export default {
		data() {
			return {

				showIndex: 0,
				hiding: 0,
				ListLeft: '-260rpx',
				showTopics: false,
				keyName: '',
				level: 0,
				temp: null,
				unsorted: [],
				schedule:[]

			}
		},
		props: {
			componentName: {
				type: String,
				default: 'box'
			}


		},
		computed: {

			list() {
				//二级
				if (this.level) {
					if (this.keyName) return this.sorted[this.keyName]
					else {
						return this.unsorted
					}
					return
				}
				//一级
				else {
					return Object.keys(this.sorted)
				}
			},
			duration() {
				let ar = this.temp ? this.temp : this.list

				return Math.ceil(2 / ar.length) * 150



			},

			sorted() {
				let set = {};
				//无分类数据
				let key
				for (key in this.schedule) {
					let item = this.schedule[key]
					this.unsorted.push(item)
					if (!set[item.type]) {
						set[item.type] = []
					}
					set[item.type].push(item)
				}

				return set
			},

		},
		methods: {
			all() {
				if (this.level) {
					this.level = 0;
				} else {
					this.level = 1;
				}
			},
			showSwitch(add = true) {
				if (interval) {
					return;
				}
				add ? this.hiding = 0 : this.hiding = 1;
				this.showIndex = 0;
				//根据数量返回合适时间间隔
				let flag
				if (true) {
					interval = setInterval(() => {

						this.showIndex += 1;

						if (!add) {
							let sub

							if (this.temp) {
								sub = this.temp.length
							} else sub = this.list.length


							flag = this.showIndex % sub;
						} else {
							flag = this.showIndex % this.list.length
						}
						//结束判断
						if (!flag) {
							clearInterval(interval)
							interval = 0;
						}
					}, this.duration)
				}

			},
			delayClick(cb) {
				var params = Array.prototype.slice.call(arguments, 1)

				this.temp = JSON.parse(JSON.stringify(this.list))
				cb(...params)


				//等返回按钮隐藏
				setTimeout(() => {
					this.showSwitch(false);
					setTimeout(() => {
						this.temp = null;
						this.showSwitch();
					}, delayTime)

				}, this.duration)

			},
			showMessage(item) {
				if (this.level) {

					uni.navigateTo({
						url: '../../pages/setSchedule/index',
						success: (res) => {
							// 通过eventChannel向被打开页面传送数据

							res.eventChannel.emit('acceptDataFromOpenerPage', {
								key: item.date
							})
						},
					})
					return
				} else {
					this.keyName = item
					this.level = 1
				}
			},

		},

		components: {
			box
		},
		created(){
			this.schedule=uni.getStorageSync('schedule')
			this.bus.$on('schedule', (schedule) => {
				this.schedule=schedule
			})
		}
		,
		mounted() {
			
		
			
		
			//点击菜单
			this.bus.$on('showTopics', () => {
		
				if (!delayTime) {
				if(document){
					var dom = document.getElementsByClassName('transition')
						var time = getComputedStyle(dom[0], null)['transition-duration']
						delayTime = time.slice(0, -1) * 1000
				
				}
					
					//无初始数据 无标签获取数据
					
				
				
					else{
							delayTime = 700
					}
					

		
				}
				this.showTopics = !this.showTopics;

				if (this.showTopics) setTimeout(this.showSwitch, 50)
				else this.showSwitch(false)
			})

		}

	}
</script>

<style lang="scss">
	.mask {
		background-color: rgba($color: #000000, $alpha:0.2);
		width: 700px;
		height: 100%;
		left: 0;
		position: absolute;
		z-index: 19;

	}

	// 1
	.topics {
		position: absolute;
		z-index: 20;
		background-color: rgba($color:$bg, $alpha: 1);
		height: 1000px;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		width: 260rpx;
		transition: 0.7s;

		.fade-enter-active,
		.fade-leave-active {
			transition: .8s;
		}

		.fade-enter,
		.fade-leave-to {
			opacity: 0;
			left: -80rpx
		}

		.fade-enter-to,
		.fade-leave {
			left: 0rpx
		}

		.transition {
			transition: 0.7s;
			position: relative;

			opacity: 0;
			left: -80rpx;

		}

		.show {
			opacity: 1 !important;
			left: 0rpx !important;
		}

	}
</style>

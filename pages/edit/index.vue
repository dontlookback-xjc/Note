<template>
	<view>
		<uni-nav-bar left-icon="home"  @clickLeft="bus.toIndex"  @clickRight="multiple=!multiple" :right-text="multiple?'取消':'多选'" title="Edit"
			backgroundColor="rgba( 173,215,237)" fixed="true" color="white"></uni-nav-bar>
		<view style="display: flex;"> 
		<view class="tab" :class="{'stab':tabIndex==1}" @click="tabIndex=0">Schedule   </view>
		<view  class="tab" :class="{'stab':tabIndex==0}" @click="tabIndex=1">Plan</view>
		</view>
		
		<empty v-if="!schedule.length&&tabIndex==0" />

		<transition name="slide-fade">
			<view  v-if="tabIndex===0" class="content" :style="{left:multiple?'0rpx':left,height:bus.viewHeight}" >
				<view v-if="schedule.length" v-for="(item,index) in schedule" :key="item.addTime">
					<!-- 行 -->
					<label class="schedule">
						<!-- 左 -->
						<checkbox-group @change="change">
							<checkbox class="left" :value="index.toString()" :style="{opacity:multiple?1:0}" />
						</checkbox-group>
						<!-- 中 -->
						<view style="height: 100rpx;width: 500rpx;padding:0 50rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view>日程: <text style="color: gray;">{{" "+item.name}}</text></view>
								<view style="font-size: 16px;">
									{{item.addTime|time }}
								</view>
							</view>

							<view class="plan">事项：
								<view v-for="(plan,pindex) in item.schedule" class="cell" style="color: gray;">

									{{plan.title}}
								</view>
							</view>

						</view>
						<!-- 右 -->
						<view class="left" style="font-size: 26px;" :style="{opacity:multiple?0:1}">
							<svg class="icon" aria-hidden="true" @click="edit(index)">
								<use href="#icon-bianji"></use>
							</svg>
						</view>

					</label>

				</view>
				
			</view>
		</transition>
			<view style="position: absolute;left: 50%;bottom: 100rpx; transform: translateX(-75px);">
				<bubbleButton 
				　:isExpand="isExpand" 
				:handleClick="tabIndex==0?editSchedule:editPlan" 
				:text="multiple?'Delete':'New'">
				</bubbleButton>
			</view>
			<empty v-if="!plan.length&&tabIndex==1" />
		<transition  name="slide-fade">
			<view class="content" :style="{left:multiple?'0rpx':left}" v-if="tabIndex==1">
				<view  v-if="plan.length" v-for="(item,index) in plan" :key="item.detail">
					<!-- 行 -->
					<label class="schedule">
						<!-- 左 -->
						<checkbox-group @change="change">
							<checkbox class="left" :value="index.toString()" :style="{opacity:multiple?1:0}" />
						</checkbox-group>
						<!-- 中 -->
						<view style="height: 100rpx;width: 500rpx;padding:0 50rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view>事项: <text style="color: gray;">{{" "+item.title}}</text></view>
								<view style="font-size: 16px;">
									{{item.subject}}
								</view>
							</view>

							<view class="plan">计划：
								<view style="color: gray;">
									{{item.detail}}
								</view>
							</view>

						</view>
						<!-- 右 -->
						<view class="left" style="font-size: 26px;" :style="{opacity:multiple?0:1}">
							<svg class="icon"  style="color: #aa0000;"  aria-hidden="true" @click="deletePlan(index)">
								<use href="#icon-shanchudefuben"></use>
							</svg>
						</view>

					</label>

				</view>
				
			</view>
		</transition>
	
	</view>
</template>

<script>
	import d from "@/js/Date.js"
	import bubbleButton from "@/components/bubbleButton.vue"
	import empty from "@/components/empty/index.vue"
	export default {
		data() {
			return {
				schedule: [],
				multiple: false,
				left: '-150rpx',
				check: [],
				isExpand: false,
				tabIndex: 0,
				plan:[]
			}
		},
		filters: {
			time(item) {

				return d(item).Format('yyyy.M.d')
			}
		},
		components: {
			bubbleButton,
			empty
		},
		methods: {
			
			editSchedule() {
				if(!this.multiple){
					uni.navigateTo({
						url:'../setSchedule/index'
					})
					return
				}
				
				this.check.sort()
				this.isExpand = true
				this.multiple = false
				let ar=this.tabIndex?this.plan:this.schedule
				
				for (var i = this.check.length - 1; i >= 0; i--) {
					ar.splice(this.check[i], 1)
				}
				uni.setStorage({
					key: this.tabIndex?'plan':'schedule',
					data: ar
				})
				setTimeout(() => {
					this.isExpand = false
				}, 300)

			
			},
			edit(index) {

				uni.navigateTo({
					url: '../setSchedule/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据

						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data: this.schedule,
							index
						})
					},
				})
			},
			editPlan(index){
				
				if(!this.multiple){
					uni.navigateTo({
						url:'../plan/index'
					})
					return
				}
				this.plan.splice(index,1)
				uni.setStorage({
					key: 'plan',
					data: this.plan
				})
			},
			change(e) {
				this.check.push(e.detail.value[0])
				// this.check[index]=e.detail.value
				// console.log(this.check)
			}
		
		},
		created() {
			uni.getStorage({
				key: 'schedule',
				success: (res) => {
					this.schedule = res.data
					console.log('this.schedule', this.schedule)
				}
			})
			uni.getStorage({
				key: 'plan',
				success: (res) => {
					this.plan = res.data
					console.log('this.plan', this.plan)
				}
			})

		}
		,
		onShow(){
			if(this.bus.viewHeight) return 
			uni.getSystemInfo({
							success:(res)=>{
								console.log(JSON.stringify(res))
								// this.viewHeight=res.windowHeight-44+'px'
								this.bus.viewHeight=res.windowHeight
								this.viewHeight=this.bus.viewHeight-63-44+'px'

							}
						});
		}
	}
</script>

<style lang="scss">
	
	.slide-fade-enter-active{
		transition:  .3s ease; 
	}
	.slide-fade-leave-active{
		transition: .3s ease; 
	}
	.slide-fade-enter, .slide-fade-leave-to{
		 transform: translateX(-750rpx);
		 opacity: 0;
	}
	.tab{
		margin:20rpx 20rpx ;
		padding: 20rpx 40rpx;
		border-radius: 40rpx;
		height: 46rpx;
		font-size: 18px;
		color: $assistance;
		background-color: $bg;
		
	}
	.stab{
		color: $bg;
		background-color: $assistance;
		
	}
	
	.content {

		font-size: 18px;
		color: $text;
		overflow-x: hidden;
		position: relative;
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

				.cell {
					width: 100rpx;
				}
			}

		}
	}
</style>

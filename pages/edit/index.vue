<template>
	<view>
		<uni-nav-bar left-icon="list" @clickRight="multiple=!multiple" :right-text="multiple?'取消':'多选'" title="Edit"
			backgroundColor="rgba( 173,215,237)" fixed="true" color="white"></uni-nav-bar>
		<empty v-if="!schedule.length" />

		<view class="content"  :style="{left:multiple?'0rpx':left}" v-else>
			<view v-for="(item,index) in schedule" :key="item.addTime">
				<!-- 行 -->
				<label class="schedule" >
					<!-- 左 -->
					<checkbox-group @change="change">
						<checkbox class="left" :value="index.toString()"  :style="{opacity:multiple?1:0}"/>
					</checkbox-group>
					<!-- 中 -->
					<view style="height: 100rpx;width: 500rpx;padding:0 50rpx;">
						<view style="display: flex;justify-content: space-between;">
							<view>{{item.name}}</view>
							<view style="font-size: 16px;">{{item.addTime|time }}</view>
						</view>
						
						<view class="plan">
							<view v-for="(plan,pindex) in item.schedule.data" class="cell">
								{{plan.title}}
							</view>
						</view>

					</view>
					<!-- 右 -->
					<view class="left" style="font-size: 26px;"   :style="{opacity:multiple?0:1}">
						<svg class="icon" aria-hidden="true" @click="edit(index)">
							<use :href="'#icon-bianji'"></use>
						</svg>
					</view>

				</label>

			</view>
			<view style="position: fixed;left: 50%;bottom: 100rpx; transform: translateX(-75px);"> 
				<bubbleButton 　:isExpand="isExpand"
				:handleClick="handleClick"   text="Delete"></bubbleButton>
			</view>
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
				left:'-150rpx',
				check:[],
				isExpand:false
			}
		},
		filters: {
			time(item) {
		
				return d(item).Format('yyyy.M.d')
			}
		},
		components:{
			bubbleButton,
			empty
		},
		methods:{
			handleClick(){
				this.check.sort()
				this.isExpand=true
				this.multiple=false
				for( var i=this.check.length-1;i>=0;i--){
					 this.schedule.splice(this.check[i],1)
				}
				uni.setStorage({
					key:'schedule',
					data:this.schedule
				})
				setTimeout(()=>{this.isExpand=false},300)
				
				console.log(this.schedule)
			},
			edit(index){
				
				uni.navigateTo({
					url: '../setSchedule/index',
					success: (res) => {
						// 通过eventChannel向被打开页面传送数据
					
						res.eventChannel.emit('acceptDataFromOpenerPage', {
							data:this.schedule,
							index
						})
					},
				})
			}
			,
			change(e){
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
					console.log('this.schedule',this.schedule)
				}
			})

		}
	}
</script>

<style lang="scss">
	.content {

		font-size: 18px;
		color: $text;
		overflow-x: hidden;
		position: relative;
		transition: .7s;
		width: 1125rpx;
		.schedule {
			
			padding: 10rpx 0;
			display: flex;
			.fade{
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

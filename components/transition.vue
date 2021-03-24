<template>

	<view class="topics" :style="{left:ListLeft}">
	
<transition name="fade">
	
	<component :is="componentName" 	 style="position: relative;" v-show="backShow">
			<!-- 获得父列表 -->
			<view @click="delayClick(backHandle)">
				···
			</view>
		</component>
	</transition>
	 
		<component :is="componentName"  
		:class="{'show':(index<showIndex)-hiding,'transition':true}"
			v-for="(value,index) in externalData " :key="index">
		<!-- /获得子列表 -->
			<view @click="delayClick(handleClick,value);">
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
				ListLeft:'-260rpx',
				backShow:false
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
			},
			backHandle:{
				type: Function,
				default: () => {}
			},

		},
		computed:{
			//与css过渡时间统一。
			delayTime(){
				var dom=document.getElementsByClassName('transition')
				var duration=getComputedStyle(dom[0], null)['transition-duration']
				duration=duration.slice(0,-1)*1000
				return duration
			}
		},
		 watch: {
		    externalData(){
				console.log(this.externalData)
				   this.showSwitch();
		    }
		  },
		methods: {
			showSwitch(add = true) {
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
						let flag = this.showIndex % this.externalData.length;
						//结束判断
						if (!flag) {
							clearInterval(interval)
							interval = 0;
						
						}
					}, duration)
				}

			},
			delayClick(cb){
				this.showSwitch(false);
				var params=Array.prototype.slice.call(arguments,1)
				setTimeout(()=>{
					this.backShow=cb===this.handleClick?1:0
					cb(...params)
					
					},this.delayTime)
			}
		},

		components: {
			box
		},
		mounted(){
			
			//点击菜单
			this.bus.$on('showTopics',()=>{
				this.ListLeft='0';
				setTimeout(this.showSwitch,50)
			})
			
				
		}
	}
</script>

<style lang="scss">
	// 1
	.topics {
		position: absolute;
		background-color: rgba($color:$cyan, $alpha: 0.7);
		height: 100%;
		padding: 10rpx 20rpx;
		box-sizing: border-box;
		width: 260rpx;
		transition: 0.7s;
			
		.fade-enter-active,.fade-leave-active{
			transition:  .7s;
		}
		
		.fade-enter, .fade-leave-to {
		  opacity: 0;
		  left:-80rpx
		}
		.fade-enter-to, .fade-leave {	  
		  left:0rpx
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

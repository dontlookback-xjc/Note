<template>
	
	<view style="height:700px ;width: 750rpx;">
	<view  class="mask" v-show="this.showTopics"></view>

	<view class="topics" :style="{left:showTopics?'0':ListLeft}">
		
		<!-- #ifdef MP-WEIXIN -->
	<transition name="fade">
	
		<box 	 style="position: relative;" v-show="backShow">
				<!-- 获得父列表 -->
				<view @click="delayClick(backTopics)">
					···
				</view>
			</box>
		</transition>
		 
			<box  
			:class="{'show':(index<showIndex)-hiding,'transition':true}"
				v-for="(value,index) in myData " :key="index">
			<!-- /获得子列表 -->
				<view @click="delayClick(showMessage,value);">
					{{value[keyName]}}
				</view>
			</box>
		 <!-- #endif -->
		 
	  <!-- #ifndef MP-WEIXIN -->
	  <transition name="fade">
	  
	  	<component :is="componentName" 	 style="position: relative;" v-show="backShow">
	  			<!-- 获得父列表 -->
	  			<view @click="delayClick(backTopics)">
	  				···
	  			</view>
	  		</component>
	  	</transition>
	  	 
	  		<component :is="componentName"  
	  		:class="{'show':(index<showIndex)-hiding,'transition':true}"
	  			v-for="(value,index) in myData " :key="index">
	  		<!-- /获得子列表 -->
	  			<view @click="delayClick(showMessage,value);">
	  				{{value[keyName]}}
	  			</view>
	  		</component>
	   <!-- #endif -->

	</view>
</view>
</template>

<script>
	
	var interval = 0
	import box from '@/components/menu/box.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				showIndex: 0,
				hiding: 0,
				ListLeft:'-260rpx',
				
				backShow:false,
				showTopics:false,
				
				plan: [],
				myData:undefined,
				keyName:'subject',
			
			}
		},
		props: {
			componentName: {
				type: String,
				default: 'box'
			},
		

		},
		computed:{
			//与css过渡时间统一。
			
			delayTime(){
				// #ifndef MP-WEIXIN
					var dom=document.getElementsByClassName('transition')
					var duration=getComputedStyle(dom[0], null)['transition-duration']
					duration=duration.slice(0,-1)*1000
					return duration
				// #endif
				
			// #ifdef MP-WEIXIN
			
				return 700
			// #endif
						
			
			},
			list(){
				this.plan.Map((item,index)=>{return item.index=index})
			},
			//{key(string type):value（array plans}}
			secondTopics() {
				let set = {};
				//无分类数据
				this.plan.forEach((item) => {
					if (!set[item.subject]) {
						set[item.subject] = []
					}
					set[item.subject].push(item)
				})
				return set
			},
			topics() {
				let result = []
				for (let key in this.secondTopics) {
					result.push({subject:key})
				}
				return result
			}
		},
		 watch: {
		    myData(){
				if(this.showTopics)  this.showSwitch();
		    }
		  },
		methods: {
			showSwitch(add = true) {
				var duration
				if (interval) {
					return;
				}
				// this.hiding == add ? this.showIndex = 0 : '';
				this.showIndex = 0;
				add ? this.hiding = 0 : this.hiding = 1;
				//根据数量返回合适时间间隔
					if (this.myData.length) {
					duration = Math.ceil(2 / this.myData.length) * 150
					
					interval = setInterval(() => {
						this.showIndex += 1;
						let flag = this.showIndex % this.myData.length;
						//结束判断
						if (!flag) {
							clearInterval(interval)
							interval = 0;
						}
					}, duration)
				}

			},
			delayClick(cb){
				// if(cb===this.handleClick) {
				// 	setTimeout(()=>{
				// 	this.backShow=1
				// 	},this.delayTime)
					
				// }
				// else{
				// 	this.backShow=0
				// }
				this.backShow=0

				if(cb===this.handleClick) {
					setTimeout(()=>{
					this.backShow=1
					},this.delayTime)
					
				}

				this.showSwitch(false);
				var params=Array.prototype.slice.call(arguments,1)
				setTimeout(()=>{
					cb(...params)
					},this.delayTime)
			},
			showMessage(item) {
				if(item.index) {
					uni.navigateTo({
					
				})
					return
				}
				else{
					this.myData = this.secondTopics[item.subject];
					this.keyName='title'
				}
				
			},
			backTopics() {
				this.myData = this.topics;
			}
		},

		components: {
			box
		},
		mounted(){
			this.plan=this.bus.plan
			this.bus.$on('change',()=>{
				this.plan=this.bus.plan
			
			})
			this.myData=this.topics
			//点击菜单
			this.bus.$on('showTopics',()=>{
			this.showTopics=!this.showTopics;
			if(this.showTopics) setTimeout(this.showSwitch,50)
			else setTimeout(this.showSwitch(false),50)
			})
			
				
		}
	}
</script>

<style lang="scss">
	.mask{
		background-color: rgba($color: #000000, $alpha:0.2);
		width: 700px;
		height: 100%;
		left: 0;
		position: absolute;
		z-index: 19;
	}
	// 1
	.topics {
		position: relative;
		z-index: 20;
		background-color: rgba($color:$bg, $alpha: 1);
		height: 1000px;
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

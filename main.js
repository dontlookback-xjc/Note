import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.bus = new Vue({
	data: {
		schedule:[],
		viewHeight: 0
	},
	watch: {
		schedule(){
			this.$emit('schedule',this.schedule)
		}

	},
	methods: {
		toIndex() {

			uni.navigateTo({
				url: "../index/index",
				// success: () => {
				// 	uni.showToast({
				// 		title:'未设定数据',
				// 	  duration: 2000
						
				// 	})
				// }
			})
		},
		 getViewHeight(){
			let res=uni.getSystemInfoSync()
			this.viewHeight=res.windowHeight;
			
			return res.windowHeight
		
		}
	},
	beforeMount(){
		
	},
	created() {
		let stroaged = uni.getStorageSync('plan')
		
		if (!stroaged || stroaged.length) {
			uni.setStorage({
				key: 'plan',
				data: [
					{
						title: "学习vue",
						subject: "学习",
						detail: "写项目"
					},
					{
						title: "跑步",
						subject: "运动",
						detail: "慢跑二十分钟"
					},
					{
						title: "买菜",
						subject: "生活",
						detail: "买蔬菜买牛奶"
					}
				]
			})
		}
	}
})
const app = new Vue({
	...App
})
app.$mount()

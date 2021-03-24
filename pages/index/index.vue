<template>
	<view>
		<uni-nav-bar left-icon="list" @clickLeft="bus.$emit('showTopics')" right-text="菜单" title="Note"
			backgroundColor="#55dbff" fixed="true" shadow="true" color="white"></uni-nav-bar>

		<transitionList ref="list" :externalData="list.length?list:topics" :handleClick="showMessage"
			:backHandle="backTopics"></transitionList>
	</view>
</template>

<script>
	import transitionList from "@/components/transition.vue"
	import data from "./data.js"
	export default {
		data() {
			return {
				plans: data,
				list: [],


			}
		},
		methods: {
			showMessage(value) {
				this.list = this.secondTopics[value]
			},
			backTopics() {
				this.list = this.topics;
			}
		},
		components: {
			transitionList
		},
		computed: {
			//{key(string type):value（array plans}}
			secondTopics() {
				let set = {};
				//无分类数据
				this.plans.forEach((item) => {
					if (!set[item.type.name]) {
						set[item.type.name] = []
					}
					set[item.type.name].push(item.name)
				})
				return set
			},
			topics() {
				let result = []
				for (let key in this.secondTopics) {
					result.push(key)
				}


				return result
			}
		},
		//加上这行会产生正常数据
		// mounted(){
		// 	console.log(this.topics,this.list)
		// }


	}
</script>

<style lang="scss">
</style>

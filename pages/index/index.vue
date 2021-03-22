<template>
	<view>
		<uni-nav-bar left-icon="back" right-text="菜单" title="Note" backgroundColor="#55dbff" fixed="true" shadow="true"
			color="white"></uni-nav-bar>
		<transition :externalData="list" :handleClick="showMessage" ></transition> </transition>
	</view>
</template>

<script>
	import transition from "@/components/transition.vue"
	import data from "./data.js"
	export default {
		data() {
			return {
				plans:data,
				list:[],
			}
		},
		methods: {
			showMessage(value){
				return ()=>{
					this.list=this.secondTopics[value]
				}
			}
		},
		components: {
			transition
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
			topics(){
				let result=[]
				for (let key in this.secondTopics){
					result.push(key)
				}
				console.log('topics',result)
				return result
			}
		},
	mounted(){
		this.list=this.topics
	}

	}
</script>

<style lang="scss">
</style>

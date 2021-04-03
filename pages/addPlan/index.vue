<template>
	<view>
		

		<uni-nav-bar left-icon="back" @clickLeft="back" right-text="" title="Add Plan"
			backgroundColor="rgba( 173,215,237)"  shadow="true" color="white"></uni-nav-bar>
			<myForm :formClass="formClass" :handleSubmit="checkForm"
			 :formAttribute="formAttribute"  ></myForm>
		
		</view>
</template>

<script>
	import myForm from "@/components/plan/plan.vue"

	import formClass from "@/components/plan/form.js"
	export default {
		data() {
			return {
				formAttribute: [
					{
						input: 'title',
						text: ''
					},
					
					{
						input: 'detail',
						text: ''
					}
				],
				formClass,
				
				plan:[]
			};
		},
		methods:{
			checkForm(form){
				let result=true;
				form.forEach((item) => {
					if (!item.text) {
						item.flag=true
						item.message = "value required"
						result = false
					}
							
				})
			
			if(result){
			
			var formData=form.reduce(
				(total, item) => {
					let obj = {};
					if(item.input=='date'){
						obj[item.input] = item.text.replace(/-/g,'.')
					}
					else
					obj[item.input] = item.text
					return Object.assign(total, obj)
				}, {})
			
				let pages=getCurrentPages();
				if(pages.length>1){
					let lastPage=pages.length>1?pages[pages.length-2]:''
					lastPage.plan.push(formData)
					uni.navigateBack()
				}
				else{
					uni.showToast({
						title:'请重新进入'
					})
					uni.navigateTo({
						url:'../index/index'
					})
				}

			}
			},
			back(){
				let pages=getCurrentPages();
				if(pages.length>1){
				
					uni.navigateBack()
				}
				else{
					uni.navigateTo({
						url:'../index/index'
					})
				}
				
			}
		},
		components:{
			myForm
		
	
		},
		mounted(){
			
		}
	}
</script>

<style lang="scss">
	
</style>

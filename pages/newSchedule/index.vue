<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="back" right-text="" title="Add Plan"
			backgroundColor="rgba( 173,215,237)" shadow="true" color="white"></uni-nav-bar>
		<myForm :formClass="formClass" :handleSubmit="checkForm" :formAttribute="formAttribute"></myForm>

	</view>
</template>

<script>
	var update,schedule,index
	import myForm from "@/components/plan/plan.vue"

	import formClass from "@/components/plan/form.js"
	var openerPage
	export default {
		data() {
			return {
				formAttribute: [{
						input: 'type',
						text: ''
					},

					{
						input: 'name',
						text: ''
					}
				],
				formClass,
				isExpand: false,
				update:false
			};
		},
		methods: {
			async checkForm(form) {
				
				var formData=form.reduce(
					(total, item) => {
						let obj = {};
						obj[item.input] = item.text
						return Object.assign(total, obj)
					}, {})
				
				let result = true;
				form.forEach((item) => {
					if (!item.text) {

						item.message = "value required"
						result = false
					}

				})
			
				if (result) {
				
					if (openerPage) {
						
						var obj = {
							addTime: new Date().getTime(),
							schedule: openerPage
						}
						Object.assign(obj, formData)

						await new Promise((resolve) => setTimeout(resolve, 300))
						if(update){
						
							schedule[parseInt(index)]=obj
							uni.setStorage({
								key: 'schedule',
								data: schedule,
								success: () => {
									uni.navigateTo({
										url: '../schedule/index',
										success: (res) => {
											// 通过eventChannel向被打开页面传送数据
										
											res.eventChannel.emit('acceptDataFromOpenerPage', {
												data:obj
											})
										},
										
									})
								
								}
							});
							return
						}
						schedule = uni.getStorageSync('schedule')
						if(!schedule.length) schedule=[];
						schedule.push(obj)
						uni.setStorage({	
							key: 'schedule',
							data: schedule,
							success: () => {
								uni.navigateTo({
									url: '../schedule/index',
									success: (res) => {
										// 通过eventChannel向被打开页面传送数据
									
										res.eventChannel.emit('acceptDataFromOpenerPage', {
											data:obj
										})
									},
									
								})
							
							}
						});
					
					} else {
						uni.showToast({
							title: '请重新进入'
						})
						uni.navigateTo({
							url: '../index/index'
						})

					}

				}
			},
			submit() {

			},
			back() {
				let pages = getCurrentPages();
				if (pages.length > 1) {
					uni.navigateBack()
				} else {
					uni.navigateTo({
						url: '../index/index',
						events: {}
					})
				}

			}
		},
		components: {
			myForm


		},

		onLoad(option) {

			const eventChannel = this.getOpenerEventChannel()
		
			eventChannel.on('acceptDataFromOpenerPage', function(data) {
				 update=data.update
				 schedule=data.schedule
				 console.log(schedule)
				 index=data.index
				openerPage = data.data
			})
		}
	}
</script>

<style lang="scss">

</style>

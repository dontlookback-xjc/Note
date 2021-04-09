<template>
	<view>
		<uni-nav-bar left-icon="back" @clickLeft="back" right-text="" title="Set Schedule"
			backgroundColor="rgba( 173,215,237)" shadow="true" color="white"></uni-nav-bar>
		<view>



			<myForm :formClass="formClass" :handleSubmit="checkForm" :formAttribute="formAttribute"></myForm>




		</view>


	</view>

</template>

<script>
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
						input: 'date',
						text: ''
					},
					{
						input: 'name',
						text: ''
					}
				],
				formClass,
				isExpand: false,
				update: false
			};
		},
		methods: {
			async checkForm(form) {


				let result = true;
				form.forEach((item) => {
					if (!item.text) {

						item.message = "value required"
						item.flag = true
						result = false
					}

				})

				if (result) {
					var formData = form.reduce(
						(total, item) => {
							let obj = {};
							if (item.input == 'date') {
								obj[item.input] = item.text.replace(/-0|-/g, '.')
							} else
								obj[item.input] = item.text
							return Object.assign(total, obj)
						}, {})

					if (openerPage) {

						var obj = {
							addTime: new Date().getTime(),
							schedule: openerPage
						}
						Object.assign(obj, formData)

						await new Promise((resolve) => setTimeout(resolve, 300))
						var schedule = uni.getStorageSync('schedule')
						if (typeof schedule !== 'object') schedule = {};
						if (schedule[obj.date]) {
							let cancel = true;
							uni.showModal({
								content: '日程已存在,要覆盖吗?',
								success:  function(res){
									 if (res.confirm) {
											
										schedule[obj.date] = obj
										uni.setStorage({
											key: 'schedule',
											data: schedule,
											success: () => {
												uni.navigateTo({
													url: '../index/index',

												})

											}
										});

									}
							
									
								}
							});

						}
						else{
							schedule[obj.date] = obj
						uni.setStorage({
							key: 'schedule',
							data: schedule,
							success: () => {
								this.bus.schedule=schedule
								uni.navigateTo({
									url: '../index/index',

								})

							}
						});
						}

						


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
				openerPage = data.data
			})
		}
	}
</script>

<style lang="scss">
	label {

		font-size: 20px;
		color: $bg;
	}

	.text {

		color: #878787;
		@include border-bottom height: 100rpx;
		margin-bottom: 50rpx;

	}

	.error {

		.input-placeholder {
			color: #ff0000;
		}
	}
</style>

<template>

	<view>
		<uni-nav-bar left-icon="home" @clickLeft="bus.toIndex" right-icon="compose" @clickRight="toEdit"
			title="New Plan" backgroundColor="rgba( 173,215,237)" fixed="true" shadow="true" color="white">
		</uni-nav-bar>
		<myForm :formClass="formClass" :handleSubmit="checkForm" :formAttribute="formAttribute" />

	</view>


</template>

<script>
	import myForm from "@/components/plan/plan.vue"
	import myMask from "@/components/mask/index.vue"
	import formClass from "@/components/plan/form.js"
	export default {
		data() {
			return {
				formAttribute: [{
						input: 'title',
						text: ''
					},
					{
						input: 'subject',
						text: ''
					},
					{
						input: 'detail',
						text: ''
					}
				],
				formClass,

				plan: []
			};
		},
		components: {
			myForm,

			myMask
		},
		
	
		methods: {
			async checkForm(form) {
				
				let result = true
				form.forEach((item) => {
					if (!item.text) {
						item.message = "value required"
						result = false
					}

				})
				if (result) {
					var plan = {};
					form.forEach((item) => {
						plan[item.input] = item.text
					})


					await new Promise((resolve) => setTimeout(resolve, 300));

					this.plan.push(plan)
					
					uni.setStorage({
						key: 'plan',
						data: this.plan
					});
					this.bus.plan = uni.getStorageSync('plan');
				}
			}

		}

		,
		mounted() {

			this.plan = uni.getStorageSync('plan')
			if (!this.plan) this.plan = []
			

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

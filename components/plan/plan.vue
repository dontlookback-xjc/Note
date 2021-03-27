<template>
	<view style="width: 90%;margin: 0 auto;padding-top:100rpx ;">
		<form>
			<label v-for="(item,index) in form" :key="index"> {{item.input}}
				<input type="text" v-model="item.text" class="text" :class="{'error':item.flag}"
					:placeholder="item.message" />
			</label>

			<bubbleButton :handleClick="checkForm" 
			:isExpand="isExpand"></bubbleButton>
			
		
				


		</form>
	</view>
</template>
<script>
	import formClass from "./form.js"
	import bubbleButton from "../bubbleButton.vue"
	export default {
		data() {
			return {
				form: [
					formClass({
						input: 'title',
						text: ''
					}),
					formClass({
						input: 'subject',
						text: ''
					}),
					formClass({
						input: 'detail',
						text: ''
					})
				],
				isExpand: false,
				styleObject: {
					color: 'red',

				},
				svalue:[],
				plan:[]


			}
		},
		components:{
			bubbleButton
		},
		computed: {
			formData() {
				return this.form.reduce(
					(total, item) => {
						let obj = {};
						obj[item.input] = item.text

						return Object.assign(total, obj)
					}, {}

				)
			}
		},
		methods: {
			checkForm() {
				let result = true
				this.form.forEach((item) => {
					if (!item.text) {
						item.flag = true;
						item.message = "value required"
						result = false
					}

				})
				//
				if (result) {
					this.isExpand = true
					setTimeout(() => {
						this.isExpand = false
					}, 300)

					
					this.plan.push(this.formData)
					// if(!this.svalue)  value=[]
					// else value=this.svalue
					// value.push(this.formData)
					uni.setStorage({
						key: 'plan',
						data: this.plan
					
					});
					this.bus.plan= uni.getStorageSync('plan');
				}
			},
			remove(){
				
				uni.removeStorage({
				    key: 'plan',
				    success: function (res) {
				        console.log('success');
				    }
				});
			}
		
		},
		mounted() {
			this.plan=this.bus.plan
			this.bus.$on('change',()=>{
				
				this.plan=this.bus.plan
				console.log(this.bus.plan)
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
		@include  border-bottom
		height: 100rpx;
		margin-bottom: 50rpx;

	}

	.error {

		.input-placeholder {
			color: #ff0000;
		}
	}


</style>

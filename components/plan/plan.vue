<template>
	<view style="width: 90%;margin: 0 auto;padding-top:200rpx ;">
		<form>

			<label v-for="(item,index) in form" :key="index"> {{item.input}}
				<input type="text" v-model="item.text" class="text" :class="{'error':item.flag}"
					:placeholder="item.message" />
			</label>



			<!-- 根据ajax加个动画 -->
			<view style="display: flex;align-items: center;height: 300rpx;">


				<view class="bubbles" @click="checkForm" :class="{'expand':isExpand}">

				</view>
				<button @click="checkForm" class="submit">{{isExpand?'Loading':'Submit'}}</button>
				<button @click="remove">remove</button>
				{{bus.plan?bus.plan.length:0}}
				
			</view>

		</form>
	</view>
</template>
<script>
	import formClass from "./form.js"
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
		border-bottom: 2px #e2e2e2 solid;
		height: 100rpx;
		margin-bottom: 50rpx;

	}

	.error {

		.input-placeholder {
			color: #ff0000;
		}
	}

	.bubbles {

		display: flex;
		align-items: center;
		transform-origin: center center;

		margin: 0 auto;
		transition: ease-out .7s;
		width: 150px;
		background-color: $bg;
		border-radius: 25px;
		height: 50px;
		border: 0;

	}

	.expand {
		// width: 300px;
		// height: 100px;
		// border-radius: 50px;
		transform: scale(1.5);
		background-color: $assistance;
	}

	.submit {
		position: absolute;
		left: 50%;
		transform: translateX(-75px);
		border: 0px;
		margin: auto auto;
		width: 150px;
		background-color: rgba($bg, $alpha: 0.0);
		border-radius: 25px;
		height: 50px;
		font-size: 20px;
		text-align: center;
		color: white;
	}

	.submit::after {
		border: 0px;
	}
</style>

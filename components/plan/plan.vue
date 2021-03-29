<template>
	<view style="width: 90%;margin: 0 auto;padding-top:100rpx ;">
		<form>
			<label v-for="(item,index) in form" :key="index"> {{item.input}}
				<input type="text" @input="change($event,index)" :value="item.text"
				 class="text" :class="{'error':item.flag}"
					:placeholder="item.message" />
			</label>
			
			<bubbleButton :handleClick="handleClick" 
			:isExpand="isExpand"></bubbleButton>                 
			

		</form>
	</view>
</template>
<script>

	import bubbleButton from "../bubbleButton.vue"
	export default {
		data() {
			return {
			isExpand:false

			}
		},
		components:{
			bubbleButton
		},
		computed: {
			
			form(){
				
				return this.formAttribute.map((item)=>{
					return this.formClass(item)
				})
			}
			
		},
		methods: {
			change(e,index){
				
			
				this.$set(this.form[index],'text',e.detail.value)
			
				
				
			},
		 async handleClick(){
			 

				this.isExpand=true
			await this.handleSubmit(this.form)
				this.isExpand=false
		
		}
		
		},
		props:['handleSubmit','formClass','formAttribute'],
		mounted() {
			
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

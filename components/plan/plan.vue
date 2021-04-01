<template>
	<view style="width: 90%;margin: 0 auto;padding-top:100rpx ;">
		<form>
			<label v-for="(item,index) in form" :key="index"> {{item.input}}
				<input type="text" @input="change($event,index)" :value="item.text"
				 class="text" :class="{'error':item.flag}"
					:placeholder="item.message" />
			</label>
			<label v-if="hasDate" > 
			date
				<picker mode="date"  @change="dateChange" :value="dateData.text" >
			        <input type="text" v-model="dateData.text"  disabled="true" :start="now"
			         class="text"  :class="{'error':dateData.flag}"
			        	:placeholder="dateData.flag?'value required':'input something' "/>
			    </picker>
			</label>
			<bubbleButton :handleClick="handleClick" 
			:isExpand="isExpand"></bubbleButton>                 
			

		</form>
	</view>
</template>
<script>
//input text 字段
import d from "../../js/Date.js"
	import bubbleButton from "../bubbleButton.vue"
	export default {
		data() {
			return {
			isExpand:false,
			hasDate:false,
			now:"",
			dateData:{text:'',flag:false,input:'date'}

			}
		},
		components:{
			bubbleButton
		},
		computed: {
			
			form(){
				let result=[]
				this.formAttribute.forEach((item)=>{
					if(item.input!='date')  result.push(this.formClass(item)) 
					else this.hasDate=true
				})
				console.log(result)
				return result
			}
			
		},
		methods: {
			change(e,index){
				
				this.$set(this.form[index],'text',e.detail.value)
	
			},
			dateChange(e){
				this.dateData.text=e.detail.value
				
			},
		 async handleClick(){
			 
				this.isExpand=true
			await this.handleSubmit(this.hasDate?[this.dateData].concat(this.form):this.form)
				this.isExpand=false
		
		}
		
		},
		props:['handleSubmit','formClass','formAttribute'],
		mounted() {
			this.now=d().Format('YYYY-MM-DD')
			
			console.log(this.now)
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

<script>
	export default {
	onLaunch(){
		try {
			var plan= uni.getStorageSync('plan');
			console.log('app',plan);
			plan?this.bus.plan=plan:'';
			
		} catch (e) {
			uni.showToast({
				title: 'error',
				duration: 2000
			});
		}
	}
	
	}
</script>

<style>

	body{overflow-y: hidden;} 


</style>


<script>
	export default {
		onLaunch() {
			try {
				var plan = uni.getStorageSync('plan');
			
				if (plan) {
					this.bus.plan = plan
				} else {
					var data = [{
							subject: '学习',
							title: 'vue',
							detail: '写项目'
						},
						{
							subject: '运动',
							title: '跑步',
							detail: '慢跑20分钟'
						},
						{
							subject: '生活',
							title: '做菜',
							detail: '糖醋排骨'
						},
					];
					uni.setStorage({
						key: 'plan',
						data
					});
					this.bus.plan = data

				}
			} catch (e) {
				uni.showToast({
					title: 'error',
					duration: 2000
				});
			}
		}

	}
</script>
<script src="./iconfont.js" type="text/javascript"></script>
<style>

	.icon {
	  width: 1em;
	  height: 1em;
	  vertical-align: -0.15em;
	  fill: currentColor;
	  overflow: hidden;
	}

	body {
		overflow-y: hidden;
	}
</style>

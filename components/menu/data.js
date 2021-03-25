
import d from "@/js/Date.js"

var time=d.Format('YYYY-MM-DD')

var plans=[{
						name: '跑步',
						type: {
							name: "运动",
							
						}
					},
					{
							name: '哑铃',
							type: {
								name: "运动",
							}
						},
					{
						name: '前端',
						type: {
							name: "学习",
						}
					},
					{
						name: '做菜',
						type: {
							name: "生活",
						}
					}

				]
				plans.forEach((item)=>{
					item.timeAdd=time
				})
export default plans

'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('plan') // 获取表'unicloud-test'的集合对象
	
	
	// let result=collection.where(event.tag?{tag:event.tag}:{}).get()
	return  collection.add(event)
	
	//返回数据给客户端
	
};

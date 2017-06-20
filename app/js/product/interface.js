import $ from 'jquery';

class Interface{
	
	/**
	 * 获取所有产品分类
	 */
	getAllCate(){
		return new Promise((resolve,reject) => {
			$.ajax({
				type:'get',
				url:'/data/data_productCate.js',
				data:{},
				dataType:'json',
				success:function(res){
					let cate = res.data;
					//对分类排序
					cate.sort((a,b) => b.rank - a.rank);
					resolve.call(self,cate);
				},
				error:function(err){
					reject.call(self,err);
				}
			});
		});
	}
	
	/**
	 * 获取分类下的所有产品
	 */
	getProduct(cate_id){
		let self = this;
		return new Promise((resolve,reject) => {
			$.ajax({
				type:'get',
				url:'/data/data_product.js',
//				data:{'category':cate_id},
				dataType:'json',
				success:function(res){
					let prod = res.data;
					//对分类排序
					prod.sort((a,b) => b.rank - a.rank);
					resolve.call(self,prod);
				},
				error:function(err){
					reject.call(self,err);
				}
			});
		});
	}
	
	
}

export default Interface;
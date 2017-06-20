import $ from 'jquery';
import Category from './category.js';

class Base{
	
	request(paras){
		let url = location.href; 
	    let paraString = url.substring(url.indexOf("?")+1,url.length).split("&"); 
	    let paraObj = {};
	    let j;
	    for (let i=0;j=paraString[i]; i++){ 
	   		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
	    }
	    let returnValue = paraObj[paras.toLowerCase()]; 
	    if(typeof(returnValue)=="undefined"){ 
	    	return ""; 
	    }else{ 
	    	return decodeURIComponent(returnValue); 
	    }
	}
	
	/**
	 * 显示分类
	 * */
	showCategory(){
		let self = this;
		return new Promise((resolve,reject) => {
			let arr = new Array();
			let temp ;
			for(let [k,v] of Category.cate_map.entries()){
				temp = `<a href="javaScript:void(0)" data-cateId="${v.id}">
							<li>
							<dd><img src="/images/${v.catePicture}"></dd>
							<dt>${v.cateName}</dt>
							</li>
						</a>`;
				arr.push(temp);
			}
			$(Category.cate_el).html(arr.join(''));
			resolve.call(self);	
		});
	}
	
	categoryArray2Map(arr){
		return new Promise((resolve,reject) => {
			let m = Category.cate_map;
			for(let cate of arr){
				let c = new Category();
				({id:c.id,cateName:c.cateName,catePicture:c.catePicture,cateDetail:c.cateDetail,isShow:c.isShow,rank:c.rank,status:c.status} = cate);
//				c.initEvent();
				m.set(c.id,c);
			}
			resolve();
		});
	}
	
	productuArray2Map(arr){
		let self = this;
		return new Promise((resolve,reject) => {
			for(let p of arr){
				self.product_map.set(p.id,p);
			}
			
			resolve();
		});
	}
	
	
	/**
	 * 显示分类的描述
	 * */
	showCategoryDetail(){
		let self = this;
		$(self.cate_detail_el).html('<h3>'+self.cateName+'</3>'+self.cateDetail);
	}
	
	
	
	/**
	 * 显示分类里的产品
	 * */
	showProductes(){
		let self = this;
		let temp ;
		let arr = new Array();
		return new Promise((resolve,reject) => {
			
			for(let v of self.product_map.values()){
				temp = `<li>
					<dd>
						<img src="/images/${v.picture}">
					</dd>
					<dt>
						<h3>${v.zh_name}</h3>
						<div class="detailed">${v.summary}</div>
						<div class="content_bt">
							参考价格：<span>￥${v.price/100}</span>
							<a href="/product/detail?productId=${v.id}" data-productId="${v.id}"><p>查看详情</p></a>
						</div>
					</dt>
				</li>`;
				arr.push(temp);
			}
			$('.layout .content_main').html(arr.join(''));
			
			resolve();
		});
	}
}

export default Base;
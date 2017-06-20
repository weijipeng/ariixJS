import 'babel-polyfill';
import $ from 'jquery';
import Base from './category_base.js';
import Interface from './interface.js';

const copyProperties=function(target,source){
  for(let key of Reflect.ownKeys(source)){
    if(key!=='constructor'&&key!=='prototype'&&key!=='name'){
      let desc=Object.getOwnPropertyDescriptor(source,key);
      Object.defineProperty(target,key,desc);
    }
  }
}

const mix=function(...mixins){
  class Mix{}
  for(let mixin of mixins){
    copyProperties(Mix,mixin);
    copyProperties(Mix.prototype,mixin.prototype);
  }
  return Mix
}

class Category extends mix(Interface,Base){
	
	constructor(){
		super();
		this.cate_detail_el = '.layout .content .headline';
		this.product_map = new Map();
		this.product_el = '.layout .content_main';
	}
	
	/**
	 * 初始化分类 加载所有分类
	 * */
	initCategoryMap(){
		let self = this;
		//ajax请求分类//将分类数据保存为本地map//显示分类
		self.getAllCate()
		.then(self.categoryArray2Map)
		.then(self.showCategory)
		.then(self.initEvent)
		.then(function(){
			const i = self.request('cateId') || location.hash.substring(1);
			if(i !== ''){
				$('.aixlist > ul > a[data-cateId="'+ i +'"]').click();
			}
			else{
				$('.aixlist > ul > a:first-child').click();
			}
		});
		
	}
	
	/**
	 * 加载分类下的产品
	 * */
	loadProduct(){
		let self = this;
		//在url里记录所选的分类
		let href = location.href;
		window.history.pushState({},'',href.replace(/#.*/g,'#' + self.id));
//		location.hash = self.id ;
		//加载所选分类的描述
		self.showCategoryDetail();
		
		//分类里的产品集合为空  ajax加载
		if(self.product_map.size === 0){
			
			self.getProduct()
			.then(self.productuArray2Map.bind(self))
			.then(self.showProductes.bind(self))
			.then(function(){});
		}else{
			self.showProductes().then(function(){});
		}
	}
	
	initEvent(){
		return new Promise((resolve,reject) => {
			const m = Category.cate_map;
			for(let [k,v] of m.entries()){
				$('.layout .aixlist > ul').on('click','a[data-cateId="'+k+'"]',v.loadProduct.bind(v));
			}
			//返回键跳转到 产品首页
			$(window).on('popstate',function(e){
//				location.href = '/product';
console.log(e);
			});
			
			resolve();
		});
	}
};

Category.cate_el = '.aixlist > ul';
Category.cate_map = new Map();


export default Category;
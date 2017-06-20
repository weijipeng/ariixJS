import 'babel-polyfill';
import $ from 'jquery';
import TouchScroll from '../utils/touchScroll.js'

class index {
	constructor(){
		//轮播图元素
		this.scroll_el = '.main_image';
		//分类元素
		this.cate_el = '.navtop > ul';
		//分类在首页显示的内容
		this.cateDetail_el = '.content';
		this.loadScroll().then(TouchScroll.initScroll('.main_image'));
		this.loadCate();
	}
	
	
	/**
	 * 加载轮播图
	 */
	loadScroll(){
		const self = this;
		return new Promise((resolve,reject) => {
			$.ajax({
				type:'GET',
				url:'/data/data_productScroll.js',
				async:true,
				dataType:'json',
				success:function(res){
					if(res&&res.status){
						let imgs = res.data;
						//过滤不显示的图片
						imgs.filter(item => item.isShow);
						//图片排序
						imgs.sort((a,b) => b.rank - a.rank);
						//加载图片
						{
							let arr = new Array();
							for(let img of res.data ){
								arr.push(`<li><span><a href="/images/${img.productId}"><img src="/images/${img.picture}"/></a></span></li>`);
							}
							$(self.scroll_el + ' ul').html(arr.join(''));
						}
						resolve.call(self,imgs);
					}
				},
				error:function(err){
					console.log('请求首页轮播图ajax报错',err);
				}
			});
		});
	}
	/**
	 * 加载分类图标、首页显示的分类内容
	 */
	loadCate(){
		const self = this;
		$.ajax({
			type:'get',
			url:'/data/data_productCate.js',
			async:true,
			dataType:'json',
			success:function(res){
				if(res&&res.status){
					let cate = res.data;
					//分类排序
					cate.sort((a,b) => b.isShow - a.isShow);
					//加载分类
					{
						let cate_ul = new Array();
						//加载在首页显示的分类内容
						let cate_show = new Array();
						
						for(let c of cate){
							cate_ul.push(
								`<a href="/product/category?cateId=${c.id}">
									<li>
									<dd><img src="/images/${c.catePicture}"></dd>
									<dt>${c.cateName}</dt>
									</li>
								</a>`);
							//加载在首页显示的分类内容
							if(c.isShow){
								cate_show.push(c.cateDetail + '</br>');
							}
							
						}
						$(self.cate_el).html(cate_ul.join(''));
						$(self.cateDetail_el).html(cate_show.join(''));
					}
				}
			},
			error:function(err){
				console.log('请求产品分类数据报错',err);
			}
		});
	}
}

export default index;
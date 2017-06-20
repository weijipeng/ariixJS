import 'babel-polyfill';
import $ from 'jquery';

(() => {
	$.ajax({
		type:'get',
		url:'/js/data_productScroll.js',
		dataType:'json',
		success:function(res){
			console.log(res);
		},
		error:function(err){
			console.log(err);
		}
	});
})()

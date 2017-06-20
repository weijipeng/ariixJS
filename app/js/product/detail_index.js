import 'babel-polyfill';
import $ from 'jquery';
	
	
	(function(){
		const request = (paras) => {
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
		$.ajax({
			type:'get',
			url:'/data/data_detail.js',
			data:{"productId":request('productId')},
			dataType:'json',
			success:function(res){
				$('.detailed_img').html(res.data.detail);
			},
			error:function(err){
			}
		});
	})()


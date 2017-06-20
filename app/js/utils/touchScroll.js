import 'babel-polyfill';
import $ from 'jquery';


class TouchScroll{
	static initScroll(el){
		return function(){
			$(document).ready(function(){
				window.jQuery('.main_image').touchSlider({
					flexible : true,
					speed : 200,
					btn_prev : $("#btn_prev"),
					btn_next : $("#btn_next"),
					paging : $(".flicking_con a"),
					counter : function (e){
						$(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");
					}
				});	
			});
		}
	}
}

export default TouchScroll;
				
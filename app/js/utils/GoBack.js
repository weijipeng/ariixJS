
class GoBack{
	static back(u){
		this.pushHistory();
        window.addEventListener('load', function() {     
            setTimeout(function() {       
               window.addEventListener('popstate', function() {        
               //要执行的具体动作
               
               });     
            }, 0);   
         })
	}
	
	 pushHistory: function () {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
}

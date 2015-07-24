var autoHeight = function(){
	var ph = $(document).height();
	$("iframe", window.parent.document).height(ph);
}
$(function(){
	setTimeout(function(){
		autoHeight();
	},100);
})
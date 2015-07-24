if( $.browser.msie ){
	//alert('很抱歉，目前的代码高亮及格式化在IE下存在bug，建议通过Firefox使用本系统。');
}

document.write('<link rel="stylesheet" type="text/css" href="/widget/lib/highlight/styles/xcode.css"/>');
document.write('<script type="text/javascript" src="/widget/lib/highlight/highlight.pack.js"></script>');
document.write('<script type="text/javascript" src="/widget/lib/ZeroClipboar/ZeroClipboard.js"></script>');

//复制到剪切板
function copy(btnID, containerID, text){
	var clip = new ZeroClipboard.Client();;
	clip.setHandCursor(true);
	clip.addEventListener('mousedown', function (client){
		clip.setText(text);
		tips('复制成功！');
	});
	clip.glue(btnID, containerID);
}

//根据原始的textarea标签生成DOM结构
function textAreaToHTML(){
	var textarea = $("textarea.highlight");
	
	textarea.each(function(){
		var _t = $(this);
		var _code = _t.html();
		_code = _code.replace(/\s+>\s+/g, ' &amp;gt; ').replace(/\s+<\s+/g, ' &amp;lt; ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		
		var _r = parseInt(Math.random()*9999);
		var _class = _t.attr("class").replace(/\s*?highlight\s*?/g, '');
		var _html = '<pre><code class="'+_class+'">'+_code+'</code></pre><div id="clip-'+ _r + '" class="clip" title="复制代码"><button id="clipBtn-'+ _r +'" class="clipBtn"></button></div>';
		_t.wrap('<div id="highlight-wrap-'+ _r +'" class="highlight-wrap"></div>');
		
		var _div = $("#highlight-wrap-"+ _r);
		_div.append(_html);
		_t.hide();
		
	});
	
	$(".clipBtn").each(function(){
		var containerID = this.parentNode.id;
		var btnID = this.id;
		var text = $(this).parent().siblings("textarea").html().replace(/&lt;/gi, '<').replace(/&gt;/gi, '>').replace(/&amp;/gi, '&');
		//var text = $(this).parent().siblings("textarea").html();
		copy(btnID, containerID, text);
	});
}

//tips方法
function tips(text){
	
}

$(function(){

	textAreaToHTML();
	hljs.tabReplace = '<span class="indent">\t</span>';
	hljs.initHighlightingOnLoad();
	
});

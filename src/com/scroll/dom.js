export function setTransform(dom, value){
	let style = dom.style;
	style.webkitTransform = style.MsTransform = style.msTransform = style.MozTransform = style.OTransform = style.transform = value;
}

export function setDuration(dom, value){
	let style = dom.style;
	style.transitionDuration = value;
}

export function getTransform(dom){
	let curTransform, transformMatrix, matrix;
	let curStyle = window.getComputedStyle(dom, null);
	if(window.WebKitCSSMatrix){
		curTransform = curStyle.transform || curStyle.webkitTransform;
		if (curTransform.split(',').length > 6) {
			curTransform = curTransform.split(', ').map(function(a){
				return a.replace(',','.');
			}).join(', ');
		}
		transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
	} else {
		transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
		matrix = transformMatrix.toString().split(',');
	}
	let X, Y;
	if (window.WebKitCSSMatrix) {//Latest Chrome and webkits Fix
		Y = transformMatrix.m42;
    	X = transformMatrix.m41;
	} else if (matrix.length === 16) {	//Crazy IE10 Matrix
		Y = parseFloat(matrix[13]);
    	X = parseFloat(matrix[12]);
	} else {	//Normal Browsers
		Y = parseFloat(matrix[5]);
    	X = parseFloat(matrix[4]);
	}
	return { X, Y }
}
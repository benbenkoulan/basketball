import style from './style'
import eventMixin from 'utils/eventMixin'
import { requestAnimationFrame, cancelAnimationFrame } from 'utils/raf'

function Scroll(el, options){
	this.wrapper = typeof el === 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.deceleration = options.deceleration;
	this.vertical = !!options.vertical;
	this.noBounce = !!options.noBounce;	//弹性效果
	this.wheel = !!options.wheel;	//滚动轮效果
	this.slide = !!options.slide;	//滑动
	this.loop = !!options.loop;		//循环
	this.step = options.step;
	this.isStart = false;
	this.events = [];
	init.call(this);
}

function init(){
	this.items = [].slice.call(this.scroller.children);
	this.itemLength = this.items.length;
	this.index = 0;
	if(this.loop){
		let firstItem = this.items[0];
		let lastItem = this.items[this.itemLength - 1];
		this.scroller.insertBefore(lastItem.cloneNode(true), firstItem);
		this.scroller.appendChild(firstItem.cloneNode(true));
		this.items = [].slice.call(this.scroller.children);
		this.itemLength = this.items.length;
		this.index = 1;
		this.slideTo();
	}
	this.max = 0;
	this.min = -((this.itemLength - 1) * this.step || this.scroller.getBoundingClientRect().height - this.wrapper.getBoundingClientRect().height);
	
	this.scroller.addEventListener('touchstart', preventDefault(start, this));
	this.scroller.addEventListener('touchmove', preventDefault(move, this));
	this.scroller.addEventListener('touchend', preventDefault(end, this));

	var self = this;
	var transitionHandler = function(e){
		if(e.target === self.scroller){
			var position = self.getPosition();
			self.trigger('moveEnd', position);
		}
	}
	this.scroller.addEventListener('transitionend', transitionHandler);
	this.scroller.addEventListener('webkitTransitionEnd', transitionHandler);
}

function preventDefault(fn, context){
	return function(e){
		e.preventDefault();
		fn.call(context, e);
	}
}

function start(e){
	if(this.loop){
		this.fixLoop();
	}
	this.isStart = true;
	this.pause();
	this.startTime = new Date().getTime();
	this.startX = this.movedX = e.targetTouches[0].clientX;
	this.startY = this.movedY = e.targetTouches[0].clientY;

	this.start = this.vertical ? this.startY : this.startX;
	this.trigger('start');
}

function move(e){
	if(!this.isStart) return;
	var currentX = e.targetTouches[0].clientX;
	var currentY = e.targetTouches[0].clientY;

	var d = this.vertical ? currentY - this.movedY : currentX - this.movedX;
	this.movedX = currentX;
	this.movedY = currentY;

	var t = new Date().getTime();
	if(t - this.startTime > 300){
		this.start = this.vertical ? currentY : currentX;
		this.startTime = t;
	}

	var position = this.getComputedPosition(d);
	this.setPosition(position);
	this.trigger('move', position);
}

function end(e){
	if(!this.isStart) return;

	var currentX = e.changedTouches[0].clientX;
	var currentY = e.changedTouches[0].clientY;

	var duration = 500;
	var d = 0;
	var t = new Date().getTime();
	var dt = t - this.startTime;

	var distance = (this.vertical ? currentY : currentX) - this.start;
	var absDistance = Math.abs(distance);
	var v;
	var direction = distance > 0 ? 1 : -1;
	if(dt < 300 && absDistance > 100 && this.slide){
		v = absDistance / dt;
		d = v * v / (2 * this.deceleration) * direction;
		duration = Math.round(v / this.deceleration);
	} else if(!this.noBounce){
		let distance = this.vertical ? currentY - this.startY : currentX - this.startX;
		let md = Math.abs(distance % this.step);
		if(md > this.step / 2){
			d = (this.step - md) * (distance > 0 ? 1 : -1);
		} else {
			d = md * (distance > 0 ? -1 : 1);
		}
	}

	var position = this.getComputedPosition(d);
	if(this.step){
		if(this.vertical){
			position.y = Math.round(position.y / this.step) * this.step;
		} else {
			position.x = Math.round(position.x / this.step) * this.step;
		}
	}
	if(this.vertical){
		if(position.y < this.min) position.y = this.min;
		if(position.y > this.max) position.y = this.max;
	} else {
		if(position.x < this.min) position.x = this.min;
		if(position.x > this.max) position.x = this.max;
	}
	
	this.to(position, v, duration, 0.005, direction);
	//this.setPosition(position, duration);
	this.isStart = false;
	this.startX = this.startY = 0;
}

Scroll.prototype.to = function(position, v, time, deceleration, direction){
	var beginTime = new Date();
	var _position = this.getPosition();
	var x = (this.vertical ? position.y : position.x) - (this.vertical ? position.y : position.x);
	var self = this;
	var id;
	console.log('----------destination----')
	console.log(position)
	console.log('----------destination----')
	var _to = function(){
		var dt = new Date() - beginTime;
		if(dt >= time){
			self.setPosition(position);
			cancelAnimationFrame(id);
			return;
		}
		var _x = (v * dt + direction * dt * dt * deceleration / 2) * direction;
		var current = JSON.parse(JSON.stringify(_position));
		if(self.vertical) current.y += _x;
		else current.x += _x;
		console.log(current);
		self.setPosition(current);
		id = requestAnimationFrame(_to);
	}
	_to();
}

Scroll.prototype.setPosition = function(position, duration = 0){
	var scrollerStyle = this.scroller.style;
	//TODO:优化
	scrollerStyle.transitionDuration = `${duration}ms`;
	scrollerStyle.webkitTransform = scrollerStyle.MsTransform = scrollerStyle.msTransform = scrollerStyle.MozTransform = scrollerStyle.OTransform = scrollerStyle.transform 
	=  `translate3d(${position.x}px, ${position.y}px, 0)`;
	if(this.wheel){
		for(let i = 0, len = this.items.length;i < len;i++){
			let item = this.items[i];
			let deg = ((position.y / this.step) + i) * this.step / 2;
			let itemStyle = item.style;
			itemStyle.transitionDuration = `${duration}ms`;
			itemStyle.webkitTransform = itemStyle.MsTransform = itemStyle.msTransform = itemStyle.MozTransform = itemStyle.OTransform = itemStyle.transform = 
			`rotateX(${deg}deg)`;
		}
	}
	this.index = Math.abs(Math.floor(this.vertical ? position.y / this.step : position.x / this.step));
}

Scroll.prototype.getPosition = function(){
	let curTransform, transformMatrix, matrix;
	let curStyle = window.getComputedStyle(this.scroller, null);
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
	let x, y;
	if (window.WebKitCSSMatrix) {	//Latest Chrome and webkits Fix
		y = transformMatrix.m42;
    	x = transformMatrix.m41;
	} else if (matrix.length === 16) {	//Crazy IE10 Matrix
		y = parseFloat(matrix[13]);
    	x = parseFloat(matrix[12]);
	} else {	//Normal Browsers
		y = parseFloat(matrix[5]);
    	x = parseFloat(matrix[4]);
	}
    return { x, y }
}

Scroll.prototype.getComputedPosition = function(d){
	var position = this.getPosition();
	if(this.vertical){
		position.y += d;
	} else {
		position.x += d;
	}
	return position;
}

Scroll.prototype.slideTo = function(i, duration){
	if(i === undefined) i = this.index;
	var d = -this.step * i;
	var position = this.getPosition();
	if(this.vertical){
		position.y = d;
	} else {
		position.x = d;
	}
	this.setPosition(position, duration);
}

Scroll.prototype.fixLoop = function(){
	if(this.index == 0){
		this.slideTo(this.itemLength - 2);
	} else if(this.index == this.itemLength - 1){
		this.slideTo(1);
	}
}

Scroll.prototype.startAutoPlay = function(interval, speed, direction = 1){
	if(interval <= speed){
		console.log('ERROR:---轮播间隔须大于速度---');
		return;
	}
	var self = this;
	this.autoPlayID = setInterval(function(){
		if(self.loop) self.fixLoop();
		if(!self.isTouchStart)self.slideTo(self.index + direction, speed);
	}, interval)
}

Scroll.prototype.stopAutoPlay = function(){
	if(!this.autoPlayID) return;
	clearInterval(this.autoPlayID);
	this.autoPlayID = undefined;
}

Scroll.prototype.pause = function(){
	this.scroller.style.transitionDuration = '0';
}

eventMixin(Scroll);

export default Scroll;
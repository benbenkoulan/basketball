webpackJsonp([0],{54:function(t,i,e){"use strict";function o(t){e(71)}Object.defineProperty(i,"__esModule",{value:!0});var s=e(73),n=e(88),a=e(3),M=o,r=a(s.a,n.a,M,"data-v-dd428e28",null);i.default=r.exports},56:function(t,i,e){"use strict";function o(t,i){this.wrapper="string"==typeof t?document.querySelector(t):t,this.scroller=this.wrapper.children[0],this.deceleration=i.deceleration||.006,this.noOutOfBounds=!!i.noOutOfBounds,this.noBounce=!!i.noBounce,this.wheel=!!i.wheel,this.slide=!!i.slide,this.loop=!!i.loop,this.step=i.step,this.name=i.name,this.property=i.vertical?"Y":"X",this.vertical=!!i.vertical,this.min=i.min,this.max=i.max,this.isStart=!1,this.isLocked=!1,Object(T.a)(this),s.call(this)}function s(){if(this.items=[].slice.call(this.scroller.children),this.itemLength=this.items.length,this.index=0,this.loop){var t=this.items[0],i=this.items[this.itemLength-1];this.scroller.insertBefore(i.cloneNode(!0),t),this.scroller.appendChild(t.cloneNode(!0)),this.items=[].slice.call(this.scroller.children),this.itemLength=this.items.length,this.index=1,this.slideTo()}this.wrapper.addEventListener("touchstart",a(M,this)),this.wrapper.addEventListener("touchmove",n(r,this),{passive:!1}),this.wrapper.addEventListener("touchend",a(l,this));var e=this,o=function(t){t.target===e.scroller&&e.trigger("moveEnd")};this.scroller.addEventListener("transitionend",o),this.scroller.addEventListener("webkitTransitionEnd",o)}function n(t,i){return function(e){/^touch/.test(e.type)&&(e.preventDefault(),t.call(i,e))}}function a(t,i){return function(e){/^touch/.test(e.type)&&t.call(i,e)}}function M(t){this.loop&&this.fixLoop(),this.isStart=!0,this.pause(),this.startTime=(new Date).getTime();var i=t.touches[0];this.startX=this.pointX=i.pageX,this.startY=this.pointY=i.pageY,this.distX=0,this.distY=0,this.start=this.moveStart=i["page"+this.property],this.directionLocked="",this.isLocked=!1,this.trigger("start")}function r(t){if(this.isStart){var i=t.touches[0],e=i.pageX-this.pointX,o=i.pageY-this.pointY;if(this.pointX=i.pageX,this.pointY=i.pageY,this.distX+=e,this.distY+=o,!this.directionLocked){var s=Math.abs(this.distX),n=Math.abs(this.distY);s>n+2?(this.directionLocked="h",this.vertical&&(this.isLocked=!0)):n>s+2&&(this.directionLocked="v",this.vertical||(this.isLocked=!0))}"h"==this.directionLocked?o=0:"v"==this.directionLocked&&(e=0);var a=(new Date).getTime();if(a-this.startTime>300&&(this.moveStart=i["page"+this.property],this.startTime=a),"h"==this.directionLocked&&!this.vertical||"v"==this.directionLocked&&this.vertical){var M=this.vertical?o:e,r=this.getComputedPosition(M);if(this.noOutOfBounds){var l=this.getPosition();u.call(this,r),M=r[this.property]-l[this.property]}d.call(this,r),this.trigger("move",M)}}}function l(t){if(this.isStart&&!this.isLocked){var i=t.changedTouches[0]["page"+this.property],e=(new Date).getTime(),o=e-this.startTime,s=i-this.moveStart,n=Math.abs(s),a=s>0?1:-1,M=this.getPosition();if(M[this.property]<this.max&&M[this.property]>this.min&&o<300&&n>100&&this.slide){var r=n/o,l=r*r/(2*this.deceleration)*a,c=JSON.parse(JSON.stringify(M));M[this.property]+=l,N.call(this,M),l=M[this.property]-c[this.property];var u=r*r/Math.abs(l)/2,g=r/u;this.to(M,r,g,u,a)}else if(!this.noBounce){if(this.step){var T=i-this.start,D=Math.abs(T%this.step),h=void 0;h=D>this.step/2?(this.step-D)*(T>0?1:-1):D*(T>0?-1:1),M[this.property]+=h}N.call(this,M),d.call(this,M,500)}this.start=this.moveStart=0}}function c(t){this.step&&(t[this.property]=Math.round(t[this.property]/this.step)*this.step)}function u(t){void 0!==this.min&&t[this.property]<this.min&&(t[this.property]=this.min),void 0!==this.max&&t[this.property]>this.max&&(t[this.property]=this.max)}function N(t){c.call(this,t),u.call(this,t)}function d(t){var i=this,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;Object(g.b)(this.scroller,e+"ms"),Object(g.c)(this.scroller,"translate3d("+t.X+"px, "+t.Y+"px, 0)"),this.wheel&&this.items.forEach(function(o,s){var n=(t.Y/i.step+s)*i.step/2;Object(g.b)(o,e+"ms"),Object(g.c)(o,"rotateX("+n+"deg)")})}var g=e(57),T=e(58),D=e(59),h=["deceleration","noBounce","wheel","slide","loop","noOutOfBounds","step","name","vertical","max","min"];o.prototype.to=function(t,i,e,o,s){var n,a=new Date,M=this.getPosition(),r=this;!function l(){var c=new Date-a;if(c>=e)return d.call(r,t),Object(D.a)(n),void r.trigger("moveEnd");var u=(i*c-c*c*o/2)*s,N=JSON.parse(JSON.stringify(M));N[r.property]+=u,d.call(r,N),n=Object(D.b)(l)}()},o.prototype.getPosition=function(){return Object(g.a)(this.scroller)},o.prototype.getComputedPosition=function(t){var i=this.getPosition();return i[this.property]+=t,i},o.prototype.slideTo=function(t,i){if(void 0!==t&&this.step){var e=-this.step*t,o=this.getPosition();o[this.property]=e,d.call(this,o,i)}},o.prototype.getIndex=function(){if(this.step){var t=this.getPosition();return Math.abs(Math.floor(t[this.property]/this.step))}},o.prototype.fixLoop=function(){var t=this.getIndex();0===t?this.slideTo(this.itemLength-2):t===this.itemLength-1&&this.slideTo(1)},o.prototype.startAutoPlay=function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;if(t<=i)return void console.log("ERROR:---轮播间隔须大于速度---");var o=this;this.autoPlayID=setInterval(function(){o.loop&&o.fixLoop(),o.isTouchStart||o.slideTo(o.getIndex()+e,i)},t)},o.prototype.stopAutoPlay=function(){this.autoPlayID&&(clearInterval(this.autoPlayID),this.autoPlayID=void 0)},o.prototype.pause=function(){this.scroller.style.transitionDuration="0"},o.prototype.updateOptions=function(t){for(var i in t)-1!=h.indexOf(i)&&(this[i]=t[i])},i.a=o},57:function(t,i,e){"use strict";function o(t,i){var e=t.style;e.webkitTransform=e.MsTransform=e.msTransform=e.MozTransform=e.OTransform=e.transform=i}function s(t,i){t.style.transitionDuration=i}function n(t){var i=void 0,e=void 0,o=void 0,s=window.getComputedStyle(t,null);window.WebKitCSSMatrix?(i=s.transform||s.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map(function(t){return t.replace(",",".")}).join(", ")),e=new window.WebKitCSSMatrix("none"===i?"":i)):(e=s.MozTransform||s.OTransform||s.MsTransform||s.msTransform||s.transform||s.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),o=e.toString().split(","));var n=void 0,a=void 0;return window.WebKitCSSMatrix?(a=e.m42,n=e.m41):16===o.length?(a=parseFloat(o[13]),n=parseFloat(o[12])):(a=parseFloat(o[5]),n=parseFloat(o[4])),{X:n,Y:a}}i.c=o,i.b=s,i.a=n},58:function(t,i,e){"use strict";i.a=function(t){t.events=[],t.on=function(t,i){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:this,o=this.events.find(function(i){return i.type===t});return o?o={type:t,fn:i}:this.events.push({type:t,fn:i,context:e}),this},t.off=function(t){var i=this.events.findIndex(function(i){return i.type===t});if(!(i<0))return this.events.splice(i,1),this},t.trigger=function(t){var i=this.events.find(function(i){return i.type===t});i&&i.fn.apply(i.context,[].slice.call(arguments,1))}}},59:function(t,i,e){"use strict";(function(t){e.d(i,"b",function(){return o}),e.d(i,"a",function(){return s});var o=function(t){return t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||function(i){t.setInterval(i,i.interval||62.5)}}(t||window),s=function(t){return t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.mozCancelAnimationFrame||function(i){t.clearInterval(i)}}(t||window)}).call(i,e(11))},60:function(t,i,e){"use strict";function o(t){e(74)}var s=e(78),n=e(79),a=e(3),M=o,r=a(s.a,n.a,M,"data-v-aa09e09a",null);i.a=r.exports},71:function(t,i,e){var o=e(72);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(51)("301c70b3",o,!0)},72:function(t,i,e){i=t.exports=e(50)(void 0),i.push([t.i,"#container[data-v-dd428e28]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;overflow-y:hidden;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}#header[data-v-dd428e28]{width:100%;height:19.2px;height:1.2rem;-ms-flex-negative:0;flex-shrink:0;background:#63b8ff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}#header .tabs[data-v-dd428e28]{display:-webkit-box;display:-ms-flexbox;display:flex;border:1px solid #fff;border-radius:10px;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}#header .tab[data-v-dd428e28]{width:32px;width:2rem;height:11.2px;height:.7rem;line-height:11.2px;line-height:.7rem;font-size:4.8px;font-size:.3rem;text-align:center;color:#fff}#header .tab.active[data-v-dd428e28]{background:#fff;color:#63b8ff}#content[data-v-dd428e28]{-webkit-box-flex:1;-ms-flex:1;flex:1;overflow-y:auto}#scroller[data-v-dd428e28]{display:-webkit-box;display:-ms-flexbox;display:flex;height:100%;will-change:transform}#scroller .wrapper[data-v-dd428e28]{width:100%;height:100%;-ms-flex-negative:0;flex-shrink:0}#scroller .wrapper .scroller[data-v-dd428e28]{will-change:transform}.followed-list[data-v-dd428e28]{padding-bottom:2px;background-color:#f0f0f0}#footer[data-v-dd428e28]{padding:0 3.2px;padding:0 .2rem;width:100%;height:19.2px;height:1.2rem;-ms-flex-negative:0;flex-shrink:0;border-top:1px solid #ccc;-webkit-box-sizing:border-box;box-sizing:border-box;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}#footer .btn[data-v-dd428e28]{background:#63b8ff;text-align:center;height:16px;height:1rem;line-height:16px;line-height:1rem;color:#fff;border-radius:6px}",""])},73:function(t,i,e){"use strict";var o,s,n,a=e(60),M=e(80),r=e(56);i.a={data:function(){return{index:0}},computed:{teams:function(){return this.$store.state.team.teams},leagues:function(){return this.$store.state.league.leagues},followedTeams:function(){return this.$store.getters.followedTeams},followListScroller:function(){return this.$refs.followListScroller},followedListScroller:function(){return this.$refs.followedListScroller}},watch:{index:function(t,i){this.oldIndex=i,0==i&&1==t?(this.updateFollowedList(),this.updateFollowedScroll()):1==i&&0==t&&this.updateFollowList()}},mounted:function(){o=new r.a("#content",{max:0,noOutOfBounds:!0,min:-window.innerWidth,step:window.innerWidth});var t=this;o.on("move",function(){var i=this.getPosition(),e=Math.abs(i.X);t.index=Math.round(e/window.innerWidth)});var i=window.innerHeight-this.followListScroller.clientHeight-2.4*G.size;s=new r.a(".follow-list",{slide:!0,vertical:!0,max:0,min:i,noOutOfBounds:i>0});var e=window.innerHeight-this.followedListScroller.clientHeight-2.4*G.size;n=new r.a(".followed-list",{slide:!0,vertical:!0,max:0,min:e,noOutOfBounds:e>0})},components:{team:a.a,followBar:M.a},fetchData:function(t){var i=t.store,e=(t.router,i.dispatch("FETCH_LEAGUES")),o=i.dispatch("FETCH_FOLLOW_TEAMS");return new Promise(function(t){setTimeout(function(){Promise.all([e,o]).then(t)},0)})},methods:{slideTo:function(t){this.index!=t&&(this.index=t,o.slideTo(t,500))},getLeague:function(t){return this.leagues.find(function(i){return i.leagueID==t})},followTeam:function(t){t.follow=!t.follow;var i=this.getLeague(t.leagueID);i.teams.every(function(t){return t.follow})||(i.followAll=!1)},followLeague:function(t){t.followAll=!t.followAll,t.teams=t.teams.map(function(i){return i.follow=t.followAll,i})},updateFollowList:function(){var t=this;this.teams.filter(function(t){return!t.follow}).forEach(function(i){t.getLeague(i.leagueID).teams.find(function(t){return t.teamID==i.teamID}).follow=!1});var i=this.leagues.map(function(t){return t.teams.every(function(t){return t.follow})||(t.followAll=!1),t});this.$store.dispatch("UPDATE_LEAGUES",i)},updateFollowedList:function(){this.$store.dispatch("UPDATE_FOLLOW_TEAMS",this.followedTeams)},updateFollowScroll:function(){var t=this;this.$nextTick(function(){var i=window.innerHeight-t.followListScroller.clientHeight-2.4*G.size;s&&s.updateOptions({min:i,noOutOfBounds:i>0})})},updateFollowedScroll:function(){var t=this;this.$nextTick(function(){var i=window.innerHeight-t.followedListScroller.clientHeight-2.4*G.size;n&&n.updateOptions({min:i,noOutOfBounds:i>0})})}}}},74:function(t,i,e){var o=e(75);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(51)("0c4b0e5d",o,!0)},75:function(t,i,e){i=t.exports=e(50)(void 0),i.push([t.i,".follow-team[data-v-aa09e09a]{position:relative;padding:0 19.2px 0 6.4px;padding:0 1.2rem 0 .4rem;height:16px;height:1rem;line-height:16px;line-height:1rem;background-color:#f0f0f0;border-bottom:2px solid #fff}.follow-team.follow[data-v-aa09e09a]:after{background-image:url("+e(76)+')}.follow-team[data-v-aa09e09a]:after{content:"";position:absolute;top:4px;top:.25rem;right:6.4px;right:.4rem;display:block;width:8px;width:.5rem;height:8px;height:.5rem;background-size:.5rem;background-repeat:no-repeat;background-image:url('+e(77)+")}",""])},76:function(t,i){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMTEwNTAyNTkzIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDExMDQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEwNTUzIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjE3LjI1IiBoZWlnaHQ9IjE2Ij48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik01NDkuNzk5IDEyOS4wMDFjMTIxLjM3My0xMzMuOTM4IDUxNy43OTktMTg4LjgyNCA1MTcuNzk5IDI0MS42NCAwIDI0NC43NDctNDU3LjE0OCA2MjEuMzU5LTUxNy43OTkgNjIxLjM1OS0xMDEuMDc1IDAtNTE3Ljc5OS0zNzYuOTU4LTUxNy43OTktNjIxLjM1OSAwLTM0Ny45NjIgMzI2LjkwNC00MTkuNDE4IDUxNy43OTktMjQxLjY0eiIgcC1pZD0iMTA1NTQiIGZpbGw9IiNkODFlMDYiPjwvcGF0aD48L3N2Zz4="},77:function(t,i){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMTEwNTIwNjExIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDExMjMgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjExMTU3IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjE3LjU0Njg3NSIgaGVpZ2h0PSIxNiI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTYxLjUzOTEwNSAxMDI0Yy03LjQ4NzE4OCAwLTE0Ljk3NDM3Ni0yLjQ5NTcyOS0xOS45NjU4MzUtNC45OTE0NTlDNTE5LjExMTcwNiAxMDA0LjAzNDE2NSAwIDY3NC41OTc4OSAwIDMxMi43MTcxMzQgMCAyMzAuMzU4MDY2IDMyLjQ0NDQ4MiAxNTAuNDk0NzI2IDkyLjM0MTk4NiA5My4wOTI5NTEgMTQ5Ljc0Mzc2MSAzMy4xOTU0NDcgMjI5LjYwNzEwMSAwLjc1MDk2NSAzMTEuOTY2MTY5IDAuNzUwOTY1Yzk5LjgyOTE3NCAwIDE5Mi4xNzExNiA0Ny40MTg4NTggMjQ5LjU3MjkzNiAxMjQuNzg2NDY4IDg0Ljg1NDc5OC0xMTQuODAzNTUgMjQ0LjU4MTQ3Ny0xNTkuNzI2Njc5IDM3OS4zNTA4NjEtOTcuMzMzNDQ1IDEwOS44MTIwOTIgNDkuOTE0NTg3IDE4Mi4xODgyNDMgMTYyLjIyMjQwOCAxODIuMTg4MjQzIDI4NC41MTMxNDZDMTEyMy4wNzgyMDkgNjc0LjU5Nzg5IDYwMy45NjY1MDQgMTAwNC4wMzQxNjUgNTgxLjUwNDkzOSAxMDE5LjAwODU0MWMtNC45OTE0NTkgMi40OTU3MjktMTIuNDc4NjQ3IDQuOTkxNDU5LTE5Ljk2NTgzNCA0Ljk5MTQ1OXogbS0yNDkuNTcyOTM2LTk0OC4zNzcxNTRDMTgyLjE4ODI0MyA3NS42MjI4NDYgNzQuODcxODgxIDE4Mi45MzkyMDggNzQuODcxODgxIDMxMi43MTcxMzRjMCAyODQuNTEzMTQ2IDM5MS44Mjk1MDkgNTY2LjUzMDU2MyA0ODYuNjY3MjI0IDYyOC45MjM3OTdDNjU2LjM3NjgyIDg3OS4yNDc2OTcgMTA0OC4yMDYzMjkgNTk3LjIzMDI4MSAxMDQ4LjIwNjMyOSAzMTIuNzE3MTM0YzAtOTIuMzQxOTg2LTU0LjkwNjA0Ni0xNzcuMTk2Nzg0LTEzOS43NjA4NDQtMjE0LjYzMjcyNC0xMTcuMjk5MjgtNTQuOTA2MDQ2LTI1OS41NTU4NTMtMi40OTU3MjktMzExLjk2NjE2OSAxMTcuMjk5Mjc5LTQuOTkxNDU5IDEyLjQ3ODY0Ny0xOS45NjU4MzUgMjIuNDYxNTY0LTM0Ljk0MDIxMSAyMi40NjE1NjUtMTQuOTc0Mzc2IDAtMjcuNDUzMDIzLTcuNDg3MTg4LTM0Ljk0MDIxMS0yMi40NjE1NjVDNDg5LjE2Mjk1MyAxMzAuNTI4ODkxIDQwNC4zMDgxNTUgNzUuNjIyODQ2IDMxMS45NjYxNjkgNzUuNjIyODQ2eiIgcC1pZD0iMTExNTgiIGZpbGw9IiMzMzMzMzMiPjwvcGF0aD48L3N2Zz4="},78:function(t,i,e){"use strict";i.a={computed:{isAll:function(){return"ALL"===this.type}},props:{type:{type:String,default:function(){return"TEAM"}},team:Object,league:Object},methods:{follow:function(){"TEAM"===this.type?this.$emit("clickFollowTeam",this.team):this.$emit("clickFollowLeague",this.league)}}}},79:function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement;return(t._self._c||i)("div",{staticClass:"follow-team",class:{follow:t.isAll?t.league.followAll:t.team.follow},on:{click:t.follow}},[t._v(t._s(t.isAll?"全部":t.team.teamName))])},s=[],n={render:o,staticRenderFns:s};i.a=n},80:function(t,i,e){"use strict";function o(t){e(81)}var s=e(86),n=e(87),a=e(3),M=o,r=a(s.a,n.a,M,"data-v-36a01466",null);i.a=r.exports},81:function(t,i,e){var o=e(82);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);e(51)("556c4e9c",o,!0)},82:function(t,i,e){i=t.exports=e(50)(void 0),i.push([t.i,".follow-header[data-v-36a01466]{padding:0 51.2px 0 19.2px;padding:0 3.2rem 0 1.2rem;width:100%;height:16px;height:1rem;line-height:16px;line-height:1rem;-webkit-box-sizing:border-box;box-sizing:border-box;background-image:url("+e(83)+");background-size:.5rem;background-position:4px;background-position:.25rem;background-repeat:no-repeat;border-bottom:1px solid #ccc}.follow-desc[data-v-36a01466]{position:absolute;top:0;right:6.4px;right:.4rem;width:48px;width:3rem;height:100%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end}.follow-desc p[data-v-36a01466]{font-size:4.8px;font-size:.3rem;color:#999}.arrow-v[data-v-36a01466]{margin-left:6.4px;margin-left:.4rem;width:6.4px;width:.4rem;height:6.4px;height:.4rem;border-radius:50%;border:1px solid #333;-webkit-box-shadow:0 0 10px transparent;box-shadow:0 0 10px transparent;background-size:.4rem;background-position:bottom;background-repeat:no-repeat}.arrow-v.open[data-v-36a01466]{background-image:url("+e(84)+")}.arrow-v.close[data-v-36a01466]{background-image:url("+e(85)+")}",""])},83:function(t,i){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMzcwODQwNjkwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjM2MjgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMiA1MTJtLTUxMiAwYTUxMiA1MTIgMCAxIDAgMTAyNCAwIDUxMiA1MTIgMCAxIDAtMTAyNCAwWiIgZmlsbD0iI0U1N0UyNSIgcC1pZD0iMzYyOSI+PC9wYXRoPjxwYXRoIGQ9Ik0xMy4zMzAyODYgNTUyLjAwOTE0M2M2Ni4yMTI1NzEtNjMuMjMyIDE3NS4wNjc0MjktODMuMzA5NzE0IDI1My4zMTItNDYuNzc0ODU3YTk2My44NzY1NzEgOTYzLjg3NjU3MSAwIDAgMC0xNDkuMTIgMzMzLjE0NzQyOGM4LjYxMjU3MSAxMC40MDQ1NzEgMTcuNzAwNTcxIDIwLjM3MDI4NiAyNy4wOTk0MjggMzAuMDQzNDI5YTE3LjgyODU3MSAxNy44Mjg1NzEgMCAwIDAgNS40MTI1NzItOS4xOTc3MTQgOTI2Ljg0OCA5MjYuODQ4IDAgMCAxIDE0Ny42NTcxNDMtMzM0LjU1NTQyOWM0Ni43MiAzNi4yNjA1NzEgNjkuNjUwMjg2IDk1Ljk0NTE0MyA2NC40NTcxNDIgMTcyLjUyNTcxNGwtMC4wNzMxNDIgMC45ODc0MjkgMC4wMzY1NzEgMS4wMDU3MTRjNC41ODk3MTQgMTEwLjg2NjI4NiA2OC40OTgyODYgMjEyLjMxNTQyOSAxNzAuOTM0ODU3IDI3MS4zNDE3MTRhMzQ5LjY0MTE0MyAzNDkuNjQxMTQzIDAgMCAwIDk5Ljk0OTcxNCAzOC45MzAyODYgNTA4LjQ3MDg1NyA1MDguNDcwODU3IDAgMCAwIDg3LjQ3ODg1OC0yOS44Nzg4NTdjLTU1Ljc1MzE0MyA0LjMxNTQyOS0xMTQuNzc5NDI5LTkuMzk4ODU3LTE2OS4xNzk0MjktNDAuNzQwNTcxLTkxLjIyNzQyOS01Mi41NzE0MjktMTQ4LjIwNTcxNC0xNDIuMjk5NDI5LTE1Mi42MTI1NzEtMjQwLjIwMTE0MyA3LjIyMjg1Ny0xMTAuODg0NTcxLTM2LjcxNzcxNC0xNzEuNDEwMjg2LTc5LjA2NzQyOS0yMDMuNzk0Mjg2YTkzNy41MDg1NzEgOTM3LjUwODU3MSAwIDAgMSA4OC44MzItMTAwLjM1MiA0MDE3LjM3MTQyOSA0MDE3LjM3MTQyOSAwIDAgMSAzNjcuMTA0IDM4OS43MjM0MjlsNzguODY2Mjg2IDk1Ljk0NTE0MiAyOC4yNTE0MjgtMjMuMjQxMTQyLTc4Ljg2NjI4NS05NS45NDUxNDNBNDA1My42NTAyODYgNDA1My42NTAyODYgMCAwIDAgNDM1LjE2MzQyOSAzNjkuMzcxNDI5YTkzNS43MzQ4NTcgOTM1LjczNDg1NyAwIDAgMSA3OS45NjM0MjgtNjQuNzg2Mjg2YzQzLjcwMjg1NyA1NS4yNDExNDMgMTEzLjk3NDg1NyA4Mi4zMDQgMjAxLjgwMTE0MyA3Ni41MjU3MTQgODIuNjMzMTQzIDMuNzQ4NTcxIDE2MC4xODI4NTcgNDguNzMxNDI5IDIxMi45MDA1NzEgMTIzLjUwMTcxNCA0MC45OTY1NzEgNTguMTQ4NTcxIDYxLjg2MDU3MSAxMjcuMzA1MTQzIDU5Ljc3NiAxOTEuODE3MTQzYTUwOC43MDg1NzEgNTA4LjcwODU3MSAwIDAgMCAyNS45MTA4NTgtOTIuMDMyIDM2OS43MzcxNDMgMzY5LjczNzE0MyAwIDAgMC01NS43ODk3MTUtMTIwLjg1MDI4NWMtNTkuNTItODQuNDI1MTQzLTE0Ny44MjE3MTQtMTM1LjA5NDg1Ny0yNDIuMjQ5MTQzLTEzOS4wMDhsLTEuMDA1NzE0LTAuMDM2NTcyLTAuOTg3NDI4IDAuMDczMTQzYy03NC40MjI4NTcgNS4wMTAyODYtMTMzLjM3Ni0xNi42NTgyODYtMTY5Ljk2NTcxNS02MS4wNzQyODZhOTI2LjcyIDkyNi43MiAwIDAgMSAzMTMuNjkxNDI5LTEzMy40ODU3MTQgMTcuODY1MTQzIDE3Ljg2NTE0MyAwIDAgMCA5LjEwNjI4Ni01LjUyMjI4NiA1MTEuMzA1MTQzIDUxMS4zMDUxNDMgMCAwIDAtMjkuOTcwMjg2LTI3LjAwOCA5NjMuMTYzNDI5IDk2My4xNjM0MjkgMCAwIDAtMzEyLjg1MDI4NiAxMzUuNDQyMjg2Yy0zNS41ODQtNzEuNDYwNTcxLTIzLjEzMTQyOS0xNzEuODg1NzE0IDMwLjQ4MjI4Ni0yNDAuODA0NTcxbDcuNDQyMjg2LTkuNTYzNDI5QTUxOC44Mzg4NTcgNTE4LjgzODg1NyAwIDAgMCA1MTIgMHYxMS4yMjc0MjljLTUwLjcyNDU3MSA4MC4yOTI1NzEtNTguMjc2NTcxIDE4NC44NTAyODYtMTYuOTMyNTcxIDI2Mi43ODRhOTc2LjE2NDU3MSA5NzYuMTY0NTcxIDAgMCAwLTg2LjkxMiA3MC41MjggNDAzNS4xMjY4NTcgNDAzNS4xMjY4NTcgMCAwIDAtMTgzLjgyNjI4Ni0xNTguNjEwMjg2TDE2My43MTIgMTM2Ljg1MDI4NmMtOC45OTY1NzEgOC4zNTY1NzEtMTcuNjY0IDE3LjAyNC0yNi4wMzg4NTcgMjYuMDAyMjg1bDYzLjY1MjU3MSA1MS41MjkxNDNhMzk5MC43MjkxNDMgMzk5MC43MjkxNDMgMCAwIDEgMTgwLjIwNTcxNSAxNTUuMzczNzE1IDk3NS4zMjM0MjkgOTc1LjMyMzQyOSAwIDAgMC05Mi45ODI4NTggMTA1LjU0NTE0MmMtMi4wODQ1NzEtMS4wNjA1NzEtNC4yMDU3MTQtMi4xNTc3MTQtNi4xOTg4NTctMy4wOTAyODVDMTk1LjYyMDU3MSA0MzEuNTk3NzE0IDgxLjU1NDI4NiA0NDguNjIxNzE0IDMuNDc0Mjg2IDUxMkgwYzAgMTcuMDA1NzE0IDAuODc3NzE0IDMzLjc5MiAyLjQ4Njg1NyA1MC4zNTg4NTdsMTAuODQzNDI5LTEwLjM0OTcxNHoiIGZpbGw9IiMzODQ1NEYiIHAtaWQ9IjM2MzAiPjwvcGF0aD48L3N2Zz4="},84:function(t,i){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMTA4NDM0NTQwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijg4MTgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDQiIGhlaWdodD0iNDQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMS44NzIgNjc2LjhjLTAuMDAzIDAtMC4wMDYgMC0wLjAwOCAwLTkuMTM3IDAtMTcuMzc5LTMuODI5LTIzLjIxLTkuOTdsLTI1MS4yNzctMjY1LjYxNGMtNS40MTUtNS43Mi04Ljc0My0xMy40NjQtOC43NDQtMjEuOTg0IDAtMTcuNjc4IDE0LjMzLTMyLjAwOCAzMi4wMDgtMzIuMDA4IDkuMTU3IDAgMTcuNDE2IDMuODQ1IDIzLjI1IDEwLjAwOWwyMjguMDQ1IDI0MS4xMDMgMjI4LjIyNC0yNDEuMDg4YzUuODU1LTYuMTY1IDE0LjExMy0xMC4wMDEgMjMuMjY2LTEwLjAwMSA4LjUxNiAwIDE2LjI1NiAzLjMyIDIxLjk5OCA4LjczNiAxMi43ODQgMTIuMTQ1IDEzLjM2IDMyLjQzNCAxLjI2NCA0NS4yMzNsLTI1MS41MiAyNjUuNmMtNS44NDQgNi4xNTUtMTQuMDg2IDkuOTg0LTIzLjIyMyA5Ljk4NC0wLjAyNSAwLTAuMDUxIDAtMC4wNzYgMHoiIHAtaWQ9Ijg4MTkiPjwvcGF0aD48L3N2Zz4="},85:function(t,i){t.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTEyMTA4MzkzNDM5IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9Ijc5MjEiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDQiIGhlaWdodD0iNDQiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTUxMi4xMjggMzQ3LjIwMDAwMDAwMDAwMDFhMzIgMzIgMCAwIDEgMjMuMjMxOTk5OTk5OTk5OTkyIDkuOTg0MDAwMDAwMDAwMDA1bDI1MS4yNjM5OTk5OTk5OTk5OCAyNjUuNmEzMiAzMiAwIDAgMS00Ni41MjgwMDAwMDAwMDAwMDYgNDMuOTY3OTk5OTk5OTk5OThsLTIyOC4wMzE5OTk5OTk5OTk5My0yNDEuMDg4MDAwMDAwMDAwMTQtMjI4LjIyNDAwMDAwMDAwMDA1IDI0MS4wODc5OTk5OTk5OTk5NGEzMi4wNjQgMzIuMDY0IDAgMCAxLTQ1LjI0Nzk5OTk5OTk5OTk5IDEuMjc5OTk5OTk5OTk5OTgzNGMtMTIuNzk5OTk5OTk5OTk5OTk3LTEyLjE2MDAwMDAwMDAwMDAwNS0xMy4zNzU5OTk5OTk5OTk5ODUtMzIuNDQ4LTEuMjc5OTk5OTk5OTk5OTgzNC00NS4yNDc5OTk5OTk5OTk5OWwyNTEuNTItMjY1LjU5OTk5OTk5OTk5OTg1YTMyIDMyIDAgMCAxIDIzLjI5Ni05Ljk4Mzk5OTk5OTk5OTk5eiIgcC1pZD0iNzkyMiIgZmlsbD0iIzMzMzMzMyI+PC9wYXRoPjwvc3ZnPg=="},86:function(t,i,e){"use strict";var o=e(60);i.a={data:function(){return{showFollowInfo:!1}},computed:{infoClass:function(){return{open:this.showFollowInfo,close:!this.showFollowInfo}},followCount:function(){return this.league.teams.filter(function(t){return t.follow}).length}},props:{league:{type:Object,default:function(){return{followAll:!1,teams:[]}}}},components:{team:o.a},methods:{toggleFollowInfo:function(){this.showFollowInfo=!this.showFollowInfo,this.$emit("clickArrow")}}}},87:function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"follow-bar"},[e("div",{staticClass:"posr follow-header",on:{click:t.toggleFollowInfo}},[t._v("\n\t\t"+t._s(t.league.leagueName)+"\n\t\t"),e("div",{staticClass:"follow-desc"},[e("p",{directives:[{name:"show",rawName:"v-show",value:t.followCount,expression:"followCount"}]},[t._v("已关注"+t._s(t.followCount)+"个")]),e("p",{staticClass:"arrow-v",class:t.infoClass})])]),e("div",{directives:[{name:"show",rawName:"v-show",value:t.showFollowInfo,expression:"showFollowInfo"}],staticClass:"follow-info"},[e("team",{attrs:{type:"ALL",league:t.league},on:{clickFollowLeague:function(i){t.$emit("clickFollowLeague",t.league)}}}),t._l(t.league.teams,function(i){return e("team",{key:i.teamID,attrs:{team:i,type:"TEAM"},on:{clickFollowTeam:function(e){t.$emit("clickFollowTeam",i)}}})})],2)])},s=[],n={render:o,staticRenderFns:s};i.a=n},88:function(t,i,e){"use strict";var o=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"container"}},[e("div",{attrs:{id:"header"}},[e("div",{staticClass:"tabs"},[e("p",{staticClass:"tab",class:{active:0==t.index},on:{click:function(i){t.slideTo(0)}}},[t._v("关注列表")]),e("p",{staticClass:"tab",class:{active:1==t.index},on:{click:function(i){t.slideTo(1)}}},[t._v("已关注")])])]),e("div",{attrs:{id:"content"}},[e("div",{attrs:{id:"scroller"}},[e("div",{staticClass:"wrapper follow-list"},[e("div",{ref:"followListScroller",staticClass:"scroller"},t._l(t.leagues,function(i){return e("follow-bar",{key:i.leagueID,attrs:{league:i},on:{clickFollowTeam:t.followTeam,clickFollowLeague:t.followLeague,clickArrow:t.updateFollowScroll}})}))]),e("div",{staticClass:"wrapper followed-list"},[e("div",{ref:"followedListScroller",staticClass:"scroller"},t._l(t.teams,function(i){return e("team",{key:i.teamID,attrs:{team:i},on:{clickFollowTeam:t.followTeam}})}))])])]),t._m(0)])},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"footer"}},[e("div",{staticClass:"btn"},[t._v("完成")])])}],n={render:o,staticRenderFns:s};i.a=n}});
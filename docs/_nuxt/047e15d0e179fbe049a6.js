(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{166:function(e,t,n){var content=n(172);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(44).default)("cfb2dd72",content,!0,{sourceMap:!1})},171:function(e,t,n){"use strict";var r=n(166);n.n(r).a},172:function(e,t,n){(e.exports=n(43)(!1)).push([e.i,".playground__header[data-v-f1d73ad8]{background:#faa;height:100px;display:flex;align-items:stretch;justify-content:center}.playground__header__tab[data-v-f1d73ad8]{text-decoration:none;color:inherit;display:flex;align-items:center;justify-content:center;padding:20px}.playground__header__tab--active[data-v-f1d73ad8]{font-weight:700;pointer-events:none}.my-scroll[data-v-f1d73ad8]{width:640px;max-width:100%;margin:0 auto}[data-v-f1d73ad8] .my-page{border-bottom:1px solid #ccc;padding-bottom:20px;margin-bottom:20px}[data-v-f1d73ad8] .my-page__title{color:red}[data-v-f1d73ad8] .my-page__items{display:flex;flex-wrap:wrap}[data-v-f1d73ad8] .my-item{width:33.33333%;padding:5px}[data-v-f1d73ad8] .my-item,[data-v-f1d73ad8] .my-item__inner{display:flex;align-items:center;justify-content:center}[data-v-f1d73ad8] .my-item__inner{width:100%;overflow:hidden;box-shadow:0 0 5px rgba(0,0,0,.3)}[data-v-f1d73ad8] .my-item__body{padding:20px 0}[data-v-f1d73ad8] .my-item__name{margin:0}[data-v-f1d73ad8] .my-item--block{width:100%}",""])},174:function(e,t,n){"use strict";n.r(t);n(42),n(45);var r=n(5),o=(n(107),n(9)),c=n(16),d=n(23),l=n(18),f=n(17),v=n(19),m=(n(34),n(4)),y=n(163),h=n(0),_=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},x=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(l.a)(this,Object(f.a)(t).apply(this,arguments))).active=!1,e}return Object(v.a)(t,e),Object(d.a)(t,[{key:"render",value:function(e){var t=this,n=[e("button",{on:{click:function(e){e.stopPropagation(),t.active=!t.active}}},this.activatorLabel)];return this.active&&n.push(e("div",void 0,this.$slots.default)),e("div",void 0,n)}}]),t}(h.d);_([Object(h.c)({type:String,default:"Toggle"})],x.prototype,"activatorLabel",void 0);var j=x=_([Object(h.a)({name:"mock-expansion"})],x),O=function(e,t,n,desc){var r,o=arguments.length,c=o<3?t:null===desc?desc=Object.getOwnPropertyDescriptor(t,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(m.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,desc);else for(var i=e.length-1;i>=0;i--)(r=e[i])&&(c=(o<3?r(c):o>3?r(t,n,c):r(t,n))||c);return o>3&&c&&Object.defineProperty(t,n,c),c},k=24,w=124,C=500;function R(e){return new Promise(function(t){setTimeout(function(){for(var n=[],r=(e-1)*k,i=0;i<k;i++){var o=r+i;if(o>w-1)break;var c={id:"item-"+o};n.push(c)}t({total:w,items:n})},C)})}var P=function(e){function t(){return Object(c.a)(this,t),Object(l.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(d.a)(t,[{key:"onChangePage",value:function(e){if(e){var t=this.$route,n=this.$router,r=Object(o.a)({},t,{query:Object(o.a)({},t.query,{page:String(e)})});n.replace(r)}}},{key:"onChangeQuery",value:function(){var e=Object(r.a)(regeneratorRuntime.mark(function e(t){var n,r,o,c;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=t.page,r=void 0===n?1:n,o=t.tab,c=void 0===o?"inline":o,this.page=parseInt(r,10),this.tab=c;case 3:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"onInfiniteRequest",value:function(){var e=Object(r.a)(regeneratorRuntime.mark(function e(t){var n,r,o,c,d;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.page,e.next=3,R(n);case 3:if(r=e.sent,o=r.total,0!==(c=r.items).length){e.next=7;break}return e.abrupt("return");case 7:return d=k*(n-1)+c.length===o,e.abrupt("return",{page:n,data:r.items,finished:d});case 10:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()},{key:"destroyed",value:function(){console.warn("destroyed [".concat(this.$options.name,"]"))}},{key:"computedTags",get:function(){var e=this,t=this.$route,n=t.query;return this.tabs.map(function(r){return{name:r,to:Object(o.a)({},t,{query:Object(o.a)({},n,{tab:r})}),active:r===e.tab}})}}]),t}(y.Vue);O([Object(y.Watch)("page")],P.prototype,"onChangePage",null),O([Object(y.Watch)("$route.query",{immediate:!0})],P.prototype,"onChangeQuery",null);var T=P=O([Object(y.Component)({name:"list-view",components:{MockExpansion:j},data:function(){return{page:void 0===this.page?0:this.page,tab:void 0===this.tab?"inline":this.tab,pages:void 0===this.pages?[]:this.pages,tabs:["inline","block"]}}})],P),$=(n(171),n(15)),component=Object($.a)(T,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"playground"},[n("div",{staticClass:"playground__header"},e._l(e.computedTags,function(t){return n("router-link",{key:t.name,staticClass:"playground__header__tab",class:{"playground__header__tab--active":t.active},attrs:{to:t.to,replace:""}},[e._v(e._s(t.name))])}),1),e._v(" "),n("dd-infinite-scroll",{staticClass:"my-scroll",attrs:{page:e.page,request:e.onInfiniteRequest,"margin-top":"100","max-active-page":"3","page-class":"my-page","loading-color":"rgba(0, 0, 0, .5)"},on:{"change:page":function(t){e.page=t}},scopedSlots:e._u([{key:"page",fn:function(t){return[n("h2",{staticClass:"my-page__title"},[e._v("Page: "+e._s(t.page))]),e._v(" "),n("div",{staticClass:"my-page__items"},e._l(t.data,function(t){var r;return n("div",{key:t.id,staticClass:"my-item",class:(r={},r["my-item--"+e.tab]=!0,r)},[n("div",{staticClass:"my-item__inner"},[n("div",{staticClass:"my-item__body"},[n("h3",{staticClass:"my-item__name"},[n("router-link",{attrs:{to:{path:(e.$route.path+"/"+t.id).replace(/[\/]+/g,"/")}}},[e._v(e._s(t.id))])],1),e._v(" "),n("mock-expansion",[n("p",[e._v("Dummy Text...")]),e._v(" "),n("p",[e._v("Dummy Text...")]),e._v(" "),n("p",[e._v("Dummy Text...")]),e._v(" "),n("p",[e._v("Dummy Text...")]),e._v(" "),n("p",[e._v("Dummy Text...")])])],1)])])}),0)]}}]),model:{value:e.pages,callback:function(t){e.pages=t},expression:"pages"}})],1)},[],!1,null,"f1d73ad8",null);t.default=component.exports}}]);
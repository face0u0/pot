!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.IocPot=t():e.IocPot=t()}(self,(function(){return(()=>{"use strict";var e={106:(e,t,r)=>{r.r(t),r.d(t,{Pot:()=>f});const s=(e,t)=>-1!==e.indexOf(t);class n extends Error{constructor(){super("list is empty"),this.name="HasNoElementError"}}class o extends Error{constructor(){super("list is not one"),this.name="HasMultipleElementError"}}class c extends Error{constructor(){super("not implemented"),this.name="NotImplementedError"}}Error;class i extends Error{constructor(){super("there is circular reference or not defined reference"),this.name="UnresolvedError"}}class a extends Error{constructor(){super("ingredient not found"),this.name="IngredientNotFoundError"}}class l extends Error{constructor(){super("same name defined"),this.name="DuplicateNameError"}}class h extends class{constructor(){this.cache=null}produce(e){return null===this.cache&&(this.cache=this.makeOnce(e)),this.cache}makeOnce(e){throw new c}}{constructor(e){super(),this.recipe=t=>new(e.bind.apply(e,[null].concat(t)))}makeOnce(e){return this.recipe(e)}}class p{constructor(e,t,r,s){this.name=e,this.clazz=t,this.dependencies=r,this.provider=s}}class d{constructor(e,t,r,s){this.name=e,this.clazz=t,this.dependencies=r,this.provider=s}}class u{constructor(e){if(t=e.map((e=>e.name)),new Set(t).size!==t.length)throw new l;var t;const r={};e.forEach((e=>r[e.name]=e));const n={};for(;;){let e=!1;if(Object.keys(r).forEach((t=>{const o=r[t],c=Object.keys(n);0===o.dependencies.filter((e=>!s(c,e))).length&&(n[t]=new p(t,o.clazz,o.dependencies.map((e=>n[e])),o.provider),delete r[t],e=!0)})),Object.keys(n).length===Object.keys(r).length)break;if(!e)throw new i}this.__ingredientsHash=n}create(e){const t=this.__ingredientsHash[e];if(void 0!==t){const e=t.dependencies.map((e=>this.create(e.name)));return t.provider.produce(e)}throw new a}}class f{constructor(){this.__recipes=[],this.__aliasesHashMap={},this.__container=null}define(e,t,r){this.__recipes.push(new d(e,t,r,new h(t)))}alias(e,t){this.__aliasesHashMap[e]=t}resolve(){const e=this.__resolveAliases();this.__container=new u(((...e)=>{let t=[];return e.forEach((e=>{t=t.concat(e)})),t})(this.__recipes,e))}locate(e){return null===this.__container?null:this.__container.create(e)}__resolveAliases(){return Object.keys(this.__aliasesHashMap).map((e=>{const t=this.__aliasesHashMap[e],r=this.__findRecipe(t);return new d(e,r.clazz,r.dependencies,r.provider)}))}__findRecipe(e){return(e=>{switch(e.length){case 0:throw new n;case 1:return e[0];default:throw new o}})(this.__recipes.filter((t=>t.name===e)))}}Error}},t={};function r(s){if(t[s])return t[s].exports;var n=t[s]={exports:{}};return e[s](n,n.exports,r),n.exports}return r.d=(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(106)})()}));
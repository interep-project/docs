"use strict";(self.webpackChunkinterep_docs=self.webpackChunkinterep_docs||[]).push([[647],{3905:(e,t,r)=>{r.d(t,{Zo:()=>u,kt:()=>m});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function o(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var c=n.createContext({}),p=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},u=function(e){var t=p(e.components);return n.createElement(c.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),d=p(r),m=i,f=d["".concat(c,".").concat(m)]||d[m]||s[m]||a;return r?n.createElement(f,l(l({ref:t},u),{},{components:r})):n.createElement(f,l({ref:t},u))}));function m(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,l=new Array(a);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:i,l[1]=o;for(var p=2;p<a;p++)l[p]=r[p];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},8162:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>l,default:()=>s,frontMatter:()=>a,metadata:()=>o,toc:()=>p});var n=r(7462),i=(r(7294),r(3905));const a={},l="Reddit",o={unversionedId:"technical-reference/reputation/reddit",id:"technical-reference/reputation/reddit",title:"Reddit",description:"Parameters",source:"@site/docs/technical-reference/reputation/reddit.md",sourceDirName:"technical-reference/reputation",slug:"/technical-reference/reputation/reddit",permalink:"/technical-reference/reputation/reddit",editUrl:"https://github.com/interep-project/docs/edit/main/docs/technical-reference/reputation/reddit.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Github",permalink:"/technical-reference/reputation/github"},next:{title:"Twitter",permalink:"/technical-reference/reputation/twitter"}},c={},p=[{value:"Parameters",id:"parameters",level:2},{value:"Levels",id:"levels",level:2},{value:"Gold",id:"gold",level:3},{value:"Silver",id:"silver",level:3},{value:"Bronze",id:"bronze",level:3},{value:"Configuration file: src/criteria/reddit.ts",id:"configuration-file-srccriteriaredditts",level:4}],u={toc:p};function s(e){let{components:t,...r}=e;return(0,i.kt)("wrapper",(0,n.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"reddit"},"Reddit"),(0,i.kt)("h2",{id:"parameters"},"Parameters"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Premium subscription"),": true if the user has subscribed to a premium plan, false otherwise;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Karma"),": amount of user's karma;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Coins"),": amount of user's coins;"),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("strong",{parentName:"li"},"Linked identities"),": number of identities linked to the account (e.g. Twitter, Google).")),(0,i.kt)("h2",{id:"levels"},"Levels"),(0,i.kt)("h3",{id:"gold"},"Gold"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'[\n    {\n        parameter: "premiumSubscription",\n        value: true\n    },\n    {\n        parameter: "karma",\n        value: {\n            min: 10000\n        }\n    },\n    {\n        parameter: "coins",\n        value: {\n            min: 5000\n        }\n    },\n    {\n        parameter: "linkedIdentities",\n        value: {\n            min: 3\n        }\n    }\n]\n')),(0,i.kt)("h3",{id:"silver"},"Silver"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'[\n    {\n        parameter: "karma",\n        value: {\n            min: 5000\n        }\n    },\n    {\n        parameter: "coins",\n        value: {\n            min: 2000\n        }\n    },\n    {\n        parameter: "linkedIdentities",\n        value: {\n            min: 2\n        }\n    }\n]\n')),(0,i.kt)("h3",{id:"bronze"},"Bronze"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},'[\n    {\n        parameter: "karma",\n        value: {\n            min: 1000\n        }\n    },\n    {\n        parameter: "coins",\n        value: {\n            min: 500\n        }\n    }\n]\n')),(0,i.kt)("hr",null),(0,i.kt)("h4",{id:"configuration-file-srccriteriaredditts"},"Configuration file: ",(0,i.kt)("a",{parentName:"h4",href:"https://github.com/interep-project/interep.js/blob/main/packages/reputation/src/criteria/reddit.ts"},"src/criteria/reddit.ts")))}s.isMDXComponent=!0}}]);
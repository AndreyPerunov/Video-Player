(()=>{"use strict";var e,t={315:(e,t,n)=>{var r=n(294),o=n(745);const c=function(){return r.createElement("div",{className:"spinner"})},a=function(e){let{elapsedTime:t,durationTime:n}=e;const o=Math.floor(t/60),c=Math.floor(t%60),a=Math.floor(n/60),i=Math.floor(n%60);return r.createElement("div",{className:"video-container__controls__buttons__duration-container"},r.createElement("div",{className:"video-container__controls__buttons__duration-container__current-time"},o,":",c.toString().padStart(2,"0")),"/",r.createElement("div",{className:"video-container__controls__buttons__duration-container__total-time"},a,":",i.toString().padStart(2,"0")))},i=function(e){let{setOutside:t}=e;const n=(0,r.useRef)(!0),o=(0,r.useRef)(null),i=(0,r.useRef)(null),s=(0,r.useRef)(null),u=(0,r.useRef)(null),l=(0,r.useRef)(null),[m,_]=(0,r.useState)(!1),[v,d]=(0,r.useState)(!1),[f,E]=(0,r.useState)(!1),[p,h]=(0,r.useState)(!1),[b,g]=(0,r.useState)(!1),[L,C]=(0,r.useState)(!1),[w,N]=(0,r.useState)(!1),[y,V]=(0,r.useState)("high"),[M,k]=(0,r.useState)(1),[x,H]=(0,r.useState)(0),[S,z]=(0,r.useState)(0),[B,P]=(0,r.useState)(1),[R,O]=(0,r.useState)(0),T=Math.floor(R/60),j=Math.floor(R%60),F=(0,r.useCallback)((e=>{const t=document.activeElement.tagName.toLowerCase();if(o.current&&"input"!==t)switch(e.key.toLowerCase()){case" ":if("button"===t)return;e.preventDefault(),X();break;case"k":X();break;case"t":$();break;case"f":return void G();case"i":return void A();case"m":return void Q();case"arrowleft":return void J(-5);case"j":return void J(-10);case"arrowright":return void J(5);case"l":return void J(10);case"arrowup":return e.preventDefault(),void K(.05);case"arrowdown":return e.preventDefault(),void K(-.05)}}),[L,m,b,w]);function I(e){if(!o.current)return;const{width:t,left:n}=s.current.getBoundingClientRect(),r=(e.x-n)/t;if(r>=0&&r<=1){const e=Math.floor(20*r)+1;O(r*o.current.duration),u.current.src=`./assets/previewImages/preview${e}.jpg`,s.current.style.setProperty("--preview-position",r)}f&&(e.preventDefault(),l.current.src=u.current.src,s.current.style.setProperty("--progress-position",r))}function Z(e){E(1===e.buttons),I(e)}function D(e){f&&Z(e)}function q(e){f&&Z(e)}function X(){o.current&&(m?o.current.pause():o.current.play())}function $(){o.current&&(L||(g(!1),N(!1),b&&document.exitFullscreen(),w&&document.exitPictureInPicture()),C(!L))}function A(){o.current&&(w||(C(!1),g(!1),b&&document.exitFullscreen()),N(!w),w?document.exitPictureInPicture():o.current.requestPictureInPicture())}function G(){o.current&&(b||(C(!1),N(!1),w&&document.exitPictureInPicture()),g(!b),null==document.fullscreenElement?i.current.requestFullscreen():document.exitFullscreen())}function J(e){o.current&&(o.current.currentTime+=e)}function K(e){o.current&&k((t=>t+e))}function Q(){o.current&&(o.current.muted=!o.current.muted)}return(0,r.useEffect)((()=>(document.addEventListener("keydown",F),()=>document.removeEventListener("keydown",F))),[F]),(0,r.useEffect)((()=>(s.current.addEventListener("mousemove",I),()=>s.current.removeEventListener("mousemove",I))),[I]),(0,r.useEffect)((()=>(s.current.addEventListener("mousedown",Z),()=>s.current.removeEventListener("mousedown",Z))),[Z]),(0,r.useEffect)((()=>(document.addEventListener("mouseup",D),()=>document.removeEventListener("mouseup",D))),[D]),(0,r.useEffect)((()=>(document.addEventListener("mousemove",q),()=>document.removeEventListener("mousemove",q))),[q]),(0,r.useEffect)((()=>{if(n.current)n.current=!1;else{let e=window.event;if(f)h(!o.current.paused),o.current.pause();else{const{width:t,left:n}=s.current.getBoundingClientRect(),r=(e.x-n)/t;o.current.currentTime=o.current.duration*r,p&&o.current.play()}}}),[f]),(0,r.useEffect)((()=>{t(!(!L&&!b))}),[L,b]),(0,r.useEffect)((()=>{o.current&&(o.current.muted=0==M,M>1&&k(1),M<0&&k(0),M>0&&M<=1&&(o.current.volume=M))}),[M]),(0,r.useEffect)((()=>{o.current&&B!==o.current.playbackRate&&(o.current.playbackRate=B)}),[B]),(0,r.useEffect)((()=>{if(!o.current)return;const e=()=>{v&&d(!1),_(!0)},t=()=>{v&&d(!1),_(!1)},n=()=>{m&&d(!1),d(!0)},r=o.current,c=()=>{if(d(!1),!s.current)return;const{currentTime:e,duration:t}=r,n=e/t;z(e),s.current.style.setProperty("--progress-position",n)},a=()=>{H(r.duration)},i=()=>{if(!r.buffered.length||!s.current)return;const{duration:e,buffered:t}=r,n=t.end(t.length-1);if(s&&e>0){const t=n/e;s.current.style.setProperty("--buffer-position",t)}},u=()=>{k(r.volume),r.volume>=.5&&V("high"),r.volume<.5&&r.volume>0&&V("low"),(0==r.volume||r.muted)&&(V("muted"),k(0))};return r.addEventListener("play",e),r.addEventListener("playing",e),r.addEventListener("pause",t),r.addEventListener("waiting",n),r.addEventListener("timeupdate",c),r.addEventListener("durationchange",a),r.addEventListener("progress",i),r.addEventListener("volumechange",u),()=>{r.removeEventListener("play",e),r.removeEventListener("playing",e),r.removeEventListener("pause",t),r.removeEventListener("waiting",n),r.removeEventListener("timeupdate",c),r.removeEventListener("durationchange",a),r.removeEventListener("progress",i),r.removeEventListener("volumechange",u)}}),[o.current]),r.createElement("div",{ref:i,className:"video-container "+(m?"":"video-container--paused ")+(L?"video-container--theater ":"")+(b?"video-container--full-screen ":"")+(w?"video-container--mini-player ":"")+(f?"video-container--scrubbing ":""),"data-volume-level":y},v&&r.createElement(c,null),r.createElement("video",{onClick:X,ref:o,src:"./assets/cute-cat.mp4",controlsList:"nodownload"}),r.createElement("img",{ref:l,className:"video-container__thumbnail-img"}),r.createElement("div",{className:"video-container__controls"},r.createElement("div",{ref:s,className:"video-container__controls__timeline-container"},r.createElement("div",{className:"video-container__controls__timeline-container__timeline",onClick:function(e){if(!o.current)return;const{left:t,width:n}=e.currentTarget.getBoundingClientRect(),r=(e.clientX-t)/n;r<0||r>1||(o.current.currentTime=o.current.duration*r)}},r.createElement("div",{className:"video-container__controls__timeline-container__timeline__preview"},r.createElement("img",{ref:u,className:"video-container__controls__timeline-container__timeline__preview__img"}),r.createElement("span",{className:"video-container__controls__timeline-container__timeline__preview__time"},T,":",j.toString().padStart(2,"0"))),r.createElement("div",{className:"video-container__controls__timeline-container__timeline__buffer"}),r.createElement("div",{className:"video-container__controls__timeline-container__timeline__thumb-indicator"}))),r.createElement("div",{className:"video-container__controls__buttons"},r.createElement("button",{onClick:X,className:"video-container__controls__buttons__play-pause-btn"},r.createElement("svg",{className:"video-container__controls__buttons__play-pause-btn__play-icon",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M8,5.14V19.14L19,12.14L8,5.14Z"})),r.createElement("svg",{className:"video-container__controls__buttons__play-pause-btn__pause-icon",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M14,19H18V5H14M6,19H10V5H6V19Z"}))),r.createElement("div",{className:"video-container__controls__buttons__volume-container"},r.createElement("button",{onClick:Q,className:"video-container__controls__buttons__volume-container__mute-btn"},r.createElement("svg",{className:"video-container__controls__buttons__volume-container__mute-btn__volume-high-icon",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z"})),r.createElement("svg",{className:"video-container__controls__buttons__volume-container__mute-btn__volume-low-icon",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z"})),r.createElement("svg",{className:"video-container__controls__buttons__volume-container__mute-btn__volume-muted-icon",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z"}))),r.createElement("input",{onChange:e=>k(e.target.value),className:"video-container__controls__buttons__volume-container__volume-slider",type:"range",min:"0",max:"1",step:"any",value:M})),r.createElement(a,{elapsedTime:S,durationTime:x}),r.createElement("button",{onClick:function(){P(2===B?.25:B+.25)},className:"video-container__controls__buttons__speed-btn"},B,"x"),r.createElement("button",{onClick:A,className:"video-container__controls__buttons__mini-player-btn"},r.createElement("svg",{viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"}))),r.createElement("button",{onClick:$,className:"video-container__controls__buttons__theater-btn"},r.createElement("svg",{className:"video-container__controls__buttons__theater-btn__tall",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"})),r.createElement("svg",{className:"video-container__controls__buttons__theater-btn__wide",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"}))),r.createElement("button",{onClick:G,className:"video-container__controls__buttons__full-screen-btn"},r.createElement("svg",{className:"video-container__controls__buttons__full-screen-btn__open",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"})),r.createElement("svg",{className:"video-container__controls__buttons__full-screen-btn__close",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"}))))))},s=function(e){return r.createElement("div",{className:"card "+(e.modifier?"card--"+e.modifier:"")})},u=function(e){const t=[];for(let n=0;n<e.amount;n++)t.push(r.createElement(s,{key:n,modifier:e.modifier}));return t};function l(){const[e,t]=(0,r.useState)(!1);return r.createElement(r.Fragment,null,r.createElement("div",{className:e?"container-outside":"container"},r.createElement("div",{className:"video"},r.createElement(i,{setOutside:t})),r.createElement("div",{className:"Card"},r.createElement(u,{amount:"12",modifier:"green"})),r.createElement("div",{className:"RightCard"},r.createElement(u,{amount:"8"}))))}o.createRoot(document.querySelector("#app")).render(r.createElement(l,null))}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var c=n[e]={exports:{}};return t[e](c,c.exports,r),c.exports}r.m=t,e=[],r.O=(t,n,o,c)=>{if(!n){var a=1/0;for(l=0;l<e.length;l++){for(var[n,o,c]=e[l],i=!0,s=0;s<n.length;s++)(!1&c||a>=c)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(i=!1,c<a&&(a=c));if(i){e.splice(l--,1);var u=o();void 0!==u&&(t=u)}}return t}c=c||0;for(var l=e.length;l>0&&e[l-1][2]>c;l--)e[l]=e[l-1];e[l]=[n,o,c]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,c,[a,i,s]=n,u=0;if(a.some((t=>0!==e[t]))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(s)var l=s(r)}for(t&&t(n);u<a.length;u++)c=a[u],r.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return r.O(l)},n=self.webpackChunkvideo_player=self.webpackChunkvideo_player||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[745],(()=>r(315)));o=r.O(o)})();
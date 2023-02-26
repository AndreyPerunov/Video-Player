(()=>{"use strict";var e,t={273:(e,t,n)=>{var r=n(294),o=n(745);const c=function(){return r.createElement("div",{className:"spinner"})},a=function(e){let{toggleThreaterMode:t}=e;const n=(0,r.useRef)(null),o=(0,r.useRef)(null),[a,i]=(0,r.useState)(!1),[l,s]=(0,r.useState)(!1);function u(e){n.current&&(75!=e.keyCode&&32!=e.keyCode||(e.preventDefault(),m()))}function m(){n.current&&(a?n.current.pause():n.current.play())}return(0,r.useEffect)((()=>(document.addEventListener("keydown",u),()=>document.removeEventListener("keydown",u))),[u]),(0,r.useEffect)((()=>{if(!n.current)return;function e(){l&&s(!1),i(!0)}function t(){l&&s(!1),i(!1)}function r(){a&&s(!1),s(!0)}const c=n.current;function u(){if(s(!1),!o.current)return;const{currentTime:e,duration:t}=c,n=e/t;o.current.style.setProperty("--progress-position",n)}function m(){if(!c.buffered.length||!o.current)return;const{duration:e,buffered:t}=c,n=t.end(t.length-1);if(o&&e>0){const t=n/e;o.current.style.setProperty("--buffer-position",t)}}return c.addEventListener("play",e),c.addEventListener("playing",e),c.addEventListener("pause",t),c.addEventListener("waiting",r),c.addEventListener("timeupdate",u),c.addEventListener("progress",m),()=>{c.removeEventListener("play",e),c.removeEventListener("playing",e),c.removeEventListener("pause",t),c.removeEventListener("waiting",r),c.removeEventListener("timeupdate",u),c.removeEventListener("progress",m)}}),[n.current]),r.createElement("div",{className:"video-container "+(a?"":"video-container--paused")},l&&r.createElement(c,null),r.createElement("video",{onClick:m,ref:n,src:"./assets/cute-cat.mp4",controlsList:"nodownload"}),r.createElement("img",{className:"thumbnail-img"}),r.createElement("div",{className:"video-container__controls"},r.createElement("div",{ref:o,className:"video-container__controls__timeline-container"},r.createElement("div",{className:"video-container__controls__timeline-container__timeline",onClick:function(e){if(!n.current)return;const{left:t,width:r}=e.currentTarget.getBoundingClientRect(),o=(e.clientX-t)/r;o<0||o>1||(n.current.currentTime=n.current.duration*o)}},r.createElement("img",{className:"video-container__controls__timeline-container__timeline__preview-img"}),r.createElement("div",{className:"video-container__controls__timeline-container__timeline__thumb-indicator"}),r.createElement("div",{className:"video-container__controls__timeline-container__timeline__buffer"}))),r.createElement("div",{className:"video-container__controls__buttons"},r.createElement("button",{onClick:m,className:"video-container__controls__buttons__play-pause-btn"},r.createElement("svg",{className:"video-container__controls__buttons__play-pause-btn__play-icon",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M8,5.14V19.14L19,12.14L8,5.14Z"})),r.createElement("svg",{className:"video-container__controls__buttons__play-pause-btn__pause-icon",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M14,19H18V5H14M6,19H10V5H6V19Z"}))),r.createElement("button",{className:"video-container__controls__buttons__mini-player-btn"},r.createElement("svg",{viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z"}))),r.createElement("button",{onClick:t,className:"video-container__controls__buttons__theater-btn"},r.createElement("svg",{className:"video-container__controls__buttons__theater-btn__tall",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"})),r.createElement("svg",{className:"video-container__controls__buttons__theater-btn__wide",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"}))),r.createElement("button",{className:"video-container__controls__buttons__full-screen-btn"},r.createElement("svg",{className:"video-container__controls__buttons__full-screen-btn__open",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"})),r.createElement("svg",{className:"video-container__controls__buttons__full-screen-btn__close",viewBox:"0 0 24 24"},r.createElement("path",{fill:"currentColor",d:"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"}))))))},i=function(e){return r.createElement("div",{className:"card "+(e.modifier?"card--"+e.modifier:"")})},l=function(e){const t=[];for(let n=0;n<e.amount;n++)t.push(r.createElement(i,{key:n,modifier:e.modifier}));return t};function s(){const[e,t]=(0,r.useState)(!1),n=(0,r.useCallback)((n=>{84===n.keyCode&&t(!e)}),[e]);return(0,r.useEffect)((()=>(document.addEventListener("keydown",n),()=>document.addEventListener("keydown",n))),[n]),r.createElement(r.Fragment,null,r.createElement("div",{className:e?"container-theater-mode":"container"},r.createElement("div",{className:"video"},r.createElement(a,{toggleThreaterMode:()=>{console.log(e),t(!e)}})),r.createElement("div",{className:"Card"},r.createElement(l,{amount:"12",modifier:"green"})),r.createElement("div",{className:"RightCard"},r.createElement(l,{amount:"8"}))))}o.createRoot(document.querySelector("#app")).render(r.createElement(s,null))}},n={};function r(e){var o=n[e];if(void 0!==o)return o.exports;var c=n[e]={exports:{}};return t[e](c,c.exports,r),c.exports}r.m=t,e=[],r.O=(t,n,o,c)=>{if(!n){var a=1/0;for(u=0;u<e.length;u++){for(var[n,o,c]=e[u],i=!0,l=0;l<n.length;l++)(!1&c||a>=c)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(i=!1,c<a&&(a=c));if(i){e.splice(u--,1);var s=o();void 0!==s&&(t=s)}}return t}c=c||0;for(var u=e.length;u>0&&e[u-1][2]>c;u--)e[u]=e[u-1];e[u]=[n,o,c]},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={179:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var o,c,[a,i,l]=n,s=0;if(a.some((t=>0!==e[t]))){for(o in i)r.o(i,o)&&(r.m[o]=i[o]);if(l)var u=l(r)}for(t&&t(n);s<a.length;s++)c=a[s],r.o(e,c)&&e[c]&&e[c][0](),e[c]=0;return r.O(u)},n=self.webpackChunkvideo_player=self.webpackChunkvideo_player||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var o=r.O(void 0,[745],(()=>r(273)));o=r.O(o)})();
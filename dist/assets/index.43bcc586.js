import{j as w,r,l as T,M as A,a as R,u as k,B as $,R as B,b as S,c as O}from"./vendor.c3529adc.js";const G=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function t(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerpolicy&&(a.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?a.credentials="include":n.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=t(n);fetch(n.href,a)}};G();const e=w.exports.jsx,g=w.exports.jsxs,y=w.exports.Fragment,E=()=>g("div",{className:"lds-roller",children:[e("div",{}),e("div",{}),e("div",{}),e("div",{}),e("div",{}),e("div",{}),e("div",{}),e("div",{})]});const j=({setmodal:l,modal:o,setimage:t,image:s})=>{const[n,a]=r.exports.useState(!1),i=u=>{console.log(u),(u.target.className==="img-container"||u.target.nodeName==="BUTTON")&&(t(""),a(!1),l(!o))};return g("div",{className:"modal-image",onClick:i,style:{display:o?"block":"none"},children:[e("div",{className:"img-container",style:{display:n?"flex":"none"},children:g("div",{className:"img",children:[e("button",{onClick:i,children:"X"}),e("img",{src:s,onLoad:()=>a(!0)})]})}),n?e(y,{}):e(E,{})]})},I=({ref:l,distance:o="500px"})=>{const[t,s]=r.exports.useState(!1);return r.exports.useEffect(()=>{const n=i=>{i[0].isIntersecting?s(!0):s(!1)};new IntersectionObserver(n,{rootMargin:o}).observe(l.current)},[]),{nextShow:t,setnextShow:s}},H=({page:l})=>{const o="/api",[t,s]=r.exports.useState([]),n=10,[a,i]=r.exports.useState(null);return r.exports.useEffect(()=>{const u=new AbortController,d=u.signal;return window.fetch(o+`/posts/limit=${n}&skip=${n*(l-1)}`,{signal:d}).then(m=>m.json()).then(m=>s([...t,...m])).catch(m=>{m.name==="AbortError"?console.log("successfully aborted"):i(m)}),()=>u.abort()},[l]),{images:t}},P=()=>{const l={default:4,1100:3,700:2,500:1},[o,t]=r.exports.useState(!1),[s,n]=r.exports.useState(""),[a,i]=r.exports.useState(1),u=r.exports.useRef(),{images:d}=H({page:a}),{nextShow:m}=I({ref:u}),p=r.exports.useCallback(T(()=>{i(v=>v+1)},500),[]);r.exports.useEffect(()=>{m&&p()},[m,p]);const b=v=>{n(v.target.currentSrc),t(!o)},N=d.map(function(v){return g("div",{className:"img-item",children:[e("img",{src:v.imgSrc,alt:"Image",onClick:b}),e("div",{className:"tags-img",children:v.tags.map(c=>g("p",{children:["#",c," "]},c))})]},v.id)});return g(y,{children:[e(A,{breakpointCols:l,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column",children:N}),e("div",{id:"observe",children:e("p",{ref:u,children:"Whoops... That's it, dude."})}),e(j,{modal:o,setmodal:t,image:s,setimage:n})]})};const M=({settagsBtn:l})=>{const o="/api",[t,s]=r.exports.useState([]),[n,a]=r.exports.useState(null);return r.exports.useEffect(()=>{const i=new AbortController,u=i.signal;return window.fetch(o+"/tags/all",{signal:u}).then(d=>d.json()).then(d=>{const m=d.map(p=>p.tag);l(m)}).catch(d=>{d.name==="AbortError"?console.log("successfully aborted"):a(d)}),()=>i.abort()},[]),t},W=()=>{const[l,o]=r.exports.useState([]);M({settagsBtn:o});const[t,s]=r.exports.useState([]),[n,a]=r.exports.useState(!1),[i,u]=r.exports.useState(""),[d,m]=r.exports.useState(""),p=()=>{s([]),m(""),a(!1)},b=c=>{const h=c.target.innerHTML;if(t.includes(h)){const x=t.filter(f=>f!==h);s(x)}else s(x=>[...x,h])},N=async c=>{a(!0),c.preventDefault();const h={imgurl:d,tags:t,userId:"61e9c0bff06e4fa6550d2760",username:"Nazareno7870"};R.post({}.PATH+"/posts/createpost",h).then(x=>{p()})},v=c=>{if(c.key==="Enter"){const h=i.split(" ");for(let f=0;f<h.length;f++)h[f]=h[f].charAt(0).toUpperCase()+h[f].slice(1);const x=h.join(" ");if(o(f=>[...f,x]),t.includes(x)){const f=t.filter(L=>L!==x);s(f)}else s(f=>[...f,x]);u("")}};return g(y,{children:[e("div",{className:"tags",children:l.map(c=>e("button",{onClick:b,className:t.includes(c)?"active":"",children:c},c))}),e("input",{type:"text",id:"newTag",placeholder:"New Tag",value:i,onKeyPress:v,onChange:c=>u(c.target.value)}),g("form",{className:"form-new-post",onSubmit:N,children:[d!==""?e("img",{className:"new-image",src:d,alt:"imagen a enviar"}):e(y,{}),e("input",{type:"text",name:"url",id:"url",value:d,onChange:c=>m(c.target.value)}),e("button",{className:"btn-creatpost",children:"Submit"})]}),e("div",{className:"modal-image",style:{display:n?"block":"none"},children:e(E,{})})]})};const F=({showMenu:l,setshowMenu:o})=>{const t=r.exports.useRef(),s=k();return r.exports.useEffect(()=>{l?t.current.style.top="47px":t.current.style.top="-156px"},[l]),e("div",{ref:t,className:"menu",children:g("ul",{children:[e("li",{onClick:()=>{s("/gallery"),o(!t)},children:"Latest"}),e("li",{onClick:()=>{s("/createpost"),o(!t)},children:"Create Post"}),e("li",{onClick:()=>{s("/tag"),o(!t)},children:"Tags"})]})})};const _=()=>{const[l,o]=r.exports.useState(!1),t=k();return g(y,{children:[g("div",{className:"navbar",children:[e("div",{className:"logo",children:e("a",{href:"#",onClick:()=>t("/"),children:e("img",{src:"imgs/assets/logo.svg",alt:"Logo ImgWide"})})}),e("div",{className:"menu-desk",children:g("ul",{children:[e("li",{onClick:()=>{t("/gallery")},children:"Latest"}),e("li",{onClick:()=>{t("/createpost")},children:"Create Post"}),e("li",{onClick:()=>{t("/tag")},children:"Tags"})]})}),e("div",{className:"icon-menu",onClick:()=>o(!l),children:e("img",{src:"imgs/assets/menu-icon.svg",alt:"Menu ImgWide"})})]}),e(F,{showMenu:l,setshowMenu:o})]})},C=({children:l})=>g(y,{children:[e(_,{}),e("div",{className:"container",children:l})]});const D=({page:l,TagRef:o})=>{const t="/api",[s,n]=r.exports.useState([]),a=10,[i,u]=r.exports.useState(null);return r.exports.useEffect(()=>{const d=new AbortController,m=d.signal;return window.fetch(t+`/tags/tag/${o}&limit=${a}&skip=${a*(l-1)}`,{signal:m}).then(p=>p.json()).then(p=>n([...s,...p])).catch(p=>{p.name==="AbortError"?console.log("successfully aborted"):u(p)}),()=>d.abort()},[l]),{images:s}},K=()=>{const l=window.location.pathname.slice(5),o={default:4,1100:3,700:2,500:1},[t,s]=r.exports.useState(!1),[n,a]=r.exports.useState(""),[i,u]=r.exports.useState(1),d=r.exports.useRef(),{images:m}=D({page:i,TagRef:l}),{nextShow:p}=I({ref:d}),b=r.exports.useCallback(T(()=>{u(c=>c+1)},500),[]);r.exports.useEffect(()=>{p&&b()},[p,b]);const N=c=>{a(c.target.currentSrc),s(!t)},v=m.map(function(c){return g("div",{className:"img-item",children:[e("img",{src:c.imgSrc,alt:"Image",onClick:N}),e("div",{className:"tags-img",children:c.tags.map(h=>g("p",{children:["#",h," "]},h))})]},c.id)});return g(y,{children:[e(A,{breakpointCols:o,className:"my-masonry-grid",columnClassName:"my-masonry-grid_column",children:v}),e("div",{id:"observe",children:e("p",{ref:d,children:"Whoops... That's it, dude."})}),e(j,{modal:t,setmodal:s,image:n,setimage:a})]})},U=()=>{const[l,o]=r.exports.useState([]);M({settagsBtn:o});const t=k();return e("div",{className:"tags",children:l.map(s=>e("button",{onClick:()=>t(s),children:s},s))})};function q(){return e(y,{children:e($,{children:g(B,{children:[e(S,{exact:!0,path:"/gallery",element:e(C,{children:e(P,{})})}),e(S,{exact:!0,path:"/",element:e(C,{children:e(P,{})})}),e(S,{exact:!0,path:"/tag",element:e(C,{children:e(U,{})})}),e(S,{exact:!0,path:"/tag/*",element:e(C,{children:e(K,{})})}),e(S,{exact:!0,path:"/createpost",element:e(C,{children:e(W,{})})})]})})})}O.render(e(q,{}),document.getElementById("root"));

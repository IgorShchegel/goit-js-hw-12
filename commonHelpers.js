import{a as M,S as B,i as h}from"./assets/vendor-5401a4b0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=a(r);fetch(r.href,o)}})();const u=document.querySelector(".search-form"),E=document.querySelector(".search-input"),y=document.querySelector(".gallery"),n=document.querySelector(".button-more"),m=document.querySelector(".loader"),g="is-hidden";let l="",i=1,p=0;const P=40;d();u.addEventListener("submit",async t=>{t.preventDefault(),l=E.value,y.innerHTML="",i=1,v();try{const{hits:e,totalHits:a}=await w(l);p=Math.ceil(a/P),L(e),e.length>0&&e.length!==a?(C(),n.addEventListener("click",b)):f()}catch{S()}finally{d()}});async function w(t){const e="41984486-af85e40ac9c664bf86aaf37aa",a="https://pixabay.com/api/?";try{const s=await M.get(a,{params:{key:e,q:t,image_type:"photo",orientation:"horizontal",page:i,per_page:40,safesearch:!0}});if(s.data.hits.length===0)throw u.reset(),f(),new Error("Sorry, there are no images matching your search query. Please try again!");return s.data}catch(s){throw new Error(s)}}const $=new B(".gallery a",{captionsData:"alt",captionDelay:250});function L(t){y.insertAdjacentHTML("beforeend",x(t)),$.refresh(),u.reset(),q()}function x(t){return t.map(e=>`<li class="card">
         <a class="gallery-link" href="${e.largeImageURL}">
           <img
               class="gallery-image"
               src="${e.webformatURL}"
               alt="${e.tags}"
            />
            <ul class="info">
            <li class="info-items">Likes: ${e.likes}</li>
            <li class="info-items">Views: ${e.views}</li>
            <li class="info-items">Comments: ${e.comments}</li>
            <li class="info-items">Downloads: ${e.downloads}</li>
            </ul>
         </a> 
        </li>   
  `).join("")}async function b(){i+=1,H(),v();try{const{hits:t}=await w(l);L(t)}catch{S()}finally{O(),d(),I(),i===p&&(h.info({title:"",message:"We are sorry, but you have reached the end of search results.",position:"topRight"}),f(),n.removeEventListener("click",b))}}function S(t){h.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}function v(){m.style.display="block"}function d(){m.style.display="none"}function f(){n.classList.add(g)}function C(){n.classList.remove(g)}function O(){n.disabled=!1}function H(){n.disabled=!0}function q(){return document.querySelector(".card").getBoundingClientRect().height}function I(){const t=q();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map

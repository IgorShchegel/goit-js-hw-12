import{S as u,i as f}from"./assets/vendor-5b791d57.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const m=document.querySelector(".search-form"),h=document.querySelector(".search-input"),a=document.querySelector(".gallery"),c=document.querySelector(".loader");l();m.addEventListener("submit",s=>{s.preventDefault();const t=s.currentTarget,i=h.value;a.innerHTML="",w(),d(i).then(n=>{p(n),l()}).catch(n=>{L(n),l()}).finally(()=>t.reset())});function d(s){return new Promise((t,i)=>{const n="41984486-af85e40ac9c664bf86aaf37aa",r=`https://pixabay.com/api/?${new URLSearchParams({key:n,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0})}`;fetch(r).then(o=>{if(!o.ok)throw new Error(o.statusText);return o.json()}).then(o=>{o.hits.length===0?i("Sorry, there are no images matching your search query. Please try again!"):t(o.hits)}).catch(o=>i(o))})}const y=new u(".gallery a",{captionsData:"alt",captionDelay:250});function p(s){a.innerHTML="",a.innerHTML=g(s),y.refresh()}function g(s){return s.map(t=>`<li>
         <a class="gallery-link" href="${t.largeImageURL}">
           <img
               class="gallery-image"
               src="${t.webformatURL}"
               alt="${t.tags}"
            />
            <ul class="info">
            <li class="info-items">Likes: ${t.likes}</li>
            <li class="info-items">Views: ${t.views}</li>
            <li class="info-items">Comments: ${t.comments}</li>
            <li class="info-items">Downloads: ${t.downloads}</li>
            </ul>
         </a> 
        </li>   
  `).join("")}function L(s){f.error({title:"Error",message:s,position:"topRight"})}function w(){c.style.display="block"}function l(){c.style.display="none"}
//# sourceMappingURL=commonHelpers.js.map

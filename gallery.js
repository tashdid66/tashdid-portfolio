const moments=[...document.querySelectorAll('.moment')];
const dialog=document.getElementById('photo-dialog');
let activeIndex=0, opener=null;
const visibleMoments=()=>moments.filter(m=>!m.hidden);
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));moments.forEach(m=>m.hidden=button.dataset.filter!=='All'&&m.dataset.category!==button.dataset.filter);const count=visibleMoments().length;document.querySelector('.gallery-count').textContent=count+' moment'+(count===1?'':'s');}));
function showPhoto(index){const visible=visibleMoments();activeIndex=(index+visible.length)%visible.length;const moment=visible[activeIndex];const button=moment.querySelector('button');const img=moment.querySelector('img');document.getElementById('viewer-image').src=img.src;document.getElementById('viewer-image').alt=img.alt;document.getElementById('photo-title').textContent=moment.querySelector('h3').textContent;document.getElementById('photo-caption').textContent=button.dataset.caption;document.getElementById('photo-index').textContent=(activeIndex+1)+' / '+visible.length;}
moments.forEach(moment=>moment.querySelector('button').addEventListener('click',event=>{opener=event.currentTarget;showPhoto(visibleMoments().indexOf(moment));dialog.showModal();document.body.style.overflow='hidden';}));
document.querySelector('.viewer-close').addEventListener('click',()=>dialog.close());
document.querySelector('.viewer-prev').addEventListener('click',()=>showPhoto(activeIndex-1));
document.querySelector('.viewer-next').addEventListener('click',()=>showPhoto(activeIndex+1));
dialog.addEventListener('close',()=>{document.body.style.overflow='';opener?.focus();});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.addEventListener('keydown',e=>{if(dialog.open){if(e.key==='ArrowRight'){e.preventDefault();showPhoto(activeIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(activeIndex-1);}}});

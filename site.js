'use strict';
const APEX = Object.freeze({whatsapp:'5516992269788',message:'Olá! Gostaria de conversar sobre um diagnóstico de IA para minha empresa.'});
const contactURL = `https://wa.me/${APEX.whatsapp}?text=${encodeURIComponent(APEX.message)}`;
document.querySelectorAll('[data-contact]').forEach(link => { link.href = contactURL; });
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu(restoreFocus=false){toggle.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');document.body.classList.remove('menu-open');if(restoreFocus)toggle.focus();}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);document.body.classList.toggle('menu-open',open);});
navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{if(toggle.getAttribute('aria-expanded')==='true'&&!event.target.closest('.header'))closeMenu();});
matchMedia('(min-width: 601px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
document.getElementById('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const elements=[...document.querySelectorAll('.reveal')];document.documentElement.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});},{threshold:0.06});elements.forEach(el=>observer.observe(el));}

const progress=document.querySelector('.reading-progress');
let scrollFrame=false;
function updateReadingProgress(){const range=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${range>0?scrollY/range:0})`;scrollFrame=false;}
addEventListener('scroll',()=>{if(!scrollFrame){scrollFrame=true;requestAnimationFrame(updateReadingProgress);}},{passive:true});
addEventListener('resize',updateReadingProgress);updateReadingProgress();

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

const demoScenarios = {
 validation:{scenario:'Um certificado chega. A equipe precisa saber o que conferir.',input:'Certificado de treinamento.pdf',detail:'Texto extraído · cadastro do trabalhador · checklist',steps:['Identificar tipo e campos do documento','Comparar informações com o cadastro','Sinalizar pendências para a equipe'],title:'Uma pendência, com contexto.',result:'A data do treinamento não foi localizada. A IA destaca a informação ausente para a equipe conferir o original.',handoff:'Próximo passo: conferência humana',benefit:'Menos conferência repetitiva. Mais atenção ao que precisa de decisão.'},
 generation:{scenario:'Dados da operação viram um documento estruturado para revisão.',input:'Inventário de riscos + contexto da operação',detail:'Informações fornecidas pela equipe · estrutura do PGR',steps:['Organizar os dados e o contexto recebido','Estruturar uma minuta de documento','Revisar coerência e apontar lacunas'],title:'Uma minuta. Um ponto a resolver.',result:'O rascunho foi estruturado. A revisão assistida sinaliza uma medida sem responsável definido, antes da aprovação pelo profissional responsável.',handoff:'Próximo passo: revisão técnica e aprovação',benefit:'Menos tempo no primeiro rascunho. Mais foco na qualidade técnica.'},
 audit:{scenario:'Registros de uma inspeção se transformam em próximos passos.',input:'Checklist + anotações da inspeção',detail:'Exemplo: material obstruindo uma passagem',steps:['Organizar as evidências da inspeção','Relacionar observações aos itens do checklist','Sugerir ações para avaliação da equipe'],title:'Da observação à ação sugerida.',result:'A observação foi ligada ao item de circulação. Sugestão para revisão: liberar a passagem, definir responsável e anexar evidência da correção.',handoff:'Próximo passo: auditor confirma o achado',benefit:'Menos esforço para organizar registros. Mais clareza para agir.'},
 process:{scenario:'Uma pendência encontra responsável, prazo e acompanhamento.',input:'Pendência documental identificada',detail:'Documento com informação ausente · equipe responsável',steps:['Classificar a pendência com apoio de IA','Encaminhar pela regra definida da operação','Acompanhar a tarefa até a conferência'],title:'Um fluxo que continua.',result:'A pendência gera uma tarefa para a equipe responsável. Após o reenvio, o documento volta à conferência e o histórico fica organizado.',handoff:'Próximo passo: equipe resolve e confirma',benefit:'Menos tarefas perdidas. Mais continuidade e visibilidade.'}
};
const demo=document.querySelector('.demo');
const demoTabs=[...document.querySelectorAll('[data-demo]')];
const demoRun=document.getElementById('demo-run');
const demoStatus=document.getElementById('demo-status');
let selectedDemo='validation',demoRunId=0;
function setDemo(key){
 demoRunId++; selectedDemo=key;
 const data=demoScenarios[key];
 demo.classList.remove('is-running');demoRun.disabled=false;demoRun.innerHTML='Ver análise em ação <span aria-hidden="true">↗</span>';
 demoTabs.forEach(tab=>{const active=tab.dataset.demo===key;tab.setAttribute('aria-selected',String(active));tab.tabIndex=active?0:-1;});
 document.getElementById('demo-panel').setAttribute('aria-labelledby','tab-'+key);
 for(const [id,value] of Object.entries({'demo-scenario':data.scenario,'demo-input-title':data.input,'demo-input-detail':data.detail,'demo-result-title':data.title,'demo-result-detail':data.result,'demo-handoff':data.handoff,'demo-benefit':data.benefit})){document.getElementById(id).textContent=value;}
 document.querySelectorAll('[data-step-label]').forEach((el,i)=>{el.textContent=data.steps[i];el.closest('li').classList.remove('is-current','is-done');});
 const result=document.getElementById('demo-result');result.hidden=false;result.classList.remove('result-enter');demoStatus.textContent='Exemplo de resultado';
}
demoTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>setDemo(tab.dataset.demo));
 tab.addEventListener('keydown',event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%demoTabs.length;else if(event.key==='ArrowLeft')next=(index+demoTabs.length-1)%demoTabs.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=demoTabs.length-1;else return;event.preventDefault();demoTabs[next].focus();setDemo(demoTabs[next].dataset.demo);});
});
demoRun.hidden=false;
demoRun.addEventListener('click',async()=>{
 const run=++demoRunId;
 const rows=[...demo.querySelectorAll('.demo-checks li')];
 const result=document.getElementById('demo-result');
 result.classList.remove('result-enter');demo.classList.add('is-running');demoRun.disabled=true;
 rows.forEach(row=>row.classList.remove('is-current','is-done'));
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 for(let i=0;i<rows.length;i++){
  if(run!==demoRunId)return;
  rows[i].classList.add('is-current');demoStatus.textContent=`Etapa ${i+1} de 3: ${demoScenarios[selectedDemo].steps[i]}`;
  await new Promise(resolve=>setTimeout(resolve,reduced?80:900));
  if(run!==demoRunId)return;
  rows[i].classList.remove('is-current');rows[i].classList.add('is-done');
 }
 demo.classList.remove('is-running');result.classList.add('result-enter');demoRun.disabled=false;demoRun.innerHTML='Rever demonstração <span aria-hidden="true">↻</span>';demoStatus.textContent='Exemplo concluído. Resultado disponível para revisão.';
});
const progress=document.querySelector('.reading-progress');
let scrollFrame=false;
function updateReadingProgress(){const range=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${range>0?scrollY/range:0})`;scrollFrame=false;}
addEventListener('scroll',()=>{if(!scrollFrame){scrollFrame=true;requestAnimationFrame(updateReadingProgress);}},{passive:true});
addEventListener('resize',updateReadingProgress);updateReadingProgress();

const resources=[
 {title:'Client Assistance Desk',desc:'Access the Client Assistance Desk folder and related documents.',icon:'🗂️',url:'https://drive.google.com/drive/folders/1KX__E8tK6Xc5wEn5qzU1igj3VXD_A1ab?usp=drive_link',tag:'assistance desk client help folder'},
 {title:'CAD Schedule',desc:'Open the shared schedule for Client Assistance Desk activities.',icon:'🗓️',url:'https://docs.google.com/spreadsheets/d/1tUbzazPveQHGINbiP9PRnUZu6zfNzqXeHpCoz5wf2vI/edit?usp=sharing',tag:'calendar schedule spreadsheet'},
 {title:'Case Folder Tracking',desc:'Quick access to the shared case folder tracking workspace.',icon:'📁',url:'https://drive.google.com/drive/folders/1_kDXHCu05k4kciYxljo-4oQ8Flb1sJ2X?usp=sharing',tag:'case folder tracking records'},
 {title:'Cash Card Spotcheck',desc:'Open the shared cash card spotcheck resource folder.',icon:'💳',url:'https://drive.google.com/drive/folders/12Q5uizKKqRHzCP_XE6DrLIDZnZBV3PJ7?usp=sharing',tag:'cash card spot check financial'},
 {title:'ADN COMPASS',desc:'Visit the ADN COMPASS site for your reference and navigation needs.',icon:'🧭',url:'https://sites.google.com/dswd.gov.ph/adncompass/home?authuser=0',tag:'compass website site'},
 {title:'BINI',desc:'Open the BINI site for quick reference.',icon:'🌐',url:'https://sites.google.com/view/adncbdo-bini/home?authuser=0',tag:'bini website site'}
];
const grid=document.getElementById('resourceGrid'),gridAll=document.getElementById('resourceGridAll');
function card(r){return `<article class="resource-card"><div class="resource-top"><div class="resource-icon">${r.icon}</div><span class="resource-arrow">↗</span></div><h3>${r.title}</h3><p>${r.desc}</p><a class="open-link" href="${r.url}" target="_blank" rel="noopener noreferrer">Open resource <span>→</span></a></article>`}
function render(target,list){target.innerHTML=list.map(card).join('')}
render(grid,resources);render(gridAll,resources);
function filter(input,target,empty){const q=input.value.toLowerCase().trim();const list=resources.filter(r=>(r.title+' '+r.desc+' '+r.tag).toLowerCase().includes(q));render(target,list);empty.hidden=list.length>0;empty.style.display=list.length?'none':'block'}
document.getElementById('searchInput').addEventListener('input',e=>filter(e.target,grid,document.getElementById('emptyState')));
document.getElementById('resourceSearch').addEventListener('input',e=>filter(e.target,gridAll,document.getElementById('emptyAll')));
const views={home:document.getElementById('homeView'),resources:document.getElementById('resourcesView'),about:document.getElementById('aboutView')};
function navigate(view){Object.entries(views).forEach(([k,v])=>v.hidden=k!==view);document.querySelectorAll('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));document.getElementById('pageTitle').textContent=view==='home'?'Dashboard':view==='resources'?'Resource Links':'About';document.getElementById('sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'})}
document.querySelectorAll('.nav-item').forEach(b=>b.addEventListener('click',()=>navigate(b.dataset.view)));
document.getElementById('browseBtn').addEventListener('click',()=>{document.getElementById('resourceGrid').scrollIntoView({behavior:'smooth',block:'start'});toast('Browse the resource cards below.')});
document.getElementById('showAllBtn').addEventListener('click',()=>navigate('resources'));
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));
document.getElementById('themeToggle').addEventListener('click',()=>{document.body.classList.toggle('dark');toast(document.body.classList.contains('dark')?'Dark mode enabled':'Light mode enabled')});
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove('show'),2300)}
const now=new Date();document.getElementById('dateDisplay').textContent=now.toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric',year:'numeric'});document.getElementById('year').textContent=now.getFullYear();
// Close the mobile sidebar when clicking outside it
window.addEventListener('click',e=>{const s=document.getElementById('sidebar');if(s.classList.contains('open')&&!s.contains(e.target)&&e.target!==document.getElementById('menuToggle'))s.classList.remove('open')});

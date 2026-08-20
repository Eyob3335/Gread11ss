/* =========================================================================
   APP.JS — Habesha Learn
   Vanilla JS SPA. No build step, no external network calls at runtime —
   everything (fonts, icons, sound) is generated or system-native so the
   app works fully offline once installed.
   ========================================================================= */

/* ---------------------------- STATE ---------------------------- */
const STORAGE_KEY = 'habeshaLearnState_v1';

function todayStr(){ return new Date().toISOString().slice(0,10); }

function defaultState(){
  return {
    xp: 0,
    gems: 20,
    hearts: 5,
    heartsMax: 5,
    streak: 0,
    lastActiveDate: null,
    completed: {},        // lessonId -> stars (1-3)
    onboarded: false,
    dailyGoalXp: 30,
    todayXp: 0,
    todayDate: todayStr(),
    badges: [],            // list of badge ids earned
  };
}

let state = loadState();

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return Object.assign(defaultState(), parsed);
  }catch(e){ return defaultState(); }
}
function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function ensureDailyRollover(){
  const t = todayStr();
  if(state.todayDate !== t){
    // check if yesterday was active to keep/break streak
    const y = new Date(); y.setDate(y.getDate()-1);
    const yStr = y.toISOString().slice(0,10);
    if(state.lastActiveDate !== yStr && state.lastActiveDate !== t){
      state.streak = 0; // missed a day
    }
    state.todayDate = t;
    state.todayXp = 0;
    // refill hearts each new day
    state.hearts = state.heartsMax;
    saveState();
  }
}

/* ---------------------------- SOUND (WebAudio synth, no files needed) ---------------------------- */
const SFX = (function(){
  let ctx;
  function getCtx(){
    if(!ctx){ try{ ctx = new (window.AudioContext||window.webkitAudioContext)(); }catch(e){} }
    return ctx;
  }
  function tone(freq, dur, type='sine', vol=0.18, delay=0){
    const c = getCtx(); if(!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0+0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0+dur);
    osc.connect(gain); gain.connect(c.destination);
    osc.start(t0); osc.stop(t0+dur+0.02);
  }
  return {
    correct(){ tone(660,0.14,'sine',0.16); tone(880,0.18,'sine',0.16,0.09); },
    incorrect(){ tone(180,0.28,'sawtooth',0.12); },
    tap(){ tone(500,0.06,'square',0.05); },
    win(){ [523,659,784,1046].forEach((f,i)=>tone(f,0.22,'triangle',0.15,i*0.09)); },
    lesson_start(){ tone(392,0.12,'sine',0.1); tone(523,0.14,'sine',0.1,0.08); },
  };
})();

/* ---------------------------- ICONS ---------------------------- */
const ICONS = {
  coin: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="currentColor" opacity=".25"/><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M12 7v10M9.5 9.2c0-1.2 1.1-1.7 2.5-1.7s2.5.6 2.5 1.6c0 2.2-5 1-5 3.3 0 1 1.1 1.6 2.5 1.6s2.5-.5 2.5-1.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  chip: `<svg viewBox="0 0 24 24" fill="none"><rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="2"/><rect x="9" y="9" width="6" height="6" fill="currentColor"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" stroke="currentColor" stroke-width="1.6"/></svg>`,
  scroll: `<svg viewBox="0 0 24 24" fill="none"><path d="M6 4h12v13a3 3 0 01-3 3H6a2 2 0 01-2-2V6a2 2 0 012-2z" fill="currentColor" opacity=".25" stroke="currentColor" stroke-width="2"/><path d="M9 9h6M9 13h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M18 17a2 2 0 002 2 2 2 0 002-2V6h-4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.7-5.4 4.7 1.6 7-6.2-3.8L5.8 21l1.6-7L2 9.3l7.1-.7z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5 11-11" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" fill="none"><rect x="5" y="10" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" stroke-width="2"/></svg>`,
  flag: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 3v18M5 4h13l-3 4 3 4H5" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
};

function mascotSVG(mood='idle'){
  // Kaldi — a small Ethiopian-wolf-inspired mascot, pure inline SVG (offline-safe, no image assets)
  return `
  <svg class="mascot ${mood}" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="100" rx="30" ry="7" fill="#3B2416" opacity="0.12"/>
    <g class="mtail">
      <path d="M84 78 C104 70 108 50 96 40" fill="none" stroke="#C8862A" stroke-width="10" stroke-linecap="round"/>
      <path d="M96 40 c4 -4 10 -4 12 2 c1 5 -3 9 -8 8" fill="#FBF3E7"/>
    </g>
    <path d="M35 55 C30 30 46 15 60 15 C74 15 90 30 85 55 C90 65 88 82 76 90 C68 96 52 96 44 90 C32 82 30 65 35 55 Z" fill="#D9A441"/>
    <path d="M40 52 C37 34 48 22 60 22 C72 22 83 34 80 52 C83 60 80 74 70 80 L50 80 C40 74 37 60 40 52 Z" fill="#FBF3E7"/>
    <path d="M34 20 L44 40 L28 38 Z" fill="#C8862A"/>
    <path d="M86 20 L76 40 L92 38 Z" fill="#C8862A"/>
    <path d="M37 24 L43 37 L31 36 Z" fill="#FBF3E7"/>
    <path d="M83 24 L77 37 L89 36 Z" fill="#FBF3E7"/>
    ${mood==='sad' ? `
      <path d="M46 58 q4 -5 8 0" stroke="#3B2416" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M66 58 q4 -5 8 0" stroke="#3B2416" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M50 76 q10 -8 20 0" stroke="#3B2416" stroke-width="3" fill="none" stroke-linecap="round"/>
    ` : `
      <circle cx="50" cy="56" r="4.2" fill="#3B2416"/>
      <circle cx="70" cy="56" r="4.2" fill="#3B2416"/>
      <circle cx="51.3" cy="54.5" r="1.3" fill="#fff"/>
      <circle cx="71.3" cy="54.5" r="1.3" fill="#fff"/>
      <path d="M50 70 q10 10 20 0" stroke="#3B2416" stroke-width="3" fill="none" stroke-linecap="round"/>
    `}
    <ellipse cx="60" cy="65" rx="5" ry="3.4" fill="#3B2416"/>
    <path d="M52 42 q8 -6 16 0" stroke="#3B2416" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.35"/>
  </svg>`;
}

/* ---------------------------- FX: confetti + flying XP ---------------------------- */
const fxLayer = document.getElementById('fxLayer');
const CONFETTI_COLORS = ['#F0A93E','#279A63','#C8862A','#D64545','#2E86AB','#FBF3E7'];

function burstConfetti(count=42){
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className='confetti';
    const x = Math.random()*100;
    el.style.left = x+'vw';
    el.style.background = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
    el.style.animationDelay = (Math.random()*0.3)+'s';
    el.style.animationDuration = (1.2+Math.random()*0.9)+'s';
    el.style.borderRadius = Math.random()>0.5 ? '50%' : '2px';
    el.style.transform = `rotate(${Math.random()*360}deg)`;
    fxLayer.appendChild(el);
    setTimeout(()=>el.remove(), 2400);
  }
}

function flyXP(fromEl, amount){
  const rect = fromEl.getBoundingClientRect();
  const el = document.createElement('div');
  el.className='flyxp';
  el.textContent = '+'+amount+' XP';
  el.style.left = (rect.left + rect.width/2 - 20) + 'px';
  el.style.top = (rect.top) + 'px';
  document.body.appendChild(el);
  setTimeout(()=>el.remove(), 1000);
}

function pulseStat(id){
  const el = document.getElementById(id);
  if(!el) return;
  const parent = el.closest('.stat');
  parent && parent.classList.remove('pulse');
  void parent.offsetWidth;
  parent && parent.classList.add('pulse');
}

/* ---------------------------- TOP BAR / NAV RENDER ---------------------------- */
const topbar = document.getElementById('topbar');
const bottomnav = document.getElementById('bottomnav');
const btnBack = document.getElementById('btnBack');

function refreshChrome(){
  document.getElementById('statStreak').textContent = state.streak;
  document.getElementById('statGems').textContent = state.gems;
  document.getElementById('statHearts').textContent = state.hearts;
  document.getElementById('statXp').textContent = state.xp;
}

bottomnav.querySelectorAll('.navbtn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    SFX.tap();
    bottomnav.querySelectorAll('.navbtn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const tab = btn.dataset.tab;
    if(tab==='home') renderHome();
    if(tab==='quests') renderQuests();
    if(tab==='profile') renderProfile();
  });
});

function setActiveTab(tab){
  bottomnav.querySelectorAll('.navbtn').forEach(b=>b.classList.toggle('active', b.dataset.tab===tab));
}

/* ---------------------------- ROUTER ---------------------------- */
const appEl = document.getElementById('app');
let currentBackHandler = null;

function showChrome(showBack){
  topbar.classList.remove('hidden');
  bottomnav.classList.remove('hidden');
  btnBack.classList.toggle('hidden', !showBack);
}
function hideChrome(){
  topbar.classList.add('hidden');
  bottomnav.classList.add('hidden');
}

btnBack.addEventListener('click', ()=>{ SFX.tap(); if(currentBackHandler) currentBackHandler(); });

/* ---------------------------- ONBOARDING ---------------------------- */
function renderOnboarding(){
  hideChrome();
  appEl.innerHTML = `
    <div class="onboard">
      <div class="mascot-hero bounce-in">${mascotSVG('idle')}</div>
      <h1 class="display">Meet Kaldi 🐾</h1>
      <p>Your guide through Grade&nbsp;11 — Economics, IT, Geography &amp; History. Learn offline, earn XP, keep your streak alive.</p>
      <button class="btn wide gold" id="onboardStart">Let's go</button>
    </div>
  `;
  document.getElementById('onboardStart').addEventListener('click', ()=>{
    SFX.win();
    state.onboarded = true; state.lastActiveDate = todayStr(); saveState();
    renderHome();
  });
}

/* ---------------------------- HOME ---------------------------- */
function subjectProgress(subKey){
  const sub = CURRICULUM[subKey];
  let total=0, done=0;
  sub.units.forEach(u=>u.lessons.forEach(l=>{ total++; if(state.completed[l.id]!=null) done++; }));
  return total? Math.round(done/total*100) : 0;
}

function renderHome(){
  showChrome(false);
  setActiveTab('home');
  refreshChrome();
  currentBackHandler = null;

  const cards = Object.keys(CURRICULUM).map(key=>{
    const sub = CURRICULUM[key];
    const pct = subjectProgress(key);
    return `
      <button class="subject-card" style="background:linear-gradient(150deg, ${sub.color}, ${sub.colorDark})" data-sub="${key}">
        <div class="icon-wrap">${ICONS[sub.icon]}</div>
        <div>
          <h3>${sub.name}</h3>
          <p>${sub.tagline}</p>
        </div>
        <div class="progress-pill"><i style="width:${pct}%"></i></div>
      </button>
    `;
  }).join('');

  appEl.innerHTML = `
    <div class="screen">
      <div class="hero">
        <div class="hero-row">
          <div class="hero-mascot">${mascotSVG(state.hearts>0?'idle':'sad')}</div>
          <div>
            <h1>${greeting()}</h1>
            <p>${state.streak>0 ? `${state.streak}-day streak — keep it going!` : `Start a lesson to begin your streak.`}</p>
          </div>
        </div>
      </div>
      <div class="section-label">Your subjects</div>
      <div class="subject-grid">${cards}</div>
    </div>
  `;

  appEl.querySelectorAll('.subject-card').forEach(card=>{
    card.addEventListener('click', ()=>{ SFX.tap(); renderPath(card.dataset.sub); });
  });
}

function greeting(){
  const h = new Date().getHours();
  if(h<5) return "Working late? 🌙";
  if(h<12) return "Good morning!";
  if(h<17) return "Good afternoon!";
  return "Good evening!";
}

/* ---------------------------- SKILL PATH ---------------------------- */
function isLessonUnlocked(sub, lesson){
  // First lesson of the whole subject is always unlocked; otherwise the
  // previous lesson (in flattened order) must be completed.
  const flat = [];
  sub.units.forEach(u=>u.lessons.forEach(l=>flat.push(l)));
  const idx = flat.findIndex(l=>l.id===lesson.id);
  if(idx<=0) return true;
  const prev = flat[idx-1];
  return state.completed[prev.id]!=null;
}

function renderPath(subKey){
  const sub = CURRICULUM[subKey];
  showChrome(true);
  currentBackHandler = renderHome;

  let html = `
    <div class="screen">
      <div class="path-header">
        <div style="width:70px;height:70px;margin:0 auto 6px;">${mascotSVG('idle')}</div>
        <h2 class="display">${sub.name}</h2>
        <p>${sub.tagline}</p>
      </div>
  `;

  sub.units.forEach((unit, ui)=>{
    html += `<div class="unit-block">
      <div class="unit-title-card" style="background:linear-gradient(120deg, ${sub.color}, ${sub.colorDark})">
        UNIT ${ui+1}: ${unit.title.toUpperCase()}
        <small>${unit.lessons.length ? unit.lessons.length+' lessons' : 'Coming soon'}</small>
      </div>`;

    if(unit.lessons.length===0){
      html += `<div class="coming-soon-card">${ICONS.lock}<div style="margin-top:6px;">More lessons for this unit are on the way.</div></div>`;
    } else {
      html += `<div class="path">`;
      unit.lessons.forEach((lesson, li)=>{
        const unlocked = isLessonUnlocked(sub, lesson);
        const stars = state.completed[lesson.id];
        const isNextUp = unlocked && stars==null;
        const offsetClass = li%3===1 ? 'off-l' : (li%3===2 ? 'off-r' : '');
        html += `<div class="node-row ${offsetClass}">
          <button class="node ${unlocked? '' : 'locked'} ${isNextUp?'current':''}"
                  style="${unlocked? `background:linear-gradient(150deg, ${sub.color}, ${sub.colorDark})` : ''}"
                  data-lesson="${lesson.id}" ${unlocked?'':'disabled'}>
            ${unlocked ? (stars!=null ? ICONS.check : ICONS.flag) : ICONS.lock}
            ${stars!=null ? `<div class="stars">${'★'.repeat(stars)}${'☆'.repeat(3-stars)}</div>` : ''}
          </button>
        </div>`;
      });
      html += `</div>`;
    }
    html += `</div>`;
  });

  html += `</div>`;
  appEl.innerHTML = html;

  appEl.querySelectorAll('.node[data-lesson]:not([disabled])').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      SFX.tap();
      const lessonId = btn.dataset.lesson;
      startLesson(subKey, lessonId);
    });
  });
}

/* ---------------------------- LESSON ENGINE ---------------------------- */
let lessonCtx = null;

function findLesson(subKey, lessonId){
  const sub = CURRICULUM[subKey];
  for(const unit of sub.units){
    for(const lesson of unit.lessons){
      if(lesson.id===lessonId) return lesson;
    }
  }
  return null;
}

function startLesson(subKey, lessonId){
  ensureDailyRollover();
  if(state.hearts<=0){ showOutOfHearts(); return; }
  const sub = CURRICULUM[subKey];
  const lesson = findLesson(subKey, lessonId);
  lessonCtx = {
    subKey, sub, lesson,
    order: shuffle([...lesson.questions.keys()]),
    idx: 0,
    correctCount: 0,
    mistakes: 0,
    answered: false,
  };
  SFX.lesson_start();
  hideChrome();
  renderQuestion();
}

function shuffle(arr){
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; }
  return a;
}

function renderQuestion(){
  const { sub, lesson, order, idx } = lessonCtx;
  if(idx >= order.length){ finishLesson(); return; }
  const q = lesson.questions[order[idx]];
  lessonCtx.answered = false;

  const heartsHtml = Array.from({length: state.heartsMax}).map((_,i)=>
    `<span class="${i < state.hearts ? '' : 'lost'}">❤️</span>`).join('');

  let bodyHtml = '';
  const typeLabel = q.type==='mcq' ? 'Choose the right answer' : q.type==='tf' ? 'True or false?' : 'Fill in the blank';

  if(q.type==='mcq'){
    bodyHtml = `<div class="options">${q.options.map((opt,i)=>
      `<button class="option" data-i="${i}">${opt}</button>`).join('')}</div>`;
  } else if(q.type==='tf'){
    bodyHtml = `<div class="tf-row">
      <button class="option" data-v="true">True</button>
      <button class="option" data-v="false">False</button>
    </div>`;
  } else if(q.type==='fill'){
    bodyHtml = `<div class="fill-row">
      <input class="fill-input" id="fillInput" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer">
      ${q.hint ? `<div class="fill-hint">💡 ${q.hint}</div>` : ''}
    </div>`;
  }

  appEl.innerHTML = `
    <div class="screen" style="padding-bottom:90px;">
      <div class="lesson-progress-wrap">
        <button class="icon-btn" id="lessonQuit" aria-label="Quit">
          <svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg>
        </button>
        <div class="lesson-progress"><i style="width:${Math.round(idx/order.length*100)}%"></i></div>
        <div class="lesson-hearts">${heartsHtml}</div>
      </div>
      <div class="qcard">
        <div class="qtype">${typeLabel}</div>
        <h2>${q.q}</h2>
        ${bodyHtml}
        <div class="explain-box" id="explainBox"></div>
      </div>
    </div>
    <div class="footer-bar" id="footerBar">
      <div class="footer-inner">
        <button class="btn wide disabled" id="checkBtn">Check</button>
      </div>
    </div>
  `;

  document.getElementById('lessonQuit').addEventListener('click', ()=>confirmQuitLesson());

  const checkBtn = document.getElementById('checkBtn');
  let selected = null;

  if(q.type==='mcq' || q.type==='tf'){
    appEl.querySelectorAll('.option').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        if(lessonCtx.answered) return;
        SFX.tap();
        appEl.querySelectorAll('.option').forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected');
        selected = q.type==='mcq' ? parseInt(btn.dataset.i) : (btn.dataset.v==='true');
        checkBtn.classList.remove('disabled');
      });
    });
  } else if(q.type==='fill'){
    const input = document.getElementById('fillInput');
    input.addEventListener('input', ()=>{
      checkBtn.classList.toggle('disabled', input.value.trim().length===0);
    });
    input.focus();
  }

  checkBtn.addEventListener('click', ()=>{
    if(checkBtn.classList.contains('disabled') || lessonCtx.answered) return;
    let isCorrect;
    if(q.type==='fill'){
      const val = document.getElementById('fillInput').value.trim().toLowerCase();
      isCorrect = val === String(q.answer).toLowerCase();
    } else {
      isCorrect = selected === q.answer;
    }
    submitAnswer(q, isCorrect, checkBtn);
  });
}

function submitAnswer(q, isCorrect, checkBtn){
  lessonCtx.answered = true;
  const footerBar = document.getElementById('footerBar');
  const explainBox = document.getElementById('explainBox');

  if(q.type!=='fill'){
    appEl.querySelectorAll('.option').forEach(b=>b.setAttribute('disabled','true'));
    appEl.querySelectorAll('.option.selected').forEach(b=>{
      b.classList.add(isCorrect ? 'correct' : 'incorrect');
    });
    if(!isCorrect){
      // reveal correct one
      if(q.type==='mcq'){
        appEl.querySelectorAll('.option')[q.answer].classList.add('correct');
      } else {
        appEl.querySelectorAll('.option').forEach(b=>{ if((b.dataset.v==='true')===q.answer) b.classList.add('correct'); });
      }
    }
  } else {
    const input = document.getElementById('fillInput');
    input.setAttribute('disabled','true');
    input.style.borderColor = isCorrect ? 'var(--green-500)' : 'var(--red-600)';
    if(!isCorrect){
      const hintEl = document.createElement('div');
      hintEl.className='fill-hint';
      hintEl.style.color = 'var(--red-600)';
      hintEl.style.fontWeight='700';
      hintEl.textContent = `Correct answer: ${q.answer}`;
      input.insertAdjacentElement('afterend', hintEl);
    }
  }

  explainBox.textContent = q.explain;
  explainBox.classList.add('show');

  footerBar.classList.add(isCorrect ? 'state-correct' : 'state-incorrect');
  if(isCorrect){
    lessonCtx.correctCount++;
    SFX.correct();
    burstConfetti(22);
  } else {
    lessonCtx.mistakes++;
    state.hearts = Math.max(0, state.hearts-1);
    saveState();
    refreshChrome();
    pulseStat('statHearts');
    SFX.incorrect();
    if(navigator.vibrate) navigator.vibrate(60);
  }

  document.getElementById('footerBar').innerHTML = `
    <div class="footer-inner">
      <div class="footer-msg ${isCorrect?'ok':'bad'}">${isCorrect ? pickPraise() : 'Not quite!'}</div>
      <button class="btn ${isCorrect?'':'red'}" id="continueBtn">Continue</button>
    </div>
  `;
  document.getElementById('continueBtn').addEventListener('click', ()=>{
    SFX.tap();
    if(state.hearts<=0 && !isCorrect){ showOutOfHearts(); return; }
    lessonCtx.idx++;
    renderQuestion();
  });
}

function pickPraise(){
  const options = ['Nice!','Great job!','Excellent!','Correct!','You got it!','Well done!'];
  return options[Math.floor(Math.random()*options.length)];
}

function confirmQuitLesson(){
  showModal({
    title: 'Leave this lesson?',
    body: "Your progress in this lesson won't be saved.",
    mascot: 'sad',
    buttons: [
      { label:'Keep learning', cls:'gold', action: closeModal },
      { label:'End session', cls:'ghost', action: ()=>{ closeModal(); renderPath(lessonCtx.subKey); } },
    ]
  });
}

function showOutOfHearts(){
  showModal({
    title: 'Out of hearts!',
    body: 'Wait for a daily refill, or come back tomorrow. Hearts refill every day.',
    mascot: 'sad',
    buttons: [
      { label:'Got it', cls:'gold', action: ()=>{ closeModal(); renderHome(); } },
    ]
  });
}

/* ---------------------------- LESSON RESULTS ---------------------------- */
function finishLesson(){
  const { sub, lesson, correctCount, order } = lessonCtx;
  const total = order.length;
  const pct = correctCount/total;
  const stars = pct>=0.95 ? 3 : pct>=0.7 ? 2 : 1;
  const earnedXP = lesson.xp + (lessonCtx.mistakes===0 ? 5 : 0);

  const prevStars = state.completed[lesson.id];
  const firstTime = prevStars==null;
  state.completed[lesson.id] = Math.max(prevStars||0, stars);

  state.xp += earnedXP;
  state.todayXp += earnedXP;
  if(firstTime) state.gems += 5;

  // streak logic
  const today = todayStr();
  if(state.lastActiveDate !== today){
    state.streak += 1;
    state.lastActiveDate = today;
  }

  checkBadges();
  saveState();

  showChrome(false);
  refreshChrome();

  const circumference = 502;
  const offset = circumference * (1-pct);

  appEl.innerHTML = `
    <div class="screen result-wrap">
      <div style="width:110px;height:110px;margin:6px auto 0;">${mascotSVG(pct>=0.7?'idle':'sad')}</div>
      <h2 class="result-title display">${pct>=0.7 ? 'Lesson complete!' : 'Good effort!'}</h2>
      <div class="result-sub">${sub.name} · ${lesson.title}</div>

      <div class="result-ring-wrap">
        <svg viewBox="0 0 180 180">
          <defs><linearGradient id="gradXP" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#279A63"/><stop offset="100%" stop-color="#F0A93E"/>
          </linearGradient></defs>
          <circle class="ring-bg" cx="90" cy="90" r="80"/>
          <circle class="ring-fg" id="ringFg" cx="90" cy="90" r="80" stroke-dasharray="${circumference}" stroke-dashoffset="${circumference}"/>
        </svg>
        <div class="result-center">
          <div class="big">${Math.round(pct*100)}%</div>
          <div class="small">Accuracy</div>
        </div>
      </div>

      <div class="result-stars">
        ${[1,2,3].map(i=>`<span class="st ${i<=stars?'on':''}">★</span>`).join('')}
      </div>

      <div class="result-stats">
        <div class="result-stat"><b>+${earnedXP}</b><span>XP</span></div>
        <div class="result-stat"><b>${correctCount}/${total}</b><span>Correct</span></div>
        <div class="result-stat"><b>${state.streak}</b><span>Streak</span></div>
      </div>

      <button class="btn wide gold" id="resultContinue">Continue</button>
    </div>
  `;

  requestAnimationFrame(()=>{
    setTimeout(()=>{
      const ring = document.getElementById('ringFg');
      if(ring) ring.style.strokeDashoffset = offset;
    }, 150);
  });
  if(pct>=0.7){ SFX.win(); setTimeout(()=>burstConfetti(60), 300); }

  document.getElementById('resultContinue').addEventListener('click', ()=>{
    SFX.tap();
    renderPath(lessonCtx.subKey);
  });
}

/* ---------------------------- BADGES ---------------------------- */
const BADGE_DEFS = [
  { id:'first_lesson', icon:'🌱', name:'First Steps', test: s=>Object.keys(s.completed).length>=1 },
  { id:'five_lessons', icon:'📚', name:'Bookworm', test: s=>Object.keys(s.completed).length>=5 },
  { id:'streak3', icon:'🔥', name:'3-Day Streak', test: s=>s.streak>=3 },
  { id:'streak7', icon:'🏆', name:'Week Warrior', test: s=>s.streak>=7 },
  { id:'perfect', icon:'🌟', name:'Perfectionist', test: s=>Object.values(s.completed).some(v=>v===3) },
  { id:'xp100', icon:'💎', name:'XP Hunter', test: s=>s.xp>=100 },
  { id:'all_subjects', icon:'🗺️', name:'Explorer', test: s=>Object.keys(CURRICULUM).every(k=>Object.keys(s.completed).some(id=>id.startsWith(k+'-'))) },
];
function checkBadges(){
  BADGE_DEFS.forEach(b=>{
    if(!state.badges.includes(b.id) && b.test(state)){
      state.badges.push(b.id);
    }
  });
}

/* ---------------------------- QUESTS TAB ---------------------------- */
function renderQuests(){
  showChrome(false);
  setActiveTab('quests');
  refreshChrome();
  currentBackHandler = null;

  const goalPct = Math.min(100, Math.round(state.todayXp/state.dailyGoalXp*100));
  const totalLessons = Object.values(CURRICULUM).reduce((n,s)=>n+s.units.reduce((m,u)=>m+u.lessons.length,0),0);
  const doneLessons = Object.keys(state.completed).length;

  appEl.innerHTML = `
    <div class="screen">
      <div class="section-label">Daily goal</div>
      <div class="card">
        <div class="quest-item">
          <div class="quest-icon">⭐</div>
          <div class="quest-body">
            <b>Earn ${state.dailyGoalXp} XP today</b>
            <div class="quest-track"><i style="width:${goalPct}%"></i></div>
            <small>${state.todayXp} / ${state.dailyGoalXp} XP</small>
          </div>
        </div>
        <div class="quest-item">
          <div class="quest-icon">📘</div>
          <div class="quest-body">
            <b>Complete lessons</b>
            <div class="quest-track"><i style="width:${Math.round(doneLessons/totalLessons*100)}%"></i></div>
            <small>${doneLessons} / ${totalLessons} lessons finished</small>
          </div>
        </div>
        <div class="quest-item">
          <div class="quest-icon">🔥</div>
          <div class="quest-body">
            <b>Keep your streak alive</b>
            <div class="quest-track"><i style="width:${Math.min(100, state.streak*14)}%"></i></div>
            <small>${state.streak}-day streak</small>
          </div>
        </div>
      </div>

      <div class="section-label">Badges</div>
      <div class="card">
        <div class="badge-grid">
          ${BADGE_DEFS.map(b=>`
            <div class="badge ${state.badges.includes(b.id)?'earned':''}" title="${b.name}">${b.icon}</div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

/* ---------------------------- PROFILE TAB ---------------------------- */
function renderProfile(){
  showChrome(false);
  setActiveTab('profile');
  refreshChrome();
  currentBackHandler = null;

  const subRows = Object.keys(CURRICULUM).map(key=>{
    const sub = CURRICULUM[key];
    const pct = subjectProgress(key);
    return `<div class="quest-item">
      <div class="quest-icon" style="background:${sub.color}22;">${ICONS[sub.icon].replace('currentColor', sub.color)}</div>
      <div class="quest-body">
        <b>${sub.name}</b>
        <div class="quest-track"><i style="width:${pct}%; background:${sub.color}"></i></div>
        <small>${pct}% complete</small>
      </div>
    </div>`;
  }).join('');

  appEl.innerHTML = `
    <div class="screen">
      <div class="card profile-head">
        <div class="profile-avatar">${mascotSVG('idle')}</div>
        <div>
          <h2 style="margin:0;font-size:19px;">Your progress</h2>
          <div style="color:var(--ink-soft);font-size:13px;">Grade 11 · Offline learner</div>
        </div>
      </div>
      <div class="profile-stats-row">
        <div class="pstat"><b>${state.xp}</b><span>Total XP</span></div>
        <div class="pstat"><b>${state.streak}</b><span>Streak</span></div>
        <div class="pstat"><b>${state.gems}</b><span>Gems</span></div>
        <div class="pstat"><b>${state.badges.length}</b><span>Badges</span></div>
      </div>

      <div class="section-label">By subject</div>
      <div class="card">${subRows}</div>

      <div class="section-label">Data</div>
      <div class="card" style="text-align:center;">
        <p style="margin:0 0 12px;color:var(--ink-soft);font-size:13px;">Everything is stored only on this device — fully offline, no account needed.</p>
        <button class="btn ghost" id="resetBtn">Reset all progress</button>
      </div>
    </div>
  `;

  document.getElementById('resetBtn').addEventListener('click', ()=>{
    showModal({
      title:'Reset all progress?',
      body:'This clears your XP, streak, and completed lessons on this device. This cannot be undone.',
      mascot:'sad',
      buttons:[
        { label:'Cancel', cls:'gold', action: closeModal },
        { label:'Reset everything', cls:'ghost', action: ()=>{ localStorage.removeItem(STORAGE_KEY); state = defaultState(); closeModal(); renderOnboarding(); } },
      ]
    });
  });
}

/* ---------------------------- MODAL ---------------------------- */
let modalEl = null;
function showModal({title, body, mascot='idle', buttons=[]}){
  closeModal();
  modalEl = document.createElement('div');
  modalEl.className = 'modal-backdrop';
  modalEl.innerHTML = `
    <div class="modal-sheet">
      <div class="modal-icon">${mascotSVG(mascot)}</div>
      <h2>${title}</h2>
      <p>${body}</p>
      <div style="display:flex;flex-direction:column;gap:10px;">
        ${buttons.map((b,i)=>`<button class="btn wide ${b.cls||''}" data-i="${i}">${b.label}</button>`).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(modalEl);
  buttons.forEach((b,i)=>{
    modalEl.querySelector(`[data-i="${i}"]`).addEventListener('click', b.action);
  });
}
function closeModal(){ if(modalEl){ modalEl.remove(); modalEl=null; } }

/* ---------------------------- BOOT ---------------------------- */
function boot(){
  ensureDailyRollover();
  if(!state.onboarded){
    renderOnboarding();
  } else {
    renderHome();
  }
  refreshChrome();

  if('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
      navigator.serviceWorker.register('sw.js').catch(()=>{});
    });
  }
}
boot();

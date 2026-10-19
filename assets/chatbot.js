/* ============================================================
   LUMAITEC — AI Navigation Assistant
   ============================================================ */

(function () {
  'use strict';

  const KB = [
    {
      patterns: ['coaching', 'coach', 'executive', 'leader', 'codir', 'director', 'ceo', 'top team'],
      reply: `Lumaitec executive coaching is designed for senior leaders. Jacques offers three formats:<br><br>
        - <a href="coaching-one-to-one.html">One-to-one</a> — individual programme 6–12 months<br>
        - <a href="coaching-transitions.html">Leadership transitions</a> — first 100 days in a new role<br>
        - <a href="coaching-teams.html">Top team coaching</a> — CODIR / ExCo<br><br>
        Would you like to know more about one of these formats?`,
      quick: ['One-to-one', 'Transitions', 'Top team', 'Get in touch']
    },
    {
      patterns: ['training', 'workshop', 'lencioni', 'working genius', 'dysfunctions', 'team', 'cohesion'],
      reply: `Lumaitec training transforms teams with proven frameworks:<br><br>
        - <a href="training-cohesion.html">Team cohesion</a> — Lencioni · 5 Dysfunctions<br>
        - <a href="training-working-genius.html">Working Genius</a> — Roles & energy<br>
        - <a href="training-assessments.html">Assessments</a> — Birkman · KF4D · HBDI<br><br>
        300 workshops, 1,000 people trained across 3 continents.`,
      quick: ['Team cohesion', 'Working Genius', 'Assessments', 'Get in touch']
    },
    {
      patterns: ['birkman', 'assessment', 'hbdi', 'kf4d', 'korn ferry', 'behavioural', 'profile'],
      reply: `Jacques is <strong>Birkman Certified</strong> and uses several assessment tools:<br><br>
        - <strong>Birkman Method</strong> — full behavioural assessment<br>
        - <strong>KF4D</strong> (Korn Ferry) — leadership & potential<br>
        - <strong>HBDI</strong> — Herrmann Brain Dominance<br><br>
        These tools are used in <a href="training-assessments.html">assessment workshops</a> and coaching programmes.`,
      quick: ['Learn more', 'Get in touch']
    },
    {
      patterns: ['ai', 'artificial intelligence', 'tool-d', 'tool d', 'technology', 'vendor', 'due diligence', 'investment', 'decision'],
      reply: `Lumaitec's AI Consulting practice combines deep tech expertise with frontier AI:<br><br>
        - <a href="ai-tool-d.html">Tool-D</a> — Vendor selection platform<br>
        - <a href="ai-cracken.html">crAcken</a> — CRA compliance SaaS<br>
        - <a href="ai-due-diligence.html">Tech due-diligence</a> — For investors & boards<br>
        - <a href="ai-advisory.html">Decision advisory</a> — For complex tech decisions<br><br>
        25 years of experience at Intel & Altera applied to your technology decisions.`,
      quick: ['Tool-D', 'crAcken', 'Due diligence', 'Get in touch']
    },
    {
      patterns: ['cracken', 'cra ', 'cyber resilience', 'sbom', 'vulnerability', 'compliance', 'flight recorder'],
      reply: `<strong>crAcken</strong> is Lumaitec's CRA compliance SaaS — the flight recorder for connected products.<br><br>
        It turns SBOMs, vulnerability findings and security decisions into one traceable release workflow: deterministic analysis, release monitoring, 24h/72h reporting cases and a defensible evidence bundle.<br><br>
        The CRA reporting clock starts <strong>11 September 2026</strong>.<br><br>
        <a href="ai-cracken.html">Discover crAcken -></a>`,
      quick: ['Get in touch', 'AI Consulting']
    },
    {
      patterns: ['tool-d', 'vendor', 'selection', 'platform'],
      reply: `<strong>Tool-D</strong> is Lumaitec's proprietary platform for technology vendor selection.<br><br>
        It combines frontier AI and a curated network of senior technologists to structure and clarify tech procurement decisions.<br><br>
        <a href="ai-tool-d.html">Discover Tool-D -></a>`,
      quick: ['Get in touch', 'AI Consulting']
    },
    {
      patterns: ['price', 'pricing', 'cost', 'fee', 'quote', 'rate'],
      reply: `Lumaitec's fees are tailored to the scope, duration and format of each engagement.<br><br>
        The best starting point: <strong>30 minutes, no agenda, no commitment</strong> — we'll work out together what fits your situation.<br><br>
        <a href="contact.html">Get in touch -></a>`,
      quick: ['Get in touch', 'Coaching', 'Training']
    },
    {
      patterns: ['jacques', 'cesbron', 'founder', 'background', 'experience', 'intel', 'altera', 'silicon valley', 'insead', 'who are'],
      reply: `<strong>Jacques Cesbron</strong> is the founder of Lumaitec.<br><br>
        - INSEAD-informed · Birkman Certified · Lencioni Certified<br>
        - 25 years at Intel & Altera (Silicon Valley)<br>
        - 300 workshops · 1,000 people trained<br><br>
        <a href="about.html">Read the full story -></a>`,
      quick: ['Coaching', 'Training', 'Get in touch']
    },
    {
      patterns: ['contact', 'meeting', 'call', 'email', 'phone', 'talk', 'intro', 'appointment'],
      reply: `To start a conversation with Jacques:<br><br>
        - <a href="mailto:contact@lumaitec.com">contact@lumaitec.com</a><br>
        - <a href="https://www.linkedin.com/in/jacques-cesbron-b174706/">LinkedIn</a><br><br>
        Or use the <a href="contact.html">contact form</a> for an initial exchange. <strong>30 minutes, no agenda, no commitment.</strong>`,
      quick: ['Contact form', 'Coaching', 'Training']
    },
    {
      patterns: ['nice', 'france', 'location', 'where', 'remote', 'video', 'online', 'in-person'],
      reply: `Lumaitec is based in <strong>Nice</strong>, France — and works worldwide, both in person and by video.<br><br>
        Jacques has worked across <strong>3 continents</strong> and operates fluently in English and French.`,
      quick: ['Get in touch', 'About Jacques']
    }
  ];

  const FALLBACK = `I didn't quite catch that. I can help you navigate to:<br><br>
    - <a href="coaching.html">Executive Coaching</a><br>
    - <a href="training.html">Team Training</a><br>
    - <a href="ai.html">AI Consulting</a><br>
    - <a href="about.html">About Jacques</a><br>
    - <a href="contact.html">Get in touch</a>`;

  const WELCOME = `Hello! I'm the Lumaitec assistant. I'll help you find the right service for your situation.<br><br>
    What are you looking for?`;

  const QUICK_ACTIONS = {
    'Coaching': 'coaching',
    'Training': 'training',
    'AI Consulting': 'artificial intelligence',
    'One-to-one': 'coaching one to one',
    'Transitions': 'leadership transition',
    'Top team': 'top team',
    'Team cohesion': 'team cohesion lencioni',
    'Working Genius': 'working genius',
    'Assessments': 'assessment birkman',
    'Tool-D': 'tool-d',
    'crAcken': 'cracken',
    'Due diligence': 'due diligence',
    'Advisory': 'decision advisory',
    'Get in touch': 'contact meeting',
    'Learn more': 'learn more',
    'About Jacques': 'jacques cesbron founder',
    'Contact form': 'contact form',
  };

  function findReply(text) {
    const lower = text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    for (const entry of KB) {
      for (const pat of entry.patterns) {
        if (lower.includes(pat)) return entry;
      }
    }
    return null;
  }

  function createEl(tag, attrs = {}, html = '') {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'className') el.className = v;
      else el.setAttribute(k, v);
    });
    if (html) el.innerHTML = html;
    return el;
  }

  function addMessage(text, role, quickBtns) {
    const msgs = document.getElementById('lmt-chat-messages');
    const msg = createEl('div', { className: `chat-msg ${role}` }, text);
    msgs.appendChild(msg);
    if (quickBtns && quickBtns.length) {
      const row = createEl('div', { className: 'chat-quick' });
      quickBtns.forEach(label => {
        const btn = createEl('button', {}, label);
        btn.addEventListener('click', () => handleInput(QUICK_ACTIONS[label] || label));
        row.appendChild(btn);
      });
      msgs.appendChild(row);
    }
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('lmt-chat-messages');
    const el = createEl('div', { id: 'lmt-typing', className: 'chat-msg bot chat-typing' });
    el.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('lmt-typing');
    if (el) el.remove();
  }

  function handleInput(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    document.getElementById('lmt-chat-input').value = '';
    showTyping();
    setTimeout(() => {
      hideTyping();
      const match = findReply(text);
      if (match) {
        addMessage(match.reply, 'bot', match.quick || []);
      } else {
        addMessage(FALLBACK, 'bot', ['Coaching', 'Training', 'AI Consulting', 'Get in touch']);
      }
    }, 700);
  }

  function buildWidget() {
    const btn = createEl('button', { id: 'lmt-chat-btn', 'aria-label': 'Open Lumaitec assistant' });
    btn.innerHTML = `<img class="chat-icon" src="assets/ring-icon.png" alt="">Lumaitec Assistant`;

    const panel = createEl('div', { id: 'lmt-chat-panel', role: 'dialog', 'aria-label': 'Lumaitec Assistant' });
    panel.innerHTML = `
      <div id="lmt-chat-header">
        <div>
          <div class="ch-title">Lumaitec Assistant</div>
          <div class="ch-sub">NAVIGATION · SERVICES · CONTACT</div>
        </div>
        <button id="lmt-chat-close" aria-label="Close">✕</button>
      </div>
      <div id="lmt-chat-messages"></div>
      <div id="lmt-chat-input-row">
        <input id="lmt-chat-input" type="text" placeholder="Your question…" autocomplete="off" maxlength="300">
        <button id="lmt-chat-send" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>`;

    (document.querySelector('nav .nav-right') || document.body).appendChild(btn);
    document.body.appendChild(panel);

    addMessage(WELCOME, 'bot', ['Coaching', 'Training', 'AI Consulting', 'Get in touch']);

    let open = false;
    function toggle() {
      open = !open;
      panel.classList.toggle('open', open);
    }
    btn.addEventListener('click', toggle);
    document.getElementById('lmt-chat-close').addEventListener('click', toggle);

    const input = document.getElementById('lmt-chat-input');
    document.getElementById('lmt-chat-send').addEventListener('click', () => handleInput(input.value));
    input.addEventListener('keydown', e => { if (e.key === 'Enter') handleInput(input.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();

/* =====================================================================
   LEXAI — Application core
   Vanilla JS SPA: theme persistence, hash router, view rendering.
   No build step, no framework — open index.html and it runs.
   ===================================================================== */
(function () {
  const D = window.LEXAI_DATA;
  const API = window.LexAPI;
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- Icons (inline SVG, stroke = currentColor) ---------- */
  const I = {
    grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
    spark:'<path d="M12 3l1.8 4.6L18 9.4l-4.2 1.8L12 16l-1.8-4.8L6 9.4l4.2-1.8z"/><path d="M5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9z"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    scale:'<path d="M12 3v18M5 21h14M7 7l-3 7a3 3 0 0 0 6 0L7 7zM17 7l-3 7a3 3 0 0 0 6 0l-3-7zM4 7h16"/>',
    bell:'<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
    help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
    save:'<path d="M19 21l-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    book:'<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM19 19H6a2 2 0 0 0-2 2"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3 14a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3a2 2 0 0 1 4 0v.1A1.6 1.6 0 0 0 17 4.6a1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 21 10a2 2 0 0 1 0 4z"/>',
    folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
    bookmark:'<path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>',
    download:'<path d="M12 3v12M7 11l5 5 5-5M5 21h14"/>',
    export:'<path d="M12 15V3M8 7l4-4 4 4M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
    upload:'<path d="M12 19V7M7 11l5-5 5 5M5 19h14"/>',
    send:'<path d="M22 2L11 13M22 2l-7 20-4-9-9-4z"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
    moon:'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    key:'<circle cx="8" cy="15" r="4"/><path d="M10.8 12.2L20 3M16 7l3 3M14 9l3 3"/>',
    list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    sum:'<path d="M4 5h16M4 5l8 7-8 7M4 5v14M14 12h6"/>',
    chart:'<path d="M3 3v18h18M8 14v4M13 9v9M18 5v13"/>'
  };
  function icon(name, cls) { return `<svg class="${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${I[name]||''}</svg>`; }
  const MARK = `<svg class="mk" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><line x1="60" y1="16" x2="60" y2="92"/><circle cx="60" cy="14" r="3.4" fill="currentColor" stroke="none"/><line x1="24" y1="34" x2="96" y2="34"/><line x1="33" y1="34" x2="22" y2="58"/><line x1="33" y1="34" x2="44" y2="58"/><path d="M20 58 q13 12 26 0"/><line x1="87" y1="34" x2="76" y2="58"/><line x1="87" y1="34" x2="98" y2="58"/><path d="M74 58 q13 12 26 0"/><path d="M60 56 L80 64 V82 q0 16 -20 24 q-20 -8 -20 -24 V64 Z"/></g><g stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M52 86 h8 v-8 h8"/><path d="M52 78 h6"/><circle cx="50" cy="86" r="2.2" fill="currentColor" stroke="none"/><circle cx="50" cy="78" r="2.2" fill="currentColor" stroke="none"/><circle cx="70" cy="78" r="2.2" fill="currentColor" stroke="none"/><circle cx="60" cy="94" r="2.2" fill="currentColor" stroke="none"/></g></svg>`;

  /* ---------- Theme manager (localStorage persistence) ---------- */
  const Theme = {
    KEY: 'lexai-theme',
    get() { return localStorage.getItem(this.KEY) || 'light'; },
    apply(t) { document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light'); },
    init() { this.apply(this.get()); },
    toggle() {
      const next = this.get() === 'dark' ? 'light' : 'dark';
      localStorage.setItem(this.KEY, next);
      this.apply(next);
    }
  };
  Theme.init();

  const AUTH = {
    KEY: 'lexai-authenticated',
    valid: { email: 'user@lexai.io', password: 'lexai123' },
    check() { return localStorage.getItem(this.KEY) === 'true'; },
    signIn(email, password) {
      if (email === this.valid.email && password === this.valid.password) {
        localStorage.setItem(this.KEY, 'true');
        return true;
      }
      return false;
    },
    signOut() { localStorage.removeItem(this.KEY); }
  };

  /* ---------- Navigation definition ---------- */
  const NAV = [
    { id:'dashboard', icon:'grid',  label:'Dashboard' },
    { id:'upload',    icon:'upload',label:'Upload Document' },
    { id:'chat',      icon:'spark', label:'Ask Legal AI' },
    { id:'caselaws',  icon:'scale', label:'Case Laws' },
    { id:'circulars', icon:'bell',  label:'Circulars & Notifications' },
    { id:'articles',  icon:'doc',   label:'Articles' },
    { id:'queries',   icon:'help',  label:'Legal Queries' },
    { id:'library',   icon:'save',  label:'Saved Library' },
    { id:'settings',  icon:'gear',  label:'Settings' }
  ];

  /* ---------- Helpers ---------- */
  function toast(msg) {
    let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id='toast'; t.className='toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(()=>t.classList.remove('show'), 2600);
  }
  function badgeClass(s){ return s==='Processed'?'proc':s==='Processing'?'processing':s==='Failed'?'failed':'case'; }

  /* ===================================================================
     VIEW RENDERERS — each returns an HTML string
     =================================================================== */
  const Views = {

    dashboard() {
      const stats = D.stats.map(s=>`<div class="card stat"><div class="label">${s.label}</div><div class="value serif">${s.value}</div><div class="delta">${s.delta}</div></div>`).join('');
      const qa = D.quickAccess.map(q=>`<div class="card qa" data-go="${q.id==='circulars'?'circulars':q.id==='library'?'library':q.id}"><div class="qa-ic">${icon(q.icon)}</div><div><h3>${q.title}</h3><p>${q.desc}</p></div></div>`).join('');
      const updates = D.updates.map(u=>`<div class="row" data-go="document"><span class="tag">${u.tag}</span><div class="row-body"><h4>${u.title}</h4><span>${u.source} · ${u.date}</span></div></div>`).join('');
      const recent = D.recent.map(r=>`<div class="row" data-go="document"><div class="row-body"><h4>${r.title}</h4><span>${r.meta}</span></div></div>`).join('');
      const trending = D.trending.map(t=>`<button class="chip" data-go="search">${t}</button>`).join('');
      return `
      <div class="content fade-in">
        <div class="page-head"><span class="eyebrow">Overview</span><h1 class="serif">Welcome back, ${D.user.name.split(' ')[0]}</h1><p>Here's what's happening across your legal workspace today.</p></div>
        <div class="grid cols-4 stagger">${stats}</div>
        <div class="section-title"><h2>Quick Access</h2></div>
        <div class="grid cols-3 stagger">${qa}</div>
        <div class="grid cols-2" style="margin-top:26px;align-items:start">
          <div>
            <div class="section-title"><h2>Latest Legal Updates</h2><a class="link" data-go="circulars">View all</a></div>
            <div class="card list">${updates}</div>
          </div>
          <div>
            <div class="section-title"><h2>Recently Viewed</h2><a class="link" data-go="library">View all</a></div>
            <div class="card list">${recent}</div>
          </div>
        </div>
        <div class="section-title"><h2>Trending Topics</h2></div>
        <div class="chips">${trending}</div>
      </div>`;
    },

    chat() {
      const prompts = D.suggestedPrompts.map(p=>`<button class="chip js-prompt">${p}</button>`).join('');
      const wired = !window.LEXAI_CONFIG.USE_MOCK && window.LEXAI_CONFIG.ENDPOINTS.chat;
      return `
      <div class="chat-layout fade-in">
        <aside class="chat-side">
          <button class="btn primary newchat js-newchat">${icon('plus')} New Chat</button>
          <div class="hist-day">Today</div>
          <div class="hist js-prompt">What are the compliance requirements...<span>10:30</span></div>
          <div class="hist js-prompt">Difference between NCLT &amp; NCLAT<span>09:15</span></div>
          <div class="hist-day">Yesterday</div>
          <div class="hist js-prompt">FEMA rules for inward remittance<span></span></div>
          <div class="hist js-prompt">Section 8 Company process<span></span></div>
          <div class="hist-day">Previous 7 days</div>
          <div class="hist js-prompt">NCLT vs NCLAT jurisdiction<span></span></div>
          <div class="hist js-prompt">Liability of Directors<span></span></div>
        </aside>
        <section class="chat-main">
          <div class="chat-scroll" id="chatScroll">
            <div class="msg ai">
              <div class="ai-head">${MARK}<b>LEXAI Assistant</b></div>
              <div class="bubble">Welcome to the RAG-powered Legal Assistant. Ask me anything about Indian law — case laws, acts, circulars and compliance. Responses cite the source documents they're grounded in.

${wired ? 'Connected to your live backend.' : 'Running in demo mode — connect a backend in config.js to enable live RAG answers.'}</div>
            </div>
          </div>
          <div class="composer">
            <div class="prompts">${prompts}</div>
            <div class="compose-box">
              <textarea id="chatInput" rows="1" placeholder="Ask about company law, case law, circulars, FEMA, SEBI..."></textarea>
              <button class="send-btn js-send" title="Send">${icon('send')}</button>
            </div>
          </div>
        </section>
      </div>`;
    },

    search() {
      return `
      <div class="content fade-in">
        <div class="page-head"><span class="eyebrow">Research</span><h1 class="serif">Legal Search</h1></div>
        <div class="searchbar" style="max-width:none;margin-bottom:18px">${icon('search')}<input id="searchInput" placeholder="Search for case laws, acts, circulars, articles and more..."></div>
        <div class="tabbar">${['All','Case Laws','Circulars / Notifications','Acts & Rules','Articles','Queries'].map((t,i)=>`<button class="tab ${i===0?'active':''}">${t}</button>`).join('')}</div>
        <div class="search-layout">
          <aside class="card filters">
            <h3>Filters</h3>
            ${Object.entries(D.filters).map(([k,v])=>`<div class="filter-grp"><label>${k}</label><select class="select">${v.map(o=>`<option>${o}</option>`).join('')}</select></div>`).join('')}
            <div class="filter-grp"><label>Date Range</label><input class="select" type="date"></div>
            <button class="btn primary" style="width:100%;justify-content:center;margin-top:18px">Apply Filters</button>
          </aside>
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px"><span style="color:var(--muted);font-size:13px"><b id="resCount">${D.searchResults.length}</b> results found</span><select class="select" style="width:auto"><option>Sort by: Relevance</option><option>Newest</option><option>Oldest</option></select></div>
            <div id="searchResults">${this._results(D.searchResults)}</div>
          </div>
        </div>
      </div>`;
    },
    _results(list) {
      if (!list.length) return `<div class="empty">No results found.</div>`;
      return list.map(r=>`<div class="card result" data-go="document"><div class="top"><h3>${r.title}</h3><span class="badge case">${r.type}</span></div><div class="meta">${r.court} · ${r.date}</div><p class="excerpt">${r.excerpt}</p><div class="tags">${r.tags.map(t=>`<span>${t}</span>`).join('')}</div></div>`).join('');
    },

    caselaws() {
      const list = D.searchResults.filter(r=>r.type==='Case Law');
      return `<div class="content fade-in"><div class="page-head"><span class="eyebrow">Judgments</span><h1 class="serif">Case Laws</h1><p>Browse landmark and recent judgments across courts.</p></div>${this._results(list.length?list:D.searchResults)}</div>`;
    },

    circulars() {
      const rows = D.updates.concat(D.updates).map(u=>`<div class="row" data-go="document"><span class="tag">${u.tag}</span><div class="row-body"><h4>${u.title}</h4><span>${u.source} · ${u.date}</span></div></div>`).join('');
      return `<div class="content fade-in"><div class="page-head"><span class="eyebrow">Regulatory</span><h1 class="serif">Circulars &amp; Notifications</h1><p>Latest circulars from MCA, SEBI, RBI, NCLT and other bodies.</p></div><div class="card list">${rows}</div></div>`;
    },

    articles() {
      const cards = D.articles.map(a=>`<div class="card qa" style="flex-direction:column;gap:10px"><span class="badge case">${a.cat}</span><h3 style="font-size:16px">${a.title}</h3><p>${a.author} · ${a.read}</p></div>`).join('');
      return `<div class="content fade-in"><div class="page-head"><span class="eyebrow">Insights</span><h1 class="serif">Articles</h1><p>Expert commentary and practical guides.</p></div><div class="grid cols-2 stagger">${cards}</div></div>`;
    },

    queries() {
      const rows = D.queries.map(q=>`<div class="row"><div class="row-body"><h4>${q.q}</h4><span>${q.cat} · ${q.answers} answer(s)</span></div><span class="badge ${q.status==='Answered'?'proc':'processing'}" style="align-self:center">${q.status}</span></div>`).join('');
      return `<div class="content fade-in"><div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-end"><div><span class="eyebrow">Community</span><h1 class="serif">Legal Queries</h1></div><button class="btn primary">${icon('plus')} Ask a Question</button></div><div class="card list">${rows}</div></div>`;
    },

    library() {
      const folders = D.libraryFolders.map(f=>`<div class="folder">${icon('folder')}<span>${f.name}</span><span class="cnt">${f.count}</span></div>`).join('');
      const rows = D.library.map(l=>`<tr><td class="name">${l.name}</td><td><span class="badge case">${l.type}</span></td><td>${l.tags}</td><td>${l.date}</td></tr>`).join('');
      return `
      <div class="content fade-in">
        <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-end"><div><span class="eyebrow">Workspace</span><h1 class="serif">Saved Library</h1></div><button class="btn primary">${icon('plus')} New Folder</button></div>
        <div class="drive-banner card">
          <div class="drive-banner-left">${icon('folder')}<div><h3>Legal Documents on Google Drive</h3><p>Access the full collection of indexed legal documents — acts, circulars, judgments and more.</p></div></div>
          <a class="btn primary" href="https://drive.google.com/drive/folders/1pz-aVASD_BaQ3xny7YYYTZmmbsMjAiYD" target="_blank" rel="noopener noreferrer">${icon('export')} Open in Google Drive</a>
        </div>
        <div class="search-layout">
          <aside class="card filters"><h3>Folders</h3><div style="margin-top:10px">${folders}</div><button class="btn" style="width:100%;justify-content:center;margin-top:14px">${icon('plus')} Create Folder</button></aside>
          <div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Name</th><th>Type</th><th>Tags</th><th>Date</th></tr></thead><tbody>${rows}</tbody></table></div></div>
        </div>
      </div>`;
    },

    kb() {
      const rows = D.knowledgeBase.map(d=>`<tr><td class="name">${d.name}</td><td>${d.category}</td><td>${d.source}</td><td>${d.by}</td><td>${d.date}</td><td><span class="badge ${badgeClass(d.status)}">${d.status}</span></td></tr>`).join('');
      return `
      <div class="content fade-in">
        <div class="page-head" style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px">
          <div><span class="eyebrow">Admin</span><h1 class="serif">Knowledge Base Management</h1><p>Documents indexed for retrieval-augmented generation.</p></div>
          <div style="display:flex;gap:9px"><button class="btn js-upload">${icon('upload')} Upload Documents</button><button class="btn primary js-upload">${icon('plus')} Bulk Upload</button></div>
        </div>
        <div class="tabbar">${['Documents','Categories','Sources','Indexing Status','Configuration'].map((t,i)=>`<button class="tab ${i===0?'active':''}">${t}</button>`).join('')}</div>
        <div class="card"><div class="table-wrap"><table class="tbl"><thead><tr><th>Document Name</th><th>Category</th><th>Source</th><th>Uploaded By</th><th>Date</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table></div></div>
        <input type="file" id="kbFile" multiple style="display:none">
      </div>`;
    },

    document() {
      const doc = D.document;
      const body = doc.body.map((line,i)=> i<7 ? `<p class="center ${i===6?'jhead':''}">${line}</p>` : `<p>${line}</p>`).join('');
      const acts = [
        { ic:'sum',  t:'Summarize Document', d:'Get an auto summary of this document', a:'summarize' },
        { ic:'help', t:'Ask Questions',      d:'Ask any question from this document', a:'ask' },
        { ic:'list', t:'Key Points',         d:'Extract key points from document', a:'keypoints' },
        { ic:'doc',  t:'Generate Brief Note',d:'Generate a brief note / memo', a:'brief' },
        { ic:'scale',t:'Show Citations',     d:'View all citations in this document', a:'cite' }
      ].map(x=>`<div class="assist-act js-assist" data-act="${x.a}"><div class="ai">${icon(x.ic)}</div><div><h4>${x.t}</h4><p>${x.d}</p></div></div>`).join('');
      return `
      <div class="content fade-in">
        <div class="doc-head">
          <div><h1 class="serif">${doc.title}</h1><div class="sub"><span class="badge case">Case Law</span><span>${doc.court}</span><span>·</span><span>${doc.date}</span><span>·</span><span>${doc.citation}</span></div></div>
          <div class="doc-actions"><button class="btn js-toast" data-msg="Bookmarked">${icon('bookmark')} Bookmark</button><button class="btn js-toast" data-msg="Download started">${icon('download')} Download</button><button class="btn js-toast" data-msg="Exported">${icon('export')} Export</button></div>
        </div>
        <div class="doc-layout">
          <div class="card viewer">${body}</div>
          <aside class="card assistant-panel">
            <div class="pane-head">${MARK}<b>AI Assistant</b></div>
            ${acts}
            <div class="assist-out" id="assistOut" style="display:none"></div>
            <div style="padding:14px 16px;border-top:1px solid var(--line)"><div class="compose-box" style="box-shadow:none"><textarea id="docAsk" rows="1" placeholder="Ask about this document..."></textarea><button class="send-btn js-docask">${icon('send')}</button></div></div>
          </aside>
        </div>
      </div>`;
    },

    upload() {
      return `
      <div class="content fade-in">
        <div class="page-head"><span class="eyebrow">Documents</span><h1 class="serif">Upload Document</h1><p>Upload legal documents to index them for AI-powered retrieval.</p></div>
        <div class="card upload-card">
          <div class="upload-zone" id="uploadZone">
            <div class="upload-zone-ic">${icon('upload')}</div>
            <h3>Drop files here or click to browse</h3>
            <p>PDF, DOCX, TXT — multiple files supported</p>
            <input type="file" id="uploadFile" multiple accept=".pdf,.docx,.doc,.txt" style="display:none">
          </div>
          <div id="uploadFileList" class="upload-file-list" style="display:none"></div>
          <div class="upload-actions">
            <button class="btn primary" id="uploadBtn" disabled>${icon('upload')} Upload Documents</button>
            <button class="btn" id="uploadClear" style="display:none">${icon('plus')} Clear</button>
          </div>
          <div id="uploadStatus" class="upload-status" style="display:none"></div>
        </div>
      </div>`;
    },

    settings() {
      const cur = Theme.get();
      return `
      <div class="content fade-in">
        <div class="page-head"><span class="eyebrow">Preferences</span><h1 class="serif">Settings</h1></div>
        <div class="grid cols-2" style="align-items:start">
          <div class="card" style="padding:22px">
            <h2 style="font-size:16px;margin-bottom:4px">Appearance</h2>
            <p style="color:var(--muted);font-size:13px;margin-bottom:16px">Theme preference is saved to local storage and persists across reloads.</p>
            <div style="display:flex;gap:10px">
              <button class="btn ${cur!=='dark'?'primary':''} js-settheme" data-t="light">${icon('sun')} Light</button>
              <button class="btn ${cur==='dark'?'primary':''} js-settheme" data-t="dark">${icon('moon')} Dark</button>
            </div>
          </div>
          <div class="card" style="padding:22px">
            <h2 style="font-size:16px;margin-bottom:4px">Backend Integration</h2>
            <p style="color:var(--muted);font-size:13px;line-height:1.6">This demo is wired to talk to your backend through a single layer. Set <code style="color:var(--gold)">USE_MOCK:false</code> and fill the webhook URLs in <code style="color:var(--gold)">assets/js/config.js</code>. The RAG chat, search, document Q&amp;A and knowledge-base upload all route through <code style="color:var(--gold)">assets/js/api.js</code> — no view code changes needed.</p>
            <div style="margin-top:14px;display:flex;align-items:center;gap:9px;font-size:13px"><span class="badge ${window.LEXAI_CONFIG.USE_MOCK?'processing':'proc'}">${window.LEXAI_CONFIG.USE_MOCK?'Demo Mode':'Live'}</span><span style="color:var(--muted)">${window.LEXAI_CONFIG.USE_MOCK?'Serving static demo data':'Connected to live endpoints'}</span></div>
          </div>
          <div class="card" style="padding:22px">
            <h2 style="font-size:16px;margin-bottom:4px">Profile</h2>
            <div style="display:flex;gap:12px;align-items:center;margin-top:12px"><div class="pic" style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,var(--gold),var(--gold-soft));color:#1a1610;display:grid;place-items:center;font-weight:700">${D.user.initials}</div><div><b>${D.user.name}</b><div style="color:var(--muted);font-size:12.5px">${D.user.role}</div></div></div>
          </div>
        </div>
      </div>`;
    }
  };

  /* ===================================================================
     Per-view behaviour wiring
     =================================================================== */
  const Wire = {
    chat() {
      const input = $('#chatInput'); const scroll = $('#chatScroll');
      const auto = ()=>{ input.style.height='auto'; input.style.height=Math.min(input.scrollHeight,160)+'px'; };
      input.addEventListener('input', auto);
      const add = (html, cls)=>{ const d=document.createElement('div'); d.className='msg '+cls+' fade-in'; d.innerHTML=html; scroll.appendChild(d); scroll.scrollTop=scroll.scrollHeight; return d; };
      const ask = async (text)=>{
        if(!text.trim()) return;
        add(`<div class="bubble">${text}</div>`,'user');
        input.value=''; auto();
        const t = add(`<div class="ai-head">${MARK}<b>LEXAI Assistant</b></div><div class="bubble"><span class="typing"><span></span><span></span><span></span></span></div>`,'ai');
        try {
          const r = await API.chat(text, []);
          const srcs = (r.sources||[]).map(s=>`<div class="src"><span class="n">${s.n}</span>${s.title}</div>`).join('');
          t.innerHTML = `<div class="ai-head">${MARK}<b>LEXAI Assistant</b>${r.confidence?`<span class="conf">Confidence ${r.confidence}%</span>`:''}</div><div class="bubble">${(r.answer||'').replace(/</g,'&lt;')}${srcs?`<div class="sources"><div class="lab">Sources &amp; Citations (${r.sources.length})</div>${srcs}</div>`:''}<div class="chat-acts"><button class="mini js-toast" data-msg="Sources opened">View Sources</button><button class="mini js-toast" data-msg="Answer downloaded">Download</button><button class="mini js-toast" data-msg="Copied">Copy</button></div></div>`;
          bindToasts(t);
        } catch(e) {
          t.innerHTML = `<div class="ai-head">${MARK}<b>LEXAI Assistant</b></div><div class="bubble">Could not reach the backend. Check <code>ENDPOINTS.chat</code> in config.js. (${e.message})</div>`;
        }
        scroll.scrollTop = scroll.scrollHeight;
      };
      $('.js-send').addEventListener('click', ()=>ask(input.value));
      input.addEventListener('keydown', e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); ask(input.value); } });
      document.querySelectorAll('.js-prompt').forEach(b=> b.addEventListener('click', ()=> ask(b.textContent.replace(/\d{1,2}:\d{2}$/,'').trim())));
      $('.js-newchat').addEventListener('click', ()=>{ scroll.querySelectorAll('.msg').forEach((m,i)=>{ if(i>0) m.remove(); }); });
    },
    search() {
      const input = $('#searchInput'); if(!input) return;
      let t; input.addEventListener('input', ()=>{ clearTimeout(t); t=setTimeout(async ()=>{
        const r = await API.search({ q: input.value });
        $('#searchResults').innerHTML = Views._results(r.results);
        $('#resCount').textContent = r.results.length;
        bindGo($('#searchResults'));
      }, 200); });
    },
    kb() {
      const file = $('#kbFile');
      document.querySelectorAll('.js-upload').forEach(b=> b.addEventListener('click', ()=> file.click()));
      file.addEventListener('change', async ()=>{
        toast('Uploading '+file.files.length+' file(s)...');
        const r = await API.kbUpload(file.files);
        toast(r.message || 'Upload complete');
      });
    },
    document() {
      const out = $('#assistOut');
      document.querySelectorAll('.js-assist').forEach(b=> b.addEventListener('click', async ()=>{
        out.style.display='block'; out.innerHTML='<span class="typing"><span></span><span></span><span></span></span>';
        const act = b.dataset.act;
        if(act==='summarize'){ const r=await API.summarizeDocument('doc-1'); out.innerHTML='<b style="color:var(--ink)">Summary</b><br>'+r.summary; }
        else if(act==='cite'){ out.innerHTML='<b style="color:var(--ink)">Citations</b><br>1. Insolvency and Bankruptcy Code, 2016 — Section 14<br>2. Companies Act, 2013<br>3. High Court of Madras, W.P. 5678/2023'; }
        else if(act==='keypoints'){ out.innerHTML='<b style="color:var(--ink)">Key Points</b><br>• Moratorium under Section 14 applies to the corporate debtor only.<br>• It does not extend to personal guarantors.<br>• Appeal arises from a 2024 Madras High Court order.'; }
        else { const r=await API.askDocument('doc-1','brief'); out.innerHTML='<b style="color:var(--ink)">Brief Note</b><br>'+r.answer; }
      }));
      const da = $('#docAsk');
      if(da){ $('.js-docask').addEventListener('click', async ()=>{ if(!da.value.trim())return; out.style.display='block'; out.innerHTML='<span class="typing"><span></span><span></span><span></span></span>'; const r=await API.askDocument('doc-1', da.value); out.innerHTML='<b style="color:var(--ink)">Answer</b><br>'+r.answer; da.value=''; }); }
    },
    upload() {
      const zone = $('#uploadZone');
      const fileInput = $('#uploadFile');
      const list = $('#uploadFileList');
      const btn = $('#uploadBtn');
      const clearBtn = $('#uploadClear');
      const status = $('#uploadStatus');
      let selectedFiles = [];

      const renderList = () => {
        if (!selectedFiles.length) {
          list.style.display = 'none'; btn.disabled = true; clearBtn.style.display = 'none'; return;
        }
        list.style.display = 'block'; btn.disabled = false; clearBtn.style.display = 'inline-flex';
        list.innerHTML = selectedFiles.map(f=>`<div class="upload-file-row">${icon('doc')}<span class="fname">${f.name}</span><span class="fsize">${(f.size/1024).toFixed(1)} KB</span></div>`).join('');
      };

      zone.addEventListener('click', () => fileInput.click());
      zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag'); });
      zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
      zone.addEventListener('drop', e => { e.preventDefault(); zone.classList.remove('drag'); selectedFiles = [...e.dataTransfer.files]; renderList(); });
      fileInput.addEventListener('change', () => { selectedFiles = [...fileInput.files]; renderList(); });
      clearBtn.addEventListener('click', () => { selectedFiles = []; fileInput.value = ''; renderList(); status.style.display = 'none'; });

      btn.addEventListener('click', async () => {
        if (!selectedFiles.length) return;
        btn.disabled = true;
        status.style.display = 'block';
        status.innerHTML = `<span class="typing"><span></span><span></span><span></span></span> Uploading ${selectedFiles.length} file(s)…`;
        try {
          const r = await API.uploadDocument(selectedFiles);
          status.innerHTML = `<span class="badge proc">Success</span> ${r.message || selectedFiles.length + ' file(s) uploaded and queued for indexing.'}`;
          selectedFiles = []; fileInput.value = ''; renderList();
        } catch(e) {
          status.innerHTML = `<span class="badge failed">Error</span> Upload failed: ${e.message}`;
          btn.disabled = false;
        }
      });
    },

    settings() {
      document.querySelectorAll('.js-settheme').forEach(b=> b.addEventListener('click', ()=>{
        const t=b.dataset.t; localStorage.setItem(Theme.KEY,t); Theme.apply(t); render(current);
      }));
    }
  };

  function bindToasts(root=document){ root.querySelectorAll('.js-toast').forEach(b=>{ if(b._b)return; b._b=1; b.addEventListener('click',()=>toast(b.dataset.msg||'Done')); }); }
  function bindGo(root=document){ root.querySelectorAll('[data-go]').forEach(el=>{ if(el._g)return; el._g=1; el.addEventListener('click',()=>{ location.hash='#/'+el.dataset.go; }); }); }

  function showLogin(message = '') {
    document.body.innerHTML = `
      <main class="login-page">
        <div class="login-card">
          <div class="login-brand"><span class="mark">${MARK}</span><div><div class="brand-name serif">LEXAI</div><div class="brand-sub">Legal Assistant</div></div></div>
          <h1>Sign in to your dashboard</h1>
          <p>Access your legal intelligence workspace with a secure login.</p>
          <div id="loginMessage" class="login-message">${message}</div>
          <form id="loginForm" class="login-form">
            <label for="loginEmail">Email address</label>
            <input id="loginEmail" type="email" placeholder="user@lexai.io" required autocomplete="username">
            <label for="loginPassword">Password</label>
            <input id="loginPassword" type="password" placeholder="Enter password" required autocomplete="current-password">
            <button class="btn primary" type="submit">Continue</button>
          </form>
          <p class="hint">Demo credentials: <strong>user@lexai.io</strong> / <strong>lexai123</strong></p>
        </div>
      </main>`;

    const form = $('#loginForm');
    const email = $('#loginEmail');
    const password = $('#loginPassword');
    const msg = $('#loginMessage');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const success = AUTH.signIn(email.value.trim(), password.value.trim());
      if (success) {
        location.hash = '#/dashboard';
        render('dashboard');
      } else {
        msg.textContent = 'Invalid email or password. Use user@lexai.io / lexai123';
        msg.classList.add('error');
      }
    });
  }

  let appShellBooted = false;
  function ensureAppShell() { if (appShellBooted) return; appShellBooted = true; renderShell(); }

  /* ===================================================================
     Shell + Router
     =================================================================== */
  let current = 'dashboard';

  function renderShell() {
    const navHtml = NAV.map((n,i)=>`${i===8?'<div class="nav-sep"></div>':''}<button class="nav-item" data-route="${n.id}">${icon(n.icon,'ic')}<span>${n.label}</span></button>`).join('');
    document.body.innerHTML = `
      <div class="app" id="app">
        <div class="scrim" id="scrim"></div>
        <aside class="sidebar">
          <div class="brand"><span class="mark">${MARK}</span><div><div class="brand-name serif">LEXAI</div><div class="brand-sub">Legal Assistant</div></div></div>
          <nav class="nav">${navHtml}</nav>
          <div class="sidebar-foot"><button class="nav-item"><svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.5c0 1.5-2 2-2 3"/><circle cx="12" cy="17" r=".6" fill="currentColor"/></svg><span>Help &amp; Support</span></button></div>
        </aside>
        <div class="main">
          <header class="topbar">
            <button class="icon-btn hamburger" id="hamburger">${icon('list')}</button>
            <div class="searchbar">${icon('search')}<input placeholder="Search for case laws, acts, circulars, articles and more..." id="topSearch"></div>
            <div class="topbar-right">
              <button class="theme-toggle" id="themeToggle" title="Toggle theme">${icon('sun','sun')}${icon('moon','moon')}<span id="themeLabel">${Theme.get()==='dark'?'Dark':'Light'}</span></button>
              <button class="btn" id="logoutBtn" title="Logout">Logout</button>
              <button class="icon-btn">${icon('bell')}</button>
              <div class="avatar"><div class="pic">${D.user.initials}</div><div class="who"><b>${D.user.name}</b><span>${D.user.role}</span></div></div>
            </div>
          </header>
          <div id="outlet"></div>
        </div>
      </div>`;

    // Theme toggle
    $('#themeToggle').addEventListener('click', ()=>{ Theme.toggle(); $('#themeLabel').textContent = Theme.get()==='dark'?'Dark':'Light'; });
    // Logout
    $('#logoutBtn').addEventListener('click', ()=>{ location.hash = '#/logout'; });
    // Top search → search page
    $('#topSearch').addEventListener('keydown', e=>{ if(e.key==='Enter'){ location.hash='#/search'; } });
    // Mobile nav
    const app = $('#app');
    $('#hamburger').addEventListener('click', ()=> app.classList.toggle('nav-open'));
    $('#scrim').addEventListener('click', ()=> app.classList.remove('nav-open'));
    // Nav routing
    document.querySelectorAll('.nav-item[data-route]').forEach(b=> b.addEventListener('click', ()=>{ location.hash='#/'+b.dataset.route; app.classList.remove('nav-open'); }));
  }

  function render(route) {
    ensureAppShell();
    current = Views[route] ? route : 'dashboard';
    $('#outlet').innerHTML = Views[current]();
    document.querySelectorAll('.nav-item[data-route]').forEach(b=> b.classList.toggle('active', b.dataset.route===current));
    bindGo($('#outlet')); bindToasts($('#outlet'));
    if (Wire[current]) Wire[current]();
    document.querySelector('.main').scrollTop = 0; window.scrollTo(0,0);
  }

  function route() {
    if (!AUTH.check()) {
      showLogin();
      return;
    }
    const r = (location.hash.replace('#/','') || 'dashboard');
    if (r === 'logout') {
      AUTH.signOut();
      showLogin();
      return;
    }
    render(r);
  }

  let booted = false;
  function boot(){ if (booted) return; booted = true; if (!AUTH.check()) { showLogin(); return; } renderShell(); route(); }
  window.addEventListener('hashchange', route);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

/* =====================================================================
 * LEXAI — API / Integration Layer
 * ---------------------------------------------------------------------
 * Every view talks to the backend ONLY through this object. To go live,
 * fill in the URLs in config.js and set USE_MOCK:false — no view code
 * needs to change. Each method returns a Promise, mirroring real fetch.
 * ===================================================================== */
(function () {
  const cfg = window.LEXAI_CONFIG;
  const data = window.LEXAI_DATA;

  function headers(extra) {
    const h = { "Content-Type": "application/json", ...(extra || {}) };
    if (cfg.AUTH && cfg.AUTH.header && cfg.AUTH.value) h[cfg.AUTH.header] = cfg.AUTH.value;
    return h;
  }

  async function post(url, payload) {
    const res = await fetch(url, { method: "POST", headers: headers(), body: JSON.stringify(payload) });
    if (!res.ok) throw new Error("Request failed: " + res.status);
    return res.json();
  }
  async function get(url) {
    const res = await fetch(url, { method: "GET", headers: headers() });
    if (!res.ok) throw new Error("Request failed: " + res.status);
    return res.json();
  }
  function live(key) { return !cfg.USE_MOCK && cfg.ENDPOINTS[key]; }
  function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

  window.LexAPI = {
    /* ----- RAG AI CHAT -------------------------------------------------
     * LIVE  → POST { query, history, sessionId } to ENDPOINTS.chat
     * Expected response shape:
     *   { answer:string, sources:[{n,title}], confidence:number }
     * ------------------------------------------------------------------ */
    async chat(query, history) {
      if (live("chat")) {
        return post(cfg.ENDPOINTS.chat, {
          query, history: history || [], sessionId: cfg.CHAT.sessionId
        });
      }
      await delay(900); // simulate network/inference latency
      return data.demoChat;
    },

    /* ----- SEARCH ----------------------------------------------------- */
    async search(params) {
      if (live("search")) {
        const qs = new URLSearchParams(params).toString();
        return get(cfg.ENDPOINTS.search + "?" + qs);
      }
      await delay(250);
      const q = (params.q || "").toLowerCase();
      const results = q
        ? data.searchResults.filter(r =>
            (r.title + r.excerpt + r.tags.join(" ")).toLowerCase().includes(q))
        : data.searchResults;
      return { total: results.length || data.searchResults.length, results: results.length ? results : data.searchResults };
    },

    /* ----- DOCUMENT --------------------------------------------------- */
    async getDocument(id) {
      if (live("documentGet")) return get(cfg.ENDPOINTS.documentGet + "?id=" + encodeURIComponent(id));
      await delay(150); return data.document;
    },
    async summarizeDocument(id) {
      if (live("documentSummarize")) return post(cfg.ENDPOINTS.documentSummarize, { id });
      await delay(700);
      return { summary: "This Supreme Court judgment clarifies that the moratorium under Section 14 of the IBC protects the corporate debtor alone and does not extend to personal guarantors. Leave was granted and the appeal arose from a 2024 High Court order." };
    },
    async askDocument(id, question) {
      if (live("documentAsk")) return post(cfg.ENDPOINTS.documentAsk, { id, question });
      await delay(800);
      return { answer: "Based on this judgment, the Court held that the Section 14 moratorium applies only to the corporate debtor and not to a personal guarantor of that debtor.", sources: [{ n: 1, title: "Para 4 of the Judgment" }] };
    },

    /* ----- KNOWLEDGE BASE (admin) ------------------------------------- */
    async kbList() {
      if (live("kbList")) return get(cfg.ENDPOINTS.kbList);
      await delay(120); return { documents: data.knowledgeBase };
    },
    async kbUpload(files) {
      if (live("kbUpload")) {
        const fd = new FormData();
        [...files].forEach(f => fd.append("files", f));
        const h = {}; if (cfg.AUTH.header) h[cfg.AUTH.header] = cfg.AUTH.value;
        const res = await fetch(cfg.ENDPOINTS.kbUpload, { method: "POST", headers: h, body: fd });
        return res.json();
      }
      await delay(900);
      return { ok: true, queued: files ? files.length : 0, message: "Demo mode — upload simulated. Wire ENDPOINTS.kbUpload to a real n8n webhook to index documents." };
    },

    /* ----- DOCUMENT UPLOAD ------------------------------------------- */
    async uploadDocument(files) {
      const url = cfg.ENDPOINTS.docUpload;
      if (url) {
        const fd = new FormData();
        [...files].forEach(f => fd.append("file", f));
        const h = {}; if (cfg.AUTH.header && cfg.AUTH.value) h[cfg.AUTH.header] = cfg.AUTH.value;
        const res = await fetch(url, { method: "POST", headers: h, body: fd });
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json().catch(() => ({ ok: true, message: files.length + " file(s) uploaded successfully." }));
      }
      await delay(1200);
      return { ok: true, message: files.length + " file(s) queued for indexing." };
    },

    /* ----- LIBRARY ---------------------------------------------------- */
    async libraryList() {
      if (live("libraryList")) return get(cfg.ENDPOINTS.libraryList);
      await delay(100); return { items: data.library, folders: data.libraryFolders };
    }
  };
})();

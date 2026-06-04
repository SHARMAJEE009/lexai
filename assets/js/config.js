/* =====================================================================
 * LEXAI — Platform Configuration
 * ---------------------------------------------------------------------
 * This is the SINGLE place to wire the demo up to your real backend.
 * Nothing else in the app hard-codes a URL. Point these at your n8n
 * webhooks / API gateway and flip USE_MOCK to false when ready.
 * ===================================================================== */
window.LEXAI_CONFIG = {
  /* When true, the app serves static demo data (assets/js/data.js).
     Set to false once your endpoints below are live.                  */
  USE_MOCK: false,

  /* Base URL for your API gateway / backend (optional convenience).   */
  API_BASE: "",

  /* ------------------------------------------------------------------
   * n8n WEBHOOKS / API ENDPOINTS
   * Replace each value with your production webhook URL, e.g.
   *   "https://your-n8n.host/webhook/lexai-chat"
   * The api.js layer POSTs/GETs to these and falls back to mock data
   * whenever a URL is empty or USE_MOCK is true.
   * ------------------------------------------------------------------ */
  ENDPOINTS: {
    // RAG AI Chat — receives { query, history, sessionId } → returns
    // { answer, sources:[...], confidence }
    chat:          "https://n8n.srv982383.hstgr.cloud/webhook/90c2a5fc-01eb-40b8-a537-2898a3e255dd/chat",
    chatStream:    "",   // optional SSE/stream endpoint for token streaming

    // Search across case laws / circulars / acts / articles
    search:        "",   // GET ?q=&category=&from=&to=

    // Document operations
    documentGet:   "",   // GET ?id=
    documentSummarize: "", // POST { id } → { summary }
    documentAsk:   "",   // POST { id, question } → { answer, sources }

    // Document upload — send files to RAG indexing pipeline
    docUpload:     "https://n8n.srv982383.hstgr.cloud/webhook/rag_legal_lexai_indian_corporate_affairs_vector",

    // Knowledge base (admin) — upload / index management
    kbList:        "",   // GET document list
    kbUpload:      "",   // POST multipart upload → triggers indexing

    // Saved library
    libraryList:   "",   // GET saved items
    librarySave:   ""    // POST save an item
  },

  /* Optional auth header injected into every request. */
  AUTH: {
    header: "",          // e.g. "Authorization"
    value: ""            // e.g. "Bearer <token>"
  },

  /* RAG chat behaviour */
  CHAT: {
    streaming: false,    // set true once chatStream endpoint supports SSE
    sessionId: "6a1d0293-792c-8322-bb9e-6a9a4dad5866"
  }
};

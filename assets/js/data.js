/* =====================================================================
 * LEXAI — Demo Data (static)
 * All numbers/content here are placeholders. When USE_MOCK is false in
 * config.js, api.js fetches live data instead of reading this file.
 * ===================================================================== */
window.LEXAI_DATA = {
  user: { name: "John Doe", role: "Senior Associate", initials: "JD" },

  stats: [
    { label: "Documents Indexed", value: "12,480", delta: "+312 this month" },
    { label: "AI Queries Answered", value: "3,920", delta: "+8.4%" },
    { label: "Saved Items", value: "57", delta: "across 9 folders" },
    { label: "Avg. Confidence", value: "92%", delta: "last 30 days" }
  ],

  quickAccess: [
    { id: "chat",    icon: "spark",   title: "Ask Legal AI",            desc: "Get AI-powered legal answers" },
    { id: "search",  icon: "search",  title: "Search Case Laws",        desc: "Search judgments across courts" },
    { id: "circulars",icon: "bell",   title: "Circulars & Notifications",desc: "Latest circulars from govt. bodies" },
    { id: "articles",icon: "doc",     title: "Articles",                desc: "Read legal articles & insights" },
    { id: "queries", icon: "help",    title: "Legal Queries",           desc: "Expert answers to your queries" },
    { id: "library", icon: "save",    title: "Saved Documents",         desc: "Your saved items and notes" }
  ],

  updates: [
    { tag: "MCA",  title: "MCA extends deadline for filing AOC-4 and MGT-7", source: "Ministry of Corporate Affairs", date: "20 May 2024" },
    { tag: "SEBI", title: "SEBI issues circular on Cybersecurity and Cyber Resilience Framework", source: "SEBI", date: "18 May 2024" },
    { tag: "RBI",  title: "RBI issues guidelines on Foreign Investment in India", source: "Reserve Bank of India", date: "17 May 2024" },
    { tag: "NCLT", title: "NCLT clarifies provisions under Section 60(5) of IBC", source: "NCLT", date: "16 May 2024" }
  ],

  recent: [
    { title: "State Bank of India vs. V. Ramakrishnan", meta: "Supreme Court · 20 May 2024", type: "Case Law" },
    { title: "SEBI Circular on Insider Trading Regulations", meta: "SEBI · 14 May 2024", type: "Circular" },
    { title: "Companies Act, 2013 — Section 185", meta: "Act · 12 May 2024", type: "Act & Rule" },
    { title: "NCLT Mumbai Order in Reliance Case", meta: "NCLT Mumbai · 10 May 2024", type: "Case Law" }
  ],

  trending: ["IBC (Insolvency Law)", "FEMA Compliance", "Related Party Transactions", "Oppression & Mismanagement", "SEBI LODR", "Competition Law"],

  searchResults: [
    { title: "State Bank of India vs. V. Ramakrishnan", court: "Supreme Court", date: "20 May 2024", type: "Case Law",
      excerpt: "The judgment deals with the interpretation of Section 138 of the Negotiable Instruments Act regarding cheque dishonour and liability of the drawer.",
      tags: ["Negotiable Instruments Act", "Section 138", "Cheque Bounce"] },
    { title: "SEBI Circular on Cybersecurity and Cyber Resilience Framework", court: "SEBI", date: "18 May 2024", type: "Circular",
      excerpt: "SEBI issues a circular on the Cybersecurity and Cyber Resilience Framework (CSCRF) for SEBI Registered Intermediaries and Market Infrastructure Institutions.",
      tags: ["SEBI", "Cybersecurity", "Circular"] },
    { title: "Companies Act, 2013 — Section 185", court: "Ministry of Corporate Affairs", date: "12 May 2024", type: "Act & Rule",
      excerpt: "Provision related to loans to directors and related parties and conditions applicable under the Companies Act, 2013.",
      tags: ["Companies Act, 2013", "Section 185", "Related Party Transaction"] },
    { title: "NCLT Mumbai Order in Reliance Case", court: "NCLT Mumbai", date: "10 May 2024", type: "Case Law",
      excerpt: "Order concerning scheme of arrangement and amalgamation under Sections 230-232 of the Companies Act, 2013.",
      tags: ["NCLT", "Amalgamation", "Section 230"] },
    { title: "RBI Master Direction on FEMA", court: "Reserve Bank of India", date: "08 May 2024", type: "Circular",
      excerpt: "Consolidated master direction governing foreign exchange transactions and reporting requirements for inward remittances.",
      tags: ["RBI", "FEMA", "Master Direction"] }
  ],

  filters: {
    "Law Category": ["All", "Corporate Law", "Criminal Law", "Tax Law", "Securities Law", "IBC"],
    "Authority / Regulator": ["All", "Supreme Court", "High Court", "SEBI", "RBI", "MCA", "NCLT"],
    "Document Type": ["All", "Case Law", "Circular", "Act & Rule", "Article", "Query"]
  },

  library: [
    { name: "What are the compliance requirements...", type: "Chat",      tags: "Compliance, Company Law", date: "20 May 2024" },
    { name: "State Bank of India vs. V. Ramakrishnan", type: "Case Law",   tags: "Act, Section 138",       date: "20 May 2024" },
    { name: "SEBI Circular on Insider Trading...",      type: "Circular",   tags: "SEBI, Cybersecurity",   date: "18 May 2024" },
    { name: "Companies Act, 2013 — Section 185",        type: "Act & Rule", tags: "Companies Act, 185",     date: "12 May 2024" },
    { name: "NCLT Mumbai Order in Reliance Case",       type: "Case Law",   tags: "NCLT, IBC",             date: "10 May 2024" },
    { name: "FEMA rules for outward remittance",        type: "Chat",       tags: "FEMA, RBI",             date: "09 May 2024" }
  ],

  libraryFolders: [
    { name: "Compliance", count: 12 }, { name: "IBC Matters", count: 8 },
    { name: "SEBI Regulations", count: 16 }, { name: "FEMA", count: 10 },
    { name: "Important Judgments", count: 20 }, { name: "Tax Matters", count: 7 },
    { name: "General", count: 5 }
  ],

  knowledgeBase: [
    { name: "MCA Circular on AGM Extension.pdf", category: "Circular",    source: "MCA",  by: "Admin", date: "20 May 2024", status: "Processed" },
    { name: "SEBI (LODR) Amendment Regulations.pdf", category: "Regulation", source: "SEBI", by: "Admin", date: "18 May 2024", status: "Processed" },
    { name: "RBI Master Direction on FEMA.pdf", category: "Master Direction", source: "RBI", by: "Admin", date: "17 May 2024", status: "Processed" },
    { name: "NCLT Mumbai Order in Reliance Case.pdf", category: "Case Law", source: "NCLT", by: "Admin", date: "16 May 2024", status: "Processed" },
    { name: "Companies Act, 2013.pdf", category: "Act", source: "MCA", by: "Admin", date: "15 May 2024", status: "Processed" },
    { name: "Competition Act, 2002.pdf", category: "Act", source: "MCA", by: "Admin", date: "14 May 2024", status: "Processing" },
    { name: "IBBI (Insolvency Resolution) Regulations.pdf", category: "Regulation", source: "IBBI", by: "Admin", date: "12 May 2024", status: "Failed" }
  ],

  articles: [
    { title: "Decoding Related Party Transactions under the Companies Act", author: "Adv. R. Mehta", read: "6 min read", cat: "Corporate Law" },
    { title: "The Evolving Landscape of Insider Trading Regulations", author: "CS Priya Nair", read: "8 min read", cat: "Securities Law" },
    { title: "Cross-Border Insolvency: A Practical Guide under the IBC", author: "Adv. S. Kapoor", read: "10 min read", cat: "IBC" },
    { title: "FEMA Compliance for Startups Raising Foreign Capital", author: "CA Arjun Rao", read: "7 min read", cat: "FEMA" }
  ],

  queries: [
    { q: "Can a private company give loans to its directors?", status: "Answered", answers: 3, cat: "Company Law" },
    { q: "What is the threshold for related party transactions requiring approval?", status: "Answered", answers: 5, cat: "Corporate Law" },
    { q: "Is GST applicable on director's remuneration?", status: "Open", answers: 1, cat: "Tax Law" },
    { q: "Procedure for voluntary liquidation under IBC?", status: "Answered", answers: 4, cat: "IBC" }
  ],

  /* The judgment text shown in the Document Detail view */
  document: {
    title: "State Bank of India vs. V. Ramakrishnan",
    court: "Supreme Court", date: "20 May 2024", citation: "Civil Appeal No. 1234 of 2024",
    body: [
      "IN THE SUPREME COURT OF INDIA",
      "(CIVIL APPELLATE JURISDICTION)",
      "CIVIL APPEAL NO. 1234 OF 2024",
      "STATE BANK OF INDIA … Appellant",
      "Versus",
      "V. RAMAKRISHNAN … Respondent",
      "J U D G M E N T",
      "1. Leave granted.",
      "2. The present appeal arises from the judgment dated 10.01.2024 passed by the High Court of Madras in Writ Petition No. 5678 of 2023, whereby the High Court allowed the petition filed by the respondent.",
      "3. The short question that falls for consideration in this appeal is whether the moratorium provided for under Section 14 of the Insolvency and Bankruptcy Code, 2016 would apply to a personal guarantor of a corporate debtor.",
      "4. Having heard learned counsel for the parties and perused the material on record, we are of the considered view that the protection of the moratorium under Section 14 is regarding the corporate debtor alone."
    ]
  },

  /* Canned RAG response used in demo mode */
  demoChat: {
    answer: "A Private Limited Company in India must comply with the following key requirements under the Companies Act, 2013 and applicable rules:\n\n1. Registration & Incorporation — Obtain Certificate of Incorporation from the ROC.\n2. Statutory Registers — Maintain registers as per Section 88 of the Companies Act.\n3. Board Meetings — A minimum of 4 board meetings in a year, with a gap not exceeding 120 days.\n4. Annual General Meeting — Must be held within 6 months from the end of the financial year.\n5. Financial Statements — Prepare and approve financial statements under Section 129.\n6. Annual Filings — File AOC-4 and MGT-7 with the ROC.\n7. Appointment of Auditor — Mandatory auditor appointment under Section 139.\n8. Compliance with Tax Laws — TDS, GST, Income Tax and other applicable laws.",
    sources: [
      { n: 1, title: "Companies Act, 2013 — Sections 88, 129, 139" },
      { n: 2, title: "MCA General Circular No. 08/2020" },
      { n: 3, title: "ROC Compliance Requirements FAQs" },
      { n: 4, title: "Companies Act, 2013 — Compliance Guide" }
    ],
    confidence: 92
  },

  suggestedPrompts: [
    "Compliance for a Private Limited Company",
    "Role of an Independent Director",
    "FEMA rules for outward remittance",
    "Section 185 explained"
  ]
};

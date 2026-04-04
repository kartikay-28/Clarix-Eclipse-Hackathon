# ⚡ Clarix
### AI-Powered Enterprise Knowledge Retrieval System

> *Because the answers were always there — they just had no voice.*

---

## 🔴 The Problem

Picture this — it's Monday morning. A new employee at a 500-person company asks:
*"What's our leave policy for medical emergencies?"*

Their manager doesn't know. HR is busy. The document exists — buried inside a PDF uploaded two years ago, sitting in a shared drive nobody remembers. Three Slack messages, two forwarded emails, and 40 minutes later — they have an answer that was always there.

**This is the daily reality of enterprise knowledge management.**

Organizations generate thousands of documents — policies, technical guides, SOPs, reports. But knowledge stays locked inside files nobody can efficiently search. Employees waste hours hunting for information that already exists. Productivity bleeds out quietly, every single day.

---

## ✅ Our Solution — Clarix

Clarix is a **multi-tenant AI knowledge retrieval system** that lets employees ask questions in plain English and get instant, cited answers — pulled exclusively from their organization's own documents.

No hallucinations. No internet. No guessing. Just your data, made searchable.

**The same Monday morning scenario with Clarix:**
> *Employee types: "What's our leave policy for medical emergencies?"*
> *Clarix responds in 3 seconds with the exact policy + source document citation.*

---

## 🏗️ Architecture

```
  Employee asks a question
        ↓
  JWT Auth validates identity + extracts org_id
        ↓
  Question converted to vector embedding
        ↓
  ChromaDB searched — filtered strictly by org_id
        ↓
  Top 5 relevant document chunks retrieved
        ↓
  Gemini 1.5 Flash answers using ONLY those chunks
        ↓
  Answer returned with source citations
```

**Multi-Tenant Isolation** — every organization's data lives in its own ChromaDB collection. An employee of Org A can never access Org B's documents, even if they know the document ID. The `org_id` is extracted from the JWT token server-side — never trusted from the request body.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS, shadcn/ui |
| Backend | Python FastAPI, Uvicorn |
| Database | PostgreSQL + SQLAlchemy |
| Auth | JWT (python-jose) + bcrypt |
| AI / LLM | Google Gemini 1.5 Flash |
| Embeddings | Sentence-transformers (all-MiniLM-L6-v2) |
| Vector DB | ChromaDB (persistent, per-org) |
| RAG Pipeline | LangChain |
| File Parsing | PyMuPDF, python-docx, pandas |

---

## 🚀 Getting Started

```bash
# 1. Start PostgreSQL
pg_ctl start

# 2. Start backend
cd backend && uvicorn main:app --reload

# 3. Start frontend
cd frontend && npm run dev
```

Set your environment variables in `backend/.env` — see `.env.example` for reference.

---

## 🧠 Why We Built This
 
We watched smart people waste their smartest hours searching for things that already existed. That felt wrong. So we fixed it.

---

<br/>

> *"The answers were never missing — they were just unheard. We didn't build a search engine. We built a way to finally listen to what your organization already knows."*
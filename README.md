<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=38&duration=3000&pause=1000&color=E8664F&center=true&vCenter=true&width=600&lines=CardioScan.ai;AI-Powered+Heart+Risk+Assessment;Explainable+%E2%80%A2+Scoped+%E2%80%A2+Full-Stack" alt="Typing SVG" />

<p align="center">
  <b>Estimate cardiovascular risk from a clinical assessment or a lab report — with a plain-language explanation, not just a number.</b>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/status-active-brightgreen?style=for-the-badge" alt="status" />
  <img src="https://img.shields.io/badge/license-academic%2Fportfolio-blueviolet?style=for-the-badge" alt="license" />
  <img src="https://img.shields.io/badge/model%20accuracy-83.6%25-0F4C4C?style=for-the-badge" alt="accuracy" />
</p>

<p align="center">
  <a href="#-features"><img src="https://img.shields.io/badge/✨_Features-E8664F?style=for-the-badge&logoColor=white" /></a>
  <a href="#-getting-started"><img src="https://img.shields.io/badge/🚀_Get_Started-0F4C4C?style=for-the-badge&logoColor=white" /></a>
  <a href="#-api-reference"><img src="https://img.shields.io/badge/🔌_API_Docs-17635F?style=for-the-badge&logoColor=white" /></a>
  <a href="https://github.com/zehranisar/CardioScan.ai/issues"><img src="https://img.shields.io/badge/🐛_Report_Bug-D9A441?style=for-the-badge&logoColor=white" /></a>
  <a href="https://github.com/zehranisar/CardioScan.ai/issues"><img src="https://img.shields.io/badge/💡_Request_Feature-D9A441?style=for-the-badge&logoColor=white" /></a>
</p>

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <br/>
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white" />
  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" />
  <br/>
  <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" />
  <img src="https://img.shields.io/badge/Brevo_SMTP-0B996E?style=for-the-badge" />
</p>

</div>

<br/>

> ⚠️ **Not a medical device.** This is a portfolio and academic project. Predictions are statistical estimates from a model trained on a public research dataset — not a clinical diagnosis. Always consult a doctor for real health decisions.

<br/>

## 📋 Table of contents

- [✨ Features](#-features)
- [🧠 Architecture](#-architecture)
- [🛠️ Tech stack](#️-tech-stack)
- [📁 Project structure](#-project-structure)
- [🚀 Getting started](#-getting-started)
- [🔌 API reference](#-api-reference)
- [📊 Model performance](#-model-performance)
- [🗺️ Status](#️-status)
- [👤 Author](#-author)

<br/>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**🩺 Assessment & prediction**
- Multi-step form covering 13 clinical markers
- Random Forest classifier — **83.6% accuracy / 0.915 ROC-AUC**
- Custom perturbation-based explainability — no black-box output
- PDF report export, ready to bring to a doctor

</td>
<td width="50%" valign="top">

**🤖 AI integration**
- OCR auto-fill — photograph a lab report or ECG printout and let Gemini Vision read it
- Scoped Gemini assistant — answers heart-health questions only, with full context of your result

</td>
</tr>
<tr>
<td width="50%" valign="top">

**🔐 Accounts & data**
- Full auth: sign up, sign in, email OTP, forgot/reset password
- Entire app is auth-gated — nothing is visible without an account
- Row-Level-Security-protected history, stored in Supabase

</td>
<td width="50%" valign="top">

**📈 Dashboard**
- Full assessment history with a risk-over-time trend chart
- Side-by-side comparison of any two assessments
- Delete individual records
- Fully responsive, down to mobile widths

</td>
</tr>
</table>

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 🧠 Architecture

```mermaid
graph TD
    A[React + TypeScript Frontend] -->|POST /predict| B[FastAPI Backend]
    A -->|POST /ocr/extract| B
    A -->|POST /chat| B
    A -->|Auth, DB read/write| D[(Supabase<br/>Postgres + Auth)]

    B --> C[Random Forest Model<br/>scikit-learn]
    C --> E[Custom Explainability<br/>perturbation-based attribution]
    B -->|Vision extraction| F[Gemini API<br/>OCR]
    B -->|Scoped chat| G[Gemini API<br/>Assistant]

    E --> B
    F --> B
    G --> B
    B -->|Risk score + factors| A
```

**Assessment flow:**

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant B as Backend
    participant M as ML Model
    participant S as Supabase

    U->>F: Fill form (or upload report via OCR)
    F->>B: POST /predict
    B->>M: Run inference + explainability
    M-->>B: risk %, label, top factors
    B-->>F: JSON response
    F->>S: Save assessment (if logged in)
    F-->>U: Results page (gauge, factors, PDF export, chat)
```

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 🛠️ Tech stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, React Router |
| Backend | FastAPI (Python) |
| Machine learning | scikit-learn (Random Forest), pandas, numpy |
| Explainability | Custom perturbation-based feature attribution |
| AI integration | Google Gemini API — vision extraction (OCR) and scoped chat |
| Auth & database | Supabase (PostgreSQL + Auth, Row Level Security) |
| Email delivery | Brevo (SMTP) |
| PDF generation | jsPDF (client-side) |
| Charts | Recharts |

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 📁 Project structure

```
CardioScan.ai/
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, ChatPanel, ReportUpload, modals, etc.
│   │   ├── pages/           # Landing, Assessment, Results, Dashboard, Auth pages
│   │   ├── context/         # AuthContext
│   │   └── lib/              # API clients, Supabase client, PDF generator
│   └── package.json
├── backend/
│   ├── app/
│   │   ├── ml/                # train.py, predict.py, model.pkl, dataset
│   │   ├── ocr/               # Gemini Vision extraction logic
│   │   ├── chat/              # Gemini chat logic with scoped system prompt
│   │   ├── routers/          # /predict, /ocr/extract, /chat endpoints
│   │   └── schemas/          # Pydantic request/response models
│   ├── main.py
│   ├── requirements.txt
│   └── supabase_migration.sql
└── README.md
```

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 🚀 Getting started

### Prerequisites
- Node.js 18+
- Python 3.11+
- A [Supabase](https://supabase.com) project
- A [Google Gemini API key](https://aistudio.google.com/apikey)

### Backend setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:
```env
GEMINI_API_KEY=your_gemini_api_key
```

Train the model (already included, but re-runnable):
```bash
python -m app.ml.train
```

Start the server:
```bash
uvicorn main:app --reload --port 8000
```

### Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_publishable_key
```

Run `backend/supabase_migration.sql` via the Supabase SQL Editor to create the `assessments` table.

Start the dev server:
```bash
npm run dev
```

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 🔌 API reference

| Endpoint | Method | Description |
|---|---|---|
| `/predict` | `POST` | Takes 13 clinical inputs, returns risk probability, label, and top contributing factors |
| `/ocr/extract` | `POST` | Accepts an image/PDF of a lab report, returns extracted clinical values |
| `/chat` | `POST` | Sends a message (with optional result context) to the scoped health assistant |
| `/health` | `GET` | Health check |

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 📊 Model performance

Trained on the UCI Cleveland Heart Disease dataset (303 samples, 13 features):

<div align="center">

| Metric | Score |
|:---:|:---:|
| **Accuracy** | 83.6% |
| **ROC-AUC** | 0.915 |

</div>

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 🗺️ Status

- ✅ Core prediction pipeline, explainability, OCR, and chatbot
- ✅ Authentication, dashboard, PDF export
- ⏳ Production deployment — in progress

<div align="right"><a href="#-table-of-contents">↑ back to top</a></div>

<br/>

## 👤 Author

<div align="center">

**Zehra Nisar**
Computer Science student & full-stack developer

<a href="https://github.com/zehranisar"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /></a>

</div>

<br/>

<div align="center">

*This project is for academic and portfolio purposes.*

</div>

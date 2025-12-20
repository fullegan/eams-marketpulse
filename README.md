
# eAMS Marketpulse

![Build Status](https://github.corp.ebay.com/ngeoghegan/eams-marketpulse/actions/workflows/main.yml/badge.svg?branch=develop&event=push)
![Gemini AI](https://img.shields.io/badge/Gemini_2.5_Flash-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)

**eAMS Marketpulse** is a real-time market intelligence dashboard designed for eBay Advertising Managed Services. It uses Google's Gemini Generative AI to produce instant, localized market reports for specific e-commerce verticals (e.g., "Home & Garden", "Electronics") across multiple global markets.

## 1. Project Overview

* **Goal:** Empower sellers with actionable insights on trends, seasonality, and buyer behavior.
* **Key Feature:** Generates reports on-demand using the **Gemini 2.5 Flash** model, grounded with real-time Google Search data.
* **Architecture:** Single Page Application (SPA) with **Zero Backend**. All logic runs in the browser.
* **Localization:** Fully localized UI and AI Report structure for **UK, US, DE, FR, IT, and AU**.

## 2. Technology Stack

* **Framework:** [React 18](https://react.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN)
* **AI Engine:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
* **Hosting:** [Vercel](https://vercel.com/)

---

## 3. Architecture: Single Codebase, Global Deployment

This project uses a **"Build-Time Configuration"** strategy. You do not need different code branches for different countries. Instead, the application changes its language and context based on an Environment Variable set in the cloud.

### Supported Markets
* **UK** (United Kingdom) - Default
* **US** (United States)
* **DE** (Germany)
* **FR** (France)
* **IT** (Italy)
* **AU** (Australia)

### How Localization Works
1. **Environment Variable:** The build system looks for `VITE_MARKET_CODE`.
2. **Config Loader (`config.ts`):** Sets the active market based on that code.
3. **Dictionary (`constants.ts`):** Loads the correct "Translation Pack" (UI labels, Verticals, and Report Headings).
4. **AI Service (`geminiService.ts`):** Injects translated Report Headings into the AI Prompt, ensuring the AI writes the report structure in the native language.

---

## 4. Key Files & Structure

| File | Purpose | When to Edit |
| :--- | :--- | :--- |
| `src/config.ts` | Market Definitions & Env Var logic. | To add a new country (e.g., Spain). |
| `src/constants.ts` | **The Translation Database.** | To fix a typo in the UI or add a new Vertical. |
| `src/services/geminiService.ts` | **The AI Brain.** Handles Prompt Engineering. | To change the *tone* or *content* of the report. |
| `src/components/ContentDisplay.tsx` | Main Report View. | To change the visual layout of the report. |
| `src/components/Sidebar.tsx` | Navigation Menu. | To change the logo or menu styling. |
| `vite.config.ts` | Build Configuration. | To debug deployment issues via Diagnostic Mode. |

---

## 5. Local Development

To run this project on your machine, ensure you have **Node.js (v18+)** installed.

1. **Clone & Install:**
   ```bash
   git clone [https://github.corp.ebay.com/ngeoghegan/eams-marketpulse.git](https://github.corp.ebay.com/ngeoghegan/eams-marketpulse.git)
   cd eams-marketpulse
   npm install

2. Environment Setup: Create a .env.local file and add your VITE_API_KEY.

3. Run: npm run dev
   
## 6. Deployment Guide (Vercel)

To deploy specific country versions, create separate **Projects** in Vercel connected to the **Same GitHub Repository**.

### Step 1: Push Code
Push your latest code to the `main` branch on the eBay GitHub.

### Step 2: Configure Environment Variables
For **each** project, go to **Settings > Environment Variables** and add:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_KEY` | `AIza...` | Your Google Gemini API Key. |
| `VITE_MARKET_CODE` | `UK` | **Crucial.** Change this to match the project region (e.g., US, DE). |

### Step 3: Deploy
Click **Deploy**. Vercel will build the app, bake in the settings for that specific market code, and launch it.

---

## 7. Contributing

We welcome contributions from the eAMS team! To maintain stability, please follow these steps:

1. **Fork the Repo:** Create your own branch from `main`.
2. **Code Standards:** Ensure all new features are fully typed with **TypeScript**.
3. **Local Testing:** Run `npm run dev` and verify UI for all markets before submitting.
4. **Pull Requests:** Submit a PR with a description of changes for maintainer review.

---

## 8. Troubleshooting

### "The generative AI API is disabled for this Google Cloud Project"
* **Cause:** The API Key belongs to a project where the Gemini API is not enabled.
* **Fix:** Ask IT to enable the "Generative Language API" in the Google Cloud Console.

### "CRITICAL: No API Key found"
* **Cause:** The Environment Variable is missing in Vercel.
* **Fix:** Check Settings > Environment Variables. Ensure `VITE_API_KEY` is added for **Production**.

### Logs say "TARGET PROJECT: Unknown"
* **Cause:** You might be looking at logs for the wrong project.
* **Fix:** Check `vite.config.ts` logs in Vercel to ensure the name matches your region.

---
© 2025 eBay Advertising Managed Services (eAMS)  
"Last updated: [19/12/2026:18:18]"
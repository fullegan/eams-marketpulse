# eAMS Marketpulse

**eAMS Marketpulse** is a real-time market intelligence dashboard designed for eBay Advertising Managed Services. It uses Google's Gemini Generative AI to produce instant, localized market reports for specific e-commerce verticals (e.g., "Home & Garden", "Electronics") across multiple global markets.

## 1. Project Overview

*   **Goal:** Empower sellers with actionable insights on trends, seasonality, and buyer behavior.
*   **Key Feature:** Generates reports on-demand using the **Gemini 2.5 Flash** model, grounded with real-time Google Search data.
*   **Architecture:** Single Page Application (SPA) with **Zero Backend**. All logic runs in the browser.
*   **Localization:** Fully localized UI and AI Report structure for **UK, US, DE, FR, IT, and AU**.

## 2. Technology Stack

*   **Framework:** [React 18](https://react.dev/)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Build Tool:** [Vite](https://vitejs.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN)
*   **AI Engine:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
*   **Hosting:** [Vercel](https://vercel.com/)

---

## 3. Architecture: Single Codebase, Global Deployment

This project uses a **"Build-Time Configuration"** strategy. You do not need different code branches for different countries. Instead, the application changes its language and context based on an Environment Variable set in the cloud.

### Supported Markets
*   **UK** (United Kingdom) - Default
*   **US** (United States)
*   **DE** (Germany)
*   **FR** (France)
*   **IT** (Italy)
*   **AU** (Australia)

### How Localization Works
1.  **Environment Variable:** The build system looks for `VITE_MARKET_CODE`.
2.  **Config Loader (`config.ts`):** Sets the active market based on that code.
3.  **Dictionary (`constants.ts`):** Loads the correct "Translation Pack" (UI labels, Verticals, and Report Headings).
4.  **AI Service (`geminiService.ts`):** Injects the translated Report Headings into the AI Prompt, ensuring the AI writes the report structure in the native language.

---

## 4. Key Files & Structure

| File | Purpose | **When to Edit** |
| :--- | :--- | :--- |
| `src/config.ts` | Market Definitions & Env Var logic. | To add a new country (e.g., Spain). |
| `src/constants.ts` | **The Translation Database.** Contains lists of verticals and UI strings for all languages. | To fix a typo in the UI or add a new Vertical category. |
| `src/services/geminiService.ts` | **The AI Brain.** Handles API calls and Prompt Engineering. | To change the *tone* or *content* of the report. |
| `src/components/ContentDisplay.tsx` | Main Report View. | To change the visual layout of the report. |
| `src/components/Sidebar.tsx` | Navigation Menu. | To change the logo or menu styling. |
| `vite.config.ts` | Build Configuration. | Includes "Diagnostic Mode" to debug deployment issues. |

---

## 5. Deployment Guide (Vercel)

To deploy specific country versions, create separate **Projects** in Vercel connected to the **Same GitHub Repository**.

### Step 1: Push Code
Push your latest code to the `main` branch on GitHub.

### Step 2: Create Projects (Recommended Naming)
Create a separate project for each region you wish to support:

1.  **`eams-marketpulse-uk`** (Default/English)
2.  **`eams-marketpulse-us`** (USA)
3.  **`eams-marketpulse-de`** (Germany)
4.  etc...

### Step 3: Configure Environment Variables
For **each** project, go to **Settings > Environment Variables** and add:

| Variable Name | Value | Description |
| :--- | :--- | :--- |
| `VITE_API_KEY` | `AIza...` | Your Google Gemini API Key. |
| `VITE_MARKET_CODE` | `UK` | **Crucial.** Change this code (UK, US, DE, FR, IT, AU) to match the project region. |

### Step 4: Deploy
Click **Deploy**. Vercel will build the app, bake in the settings for that specific market code, and launch it.

---

## 6. Maintenance & Updates

### Changing the API Key
If you need to switch from a personal key to an Enterprise key:
1.  Go to the Vercel Project Settings > Environment Variables.
2.  Edit `VITE_API_KEY` (or `API_KEY`).
3.  Paste the new key.
4.  Go to **Deployments** -> **Redeploy**.

### Adding a New Vertical
1.  Open `src/constants.ts`.
2.  Add the translated name to the `verticals` array inside **EACH** language object (`TRANSLATIONS_DE`, `TRANSLATIONS_FR`, etc.).
3.  Push to GitHub. All regional apps will update automatically upon rebuild.

---

## 7. Troubleshooting

### "The generative AI API is disabled for this Google Cloud Project"
*   **Cause:** The API Key being used belongs to a Google Cloud Project (usually an Enterprise/Work account) where the Gemini API has not been enabled.
*   **Fix:** Use a key from a Personal Google Account or ask IT to enable the "Generative Language API" in the Google Cloud Console.

### "CRITICAL: No API Key found"
*   **Cause:** The Environment Variable is missing in Vercel.
*   **Fix:** Check Settings > Environment Variables. Ensure `VITE_API_KEY` is added and checked for **Production**, **Preview**, and **Development**.

### UI is English, but Report is German
*   **Cause:** `VITE_MARKET_CODE` is set correctly, but the browser has cached the old English UI.
*   **Fix:** Perform a Hard Refresh (Ctrl+F5) or clear browser cache.

### Logs say "TARGET PROJECT: Unknown"
*   **Cause:** You might be looking at the logs for the wrong Vercel project.
*   **Fix:** Check `vite.config.ts` logs in Vercel. Ensure the `TARGET PROJECT NAME` matches the specific region you are trying to debug.
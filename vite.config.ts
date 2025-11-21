import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // AGGRESSIVE SEARCH: Check Vercel system variables (process.env) AND loaded .env files.
  // This prioritizes system variables set in the Vercel UI.
  const apiKey = process.env.API_KEY || process.env.VITE_API_KEY || env.API_KEY || env.VITE_API_KEY;

  if (apiKey) {
     console.log("Build: API Key detected and injected successfully.");
  } else {
     console.warn("Build: WARNING - No API Key detected in environment variables.");
  }

  return {
    plugins: [react()],
    define: {
      // This "bakes" the key into the code at build time.
      // It ensures import.meta.env.VITE_API_KEY always has a value (or empty string)
      // preventing "undefined" errors in the browser.
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey || ''),
    },
  };
});
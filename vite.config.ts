import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Robustly check for the key in various common formats.
  // This allows the app to work whether you named it VITE_API_KEY or just API_KEY in Vercel.
  const apiKey = env.VITE_API_KEY || env.API_KEY;

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
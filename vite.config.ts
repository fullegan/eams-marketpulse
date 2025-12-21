
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  // Check all possible locations for the key.
  const apiKey = process.env.API_KEY || process.env.VITE_API_KEY || env.API_KEY || env.VITE_API_KEY || '';
  
  // Check for Market Code (defaults to UK)
  const marketCode = process.env.VITE_MARKET_CODE || env.VITE_MARKET_CODE || 'UK';

  // --- DIAGNOSTIC LOGGING START ---
  console.log("\n========================================================");
  console.log("eAMS DIAGNOSTIC BUILD LOG");
  console.log("========================================================");
  console.log(`TARGET ENVIRONMENT:  ${process.env.VERCEL_ENV || "local"}`);
  console.log(`TARGET MARKET CODE:  ${marketCode}`);
  
  if (apiKey) {
     const maskedKey = apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 4);
     console.log(`✅ SUCCESS: API Key found (${maskedKey})`);
  } else {
     console.error("❌ CRITICAL FAILURE: No API Key found.");
  }
  console.log("========================================================\n");
  // --- DIAGNOSTIC LOGGING END ---

  return {
    plugins: [react()],
    define: {
      // This is the critical fix for the blank page in local dev
      'process.env.API_KEY': JSON.stringify(apiKey),
      'process.env.VITE_MARKET_CODE': JSON.stringify(marketCode),
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey),
      'import.meta.env.VITE_MARKET_CODE': JSON.stringify(marketCode),
    },
  };
});

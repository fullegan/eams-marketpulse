import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Check all possible locations for the key
  const apiKey = process.env.API_KEY || process.env.VITE_API_KEY || env.API_KEY || env.VITE_API_KEY;

  // Detailed Logging for Vercel Build Logs
  console.log("------------------------------------------------");
  console.log("eAMS Build Config:");
  if (apiKey) {
     const maskedKey = apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 4);
     console.log(`✅ SUCCESS: API Key found! (${maskedKey})`);
     
     if (process.env.API_KEY) console.log("   - Source: process.env.API_KEY (Vercel System)");
     if (process.env.VITE_API_KEY) console.log("   - Source: process.env.VITE_API_KEY (Vercel System)");
  } else {
     console.error("❌ CRITICAL WARNING: No API Key detected in environment variables.");
     console.error("   - Please check Vercel Settings > Environment Variables.");
     console.error("   - Ensure 'Production', 'Preview', and 'Development' boxes are checked.");
  }
  console.log("------------------------------------------------");

  return {
    plugins: [react()],
    define: {
      // This "bakes" the key into the code at build time.
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey || ''),
    },
  };
});
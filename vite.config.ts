import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // Check all possible locations for the key.
  const apiKey = process.env.API_KEY || process.env.VITE_API_KEY || env.API_KEY || env.VITE_API_KEY;

  // --- DIAGNOSTIC LOGGING START ---
  console.log("\n========================================================");
  console.log("eAMS DIAGNOSTIC BUILD LOG");
  console.log("========================================================");
  
  // 1. Identify the Vercel Project
  const projectTitle = process.env.VERCEL_PROJECT_TITLE || "Unknown (Not Vercel?)";
  const vercelEnv = process.env.VERCEL_ENV || "local/unknown";
  console.log(`TARGET PROJECT: ${projectTitle}`);
  console.log(`TARGET ENVIRONMENT: ${vercelEnv}`);
  
  // 2. List ALL available Environment Variable Names (Keys only, for security)
  // This helps us see if we are in the "Wrong Project" or if keys are named differently.
  const allKeys = [...Object.keys(process.env), ...Object.keys(env)];
  const distinctKeys = [...new Set(allKeys)].sort();
  
  console.log("\nAVAILABLE ENVIRONMENT VARIABLES (Names Only):");
  distinctKeys.forEach(key => {
    // Highlight relevant keys
    if (key.includes('API') || key.includes('KEY') || key.includes('VERCEL')) {
        console.log(` -> ${key}`);
    }
  });

  // 3. Final Verdict
  console.log("\nAPI KEY STATUS:");
  if (apiKey) {
     const maskedKey = apiKey.substring(0, 5) + "..." + apiKey.substring(apiKey.length - 4);
     console.log(`✅ SUCCESS: API Key found and will be injected! (${maskedKey})`);
  } else {
     console.error("❌ CRITICAL FAILURE: No API Key found.");
     console.error("   Action: Check Vercel Dashboard > Settings > Environment Variables for project: " + projectTitle);
  }
  console.log("========================================================\n");
  // --- DIAGNOSTIC LOGGING END ---

  return {
    plugins: [react()],
    define: {
      // This "bakes" the key into the code at build time.
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey || ''),
    },
  };
});
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, '.', '');
  
  // Check all possible locations for the key.
  const apiKey = process.env.API_KEY || process.env.VITE_API_KEY || env.API_KEY || env.VITE_API_KEY;
  
  // Check for Market Code (defaults to empty string if not set, handled in config.ts)
  const marketCode = process.env.VITE_MARKET_CODE || env.VITE_MARKET_CODE || '';

  // --- DIAGNOSTIC LOGGING START ---
  console.log("\n========================================================");
  console.log("eAMS DIAGNOSTIC BUILD LOG");
  console.log("========================================================");
  
  // 1. Identify the Vercel Project
  const projectName = process.env.VERCEL_PROJECT_NAME || "Unknown (Not Vercel?)";
  const repoSlug = process.env.VERCEL_GIT_REPO_SLUG || "Unknown Repo";
  const vercelEnv = process.env.VERCEL_ENV || "local/unknown";
  const orgId = process.env.VERCEL_ORG_ID || "Unknown Org";
  
  console.log(`TARGET PROJECT NAME: ${projectName}`);
  console.log(`TARGET ORG ID:       ${orgId}`);
  console.log(`TARGET REPO:         ${repoSlug}`);
  console.log(`TARGET ENVIRONMENT:  ${vercelEnv}`);
  console.log(`TARGET MARKET CODE:  ${marketCode || 'Default (UK)'}`);
  
  // 2. List ALL available Environment Variable Names (Keys only, for security)
  const allKeys = [...Object.keys(process.env), ...Object.keys(env)];
  const distinctKeys = [...new Set(allKeys)].sort();
  
  console.log("\nAVAILABLE ENVIRONMENT VARIABLES (Names Only):");
  distinctKeys.forEach(key => {
    // Highlight relevant keys
    if (key.includes('API') || key.includes('KEY') || key.includes('VERCEL') || key.includes('MARKET')) {
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
     console.error("   Action: Check Vercel Dashboard > Settings > Environment Variables for project: " + projectName);
  }
  console.log("========================================================\n");
  // --- DIAGNOSTIC LOGGING END ---

  return {
    plugins: [react()],
    define: {
      // This "bakes" the key into the code at build time.
      'import.meta.env.VITE_API_KEY': JSON.stringify(apiKey || ''),
      // Bake the market code in as well
      'import.meta.env.VITE_MARKET_CODE': JSON.stringify(marketCode),
    },
  };
});
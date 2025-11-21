import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  // Vercel often exposes system variables in process.env directly.
  // We check process.env first, then fallback to the loaded env file.
  const apiKey = process.env.API_KEY || env.API_KEY;

  console.log(`[Vite Config] Loading API_KEY from environment... Success: ${!!apiKey}`);

  return {
    plugins: [react()],
    define: {
      // This "bakes" the API key into the code during the build process
      // so the browser can access it.
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  };
});
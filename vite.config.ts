import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  // Load environment variables from .env files
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Bridges the gap between Vite's environment handling and the SDK's process.env requirement
      'process.env.API_KEY': JSON.stringify(env.API_KEY || env.VITE_API_KEY || ""),
      'process.env.VITE_MARKET_CODE': JSON.stringify(env.VITE_MARKET_CODE || "UK"),
      'process.env.VITE_REVIEW_MODE': JSON.stringify(env.VITE_REVIEW_MODE || "false")
    },
  };
});
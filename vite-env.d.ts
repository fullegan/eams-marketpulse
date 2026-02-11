interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_MARKET_CODE: string;
  readonly VITE_REVIEW_MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
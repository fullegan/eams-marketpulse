interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_MARKET_CODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

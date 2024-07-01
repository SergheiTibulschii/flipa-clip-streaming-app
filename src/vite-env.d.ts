/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_KEY: string;
  VITE_API_BASE_V1: string;
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

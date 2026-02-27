/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_GOOGLE_AUTH?: string;
  readonly VITE_GOOGLE_CLIENT_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


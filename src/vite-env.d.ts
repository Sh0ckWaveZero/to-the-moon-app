/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LIFF_ID: string;
  readonly VITE_LINE_OA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

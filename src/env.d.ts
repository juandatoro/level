/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly VITE_ENVIRONMENT: string
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_DATABASE_URL: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  readonly VITE_FIREBASE_PRIVATE_KEY_ID: string
  readonly VITE_FIREBASE_PRIVATE_KEY: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_CLIENT_EMAIL: string
  readonly VITE_FIREBASE_CLIENT_ID: string
  readonly VITE_FIREBASE_AUTH_URI: string
  readonly VITE_FIREBASE_TOKEN_URI: string
  readonly VITE_FIREBASE_AUTH_CERT_URL: string
  readonly VITE_FIREBASE_CLIENT_CERT_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

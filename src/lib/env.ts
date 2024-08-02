import { RemoveIndex, ViteImportVariables } from './types';

function getEnvVar(
  key: keyof Omit<RemoveIndex<ImportMetaEnv>, ViteImportVariables>
): string {
  const value = import.meta.env[key];

  if (typeof value === 'undefined') {
    throw new Error(`Environment variable ${key} is not set.`);
  }

  return value;
}

export const env: Omit<ImportMetaEnv, ViteImportVariables> = {
  VITE_API_BASE_V1: getEnvVar('VITE_API_BASE_V1'),
  VITE_API_KEY: getEnvVar('VITE_API_KEY'),
  VITE_SUPABASE_URL: getEnvVar('VITE_SUPABASE_URL'),
  VITE_SUPABASE_API_KEY: getEnvVar('VITE_SUPABASE_API_KEY'),
};

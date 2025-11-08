// Utilidad de servidor para usar Supabase Admin (Service Role)
import { createClient } from '@supabase/supabase-js'

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) return null
  return createClient(url, serviceRoleKey, { auth: { persistSession: false } })
}

// Permite configurar el bucket por variable de entorno y cae en 'products'
export const DEFAULT_BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'products'
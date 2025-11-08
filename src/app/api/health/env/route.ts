import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // No exponemos valores; solo indicamos si están presentes
  const keys = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'SUPABASE_STORAGE_BUCKET',
    'SUPABASE_AUTO_CREATE_BUCKETS',
    'NEXTAUTH_SECRET',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD',
    'DATABASE_URL',
  ] as const

  const present: Record<string, boolean> = {}
  for (const k of keys) present[k] = Boolean(process.env[k])

  return NextResponse.json({ present })
}

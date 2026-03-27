import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    if (data.user) {
      await supabase.from('users').upsert({ id: data.user.id, email: data.user.email, plan: 'free', total_enrichments: 0 })
    }
    const response = NextResponse.json({ user: data.user, session: data.session })
    if (data.session) {
      response.cookies.set('sb-access-token', data.session.access_token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/' })
      response.cookies.set('sb-refresh-token', data.session.refresh_token, { httpOnly: true, secure: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30, path: '/' })
    }
    return response
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Signup failed' }, { status: 500 })
  }
}

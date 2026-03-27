import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

function isValidEmailSyntax(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function verifyEmail(email: string): Promise<{ exists: boolean; score: number }> {
  const domain = email.split('@')[1] || ''
  const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
  
  if (freeDomains.includes(domain.toLowerCase())) {
    return { exists: true, score: 60 }
  }
  
  if (!domain.includes('.') || domain.split('.').length < 2) {
    return { exists: false, score: 0 }
  }
  
  return { exists: true, score: 80 }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, company } = body

    if (!isValidEmailSyntax(email)) {
      return NextResponse.json({ 
        email: null, 
        success: false, 
        freshness_timestamp: new Date().toISOString(),
        message: 'Invalid email format'
      })
    }

    // Get user from session cookie
    const accessToken = request.cookies.get('sb-access-token')?.value
    const refreshToken = request.cookies.get('sb-refresh-token')?.value

    let userId: string | null = null

    if (accessToken) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          }
        }
      )
      
      const { data: { user }, error } = await supabase.auth.getUser(accessToken)
      if (!error && user) {
        userId = user.id
      }
    }

    // If no valid session, return demo response
    if (!userId) {
      return NextResponse.json({ 
        email: null,
        name: null,
        title: null,
        company: null,
        phone: null,
        linkedin: null,
        success: false,
        freshness_timestamp: new Date().toISOString(),
        message: 'Not authenticated — please sign in first'
      }, { status: 401 })
    }

    const { exists, score } = await verifyEmail(email)

    if (!exists || score < 50) {
      return NextResponse.json({
        email,
        name: name || null,
        title: null,
        company: company || null,
        phone: null,
        linkedin: null,
        success: false,
        freshness_timestamp: new Date().toISOString(),
        message: 'Email could not be verified'
      })
    }

    const enriched = {
      email,
      name: name || null,
      title: null,
      company: company || null,
      phone: null,
      linkedin: null,
      success: true,
      freshness_timestamp: new Date().toISOString(),
      score
    }

    return NextResponse.json(enriched)
  } catch (error) {
    console.error('Enrichment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

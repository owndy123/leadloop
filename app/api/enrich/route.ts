import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })
    if (!isValidEmail(email)) {
      return NextResponse.json({
        email, name: null, company: null, success: false,
        freshness_timestamp: new Date().toISOString(),
        message: 'Invalid email format'
      })
    }
    const domain = email.split('@')[1] || ''
    const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com']
    let score = 80
    if (freeDomains.includes(domain.toLowerCase())) score = 60
    if (!domain.includes('.')) score = 0
    const success = score >= 50
    return NextResponse.json({
      email,
      name: null,
      company: null,
      success,
      freshness_timestamp: new Date().toISOString(),
      score,
      message: success ? undefined : 'Email could not be verified'
    })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

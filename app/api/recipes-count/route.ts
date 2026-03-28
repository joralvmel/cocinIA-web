import { NextResponse } from 'next/server'
import https from 'https'
import { URL } from 'url'

function httpsRequest(urlString: string, options: any): Promise<{ status: number; headers: any; body: string }> {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString)
    const requestOptions = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: options.method || 'GET',
      headers: options.headers,
      timeout: 5000,
    }

    const request = https.request(requestOptions, (response) => {
      let data = ''
      response.on('data', (chunk) => {
        data += chunk
      })
      response.on('end', () => {
        resolve({ status: response.statusCode || 500, headers: response.headers, body: data })
      })
    })

    request.on('error', (error) => {
      reject(error)
    })

    request.on('timeout', () => {
      request.destroy()
      reject(new Error('Request timeout'))
    })

    request.end()
  })
}

export async function POST() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  console.log('[recipes-count] URL:', supabaseUrl?.substring(0, 40))
  console.log('[recipes-count] Key:', supabaseAnonKey?.substring(0, 30))

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Missing env vars' }, { status: 500 })
  }

  try {
    const url = `${supabaseUrl}/rest/v1/recipes?select=id&limit=1`
    console.log('[recipes-count] Fetch from:', url.substring(0, 60))

    const result = await httpsRequest(url, {
      method: 'GET',
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: 'count=exact',
      },
    })

    console.log('[recipes-count] Response status:', result.status)
    console.log('[recipes-count] Response headers:', result.headers['content-range'])

    // Supabase returns 200 or 206 depending on whether there's data
    if (result.status !== 200 && result.status !== 206) {
      return NextResponse.json({ error: `HTTP ${result.status}`, body: result.body.substring(0, 200) }, { status: 500 })
    }

    const contentRange = (result.headers['content-range'] as string) || ''
    if (!contentRange.includes('/')) {
      return NextResponse.json({ error: 'No content-range header', headers: JSON.stringify(result.headers) }, { status: 500 })
    }

    const total = Number(contentRange.split('/')[1])
    return NextResponse.json({ count: total })
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('[recipes-count-ERROR]', msg)
    return NextResponse.json({ error: 'Network error', details: msg }, { status: 500 })
  }
}

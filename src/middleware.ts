import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          response = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/portal')
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  if (isProtectedRoute && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login?next=/admin', request.url))
    }
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single()
    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/portal/:path*', '/admin/:path*'],
}

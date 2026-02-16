import { type NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - / (landing page - public)
         * - /auth (auth routes)
         * - /login (login page - created for explicit login)
         */
        '/((?!_next/static|_next/image|favicon.ico$|auth|login|$).*)',
    ],
}

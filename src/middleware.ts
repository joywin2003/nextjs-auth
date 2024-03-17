import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname

    console.log(path)

    const isPublic = path==="/login" || path==="/signup" || path==="/verifyemail"
    const token = request.cookies.get("token")?.value || "";

    if(!isPublic && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }else if(isPublic && token){
        return NextResponse.redirect(new URL('/', request.url))
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login", "/signup","/profile","/verifyemail"],
}
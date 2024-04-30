import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  } catch (e) {

    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    })
  }
}

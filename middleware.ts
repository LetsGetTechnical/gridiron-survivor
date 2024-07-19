// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse, type NextRequest } from 'next/server'

/**
 * Checks if the request is a POST request and if so, returns the response object
 * @param request - The request object
 * @returns {NextResponse} - The response object
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
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

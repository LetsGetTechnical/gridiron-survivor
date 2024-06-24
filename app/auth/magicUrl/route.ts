// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { NextResponse } from 'next/server';

/**
 * Redirects the user to the origin URL.
 * @param request - The incoming request
 * @returns The response to return
 */
export async function GET(request: Request): Promise<Response> {
  const requestUrl = new URL(request.url);
  const targetUrl = new URL('/weeklyPicks', requestUrl.origin);

  const userId = requestUrl.searchParams.get('userId');
  const secret = requestUrl.searchParams.get('secret');

  if (!userId || !secret) {
    return new NextResponse('Invalid URL parameters', { status: 400 });
  }

  if (userId && secret) {
    return NextResponse.redirect(targetUrl);
  }

  return NextResponse.redirect(requestUrl.origin);
}

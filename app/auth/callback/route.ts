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

  return NextResponse.redirect(requestUrl.origin);
}
